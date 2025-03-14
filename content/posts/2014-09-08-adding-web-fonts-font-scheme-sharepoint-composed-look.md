---
title: Adding your web fonts to a font scheme in SharePoint (composed look)
author: Elio Struyf
type: post
date: 2014-09-08T12:25:17+00:00
slug: /adding-web-fonts-font-scheme-sharepoint-composed-look/
dsq_thread_id:
  - 3836548374
categories:
  - Office 365
  - SharePoint 2013
  - Styling
tags:
  - Composed Looks
  - Font Scheme
  - Fonts
  - Styling
  - Web Font
comments: true
---

Back in August 2012 I wrote a post about how you could create your own font scheme for SharePoint 2013 (you can find the post [here](https://www.eliostruyf.com/creating-a-new-font-scheme-for-sharepoint-2013-composed-look/)). In the post I included an example font scheme with the required elements. One thing I did not cover in that post was how you could add your own custom web fonts into your font scheme.

In this post I will cover how you could add your own web fonts to a font scheme.

> **Important**: this approach only works if you own the web font files (eot, woff, ttf, svg). This approach will not work with Google fonts.

When you go to the page to change the **change the look** page, you have the following default font schemes available.

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw1.png" "Default font schemes"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAfCAIAAABRS8vCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABvUlEQVR4nG2SXY+iMBSG+ffezP6kzWavTAyJ7lhZQesirR0oS7+goUIpmxFFxuW9aNo+yfl6j4cQ8n1/u91GUbTZbNbrdRAE1tr+Jk8phRBKkuRyuXDOKaV5nj+xlDLc789xUpVV3/fOuQHc8fThHupHzFgRhiGEcAuAEOIlgMc5C3a7YBf8en8vq9f4XlVVJwgxuuhKz+Tuum78mt4HeZRSAMDQ9PF4BAD4vm+MuWOtdfYpyjk3xnDOhRBjDK8sVRSGSYK0nsvdP+Sc6x7qR8wYQwhhjPM8xxhnWVYUxRNfr1dKqZSy6zpr7RCjH7ExJk3TYV7/yxuGbK1t23Y427Z9YqXU6XSCEGKMCSFRFEEIm6a547quGWNCCHZT27ZT07ymaYQQSikpJWNsWlc/VG6Mud40U5rv+4vF4tvb23K5nJlaWZbJ+YwRrmYNres6jv+kH5mp7y71U2ytHWx2zg2tf9kWpRQhJI5jQgillBDCOX9irfXhcJx+vTaWZVl1W8IZ3N8SuceivTpW/KWr1WoLwBGewjDcB+D7j58FY0OTnlLyd7CLwoMUn5brqpJSjQE++04/Usa4MTND/QcncHcsakPGtgAAAABJRU5ErkJggg==" "165" "511" >}}

SharePoint already uses a couple of custom web fonts. Like for example: Typewriter, Century Gothic, Rockwell, ...

## Creating a font scheme with custom web fonts

The font scheme can be created from the font scheme provided in [this post](https://www.eliostruyf.com/creating-a-new-font-scheme-for-sharepoint-2013-composed-look/). You will need to include some extra attributes for making it work with your web fonts.

To start, you first upload your font files to a library on the site. I place them in the master page gallery in a folder named **fonts**. The following files are necessary:

*   EOT
*   WOFF
*   TTF
*   SVG
*   Small img src (75x10 pixels)
*   Large img src (109x16 pixels)

The small and large images are just screenshots of what the font looks like. SharePoint uses it to visualize your font scheme in the dropdown on the **change the look** page. These two images are not really required, if you do not provide them, it just renders as text with the font-family styling applied on it. That means if the font is not available on the device, you would not see the correct font output.

Here is how SharePoint does it for the default font schemes:

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw2.png" "Font large image"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/ANnn+7fS977U9bzT9b7V9bTV+rjX+r/f/77e/73e/4uyGa0ulc9FAAAAAElFTkSuQmCC" "723" "50" >}}

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw3.png" "Font with no images in place (font-family is used)"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOPt/JrH+6HI96DH96PJ96LH9qLJ95rI+5PE+5LE+3hjGAsgBvRRAAAAAElFTkSuQmCC" "505" "63" >}}

As you can see, the difference between the first and the second is that Typewriter is a custom web font with a small and large image applied on it, so it uses the image file to visualise it in the list. In the second one, you can see that there the font-family style is set to Georgia.

But why two images?

*   The large version is used for preview slot one (top);
*   The small version is used for preview slot two (bottom).

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw4.png" "Preview slots 1 (top - large image) and 2 (bottom - small image)"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAP0lEQVR4nEXJQQrAMAgEwPz/n+KuIFHQ9NBDCylt5zojM1VVREgCMDN3v16juwGQnHNW1bn9vdZhW0RU1RdP327sVfdxUSJgAAAAAElFTkSuQmCC" "166" "51" >}}

The next step is to add the file references in the font scheme, they need to be added with the following properties:

*   eotsrc
*   woffsrc
*   ttfsrc
*   svgsrc
*   largeimgsrc (**required** - value can be empty)
*   smallimgsrc (**required** - value can be empty)

