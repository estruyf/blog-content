---
title: Set Azure DevOps pipeline variables with Node.js scripts
longTitle: Setting variables in Azure DevOps pipelines using Node.js scripts
customField: ""
slug: /setting-variables-azure-devops-pipelines-node-js-scripts/
description: Explore setting Azure DevOps pipeline variables effectively using Node.js, ensuring seamless task transitions in your CI/CD workflows.
date: 2024-08-05T09:05:02.748Z
lastmod: 2024-08-05T09:05:03.134Z
preview: /social/70d35a63-f74b-4d9d-ad94-5b595b40a3bf.png
draft: false
comments: true
tags:
  - Azure DevOps
  - CI/CD
  - JavaScript
  - Node.js
type: post
fmContentType: post
---

Last week, when looking into how to configure the [Microsoft Teams reporter for Playwright](https://www.npmjs.com/package/playwright-msteams-reporter) on Azure DevOps in combination with the [Playwright Azure Reporter](https://www.npmjs.com/package/@alex_neo/playwright-azure-reporter), I ran into a problem where a variable that set in the Node.js task was not available in the subsequent tasks.

In the reporter's code, I noticed that the variable gets set using `process.env.VARIABLE_NAME = 'value'`. The issue with this code is that the environment variable will only be accessible in the current task. Future tasks will not be able to use it.

The Azure DevOps documentation states that you can set the variable with `task.setvariable` in a script, but you run this from bash or PowerShell.

In this post, I will show you how to set a variable in an Azure DevOps pipeline using a Node.js script.

## Using the azure-pipelines-task-lib package

While looking for a solution, I found Microsoft's [azure-pipelines-task-lib](https://www.npmjs.com/package/azure-pipelines-task-lib) package. This package provides a set of functions you can use in your Node.js scripts to interact with the Azure DevOps pipeline.

To use the package, you need to install it as a dependency in your project:

```bash {title="Install the azure-pipelines-task-lib package"}
npm install azure-pipelines-task-lib
```

### Setting a variable

After installing the package, you can use it in your Node.js script/tasks:

```javascript {title="Set a variable in an Azure DevOps pipeline using Node.js"}
import { setVariable } from "azure-pipelines-task-lib";

// Set the variable for future tasks
setVariable("VARIABLE_NAME", "value", false, false);
```

With this script, you can set the variable `VARIABLE_NAME` which is available in the subsequent tasks.

In your Azure DevOps YAML pipeline, you can use the script like this:

```yaml {title="azure-pipelines.yml"}
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
    displayName: 'Install Node.js'

  - script: |
      node script.js
    displayName: 'Run Node.js script'

  - script: |
      echo $(VARIABLE_NAME)
```

### Setting an output variable

The difference between setting a variable and an output variable is that the output variable is available for the future jobs in the pipeline.

```javascript {title="Set an output variable in an Azure DevOps pipeline using Node.js"}
import { setVariable } from "azure-pipelines-task-lib";

// Set the output variable for future jobs
setVariable("VARIABLE_NAME", "value", false, true);
```

In the YAML pipeline, you can use the output variable like this:

```yaml {title="azure-pipelines.yml"}
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
    displayName: 'Install Node.js'

  - script: |
      node script.js
    # Set a task name to reference the output variable
    name: 'passOutput'
    displayName: 'Run Node.js script'

  - script: |
      echo $(passOutput.VARIABLE_NAME)
```

I hope this post helps you to set variables in your Azure DevOps pipeline using Node.js scripts.