---
title: Using Vite for bundling your Visual Studio Code extension
longTitle: ""
customField: ""
slug: /vite-bundling-visual-studio-code-extension/
description: Learn how you can use Vite to generate a bundle for your Visual Studio Code extension.
date: 2023-10-18T09:25:27.699Z
lastmod: 2023-10-18T09:25:28.749Z
preview: /social/6fc66731-3850-4241-b28b-fec6636a430a.png
draft: false
comments: true
tags:
  - Bundling
  - Development
  - Extensions
  - Visual Studio Code
  - Vite
type: post
---

A couple of weeks ago, I started looking into the possibility of retrieving the Content Collections from Astro and generating content-types for [Front Matter CMS](https://frontmatter.codes). Eventually, this got me into [Vite](https://vitejs.dev), and I started to wonder if I could use it to bundle my Visual Studio Code extension to replace the current Webpack setup.

In this article, I will explain how I got it working.

## Why Vite?

Vite is a build tool that focuses on speed and simplicity. I want to switch to Vite for the Front Matter CMS extension to speed up the builds for the three bundles I must create (extension and two webview bundles). The webpack setup takes 10-20 seconds before I can start debugging the extension. Vite should be able to do this in a couple of seconds.

## Getting started

To start, create a new Visual Studio Code extension project with `yo code`. You can choose not to use the webpack setup; we will change the configuration anyway.

{{< caption-new "/uploads/2023/10/new-extension.png" "Create a new VS Code extension"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACaSURBVHXBTWoCQRSF0a9eP6KmCQ5sdyLZQ3blAoMLkGQkDqMDbbT+bgWEBieeExYfw/Zt/r5pDcyMSS6ZiXL8doJ99vPZVxashzWdd1wuV/5OJyYK2TwEEA1JHI5HXnFzp++XVAlJdGaMTdzVaDHyUCJu3jEMK0opmBmpinQ+c7uP0BqkBBKexuvu92fvZkatlSRRYuSZStr9A+srUaCed+SjAAAAAElFTkSuQmCC" "750" >}}

Once the project is created, you can install Vite by running the `npm i vite -D` command.

## Configuring Vite

The next step is to configure Vite. Create a new file called `vite.config.ts` in the root of your project and add the following configuration:

```typescript {linenos=table,noclasses=false}
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/extension.ts",
      formats: ["cjs"],
      fileName: "extension",
    },
    rollupOptions: {
      external: ["vscode"],
    },
    sourcemap: true,
    outDir: "out",
  },
  plugins: [],
});
```

This configuration will create a CommonJS bundle for the extension, like the current webpack setup. The `rollupOptions` exclude the `vscode` module from the bundle, as this is already available in the Visual Studio Code environment.

## Updating the package.json

In the `package.json` file we can update the `scripts` section to use Vite.

```json {linenos=table,noclasses=false}
{
  "scripts": {
    "compile": "vite build",
    "watch": "vite build --watch",
    "package": "vite build --mode production",
  }
}
```

## Time to test

Now that everything is in place, we can test if the extension still works. Run the `npm run compile` command to build the extension.

{{< caption-new "/uploads/2023/10/bundle-extension.png" "Bundle the extension code with Vite"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACASURBVGXBTQrCQAyA0S+dVKggglA8i2uv4cK7KngSwZ2L/uA4k0QQutH3pNvszqntDiJCRBAR/LLyumlKeuz7/YmvYJpmVJVhHFlYfa/VQxhKIcJ5YyAOGDQCHiwUgXalVBG21cllxnJFkkICd8eaBi15vjwf90BgqAbBH6v5+gHFdD8eMEYpEwAAAABJRU5ErkJggg==" "350" >}}

To debug, I typically run the `npm run watch` command myself, giving me more flexibility in opening/closing the debugging extension. This flexibility requires a small change in the `launch.json` file. 

- Open the `launch.json` file
- Remove the `preLaunchTask` from the configuration
- Save the file

If you applied this change, you can now run `npm run watch` and press `F5` to debug your extension.

{{< caption-new "/uploads/2023/10/vite-test-extension.png" "Test the extension with a Vite generated bundle"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACoSURBVE3BPUpDURCA0W/mzg1IAhELEbG3srJ0lS5NXYNgmaQwL+/Ojz7EkHPk9u7+dRrtCYRuxnqzpqlSVez3B6wbPp8+bIQ9g7zwa3iw2x1YZDiqjchB+FhZZQHCojJBhPSZolhoMxaamZwJxJgQVVQblzQyOaui2YrKoDK5ZGaN4s/VZku3BlVUBd/HEyJKpmOPvn2bNCo9YHYg+HdD5/ph4uuzv/8AXMRUxLhjIB8AAAAASUVORK5CYII=" "750" >}}