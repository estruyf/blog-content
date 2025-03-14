---
title: Define the TypeScript version you want to use in SharePoint Framework
author: Elio Struyf
type: post
date: 2019-03-16T12:56:38+00:00
slug: /define-the-typescript-version-you-want-to-use-in-sharepoint-framework/
categories:
  - Development
  - SharePoint
tags:
  - PnP
  - React
  - SharePoint Framework
  - SPFx
comments: true
---



Since the release of SharePoint Framework 1.8.0, you will gain control over which TypeScript version to run in the build process.

Until the release of 1.8.0 version, we were always tight to TypeScript version 2.4.2. There was no way to change this, as it was part of the internal SPFx build engine, but this has changed.&nbsp;

In SPFx 1.8.0, you can now use the TypeScript version you like to use in your project by installing the&nbsp;**[@microsoft/rush-stack-compiler](https://www.npmjs.com/search?q=%40microsoft%2Frush-stack-compiler)** dependency. This dependency has TypeScript version specific versions like @microsoft/rush-stack-compiler-3.3. So, when choosing your TypeScript version, you will need to install the matching rush stack compiler dependency.

## Installing and configuring the compiler

When you start in a new project, it is best to skip the dependency installation by running `yo @microsoft/sharepoint --skip-install`. In existing projects, it is best to remove the node_modules folder. This gives you a clean project in which you can do the necessary configuration before installing the dependencies and won't give you any dependency leftovers.

For this sample we use version 3.3 of TypeScript. Open your project in your preferred editor and remove the&nbsp;**@microsoft/rush-stack-compiler-2.7** devDependency from your&nbsp;**package.json**file.

Once you removed the dependency, run the following command: `npm i @microsoft/rush-stack-compiler-3.3 -D -E`. This makes sure it installs the latest version together with the installation of all the required SPFx dependencies.

Once all the dependencies are installed. You need to update the&nbsp;**extends** property in the&nbsp;**tsconfig.json** of your project. This property references to the 2.7 compiler version. You will have to update this to version 3.3.

{{< gist estruyf 60da54c96d7907472f7c24c588d68408 >}}

Once you have done this, you are good to go. You can see if it worked by running a gulp build / bundle / ... task in your project.

{{< caption-new "/uploads/2019/03/Screenshot-2019-03-16-09.39.50-1024x590.png" "SPFx build engine running with TS version 3.3"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqUlEQVR4nD3M0W6DIACFYd7//cwiyVRwgNWqVFsroP6NZtt/c26+HJFlGXkukVKilcbUFmcaxt7jB8+6BLa0I5xzWGtRStP1d0JMhLixXpsIayLFHWGM4cRa1xRFQTeN3J4D42vm9V4IIbCd0P5DTfkL+/mBn57EkDj2gzNhrMU1DbquKauK9jEwzBPLGq+3GDY4QDQyp1MlrfrG5F90VYH/0by79nr66wN5AOK9cAIa2QAAAABJRU5ErkJggg==" "1024" "590" >}}

> **Info**: Marc D Anderson has written an article about his experience of updating a SPFx project to TypeScript 3.3. Read more about it here:&nbsp;[Common issues in SPFx 1.8.0 with TypeScript 3.3](https://sympmarc.com/2019/03/15/common-issues-in-spfx-1-8-0-with-typescript-3-3/).