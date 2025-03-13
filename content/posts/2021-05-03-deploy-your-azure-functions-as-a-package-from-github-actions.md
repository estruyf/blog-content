---
title: "Deploy your Azure Functions as a package from GitHub Actions"
slug: "/deploy-azure-functions-package-github-actions/"
author: "Elio Struyf"
type: "post"
date: "2021-05-03T07:30:00.253Z"
draft: false
tags:
  - "GitHub"
  - "GitHub Actions"
  - "Azure Functions"
categories: []
comments: true
preview: "/social/71c2cd1d-c729-4172-b9da-83e2b9664bc8.png"
---

For [Squarl](https://squarl.com), I started to implement a couple of improvements for the back-end running on Azure Functions. I created these functions with TypeScript. In the past, I used webpack and later Azure Funcpack to bundle my functions to one file per function. That way, the host does not have to do all those read actions for retrieving the dependencies.

As I wanted to do the same thing, I read using Azure Funcpack is not supported/maintained anymore. Instead, you should use the **run from package** functionality.

## What is the **run from package** option?

Instead of bundling, you install your dependencies, build your solution, and compress the directory as a ZIP file. 

No significant changes, but now comes the cool part. The ZIP package gets used by the Azure Functions to run the function's logic. Instead of pushing your files to the `wwwroot` directory, the app service loads the ZIP package as a virtual directory.

This option improves the load times, deployment times, and more.

If you want to use this functionality, you will have to set the `WEBSITE_RUN_FROM_PACKAGE` setting on your function app.

The value for this can refer to where the function app can find the ZIP package, or it can just be `1`. This option is the recommended approach when running apps on Windows. 

When using `1` as the value, the function app will run the data from a local package. The ZIP package needs to be deployed to `d:\home\data\SitePackages` as this improves the cold-start.

{{< blockquote type="info" text="You can read more at: [run your Azure Functions from a package file](https://docs.microsoft.com/en-gb/azure/azure-functions/run-functions-from-deployment-package#adding-the-website_run_from_package-setting)" >}}

## How do you use it on GitHub Actions?

{{< blockquote type="important" text="Make sure to first set the `WEBSITE_RUN_FROM_PACKAGE` to `1` in the function app configuration." >}}

The steps which you need to perform to deploy your code to the functions app are the following:

- Check out your code
- Specify the Node.js version to use
- Install your dependencies
- Build your project
- Create the ZIP
- Perform the deployment with the `webapps-deploy` action

My GitHub Actions workflow looks as follows:

```yaml
deploy_az:
  runs-on: windows-latest
  name: "Deploy back-end"
  if: ${{ !contains(github.event.head_commit.message, '#frontend') }}

  steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '12'
        registry-url: https://registry.npmjs.org/

    - name: "Install and build"
      run: |
        npm ci
        npm run build
        npm prune --production

    # You can also make use of a ZIP GitHub Action
    - name: "Create ZIP"
      run: |
        Get-ChildItem $pwd | Compress-Archive -Destination .\backend.zip
      shell: pwsh

    - name: 'Deploy the ZIP to the app'
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_FUNCTIONAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_FUNCTIONAPP_PUBLISH_PROFILE_DEV }}
        package: ./backend.zip
```

Once this workflow ran. Your function app will now run from the package you deployed. You can verify this if you take a look in the `wwwroot` directory. This directory should now contain the files from the package. Be aware; this directory is now read-only.

{{< caption-new "/uploads/2021/05/package1.png" "The packages pushed to your Azure Function"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABTSURBVE3BYQqDMAyA0S82ie3ZBgMPOS8oc8aNVPaj4HvyWtd+RuDuZIeiipWJzOROH8+F471hbrTaGPbPzp+I0GpDOwI9IRM3Zfh9lYjA5xnTwgWFVRwGM4ViNwAAAABJRU5ErkJggg==" "1075" >}}

{{< blockquote type="info" text="The `packagename.txt` file contains the name of the ZIP package which needs to be used." >}}