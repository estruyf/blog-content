---
title: Image Renditions and December Cumulative Update SharePoint 2013
author: Elio Struyf
type: post
date: 2014-01-29T11:38:34+00:00
slug: /image-renditions-december-cumulative-update-sharepoint-2013/
dsq_thread_id:
  - 3875232108
categories:
  - Branding
  - SharePoint 2013
tags:
  - Branding
  - Image Dimensions
  - Styling
comments: true
---

Once you've updated your environment with the Cumulative Update of December 2013, it could happen that you see the following errors popping up in your ULS logs: Format Exception: **Input string was not in a correct format**.

The problem occurs if you provisioned your image renditions to the site collection via the PublishingImageRenditions.xml file. In that xml file you could specify your own dimensions for the image renditions you want to use on the site collection (like described in this post: [Provision Image Renditions](https://www.eliostruyf.com/provision-image-renditions-to-your-sharepoint-2013-site/)).

If for instance you didn't specify a height or width for a specific dimension, it worked perfectly fine before the Cumulative Update of December 2013. Once you've installed this update, the dimension may not have empty values anymore.

{{< highlight html "linenos=table,noclasses=false" >}}
<!-- This won't work -->
<ImageRendition>
    <Height></Height>
    <Id>4</Id>
    <Name>Slideshow Rendition</Name>
    <Version>1</Version>
    <Width>800</Width>
</ImageRendition>

<!-- This won't work -->
<ImageRendition>
    <Height>50</Height>
    <Id>4</Id>
    <Name>Block Image</Name>
    <Version>1</Version>
    <Width></Width>
</ImageRendition>
{{< / highlight >}}

If you want that a dimension doesn't need to have a specific height or width, you should set the value to **-1** instead of leaving it empty. Once you have updated the incorrect dimension in the PublishingImageRenditions.xml file, the error messages will be gone, and the image renditions will work again.

{{< highlight html "linenos=table,noclasses=false" >}}
<!-- This works -->
<ImageRendition>
    <Height>-1</Height>
    <Id>4</Id>
    <Name>Slideshow Rendition</Name>
    <Version>1</Version>
    <Width>800</Width>
</ImageRendition>

<!-- This works -->
<ImageRendition>
    <Height>50</Height>
    <Id>4</Id>
    <Name>Block Image</Name>
    <Version>1</Version>
    <Width>-1</Width>
</ImageRendition>
{{< / highlight >}}
