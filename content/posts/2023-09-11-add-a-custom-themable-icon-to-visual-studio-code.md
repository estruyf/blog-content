---
title: Add a custom themable icon to Visual Studio Code
longTitle: ""
customField: ""
slug: /add-custom-themable-icon-visual-studio-code/
description: Learn how to create an icon font and add it to your Visual Studio Code extension to add a custom themable icon to the editor.
date: 2023-09-11T08:47:57.020Z
lastmod: 2023-09-11T08:47:57.020Z
preview: /social/a9b74b8a-09ef-401a-b83e-48b3ae031c46.png
draft: false
comments: true
tags:
  - Icons
  - Theming
  - Visual Studio Code
type: post
---

In version 9.2.0 of Front Matter CMS, I wanted to add a status bar item to the editor that shows the Front Matter icon. To achieve this, the Visual Studio Code documentation explains you to add your icon as an icon font to the `icon contribution point` in your `package.json` file.

```json {linenos=table,noclasses=false}
{
  "contributes": {
    "icons": {
      "fm-logo": {
        "description": "Front Matter icon",
        "default": {
          "fontPath": "assets/frontmatter.woff",
          "fontCharacter": "\\e900"
        }
      }
    }
  }
}
```

In this post, I will explain how to create an icon font and how to add it to your Visual Studio Code extension.

## Create an icon font

You can use [IcoMoon](https://icomoon.io/) to create an icon font. IcoMoon is a free and open-source icon font generator. It allows you to select icons from different icon libraries and create your icon font. You can also upload your SVG icons and add them to your icon font.

- Go to [IcoMoon](https://icomoon.io/app/#/select)
- Click on the **import icons** button
- Upload and select your `SVG` icons

{{< caption-new "/uploads/2023/09/icon-font.png" "Front Matter SVG" >}}

- Click on the **generate font** button
- Set the font character or use the default

{{< caption-new "/uploads/2023/09/font-character-code.png" "Set the font character" >}}

{{< blockquote type="important" text="You will need this font character code for the icon contribution configuration." >}}

- Click on the **download** button, which will download a zip file with your icon font

## Add the icon font to your extension

The next step is to add the icon font to your extension and configure the icon contribution point.

- Unzip the downloaded zip file
- Copy the `*.woff` file to your extension
- Open your `package.json` file
- Add the `icons` contribution point with your icon font configuration

```json {linenos=table,noclasses=false,hl_lines=[4,8]}
{
  "contributes": {
    "icons": {
      "fm-logo": {
        "description": "Front Matter icon",
        "default": {
          "fontPath": "assets/frontmatter.woff",
          "fontCharacter": "\\e900"
        }
      }
    }
  }
}
```

There are two essential things to note here:

- **Line 4**: This contains the ID for your icon, which you will need when using the icon in your extension
- **Line 8**: The font character's value is the one you configured on the IcoMoon website is prefixed with a backslash (and escaped because it is a JSON file).

## Using the icon in your extension

Once configured, it is time to use the icon in your extension.

You can use your icon like any other themable icon from Visual Studio Code. For example, in the `StatusBarItem` text, you can use it as follows:

```ts {linenos=table,noclasses=false,hl_lines=[5]}
const fmStatusBarItem = vscode.window.createStatusBarItem(
  'fm-statusBarItem',
  vscode.StatusBarAlignment.Right
);
fmStatusBarItem.text = `$(fm-logo)`;
```
