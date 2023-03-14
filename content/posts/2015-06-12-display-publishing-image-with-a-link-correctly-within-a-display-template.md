---
title: Display publishing image with a link correctly within a display template
author: Elio Struyf
type: post
date: 2015-06-12T09:18:00+00:00
slug: /display-publishing-image-with-a-link-correctly-within-a-display-template/
dsq_thread_id:
  - 3842469232
categories:
  - Office 365
  - Search
  - SharePoint
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

When you create a display template that displays a publishing image (example: the roll-up image of a page) it might be that you used the Srch.ContentBySearch.getPictureMarkup() function of SharePoint. This function is also used in the standard display templates like for example: Item_Picture3Lines.html.

This Srch.ContentBySearch.getPictureMarkup provides you the markup for rendering the image with the image rendition of your choice. The code in the function retrieves the **src** value from the image element and creates a new element with the rendition, class, alt, and id values that you provide. Here is an example of how to call the function:

{{< highlight javascript "linenos=table,noclasses=false" >}}
var pictureMarkup = Srch.ContentBySearch.getPictureMarkup(pictureURL, 100, 100, ctx.CurrentItem, "cbs-picture3LinesImg", line1, pictureId);
{{< / highlight >}}

This function outputs the following HTML:

{{< highlight javascript "linenos=table,noclasses=false" >}}
<img src="/BRAND/DEMO/PUBLISHINGIMAGES/Dummy.JPG?width=100&amp;height=100" class="cbs-picture3LinesImg" alt="test 2" id="ctl00_ctl39_g_aa528ff1_226a_4ddc_8e09_c37c6faaf319_csr8_2lines_picture" onerror="this.parentNode.innerHTML=Srch.ContentBySearch.getNoPictureMarkup(100);" onload="Srch.ContentBySearch.resizeImageToSquareLength(this, 100);" />
{{< / highlight >}}


## Where is my link?

Now a client noticed that if they set a hyperlink on the image (this is a default SharePoint functionality), only the image will get rendered from the display template. The hyperlink is not taken into account.

Here is an example of the field value output when a hyperlink is set:

{{< highlight html "linenos=table,noclasses=false" >}}
<a href="http&#58;//www.eliostruyf.com"><img alt="Dummy image" src="/brand/demo/PublishingImages/dummy.jpg" style="BORDER&#58;0px solid;" /></a>
{{< / highlight >}}

When you call the getPictureMarkup function with this value, it returns you the following markup:

{{< highlight html "linenos=table,noclasses=false" >}}
<img src="/BRAND/DEMO/PUBLISHINGIMAGES/DUMMY.JPG?width=100&amp;height=100" class="cbs-picture3LinesImg" alt="test 2" id="ctl00_ctl39_g_aa528ff1_226a_4ddc_8e09_c37c6faaf319_csr8_2lines_picture" onerror="this.parentNode.innerHTML=Srch.ContentBySearch.getNoPictureMarkup(100);" onload="Srch.ContentBySearch.resizeImageToSquareLength(this, 100);" />
{{< / highlight >}}

As you can see the anchor tag around the image element is removed. This is because the function does not checks if there is a hyperlink set. So if you need to have such kind of functionality in your display template, you need to implement it yourself. Here is the code to do it:

{{< highlight javascript "linenos=table,noclasses=false" >}}
<!--#_
// Get the publishing image
var publishingImage = $getItemValue(ctx, 'PublishingImage');
var pictureMarkup = Srch.ContentBySearch.getPictureMarkup(publishingImage, 100, 100, ctx.CurrentItem, '', pageTitle, '');
var pictureLink;
var targetContent = "";
// Check if the publishing image is not empty
if (!publishingImage.isEmpty) {
    var pictureValue = publishingImage.value.toString();
    // Check if the picture value contains an anchor element
    if (pictureValue.toUpperCase().indexOf('<A ') !== -1) {
    	// Retrieve the href attribute value  from the picture value
        var link = pictureValue.match(/href="([^"]*)"/);
        // Retrieve the target attribute value from the picture value
        var target = pictureValue.toLowerCase().match(/target="([^"]*)"/);
        if (Srch.U.isArray(link) && link.length >= 1) {
            pictureLink = link[1];
        }
        if (Srch.U.isArray(target) && target.length >= 1) {
            targetContent = String.format('target="{0}"', target[1]);
        }
    }
}

// Check if the pictureLink is empty and render the right output
pictureMarkup = $isEmptyString(pictureLink) ? 
                pictureMarkup : 
                String.format('<a href="{0}" {1}>{2}</a>', pictureLink, targetContent, pictureMarkup);
_#-->

_#= pictureMarkup =#_
{{< / highlight >}}


### What does the code output?

**Image with a hyperlink and no target**

{{< highlight html "linenos=table,noclasses=false" >}}
// Field value
<a href="http&#58;//www.eliostruyf.com"><img alt="Dummy image" src="/brand/Demo/PublishingImages/dummy.jpg" style="BORDER&#58;0px solid;" /></a>

// HTML Output
<a href="https://www.eliostruyf.com">
	<img src="/BRAND/DEMO/PUBLISHINGIMAGES/DUMMY.JPG?width=100&amp;height=100" class="" alt="Test page image with link" onerror="this.parentNode.innerHTML=Srch.ContentBySearch.getNoPictureMarkup(100);" onload="Srch.ContentBySearch.resizeImageToSquareLength(this, 100);" width="100">
</a>
{{< / highlight >}}

**Image with a hyperlink and target set**

{{< highlight html "linenos=table,noclasses=false" >}}
// Field value
<a href="http&#58;//www.eliostruyf.com" target="_blank"><img alt="Dummy image" src="/brand/Demo/PublishingImages/Dummy.jpg" style="BORDER&#58;0px solid;" /></a>

// HTML Output
<a href="https://www.eliostruyf.com" target="_blank">
	<img src="/BRAND/DEMO/PUBLISHINGIMAGES/DUMMY.JPG?width=100&amp;height=100" class="" alt="Test page image with link and target" onerror="this.parentNode.innerHTML=Srch.ContentBySearch.getNoPictureMarkup(100);" onload="Srch.ContentBySearch.resizeImageToSquareLength(this, 100);" width="100">
</a>
{{< / highlight >}}

**Image without a link**

{{< highlight html "linenos=table,noclasses=false" >}}
// Field value
<img alt="" src="/brand/Demo/PublishingImages/Dummy.jpg" style="BORDER&#58;0px solid;" />

// HTML Output
<img src="/BRAND/DEMO/PUBLISHINGIMAGES/DUMMY.JPG?width=100&amp;height=100" class="" alt="test 2" onerror="this.parentNode.innerHTML=Srch.ContentBySearch.getNoPictureMarkup(100);" onload="Srch.ContentBySearch.resizeImageToSquareLength(this, 100);" width="100">
{{< / highlight >}}
