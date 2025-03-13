---
title: "Protect keys by keeping those out of your VS Code settings"
longTitle: "Protect your API/auth keys by keeping those out of your Visual Studio Code settings"
customField: ""
slug: "/protect-api-auth-keys-keeping-out-vscode-settings/"
description: "Learn how to better protect your API/Authentication keys by keeping them out of your Visual Studio Code settings. This article helps developers and users."
date: "2024-02-21T12:31:41.917Z"
lastmod: "2024-02-21T12:31:42.470Z"
preview: "/social/e8f9cd12-646e-4e4e-85a2-597973fde324.png"
draft: false
comments: true
tags:
  - "Security"
  - "Visual Studio Code"
  - "API"
type: "post"
---

While implementing the i18n (internationalization) features in [Front Matter CMS](https://frontmatter.codes), I wanted to include the ability for users to use DeepL to translate their content automatically.

To be able to use DeepL, you need to have an authentication key, and the user will provide this authentication key.

Initially, I defined it as a configurable setting in the extension. It is the most straightforward way to do it, but then I realized that keeping the key in the extension settings would be a bad idea as it might lead to a security risk.

In this post, I will explain why it is a bad idea and how you can protect your keys by keeping those out of your Visual Studio Code settings.

The article is intended for developers and extension users.

- For developers, you will understand why it is a bad idea to keep keys in the settings of the extension and how to protect those keys for your users better.
- For extension users, you will understand why you should be careful when providing your API/Authentication keys to an extension and understand how they might be stored.

## Why it is a bad idea to keep keys in the settings of the extension

The settings of Visual Studio Code and the installed extensions are stored in JSON files. There are two levels of settings: 

1. **User Settings**: These settings are applied globally to any instance of VS Code.
1. **Workspace Settings**: These settings are applied to the current workspace/project.

As mentioned, those settings are stored in a `settings.json` file, and its location depends on the type of setting level you are configuring.

The user settings its `settings.json` file is stored outside of the current workspace/project into a location which is specific to the operation system the user uses.

{{< blockquote type="info" text="We can consider that the **user settings** are safe as long the user doesn't share the file or a malicious extension access it." >}}

The workspace settings are stored in a `.vscode/settings.json` file in the root of the workspace/project, and this is where a security issue could arise.

If you store your keys in the workspace settings and commit those settings to a repository, you are exposing your keys to anyone with access to the repository.

### Example of an extension

{{< blockquote type="important" text="To illustrate the issue, I will use an example of an extension that uses an API key. I won't mention the extension's name, but I will show you how the settings are stored." >}}

On the Visual Studio Code marketplace, I searched for an extension that uses OpenAI, as this is a typical example of an extension requiring an API key.

In just seconds, I found one which used a setting named `***.apiKey`.

The next step is to discover if users accidentally expose their keys. All I need to do is to search for the `***.apiKey` in the GitHub search.

{{< caption-new "/uploads/2024/02/exposed-api-keys.webp" "Exposed API Keys"  "data:image/jpeg;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCMAAAABHyAQSPydVpgpjYgIGYratoGqvroLXlX+ZIYhov8RH6EnPgBWUDggKAAAAHABAJ0BKgoABgABQCYlnALsAYhAAP78nNQFqT9Untiorle/sZNUAAA=" "1482" >}}

There are many results; I didn't have to search for a long time to find them.

### What can happen if your keys are exposed?

If your keys are exposed, it can lead to a lot of problems:

- **Financial loss**: If you are using a paid service, someone could use your key to make requests, and you will be charged for those requests.
- **Data loss**: If you are using a service that allows you to store data, someone could delete your data.
- **Reputation loss**: If you are using a service that allows you to send emails, someone could send spam emails using your key, and your reputation will be affected.

## How to protect your keys

### As an extension developer

If you are an extension developer, you should avoid storing that key in the Visual Studio Code settings.

Instead, using the **SecretStorage API** provided by Visual Studio Code is better. This API is cross-platform, and its intention is to store secret or sensitive data.

{{< blockquote type="info" text="I already wrote about this API in a previous post: [#DevHack: VS Code extension storage options](https://www.eliostruyf.com/devhack-code-extension-storage-options/)." >}}

The downside of using the SecretStorage API is that you will need to tell your user to provide the key via the input box or within a custom UI.

For example:

```typescript 
// On loading your extension, you can retrieve the API key from the secrets storage
const apiKey = context.secrets.get(`deepl.apiKey`);

if (!apiKey) {
  // If the key is not found, you can ask the user to provide it
  vscode.window.showInputBox({ 
    placeHolder: `Enter your DeepL API key` 
  }).then((key) => {
    if (key) {
      context.secrets.store(`deepl.apiKey`, key);
    }
  });
}
```

### As an extension user

As an extension user, you should be careful when providing an extension's API/Authentication keys. If you notice that the extension asks for those keys in the settings, you should know that those keys could be exposed. You can also make the extension developer aware of the issue.

{{< blockquote type="important" text="If you are using an extension that requires an API key, you should check the documentation of the extension to see how the keys are stored." >}}
