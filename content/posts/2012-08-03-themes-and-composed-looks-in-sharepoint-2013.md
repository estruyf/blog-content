---
title: Themes and Composed Looks in SharePoint 2013
author: Elio Struyf
type: post
date: 2012-08-03T16:58:36+00:00
excerpt: A lot has been changed in the new version of SharePoint when working with SharePoint themes. Read this post to see what the new SharePoint theming engine has to offer.
slug: /themes-and-composed-looks-in-sharepoint-2013/
dsq_thread_id:
  - 3836445491
categories:
  - SharePoint 2013
  - Styling
tags:
  - Color Palettes
  - Composed Looks
  - Styling
comments: true
---

A lot has been changed in the new version of SharePoint when working with SharePoint themes. One of the biggest changes is that it no longer works with Office themes.

In SharePoint 2013 they split up all the design elements, which makes it more powerful than in the previous versions. Right now you have two different things:

1.  Themes;
2.  Composed Looks.

## Themes

This is a library that contains the theme files (Site Settings -> Themes).

You have two different types of theme files:

1.  Color Palette file (.spcolor);
2.  Font Scheme file (.spfont).
These two types are stored in XML format, and they have their own file extension (spcolor - spfont). A couple of theme files are already available, but you can easily create your own theme files and upload them to the Theme gallery.

Here is an example of a Color Palette file:


```xml
<?xml version="1.0" encoding="utf-8"?>
<s:colorPalette isInverted="false" previewSlot1="BackgroundOverlay" previewSlot2="BodyText" previewSlot3="AccentText" xmlns:s="http://schemas.microsoft.com/sharepoint/">
  <s:color name="BodyText" value="444444" />
  <s:color name="SubtleBodyText" value="777777" />
  <s:color name="StrongBodyText" value="262626" />
  <s:color name="DisabledText" value="B1B1B1" />
  <s:color name="SiteTitle" value="262626" />
  <s:color name="WebPartHeading" value="444444" />
  <s:color name="ErrorText" value="A83238" />
  <s:color name="AccentText" value="0072C6" />
  ...
</s:colorPalette>
```


Here is an example of a Font Scheme file:


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


As you can see, themes are not the same anymore as in SharePoint 2010 were you could activate them. In SharePoint 2013 they created something new called the **Composed Looks**, which is a representation of a composed "theme".

## Composed Looks

Like I said in the beginning, you do not create themes in the Office client anymore. In SharePoint 2013 you need to compose your themes in SharePoint by creating a new composed look.

Creating a new composed look can be done under **Site Settings** -> **Composed looks**. When you create a new composed look you have the following options:

*   **Name**: the name of your composed look;
*   **Master page**: the master page that you want to use;
*   **Theme URL**: the URL to your color palette;
*   **Image URL**: the URL to your background image;
*   **Font Scheme URL**: the URL to your font scheme;
*   **Display Order**: this will be used to arrange your composed looks ordering.
For example:

{{< caption-new "/uploads/2012/08/080312_1451_ThemesandCo1.png" "Example of a composed look" >}}

With this new approach, you have a lot more flexibility. You can create multiple composed looks for your company that each use a different master page, color palette, background, or font palette.

From the moment you created a new composed look, it will be available under **Site Settings **-> **Change the look**.