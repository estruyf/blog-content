---
title: "Using GitHub Copilot's LLM in your VS Code extension"
longTitle: "Using GitHub Copilot's LLM in your Visual Studio Code extension"
customField: ""
slug: "/github-copilot-llm-code-extension/"
description: "Explore the integration of GitHub Copilot's LLM API in your VS Code extension to revolutionize your development workflow with AI."
date: "2024-06-27T10:54:51.149Z"
lastmod: "2024-06-27T10:54:51.149Z"
preview: "/social/c7604590-df43-4780-89e9-38164c21a1ed.png"
draft: false
comments: true
tags:
  - "API"
  - "GitHub Copilot"
  - "Visual Studio Code"
type: "post"
---

In the July 2024 release of Visual Studio Code, extension developers will be able to use GitHub Copilot's Language Model API (LLM) to their advantage by using the Language Model API. This new Language Model API (LLM) allows you to retrieve the available LLMs in Visual Studio Code and make requests.

{{< blockquote type="info" text="You can read more about it in the [Language Model API](https://code.visualstudio.com/api/extension-guides/language-model) documentation." >}}

The nice thing about this new API is that you can use it in your extension any way you want. For instance, you can integrate your extension into the GitHub Copilot chat, perform requests from your extension commands, create your own code completion logic, etc.

[Waldek Mastykarz](http://blog.mastykarz.nl) gave me the idea to test this out in the [Front Matter CMS](https://frontmatter.codes) extension. Front Matter already had an AI integration for title, description, and taxonomy suggestions, but it was only available to the project's sponsors. The idea is to change this to allow users to use the GitHub Copilot LLM when it's available in their editor.

{{< blockquote type="important" text="To use the GitHub Copilot LLM, you need to have the GitHub Copilot extension installed and an active GitHub Copilot subscription." >}}

## Using the Language Model API

In the upcoming version of Front Matter CMS, the GitHub Copilot LLM will be used when creating a new article to suggest a title and allow the user to generate a description and taxonomy based on the title and contents of the article. Extension commands trigger these actions.

In the example, I will show you how to interact with the LLM from within your extension commands.

### Retrieving the available LLMs

To retrieve the available LLMs in Visual Studio Code, use the `vscode.lm.selectChatModels` method. This method returns a promise that resolves to the available LLM's.

{{< blockquote type="info" text="At the moment of writing this article, there were three models available `gpt-3.5-turbo`, `gpt-4`, and `gpt-4-turbo` for GitHub Copilot." >}}

```typescript {title="Retrieving the model"}
// Retrieving all models
const models = await vscode.lm.selectChatModels();

// Retrieving a specific model
const [model] = await vscode.lm.selectChatModels({
  vendor: "copilot",
  family: "gpt-3.5-turbo"
});
```

### Creating a prompt

Once you know the model is available, we can create a prompt to interact with the LLM. The prompt is created by one or multiple `vscode.LanguageModelChatMessage` strings.

{{< blockquote type="tip" text="For more advanced prompt creation, Visual Studio Code team is building the [@vscode/prompt-tsx](https://www.npmjs.com/package/@vscode/prompt-tsx) dependency." >}}

```typescript {title="Creating a prompt"}
const title = await vscode.window.showInputBox({
  placeHolder: "Enter the topic",
  prompt: "Enter the topic of the blog post",
});

if (!title) {
  return;
}

const messages = [
  vscode.LanguageModelChatMessage.User(`For an article created with Front Matter CMS, create me a SEO friendly description that is a maximum of 160 characters long.`),
  vscode.LanguageModelChatMessage.User(`Desired format: just a string, e.g., "My first blog post".`),
  vscode.LanguageModelChatMessage.User(`The article topic is """${title}"""`),
];
```

### Sending the prompt

Once the prompt is created, you can send it to the LLM using the `model.sendRequest` method.

```typescript {title="Sending the prompt"}
let chatResponse: vscode.LanguageModelChatResponse | undefined;

try {
  chatResponse = await model.sendRequest(
    messages,
    {},
    new vscode.CancellationTokenSource().token
  );
} catch (err) {
  if (err instanceof vscode.LanguageModelError) {
    console.log(err.message, err.code, err.cause);
  } else {
    throw err;
  }
  return;
}

let allFragments = [];
for await (const fragment of chatResponse.text) {
  allFragments.push(fragment);
}

vscode.window.showInformationMessage(allFragments.join(""));
```

The result of this code looks like this:

{{< video "/uploads/2024/06/github-copilot-llm.mp4" "Using the GitHub Copilot LLM in your extension" >}}

## Conclusion

The Visual Studio Code team made it easy for extension developers to use the GitHub Copilot LLM in their extensions. This LLM API opens up many possibilities for extension developers to enhance their extensions with AI capabilities.