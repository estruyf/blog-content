---
title: Automatically update / refresh results in display templates
author: Elio Struyf
type: post
date: 2014-04-11T14:45:48+00:00
slug: /automatically-update-refresh-results-display-templates/
dsq_thread_id:
  - 3836535539
categories:
  - Display Templates
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

During the creation process of a demo for my SharePoint Saturday Belgium session this year, I suddenly came up with the idea to automatically update or refresh results of a Content Search Web Part. This could be useful when you have dashboard pages and you want to keep showing the latest items retrieved from search. Eventually it doesn't seem to be that difficult to achieve this. The following steps show you which actions you need to perform to have an automatically refreshing template.

What you'll need to do is creating or modifying a Control Display Template for the CSWP. In this control template you'll only need to add the following lines of code:

```JavaScript
// Do a refresh of the current result set
AddPostRenderCallback(ctx, function(){
  setTimeout(function () {
    // Do a new query
    var queryState = new Srch.QueryState();
    var queryStateArgs = new Srch.QueryEventArgs(queryState);
    ctx.ClientControl.raiseQueryReadyEvent(queryStateArgs);
  }, 60000);
});
```

It can even be simpler, you could also use the following code:

```JavaScript
// Do a refresh of the current result set
AddPostRenderCallback(ctx, function(){
  setTimeout(function () {
    // Do a new query
    ctx.DataProvider.issueQuery();
  }, 60000);
});
```

This piece of code will be executed every minute and will update the set of results. If you want to increase or decrease this, you'll need to change the number at the end of the **setTimeout** method.

## Result

Images don't say much in this scenario, but what you can see is that the first result is replaced with a newer task.

{{< caption-new "/uploads/2014/04/041114_1445_Automatical1.png" "First set of results" >}}

{{< caption-new "/uploads/2014/04/041114_1445_Automatical2.png" "Results after a new crawl" >}}

## Download

This is the default list control display template with the piece of code added to it. Feel free to test this on your environment.

[Control_Refresh.html](/uploads/2014/04/Control_Refresh.html) (Right click - save as).