---
title: Things you need to know about anonymous permissions with the cross-site publishing functionality
author: Elio Struyf
type: post
date: 2014-03-03T07:45:15+00:00
slug: /things-need-know-anonymous-permissions-cross-site-publishing-functionality/
dsq_thread_id:
  - 3836535537
categories:
  - Cross-site Publishing
  - SharePoint 2013
tags:
  - Cross-site Publishing
  - Navigation
  - Page Layouts
comments: true
---

Working with cross-site publishing in SharePoint can be fun, but it can also give you some headaches. One of the things were it can go wrong is the permissions, it all seems very simple just some clicking in the UI and you're all set. That is correct, but what happens if it goes wrong? This week I had a couple issues with anonymous access on my public site. No navigation was available for anonymous users, the pages weren't accessible. Based on the troubleshooting of these issues I created this post to show you the things for which you need to pay attention to.

## Setting anonymous access for the catalog

Setting anonymous access to your catalog list or library for the search application is very simple, all you need to do is to click one button (or two, there's another one in the dialog), to activate it. But this is where it could go wrong for the first time, at least for me.

To enable it, go to the list or library settings, and click on **Catalog Settings**. On the catalog settings page, you click on the **Enable anonymous access**, and in the dialog that opens, you click on **Make Anonymous** button.

{{< caption-new "/uploads/2014/03/030314_0745_Thingsyoune1.png" "Enable anonymous access" >}}

If this is enabled, and you see that your items aren't accessible for your anonymous users on the public site, you should check if the following permission masks are correctly set:

*   Web: **AnonymousSearchAccessWebLists**
*   List: **AnonymousSearchAccessList**
This was the first problem I experienced, on my site the anonymous permission mask on the web wasn't automatically set. This were the settings on my site:

{{< caption-new "/uploads/2014/03/030314_0745_Thingsyoune2.png" "Incorrect permissions" >}}

I remove the anonymous access on the catalog and reactivated it again, and the correct permission masks were set.

You can check the permissions via this script:

```html
$web = Get-SPWeb -Identity your-catalog-web-url
$list = $web.Lists["your-catalog"]

write-host "------------------------------------------------------------"
write-host "Web anonymous permission mask:" $web.AnonymousPermMask64
write-host "List has unique permissions:" $list.HasUniqueRoleAssignments
write-host "List anonymous permission mask:" $list.AnonymousPermMask64
write-host "------------------------------------------------------------"

$web.Dispose()
```

The output of this script should be like this:

{{< caption-new "/uploads/2014/03/030314_0745_Thingsyoune3.png" "Correct permissions" >}}

## Navigation isn't visible for anonymous users, how to enable it?

The next problem you could run in to, is the navigation. If you connect your site with the catalog, you will have the option to include the navigation based on the term set of the catalog. There are still things to do on your site before the anonymous users can see this navigation.

First, check if anonymous access to the site is in place:

{{< caption-new "/uploads/2014/03/030314_0745_Thingsyoune4.png" "Anonymous permissions" >}}

Check if the catalog page layouts are published (_catalogs/masterpage), the default ones are:

*   `Category-<your-term-set>.html`
*   `CategoryItem-<your-term-set>.html`

The last thing to check are the catalog pages, the category and item pages in the page library of the site (/pages) should also be published, and don't contain unique permissions:

*   `Category-<your-term-set>.aspx`
*   `CatalogItem-<your-term-set>.aspx`

Once these things are in place, the navigation should become available for the anonymous users.