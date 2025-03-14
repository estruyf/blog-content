---
title: Display the Title Row (Top Navigation) in the Search Centers of SharePoint 2013
author: Elio Struyf
type: post
date: 2013-02-13T17:45:56+00:00
excerpt: "The first thing you mostly did when branding a SharePoint 2010 site, was creating a search center were the top navigation was shown (because it used the minimal master page it was not visible). When you did this for the first time, it was quite some work and effort. In SharePoint 2013 this process is a bit easier, because the search center isn't using the minimal master page anymore, and the correct content placeholders are referenced. Read this post to find out how to show the title row so the top navigation is available again."
slug: /display-the-title-row-top-navigation-in-the-search-centers-of-sharepoint-2013/
dsq_thread_id:
  - 3836445674
categories:
  - Branding
  - Search
  - SharePoint 2013
tags:
  - Master Page
  - Search
  - Search Center
  - Top Navigation
comments: true
---

When working with the new search centers in SharePoint 2013, the first thing that you will notice is that the title row is different compared with for example a standard Team Site.

{{< caption-new "/uploads/2013/02/021313_1745_DisplaytheT1.png" "Standard SharePoint 2013 Title Row"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/AJi924Oz2JS93aHD4J/B36PE36TE4KzH3e3p6Ofi4gC0y+Nko9fH2ej/9/D58u7++fX//vn++fX/+Pj17e216TJKqwu/KQAAAABJRU5ErkJggg==" "859" "173" >}}

{{< caption-new "/uploads/2013/02/021313_1745_DisplaytheT2.png" "Search Center Heading - Title Row is Hidden"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgUlEQVR4nAXByQ3CMBAFUFdEZ0iUQQNcWBoAikAsJ3JGIC4hQiFyLBuSjD1mjD/vqfH6MpqeJ9vr6lTNduXi8Fgeq03xtK12RqviXs/35a12EJLQQQYkyj+GMFOnvuwB9EQv3TRG248lH8h7IMfIyoeQMgZPxpp37wKHJElEAMQY/6u5a+Gp0b5VAAAAAElFTkSuQmCC" "859" "333" >}}

As you can see, the title row (red box) where the top navigation should be, is replaced by the search icon and search box (orange box).

The good news is that it is only hidden with some custom CSS on the results page, so you can easily make it visible again with the help of some JavaScript code.

## Displaying the Title Row (Top Navigation) Solution

My solution is to first check if there is a refinement panel on the current page. When you know that there is a refinement panel on the page, you need to do four things:

1.  Unhide the title row;
2.  Setting a Page Title for the search center page, because this is empty;
3.  Hiding the search icon;
4.  Removing the top margin of the refinement panel.

The JavaScript code looks like this:

```javascript
var refElm = document.getElementsByClassName('ms-searchCenter-refinement');
if (refElm.length > 0) {
  // Unhide the title row
  document.getElementById('s4-titlerow').setAttribute('style', 'display:block !important');
  // Set the Site Title
  document.getElementById('DeltaPlaceHolderPageTitleInTitleArea').innerHTML = 'Search Center';
  // Hide the search icon
  document.getElementById('searchIcon').style.display = 'none';
  // Remove the top margin 
  refElm[0].style.marginTop = 0;

  // The following lines are only needed for firefox
  var css = '#s4-bodyContainer #s4-titlerow { display: block !important; }',
      head = document.getElementsByTagName('head')[0],
      style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}
```

If you are using jQuery, you can use this:

```javascript
if ($('.ms-searchCenter-refinement').length > 0) {
  // Unhide the title row
  $('#s4-titlerow').attr('style', 'display:block !important');
  // Set the Site Title
  $('#DeltaPlaceHolderPageTitleInTitleArea').text('Search Center');
  // Hide the search icon
  $('#searchIcon').hide();
  // Remove the top margin 
  $('.ms-searchCenter-refinement').css('margin-top', '0');

  // The following line is only needed for firefox
  $('body').append('<style>#s4-titlerow { display: block !important; }</style>');
}
```


## Result

{{< caption-new "/uploads/2013/02/021313_1745_DisplaytheT3.png" "Search Center with the Title Row"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAg0lEQVR4nBXESwrCMBAA0NzIg4k3EVeCCJ5A0Cu4EJTiQly5ERFBajHSdpLM5DOdEd/imcn2PppexpvbfP+a7Z7L43tVNevzx/sAAOb0aBeH+lqDciyJVET1H/PgnDMpoqr4yE0fW0cQyGOiVHiQEIJBIhbFSLaztvt6hFJyzllVEfEH7mJso3v1pAkAAAAASUVORK5CYII=" "860" "329" >}}

## Updates

### 10/06/2013

Xin Zhang mentioned a problem when using the script in firefox. The two code blocks are updated to support firefox, the lines that are added to the JavaScript blocks are highlighted.