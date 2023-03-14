---
title: Implementing localization file checks to prevent issues in SharePoint Framework solutions
author: Elio Struyf
type: post
date: 2019-02-04T09:19:45+00:00
slug: /implementing-localization-file-checks-to-prevent-issues-in-sharepoint-framework-solutions/
categories:
  - Development
  - SharePoint
tags:
  - Localization
  - SharePoint Framework
  - SPFx
  - Translations
comments: true
---

If you are working on a SharePoint Framework solution which has to support multiple languages. You will already know that the localized labels are created in localization (resource) files which are "just" JavaScript files. There is actually nothing wrong with this approach in SharePoint Framework, although you could experience some issues with it.

> **Info**: More information about localizing web part contents can be found here: [https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts#localize-web-part-contents](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts#localize-web-part-contents)

Localization requires two things:

1.  A definition file for which localization keys that are available in the project. This is the "**.d.ts**" file.
2.  The actual resource file(s). The default one is **en-us.js**, but you can add more depending on which languages you want to support.

Both of these files require that the contents of them are written in a specific way. Luckily, you will not have to remember this, as every project by default adds them.

## What could go wrong?

The problem with the localization files, especially the JavaScript files, are not validated for errors during the build process of SharePoint Framework.

For instance, when you accidentally add the following to your localization file:

{{< caption-legacy "uploads/2019/02/020419_0907_Implementin1.png" "Localization file with an issue" >}}

During a build, this will not be discovered:

{{< caption-legacy "uploads/2019/02/020419_0907_Implementin2.png" "The SPFx does not discover any localization file issues" >}}

This example is done in the **nl-nl.js** file, so in order for testing out the Dutch localization, you need to be sure to set the right debugging language (more information on how you can do that can be read in the provided documentation link at the top of this article). In my case I do my test by running `gulp serve -nobrowser --locale=nl-nl`, once you load the web part, you will see a similar error like this one:

{{< caption-legacy "uploads/2019/02/020419_0907_Implementin3.png" "When debugging the web part, the language file with the issue cannot be loaded correctly" >}}

When a developer is going to add the localization keys and labels to a project. The chances are that he/she will immediately spot these kinds of issues early in the process. In larger projects, it could be that there are other persons involved or even automated systems which automatically add these localization files to the project. Which makes them harder to spot. Only by some extensive language testing, you will catch these issues before you deploy the solutions into production.

## Is there a better way?

Testing is always required of course but spotting these localization problems before they go to any environment is much better. A better way to prevent this from happening is to integrate a process that captures these localization file issues.

There are two options for such a process:

1.  Extend the build system with an extra task to verify the localization files;
2.  Convert the JavaScript files to TypeScript.

### Adding an extra localization validation task

In order to add a localization validation task to your project, you will have to first install **esprima** by running: `npm i esprima -D -E` (esprima is already present in the SPFx projects, but just in case, this will make sure that you always have this dependency installed).

[Esprima](http://esprima.org/) is an ECMAScript parser which can be used for static code analysis and can catch these kinds of issues very quickly.

Once installed, you can integrate the following validation task in the **gulpfile.js** file in your project:

{{< gist estruyf 60e3be7a1d949c5c80d05dc68d502929 >}}

You can run the task by executing gulp validate-localization. The task will then fetch all localization JavaScript files, parse them, and if there are issues, return them.

{{< caption-legacy "uploads/2019/02/020419_0907_Implementin4.png" "Spotting localization issues with the gulp script" >}}

The task has also been added to the **build rig** system of SharePoint Framework. This means, that when you run gulp bundle, the validation task will also be executed.

{{< caption-legacy "uploads/2019/02/020419_0907_Implementin5.png" "Localization validation added to the build" >}}

This task will help you prevent that broken localization files get into a production bundle.

### The TypeScript way

This approach does not require any additional dependencies. The only thing what is required is that you have to change all the JavaScript localization files to TypeScript. That way, when you run a build, they will automatically be validated for errors during the transpilation.

In order to change the JS localization file to TS, you will have to update its contents. Here is an example of such a TS localization file:

{{< gist estruyf 744ff8c0b8a4280f5ea31664000fa9ec >}}

Once you updated all the localization files, and start to bundle your solution, you will see the following output:

{{< caption-legacy "uploads/2019/02/020419_0907_Implementin6.png" "Localization issues during the TypeScript to JavaScript transpilation" >}}

I would recommend adding one of the two provided processes to your solutions, that way you are sure that you will not end up in situations where localization files are causing issues and preventing your solutions to load.