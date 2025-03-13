---
title: Creating a New Color Palette for a SharePoint 2013 Composed Look
author: Elio Struyf
type: post
date: 2012-08-03T18:02:49+00:00
excerpt: One of the new functionalities in SharePoint 2013 is that themes are split up in multiple files. Read here how you can create new color palettes for your SharePoint site.
slug: /creating-a-new-color-palette-for-a-sharepoint-2013-composed-look/
dsq_thread_id:
  - 3836444893
categories:
  - SharePoint 2013
  - Styling
tags:
  - Color Palettes
  - Composed Looks
  - Styling
  - Themes
comments: true
---

One of the new functionalities in SharePoint 2013 is that themes are split up in multiple files.

1.  Color Palette files;
2.  Font Scheme files.
When you want to create a new color palette in SharePoint 2013, you can start by going to **Site Settings** > **Themes**. In the theme gallery click on a color palette (ex.: palette005.spcolor) and download it to your desktop.

Open the downloaded file in your favorite text editor, and you will see that this is a normal XML file. All the elements for which the colors could be changed are in this file. This is a major improvement compared to SharePoint 2010 where you could only set the major and accent colors. All the other colors were calculated/rendered by SharePoint itself.

Now you can define your own color values in HEX for each element.


```xml
<s:color name="NavigationHoverBackground" value="CBEF00" />
<s:color name="NavigationSelectedBackground" value="CBEF00" />
```


{{< caption-new "/uploads/2012/08/withoutTransparency.png" "Without Transparency" >}}

**But this is not all**. SharePoint 2013 also works with RGBA (red, green, blue, alpha transparency) background colors, and they can be defined like this:


```xml
<s:color name="NavigationHoverBackground" value="20CBEF00" />
<s:color name="NavigationSelectedBackground" value="20CBEF00" />
```


{{< caption-new "/uploads/2012/08/withTransparency.png" "With Transparency" >}}

As you can see the HEX values now contain 8 digits instead of 6. The first two will be used for the transparency value and the 6 other digits will define the color.

For example:
<div>
<table style="width: 100%; border-spacing: 10px; border-collapse:inherit;" border="0">
<tbody valign="top">
<tr>
<td>**Value**</td>
<td>**Transparency**</td>
<td>**Color**</td>
<td>**RGBA**</td>
</tr>
<tr>
<td>00CBEF00</td>
<td>00</td>
<td>CBEF00</td>
<td>rgba(203, 239, 0, 0.00)</td>
</tr>
<tr>
<td>20CBEF00</td>
<td>20</td>
<td>CBEF00</td>
<td>rgba(203, 239, 0, 0.13)</td>
</tr>
<tr>
<td>EECBEF00</td>
<td>EE</td>
<td>CBEF00</td>
<td>rgba(203, 239, 0, 0.93)</td>
</tr>
<tr>
<td>FFCBEF00</td>
<td>FF</td>
<td>CBEF00</td>
<td>CBEF00</td>
</tr>
</tbody>
</table>
</div>

## Transparency Calculation

[Here](http://kilianvalkhof.com/2010/css-xhtml/how-to-use-rgba-in-ie/) you could find a converter to calculate the correct RGBA value.

## Adding the Palette to SharePoint

When your color palette is finished, you can upload it to the Theme Gallery and use it in a composed look.