---
title: Configure a build and release pipeline for your SharePoint Framework solution deployments
author: Elio Struyf
type: post
date: 2017-05-15T09:52:43+00:00
slug: /configure-a-build-and-release-pipeline-for-your-sharepoint-framework-solution-deployments/
dsq_thread_id:
  - 5818860550
categories:
  - Development
  - SharePoint
tags:
  - Configuration
  - SPFx
  - VSTS
comments: true
---

In the previous article, I wrote how I achieved to setup a build and release pipeline to automate the publishing process of my SharePoint Framework app package and JS file to my environments.

> **Info**: [Use build and release pipelines in VSTS to automate your SharePoint Framework deployments](https://www.eliostruyf.com/use-build-and-release-pipelines-in-vsts-to-automate-your-sharepoint-framework-deployments/).

In this article, I will focus on explaining the steps in detail how you can achieve it yourself.

## Source control

It all starts with your source control system. For this I made use of a new Git version controlled project on Visual Studio Team Services. Once you have such a project, there is some configuration required in your project solution itself.

## Gulp tasks configuration

The first step is to create the custom gulp tasks that will be used by the release definition on VSTS.

### Update manifest task

The first task which I added to the gulpfile.js file is one to update the manifest JSON file. This file holds the CDN location to where you will upload your project files.

```javascript
build.task('update-manifest', {
  execute: (config) => {
    return new Promise((resolve, reject) => {
      const cdnPath = config.args['cdnpath'] '' "";
      let json = JSON.parse(fs.readFileSync('./config/write-manifests.json'));
      json.cdnBasePath = cdnPath;
      fs.writeFileSync('./config/write-manifests.json', JSON.stringify(json));
      resolve();
    });
  }
});
```

The task makes use of an argument **cdnpath **which you can pass as a command line argument. To call this gulp tasks, run: `gulp update-manifest --cdnpath https://<your-cdn-location>`.

### Upload script files and solution package + deploy the latest solution package version

Next up is to create the two tasks for uploading the JS scripts files and solution package to SharePoint and another task for deploying the uploaded solution package to get it activated. For this, I made use of the approach I explained in the following blog posts: [upload assets](https://www.eliostruyf.com/automate-publishing-of-your-sharepoint-framework-scripts-to-office-365-public-cdn/), [upload app package](https://www.eliostruyf.com/automate-sharepoint-framework-solution-package-deployment/) and [app package deployment](https://www.eliostruyf.com/automate-the-deployment-of-your-sharepoint-solution-package-in-the-app-catalog/).

One thing I changed to the gulp tasks is that it now also makes use of command line arguments which you can pass through by executing the gulp task. This way you can maintain the configuration of your environments within the build and release pipeline.

Here is are the steps to follow

1.  Install **gulp-spsync-creds** and **node-sppkg-deploy** as a developer dependency to your project: `npm install gulp-spsync-creds node-sppkg-deploy --save-dev --save-exact`
2.  Add the updated gulp upload tasks:

```javascript
const environmentInfo = {
  "username": "<production-username>",
  "password": "<production-password>",
  "tenant": "<production-tenant>",
  "cdnSite": "<cdn-site-relative-path>",
  "cdnLib": "<cdn-relative-path>",
  "catalogSite": "<catalog-site-relative-path>"
};

build.task('upload-to-sharepoint', {
  execute: (config) => {
    environmentInfo.username = config.args['username'] '' environmentInfo.username;
    environmentInfo.password = config.args['password'] '' environmentInfo.password;
    environmentInfo.tenant = config.args['tenant'] '' environmentInfo.tenant;
    environmentInfo.cdnSite = config.args['cdnsite'] '' environmentInfo.cdnSite;
    environmentInfo.cdnLib = config.args['cdnlib'] '' environmentInfo.cdnLib;

    return new Promise((resolve, reject) => {
      const deployFolder = require('./config/copy-assets.json');
      const folderLocation = `./${deployFolder.deployCdnPath}/**/*.*`;

      return gulp.src(folderLocation)
        .pipe(spsync({
          "username": environmentInfo.username,
          "password": environmentInfo.password,
          "site": `https://${environmentInfo.tenant}.sharepoint.com/${environmentInfo.cdnSite}`,
          "libraryPath": environmentInfo.cdnLib,
          "publish": true
        }))
        .on('finish', resolve);
    });
  }
});

