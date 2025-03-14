---
title: Sticky Footer Solution for SharePoint 2013
author: Elio Struyf
type: post
date: 2013-01-23T13:30:21+00:00
slug: /sticky-footer-solution-for-sharepoint-2013/
dsq_thread_id:
  - 3836445822
categories:
  - Branding
  - SharePoint 2013
tags:
  - CSS
  - Footer
  - Master Page
  - Styling
comments: true
---

Footers and SharePoint that was the starting point of this blog. Back in August 2010, I blogged about how to create a sticky footer for your SharePoint 2010 sites (blog post can be found [here](https://www.eliostruyf.com/v4-master-with-sticky-footer-and-docked-ribbon/) and [here](http://eliostruyf.com/v4-master-sticky-footer-with-undocked-ribbon/)). Now it is time to upgrade this sticky footer solution to SharePoint 2013.

For this sticky footer solution you will only need to add some HTML and CSS markup to the master page html file.

If you used my solution from 2010, you will see that not much has changed.

## Adding the HMTL Footer markup to the master page

*   Open the master page its HTML file in your favorite text editor (in this example I will use the seattle.html file);
*   Do a search for the **s4-workspace** DIV, and add a new wrapper DIV underneath it;


```html
<!-- =Wrapper -->
<div class="wrapper">
```


{{< caption-new "/uploads/2013/01/012313_1253_StickyFoote1.png" "Wrapper DIV location"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGPQN9DS1FAxNdKwtdWxttEzMlbXN1DV0VXR1VPV0lYGAFVZBV6v5iBAAAAAAElFTkSuQmCC" "690" "77" >}}

*   Go straight to the bottom of the HTML file and find the last DIV closing tag;
*   Replace the DIV's closing tag with the following code:


```html
    <!-- =Push is needed for the footer to be correctly placed on the page. ms-dialogHidden used to hide it in the dialogs. -->
    <div class="push ms-dialogHidden"></div>
  </div>
  <!-- =Footer: ms-dialogHidden used to hide it in the dialogs. -->
  <div class="footer ms-dialogHidden">
    <span>This is my SharePoint 2013 Footer</span>
  </div>
</div>
```


{{< caption-new "/uploads/2013/01/012313_1253_StickyFoote2.png" "Footer HTML location"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVR4nE3CwQ2AMAwDwM5ChYNV20XiQ/ZfjC+nG0sgZwQHTiXllA3pJOdYwrPZ7+6+o6rr+P8AN0gJ7SJFtaMAAAAASUVORK5CYII=" "1034" "211" >}}

*   Save the file

## Styling your footer

Now that you've added your HTML markup to the master page HTML file, we only need to style the footer.

The CSS markup looks like this:

```css
.wrapper {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  /* The bottom margin is the negative value of the footer's height */
  margin: 0 auto -30px;
  overflow: visible !important;
}
.footer, .push {
  /* .push must be the same height as .footer */
  height: 30px;
  /* Multicolumn Layout With Sticky Footer */
  clear: both;
}
.footer {
  background: #0072C6;
  color: #fff;
  line-height: 30px;
  text-align: center;
}
body #s4-workspace {
  margin-bottom: -30px;
}
```

I paced this CSS code for testing purposes in the following location: `/_layouts/15/images/tests/footer.css`.

## Sticky Footer Result

The result looks like this:

{{< caption-new "/uploads/2013/01/012313_1253_StickyFoote3.png" "SharePoint 2013 Footer"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAoklEQVR4nEWL2wqCQBiE9x17iiB6jG7qLuiid/Cmw1X4EJYhKUZaFu2/Se5me7D9Da1oGIZhPoaM3GToJkGWb9NbTEUMD/8svGNxYpwXd3KgxSYTM++68MFZ56tI1D8ZYwhWOgXeHc/7k2Vn4PSmbmUtIn6xVFqZigJwXshSGFlaxFfLldakLVijbbLxX817R58hyIipCNSeqZipEORnCS78DQbVo4fqu03pAAAAAElFTkSuQmCC" "703" "448" >}}

{{< caption-new "/uploads/2013/01/012313_1253_StickyFoote4.png" "SharePoint 2013 Footer Scrolling"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmUlEQVR4nB2N2QqDMBRE8/8fVuhDH4RK1ZaCYF3iUk00m7l3Sjpvc4bDiEens0Zd30ve6Vu9Xl5z3qp7q/vV6G0TYA6RRx0AGB8n5QEwGIBzThCRP+O0ewZrd9az9ZGI02yNEcRkQuy3JCkbm687iYkJgN53wSlwIfXdRfl/SQg4jkMUgymlfY62kraUNvscxWBLaarR583yAwikqxvWzFjAAAAAAElFTkSuQmCC" "703" "449" >}}

### JavaScript Solution

During the writing of this blog post Randy Drisgill posted his solution of adding a Sticky Footer via JavaScript. The blog post can be found [here](http://blog.drisgill.com/2013/01/sticky-footers-in-sharepoint.html).

### Download the files

- [Seattle With Sticky Footer](/uploads/2013/01/seattle-with-sticky-footer.html)
- [Footer CSS file](/uploads/2013/01/footer.css)