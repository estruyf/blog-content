---
title: 'Fix: Open in New Tab not Available in the Right-Click menu of Internet Explorer'
author: Elio Struyf
type: post
date: 2012-02-13T20:00:15+00:00
slug: /fix-open-in-new-tab-not-available-in-the-right-click-menu-of-internet-explorer/
Xylot:
  - http://www.xylos.com/blog/post/1174/Open-in-New-Tab-not-Available-in-the-Right-Click-menu-of-Internet-Explorer/
dsq_thread_id:
  - 3836444797
categories:
  - Branding
  - SharePoint
tags:
  - CSS
  - Navigation
comments: true
---

This week a client made me aware that links in the top navigation and in the quick launch (from SharePoint 2010) cannot be opened in a new tab from the Right-Click menu of Internet Explorer. If you try to do it, the option is not available.

{{< caption-new "/uploads/2012/02/021312_2000_FixOpeninNe1.png" "Right-Click menu" >}}

If you do it on a regular link, you should get the following Right-Click menu.

{{< caption-new "/uploads/2012/02/021312_2000_FixOpeninNe2.png" "Open in New Tab" >}}

If we check the HTML code of a top navigation or quick launch item, you will see that two spans are encapsulated by an anchor tag.

```html
[ <span class="additional-background"> <span class="menu-item-text">Team Discussion</span> </span> ](/Lists/Team%20Discussion/AllItems.aspx)
```

The spans are displayed as block by the corev4 CSS file, and this CSS attribute seems to be causing the problem.

The solution is to display the spans as inline elements instead of block elements. You can add the following CSS code to your master page or custom style sheet to solve the issue.

```css
.menu .menu-item .additional-background,
.menu .menu-item .additional-background .menu-item-text {
  display: inline !important;
}
```

{{< caption-new "/uploads/2012/02/021312_2000_FixOpeninNe3.png" "Result: Open in New Tab" >}}