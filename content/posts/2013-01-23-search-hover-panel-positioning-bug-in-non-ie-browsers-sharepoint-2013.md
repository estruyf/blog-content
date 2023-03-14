---
title: Search Hover Panel Positioning Bug in non IE Browsers (SharePoint 2013)
author: Elio Struyf
type: post
date: 2013-01-23T08:54:18+00:00
slug: /search-hover-panel-positioning-bug-in-non-ie-browsers-sharepoint-2013/
dsq_thread_id:
  - 3836445843
categories:
  - Branding
  - Search
  - SharePoint 2013
tags:
  - CSS
  - Hover Panels
  - JavaScript
  - Master Page
  - Search
  - Search Center
  - Styling
comments: true
---

New SharePoint versions can be challenging, especially when it comes to branding your sites. When you are in a migration process like me, you will probably have to re-do the branding to support the new functionalities. Assuming that everything will work like before can be really disappointing. There are a lot of new functionalities, which means that your design will also need to support these functionalities.

One of these new functionalities with which I had trouble branding, were the search hover panels.

When I was testing my design, everything was working fine in Internet Explorer:

{{< caption-legacy "uploads/2013/01/012313_0821_SearchHover1.png" "Search Results in Internet Explorer" >}}

But when I opened the site in a non IE browser, the following happened:

{{< caption-legacy "uploads/2013/01/012313_0821_SearchHover2.png" "Search Results in firefox" >}}

_Note: these screenshots are just created for proving my point. Of course this was not the design I was working on, but the same thing happened._

As you can see, the hover panel is not where it has to be positioned.

The design was made with a couple of elements that were absolutely positioned. So the first thing I thought about was that it had something to do with that, but it was working fine in IE, so that was the weird thing.

## Debugging

First I needed to understand how these hover panels are being displayed on the screen, so I started with debugging the JavaScript. The hover panels seem to be created with the SearchUI.js JavaScript file.

This file can be found in the SharePoint root layouts folder: `C:\Program Files\Common Files\microsoft shared\Web Server Extensions\15\TEMPLATE\LAYOUTS`.

The function that is used to show the hover panel is **showPopup**, and this function invokes the **positionPopup** function. While debugging the positionPopup function, I saw that I retrieved different values for IE in comparison with firefox. When I dug deeper in the code, I stumbled on something interesting in the **getAbsolutePosition** function (this function was called from within the positionPopup function).

The getAbsolutePosition function looks like this:


{{< highlight javascript "linenos=table,noclasses=false" >}}
function getAbsolutePosition(targetElement, position) {
  var tempY = 0, tempX = 0;

  while (targetElement != null) {
    //since we position the HP absolutely, return the offset from the first absolutely positioned parent
    if(targetElement.currentStyle && targetElement.currentStyle.position && targetElement.currentStyle.position.toLowerCase() == "absolute"){
      break;
    }
    tempY += targetElement.offsetTop;
    tempX += targetElement.offsetLeft;

    targetElement = targetElement.offsetParent;
  }

  return (position === "Left") ? tempX : tempY;
}
{{< / highlight >}}


_Note: this function loops over each [offset parent](http://help.dottoro.com/ljetdvkl.php) element until it finds an absolute positioned parent. If no absolute positioned element is available, it will stop when there is not offset parent anymore.
_

The problem I discovered was on line 6. When debugging in firefox, the debugger never entered the "IF" statement, which was not the case for IE.

Taking a closer look at the **targetElement** object in firefox, it never contained a **currentStyle** object. A quick search on Google revealed the problem. The currentStyle object is only available for IE and Opera.

The same "IF" statement is also used in the **isInAbsoluteContainer** function.

## Solution

The solution is to append the following code to the getAbsolutePosition and isInAbsoluteContainer functions:


{{< highlight javascript "linenos=table,noclasses=false" >}}
if (window.getComputedStyle) {
  if (window.getComputedStyle(targetElement, "")["position"].toLowerCase() === "absolute") {
    break;
  }
}
{{< / highlight >}}


The updated code for the getAbsolutePosition looks like this:


{{< highlight javascript "linenos=table,noclasses=false" >}}
function getAbsolutePosition(targetElement, position) {
  var tempY = 0, tempX = 0;

  while (targetElement != null) {
    //since we position the HP absolutely, return the offset from the first absolutely positioned parent
    if (window.getComputedStyle) {
      if (window.getComputedStyle(targetElement, "")["position"].toLowerCase() === "absolute") {
        break;
      }
    }        
    else if (targetElement.currentStyle && targetElement.currentStyle.position && targetElement.currentStyle.position.toLowerCase() == "absolute"){
      break;
    }
    tempY += targetElement.offsetTop;
    tempX += targetElement.offsetLeft;

    targetElement = targetElement.offsetParent;
  }

  return (position === "Left") ? tempX : tempY;
}
{{< / highlight >}}


The updated code for the isInAbsoluteContainer looks like this:


{{< highlight javascript "linenos=table,noclasses=false" >}}
function isInAbsoluteContainer(targetElement){
  while (targetElement != null) {
    if (window.getComputedStyle) {
      if (window.getComputedStyle(targetElement, "")["position"].toLowerCase() === "absolute") {
        return true;
      }
    }        
    else if(targetElement.currentStyle && targetElement.currentStyle.position && targetElement.currentStyle.position.toLowerCase() == "absolute"){
      return true;
    }
    targetElement = targetElement.offsetParent;
  }  
  return false;
}
{{< / highlight >}}


The best approach is to create a copy of the searchUI.debug.js file and make the changes is the copied file. Upload this file to the master page gallery of the site, and reference the script in the master page like this:


{{< highlight html "linenos=table,noclasses=false" >}}
<Sharepoint:ScriptLink ID="searchui" language="javascript" name="~SiteCollection/_catalogs/masterpage/updatedSearchUI.js" Defer="true" runat="server"/>
{{< / highlight >}}


The end result should be the same as in IE.

**Note**: this is a bug/problem that is present in the RTM version of SharePoint 2013. This could be resolved in the final version, but I don't know.

# Scripts

Here you can download the new debug and minimal script:

- [Updated SearchUI debug version](uploads/2013/01/updated.SearchUI.debug_.js "Updated SearchUI debug version")
- [Updated SearchUI minimized version](uploads/2013/01/updated.SearchUI.js "Updated SearchUI minimized version")