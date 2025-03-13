---
title: Provision Image Renditions to your SharePoint 2013 Site
author: Elio Struyf
type: post
date: 2013-06-20T19:03:06+00:00
slug: /provision-image-renditions-to-your-sharepoint-2013-site/
dsq_thread_id:
  - 3836445707
categories:
  - SharePoint
  - Styling
tags:
  - Image Dimensions
comments: true
---

In SharePoint 2013 you have the functionality to create renditions for your images. This allows you to use the same image but with different dimensions in your design. Most of the information you find about this topic is most about using it for different devices, so that you can use a smaller version for a mobile device, and the default one for a desktop.

The reason I started using Image Renditions in my projects is to be sure that the image with the correct dimensions (that I have specified) is retrieved, so that it doesn't mess up my design.

For example: if you have a banner area at the top of your page, and you want that this image always has the same size. The "old" way to do this, was with CSS. Sometimes this won't fulfill your needs, because the image was resized based on the max-width or max-height properties you specified. With image renditions, you do not have to set these CSS properties. You can just specify the image you need in your design by just adding the RenditionID / Width / Height to your URL as query string.

You can have various Image Renditions defined on your site collection, and they can be created at the following location: `http://your-site/_layouts/15/ImageRenditionSettings.aspx`

The image renditions are stored in a XML file that is located here: `http://your-site/_catalogs/masterpage/PublishingImageRenditions.xml`. Every time you create a new rendition, the file gets updated.

The default file content looks like this:

```html
<?xml version="1.0"?>
<SiteImageRenditions xmlns="http://schemas.datacontract.org/2004/07/Microsoft.SharePoint.Publishing" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
    <NextId>5</NextId>
    <Renditions>
        <ImageRendition>
            <Height>100</Height>
            <Id>1</Id>
            <Name>Display Template Picture 3 Lines</Name>
            <Version>1</Version>
            <Width>100</Width>
        </ImageRendition>
        <ImageRendition>
            <Height>100</Height>
            <Id>2</Id>
            <Name>Display Template Picture On Top</Name>
            <Version>1</Version>
            <Width>304</Width>
        </ImageRendition>
        <ImageRendition>
            <Height>220</Height>
            <Id>3</Id>
            <Name>Display Template Large Picture</Name>
            <Version>1</Version>
            <Width>468</Width>
        </ImageRendition>
        <ImageRendition>
            <Height>68</Height>
            <Id>4</Id>
            <Name>Display Template Video</Name>
            <Version>1</Version>
            <Width>120</Width>
        </ImageRendition>
    </Renditions>
</SiteImageRenditions>
```


## Provision Image Renditions

You have a couple of choices when you want to are going to provision image renditions. You can do it programmatically like Waldek Mastykarz described in his blog post: [Image Renditions in SharePoint 2013](http://blog.mastykarz.nl/image-renditions-sharepoint-2013/), or you can provision the XML file to the master page gallery.

I prefer to use the second option to provision the XML file to the master page gallery because it involves no code, and this can easily be packaged together with your other design files.

The simplest way to create your own Image Rendition XML file, is to configure all the renditions on the image rendition page (`http://your-site/_layouts/15/ImageRenditionSettings.aspx`). When you are done, you just download a copy of the PublishingImageRenditions.xml file that is located in the master page gallery, and add it to your design package.

Here is an example of a modified PublishingImageRenditions file:

```html
<?xml version="1.0"?>
<SiteImageRenditions xmlns="http://schemas.datacontract.org/2004/07/Microsoft.SharePoint.Publishing" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
    <NextId>7</NextId>
    <Renditions>
        <ImageRendition>
            <Height>100</Height>
            <Id>2</Id>
            <Name>Display Template Picture On Top</Name>
            <Version>1</Version>
            <Width>304</Width>
        </ImageRendition>
        <ImageRendition>
            <Height>220</Height>
            <Id>3</Id>
            <Name>Display Template Large Picture</Name>
            <Version>1</Version>
            <Width>468</Width>
        </ImageRendition>
        <ImageRendition>
            <Height>-1</Height>
            <Id>5</Id>
            <Name>100px Width Rendition</Name>
            <Version>1</Version>
            <Width>100</Width>
        </ImageRendition>
        <ImageRendition>
            <Height>50</Height>
            <Id>6</Id>
            <Name>Highlight Image</Name>
            <Version>1</Version>
            <Width>50</Width>
        </ImageRendition>
    </Renditions>
</SiteImageRenditions>
```

The content of your module elements file looks like this:

```html
<File Url="PublishingImageRenditions.xml" Type="GhostableInLibrary" Level="Published" ReplaceContent="true">
  <Property Name="ContentTypeId" Value="0x01010012BCF119622FF14793A8A38D5831F25C" />
  <Property Name="ContentType" Value="Document" />
</File>
```

Set the **ReplaceContent** property to **True** and the **Level** to **Published**. This way your file content gets updated, and the file itself is published in the master page gallery.