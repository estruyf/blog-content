---
title: "Deploy Astro to Azure Static Web Apps from GitHub and CLI"
longTitle: "Astro site deployment to Azure Static Web Apps with the CLI from GitHub Actions"
customField: ""
slug: "/deploy-astro-azure-static-web-apps-github-cli/"
description: "Learn to deploy your Astro site to Azure Static Web Apps using GitHub and CLI for a seamless experience."
date: "2025-02-28T13:42:47.800Z"
lastmod: "2025-02-28T13:42:48.384Z"
preview: "/social/a1b0ac61-0135-4a11-8508-a73492312b8e.png"
draft: false
comments: true
tags:
  - "Astro"
  - "Azure"
  - "Azure Static Web Apps"
  - "Deployment"
  - "GitHub Actions"
type: "post"
fmContentType: "post"
---

Deploying an Astro site to Azure Static Web Apps should be straightforward, but my initial experience was not pain-free. The default Oryx GitHub Action ([Oryx GitHub Actions](https://github.com/microsoft/Oryx/wiki/GitHub-Actions)) failed due to package size issues and its reliance on an outdated `npm install --production` command. To work around this, I updated the deployment process to use the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/) instead.

In this blog post, I'll walk you through deploying an Astro site to Azure Static Web Apps using the Static Web Apps CLI, ensuring a smoother experience.

## Step 1: Create an Astro site

In my scenario, I created a new folder and the Astro site in a subfolder named `app`. I wanted to keep the root folder as clean as possible, and I will add an API folder with Azure Functions later.

```bash title="Create an Astro site"
npm create astro@latest
```

{{< blockquote type= "info" text= "Answer the questions Houston asks you to fit your needs">}}

## Step 2: Install the Azure Static Web Apps CLI

The Azure Static Web Apps CLI is a command-line tool that allows you to create, manage, and deploy Azure Static Web Apps directly from your terminal. To install the CLI, run the following command:

```bash title="Install the Azure Static Web Apps CLI"
npm install -g @azure/static-web-apps-cli
```

{{< blockquote type= "info" text= "You can use the `swa` command locally to start your development server. Instead of the default `http://localhost:4321` address, which you get from Astro, it will proxy all traffic through the `https://localhost:4280` address (default configuration). The nice thing is that you can test your APIs and authentication/authorization as if they are running on Azure." >}}

## Step 3: Initialize the Azure Static Web Apps project

Next, initialize the Azure Static Web App in the project root:

```bash title="Initialize the Azure Static Web Apps project"
swa init
```

It will provide you with a default config. You should not accept it and provide the following answers:

{{< caption-new "/uploads/2025/02/swa-init.webp" "Static Web App CLI - Initialization" "data:image/jpeg;base64,UklGRogAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCkAAAAAPIKCgoKCgoKCPHr//////////3p6//////////96QImJiYmJiYmJQABWUDggOAAAALABAJ0BKgoABAABQCYlpAAC6ndPOEAA/rhWQ//KKPwPsrp3pkdeR5+5e9Kn/kzPGQKjsFsS8AAA" "638" >}}

The `swa-cli.config.json` file contents it creates should look similar to this:

```json title="swa-cli.config.json"
{
  "$schema": "https://aka.ms/azure/static-web-apps-cli/schema",
  "configurations": {
    "astro-func-swa": {
      "appLocation": "./app",
      "outputLocation": "dist",
      "appDevserverUrl": "http://localhost:4321"
    }
  }
}
```

## Step 4: Add the build and dev scripts to your package.json

On the root, I installed the `npm-run-all` package to run the build and dev scripts in parallel and configured the `build` and `dev` scripts in the `package.json` file:

```json title="package.json"
{
  "scripts": {
    "build": "npm run build:app && npm run build:api",
    "build:app": "cd app && npm run build",
    "dev": "npm-run-all --parallel dev:*",
    "dev:swa": "swa start",
    "dev:app": "cd app && npm run dev"
  }
}
```

## Step 5: Test out the local development

With the above configuration, you should be able to start the local development server from Astro and the Azure Static Web Apps CLI:

```bash title="Start the local development server"
npm run dev
```

{{< caption-new "/uploads/2025/02/local-development.webp" "Local development with the Static Web App server" "data:image/jpeg;base64,UklGRmYAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSBUAAAAAUp2dnZ2dnZ2dUlajo6Ojo6Ojo1YAVlA4ICoAAACwAQCdASoKAAIAAUAmJaQAAtz9EiMAAM4/Whd1jl+zd4B2vqMMW14uAAA=" "708" >}}

As you can see in the above screenshot, the Azure Static Web Apps proxy is running on `https://localhost:4280` and the Astro development server on `http://localhost:4321`. Suppose you do not use any local APIs or authentication/authorization. In that case, you can use the Astro development server only, but once you add these, it is recommended that you use the Azure Static Web Apps proxy. That way, you don't have to think about CORS issues and can test your APIs as if they are running on Azure.

Once you are happy with the local development, you can commit your changes and push them to your GitHub repository.

## Step 6: Create the Azure Static Web App

On Azure, I created a new Static Web App and provided the following information:

{{< caption-new "/uploads/2025/02/azure-static-web-app.webp" "Azure Static Web App creation"  "data:image/jpeg;base64,UklGRsgAAABXRUJQVlA4WAoAAAAQAAAACQAAEQAAQUxQSC4AAAABL6CQjSQ4ti/UapzFRURcVj0UMrBCbTEE0M4hgJ9Be/5CAUT0PwKwk5SvancdVlA4IHQAAABwAwCdASoKABIAPm0ukkWkIqGYBABABsS0gAAtT8MDEz6RMcAA/vVjQLDiT1M/4mLiNkcyi3UEigy1q2Mdn6xHFgkFlEs8PpwJFmQc2UB5Rgud/UbpKjqd9sP/mRrve3ybbptAVCs2BCevT7xMfjCd2cAAAA==" "792" >}}

As you can see in the screenshot, I defined the app, API, and output location. I originally wanted to use the default GitHub Actions workflow it provided me, so I defined these values. As we will use the CLI, all the required values are already provided in the `swa-cli.config.json` file.

When you connect the GitHub repository, it automatically creates a GitHub Actions workflow for you. We won't be using this workflow except for the API token it generates.

## Step 7: Update the GitHub Actions workflow

Once the Static Web App is created, you can pull the repository changes. In the` .github/workflows' folder, you will see a new GitHub Actions workflow. 

In my case, my first run failed due to the package size issues.

{{< caption-new "/uploads/2025/02/github-actions-failed.webp" "GitHub Actions workflow failed"  "data:image/jpeg;base64,UklGRkwAAABXRUJQVlA4WAoAAAAQAAAACQAAAAAAQUxQSAsAAAAAQWlpaWlpaWlpQQBWUDggGgAAADABAJ0BKgoAAQABQCYlpAADcAD+/QSS/CgA" "906" >}}

Another thing I noticed was the warning about the `npm install --production` command. You should use `npm install --omit=dev` instead.

{{< caption-new "/uploads/2025/02/npm-install-prod.webp" "npm install --production"  "data:image/jpeg;base64,UklGRloAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSBUAAAAAE0NDQ0NDQ0NDExdOTk5OTk5OThcAVlA4IB4AAAAwAQCdASoKAAIAAUAmJaQAA3AA/v0UlpC6NrfFAAA=" "497" >}}

To address these issues and gain more control over the whole workflow, I decided to create a new GitHub Actions workflow and deploy the site using the Azure Static Web Apps CLI. 

Change the GitHub Actions workflow filename to `deploy.yml` and update the contents to the following:

```yaml title=".github/workflows/deploy.yml"
name: Deployment to Azure Static Web App

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: |
          npm ci
          cd app && npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        run: npx @azure/static-web-apps-cli deploy -d ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_<ID> }} --env production
