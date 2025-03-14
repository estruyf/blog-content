---
title: Use build and release pipelines in Azure DevOps to automate your SharePoint Framework deployments
author: Elio Struyf
type: post
date: 2017-05-08T17:27:55+00:00
slug: /use-build-and-release-pipelines-in-vsts-to-automate-your-sharepoint-framework-deployments/
dsq_thread_id:
  - 5798359815
categories:
  - Development
  - SharePoint
tags:
  - SPFx
  - VSTS
comments: true
---

A while ago I wrote two articles about how you can automate the publishing process of your SharePoint Framework scripts and solution package via custom gulp tasks.

> **Info**: you can find the articles [here](https://www.eliostruyf.com/automate-publishing-of-your-sharepoint-framework-scripts-to-office-365-public-cdn/) and [here](https://www.eliostruyf.com/automate-sharepoint-framework-solution-package-deployment/).

These gulp tasks are already a great step forward but still, requires you to manually launch these gulp commands to push everything to your environments. For publishing, this requires you to execute the following steps: bundle, package, upload scripts, and package.

A couple of weeks ago, when I was setting up a build pipeline for another project, I saw that the gulp and npm build tasks became available in preview on Azure DevOps. These tasks are a great way to automate the deployment process. So, that you only have to commit and push your code (if you use Git of course).

Something else which is great about it is that you can set up multiple builds and release pipelines which allow you to target various environments (development, test, production, ...).

Here is an example of the build process:

{{< caption-new "/uploads/2017/05/050817_1701_Usebuildand1.png" "Build pipeline / tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAA7ElEQVR4nGN4+fHb1x+/H75/cuP13Ssvb157cfX2m+u331x/+PHuk68PGD5++vj967d1B3cs2b19xd4dS3ZvW7p3x9J9O5fs3bF47w6Gdx/ef/78ObyiT8o1RcknS9otTdA2kccijtcyjss8huHHzx+/f/8OrWrncgxlsgxmNA9gMA5iMAxhMAwGof/////79y+perKUQwqjQRijQSgjSA6GINJRNd1CLtGc1uEs5iHMxiHMRmHMxiAElbYuKWJwcmJ28WNw8mYwDWDQ8GPQ8AEhiHTuzBkWhaXOpXWOZTV2OfW2SXW2SbW2SbUAq9l5NzQwC8cAAAAASUVORK5CYII=" "629" "475" >}}

In my case, when I push a new release to Git, the build process automatically picks it up and executes the following tasks:

*   Get all files
*   Get all dependencies via the npm install command
*   Update the CDN URL in the manifests JSON file. For this, I created a simple gulp tasks. That way you can change the URL per build task. Here is the code snippet of the task:

```javascript
const fs = require('fs');

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


*   Bundle the project via the `gulp bundle --ship` command
*   Package the project via the `gulp package-solution --ship` command
*   When the project is bundled and the solution package is created, everything will be zipped and published ready for release.

{{< caption-new "/uploads/2017/05/Screenshot-2017-05-05-11.17.41.png" "Build tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAn0lEQVR4nHWPzQrCMBCE8/6PpuLRiyhIL5o26aZxN9H8jDQFEUsX5rAzH8Ou6gaPhwvo/Qt6il/Nu5UMIxmjZKjOTLhpaoHh1ELLeYE4LR6/ocLliieNSCmhlgKg4n9qrVDT7gDSGp4ZIoJcSkN/VWbQ749w/QAOAaU1rqc1yvkEZwawSDM2QaI7rDUgIjDzNuich3MOMcbloVpXmk/6AIWZN5vh0/EvAAAAAElFTkSuQmCC" "647" "543" >}}

Once the build process is completed, the release task will automatically start the continuous deployment feature.

> **Info**: if you want you can configure everything in the build pipeline, but when you are working with multiple environments. You would most probably like it to set it up via a release pipeline.

Here you can see the output of my production deployment:

{{< caption-new "/uploads/2017/05/050817_1701_Usebuildand2.png" "Release pipeline"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAARUlEQVR4nAXBOQ6AMAwEwPz/S1DDGyiR0oClGHLhxcsxE2KMIkLSYKWXZh0ASQDuHo7m183vebe8D8s4rXPSlM+sqrXWH+JpOFiVwOq6AAAAAElFTkSuQmCC" "480" "80" >}}

It is not as fancy as the build output, but it does the following tasks:

*   Retrieve the zip package (this is done automatically, so you do not have to configure it)
*   Extract the files from the retrieved package
*   Upload the SharePoint Framework project bundle files to the SharePoint CDN library
*   Upload the app package to SharePoint

{{< caption-new "/uploads/2017/05/Screenshot-2017-05-05-11.20.37.png" "Release tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbklEQVR4nDWMSQ7DIBTFuP8d2VdhDhCm8F2lVSx5Zb2nbIj4lPEx8Tksh7GEmIilcfVBG/OnSrmSaqf2iY8npRZ6H8y1EBFe1LiFvsCkijaZkCvGOq65/66nb9S7uO/NEBjO4bQmlEJrjedUtvAFe+ybFtCP6oMAAAAASUVORK5CYII=" "1037" "401" >}}

> **Info**: for the upload gulp tasks to SharePoint I made use of the approach I explained in the two articles about automation for SPFx. Only a small change has been made to allow you to make use of gulp arguments. That way, it is not done from a configuration file in your project, but via variables in the build and release pipeline instead.

{{< caption-new "/uploads/2017/05/050817_1701_Usebuildand3.png" "Sample result of the web part"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAgElEQVR4nGN4+erlo0dPHj0EoZfPX7198x6KXr9///4jw88fv3J8OqLMKpMcGhLt6qPNq8KNKqJMqwI0CzvzFzB8+/rDSTbdki/ZgifBgCVSmyFUiyFEhzlMgcEn06eN4cf3nwVB3a3pawqDpoSblsXa1MRaV8fb1oQalvSWLgIAPPE/GQe06XoAAAAASUVORK5CYII=" "624" "260" >}}

In the next article, I will explain how you can configure the build and release pipelines yourself.