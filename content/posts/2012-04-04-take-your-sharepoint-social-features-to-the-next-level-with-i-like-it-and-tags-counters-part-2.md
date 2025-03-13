---
title: 'Take your SharePoint social features to the next level with “I like it” and “Tags” counters: Part 2'
author: Elio Struyf
type: post
date: 2012-04-04T08:00:54+00:00
slug: /take-your-sharepoint-social-features-to-the-next-level-with-i-like-it-and-tags-counters-part-2/
Xylot:
  - http://www.xylos.com/blog/post/1239/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-2/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-2.aspx
dsq_thread_id:
  - 3836444843
categories:
  - Development
  - SharePoint
tags:
  - Social Features
comments: true
---

In the previous part I talked about retrieving the number of tags by code. The problem was that the **GetTags **method from the **SocialTagManager** class, could only retrieve tags from a specific user.

In this part I show you a way to retrieve the all the tags for a specific location/page.

## Decompile

My first step was to check the SocialTagManager class to see the code of the GetTags methods. The SocialTagManager class can be found in the **Microsoft.Office.Server.UserProfiles.dll**.

{{< caption-new "/uploads/2012/03/032712_0950_TakeyourSha1.png" "SocialTagManager" >}}

The SocialTagManager class contains 13 GetTags methods, and only four of them are public.

{{< caption-new "/uploads/2012/03/032712_0950_TakeyourSha2.png" "GetTags Methods" >}}

The method that could retrieve all the tags (a maximum of 1000) is the following **GetTags(Uri url, Int32 maximumItemsToReturn, SocialItemPrivacy socialItemPrivacy)**.

{{< caption-new "/uploads/2012/03/032712_0950_TakeyourSha3.png" "Internal GetTags Method" >}}

It seems that this method does not use the current user of a specific user to filter the tags. The only problem is that this is an internal method.

The solution is to use reflection, this will allow you to make use of the **GetTags(Uri url, Int32 maximumItemsToReturn, SocialItemPrivacy socialItemPrivacy)** method.

## Reflection

More information about reflection can be found [here](http://msdn.microsoft.com/en-us/library/4d848zkb.aspx).

The first thing you need to do is retrieving all the nonpublic methods of your SocialTagManager class. This can be done as follows:

```csharp
// Retrieve the type of the SocialTagManager
var type = typeof(SocialTagManager);
// Get the nonpublic methods
MethodInfo[] methods = type.GetMethods(BindingFlags.NonPublic ' BindingFlags.Instance ' BindingFlags.DeclaredOnly);
```

Now that you got all the nonpublic methods, you can retrieve the GetTags method. I used the following statement to do this:

```csharp
MethodInfo method = methods.First(m => m.ToString() == "Microsoft.Office.Server.SocialData.SocialTag[] GetTags(System.Uri, Int32, Microsoft.Office.Server.SocialData.SocialItemPrivacy)");
if (method != null)
{
}
```

The only thing that rests is to invoke the retrieved GetTags method. This can be done like this:

```csharp
var itemTags = (SocialTag[])method.Invoke(stm, new object[] { uri, 1000, SocialItemPrivacy.PublicOnly });
```

When you use these code snippets in the console application from part 1, you should now get other results for the items (if you have enough tags, and likes).

{{< caption-new "/uploads/2012/03/032712_0950_TakeyourSha4.png" "Reflection GetTags Method Result" >}}

When you compare this result with the first part, you can see that "How To Use This Library" has 2 likes more than in the first part.

{{< caption-new "/uploads/2012/03/032712_0950_TakeyourSha5.png" "Social Tags" >}}

## Complete Source Code

[GetTags Code](/uploads/2012/03/GetTagsReflection.txt)

## Part 3

In the next part I will show you how you can put this in a usercontrol, so that these results can be displayed on all your pages.