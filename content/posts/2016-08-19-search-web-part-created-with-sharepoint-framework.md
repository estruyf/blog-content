---
title: Search web part created with the SharePoint Framework
author: Elio Struyf
type: post
date: 2016-08-19T19:23:32+00:00
slug: /search-web-part-created-with-sharepoint-framework/
dsq_thread_id:
  - 5079189823
categories:
  - Development
  - SharePoint
tags:
  - JavaScript
  - SharePoint Framework
  - SPFx
  - TypeScript
comments: true
---

## <span style="color: #d90429;">Important</span>

I have created a new version of this web part that makes use of Handlebars templates. You can check out the code from this web part here: [https://github.com/estruyf/react-handlebars-search](https://github.com/estruyf/react-handlebars-search).

## Older version of the web part

Today I spend some time developing with the new SharePoint Framework. I must say the SharePoint team did an amazing job with creating the Yeoman template. Of course, there are still some hiccups with it, but the team is aware of it and they expect feedback. You can do this in the GitHub issue list: [SPFx Issue list](https://github.com/SharePoint/sp-dev-docs/issues). By providing this feedback the SharePoint team can make it better for the final release.

## Search web part

I learn new tools or programming languages by getting my hands dirty by digging through the code and writing a sample application. This is also what I have done for the SharePoint Framework. To learn how to use it I came up with the idea to create a search web part (of course search).

{{< caption-legacy "uploads/2016/08/search-wp-spfx.gif" "Search wp SPFx" >}}

I uploaded my web part to GitHub in order for you to try it out: [https://github.com/estruyf/Search-WP-SPFx](https://github.com/estruyf/Search-WP-SPFx)


> **Info**: this web part is built with React and Flux. Feel free to explore and to provide feedback. Be aware that it is just a first build, so it could still have some bugs in it.


## Updates

Since the initial release of the web part it has got a lot of useful updates that show the power of the SharePoint Framework. Since version 0.0.2 the web part allows you to use external templates. Since October 10, 2016 I released a template generator which you can use to build your own external templates. Go find it here: [Search Web Part SPFx Template Generator](https://github.com/estruyf/search-wp-spfx-templategenerator).

You can also find this web part in the Microsoft SharePoint Framework client-side web part samples & tutorial materials repository: [React Search Web Part](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-search).