The file references need to be added only in the **s:latin** element. In that **s:latin** element, you also need to change the **typeface** attribute to with the value that needs to be used for the web font. In my example this is **bonvenocflight**.

> **Note**: you will need to add the absolute path to the files, you cannot use URL tokens in the font scheme.

Here are two examples:

```xml
<?xml version="1.0" encoding="utf-8"?>
<s:fontScheme name="EStruyf" previewSlot1="title" previewSlot2="body" xmlns:s="http://schemas.microsoft.com/sharepoint/">
  <s:fontSlots>
    <s:fontSlot name="title">
      <s:latin typeface="bonvenocflight" eotsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.eot" woffsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.woff" ttfsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.ttf" svgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.svg" largeimgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.png" smallimgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont-small.png"/>
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
      <s:latin typeface="Verdana"/>
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

This gives the following output in the dropdown:

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw5.png" "Font scheme with custom web font"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVUlEQVR4nE3MSQrAIAxAUe9/SIdFNVgRHEuimELp9LcPvkBEIhpjEOK4Wmvxk2ithRBqrTmlGKP3+5zz45IzOGc3CwCI+MLNtWSttNFGStX7wcy/N58Y/nOqm50SFQAAAABJRU5ErkJggg==" "149" "65" >}}

Here is an example with preview slot 1 and 2 set:

```xml
<?xml version="1.0" encoding="utf-8"?>
<s:fontScheme name="EStruyf" previewSlot1="title" previewSlot2="body" xmlns:s="http://schemas.microsoft.com/sharepoint/">
  <s:fontSlots>
    <s:fontSlot name="title">
      <s:latin typeface="bonvenocflight" eotsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.eot" woffsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.woff" ttfsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.ttf" svgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.svg" largeimgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.png" smallimgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont-small.png"/>
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
      <s:latin typeface="bonvenocflight" eotsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.eot" woffsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.woff" ttfsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.ttf" svgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.svg" largeimgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont.png" smallimgsrc="http://your-site-url/_catalogs/masterpage/fonts/BonvenoCF-Light-webfont-small.png"/>
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

This gives the following output in the dropdown:

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw6.png" "Font scheme with custom web fonts"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAS0lEQVR4nE3MywrAMAhE0fz/pyaIEIiOVpNC09ddzObAFDM7rtx975xzPZUxRq21987MRNRai4iPVSEiqioimfnCzQDMzN0B/G83n04mdUpvhm11AAAAAElFTkSuQmCC" "149" "64" >}}

If you leave the image references blank, it renders with the font-family style property instead of the image:

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw7.png" "Preview slot where the large and small image attribute have an empty value"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZklEQVR4nC3LSw6DMAxF0ex/V3RQJAhqOirzwgbqyJ/XOEYIzvBKN+H2P7UGgIgMEJaISPv2nefps65LzuVVSnmP43MYHjkvPSKZWaXKLD8iVW3u7o2ouvt5A2BmETHVK1167xFxAPmEcLw1oRmhAAAAAElFTkSuQmCC" "143" "58" >}}

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw8.png" "Rendering when no image reference is set"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJklEQVR4nGN48vbPrBO/Fp74tujEt4Unvi8Gk7NP/p554tf0E38AeMUYHx8fPckAAAAASUVORK5CYII=" "515" "63" >}}

## Activating the composed look

Once you select the new font scheme, the preview image should render with the font scheme in place:

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw9.png" "Preview with custom web font"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAs0lEQVR4nE3LvYsCQQwF8P3/7W1WsBZbWxtBsTmuuV78xlk8ZpNJJuNMMrKoYHjN4/fSjFfH0XI/WZ/a9andnKfb83R7mf1cPUBkbua/bvHX1RJLedSvyzmXUhoCn4SRCDAAIBITR0nD1MwawEAs/z1CCBgw9IgeYpQ312pSbOfw4NwNOumc7G/Y88D64qx3IOREqSALsEjWr++sdxSIOYh6fnhKMdubVdVsKLXaJy8yVX0CCAfi6XEkEQwAAAAASUVORK5CYII=" "701" "532" >}}

When the composed look is applied, the site should render with the font scheme in place.

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw10.png" "Site with custom web font applied"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZElEQVR4nDXJMQ4CMQxE0VyTu9FxGc5ARbEFiGKlxOtMMmMHAeIVv/nlfH2eLrf7q2kOKTJzrUVSEsny2Nu2ux1u1sYYJCenviKioPvKNLNa6/GHDgCSiiIyFwCzz/jV3TsQEW9e2nKNOldeiQAAAABJRU5ErkJggg==" "958" "358" >}}

In the themed version of the corev15.css file, you will find the following web font references:

{{< caption-new "/uploads/2014/09/090814_1225_Addingyourw11.png" "Web font references in the corev15 css file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAP0lEQVR4nBXCSw6AMAgFwN7/nH6gxagUXsG6ME6myCUbn6oZMYE5xh94zDPzLbfGsiqx7WTMVpsTmzSXA73nB+QtOKs6AjZUAAAAAElFTkSuQmCC" "827" "160" >}}

In the next post I talk about how you could achieve it for Google web fonts.