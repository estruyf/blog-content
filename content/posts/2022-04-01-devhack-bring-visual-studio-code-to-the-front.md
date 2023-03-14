---
title: Extension tip to bring Visual Studio Code to the foreground
date: 2022-04-01T13:20:18.077Z
draft: false
type: post
description: In this article Elio explains how you can get Visual Studio Code to be brought
  back to the foreground.
lastmod: 2022-04-01T13:20:18.792Z
preview: /social/175690f7-ff14-42fd-8ea8-81500c37517c.png
comments: true
tags:
  - Development
  - Visual Studio Code
  - Devhack
categories: ""
slug: /trick-bring-visual-studio-code-foreground-extension/
---

In one of the extensions I am developing with a custom authentication provider, I required to bring the last Visual Studio Code instance to the front once signed in.

When you can control the full authentication flow, you typically redirect the user to `vscode://...`, which triggers your browser from opening Visual Studio Code.

In my case, I do not own the authentication flow but still wanted to give a similar experience to the developer, so I came up with the following trick:

{{< highlight typescript "linenos=table,noclasses=false" >}}
import { exec } from 'child_process'; 

function getWorkspaceFolder(): Promise<WorkspaceFolder | undefined> {
  let folder: WorkspaceFolder | undefined;

  if (!workspace.workspaceFolders || workspace.workspaceFolders.length === 0) {
    return undefined;
  } else if (workspace.workspaceFolders.length === 1) {
    folder = workspace.workspaceFolders[0];
  } else {
    folder = await window.showWorkspaceFolderPick({ placeHolder: `Select the workspace folder` });
    if (!folder) {
      return undefined;
    }
  }

  return folder;
}

const wsFolder = await getWorkspaceFolder();
exec(`code .`, { cwd: wsFolder?.uri.fsPath });
{{< / highlight >}}

All the above code does is open the project again in Visual Studio Code. As the project/solution is already opened, it would not get reloaded. All it does is bring your Visual Studio Code instance to the front, which we needed.

**Happy developing**