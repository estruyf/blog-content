---
title: Missing the Apps you can add Zone When Adding a New App
author: Elio Struyf
type: post
date: 2014-01-16T11:22:39+00:00
slug: /missing-apps-can-add-zone-adding-new-app/
dsq_thread_id:
  - 3836446680
categories:
  - Apps
  - Branding
  - SharePoint 2013
tags:
  - Apps
  - Branding
  - Master Page
  - Styling
comments: true
---

This week a client mentioned an issue when they want to add new apps to their sites. The issue is that they do not see the **Apps you can add** zone on the app creation page (your-site/_layouts/15/addanapp.aspx). They only see the **Noteworthy** apps:

{{< caption-new "/uploads/2014/01/011614_1122_MissingtheA1.png" "Noteworthy Apps"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVR4nAF8AIP/AKy4xKCuvPDy9Pr7/MHN2sfS3v///+vv87jG1NDZ4wAoUX44X4jj6O3p6/AnUHw6Xob///+3wtIUP29cd5kAYH6bc42n6e3x7/L1TG6QYoGf////y9TeSGuOiJ+3AOnq7Ofp6/z8/P39/efp6/X19f////f3+Ovs7vv6+lEHW1LuuqKcAAAAAElFTkSuQmCC" "484" "194" >}}

The sites on which this problem occurs have custom branding applied. On the standard OOTB master pages, the problem doesn't occur. This means that it would be a problem with the custom branding itself that I implemented.

I thought of two possibilities:

1.  Or it's CSS related, it could be that I hidden something to much;
2.  Or it's a content placeholder that's hidden.

## Investigation

A quick look to the HTML of the page showed me that it wasn't a CSS related problem, because the **Apps you can add** HTML mark-up wasn't there. This meant that it had to be a content placeholder that I had hidden.

The second thing I did was setting the **Visible** property of all the content placeholders to **True** that were hidden. This way you can quickly see if it's a content placeholder problem.

{{< caption-new "/uploads/2014/01/011614_1122_MissingtheA2.png" "Content Placeholders"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AO3e8OzZ6+7f8MvL/8nJ/uHX9vHg7u3g8uzn+/n5/6BsGzmJkAGpAAAAAElFTkSuQmCC" "664" "92" >}}

After a page refresh, the **Apps you can add** zone became visible:

{{< caption-new "/uploads/2014/01/011614_1122_MissingtheA3.png" "Apps you can add"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAxUlEQVR4nAG6AEX/AJOlt8LL1Onr7pWpv+Po7eTq76O2yPb4+szW4Ky9zQAWQXCesMTj5+0KN2jH0d2yv88YQnHr7fF4kKs2XIQA5uns+Pn5+vr76Ovu////9PX36Ovt////7/Hz7/HyAI6lvMTQ3PX3+Y2kvN7l7ODm7I6ku/H09sbR3aW3ygAlUHuSqL7o7fEjTnm8ydbAzNkZRnTj6O6GnbU+ZYoA6ezw/f7++vv73uPo/Pz89PX36e3w////7fDy7/L04FGMlNxYRNoAAAAASUVORK5CYII=" "659" "384" >}}

Next thing to do is finding which content placeholder is causing this problem. Eventually it turned out that the problem occurred by the content placeholder **PlaceHolderPageTitleInTitleArea** that was hidden. What doesn't make sense at first, because the **Apps you can add** zone is not added via this content placeholder.

I debugged the **sp.storefront.debug.js** file, and in that file I saw that **Apps you can add** zone requires a HTML element with the following ID **ms-pageTitleCurrentNode**. It doesn't matter where this is located in the page, it just need to be there.

Here is the code snippet from the **sp.storefront.debug.js** file:

```javascript
get_$57_3: function SP_Storefront_ManagementView$get_$57_3() {
    if (SP.ScriptUtility.isNullOrUndefined(this.$32_3)) {
        this.$32_3 = $get('ms-pageTitleCurrentNode');
    }
    return this.$32_3;
}
```


## Solution

This **ms-pageTitleCurrentNode** element gets automatically added on the page, when the content placeholder **PlaceHolderPageTitleInTitleArea** is visible.

So you have two options:

1.  Set the **Visible** property for the **PlaceHolderPageTitleInTitleArea** content placeholder to **False**;
2.  Add some extra HTML mark-up to your master page like this:

```html
<span id="ms-pageTitleCurrentNode" style="display:none;"></span>
```

I went for the last option, because I didn't need the other mark-up in my page.