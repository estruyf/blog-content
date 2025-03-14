---
title: "#DevHack: Open custom VSCode WebView panel and focus input"
slug: /devhack-open-custom-vscode-webview-panel-focus-input/
author: Elio Struyf
type: post
date: 2020-12-10T15:44:19.362Z
draft: false
tags:
  - Development
  - VSCode
  - Extensions
categories: []
comments: true
preview: /social/6495dd27-cb52-4081-9b7b-4e0428797029.png
---

For the last two weeks, I have been working on my FrontMatter extension for Visual Studio Code. This extension helps others and myself make it easier to manage their static markdown pages' metadata. Some time ago, I received the question to enhance the tag and category experience. As when you have many tags or categories, it is not optimal to use the selectors/pickers VSCode provides you.

{{< caption-new "/uploads/2020/12/vscode1.png" "Default multi-select picker in VSCode"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAACfSURBVIXBMU7EMBCG0W9mLRQklJqDcAkK7n8EOqpN7MSe+YFqC5Lwnr29f6g41NrovQPiwYjnV8rtk6Iqbmxwv7MvC399kWb4y9MgM6m1ciYzcUnEGEzTxBVXihHBuq5cKe7OPM+0baP3zqFMCgmhwegdZXLEzfAfSOKKueHmRkRiZpyRwN2MXxHBGUl4RNBa4z9lWRb6vmMGEYEkjnwDgZpfzxnLP9UAAAAASUVORK5CYII=" "771" >}}

The idea I came up with to improve the experience is to use a custom view panel. From where you can quickly see the SEO recommendations and perform all actions the extension offers. I released this panel functionality in version `1.10.0`.

{{< caption-new "/uploads/2020/12/vscode2.png" "New FrontMatter panel in VSCode"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAAAklEQVR4AewaftIAAAEcSURBVH3BSW7cMBBA0V9kkerJQ4I24CN4ES9y/22OkWUWDRvoCS2JUklkzAAB4qDt9+Tp+XtZLpeYGZfLhWtKAV2vN8QYAUE18BFNKbHdbokxknOmlIKZYWb8S8dxZLfbUYkIVSmF/2m4b/APkf1hj4gQNTLnwjTzplC5M2jnes5ND4/gnRBWC6IIx/ZEyfwRDNRPDtc7qiZEFi7gnMOGBeNkVDJnNLaeaJEqBOXudoVzwrRPNLOjGoYB9aoUoOs6quPpzDU6u0CzueX+5itd13GNDT2aHwambwmbDB08rITgleOPV+RQ+EspQAYvHvvZY78SlfCehhfHOnnaNmFt4iM6i2eYQRcbvqxu6NqWwns2jqilntM48qk88xughYOECZKEewAAAABJRU5ErkJggg==" "442" >}}

{{< blockquote type="info" text="You can find the extension on the VSCode marketplace: [Front Matter](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter)." >}}

After releasing it, I got positive feedback and the question if I could make it possible to open the panel and focus on the tag/category input field.

The solution is a two-step process:

1. Trigger your panel to open
2. Post a message to the panel to specify it has to focus on an input

## 1. Open a panel from your extension

The first step is "easy", although I was looking at the VSCode API for a long time, which seemed to be the wrong direction. The solution is to use the `workbench.view.extension.<your-panel-id>` command.

You can use the following snippet to include it in your extension:

```typescript
let insertTags = vscode.commands.registerCommand('frontMatter.insertTags', async () => {
  await vscode.commands.executeCommand('workbench.view.extension.frontmatter-explorer');
});
```

{{< blockquote type="info" text="Link to my extension file: [extension.ts](https://github.com/estruyf/vscode-front-matter/blob/681b09d79bd04f35569a3a2688097ef6a67cd56c/src%2Fextension.ts#L23)." >}}

## 2. Posting message to your panel

Step two is to post a message and needs to perform after opening your extension panel. In my extension, I make use of React in my WebView, and this is not a requirement.

First of all, you need to send a message to your panel to let it know you want to set the focus on the input.

```typescript
// Post message from your extension to the WebView
this.panel!.webview.postMessage({ command: "focus" });
```

In the WebView, where you listen to all these incoming messages, you create the focus listener.

```typescript
window.addEventListener('message', event => {
  const message = event.data;
  
  switch (message.command) {
    case "focus":
      const elm = document.querySelector('input');
	    elm!.focus();
      break;
    }
  });
```

Once you have these two things in place, you can do something similar to this:

{{< caption-new "/uploads/2020/12/vscode3.gif" "Trigger tag input from command" >}}

*Happy coding*