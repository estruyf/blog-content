---
title: "Adding editor actions for your extension webview in VSCode"
longTitle: "Adding editor actions for your extension webview in Visual Studio Code"
slug: "/adding-editor-actions-extension-webview-vscode/"
description: "In this article, Elio explains how you can take advantage of the activeWebviewPanelId context key to enable or disable commands in Visual Studio Code extensions"
date: "2022-09-02T07:25:34.216Z"
lastmod: "2022-09-02T07:25:34.216Z"
preview: "/social/c04cad11-5d6f-4a80-9d18-c6dfdbcff93f.png"
draft: false
comments: true
tags:
  - "Development"
  - "Visual Studio Code"
  - "Webview"
type: "post"
---

In Visual Studio Code extension development, you may need a webview to give the developer/user the best experience for using your extension/functionalities.

Webviews come in different flavors. You can open them in a panel or an editor view, but there is a difference between both when it comes to showing actions or enabling/disabling commands.

When using a webview in a panel, you can use the `view` context key variable in the **when clause** of the command to get enabled/disabled.

If your webview is opened in the editor view, the `view` context key cannot be used. Instead, you have to add your context key(s) to inform when your webview is active and when not. 

This process is a bit cumbersome and complicates it when you want, for instance, to show commands in the editor title section.

{{< caption-new "/uploads/2022/09/webview-editor-title.png" "Webview - Editor title commands"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACoSURBVI3BsU7DMBiF0e/apigg1AUkJBa2LhUr78prVerMVDGTtKmT+L8oTIyco8fn149g8yaJkhOtNZCIriP6byR4SdOhbG66/e399n2eF8JBFmDTHra08UzKmc/hGmluDUmUUpDEUkfGy8D0dWIXT9Q6YZtSa8X9wC8H9XphJSUOnLDNKvFPBfGHSCmzkhKSwWYOUe6CY536YgwWOSUiAjDLVAkb3I4/OohXJOWGWPoAAAAASUVORK5CYII=" "1048" >}}

It all changed with the release of [Visual Studio Code 1.71.0](https://code.visualstudio.com/updates/v1_71#_new-activewebviewpanelid-context-key). In that release, there is a new context key variable, named `activeWebviewPanelId`, which contains the value of the currently active webview type.

The `activeWebviewPanelId` value is set to the `viewType` you set when creating your webview in the `window.createWebviewPanel` method.

## How to use it

If you only have one webview, it is easy to accomplish. Before, you had to set a context value to track if the webview was active or not. All you needed to do was set your context key when the webview got created and unset it when closed or navigated to another view/tab.

```typescript
commands.executeCommand(`setContext`, `webview.active`, true);
```

When using multiple webviews, you had to ensure not to unsettle the context key when navigating from one to another.

With the availability of the new `activeWebviewPanelId` context key, all you need to do is use it in the **when clause** command you want to enable/disable.

```json
{
  "contributes": {
    ...
    "menus": {
      "editor/title": [
        {
          "command": "vscode-rapidapi-client.request.fullView",
          "group": "navigation",
          "when": "activeWebviewPanelId == '<viewType value>'"
        }
      ]
    }
  }
}
```

Here is how it will look in the extension:

{{< caption-new "/uploads/2022/09/webview-editor-title-command.png" "Webview - Custom command enabled in editor&#x2F;title"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACtSURBVI3BsU7DMBSG0e/ajlEAgZBAYmRjQay8K4/VoY8AYmybJnVs3x9lY+Qce3x++XTyu5mRUqS3Bmb4OOKnIw/WORB2KQ/j29XN/UetDcmJGZDot3f05cw5Zsp09ODdCWYMKWEYtSws88T6882rP1HKChJpLhf6aWIjOeUyszEL7PgCiU3gnxLGH0YIkY1ZwExIQm6ka/d9rYfUeiPGgTxkaq2AqGtBEqjvfwHJyVoe5yricAAAAABJRU5ErkJggg==" "1048" >}}