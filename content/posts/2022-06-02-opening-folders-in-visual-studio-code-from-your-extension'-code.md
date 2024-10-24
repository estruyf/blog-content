---
title: Opening folders in Visual Studio Code from an extension
longTitle: ""
description: In this article, Elio explains how you can open a project folder or workspace from your extension' code for macOS, Linux, and Windows.
date: 2022-06-02T10:18:41.146Z
lastmod: 2022-06-02T10:18:41.513Z
preview: /social/f55a353a-9720-4181-83f1-c1db56724071.png
draft: false
comments: true
tags:
  - Development
  - VSCode
  - Extensions
type: post
slug: /opening-folders-visual-studio-code-extension/
---

I used the `vscode.openFolder` command in one of my extensions, one of the [built-in commands](https://code.visualstudio.com/api/references/commands) that is available. The command can be combined with a URI argument to open the folder or workspace.

While testing it out, the command worked fine on macOS and Linux but gave issues on Windows paths.

{{< caption-new "/uploads/2022/06/open-folder-1.png" "Failed to open folder on Windows"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAABgSURBVG3BwQ3CMBQFwd3IEimDCwXQf12RDTH/oVwQijLj/fHMe5+8xkaVqBxCSIKKSNv6TpD5gdTkisKSFGcCTfnXkqD8qKzrii7U6FQVh8ZJEnrvnLVbWxj7AILKFZUvJkYtIoRPkLMAAAAASUVORK5CYII=" "1920" >}}

## The issue

In my case, the path to the folder gets retrieved from a CLI command. The folder path looks as follows:

{{< highlight text "linenos=table,noclasses=false" >}}
C:\data\vscode\test-project-folder
{{< / highlight >}}

Initially, I used the following code:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const folderPath = `C:\\data\\vscode\\test-project-folder`;
const folderPathParsed = folderPath.split(`\\`).join(`/`);
const folderUri = vscode.Uri.parse(folderPathParsed);
vscode.commands.executeCommand(`vscode.openFolder`, folderUri);
{{< / highlight >}}

The folder path needs to be parsed to a URI to use the command. That is why the `vscode.Uri.parse()` method is used. The above code works fine on macOS and Linux but gives issues on Windows paths.

First, I thought it had to do with the `\` backslashes, but replacing these with `/` forward slashes did not change the behavior.

When I opened the folder from the command, I spotted the following error in the debug console: `No file system provider found for resource <path>`.

While searching through the VS Code issues and documentation, I found the following information on [opening VS Code with URLs](https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls). This documentation led me to the solution of opening Windows-based folder paths.

## Solution

To open a project folder, VS Code requires the following URL format: `vscode://file/{full path to project}/` - example: `vscode://file/c:/myProject/`.
 
Whenever I parsed the above Windows path, I received the following path: `C:/data/vscode/test-project-folder`. The scheme for this URI is `C`, which is something VS Code its file system provider does not understand. Looking to the documentation, this should be `file`.

When checking this for a macOS path like `/data/vscode/test-project-folder`, the scheme is set to `file`.

Instead of using the `vscode.Uri.parse()` method, I tried out the `vscode.Uri.file()` method for the Windows path and it resulted in: `file:///c:/data/vscode/test-project-folder`. The scheme for this URI is set to `file`. Using this URI with the `vscode.openFolder` command did the trick.

The working solution for macOS, Linux, and Windows looks as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const folderPath = `C:\\data\\vscode\\test-project-folder`;
const folderPathParsed = folderPath.split(`\\`).join(`/`);
// Updated Uri.parse to Uri.file
const folderUri = vscode.Uri.file(folderPathParsed);
vscode.commands.executeCommand(`vscode.openFolder`, folderUri);
{{< / highlight >}}