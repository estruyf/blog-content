---
title: "Publishing your VSCode Extensions from GitHub Actions"
slug: "/publishing-vscode-extensions-github-actions/"
author: "Elio Struyf"
type: "post"
date: "2021-03-23T12:15:48.376Z"
draft: false
tags:
  - "GitHub"
  - "GitHub Actions"
  - "VSCode"
  - "Extensions"
categories: []
comments: true
preview: "/social/0c6ba8b1-8bdf-48b0-8d33-47631f1a527d.png"
---

Automation is key! That is how I think anyway. I'm not too fond of repetition, but for some reason, I had not yet automated my Visual Studio Code extension publishing. I always did this manually from my terminal by running `vsce publish`.

With my latest extension, I thought, now is the time to automate this as well.  

## Setting up your workflow

When publishing your Code extensions, you need to use the Visual Studio Code Extension command-line tool: `vsce`. Typically this is something you install locally by running `npm i -g vsce`.

In this case, we will do this on GitHub Actions instead, but before you can start, you need to create your **Personal Access Token** or also called PAT.

{{< blockquote type="important" text="[Get your personal access token to publish to the VS Code Marketplace](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token)" >}}

When you got this **PAT**, add it as a GitHub Secret to your project.

{{< caption-new "/uploads/2021/03/extension1.png" "PAT Secret in GitHub"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAB2SURBVIXBsQrCQBBF0TuP2WBABcHGSuL/f5UaGwurFJuwO8YiENJ4jp3OlzCJf1wS1+5G0yTMxDAMtO2OnDOvvmfhzJ6PO2ZGRCCJWitbXkqhqhIlUCNiCjCoY2VNzHzvKAk/JPyYMBdbzmz6TPyM78zCzFj7An9yJxFqyZUAAAAAAElFTkSuQmCC" "232" >}}

We will use this secret in the GitHub Actions workflow which looks as follows:

```yaml
name: Release
on:
  release:
    types:
      - published
  workflow_dispatch:

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://registry.npmjs.org/

      - name: Install the dependencies
        run: npm i

      - name: Install vsce
        run: npm i -g vsce

      - name: Publish
        run: vsce publish -p ${{ secrets.VSCE_PAT }}
```

{{< blockquote type="info" text="The GitHub Actions workflow gets triggered whenever you create and publish a new release. In the last step, the **PAT** will be used to publish your extension." >}}

{{< blockquote type="important" text="Make sure to set the `publisher` to your account in the `package.json` file. For me, this is `eliostruyf`." >}}
