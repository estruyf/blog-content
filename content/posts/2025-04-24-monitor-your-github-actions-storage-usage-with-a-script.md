---
title: "Monitor your GitHub Actions storage usage with a script"
longTitle: ""
customField: ""
slug: "/monitor-github-actions-storage-usage-script/"
description: "Effortlessly monitor your GitHub Actions storage usage with this script, ensuring you stay within quotas and avoid unexpected costs."
date: "2025-04-24T14:16:35.270Z"
lastmod: "2025-04-24T14:16:35.854Z"
preview: "/social/5f230fc2-531d-406e-8012-564801f24a15.png"
draft: false
comments: true
tags:
  - "Automation"
  - "CI/CD"
  - "GitHub"
  - "GitHub Actions"
  - "Scripting"
type: "post"
fmContentType: "post"
---

GitHub Actions is a powerful tool for automating workflows, but managing storage usage for artifacts and caches can be challenging. GitHub does not currently provide a consolidated overview of storage usage across repositories, making it difficult to track how much space your workflows consume. To address this, I created a script that calculates the total storage used by artifacts and caches for all repositories under a given owner/organization.

## Why This Script?

GitHub Actions has storage quotas for artifacts:

**Artifacts**: 500 MB (free tier), 1GB (pro tier), 50GB (enterprise tier).

{{< blockquote type="info" text="For more detailed information about storage and billing for GitHub Actions, refer to the official documentation: [About billing for GitHub Actions](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions#included-storage-and-minutes)." >}}

Exceeding these quotas can lead to failed workflows or additional costs.

{{< caption-new "/uploads/2025/04/exceed-storage-quota.webp" "Exceeded the GitHub Artifacts storage quota"  "data:image/jpeg;base64,UklGRiwAAABXRUJQVlA4ICAAAABQAQCdASoKAAEAAUAmJaQABAAAAP78rO2nXQQFfh5AAA==" "2304" "236" >}}

This script which I am sharing provides a detailed breakdown of storage usage for each repository and calculates the total usage across all repositories in an organization.

## Prerequisites

Before running the script, ensure you have the following:

