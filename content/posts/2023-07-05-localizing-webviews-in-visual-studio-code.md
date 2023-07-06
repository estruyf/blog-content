---
title: Localization of Webviews in Visual Studio Code Extensions
longTitle: ""
customField: ""
slug: /localization-webviews-visual-studio-code/
description: Discover the process of localizing webviews in Visual Studio Code extensions. Learn how to provide multilingual support for your webview experiences.
date: 2023-07-06T10:13:53.442Z
lastmod: 2023-07-06T10:13:53.923Z
preview: /social/cb0d3ba5-81ea-48c0-a625-9f6d40769574.png
draft: false
comments: true
tags:
  - Localization
  - Visual Studio Code
  - Development
type: post
---

In the [previous post](/localization-visual-studio-code/), I showed how to localize the extension commands/settings and code. In this post, I want to show how to localize the webviews in Visual Studio Code extensions, as this is a bit more complicated and not yet documented.

First, webviews allow you to create fully customizable views for your extensions. I like to use them for [Front Matter CMS](https://frontmatter.codes) to display the content/media/... dashboards. The webviews are created with HTML, CSS, and JavaScript. Developing webviews is like web application development running within Visual Studio Code.

To localize these webviews, we can use the [@vscode/l10n](https://www.npmjs.com/package/@vscode/l10n-dev) dependency.

In this article, I will tell you more about how you can get started with localizing your webviews in Visual Studio Code extensions.

## Assumptions for your webviews

The contents of this article are written for more advanced webviews where you will use frameworks/libraries like React, Vue, ... to render your views.

If you are using the static HTML approach as shown in the [documentation sample](https://code.visualstudio.com/api/extension-guides/webview#passing-messages-from-an-extension-to-a-webview), you can rely on the `vscode.l10n.t()` function to localize your strings.

When you are using a framework/library, you will need to do some extra work to get the localization working in your webviews, and this is what I will explain in this article.

## Prerequisites

First of all, follow the steps that were mentioned in the "[localizing the strings used in your source files](https://www.eliostruyf.com/localization-visual-studio-code-extensions/#localizing-the-strings-used-in-your-source-files)" section of the previous localization article. You must ensure you have configured the `l10n` property in your `package.json` file.

```json
{
  "l10n": "./l10n"
}
```

Next, we will use the [@vscode/l10n](https://www.npmjs.com/package/@vscode/l10n-dev) dependency. This dependency is used internally by the `vscode.l10n.t()` function, but this function is not available in the webview context.

To get started, you will need to install the dependency:

```bash
npm install @vscode/l10n
```

## Localizing your webview

Once the `@vscode/l10n` dependency is installed, you can localize your webview's strings.

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"For this example, I will make use of the [VSCode React Webview Template](https://github.com/estruyf/vscode-react-webview-template/tree/localization) which I created to get started with webview development."}]} -->
{{< blockquote type="info" text="For this example, I will make use of the [VSCode React Webview Template](https://github.com/estruyf/vscode-react-webview-template/tree/localization), which I created to get started with webview development." >}}
<!-- FM:Snippet:End -->

Open one of your webview files and import the `@vscode/l10n` dependency:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"typescript"},{"name":"selection","value":""}]} -->
{{< highlight typescript "linenos=table,noclasses=false" >}}
import * as l10n from '@vscode/l10n'
{{< / highlight >}}
<!-- FM:Snippet:End -->

Next, you must update all your hardcoded strings with the `l10n.t()` function.

Example:

{{< highlight html "linenos=table,noclasses=false" >}}
<div className='app'>
  <h1>{l10n.t("Hello from the React Webview Starter")}</h1>

  <div className='app__actions'>
    <button onClick={sendMessage}>
      {l10n.t("Send message to extension")}
    </button>

    <button onClick={requestData}>
      {l10n.t("Get data from extension")}
    </button>

    <button onClick={requestWithErrorData}>
      {l10n.t("Get data from extension with error")}
    </button>
  </div>

  {message && <p><strong>{l10n.t("Message from the extension")}</strong>: {message}</p>}

  {error && <p className='app__error'><strong>{l10n.t("ERROR")}</strong>: {error}</p>}
</div>
{{< / highlight >}}

