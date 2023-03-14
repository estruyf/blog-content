---
title: Passing arguments with custom Gulp tasks for SharePoint Framework projects
author: Elio Struyf
type: post
date: 2017-06-09T08:28:35+00:00
slug: /passing-arguments-with-custom-gulp-tasks-for-sharepoint-framework-projects/
dsq_thread_id:
  - 5894052721
categories:
  - Development
  - SharePoint
tags:
  - SharePoint Framework
  - SPFx
comments: true
---

If you ever created Gulp tasks which made use of arguments to specify certain configuration settings to be used during the execution. You probably made use of a module called [yargs](https://www.npmjs.com/package/yargs).

The yargs module makes it easy to check if arguments are provided and to retrieve their values.

If you are building your own custom Gulp tasks for your SharePoint Framework projects, you do not require this module. The Gulp build engine which is created for SharePoint Framework automatically processes all the provided arguments and provide them with the config object in your task.

By default, if you create a new Gulp task for SPFx, you start with the following code:

{{< highlight javascript "linenos=table,noclasses=false" >}}
build.task('upload-to-sharepoint', {
  execute: (config) => {
    // Your task code
  }
});
{{< / highlight >}}

The config object has a property **args** that contains all your provided arguments. So if you called the following command for example: `gulp upload-to-sharepoint --username elio`. You could retrieve the username argument like this in the Gulp task:

{{< highlight javascript "linenos=table,noclasses=false" >}}
build.task('upload-to-sharepoint', {
  execute: (config) => {
    const username = config.args['username'];
    // The rest of your task code
  }
});
{{< / highlight >}}

Hope this helps you extending your SharePoint Projects.