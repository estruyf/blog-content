---
title: Branding the Search Box in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-01-15T09:00:29+00:00
slug: /branding-the-search-box-in-sharepoint-2013/
dsq_thread_id:
  - 3836445770
categories:
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - Search
  - Searchbox
comments: true
---

Since SharePoint 2013 introduced the display templates, branding elements has been made a lot easier. Like for instance when you want to brand the search box on your site.

In the previous versions you mostly started the job by overriding the standard CSS of SharePoint. This approach will still work, but there is now an easier way. You now have the possibility to modify the search box template or create one of your own.

> **Important**: The only downside at the moment (I hope this will change in the future) is that it involves to replace the OOTB small search box ([check out this blog post](https://www.eliostruyf.com/replacing-the-ootb-small-search-input-box-for-sharepoint-2013/ "Replacing the OOTB Small Search Input Box in SharePoint 2013")).

On the default search boxes the property **ServerInitialRender** is set to true. When this property is set to true, the HTML markup is rendered from the assembly code instead of using the display template.

The search box templates that are being used are located in the master page gallery:

`/_catalogs/masterpage/Display Templates/Search`

It contains the following two search box templates:

*   Control_SearchBox.js and Control_SearchBox.html > this is the template for the search that is used on the search centers;
*   Control_SearchBox_Compact.js and Control_SearchBox_Compact.html > this is the template for the small search box on each site.

**Note**: when the site collection **SharePoint Sever Publishing Infrastructure** feature is not activated, only the JavaScript files are available.

**Note 2**: you may only edit the HTML file, the JavaScript file is automatically generated and updated when you make a modification to the HTML file.

## Customizing the search box

I will explain you how to change the default search box image.

1.  Replace the default search box (follow this blog post), and remove or set the ServerInitialRender property to false;
2.  If you referenced another template than the Control_SearchBox_Compact.js one. Create the HTML template by copy and paste the Control_SearchBox_Compact.html file in the master page gallery (catalogs/masterpage/Display Templates/Search);
3.  Open the master page library in explorer view;
4.  Open the Search Box HTML template file;
5.  Search for the following text: **var imagesUrl = GetThemedImageUrl('searchresultui.png')**;
6.  Replace **GetThemedImageUrl('searchresultui.png')** with **"/_layouts/15/images/searchserver.ico"**;
7.  Search for the following class **ms-srch-sb-searchImg**, and remove it;
8.  Save the file and check refresh the site;

The results should look like this:

{{< caption-new "/uploads/2013/01/011413_1344_Brandingthe1.png" "SharePoint 2013 Search Box witch Custom Image"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGN4//79u3fv3r59+/nzl9+/f/8CgZ+//vz/9f7ur9fXALlAHHv2dt41AAAAAElFTkSuQmCC" "240" "34" >}}

As you can see with this new template functionality possibilities are endless. Making customizations is easier, but it involves replacing the default search box. Once you replaced the default search box you have full control and you can make up your own HTML markup.