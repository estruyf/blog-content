---
title: V4.master Sticky Footer With Docked Ribbon
author: Elio Struyf
type: post
date: 2010-08-26T18:03:30+00:00
slug: /v4-master-with-sticky-footer-and-docked-ribbon/
dsq_thread_id:
  - 3836444546
categories:
  - Branding
  - Master Page
tags:
  - Footer
  - Ribbon
  - v4.master
comments: true
---

After getting the footer working in the undocked version, I have tried to get it to work with a docked ribbon.

The problem is that SharePoint's Javascript will automatically calculate the exact size of the div "s4-workspace" each time you click on the ribbon or a webpart. This will push the footer off the screen or the bottom from the scrollbar falls of the screen.<!--more-->

I have worked with the same sticky html code as the previous version ([sticky footer with undocked ribbon](http://eliostruyf.com/v4-master-sticky-footer-with-undocked-ribbon/ "sticky footer with undocked ribbon")). only the positions of the div's and css is changed.

I have placed the wrapper inside the s4-workspace div and the footer inside the form tag. This will make it possible to have the footer on the bottom of the page, and when the page content is longer the footer will be pushed down.

The CSS that is used.

{{< highlight css "linenos=table,noclasses=false" >}}
* {
  margin: 0;
}
body {
  overflow: hidden !important;
}
html.ms-dialog body {
  /* Show the vertical scrollbar only when needed in the dialog forms. */
  overflow-y: visible;
}
.wrapper {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  /* The bottom margin is the negative value of the footer's height */
  margin: 0 auto -40px;
  overflow: visible !important;
}
.footer, .push {
  /* .push must be the same height as .footer */
  height: 40px;
  /* Multicolumn Layout With Sticky Footer */
  clear: both;
}
.footer {
  background: #ccc;
}
/* Set the dialog overlay to 100% width and Height. Otherwise the page body will show scrollbars. */
.ms-dlgOverlay {
  height: 100% !important;
  width: 100% !important;
}
body #s4-workspace {
  margin-bottom: -40px;
}
{{< / highlight >}}

{{< caption-legacy "uploads/2010/08/image001.png" "SharePoint 2010 with sticky footer Docked Ribbon" >}}

Here you can download the docked version: [V4.Master_Footer_Docked_Ribbon](/uploads/2011/04/V4_Master_Footer_Docked_Ribbon.zip). This version should work for Internet Explorer 8 and Firefox v3.6.8.

## Changes

### Master page update: 12/04/2011

I updated the master page today. There was a small problem with a "div" closing tag that was placed on the wrong line in the master page. Therefore I placed the updated master page online. Thanks to [Brian Arnold](http://twitter.com/SPBrianArnold "Brian Arnold") to let me re-investigate a problem with Internet Explorer 7.

## Download

[Master Page](/uploads/2011/04/V4_Master_Footer_Docked_Ribbon.zip)