Once all these hardcoded strings are replaced, you can start using the `@vscode/l10n-dev` CLI tool to export all your strings to the `bundle.l10n.json` file. You can do this by running the following command:

```bash
npx @vscode/l10n-dev export -o ./l10n ./src
```

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"You can always create your own `bundle.l10n.json` and `bundle.l10n.<locale>.json` files, but the tool gives you a good headstart."}]} -->
{{< blockquote type="info" text="You can always create your own `bundle.l10n.json` and `bundle.l10n.<locale>.json` files, but the tool gives you a good head start." >}}
<!-- FM:Snippet:End -->

In my case, when I run the tool, I get the following output:

{{< highlight json "linenos=table,noclasses=false" >}}
{
  "Hello from the extension!": "Hello from the extension!",
  "Oops, something went wrong!": "Oops, something went wrong!",
  "Received data from the webview {0}": "Received data from the webview {0}",
  "Your extension got activated with the {0} language!": "Your extension got activated with the {0} language!",
  "Hello from the React Webview Starter": "Hello from the React Webview Starter",
  "React Webview": "React Webview",
  "Send message to extension": "Send message to extension",
  "Get data from extension": "Get data from extension",
  "Get data from extension with error": "Get data from extension with error",
  "Message from the extension": "Message from the extension",
  "ERROR": "ERROR"
}
{{< / highlight >}}

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"important"},{"name":"selection","value":""}]} -->
{{< blockquote type="important" text="The `bundle.l10n.json` is only used for the export and to pass to the translators. To support another language, you must create a `bundle.l10n.<locale>.json` file with the translated strings." >}}
<!-- FM:Snippet:End -->

I translated all the strings to the pseudo-language locale `pqs-ploc` for this example. The contents of my `bundle.l10n.qps-ploc.json` file look like this:

{{< highlight json "linenos=table,noclasses=false" >}}
{
  "Hello from the extension!": "ₕₑₗₗₒ 𝒻ᵣₒₘ ₜₕₑ ₑₓₜₑₙₛᵢₒₙ!",
  "Oops, something went wrong!": "ₒₒₚₛ, ₛₒₘₑₜₕᵢₙ𝓰 𝓌ₑₙₜ 𝓌ᵣₒₙ𝓰!",
  "Received data from the webview {0}": "ᵣₑ𝒸ₑᵢᵥₑ𝒹 𝒹ₐₜₐ 𝒻ᵣₒₘ ₜₕₑ 𝓌ₑᵦᵥᵢₑ𝓌 {0}",
  "Your extension got activated with the {0} language!": "Yₒᵤᵣ ₑₓₜₑₙₛᵢₒₙ 𝓰ₒₜ ₐ𝒸ₜᵢᵥₐₜₑ𝒹 𝓌ᵢₜₕ ₜₕₑ {0} ₗₐₙ𝓰ᵤₐ𝓰ₑ!",
  "React Webview": "ᴿᵉᵃᶜᵗ ᵂᵉᵇᵛᶦᵉʷ",
  "Hello from the React Webview Starter": "ₕₑₗₗₒ 𝒻ᵣₒₘ ₜₕₑ ᵣₑₐ𝒸ₜ Wₑᵦᵥᵢₑ𝓌 ₛₜₐᵣₜₑᵣ",
  "Send message to extension": "ˢᵉⁿᵈ ᵐᵉˢˢᵃᵍᵉ ᵗᵒ ᵉˣᵗᵉⁿˢᶦᵒⁿ",
  "Get data from extension": "ᴳᵉᵗ ᵈᵃᵗᵃ ᶠʳᵒᵐ ᵉˣᵗᵉⁿˢᶦᵒⁿ",
  "Get data from extension with error": "ᴳᵉᵗ ᵈᵃᵗᵃ ᶠʳᵒᵐ ᵉˣᵗᵉⁿˢᶦᵒⁿ ʷᶦᵗʰ ᵉʳʳᵒʳ",
  "Message from the extension": "ᴹᵉˢˢᵃᵍᵉ ᶠʳᵒᵐ ᵗʰᵉ ᵉˣᵗᵉⁿˢᶦᵒⁿ",
  "ERROR": "ᴱᴿᴿᴼᴿ"
}
{{< / highlight >}}

Once the strings have been translated, you must implement some logic to get this correctly loaded in your webview. Unfortunately, the `@vscode/l10n` dependency will not automatically retrieve the localized strings for you in your subprocesses like the webview.

