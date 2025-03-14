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

{{< caption-new "/uploads/2012/02/021312_2000_FixOpeninNe1.png" "Right-Click menu"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAATCAIAAAAmiQu5AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB9klEQVR4nEWQS2+bQACE90f2nvbQc6L+g/6Eqqcm9/ZQqekjkWNjMFAbY1iWxwLGLnlIqRU/1xgbL7CLqZwcOprbSJ9mBvCVzYhP6YFmRUEZ3RcVqw685mXFywrU+EMVXqw2FSEpzfKEbBllNa9fDNZpThJK9yXNCrrLq5zzvGKUM8oYZSCc7aLZ9mGyfPf+85uzTyen5yen56/PLl69/fjlmwrWWTFJimWaaT1NaImiJHc6SkdWBUG0XQxIkj4+LabzRRxh34W+CwPPCn0Uh8jwAkApTTYpWSeBhxAcQKNvGTp2oGPpt/EIZGWV87riHNtQ7QiWoQUeCjyEHeh5NiBbOiMp3dPAQ1pXdtHgCMe2h4xRFIA03S6WJM8Lzzal9o0oNHqqNPQdOOiNR0NQMs4YP8IdqEgtVRa6qhhi23cMP4wAycrpJp8me8vQfl5+bVx977RvfBdix4jHEUh3+znZLEjiIkOWWlpXDvGxGjI1H7ugelZZFg4yuqrkIvOluQP1YDgEsxV5WqzmixUc9BrXP34rbRvqo9DFjnkbj8FkRpYkIevEtgZC89roq8fFjonM/jE+HA51fbzFtQ1ZbCqdVrPxq6uKuqY83MWgfhbnHJla4+qy3bxWpKaLBjbU4j/R/3gchZapY9e+vxvH4ygK/cnfx3+uJOPtVL9joAAAAABJRU5ErkJggg==" "187" "354" >}}

If you do it on a regular link, you should get the following Right-Click menu.

{{< caption-new "/uploads/2012/02/021312_2000_FixOpeninNe2.png" "Open in New Tab"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABIUlEQVR4nF3Mu0vDQACA8f6bbo4OzroIgoNrRSoURNCKj70oNj0Sz7yvd8nlHds0WFoQweZR1FZbc6JLaucf31eZfU/92O334tFw8NQP8uTlazr5/Mjns3z6PqkwVswXC8YYsaL1zerW7snO/sX2XmNto3p2zVUYY0VRMMaGo+f68VWtfn5QOz08atTql4pq/DL747dJqkmA55p8u+lbKAqMQb9b1mnySpBqYI1i3XcpJXovDErO0jFBimUgx+x4NnFpJ+qGJefZWJPvZZFXRMGhHc/C/zhLx1iXsa6YWHMotg29G/pLnCUiBIC7bbdukCpSooWeuzxPJAgeBAB5DvJtx0SrcwkCAdxBnlNEwTZX5mmiqxIUgEnQY+DaFMdR7wdNizGapDg+7QAAAABJRU5ErkJggg==" "197" "244" >}}

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

{{< caption-new "/uploads/2012/02/021312_2000_FixOpeninNe3.png" "Result: Open in New Tab"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA3klEQVR4nAXB30+CQAAA4Pv/H1pra2u9tJVr9VBPral1AXEFenKwK0P51YEwTTY14uTuSun7AFuJRv21+x0X6rP8WdfyyfQ6172rG9iHNhhHufbi2UNKJ2z1XfNGmObg5PS8c3l713sG9D08ODo7PL7QDHsrlfrdzVjoYpQElHoOmM8LF6Pgw8myZFPVbdsm0RQZ8M3DhDggLwoL6e7IDqZ+1Siu9lHga49dd2QRQsAsz3TYtZAex5OKbyve+GMK+/eDVwPjIUiz1NAesI0ylgiphJTl8iuOwnK5YCz9ByNLr+udhfZoAAAAAElFTkSuQmCC" "350" "257" >}}