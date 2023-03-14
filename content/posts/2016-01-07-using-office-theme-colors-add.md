---
title: Using Office theme colors in your add-in
author: Elio Struyf
type: post
date: 2016-01-07T11:58:49+00:00
slug: /using-office-theme-colors-add/
dsq_thread_id:
  - 4469656172
categories:
  - Office
  - UI Fabric
tags:
  - Add-in
  - JavaScript
  - Office
  - UI Fabric
comments: true
---

Will I was doing some preparation for a new talk about how you can make use of the Office UI Fabric in your applications/add-ins. I found a session from Connect() from Humberto Lezama Guadarrama which shows you what UI Fabric is and how to use it ([Office UI Fabric - Connect()](https://channel9.msdn.com/events/Visual-Studio/Connect-event-2015/317)). There is something very interesting at around minute 3:50, Humberto shows you how the add-in can switch its colors based on the Office client theme which is set by the user.

> **Note**: the sample application can be found here - [Office Add-in Fabric UI Sample](https://github.com/OfficeDev/Office-Add-in-Fabric-UI-Sample).

Unfortunately, the code for changing the add-in colors based on the Office theme is not available in the sample. So I did some research and created a sample application which visualizes the Office client theme colors.

## Retrieving the Office theme

Retrieving the Office theme is even easier than I expected. Since the 1.1 version of the Office.js JavaScript API there is an **officeTheme** property available. The officeTheme property contains four HEX color values which can be used in the add-in.

*   bodyBackgroundColor
*   bodyForegroundColor
*   controlBackgroundColor
*   controlForegroundColor

> **Note**: more information about this property can be found here - [Context.officeTheme property](https://msdn.microsoft.com/en-us/library/office/mt455203.aspx).
>
> **Important**: retrieving the Office theme colors is only available for Office 2016 and requires version 1.1 of the Office.js JavaScript API.

The values can be retrieved like this:

{{< highlight javascript "linenos=table,noclasses=false" >}}
Office.context.officeTheme.bodyBackgroundColor
{{< / highlight >}}


## Using the colors in your add-in

The way to use these colors in you add-ins is by applying it via JavaScript. Here is an example:

{{< highlight javascript "linenos=table,noclasses=false" >}}
$('.example').css({
  'background-color': Office.context.officeTheme.bodyBackgroundColor,
  'color': Office.context.officeTheme.bodyForegroundColor
});
{{< / highlight >}}

{{< caption-legacy "uploads/2016/01/010716_1158_UsingOffice1.png" "Example of applied colors" >}}

## Office client theme colors add-in

I created a sample add-in which visualizes the Office client theme colors. Here is an example of the output:

**Colorful**

{{< caption-legacy "uploads/2016/01/010716_1158_UsingOffice2.png" "Colorful Office theme colors" >}}

**Dark gray**

{{< caption-legacy "uploads/2016/01/010716_1158_UsingOffice3.png" "Dark gray Office theme colors" >}}

**White**

{{< caption-legacy "uploads/2016/01/010716_1158_UsingOffice4.png" "White Office theme colors" >}}

The add-in can be found on GitHub: [https://github.com/estruyf/Office-Client-Theme-Colors](https://github.com/estruyf/Office-Client-Theme-Colors).