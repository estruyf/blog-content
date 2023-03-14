---
title: Combining multiple Office Apps into one global add-in
author: Elio Struyf
type: post
date: 2014-11-06T16:22:50+00:00
slug: /combining-multiple-office-apps-into-one-global-app/
dsq_thread_id:
  - 3840585500
categories:
  - Apps
  - Office
  - Office 365
tags:
  - Apps
  - Excel
  - JavaScript
  - Office
  - Office App
  - Outlook
  - OWA
  - PowerPoint
  - Project
  - Word
comments: true
---

The first thing when you create a new Office App is that you have to choose which type of app you want to create. You have the following app shape types you can choose of:

*   Task pane
*   Content
*   Mail

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp1.png" "Office App shapes" >}}

Each of these app shape types is designed for a specific application. For example the mail type is only for Outlook and cannot be used for Word, PowerPoint, and Excel.

If you create an app in Visual Studio, it will always create two projects, an Office Manifest project and a website. But what if you want to create an app that should do exactly the same thing in a mail context as in a task pane app context?

You could of course create two apps, but that also requires you to run two website instances. Now you can also do it with only one website. In the next sections I describe how I have achieved this.

## Explaining how it can be achieved

First of all you need to add a new app shape to your existing app project. In this example I have already a mail app created. Here is how my app project looks like in Visual Studio:

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp2.png" "Office app solution" >}}

Now when you add a new app shape to the existing project (for example a task pane app) you get the following result:

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp3.png" "Office app solution with two apps" >}}

As you can see, another website (**Office-Demo-OfficeAppWeb**) is created for the new app. This website can be removed. Once the app website is removed from your solution, the reference for the app manifest will also be removed.

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp4.png" "Web project reference removed" >}}

What you have to do is set it to the website in your current project. You can do this in the properties window of the app manifest project.

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp5.png" "Web project reference " >}}

Once this is done, your two app manifests reference the same app website. If you do a test run, your mail app and task pane app should show the same page:

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp6.png" "App loaded in OWA and Excel" >}}

Now depending on the app type you choose, you could do different things with the Office API. Like for example within a mail app you can add attachments to your mails, but adding attachments cannot be done in a task pane app because they are designed for Word, PowerPoint, Excel, and Project.

There is another thing, not all the apps have the same dimensions. So you need to direct your client to the correct location on your site for that app shape or type.

## Adding redirection to your app

If you are working with different app shape dimensions, it is best that you create a page per type of app. In my example I have created a page for my mail app, and my task pane app. The routing to the correct page can be done in different ways. The simplest way to do it is to change the URL in the app manifests.

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp7.png" "Source location" >}}

The downside of this approach is that if you need to use Azure AD authentication, the redirect URL will be the same for the two app shapes. So you best do the redirection for your app via code.

My approach is to first add a query string parameter "office" to the source location of my app manifest of your task pane app like this:

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp8.png" "Source location with query string parameter" >}}

> **Note**: if you are working with two app manifests, you only need to do this in one app manifest. If you are combining more, you should do add some other query string parameters to the other manifest.

By adding a query string parameter the landing page stays the same in the two manifests, but you have something you can use to check from what context your app gets loaded.

The first thing to do in code is to check if the query string parameter is in place, and if that is true, store that in a session. By storing it in a session, you can easily check it in a later step of your code in which context your app is running.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
if (office !== null)
{
  Session["Office"] = true;
}
{{< / highlight >}}

The redirection can be achieved by checking if the office variable is stored in the session.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
var officeClient = Session["Office"];
return RedirectToAction(officeClient != null ? "Office" : "Mail");
{{< / highlight >}}

I used this approach to create an app that needed to work in Outlook and Word. It also used Azure AD authentication. This way I only needed to register only one app in Azure AD and if the token got retrieved, my app redirected the client to the correct page.

{{< caption-legacy "uploads/2014/11/110614_1622_Createanapp9.png" "App opened in OWA and Excel" >}}

By implementing something like this, you could easily combine apps into one global app site and let them use the same code base.