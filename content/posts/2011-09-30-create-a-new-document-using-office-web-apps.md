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

{{< caption-legacy "uploads/2011/09/093011_1318_CreateaNewD1.png" "Create documents" >}}

This is only possible from the **Home** page of Office 365. When you create a new document from within the document library itself, you still need the client application to be installed to create the document.

When I got back to the homepage of Office 365 I saw that it used the following url:

`http://www.yourdomain.com/TeamSite/_layouts/CreateNewDocument.aspx?id=http://www.yourdomain.com/TeamSite/template.docx&SaveLocation=http://www.yourdomain.com /TeamSite/Documents&Source=http://www.yourdomain.com/TeamSite/Documents/Forms/AllItems.aspx&DefaultItemOpen=1`

This URL can also be used on a SharePoint on-premises environment with Office Web Apps installed.

{{< caption-legacy "uploads/2011/09/093011_1318_CreateaNewD2.png" "SharePoint on-premises with Office Web Apps" >}}

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

{{< caption-legacy "uploads/2011/09/093011_1318_CreateaNewD1.png" "Create documents" >}}

Another approach could be to create a web part and check the available document libraries and document templates.

{{< caption-legacy "uploads/2011/09/093011_1318_CreateaNewD4.png" "Web Part showing documents from the Documents library" >}}

{{< caption-legacy "uploads/2011/09/093011_1318_CreateaNewD5.png" "Web Part showing documents from the Facturen library" >}}