---
title: 'Take your SharePoint social features to the next level with “I like it” and “Tags” counters: Part 1'
author: Elio Struyf
type: post
date: 2012-03-18T18:08:05+00:00
slug: /take-your-sharepoint-social-features-to-the-next-level-with-i-like-it-and-tags-counters-part-1/
Xylot:
  - http://www.xylos.com/blog/post/1229/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-1/
NBSQ:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-1.aspx
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-1.aspx
dsq_thread_id:
  - 3837103437
categories:
  - Development
  - SharePoint
tags:
  - Social Features
comments: true
---

Social media is a trending topic these days, more and more companies start to use it. As you may know, SharePoint 2010 also got social features like for example: tagging, I like it, social comments, etc.

But these social features are nothing compared to the social features like Facebook. When somebody "likes" a page or "tags" a page, it is not displayed to the other users. They can only see it when they click on the **Tags and Notes** button, or check the activity feed from a specific user on its My Site.

When you click on the **Tags and Notes** button, the following location will be opened in a dialog box: /_layouts/socialdataframe.aspx?Url=http://your_page&Title=Home&mode=0&IsDlg=1

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha1.png" "Social Data Frame"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAp0lEQVR4nFXOTQ6CMBAF4N7TRNZE1y5c6NLEC3gBT0UUQxNJC/JTW2hLp1ND3cCXWb3Fe0Out3t6uCT703a3umR/3qRH0nTCI4Y1jEnJa9L2Apwzxi5pYwJi9sxJ3fZSSmstgJ8c+MgBhBDygpJOjjjzE3gHOPdGsbwiatTLyT/vfQjhzSrCGqEGbSbnADCmq9cyygreUdaUvOafthdCquErlTb28aI/oLDYFkNDVDoAAAAASUVORK5CYII=" "374" "314" >}}

Another way to quickly check which tags have been created, is to navigate to the **Manage Social Tags and Notes** page. This page can be found here: Central Administration -> Manage service applications -> open your User Profile Service Application -> Manage Social Tags and Notes.

On this page you can create your own tagging queries.

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha2.png" "Social Tag Manager"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVR4nB3EAQ4EIQgEQf//2JUFRGbk9LJWOt3MTETM/TZAkEwA+NYysz9P72KqpqavuGlVnauNEXVx/cCaEQSRWFxnn+bumUlAc2kyYlQVgDnn3vsP/Rl0BjvfgtgAAAAASUVORK5CYII=" "605" "232" >}}

The previous page can only be accessed when you are a SharePoint administrator.

What I want to achieve with this blog post series is to create something like this:

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha3.png" "Page Tags"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/ADQ7Q19whWeEl36Qm6GgnqVqWo1rYrCzs7q7vF9fXwAxNjxMWWtLZXRgb3d7e3qBUUZvV1CJi4yRkZJQUVFftRs5zH3wgwAAAABJRU5ErkJggg==" "136" "29" >}}

This can be found on various platforms and allow your users to quickly see the total of tags/likes/tweets that have been made for the page.

For users this is a better approach, than when you need to click on a button to see the tagging results.

The first part of this blog post series describes how you can retrieve social tags by code.

## Retrieving tags by code

Tags can easily be retrieved by code. To do this you will need to use the SharePoint 2010 [SocialTagManger class](http://msdn.microsoft.com/en-us/library/microsoft.office.server.socialdata.socialtagmanager.aspx). This class contains a method called **GetTags** which can be used to retrieve the tags for a current page or user.

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha4.png" "Social Tag Methods"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZUlEQVR4nAXBTQ9AIAAA0P7/XzE3Qw42TcSmdaMPQiNcWpiz90CBsqYtGCPHIZ1bn9fez+7v7fsuKRkYRC8UH2clFNeLtpfdT2s241+v5wlAGEIY1HVKaY5xXFVJ1+W4jDknCEU//91LNehzUeMAAAAASUVORK5CYII=" "302" "78" >}}

As we want to show the total number of tags and likes that are related to the page, you could only use the method with the URI as parameter.

Here is an example how to retrieve the tags for each page from the Site Pages library in a console application.

```csharp
using System;
using System.Web;
using System.Linq;
using Microsoft.SharePoint;
using Microsoft.Office.Server.SocialData;
using Microsoft.SharePoint.Utilities;

namespace estruyf.SocialTagging
{
  class Program
  {
    static void Main(string[] args)
    {
      using (SPSite site = new SPSite(url))
      using (SPWeb web   = site.OpenWeb())
      {        
        SPServiceContext serviceContext = SPServiceContext.GetContext(site);
        SocialTagManager stm = new SocialTagManager(serviceContext);

        SPList list = web.Lists["Site Pages"];
        foreach (SPListItem item in list.Items)
        {
          Uri uri = new Uri(SPUtility.ConcatUrls(web.Url, item.Url));

          var itemTags = stm.GetTags(uri);

          Console.WriteLine();
          Console.WriteLine("-----------------------------------------------");
          Console.WriteLine(string.Format("Title: {0} - URL: {1}", item.DisplayName, uri.AbsoluteUri));
          Console.WriteLine("Tags: " + itemTags.Count(t => t.Term.Name.ToLower() != "i like it"));
          Console.WriteLine("Likes: " + itemTags.Count(t => t.Term.Name.ToLower() == "i like it"));
        }
      }
      Console.Read();
    }
  }
}
```

You will need to add the following references:

*   Microsoft.Office.Server;
*   Microsoft.Office.Server.UserProfiles;
*   Microsoft.SharePoint.Taxonomy.
My application output is the following:

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha5.png" "Social Tag Results"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAq0lEQVR4nB3G2wqCMBgA4L3/20SURUZEJzEhULswyMO8kbb9m/55mBss6Lv6yGJ19Pxos488P1xub+vd/XBOLmEWPt6na0SeaSz454vtrMdx7PU06GkwRhujhWAkTVPOBYAEkP9A3w/zbKy1EoAkcQwASinOedM0QghEtNY656SS5JVlqm0RUSnFGJNSIqLW2jnXdS0JgqAqS0ppVVVFnhd5Timtac0YK4viB4TEoWFT0yBLAAAAAElFTkSuQmCC" "448" "270" >}}

The problem is that only the items for the **current user** can be retrieved.

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha6.png" "Social Tag Method"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKElEQVR4nGM4c/7Sles3n718++zl2+ev3714/e7563fPXoG4z169BQCZ3RrhZb1hFwAAAABJRU5ErkJggg==" "497" "44" >}}

## Part 2

In part 2 I will show you a way to retrieve from all the users that tagged the page.