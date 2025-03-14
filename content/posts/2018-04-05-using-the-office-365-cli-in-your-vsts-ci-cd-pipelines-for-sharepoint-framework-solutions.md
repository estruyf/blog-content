---
title: Using the Office 365 CLI in your Azure DevOps CI/CD pipelines for SharePoint Framework solutions
author: Elio Struyf
type: post
date: 2018-04-05T15:53:53+00:00
slug: /using-the-office-365-cli-in-your-vsts-ci-cd-pipelines-for-sharepoint-framework-solutions/
dsq_thread_id:
  - 6596903982
categories:
  - Development
  - SharePoint
  - VSTS
tags:
  - Automation
  - CI/CD
  - Office 365 CLI
comments: true
---

Automating installation/deployment processes of any type of solutions is so great, and on Azure DevOps you can do this by a task-driven process. For many of the SharePoint Solutions I create, I have an automated CI/CD process behind the scenes running. So that once my code is ready, it will automatically deploy to my test environment.

Last year I documented my process in an article of how I achieved it: [Configure a build and release pipeline for your SharePoint Framework solution deployments](https://www.eliostruyf.com/configure-a-build-and-release-pipeline-for-your-sharepoint-framework-solution-deployments/). That process makes use of a couple of gulp tasks to upload the solution package and deploy in your tenant

## Office 365 CLI

The [Office 365 CLI](https://sharepoint.github.io/office365-cli/) is a cross-platform CLI which allows you to manage various configuration settings on Office 365. The CLI evolved so rapidly, but one thing what was missing for easily integrating it into a build/release pipeline was to authenticate via a username and password.

As of version 1.2.0 of the Office 365 CLI, it is now possible to authenticate by providing user credentials which makes it a lot easier to use the CLI in VSTS.

> <del>**Important**: at the moment this v1.2.0 is in beta, so you will need to install it via `npm i -g @pnp/office365-cli@next`.</del>

## Putting the default building blocks in place

The first things to create is your build pipeline/definition in which you will install the project dependencies and create an SPFx solution package. This process is similar as in the first article I referenced, the build definition looks like this:

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff1.png" "Default build process"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nG2MTQvCMBBE9///O6ngyatCu42bQPYjdVdJ2oNQH3OaxwxQLlzZzFS0R9XMPoOIAEwJV+x1N0dERVQqM2SiUgoLV67a9+NhwCLwSM8Xpa1t++Evb3eY7zdc5tbaWbs7lMuUca3C7v5H03XKiKIaEWf9BRJ3y6YHoU0IAAAAAElFTkSuQmCC" "422" "292" >}}

### Node tool installer task

This task allows you to specify the Node version to use during the process. In my definition, I am defining it to version 8.x, which is the version the SPFx generator supports. By changing the Node version during the process, I saw that my builds were completed 2 minutes faster than before with Node v6.

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff2.png" "Node tool installer set to v8"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZElEQVR4nG3NwQ6EMAhFUf7/T9tFaUqRgIAmamJn4lm+t7hARGOMOSczH5fM3NSnOquDqppZZkbEfa+AiFprZhYLfwQgYq1VRJb1BXd1u6jq/guYGTsSkYi4+3+7915KQcT8cgLV7szbu9XkZwAAAABJRU5ErkJggg==" "347" "247" >}}

### npm install

Default task to install the project dependencies.

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff3.png" "npm install task"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nGXPSw4EIQgEUO5/UtMLP5CIokDHdpLpcd4SqEoAImJmd1dVM3N3M0Me1EYThfowXfb6DRCREOecz8HH3FQhpXRdV+/9O30BZq61NubxS0RkCOScSymttaN/W+WIqKpHegMiQkIZ8h9d6RhjCCHltD8+3NjgB8xrMTBYAAAAAElFTkSuQmCC" "347" "312" >}}

### Bundle the project

Gulp task to bundle the SharePoint Framework Solution.

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff4.png" "Bundling the solution"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAa0lEQVR4nHXL2woDIQxFUf//T4UmGp0Uzc3SmUKlTDfnbXESADDzWsvd15lH1Kc+jnkMS2MMVY0IM7t4L7XWiEhEYsv9s4SIOWeqZHclAEBEEVHVHVR1zvl+l1J+7PtGxFrrX+69M/OtmdkLeF3qLprpjk0AAAAASUVORK5CYII=" "347" "264" >}}

