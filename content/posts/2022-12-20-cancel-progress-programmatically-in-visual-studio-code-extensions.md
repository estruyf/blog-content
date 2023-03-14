---
title: Cancel progress programmatically in VS Code extensions
longTitle: Cancel progress programmatically in Visual Studio Code extensions
slug: /cancel-progress-programmatically-visual-studio-code-extensions/
description: In this article, Elio explains how you can create your cancellation token with
  the CancellationTokenSource class to cancel the progress programmatically.
date: 2022-12-20T08:17:47.202Z
lastmod: 2022-12-20T08:17:47.202Z
preview: /social/a91e15fd-a9c4-4fb2-ac17-e6d070376583.png
draft: false
comments: true
tags:
  - VSCode
  - Extensions
type: post
---

With the Visual Studio Code progress notification (`vscode.window.withProgress`), you can make it **cancellable**. This cancellable option allows the user to cancel it by clicking on a **cancel** button.

{{< caption-new "/uploads/2022/12/progress-notification1.png" "Progress notification in Visual Studio Code"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABcSURBVGPk5hePZGPnsv737z8DA8N/Bmzg18+vR1k4OHmcZeWUk//9+8vw/fsPBhD48PETAwz8d3dh+HdkPwcjL6dgDCcrty0DEvjPwMDwjfE3Axjw8jL8+fjuMAAKEx3yAcyEIwAAAABJRU5ErkJggg==" "607" >}}

What if you want to cancel it programmatically? That was the case for one of my extensions. When a user performs another action triggered outside the progress, it should stop the current progress and remove the notification. 

For example, in your progress, you are processing all files because the user requested to analyze these. Once the user opens another view or requests to analyze a single file, the other progress can be stopped.

## The cancellation token

With the progress its callback, you get a `CancellationToken` argument, although this token can only be used to monitor if the user has canceled the operation. 

{{< highlight typescript "linenos=table,noclasses=false" >}}
vscode.window.withProgress({
    title: 'Please wait...',
    location: vscode.ProgressLocation.Notification,
    cancellable: true
  },
  async (progress, token) => {
  // You code to process the progress

  const seconds = 10;
  for (let i = 0; i < seconds; i++) {
    // Increment is summed up with the previous value
    progress.report({ increment: seconds })
    await sleep(1000);
  }
});
{{< / highlight >}}

If we want to do this programmatically, you must create your own `CancellationToken` logic. The nice thing is that Visual Studio Code's extension API already provides this. 

To create your cancellation logic, you can use the `vscode.CancellationTokenSource` class. When creating a new instance, you will get a cancellation token that you can cancel and dismiss. All you have to do is hook it up in your progress and listen to the cancellation trigger.

The code for this looks as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
import * as vscode from 'vscode';

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

let customCancellationToken: vscode.CancellationTokenSource | null = null;

export function activate(context: vscode.ExtensionContext) {

  vscode.window.withProgress({
    title: 'Please wait...',
    location: vscode.ProgressLocation.Notification,
    cancellable: true
  },
  async (progress, token) => {
    return new Promise((async (resolve) => {
      // You code to process the progress

      customCancellationToken = new vscode.CancellationTokenSource();

      customCancellationToken.token.onCancellationRequested(() => {
        customCancellationToken?.dispose();
        customCancellationToken = null;

        vscode.window.showInformationMessage("Cancelled the progress");
        resolve(null);
        return;
      });

      const seconds = 30;
      for (let i = 0; i < seconds; i++) {
        await sleep(1000);
      }
            
      resolve(null);
    }));
  });


  // Cancel the progress after 10 seconds
  setTimeout(() => {
    if (customCancellationToken) {
      customCancellationToken.cancel();
    }
  }, 10000);
}
{{< / highlight >}}

{{< blockquote type="info" text="The above code snippet creates a progress notification for 30 seconds, but after 10 seconds, it will get canceled programmatically." >}}

{{< caption-new "/uploads/2022/12/progress-notification2.png" "Cancelled message from the code snippet"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA8SURBVF3BsRGAIBAEwDvRRAfGzG4sxlLpyeD4hydnl2d5vivf70YiIiAJK2t/3UdvqZuOIEAS7sJquKUJuyMXb5ki+ocAAAAASUVORK5CYII=" "617" >}}