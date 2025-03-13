---
title: Three useful managed properties for working with Office Web Apps
author: Elio Struyf
type: post
date: 2015-03-18T12:43:16+00:00
slug: /three-useful-managed-properties-for-working-with-office-web-apps/
dsq_thread_id:
  - 3836895357
categories:
  - Office 365
  - Office Web Apps
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - OWA
  - Search
comments: true
---

When working in Office 365 / SharePoint on-premises you probably already used Office Web Apps (OWA) to create or modify your documents. The power of OWA is also leveraged inside a SharePoint Search Center to show the content of the document inside the hover panel.

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful1.png" "Document preview" >}}

This kind of functionality is very helpful for finding the document you are searching for. You can also leverage the OWA functionality inside your own display templates by making use of the following managed properties:

*   ServerRedirectedURL
*   ServerRedirectedPreviewURL
*   ServerRedirectedEmbedURL

Each property has its own purpose. In the next sections I will explain them one by one.

## ServerRedirectedURL managed property

The ServerRedirectedURL managed property provides you a link which opens the document in OWA. You can use this managed property if you want your users to open the documents in OWA instead of their client applications.

**Sample managed property value**: https://tenant.sharepoint.com/sites/Operations/_layouts/WopiFrame.aspx?sourcedoc={9AF85718-3C5A-4FEC-9777-BBE609E610EC}&file=New%20Training%20Programs.pptx&action=default&DefaultItemOpen=1

**Usage**: You can use this managed property value inside an anchor tag.

```html
<!--#_
var serverRedirectedURL = $getItemValue(ctx, 'ServerRedirectedURL');
_#-->
<a href="_#= serverRedirectedURL =#_" title="ServerRedirectedURL">Link to the document in OWA</a>
```

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful2.png" "Link to the document in OWA" >}}


## ServerRedirectedPreviewURL managed property

The ServerRedirectedPreviewURL managed property can be used to add a preview image next to the content of the document like in your SharePoint Search Center.

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful3.png" "Search result with preview image" >}}


**Sample managed property value**: https://tenant.sharepoint.com/sites/Operations/_layouts/WopiFrame.aspx?sourcedoc={9af85718-3c5a-4fec-9777-bbe609e610ec}&action=imagepreview

**Usage:** You can use this managed property value as the source attribute of an image tag.

```html
<!--#_
var serverRedirectedPreviewURL = $getItemValue(ctx, 'ServerRedirectedPreviewURL');
_#-->
<img src="_#= serverRedirectedPreviewURL =#_" alt="ServerRedirectedPreviewURL" />
```

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful4.png" "Preview image example" >}}


## ServerRedirectedEmbedURL managed property

The ServerRedirectedEmbedURL managed property is the property that is used to render the WOPI frame inside the hover panels.

**Sample managed property value**: https://tenant.sharepoint.com/sites/Operations/_layouts/WopiFrame.aspx?sourcedoc={9af85718-3c5a-4fec-9777-bbe609e610ec}&action=interactivepreview

**Usage**: You can use this managed property value as the source attribute inside an iFrame.

```html
<!--#_
var serverRedirectedEmbedURL = $getItemValue(ctx, 'ServerRedirectedEmbedURL');
if(!Srch.U.n(serverRedirectedEmbedURL)) {
_#-->   
    <div class="ms-srch-hover-viewerContainer" style="height:345px;200px">
        <iframe src="_#= serverRedirectedEmbedURL =#_" scrolling="no" frameborder="0px" style="height:100%;width:100%"></iframe>
    </div>
<!--#_                      
}
_#-->
```

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful5.png" "Document preview" >}}


## Adding these properties in your template

You need to add these managed properties to the **ManagedPropertyMapping** attribute inside the display template before you can start using them in your display templates.

```javascript
<mso:ManagedPropertyMapping msdt:dt="string">'Link URL'{Link URL}:'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:'','FileExtension','SecondaryFileExtension','ServerRedirectedEmbedURL','ServerRedirectedPreviewURL','ServerRedirectedURL'</mso:ManagedPropertyMapping>
```

On my GitHub repository you can find a sample display template with these properties: [item display template with OWA properties](https://github.com/estruyf/blog/blob/master/Useful%20OWA%20managed%20properties/Item_OWA.html "Item display template with OWA properties").