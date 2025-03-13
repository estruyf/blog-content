---
title: 'Making an Image Gallery from the Asset Library: Part 2'
author: Elio Struyf
type: post
date: 2012-08-02T09:16:40+00:00
excerpt: In the previous part I showed you how to manipulate the Asset Library Thumbnail view, so that it could be used as image gallery. In this part I will do a small update to the code, so that the first image will be used for the gallery.
slug: /making-an-image-gallery-from-the-asset-library-part-2/
dsq_thread_id:
  - 3836444856
categories:
  - Backup
  - SharePoint
  - Styling
  - Views
tags:
  - Asset Library
  - CSS
  - jQuery
  - SharePoint Designer
  - Styling
comments: true
---

In the [previous part](https://www.eliostruyf.com/making-an-image-gallery-inside-the-asset-library-part-1/ "Making an Image Gallery Inside the Asset Library: Part 1") I showed you how to manipulate the Asset Library Thumbnail view, so that it could be used as image gallery. In this part I will do a small update to the code, so that the first image will be used for the gallery.

## Adding gallery images

In the first part I created a gallery section which looked like this:

{{< caption-new "/uploads/2012/08/080212_0907_MakinganIma1.png" "Gallery view with default image" >}}

What I want to do is change the default image to the first image of that folder/gallery. To do this, I will make use of the SharePoint REST service and an Ajax call.

## Step 1

The first step is to retrieving the first image of our folder.

http://sp2010/_vti_bin/ListData.svc/Assets()?$filter=substringof('Gallery-Name',Path)&$top=1

## Step2

Creating a new JavaScript function that will be used to do the Ajax call for each gallery.


```javascript
function GetFirstImage(elm, gallery) {
  // Check if the current context is not null
  // ctx can be used, because the object is created by the asset library view
  if (ctx != null) {
    // Create the list data url to retrieve the first image
    var listDataURL = ctx.HttpRoot + "/_vti_bin/ListData.svc"+ctx.listUrlDir+"()?$filter=substringof('"+gallery+"',Path)&$select=Name,Path&$top=1";
    jQuery.ajax({
      url: listDataURL,
      dataType: "json",
      success: function(data) {
        // Check if you retrieved an image
        if (data.d[0] != undefined) {
          // Update the current element with the image url
          elm.find('img').attr('src', data.d[0].__metadata.media_src);
        }
      }
    });
  }
}
```


## Step 3

Now that the JavaScript function is created, the function call can be added to the **each** loop when creating the galleries.


```javascript
// Show the picture galleries
jQuery('#pickerimages .ms-assetpicker-tiled-mediumprops a[onmousedown]').each(function() {
  var elm = jQuery(this);
  var gallery = elm.text();
  jQuery("#galleries").append(elm.html("![Gallery](/_layouts/images/ImagePreviewHH.PNG)<span>"+gallery+"</span>"));

  // Adding the first image as gallery image
  GetFirstImage(elm, gallery);
});
```


## Result

The end result looks like this:

{{< caption-new "/uploads/2012/08/080212_0907_MakinganIma2.png" "Gallery view result" >}}

Event has still the default image, this is because there are no pictures added to this folder/gallery.