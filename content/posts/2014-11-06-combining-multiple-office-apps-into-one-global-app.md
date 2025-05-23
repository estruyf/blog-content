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

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp1.png" "Office App shapes"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVR4nDXEOxKDIBAAUO5/jlwgF4mmCykEVpavG9YZxE4yMeMrnpD3W0Rbt21ZltZa7/04jn4RW7QfIua1lFKYa637pbUmXlIOw2Mcn+qEFokon4hIJDOBmqR82795BgCjjdEm5yzSrEEpbUyMMYRw9pNiYmahMUxKA4D3wXuP6JxzaG3OmVf+AvReo6y+Ihm6AAAAAElFTkSuQmCC" "447" "282" >}}

Each of these app shape types is designed for a specific application. For example the mail type is only for Outlook and cannot be used for Word, PowerPoint, and Excel.

If you create an app in Visual Studio, it will always create two projects, an Office Manifest project and a website. But what if you want to create an app that should do exactly the same thing in a mail context as in a task pane app context?

You could of course create two apps, but that also requires you to run two website instances. Now you can also do it with only one website. In the next sections I describe how I have achieved this.

## Explaining how it can be achieved

First of all you need to add a new app shape to your existing app project. In this example I have already a mail app created. Here is how my app project looks like in Visual Studio:

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp2.png" "Office app solution"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nAFdAKL/AIKx4IO47Xi7/ni6+3q7/Ha4/He5+3W4+3y8/HG2/ADV3+nGx8zDzdjEz9zG0t7CztnEz9vZ5vLj7vfd6vYA8vHv3uDY5uPh6ebk6ufl5uTi8O3r+/j2+Pf1+vf1vHlKkWntL+gAAAAASUVORK5CYII=" "246" "66" >}}

Now when you add a new app shape to the existing project (for example a task pane app) you get the following result:

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp3.png" "Office app solution with two apps"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgElEQVR4nB3BsQrCMBAA0PyzoxUHh+IHiaaTToIgWk0uyXXQNi0Bi9C05rJkEH2PrTfPnL+yIi44LQvKdmHO42qf8kOabRNzXYfnE4BRGhErIaSQehinQDRMgTnXlpejvAslQSsAgNu1NIje+0jE+nevH6b5sa21dd14P37+QghfcG1lRgDsPwQAAAAASUVORK5CYII=" "254" "102" >}}

As you can see, another website (**Office-Demo-OfficeAppWeb**) is created for the new app. This website can be removed. Once the app website is removed from your solution, the reference for the app manifest will also be removed.

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp4.png" "Web project reference removed"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA60lEQVR4nBXLTUvDMBgA4PzSXVQQdtJfI16FigxkiJcJKnjaSWedSW3r1jVJ3zTpR7IkLXXDic/9Qee3ZDz5HF0tjoLw5AaPAnw8SU+n2fhuc3afo0XE3r/rDMwX3ebCurbZ991h//O7G3Z9hx7C6vKZBfPq4qW6npcYR7wQOeUFlFXdIgk8xR8K8sE1g9OEEFlK771zznuPKOUYR1Kqrh8arZM4BhBt2xpjrLUIQKxW67qurbXGGEopAHDOsmwjpUKM8TRJoQCllNaaU8Y5FyCsdf+bvr6Rx6cqXA7rzJBoOZuxOCkAnLXO+T8tQs935Ouo6AAAAABJRU5ErkJggg==" "385" "303" >}}

What you have to do is set it to the website in your current project. You can do this in the properties window of the app manifest project.

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp5.png" "Web project reference "  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA6UlEQVR4nB3BTU7CQBgA0DmocaErViSewWt0owuNRGIicWUsHAFqh6nUCjNfv2k7nZ8itBRSauJ75GZMB0/04m5+eb+4fqRXD3QwjocTPpzw23dOEEBl+Wlruvr33Oy7XdWfDn137M/Hw35HNgLnizBafXNAARhSBjLbCEhlXhpHUsAwCECAs9ZZu6S0KIr6n6u2hHP4DAKlVNu2lXMRYwBQlqXRWmtLpMyTJFGqtNZWVYWIWZankIIQiBkRHCIWSZRGa2vt+mctuMAUm7pxbkumH8x7XnovsfcqRm/xajZjvv/lT2ujlTZ/lbXO+kvSn7kAAAAASUVORK5CYII=" "387" "303" >}}

