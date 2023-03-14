---
title: Changing the number of visible list views in the view selector of a list or library
author: Elio Struyf
type: post
date: 2014-10-08T08:00:15+00:00
slug: /changing-number-visible-list-views-view-selector-list-library-2/
dsq_thread_id:
  - 3836535646
categories:
  - Office 365
  - SharePoint 2013
tags:
  - JavaScript
comments: true
---

For a colleague I did some checks on how the view selector rendering is achieved in lists and libraries. While digging through the code I found a very useful property, which is the **ClientPivotControl.prototype.SurfacedPivotCount** property. This property is used to define the amount of list views that are visible on the list view selector.

The default property value is **3**, which you can also check in all your lists and libraries. You always receive three view links, the other views can be accessed underneath in the list view menu (...):

{{< caption-legacy "uploads/2014/10/100714_2010_Changingthe11.png" "Default list view selector" >}}

{{< caption-legacy "uploads/2014/10/100714_2010_Changingthe21.png" "List view selector menu" >}}

Now by changing this property, for example to **6** in my example, all my list views become available:

{{< caption-legacy "uploads/2014/10/100714_2010_Changingthe31.png" "List view selector with 6 available views" >}}

The code to achieve this fairly simple:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// With MDS enabled
ExecuteOrDelayUntilScriptLoaded(function () {
  if (typeof ClientPivotControl.prototype.SurfacedPivotCount !== "undefined") {
    ClientPivotControl.prototype.SurfacedPivotCount = 6;
  }
}, "start.js");

// Without MDS
if (typeof ClientPivotControl.prototype.SurfacedPivotCount !== "undefined") {
  ClientPivotControl.prototype.SurfacedPivotCount = 6;
}
{{< / highlight >}}


## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/pFJCRSekuI8" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

_Video made by [Webucator](https://www.webucator.com/microsoft-training/sharepoint.cfm)._