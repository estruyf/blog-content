---
title: "#DevHack: VS Code extension storage options"
date: "2022-02-22T16:17:10.178Z"
draft: false
type: "post"
description: "In this article Elio helps you find out what the options of data storage are in Visual Studio code an which one to use in which circumstances."
lastmod: "2022-02-22T16:17:11.136Z"
preview: "/social/e92b2e3a-2f83-4413-9f85-0bfa725c672d.png"
tags:
  - "Development"
  - "Storage"
  - "VSCode"
  - "Extensions"
categories: []
slug: "/devhack-code-extension-storage-options/"
comments: true
---

For Front Matter and another VS Code extension which is currently in development, I wanted to understand which options there are for storing data. Data can be anything, for some extensions, it will be settings, for others, it is more complicated sets of data.

In this article, I will give you an overview of all the available storage options and when to use them.

## Configuration settings

Configuration settings are not a way to store data for your extension, it only provides a way to how you want the user to use your extension. You can still use this option when you for instance want to manipulate the behavior of your extension from within your user interface.

Each extension can define its own configuration settings, and the user will be able to change it via the settings editor or straight within the JSON file.

Settings can be set and changed on various levels:

-	Default
-	Global
-	Workspace
-	Workspace folder level
-	Language-specific settings

{{< blockquote type="important" text="Only use settings for what they are intended for." >}} 

## State storage

All extensions got access to the memento storage which can keep a key/value state for your extension. It works on two levels: global or workspace.

The state is kept whenever you update Visual Studio Code or update the extension.

You can update the global or workspace state via:

```typescript
await context.globalstate.update(`key`, value)
await context.workspaceState.update(`key`, value)
```

Retrieving state values is achieved similarly:

```typescript
await context.globalstate.get(`key`)
await context.workspaceState.get(`key`)
```

{{< blockquote type="info" text="Behind the scenes, VS Code uses an SQLite database to store these key/value pairs." >}}

## Secret storage

In some cases, you might want to keep secrets, for instance, connection strings. For some time, you had to use other dependencies, but the VS Code team provided a SecretStorage which is intended to be used to store secrets.

The secret storage is accessible via the VS Code extension context:

```typescript
// Retrieving a secret
await context.secrets.get(`secretkey`)

// Storing a secret
await context.secrets.store(`secretkey`, `This is the secret`);
```

## Files

If the previous options are not enough, you could still read/write files to the current workspace/solution/project.

Files still give you full flexibility as you won’t be limited to what the VS Code APIs impose. 

In order to work with files (read/write), you can use the `workspace.fs` API. The workspace file system API exposes the editors’ built-in file system provider.

{{< blockquote type="info" text="Use it whenever you work with complex data like for instance search indexes, databases, or complex JSON data. Be aware, if you store files to the workspace/solution, the users might be able to edit these. If this is not something, you want it might be best to use one of the above options." >}}
