---
title: $setResultItem a function that makes or breaks your search experience
author: Elio Struyf
type: post
date: 2014-08-22T13:25:41+00:00
slug: /setresultitem-function-makes-breaks-search-experience/
dsq_thread_id:
  - 3836882937
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

A couple of days ago I was talking with [Mikael Svenson](http://techmikael.blogspot.nl/), he asked me what the **$setResultItem** function does. Because there is no information to be found on the internet, I wanted to share this information with everyone. This function can completly change the behaviour of your search center, so it is important to know what it does in your display templates.

## $setResultItem explained

The function is only used in the search item display templates (search result web part). If you open for example the **Item_Default.html** template, you will find the following function call:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
$setResultItem(itemId, ctx.CurrentItem);
{{< / highlight >}}

The function does not return anything, so what does it do exactly?

The $setResultItem function stores the current result item in memory, so if you show ten items in your search center, these ten item can be found in memory. Here is an example of the object:

{{< caption-legacy "uploads/2014/08/082214_1311_setResultIt1.png" "Search results" >}}

The reason why each result is temporally stored in memory, is because these result objects are used to when the hover panels render. When you hover over a result item in a search center, the **Srch.U.getShowHoverPanelCallback** function gets called and initiates the hover panel to load. The hover panel is filled with search information it finds in memory of the result objects.

That means, if you remove the $setResultItem function call in your item display template. When you hover over a result in the search center, no result information can be found for that corresponding item in memory, and it prevents the hover panel to render. That is why the $setResultItem function is very important when you are creating or updating search item display templates.