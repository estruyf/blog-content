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

{{< caption-legacy "uploads/2014/01/011614_1122_MissingtheA1.png" "Noteworthy Apps" >}}

The sites on which this problem occurs have custom branding applied. On the standard OOTB master pages, the problem doesn't occur. This means that it would be a problem with the custom branding itself that I implemented.

I thought of two possibilities:

1.  Or it's CSS related, it could be that I hidden something to much;
2.  Or it's a content placeholder that's hidden.

## Investigation

A quick look to the HTML of the page showed me that it wasn't a CSS related problem, because the **Apps you can add** HTML mark-up wasn't there. This meant that it had to be a content placeholder that I had hidden.

The second thing I did was setting the **Visible** property of all the content placeholders to **True** that were hidden. This way you can quickly see if it's a content placeholder problem.

{{< caption-legacy "uploads/2014/01/011614_1122_MissingtheA2.png" "Content Placeholders" >}}

After a page refresh, the **Apps you can add** zone became visible:

{{< caption-legacy "uploads/2014/01/011614_1122_MissingtheA3.png" "Apps you can add" >}}

Next thing to do is finding which content placeholder is causing this problem. Eventually it turned out that the problem occurred by the content placeholder **PlaceHolderPageTitleInTitleArea** that was hidden. What doesn't make sense at first, because the **Apps you can add** zone is not added via this content placeholder.

I debugged the **sp.storefront.debug.js** file, and in that file I saw that **Apps you can add** zone requires a HTML element with the following ID **ms-pageTitleCurrentNode**. It doesn't matter where this is located in the page, it just need to be there.

Here is the code snippet from the **sp.storefront.debug.js** file:

{{< highlight javascript "linenos=table,noclasses=false" >}}
get_$57_3: function SP_Storefront_ManagementView$get_$57_3() {
    if (SP.ScriptUtility.isNullOrUndefined(this.$32_3)) {
        this.$32_3 = $get('ms-pageTitleCurrentNode');
    }
    return this.$32_3;
}
{{< / highlight >}}


## Solution

This **ms-pageTitleCurrentNode** element gets automatically added on the page, when the content placeholder **PlaceHolderPageTitleInTitleArea** is visible.

So you have two options:

1.  Set the **Visible** property for the **PlaceHolderPageTitleInTitleArea** content placeholder to **False**;
2.  Add some extra HTML mark-up to your master page like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<span id="ms-pageTitleCurrentNode" style="display:none;"></span>
{{< / highlight >}}

I went for the last option, because I didn't need the other mark-up in my page.