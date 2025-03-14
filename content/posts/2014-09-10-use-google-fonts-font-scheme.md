---
title: "How to use Google Fonts in your font scheme"
author: "Elio Struyf"
type: "post"
date: "2014-09-10T11:58:48+00:00"
slug: "/use-google-fonts-font-scheme/"
dsq_thread_id:
  - 3836535641
categories:
  - "Office 365"
  - "SharePoint 2013"
  - "Styling"
tags:
  - "Composed Looks"
  - "Font Scheme"
  - "Fonts"
  - "Google Fonts"
  - "Styling"
  - "Web Font"
comments: true
preview: "/social/ef3a5e6d-2ac8-4323-8e20-1aa4b74811ab.png"
---

In the previous post I showed you how to create a font scheme with custom web fonts. Now a lot of people (even me) are using the fonts from the Google Fonts gallery. Google works a bit differently compared to SharePoint font schemes. Google provides a CSS reference which you need to add to your HTML.

```html
<link href='http://fonts.googleapis.com/css?family=Dosis' rel='stylesheet' type='text/css'>
```

When you navigate to the CSS file in your browser, you will see that Google served you the necessary web font depending on the user-agent.

```css
@font-face {
  font-family: "Dosis";
  font-style: normal;
  font-weight: 400;
  src: local("Dosis Regular"), local("Dosis-Regular"), url("http://fonts.gstatic.com/s/dosis/v4/xIAtSaglM8LZOYdGmG1JqQ.woff") format("woff");
}
```

That means that you do not have all the required web fonts for your font scheme. You also have the option to download the font files from the Google Fonts site, but this only serves you the TTF versions of the font, so you still miss the EOT, WOFF or SVG versions. There are ways to retrieve these missing font files, and this will be covered in this post.

## Using the Google Font CSS reference as is (first approach)

First create two image files for your Google font (large: 109x16 pixels - small: 75x10 pixels) that you want to use and upload it to a library on your site.

Create a new font scheme where you only add the references for the **largeimgsrc** and **smallimgsrc**. The **eotsrc**, **woffsrc**, **ttfsrc** and **svgsrc** should be left blank.

> **Note**: you could use the example font scheme provided in the previous post: [Adding your web fonts to a font scheme in SharePoint (composed look)](https://www.eliostruyf.com/adding-web-fonts-font-scheme-sharepoint-composed-look/).

&nbsp;

> **Note 2**: the **largeimgsrc** and **smallimgsrc** is only required if you want to show how the font output should look like in the dropdown.

The value to use in the **typeface** attribute can be found at the bottom of the Google fonts page:

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo1.png" "Font-family value is highlighted"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARUlEQVR4nDXLMQ7AIAxD0dz/hJyAASPiJFQMZKja0jd+yxIRHV0PUnVec//E3d/KZx2DpJnxMAn3BrBWLYVAA9Zamfm9b2jFVNUuNxDPAAAAAElFTkSuQmCC" "395" "132" >}}

```xml
<?xml version="1.0" encoding="utf-8"?>
<s:fontScheme name="EStruyf" previewSlot1="title" previewSlot2="body" xmlns:s="http://schemas.microsoft.com/sharepoint/">
  <s:fontSlots>
    <s:fontSlot name="title">
      <s:latin typeface="Dosis" eotsrc="" woffsrc="" ttfsrc="" svgsrc="" largeimgsrc="http://your-site-url/_catalogs/masterpage/fonts/DosisLarge.png" smallimgsrc="http://your-site-url/_catalogs/masterpage/fonts/DosisSmall.png"/>
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
      <s:latin typeface="Dosis" eotsrc="" woffsrc="" ttfsrc="" svgsrc="" largeimgsrc="http://your-site-url/_catalogs/masterpage/fonts/DosisLarge.png" smallimgsrc="http://your-site-url/_catalogs/masterpage/fonts/DosisSmall.png"/>
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

Once the font scheme is finished, upload it to the theme gallery (`http://site-url/_catalogs/theme/`). When you go to the **Change the look** page, the dropdown should contain your new font scheme:

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo2.png" "Google font used in a font scheme"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAN0lEQVR4nHXLsQ0AIAgFUfffUXqJ2mACAX9wAbz25RoAdweQVe2IEPXBXLOp7jW/940w1dIy8wGONXYyqVdt1AAAAABJRU5ErkJggg==" "164" "64" >}}

