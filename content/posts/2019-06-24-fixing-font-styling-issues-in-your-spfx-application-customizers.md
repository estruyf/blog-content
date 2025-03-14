---
title: Fixing font styling issues in your SPFx application customizers
author: Elio Struyf
type: post
date: 2019-06-24T14:11:11.000Z
slug: /fixing-font-styling-issues-in-your-spfx-application-customizers/
categories:
  - Development
  - SharePoint
tags:
  - Application Customizer
  - SPFx
  - SharePoint Framework
  - Styling
comments: true
---

This will be a quick tip about a styling issue with the application customizers. If you are building application customizers that render something in the available top or bottom zones. It is recommended to add your own font styles. This might sound weird, but when you don't do this, you might end up with styling differences between your pages.

Here is an example of loading a sample application customizer on a modern page and in a list view:

{{< caption-new "/uploads/2019/06/text-size.gif" "Font size differences between pages" >}}

The text on the list view is a bit bigger. The reason for this font size difference is that the body element on a modern page contains the **ms-font-m** class. This automatically sets the font size to 14px and font weight to 400.

{{< caption-new "/uploads/2019/06/Screenshot-2019-06-21-11.05.45.png" "ms-font-m class on body"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAR0lEQVR4nGXDUQqAIBBAQa9i1KIWsmSlJlJ9dP8jvQ7QwJh6veT+MEdldAEr/ncQj5HUWcpN3Btha0yaES249cSlhmjFxoMP00UeyGwm/JwAAAAASUVORK5CYII=" "792" "121" >}}

On all other pages, this class is not present and due to that differences will occur.

{{< caption-new "/uploads/2019/06/Screenshot-2019-06-21-11.05.23.png" "No ms-font-m class present"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAALElEQVR4nB3DwQkAIAwEQRtKAt750WD/Xa3gwAz3ZfdhWdj+JTFlqorMJCJ4QTwP+vN7AFcAAAAASUVORK5CYII=" "925" "121" >}}

An easy fix would be to add the **ms-font-m** class on the root element from your application customizer.
