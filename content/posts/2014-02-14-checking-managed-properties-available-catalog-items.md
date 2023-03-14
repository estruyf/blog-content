---
title: Checking which Managed Properties are available for your Catalog Items
author: Elio Struyf
type: post
date: 2014-02-14T15:57:40+00:00
slug: /checking-managed-properties-available-catalog-items/
dsq_thread_id:
  - 3838004434
categories:
  - Cross-site Publishing
  - SharePoint 2013
tags:
  - Cross-site Publishing
  - Page Layouts
comments: true
---

I'm currently working on my first project that makes use of Cross-Site Publishing functionality from SharePoint 2013. One of the aspects is to create a couple of page layouts to visualise the managed properties from the catalog items.

When you configure a catalog connection for the first time on your site, the category and catalog item pages will automatically be created. On the catalog item page, by default there will already be a couple managed properties defined to be displayed on the page. In most cases, you probably want to re-order, re-place, and style these properties. But what if you want to show additional managed properties? How do you know which managed properties are available to use?

To know which managed properties are available for the current catalog item, navigate to the catalog item page:

{{< caption-legacy "uploads/2014/02/021414_1557_Checkingwhi1.png" "Catalog Item Page" >}}

&nbsp;

Click on **edit page** so that your page opens in edit mode, and click on the **Search** button of the **Catalog-Item URL** web part.

{{< caption-legacy "uploads/2014/02/021414_1557_Checkingwhi2.png" "Catalog Item Page - Edit Mode" >}}

This opens a new dialog window with the connected catalog and its corresponing catalog items.

{{< caption-legacy "uploads/2014/02/021414_1557_Checkingwhi3.png" "Connected Catalog Items" >}}

When you hover over an item, a hover panel will be loaded, and when you click on the **MORE** link in the hover panel, you'll retrieve all the available managed properties for the catalog item.

{{< caption-legacy "uploads/2014/02/021414_1557_Checkingwhi4.png" "Available Managed Properties" >}}

## Important

This only works with auto created managed properties. While rendering this hover panel overview, SharePoint does a check to see if the property name is auto created. When the property name looks like its auto created (should contain OWS as text), it will be displayed.

{{< highlight javascript "linenos=table,noclasses=false" >}}
Srch.ValueInfo.isAutoCreatedPropertyName = function Srch_ValueInfo$isAutoCreatedPropertyName(managedPropertyName) {
  if (Srch.U.w(managedPropertyName)) {
    return false;
  }
  
  if (managedPropertyName.startsWith('owstaxId')) {
    return true;
  } else if (managedPropertyName.length > 7) {
    var $v_0 = managedPropertyName.length - 7;
    var $v_1 = managedPropertyName.length - 4;
    return managedPropertyName.substring($v_0, $v_1).toUpperCase() === 'OWS';
  }
  return false;
}
{{< / highlight >}}
