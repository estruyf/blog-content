---
title: 'Take your SharePoint social features to the next level with “I like it” and “Tags” counters: Part 4'
author: Elio Struyf
type: post
date: 2012-04-11T08:18:29+00:00
slug: /take-your-sharepoint-social-features-to-the-next-level-with-i-like-it-and-tags-counters-part-4-2/
Xylot:
  - http://www.xylos.com/blog/post/1255/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-4/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-4.aspx
dsq_thread_id:
  - 3836446633
categories:
  - Development
  - SharePoint
tags:
  - Social Features
comments: true
---

My intention was to write three blog posts on this topic, but a commenter told me that a problem arises with blog post items. The counters always return zero.

In this part I will show you why this is happening and what you could do to solve this.

{{< caption-legacy "uploads/2012/04/040812_1804_TakeyourSha1.png" "Blog with social features" >}}

First of all the reason why it is happening.

## Reason

A standard blog post URL in SharePoint looks like this: http://sp2010/Lists/Posts/Post.aspx?ID=1.

Using this URL on the **Manage Social Tags and Notes** page of my user profile service, it did not return any results.

{{< caption-legacy "uploads/2012/04/040812_1804_TakeyourSha2.png" "Posts Query" >}}

Normally it should return the following items:

{{< caption-legacy "uploads/2012/04/040812_1804_TakeyourSha3.png" "Blog post tags" >}}

When I did a query for all the tags from a specific user, I noticed something interesting:

{{< caption-legacy "uploads/2012/04/040812_1804_TakeyourSha4.png" "ViewPost Reference" >}}

The tags are not linked to the Post.aspx page, but to the **ViewPost.aspx** page: http://sp2010/Lists/Posts/ViewPost.aspx?ID=1.

When I checked the URL of the Social Data Frame, I saw that it also used the **ViewPost.aspx** page as reference.

## Solution

The solution is very simple, you only need to replace the Post.aspx from the URL path with ViewPost.aspx.

Here is the code to do this:

{{< highlight csharp "linenos=table,noclasses=false" >}}
// Get page URL
Uri uri = this.Page.Request.Url;
// Check if it is a blog post
if (-1 == uri.AbsoluteUri.IndexOf("post.aspx", StringComparison.OrdinalIgnoreCase))
{
  // Check if page is welcome page
  string root = web.RootFolder.WelcomePage;
  // Check if welcome page is not empty
  if (!string.IsNullOrEmpty(root))
  {
    if (uri.AbsoluteUri.Contains(root))
    {
      uri = new Uri(SPContext.Current.Web.Url);
    }
  }
}
else
{
  uri = new Uri(uri.AbsoluteUri.Replace("Post.aspx", "ViewPost.aspx"));
}
{{< / highlight >}}

Here you can find the whole code:

[SocialFeatures Code](/uploads/2012/04/SocialFeatures-Part4-Code.txt)

## Result

{{< caption-legacy "uploads/2012/04/040812_1804_TakeyourSha5.png" "Blog post tags end result" >}}