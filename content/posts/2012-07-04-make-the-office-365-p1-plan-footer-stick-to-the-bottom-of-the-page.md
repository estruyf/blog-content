---
title: Make the Office 365 P1 Plan Footer Stick to the Bottom of the Page
author: Elio Struyf
type: post
date: 2012-07-04T08:40:00+00:00
slug: /make-the-office-365-p1-plan-footer-stick-to-the-bottom-of-the-page/
Xylot:
  - http://www.xylos.com/blog/post/1289/Make-the-Office-365-P1-Plan-Footer-Stick-to-the-Bottom-of-the-Page/
dsq_thread_id:
  - 3920830179
categories:
  - Branding
  - SharePoint
tags:
  - Branding
  - Master Page
  - Office 365
  - Styling
comments: true
---

People that are using the Office 365 P1 Plan they probably already noticed that the footer does not stick at the bottom of the page. But I do not like the empty white space at the bottom, so I thought to fill it up and make the footer stick to the bottom of the page.

Here is how it looks out-of-the-box:

{{< caption-new "/uploads/2012/06/060312_1533_MaketheOffi1.png" "Office 365 Layout"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAl0lEQVR4nC3HQQrCMBBA0dz/WC2KoBtrFc1CFw1KoSE0bTKTyUwiFT9v85UdTYhRRJiZiBCRmaVIzhkA1GSnZVkjICCmlBJRSilEAES/BuWcm+3oAq0R8y9hFuZahIhUiDFYA6VKKbnUXGqp/5hZffqjO7f4ecGgYdBoNAyPjdHh/VTL7eD7/XLd+Us7d83cNX7Tbns/fQGp4KiGRC354gAAAABJRU5ErkJggg==" "627" "366" >}}

In the past I have already created a sticky footer solution for SharePoint which can be found [here](https://www.eliostruyf.com/v4-master-with-sticky-footer-and-docked-ribbon/).

For the Office 365 layout, you will need to follow the next steps.

## Step 1

Open the site in SharePoint Designer 2010.

## Step 2

Create a copy of the v4.master page and set it as default and custom master page.

{{< caption-new "/uploads/2012/06/060312_1533_MaketheOffi2.png" "Set as Default and Custom Master Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAb0lEQVR4nE3MQQ7CIBBGYe5/MhIXxgtoQoOjzD8FakGCYejSfvv3DMfykkpSkZsnQNYQUGsbQ9eUzTxhgDmIAOBf73upRv+mvB09KW8l5U/e9niuVbWVmGVJcP0ro8ck/jTXyeEWnKWHpbvFcoG/Hj4Aje6WnS1hAAAAAElFTkSuQmCC" "346" "190" >}}

## Step 3

Find the **s4-workspace** DIV and add the following line underneath it:

```html
<div class='wrapper'>
```

Find the closing tag of the **s4-workspace** DIV, and close the wrapper DIV.

## Step 4

Find the **DeveloperDashboard** control, and add the following line underneath it:

```html
<div class='push s4-notdlg'></div>
```


## Step 5

Add the following CSS to the master page or custom stylesheet.

```css
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
  margin: 0 auto -30px;
  overflow: visible !important;
}
.ShellFooter, .push {
  /* .push must be the same height as .footer */
  /* Multicolumn Layout With Sticky Footer */
  clear: both;
}
/* Set the dialog overlay to 100% width and Height. Otherwise the page body will show scrollbars. */
.ms-dlgOverlay {
  height: 100% !important;
  width: 100% !important;
}
body #s4-workspace { margin-bottom: -30px; }

/* Orange Footer */
body #s4-workspace { background: #D1510F; }
#s4-titlerow { position: relative; z-index: 2; }
#s4-mainarea { background: #fff; }
.divider { z-index: 1; }
```


## Result

The end result looks like this:

{{< caption-new "/uploads/2012/06/060312_1533_MaketheOffi3.png" "Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAApUlEQVR4nC3BS27CMBAAUB+hmwix6FE4RKW0SNyix2SXsCisE4QUB5AxzIzn57Dpe+E+X4DI3c1cREthM/NaVZWIwnWOOWdAQEQuxIUKEbyAEHN+hpTS4zYl4BeSqaiKm7pZdRfmAAhwO1NdzKvWKr7U5Z+ZhenUpeNerheeBo6jzCPHkeMgccA4hsPus9+uD9t1/73q2qZrm75t+p9V9/Xx97t5A+/AnDgDPYUWAAAAAElFTkSuQmCC" "1036" "609" >}}

[v4_Office365.master](/uploads/2012/06/v4_Office365.master.txt)