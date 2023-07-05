---
title: Localization of Visual Studio Code Extensions
longTitle: ""
customField: ""
slug: /localization-visual-studio-code-extensions/
description: Learn how to localize your Visual Studio Code extensions! Explore localization of commands, settings, and strings in TypeScript files.
date: 2023-07-05T14:34:07.134Z
lastmod: 2023-07-05T14:34:07.681Z
preview: /social/8e3e7cf0-47f6-40ea-8922-e3172c066247.png
draft: false
comments: true
tags:
  - Localization
  - Visual Studio Code
  - Development
type: post
---

Welcome to another blog post where we explore the world of Visual Studio Code extensions! In this article, I will delve into localizing your extensions. Localization allows you to make your extension accessible to users around the globe by providing translations in different languages. As some things were unclear to me when I wanted to start localizing one of my extensions, I wrote this article to help others in the same situation.

## Tips for testing out your localization

When you want to start localizing your extension, you first need to know which languages Visual Studio Code supports. On the [diplay language](https://code.visualstudio.com/docs/getstarted/locales#_available-locales) documentation page from Visual Studio Code, you can find all available locales and how you can install them for your editor.

While testing your localization, the [Pseudo Language Language Pack](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-qps-ploc) extension will help you. It will update the display language of your editor to Unicode characters, which makes the interface still readable, but it will also help you to spot issues with your localization.

{{< caption-new "/uploads/2023/07/localization-1.png" "Testing out the pseudo-language pack"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACgSURBVH3BwWrCQBCA4X+ys4n1Gk+eDT5FwQfx5osWfJaKICpBIVN3Z7f0Jjn0+2S1HvYpvT75h0hz1GGz3fV9fyilkFLm8XySUuKPqhJjZBzHoJfrjVIFEfg+nZnMeLfoWnJOaM7OZEatleXyg8mMd/bzQqSiGgJRlRiVphHmui7iOdNUKiKCu3O7j8wVL7gXVIN+hRBcBMyMubaNuPvxFy1YS1DuIwTjAAAAAElFTkSuQmCC" "796" >}}

## Localizing the commands and settings in your package.json file

To begin with, localizing your extension, we will start with the commands and settings in your `package.json` file of your extension. To add localization support, we need to use a `package.nls.json` and `package.nls.<locale>.json` files. These files hold the translations for the commands and settings in your `package.json` file.

As an example, I will use the following command definition:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":"{\n  \"contributes\": {\n    \"commands\": [{\n      \"command\": \"vscode-react-webview-starter.openWebview\",\n      \"title\": \"Open the webview\",\n      \"category\": \"React Webview\"\n    }]\n  }\n}"}]} -->
{{< highlight json "linenos=table,noclasses=false" >}}
{
  "contributes": {
    "commands": [{
      "command": "vscode-react-webview-starter.openWebview",
      "title": "Open the webview",
      "category": "React Webview"
    }]
  }
}
{{< / highlight >}}
<!-- FM:Snippet:End -->

To localize this command, we first create the `package.nls.json` file in the root of our extension. This file holds the default language value for our extension (English).

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":"{\n  \"command.openWebview\": \"Open the webview\"\n}"}]} -->
{{< highlight json "linenos=table,noclasses=false" >}}
{
  "command.openWebview": "Open the webview"
}
{{< / highlight >}}
<!-- FM:Snippet:End -->

Next, we create the `package.nls.<locale>.json` file in the root of our extension. I will make a `package.nls.qps-ploc.json` file for the pseudo-language in my example.

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":"{\n  \"command.openWebview\": \"ₒₚₑₙ ₜₕₑ 𝓌ₑᵦᵥᵢₑ𝓌\"\n}"}]} -->
{{< highlight json "linenos=table,noclasses=false" >}}
{
  "command.openWebview": "ₒₚₑₙ ₜₕₑ 𝓌ₑᵦᵥᵢₑ𝓌"
}
{{< / highlight >}}
<!-- FM:Snippet:End -->

Within the `package.json` file, you must update the command title with the localization key. To let Visual Studio Code know that you want to use the localization key, you will have to wrap the key with a `%` sign.

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":"{\n  \"contributes\": {\n    \"commands\": [{\n      \"command\": \"vscode-react-webview-starter.openWebview\",\n      \"title\": \"%command.openWebview%\",\n      \"category\": \"React Webview\"\n    }]\n  }\n}"}]} -->
{{< highlight json "linenos=table,noclasses=false" >}}
{
  "contributes": {
    "commands": [{
      "command": "vscode-react-webview-starter.openWebview",
      "title": "%command.openWebview%",
      "category": "React Webview"
    }]
  }
}
{{< / highlight >}}
<!-- FM:Snippet:End -->

{{< caption-new "/uploads/2023/07/localization-2.png" "Localizing the command"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA6SURBVGMUk9FI+ff/nyMDHsDIwLifRU1VjUFMVIzh9+/fDL9+/2b48uUrAwywsrIycHJyMLx5+5YBAGEHESDMCaVSAAAAAElFTkSuQmCC" "797" >}}

## Localizing the strings used in your source files

Let's explore how to localize the strings used in your TypeScript files. Previously, the `vscode-nls` and `vscode-nls-dev` packages were used for localization. However, a new way of marking strings as "needing translation" has been introduced through the `vscode.l10n.t` API, which has been part of the official VS Code API since version `1.73`.

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"You can find more information in the [vscode-l10n GitHub repo](https://github.com/microsoft/vscode-l10n)"}]} -->
{{< blockquote type="info" text="More information can be found on [vscode-l10n GitHub repo](https://github.com/microsoft/vscode-l10n)" >}}
<!-- FM:Snippet:End -->

