---
title: Using base64 encoded images as the web part icon in SPFx
author: Elio Struyf
type: post
date: 2017-09-19T19:52:52+00:00
slug: /using-base64-encoded-images-as-the-web-part-icon-in-sharepoint-framework/
dsq_thread_id:
  - 6155773307
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Icons
  - SPFx
comments: true
---

Web part icons help you to distinguish your web part between all the others.

{{< caption-legacy "uploads/2017/09/091917_1944_Usingbase641.png" "Modern client-side web parts" >}}

SharePoint Framework provides use two options at this moment of specifying an icon:

*   Office UI Fabric font icons (officeFabricIconFontName)
*   Images by providing a URL (iconImageUrl)

> **Info**: Waldek Mastykarz wrote a great article about this a while ago. Read more about it here: [Specifying the icon of a SharePoint Framework Client-Side Web Part](https://blog.mastykarz.nl/specify-icon-sharepoint-framework-client-side-web-part/).

Probably, when you are creating web parts for a certain product or company you want to include the logo instead of using the Office UI Fabric font. You could do this by uploading your image and adding the URL of the image to the **iconImageUrl** property.

But did you know that you can also make use of Base64 encoded images?

## Base64 what?

Instead of specifying an URL to an image to load, you can encode your image. That way you do not have to upload your image to an online location, and there is no extra request necessary to retrieve the image.

For example, this image:

{{< caption-legacy "uploads/2017/09/091917_1944_Usingbase642.jpg" "PnP SharePoint" >}}

Becomes this:

{{< caption-legacy "uploads/2017/09/091917_1944_Usingbase643.png" "PnP SharePoint encode image" >}}

The great thing about it is that you can maintain everything in one location and do not have to worry about where you are going to store the icon images.

## How to convert your image

There are a lot of online converters, one that I use frequently is [https://www.base64-image.de/](https://www.base64-image.de/).

On that website you upload the image, the website encodes it and provides you with a couple of options. The one you need to be used in the web part manifest is the **copy image** option.

{{< caption-legacy "uploads/2017/09/091917_1944_Usingbase644.png" "Encoded image" >}}

Once copied, add it to the **iconImageUrl** property and you are all set to go.

{{< caption-legacy "uploads/2017/09/091917_1944_Usingbase645.png" "Web part with encoded image instead of using an URL" >}}