### Package solution

Gulp task to package the solution.

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff5.png" "Package the solution"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAbUlEQVR4nG2NUQoDIQxEvf9NXQzEbNdgJ4mLlRZh+5if8GZIYmZVHWNExPjgEbVhJakqgIgws6V3UhWRWlfjh3+TSik559d5mhkeTM3M67ANAP3dExEdR76u5u67Xsw1EfXen25qEWmt/X0M4AZ4U+nzOQxRcAAAAABJRU5ErkJggg==" "347" "270" >}}

## Using the Office 365 CLI in your build/release pipelines

The next things to define are the tasks that will use the Office 365 CLI. You can configure the tasks in the same build definition, or if you want to release it to multiple environments, it might be better to create some release definitions.

These are the tasks which you require to add and deploy the solution package to your tenant:

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff6.png" "Adding the Office 365 CLI"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAj0lEQVR4nFWOvQrCMBRG+/5bnqBZfAknHUVExDrYDpKl4M8lubk/GSxVmoDBsx4O39f47UacQxGmBWae5/mTmaapWdn20nWiiiEgYowxpVR1a+3p3ImI915ViUhEqjbG7PYHZgYAzvzVfX8FePkQyjAiElHVw83dHxARmUVV35nybtHr4ziM0cOzbJfuV38BeqnEgtFrkJcAAAAASUVORK5CYII=" "258" "190" >}}

### Install the Office 365 CLI

This is an npm task which has been set to command **custom**. The custom command allows you to define the npm command and arguments so that it allows you to install the Office 365 CLI as follows:

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff7.png" "Install the Office 365 CLI"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nG3Nyw7DIAxEUf7/W4E4HgsMw6NKFlWU9myvPA4A3H3d9t5rbfNxVlob5iO4O8lvfgkiEmME0MnxI6iqAb33OeefDMDMaq2lFJLz4cpmJqeICFT52Oftuk4p5ZzlOLy114sP7S3MkLc38CcAAAAASUVORK5CYII=" "347" "234" >}}

> **Important**: I made use of @next, because the v1.2.0 was still in beta.


### Connect to SP APP Catalog

This is a command line task which uses the Office 365 CLI to connect to the APP Catalog site with the following command: `o365 spo connect https://estruyfdev2.sharepoint.com/sites/catalog --authType password --userName $(username) --password $(password)`

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff8.png" "Connecting to the APP Catalog via the O365 CLI"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdElEQVR4nE2GUQ7DMAjFcv+jdoFtCQ2Q8MK0bh+1LMtFRHrvYwwAmbl36sRpoRNjoqiqu2cmgH2RNwozM1Frzcz23gDiZhHp7rbWirWAiIhfrq5yVOZXGzZP9VN9mI//TF8o9HzXSpXoeNRK/Kjf6SLm0yM/vSiuUqa/7r0AAAAASUVORK5CYII=" "347" "209" >}}

> **Note**: username and password are variables which I configured in my build pipeline.


### Add the solution to SP APP Catalog

This is a command line task which adds the created SharePoint solution package to the APP Catalog with the following command: `o365 spo app add -p $(System.DefaultWorkingDirectory)/sharepoint/solution/my-solution.sppkg --overwrite`

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff9.png" "Adding the solution to the app catalog"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAe0lEQVR4nFXJMQ7DIAxAUe5/x1btkEolkARsjB1sqESW5g1/+Q4Rc86lFDMbE4kmakUUWB0RicgYo/d+7X9u3/ctbgURAESk925mqnZxAEBEzMy1iki7cyHEDNhUz7MxnzLxrKq65eMfz/dr+S7rth7oD/Ax+ZjCgVDbD5nLra7lX+j2AAAAAElFTkSuQmCC" "347" "204" >}}

### Create a PS-script to deploy the solution

