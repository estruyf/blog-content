---
title: Automate the deployment of your SharePoint solution package in the App Catalog
author: Elio Struyf
type: post
date: 2017-08-14T08:34:12+00:00
slug: /automate-the-deployment-of-your-sharepoint-solution-package-in-the-app-catalog/
dsq_thread_id:
  - 6064682993
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Automation
  - Deployment
  - SPFx
  - VSTS
comments: true
---

Some time ago I wrote a couple of articles about how you can automate the process of releasing your SharePoint Framework solutions. This was achieved by two custom Gulp tasks to upload the [static assets](https://www.eliostruyf.com/automate-publishing-of-your-sharepoint-framework-scripts-to-office-365-public-cdn/) and [solution package](https://www.eliostruyf.com/automate-sharepoint-framework-solution-package-deployment/) and a complete [Visual Studio Team Services build and release pipeline](https://www.eliostruyf.com/configure-a-build-and-release-pipeline-for-your-sharepoint-framework-solution-deployments/).

This process already saved me a lot of time, but since some time ago, I noticed that I had to manually deploy the solution package to get the latest version activated. Of course, this is not ideal in your automated release cycle and had to be solved.

## The missing task in your automation process

Last week I fiddled around with the APIs and found a way to also automate this last step. For this, I created a new Node.js module called: **node-sppkg-deploy** - [https://www.npmjs.com/package/node-sppkg-deploy](https://www.npmjs.com/package/node-sppkg-deploy).

> **Info**: If you want to check out the code, or want to contribute - [https://github.com/estruyf/node-sppkg-deploy](https://github.com/estruyf/node-sppkg-deploy)

To make use of this module in your SharePoint Framework projects, you will have to create a custom Gulp task. A sample version is added in the readme file, but you can also find it in the **sp-dev-build-extensions** repository of SharePoint: [deploy-app-package](https://github.com/SharePoint/sp-dev-build-extensions/tree/master/gulp-tasks/deploy-app-package).

Once you implemented the Gulp task to deploy the solution packages, you can expect the following output:

{{< caption-new "/uploads/2017/08/081417_0816_Automatethe1.png" "Outcome of the deploy-sppkg Gulp task"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAcklEQVR4nGOorq4py22NDSkO8ct19wxw8fK0trOztLCwBAOG8PCwyKjQsJgwn0AfD08PB0cnRycnZzBwdHRkSExMiIiK8g8LDwwNc3Zzs7Wzt7GxsbUFIRsbG4bIyMiwiPDAAH9XZ2dbWzsra2uIsRDDAeUBIpDuj5RqAAAAAElFTkSuQmCC" "593" "227" >}}

For more information about adding this in your build and release pipeline, I have updated the article. You can check it out here: [Configure a build and release pipeline for your SharePoint Framework solution deployments](https://www.eliostruyf.com/configure-a-build-and-release-pipeline-for-your-sharepoint-framework-solution-deployments/).