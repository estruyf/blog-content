---
title: Customize the star rating images in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-10-07T19:01:38+00:00
slug: /customize-star-rating-images-sharepoint-2013/
dsq_thread_id:
  - 3836681438
categories:
  - Branding
  - SharePoint 2013
  - Styling
tags:
  - JavaScript
  - Rating
  - Styling
comments: true
---

The SharePoint 2013 rating system slightly changed a bit. In SharePoint 2013 you can now choose to use **likes** or **star ratings**. This functionality can be turned on via the **Rating settings** in the list.

{{< caption-new "/uploads/2013/10/100713_1901_Customizeth1.png" "List Rating Settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVR4nAXBQQ4AIQgDQP//VFkTYgVs8bAzw92rimR3ZyaAW/W6JYka61s2p5kBIBkRJCUdHGz8+H05dT7XKC8AAAAASUVORK5CYII=" "671" "145" >}}

Styling the SharePoint 2013 star rating involves some work. The only "quick" option you have is to apply a composed look to your site. But applying a composed look to your sites means that every element will get a new look and feel. Depending on the type of site / project / changes, it could be that this isn't the right option and would involve a lot more work.

But what options do you have to apply a different look to the star rating? In SharePoint 2010 you could update some properties in the property bag of the site, but this isn't necessary anymore. The star rating is now client side rendered. That means that you're able to modify it via JavaScript.

First of all, the star rating consists of the following images:

<table style="border-collapse: collapse;" border="0"><colgroup> <col style="width: 244px;" /> <col style="width: 71px;" /></colgroup>
<tbody valign="top">
<tr>
<td style="border: solid #a3a3a3 1.0pt; padding: 5px;">RatingsSmallStarFilled.png</td>
<td style="border-top: solid #a3a3a3 1.0pt; border-left: none; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;"><img src="/uploads/2013/10/100713_1901_Customizeth2.png" /></td>
</tr>
<tr>
<td style="border-top: none; border-left: solid #a3a3a3 1.0pt; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;">RatingsSmallStarEmpty.png</td>
<td style="border-top: none; border-left: none; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;"><img src="/uploads/2013/10/100713_1901_Customizeth3.png" /></td>
</tr>
<tr>
<td style="border-top: none; border-left: solid #a3a3a3 1.0pt; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;">RatingsSmallStarLeftHalfFilled.png</td>
<td style="border-top: none; border-left: none; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;"><img src="/uploads/2013/10/100713_1901_Customizeth4.png" /></td>
</tr>
<tr>
<td style="border-top: none; border-left: solid #a3a3a3 1.0pt; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;">RatingsSmallStarRightHalfFilled.png</td>
<td style="border-top: none; border-left: none; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;"><img src="/uploads/2013/10/100713_1901_Customizeth5.png" /></td>
</tr>
<tr>
<td style="border-top: none; border-left: solid #a3a3a3 1.0pt; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;">RatingsSmallStarHoveroverEmpty.png</td>
<td style="border-top: none; border-left: none; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;"><img src="/uploads/2013/10/100713_1901_Customizeth6.png" /></td>
</tr>
<tr>
<td style="border-top: none; border-left: solid #a3a3a3 1.0pt; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;">RatingsSmallStarHoveroverFilled.png</td>
<td style="border-top: none; border-left: none; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;"><img src="/uploads/2013/10/100713_1901_Customizeth7.png" /></td>
</tr>
<tr>
<td style="border-top: none; border-left: solid #a3a3a3 1.0pt; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;">RatingsLargeStarFilled.png</td>
<td style="border-top: none; border-left: none; border-bottom: solid #a3a3a3 1.0pt; border-right: solid #a3a3a3 1.0pt; padding: 5px;"><img src="/uploads/2013/10/100713_1901_Customizeth8.png" /></td>
</tr>
</tbody>
</table>

&nbsp;

You will need to modify these images in order to match your own brand / style.

I found out that there are two different renderings of the star ratings:

1.  The list view star rating;
2.  The field star rating used on for example a page layout.

## List View - star rating rendering

> **Note**: this method can give conflicts if you have composed looks applied on your site.

The default rendering of a star rating in a list view looks like this:

