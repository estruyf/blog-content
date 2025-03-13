---
title: Optimizing the number of display templates that get loaded for the search result web part
author: Elio Struyf
type: post
date: 2015-06-26T14:35:33+00:00
slug: /optimizing-the-number-of-display-templates-that-get-loaded-for-the-search-result-web-part/
dsq_thread_id:
  - 3881787068
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
  - Search Center
comments: true
---

This week I saw a question on StackExchange about optimizing a search page and how to get rid of the pre-loaded display templates. You can quickly check the templates that get pre-loaded by opening an OOTB SharePoint search center results page, and checking the loaded scripts via Fiddler or your browser developer tools. For a default search results page, you will see that the following display templates get loaded (even when no results are returned):

{{< caption-new "/uploads/2015/06/062615_1435_Optimizingt1.png" "Pre-loaded display templates" >}}

The number of templates that get loaded by default could have some impact when loading your page. But also if you developed your own display templates for your search center. You do not want to overload the default templates which will stay unused probably.

To fix this, the search results web part has a property called **PreloadedItemTemplateIdsJson** With this property you can define the templates that need to be pre-loaded on your page. This property can be checked by exporting the search results web part. Once you exported the web part and open the file, you can find the following line:

{{< caption-new "/uploads/2015/06/062615_1435_Optimizingt2.png" "PreloadedItemTemplateIdsJson property" >}}

You can just remove the unnecessary templates from the property.

> **Important**: If you want that the web part does not pre-load these templates, you have to leave only the brackets in place. Do not remove these brackets, otherwise the web part will use a hard-coded fallback list (which is the same as the picture above) and pre-loads these templates.

{{< caption-new "/uploads/2015/06/062615_1435_Optimizingt3.png" "PreloadedItemTemplateIdsJson property with no templates to get loaded" >}}

Once you did your updates to the web part file, and uploaded it back to the site, you can see that the templates aren't loaded anymore.

{{< caption-new "/uploads/2015/06/062615_1435_Optimizingt4.png" "After updating the PreloadedItemTemplateIdsJson property" >}}

> **Note**: you can also make these property updates  to the web part property via PowerShell.