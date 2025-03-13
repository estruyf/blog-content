---
title: Developing SharePoint Framework solutions outside the workbench
slug: /developing-share-point-framework-solutions-outside-the-workbench/
author: Elio Struyf
type: post
date: 2020-06-05T11:08:21.930Z
draft: false
tags:
  - Development
  - SharePoint
  - SharePoint Framework
categories: []
comments: true
---

I do not know how many times you use the workbench, but I rarely use it. It is not that I do not like it, as the workbench is useful, but I want to be able to test my solutions in "real" pages. This way, I can see how everything comes together.

## Approaches

There are a couple of approaches to this. 

- Make use of the `debugManifestsFile` query string parameter
- Deploying a debug package to SharePoint
- Deploying a production package to SharePoint and using the debugManifestsFile` query string parameter to debug it locally

## Using the debugManifestsFile approach

SPFx uses this `debugManifestsFile` approach when you will develop extensions like the Application Customizer, but you can also use this approach with web parts.

How it works is very simple:

- Create a new project
- Start spinning up your local environment `gulp serve --nobrowser`
- Open the page where you want to test the web part
- Add the following query strings to the URL: `?loadSPFX=true&debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js`, when you are developing extensions, you also need to add the additional query string parameters.
- Edit the page and add the web part to the page
- Start changing the code

{{< caption-new "/uploads/2020/06/debug1.png" "Web part served locally running on SharePoint"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAACCSURBVE3BsQ3CMBBA0X/nmBg7QtSkYQCKdGwBk1CxEWIKpAzBCDQRQoQUVIATIwqkvCf3tk3OORBliBFEQUBFMKqcry+aZ4/WdU3wnjB1FEWgu13IbcbEZjiXs17O2KzmaFVVjJ0OR7pHh7WWsaxclPRD4m+721MEz/sTMcbwkxJ8AdQ0IegsthC/AAAAAElFTkSuQmCC" "923" >}}

> **Info**: To make the last steps easier, I created a bookmarklet that will automatically add the query string parameters for you. You can find this related article here: [SharePoint Framework bookmarklet tool for quick and easy debugging
](https://www.eliostruyf.com/sharepoint-framework-bookmarklet-tool-for-quick-and-easy-debugging/).

When you stop the local server and refresh your page, your web part will not show up anymore.

{{< caption-new "/uploads/2020/06/debug2.png" "Web part will not be loaded once local server is stopped"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABDSURBVI3Buw2AMAxF0WsLB3kO1mD/liUoqFG6RDw+JVXOsVqrzAyJhwAREfTekWA7Gvt5MWUm7s5fKTOvdeHjDHIG3XQQEv7omT8HAAAAAElFTkSuQmCC" "922" >}}

<blockquote class="important">
<p><strong>Important</strong>: Of course, this is the expected behavior. Once you start your server again, it will all start working, but only when you use the query string parameters. When you do not provide them, nothing will get loaded.</p>
</blockquote>

## Deploying a debug package to SharePoint

The second approach is to create a debug/development package and deploy it to SharePoint. 

A debug/development package is an SPPKG package with references to your localhost instead of the CDN/file location. What I like about this approach is that I can deploy my web part, extensions. Configure them on SharePoint, and not requiring the need to use the query string parameters.

The steps for this approach go as follows:

- Open your project
- Run `gulp bundle`, note that you are not using the `--ship` here.
- Run `gulp package-solution`, same thing as in the previous command, you are not using the `--ship`

### What did you do?

You tell the SPFx build to run a debug build for the current project. The output of this will be a web part manifest file with reference to your local server: `https://localhost:4321/`, instead of your CDN or client-side assets token.

{{< caption-new "/uploads/2020/06/debug3.png" "Localhost reference in web part manifest"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAADNSURBVCXBS07DQBBF0VufdkwkkLIThszY/3aAENPuV4UQ59jr23tfrzeWTdwdFtQSWqJHYmYc9w9yCRaFcWHOReagR0OImgdm4JF4hNMNkogIVEI6MWDsVyw2zuNOdjceSVVh5jjN7jBGoiXKjf3lRkYVu07UzaONBr5KBE1L/HncP0l58G2BhxMN1WA50PmDGzSwPT2T0qLWSRu4B11F868bqqF0kpEbuV0wC6qLTEMqwmEeB24QuZFWi9akJDw3ak58GGZFXIQeE63FL7j9f5GI2YH3AAAAAElFTkSuQmCC" "1206" >}}

When you created this package, you can upload and deploy it to your application catalog. You will even see the localhost reference on the deployment dialog.

{{< caption-new "/uploads/2020/06/debug4.png" "Localhost reference shown on the deployment dialog"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACfSURBVHXBQUrEQBBA0V9d1W0gyGQVMKCrucrgfVy48FKeyENMFiGdSaqcLAKD4HsyTVPc4e6ICIe2bbltgQgkAhvHkXVdcXdUld0wDOw+vn94ORW+Lm/YHTlnIoKUEmbG4fUZTmVjnmcspYS703Udqsqjz/czB6tbon0yaq2ICKpKKYW/LHnlel3YqSpN05BzRkR4ZH3f859lWYgIIoJftI845a0pmTAAAAAASUVORK5CYII=" "614" >}}

Now you can go to your page and add the web part. When the local server is not running, it will result in an error. 

{{< caption-new "/uploads/2020/06/debug5.png" "Web part shows an error when the local server is not running"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABSSURBVD3BMQ6AIBBFwbcE0HgRD8LpvYOtrR2FivsNJjpjtVa5hCReEkPOXO1CgmU7WfebaGlELmIwxhT4pDzQlRkKEJuL5hAM6uGY8TODKQW6BycxIie6+/cwAAAAAElFTkSuQmCC" "919" >}}

Be sure always to run the server first before you add the web part to the page. That way, you save/publish the page. Once you saved the page, it does not matter anymore.

## Deploying a production package to SharePoint and using the debugManifestsFile` query string parameter to debug it locally

This approach is a combination of both. You can use this approach to avoid these errors you saw before when the local server is not running. That way, there will always be something rendered on the page, like, for instance, the old version of the solution which you are developing.

**Info**: You can also use this approach, for instance, to test out why your solution is failing in production. You can find a related article about this here: [Testing and debugging your SPFx solutions in production without causing any impact](https://www.eliostruyf.com/testing-and-debugging-your-spfx-solutions-in-production-without-causing-any-impact/).

The steps for this approach go as follows:

- Open your project
- Run `gulp bundle --ship`
- Run `gulp package-solution --ship`
- Upload and deploy your solution to your app catalog
- Add the web part to the page or enable your extension
- Use the query string for loading your local solution: `?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js`

*That's it, happy developing!*
