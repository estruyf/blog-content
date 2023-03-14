---
title: Things to check in your SPFx application customizer after page transitions
author: Elio Struyf
type: post
date: 2019-06-19T08:43:02+00:00
slug: /things-to-check-in-your-spfx-application-customizer-after-page-transitions/
categories:
  - Development
  - SharePoint
tags:
  - Navigation
  - SharePoint Framework
  - SPFx
comments: true
---

When building a SharePoint Framework solution which includes application customizers. One of the important things about their functionality is how they behave during navigation events/page transitions.

These days in modern SharePoint most of the page transitions are achieved from the client-side, which means that it does not fully reload the page, but only partially. Which is much faster, but can cause you some difficulties with getting things right in your application customizer to capture these events.

Luckily, Velin Georgiev has written a great article about this how you can capture these page hits during partial-page transitions.

> **Info**: Here you can find Velin's article - [Record page hit when SPA page transitioning in modern SharePoint sites](https://blog.velingeorgiev.com/page-hit-when-SPA-page-transitioning-modern-sharepoint-sites).

<span style="color: black;">In the article, you will find three useful tweaks for loading your application customizer correctly:
</span>

1.  Adding a variable to keep track if the navigation event is already subscribed so that you don't register it multiple times.
2.  Keeping track of the current page URL.
3.  Adding a **setTimeout** event to ensure that the navigation event is processed. Having a timeout lower than one second for this one is already enough.
The last one, in this case, is the most important one. As it frequently happens your application customizers code runs before the page transition is completed. When this happens, you run in the previous page context, and if you depend on some of the **application customizer context** properties. Your application customizer code will show incorrect results.

## There are more things to consider

The previous tweaks are a great way to start and will work fine when having an application customizer running on one Hub Site, but when having multiple Hub Sites in your environment. You will have to implement a couple of additional checks.

### On which Hub Site am I currently running?

In my case, whenever the user navigates to another hub site, the behaviour should be different. Doing a page check is in most cases not enough. That's why the hub site check is important.

The hub site check can be implemented in the **setTimeout** function as that one makes sure that the page transition completed. In my case when I see a difference in the hub site, I dispose of the whole application customizer and initialize the **onInit** method again so that the whole app customizer can execute its logic.

### What is the UI language?

Working on multi-lingual environments, it is important that your solutions render with the correct language. Luckily, this is mostly handled by the framework itself, but there is an issue. When navigating from a site with which is configured to use another language than the previous one (and when only that language is enabled). It causes your application customizer to render in the wrong language (even the default SharePoint components).

{{< caption-legacy "uploads/2019/06/58173514-dceff800-7c9b-11e9-9ca1-e0e3e8897277.gif" "MUI navigation" >}}

> **Info**: I created an issue for this, so that the SharePoint - [https://github.com/SharePoint/sp-dev-docs/issues/4012](https://github.com/SharePoint/sp-dev-docs/issues/4012)

The solution here is to check the currently used UI language and refresh the whole page.

## The code

Here is the blueprint of the code I use in my application customizer to make sure all the checks are in place for correctly rendering during navigation events.

{{< gist estruyf 13f68e9ada8865e990fd9e01ea8b318a >}}