---
title: "Clean up old GitHub Actions artifacts with a script"
longTitle: ""
customField: ""
slug: "/clean-github-actions-artifacts-script/"
description: "Automatically clean up old GitHub Actions artifacts to stay within storage quotas and keep your CI/CD pipelines running smoothly."
date: "2025-05-25T14:21:46.946Z"
lastmod: "2025-05-25T14:21:47.666Z"
preview: "/social/1025941e-91b0-4a1d-ba0a-025262b404ab.png"
draft: false
comments: true
tags:
  - "Automation"
  - "CI/CD"
  - "GitHub"
  - "GitHub Actions"
type: "post"
fmContentType: "post"
---

After monitoring your GitHub Actions storage usage, you may find that old artifacts are consuming valuable space and pushing you closer to your storage quota. To help you manage this, I created a script that automatically deletes artifacts older than a specified number of days from your repositories.

## Why clean up old artifacts?

GitHub Actions artifacts are useful for sharing build outputs and logs, but they can quickly accumulate and eat up your storage quota. Exceeding your quota can cause workflow failures or unexpected costs. Regularly cleaning up old artifacts helps you:

- Stay within your storage limits
- Avoid failed workflows due to quota issues
- Keep your CI/CD environment tidy

## Prerequisites

Before running the cleanup script, make sure you have:

1. **GitHub CLI (`gh`)**: [Install it here](https://cli.github.com/).
2. **Authentication**: Log in to the GitHub CLI using `gh auth login`.
3. **`jq`**: A lightweight JSON processor. Install it with your package manager (e.g., `brew install jq` on macOS).

## The script to clean old artifacts

```bash
#!/bin/bash

# Ensure the GitHub CLI is authenticated
if ! gh auth status > /dev/null 2>&1; then
  echo "Please authenticate with the GitHub CLI using 'gh auth login'."
  exit 1
fi

# Check if the owner is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <owner/repo>"
  echo "Example: $0 owner/repo"
  exit 1
fi

REPO=$1
DAYS_OLD=5
PAGE=1

echo "Cleaning up artifacts older than $DAYS_OLD days for repository: $REPO"

while true; do
  # Fetch artifacts for the repository (paginated)
  RESPONSE=$(gh api -H "Accept: application/vnd.github+json" \
    "/repos/$REPO/actions/artifacts?per_page=100&page=$PAGE")

  # Check if the response contains artifacts
  if [ "$(echo "$RESPONSE" | jq '.artifacts | length')" -eq 0 ]; then
    echo "No more artifacts found."
    break
  fi

  # Extract artifact details
  ARTIFACTS=$(echo "$RESPONSE" | jq -c '.artifacts[] | {id: .id, name: .name, created_at: .created_at}')

  for ARTIFACT in $ARTIFACTS; do
    ID=$(echo "$ARTIFACT" | jq -r '.id')
    NAME=$(echo "$ARTIFACT" | jq -r '.name')
    CREATED_AT=$(echo "$ARTIFACT" | jq -r '.created_at')

    # Validate extracted data
    if [ -z "$ID" ] || [ -z "$NAME" ] || [ -z "$CREATED_AT" ]; then
      echo "Skipping invalid artifact data: $ARTIFACT"
      continue
    fi

    # Calculate artifact age in days (macOS-compatible)
    CREATED_AT_SECONDS=$(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$CREATED_AT" +%s)
    CURRENT_TIME=$(date +%s)
    AGE_DAYS=$(( (CURRENT_TIME - CREATED_AT_SECONDS) / 86400 ))

    if [ "$AGE_DAYS" -gt "$DAYS_OLD" ]; then
      echo "Deleting artifact: $NAME (ID: $ID, Age: $AGE_DAYS days)"
      gh api -X DELETE "/repos/$REPO/actions/artifacts/$ID" > /dev/null 2>&1
    else
      echo "Skipping artifact: $NAME (ID: $ID, Age: $AGE_DAYS days)"
    fi
  done

  # Check if there are more pages
  HAS_NEXT_PAGE=$(echo "$RESPONSE" | jq '.artifacts | length == 100')
  if [ "$HAS_NEXT_PAGE" != "true" ]; then
    break
  fi

  PAGE=$((PAGE + 1))
done

echo "Cleanup completed."
```

## How to use the script


1. Save the script to a file, e.g., `cleanup-old-artifacts.sh`.
2. Make it executable:
   ```bash
   chmod +x cleanup-old-artifacts.sh
   ```
3. Run the script with your repository name as an argument:
   ```bash
   ./cleanup-old-artifacts.sh <owner/repo>
   ```
   Replace `<owner/repo>` with the full name of your GitHub repository (e.g., `my-org/my-repo`).

By default, the script deletes artifacts older than 5 days. You can change the `DAYS_OLD` variable in the script to adjust this threshold.

## Example output

```bash
> ./cleanup-old-artifacts.sh my-org/my-repo
Cleaning up artifacts older than 5 days for repository: my-org/my-repo
Deleting artifact: build-20240501 (ID: 123456, Age: 24 days)
Skipping artifact: build-20240520 (ID: 123789, Age: 4 days)
Cleanup completed.
```

## GitHub Actions Storage Quotas

For more details on GitHub Actions storage quotas, refer to the [GitHub Actions usage limits](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration#artifact-and-log-retention-policy).

## Conclusion

This script helps you automate the cleanup of old GitHub Actions artifacts, keeping your storage usage in check and your CI/CD pipelines running smoothly. Feel free to adapt it to your needs and share your feedback!

Happy cleaning!
