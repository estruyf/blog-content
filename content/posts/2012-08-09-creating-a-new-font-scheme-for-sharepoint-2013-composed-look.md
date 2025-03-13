---
title: Creating a New Font Scheme for SharePoint 2013 Composed Look
author: Elio Struyf
type: post
date: 2012-08-09T19:27:06+00:00
excerpt: In my previous post I described how you could create a new color palette for SharePoint 2013. In this post I will describe how you could easily change the font scheme of your website by creating your own font scheme file.
slug: /creating-a-new-font-scheme-for-sharepoint-2013-composed-look/
dsq_thread_id:
  - 3836445534
categories:
  - SharePoint 2013
  - Styling
tags:
  - Composed Looks
  - Font Scheme
  - Fonts
  - Styling
comments: true
---

In my [previous post](https://www.eliostruyf.com/creating-a-new-color-palette-for-a-sharepoint-2013-composed-look/ "Creating a New Color Palette for a SharePoint 2013 Composed Look") I described how you could create a new color palette for SharePoint 2013. In this post I will describe how you could easily change the font scheme of your website by creating your own font scheme file.

The first thing you need to do is download an existing font scheme from the theme gallery (**Site Settings** > **Themes**). In the **15 folder** you will find four different font schemes:

*   <div>fontscheme001.spfont;</div>

    *   Bodoni Book;
    *   Segoe UI;

*   <div>fontscheme002.spfont;</div>

    *   Georgia;
    *   Segoe UI;

*   <div>fontscheme003.spfont;</div>

    *   Rockwell Light;
    *   Segoe UI;

*   <div>SharePointPersonality.spfont (**standard font scheme**);</div>

    *   Segoe UI Light;
    *   Segoe UI.
Download one of these files, and open it in your favorite text editor. All the elements for which the fonts can be defined are in this file. Each element has the following XML structure:


```xml
<s:fontSlot name="title">
  <s:latin typeface="Rockwell Light" eotsrc="/_layouts/15/fonts/RockwellLight.eot" woffsrc="/_layouts/15/fonts/RockwellLight.woff" ttfsrc="/_layouts/15/fonts/RockwellLight.ttf" svgsrc="/_layouts/15/fonts/RockwellLight.svg" largeimgsrc="/_layouts/15/fonts/RockwellLightLarge.png" smallimgsrc="/_layouts/15/fonts/RockwellLightSmall.png" />
  <s:ea typeface="" />
  <s:cs typeface="Segoe UI Light" />
  <s:font script="Arab" typeface="Segoe UI Light" />
  <s:font script="Deva" typeface="Nirmala UI" />
  <s:font script="Grek" typeface="Segoe UI Light" />
  <s:font script="Hang" typeface="Malgun Gothic" />
  <s:font script="Hans" typeface="Microsoft YaHei UI" />
  <s:font script="Hant" typeface="Microsoft JhengHei UI" />
  <s:font script="Hebr" typeface="Tahoma" />
  <s:font script="Hira" typeface="Meiryo UI" />
  <s:font script="Thai" typeface="Tahoma" />
  <s:font script="Armn" typeface="Segoe UI Light" />
  <s:font script="Beng" typeface="Nirmala UI" />
  <s:font script="Cher" typeface="Gadugi" />
  <s:font script="Ethi" typeface="Ebrima" />
  <s:font script="Geor" typeface="Segoe UI Light" />
  <s:font script="Gujr" typeface="Nirmala UI" />
  <s:font script="Guru" typeface="Nirmala UI" />
  <s:font script="Knda" typeface="Nirmala UI" />
  <s:font script="Khmr" typeface="Khmer UI" />
  <s:font script="Laoo" typeface="Lao UI" />
  <s:font script="Mlym" typeface="Nirmala UI" />
  <s:font script="Mymr" typeface="Myanmar Text" />
  <s:font script="Orya" typeface="Nirmala UI" />
  <s:font script="Sinh" typeface="Nirmala UI" />
  <s:font script="Syrc" typeface="Estrangelo Edessa" />
  <s:font script="Taml" typeface="Nirmala UI" />
  <s:font script="Telu" typeface="Nirmala UI" />
  <s:font script="Thaa" typeface="MV Boli" />
  <s:font script="Tibt" typeface="Microsoft Himalaya" />
  <s:font script="Yiii" typeface="Microsoft Yi Baiti" />
</s:fontSlot>
```


As you can see, you could define fonts for different languages, but you do not need to define all of them. For me the most important is the Latin one. The rest can be removed, so you end up with this:


```xml
<s:fontSlot name="title">
  <s:latin typeface="Rockwell Light" eotsrc="/_layouts/15/fonts/RockwellLight.eot" woffsrc="/_layouts/15/fonts/RockwellLight.woff" ttfsrc="/_layouts/15/fonts/RockwellLight.ttf" svgsrc="/_layouts/15/fonts/RockwellLight.svg" largeimgsrc="/_layouts/15/fonts/RockwellLightLarge.png" smallimgsrc="/_layouts/15/fonts/RockwellLightSmall.png" />
  <s:ea typeface="" />
  <s:cs typeface="Segoe UI Light" />
</s:fontSlot>
```


The **s:ea** (EastAsianFont) and **s:cs** (ComplexScriptFont) elements cannot be removed, otherwise the composed looks page cannot be loaded.

## Changing the fonts

What I want to achieve is that all the elements use Verdana as font.

This is what my font file looks like:


```xml
<?xml version="1.0" encoding="utf-8"?>
<s:fontScheme name="Xylos" previewSlot1="title" previewSlot2="body" xmlns:s="http://schemas.microsoft.com/sharepoint/">
  <s:fontSlots>
    <s:fontSlot name="title">
      <s:latin typeface="Verdana" />
      <s:ea typeface="" />
      <s:cs typeface="Verdana" />
    </s:fontSlot>
    <s:fontSlot name="navigation">
      <s:latin typeface="Verdana" />
      <s:ea typeface="" />
      <s:cs typeface="Verdana" />
    </s:fontSlot>
    <s:fontSlot name="small-heading">
      <s:latin typeface="Verdana" />
      <s:ea typeface="" />
      <s:cs typeface="Verdana" />
    </s:fontSlot>
    <s:fontSlot name="heading">
      <s:latin typeface="Verdana" />
      <s:ea typeface="" />
      <s:cs typeface="Verdana" />
    </s:fontSlot>
    <s:fontSlot name="large-heading">
      <s:latin typeface="Verdana" />
      <s:ea typeface="" />
      <s:cs typeface="Verdana" />
    </s:fontSlot>
    <s:fontSlot name="body">
      <s:latin typeface="Verdana" />
      <s:ea typeface="" />
      <s:cs typeface="Verdana" />
    </s:fontSlot>
    <s:fontSlot name="large-body">
      <s:latin typeface="Verdana" />
      <s:ea typeface="" />
      <s:cs typeface="Verdana" />
    </s:fontSlot>
  </s:fontSlots>
</s:fontScheme>
```


Upload your file to the Theme Gallery (**Site Settings** > **Themes**), and you will be able to use your new font scheme in the composed looks.

On the Change the look page (**Site Settings** > **Change the look**) you will now be able to select the Verdana font in the Fonts menu.

{{< caption-new "/uploads/2012/08/080912_1826_CreatingaNe1.png" "Selecting your font scheme" >}}