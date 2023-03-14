---
title: How to use the Microsoft auth provider in Visual Studio Code
longTitle: How to use the Microsoft authentication provider in Visual Studio Code
description: In this article, Elio explains how you can use the Microsoft authentication
  provider in your extensions.
date: 2022-04-27T13:44:07.529Z
lastmod: 2022-04-27T13:44:08.012Z
preview: /social/b786a94f-6381-4e90-bd9d-cf8440411918.png
draft: false
comments: true
type: post
tags:
  - Authentication
  - Azure AD
  - Development
  - VSCode
  - OAuth
slug: /microsoft-authentication-provider-visual-studio-code/
---

While creating a custom authentication provider, I found out the standard Microsoft authentication provider in Visual Studio Code can be used with your Azure AD Apps and Tenants.

By default, VS Code supports the `github`, `github-enterprise`, and `microsoft` authentication providers, but little documentation is available, mostly coming from the issues in the VS Code repo.

This article explains how you can use the **Microsoft Authentication Provider** within your extension.

## Using an authentication provider

If you want to use one of the standard authentication providers, all you need to do is get the current session.

{{< highlight typescript "linenos=table,noclasses=false" >}}
await vscode.authentication.getSession(providerId, scopes, options)
{{< / highlight >}}

- **providerId**: `github`, `github-enterprise`, or `microsoft`;
- **scopes**: The permissions scopes to request an access token;
- **options**: Additional options like specifying if you want to request you to log in if you are signed out.

When the `getSession` method returns you an authentication session, you can use the access token on the session object to call the APIs.

The Microsoft authentication provider, as is, is used when you want to sync your settings with a Microsoft account. Although, you cannot use it with your scopes like you can with the `github` authentication provider. The Microsoft - Azure AD app used behind the scenes has a predefined permission set configured. You will not be able to change it, but do not worry. There is a way for you to leverage the authentication provider still.

## Using the authentication provider with your Azure AD app

When you use the `authentication.getSession` method, you must provide the scopes. Luckily, the developers that created the Microsoft Authentication Provider thought about allowing you to provide your Azure AD app. I found the solution for this when I was reading the code of the authentication provider.

Apparently, you have two "special" tokens you can define in the scopes array:

- `VSCODE_CLIENT_ID:<client-id-value>`
- `VSCODE_TENANT:<tenant-id-value>`

Here is an example of how I use it:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const session = await vscode.authentication.getSession('microsoft', [
  "VSCODE_CLIENT_ID:f3164c21-b4ca-416c-915c-299458eba95b", // Replace by your client id
  "VSCODE_TENANT:common", // Replace with the tenant ID or common if multi-tenant
  "offline_access", // Required for the refresh token.
  "https://graph.microsoft.com/User.Read"
], { createIfNone: false });
{{< / highlight >}}

{{< blockquote type="important" text="The **offline_access** scope is very important. You will not get a refresh token if you do not define this. The authentication provider will log you out when reloading your VS Code instance." >}}

## Azure AD app configuration

To make this flow work, you need to define the `https://vscode.dev/redirect` redirect URI for the **Mobile and desktop applications** authentication setting on your Azure AD app.

{{< caption-new "/uploads/2022/04/vscode-azure-ad.png" "Azure AD - Redirect URL"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAADLSURBVE3BS1LDQAxAwSeNxr+YuML9T8iChAWDTaQRxcIU3fJ2f2TpgarSE6oV5nnGzDhlJlYF1usVM+OjOSLJ/kws+SMi2DOCY99hmvCvB8+EaZqIfkBCMUNLwWpRMhNVxawiQGZnqCOigkfikViqsVwWVJVv79CDaoXP2OmikLAuI2oquDu/1mXCitIz6eGMBV63laFWzN3JCGqt9Ps749Go2w3ZNkhwd6Indts2Tn5ZkfUFHQbGYpwMUP5xqagqEUFrjdYamYmI8AMsYWL4xOupUQAAAABJRU5ErkJggg==" "925" >}}

Once this configuration is completed, you can start using the Microsoft Authentication Provider in your extension.

{{< video "/uploads/2022/04/2022-04-27_15-38-50.mp4" "Using the Microsoft Authentication Provider" >}}