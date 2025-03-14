---
title: How to debug your SharePoint Framework web part
author: Elio Struyf
type: post
date: 2016-08-19T12:39:00+00:00
slug: /how-to-debug-your-sharepoint-framework-web-part/
dsq_thread_id:
  - 5078115191
categories:
  - Development
  - SharePoint
tags:
  - JavaScript
  - SharePoint Framework
  - SPFx
  - TypeScript
comments: true
---

Already a great number of blog posts have been written about the new SharePoint Framework release two days ago. With every new tool or framework, there is a learning curve. The best way of learning how the SharePoint Framework works is by reading the code and debugging it.

This article focusses on how you can quickly debug your web part created with the SharePoint Framework.

> **Important**: this article is written for Chrome. The experience in other browsers can vary a bit.


## Using debugger statement

The SharePoint Framework makes use of a tool called webpack. Webpack is just great, you can do many things with it, but the overall use is for generating a bundled JS file. When you are going to run **gulp serve** it will bundle all the files into a single JavaScript file. This single JavaScript file contains a lot of content.

If you want to set a breakpoint to debug your code, it takes some time before you found the right line. An easier way is by setting a debugger statement in your source file.

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo1.png" "Debugger statement in your code"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGMw0NVzNDG2dtC3tjAwNjYxNTUxMzMxMNDT19fV09MBAF8UBfpOHOwCAAAAAElFTkSuQmCC" "624" "93" >}}

Save this change and open your browser developer tools (or refresh the page with the dev tools open). Once the page gets reloaded, your developer tools will stop on the debugger statement.

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo2.png" "Debugging your code with the debugger statement"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAP0lEQVR4nBXCQQ6AIAwEQP7/SowHgi207LaayMU4mXI18U4V02HEDQYYC39GFhE/D9Q6Wl+iOe2Rmc53xUbsD8frOCQZkZm9AAAAAElFTkSuQmCC" "624" "146" >}}

## Debugging the TypeScript files

As mentioned, the SharePoint Framework bundles everything in one large JavaScript file.

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo3.png" "SPFx bundle file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAf0lEQVR4nAXB2w6CMAwA0P3/1xkT4xMSEhLa9TIcLU5WxHOSZBBCFVogAyDlLCzCTESqmu6DPKcyLPtrqUj4VlkLNdt+R49vS7exPkYd8Zigcs2tfVAzFTa38zxTERaC6M3dccWIIKYZZmCoVtO2mblf12XmUiUiihbfPSJ673/87IwTJOhKSQAAAABJRU5ErkJggg==" "624" "291" >}}

Debugging this large JS file is a hell of a job and it is JavaScript. Your source files are written in TypeScript, so the code you are going to debug is not the same.

Luckily there is something called source maps. Source maps is not something new, these were used a couple of years ago to easily debug minified code (JavaScript and also CSS) where it was used to provide you a mapping from the minified code to the original code.

When you are writing TypeScript and transpiling the code to JavaScript. You have the option to include a source map reference at the bottom of the file. The SharePoint Framework will automatically do this, so you do not have to worry about it.

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo4.png" "Source map reference"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPUlEQVR4nC3EQQrAIAwEQP//yRyDIITuak0wKb04h2kiMjC46eGnTlZW1f3LpqrYsGX96fYag3TCAceM+QPuATk/uVIsUQAAAABJRU5ErkJggg==" "386" "64" >}}

The great thing about these source maps is that your browser can read them and load the original code. If you take a look in the sources, you will see a webpack:// reference:

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo5.png" "Webpack"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhUlEQVR4nEWN4QrDIAwGff+37KhfTFI7KU0ERTfotu7+HtyFnPN2sa5rjBEAMy/LQ3OR7RlUFUCtdc7Ze28XvfcxxhwjmBkRMbOI7PteSnH314/g7jFGESEiVa21uruZjTG+GkBKSVVFhJlTSsdxfLWZASAiACJynmdrbc75j3/eAO7rrd+bt8Z3vjuU3gAAAABJRU5ErkJggg==" "264" "193" >}}

If you open this, you will see that all the original files are loaded and you can navigate to your original web part TypeScript files:

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo6.png" "All the original files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAeCAIAAACaFxhnAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB6UlEQVR4nG2T204bMRRF8///VKlCFRXqQ0IgQAkJYUjG9niO73O3fSrPDILQ7Ae/LJ379gIArLVKKUop55wxBgB5nstRi93uZfPw9Pj4tF6vt9ttlmV5nmdZdjqd8jxflELub6/zw5bxUinlnDOjtNZKqQUiNiLvsqU2RgihlJJSeu8RMYSQcO2se74aunbwfhiGvu9jjIjovR+x1dXut9GqLFObMcYQwvTO2D3/YpScTjljbOq/rusY45TcuJdrRslUW4xvjPEjudP275WUsu97/KI5ed/3dv/Hlce66ay1zjk9yhizQIwe0b7fq9cVKUAAVFU1jT5hnLDO7kkBnBfDMJwl94jufaPf7rjQlJCqqiY8t+YRq+MD7JalNBiTvkbHkPBG7JfSVGFc54Xk6rDmQmmtLmOxX0lT9X13AafBxui2ab7jgOiOD+qwLqWxxkx79d5/4uq4ka+3pABKida667rPi6Xo94QLUABlCOH/2hs1roVR0nyUP2tNvK4KUMPwebSzweQh1ea8mKxyoXPKQSs1+fA8OlvrtzvCReVcXdeTWWczIWIlqNndcM4JIYwxa20YlU6SrF7X5vFnWbCmabtu3uucHJNjWnP6wQtWQhLnHADmX5Jw6F15A5AsTAihlAJA27b/AHe3Vf626Vy1AAAAAElFTkSuQmCC" "248" "740" >}}

