---
title: "How to callback to your extension from outside VS Code"
longTitle: "How to callback to your extension from outside Visual Studio Code"
description: "In this article, Elio explains how you can create a callback URL that triggers your extension. This allows you to process files, open web pages, and more"
date: "2022-05-05T09:36:14.505Z"
lastmod: "2022-05-05T09:36:14.892Z"
preview: "/social/6a58f044-2e48-4b84-9c34-a34d7effd423.png"
draft: false
comments: true
tags:
  - "Development"
  - "VSCode"
type: "post"
slug: "/callback-extension-vscode/"
---

While creating the authentication provider, I discovered a helpful handler in the Visual Studio Code API, which allows you to handle system-wide URIs and callback into your extension.

In the case of the authentication provider, I use it to retrieve the token that gets passed from the callback, but you can use the registerUriHandler for many more scenarios. You can, for instance, integrate a callback from your website into VS Code. Execute scripts that open a file/content you want to get processed by your extension.

## How to use the registerUriHandler

It is relatively simple to create your own URI handler. All you need is the following code:

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const handleUri = (uri: vscode.Uri) => {
  const queryParams = new URLSearchParams(uri.query);

    if (queryParams.has('say')) {
      vscode.window.showInformationMessage(`URI Handler says: ${queryParams.get('say') as string}`);
    }
  };

  context.subscriptions.push(
    vscode.window.registerUriHandler({
      handleUri
    })
  );
}

export function deactivate() {}
```

{{< blockquote type="info" text="The logic in the **handleUri** is up to you/your extension." >}}

## Calling back to your extension

To trigger the **handleUri** method, you need to trigger it from the following URL `vscode://<publisher>.<extension name>`.

In the case of my example, I use the following URL: `vscode://eliostruyf.vscode-urihandler-test?say=How are you doing?`, which results in the subsequent notification:

{{< caption-new "/uploads/2022/05/uri-handler.png" "URI Handler showing the notification"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA4SURBVGMUkTf5L8DLwwACf/7+ZWBkZGQAgQ8fPzHAwP///xhYfn3/zPDq+xcGXICdnY3h/79/DABETBMlBSJQaAAAAABJRU5ErkJggg==" "564" >}}