{{< caption-new "/uploads/2013/10/100713_1901_Customizeth9.png" "Default Star Rating"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcUlEQVR4nB3JwRKCMBQDQP7/Gz3ojUGk0DallJfE0b3uFMcrysy6XMh3WWpOuVSRlkhOOjf1I+6bDFQACFJ2BFtrU0SoZ3HYliXbMYS3+i5xsn02lJx/YZNMbcx7SwXivwGsnw3lUAySz60/1p5wSfoCCvCRZuDKXKgAAAAASUVORK5CYII=" "315" "163" >}}

To apply your own star rating style to a list view you will need to add the following script to your master page.

```javascript
_spPageContextInfo.themedImageFileNames = {
  "RatingsSmallStarFilled.png": "RatingsSmallStarFilled.png",
  "RatingsSmallStarEmpty.png": "RatingsSmallStarEmpty.png",
  "RatingsSmallStarLeftHalfFilled.png": "RatingsSmallStarLeftHalfFilled.png",
  "RatingsSmallStarRightHalfFilled.png": "RatingsSmallStarRightHalfFilled.png",
  "RatingsSmallStarHoveroverEmpty.png": "RatingsSmallStarHoveroverEmpty.png",
  "RatingsSmallStarHoveroverFilled.png": "RatingsSmallStarHoveroverFilled.png",
  "RatingsLargeStarFilled.png": "RatingsLargeStarFilled.png",
};
if (_spPageContextInfo.siteServerRelativeUrl === "/") {
  _spPageContextInfo.themedCssFolderUrl = "/Your-Image-Location";
} else {
  _spPageContextInfo.themedCssFolderUrl =
    _spPageContextInfo.siteServerRelativeUrl + "/Your-Image-Location";
}
```

This is almost the same piece of code that a composed look applies to your site when it gets activated. The code makes SharePoint aware that there are different images to be used. In this example the names of the images stay unchanged (for the composed look the themed images are referenced).

The second part of the script is to let SharePoint know where your "theme" folder is located, so whenever the star ratings is rendered, it will reference the images of your location.

> **Important**: this piece of code need to be added after the script manager element in your master page. If you place it somewhere towards the bottom of the master page, the star rating gets the default rendering, because the SharePoint JavaScript code already gets executed.

```html
<asp:ScriptManager
  id="ScriptManager"
  runat="server"
  EnablePageMethods="false"
  EnablePartialRendering="true"
  EnableScriptGlobalization="false"
  EnableScriptLocalization="true"
/>
```

The result looks like this:

{{< caption-new "/uploads/2013/10/100713_1901_Customizeth10.png" "Custom Star Rating"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcUlEQVR4nCWMSQ6CUBBE//3vaEzciEIiPSHQ1dWGuH7DgNyhz/LX1z+pU6iIKAB2kxwV79oFmcg0FXNHsdgAI7aReXKX5l8vdjeO8om7XDXZW7iZ9YX72h5rxXT6jOLobjOb5yV07UJmQh+13k5fUPwB9fiRQZ84mTMAAAAASUVORK5CYII=" "310" "165" >}}

You only need to specify the images that you want or need to modify. For example if you don't need to change the filled star image (RatingsSmallStarFilled), you can remove it from the array and your result looks like this:

{{< caption-new "/uploads/2013/10/100713_1901_Customizeth11.png" "Star Rating"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcElEQVR4nB2NWw4CIRAEuf8tjTFxs4LLYwCxu8dg/VYlFVDurAfb8bGMdlq5Sqki3CUpaCSNN76LhLXaWgUod4C99wCAMzuX734LccFOzUticPfRe8nZ/4D0mdQeyyKprc3sFZOVy7EXtzSeMbFHyn8M1ZF16aJs/gAAAABJRU5ErkJggg==" "315" "166" >}}

## Field Control - star rating rendering

When you applied a star rendering field control to a page layout, it will be rendered via JavaScript but with a slightly different approach then from the list view. The Field Control code is going to define all the necessary images in a hidden block. The JavaScript will reference the images that are defined in the hidden block.

```html
<SPSWC:AverageRatingFieldControl
  FieldName="AverageRating"
  runat="server"
></SPSWC:AverageRatingFieldControl>
```

If you want to change the look and feel of the star rating, you can add your own hidden block with images to the master page. Each image should have the ID value corresponding to the default image.

The hidden block should look like this:

```html
<div style="display:none;">
  <img
    src="/Your-Image-Location/RatingsSmallStarEmpty.png"
    id="RatingsSmallStarEmpty.png"
  />
  <img
    src="/Your-Image-Location/RatingsSmallStarFilled.png"
    id="RatingsSmallStarFilled.png"
  />
  <img
    src="/Your-Image-Location/RatingsSmallStarLeftHalfFilled.png"
    id="RatingsSmallStarLeftHalfFilled.png"
  />
  <img
    src="/Your-Image-Location/RatingsLargeStarFilled.png"
    id="RatingsLargeStarFilled.png"
  />
  <img
    src="/Your-Image-Location/RatingsSmallStarRightHalfFilled.png"
    id="RatingsSmallStarRightHalfFilled.png"
  />
  <img
    src="/Your-Image-Location/RatingsSmallStarHoveroverEmpty.png"
    id="RatingsSmallStarHoveroverEmpty.png"
  />
  <img
    src="/Your-Image-Location/RatingsSmallStarHoveroverFilled.png"
    id="RatingsSmallStarHoveroverFilled.png"
  />
</div>
```

Best is to place this block as close as possible to the body opening tag in your master page. The image ID's need to have the values of the default images.

The rendering looks like this of the field looks like this:

{{< caption-new "/uploads/2013/10/100713_1901_Customizeth12.png" "Field Control"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWklEQVR4nF3Cuw5AMBgG0L5/7F7AajdbDVgMDOISTV0T2r+UrxWrk8OepYAcsFXYmy9NVq+QXB67UsQo8Uwd6cy/yvAsgluk95ibPp4F79uOuR8L56yzICIAL/62U6YaoZzDAAAAAElFTkSuQmCC" "97" "27" >}}

When you don't need to use a particular image, you could leave out that image from the hidden block on your master page.

{{< caption-new "/uploads/2013/10/100713_1901_Customizeth13.png" "Field Control"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAb0lEQVR4nFXISwqDMBRG4ex/B87qCtyBo0Kh1IGIG6iURmog8RGTm5v/ipQOevhGR+k5mi19Vpq25DxJdKCFvPX7zsyquOmqM5f7WD5M3T9lvJJu/LsdhpezVjGQMxinDEhOAk4UQwgAFES+fv2NAwVVcaZdUnFZAAAAAElFTkSuQmCC" "103" "40" >}}
