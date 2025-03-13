---
title: New theme engine for the suite bar in Office 365 SharePoint sites
author: Elio Struyf
type: post
date: 2014-08-26T09:11:01+00:00
slug: /new-theme-engine-suite-bar-office-365-sharepoint-sites/
dsq_thread_id:
  - 3850314621
categories:
  - Office 365
  - SharePoint 2013
tags:
  - Composed Looks
  - Office 365
  - Theme
comments: true
---

Today I saw a lag in the loading of the new suite bar colors on one of my SharePoint site in Office 365.

{{< caption-new "/uploads/2014/08/082614_0910_Newthemeeng1.png" "Default suite bar" >}}

{{< caption-new "/uploads/2014/08/082614_0910_Newthemeeng2.png" "Default suite bar with a composed look applied" >}}

The suite bar uses the **O365ShellCore.css** to do the styling. It turns out that when you apply a composed look to your site, the new colors are set by a new theme engine of the suite bar on the fly.

The location of this engine can be found on [https://portal.office.com/data.theme](https://portal.office.com/data.theme) and is used as follows:

[https://portal.office.com/data.theme?action=tcspo&tc=rgb(229%2C%2020%2C%200)%7Crgb(68%2C%2068%2C%2068)%7Crgb(229%2C%2020%2C%200)%7Crgb(255%2C%20255%2C%20255)%7Crgb(146%2C%20192%2C%20224)%7Crgba(239%2C%20239%2C%20239%2C%200.8)%7Crgb(102%2C%20102%2C%20102)%7Crgb(51%2C%2051%2C%2051)%7Crgb(255%2C%20255%2C%20255)%7Crgba(255%2C%20226%2C%20223%2C%200.498039)%7Crgb(222%2C%20222%2C%20222)&l=en-US](https://portal.office.com/data.theme?action=tcspo&tc=rgb(229%2C%2020%2C%200)%7Crgb(68%2C%2068%2C%2068)%7Crgb(229%2C%2020%2C%200)%7Crgb(255%2C%20255%2C%20255)%7Crgb(146%2C%20192%2C%20224)%7Crgba(239%2C%20239%2C%20239%2C%200.8)%7Crgb(102%2C%20102%2C%20102)%7Crgb(51%2C%2051%2C%2051)%7Crgb(255%2C%20255%2C%20255)%7Crgba(255%2C%20226%2C%20223%2C%200.498039)%7Crgb(222%2C%20222%2C%20222)&l=en-US)

If you follow the link, this will give you back a stylesheet (data.css) to replace the suite bar colors. This is dynamically loaded on the page, so that is where the small lag is coming from.