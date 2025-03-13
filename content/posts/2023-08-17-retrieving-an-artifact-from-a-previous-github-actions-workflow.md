---
title: "Retrieving an artifact from a previous GitHub Actions"
longTitle: "Retrieving an artifact from a previous GitHub Actions workflow"
customField: ""
slug: "/retrieving-artifact-previous-github-actions-workflow/"
description: "Learn how to download artifacts from previous GitHub Actions runs. A GitHub Script and workflow configuration is included."
date: "2023-08-17T14:12:50.527Z"
lastmod: "2023-08-17T14:12:50.979Z"
preview: "/social/0c70be6b-b49b-4300-a3ec-6401d39556a0.png"
draft: false
comments: true
tags:
  - "Actions"
  - "GitHub"
  - "GitHub Actions"
type: "post"
---

While configuring some end-to-end tests with Playwright, I wanted to achieve a visual comparison between the current run and the previous one.

Playwright expects to have a snapshot available for its comparison. When I run this on GitHub Actions, the snapshots should be taken from my previous GitHub Actions workflow run. Unfortunately, the [download artifacts](https://github.com/actions/download-artifact) action only allows you to download artifacts from the current workflow run.

To overcome this, I made a GitHub script that finds the previous successful run and downloads my snapshots.

## Scripting

To download the artifact, I used the [GitHub Script](https://github.com/actions/github-script/tree/v6/) action.

The code of the script action looks as follows:

```typescript
module.exports = async ({
  github,
  context,
  core
}) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  const workflows = await github.rest.actions.listRepoWorkflows({
    owner,
    repo
  })

  const workflow = workflows.data.workflows.find(w => w.path.includes(process.env.WORKFLOW_FILENAME));

  if (!workflow) {
    core.setFailed("No workflow found");
    return;
  }

  const runs = await github.rest.actions.listWorkflowRuns({
    owner,
    repo,
    workflow_id: workflow.id,
    status: "success",
    per_page: 1
  })

  if (runs.data.total_count === 0) {
    core.setFailed("No runs found");
    return;
  }

  const artifacts = await github.rest.actions.listWorkflowRunArtifacts({
    owner,
    repo,
    run_id: runs.data.workflow_runs[0].id
  });

  const artifact = artifacts.data.artifacts.find(artifact => artifact.name === process.env.ARTIFACT_NAME);
  if (artifact) {
    const response = await github.rest.actions.downloadArtifact({
      owner,
      repo,
      artifact_id: artifact.id,
      archive_format: 'zip'
    });
    require('fs').writeFileSync(process.env.ARTIFACT_FILENAME, Buffer.from(response.data));
    require('child_process').execSync(`unzip -o ${process.env.ARTIFACT_FILENAME} -d ${process.env.UNZIP_DIR}`);

    console.log("Artifact downloaded successfully");
  } else {
    core.setFailed("No artifact found");
  }
}
```

To keep the workflow file clean, I put the above code in a separate file and configured the actions as follows:

```yaml
- name: Download artifact
  uses: actions/github-script@v6
  continue-on-error: true
  env:
    WORKFLOW_FILENAME: testing.yml
    ARTIFACT_NAME: playwright-snapshots
    ARTIFACT_FILENAME: playwright-snapshots.zip
    UNZIP_DIR: tests
  with:
    script: |
      const script = require('./scripts/download-previous-artifact.js')
      await script({github, context, core})
```

One more thing you need to do is to assign the permissions for the workflow job. By default, you will not be able to get previous workflow run information. To get this information, add `actions: read` to the workflow jobs.

Here is what my complete workflow looks like:

```yaml
name: E2E Testing

on:
  schedule:
    - cron: "0 6 * * *"

jobs:
  testing:
    name: Start E2E Testing
    timeout-minutes: 60
    runs-on: ubuntu-latest

    # We need to make sure that we have actions read access to get the previous artifact
    permissions:
      contents: read
      actions: read
      packages: write

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Download artifact
        uses: actions/github-script@v6
        continue-on-error: true
        env:
          WORKFLOW_FILENAME: testing.yml
          ARTIFACT_NAME: playwright-snapshots
          ARTIFACT_FILENAME: playwright-snapshots.zip
          UNZIP_DIR: tests
        with:
          script: |
            const script = require('./scripts/download-previous-artifact.js')
            await script({github, context, core})

      - name: Run Playwright tests
        run: npx playwright test
        continue-on-error: true

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-snapshots
          path: tests/*-snapshots/
          retention-days: 30
```
