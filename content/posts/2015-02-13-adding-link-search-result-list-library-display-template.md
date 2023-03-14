---
title: Adding a link to the search result list or library into your display template
author: Elio Struyf
type: post
date: 2015-02-13T15:03:27+00:00
slug: /adding-link-search-result-list-library-display-template/
dsq_thread_id:
  - 3838215901
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

A lot of users want to get an overview of the latest items of a list or library. Some users want to include a link to the list or library from which the items were retrieved. As this link from the search results location may vary, you should not hard code the link back to the item or control template.

## Solution

The solution is very easy. By default you have a managed property called **ParentLink**. You need to add this property to the **ManagedPropertyMapping** attribute inside your item display template.

{{< highlight html "linenos=table,noclasses=false" >}}
<mso:ManagedPropertyMapping msdt:dt="string">'ParentLink','Link URL'{Link URL}:'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:'','FileExtension','SecondaryFileExtension'</mso:ManagedPropertyMapping>
{{< / highlight >}}

Next, you should add some extra code to the item template.

> **Note**: You could choose to add extra code to the control template instead but it requires that you write more code. 

<span style="line-height: 1.5;">The link only needs to be shown if the last item gets processed. This means that the code needs to check to see when the last item gets processed. In a post on my blog I showed how you could include alternating row styling. I also explain how you can check if the last row is rendered: </span>[Showing Alternating Rows in the Content Search WebPart (Display Template)](https://www.eliostruyf.com/showing-alternating-rows-in-the-content-search-webpart-display-template/)<span style="line-height: 1.5;">.</span>

To check if the last row is processed, you should include the following code in the Item Template:

{{< highlight html "linenos=table,noclasses=false" >}}
<!--#_
// Check if it is the last item to process
var currentItemIdx = ctx.CurrentItemIdx + 1;
if(currentItemIdx === ctx.CurrentGroup.RowCount) {
_#-->
	<div class="view-all"><a href="_#= ctx.CurrentItem.ParentLink =#_" title="View all">View all</a></div>
<!--#_
}
_#-->
{{< / highlight >}}

Place it at the bottom of your Item Template and you get the following result:

{{< caption-legacy "uploads/2015/02/021315_1503_Addingalink1.png" "Items with link to list" >}}

{{< caption-legacy "uploads/2015/02/021315_1503_Addingalink2.png" "Documents with link to library" >}}

> **Important**: This only works if your items are coming from the same library. Otherwise **View all** will link to the list or library location of the last item.

## Download

You can download the template that I created for this post on GitHub: [Item display template with view all link to list or library](https://github.com/estruyf/blog/tree/master/Item%20display%20template%20with%20view%20all%20link%20to%20list%20or%20library "Item display template with view all link to list or library").