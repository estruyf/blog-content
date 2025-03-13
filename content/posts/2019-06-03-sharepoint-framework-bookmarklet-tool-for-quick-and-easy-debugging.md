---
title: SharePoint Framework bookmarklet tool for quick and easy debugging
author: Elio Struyf
type: post
date: 2019-06-03T14:23:36+00:00
slug: /sharepoint-framework-bookmarklet-tool-for-quick-and-easy-debugging/
categories:
  - Development
  - SharePoint
tags:
  - Debugging
  - SharePoint Framework
  - SPFx
  - Testing
comments: true
---

A while ago I wrote an article about how you can quickly test and debug your SharePoint Framework code when it is already deployed on an environment. I use this technique quite a lot as I mostly work with application customizers.


> **Info**: [Testing and debugging your SPFx solutions in production without causing any impact](https://www.eliostruyf.com/testing-and-debugging-your-spfx-solutions-in-production-without-causing-any-impact/)


I use this technique quite a lot as this allows me to quickly test a web part on an actual page or more importantly, to test out application customizers without the need to publish them. The technique is to spin up the local development environment via `gulp serve --nobrowser` and append the following query string parameter to your URL: `?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js`.

As I use it many times a day, my browser automatically appends it when I go to certain pages (as it is already cached). Recently I had to clear my Chromium profile due to some issues, and now I have to append it myself again to the URLs I want to test it. So this gave me the idea to create a **bookmarklet** (which is a script stored as a bookmark in your browser) which automatically appends these query string parameters to the URL.

> **Bookmarklet**: <a href="javascript:(function(){const url=new URL(window.location.href);url.searchParams.set('loadSPFX',!0);url.searchParams.set('debugManifestsFile','https://localhost:4321/temp/manifests.js');document.location=url.href})();">SPFx debugging</a> <- Drag the link into your toolbar/bookmarks bar.

## The code

Here is the code that is used in the bookmarklet: SPFx Debugging

{{< gist estruyf cb24ffbf20b2bad3466e65475639b059 >}}

## How it works

{{< caption-new "/uploads/2019/06/bookmarklet.gif" "How to use the bookmarklet" >}}