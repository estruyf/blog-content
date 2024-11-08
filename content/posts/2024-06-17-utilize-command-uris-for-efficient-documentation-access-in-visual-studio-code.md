---
title: "Utilize command URIs for documentation access in VSCode"
longTitle: "Utilize command URIs for efficient documentation access in Visual Studio Code"
customField: ""
slug: "/utilize-command-uris-documentation-access-vscode/"
description: "Learn how to improve the accessibility of your Visual Studio Code extensions by utilizing command URIs to open the documentation directly in the editor."
date: "2024-06-17T11:08:45.153Z"
lastmod: "2024-06-17T11:08:45.715Z"
preview: "/social/58692959-e953-4be4-ba35-dbddc7d7724d.png"
draft: false
comments: true
tags:
  - "Documentation"
  - "VSCode"
type: "post"
---

One key benefit of using command URIs in your Visual Studio Code extensions is the ability to trigger commands from links in the editor. Those links can be added to various places in the extension, such as hover cards, notifications, webviews, and completion item details.

{{< blockquote type="info" text="A command URI starts with the `command:` scheme followed by the command name and optional arguments. The command is executed in the editor when the user clicks on the link. You can read more about **Command URIs** in the [Command URIs - VS Code Documentation](https://code.visualstudio.com/api/extension-guides/command)." >}}

Another place where you can utilize command URIs is in the description of your extension's settings. Adding your command URIs to the `package.json` file can be helpful if you want to provide a quick way to open the documentation for a specific setting.

For instance, when you have an extension with various settings and a documentation page that explains each setting in detail, you can add a link to the documentation page in the description of each setting. This way, users can quickly access the documentation for a specific setting by clicking the link in the settings UI.

Here's an example of how you can add a link to the documentation page in the description of a setting:

```json {title="Example setting with a link to the docs",hl_lines="10",wrap=true,linenos=false}
{
  "contributes": {
    "configuration": [
      {
        "title": "Front Matter CMS",
        "properties": {
          "frontMatter.projects": {
            "type": "array",
            "default": [],
            "description": "Specify the list of projects to load in the Front Matter CMS. [Docs](https://frontmatter.codes/docs/settings/overview#frontmatter.projects)"
          }
        }
      }
    ]
  }
}
```

The link opens the documentation page in the default browser when the user clicks on the link. As this could be distracting for some users, opening the documentation page directly in the editor would be nice. This way, users can quickly access the documentation without leaving the editor.

## Visual Studio Code - Simple Browser

To achieve this, you can use the built-in simple browser to open the documentation page in the editor. This way, the user will have a seamless experience accessing the documentation for a specific setting within Visual Studio Code.

To open the simple browser, use the following command: `simpleBrowser.show`. Additionally, you can open the documentation page in the simple browser by providing the URL as a parameter.

Here's an example of how you can open the documentation page in the simple browser:

```markdown {title="Open the documentation page in the simple browser"}
[View in VS Code](command:simpleBrowser.show?%5B%22https://frontmatter.codes/docs/settings/overview%23frontmatter.projects%22%5D)
```

{{< blockquote type="important" text="The encoding of the `\[\]`, `\"\"`, and `\#` characters is important. Otherwise, the link will not work." >}}

Combining this with the above sample looks like this:

```json {title="Example setting with a link to the docs in VS Code",hl_lines="10",wrap=true,linenos=false}
{
  "contributes": {
    "configuration": [
      {
        "title": "Front Matter CMS",
        "properties": {
          "frontMatter.projects": {
            "type": "array",
            "default": [],
            "description": "Specify the list of projects to load in the Front Matter CMS. [Docs](https://frontmatter.codes/docs/settings/overview#frontmatter.projects) - [View in VS Code](command:simpleBrowser.show?%5B%22https://frontmatter.codes/docs/settings/overview%23frontmatter.projects%22%5D)"
          }
        }
      }
    ]
  }
}
```

When you go to the settings UI in Visual Studio Code and search for the setting `frontMatter.projects`, you will see the description with both links.

{{< caption-new "/uploads/2024/06/setting-with-links.webp" "Setting with command URI link"  "data:image/jpeg;base64,UklGRnQAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCIAAAABH6CmbQOGP72cwdJBIyLiRKgJQICxbv0zUDii//GVCJGvVlA4ICwAAACwAQCdASoKAAQAAUAmJaQAAudsu8FYAP78pDV/MgoqUfvCD+LuOyZMtpZgAA==" "1892" >}}

When you click on the **View in VS Code** link, the documentation page will open in a simple browser.

{{< caption-new "/uploads/2024/06/simple-browser-docs.webp" "Setting documentation shown in the simple browser from VS Code"  "data:image/jpeg;base64,UklGRnwAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCAAAAABH0AgQPF/ZzGDGxERZ4WaAAQY69Y/A4Uj+h9fiRD5ClZQOCA2AAAA0AEAnQEqCgAEAAFAJiWcAnQBDveKX8AA/vuUv7yeFf/3q49PVfLf7OjXH2N/H8PPY9wEW4AA" "2952" >}}

## Side note

At the time of writing, Visual Studio Code does not yet support showing the command URI links in the JSON hover cards. I have opened an issue in the VS Code repository to track this feature request: [Support command URIs in JSON hover cards](https://github.com/microsoft/vscode/issues/215941).
