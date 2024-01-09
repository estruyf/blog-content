---
title: V4.master Sticky Footer With Undocked Ribbon
author: Elio Struyf
type: post
date: 2010-08-26T12:43:28.000Z
slug: /v4-master-sticky-footer-with-undocked-ribbon/
dsq_thread_id:
  - 3836444547
categories:
  - Branding
  - Master Page
tags:
  - Footer
  - Ribbon
  - v4.master
comments: true
---

Hi,

This is actually my first blog post and it's about my first real frustration and moment of joy with SharePoint 2010.

This week I wanted to insert a "sticky" footer to my masterpage (v4.master). For two days I have tried to get it working on Internet Explorer and Firefox, but for some reasons it always came out as a disappointment. Sometimes it was only working in Firefox and vice versa.

Today I wanted to retry and took a new copy of my v4.master page and made a clean html file with a working "sticky" footer layout. This layout is based on the one of [Ryan Fait](http://ryanfait.com/sticky-footer/ "Ryan Fait"). After that I inserted everything from the original v4.master page.

It was trial and error, but I made it to the end. I finally succeeded getting the footer where HE should be!

Most of the problems were related to the SharePoint Dialog window. In Firefox it only show scrollbars and could not see the content. In Internet Explorer the dialog rendered correctly but the content was gone. After removing the "v4master" id from the body, things got a lot easier. I used a few Internet Explorer CSS selectors to get it working.

Here is my HTML starters code.

{{< highlight html "linenos=table,noclasses=false" >}}
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Sticky Footer</title>
  
  <style type="text/css">
    * { 
      margin: 0; 
    }
    html, body { 
      height: 100%;
    }
    .wrapper { 
      min-height: 100%;
      height: auto !important;
      height: 100%;
      margin: 0 auto -40px;
    }
    .footer, .push { 
      height: 40px;
    }
    .footer {
      background: #ccc;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Content -->
    <div class="push"></div>
  </div>
  <div class="footer">
    <span>This is the footer</span>
  </div>
</body>
</html>
{{< / highlight >}}

After the changes the CSS looks like this.

{{< highlight css "linenos=table,noclasses=false" >}}
html, body {
  height: 100%;
}
html.ms-dialog body {
  /* Show the vertical scrollbar only when needed in the dialog forms. */
  overflow-y: visible;
}
form {
  /* Needs to have a value, otherwise the form will not be shown. */
  height: 1%9 !important; /* IE8 and below */
}
.wrapper {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  /* The bottom margin is the negative value of the footer's height */
  margin: 0 auto -40px;
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
  overflow-x: hidden;
  /* In IE8 the horizontal scrollbar needs to be visible. */
  /* Without it will sometimes occur that you cannot scroll. */
  overflow-x: visible9;
  overflow-y: visible;
  height: 100% !important;
}
{{< / highlight >}}

Here are a few screenshots of the sticky footer in action.

{{< caption-legacy "uploads/2010/08/footer1.jpg" "Footer on a OOTB Team Site" >}}

{{< caption-legacy "uploads/2010/08/footer2.jpg" "Footer on the bottom of a long page" >}}

{{< caption-legacy "uploads/2010/08/footer3.jpg" "The footer is not shown in the dialog windows" >}}

Here is the masterpage zip file: 

[v4_Sticky_Footer.master](/uploads/2010/08/v4_Sticky_Footer.master.txt)

This version is tested in IE7, IE8, IE9, and Firefox v3+.

## Changes

### Update: 30/05/2012

Vinod noticed that this solution was not workfing correctly for IE7. Therefor I have updated the CSS and master page file, so that the solution now also works for IE7.
