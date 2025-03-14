---
title: "Integrate your VS Code extension in SCM input"
longTitle: "Integrate your Visual Studio Code extension in the Source Control Management input"
customField: ""
slug: "/integrate-code-extension-scm-input/"
description: "Integrate your VS Code extension into SCM input to provide additional logic for your commit messages."
date: "2024-06-13T13:08:03.908Z"
lastmod: "2024-06-13T13:08:03.908Z"
preview: "/social/08600b26-41c6-45f6-8469-4b5f81cbfef1.png"
draft: false
comments: true
tags:
  - "Extensions"
  - "VSCode"
  - "git"
type: "post"
---

For a new Visual Studio Code extension called [CommitHelper](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-commit-helper), I wanted to integrate the extension in the Source Control Management (SCM) input. The extension should provide a list of predefined commit messages from which the user can select by using a slash `/` in the input field.

{{< caption-new "/uploads/2024/06/scm-input.webp" "Source Control Management Input"  "data:image/jpeg;base64,UklGRngAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCAAAAABHyAQQXO12BYzHBGRDDJpG3rX3ubfyWYjov+RsrubAlZQOCAyAAAAsAEAnQEqCgAEAAFAJiUAToAh34sBoAD+/loqzE7YVeVZNp1YlrRtfO3Xia5atPf9wAA=" "836" >}}

I got the idea from the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) that provides a similar experience when tagging/linking issues.

{{< caption-new "/uploads/2024/06/tagging-issues.webp" "GitHub Pull Requests - Tagging issues"  "data:image/jpeg;base64,UklGRn4AAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSCEAAAABHyAQSPylRlgpjYgIGWoCIGEY3vTPAD3NENH/WEPcvwYAVlA4IDYAAADwAQCdASoKAAcAAUAmJZQCdAERHwHviAAA/v26QgkzbF3NMhz8G27C4mFrlTPJlNuKZv/AAAA=" "1316" >}}

In this article, I will explain how to integrate your Visual Studio Code extension into the SCM input.

## Using the VS Code language features

To integrate your extension in the SCM input, you can use the [VS Code language features](https://code.visualstudio.com/api/language-extensions/programmatic-language-features). The language features allow you to provide IntelliSense, hover information, text completion, and more for your language.

The SCM input field also has a language identifier, which you can use to provide text completion for your extension. The language identifier for the SCM input field is `scminput`.

In case you want to add text completion to the SCM input field, you can do this by registering a completion item provider for the `scminput` language identifier like this:

```typescript title="Register the completion item provider"
context.subscriptions.push(
  vscode.languages.registerCompletionItemProvider(
    "*", // All document types
    new MessageCompletionProvider(),
    "/" // The trigger character
 )
);
```

The `MessageCompletionProvider` class looks like this:

```typescript title="MessageCompletionProvider class"
import * as vscode from "vscode";

export class MessageCompletionProvider implements vscode.CompletionItemProvider
{
  constructor() {}

  public async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ) {
    // No completion items if the SMC input is not used
    if (
      document.languageId !== "scminput" &&
      context.triggerKind === vscode.CompletionTriggerKind.Invoke
    ) {
      return [];
    }

    const range = new vscode.Range(
      new vscode.Position(position.line, position.character - 1),
      position
    );

    const list: vscode.CompletionList = new vscode.CompletionList();

    // Add your completion items
    list.items.push({
      label: "feat",
      insertText: `feat `,
      kind: vscode.CompletionItemKind.Value,
      additionalTextEdits: [vscode.TextEdit.delete(range)], // Delete the trigger character
    });

    list.items.push({
      label: "fix",
      insertText: `fix `,
      kind: vscode.CompletionItemKind.Value,
      additionalTextEdits: [vscode.TextEdit.delete(range)], // Delete the trigger character
    });

    return list;
  }
}
```

You can add your completion items in the MessageCompletionProvider class. In the example above, I added two: `feat` and `fix`. When the user selects one of these items, it inserts the text in the SCM input field.

{{< caption-new "/uploads/2024/06/scminput-completion-items.webp" "SCM Input - Completion items"  "data:image/jpeg;base64,UklGRnYAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCAAAAABHyAQQXM12BorHBGRDDJpG3rX3ubfyWYjov+RsrubAlZQOCAwAAAA8AEAnQEqCgAEAAFAJiWUAnQBEBRGWZwAAP7+UKNnttuatdm3DLmKhstEn9bM0AAA" "836" >}}

*Happy coding!*
