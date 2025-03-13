---
title: "#DevHack: check how your VSCode extension is running"
description: "This article describes how you can check if your VSCode extension is running in development, production, or test mode."
date: "2021-12-17T13:15:57.292Z"
lastmod: "2021-12-17T13:15:57.860Z"
type: "post"
draft: false
tags:
  - "Extensions"
  - "VSCode"
  - "Development"
categories: null
slug: "/devhack-check-vscode-extension-running/"
preview: "/social/51757d96-10e1-4c6f-9eee-582ddd85d464.png"
keywords:
  - "vscode"
---

When developing Visual Studio Code extensions, it might come in handy to know when running a production- or debug-build.

Typically in Node.js projects, we verify this by using the `NODE_ENV` environment variable. Unfortunately, this approach cannot be used as VS Code runs in a different instance, and environment variables are lost.

## Solution

Luckily, there is a way to check how your extension is running. You can check this via the vscode extension API.

You can retrieve the mode your extension is started with via the `context.extensionMode` property.

```javascript
import { ExtensionContext, ExtensionMode } from 'vscode';

export function activate(context: ExtensionContext) {
  
  if (context.extensionMode === ExtensionMode.Development) {
    // Running in development mode
  } else if (context.extensionMode === ExtensionMode.Test) {
    // Running in test mode
  } else {
    // Running in production mode
  }
}
```

There are three modes:

- Development
- Production
- Test

Hopefully, this #DevHack helps you to tweak your development flow when creating VS Code extensions.
