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

```javascript
Office.context.officeTheme.bodyBackgroundColor
```


## Using the colors in your add-in

The way to use these colors in you add-ins is by applying it via JavaScript. Here is an example:

```javascript
$('.example').css({
  'background-color': Office.context.officeTheme.bodyBackgroundColor,
  'color': Office.context.officeTheme.bodyForegroundColor
});
```

{{< caption-new "/uploads/2016/01/010716_1158_UsingOffice1.png" "Example of applied colors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAIUlEQVR4nGN4+fLlazB49erVo0ePHj9+DOG+fv365cuXAKb4G0k5m+jNAAAAAElFTkSuQmCC" "344" "49" >}}

## Office client theme colors add-in

I created a sample add-in which visualizes the Office client theme colors. Here is an example of the output:

**Colorful**

{{< caption-new "/uploads/2016/01/010716_1158_UsingOffice2.png" "Colorful Office theme colors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA0ElEQVR4nC2OTYqEMBSEc2fBK7gS3IiXEAY3bjzFDNigDESQVmN8ifkR80TN0N3zLWpTfFSR5+NnaB7P+nv8bRmbGWPz/MppmrquI9bofdv2bdusNcZordd1NcYg4r7vRCklhJByBRBVVX29KYqCMXaeJ9FaS7lqrYUQWZbFcZymaRRFlNL7vom1Viml33DOh2FommYcRwBwzr1sAFiWBRHzPA/DMEmSIAjKsvTeE0T03iMiAFBK67pu27bv+8+7//o4Ds65lPKzcl2X99459wcAxNNCTeKa1wAAAABJRU5ErkJggg==" "343" "259" >}}

**Dark gray**

{{< caption-new "/uploads/2016/01/010716_1158_UsingOffice3.png" "Dark gray Office theme colors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA3klEQVR4nC3Lz2qDMACA8bzpevEhBL3MiO+xnvTgIYgggvfBGNvEkkRlRCxLZ7Qk/umwQsbafdcfH4AQuq7red7jLQih4zgQQsuyTNMElNLlcpmmSUoZx3EYhgihIAg450VRAEzIcD4LIbqui6Lozr7vCyHqugZVVS3LMt6SUgoh+Ok0DMO6rhjjPx7Hse97pVSe51mWJUmSpiljjFIKaFnep/V63e+fDMOwbXu3e0AIMcZA0zRa60HNFTu+H8jz68fLW1F+Ntu2EUL+uVdzzVp25C3v2q9vOf9orTHGv5L0wOcMSFXSAAAAAElFTkSuQmCC" "342" "267" >}}

**White**

{{< caption-new "/uploads/2016/01/010716_1158_UsingOffice4.png" "White Office theme colors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAz0lEQVR4nC3MwWqEMBDGcd/Zgw/hRfCWdxAP6sk3KIXSXVoptXS7u6k0mp2qTBJTJynK/g5z+fNNsPx8/0mx3RGIyO1oh4iBtYsxelmMVmrdKaWcc+u6eu8DRByGAQCklHVdl2VZVVVRFJzzLWutfwHmeQYAxliapoyxOI7btt2yMWbcTdMkhOCcN03DOe/7nojuz29SWmuzLIuiKEmSMAzzPN/WROS9h1m/n67Pr28PT8fHw8vHF0dE59w93ybVni6fl+7ciXMnRly890T0D9yE1bvjEra1AAAAAElFTkSuQmCC" "340" "263" >}}

The add-in can be found on GitHub: [https://github.com/estruyf/Office-Client-Theme-Colors](https://github.com/estruyf/Office-Client-Theme-Colors).