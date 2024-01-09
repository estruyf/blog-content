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

{{< highlight html "linenos=table,noclasses=false" >}}
<link href='http://fonts.googleapis.com/css?family=Dosis' rel='stylesheet' type='text/css'>
{{< / highlight >}}

When you navigate to the CSS file in your browser, you will see that Google served you the necessary web font depending on the user-agent.

{{< highlight css "linenos=table,noclasses=false" >}}
@font-face {
  font-family: "Dosis";
  font-style: normal;
  font-weight: 400;
  src: local("Dosis Regular"), local("Dosis-Regular"), url("http://fonts.gstatic.com/s/dosis/v4/xIAtSaglM8LZOYdGmG1JqQ.woff") format("woff");
}
{{< / highlight >}}

That means that you do not have all the required web fonts for your font scheme. You also have the option to download the font files from the Google Fonts site, but this only serves you the TTF versions of the font, so you still miss the EOT, WOFF or SVG versions. There are ways to retrieve these missing font files, and this will be covered in this post.

## Using the Google Font CSS reference as is (first approach)

First create two image files for your Google font (large: 109x16 pixels - small: 75x10 pixels) that you want to use and upload it to a library on your site.

Create a new font scheme where you only add the references for the **largeimgsrc** and **smallimgsrc**. The **eotsrc**, **woffsrc**, **ttfsrc** and **svgsrc** should be left blank.

> **Note**: you could use the example font scheme provided in the previous post: [Adding your web fonts to a font scheme in SharePoint (composed look)](https://www.eliostruyf.com/adding-web-fonts-font-scheme-sharepoint-composed-look/).

&nbsp;

> **Note 2**: the **largeimgsrc** and **smallimgsrc** is only required if you want to show how the font output should look like in the dropdown.

The value to use in the **typeface** attribute can be found at the bottom of the Google fonts page:

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo1.png" "Font-family value is highlighted" >}}

{{< highlight xml "linenos=table,noclasses=false" >}}
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
{{< / highlight >}}

Once the font scheme is finished, upload it to the theme gallery (`http://site-url/_catalogs/theme/`). When you go to the **Change the look** page, the dropdown should contain your new font scheme:

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo2.png" "Google font used in a font scheme" >}}

When the font scheme is applied on the site. The font references in the themed **corev15** CSS file would not contain a URL to a file:

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo3.png" "Themed corev15.css output" >}}

The next step is to add the Google font CSS reference to your site. You can do this by adding it to your master page or via a custom action. The master page option is probably the quickest way.

Here is the **[Seattle.html](/uploads/2014/09/master-google-font.html)** (right click - save as) file with a reference set to the Google Fonts CSS file. When this master page gets applied on your site, you should receive the following output:

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo4.png" "Site output after the CSS reference is added" >}}

The major downside about this approach is that it requires a master page modification. This could give you some trouble with future service updates. That is why I would recommend the second approach.

## Download the missing web fonts (second approach - recommended)

Another way can be to download all the required web fonts from Google. As I said in the beginning of this post, you are only able to download the TTF version of the font. Which means that you still need the EOT, WOFF, and SVG versions of the font.

What you could do is:

*   Download the TTF package, upload it to [fontsquirrel](http://www.fontsquirrel.com/tools/webfont-generator) and let it generate the required font files;
*   Another way could be to download the fonts for the different user agents directly from Google. Of course this can be quite some work, because you need to retrieve it from different browsers (or manipulate the user agent in your browser). I created a small web page that does the job for you. It can be found on: [http://webfonts.azurewebsites.net](http://webfonts.azurewebsites.net).

On the web page you get the links to each font file and the CSS outputs for the different user agents (in case you need this - you can find the font-family value to use in the font scheme). I already included an example with the Oswald web font on the page:

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo5.png" "Download fonts web page" >}}

At the top of the page you have an input textbox where you can insert the **family** value that you receive from the Google fonts directory.

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo6.png" "Highlighted family value to be used on the web page" >}}

> **Note**: the value in the red square needs to be provided in the input box.

Once you inserted this, and pressed enter, it retrieves all the CSS files and serves you all the links to the font files. You can download the files by just clicking on them:

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo7.png" "Font links output" >}}

Once you have all the files downloaded (you can also use the links to the web font from the page), you can follow my previous post to know how to include it to your font scheme: [Adding your web fonts to a font scheme in SharePoint (composed look)](https://www.eliostruyf.com/adding-web-fonts-font-scheme-sharepoint-composed-look/).

> **Important**: you are able to use the link to the font file on Google, but I would recommend to download the files. The output looks like this when you use the Google font references:

{{< caption-legacy "uploads/2014/09/091014_1158_HowtouseGoo8.png" "Themed corev15.css file with Google references" >}}