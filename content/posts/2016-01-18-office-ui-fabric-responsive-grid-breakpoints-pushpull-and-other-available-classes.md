---
title: 'Office UI Fabric responsive grid: breakpoints, push/pull and other available classes'
author: Elio Struyf
type: post
date: 2016-01-18T12:43:36+00:00
slug: /office-ui-fabric-responsive-grid-breakpoints-pushpull-and-other-available-classes/
dsq_thread_id:
  - 4501557234
categories:
  - Office
  - UI Fabric
tags:
  - Add-in
  - Office
  - Styling
  - UI Fabric
comments: true
---

At the moment the documentation for Office UI Fabric is focussed on Office Add-ins. For example: if you check the grid styles, there is mentioned that there are utility classes for small, medium and large devices, but there is more functionality hidden inside the SASS/CSS files. In this article I will describe a couple of very useful CSS classes which you can use when building your own applications with the Office UI Fabric framework.

> **Note**: styles documentation - [http://dev.office.com/fabric/styles](http://dev.office.com/fabric/styles)

## UI Fabric Media Queries / screen breakpoints

First are the media queries or screen breakpoints. In the documentation you find that there are three main targets: small, medium, and large. These sizes can also be used in your Office add-ins. Here is an example of the add-in sizes when you resize the canvas:

**Small - ms-u-sm1 ... 12**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab1.png" "Small sized add-in" >}}

**Medium - ms-u-md1 ... 12**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab2.png" "Medium sized add-in" >}}

**Large - ms-u-lg1 ... 12**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab3.png" "Large sized add-in" >}}

When you dive into the SASS or CSS from Office UI Fabric, you can notice that there are defined more media queries and utility classes. These other screen breakpoints and utility classes could come in handy when you are creating web applications. Here you can see which media query breakpoints are available:

**Small**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab4.png" "Small device" >}}

**Medium**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab5.png" "Medium device" >}}

**Large**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab6.png" "Large device" >}}

**X-Large**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab7.png" "X-Large device" >}}

**XX-Large**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab8.png" "XX-Large device" >}}

**XXX-Large**

{{< caption-legacy "uploads/2016/01/011816_1231_OfficeUIFab9.png" "XXX-Large device" >}}

## Hiding elements via visibility classes

Like in Bootstrap and other frameworks, UI Fabric has also classes to toggle when content needs to be visible and when it needs to be hidden. There are a couple of useful utility classes for this.
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup> <col /> <col /> <col /> <col /> <col /></colgroup>
<tbody valign="top">
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;"></td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**Small**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**Medium**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**Large**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**X-Large**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**XX-Large**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**XXX-Large**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenSm</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenMd</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenLg</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXl</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxl</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxxl</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">. ms-u-hiddenMdDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenLgDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXlDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxlDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenMdUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenLgUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXlUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxlUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
</tbody>
</table>

## Column ordering via pull, push and reset

Pulling or pushing elements is something that is also described in the Office UI Fabric documentation. With the pull and push utility classes, you are able to reorder elements on your screen based on the screen sizes. This is useful when you have an element which is important and has to be pulled upwards when you are working on a small screen device. In a more complex grid scenario it could be that you want to push an element upwards on a small screen device, and push it downwards on a bigger version. This could require to make use of multiple push or pull utility classes. When this is the case, you will have to reset your push or pulls on the element.

**Push classes and reset**

Pushing: .ms-u-*Push1 ... 12

Reset: .ms-u-*Push0

> **Important**:** you will have to replace the "*" star in the pushing and reset classes. You can replace them with: sm, md, lg, xl, xxl, or xxxl. Example: .ms-u-smPush1 ... 12

**Pull classes**

Pulling .ms-u-*Pull1 ... 12

Reset: .ms-u-*Pull0

> **Important**:** you will have to replace the "*" star in the pulling and reset classes. You can replace them with: sm, md, lg, xl, xxl, or xxxl. Example: .ms-u-smPush1 ... 12

As you can see, a lot more is possible if you just check the contents of the CSS files.