---
title: '#DevHack: Get the shared file info with Microsoft Graph'
slug: /devhack-shared-file-info-microsoft-graph/
author: Elio Struyf
type: post
date: 2021-05-31T13:40:27.501Z
draft: false
tags:
  - Microsoft Graph
  - Sharing
categories: []
comments: true
preview: "/social/fb75789e-3bd1-4d8b-98d8-6dcec3012c0e.png"
---

When you copy and share links from files, it creates a URL from which you cannot determine which file it is. For Squarl, I wanted to find out which file was behind a shared link to show the information about the file.

First of all, the shared links look like this:

{{< highlight html "linenos=table,noclasses=false" >}}
https://squarl.sharepoint.com/:x:/s/Squarl/<file-id>
{{< / highlight >}}

First, I thought it would be a combination of splitting the URL with the site name and ID, but apparently, it was not. When I was going through the documentation, I saw the `/shares/` endpoint. This endpoint seemed the one I needed to use to be able to get the file information.

{{< blockquote type="Info" text="[Accessing shared DriveItems](https://docs.microsoft.com/en-us/graph/api/shares-get?view=graph-rest-1.0&tabs=http)" >}}

To use the `shares` API, you need to use the share ID or the sharing URL. There is one more thing, and if you use the URL, you will need to base64 encode it.

Here is an example of how to use it with JavaScript/TypeScript.

{{< highlight html "linenos=table,noclasses=false" >}}
const fileUrl = btoa(`https://squarl.sharepoint.com/:x:/s/Squarl/<file-id>`);
// Remove the '=` sign and replace other characters
const resouce = `/shares/u!${fileUrl.slice(0, -1).replace(/\+/g, '-').replace(/\//g, '_')}/driveItem?$expand=listItem`;
const fileData = await graph.api(resource).version("v1.0").get();
{{< / highlight >}}
