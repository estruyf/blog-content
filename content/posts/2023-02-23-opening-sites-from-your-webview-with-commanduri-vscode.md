---
title: Use command URI in a VSCode webview to open files and links
longTitle: Use command URI in a Visual Studio Code webview to open files and links
slug: /command-uri-vscode-webview-open-files-links/
description: In this article, Elio shows how to use command URI to open files and links in
  a webview from a Visual Studio Code extension.
date: 2023-02-23T11:26:20.326Z
lastmod: 2023-02-23T11:26:20.823Z
preview: /social/eaa12c42-52f3-48a3-be75-f316a735c802.png
draft: false
comments: true
tags:
  - Development
  - Visual Studio Code
  - VSCode
  - Extensions
type: post
---

If you work with webviews, you may want to open a link to a website or file within the same instance of Visual Studio Code. There are a couple of ways to achieve this, such as posting a message to the extension host or using the command URI option of your webview.

Using the command URI option involves less code and is also the preferred option. Although, you might think, why would I just not use an anchor element and set the HREF attribute to the URL? Well, there is a reason for that, which I will explain in this article.

## Why can I not use a hyperlink?

When you want to use an anchor tag with a link to your website for instance, you would typically do it as follows:

{{< highlight html "linenos=table,noclasses=false" >}}
<a href="https://elio.dev">elio.dev</a>
{{< / highlight >}}

It is a quick and easy way, but there is an issue. When you click on the link, it will open immediately in the browser and bypasses the [outgoing link protection](https://code.visualstudio.com/docs/editor/editingevolved#_outgoing-link-protection) functionality from Visual Studio Code.

A better approach is to use an internal command like `vscode.open`.

## The command

The command which can be used to open links/files is `vscode.open` and it can be used as follows from your extension:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const devUri = vscode.Uri.parse('https://elio.dev');
vscode.commands.executeCommand('vscode.open', devUri);

const fileUri = vscode.Uri.file(join(context.extensionPath, 'readme.md'));
vscode.commands.executeCommand('vscode.open', fileUri);
{{< / highlight >}}

To make use of internal or your commands in a webview, you need to enable the `enableCommandUris` option on the webview creation.

## The webview configuration

In the code where you create your webview, you can define to enable command URIs as one of the Webview/Panel options.

{{< highlight typescript "linenos=table,noclasses=false" >}}
const panel = vscode.window.createWebviewPanel(
	'react-webview',
	'React Webview',
	vscode.ViewColumn.One,
	{
		enableScripts: true,
		retainContextWhenHidden: true,
		enableCommandUris: true,
	}
);
{{< / highlight >}}

Once you have set this option to `true`, you can use anchor tags with **HREF** attribute set to `command:<your command>`.

## The webview code

The last step is to write the code to open a link or file. To do this, you will first have to generate a Visual Studio Code URI like object, which looks as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
{
  scheme: '',
  path: '',
  authority: ''
}
{{< / highlight >}}

This object will be used as argument in your command URI.

### Opening a link

Here is an example of how you can open a link:

{{< highlight tsx "linenos=table,noclasses=false" >}}
const linkUri = {
  scheme: 'https',
  path: '/',
  authority: 'elio.dev'
};

return (
  <>
    <a href=${`command:vscode.open?${encodeURIComponent(JSON.stringify(linkUri))}`}>Open link</a>
  </>
)
{{< / highlight >}}

{{< blockquote type="info" text="When you click on the link in the webview, you will now be asked if you want to proceed opening it (if the domain is not in your trusted domains list)." >}}

{{< caption-new "/uploads/2023/02/open-link.png" "Open link to external website"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAEISURBVH3BMU7CUBzA4V//faVvUAwUVhMSPIgMXsDZUxjjBYyb8SJObjoQb+BqIDoYwUBSkoKUVyiv9hlcCOH7vHq9WRORDntYa7tKRE4PD/RDRSl2Wa5yZnNzrigFvhBWfJyLq1uS3Ofx/hqnKCyOYsvg9YXxPGebYiOKIqrVI4ZfnygV0G6fMJnEDL9HOIqNOI5ZLBZEjQae5zEejTDG8E9RsrVjzNklBlgGHraANC9w7PMdJG8oSpIMCJ9u+BMECBCuVjhZMsFROHZNJZ+jtWadLxERtA/GGLJijaMoaa1ptVo4YRjiZFmG0+u/Q5KiKE1/Unr9D3aZzlIcr15v1kSkwx7W2u4v4Jpk+UypW2oAAAAASUVORK5CYII=" "354" >}}

### Opening a file

Here is an example of how you can open a file:

{{< highlight tsx "linenos=table,noclasses=false" >}}
const fileUri = {
  scheme: 'file',
  path: '<absolute path>/readme.md',
  authority: ''
};

return (
  <a href=${`command:vscode.open?${encodeURIComponent(JSON.stringify(fileUri))}`}>Open file</a>
)
{{< / highlight >}}
