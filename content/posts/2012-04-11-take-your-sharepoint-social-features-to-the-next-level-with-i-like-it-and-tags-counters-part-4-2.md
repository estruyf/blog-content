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

{{< caption-new "/uploads/2012/04/040812_1804_TakeyourSha1.png" "Blog with social features"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeUlEQVR4nD3MQQ6CMBBG4d7/QhpNhAILFXXtKQTafzp1WmaMJvIt3+K5rvPXx/N4Ovt2bP3oh7sfbk0/HprLfte7twhyBcRkVan2V9W4qkMWVaNE0zIHxBACACJC4oXFIWUzS8zz9AIIPzHGnL/draqllMSpimznzQfC44vBaRX4HwAAAABJRU5ErkJggg==" "605" "322" >}}

First of all the reason why it is happening.

## Reason

A standard blog post URL in SharePoint looks like this: http://sp2010/Lists/Posts/Post.aspx?ID=1.

Using this URL on the **Manage Social Tags and Notes** page of my user profile service, it did not return any results.

{{< caption-new "/uploads/2012/04/040812_1804_TakeyourSha2.png" "Posts Query"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATUlEQVR4nCXLURKAIAgFQO9/S3/zKZjUgIg1U/u/yd1FJOcMVACtkapFrOeTxpBLLiZCrQVg7kxccTSUzpTOcaua+9qx/xER08zUps0XhUtWCIhSVaIAAAAASUVORK5CYII=" "605" "175" >}}

Normally it should return the following items:

{{< caption-new "/uploads/2012/04/040812_1804_TakeyourSha3.png" "Blog post tags"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUElEQVR4nAXBgQrAIAgFwP7/M8dgBJtKL7M0Y3eFRYiFiMbQyIy9d8TJPOdkZmGMi+3++sOobYpIZfTpZubuRc1J/e3+arAuAGKBMYG21voBpEVWFc+i45gAAAAASUVORK5CYII=" "362" "103" >}}

When I did a query for all the tags from a specific user, I noticed something interesting:

{{< caption-new "/uploads/2012/04/040812_1804_TakeyourSha4.png" "ViewPost Reference"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAX0lEQVR4nBXBQRICIQwEQP7/TteLriGQhMwAYtldANQq1/VQbfJX3T1HTHLvXbRZJphwc4xEolWV+1YRAiXGALjW4tqBHdxzfc85IAEWM2u9u5lhvp0fhzxfXW2AEfED0tRzIwB5MWkAAAAASUVORK5CYII=" "605" "262" >}}

The tags are not linked to the Post.aspx page, but to the **ViewPost.aspx** page: http://sp2010/Lists/Posts/ViewPost.aspx?ID=1.

When I checked the URL of the Social Data Frame, I saw that it also used the **ViewPost.aspx** page as reference.

## Solution

The solution is very simple, you only need to replace the Post.aspx from the URL path with ViewPost.aspx.

Here is the code to do this:

```csharp
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
```

Here you can find the whole code:

[SocialFeatures Code](/uploads/2012/04/SocialFeatures-Part4-Code.txt)

## Result

{{< caption-new "/uploads/2012/04/040812_1804_TakeyourSha5.png" "Blog post tags end result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nD3MMQ7CMAxA0dz/RkQC0gIC2kqsnKKQ2HHcxLJRBvrGP3w3DuH5evvjYwhTCHO4LuGynMf5cLp7f3MsgiwAm1XRTexP1IqoQ66qmil/YgTElBIgYkakEqk6JDYzovJd19xzBwDMvTtRba1RKVLbft79ALy8i7WXZoTWAAAAAElFTkSuQmCC" "605" "321" >}}