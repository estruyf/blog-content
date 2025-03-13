---
title: 'Fix: Search Box Suggestions Layout Problem When Used Outside a Search Center'
author: Elio Struyf
type: post
date: 2011-08-22T13:48:19+00:00
slug: /fix-search-box-suggestions-layout-problem-when-used-outside-a-search-center/
dsq_thread_id:
  - 3836444756
categories:
  - Search
  - SharePoint
  - Styling
tags:
  - CSS
  - Search
  - Searchbox
  - Styling
comments: true
---

Some time ago, I wrote about a layout problem when using the [People Search Box Web Part outside a SharePoint Search Center](https://www.eliostruyf.com/fix-people-search-box-has-layout-problems-when-used-outside-a-search-center/). Other layout problems occurs when you enable **Query Suggestions** for the **Search Box Web Part**.

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo1.png" "Query Suggestions" >}}

What I experienced is that two different layout problems occur:

1.  When Search Suggestions are enabled for the Search Box in the Top Navigation Menu;
2.  When Search Suggestions are enabled for a Search Box on a page.

## Fix Search Suggestions When Used in Top Navigation Menu

### Problem

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo2.png" "Search Suggestions Problem in the Top Navigation Menu" >}}

### Solution

The following CSS code solves the layout problem.


```css
.srch-AutoCompContainer {
	display: block !important;
	top: 88px !important;
	min-width: 218px;
}

.srch-AutoCompListItem,
.srch-AutoCompHListItem {
	display: block !important;
}
```


**The CSS top attribute value depends on the height of the s4-titlerow**.

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo3.png" "Search Suggestions Fixed in the Top Navigation Menu" >}}

## Fix Search Suggestions When Used on a page

### Problem

Search Suggestions are being displayed on top of the Search Box.

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo4.png" "Search Box on a page" >}}
{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo5.png" "Suggestions are displayed on top of the search box" >}}

### Solution

The following CSS code solves the layout problem.


```css
.srch-AutoCompContainer {
    top: 34px;
}

.srch-AutoCompList {
    min-width: 218px !important;
}
```


{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo6.png" "Search Suggestions fixed on a page" >}}

## Changes

### CSS update: 02/11/2011

Changed the width parameter to **min-width**. This allows the suggestion box to automatically expand based on the suggestion text size.