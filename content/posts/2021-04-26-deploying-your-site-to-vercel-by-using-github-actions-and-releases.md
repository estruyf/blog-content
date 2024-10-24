---
title: Deploy your site to Vercel using GitHub Actions and Releases
slug: /deploy-site-vercel-github-actions-releases/
author: Elio Struyf
type: post
date: 2021-04-26T06:26:10.220Z
draft: false
tags:
  - GitHub
  - GitHub Actions
  - Vercel
categories: []
comments: true
preview: /social/c6808fb9-aeae-4886-8545-27ed8f31bee5.png
---

One of my favorite hosting companies is [Vercel](https://vercel.com/) as they can provide simplicity and flexibility at the same time. I wanted to control my site's deployment process on Vercel entirely for a new product I am building.

Usually, when you use Vercel in combination with GitHub. It will automatically trigger new deployments when you push code. You can configure it to your needs, but the main issue is when you want to work with GitHub releases. Vercel cannot yet deploy on new releases. 

There are a couple of ways to overcome this. You can, for instance, start a build by calling Vercel with a **deploy hook**. That way, you can call the hook from within your GitHub Actions workflow.

Another approach is to make use of the Vercel CLI and the combination of GitHub Actions. This approach is the one I used, as this gave me all the flexibility I needed during my CI/CD process.

## Prerequisites

Before you start, you need to know your **project ID** and **org ID** from Vercel. The simplest way to get this is to link your project to Vercel. You can do this by using `npx vercel link`.

{{< blockquote type="Info" text="You read more about the CLI here: [Vercel CLI](https://vercel.com/docs/cli). When you have not used it yet, it will first ask you to sign in." >}}

When you ran the command, it will create a `.vercel` folder in your project with a `project.json` file. In that file, you will find the `projectId` and `orgId`, which you can use later in your GitHub Actions workflow.

Something else you need to configure is to disable GitHub for your project on Vercel. That way, you let Vercel know that you want to take over control, and it will not trigger when you push your code to GitHub. 

To disable GitHub, you create a `vercel.json` file in the root of your project (if it does not yet exist), and add the following contents to it:

{{< highlight json "linenos=table,noclasses=false" >}}
{
  "github": {
    "enabled": false,
    "silent": true
  }
}
{{< / highlight >}}

*One more thing*, a `token` is required to use the CLI on GitHub Actions. 

Go to [Vercel Tokens](https://vercel.com/account/tokens), and create a new token. Keep this token safe, as you will need it later.

## GitHub Secrets to configure

In your GitHub project, go to settings and add the following secrets:

- **VERCEL_ORG_ID**: Value is the `orgId` from the JSON file created with the `vercel link` command.
- **VERCEL_PROJECT_ID**: Value is the `projectId` from the JSON file created with the `vercel link` command.
- **VERCEL_TOKEN**: Value is the token you created previously.

{{< caption "/2021/04/github1.png" "GitHub Secrets"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAACkSURBVI3BMU4DMRBA0T/LjCHrQJGC5P6XoqZdsIhAaxvsZNAWlqhQ3pOnw8m5gdqs2E6xaIQYyKnweIyUc2V9L7Tc2GjLnZY7pMqwLplBRNiou3MLDdGwnWLRCDGQU2F/nOmlU79+0Ps7zq+faMudljukyrAumb9EBHV3RAR35z8aoqEPStgbIQbWt0x8nuHqLC+JQXu50MuF+vHNUFJlM00Twy/v9UsgtQCtGQAAAABJRU5ErkJggg==" "217" >}}

## The GitHub Workflow

The last step is to add the job to your GitHub workflow. Here is an example of how you could do this:

{{< highlight yaml "linenos=table,noclasses=false" >}}
name: "Deploy"

on:
  release:
    types:
      - published
  push:
    branches:
      - dev
  workflow_dispatch:

jobs:
  vercel: 
    runs-on: ubuntu-latest
    name: "Deploy front-end"
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '14'
          registry-url: https://registry.npmjs.org/

      - name: "Deploy to Vercel"
        run: |
          prodRun=""
          if [[ ${GITHUB_REF} == "refs/heads/main" ]]; then
            prodRun="--prod"
          fi

          npx vercel --token ${VERCEL_TOKEN} $prodRun
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
{{< / highlight >}}

{{< blockquote type="Info" text="When the action runs for any other branch than my `main` branch, it will not deploy to production." >}}

As you can see from the above workflow, the GitHub Actions workflow only gets triggered when there is a release, push to `dev` or manual trigger on the workflow.

Once you put this workflow in place, you are in control over all deployments to Vercel. 