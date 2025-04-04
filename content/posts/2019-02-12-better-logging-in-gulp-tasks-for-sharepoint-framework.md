---
title: Better logging in gulp tasks for SharePoint Framework
author: Elio Struyf
type: post
date: 2019-02-12T08:35:38+00:00
slug: /better-logging-in-gulp-tasks-for-sharepoint-framework/
categories:
  - Development
  - SharePoint
tags:
  - Gulp
  - SharePoint Framework
  - SPFx
  - tasks
comments: true
---

When building custom gulp tasks in your SharePoint Framework solutions, it might be handy to log as the default build system does.

> More information about building custom gulp tasks can be found here: [Integrate gulp tasks in SharePoint Framework toolchain](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/integrate-gulp-tasks-in-build-pipeline "Integrate gulp tasks in SharePoint Framework toolchain")

When you would use the default **console.log**, **console.warn**,**
**or **console.error** methods like this:

{{< gist estruyf 51911ba2e53187583fb6ad94b5d73a82 >}}

They will just log as follows:

{{< caption-new "/uploads/2019/02/021219_0828_Loggingincu1.png" "Console logging"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAnElEQVR4nBXJzQqCMAAA4KkdMpYYuIVOWpbNbYF/s9E8aCRBUafqAerU+79B+F0/gJhe5R3TF29zgKSZxw0kChLlxXoW1SBgmhZ9Up89YSa0tJfSwtzBewdLGwuQqoEWp6QewryD0ix2RzcsLcQBygDiYIqzYF0RYZA0sTRRanxauaS0sRy7vb7bx1fdfur+2XavUD39rLcQGw/xP0XpFbC2Cnn+AAAAAElFTkSuQmCC" "600" "283" >}}

More importantly, the SharePoint build system isn't even aware of any issues. So, you will have to let the build engine know that something failed in your task.

The good news is that there is an easy way to log like the build system and there are a couple of useful methods available:

*   **log(message: string)**: logs a message;
*   **logWarning(message: string)**: Logs a warning, and it also adds it to the warnings list which will lead the build fail;
*   **logError(message: string)**: Logs an error, and it also adds it to the errors list which will lead the build to fail.
*   **fileWarning(filePath: string, line: number, column: number, warningCode: string: message: string)**: This logs a warning related to a specific file and causes the build to fail
*   **fileError(filePath: string, line: number, column: number, warningCode: string: message: string)**: This logs an error related to a specific file and causes the build to fail.
Here is an example of the updated gulp task that uses these logging methods available in the SharePoint Framework build system:

{{< gist estruyf ac88f42ca344bc44cfe4c6fd7046d03c >}}

Running this task results in the following output:

{{< caption-new "/uploads/2019/02/021219_0828_Loggingincu2.png" "SPFx logging methods output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAo0lEQVR4nC3J2wqCMAAA0CEWYc4Er5uuGZqbyws6b6xIn+r//yiU4Lwd4OUjrZd8/Fi33oh6E/fnjYTxcEINsGgTiDkaVrd7O+VkxKUesENY6L7QfA4gbREfwlrBbkladeUzTqVNSugXus+Bl9X4LvNKkceEC5WJl0ckRDXw+MZOGiJmJte0U6FoL7QyiTgG7N+QNkg88+Hrsl4LGXAYcPfY/QDR7Bdg3Dx8XQAAAABJRU5ErkJggg==" "600" "348" >}}

The good thing about this is that the build system is now aware of the warnings and errors which occurred in your custom tasks.