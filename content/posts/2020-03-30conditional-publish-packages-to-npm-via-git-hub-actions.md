---
title: Conditional publish packages to NPM via GitHub actions
slug: /conditional-publish-packages-npm-github-actions/
author: Elio Struyf
type: post
date: 2020-03-30T11:49:56.674Z
draft: false
tags:
  - Automation
  - CI/CD
  - GitHub
  - Actions
categories: []
comments: true
---

While I was working on one of my hobby projects to automate our home with Homebridge, I wanted to have an easy way to publish my packages to NPM. I usually do this via **Azure DevOps**, but as one of the conditions to get the plugin verified is that it is published publically on GitHub, I wanted to give GitHub Actions a try.

GitHub Actions are not so different compared to the YAML flow you configure for Circle CI or Azure DevOps these days. With every new tool/platform/... you use, there is a learning curve, and you need to read the documentation.

> **Info**: You can find the documentation from GitHub Actions can here: [https://help.github.com/en/actions](https://help.github.com/en/actions).

In my case, my flow was very simple; when I push code to the `dev`/`master` branches, it needs to eighter publish a beta or release version to NPM.

## The workflow

In my case, my workflow should do the following:

Install the NPM project dependencies
Run the TypeScript transpiler
Publish to NPM as release (only for `master`)
Update the package version (only for `dev`)
Publish to NPM as beta (only for `dev`)

In itself, this flow is very easy, but still, it was a matter of finding out how to set up via the documentation.

Every task you execute can have its condition to specify when it needs to run. In my case, it is run release publish for the `master` branch, and beta release for the `dev` branch. These conditions can be defined by the `if` property of each run task.

The condition requires two things:

An expression: `<branch-name> == <branch-for-task>`
A runtime variable to define for which branch it runs. In my case, this is the `github.ref` context variable. Which returns the branch or tag ref that triggered the workflow run.

> **Info**: You can find information for both of these requirements here: [Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)

## The YAML workflow

The complete YAML flow looks like this:

```yaml
name: Publish to NPM

on:
  push:
    branches:
      - master
      - dev

jobs:
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1.1.0
      with:
        node-version: 12.15
        registry-url: https://registry.npmjs.org/
  
    - name: Install npm dependencies
      run: npm i

    - name: Publish release
      run: npm publish --access public
      if: github.ref == 'refs/heads/master'
      env:
        NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
        
    - name: Update the package version
      if: github.ref == 'refs/heads/dev'
      run: node scripts/update-package-version.js $GITHUB_RUN_ID
        
    - name: Publish beta release
      run: npm publish --tag next --access public
      if: github.ref == 'refs/heads/dev'
      env:
        NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

*Have fun automating*
