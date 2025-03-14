---
title: "Fix Azure Function Node.js GitHub Actions Windows workflow"
longTitle: "Fix the Azure Function Node.js GitHub Actions Windows workflow"
customField: ""
slug: "/fix-azure-function-node-js-github-actions-windows-workflow/"
description: "Fixing the Azure Function Node.js GitHub Actions Windows workflow to deploy only production dependencies and exclude the node_modules folder from the artifact."
date: "2024-09-09T10:15:49.612Z"
lastmod: "2024-09-09T10:15:49.613Z"
preview: "/social/3c1a1de2-867d-44af-bc63-8ad9bb7cf4a9.png"
draft: false
comments: true
tags:
  - "Azure Functions"
  - "CI/CD"
  - "Deployment"
  - "GitHub Actions"
  - "Node.js"
type: "post"
fmContentType: "post"
---

When deploying Node.js-based Azure Functions using GitHub Actions, you might face an issue with the Windows workflow. In the latest template, there is an issue in the build step where the `actions/upload-artifact` action fails to upload the artifact due to too many files. The problem is caused by the `node_modules` folder, which contains many files (even for a starter Azure Function project).

Another issue I spotted is that if the build step is successful, the deployment job will deploy all the dependencies (including the development dependencies) to the Azure Function App. Deploying the development dependencies is not recommended as it increases the deployment size and should not be required to run your functions.

## Fix the build artifact issue

To fix the issue, you must exclude the `node_modules` folder from the artifact upload and install an npm during the deployment. You can do this using the ignore pattern in the `actions/upload-artifact` action.

```yaml title="Updates to the actions/upload-artifact action"
- name: Upload artifact for deployment job
  uses: actions/upload-artifact@v4
  with:
    name: node-app
    path: |
      .
      !./src # Exclude the source code (optional)
      !./node_modules # Exclude the node_modules folder
```

{{< blockquote type="tip" text="I excluded the source files (`!./src`) from being published to the Azure Function as they are not required for running the functions. You are free to include/exclude those." >}}

## Fix the deployment dependencies issue

To fix the deployment dependencies issue, you must install only the production dependencies during the deployment. You can use the `--omit=dev` flag in the `npm install` command. Add the following step to the deployment job after the `actions/download-artifact` action to install the production dependencies.

```yaml title="Install the production dependencies during deployment"
- name: "Install production dependencies"
  shell: pwsh
  run: |
    pushd './${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}'
    npm i --omit=dev
    popd
```

## The complete updated workflow

Here is the complete updated workflow with the above fixes.

```yaml title="Updated azure-functions.yml"
name: Build and deploy Node.js project to Azure Function App

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  AZURE_FUNCTIONAPP_PACKAGE_PATH: "."
  NODE_VERSION: "20.x"

jobs:
  build:
    runs-on: windows-latest
    steps:
      - name: "Checkout GitHub Action"
        uses: actions/checkout@v4

      - name: Setup Node ${{ env.NODE_VERSION }} Environment
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: "Resolve Project Dependencies Using Npm"
        shell: pwsh
        run: |
          pushd './${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}'
          npm install
          npm run build --if-present
          npm run test --if-present
          popd

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: |
            .
            !./src # Exclude the source code (optional)
            !./node_modules # Exclude the node_modules folder

  deploy:
    runs-on: windows-latest
    needs: build
    environment:
      name: "Production"
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}
    permissions:
      id-token: write #This is required for requesting the JWT

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: node-app

      - name: "Resolve Project Dependencies Using Npm"
        shell: pwsh
        run: |
          pushd './${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}'
          npm i --omit=dev
          popd

      - name: Login to Azure
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.<client-id> }}
          tenant-id: ${{ secrets.<tenant-id> }}
          subscription-id: ${{ secrets.<subscription-id> }}

      - name: "Run Azure Functions Action"
        uses: Azure/functions-action@v1
        id: fa
        with:
          app-name: "to-delete-function"
          slot-name: "Production"
          package: ${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}
```