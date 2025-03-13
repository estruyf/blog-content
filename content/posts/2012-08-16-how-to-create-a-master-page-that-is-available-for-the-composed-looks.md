---
title: How to Create a Master Page that is Available for the Composed Looks
author: Elio Struyf
type: post
date: 2012-08-16T19:35:31+00:00
slug: /how-to-create-a-master-page-that-is-available-for-the-composed-looks/
dsq_thread_id:
  - 3836445556
categories:
  - Branding
  - Master Page
  - SharePoint 2013
  - Styling
tags:
  - Composed Looks
  - Master Page
  - SharePoint Designer
  - Styling
  - Themes
comments: true
---

In this post I will show you how you can create a new master page that can be selected in the Site Layouts menu when you are changing the look of your site (Site Settings > Change the look).

One part that I did not cover yet, is the **Site Layouts** option in the Composed Looks (**Site Settings** > **Change the look** > **Select a composed look**) and how you can add other layouts to it.

In SharePoint 2013 you have the option to choose a different master page to be used as site layout.

By default you have the following two options:

1.  V15
2.  Belltown
{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate1.png" "Out-of-the-box site layouts" >}}

## Where to start?

### Step 1

The first thing you need to do is creating a new master page. This can be done in SharePoint Designer 2013 by navigating to the **Master Page**s section.

You should see the following files:

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate2.png" "Catalogs files" >}}

The easiest way to start is by creating a copy from v15.master or belltown.master. If you want, you could change some code in the copied master page, but this will not be covered in this blog post.

When you now go back to the **Site Settings** > **Change the look** > **Select a composed look**, you will notice that the master page is not available yet in the **Site Layout** menu.

### Step 2

Like I mentioned in one of my previous posts, a lot has been changed for the themes. The master pages now work with a **preview** file that is used to render the site preview on the **Change the look** page.

Navigate to **Site Settings** > **Master Pages**, there you see that each default master page now has a file with **.preview** as extension.

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate3.png" "Master page preview file" >}}

Download and open the for example the v15.preview file. This downloaded preview file contains CSS and HTML code to render the preview site image.

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate4.png" "Site Preview" >}}

### Step 3

Rename the downloaded file with the same name you gave your new master page and upload it to the Master Page library.

You should have something like this:

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate5.png" "Custom Preview File and Master Page" >}}

### Step 4

Go back to **Site Settings** > **Change the look** > **Select a composed look**.

When you check the **Site Layout** menu, you should now see that your master page has been added.

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate6.png" "Custom Master Page Available in Site Layouts" >}}

## Recap

To be able to make use of your master page in the Site Layouts menu, you need to create a preview file for the master page. It will be your choice if you want to change the preview files content to match your design, but normally know what it looks like, so I would say to use a default preview file.

Of course if you are creating themes and master pages for clients, it is a good thing to let the preview file match to your design.