When the font scheme is applied on the site. The font references in the themed **corev15** CSS file would not contain a URL to a file:

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo3.png" "Themed corev15.css output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVR4nC3G2woAEAwAUP//qVjsgk22pNR5OAl6zQ1EdkS4P+f8uEeaugoQojIbsxE9iCpiY+wLBPY52kqpB9kAAAAASUVORK5CYII=" "643" "114" >}}

The next step is to add the Google font CSS reference to your site. You can do this by adding it to your master page or via a custom action. The master page option is probably the quickest way.

Here is the **[Seattle.html](/uploads/2014/09/master-google-font.html)** (right click - save as) file with a reference set to the Google Fonts CSS file. When this master page gets applied on your site, you should receive the following output:

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo4.png" "Site output after the CSS reference is added"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAd0lEQVR4nDXNQQ5CIQwEUM7o5Vx6G6/gwpULE6OE35YSpAzU8M1/y5lkJpyvr9Pl9vgIugHwZZo1AL338Ex6fxfiXIr+owW9A2OM4D7dnZm3bRMRPdRaAYS5+plSijESUd6pqoi09g37mZdSmDnnvGaIRISZzewH0HyOnoB7AVMAAAAASUVORK5CYII=" "962" "440" >}}

The major downside about this approach is that it requires a master page modification. This could give you some trouble with future service updates. That is why I would recommend the second approach.

## Download the missing web fonts (second approach - recommended)

Another way can be to download all the required web fonts from Google. As I said in the beginning of this post, you are only able to download the TTF version of the font. Which means that you still need the EOT, WOFF, and SVG versions of the font.

What you could do is:

*   Download the TTF package, upload it to [fontsquirrel](http://www.fontsquirrel.com/tools/webfont-generator) and let it generate the required font files;
*   Another way could be to download the fonts for the different user agents directly from Google. Of course this can be quite some work, because you need to retrieve it from different browsers (or manipulate the user agent in your browser). I created a small web page that does the job for you. It can be found on: [http://webfonts.azurewebsites.net](http://webfonts.azurewebsites.net).

On the web page you get the links to each font file and the CSS outputs for the different user agents (in case you need this - you can find the font-family value to use in the font scheme). I already included an example with the Oswald web font on the page:

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo5.png" "Download fonts web page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAApUlEQVR4nE3L2wqDMBAE0Pz/rxUKhT4rosbNZVM3RM3NpKhIex6GhZllQsotpJjyFrOPe8hlL6Xe2PTxz255j+urX57d8mhdb3ytpZwjJhUau6RS016PLDX/nitr21YIUFLAxIeh5+OolJxnstau68qapgEAIcR0AwCtNREdNQDMJyK6DmstIhKR954hov1zjYjIORdjZJxzRDQ3rTUiKqWMMSGEL+FX4axlutlOAAAAAElFTkSuQmCC" "771" "650" >}}

At the top of the page you have an input textbox where you can insert the **family** value that you receive from the Google fonts directory.

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo6.png" "Highlighted family value to be used on the web page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nB3CQQoAIQwDQP//TQnYQ5qgmPOyDjOqCgDJJPecu/f/STJsSyIpqdfqORsQ2ZLtD8xVOAHyC23SAAAAAElFTkSuQmCC" "893" "176" >}}

> **Note**: the value in the red square needs to be provided in the input box.

Once you inserted this, and pressed enter, it retrieves all the CSS files and serves you all the links to the font files. You can download the files by just clicking on them:

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo7.png" "Font links output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAY0lEQVR4nBXEQQ6CMBAF0N7/TG4lIk0sG1ZaSkkwAwHrtB+aKQvjWzxFy2dFCce5ocws9BViIS4zl5hP5dd86fj6jI3DzabqlWqb9ADjMQVR75DvPdpxNx7aQQ//Hx7ddBDLDwFoUalokO/HAAAAAElFTkSuQmCC" "780" "233" >}}

Once you have all the files downloaded (you can also use the links to the web font from the page), you can follow my previous post to know how to include it to your font scheme: [Adding your web fonts to a font scheme in SharePoint (composed look)](https://www.eliostruyf.com/adding-web-fonts-font-scheme-sharepoint-composed-look/).

> **Important**: you are able to use the link to the font file on Google, but I would recommend to download the files. The output looks like this when you use the Google font references:

{{< caption-new "/uploads/2014/09/091014_1158_HowtouseGoo8.png" "Themed corev15.css file with Google references"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAP0lEQVR4nAXBURKAIAgFQO9/ThP9qBCeKSIz7aZXnlxv5gUY1IA9xnYP9zgnkorlS0pRIm0VRFobmGfv65v+A+NQOMBQm8qDAAAAAElFTkSuQmCC" "706" "171" >}}