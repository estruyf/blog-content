---
title: Have you ever thought about checking your dependency for vulnerabilities?
author: Elio Struyf
type: post
date: 2018-02-22T14:08:14+00:00
slug: /have-you-ever-thought-about-checking-your-dependency-for-vulnerabilities/
dsq_thread_id:
  - 6497314912
categories:
  - Development
tags:
  - Dependencies
  - JavaScript
  - Node.js
  - SharePoint Framework
  - SPFx
  - TypeScript
comments: true
---

We all have dependencies in our projects and you probably already read some articles about dependencies which include funky things to your project without you being aware of it. Sometimes we just include these libraries in our project just because they are cool, save us a lot of development time, or because it is a requirement. Of course, there are so many useful libraries and trustworthy ones out there, but still, do you know what you are adding? It might be good to pause for a second and ask yourself what did I just add? A couple of checks you can perform are:

*   Check the repository of the library;
*   Check the dependencies it uses;
*   Is the library actively maintained?

Probably the most crucial one, does it have any known vulnerabilities?

I do not want to scare you, but it is true, some libraries/dependencies might have some already reported vulnerabilities. If you know these things up front or while developing, you can handle based on that information. You could, for example, use another library or another version of the library which has a fix in place for the vulnerability. Besides knowing the dependencies you are adding to your projects, in most cases, these dependencies have their own sub-dependency. This is even harder to go and check, but they could also introduce some vulnerabilities.

> **Note**: this article is certainly no plea to no longer use any dependencies. Just to make you aware to stay a bit in control of the things you are adding.
>
> &nbsp;
>
> **Info**: if you really want to scare yourself, you have to read this article for sure - [I'm harvesting credit card numbers and passwords from your site](https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5).


## What can you do?

Luckily you do not actually have to do any code reviews yourself to check for vulnerabilities. There are some services like [Snyk](https://snyk.io/) or [Node Security Platform](https://nodesecurity.io) (NSP) which allow you to manually / automatically check your dependencies for known vulnerabilities. You can, for example, search for version 2.18.1 from moment and you will see that it contains a vulnerability:

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever1.png" "Dependency check result for moment@2.18.1" >}}

In most cases, it will advise you what to do, as for example, in this case, make use of version >= 2.19.3 of moment.

> **Info**: you can check it out here - [https://nodesecurity.io/check/moment/2.18.1](https://nodesecurity.io/check/moment/2.18.1)

This is, of course, a manual task, but it can be automated. I wrote a couple possibilities of which you can choose what fits the best in your development process.

## Check for vulnerabilities with a tool

Of course, you will not have to manually check your dependencies manually one by one. Snyk and NSP have some command line tools which can do the job for you.

For example, with NSP you can install the NSP CLI tool:

`npm install -g nsp`

Once installed you can run from your command prompt and will give you the following output:

`nsp check`

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever2.png" "nsp cli tool test result" >}}

## Quickly check vulnerabilities in VSCode

To simplify things, I created a Visual Studio Code extension that can automatically check your dependencies.

> You can find the extension here: [VSCode Dependency Vulnerabilities Checker](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-dependency-vulnerabilities).

Once you installed the extension and open the **package.json** file from your project. It does an automatic does a check and will show you the known vulnerabilities:

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever3.png" "package.json file dependency problems" >}}

You can also manually start a full check which includes the package, NPM shrinkwrap, and/or package lock file into the check:

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever4.png" "Check for dependency vulnerabilities command" >}}

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever5.png" "Check for dependency vulnerabilities result" >}}

> **Info**: this full check is always best to do, as it will use your package, shrinkwrap and package-lock files to do the check. The shrinkwrap and package lock file contains a list of all the dependencies, including the sub-dependencies which are installed. That way you are sure that all your production used dependencies are checked for vulnerabilities.


## Vulnerability checks during VSTS CI

If you configured a build pipeline in VSTS, you can also include this check into the process so that you never forget it. Here are the tasks you can add to your process:

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever6.png" "VSTS tasks" >}}

### npm shrinkwrap task (optional)

This is an optional task, which is not required when you use **npm** version >= 5. As of **npm** version 5, a **package-lock.json** file will be created automatically. When working with a lower version or when you do not have a package-lock.json file. You can run the **npm shrinkwrap** command which will give you a full detail of all the installed dependencies. Just in case, to make sure VSTS has the latest version of the file, you can create it during the build process and it will be used in the NSP check.

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever7.png" "npm schrinkwrap optional task" >}}

*   Command: **custom**
*   Arguments: **shrinkwrap**

### npm nsp task

This task if for installing the nsp CLI tool so that it can be used in the next task.

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever8.png" "nsp task" >}}

*   Command: **custom**
*   Arguments: **install nsp**

### nsp check task

This is task will initiate the NSP check.

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever9.png" "nsp check task" >}}

*   Task type: **Command line**
*   Command: **$(System.DefaultWorkingDirectory)/node_modules/.bin/nsp**
*   Arguments: **check --reporter summary**

### VSTS result

When you included these tasks in your build pipeline, this is the result you can expect when there are known vulnerabilities found:

{{< caption-new "/uploads/2018/02/022218_1357_Haveyouever10.png" "VSTS nsp result" >}}

I hope this article made you aware of the potential risks that you might unintentionally include in your solutions and how to take action to get them removed.

> **Remark**: unfortunately it will not be 100% fail proof. Still, people have to find these vulnerabilities and report them, but I am sure that it will at least give you a bit more insights of what you are adding.
