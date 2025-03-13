---
title: Offset classes are coming to Office UI Fabric
author: Elio Struyf
type: post
date: 2016-01-28T10:38:35+00:00
slug: /offset-classes-coming-office-ui-fabric/
dsq_thread_id:
  - 4530315809
categories:
  - Office
  - UI Fabric
tags:
  - Add-in
  - Office
  - Styling
  - UI Fabric
comments: true
---

A week ago I submitted a pull request to the Office UI Fabric repository to include a new set of offset classes. These offset classes could come in handy when you want to position your elements on the page.

> **Info**: here you can see the details of the pull request - [https://github.com/OfficeDev/Office-UI-Fabric/pull/280](https://github.com/OfficeDev/Office-UI-Fabric/pull/280)

Today the pull request got merged into the master branch. That means that in the upcoming release you will be able to make use of these new classes.

## What does these offset classes do?

The offset classes allow you to move elements / columns to the right.

{{< caption-new "/uploads/2016/01/012816_1022_Offsetclass1.png" "Offset classes example" >}}

Here is a Codepen example for you to fiddle around with:

<script src="//assets.codepen.io/assets/embed/ei.js" async=""></script>

<p class="codepen" data-height="268" data-theme-id="21952" data-slug-hash="VexrVx" data-default-tab="result" data-user="estruyf">
  See the Pen <a href="http://codepen.io/estruyf/pen/VexrVx/">VexrVx</a> by Elio (<a href="http://codepen.io/estruyf">@estruyf</a>) on <a href="http://codepen.io">CodePen</a>.
</p>

## Which classes are available?

You have classes available for: small, medium, large, XL, XXL, and XXXL.

*   .ms-u-*Offset0 - offset reset class
*   .ms-u-*Offset1 - move one column
*   .ms-u-*Offset2 - move two columns
*   .ms-u-*Offset3
*   .ms-u-*Offset4
*   .ms-u-*Offset5
*   .ms-u-*Offset6
*   .ms-u-*Offset7
*   .ms-u-*Offset8
*   .ms-u-*Offset9
*   .ms-u-*Offset10
*   .ms-u-*Offset11
> **Important**: change the asterisk "*" by one of the device sizes: sm, md, lg, xl, xxl, or xxxl.

## Update

Office UI Fabric announced yesterday the these classes are available in version 2.

{{< caption-new "/uploads/2016/01/snip_20160208075249.png" "Office UI Fabric tweet" >}}