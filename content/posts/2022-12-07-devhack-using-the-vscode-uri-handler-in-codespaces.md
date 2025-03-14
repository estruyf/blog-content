---
title: "#DevHack: using the VSCode's URI Handler in codespaces"
longTitle: "#DevHack: using the Visual Studio Code's URI Handler in codespaces"
slug: /devhack-vscode-uri-handler-codespaces/
description: In this article, Elio explains the correct way to use Visual Studio Code's URI handler to ensure that it also works on GitHub Codespaces and Gitpod.
date: 2022-12-07T12:43:15.352Z
lastmod: 2022-12-07T12:43:15.352Z
preview: /social/6b7a2df4-27a5-4b76-b511-9468f303fb88.png
draft: false
comments: true
tags:
  - Codespaces
  - GitHub
  - Gitpod
  - VSCode
type: post
---

If you are reading this article, you know what a URI handler in Visual Studio Code is, but in case you do not. A URI Handler allows you to create a callback into your extension. Typically this is used in authentication flows to open your browser, fill in your credentials, and get redirected back into Visual Studio Code. Your URI Handler will then process the rest of the authentication process, like requesting an access token.

While working on a custom authentication provider, I found it needed to be fixed for GitHub Codespaces and Gitpod. The URI Handler, configured in my Visual Studio Code extension, never got triggered when invoked from within a Codespace. On the desktop, it works fine, so this got me to understand better how it works.

## The investigation

First, I investigated the differences between the desktop and codespaces URI handler flows. 

A good starting point was the [callbacks and URI handlers for codespaces](https://code.visualstudio.com/api/advanced-topics/remote-extensions#callbacks-and-uri-handlers) documentation from Visual Studio Code. The documentation explains that you should use the `vscode.env.asExternalUri` method to generate the redirect URL.

You need to use the `vscode.env.asExternalUri` method, because it will convert the URL to the right environment. 

For the desktop, your URL should look as follows: `vscode://<publisher>.<extension name>`. If you are using the insiders version of Visual Studio Code, it will be `vscode-insiders://`.

If you use the `asExternalUri` method in your extension running on a codespace, its URL will be linked to your remote URL of GitHub Codespaces or Gitpod.

For the example, I use the following code:

```typescript
const extensionUrl = `${vscode.env.uriScheme}://eliostruyf.vscode-remoteuri-sample`;
const extensionUrlParsed = vscode.Uri.parse(extensionUrl);
const callbackUri = await vscode.env.asExternalUri(extensionUrlParsed);

// Use the callbackUri to open a browser
vscode.env.openExternal(callbackUri.toString(true));
```

This code generates me the following results:

### GitHub Codespaces

- Codespace URL: `https://estruyf-opulent-capybara-4grqx5g7953754v.github.dev/`
- External URI: `https://estruyf-opulent-capybara-4grqx5g7953754v.github.dev/extension-auth-callback?state=5d6adcfd65b9595ea01f177eccf938c7`

Notice the `extension-auth-callback` path and `state` query string parameter. Both are required for the URI Handler to handle the callback.

{{< blockquote type="info" text="In my auth provider, the state got overwritten by my state ID, which is why the URI handler was not triggered." >}}

### Gitpod

On Gitpod, these URLs are different, but the functionality is the same.

- Gitpod URL: `https://project-p63remja22j.ws-eu77.gitpod.io`
- External URI: `https://project-p63remja22j.ws-eu77.gitpod.io/vscode-extension-auth-callback?vscode-reqid=1&vscode-scheme=gitpod-code&vscode-authority=eliostruyf.vscode-remoteuir-handler`

## Outcome

To ensure the URI handler can get triggered, ensure these query string parameters you retrieve from the asExternalUri method are kept unchanged.

The code for the URI handler is pretty simple. It look as follows:

```typescript
vscode.window.registerUriHandler({
  handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {
    vscode.window.showInformationMessage(`URI handler called: ${uri.toString()}`);
  }
});
```

{{< blockquote type="info" text="In the documentation, they use a `uri.path === '/auth-complete'` statement, this is only required if you want to be aware the handler is triggered on a codespace." >}}