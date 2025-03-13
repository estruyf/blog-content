---
title: Watch out when you move display templates from Office 365 to On-premises
author: Elio Struyf
type: post
date: 2015-04-01T13:57:30+00:00
slug: /watch-out-when-you-move-display-templates-from-office-365-to-on-premises/
dsq_thread_id:
  - 3836535727
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

Today I was creating my session for SharePoint Saturday Belgium and Paris. For my demo's I prepared a couple of display templates that were created on Office 365 / SharePoint Online. To be sure that I had a backup plan, I moved all these display templates to my development environment on-premises.

The first thing I got after I configured the web parts were errors like this:

{{< caption-new "/uploads/2015/04/040115_1357_Watchoutwhe1.png" "$urlHtmlEncodeString is not defined" >}}


As it turns out, the **$urlHtmlEncodeString** function does only exist for SharePoint Online at the moment.

**Available on Office 365**: $ urlHtmlEncode, $urlHtmlEncodeString, $urlHtmlEncodeValueObject

**Available on On-premises**: $urlHtmlEncode

It could be that there are other functions which you cannot use on-premises. Feel free to provide me feedback if you experienced something similar.

