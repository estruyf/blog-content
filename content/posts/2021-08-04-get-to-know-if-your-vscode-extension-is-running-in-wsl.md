---
title: '#DevHack: Check if a VSCode extension is running in WSL'
slug: /devhack-vscode-extension-running-wsl/
description: Are you developing a Visual Studio Code extension and do you need to know when it is running in WSL? In this article I explain how you can see when this happens
author: Elio Struyf
type: post
date: '2021-08-04T13:45:41.703Z'
lastmod: '2021-08-04T13:45:43.000Z'
draft: false
tags:
  - Extensions
  - VSCode
categories: []
comments: true
keywords:
  - wsl
preview: /social/3fa12db5-9965-45c7-bc5c-9b3bd6c76bc8.png
---

For the [Front Matter](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter) Visual Studio Code extension, I needed to know if the current instance opened a Windows Subsystem for Linux (WSL) located project folder. 

By knowing this context, I could ensure that certain functionality works similarly to the default behavior on Windows and macOS.

## The solution

The solution is a very simple one-liner:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const isWsl = vscode.env.remoteName === "wsl";
{{< / highlight >}}

## How I use it

I have two buttons in the Front Matter extension to open the project- and file folder in finder/explorer. When running in WSL, the `revealFileInOS` command from VSCode is not available. You need to use the `remote-wsl.revealInExplorer` command instead. With the one-liner, I can now do the following:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const isWsl = vscode.env.remoteName === "wsl";
if (isWsl) {
  commands.executeCommand('remote-wsl.revealInExplorer');
} else {
  commands.executeCommand('revealFileInOS');
}
{{< / highlight >}}
