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

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha1.png" "Social Data Frame" >}}

Another way to quickly check which tags have been created, is to navigate to the **Manage Social Tags and Notes** page. This page can be found here: Central Administration -> Manage service applications -> open your User Profile Service Application -> Manage Social Tags and Notes.

On this page you can create your own tagging queries.

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha2.png" "Social Tag Manager" >}}

The previous page can only be accessed when you are a SharePoint administrator.

What I want to achieve with this blog post series is to create something like this:

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha3.png" "Page Tags" >}}

This can be found on various platforms and allow your users to quickly see the total of tags/likes/tweets that have been made for the page.

For users this is a better approach, than when you need to click on a button to see the tagging results.

The first part of this blog post series describes how you can retrieve social tags by code.

## Retrieving tags by code

Tags can easily be retrieved by code. To do this you will need to use the SharePoint 2010 [SocialTagManger class](http://msdn.microsoft.com/en-us/library/microsoft.office.server.socialdata.socialtagmanager.aspx). This class contains a method called **GetTags** which can be used to retrieve the tags for a current page or user.

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha4.png" "Social Tag Methods" >}}

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

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha5.png" "Social Tag Results" >}}

The problem is that only the items for the **current user** can be retrieved.

{{< caption-new "/uploads/2012/03/031812_1807_TakeyourSha6.png" "Social Tag Method" >}}

## Part 2

In part 2 I will show you a way to retrieve from all the users that tagged the page.