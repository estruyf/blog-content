---
title: Gulp task to change environment settings in SharePoint Framework projects
author: Elio Struyf
type: post
date: 2017-06-20T20:01:11+00:00
slug: /gulp-task-to-change-environment-settings-in-sharepoint-framework-projects/
dsq_thread_id:
  - 5928072140
categories:
  - Development
  - SharePoint
tags:
  - SharePoint Framework
  - SPFx
comments: true
---

Since I wrote the article about how you could configure build and release pipelines in Visual Studio Team Services, I got a couple of people asking if it is possible to get different builds working on one tenant.

When you build something with the SharePoint Framework and are ready to move from development (workbench) to test or production. You have to upload the solution app package to the app catalog. As all the solution in it are shared across your tenant, you cannot have multiple of the same packages like for test and production at the same time.

A solution for this is to work on multiple tenants, but not everyone has this luxury. For this reason, I developed a new gulp task that can be used to develop and deploy multiple versions of the SharePoint Framework package to the same tenant. When you want to switch the environment / build, you can do this by running the new gulp task and specifying the target environment. This changes a couple of settings in your project:

*   Updates to the **package-solution.json** file:
    *   Solution package name
    *   Name of the sppkg package
    *   ID of the package
*   Update of the CDN location in the **write-manifests.json** file
*   Updating the IDs in the manifests of your web parts and extensions

The first time when you run the new gulp task it will create a backup of your settings. That also allows you to quickly change between environments by running the task again with the specified environment name. Once you ran it one time, you can bundle and package the solution. In case you want to switch to another environment, you first have to run this task before running the bundle and package-solution tasks. After that, you can add the solution package to the app catalog and your assets to the asset location.

The code for this gulp task can be found here:

{{< gist estruyf fb444cfd0de7b3aabe4cb4711ad2118b >}}

## Prerequisites

If you want to test out this gulp task, you first must install two new developer dependencies called: **uuid** and **decomment**. This module is being used to generate the new IDs for your different environments.

{{< highlight bash "linenos=table,noclasses=false" >}}
$ npm install uuid decomment --save-dev --save-exact
{{< / highlight >}}

Once it is installed, create a new file and call it **gulp-change-packaging-settings.json**. In the **gulpfile.js** file, add the following line of code before the **build.initialize(gulp);** line.

{{< highlight javascript "linenos=table,noclasses=false" >}}
require('./gulpfile-change-packaging-settings');
{{< / highlight >}}


## Using this gulp task

Once everything is in place, you can use the task as follows:

`gulp change-pkg-settings`

*   This is the basic task run and can be used the very first time to create a backup of your default settings. All the settings are stored in a **package-solution-env-settings.json** file.

{{< caption-legacy "uploads/2017/06/062017_1947_Gulptasktoc1.png" "gulp change-pkg-settings" >}}

`gulp change-pkg-settings --env test --cdnpath https://tenant.sharepoint.com/testassets`

*   With the **env** argument, you can specify the name of the build/environment
*   With the **cdnpath** argument (optional) you can specify the location of the JS files. Best is to make use of different libraries/locations per build/environment you are adding. That way you will not accidentally override a production asset.

{{< caption-legacy "uploads/2017/06/062017_1947_Gulptasktoc2.png" "gulp change-pgk-settings --env --cdnpath output" >}}

`gulp change-pkg-settings --check`

*   By using the check flag, you can see which environments are already defined. Plus, you can also see the environment which is currently in use.

{{< caption-legacy "uploads/2017/06/062017_1947_Gulptasktoc3.png" "gulp change-pgk-settings --check output" >}}

`gulp change-pkg-settings --env test`

*   This command can be used to quickly change the environment.

## Check stored settings

Every time you run the command, it will store the settings to a new file which can be found in the config folder: **package-solution-env-settings.json**

Here is an example of its contents:

{{< caption-legacy "uploads/2017/06/062017_1947_Gulptasktoc4.png" "Example output of the stored settings" >}}

## SharePoint Framework Extensions

Once this gulp task has been tested by a couple of people, I will add this task to the SharePoint Framework Extensions repository on GitHub: [https://github.com/SharePoint/sp-dev-fx-extensions](https://github.com/SharePoint/sp-dev-fx-extensions)