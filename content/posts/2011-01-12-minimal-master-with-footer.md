---
title: Minimal.master with footer
author: Elio Struyf
type: post
date: 2011-01-12T19:04:12+00:00
slug: /minimal-master-with-footer/
dsq_thread_id:
  - 3838769694
categories:
  - Branding
  - Master Page
tags:
  - Footer
  - Master Page
  - minimal.master
  - Search Center
comments: true
---

This blog post is created by a request of a commenter named Gane. He asked me **how to add  a footer section to the "minimal.master" master page**. This master page is used for the search centers in SharePoint 2010.
My previous solution for adding a footer to a master page, were based on the "v4.master" master page ([solution 1](https://www.eliostruyf.com/v4-master-with-sticky-footer-and-docked-ribbon/), [solution 2](https://www.eliostruyf.com/v4-master-sticky-footer-with-undocked-ribbon/)). The HTML code of the minimal master page is totally different than the HTML code from the "v4.master" master page.

In the minimal master page there isn't a "s4-workspace" section. I used this in the "v4.master" to add my custom wrapper to it and add my footer after this section. This means that another section needs to be used for the minimal master page. There are two possibilities:

1.  Create a custom wrapper section like in the "v4.master" solution that encapsulates the whole html from the page;
2.  Search for an existing section that could be used.
I chose for the second possibility. 

The section that encapsulates everything from the page is the body and form tags. The footer needs to be added after the chosen section, so the form section needs to be used.

Before the "form" closing tag, add the following HTML code block:

```html
<div class="push s4-notdlg"></div>
```

After the "form" closing tag, add the following HTML block:

```html
<div class="footer s4-notdlg">
  <span>This is my minimal.master page footer.</span>
</div>
```

The CSS isn't that different, you will need to change the wrapper class to the "form" section.

```css
/* Page needs to have a 100% height. */
html, body { 
  height: 100%;
}
body #aspnetForm { 
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
  background: url("/_layouts/images/bgximg.png") repeat-x scroll 0 -565px #21374C;
  color: #fff;
  font-size: 150%;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
}
```

The end result should be like this.

{{< caption-new "/uploads/2011/01/minimal_footer.png" "minimal.master with footer"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAjklEQVR4nG2KsQrCMBRF840qgq5SKq4SOji46Je4GaRIRCXFgn/TNh8geXnJlaboIB44w+VcUWx3yOUeo8Uak0x+HWcS07zAfLXBbCkhiAiOCJ4Z3v/q0dM0LQSHkEYIcYjMYGY48ni54dh2HUSMMY1/fJq1FkJdKvQetUF5r6HNM1neaihtcLo+cFBnvAHZQauNsWQBDQAAAABJRU5ErkJggg==" "659" "327" >}}

{{< caption-new "/uploads/2011/01/minimal_scroll.png" "Minimal.master at the bottom of the page scrolling"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAASklEQVR4nC3JWwqAIBQAUfe/qB5QKnUlpaWIj8CcEPqYnzMKoPdOzIlcIuVJvK0N/YNaC2o1jsU4Ji1sx4WWgHU3+xkYb9aCFc8HIB5I5ESSWXwAAAAASUVORK5CYII=" "659" "144" >}}

Here you can download my version of the ["minimal.master" master page with a footer](/uploads/2011/01/minimal_with_footer.master.txt).