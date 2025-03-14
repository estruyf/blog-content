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
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt1.png" "List Settings in SharePoint Designer"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgklEQVR4nBXLWQ6DIBQAQO5/0KZI1bdvgGn8n2n9+zl+cAEjK7JeQCfQjQwkgNQQEZCJpGpl1gnCYlm19l5rtd9FauGRkeWeQCbqal41M2frfYjo2s/eT9XsJ90kN5B5qHnrx+jHePmckcnqJKZqkRmZbYCKObO4h0eQGokhvrtq/gFH2avo8TtSSQAAAABJRU5ErkJggg==" "557" "349" >}}
*   Under the List Settings tab, click **Custom Action** -> **View Ribbon**;
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt2.png" "Custom Action - View Ribbon"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAy0lEQVR4nAXBS07CQAAA0DmaZ5LzaBr3bFyQsNHEkDQstEEolM5AO/9f51PGKXTne8C9PoXVcxiTsFG74UJ+IT5dacNd5P4ObLdRFIX0UGg/0TU/vE1mZ8UV9ziOGfiQjPUhRiu5Pi/7cmHYjmIspVR6AB2mHWbw0tVtzwWJA2SUMCbmec55AuV3/VVW+zM5tIQrl/NdSGPM4H0cb3+gPf1U1RbCo1Q0Rj0lozhSHN2imB8j0PULOxakLkRTJPbu6EffrDhaZ/OZzPYfq1q3NZ5roFAAAAAASUVORK5CYII=" "246" "167" >}}
*   In the **Name** textbox, fill in: **Change Item Order**;
*   Select **Navigate to URL** under the action type, and fill in the following URL value: ~site/_layouts/Reorder.aspx?List={ListId}
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt3.png" "Navigate to URL"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZUlEQVR4nC3E0QrDIAwFUP//F8tgBVuLJjHrrjU6hUG383Dcsjz8FsIRE3GM9D9xOCKLOs26eZ9FSikAfptZM+utOVVdnysRX7WWG4Cr1t47AHee730PwvJSBTDGHJ8x59ScKaUvA+twmE9g9ecAAAAASUVORK5CYII=" "427" "174" >}}
*   Store the following images on your SharePoint site;
{{< caption-new "/uploads/2011/12/reorder16x16.png" "Reorder 16x16"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABhElEQVR4nGOYsmTP/417z/1fu+vM/7U7T//fefzW7+be+f95BCTsGBgYGIyN01hBNMPOw5f/H7749f+sDc/+z9v07P/WUz9/r9267z8DA4PF+///BfL79wuAFbZOWvott7TpW1pe87fU3IZvOWXtXxzdQ/6LylsH1a/6fy687UEfWGFUVleCuKptgq65b4KWiU+ihqlHvGdUQ2retIdPqlb9/+/b8vG/UdSaZQwrtp35f/bm6//7zjz5v/fM0/8Xb7/+9+P3///9617PDmx9/cc8Ze9VVe8J8Qy7j179v+fU+/8Tlt/7P2vdo//bjn/4c/Tqt/+dS+7Fxk/+99+57NYRsNWF9VPv+AZH33H3i71XU5F7eOeF/08dK1//F/HYZN+/97+6fekdE7BCZOBcejOtesnHy2Htr/6rBSxcreYxwRQsUV/PxPD//3/G////M4P4yZNeFebP/vw/eeb//3Z5Zx5rBE7TgSuEgdDQVWDFSf2vkmLa7t+Qj78PCb///xlBNABUf8fR5+UwwwAAAABJRU5ErkJggg==" "16" "16" >}}
{{< caption-new "/uploads/2011/12/reorder32x32.png" "Reorder 32x32"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABkElEQVR4nD2QvS8DcRyHfywGMVvEf0Ai4T+QCEsTNhMmLwmDCAOaYBChRIIuXgYSqV6vrr36aVWvF+6O6F2b/oqWayqiTWmjFfWSc76iUs/4yZPP8CCvSMZINOEOXd1QQRKjZRKlZRKjLkjc5eBkEypxe5ekIw8AzsCHhuUPcF68gU0s6P7IOwhKJIwQKi+KlzGVPpRfYZnJaavsMywzWZijsl9b7kdweIXQrwMAZQhzgU1OIu9WLCRtWErvHYhpC3uacvqUvHl7/7S+GlUWH61YmMI+SXZ5T3ysx887PX6ecfO8HXO+NepcGdm4DtOcWoduE0k6mgLASkE7Cr4BlgtwEHgFj5KHFfykd5oeoHVcjCByHacYKQfztuznkj2jL1CP2qwlpY1vhXUzo2rt02HoN0kGdCyEaKKmgfUHNZaTwXt2A+s4oXeZLqF/UXwZNvPdrth3BRocna3t6Blo7OjpbWg2GOomFndaZizxeN96Htomz84Brqr+W5YwGo3FZrsetWnIHNjLZO5r/nYo/wHK/gCZDEejjgAAAABJRU5ErkJggg==" "32" "32" >}}
*   Fill in the URL's to images in the two button image URL fields;
{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt6.png" "Advanced Custom Action Options"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgElEQVR4nCXJyxaCIBAAUP7/D1OjUAxzZmhAfARDtvCcu7vK9PbW6KbVdpzIf5A8eSbPgB6IFAB0bafven7PCIiAInKepyeydlCEZEw/mMG5iTls256zFKlpXZlZufH10M/AMca074dILUVKEZEqUtWypBBiWtJxfGv9XXfJufwB2luMk3vpeWkAAAAASUVORK5CYII=" "500" "236" >}}
*   Click **OK**.
When you performed these actions, navigate back to your list and check if the item action is visible under the **Items** tab.

{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt7.png" "Change Item Order - Custom Action"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/AHaDjnF9iKTCz5Cxv2RucW99iG58h218i299i299iwDt8fPy9/nq7e/w8vHp6dPu8u/w8/Lw9ffy9/nt8vWW4ivk+mFjUAAAAABJRU5ErkJggg==" "605" "110" >}}

When you click on this action you are now able to reorder the items.

{{< caption-new "/uploads/2011/12/120811_1753_OrderListIt8.png" "Change Item Order Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAX0lEQVR4nGXLwQqAIBBFUX+8wogWkUIrsfpEgzDLGXUqrE3QWdzFg8faXlRCl50qOsWF5nLMFbqWUzPMDLxN6QyI1w9gZGbdN+eMWQADYOa9p0eIkVl3AOT9fRCR+7gB8zFoHZFHqRcAAAAASUVORK5CYII=" "605" "237" >}}

## Part 3

In the next part I will cover how you could display the reorder page in a dialog window from SharePoint 2010.
