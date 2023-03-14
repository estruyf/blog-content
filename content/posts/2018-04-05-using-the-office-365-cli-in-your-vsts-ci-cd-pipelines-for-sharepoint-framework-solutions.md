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

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff1.png" "Default build process" >}}

### Node tool installer task

This task allows you to specify the Node version to use during the process. In my definition, I am defining it to version 8.x, which is the version the SPFx generator supports. By changing the Node version during the process, I saw that my builds were completed 2 minutes faster than before with Node v6.

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff2.png" "Node tool installer set to v8" >}}

### npm install

Default task to install the project dependencies.

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff3.png" "npm install task" >}}

### Bundle the project

Gulp task to bundle the SharePoint Framework Solution.

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff4.png" "Bundling the solution" >}}

### Package solution

Gulp task to package the solution.

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff5.png" "Package the solution" >}}

## Using the Office 365 CLI in your build/release pipelines

The next things to define are the tasks that will use the Office 365 CLI. You can configure the tasks in the same build definition, or if you want to release it to multiple environments, it might be better to create some release definitions.

These are the tasks which you require to add and deploy the solution package to your tenant:

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff6.png" "Adding the Office 365 CLI" >}}

### Install the Office 365 CLI

This is an npm task which has been set to command **custom**. The custom command allows you to define the npm command and arguments so that it allows you to install the Office 365 CLI as follows:

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff7.png" "Install the Office 365 CLI" >}}

> **Important**: I made use of @next, because the v1.2.0 was still in beta.


### Connect to SP APP Catalog

This is a command line task which uses the Office 365 CLI to connect to the APP Catalog site with the following command: `o365 spo connect https://estruyfdev2.sharepoint.com/sites/catalog --authType password --userName $(username) --password $(password)`

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff8.png" "Connecting to the APP Catalog via the O365 CLI" >}}

> **Note**: username and password are variables which I configured in my build pipeline.


### Add the solution to SP APP Catalog

This is a command line task which adds the created SharePoint solution package to the APP Catalog with the following command: `o365 spo app add -p $(System.DefaultWorkingDirectory)/sharepoint/solution/my-solution.sppkg --overwrite`

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff9.png" "Adding the solution to the app catalog" >}}

### Create a PS-script to deploy the solution

For this task, I make use of the file creator task ([https://marketplace.visualstudio.com/items?itemName=eliostruyf.build-task](https://marketplace.visualstudio.com/items?itemName=eliostruyf.build-task)) which allows you to create a file during the build/release process. I use the task to create a PowerShell file which retrieves the list of available SharePoint apps, finds the one we are currently interested in, and deploys it.

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff10.png" "Script file creation" >}}

> **Note**: I use the title of the solution, instead of the filename. You can find this in the package-solution.json file.

This is the content of the file content:

{{< highlight bash "linenos=table,noclasses=false" >}}
$apps = o365 spo app list -o json | ConvertFrom-Json
$apps | ? Title -eq "my-solution-client-side-solution" | % { o365 spo app deploy -i $_.ID --skipFeatureDeployment}
{{< / highlight >}}


> **Info**: it may be that this task is no longer necessary in the future: [https://github.com/SharePoint/office365-cli/issues/404](https://github.com/SharePoint/office365-cli/issues/404)


### Run the PS-script

This is the last step in the process. You can use a PowerShell task to execute the script which was created in the previous task.

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff11.png" "Execute the script" >}}

### Build output

Here is the full build definition and its output:

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff12.png" "Complete build process" >}}

Here you can see a run which completed successfully:

{{< caption-legacy "uploads/2018/04/040518_1514_UsingtheOff13.png" "Complete build run" >}}