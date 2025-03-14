---
title: Create a Load More Results Link / Button for the Content Search Web Part (Display Template)
author: Elio Struyf
type: post
date: 2013-08-01T09:35:35+00:00
slug: /create-a-load-more-results-link-button-for-the-content-search-web-part/
dsq_thread_id:
  - 3836446661
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - jQuery
  - Search
  - Styling
  - Web Part
comments: true
---

The next blog post describes how you can create a **Load More Results** link as the name itself describes, loads more results. The solution is created to be used in a Content Search WebPart.

For this solution you will need to create a new Control Display Template (or you can append it to an existing one).

The first thing to do is to create a reference to jQuery in your Control Display Template (jQuery makes it easier to manipulate the HTML). If it is already loaded in your master page, you do not have to include it in the control template.

The jQuery reference can be referenced in the control like this:

```javascript
$includeScript("", "http://code.jquery.com/jquery-1.10.1.min.js");
```

When you want to retrieve more results, you can make use of a function called **page**. This function is available on the Client Control of the context (ctx.ClientContext.page()). When this function gets called, it's going to load the next set of results.

The problem I had, was that my previously loaded results were always removed when I called the **page** function. When the function gets called, the web part retrieves the next set of results, and this causes the Display Templates to render the HTML of the new set of results. So the previous results that were rendered will be gone, and the new results are shown instead.

First time:

1.  Result A
2.  Result B

Second time:

1.  Result C
2.  Result D

What we need is the following:

1.  Result A
2.  Result B
3.  Result C
4.  Result D

## Showing the Results

After some testing, I found that the best way is to place the set of results in an element outside the render area of the Control Display Template. To do this, you need to create a new element outside the WebPart body. The element that contains the original set of results will be hidden.

```javascript
var hiddenElm = $('#'+controlId);
var visibleElm = hiddenElm.parents('.ms-WPBody:eq(0)').parent().children('#Show-Items');
// Hide the original set of results
hiddenElm.hide();

if (visibleElm.length <= 0) {
  // Reset the page number on refresh
  if (ctx.ClientControl.get_currentPageNumber() > 1) {
    ctx.ClientControl.page(1);
  } else {
    // Get the tag name of the element
    var tagname = hiddenElm.prop('tagName');
    // Box needs to be created before or after the web part, 
    // otherwise the content will be cleared when new results are retrieved.
    hiddenElm.parents('.ms-WPBody:eq(0)').before('<'+tagname+' id="Show-Items" class="'+hiddenElm.attr('class')+'"></'+tagname+'>');
    visibleElm = hiddenElm.parents('.ms-WPBody:eq(0)').parent().children('#Show-Items');
  }
}
```

The next step is to append all the items from your result set to the new element. This can be done like this:

```javascript
// Append all the hidden items to the visible items element
hiddenElm.children().each(function () {
  // Append the items to the visible div
  $(this).appendTo(visibleElm);
});
```

## Adding the Show More Link

Most of the code comes from the **Control_ListWithPaging.html** Display Template. In that control you have two buttons, a previous and a next button. I only copied the code that was needed for the next button.

```javascript
// Get the paging information
var pagingInfo = ctx.ClientControl.get_pagingInfo();
var lastPage = pagingInfo[pagingInfo.length -1];
// If the value of pageNumber is equal to -2, more results can be retrieved
if (typeof lastPage !== 'undefined' && typeof lastPage.pageNumber !== 'undefined') {
  var hasNextPage = lastPage.pageNumber == -2;
}
```

The last line in the code block is a special one. It checks if the value of **lastPage.pageNumber is equal to minus two**, and when this condition is met, it means that there are more results that can be loaded.

So by checking the **hasNextPage**, you can append a **Show More Results** link after the hidden element, when the value condition is true.

```javascript
// Append the show more link if a next page is available
if(hasNextPage) {
  hiddenElm.after('<a href="#" id="'+controlId+'showmore">Show More Results</a>');
}
```

The last thing is to create and event handler which listens to the click event of the **Show More Results** link.

```html
// When clicked on the show more link, the new set of results needs to be retrieved
$('#'+controlId+'showmore').click(function () {
  // Load the next set of results
  ctx.ClientControl.page(lastPage.startItem);
  return false;
});
```

All of this code needs to be executed when the rendering of the results is completed. This can be done with the **AddPostRenderCallback** method.

```javascript
AddPostRenderCallback(ctx, function() {
  // Place the code here
});
```

## Final Result

Here is the whole script:

