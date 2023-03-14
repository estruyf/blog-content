---
title: Easily run SharePoint Framework related tasks in Visual Studio Code
author: Elio Struyf
type: post
date: 2018-08-08T10:11:42+00:00
slug: /easily-run-sharepoint-framework-related-tasks-in-visual-studio-code/
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Extensions
  - SPFx
  - Visual Studio Code
comments: true
---

Beginning of August 2018 I released a new Visual Studio Code extension called the [SPFx Task Runner](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-task-runner "SPFx Task Runner"). This extension lets you run your SharePoint Framework related gulp tasks by just a couple of mouse clicks.

{{< caption-legacy "uploads/2018/08/spfx-task-runner-preview-1.png" "SPFx Task Runner" >}}

Once you installed the extension you get a new SPFx task group in the Visual Studio Code context menu. This menu group will be shown when a SharePoint Framework project is opened.

{{< caption-legacy "uploads/2018/08/contextmenu-actions.png" "Context menu SPFx task related actions" >}}

As you can see in the above screenshot it provides you with a couple of the most used/useful command:

*   "SPFx start local server" results in running: `gulp serve --nobrowser`
*   "Create debug package" results in running: `gulp bundle` and `gulp package-solution` afterwards to create the debug (pointing to your localhost) SPPKG file
*   "Create release package" results in running: `gulp bundle --ship` and `gulp package-solution --ship` afterwards to create the release SPPKG file
The two other tasks allow to check the registered gulp tasks and to run them. Here is an example of how the **Pick a task to run** action works:

{{< caption-legacy "uploads/2018/08/pick-task-vscode.gif" "Pick a gulp task to run" >}}

*   Get the Visual Studio Code extension here: [https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-task-runner](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-task-runner).
*   Check out the code on the GitHub repository: [https://github.com/estruyf/vscode-spfx-task-runner](https://github.com/estruyf/vscode-spfx-task-runner)
*   Got Feedback/ideas/issues, please create a new issue here: [https://github.com/estruyf/vscode-spfx-task-runner/issues](https://github.com/estruyf/vscode-spfx-task-runner/issues)

Happy coding!