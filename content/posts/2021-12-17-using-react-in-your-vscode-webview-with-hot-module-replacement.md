---
title: Use React in your VSCode WebView with hot module replacement
slug: /react-vscode-webview-hot-module-replacement/
author: Elio Struyf
type: post
date: '2021-12-17T15:27:46.995Z'
lastmod: '2021-12-17T15:27:47.492Z'
draft: false
tags:
  - Development
  - VSCode
  - Extensions
categories: []
comments: true
preview: /social/7ae8b559-d674-4890-8b36-a4b990b6bdcc.png
description: In this article I explain how you can integrate a React application into your VSCode webview and make sure Hot Module Replacement is working during development.
keywords:
  - vscode
---

For Front Matter and another extension, I am currently developing. I use the Visual Studio Code WebView API heavily as it provides fully customizable views for your panels or tabs. It allows any company and developer to create their own unique experiences.

One of the things I did for a long time was manually hitting the refresh button each time I updated the code. In case when you are working with a WebView, this experience is clumsy. 

We are used to having Hot Module Replacement (HRM) for web projects, but unfortunately, this is not automatically available for VS Code extension development.

To improve the experience when working with WebViews in VS Code, I tried to make HMR work for `create-react-app` and `webpack dev server`. In this article, I will share the steps I had to take to make it work for CRA, but you will have to do a similar configuration in both cases.

{{< blockquote type="Info" text="In Front Matter, the React app is part of the solution and generates the bundle via a separate [webpack config](https://github.com/estruyf/vscode-front-matter/blob/dev/webpack/dashboard.config.js) and makes use of the webpack dev server." >}}

## The approach

I choose to separate the project and use the CRA for the other project. You can create the React project anywhere you want, but a mono-repo approach might be appropriate as you will have to move some files during the packaging of your extension.

As a starting point, I took the [WebView documenation](https://code.visualstudio.com/api/extension-guides/webview).

## WebView base HTML

In the sample, a `getWebviewContent` method in which the HTML is defined. To make React work in the WebView you have to change the code as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const getWebviewContent = (context: ExtensionContext) => {
	const jsFile = "vscode.js";
	const cssFile = "vscode.css";
	const localServerUrl = "http://localhost:3000";

	let scriptUrl = null;
	let cssUrl = null;

	const isProduction = context.extensionMode === ExtensionMode.Production;
	if (isProduction) {
		scriptUrl = webView.asWebviewUri(Uri.file(join(context.extensionPath, 'dist', jsFile))).toString();
		cssUrl = webView.asWebviewUri(Uri.file(join(context.extensionPath, 'dist', cssFile))).toString();
	} else {
		scriptUrl = `${localServerUrl}/${jsFile}`; 
	}

	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		${isProduction ? `<link href="${cssUrl}" rel="stylesheet">` : ''}
	</head>
	<body>
		<div id="root"></div>

		<script src="${scriptUrl}" />
	</body>
	</html>`;
}
{{< / highlight >}}

In the method, a couple of things have changed:

1. There is logic added when the extension is running in development or production mode;
2. Some React HTML requirements have been added.

The production/development logic is required to ensure where the JS and CSS file gets loaded. In development, this will be from the `localhost`. During production, it loads from within the extension.

## Webpack configuration

To simplify the JS and CSS references, I made some webpack changes. If you are using CRA, you best use the `react-app-rewired` dependency to override the webpack config. 

My `config-overrides.js` looks as follows:

{{< highlight javascript "linenos=table,noclasses=false" >}}
module.exports = function override(config, env) {
  // Define our own filename
  config.output.filename = 'vscode.js';

  // This way we only need to load one file for the webview
  config.optimization.splitChunks = {
    cacheGroups: {
        default: false
    }
  };
  config.optimization.runtimeChunk = false;

  // Makes sure the public path is set in JS so that files are correctly loaded
  config.output.publicPath = 'http://localhost:3000/';

  // Specifies the CSS file to output
  config.plugins = config.plugins.map(plugin => {
    if (plugin.constructor.name === "MiniCssExtractPlugin") {
      plugin.options.filename = `vscode.css`;
    }
    return plugin;
  });

  return config;
}
{{< / highlight >}}

The most important line here is the `config.output.publicPath`, set to your local server. We need to provide it to make sure absolute paths are used for referencing files to load. As the code runs in the WebView, there is no actual HTML page, and the location of your webpage will be the VS Code instance: `vscode-webview://`.

If you do not provide the `publicPath`, only the first load runs fine. Once you update the code, you will notice that the `hot-update` files fail to fetch.

{{< caption-new "/uploads/2021/12/cra-vscode-failed-load.png" "Failed to load the file update"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB9SURBVC3BQQ6CQBBFwdc9PcxGXMo1TPT+Z1IhAQT6GxKr7Hl/aJeorXE69p2oHUIgkZlgRozrypEHmhcMKA6ZE25OSpyE8Gt/IcwIh+JggLtRwmmtEsVoXSWG4YaUTOMHSYg/gTKBBIxYXm9snumjkhirwbZ9ySMpQEoUjB+cRz60VIEygAAAAABJRU5ErkJggg==" "934" >}}

Looking at the URL from where the file loads, you'll spot the `vscode-webview://` path.

{{< caption-new "/uploads/2021/12/cra-vscode-wrong-path.png" "VS Code path"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABISURBVBXBgQHCMAwDwZfdmYD9l4K2jkRzp9f7Ex5VjSTWWmxJ2JIQm+O6buwwswhhZojNloAEtjkEVDeNOH9ftu4m4RGQqCr+LA8pbQrUxD4AAAAASUVORK5CYII=" "989" >}}

When providing the `publicPath` it works as expected.

{{< caption-new "/uploads/2021/12/cra-vscode-correct.png" "Loading HMR changes correctly"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAADSSURBVE3BsU5CQRBA0Tszu2+BPBUNBGJhY+3//46FiR1QEMXszox5HefI2/tHltJw79Ra8QAyyUz6GCwEKKM7m7VAnVjU1YQdXhlfn6yaseh9oB7OvWrB5D+oJPfK2hogiAi9d8bV4frNvcykbB+NUMeK0YqhqkQmEYGIIJkgRrmNQWTALRFVyAQRyCQTzBR3R4/HPYojOFNRalF2uxdUk3leUdsEOLrebNgfjjxtn0HAzJjnB1prRASKsCjn05nMxD0AITI5nS/8ujBlkP4HYvwDJWNil1JSDnEAAAAASUVORK5CYII=" "1208" >}}

## What about packaging?

When you build your two solutions, you will have to ensure that the JS bundle and CSS file are copied/moved to the correct folder. In my case, I put these two files in the `dist` folder of the VS Code extension just before packaging it.

> **Important**: Be aware it could be you'll have to make other changes to your webpack configuration to make sure the assets are correctly loaded.