1. **GitHub CLI (`gh`)**: Install it from [GitHub CLI](https://cli.github.com/).
2. **Authentication**: Log in to the GitHub CLI using `gh auth login`.
3. **`jq`**: A lightweight JSON processor. Install it using your package manager (e.g., `brew install jq` on macOS).

## The script to check the storage usage

```bash
# Ensure the GitHub CLI is authenticated
if ! gh auth status > /dev/null 2>&1; then
  echo "Please authenticate with the GitHub CLI using 'gh auth login'."
  exit 1
fi

# Check if the owner is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <owner>"
  echo "Example: $0 owner"
  exit 1
fi

OWNER=$1

# Check if the owner type is provided
echo "Is the owner an organization or a user? (org/user)"
read -r OWNER_TYPE

if [[ "$OWNER_TYPE" != "org" && "$OWNER_TYPE" != "user" ]]; then
  echo "Invalid input. Please specify 'org' or 'user'."
  exit 1
fi

echo "Fetching repositories for owner: $OWNER"

PAGE=1
TOTAL_ARTIFACT_SIZE=0
TOTAL_CACHE_SIZE=0

while true; do
  # Fetch repositories for the given owner based on type (paginated, including private and internal)
  if [ "$OWNER_TYPE" == "org" ]; then
    REPOS_RESPONSE=$(gh api -H "Accept: application/vnd.github+json" \
      "/orgs/$OWNER/repos?type=all&per_page=100&page=$PAGE")
  else
    REPOS_RESPONSE=$(gh api -H "Accept: application/vnd.github+json" \
      "/users/$OWNER/repos?type=all&per_page=100&page=$PAGE")
  fi

  REPOS=$(echo "$REPOS_RESPONSE" | jq -r '.[].full_name')
  if [ -z "$REPOS" ]; then
    break
  fi

  echo "Repositories on page $PAGE:"
  echo "$REPOS"

  for REPO in $REPOS; do
    echo "Processing repository: $REPO"
    REPO_PAGE=1
    REPO_ARTIFACT_SIZE=0

    while true; do
      # Fetch artifacts for the repository (paginated)
      RESPONSE=$(gh api -H "Accept: application/vnd.github+json" \
        "/repos/$REPO/actions/artifacts?per_page=100&page=$REPO_PAGE")

      # Extract artifact sizes and sum them up
      SIZES=$(echo "$RESPONSE" | jq '.artifacts[].size_in_bytes' 2>/dev/null)
      if [ -z "$SIZES" ]; then
        break
      fi

      for SIZE in $SIZES; do
        REPO_ARTIFACT_SIZE=$((REPO_ARTIFACT_SIZE + SIZE))
      done

      # Check if there are more pages
      HAS_NEXT_PAGE=$(echo "$RESPONSE" | jq '.artifacts | length == 100')
      if [ "$HAS_NEXT_PAGE" != "true" ]; then
        break
      fi

      REPO_PAGE=$((REPO_PAGE + 1))
    done

    # Fetch cache usage for the repository
    CACHE_RESPONSE=$(gh api -H "Accept: application/vnd.github+json" \
      "/repos/$REPO/actions/cache/usage")

    REPO_CACHE_SIZE=$(echo "$CACHE_RESPONSE" | jq '.active_caches_size_in_bytes // 0')

    # Add to total sizes
    TOTAL_ARTIFACT_SIZE=$((TOTAL_ARTIFACT_SIZE + REPO_ARTIFACT_SIZE))
    TOTAL_CACHE_SIZE=$((TOTAL_CACHE_SIZE + REPO_CACHE_SIZE))

    # Convert sizes to GB
    REPO_ARTIFACT_SIZE_GB=$(echo "scale=2; $REPO_ARTIFACT_SIZE / 1024 / 1024 / 1024" | bc)
    REPO_CACHE_SIZE_GB=$(echo "scale=2; $REPO_CACHE_SIZE / 1024 / 1024 / 1024" | bc)

    echo "Total artifact size for $REPO: $REPO_ARTIFACT_SIZE_GB GB"
    echo "Total cache size for $REPO: $REPO_CACHE_SIZE_GB GB"
  done

  # Check if there are more pages of repositories
  HAS_NEXT_PAGE=$(echo "$REPOS_RESPONSE" | jq 'length == 100')
  if [ "$HAS_NEXT_PAGE" != "true" ]; then
    break
  fi

  PAGE=$((PAGE + 1))
done

# Log total sizes across all repositories
TOTAL_ARTIFACT_SIZE_GB=$(echo "scale=2; $TOTAL_ARTIFACT_SIZE / 1024 / 1024 / 1024" | bc)
TOTAL_CACHE_SIZE_GB=$(echo "scale=2; $TOTAL_CACHE_SIZE / 1024 / 1024 / 1024" | bc)

echo "========================================"
echo "Total artifact size across all repositories: $TOTAL_ARTIFACT_SIZE_GB GB"
echo "Total cache size across all repositories: $TOTAL_CACHE_SIZE_GB GB"
```

## How to Use the Script

1. Save the script to a file, e.g., `check-artifacts-usage.sh`.
2. Make it executable:
   ```bash
   chmod +x check-artifacts-usage.sh
   ```
3. Run the script with the organization name as an argument:
   ```bash
   ./check-artifacts-usage.sh <owner/organization>
   ```
   Replace `<owner/organization>` with the name of your GitHub owner or organization.
4. Specify whether the owner is an organization or a user when prompted.
The script will:

- Fetch all repositories for the given organization.
- Calculate the total size of artifacts and caches for each repository.
- Display the total storage usage across all repositories.

## Example Output

```bash
> ./check-artifacts-usage.sh my-organization
Is the owner an organization or a user? (org/user)
> org
Fetching repositories for owner: my-organization
my-organization/repo1
my-organization/repo2

Processing repository: my-organization/repo1
Total artifact size for my-organization/repo1: 0 GB
Total cache size for my-organization/repo1: 0 GB
...
========================================
Total artifact size across all repositories: 24.42 GB
Total cache size across all repositories: 4.09 GB
```

## GitHub Actions Storage Quotas

For more details on GitHub Actions storage quotas, refer to the [GitHub Actions usage limits](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration#artifact-and-log-retention-policy).

## Conclusion

This script provides a quick and easy way to monitor your GitHub Actions storage usage, helping you stay within your quotas and avoid unexpected costs. Feel free to adapt it to your needs and share your feedback!

Happy automating!