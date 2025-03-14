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
{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate1.png" "Out-of-the-box site layouts"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAvUlEQVR4nE2OzW6DQAyE9/2frQqHkm2bH6EAgSZVVBRgsT27drQhh3zSnDwzHkdEy0IQYRYAEbA33G/fl5/luW28//b+q64bM0spqaqZOgGmOYzznLOIMcaUkqlWt9ANiwPQdNdj3SEmU1PVlHNWtOPPZXREJMIiRMxP8cow0X0mJxDCX+DL+6IVALk8Rgg4/3wtyqiaCBwzn9pzeawPbX/7H9bT6mAWxyxVVe32+49NUW699/4+TkQcwkJEDyl6AkZzHI+WAAAAAElFTkSuQmCC" "152" "133" >}}

## Where to start?

### Step 1

The first thing you need to do is creating a new master page. This can be done in SharePoint Designer 2013 by navigating to the **Master Page**s section.

You should see the following files:

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate2.png" "Catalogs files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAIAAADt1dgcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABnklEQVR4nE2P23KbMABE+f//6A/0rY9NO01jB0GMg20CCN1A4ioJsAGDyDh2Z7qvO7t71iIpf/cPQRB9hPFHCCFCe38X46ySbV5rK4ix559OET6cojfv4B3CDdhvHD+IWQRTC7ies/NPIdzvPeCAvxv7Fbgv29eN7QL7zQL29sf3by9/fgJ764Ct67wCsHn3HH/v7NytNZu1I7/C4AhFR3MVkkrUnVkfshazluQJJUckOsKbiNVF09f6XOuz7gfLmDVlYYgQEW1aaCxkXne6H1U3dJfplmbETnCU8JbmiuQqLfUwzY9yY1bGYkhowjUREnEp28t1XsxNX9s8dRMS3bdh2vCq5XV7Hq4PNEZhjBniCvMm4bK7TMM4T9fZGGMty5qxJ0SOCe8QbxCXWEiaK8TldF2seVlF9oxpgMTNJkKyQjftpVT9ck+n7DdmAeQtZBXNFS30NC8P8luaPxMa4Lz/Km/itMlKXaqzuaOlDEeIZlVHhNTncZzmYbxexn/kECYxzrBQvGqNWe+P/y93aAZZ2dNCsUJnpc6b7m5/AkOY6+RH9lQjAAAAAElFTkSuQmCC" "193" "343" >}}

The easiest way to start is by creating a copy from v15.master or belltown.master. If you want, you could change some code in the copied master page, but this will not be covered in this blog post.

When you now go back to the **Site Settings** > **Change the look** > **Select a composed look**, you will notice that the master page is not available yet in the **Site Layout** menu.

### Step 2

Like I mentioned in one of my previous posts, a lot has been changed for the themes. The master pages now work with a **preview** file that is used to render the site preview on the **Change the look** page.

Navigate to **Site Settings** > **Master Pages**, there you see that each default master page now has a file with **.preview** as extension.

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate3.png" "Master page preview file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVR4nDXLyQqAIBRAUf///1oVmCVOmZb5nAJfFHS3h0uMNpuxiNh7R0Tr/CI05XKYWEyFxJgAEv6V2iAXyOW8oLabhJiPAN/98u485YoJNc6rtP4BjB9VZ0vQmyQAAAAASUVORK5CYII=" "178" "60" >}}

Download and open the for example the v15.preview file. This downloaded preview file contains CSS and HTML code to render the preview site image.

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate4.png" "Site Preview"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgklEQVR4nE3KyQrCMBAG4Lz/s3kRBMGTVIUu6XQmTWLSzCK1l363f3GwWyh2I1zf/cXjDcKd0mNN0zSBCyGklGptpXDObdvU1Erlb21m6p6fF6Xe1GLOM4VhBopxBPQY9hmJGlczE1FmrlsTUcB18IuqOkTUPzthERYxM3fk43F2lD8iw61ys83eZAAAAABJRU5ErkJggg==" "900" "532" >}}

### Step 3

Rename the downloaded file with the same name you gave your new master page and upload it to the Master Page library.

You should have something like this:

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate5.png" "Custom Preview File and Master Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUUlEQVR4nD3L3QqAIAxAYd//GbvyJ92S1E2bglJQ0Ln9OIq5Ihz325zTeHQQjcdN7zKGEhEi/nitdeaSqWbimIr0odrVM7X/dgEtRBtQ75AKP4wQVWNocpQHAAAAAElFTkSuQmCC" "195" "62" >}}

### Step 4

Go back to **Site Settings** > **Change the look** > **Select a composed look**.

When you check the **Site Layout** menu, you should now see that your master page has been added.

{{< caption-new "/uploads/2012/08/081612_1934_HowtoCreate6.png" "Custom Master Page Available in Site Layouts"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0ElEQVR4nG2O626DMAxG8/5vt00UlIqma4C5IbBSLvEloVPXqkLTjj75h49sfQoAKls75wDAt/4yXG8bFAA0zVffdfZk67ryXb+ua4wJOZJEJSInaMv6/D3Oj4v1dxbnOWsGhYjg/Gfj2v4iInxHosi+XbSbVAg0LWFaQkpJ7vtnmAURFROB763rto0eiIhi4jnguCASi8StZhaFIeS63BVGHys/jK9qT83GJK2TMbfD4Z/nlOf7jzzTx+nt/Y9mERVshdku5AWWhliI+BVm/gFidTrm7mNbVgAAAABJRU5ErkJggg==" "148" "160" >}}

## Recap

To be able to make use of your master page in the Site Layouts menu, you need to create a preview file for the master page. It will be your choice if you want to change the preview files content to match your design, but normally know what it looks like, so I would say to use a default preview file.

Of course if you are creating themes and master pages for clients, it is a good thing to let the preview file match to your design.