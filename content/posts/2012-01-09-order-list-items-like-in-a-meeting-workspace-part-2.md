---
title: 'Order List Items Like in a Meeting Workspace: Part 2'
author: Elio Struyf
type: post
date: 2012-01-09T12:53:47.000Z
slug: /order-list-items-like-in-a-meeting-workspace-part-2/
Xylot:
  - http://www.xylos.com/blog/post/1077/Order-List-Items-Like-in-a-Meeting-Workspace-Part-2/
dsq_thread_id:
  - 3862827872
categories:
  - SharePoint
  - SharePoint Designer
tags:
  - Custom Actions
  - Reorder
  - SharePoint Designer
comments: true
---

In Order List Items Like in a [Meeting Workspace: Part 1](https://www.eliostruyf.com/order-list-items-like-in-a-meeting-workspace-part-1/ "Meeting Workspace: Part 1") I wrote how you could enable the order field on other lists. In this blog post I will cover how you could create a custom action to reorder the list items.

## Add a Custom Reorder Action to the List

*   Open your site in SharePoint Designer 2010;
*   Navigate to your list settings page in SharePoint Designer;
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt1.png" "List Settings in SharePoint Designer" >}}
*   Under the List Settings tab, click **Custom Action** -> **View Ribbon**;
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt2.png" "Custom Action - View Ribbon" >}}
*   In the **Name** textbox, fill in: **Change Item Order**;
*   Select **Navigate to URL** under the action type, and fill in the following URL value: ~site/_layouts/Reorder.aspx?List={ListId}
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt3.png" "Navigate to URL" >}}
*   Store the following images on your SharePoint site;
{{< caption-new "/uploads/2011/12/reorder16x16.png" "Reorder 16x16" >}}
{{< caption-new "/uploads/2011/12/reorder32x32.png" "Reorder 32x32" >}}
*   Fill in the URL's to images in the two button image URL fields;
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt6.png" "Advanced Custom Action Options" >}}
*   Click **OK**.
When you performed these actions, navigate back to your list and check if the item action is visible under the **Items** tab.

{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt7.png" "Change Item Order - Custom Action" >}}

When you click on this action you are now able to reorder the items.

{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt8.png" "Change Item Order Page" >}}

## Part 3

In the next part I will cover how you could display the reorder page in a dialog window from SharePoint 2010.
