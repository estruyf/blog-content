---
title: Ajax Refresh Item Row(s) in a SharePoint 2013 View
author: Elio Struyf
type: post
date: 2013-07-19T19:50:59+00:00
slug: /ajax-refresh-item-rows-in-sharepoint-2013-view/
dsq_thread_id:
  - 3836446302
categories:
  - Development
  - SharePoint 2013
tags:
  - Ajax
comments: true
---

When examining the JS Link problem that was described in my previous blog post, I found a nifty piece of code. The code allows you to do an Ajax refresh for a single item row or for the item rows in the current view.

This piece of code comes in handy when you have a custom actions that does an item update and only want to update the current item or the list of items.

The following code does a single row Ajax refresh, and can be used on the Query Succeeded callback:

```javascript
function onQuerySucceeded () {
  // Set Ajax refresh context
  var evtAjax = {
    currentCtx: ctx,
    csrAjaxRefresh: true
  };
  // If set to false all list items will refresh
  ctx.skipNextAnimation = true;
  // Initiate Ajax Refresh on the list
  AJAXRefreshView(evtAjax, SP.UI.DialogResult.OK);
}
```

As you can see it isn't that hard, the only thing that changes if you want to refresh all the items is the **ctx.skipNextAnimation** property. This needs to be set to **false** or you can leave it out of the code.

```javascript
function onQuerySucceeded () {
  // Set Ajax refresh context
  var evtAjax = {
    currentCtx: ctx,
    csrAjaxRefresh: true
  };
  // Initiate Ajax Refresh on the list
  AJAXRefreshView(evtAjax, SP.UI.DialogResult.OK);
}
```

Here is a screencast to show you the functionality. The code behind it is just a simple value update of an item field.