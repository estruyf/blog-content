---
title: Creating timer dismissable notifications in VS Code
longTitle: Creating timer dismissable notifications in a Visual Studio Code extension
slug: /creating-timer-dismissable-notifications-visual-studio-code-extension/
description: In this article, Elio explains how you can create timer dismissable notifications for your Visual Studio Code extensions.
date: 2022-12-21T10:07:13.055Z
lastmod: 2022-12-21T10:07:13.055Z
preview: /social/69f31014-02a8-46a7-a85a-bbfdc0cadd4c.png
draft: false
comments: true
tags:
  - Development
  - VSCode
  - Extensions
type: post
---

Notifications in Visual Studio Code are trivial for your extensions to notify the user when something happens or a process completes. A downside of these notifications is that they cannot be dismissed programmatically; they require manual user interaction.

As in my current extension, I wanted to be able to have a notification that can do the following:

1. Show notification with an **undo** button;
2. Hide the notification after 10 seconds;
3. If you click on the undo action, hide the notification needs to be removed.

You might think it should be easy, but unfortunately, it is not the case. In the above requirements, there are two issues.

1. Cannot dismiss the notification programmatically;
2. Cannot dismiss it after a given time.

To better understand the problem(s), I will go into more detail and provide you with a solution.

## The problems

### There is no dismiss method for notifications

First, the `window.showInformationMessage`, `window.showWarningMessage`, and `window.showErrorMessage` methods do not provide a way to dismiss these programmatically.

Luckily, I found a solution to use a progress notification (`window.withProgress`) to overcome this. It is a pretty neat solution, but it has another issue. Progress notifications do not allow you to provide additional actions. For this problem, I decided to use a link with a command URI which will trigger the undo functionality and dismisses the progress notification.

### Dismiss the progress notification after a given time

The last issue is when a user clicks on the hyperlink/command action in the progress notification, it will not automatically dismiss.

Additional logic is required to solve the dismiss issue in progress notifications.

{{< blockquote type="info" text="I wrote about this logic in the [Cancel progress programmatically in Visual Studio Code extensions](https://www.eliostruyf.com/cancel-progress-programmatically-visual-studio-code-extensions/) article." >}}

## The solution

The whole solution looks as follows:

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

  const message = "Please wait...";
  const commandId = "vscode-examples.undo";
  vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      cancellable: false
    },
    async (progress, token) => {
      return new Promise((async (resolve) => {
        customCancellationToken = new vscode.CancellationTokenSource();

        customCancellationToken.token.onCancellationRequested(() => {
          customCancellationToken?.dispose();
          customCancellationToken = null;

          vscode.window.showInformationMessage("Cancelled the progress");
          resolve(null);
          return;
        });

        const seconds = 10;
        for (let i = 0; i < seconds; i++) {
          // Increment is summed up with the previous value
          progress.report({ increment: seconds, message: `${message} [Undo](command:${commandId})` })
          await sleep(1000);
        }
        
        resolve(null);
      }));
    }
  );

  vscode.commands.registerCommand(commandId, () => {
    if (customCancellationToken) {
      customCancellationToken.cancel();
    }

    // Add your undo logic here
  })
}
{{< / highlight >}}

The code from the above snippet shows a progress notification for 10 seconds with a **undo** link that uses a command URI.

When the user clicks on the link, it triggers the undo command.

{{< video "/uploads/2022/12/click-event-progress-notification.mov" "Click event on a progress notification" >}}