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

{{< caption-legacy "uploads/2011/07/070811_1434_FixPeopleSe1.png" "People Search Box" >}}

The problem arises when you click on the **Search Options** link.

{{< caption-legacy "uploads/2011/07/070811_1434_FixPeopleSe2.png" "People Search Box Layout Problem" >}}

As you can see, the property box is shown with a transparent background and the labels are almost unreadable.

## Solution

To solve this problem, you could add the following CSS styles to your custom stylesheet or inside the master page itself.


{{< highlight css "linenos=table,noclasses=false" >}}
.psrch-OptionsContainer {
  font-size: 8pt;
  height: 130px;
  margin-top: 20px;
  width: 355px;
}
{{< / highlight >}}


## Result

{{< caption-legacy "uploads/2011/07/070811_1434_FixPeopleSe3.png" "People Search Box With CSS Fix" >}}