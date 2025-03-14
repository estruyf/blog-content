---
title: Automate publishing of your SharePoint Framework solution package deployment
author: Elio Struyf
type: post
date: 2017-02-03T15:06:22+00:00
slug: /automate-sharepoint-framework-solution-package-deployment/
dsq_thread_id:
  - 5518692798
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Gulp
  - SPFx
comments: true
---

This article is an addition to my previous one about how to automate the publication process of your JavaScript file to Office 365 public CDN.

> **Related article**: [Automate publishing of your SharePoint Framework scripts to Office 365 public CDN](Automate%20publishing%20of%20your%20SharePoint%20Framework%20scripts%20to%20Office%20365%20public%20CDN)

Not long after I had published my previous article, I got the following question on Twitter:

{{< caption-new "/uploads/2017/02/020317_1441_AutomateSha1.png" "Question on Twitter"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAb0lEQVR4nE3ByxGCMBAA0PTfCAVYAFxsgnwWdMBMNnxkyJJJosvoifdEdavqexMCTfOSS+G/8uV1p5yzAIvt4MclPPxuV0I/I6J17jmM720TL+s09K3S0oCBXiqtDUilDHQxRhGIjiOmlMrV54eZT4GVbvGBIcfjAAAAAElFTkSuQmCC" "353" "145" >}}

Let's split this up into the following questions:

1.  Can you automate the SPFx solution package upload process?
2.  Remove the app from the recycle bin?
For this article, I will only cover the first one. The second one is currently not possible with the [gulp-spsync](https://github.com/wictorwilen/gulp-spsync) or [gulp-spsync-creds](https://github.com/estruyf/gulp-spsync-creds) plugin.

## How to automate solution package upload process

In my previous post, I explained how you can make use of the [gulp-spsync](https://github.com/wictorwilen/gulp-spsync) or [gulp-spsync-creds](https://github.com/estruyf/gulp-spsync-creds) plugins to automate the upload of the JavaScript files to a SharePoint document library (which is specified to be used as an Office 365 CDN endpoint).

The same plugins can also be used to automate the solution package publication to your site. That way you do not have to do any manual actions anymore, everything can be done from your command prompt.

> **Important**: the only manual action is that is required, is after you first publish the solution package, that you manually trigger the deployment.

The task that you need to add in your gulp file (gulpfile.js) looks like this:

```javascript
const spsync = require('gulp-spsync-creds').sync;

build.task('upload-app-pkg', {
    execute: (config) => {
        return new Promise((resolve, reject) => {
            const pkgFile = require('./config/package-solution.json');
            const folderLocation = `./sharepoint/${pkgFile.paths.zippedPackage}`;

            return gulp.src(folderLocation)
            .pipe(spsync({
                "username": "<username>",
                "password": "<password>",
                "site": "https://<tenant>.sharepoint.com/<relative-catalog-site>",
                "libraryPath": "AppCatalog",
                "publish": true
            }))
            .on('finish', resolve);
        });
    }
});
```

{{< caption-new "/uploads/2017/02/020317_1441_AutomateSha2.png" "Upload app package task"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAc0lEQVR4nE3J0QrCMAyF4b6KE9O0Sdt0S9R2kzG98P3fSMZgCN/F4fxOrbZm41QysXAqTIWPwRS9ey7ptenn2/oiOYUQbjHALgLi1dkj93na3j0LYBgALyePg1OV1mxdZ9VCDOD39+SKUB2T3asI/Ycj/wBIoBpbKvFPRwAAAABJRU5ErkJggg==" "586" "264" >}}

Once you added this task in the gulp file, first run the command to package the solution: `gulp package-solution` (test) or `gulp package-solution --ship` (production). After the solution package is created, you can now run the new upload package command: `gulp upload-app-pkg` or `gulp upload-app-pkg --ship`.

{{< caption-new "/uploads/2017/02/020317_1441_AutomateSha3.png" "Output of the upload task"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAaklEQVR4nCXJQQ6DIBAFUM6ihoEPAw5MVQqVRe9/J5M2ebtnrqZz9jEa5wAQvIW3ARThAGuq5jH181U5i1RJ2TN757af1ehrb285GtdDVWsRTgnARm4ht5hSUx/nffer7SlTiDYyeaz/fgBuSxX3ctv9rgAAAABJRU5ErkJggg==" "584" "230" >}}

## One required manual action

As I mentioned, there is one manual action which you should execute. That manual action is the deployment of your solution package and can be done as follows:

*   Go to your app catalog site
*   Open the apps for SharePoint list

{{< caption-new "/uploads/2017/02/020317_1441_AutomateSha4.png" "Apps for SharePoint"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAM0lEQVR4nE3ESQ4AIAgDQP//WrfWECiYeHIO0/oiAPJIysyq+m97Y8xBkqCZuXtE+CPpAhbJOpUR6OGvAAAAAElFTkSuQmCC" "627" "155" >}}

*   Select the solution package
*   In the ribbon, select **files** -> **Deploy** and click on deploy
*   Once you have done this, can just update the package via the gulp task

## What with different environments: test, production?

Currently, the **ship** flag for the new upload package task has no added functionality **yet**. When you are working with test and production environments. To take advantage from this flag and automate the publication of your scripts and solution page to either your test or production.

This is what the updated task looks like to support the **ship** flag:

```javascript
const production = {
    "username": "<production-username>",
    "password": "<production-password>",
    "tenant": "<production-tenant>",
    "catalogSite": "<catalog-site-relative-path>"
}

const test = {
    "username": "<test-username>",
    "password": "<test-password>",
    "tenant": "<test-tenant>",
    "catalogSite": "<catalog-site-relative-path>"
}

build.task('upload-app-pkg', {
    execute: (config) => {
        return new Promise((resolve, reject) => {
            const pkgFile = require('./config/package-solution.json');
            const folderLocation = `./sharepoint/${pkgFile.paths.zippedPackage}`;

            return gulp.src(folderLocation)
            .pipe(spsync({
                "username": config.production ? production.username : test.username,
                "password": config.production ? production.password : test.password,
                "site": `https://${config.production ? production.tenant : test.tenant}.sharepoint.com/${config.production ? production.catalogSite : test.catalogSite}`,
                "libraryPath": "AppCatalog",
                "publish": true
            }))
            .on('finish', resolve);
        });
    }
});
```

If you now run the following command: `gulp upload-app-pkg`, it will upload it to your test tenant. With `gulp upload-app-pkg --ship` you can upload it to your production environment.

## Sample project

I have updated the sample project which I used in the previous post with this new task. You can find the sample project on the following GitHub repository: [upload to Office 365 CDN](https://github.com/estruyf/UploadToOffice365SPFx).