---
title: Locally testing your custom GitHub Action
longTitle: ""
customField: ""
slug: ""
description: ""
date: 2024-07-15T14:55:00.417Z
lastmod: 2024-07-15T14:55:00.418Z
preview: /social/dd526d68-fd58-4e90-b418-37ead74a76f0.png
draft: true
comments: true
tags: []
type: post
fmContentType: post
---

When you are developing a custom GitHub Action, you probably want to test it locally before pushing it to your repository. That is exactly I wanted to do as well. Initially, I created some script that allowed to run it locally, but over the weekend I found a better way by using the [@github/local-action](https://github.com/github/local-action) package.

{{< caption-new "/uploads/2024/07/local-action-debugger.webp" "GitHub local-action debugger" >}}

In this post, I will show you how to use the `@github/local-action` package to test your custom GitHub Action locally.

## Prerequisites

To get started, it is best to already have a custom GitHub Action that you want to test. If you do not have one yet, you can get started by using the [JavaScript Action Template](https://github.com/actions/javascript-action) or the [TypeScript Action Template](https://github.com/actions/typescript-action).

{{< blockquote type="important" text="The `@github/local-action` only works for JS/TS based GitHub Actions." >}}

## Installing the @github/local-action package

To use the `@github/local-action` package, you need to install it first or you can make use of the `npx` command to run it without installing it.

```bash
npm install -g @github/local-action

# or
npx @github/local-action
```

## Preparing the environment file

### Adding your variables

```bash
INPUT_<action-variable-name>=<VALUE>

# Example
INPUT_github-token=<token>
INPUT_report-path="results.success.json"
INPUT_add-comment=true
INPUT_close-on-success=true
INPUT_job-summary=false
INPUT_issue-assignees=estruyf
```

### Defining your GitHub variables

```bash
GITHUB_REPOSITORY=estruyf/github-actions-testing
```

### Enabling debugging

```bash
ACTIONS_STEP_DEBUG=true
```

## Using the @github/local-action package

Once you have installed the package, you can run the following command to test your custom GitHub Action locally.

```bash {title="Execute the local-action command"}
# If you have the package installed
local-action <path-to-your-action> <path-to-your-entrypoint> <path-to-environment-file>

# If you want to use npx
npx @github/local-action <path-to-your-action> <path-to-your-entrypoint> <path-to-environment-file>
```

The `local-action` command takes three arguments:

1. `<path-to-your-action>`: The path to your custom GitHub Action (the folder where your `action.yml` file is located).
2. `<path-to-your-entrypoint>`: The path to the entrypoint of your custom GitHub Action.
3. `<path-to-environment-file>`: The path to the environment file you want to use.

All three arguments are required to run the `local-action` command.

Here is an example how I run it for my [Playwright Issue Creator](https://github.com/marketplace/actions/playwright-issue-creator) GitHub Action:

```bash
npx @github/local-action run ./ src/index.ts .env
```

{{< caption-new "/uploads/2024/07/local-action-debugger.webp" "GitHub local-action debugger" >}}