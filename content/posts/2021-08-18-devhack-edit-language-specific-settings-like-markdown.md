---
title: "#DevHack: language-specific settings in a VSCode extension"
slug: "/devhack-language-specific-settings-vscode-extension/"
author: "Elio Struyf"
type: "post"
date: "2021-08-18T08:11:02.464Z"
lastmod: "2021-08-18T08:11:02.464Z"
draft: false
tags:
  - "Development"
  - "VSCode"
  - "Extensions"
categories: []
comments: true
description: "Get to know how you can set language-specific settings straight from within the code of your Visual Studio Code extension."
keywords:
  - "language-specific"
preview: "/social/a17cf328-ac07-4193-bb34-b7448f9bcff7.png"
---

When working with Visual Studio Code and different types of languages, you might want to change some settings only for one specific language. 

In my case, this was what I wanted to achieve for Markdown. VSCode is my primary editor, which I use for coding and writing this article. I tried to optimize it for writing blog posts, like increase the line height, different font, and more.

## The manual approach

You can add Language-specific settings in VSCode, by opening your `settings.json` file and specifying a language property name. You do this by using the square brackets `[]` and writing the language ID you want to target.

{{< caption-new "/uploads/2021/08/markdown.png" "Language-specific setting property"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAEBSURBVH3B2U7CUBRA0X2H01YIqIgoBhMfDP//TzhEccK2dLz3KDEkhAfXMtP5vY5H8PEZ+I8/GTrKKjC7XZA6g6qSiBBixACKYozBN73QtzW2Ddwtl3jnUKAoSpq2pW076rrG2zSDKqcoS9Zv7yQirB6fEfGEEOm6jm1V4UOI7IQY2FYVL69r8qLkmI0xshdCZDwesbiZk2Uph6yIsGOtRcSTJgnGGKaTCZfTC/a8iKcFjDF45xgOB6wenvjafHPIGv6oKgpUVU0IgWM+FjkGEDxN09J3PXlRcsyqKjsNAVXFe8f11Yzzs1MO+V8o4JIMyQYY7yg2BduyxEoCMYK1/ACKs3pB0ZKl4gAAAABJRU5ErkJggg==" "323" >}}

In my case, I went for the following settings for my Markdown-specific project settings:

```json
{
  "[markdown]": {
    "editor.fontFamily": "iA Writer Duo S, monospace",
    "editor.fontSize": 14,
    "editor.lineHeight": 26,
    "editor.wordWrap": "wordWrapColumn",
    "editor.wordWrapColumn": 64,
    "editor.lineNumbers": "off",
    "editor.quickSuggestions": false,
    "editor.minimap.enabled": false
  }
}
```

## The extension approach

To achieve the same from within your extension, you will have to use the `getConfiguration` method. You usually use the `getConfiguration` method to retrieve the config settings of your extension by specifying the `section` name. When you want to do a language-specific setting, you need to set an empty string for the `section` name and specify the `languageId`. The looks as follows:

```typescript
const config = vscode.workspace.getConfiguration("", { languageId: "markdown" });
```

Once you have the `config` object and want to set a new setting value, you use the `update` method as follows:

```typescript
/**
 * @param section Configuration name.
 * @param value The new value.
 * @param configurationTarget If `false` it will update the workspace its settings.
 * @param overrideInLanguage Specify if you want to update a language-specific setting
 */
config.update("editor.fontSize", 14, false, true);
```

{{< blockquote type="important" text="The third parameter in the above code snippet is the most important one." >}}

You can use the `get` method as you would normally use it:

```typescript
const fontSize = config.get("editor.fontSize");
```
