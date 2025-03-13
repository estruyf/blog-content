---
title: Adding paging numbers to the control list with paging template
author: Elio Struyf
type: post
date: 2015-02-06T10:10:14+00:00
excerpt: The out of the box list with paging display template only shows previous and next page buttons. In this post I show you how to add page numbers to it.
slug: /adding-paging-numbers-control-list-paging-template/
dsq_thread_id:
  - 3836535705
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

When you are using the Content Search Web Part, you have by default a control template list with paging available. Now this template only shows left and right buttons to navigate to the next or previous page:

{{< caption-new "/uploads/2015/02/020615_1010_Addingpagin1.png" "Default list with paging template" >}}

These two buttons do not give you very much visual information about paging. For example: you do not know on which page you currently are and you can only go back one page at a time.

If you go to a SharePoint search center the paging works a bit differently compared to the CSWP template. In the default control template of the search result web part the same left and right paging buttons are included, but you also have page numbers which makes it easier to navigate.

{{< caption-new "/uploads/2015/02/020615_1010_Addingpagin2.png" "Search result web part template with paging" >}}

As this is just some additional JavaScript it can be easily added to your own templates so that you can create a control template with paging numbers for the CSWP.

## Solution

The code you need to add to get these paging numbers in your control template is the following:

```html
<!--#_
// Show the paging numbers
for (var i = 0; i < pagingInfo.length; i++) {
    var pi = pagingInfo[i];
    if(!$isNull(pi)) {
        if (pi.pageNumber !== -1 && pi.pageNumber !== -2) {
            var pageLinkId = "PageLink_" + pi.pageNumber;
            // Check if it is the current selected page
            if (pi.startItem === -1) {
_#-->
            <strong>_#= $htmlEncode(pi.pageNumber) =#_</strong>
<!--#_
            } else {
_#-->
            <a id="_#= $htmlEncode(pageLinkId) =#_" href="#" title="_#= $htmlEncode(pi.title) =#_" onclick="$getClientControl(this).page(_#= $htmlEncode(pi.startItem) =#_);return Srch.U.cancelEvent(event);">_#= $htmlEncode(pi.pageNumber) =#_</a>
<!--#_
            }
        }
    }
}
_#-->
```

&nbsp;

The code loops over all the available pages. You need to be aware that there are two special numbers that you can retrieve which is:

*   "-1": move to the previous page
*   "-2": move to the next page
{{< caption-new "/uploads/2015/02/020615_1010_Addingpagin3.png" "Special page numbers" >}}

These special numbers are used for the left and right buttons, so they do not need to be included in the paging numbers. That is why there is a check to see if the pageNumber is not equal to -1 or -2.

This code needs to be added in between the left and right buttons:

```html
<li class="ms-promlink-header">
    <span class="ms-promlink-headerNav">
        <a class="ms-commandLink ms-promlink-button _#= $htmlEncode(previousPageContainerClassName) =#_" title="_#= $htmlEncode(firstPage.title) =#_" href="#" onclick='$getClientControl(this).page(_#= $htmlEncode(firstPage.startItem) =#_);return Srch.U.cancelEvent(event);'>
            <span class="ms-promlink-button-image">
                <img class="_#= $htmlEncode(previousPageImageClassName) =#_" alt="_#= $htmlEncode(firstPage.title) =#_" src="_#= $urlHtmlEncode(GetThemedImageUrl('spcommon.png')) =#_">
            </span>
        </a>

        <span class="ms-promlink-button-inner"></span>

<!--#_
// Show the paging numbers
for (var i = 0; i < pagingInfo.length; i++) {
    var pi = pagingInfo[i];
    if(!$isNull(pi)) {
        if (pi.pageNumber !== -1 && pi.pageNumber !== -2) {
            var pageLinkId = "PageLink_" + pi.pageNumber;
            // Check if it is the current selected page
            if (pi.startItem === -1) {
_#-->
            <strong>_#= $htmlEncode(pi.pageNumber) =#_</strong>
<!--#_
            } else {
_#-->
            <a id="_#= $htmlEncode(pageLinkId) =#_" href="#" title="_#= $htmlEncode(pi.title) =#_" onclick="$getClientControl(this).page(_#= $htmlEncode(pi.startItem) =#_);return Srch.U.cancelEvent(event);">_#= $htmlEncode(pi.pageNumber) =#_</a>
<!--#_
            }
        }
    }
}
_#-->

        <span class="ms-promlink-button-inner"></span>

        <a class="ms-commandLink ms-promlink-button _#= $htmlEncode(nextPageContainerClassName) =#_" title="_#= $htmlEncode(lastPage.title) =#_" href="#" onclick='$getClientControl(this).page(_#= $htmlEncode(lastPage.startItem) =#_);return Srch.U.cancelEvent(event);'>
            <span class="ms-promlink-button-image">
                <img class="_#= $htmlEncode(nextPageImageClassName) =#_" alt="_#= $htmlEncode(lastPage.title) =#_" src="_#= $urlHtmlEncode(GetThemedImageUrl('spcommon.png')) =#_">
            </span>
        </a>
    </span>
</li>
```


## Result

This is the end result:

{{< caption-new "/uploads/2015/02/020615_1010_Addingpagin4.png" "List with paging buttons and numbers" >}}

## Download

The template I created for this post can be downloaded from GitHub at the following location: [Paging control template with page numbers (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Paging%20control%20template%20with%20page%20numbers%20(CSWP) "Paging control template with page numbers - CSWP").