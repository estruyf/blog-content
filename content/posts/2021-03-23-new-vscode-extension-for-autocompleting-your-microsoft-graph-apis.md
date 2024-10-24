---
title: VSCode extension for autocompleting your Microsoft Graph API
slug: /vscode-extension-autocompleting-microsoft-graph-api/
author: Elio Struyf
type: post
date: 2021-03-23T20:54:17.471Z
draft: false
tags:
  - Extensions
  - VSCode
  - Microsoft Graph
categories: []
comments: true
preview: /social/91900308-3e3c-45cd-b148-41cda1d34336.png
---

While working on a project which uses Microsoft Graph APIs, I found myself opening the Microsoft Graph Explorer a lot to check which paths/parameters were available. The Microsoft Graph Explorer is a great tool, but I love not to change context too much. 

As I like to create Visual Studio Code extensions, I did not have to think long to start building a new extension.

## Background info

The good news for me was that Microsoft Graph Explorer has an API for retrieving the Open API information. This API returns all the available endpoints and their parameters per path. All I had to do, was create the logic to know when you are writing a Microsoft Graph URL and call the API to provide the suggestions.

## The extension

{{< blockquote type="Info" text="The Visual Studio Code extension can be found on the marketplace: [MS Graph Completion](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-msgraph-autocomplete)." >}}

The initial version of the extension supports the `GET` API paths, query string parameters, and their values.

{{< caption "/2021/03/msgraph1.gif" "How it works" >}}

The `/users/` API completion allows you to add a `{user-id}` token.

{{< caption "/2021/03/msgraph2.png" "User ID token"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABHSURBVB3BMQqAQAxFwbfJoiJYaWfjDbz/sWwUN5+N4ExZjjP3bcXdUQTFDDNDEfg0k8NIZlK7RH+FeuOXYG5I4n4uWnUS+ABSVh1uiaxg4QAAAABJRU5ErkJggg==" "572" >}}

When providing your user-ID or username, it will automatically tokenize it.

{{< caption "/2021/03/msgraph3.png" "Retrieving API paths for users"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABaSURBVG3BwQ3CQAxFweddb7YJGgAh+i+LwAHbKPmIAwekzNg8XeS9I4SZYWbM4VzPN+6PJxmJJDyrSP5pNEa8mBnEuvLVOCCMqiIj+XEOCPHeNugNXxZ27XwAUfcnQlqrdSwAAAAASUVORK5CYII=" "989" >}}

## When would you use it?

There are various reasons for this. My reasoning, as mentioned, was to know which parameters are available for selecting and expanding quickly.

Another option could be to use it in combination with the popular [rest-client extension](REST Client - Visual Studio Marketplace). 

{{< caption "/2021/03/msgraph4.png" "Using it in combination with the Rest Client in VSCode mentioned by Darrel Miller"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAADASURBVG3BQUrDUBSG0e+/L6/VRKFQJ3U/0qnOXUoG7kpwIC7ALsGRnTRgEBpjk7zkSgaCA8/R/d2tv7zuGPqBqjrwPxHe9vuHPk18J2eRX7I4z8lCwAQhBMyMcUxk15sNq9UKswA4H3XNNF4giZm7U1UVWVmWbLc3SCCJGJd0w0Q8y4kxMnt+esQk8cvdictIfXinaz4ZTw3jqQGfMMeRhBBmxtfxiIXALKWEmWFmaL2+8qIoQICDTPRdx19t2/IDgGBKqzLTQU0AAAAASUVORK5CYII=" "600" >}}

Let me know how you would use it.

*Thanks to the Microsoft Graph team for the API and Graph explorer*