Once this is done, your two app manifests reference the same app website. If you do a test run, your mail app and task pane app should show the same page:

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp6.png" "App loaded in OWA and Excel"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVR4nAF8AIP/AKHL6aLL6b3Y6/358+zy9fb3+P37+f799////fr7+wDZ6vaLwOWHwOh5uObI4fL//fuoz+qEveOIv+es0OkA3uz1o8rmp8znr9Pv2ev2/v37sNHqirzhjsLmq9DrAP7+/f78+P78+f////D3+/f4+f79+v/9+f///fv7/CYbaatC5obWAAAAAElFTkSuQmCC" "896" "383" >}}

Now depending on the app type you choose, you could do different things with the Office API. Like for example within a mail app you can add attachments to your mails, but adding attachments cannot be done in a task pane app because they are designed for Word, PowerPoint, Excel, and Project.

There is another thing, not all the apps have the same dimensions. So you need to direct your client to the correct location on your site for that app shape or type.

## Adding redirection to your app

If you are working with different app shape dimensions, it is best that you create a page per type of app. In my example I have created a page for my mail app, and my task pane app. The routing to the correct page can be done in different ways. The simplest way to do it is to change the URL in the app manifests.

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp7.png" "Source location"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAkUlEQVR4nDXN2wqDQAwE0P3/LyyV0mKL3ah7mySbFX0orvQ8DWSGuLkjonVdAZRcUGBmrXPe+5QSEQEQEe6kY+brnGOMANdqZlY7rVW1uhgCep9Zt23b/47jaNZcCgE57832Zu0cn1S1lOK9d/MwLK/x+fjcbyNNi2iDWIHGhDlkR/4bU35N65sSy/lPREX0Cj/4YMXcO0KAEwAAAABJRU5ErkJggg==" "715" "517" >}}

The downside of this approach is that if you need to use Azure AD authentication, the redirect URL will be the same for the two app shapes. So you best do the redirection for your app via code.

My approach is to first add a query string parameter "office" to the source location of my app manifest of your task pane app like this:

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp8.png" "Source location with query string parameter"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJklEQVR4nGN49fr1s2fPXjx/8enTp5cvX7188fLli5cvwOSHDx8BqNkbdG5VebMAAAAASUVORK5CYII=" "327" "40" >}}

> **Note**: if you are working with two app manifests, you only need to do this in one app manifest. If you are combining more, you should do add some other query string parameters to the other manifest.

By adding a query string parameter the landing page stays the same in the two manifests, but you have something you can use to check from what context your app gets loaded.

The first thing to do in code is to check if the query string parameter is in place, and if that is true, store that in a session. By storing it in a session, you can easily check it in a later step of your code in which context your app is running.

```javascript
if (office !== null)
{
  Session["Office"] = true;
}
```

The redirection can be achieved by checking if the office variable is stored in the session.

```javascript
var officeClient = Session["Office"];
return RedirectToAction(officeClient != null ? "Office" : "Mail");
```

I used this approach to create an app that needed to work in Outlook and Word. It also used Azure AD authentication. This way I only needed to register only one app in Azure AD and if the token got retrieved, my app redirected the client to the correct page.

{{< caption-new "/uploads/2014/11/110614_1622_Createanapp9.png" "App opened in OWA and Excel"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVR4nAF8AIP/APf6/KjO6qTN66XP7bDV7+7y9Pbbz/PXy/razvbl3wD0+Pt/ueJzst9xsuCNx+3u5uXvaz7tYTLwXCrvjm4A/f39+vf1+fXy//37+v3/7fT38Ovq8e7t/vv6+vb0AP7+/v7+//7///////f7/u70+Pr6+vT29vz8/fv7+1CtaLUiXphfAAAAAElFTkSuQmCC" "834" "347" >}}

By implementing something like this, you could easily combine apps into one global app site and let them use the same code base.