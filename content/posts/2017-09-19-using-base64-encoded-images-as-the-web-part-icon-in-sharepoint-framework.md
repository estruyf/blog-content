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

{{< caption-new "/uploads/2017/09/091917_1944_Usingbase641.png" "Modern client-side web parts"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA2klEQVR4nD2Q26rFMAhE+/9/uE+hT4XekuaqJsbWTXbgzJOwmFFnyjl7751z5Sciqj8R0XVdU4jBWhtjHKCUgoiVKyLu+z5lyMd5pJQaN+cdADCzDx4Auvt9X2MMAKjqPM/OOVVd15WIjDGTiFSuIqKqiNhaE5GUEiLGFDtGwoGZeQz3fXPlJm16nuc4jpyzqlprSymq+vn7eO9FpLtH4Pu+RNR31XqeZwih1tpxyqm1pqr/Mdu2ZcjcuON1XUMIqrosy7h827b+YeOJiGKMAICIo5/neVJKo7svUAM7/k6zzG8AAAAASUVORK5CYII=" "293" "329" >}}

SharePoint Framework provides use two options at this moment of specifying an icon:

*   Office UI Fabric font icons (officeFabricIconFontName)
*   Images by providing a URL (iconImageUrl)

> **Info**: Waldek Mastykarz wrote a great article about this a while ago. Read more about it here: [Specifying the icon of a SharePoint Framework Client-Side Web Part](https://blog.mastykarz.nl/specify-icon-sharepoint-framework-client-side-web-part/).

Probably, when you are creating web parts for a certain product or company you want to include the logo instead of using the Office UI Fabric font. You could do this by uploading your image and adding the URL of the image to the **iconImageUrl** property.

But did you know that you can also make use of Base64 encoded images?

## Base64 what?

Instead of specifying an URL to an image to load, you can encode your image. That way you do not have to upload your image to an online location, and there is no extra request necessary to retrieve the image.

For example, this image:

{{< caption-new "/uploads/2017/09/091917_1944_Usingbase642.jpg" "PnP SharePoint"  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAACAYH/8QAJBAAAQQBAwMFAAAAAAAAAAAAAQIDBREEAAYHEhNxIjE4dLH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AieK5Rh/eUHlyG6JVpxyNdVlZDWSvIfae7tJFEKACvSOmrom/e9Jdqb5KLSCracISUiyqVKCfKeg14s6y/YvyKxvp5P4NJfQf/9k=" "97" "90" >}}

Becomes this:

{{< caption-new "/uploads/2017/09/091917_1944_Usingbase643.png" "PnP SharePoint encode image"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAV0lEQVR4nCXCSw6AIAwFQI7jSjQBNPxCH7aKifX+t3HhZEyTdt04uBAS+j8TYkxu21czBh4VVdH3fFTGDZaCnhtF52dDiMy1H5mloqdSQ8oubIsPdrbTBzCSFltaenh5AAAAAElFTkSuQmCC" "624" "166" >}}

The great thing about it is that you can maintain everything in one location and do not have to worry about where you are going to store the icon images.

## How to convert your image

There are a lot of online converters, one that I use frequently is [https://www.base64-image.de/](https://www.base64-image.de/).

On that website you upload the image, the website encodes it and provides you with a couple of options. The one you need to be used in the web part manifest is the **copy image** option.

{{< caption-new "/uploads/2017/09/091917_1944_Usingbase644.png" "Encoded image"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/AOTl4evt6fX38uzx6+rx6vDz7fDy7vX29Pb19PDy8ADi6dnb6M/n8dnP58nD5sLf7tLi7dfr6uDr5dvr8OanOjY+bWRFdwAAAABJRU5ErkJggg==" "624" "132" >}}

Once copied, add it to the **iconImageUrl** property and you are all set to go.

{{< caption-new "/uploads/2017/09/091917_1944_Usingbase645.png" "Web part with encoded image instead of using an URL"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlElEQVR4nCXMsQ6DMAwE0Pz/zl8hJJZ2IQMdikRBqkmEwPH5qiZvu5N9wcwez4eqkuz7fpomkqq6LIu7BzOLMZZSSA7DEGMkeV3XZ/sYLKiqiNz3DeBbuXspRUQAhJzzOI5t/KhImllrwrZtXde18K5IppTm1/z/Tikdx5FzBrCu677vbUZEzvMMAMwMVbvzCoC7/wDU78cHa1DsawAAAABJRU5ErkJggg==" "293" "197" >}}