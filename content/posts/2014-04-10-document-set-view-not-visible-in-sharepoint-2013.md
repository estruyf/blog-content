---
title: Document set view not visible in SharePoint 2013
author: Elio Struyf
type: post
date: 2014-04-10T07:15:40+00:00
slug: /document-set-view-not-visible-in-sharepoint-2013/
dsq_thread_id:
  - 3842274313
categories:
  - Branding
  - SharePoint 2013
tags:
  - Branding
  - Document Sets
  - Master Page
  - Styling
comments: true
---

Some time ago I wrote a post about the missing **Apps you can add** zone ([Missing the Apps you can add Zone When Adding a New App](https://www.eliostruyf.com/missing-apps-can-add-zone-adding-new-app/)). The problem with it was that this zone becomes available once a particular element is found on the page. The element was placed on the page via the **PlaceHolderPageTitleInTitleArea** content placeholder.

A couple of weeks ago I had a similar problem with our intranet, the problem was that Document Sets views weren't appearing in the libraries.

This was the view you retrieved:

{{< caption-new "/uploads/2014/04/041014_0715_Custombrand1.png" "Document set without a library view" >}}

The first thing I did as a check was directly the right thing to do, I turned removed the visibility property set to false from the **PlaceHolderPageTitleInTitleArea** content placeholder control. After I did this, the document set view became available:<span style="color: #313131; font-family: Helvetica; font-size: 10pt; background-color: white;">
</span>

{{< caption-new "/uploads/2014/04/041014_0715_Custombrand2.png" "Default document set view" >}}

The best solution if you want to hide the content placeholder **PlaceHolderPageTitleInTitleArea** in your branding, is to place it in a hidden DIV and set the visible property to false or leave it out.

```html
<div style="display:none">
  <asp:ContentPlaceHolder id="PlaceHolderPageTitleInTitleArea" runat="server" />
</div>
```

Another way could be to include the required elements in your master page. There are two elements that need to be on the page before the document set view renders. These elements should have the following IDs **idParentFolderName** and **idDocsetName**.

```html
<div style="display:none">
  <div id="idParentFolderName"></div>
  <div id="idDocsetName"></div>
</div>
```

Best is to use the first solution, because there are a lot of references in the OOTB SharePoint JavaScript files to the elements in that content placeholder.

## Background information

If you set the **visible** property of the content placeholder **PlaceHolderPageTitleInTitleArea** to false, you'll retrieve a JavaScript error for the **idParentFolderName** element which cannot be found.

{{< caption-new "/uploads/2014/04/041014_0715_Custombrand3.png" "JavaScript Error" >}}

When you add an element with **idParentFolderName** as ID, you'll get the next error for the **idDocsetName** element which cannot be found.

{{< caption-new "/uploads/2014/04/041014_0715_Custombrand4.png" "JavaScript Error" >}}

The errors you retrieve refer to the following lines in code:

```javascript
document.getElementById("idParentFolderName").innerHTML = "\u003ca href=\u0027http:\u002f\u002fsp2013app\u002fbrand\u002fThemes\u002fShared Documents\u0027\u003eDocuments\u003c\u002fa\u003e";
var breadcrumb = "Document Set";
document.getElementById("idDocsetName").innerHTML = breadcrumb;
document.title = "Document Set";
```

So once you added the elements in the master page (with the first or second solution), these errors go away and the document set view will render.