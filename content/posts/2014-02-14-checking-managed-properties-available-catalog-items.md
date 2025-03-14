---
title: Checking which Managed Properties are available for your Catalog Items
author: Elio Struyf
type: post
date: 2014-02-14T15:57:40+00:00
slug: /checking-managed-properties-available-catalog-items/
dsq_thread_id:
  - 3838004434
categories:
  - Cross-site Publishing
  - SharePoint 2013
tags:
  - Cross-site Publishing
  - Page Layouts
comments: true
---

I'm currently working on my first project that makes use of Cross-Site Publishing functionality from SharePoint 2013. One of the aspects is to create a couple of page layouts to visualise the managed properties from the catalog items.

When you configure a catalog connection for the first time on your site, the category and catalog item pages will automatically be created. On the catalog item page, by default there will already be a couple managed properties defined to be displayed on the page. In most cases, you probably want to re-order, re-place, and style these properties. But what if you want to show additional managed properties? How do you know which managed properties are available to use?

To know which managed properties are available for the current catalog item, navigate to the catalog item page:

{{< caption-new "/uploads/2014/02/021414_1557_Checkingwhi1.png" "Catalog Item Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAY0lEQVR4nHWLOwqAMBAF9/73sQj4qb2GYLPxt5JlU2RfRLHUYYoHw6N1mSNPXhJc4epFK+7xaCSxW+bm5HDGIByO2JoM0B7awkba9y2l5F7w4g7U+krMbGb1BxKRnDPux0e+AOmGj9LuPK69AAAAAElFTkSuQmCC" "519" "239" >}}

&nbsp;

Click on **edit page** so that your page opens in edit mode, and click on the **Search** button of the **Catalog-Item URL** web part.

{{< caption-new "/uploads/2014/02/021414_1557_Checkingwhi2.png" "Catalog Item Page - Edit Mode"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAkElEQVR4nFWLsQ7CMAwF8//fVSGBKAws0DJ1AaqqhRA7dhw7CFoJ9XTbu+eew2m41wmbhA3DhaHNdLXUWmpMOjf1u+FWjY9q6jfvceunmsLR6GC0Nz67l48xaiTjpFqKWrHy1wEEZtIsRNEDIiUR0bzoRMTM8o/vsMYBQAiBmVUzUoosczrXznuPiEtsauv3Bzc7yaI1q1g8AAAAAElFTkSuQmCC" "498" "355" >}}

This opens a new dialog window with the connected catalog and its corresponing catalog items.

{{< caption-new "/uploads/2014/02/021414_1557_Checkingwhi3.png" "Connected Catalog Items"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVR4nG3LWwqAMAxE0ex/rYL0YZt0JqkggkJ7P+cwknOqtbTWAMQvdwcgx5lSLqq6Mklpar2bPTyXJMJjvo8tb9aPL0VRgPRdQm6EpJmNMW6Its750brrlAAAAABJRU5ErkJggg==" "505" "363" >}}

When you hover over an item, a hover panel will be loaded, and when you click on the **MORE** link in the hover panel, you'll retrieve all the available managed properties for the catalog item.

{{< caption-new "/uploads/2014/02/021414_1557_Checkingwhi4.png" "Available Managed Properties"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaklEQVR4nG2LQQ7DIAwE+f8TORUjoQohCAlOHBGvqzaXHDra06zGvd41L9z47PvcBJtcPA4AZgbAlZWXwevgXc6pmIpaaylFRFTVmcHw3V2YGRF570MIrTV3qydEFGPsvYvInzv/SCnlnD+tQJAJB0VGowAAAABJRU5ErkJggg==" "519" "243" >}}

## Important

This only works with auto created managed properties. While rendering this hover panel overview, SharePoint does a check to see if the property name is auto created. When the property name looks like its auto created (should contain OWS as text), it will be displayed.

```javascript
Srch.ValueInfo.isAutoCreatedPropertyName = function Srch_ValueInfo$isAutoCreatedPropertyName(managedPropertyName) {
  if (Srch.U.w(managedPropertyName)) {
    return false;
  }
  
  if (managedPropertyName.startsWith('owstaxId')) {
    return true;
  } else if (managedPropertyName.length > 7) {
    var $v_0 = managedPropertyName.length - 7;
    var $v_1 = managedPropertyName.length - 4;
    return managedPropertyName.substring($v_0, $v_1).toUpperCase() === 'OWS';
  }
  return false;
}
```
