---
title: Layout Difference Between a Dutch and an English SharePoint Site
author: Elio Struyf
type: post
date: 2011-08-26T13:13:08+00:00
slug: /layout-difference-between-a-dutch-and-an-english-sharepoint-site/
dsq_thread_id:
  - 3932994307
categories:
  - SharePoint
  - Styling
tags:
  - Social
  - Styling
comments: true
---

Yesterday I worked on a Dutch SharePoint 2010 site, and noticed a layout difference between a Dutch (1043) and an English (1033) site.

{{< caption-new "/uploads/2011/08/082511_0937_LayoutDiffe1.png" "Height difference between a Dutch and an English site." >}}

As you can see there is a height difference (**s4-titlerow**) between the two sites.

I examined the CSS to see which attributes were causing this height difference. I discovered that the height attribute for Social Buttons in the Dutch Site is different than the attribute on the English site.

In the English (1033) corev4.css version the Social Buttons got the following CSS height and width:


```css
.ms-socialNotif-Container {
  width: 120px;
}
.ms-socialNotif {
  height: 60px;
}
```


In the Dutch (1043) corev4.css file, the Social Buttons got the following attribute values:


```css
.ms-socialNotif-Container {
  width: 140px;
}
.ms-socialNotif {
  height: 80px;
}
```


A small change to the **.ms-socialNotif** height attribute of the Dutch version to 60px, would give you the same result as on the English site.


```css

.ms-socialNotif {
  height: 60px;
}
```


{{< caption-new "/uploads/2011/08/082511_0937_LayoutDiffe2.png" "Height attribute changed to 60px." >}}