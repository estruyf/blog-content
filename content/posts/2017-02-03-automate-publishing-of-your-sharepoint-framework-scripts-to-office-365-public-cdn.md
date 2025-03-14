---
title: Automate publishing of your SharePoint Framework scripts to Office 365 public CDN
author: Elio Struyf
type: post
date: 2017-02-03T07:57:15+00:00
slug: /automate-publishing-of-your-sharepoint-framework-scripts-to-office-365-public-cdn/
dsq_thread_id:
  - 5517679496
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - CDN
  - Gulp
  - Office 365 public CDN
  - SPFx
comments: true
---

Last year Microsoft announce the Office 365 public CDN capability. This is CDN option from Office 365 is a great way for you to host your assets like images or JavaScript files. Most important, this is probably the easiest option for publishing your SharePoint Framework client-side web part assets. This is because it does not require you to setup anything on Azure. The only thing which is required is a document library which you specify in your tenant to be used in the CDN endpoint.

> **Info**: Office 365 CDN announcement - [https://dev.office.com/blogs/general-availability-of-office-365-cdn](https://dev.office.com/blogs/general-availability-of-office-365-cdn)
>
> &nbsp;
>
> **Important**: the Office 365 public CDN capability is still in developer preview.

Currently, the SPFx documentation only explains how to deploy your files to Azure CDN (Azure storage). I am sure the Office 365 CDN will also be covered once it is generally available.


> **Info:** deploy to Azure CDN - [https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/deploy-web-part-to-cdn](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/deploy-web-part-to-cdn)

[Waldek Mastykarz](https://blog.mastykarz.nl) already wrote a great article about it on his blog. In the article, he explains how you can publish your client-side web parts to this CDN option.

> **Info**: related article - [Publish SharePoint Framework client-side web parts to Office 365 public CDN](https://blog.mastykarz.nl/publish-sharepoint-framework-client-side-web-parts-office-365-public-cdn/)

As SPFx currently only has a built-in publishing mechanism for Azure CDN, it requires some manual action to get your web part assets published every time you do a new production build. Although the action is simple, it just involves that you upload the production bundle script to the SharePoint document library. You might want to automate this process, so that process works a bit smoother.

In the article, Waldek mentioned that you can make use of a gulp plugin called [gulp-spsync](https://github.com/wictorwilen/gulp-spsync) to automate this task. The gulp-spsync plugin allows you to upload files to a SharePoint document library from running a gulp task. This makes it the ideal plugin for automating the publishing process of your files to the Office 365 CDN.


## Gulp plugins


> **gulp-spsync**: this plugin made by [Wictor Wilén](http://www.wictorwilen.se), makes use of SharePoint add-in permissions (client ID and secret). If you want to make use of this plugin, be sure to follow the configuration steps explained on the GitHub page: [https://github.com/wictorwilen/gulp-spsync](https://github.com/wictorwilen/gulp-spsync)
>
> &nbsp;
>
> **gulp-spsync-creds**: this is a fork of the gulp-spsync plugin that I created. This version makes use of credentials (username and password) and has some other useful functionality built in. Read more about it on the GitHub repository: [https://github.com/estruyf/gulp-spsync-creds](https://github.com/estruyf/gulp-spsync-creds)


## Adding a custom upload to SharePoint task in your SPFx project

When you want to built-in this functionality into your SharePoint Framework project. You must follow the next steps:

*   Configure the Office 365 CDN for your Office 365 tenant. Check out the following article on how you can do this: [https://dev.office.com/blogs/general-availability-of-office-365-cdn](https://dev.office.com/blogs/general-availability-of-office-365-cdn)
*   Update the **write-manifests.json** file (which you can find in the **config** folder) with your **cdnBasePath**: `https://publiccdn.sharepointonline.com/<tenant host name>/<ID of the public CDN origin>/<sub-path under the origin>/`
*   Install the gulp plugin in your SharePoint Framework project. You can choose between the [gulp-spsync](https://github.com/wictorwilen/gulp-spsync) or [gulp-spsync-creds](https://github.com/estruyf/gulp-spsync-creds) plugins. For this article, I used the **gulp-spsync-creds** plugin which uses a username and password. You can install it by executing the following command: `npm install gulp-spsync-creds --save-dev --save-exact`.

> **Important**: another reason I used the **gulp-spsync-creds** plugin is because it has useful setting built-in which allows you to specify to the library path to where you want to upload your files. That way you do not have to do any changes in the folder structure that SPFx provides you. <del>I expect the gulp-spsync plugin will support this setting soon, as I did a pull-request to the project. You can check out the changes here: [https://github.com/estruyf/gulp-spsync](https://github.com/estruyf/gulp-spsync)</del> (pull request got merged, so the new version contains this option).


*   Open the **gulpfile.js** file and add the upload to SharePoint task in it:

**Default gulpfile.js contents**

```javascript
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.initialize(gulp);
```

**Gulpfile.js contents when using the _gulp-spsync-creds_ plugin**

```javascript
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const spsync = require('gulp-spsync-creds').sync;

build.task('upload-to-sharepoint', { 
    execute: (config) => {
        return new Promise((resolve, reject) => {
            const deployFolder = require('./config/copy-assets.json');
            const folderLocation = `./${deployFolder.deployCdnPath}/**/*.*`;
            return gulp.src(folderLocation)
            .pipe(spsync({
                "username": "<username>",
                "password": "<password>",
                "site": "https://<tenant>.sharepoint.com/<relative-site-path>",
                "libraryPath": "<document-library-URL>",
                "publish": true
            }))
            .on('finish', resolve);
        });
    }
});

build.initialize(gulp);
```

**Gulpfile.js contents when using the _gulp-spsync_ plugin**

```javascript
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const sp = require('gulp-spsync');

build.task('upload-to-sharepoint', { 
    execute: (config) => {
        return new Promise((resolve, reject) => {
            const deployFolder = require('./config/copy-assets.json');
            const folderLocation = `./${deployFolder.deployCdnPath}/**/*.*`;
            return gulp.src(folderLocation)
            .pipe(sp({
                "client_id": "<client-id>",
                "client_secret": "<client-secret>",
                "site": "https://<tenant>.sharepoint.com/<relative-site-path>",
                "libraryPath": "<document-library-URL>",
                "publish": true
            }))
            .on('finish', resolve);
        });
    }
});

build.initialize(gulp);
```


> **Info**: you are of course free to give the task another name. Currently the task name is: upload-to-sharepoint.

{{< caption-new "/uploads/2017/02/020317_0748_Automatepub1.png" "Check the new task in the gulp tasks overview"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAXElEQVR4nF3JMQ6AIAwAQN6iBhRQKJSCEtA4OPn/9xgmjcltxwJB2TFXIJrRLUZpoxurZyUFQ4R6uuumkLnFnotOjC8Wk1+3eBwFnJGSf681BkvJpdVbUJMcfv0AcKsVf52JfasAAAAASUVORK5CYII=" "418" "175" >}}

*   Update the username, password, site URL and libraryPath settings.

> **Info**: when you use the gulp-spsync plugin, these settings should be changed to the client ID and secret.

*   Run `gulp bundle --ship` to generate the production scripts. These scripts get created in the "**./temp/deploy**" folder.
*   Once the production bundle scripts have been generated. Run the upload to SharePoint task as follows: `gulp upload-to-sharepoint --ship`

{{< caption-new "/uploads/2017/02/020317_0748_Automatepub2.png" "Upload to SharePoint task output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAU0lEQVR4nCXC2w2AIAwAQEbRhAAttBVaeWii+2/lh5dzc9nzXjaUhJiAGZkRcwD0CbxTk3Gzrard1KQ1kgOJE3HKJbiz1zl1jCaSqQCiD3ELcf9/D0sQOGEXHsgAAAAASUVORK5CYII=" "627" "211" >}}

*   When the command finishes, you can go check out the document library. The document library should now contain the JavaScript files.

{{< caption-new "/uploads/2017/02/020317_0748_Automatepub3.png" "Files uploaded to the SharePoint library"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAY0lEQVR4nGXEwQ2DMAwF0KzFPOzAnRW4skhnQKrUMxI7xEntn8RxXUG59R1eGOZpXBc3I+YEzhAu4IL3dXi8ntuxd1UWYQCl1NZquwX/nPyPmbl7UFVKiYhijL9zzr13EQHwBXTNcIL1Q2ToAAAAAElFTkSuQmCC" "404" "178" >}}

*   Run the package solution command to create the app package to deploy it onto your environment: `gulp package-solution --ship`
*   Upload the ***.spapp** package file (underneath the "**./sharepoint/solution**" folder) to your catalog and you are good to go to start using your web parts from the Office 365 CDN.

{{< caption-new "/uploads/2017/02/020317_0748_Automatepub4.png" "SPFx web part loaded from the CDN"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAxUlEQVR4nAG6AEX/AGKbk6zIxP/+//T39/f5+ff5+fb4+Pb4+Pj6+vj6+gDW393d4uDb29zQ0dLY2trc3t/g4eLm5+jr7e7t7+8A8O7v7Ovr7evq9O/r9fDs9fDs9/Lu/Pj0/ffz9/TxAPHy8vXz8t/n7ajF2qfD2qvG26zH3bDM4azK4cnc6gD8/f7///+zzeYAVaoYb7YHZbEAXK0DXa0ATqZakccA/P39////z+DuYJrIlbjVcKPMXpnIZZzKWZbFmb7cWj6Qo0EmigMAAAAASUVORK5CYII=" "627" "368" >}}

{{< caption-new "/uploads/2017/02/020317_0748_Automatepub5.png" "Retrieved JS file in Chrome"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAQUlEQVR4nB3BQQqAMAwEwP7/b3oXwRZPxQo2i0k2iiB0Jk3rNW+67HK2BgEAM+MQEanr2/WT+8kl16MGwwZ3J/kDwBE4Y9S+hDMAAAAASUVORK5CYII=" "627" "110" >}}

## Steps after previous configuration steps

When you went through all the previous configuration steps. Things get much simpler. Whenever you want to publish a new production ready web part, the only steps to execute are: bundle, upload to SharePoint, and package your solution.

*   `gulp bundle --ship`
*   `gulp upload-to-sharepoint --ship`
*   `gulp package-solution --ship`

## What with different environments: test, production?

Currently, the **ship** flag for the new upload to SharePoint task has no added functionality **yet**. When you are working with test and production environments, it might be useful to take advantage of this flag to automate the publication of your scripts to either your test or production. In the sample project, you can find an example of how you can achieve this. When you want to do a upload to your test environment, you have to run `gulp upload-to-sharepoint`. To upload the scripts to your production environment, run: `gulp upload-to-sharepoint --ship`.

## Sample project

Here is a sample project in which the gulpfile.js file has been modified: [upload to Office 365 CDN](https://github.com/estruyf/UploadToOffice365SPFx).

## Updates

### 27/02/2017

Updated the Gulp code to support the general availability of SPFx.

### 21/04/2017

Updated the post with the GA announcement of the Office 365 CDN offering.