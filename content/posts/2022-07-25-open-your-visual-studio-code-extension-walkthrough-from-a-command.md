---
title: "Open your VSCode extension walkthrough from a command"
longTitle: "Open your Visual Studio Code extension walkthrough from a command"
description: "In this article Elio explains how you can open your Visual Studio Code extension walkthrough from a custom command."
date: "2022-07-25T14:17:07.364Z"
lastmod: "2022-07-25T14:17:08.214Z"
preview: "/social/7c738dac-3af9-407a-88f9-6f9eac5ce2cf.png"
draft: false
comments: true
tags:
  - "VSCode"
  - "Extensions"
type: "post"
slug: "/open-vscode-extension-walkthrough-command/"
---

A great feature that allows your users to get familiar with your extension is the ability for you to create [walkthroughs](https://code.visualstudio.com/api/ux-guidelines/walkthroughs).

{{< caption-new "/uploads/2022/07/walkthrough-experience.png" "Walkthrough experience"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAACzSURBVI3BMU7EMBBA0e+xk3ghEkpLwx6ADnFWLka5Eh0VRRShbGI8M6w7tEKI98Lx+PASY3pUVUQEEaExM8yMRlVfU4zp6Qt5jsFwd0opXFPVQWisMk0Th0NGRBjHka7r+CkZgRQ79vGe2u94fWcYenLObNuGu7MsC8m14iFgH2/s64q7ofmOGCOlFBp3J3FhZqzrGTelmeeZa4nGHffKXwSJ/Ec699OJ23zDRVHnV/vn6RsSTVfoMWRt/wAAAABJRU5ErkJggg==" "1048" >}}

The welcome experience can be seen or opened from the start experience in VS Code.

{{< caption-new "/uploads/2022/07/get-started.png" "VS Code - Get started"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAADGSURBVF3BQU7DMBBA0e+xoSS0lTgBPQA7xFm5GMseAjVRGtszY+JFpIr3wuXy/h1j+jAzRAQRoXN33J1O1X5SjOlTVb/YmBmqyn+1lkNiczqdGIaBZVmY5xkRoTMzdskJTHdlWn5pmunicOY4jtRaqetMzhlppkSU0BwRYfckTrBMoNEJG48D4/FMjJFOPKO14ASqHOgSG19vzGtjp2VlUqW1gGmhS0gErzxSdaDwKN2f3668voxsijVSSoQgqFZaa3Qeb9c/XKVscbtTfNQAAAAASUVORK5CYII=" "1048" >}}

But how do you get to the welcome experience when you close the start page? Well, only by the help: get started command, but if you want, you can change this behavior.

## Create a welcome experience command

Start by creating a new command for your extension:

```json
{
  ...,
  "contributes": {
    "commands": [
      {
        "command": "frontMatter.welcome",
        "title": "Welcome",
        "category": "Front matter"
      }
    ]
  }
}
```

In your extension code, register the command and use the `workbench.action.openWalkthrough` command to open the walkthrough of your choice. 

```typescript
vscode.subscriptions.push(
  vscode.commands.registerCommand("frontMatter.welcome", () => {
    vscode.commands.executeCommand(`workbench.action.openWalkthrough`, `eliostruyf.vscode-front-matter#frontmatter.welcome`, false);
  })
);
```

The second argument is the walkthrough to open. You do this by specifying: `<publisher>.<extension name>#<Walkthrough ID>`.
The third argument is a boolean that defines if you want to open it in the same view (`false`) or split view (`true`).

Once implemented, you can execute your custom welcome command.

{{< caption-new "/uploads/2022/07/welcome-command.png" "Welcome command"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA3SURBVGOUkJYtFRQSMvz16zfDv39/GbCBL58+nWf58IdF+MsPDnE2JnbG7z+/MWAB/5n+swoDAIg2E9xF5djeAAAAAElFTkSuQmCC" "785" >}}

This should result in opening the view:

{{< caption-new "/uploads/2022/07/walkthrough-experience.png" "Walkthrough experience"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAACzSURBVI3BMU7EMBBA0e+xk3ghEkpLwx6ADnFWLka5Eh0VRRShbGI8M6w7tEKI98Lx+PASY3pUVUQEEaExM8yMRlVfU4zp6Qt5jsFwd0opXFPVQWisMk0Th0NGRBjHka7r+CkZgRQ79vGe2u94fWcYenLObNuGu7MsC8m14iFgH2/s64q7ofmOGCOlFBp3J3FhZqzrGTelmeeZa4nGHffKXwSJ/Ec699OJ23zDRVHnV/vn6RsSTVfoMWRt/wAAAABJRU5ErkJggg==" "1048" >}}