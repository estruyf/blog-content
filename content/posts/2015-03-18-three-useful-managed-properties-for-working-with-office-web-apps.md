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

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful1.png" "Document preview"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgElEQVR4nHXOSw7CMAwE0Nz/YrCD7uACZZNfFdKkHhujJFRCoL7tyOMxaBjgfwAMM+sBETGqer4+Tpe5VNQNqq9BVXnE081OdwsIQb6vmdkQIee0xBCCjzFaa733zrmUErMYAFSfdV2IaOuoG+ta3Jvasx9tecp1LUVEPpN2o+kNKzDpzfsBSyUAAAAASUVORK5CYII=" "419" "321" >}}

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

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful2.png" "Link to the document in OWA"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUElEQVR4nAXBCRKAIAgAQP//zo4pLECOSRyx3eKmrsJMIuymKo0QM+daKzMLYDsrbTcdgAfQdr07MGkH/mLM0jzYgmyQBWp/pLMN8ajt62P+hVZVihW8/g0AAAAASUVORK5CYII=" "190" "49" >}}


## ServerRedirectedPreviewURL managed property

The ServerRedirectedPreviewURL managed property can be used to add a preview image next to the content of the document like in your SharePoint Search Center.

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful3.png" "Search result with preview image"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAP0lEQVR4nAXBSQ6AMAgAwP7/iSYeDbtUGgXx4sw4VVEn24XiIB7rzifr7RCyfRtqjHiwADGSgBrP8O6vq3LFD74HN9zPzPlsAAAAAElFTkSuQmCC" "523" "112" >}}


**Sample managed property value**: https://tenant.sharepoint.com/sites/Operations/_layouts/WopiFrame.aspx?sourcedoc={9af85718-3c5a-4fec-9777-bbe609e610ec}&action=imagepreview

**Usage:** You can use this managed property value as the source attribute of an image tag.

```html
<!--#_
var serverRedirectedPreviewURL = $getItemValue(ctx, 'ServerRedirectedPreviewURL');
_#-->
<img src="_#= serverRedirectedPreviewURL =#_" alt="ServerRedirectedPreviewURL" />
```

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful4.png" "Preview image example"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAuElEQVR4nCXC2wqCMAAA0P2cLxG9VUYiFEhOJ1J2Q1taBoU4TIokZakzSyKCHvq/iA4HPKsyTaKcxjmNbyy9F9kvSxmNP+8XWLgEDjGa2Ghsq8ZSGWFtshKEXo3jdKSBIHlgL7F96pCLQy62T92w0A2r2xGW2AEkKr0jI1Hpn67/u0OB9Cnf4i0TA3KuNmG+PRbuPvsNsnXIVH3WbvKmiYFpYUmS5YGqQA1CJA8UBWp9UWw26vPR8AshVFvyJFM6TgAAAABJRU5ErkJggg==" "449" "279" >}}


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

{{< caption-new "/uploads/2015/03/031815_1243_Threeuseful5.png" "Document preview"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8ElEQVR4nGPoaGkqLsgrKy4sKy6qKi+DoJrKitKiwhlTJjN4ONppqCjpaarraqjpqKtCkZqSvIRIRIAPw5TZyxt757T0z4OivrltExcWFVfFRcd2tLQx9E5dVNk2vaZjZk3HDBBqn17XNScrpyQsKKyprpGhb9qi1okLOiYv6pyyqGPyws7Ji1omLsjMLg4LBktPmb28fdKirqlLOiYvapu4sH3igrbJiwuKqmIjY9qbWxmCvD2N9PXMjQwtTIzNjI1MDQ3MjY1M9XU1FGTjwkMY/LzcdbQ0DfR0DfR0TYwMjA0N9HV1jA31tTU14mOiAYB1X7vaUUECAAAAAElFTkSuQmCC" "455" "384" >}}


## Adding these properties in your template

You need to add these managed properties to the **ManagedPropertyMapping** attribute inside the display template before you can start using them in your display templates.

```javascript
<mso:ManagedPropertyMapping msdt:dt="string">'Link URL'{Link URL}:'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:'','FileExtension','SecondaryFileExtension','ServerRedirectedEmbedURL','ServerRedirectedPreviewURL','ServerRedirectedURL'</mso:ManagedPropertyMapping>
```

On my GitHub repository you can find a sample display template with these properties: [item display template with OWA properties](https://github.com/estruyf/blog/blob/master/Useful%20OWA%20managed%20properties/Item_OWA.html "Item display template with OWA properties").