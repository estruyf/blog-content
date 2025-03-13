---
title: What is required for Display Templates?
author: Elio Struyf
type: post
date: 2013-10-11T08:15:16+00:00
slug: /required-display-templates/
dsq_thread_id:
  - 3836597494
categories:
  - Display Templates
  - SharePoint 2013
tags:
  - Display Templates
comments: true
---

Yesterday we had the first [Biwug](http://www.biwug.be/) Quiz. One of the questions was the following:

Display Templates require one of the following options:

1.  HTML
2.  **JavaScript**
3.  JavaScript & HTML
4.  XSL

Everyone has answered that you need the JavaScript and HTML file, but this isn't correct. The correct one was number two JavaScript. To clarify the answer I will show you why you don't need the HTML file.

The HTML file only makes the creation process of display template easier.

If you create a new site collection from the team site definition, you will only have the JavaScript files available in the master page gallery.

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi1.png" "JavaScript versions" >}}

The HTML versions become available once you have activated the **SharePoint Server Publishing Infrastructure** feature.

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi2.png" "JavaScript & HTML versions" >}}

If you aren't working with the HTML file (what I don't recommend) you will have to do some manual actions.

First of all, start by making a copy of one of the existing display templates. I choose to create a copy of the Item_TwoLines.js file.

The next step is to modify the properties for that file like this:

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi3.png" "Item Properties" >}}

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi4.png" "Item Properties" >}}

Once you have modified these properties, it is time to change the template a bit.

To start you will need to update your template URLs in the display template because the reference will be set to the old file.

```javascript
ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js';

Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js", DisplayTemplate_dee7d9226aa44ed7b709d342fec837ee);

$includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js"), RegisterTemplate_dee7d9226aa44ed7b709d342fec837ee);
```

Then it is up to you what you want to modify in the template, I added a text element that shows "My file extension is: FileExtension".

This is the end result:

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi5.png" "Result" >}}