build.task('upload-app-pkg', {
  execute: (config) => {
    environmentInfo.username = config.args['username'] '' environmentInfo.username;
    environmentInfo.password = config.args['password'] '' environmentInfo.password;
    environmentInfo.tenant = config.args['tenant'] '' environmentInfo.tenant;
    environmentInfo.catalogSite = config.args['catalogsite'] '' environmentInfo.catalogSite;

    return new Promise((resolve, reject) => {
      const pkgFile = require('./config/package-solution.json');
      const folderLocation = `./sharepoint/${pkgFile.paths.zippedPackage}`;

      return gulp.src(folderLocation)
        .pipe(spsync({
          "username": environmentInfo.username,
          "password": environmentInfo.password,
          "site": `https://${environmentInfo.tenant}.sharepoint.com/${environmentInfo.catalogSite}`,
          "libraryPath": "AppCatalog",
          "publish": true
        }))
        .on('finish', resolve);
    });
  }
});

build.task('deploy-sppkg', {
  execute: (config) => {
    environmentInfo.username = config.args['username'] '' environmentInfo.username;
    environmentInfo.password = config.args['password'] '' environmentInfo.password;
    environmentInfo.tenant = config.args['tenant'] '' environmentInfo.tenant;
    environmentInfo.catalogSite = config.args['catalogsite'] '' environmentInfo.catalogSite;

    const pkgFile = require('./config/package-solution.json');
    if (pkgFile) {
      // Retrieve the filename from the package solution config file
      let filename = pkgFile.paths.zippedPackage;
      // Remove the solution path from the filename
      filename = filename.split('/').pop();
      // Retrieve the skip feature deployment setting from the package solution config file
      const skipFeatureDeployment = pkgFile.solution.skipFeatureDeployment ? pkgFile.solution.skipFeatureDeployment : false;
      // Deploy the SharePoint package
      return sppkgDeploy.deploy({
        username: environmentInfo.username,
        password: environmentInfo.password,
        tenant: environmentInfo.tenant,
        site: environmentInfo.catalogSite,
        filename: filename,
        skipFeatureDeployment: skipFeatureDeployment,
        verbose: true
      });
    }
  }
});
```


> **Info**: whole content of my [gulpfile.js](https://gist.github.com/estruyf/60b4228dcbc6a8ca79bf648753bc4532). I also allowed you to specify these configuration parameters from within the gulpfile. So you can test things out publishing files to your development environment.
>
> &nbsp;
>
> **Info**: these tasks are also available in the sp-dev-build-extensions repository: [https://github.com/SharePoint/sp-dev-build-extensions](https://github.com/SharePoint/sp-dev-build-extensions).

Once these tasks are in place, the tasks can be executed with the following commands:

*   `gulp upload-to-sharepoint --ship --username $(username) --password $(password) --tenant $(tenant) --cdnsite $(cdnsite) --cdnlib $(cdnlib)`
*   `gulp upload-app-pkg --ship --username $(username) --password $(password) --tenant $(tenant) --catalogsite $(catalogsite)`
*   `gulp deploy-sppkg --ship --username $(username) --password $(password) --tenant $(tenant) --catalogsite $(catalogsite)`

> **Info**: these commands already contain the variables which I am using in my release tasks. If you leave out these arguments, it will take the development configuration from within the file.


## Build definition configuration

In your source control project on Visual Studio Team Services, go to the **build & release** section. There you will have the option to create a new build definition. When you create a new definition, you will be presented with a couple of templates. In the template option, you should have the **NodeJS with Gulp** template. This gives you a good start.

{{< caption-new "/uploads/2017/05/051517_0930_Configureab1.png" "NodeJS with Gulp template"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAR0lEQVR4nBXBMQ6AIAwFUO5/MR10MEYnCiVEf9XUgWJwNL7n6jRfXU9bDoEiR07syXPiYqW9zdVl1WHErcAOgZzyO0RV7bEPaJM1obA7ujEAAAAASUVORK5CYII=" "366" "75" >}}

To the template, you should add two additional gulp tasks, which you can do by clicking on the add task link.

{{< caption-new "/uploads/2017/05/051517_0930_Configureab2.png" "All build definition tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAi0lEQVR4nGXMywrCQAyF4Xn/N5OCSzeiIBRkmrmkc0mnZJKK0IW1P2f3wTEjZIsL5BXSd1NqkNdA3VPHhc3o88tGyKuvPdA+X7urPVQ27fEsMXJnVdk23X4SFZMuQ7Q2lUpEIvLPebjiNJWT7Uz3GzqoRKqH550R385BCKGUosdExMxzQsTWGjOf+QN6TOetralYPQAAAABJRU5ErkJggg==" "511" "429" >}}

For the build definition, you should only have to configure the gulp tasks, all other tasks can be like they are configured by default.

**Update manifest for the CDN - task configuration**

The CDN update task needs to be configured as follows:

*   **Gulp task**: update-manifest
*   **Arguments**: --cdnpath your-cdn-location

{{< caption-new "/uploads/2017/05/051517_0930_Configureab3.png" "Manifest task configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAeElEQVR4nDXKOw7CMAwA0Nz/ckzMSKhCCLVJ6viD7dhBDH3zKyTibjFnzJkZay1mZmFzU9NSn1snEYuvp3iSZYfRWhMRVS3v2/3V8RjaJE6JD869w4DT3M2s4PYgopW5LkRUWyUmYiqtVzhBzSIz8r8G4n7sMAAJf7jDkCi8Rtw9AAAAAElFTkSuQmCC" "833" "455" >}}

**Bundle the project - task configuration**

The project bundling tasks needs to be configured as follows:

*   **Gulp task**: bundle
*   **Arguments**: --ship

{{< caption-new "/uploads/2017/05/051517_0930_Configureab4.png" "Bundle task configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAgklEQVR4nE2OvQoDMQyD8/7v1qEdOne7Fu6cs+Mk/sFuCXQ4IQ0C8aFCvauqma+4Z2ZGjjnMVy0MIDK/F2UmVGhMYlKOx/MgRp7TY3oOz25xACChuZXtdn+9YW8GI2DE3mMjPxFFRE0L1U8jMpUrv9bKnRecWhMRd4/16W8krOda/AAPW61ehjPdywAAAABJRU5ErkJggg==" "745" "453" >}}

**Package solution -**** task configuration**

The last task in your build definition is the package solution task. This one needs to be configured as follows:

*   **Gulp task**: package-solution
*   **Arguments**: --ship

{{< caption-new "/uploads/2017/05/051517_0930_Configureab5.png" "Package solution task configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAhElEQVR4nE2MuQ7CMBAF/f+/RkENDV0UxXbiY1f2nkEEITF6mu5NqIBEJCJfu7uZjTFYmIVD3zZENDP/I+XUeiOmAI/nnEOYztPPH0c5APrnvdzur3WPnTNqRo2gS+X9KIjAIiGlNebSYJA6qU/1wZb3DABEFBCRicz0il9za62WUgDhDRWVrVbWjDOOAAAAAElFTkSuQmCC" "745" "450" >}}

Save this configuration, but it is not done yet.

**Build definition trigger configuration**

To automatically trigger the build process when you do a push to the master branch source control system, you should configure this under the **triggers** tab:

{{< caption-new "/uploads/2017/05/051517_0930_Configureab6.png" "Automate continuous integration by enabling the trigger"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAjElEQVR4nGWMWw6DMAwEc//z9QqFSiUkwbG9dihUgPpktF+e9QYAwhwnqQLdcfflRWCuKaWUc/O2ngiXju9jWZfl7DZNueScWMSbz4/5L6HVqe+u3a0vU6FKrKymagoDDAHucRxgIKI4RlExN3NTbI3g7iTbSXYO96OHlFnlWDuWP+OttVIrDO+/7zwBq3YFhi0dg9sAAAAASUVORK5CYII=" "484" "430" >}}

On the trigger page, just enable the **continuous integration trigger**. Once this is done, should do one more check.

Underneath the options tab, check that the **default agent queue** is set to **hosted**. If this is not the case, it might happen that the agent which is going to run the build process, does not support npm and gulp and eventually, the process will fail. When you selected the gulp template, this should already be configured correctly.

{{< caption-new "/uploads/2017/05/051517_0930_Configureab7.png" "Hosted agent queue"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAARklEQVR4nE2JywqAMAwE+/8fWg81rc3m0cSLFEFchoFhSz0qdVLTyVNUVqw/hTq1s41rmJu7f8fO5YWZAWRm3lvvIgICCB6VR1YzhzLypAAAAABJRU5ErkJggg==" "381" "107" >}}

If not, change it and finally save these settings and your build definition should now be completed. If you want, you can test it out by pushing a new commit to your master branch. This should automatically trigger the build process to start up.

## Release definition configuration

Once the build definition is set up, the last step is to configure your release definition.

> **Info**: if you want, you can also configure everything from within the build definition itself. By splitting things in a build and release definition you have better control over your environment publishing process. Choice is up to you.

The first step is to go to the **releases** tab, which you can find under the **Build & Release** tab, and create a new release definition.


{{< caption-new "/uploads/2017/05/051517_0930_Configureab8.png" "Create a release definition"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAnUlEQVR4nBXC7Q6CIBQAUN7/2ay1+lPpFBM/LtAFgXlRUVpnh0klOa8B7bXR5WhAyYY3xhrectELRkQ+hN4stQzKRYqRaFnX1TmntWZp3wPF+2jArTnndP4fx5lSQkQWIxnrbvxbVHCppuI9FBV8APd98z6wbdskgEY7ggKNOAdlPdo5BE9ELOcs5+XRqqKcXkI/+dANUyf6Tgjv/Q+iaqalScF3owAAAABJRU5ErkJggg==" "242" "143" >}}

Best is to start with an **empty** template and click next. On the next page, you should choose the newly configured build definition as the **source** for to be used for the release definition. Also, check the **continuous deployment** option and click create.


{{< caption-new "/uploads/2017/05/051517_0930_Configureab9.png" "Release definition configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAhklEQVR4nGXLzQ3CMAxA4ezEfIzBDtyZggMjlBOhIUobpXVs59dISIhWfNenp5x9mfFpjNFahxBkT412AuJSS84lpUREzNz7Nx9Ow/EykH0Ack6ptVZr/d3nm7ne54wRibdBRHrvqmBYvFsBRKT9UWFZ3TR774mo731yTBgBIOIGESEiM78BjpfI36k8eqgAAAAASUVORK5CYII=" "477" "326" >}}

Once the release definition is created, click on the environment menu and choose to **configure variables**.

{{< caption-new "/uploads/2017/05/051517_0930_Configureab10.png" "Configure variables"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAh0lEQVR4nDXIyxKCIBQAUP7/03otmpKFg1nqQDzkilwUCWnRdJaHNHo+s4FyO4TCIMGyCWUGl5+QcMuklu5QsUv9une615Ma7VspIQ3GNIeVMIO3XlNu2bjUcr42/EjbE22rTj+kJ5iyix+/5bAXB5PgQioNkzOj9R5J+dtLyYgOIMb1N0sIX6G9i294FmysAAAAAElFTkSuQmCC" "283" "130" >}}

By setting up variables for the release, it makes your commands easier as you can easily change them for all your environments. These are the variables you must create:

*   **username**: the username that will be used to upload the files to SharePoint;
*   **password**: the password for the account;
*   **tenant**: **only** the tenant name, will be used to concatenate your SharePoint URL: https://<**tenant**>.sharepoint.com
*   **cdnlib**: name of the CDN library on the CDN site;
*   **catalogsite**: relative path to your APP catalog site;
*   **cdnsite**: relative path to the site on which you CDN library is located. If it is the root site, you do not have to specify this.

{{< caption-new "/uploads/2017/05/051517_0930_Configureab11.png" "Variables to configure"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAjUlEQVR4nDXMOw7CMBBFUe9/N+yAkpYKIYREEVvIhJDxZ5Kxx34ofE5/r5mJXvP8+mBmAOhdVQEQkQkhumegsGFmlsq1994BxBjNOI4pRVWdpimEsCzrKlVKAZBTMt57Iqq1eu+ZubVWRETWX739RACo6vcJQFovQM7ZWGudc/ZvGOzj7vbH2+5wvZxPb8FzquCw7fffAAAAAElFTkSuQmCC" "647" "358" >}}

**Configure the extract files task**

The first task you must add to the definition is the **extract files** task. Configure it as follows:

*   **Archive file patterns**: **/*.zip
*   **Destination folder**: $(System.DefaultWorkingDirectory)/build/release

{{< caption-new "/uploads/2017/05/051517_0930_Configureab12.png" "Extract files task configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAXklEQVR4nG3MMQ7DMAxDUd//sHXQ2KUkk3SQFOjUPxCcXnv1/j6HJNv7yTZJALZbRFRVRM45AeADknvvRVFuvffjOGIpM6sqM0lKWs+2MU4A1G3+8O+/8RE1Y+lflC9Zr5LkQaC+igAAAABJRU5ErkJggg==" "600" "284" >}}

This task will extract the contents of the generated build package to a release folder. This is also the location we have to link to in the gulp tasks.

**Upload to SharePoint document library**

Add a gulp task to your release definition and configure the task as follows:

*   **Gulp file path**: $(System.DefaultWorkingDirectory)/build/release/s/gulpfile.js
*   **Gulp tasks(s)**: upload-to-sharepoint
*   **Arguments**: --ship --username $(username) --password $(password) --tenant $(tenant) --cdnsite $(cdnsite) --cdnlib $(cdnlib)

{{< caption-new "/uploads/2017/05/051517_0930_Configureab13.png" "Upload to SharePoint document library task configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAb0lEQVR4nF3MwQoDIRADUP//R9dVFqfqdGRMpOihhb5LDiEJz/OklGK8rnibDdvGnFNVQYa3Ksnee4yxlCLyEpHeu9rgWqEdJAFgYh7uPoFdi0jOGQC/Ftfa6WCotbbWfLfrz16bmbsD+/x3cID8ANq6rokZlQNtAAAAAElFTkSuQmCC" "587" "331" >}}

**Upload app package to SharePoint**

Add the task to upload the app package to the SharePoint app catalog site. For this you need to add another gulp task, and configure it as follows:

*   **Gulp file path**: $(System.DefaultWorkingDirectory)/build/release/s/gulpfile.js
*   **Gulp tasks(s)**: upload-app-pkg
*   **Arguments**: --ship --username $(username) --password $(password) --tenant $(tenant) --catalogsite $(catalogsite)
{{< caption-new "/uploads/2017/05/051517_0930_Configureab14.png" "Upload app package to SharePoint task configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAZklEQVR4nGXM2woDIQwEUP//S4WAtSauGmdCcWEf2p7XuaRSiojknEt5rbXmDcA1BiNS751kNxOR96ObXXOdWFWbtoggicfeG2REpFqriGBv/nEwtdZM1cG7/eWczzncHTjPP2uQHw2gruCmQMj7AAAAAElFTkSuQmCC" "587" "335" >}}

**Deploy the solution package**

The last task to configure is the one to deploy the solution package in the App Catalog site. For this you need to add another gulp task, and configure it as follows:

*   **Gulp file path**: $(System.DefaultWorkingDirectory)/build/release/s/gulpfile.js
*   **Gulp tasks(s)**: deploy-sppkg
*   **Arguments**: --ship --username $(username) --password $(password) --tenant $(tenant) --catalogsite $(catalogsite)

**Other configuration steps**

Right now, you did all the task configuration that is required for this release definition. To be able to run the release definition correctly, there are a couple of extra configuration steps.

Go to **Artifacts** and check the default created source and edit it and rename the source alias to **build**.

{{< caption-new "/uploads/2017/05/051517_0930_Configureab15.png" "Set the source alias to build"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAeklEQVR4nGXESRLCIBAAQP7/R7gEDIGppJiFyG7pScs+tAKA4zgA4Lqu9Ue11tZac05mzjmXL7VWdZ4nIrKI9945F2MkJsnCwvd9KyIiltIGIvYxxvg037XeVEoJWUqpmPD5q/eujDZaG2NMjDGE4KzdNuuc3fcHEb0A2CuraILv//MAAAAASUVORK5CYII=" "404" "247" >}}

Go to the **Triggers** tab and set the branch in your continuous deployment trigger to your master branch (or any other if you are configuring it for other environments).

{{< caption-new "/uploads/2017/05/051517_0930_Configureab16.png" "Set the trigger to the master branch"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAQklEQVR4nCXJQQrAMAwDwfz/p0npoaZYdoyVgjqHRaAxr3utaWYhJI9ocLzu9hiALd3dpMImB6Sq/m9nIhJAZHrWB9lmV4wNcpUvAAAAAElFTkSuQmCC" "587" "194" >}}

That was it, now your release definition is completed. After this step, it is time for you to test it out by pushing a new release to git and check that the build and release process get automatically triggered.

## Updates

### 14/08/2017

Added the Gulp task to automate the deployment of the solution package.