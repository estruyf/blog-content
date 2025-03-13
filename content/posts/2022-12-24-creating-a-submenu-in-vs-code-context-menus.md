---
title: "Creating a Submenu in VS Code: A Step-by-Step Guide"
longTitle: ""
slug: "/creating-submenu-code-step-step-guide/"
description: "In this article, Elio explains how to create a submenu in your Visual Studio Code context menus to make these less cluttered."
date: "2023-01-24T10:44:49.047Z"
lastmod: "2023-01-24T10:44:50.590Z"
preview: "/social/4b2202ea-339c-48aa-974f-db2de7ebff44.png"
draft: false
comments: true
tags:
  - "Development"
  - "VSCode"
  - "Extensions"
type: "post"
---

While creating a session about Visual Studio Code extension development, I discovered that creating a submenu in the context menus is possible. These submenus are a great way to make the context menus less cluttered and easier to use.

{{< caption-new "/uploads/2023/01/context-menus.png" "Submenu in a context menu"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAADXSURBVDXBQU7DMBBA0T/2gNOopUKCDSfgHIgd99+wYYkQ0BIyLk6cjBFCfU8eHp9aa04phVImWmvsdlekrsfdEQEa6OFwIKVL5nmmlIk/dTmimgkSqMtC32/Qywvlexio64oAqoqZ8TUYZzEE9HSa2G73rM1pwDgatS7EGDgTEXR/d4/2N0zVGceR1MP1+squAwQ+3j9Z1gUd355J6YVaK2F13J226Uj7W9ydGCNmhlou/JQZRBAEb05KYGZYzuSckRDQ4zCA8E+E5k5Uoes7UkqUaaLkE7/jxXgaA+L1IAAAAABJRU5ErkJggg==" "518" >}}

When trying it out, I could not make it work easily as the docs were unclear. So I decided to write this article to help others who want to create a submenu in their Visual Studio Code context menus.

## Creating the submenu

Creating a submenu starts with the `package.json` file (extension manifest) at the root of your extension.

Add a `submenu` property to the `contributes` section:

```json
{
  ...
  "contributes": {
    "submenus": [
      {
        "id": "sparkup.submenu",
        "label": "Sparkup"
      }
    ]
  }
}
```

Once you have added the `submenu`, you can now register the submenu in the context menu:

```json
{
  ...
  "contributes": {
    "menus": {
      "editor/context": [
        {
          "submenu": "sparkup.submenu",
          "group": "sparkup"
        }
      ]
    }
  }
}
```

The only thing left to do is to add the commands to the submenu:

```json
{
  ...
  "contributes": {
    "menus": [
      "sparkup.submenu": [
        {
          "command": "vscode-sparkup.biasFreeLanguage"
        }
      ]
    ]
  }
}
```

The whole example looks as follows:

```json
{
  ...
  "contributes": {
    "submenus": [
      {
        "id": "sparkup.submenu",
        "label": "Sparkup"
      }
    ],
    "menus": [
      "editor/context": [
        {
          "submenu": "sparkup.submenu",
          "group": "sparkup"
        }
      ],
      "sparkup.submenu": [
        {
          "command": "vscode-sparkup.biasFreeLanguage"
        }
      ]
    ]
  }
}
```

I hope this article helped you to create a submenu in your Visual Studio Code context menus. If you have any questions, feel free to leave a comment below.