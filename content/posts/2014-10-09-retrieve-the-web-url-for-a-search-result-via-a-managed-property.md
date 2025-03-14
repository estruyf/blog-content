---
title: Retrieve the web URL for a search result via a managed property
author: Elio Struyf
type: post
date: 2014-10-09T14:37:55+00:00
slug: /retrieve-the-web-url-for-a-search-result-via-a-managed-property/
dsq_thread_id:
  - 3836548129
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Crawled Property
  - Managed Property
  - Search
comments: true
---

These days a lot of my work is done in Office 365, but I have customers that are still working on an on-premises environment. Sometimes when switching back to an on-premises environment you could be surprised by things that are not (yet) available.

This week I wanted to implement a link which goes directly to the site on which the search result item is located. On Office 365 (SharePoint Online) used a managed property called **SPWebURL** to achieve this.

{{< caption-new "/uploads/2014/10/100914_1437_Retrievethe1.png" "SharePoint Online - SPWebUrl property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKElEQVR4nAXByQkAIAwEQPsvNKDiHoTN25m1n2YmiW0AJCnVQV109we03xwXiJVFkQAAAABJRU5ErkJggg==" "612" "43" >}}

But when I wanted to use the managed property on the client its on-premises environment, I noticed that this managed property is not available.

Now the good news is that the **ows_taxId_SPLocationSite** crawled property is available on-premises, but it is not yet mapped to a managed property. So what you can do is create a new managed property and map it with the **ows_taxId_SPLocationSite** crawled property, that way you can easily retrieve the web URL of the item.

{{< caption-new "/uploads/2014/10/100914_1437_Retrievethe2.png" "SharePoint 2013 - Crawled property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAHElEQVR4nGN4+/Hrh6+/fv/99x8V/Pr16+fPnwDGah1z8/8X7QAAAABJRU5ErkJggg==" "558" "40" >}}

{{< caption-new "/uploads/2014/10/100914_1437_Retrievethe3.png" "SharePoint 2013 - SPWebUrl managed property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJUlEQVR4nB3BQQoAQAgCwP7/2IUiUfSy0Ez1klQOANtJZvkakj/B6hz+AXyGEgAAAABJRU5ErkJggg==" "605" "47" >}}

## Result

{{< caption-new "/uploads/2014/10/100914_1437_Retrievethe4.png" "SPWebUrl compared to the SPSiteUrl"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAO0lEQVR4nBXGSQrAQAgEwPn/R6OSwUuLCi4hdaqTmQaLiJ2dmapyd8C6e3fOfS8Tiwgzq6oB/0ToIcA+/nM5AbP+/kUAAAAASUVORK5CYII=" "422" "80" >}}