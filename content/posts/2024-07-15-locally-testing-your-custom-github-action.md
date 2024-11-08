---
title: Locally running and testing your custom GitHub Action
longTitle: ""
customField: ""
slug: /locally-testing-custom-github-action/
description: Learn how to locally test and run your custom GitHub Action using the @github/local-action command-line tool with this step-by-step guide.
date: 2024-07-16T09:05:40.297Z
lastmod: 2024-07-16T09:05:40.763Z
preview: /social/07f2b912-9ea8-4243-abc3-ce601f194996.png
draft: false
comments: true
tags:
  - GitHub Actions
  - Testing
  - Development
type: post
fmContentType: post
---

When developing a custom GitHub Action, you should test and run it locally before pushing it to your repository. Initially, I created a script that allowed me to run it locally, but over the weekend, I found a better way by using the [@github/local-action](https://github.com/github/local-action) command-line tool.

{{< caption-new "/uploads/2024/07/local-action-debugger.webp" "GitHub local-action debugger"  "data:image/jpeg;base64,UklGRoIAAABXRUJQVlA4WAoAAAAQAAAACQAACwAAQUxQSCIAAAABFyAWTPwB9+WSRkTEgoK2bZjubwBb/nTGIKL/IZ4hX+IBVlA4IDoAAAAQAgCdASoKAAwAAUAmJZwCw7EQE/LnMYAAAP79mBunNL+Sa6k5cSbRuPbJNFTENHwm4CVbnalAAAAA" "1005" >}}

In this post, I will show you how to use the `@github/local-action` command-line tool to test your custom GitHub Action locally.

## Prerequisites

To start with the `@github/local-action` command-line tool, it is best to already have a custom GitHub Action you want to test. 

If you don't have one yet, you can use the [JavaScript Action Template](https://github.com/actions/javascript-action) or the [TypeScript Action Template](https://github.com/actions/typescript-action).

{{< blockquote type="important" text="The `@github/local-action` tool only works for JS/TS based GitHub Actions." >}}

## Installing the @github/local-action command-line tool

To use the `@github/local-action` command-line tool, you need to install it first or use the `npx` command to run it without installing it.

```bash {title="Install the @github/local-action command-line tool"}
npm install -g @github/local-action

# or
npx @github/local-action
```

## Preparing the environment file

To use the command-line tool, you need to create an environment file to define the input variables and the GitHub variables. Create a new file called `.env` in your project and add your configuration.

{{< blockquote type="info" text="The name of the environment file is something you can decide, as you need to pass it as an argument to the command-line execution." >}}

{{< blockquote type="info" text="You can fine an example configuration of my GitHub Action  in the [.env.sample file](https://github.com/estruyf/playwright-github-issue-creator/blob/main/.env.sample)." >}}

### Adding your variables

Your GitHub Action might require some input variables to run. You can define these variables in the environment file by adding the `INPUT_` prefix to the variable name.

```bash {title="Adding input variables"}
INPUT_<action-variable-name>=<VALUE>

# Example for the Playwright Issue Creator action
INPUT_github-token=<token>
INPUT_report-path="results.success.json"
INPUT_add-comment=true
INPUT_close-on-success=true
INPUT_job-summary=false
INPUT_issue-assignees=estruyf
```

### Defining your GitHub variables

You can also define the GitHub variables in the environment file. These variables define the GitHub context.

In my case, I need to set the `GITHUB_REPOSITORY` variable to get the `repo` from the `@actions/github` its `context` object.

```bash {title="Adding GitHub variables"}
GITHUB_REPOSITORY=estruyf/github-actions-testing
```

### Enabling debugging

You can enable debugging by setting the `ACTIONS_STEP_DEBUG` variable to `true`.

```bash {title="Enable debugging"}
ACTIONS_STEP_DEBUG=true
```

### Writing the job summary

When your action writes a job summary, you must do the following configuration to enable it locally.

- Create a new file to write the job summary. For example: `summary.md`.
- Add the `GITHUB_STEP_SUMMARY` with the path to your summary file.

```bash {title="Link the summary file to enable writing to the job summary"}
GITHUB_STEP_SUMMARY=summary.md
```

{{< blockquote type="info" text="Check the file content after an execution of the tool to see your job summary." >}}

## Using the @github/local-action command-line tool

Once you have installed the command-line tool and created the `.env` file, you can run the following command to test your custom GitHub Action locally.

```bash {title="Execute the local-action command"}
# If you have the command-line tool installed
local-action <path-to-your-action> <path-to-your-entrypoint> <path-to-environment-file>

# If you want to use npx
npx @github/local-action <path-to-your-action> <path-to-your-entrypoint> <path-to-environment-file>
```

The `local-action` command takes three arguments:

1. `<path-to-your-action>`: The path to your custom GitHub Action (the folder where your `action.yml` file is located).
2. `<path-to-your-entrypoint>`: The path to the entry point of your custom GitHub Action.
3. `<path-to-environment-file>`: The path to the environment file you want to use.

All three arguments are required to run the `local-action` command.

Here is an example of how I run it for my [Playwright Issue Creator](https://github.com/marketplace/actions/playwright-issue-creator) GitHub Action:

```bash
npx @github/local-action run ./ src/index.ts .env
```

{{< caption-new "/uploads/2024/07/local-action-debugger.webp" "GitHub local-action debugger"  "data:image/jpeg;base64,UklGRoIAAABXRUJQVlA4WAoAAAAQAAAACQAACwAAQUxQSCIAAAABFyAWTPwB9+WSRkTEgoK2bZjubwBb/nTGIKL/IZ4hX+IBVlA4IDoAAAAQAgCdASoKAAwAAUAmJZwCw7EQE/LnMYAAAP79mBunNL+Sa6k5cSbRuPbJNFTENHwm4CVbnalAAAAA" "1005" >}}

This command-line tool is great during the development process of your custom GitHub Action.

{{< blockquote type="tip" text="You can also add a Visual Studio Code configuration to allow you to debug your custom GitHub Action directly from your editor. You can check the [debugging in VS Code](https://github.com/github/local-action/blob/main/docs/debugging-in-vscode.md) guide for more information." >}}
