---
title: Tiles display templates added to the SPCSR repo
author: Elio Struyf
type: post
date: 2015-08-04T19:14:45+00:00
slug: /tiles-display-templates-added-to-the-spcsr-repo/
dsq_thread_id:
  - 4003227780
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

Right before my vacation I released new display templates in the SPCSR GitHub repository. These display templates can be used to visualize results as tiles. The tiles are build the same way the promoted links web part.

{{< caption-new "/uploads/2015/07/tiles.png" "Search tiles"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAhklEQVR4nAF7AIT/ANLr+//P6vz/0ODs/9Hh6//O3ur/0uDr/87b5P/T4ev/y+Hx/9jm8P8AHEly/ww1XP8RU4z/Fk1+/wgxWP8bVov/BCZI/x1DZ/8ABhf/Slpq/wBxgIr/YnF7/2qFmP9rg5T/Ymtx/2l7if9jcn7/boCN/1xue/+LmqX/hLtNw8okD40AAAAASUVORK5CYII=" "823" "214" >}}

{{< caption-new "/uploads/2015/07/tile-hover.png" "Search tile hover effect"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAhklEQVR4nAF7AIT/AM3n+f/N5/v/zNzp/87e6v/K2+j/z97q/8rX4v/P3Ob/z9fd/9fc4P8AFkBq/xE2Xf8NTYn/Gk1+/wUrUv8bU4f/BCRH/x07Wv8BCRD/Sk5U/wBygIr/aneA/22GmP9zh5j/ZW50/25/jP9pd4L/coKO/1lreP+LmqT/Q41NITkJdjsAAAAASUVORK5CYII=" "821" "206" >}}

The display template has the following configurable managed properties:

*   Path (mapped to: Path)
*   Title (mapped to: Title)
*   Picture (mapped to: PublishingImage)
*   Description (no mapping yet, you can choose which managed property you want to link).

These display templates can be found here: [tiles display templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Tiles%20templates).