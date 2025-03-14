---
title: "Splitting VSCode Extension Settings into Multiple Categories"
longTitle: "Organize and Optimize: Splitting Visual Studio Code Extension Settings into Multiple Categories"
customField: ""
slug: "/splitting-vscode-extension-settings-multiple-categories/"
description: "Organize Visual Studio Code extension settings into multiple categories for a better overview and easier configuration with this guide."
date: "2023-07-22T22:03:10.444Z"
lastmod: "2023-07-22T22:03:09.856Z"
preview: "/social/e2c2b8e6-28db-4250-a6a0-e3ffb2a68c8e.png"
draft: false
comments: true
tags:
  - "Extensions"
  - "Settings"
  - "VSCode"
type: "post"
---

I have always been adding my Visual Studio Code extension settings to the `contributes.configuration` object, but I was missing a way to organize the settings in multiple sections/groups. That way, the end user gets a better overview of all settings grouped by their category.

When reading the [VSCode `contributes.configuration` schema](https://code.visualstudio.com/api/references/contribution-points#contributes.configuration) documentation, I spotted the following: "**This section can either be a single object, representing a single category of settings, or an array of objects, representing multiple categories of settings.**"

As mentioned, I have always used the `contributes.configuration` property as a single object. However, if you want to group your settings by categories, you only need to define it as an array.

Here you can see an example of how it looks like for a single object:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":""}]} -->
```json
{
  "contributes": {
    "configuration": [
      {
        "title": "Content",
        "properties": {
          "frontMatter.content.hideFm": {
            "type": "boolean",
            "markdownDescription": "%setting.frontMatter.content.hideFm.markdownDescription%"
          },
          "frontMatter.content.hideFmMessage": {
            "type": "string",
            "default": "Use the editor panel to make front matter changes",
            "markdownDescription": "%setting.frontMatter.content.hideFmMessage.markdownDescription%"
          },
          "frontMatter.dashboard.content.pagination": {
            "type": [
              "boolean",
              "number"
            ],
            "default": true,
            "markdownDescription": "%setting.frontMatter.dashboard.content.pagination.markdownDescription%"
          }
        }
      }
    ]
  }
}
```
<!-- FM:Snippet:End -->

To create multiple categories, all you need to do is change the `contributes.configuration` to an array, and each object you add needs to contain the `title` (used as the category title) and `properties` (used for the settings in the category) properties. When we group the settings of the above example into two categories, it looks as follows:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":""}]} -->
```json
{
  "contributes": {
    "configuration": [
      {
        "title": "Content",
        "properties": {
          "frontMatter.content.hideFm": {
            "type": "boolean",
            "markdownDescription": "%setting.frontMatter.content.hideFm.markdownDescription%"
          },
          "frontMatter.content.hideFmMessage": {
            "type": "string",
            "default": "Use the editor panel to make front matter changes",
            "markdownDescription": "%setting.frontMatter.content.hideFmMessage.markdownDescription%"
          }
        }
      },
      {
        "title": "Dashboard",
        "properties": {
          "frontMatter.dashboard.content.pagination": {
            "type": [
              "boolean",
              "number"
            ],
            "default": true,
            "markdownDescription": "%setting.frontMatter.dashboard.content.pagination.markdownDescription%"
          }
        }
      }
    ]
  }
}
```
<!-- FM:Snippet:End -->

This results in the following outcome:

{{< caption-new "/uploads/2023/07/group-settings.png" "Grouping extension settings"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABjSURBVFXBMQ7CQAxFwWd/L1IikXNw/zulp8imwV7Twoxd12yFmPNm3zdGDH7dn5vzfRJZhSQeY5CZhIS5cHPc4Ygnx/bCu2F1k5XIRdWiG8z4EyOEmwGiqmgM9aJqAQY0ZsYXT5cqDCTuxLMAAAAASUVORK5CYII=" "1395" >}}