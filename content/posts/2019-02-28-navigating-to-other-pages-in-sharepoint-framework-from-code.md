---
title: Navigating to other pages in SharePoint Framework from code
author: Elio Struyf
type: post
date: 2019-02-28T21:05:19+00:00
slug: /navigating-to-other-pages-in-sharepoint-framework-from-code/
categories:
  - Development
  - SharePoint
tags:
  - Navigation
  - PnP
  - React
  - SharePoint Framework
  - SPFx
comments: true
---

When developing solutions with SharePoint Framework it can happen that you need to navigate to another page from code. Normally in JavaScript or TypeScript this is very easy. All you have to do is set the new location like this: `location.href = "<your-url>";`

When you do this in SharePoint Framework, it has the side effect that it fully reloads the page you are navigating to. This is a totally different behavior then what you normally experience when clicking on anchor elements. For anchor elements you can provide the "data-interception" attribute if you want to get control an decide if you want to fully or partially reload the page.

> **Info**: Julie Turner wrote a great article about this data-interception attribute - [SPFx Anchor Tags - hitting the target](https://julieturner.net/2018/08/spfx-anchor-tags-hitting-the-target/).

Here is a sample of a full page reload on navigating to a new page:

{{< caption-legacy "uploads/2019/02/full-page-reload-1.gif" "A sample of fully reloading the page  " >}}

Here is a sample of partially reloading the page on navigation:

{{< caption-legacy "uploads/2019/02/partially-page-reload.gif" "A sample of partially reloading the page" >}}

## Why is this important?

Partially reloading the page is important because it is much faster, as the controls on the page do not have to be reloaded. This means that if you have custom application customizers implemented on the page, they will stay on the page and get updated instead of reloaded. This will give a better experience to your users.

## Gaining control

When you want to gain control and be able to partially reload the page on navigating, you will have to bind into the SharePoint Framework routing mechanism. In order to achieve this, you will have to work with the browser its history API and dispatching events to trigger the navigation event.

Here is a sample how you can specify to partially reload the page on navigation:

## Using a dependency to make it easier

To make your life easier, I made a dependency which allows you to easily navigate from your code to other pages and specify if you want to fully or partially reload the page.

> **Info**: spfx-navigation - managing navigation in SharePoint Framework projects - [https://www.npmjs.com/package/spfx-navigation](https://www.npmjs.com/package/spfx-navigation)