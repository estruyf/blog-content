---
title: Create a New Document Using Office Web Apps
author: Elio Struyf
type: post
date: 2011-09-30T13:18:59+00:00
slug: /create-a-new-document-using-office-web-apps/
dsq_thread_id:
  - 3836444748
categories:
  - Office Web Apps
  - SharePoint
  - SharePoint Online
tags:
  - Office 365
  - Office Web Apps
  - SharePoint Online
  - Web Part
comments: true
---

A few days ago I moved one of my personal domains to Office 365. One of the things I noticed is that you can create new documents without the need of a client application, everything is done by the Office Web Apps.

{{< caption-new "/uploads/2011/09/093011_1318_CreateaNewD1.png" "Create documents"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/ALTN6sPR7u725rXWsf7///nOtfnUwvz8/9CrzvPq8wDe6vXk7Pf2+vXV6N/8/v7u5+Xu6Of9/f/c2uzx8fdmFTXzPOc0OgAAAABJRU5ErkJggg==" "282" "65" >}}

This is only possible from the **Home** page of Office 365. When you create a new document from within the document library itself, you still need the client application to be installed to create the document.

When I got back to the homepage of Office 365 I saw that it used the following url:

`http://www.yourdomain.com/TeamSite/_layouts/CreateNewDocument.aspx?id=http://www.yourdomain.com/TeamSite/template.docx&SaveLocation=http://www.yourdomain.com /TeamSite/Documents&Source=http://www.yourdomain.com/TeamSite/Documents/Forms/AllItems.aspx&DefaultItemOpen=1`

This URL can also be used on a SharePoint on-premises environment with Office Web Apps installed.

{{< caption-new "/uploads/2011/09/093011_1318_CreateaNewD2.png" "SharePoint on-premises with Office Web Apps"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAV0lEQVR4nGOYMnPhtJlLZy3YMH3uuu5JS7smL2nvnT1h+oq+aStnzlvFsG/3lvXb9m7ZtX/Lzv3rt+5etW7r8jWb123asX7zrpVrNzP8/PXrPw7w9tUrACGyRMshl6W6AAAAAElFTkSuQmCC" "605" "170" >}}

The **CreateNewDocument** page can be used to create Word, PowerPoint and OneNote documents. If you want to create Excel documents you need to use the following URL:

`http://www.yourdomain.com/TeamSite/_layouts/xlviewer.aspx?new=1&SaveLocation=http://www.yourdomain.com/TeamSite/Documents&Source=http://www.yourdomain.com/TeamSite/Documents/Forms/AllItems.aspx&DefaultItemOpen=1`

As you can see it makes use of another page called **xlviewer.aspx**.

## URL Anatomy

### CreateNewDocument

`http://www.yourdomain.com/TeamSite/_layouts/CreateNewDocument.aspx`

Querystrings

*   **ID**: URL to the document template that is associated with the content type;
*   **SaveLocation**: the location to the document library where the document needs to be saved;
*   **Source**: the URL to the default view of the document library;
*   **DefaultItemOpen**: is set to 1.

### xlviewer

`http://www.yourdomain.com/TeamSite/_layouts/xlviewer.aspx`

Querystrings

*   **New**: set to 1;
*   **SaveLocation**: the location to the document library where the document needs to be saved;
*   **Source**: the URL to the default view of the document library;
*   **DefaultItemOpen**: is set to 1.

## What can you do with it?

You could add a HTML markup to your page with links to the documents templates, so you can create documents without the need of a client application. Like in Office 365.

{{< caption-new "/uploads/2011/09/093011_1318_CreateaNewD1.png" "Create documents"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/ALTN6sPR7u725rXWsf7///nOtfnUwvz8/9CrzvPq8wDe6vXk7Pf2+vXV6N/8/v7u5+Xu6Of9/f/c2uzx8fdmFTXzPOc0OgAAAABJRU5ErkJggg==" "282" "65" >}}

Another approach could be to create a web part and check the available document libraries and document templates.

{{< caption-new "/uploads/2011/09/093011_1318_CreateaNewD4.png" "Web Part showing documents from the Documents library"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAoklEQVR4nB3KvQ6CMBRA4b7/qzjqogvGlYE4GI2NYoOA8ldCKS333nINnvU7ArWC7xW1oj7DTlEjQyupkQt6ZhY0lHMl16lLUauxK5v81VU5AawcTMFGkVYLIRMABYdhBuR/ojKwjevJQVLEma25uOEl8gOkpyeMIN6t2xzVOPnofnjofJaJiff9xyS789hbwUtAPzEzeERA52djHSJaawHgBwtsp69aiaoDAAAAAElFTkSuQmCC" "270" "154" >}}

{{< caption-new "/uploads/2011/09/093011_1318_CreateaNewD5.png" "Web Part showing documents from the Facturen library"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVR4nG2LWwqDMBAAc+IeqIcqVLBS+iK02hhfica4ZjebIvTT+ZxhRNDFWp2DvpL5hCoL7QPrC6oslKfoB0G2DOaNpiRbYf+Krhn6Tivl3QQAgro72yfpglzLCIwAsM5+IYoUowCkXJrJLWkPcauXwzH/NnNKiZk3xxv/PI6zlMraaff+AXvmq0EOsnLWAAAAAElFTkSuQmCC" "237" "147" >}}