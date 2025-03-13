---
title: Retrieving the image its focal point of a SharePoint Modern page
slug: /retrieving-image-focal-point-sharepoint-modern-page/
author: Elio Struyf
type: post
date: 2019-12-19T12:51:20.713Z
draft: false
tags:
  - Development
  - SPFx
  - SharePoint
categories: []
comments: true
---

On SharePoint modern pages, you can set the focal point of the header image. Having this kind of control is excellent for creating compelling pages.

{{< caption-new "/uploads/2019/12/focal-point-1.png" "Header image with focal point"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAAB7SURBVBXBPQ8BMQCA4beuzTWqEQy+IjFZifsVFqs/azMYuFEkbiIuqUFEJ/HRyj2P2O3z6L2nUhxyjBYIkRCkYTSecLm/KdwLeXOOsrzinw+2mzVNk9DrDzieziyWKyrDWkSmWqOUotXuMJ1lNOopn++PedbFWkslhMgf53Um7RDUHDwAAAAASUVORK5CYII=" "2050" >}}

What if you also want to make use of the same focal point in your roll-ups? Luckily this is also possible, and it depends a bit on how you retrieve the data. 

## Where to retrieve this information?

The header image information is available as a field property on the page named **LayoutWebpartsContent**. This field contains an HTML string with some JSON parsed string, which provides all properties of how the header needs to render.

{{< caption-new "/uploads/2019/12/focal-point-2.png" "LayoutWebpartsContent data"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABnSURBVAXB0Q0CMQxEwbd24D4AUQU10H9PgJRc7GVGz9fbt/sDubCTqs3IoNtEBNWbc51ECtQFJNBkBLtBErZpB3NNog3toNtgkCAFGdBKRsD1ejBGiCOF84L3RBKr4awiZGpNft8PfwPLN1QgnoKaAAAAAElFTkSuQmCC" "3068" >}}

To get this information, you can use a REST API call and specify to retrieve the **LayoutWebpartsContent** field information. You can use the following API call: `/_api/web/lists/GetByTitle('Site Pages')/GetItemById(4)?$select=LayoutWebpartsContent`;

{{< caption-new "/uploads/2019/12/focal-point-3.png" "Verify the returned JSON data"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACnSURBVG3BsUoDURRF0X3uvSOJKQRBkAh+Q9D//w7B1iqFmIhFMvPeOzKFnWvp7ePs5/siM/nPNE2sYn8XvB9n2hBVRVVRVVQVVYVtbFPfP0ceNuZ0AklEBH8kkZEsbaDDy6tHbzBf6GPQh7HNsLEBiaf9I5WjkWOBSiaSkLANEq13rkvj8+tMSCAgJATYRhKrVBASq7rZbJkvAgEGCWywzZBJJbe7Hb8m2UmorZhtcwAAAABJRU5ErkJggg==" "2450" >}}

As mentioned, the data you get back is an HTML encoded string with a JSON control data attribute. This data needs some parsing to get the actual values.

## Parsing the HTML control data

As the data is an HTML encoded string, this needs some decoding first to get the JSON value. We are looking for the translateX and translateY properties that are available in the JSON object. You can use these values to apply as the background positioning `x` and `y` CSS properties to get the same focus point. The decoding of the JSON object looks as follows:

{{< gist estruyf c308dc012fcf2d802c98247f6c38d605 >}}

The contents of the JSON string look like this:

{{< gist estruyf b209a8b6db61b69798da23689fe2f1be >}}

## Retrieving the data via search

The good news is that you can also retrieve this information via search. To extract the data via search, all you need to do is pass the **LayoutWebpartsContentOWSHTML** managed property to the **SelectProperties** parameter.

Happy coding!
