---
title: Show the Share Action on your Page Layouts
author: Elio Struyf
type: post
date: 2013-12-04T12:25:48+00:00
slug: /show-the-share-action-on-your-page-layouts/
dsq_thread_id:
  - 3839828122
categories:
  - Page Layout
  - SharePoint 2013
tags:
  - Page Layout
  - Sharing
  - Social
comments: true
---

A question I received a couple of days ago was if it would be possible to display the share action on a page like the action in the context menu of that page.

{{< caption-new "/uploads/2013/12/120413_1225_ShowtheShar1.png" "Share Action"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAqUlEQVR4nDXM247CIBRAUf7/90zGRzOJNVWgcO5wkNbYyaz3vYOcmJmFW2v95O6qWsoWVKWULcaUc/Yx5uk9577vRBS+IfFWChExIlSgWmtK3kxEwvJ4MAKmCFv2uDrCW2VHOLzHlIOqNpEGlRAYsan0MbqP4zi+de/dzEhEzQAR/s05vfeAiCnnuCy3y6W8oqiaqpmKCAAEJooxPe/33+tPWtcKUE9/jw/k/uOqvqtysQAAAABJRU5ErkJggg==" "324" "257" >}}

## Solution

The solution for this is really simple, all you need to do is creating a hyperlink on the page layout and use a JavaScript function call in the href attribute for the click event.

```html
<a href="javascript:sharePage()" title="Share page">Share this page</a>
```

The function behind this call looks like this:

```javascript
function sharePage() {
  EnsureScriptFunc("sharing.js", "DisplaySharingDialog", function () {
    var webUrl = _spPageContextInfo.webAbsoluteUrl;
    var listId = _spPageContextInfo.pageListId;
    var itemId = _spPageContextInfo.pageItemId;
    if (typeof webUrl !== "undefined" && typeof listId !== "undefined" && typeof itemId !== "undefined") {
      DisplaySharingDialog(webUrl, listId, itemId.toString());
    }
  });
}
```

This function doesn't require a lot of code. You'll just need to be sure that the **DisplaySharingDialog** function is available, and pass through the following parameters:

*   The current URL of the site;
*   The list ID of the current page;
*   The item ID of the current page.
As you can see in the code, these things can be resolved from the **_spPageContextInfo** object.