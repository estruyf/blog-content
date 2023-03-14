---
title: Rendering video results with the use of display templates
author: Elio Struyf
type: post
date: 2016-04-21T18:57:03+00:00
slug: /rendering-video-results-with-the-use-of-display-templates/
dsq_thread_id:
  - 4765860059
categories:
  - Display Templates
  - JavaScript
  - Office 365
  - SharePoint
tags:
  - Display Templates
  - JavaScript
comments: true
---

Last week when I was configuring a content search web part to show the latest videos from the Office 365 Video Portal. I saw that the default **video** template which is available is not so feature rich as I expected.

The default video display template shows only a preview image with a link to the actual video.

{{< caption-legacy "uploads/2016/04/042116_1851_Renderingvi1.png" "Default video display template" >}}

The hover panel display template that is used to visualize video results can achieve more. It allows you to play the video when the hover panel is open.

{{< caption-legacy "uploads/2016/04/042116_1851_Renderingvi2.png" "Video hover panel" >}}

As this video hover panel functionality is more useful for showing the latest videos than the default template. I created a new video template that uses the same functionality as that from the video hover panel.

## I present you the video template

The video template can be used for both videos that exist on SharePoint and the Video Portal.

> **Important**: this template is created for being used on Office 365 and is not tested for on-premises environments.

The template itself is made available like all the others on the SPCSR repository: [Video Display Template](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Video%20display%20template).

### Video Portal Results

For rendering the Video Portal videos, the template makes use of the videoportal.js file which is only available on Office 365.

The videos are rendered like this:

{{< caption-legacy "uploads/2016/04/snip_20160422141117.png" "Video display template - Video Portal Result" >}}

> **Info**: the template renders the title, media duration and channel name of the video.

When you click on the play button, the preview image will be removed and the video gets loaded.

{{< caption-legacy "uploads/2016/04/snip_20160422141136.png" "Loading video - Video Portal Result" >}}

Once loaded, it will start playing and you can pause the video or watch it in full screen.

{{< caption-legacy "uploads/2016/04/snip_20160422141150.png" "Video player - Video Portal Result" >}}

If you want there has been released a new template which retrieves the channel colors:

{{< caption-legacy "uploads/2016/04/snip_20160425153527.png" "Channel colors" >}}

> **Important**: this template does an extra Ajax call to retrieve the colors. If you want to use the template, this can be found in the GitHub repository with the following name: Item_Video_ChannelColor.html.


### SharePoint Video Results

Rendering the SharePoint Video results works a bit differently. These results make use of the media player functionality from SharePoint which is loaded via the mediaplayer.js file.

These videos render like this:

{{< caption-legacy "uploads/2016/04/042116_1851_Renderingvi6.png" "Video Result - SharePoint Video" >}}

When you click on the play button, you will notice that the media player is different:

{{< caption-legacy "uploads/2016/04/042116_1851_Renderingvi7.png" "Browser media player - SharePoint Video" >}}

The rendering is different because it makes use of the browser its media player functionality.

Why is this important?

Chrome and Firefox can render more video formats than Internet Explorer. So if you are loading these results in Internet Explorer I have added the functionality to highlight which images cannot be played.

{{< caption-legacy "uploads/2016/04/042116_1851_Renderingvi8.png" "File format is not supported - SharePoint Video" >}}

Notice the message on the second video which tells you that the format is not recognized by IE.

## How to query your videos?

### Query Video Portal videos

If you want to retrieve all the videos from the Video Portal, you can query them as follows:

{{< highlight html "linenos=table,noclasses=false" >}}
SPContentType="Cloud Video"
{{< / highlight >}}

### Query SharePoint videos

If you want to retrieve all the videos that you uploaded to SharePoint, you can query them as follows:

{{< highlight html "linenos=table,noclasses=false" >}}
SPContentType="Video"
{{< / highlight >}}

> **Info**: this is the default video content type that is used in the asset library. If you made a custom content type for your videos, be aware that you need to adapt this query.


# Download the template

The template is available in the SPCSR GitHub repository: [Video Display Template](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Video%20display%20template).

## Updates

### 25/04/2016

A new template has been released that displays the Video Portal channel color.