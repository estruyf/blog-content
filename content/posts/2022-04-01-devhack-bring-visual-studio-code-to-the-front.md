---
title: "Extension tip to bring Visual Studio Code to the foreground"
slug: "/trick-bring-visual-studio-code-foreground-extension/"
description: "In this article Elio explains how you can get Visual Studio Code to be brought back to the foreground."
type: "post"
date: "2022-04-01T13:20:18.077Z"
lastmod: "2022-04-01T13:20:18.792Z"
draft: false
tags:
  - "Development"
  - "Visual Studio Code"
  - "Devhack"
categories: []
comments: true
preview: "/social/87824da7-bac8-4870-a61d-4a77aa6e90ae.png"
---

In one of the extensions I am developing with a custom authentication provider, I required to bring the last Visual Studio Code instance to the front once signed in.

When you can control the full authentication flow, you typically redirect the user to `vscode://...`, which triggers your browser from opening Visual Studio Code.

In my case, I do not own the authentication flow but still wanted to give a similar experience to the developer, so I came up with the following trick:

```typescript
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
```

All the above code does is open the project again in Visual Studio Code. As the project/solution is already opened, it would not get reloaded. All it does is bring your Visual Studio Code instance to the front, which we needed.

**Happy developing**