> **Important**: check that you have enabled JavaScript source maps in your browser settings.

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo7.png" "Enable JavaScript source maps"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVR4nGWJQQoAIQzE/P9ny4yjrQWtuNfNIQTSJJmZu9ePc07LTACSIiLWespcX7xdVXNOsgNkF0BpSAPse+8L68FXRgK2U7oAAAAASUVORK5CYII=" "259" "75" >}}

Once you found the file you were looking for, you can set a breakpoint in it and start debugging:

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo8.png" "Debugging the original files in Chrome"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfUlEQVR4nE3B2wrCMAwA0P7/3wkKQ8TtQTBNm17WrUm6OASfPMfBGwABg48Jt95EVf645AkRA0KC107RmD+qp9n54wLENdWVcqfMpXIpvLahw8yOwxx5r3lviXIKg5l5630T6UNlDHGPpc5LvdzCdaLpUe9zm54VooQssegX6VmM/vPNkyQAAAAASUVORK5CYII=" "624" "300" >}}

> **Info**: Andrew Connell wrote a great article about debugging and sourcemaps last week: [Debugging Node.js projects with TypeScript and VS Code - Digging into Sourcemaps](http://www.andrewconnell.com/blog/debugging-node-js-projects-with-typescript-and-vs-code-digging-into-sourcemaps)


## Debugging in Visual Studio Code

You can also use Visual Studio Code to debug your web part. To do this, you will have to install an extension called **VS Code - Debugger for Chrome**. The extension can be found here: [Chrome debugger extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo9.png" "VS Code - Debugger for Chrome"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAs0lEQVR4nGNQVVVVU1VVVlE1VlJtNtbtMzKwkNWUVwYJqqqqMqiqqqorq0rrqvdaaHz0Cn5XFnUyQUpPV0UZrIIBRCiqKJtpps13ym1elTxv99+bghE+ctJyaurqYN0qYOAwy85nW8miHbFv9vOaGiorKKqoqYGlNbU0NdU0dKx0HZus502Qj/VRUVDW1tbSVFNTY1BXVzczM7OwsDDSN7I2sTIztdc1MLewMLO0tNTU1AQAIfQsB11w4SgAAAAASUVORK5CYII=" "240" "142" >}}

> **Info**: there are other ways of debugging in Visual Studio Code, but this requires the least configuration.

Once you have installed it, you have to do the following configuration: [extension configuration](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).


*   Create a launch.json file in the .vscode folder;
*   Add the following configuration code to it:

**Before drop 6**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
        "name": "Launch localhost with sourcemaps",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:4321/temp/workbench.html",
        "webRoot": "${workspaceRoot}/src",
        "sourceMaps": true
    }
  ]
}

```

**Drop 6**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch localhost with sourcemaps",
      "type": "chrome",
      "request": "launch",
      "url": "https://localhost:4321/temp/workbench.html",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///../*": "${webRoot}/*"
      }
    }
  ]
}

```

**As of Drop RC0 and onwards**

```json
{
  "version": "0.2.0",
  "configurations": [{
      "name": "Local workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://localhost:4321/temp/workbench.html",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ]
    },
    {
      "name": "Hosted workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://tenant.sharepoint.com/_layouts/15/workbench.aspx",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ]
    }
  ]
}
```


*   Press F5 to start a new debugging session;
*   Another way to open Chrome with the debugging port is via the command prompt and specifying the remote debugging port argument: `--remote-debugging-port=9222`

```bash
$ "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```


> **Important**: it might occur that the Visual Studio Code debugger mentions that it cannot attach. Best is to close all the Chrome sessions (check in your task manager) and start Chrome again with the remote debugging port.

*   Once you started Chrome, start **gulp serve** (you can keep this running in the back);
*   Now you can press **F5** in Visual Studio Code and you are ready to debug your code;
*   Place a breakpoint somewhere in your web part and add it to the workbench. You will see that Chrome will pause and tells you that you can debug it in Visual Studio Code.

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo10.png" "Chrome paused for VSCode debugging"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAc0lEQVR4nDXBSw7CIBQAQK7YBFrUrYbEY3Sl0Ruwt0Lej1DEgoczLpxR0/5g7G7Qxp3d9T5fbvPRnQY9msnq0aplea6v+m495wLISFJKrVurW+v9o7z3IUYkCiEiIhMBACAC/qics4gkkUfEAJSSMLP8fQErm0lAaUzPggAAAABJRU5ErkJggg==" "624" "253" >}}

{{< caption-new "/uploads/2016/08/081916_1232_Debuggingyo11.png" "VSCode debugging"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGPQ0tawNNGxs9N1dNa2sTSwsDK0sTGysNA1M9M2NdUCAF9RBinXZLtpAAAAAElFTkSuQmCC" "624" "82" >}}

Happy coding with the SharePoint Framework.

## Update

Microsoft released its own article of how you could debug your SharePoint Framework projects, you can find the article here: [Debug SharePoint Framework solutions in Visual Studio Code](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-in-vscode).