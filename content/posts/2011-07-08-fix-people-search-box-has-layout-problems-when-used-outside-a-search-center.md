---
title: 'Fix: People Search Box Has Layout Problems When Used Outside a Search Center'
author: Elio Struyf
type: post
date: 2011-07-08T14:34:30+00:00
slug: /fix-people-search-box-has-layout-problems-when-used-outside-a-search-center/
dsq_thread_id:
  - 3836445076
categories:
  - Branding
  - SharePoint
tags:
  - Search
  - Search Center
  - Searchbox
  - v4.master
  - Web Part
comments: true
---

A colleague discovered a layout problem when he was using the **People Search Box Web Part** outside a SharePoint Search Center.

When you add the **People Search Box Web Part** to your page, the layout looks fine.

{{< caption-new "/uploads/2011/07/070811_1434_FixPeopleSe1.png" "People Search Box"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXklEQVR4nDWKSQ4CMQwE8/9fwgUkQrs9SyaL7aCAqFOXutJTrxvKQ+vraHdcWx1zhsf8kcxjWJiFedTuR/PSffz/tO8bKSIQEZKq/KpAcJaSSOac83sBrAhYW1Vb7x/0rnKbbdtYKgAAAABJRU5ErkJggg==" "452" "166" >}}

The problem arises when you click on the **Search Options** link.

{{< caption-new "/uploads/2011/07/070811_1434_FixPeopleSe2.png" "People Search Box Layout Problem"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXklEQVR4nE3BQQ6FIAwFQO5/STc/Fo2ABNu0r1hNXP2ZRKcsW18bH0N/TYb6jLjveD6p1XLsuzA7ADNRH+JqHp9ERCvlfnYooHDDhPN15S0zc6q1llJUdf4xMwAR8QLM7HM3/F5lWAAAAABJRU5ErkJggg==" "454" "186" >}}

As you can see, the property box is shown with a transparent background and the labels are almost unreadable.

## Solution

To solve this problem, you could add the following CSS styles to your custom stylesheet or inside the master page itself.


```css
.psrch-OptionsContainer {
  font-size: 8pt;
  height: 130px;
  margin-top: 20px;
  width: 355px;
}
```


## Result

{{< caption-new "/uploads/2011/07/070811_1434_FixPeopleSe3.png" "People Search Box With CSS Fix"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVR4nD3IWQ4CIRAAUe5/TCUEBxzAAbrpDWM0Vt5XudDQVwwV07VuBepkM1P75cYYtTQAFBZc1JFfQEisKntvV87yzKewMLGKqoiJmlpr7erdxRDTIyHgwkWLvngxzM9yOWV/90c8Zp9/4xqEtG2/AbFHkCX86MAzAAAAAElFTkSuQmCC" "446" "214" >}}