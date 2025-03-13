---
title: Creating a reusable auth provider in Visual Studio Code
longTitle: ""
slug: /creating-reusable-auth-provider-visual-studio-code/
description: In this article, Elio explains how you can create a reusable authentication provider extension that you can leverage in all your extensions.
date: 2022-09-12T13:54:20.792Z
lastmod: 2022-09-12T13:54:21.287Z
preview: /social/25889665-20f5-4f91-b201-440206eccaf0.png
draft: false
comments: true
tags:
  - Development
  - Visual Studio Code
  - Authentication
type: post
---

A couple of months ago, I wrote about how you could create an authentication provider for Visual Studio Code. In this article, we will take it further and make it reusable by other extensions. 

The reason for creating a reusable authentication provider could differ per solution. Maybe you want to make one for other extensions to leverage, or your company wants to release multiple extensions that can all use the same type of authentication. 

For me, the lather is why I created a reusable authentication provider. Instead of creating an auth provider for each extension we make, we wanted to create one and leverage it from any of the extensions we build in the future.

## How to make it reusable?

First, you already need an authentication provider in a separate extension. 

{{< blockquote type="info" text="In case you do not have one yet, you can read my previous article on how to create one here: [Create an Authentication Provider for Visual Studio Code](https://www.eliostruyf.com/create-authentication-provider-visual-studio-code/)." >}}

Once you have the authentication provider, you can make it reusable by configuring the `package.json` file.

### Update the activation events

Update the `activationEvents` array with the following:

```json
{
  ...
  "activationEvents": [
    "onAuthenticationRequest:<auth id>"
  ],
}
```

This `onAuthenticationRequest` event with your authentication ID (the ID you used in the `registerAuthenticationProvider` method) will trigger your extension to activate when another extension requests authentication.

With this change applied, your authentication provider extension is now reusable and can be published.

### What about dependent extensions?

All the other extensions that you create require one small change as well. In the extension's `package.json` file, it is best to add the `extensionDependencies` array with the ID of your authentication provider extension.

```json
{
  ...
  "extensionDependencies": [
    "<auth provider extension id>"
  ],
}
```

This array of extension dependencies will ensure that your Visual Studio Code instance installs the authentication provider extension.

## How to use it?

There is no difference in using the authentication provider from another extension. You use the `getSessions` to retrieve the session or create a new one.

```typescript
const session = authentication.getSession("<auth id>", [], { createIfNone: true });
```