---
title: 'Order List Items Like in a Meeting Workspace: Part 1'
author: Elio Struyf
type: post
date: 2012-01-03T17:36:32+00:00
slug: /order-list-items-like-in-a-meeting-workspace-part-1/
Xylot:
  - http://www.xylos.com/blog/post/1077/Order-List-Items-Like-in-a-Meeting-Workspace-Part-1.aspx
dsq_thread_id:
  - 3864929084
categories:
  - SharePoint
  - SharePoint Designer
tags:
  - Reorder
comments: true
---

As you may or may not know, there is functionality in the Meeting Workspaces to reorder the discussion points on the agenda. This functionality enables you to change the order of the discussion points, but you can also enable this functionality on other lists. It requires some manual steps which are explained in this blog post.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt1.png" "Change Item Order" >}}

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt2.png" "Change Item Order Form" >}}

In this blog post I show you how you can enable this reorder functionality on other list/libraries.

First of all you need to make the **Order** field visible inside your list. To make this field visible, you can use the following PowerShell script.


```powershell
$url = "Web_URL"
$site = Get-SPSite($url)
$web = $site.OpenWeb()
$list = $web.lists["List_Name"]
$orderField = $list.Fields["Order"]
$type = $orderField.GetType()
$mi = $type.GetMethod("SetFieldBoolValue", [reflection.bindingflags]"nonpublic, instance")
$parameters = "CanToggleHidden", $true
$mi.Invoke($orderField, $parameters)
$orderField.Hidden = $false
$orderField.Update()
$web.Dispose()
$site.Dispose()
```


**Note: before you execute this script, change the Web_URL and List_Name in the PowerShell script.**

When the field has been unhidden, you can check the list columns. Normally the **Order** field should now be visible.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt3.png" "Order Field Visible" >}}

The **Order** field will not be visible on item forms, or you must enable it by code or PowerShell script (which is not recommended).

From this moment on, each time you create a new item, the order field automatically increments the order value. To check this you can make this **Order** column visible in a SharePoint list view, and you can also set the sorting setting to sort by the **Order** column.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt4.png" "Sort by Order Column" >}}

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt5.png" "Order Values" >}}

You can change the order by navigating to the following URL:

```url
SiteURL/_layouts/Reorder.aspx?List={ListId}
```


{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt6.png" "Change Item Order Page" >}}

Changing the order results in changes to the **Order** field value.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt7.png" "New Item Order (Check Order Values)" >}}

## Part 2

In the next part I will show you how you can create a custom action with SharePoint Designer to reorder the items.