For this task, I make use of the file creator task ([https://marketplace.visualstudio.com/items?itemName=eliostruyf.build-task](https://marketplace.visualstudio.com/items?itemName=eliostruyf.build-task)) which allows you to create a file during the build/release process. I use the task to create a PowerShell file which retrieves the list of available SharePoint apps, finds the one we are currently interested in, and deploys it.

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff10.png" "Script file creation"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhUlEQVR4nE3K0Q7DIAhAUf//O5u2WScIIoq4umzZmp7Xe4OIIKKZzb/SBpae2+Dqodbq7nPO8zyv4xKIGRG1fKiqu4+bwMwAkFISETMbY7xuAhHFGJk55yxfvfdfHCMcMW374wBEykAMiVlUWy/VqnmIlNdtX9Z9WbcnJEiUi4oo56KtvwFPfcoHIr3thAAAAABJRU5ErkJggg==" "347" "230" >}}

> **Note**: I use the title of the solution, instead of the filename. You can find this in the package-solution.json file.

This is the content of the file content:

```bash
$apps = o365 spo app list -o json | ConvertFrom-Json
$apps | ? Title -eq "my-solution-client-side-solution" | % { o365 spo app deploy -i $_.ID --skipFeatureDeployment}
```


> **Info**: it may be that this task is no longer necessary in the future: [https://github.com/SharePoint/office365-cli/issues/404](https://github.com/SharePoint/office365-cli/issues/404)


### Run the PS-script

This is the last step in the process. You can use a PowerShell task to execute the script which was created in the previous task.

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff11.png" "Execute the script"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcElEQVR4nE2NQQ7DMAgE+f9b3SQ2KQJ7DZVNW2XEAWkHlpi5tdZ7d/eI8Agx3ArpeBtIVTMD4Jt4QOd5lFLMzN3nBnvWgkk3s4jk3d/4egDVWlutWZHMOVNd8XVdr1KW1BpvzGyMkSqJiKo+H44fAD72h8zlkB3V3AAAAABJRU5ErkJggg==" "347" "241" >}}

### Build output

Here is the full build definition and its output:

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff12.png" "Complete build process"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAIAAACZwRr8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA+0lEQVR4nG3OW2rCQBiG4ex/CwWvsgC7A0ElIKWxYGmL8VBStDZz/A/JhDGTkgZqAn7M3cP/MtGhyIQpjLbWWu/9dbxokz+fii8ppFIqhNAOFkKIeJHo/cEQuaoaWtuzXi5klmn4m4VhIIQQmfnc7HfsHBNX40Dormcztd0aIgC4w7haYZ4DMwIgIhH99zv+ThJ5PJZ1XZUlETFz0zQ3fphMntI1EWmtEdEYQ0Q3juM4Xb8gopQSEYc/6Hg6fXx9ewcAKSURIeKIlRRKCa11b9baUXz5ITZHefoRZ2EKy+xbqgO4xlZeYRmln7C78FnYi2YBTpfX/in2Ct0vqnWMx5OoeXgAAAAASUVORK5CYII=" "257" "348" >}}

Here you can see a run which completed successfully:

{{< caption-new "/uploads/2018/04/040518_1514_UsingtheOff13.png" "Complete build run"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAATCAIAAAAmiQu5AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABL0lEQVR4nG2Q246EIBBE/f//26fdZOLOqIxKg4LQF5ANczdZngjVdZqqxoStB2on/FGhndBjLqXs+15KQcTmV12+vtvvUzeMc6fmcdIaQAOAMep6bYQ5Yhi02YKUPeUkIkIkIsk535TbiYLTGgfDveVAlf+A328pM/g4AM8r57r3KHOi2UVlGHx6iJ8yJbyu21lTB5Se9oNbu6AMa8//uCWz9nFcWXvxMUvaj+6M4xIq3FBv6F3Le7fd2okuQMqSDdV+CFbhi0yOlaEO0FGmDziBR7WwdgxOrpYGK86H189R2e2suTfUaboAdsD97D5qWcNga2vKkgkCW1rc0/0ItlR5dvLOnXLmtHtC41E7qRNObrlKjNhot5xnOo1Vu78eWltjGC0bz4MhGyr2NYOIf/f9JaPQIzHiAAAAAElFTkSuQmCC" "286" "531" >}}