## Retrieve the localization strings for the webview

To stay as close as possible to the logic of how Visual Studio Code handles the localization in extensions, I came up with the following solution.

1. From the webview, request the localization strings from the extension host via a `postMessage` call;
2. The extension host listens for this message and returns the localized strings;
3. The webview receives the localized strings and registers them with the `@vscode/l10n` dependency.

To simplify the `postMessage` calls, I will use my [@estruyf/vscode](https://www.npmjs.com/package/@estruyf/vscode) dependency as it provides a `messageHandler` which allows you to `async/await` these calls.

### Extension host listener for the webview messages

The code for your extension host webview listener looks like this:

{{< highlight typescript "linenos=table,noclasses=false" >}}
panel.webview.onDidReceiveMessage(
  (message) => {
    const { command, requestId, payload } = message;

    if (command === "GET_LOCALIZATION") {
      // Check if a l10n path is configured, if not, we will use the default language
      if (vscode.l10n.uri?.fsPath) {
        readFile(vscode.l10n.uri?.fsPath, "utf-8").then((fileContent) => {
          panel.webview.postMessage({
            command,
            requestId, // The requestId is used to identify the response
            payload: fileContent,
          } as MessageHandlerData<string>);
        });
      } else {
        // No localization file means we should use the default language
        panel.webview.postMessage({
          command,
          requestId, // The requestId is used to identify the response
          payload: undefined,
        } as MessageHandlerData<undefined>);
      }
    }
  },
  undefined,
  context.subscriptions
);
{{< / highlight >}}

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"The `vscode.l10n.uri` will only be defined if VS Code is not loaded in the default language and a localization file exists for the current language."}]} -->
{{< blockquote type="info" text="The `vscode.l10n.uri` will only be defined if VS Code is not loaded in the default language and a localization file exists for the current language." >}}
<!-- FM:Snippet:End -->

### Webview message handler

On the webview side, you will need to implement the following message handler:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const [ready, setIsReady] = React.useState<boolean>(false);

React.useEffect(() => {
  messageHandler.request<string | undefined>('GET_LOCALIZATION')
    .then((fileContents) => {
      if (fileContents) {
        l10n.config({
          contents: fileContents
        })

        setIsReady(true);
      }
    }).catch((err) => {
      // On error, we can still continue with the default language
      setIsReady(true);
    });
}, []);
{{< / highlight >}}

{{< blockquote type="info" text="Once the main component loads, it requests the localization content. Once retrieved, it is ready to render its content." >}}

## Results

Once you have implemented the logic, you should be able to see the following results:

**Default language**

{{< caption-new "/uploads/2023/07/webview-1.png" "Webview rendered with the default language"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAAB8SURBVHXBSwrCMBRA0RvJw2KDOLKIgjVTd9Cxq+jMzXYnip+BVqmFNi9xLniOWZf72uV51b47QpzwR2NF5KCqx8XcAYYYFRFhHAMiluvtzjAMM7sqlnhfQko82xfO5fR9T9d9yLIp5XbD6XzB7ApfW2OqCCQSj6Bo4lfzBVGvLnjG/GawAAAAAElFTkSuQmCC" "816" >}}

**Localized webview** (using the pseudo-language)

{{< caption-new "/uploads/2023/07/webview-2.png" "Webview rendered with the translated language"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACRSURBVHXBzQoBYRSA4Xc+U/5GsSLZ2LsFJLkrSzclWcxW4jrEwl8+38yZc7CT8jxRrz8Y1arV8cN7nhLxRxp772d5LnPeHOAiR7lSRkTQQvnw3i/iVrPJdDJERDgcT3Q7ba63O2ZGktRRVTbbPfH1fGG1XJOpYarsMHIpCCHwLQ6Sr9ytyBolh5hxVyWo8SN9AdPoS+yKWbvJAAAAAElFTkSuQmCC" "635" >}}

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"The code for this sample can be found on [GitHub](https://github.com/estruyf/vscode-react-webview-template/tree/localization)."}]} -->
{{< blockquote type="info" text="The code for this sample can be found on [GitHub](https://github.com/estruyf/vscode-react-webview-template/tree/localization)." >}}
<!-- FM:Snippet:End -->