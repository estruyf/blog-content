---
title: Add a support link for a VSCode extension on the marketplace
longTitle: Adding a support link for your Visual Studio Code extension on the marketplace
customField: ""
slug: /add-support-link-vscode-extension-marketplace/
description: Learn how to add a support link for your VSCode extension on the marketplace to provide helpful resources and assistance to your users.
date: 2024-02-28T14:19:19.562Z
lastmod: 2024-02-28T14:19:19.562Z
preview: /social/a7944ce9-9f96-4030-aaa3-25416e29ae2c.png
draft: false
comments: true
tags:
  - Marketplace
  - Support
  - VSCode
type: post
---

While preparing a new release for Front Matter CMS, I noticed an API call to GitHub failing from the Visual Studio Code marketplace. While looking into it, it requested a `SUPPORT.md` file in the repository's root.

{{< caption-new "/uploads/2024/02/vscode-marketplace-support.webp" "VSCode Marketplace - Call for the SUPPORT.md file"  "data:image/jpeg;base64,UklGRoYAAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCAAAAABHyCQTfxNWxLXiIiQoSYAEobhTf8MUNMQEf2PNcT9NVZQOCBAAAAA0AEAnQEqCgAFAAFAJiWcAvzhC1zyLAAA/ub7pyDo+lXcK37piW30q1PIFa5h//83WyZ/RRbeSoopxDOGR4AAAA==" "1200" >}}

The VSCode Marketplace uses the following API format: `https://api.github.com/repos/username/repo/contents/SUPPORT.md`.

{{< blockquote type="info" text="You can find more information in the [get repository content](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content) GitHub API documentation." >}}

This API returns more information about the file if it exists, like the `download_url` and `html_url`. The `html_url` links to the support page from the marketplace.

If you want to add a support link to your extension under the **resources** section. All you have to do is a `SUPPORT.md` file in the root of your repository. The content of the file can be anything you want. Once you push the file to the repository, the marketplace picks it up and displays the support link.

{{< caption-new "/uploads/2024/02/vscode-marketplace-support-link.webp" "VSCode Marketplace - Support link"  "data:image/jpeg;base64,UklGRooAAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCEAAAABHyAgIf4/lRHciIiYhJoASBiGN/0zQE1DRPQ/1hD31wAAVlA4IEIAAADQAQCdASoKAAUAAUAmJaQAAunBDF96gAD+6l1pR3ZvZdYprft8xvULi3B4At//LD43f3wXyDqd1URXyGLqz2GAAAA=" "1200" >}}
