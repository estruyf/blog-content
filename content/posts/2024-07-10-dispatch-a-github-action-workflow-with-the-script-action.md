---
title: "Dispatch a GitHub Action workflow with script action"
longTitle: "Dispatch a GitHub Action workflow with Github script action"
customField: ""
slug: "/dispatch-github-action-workflow-script-action/"
description: "Learn how to use the `repository_dispatch` event in GitHub Actions to trigger a workflow with a webhook."
date: "2024-07-10T11:05:11.830Z"
lastmod: "2024-07-10T11:05:11.830Z"
preview: "/social/781bfe90-827b-4b4d-b461-d38eb78609c2.png"
draft: false
comments: true
tags:
  - "GitHub Actions"
  - "GitHub"
type: "post"
fmContentType: "post"
---

You can use the GitHub Actions workflow `repository_dispatch` event trigger to start a workflow by triggering a webhook. 

I use this event trigger to start a workflow for building my website when I create or update content in my blog repository. Because my website and the blog content are two separate repositories, I must use the `repository_dispatch` event to trigger the website build workflow. Another use case is to start my E2E tests when I deploy a new application version.

{{< blockquote type="info" text="You can find more information about the `repository_dispatch` event in the [events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch) documentation." >}}

## Configure the workflow to trigger

In the workflow file you want to trigger, you must add the `repository_dispatch` event with a `types` key. The `types` key is an array of event types that you can define to limit your workflow to run on those specific types.

```yaml
name: Playwright Tests
on:
  repository_dispatch:
    types: [trigger-e2e-tests]
```

## How to trigger the workflow

You can start the workflow by making a `POST` request to the `dispatches` endpoint of the GitHub API. The endpoint is `POST /repos/{owner}/{repo}/dispatches`.

The request body should contain the `event_type` key with the event name you want to trigger. You can also add a `client_payload` key with additional data you wish to send to the workflow.

```http
POST https://api.github.com/repos/{owner}/{repo}/dispatches HTTP/1.1
Content-Type: application/json
Authorization: Bearer <PAT>
X-GitHub-Api-Version: 2022-11-28

{
  "event_type": "trigger-e2e-tests",
}
```

{{< blockquote type="important" text="To be able to perform the call, you need to generate a personal access token. I recommend you use the **fine-grained personal access token**. The fine-grained personal access token needs **read** access to the **metadata** scope and **read and write** access to the **contents** scope. <br /><br /> More information can be found in my [dispatch a GitHub Action via a fine-grained personal access token](https://www.eliostruyf.com/dispatch-github-action-fine-grained-personal-access-token/#trigger-the-github-action) article." >}}

## Trigger the workflow with the GitHub script action

A helpful workflow action is the [GitHub script action](https://github.com/marketplace/actions/github-script). This action allows you to use the `Octokit/rest.js` library to interact with the GitHub API and trigger the `repository_dispatch` event.

Here is an example of how you can trigger the `repository_dispatch` event with the GitHub script action:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # All your other steps

      - name: Start E2E tests
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.REPO_ACCESS_TOKEN }}
          script: |
            await github.rest.repos.createDispatchEvent({
              owner: context.repo.owner,
              repo: "<your repo name>",
              event_type: "trigger-e2e-tests"
            });
```

In the script, you need to replace `<your repo name>` with the repository's name where you want to trigger the workflow.

{{< blockquote type="important" text="By default, the action uses the GitHub token provided by the workflow. As we call another repository, you need to provide a PAT with the necessary permissions to the target repository. That is why the `github-token` property uses the `secrets.REPO_ACCESS_TOKEN` secret. <br /><br /> Add your PAT to the repository secrets." >}}