---
title: Customizing the way SharePoint 2013 looks (SharePoint Conference – SPC12)
author: Elio Struyf
type: post
date: 2012-11-15T02:00:09+00:00
slug: /customizing-the-way-sharepoint-2013-looks-sharepoint-conference-spc12/
dsq_thread_id:
  - 3845866965
categories:
  - Branding
  - SharePoint 2013
  - SPC12
  - Styling
comments: true
---

In SharePoint 2013, it&#8217;s easier than ever for end-users to make a site feel like it&#8217;s their own. But how can developers and IT Pros get involved? Find out in this deep dive into the new & improved SharePoint theming platform where you’ll learn how to integrate with product stylesheets, build your own themes, and make your own themable master pages.

Lionel Robinson, Jonathan Kern gave this session.

## Summary

### A little history

Customizing SharePoint 2003 > all done with FrontPage

Customizing SharePoint 2007 > Full CSS replacement

Customizing SharePoint 2010 > totally architected – no more CSS replacement

Theming in SP2010 was simple, but very limited. Sites look always the same only colors were different.

Customizing SharePoint 2013 > new theming engine

### What’s new

  * Design gallery > is a sort of list view of the Composed Looks list.
  * Color palettes
  * Font schemes

Color palettes and font schemes can be found in the themes gallery (**Site Settings** > **Themes****)**.

You can use web fonts in your font schemes.

_What’s in a look?_

  * Color palette
  * Font scheme
  * Site layout
  * Background image

### Color Palettes – Color Slots

Simple XML format

89 Color Slots – color name = “BodyText” value=”hex-value”

Semantic names – BodyText, SuiteBarBackground, SelectionBackground

Opacity – Opacity is supported with 8-digit hexadecimal values

PreviewSlot 1 – 2 – 3 in your XML file define the colors if the theme is a light or dark theme.

<s:colorPalette isInverted=&#8221;false&#8221; previewSlot1=&#8221;BackgroundOverlay&#8221; previewSlot2=&#8221;BodyText&#8221; previewSlot3=&#8221;AccentText&#8221; xmlns:s=&#8221;http://schemas.microsoft.com/sharepoint/&#8221;>

You can check: <https://www.eliostruyf.com/creating-a-new-color-palette-for-a-sharepoint-2013-composed-look/>

### Font Schemes

Simple XML format

7 Font slots

Font per language script

Web fonts

You can check: <https://www.eliostruyf.com/creating-a-new-font-scheme-for-sharepoint-2013-composed-look/>

### Theme application

There will be an application made available to create new themes for your SharePoint 2013 site (ThemeSlots).

### Making a themable master pages

  1. Create a copy of a existing master page
  2. Create a language folder in the Style Library (en-US)
  3. Create a “Themable” folder in the language folder you created
  4. In the themable folder you can create your CSS files
  5. Go to the master page, and add your custom HTML 
      1. You can now use a new control: Sharepoint:ThemeForegroundImage – ThemeKey=”VegasFooter”
      2. Open your corresponding preview file and add the section you created in the master page 
          1. Use classes instead of IDs in the preview files otherwise you could have collisions.
          2. Create your styles in the CSS file you created 
              1. Themable CSS properties can be modified as in SP2010 by adding comments in front of the properties
              2. The re-color image has been updated 
                  1. Detach = tells the engine that it doesn’t need to worry about the image, just always create a new image version
                  2. hashOverride: this can override the foreground image you created in with the new control (ThemeForegroundImage)
  6. Add your CSS to the preview file

_Note_: When adding CSS to your preview file, you need to prefix the classes with the [ID] tag.

### Tips & Gotchas

Theming snapshots from CSS

  * Any updates to CSS requires retheming
  * Can use UI or code (sptheme.enforceThemedStylesForWeb(SPWeb))

.preview files are important

Themed file location can vary

  * Depending on SKU

Inheritance

  * Theme settings can be inherited and pushed down when publishing is turned on