---
title: Ultimate diagnostic display template
author: Elio Struyf
type: post
date: 2014-04-28T07:38:21+00:00
slug: /ultimate-diagnostic-display-template/
dsq_thread_id:
  - 3836535552
categories:
  - Display Templates
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

For my SharePoint Saturday Belgium 2014 session: "Sorry, something went wrong. How to start debugging your Display Templates", I created the ultimate diagnostic display template. With this display template you're able to retrieve all the available properties for your result.

{{< caption-legacy "uploads/2014/04/042814_0738_Ultimatedia1.png" "Content Search Web Part Configuration" >}}

When you configure the Content Search Web Part as shown above, it will output the property name, type and its corresponding value for the current result.

{{< caption-legacy "uploads/2014/04/042814_0738_Ultimatedia2.png" "Output of the ultimate diagnostic template" >}}

I also build in that it shows which of the values are null or empty. These values will be outputted like this:

{{< caption-legacy "uploads/2014/04/042814_0738_Ultimatedia3.png" "Showing empty or null values" >}}

> **Note**: this display template is created for retrieving only one result.

## Office 365 and future on-premises updates

The template currently only works on on-premises, in Office 365 you first need to do some changes to the list via PowerShell to make use of the template. This is because Microsoft did some changes on the list and libraries. More information can be found in a blog post of Mikael Svenson - [Debugging Managed Properties using SharePoint Query Tool v2](http://techmikael.blogspot.no/2014/03/debugging-managed-properties-using.html "Debugging Managed Properties using SharePoint Query Tool v2").

## Download

The ultimate diagnostic display template can be found on the **SPCSR** GitHub repository: [GitHub SPCSR Project](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Ultimate%20Diagnostic%20Display%20Template%20%28CSWP%29 "GitHub SPCSR Project").

To use it, download the HTML template and upload it somewhere in your master page gallery. Configure your content search web part as shown above, and you are good to go.

Feel free to give feedback about it.