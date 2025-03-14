---
title: "#DevHack: How to rename a file from a VSCode extension"
slug: "/devhack-rename-file-vscode-extension/"
author: "Elio Struyf"
description: "In this DevHack we will learn how to rename a file from a vscode extension. If you are looking for a simple appraoch, this will be the one to use."
type: "post"
date: "2021-08-16T12:32:56.873Z"
lastmod: "2021-08-16T12:32:58.313Z"
draft: false
tags:
  - "Extensions"
  - "VSCode"
  - "Development"
categories: []
comments: true
keywords:
  - "rename"
preview: "/social/64fa79dd-a5a9-405b-8eba-14f924c143e8.png"
---

Renaming a file is something that we do very often, but in my case, I wanted to do it from within a Visual Studio Code extension. When I first looked at the APIs and available documentation, I found the `vscode.executeDocumentRenameProvider` command and `RenameProvider`.

{{< blockquote type="info" text="Documentation from this can be found here [built-in commands](https://code.visualstudio.com/api/references/commands)." >}}

Now, I thought, there must be an easier way, so I started to look around at the APIs available, and luckily there is an easy option.

On the vscode, its `workspace` namespace, you can access the `fs` or file system via: `vscode.workspace.fs`. The `fs` instance delivers you a couple of valuable methods you could use, like `rename`.

{{< caption-new "/uploads/2021/08/fs-methods.png" "workspace.fs methods"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACZSURBVDXBTW7CMBCA0a+OJzhWpQI7hIQ4Avc/TVdlgUQqNXHin8kgFn3v43S92RA6Oi+8xSHymQPWKg83kZaEmeE3Ay8RVUVEmFNmrBMpLVzPFw77I8/xF3/Yf9GLYLaxrBkzo5TKW98LdSs45/C5FErJqDacE0Q8XedoDZ7jyFpXpmnGh11PHALaGn/zgmojDgFtys/9m38v8MNP3BKpekcAAAAASUVORK5CYII=" "593" >}}

If you want to rename a file, you just need to use the `rename` method as follows:

```typescript
const editor = vscode.window.activeTextEditor;
if (editor) {
  await vscode.workspace.fs.rename(editor.document.uri, vscode.Uri.file(newPath), {
    overwrite: false
  });
}
```
