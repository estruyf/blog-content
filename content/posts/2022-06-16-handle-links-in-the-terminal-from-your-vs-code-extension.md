---
title: Handle links in the terminal from your VSCode extension
longTitle: Handle links in the terminal from your Visual Studio Code extension
description: In this article, Elio explains how you can handle links in the terminal by
  your extension to allow these to be handled by your code instead of
  navigating..
date: 2022-06-16T14:35:37.026Z
lastmod: 2022-06-16T14:35:37.577Z
preview: /social/a2e6cac4-94c5-4fb3-bef1-6f14fe6ee40c.png
draft: false
comments: true
tags:
  - Extensions
  - VSCode
  - Development
type: post
slug: /handle-links-in-the-terminal-from-your-vscode-extension/
---

For a while now, I have been thinking about a way to handle links shown in the Visual Studio Code terminal. By default, when you control/command + click on a link, you navigate to them, but in my case, I wanted to be able to handle the link in the extension.

To look for a solution, I opened the Visual Studio Code editor its code and found the `registerTerminalLinkProvider` API, which is also available for extensions.

The terminal link provider allows you to register a provider that enables the detection and handling of links within the terminal. This API is exactly what I have been looking for, and it is also reasonably easy to start using it.

## The solution

The `registerTerminalLinkProvider` method requires two properties:

- `provideTerminalLinks`: The provider that detects the links;
- `handleTerminalLink`: The handler when you click on the link.

The solution I came up with is to check if the terminal line contains a link, and if it does, provide the Terminal Link action.

In the terminal link handler, I let Visual Studio Code show an information message to allow the user to choose between navigating to the link or running it in the extension. 

The code for this looks as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
import * as vscode from 'vscode';

export const UrlRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+)|(localhost))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gi;

interface CustomTerminalLink extends vscode.TerminalLink {
  data: string;
}

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTerminalLinkProvider({
    provideTerminalLinks: (context: vscode.TerminalLinkContext, token: vscode.CancellationToken) => {
      // Detect the first instance of the word "link" if it exists and linkify it
      const matches = [...context.line.matchAll(UrlRegex)];

      if (matches.length === 0) {
        return [];
      }

      return matches.map(match => {
        const line = context.line;

        const startIndex = line.indexOf(match[0]);

        return {
          startIndex,
          length: match[0].length,
          tooltip: 'Handle link',
          data: match[0],
        } as CustomTerminalLink;
      })
    },
    handleTerminalLink: (link: CustomTerminalLink) => {
      vscode.window.showInformationMessage(`How would you like to handle the link?`, 'Navigate', 'Run in extension').then(action => {
        if (action === 'Navigate') {
          vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(link.data));
        } else if (action === 'Run in extension') {
          // Do something else with the link
        }
      });
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
{{< / highlight >}}

The result of the code can be seen here:

{{< caption-new "/uploads/2022/06/terminal-link-handler.png" "Handle the link in the terminal"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABaSURBVD3BMQ6CUBBF0TsBEgki9nQuwP3vyVhR4PBn3hALPcfWx7Ou4wUzw91xP0glmeIrIjCDvrWddzhMC1IRh4MKJKjip2+eSI3aX/yZMd3uDF3HZ54Zt40TYVQuG9Ffh/AAAAAASUVORK5CYII=" "1428" >}}