```

{{< blockquote type= "important" text= "Replace `<ID>` with the ID of the Azure Static Web App API token name that was created for your GitHub Actions workflow." >}}

With this workflow, you can commit and push the changes to your GitHub repository. The GitHub Actions workflow will trigger the deployment to Azure Static Web Apps.

{{< caption-new "/uploads/2025/02/deploy-gh-action-wf.webp" "Successful deployment with GitHub Actions workflow"  "data:image/jpeg;base64,UklGRsYAAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSDkAAAABR6CobSOm4zWOP92jERGB9zGSoCq2beoiwX1H8CvEKSCCCKS4yWWI6H8sAMOZeScz318w83lVNQEAVlA4IGYAAACwAgCdASoKAAcAAUAmJaQAEkAbAd/jjNw+c6FYkwAA/rhed/P/0PiY+l9ap0oQ0uS/HD+2MwH9H+p5FPdFt/hM/xPpB/pPzCQe1kX/Bk7b+VfKL/+GExT4EC/ftxILU+gd9kAAAAA=" "373" >}}

## Conclusion

Deploying an Astro site to Azure Static Web Apps can be challenging, especially with the default Oryx GitHub Action, which I initially struggled with due to package size limitations and outdated dependency handling. Switching to the Azure Static Web Apps CLI allows you more control over the whole build and deployment process.