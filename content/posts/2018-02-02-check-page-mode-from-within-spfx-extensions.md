---
title: Check the page display mode from within your SharePoint Framework extensions
author: Elio Struyf
type: post
date: 2018-02-02T15:33:54.000Z
updated: 2020-04-23T09:39:57.210Z
slug: /check-page-mode-from-within-spfx-extensions/
dsq_thread_id:
  - 6454393400
categories:
  - Development
  - SharePoint
tags:
  - Extensions
  - SharePoint Framework
  - SPFx
comments: true
---

In my previous post, I wrote how you could trigger the page into edit mode from within your SharePoint Framework solution. One thing which I did not explain is how you can check the current display mode your page is in.

> **Related article**: [Trigger the edit page experience from your SharePoint Framework solution](https://www.eliostruyf.com/trigger-the-edit-page-experience-from-your-sharepoint-framework-solution/)

For web parts, it is very simple as they provide you a **displayMode** property with the corresponding page mode read or edit.

At the moment of writing this article, such property is not yet available in SPFx extensions. You must retrieve it from somewhere else. In the related article, I shared a code sample in which you can see that I use the current page URL and check if it contains **Mode=Edit**. This mode query string parameter gets added when you trigger the editing page experience. When you save or publish it, this will be removed.

## One problem

There is a problem of course. We work in a client-side driven application and it does not always perform a page reload. This is a good thing, it makes SharePoint faster and easier to use. So, checking the URL is not an option as the extension will only get rerendered when the page gets reloaded. In order to check that property, you will have to create some sort of polling mechanism which checks the URL if it has changed. This is not an option I would encourage you to use, so another solution is to check the SharePoint internals and see what engineering used to get this page experience in place and find a way to bind into it.

## The history

As it turns out, SharePoint is using the **History API** of your browser. This API allows you to move backward, forward, navigate to other pages, and more.

> **Info**: read more about the history API here - [Manipulating the browser history](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

When SharePoint puts the page in edit mode or back to read mode, the **pushState** method of the History API is used. This method allows you to add history entries. A problem with this method is that it does not yet contain an event handler. This is something we should create it ourselves.

In the following component, this got implemented, check lines 20 - 35.

{{< gist estruyf 05aca6b6d1ccfe2cb7ef70689646ad86 >}}

Here is a sample of what you can expect from the component:

{{< caption-legacy "uploads/2018/02/check-page-mode.gif" "Page mode checker" >}}

## Updates

### 2020-04-23

Updated the logic to support the new `SPFx` routing mechanism.