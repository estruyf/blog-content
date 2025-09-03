---
title: "Creating VS Code webviews using Vite"
longTitle: "Creating Visual Studio Code webviews using Vite"
customField: ""
slug: "/creating-code-webviews-vite/"
description: ""
date: null
lastmod: null
preview: "<failed to process>"
draft: true
comments: true
tags: []
type: "post"
fmContentType: "post"
---

When I first began developing the [Demo Time](https://demotime.show) VS Code extension, my webview build process was achieved by using Webpack. The reason was that it is one of the bundle options the VS Code scaffolding provides.

As the project grew, I needed a faster, more modern workflow for React-based webviews. When I started to create the new Config Editor GUI, I decided to build it using Vite and move all existing webviews over to this new setup, but that meant that I had to re-evaluate my entire build process and make some significant changes to how I was developing my webviews and the extension.

In this post, I will share how you can get started with Vite for your own VS Code webviews.

## Project structure

Previously, my project structure looked like this:

```
src
  webview
    index.tsx
    panel.ts
  extension.ts
```

The build process was configured in two parts: the webview and the extension. As mentioned, the webview was build with Webpack and the extension was built with [tsup](tsup.egoist.dev).

{{< blockquote type="info" text="You can find my old project structure as a template here: [Visual Studio Code Extension - React Webview Starter](https://github.com/estruyf/vscode-react-webview-template)." >}}

For the new Vite setup, I reorganized the project structure to better separate concerns and I also went to a monorepo structure (this is not required).

```
src # The extension code
  extension.ts
webviews # The vite project
  main.tsx
```

{{< blockquote type="info" text="I started with the `react-ts` Vite template which you can find on [getting started with Vite](https://vite.dev/guide/)." >}}

## Hooking the webview into the extension