```javascript
var hiddenElmId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_Results_");
AddPostRenderCallback(ctx, function() {
  var hiddenElm = $('#'+hiddenElmId);
  var visibleElm = hiddenElm.parents('.ms-WPBody:eq(0)').parent().children('#Show-Items');
  // Hide the original set of results
  hiddenElm.hide();

  // Check if the Visible items element already exists
  if (visibleElm.length <= 0) {
    // Reset the page number on refresh
    if (ctx.ClientControl.get_currentPageNumber() > 1) {
      ctx.ClientControl.page(1);
    } else {
      // Get the tag name of the element
      var tagname = hiddenElm.prop('tagName');
      // Box needs to be created before or after the web part, 
      // otherwise the content will be cleared when new results are retrieved.
      hiddenElm.parents('.ms-WPBody:eq(0)').before('<'+tagname+' id="Show-Items" class="'+hiddenElm.attr('class')+'"></'+tagname+'>');
      visibleElm = hiddenElm.parents('.ms-WPBody:eq(0)').parent().children('#Show-Items');
    }
  }

  // Append all the hidden items to the visible items element
  hiddenElm.children().each(function () {
    // Append the items to the visible div
    $(this).appendTo(visibleElm);
  });

  // Get the paging information
  var pagingInfo = ctx.ClientControl.get_pagingInfo();
  var lastPage = pagingInfo[pagingInfo.length -1];
  // If the value of pageNumber is equal to -2, more results can be retrieved
  if (typeof lastPage !== 'undefined' && typeof lastPage.pageNumber !== 'undefined') {
    var hasNextPage = lastPage.pageNumber == -2;
    // Append the show more link if a next page is available
    if (hasNextPage) {
      hiddenElm.after('<a href="#" id="'+hiddenElmId+'showmore">Show More Results</a>');
    }
  }

  // When clicked on the show more link, the new set of results needs to be retrieved
  $('#'+hiddenElmId+'showmore').click(function () {
      // Load the next set of results
      ctx.ClientControl.page(lastPage.startItem);
      return false;
  });
});
```

The list HTML looks like this:

```html
<ul id="_#=hiddenElmId=#_" class="cbs-List">
  _#= ctx.RenderGroups(ctx) =#_
</ul>
```

**Note**: you can also place the code from inside the ctx.OnPostRender method in a separate JavaScript file, and reference the file the same way as the jQuery file.


**Note 2**: I made the code as generic as possible so that this can be used by multiple CSWP on the same page.

{{< caption-new "/uploads/2013/07/073113_1906_CreateaLoad1.png" "First Result Set"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAX0lEQVR4nDWKwQnDUAxD//7QFdoJShfoQDn0kNiSE4j8HRyoEDq8p0GHbBVcvslNsKRnYOqsqkFHwkS/3dYntuumRgCNYLkzgwrmHiKaHDHW72d5PX7vZxJVVXP2/nMB5a1ydg1UaJUAAAAASUVORK5CYII=" "359" "153" >}}

{{< caption-new "/uploads/2013/07/073113_1906_CreateaLoad2.png" "Extra results loaded"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlklEQVR4nD2OOxLCMAxEff+aK9BR0tBxDiooYKAhsfWxnawkxmFA1Y72SbuJ5oz8Rp7WPKHMKPMQQuEeEUlFTQhCpgxlE/Klh5tjDfckJMYFXDAgBtPQylbFDUm/NmUw2WaPB+vigANJtfnSrNZBDGg7bdVUrLekz3u7Xvrj5r1bb9brSP1Nyufja797nw7/VYSP2lvzD9xKyc1QoUxLAAAAAElFTkSuQmCC" "379" "256" >}}

{{< caption-new "/uploads/2013/07/073113_1906_CreateaLoad3.png" "Two web parts with a Show More Results link"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXklEQVR4nDWMOQ6AMBAD8/8nUVBR8AcaaqQoBwTWyR4oEViuPLZdCb4BNgTUkhPTIyCpMFUnVzLVDxNa9Hym7rtohRNQJ6PR/JHWmXPoiUhfx2WiffsaKspN/zMzewE5onRlcxW86gAAAABJRU5ErkJggg==" "630" "247" >}}

## Download

You can download this template on the SPCSR GitHub repository: [Control template with load more button](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Control%20template%20with%20load%20more%20button%20(CSWP)).

## Updates

### 13/01/2016

A couple of days ago I had a chat with "Cassy" about a problem with this template once you refresh the page. He wrote a blog post about it back in August 2015 where he solved to problem with setting a IsRefresh property in the local browser storage (you can read the blog post [here](http://cassy.be/site/how-to-get-more-than-50-item-search-results-in-a-sharepoint-2013-display-template/)). This issue is now resolved without the need of the local browser storage property.