---
title: 'Quick tip: How to use dynamic variable groups in Azure DevOps YAML pipelines'
slug: /quick-tip-dynamic-variable-groups-azure-devops-yaml-pipelines/
author: Elio Struyf
type: post
date: 2020-02-20T19:14:09.318Z
draft: false
tags:
  - Azure DevOps
  - Development
categories: []
comments: true
---

The preferred way to implement pipelines these days in Azure DevOps is via `YAML`. Which makes the pipeline part of your code and is automatically version controlled.

When you were used to the classic way of creating release pipelines, you might have used environment scoped variables. These scoped variables were great to specify to which environments you wanted to provision/install/deploy/... your solutions. Like when you were releasing DEV solutions, it would use the DEV environment credentials.

## Variable groups

In the YAML pipelines, the best way would be to make use of variable groups, but these still support only one environment.

A way to support these different environments per branch would be by creating a variable group per branch/environment.

{{< caption-new "/uploads/2020/02/dynamic-1.png" "Variable groups"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAACjSURBVHXBQYqEMBBA0V+m7Bg1SIv3P6DiQnAhY1UcezcM7Xtynue1LAshBIZhIMbIN8ptmiZEBBHhiXKb5xkzo2kaPvq+x90xM0op5JxRbpreiDs/7ogIBSWlF6UUqqpCKkH3feclF/mdUVWeaNu2hBD4cHee6LquqCrujojQdR193/Of5pxJKSEiXNeFiPCNmhnbtmFm1HXNcRyM40iMkb9+ATXiPBOaYTA2AAAAAElFTkSuQmCC" "231" >}}

## Using dynamic variable groups

The solution to use dynamic variable groups is by using expressions.

> **Info**: More information about these expressions can be found here - [Azure DevOps Expressions](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/expressions?view=azure-devops).

Here you can see an example:

```yaml
variables:
- ${{ if eq(variables['build.SourceBranchName'], 'master') }}:
  - group: <name>-master
- ${{ if ne(variables['build.SourceBranchName'], 'master') }}:
  - group: <name>-dev
```

The funny side note, yesterday [Sebastien Levert](https://twitter.com/sebastienlevert) and I were figuring out how we could make this work. One critical thing we forgot was the `-` in front of the expression. Once we found the solution, Sebastien said that he was going to blog, as he has not done it, and I needed the same approach today, it is time to share it.

## Runtime parameters

Another approach would be to make use of a new feature called **runtime parameters**. These runtime parameters allow you to have more control over the parameter values you pass to your pipelines.

> **Info**: You can find more information about the **Runtime Parameters** here: [https://docs.microsoft.com/en-us/azure/devops/pipelines/process/runtime-parameters?view=azure-devops](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/runtime-parameters?view=azure-devops)

```yaml
parameters:
- name: groupSelection
  displayName: Group Selection
  type: string
  default: <name>-dev
  values:
  - <name>-master
  - <name>-dev

variables:
 - group: ${{ parameters.groupSelection }}
```

*Thanks to Sven Saatkamp for providing this alternative solution*