To start, all you need to do is to wrap your strings with the `vscode.l10n.t` function. If available, this function retrieves the translated string from the corresponding `bundle.l10n.<LANG>.json` file. You can use placeholders (e.g., `{0}`, `{name}`) in your strings to dynamically substitute values at runtime.

As an example, I will use the following string:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"typescript"},{"name":"selection","value":"vscode.window.showInformationMessage(`Your extension got activated with the ${vscode.env.language} language!`);"}]} -->
{{< highlight typescript "linenos=table,noclasses=false" >}}
vscode.window.showInformationMessage(`Your extension got activated with the ${vscode.env.language} language!`);
{{< / highlight >}}
<!-- FM:Snippet:End -->

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"`vscode.env.language` returns the current loaded locale."}]} -->
{{< blockquote type="info" text="`vscode.env.language` returns the current loaded locale." >}}
<!-- FM:Snippet:End -->

This line returns the following notification:

{{< caption-new "/uploads/2023/07/localization-3.png" "Show currently loaded localization"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABCSURBVBXBwQmAQBRDwZd8WXCP3uzAPgSLti/ZixpxRsu67XPvR1kkQRIE3gQB1xjkuU9DEFA25aJsZDFNRWsNEn4fX64RyQFmNBIAAAAASUVORK5CYII=" "624" >}}

To localize the string, we only need to wrap it with the `vscode.l10n.t` function.

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"typescript"},{"name":"selection","value":"import * as vscode from 'vscode';\n\nconst localizedString = vscode.l10n.t('Your extension got activated with the {0} language!', vscode.env.language);"}]} -->
{{< highlight typescript "linenos=table,noclasses=false" >}}
import * as vscode from 'vscode';

const localizedString = vscode.l10n.t('Your extension got activated with the {0} language!', vscode.env.language);
{{< / highlight >}}
<!-- FM:Snippet:End -->

Once you have created these localization changes, you can run the following command in your terminal:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"typescript"},{"name":"selection","value":"npx @vscode/l10n-dev export -o ./l10n ./src"}]} -->
{{< highlight bash "linenos=table,noclasses=false" >}}
npx @vscode/l10n-dev export -o ./l10n ./src
{{< / highlight >}}
<!-- FM:Snippet:End -->

The command creates a `bundle.l10n.json` file in the `./l10n` folder. This file contains all the strings that need translation. For the above sample, it has the following content:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":"{\n  \"Your extension got activated with the {0} language!\": \"Your extension got activated with the {0} language!\"\n}"}]} -->
{{< highlight json "linenos=table,noclasses=false" >}}
{
  "Your extension got activated with the {0} language!": "Your extension got activated with the {0} language!"
}
{{< / highlight >}}
<!-- FM:Snippet:End -->

Now there are still two things to do. First, add the `l10n` property with the directory reference in the `package.json` file.

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":"{\n  \"l10n\": \"./l10n\"\n}"}]} -->
{{< highlight json "linenos=table,noclasses=false" >}}
{
  "l10n": "./l10n"
}
{{< / highlight >}}
<!-- FM:Snippet:End -->

The second thing is to start adding your localizations; you need to add a `bundle.l10n.<locale>.json` file in the `l10n` folder.

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"json"},{"name":"selection","value":"{\n  \"Your extension got activated with the {0} language!\": \"Yₒᵤᵣ ₑₓₜₑₙₛᵢₒₙ 𝓰ₒₜ ₐ𝒸ₜᵢᵥₐₜₑ𝒹 𝓌ᵢₜₕ ₜₕₑ {0} ₗₐₙ𝓰ᵤₐ𝓰ₑ!\"\n}"}]} -->
{{< highlight json "linenos=table,noclasses=false" >}}
{
  "Your extension got activated with the {0} language!": "Yₒᵤᵣ ₑₓₜₑₙₛᵢₒₙ 𝓰ₒₜ ₐ𝒸ₜᵢᵥₐₜₑ𝒹 𝓌ᵢₜₕ ₜₕₑ {0} ₗₐₙ𝓰ᵤₐ𝓰ₑ!"
}
{{< / highlight >}}
<!-- FM:Snippet:End -->

{{< caption-new "/uploads/2023/07/localization-4.png" "Localizing the string"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABFSURBVB3B2w1AQBRF0X1yx8j49KkDdUgUrSShA+d6raVxmpeIWNNGEpIoJbguY5vPnd4Kr6E1+lrJNJKwk1o79uPkJ3gAsNcWjhrx+5IAAAAASUVORK5CYII=" "621" >}}

The code for this sample can be found on [GitHub](https://github.com/estruyf/vscode-react-webview-template/tree/localization).

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"important"},{"name":"selection","value":"If you want to learn more, there is a good sample available: [l10n-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/l10n-sample)"}]} -->
{{< blockquote type="info" text="If you want to learn more, there is a good sample available from the VSCode team: [l10n-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/l10n-sample)." >}}
<!-- FM:Snippet:End -->

In the following article, I will explore how you can localize your webviews.
