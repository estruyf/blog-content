---
title: What makes a page to be a news page on SharePoint Online
author: Elio Struyf
type: post
date: 2016-10-28T15:02:36+00:00
slug: /what-makes-a-page-to-be-a-news-page-on-sharepoint-online/
dsq_thread_id:
  - 5260556435
categories:
  - Office 365
  - SharePoint
tags:
  - Office 365
  - Team news
comments: true
---

Yesterday our tenant got the new team news functionality. This functionality allows you to write news in your team site which gets published on the homepage or via the new news headlines web part.

{{< caption-new "/uploads/2016/10/102816_1451_Whatmakesap1.png" "Team news functionality" >}}

> **Info**: SharePoint Online "team news" begins roll out to Office 365 First Release customers - [https://techcommunity.microsoft.com/t5/SharePoint-Blog/SharePoint-Online-team-news-begins-roll-out-to-Office-365-First/ba-p/22763](https://techcommunity.microsoft.com/t5/SharePoint-Blog/SharePoint-Online-team-news-begins-roll-out-to-Office-365-First/ba-p/22763)

As I started testing out the news page functionality. I questioned myself how they achieved it, because creating a new news page redirects you to the same URL as for creating a new site page.

> **Info**: New page URL - https://tenant.sharepoint.com/sites/Team/SitePages/newpage.aspx?Mode=Edit

Both pages also look the same:

{{< caption-new "/uploads/2016/10/102816_1451_Whatmakesap2.png" "News page and site page layout" >}}

So, as they look and feel the same, where is the difference? You would think metadata, and this in fact true, but you cannot see it from the UI. If you would check the properties from the UI, you will only see its Title and Name. Now, when you open the content type of the page which is **Site Page** (also for the news pages). You will see the following metadata fields:

{{< caption-new "/uploads/2016/10/102816_1451_Whatmakesap3.png" "Site page content type" >}}

Here you find the answer. There are a couple of metadata fields which are hidden from the UI like **Promoted State** and **First Published Date**. When you check the contents of the ASPX page. You will see a couple of differences between the two types of pages.

**News page**

```html
<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebControls.ClientSidePage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"><head>
<!--[if gte mso 9]><SharePoint:CTFieldRefs runat=server Prefix="mso:" FieldList="FileLeafRef,ClientSideApplicationId,PageLayoutType,CanvasContent1,BannerImageUrl,BannerImageOffset,PromotedState,FirstPublishedDate"><xml>
<mso:CustomDocumentProperties>
<mso:PageLayoutType msdt:dt="string">Article</mso:PageLayoutType>
<mso:ContentTypeId msdt:dt="string">0x0101009D1CB255DA76424F860D91F20E6C4118</mso:ContentTypeId>
<mso:ClientSideApplicationId msdt:dt="string">b6917cb1-93a0-4b97-a84d-7cf49975d4ec</mso:ClientSideApplicationId>
<mso:PromotedState msdt:dt="string">2.00000000000000</mso:PromotedState>
<mso:CanvasContent1 msdt:dt="string">&lt;div&gt;&lt;div data-sp-canvascontrol=&quot;&quot; data-sp-controldata=&quot;%7B%22controlType%22&amp;#58;4,%22displayMode%22&amp;#58;1,%22id%22&amp;#58;%22fea9b7a3-98f0-4384-87a4-380ed1f78322%22,%22innerHTML%22&amp;#58;%22%3Cp%3EI'm%20a%20news%20page%3C/p%3E%22,%22editorType%22&amp;#58;%22Quill%22,%22addedFromPersistedData%22&amp;#58;true%7D&quot;&gt;&lt;p&gt;I'm a news page&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;</mso:CanvasContent1>
<mso:BannerImageUrl msdt:dt="string">https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png, /_layouts/15/images/sitepagethumbnail.png</mso:BannerImageUrl>
<mso:FirstPublishedDate msdt:dt="string">2016-10-28T07:00:00Z</mso:FirstPublishedDate>
</mso:CustomDocumentProperties>
</xml></SharePoint:CTFieldRefs><![endif]-->
<title>News page test</title></head>
```

**Site page**

```html
<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebControls.ClientSidePage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"><head>
<!--[if gte mso 9]><SharePoint:CTFieldRefs runat=server Prefix="mso:" FieldList="FileLeafRef,ClientSideApplicationId,PageLayoutType,CanvasContent1,BannerImageUrl,BannerImageOffset,PromotedState,FirstPublishedDate"><xml>
<mso:CustomDocumentProperties>
<mso:PageLayoutType msdt:dt="string">Article</mso:PageLayoutType>
<mso:ContentTypeId msdt:dt="string">0x0101009D1CB255DA76424F860D91F20E6C4118</mso:ContentTypeId>
<mso:ClientSideApplicationId msdt:dt="string">b6917cb1-93a0-4b97-a84d-7cf49975d4ec</mso:ClientSideApplicationId>
<mso:PromotedState msdt:dt="string">0</mso:PromotedState>
<mso:CanvasContent1 msdt:dt="string"><div><div data-sp-canvascontrol=&quot;&quot; data-sp-controldata=&quot;%7B%22controlType%22&amp;#58;4,%22displayMode%22&amp;#58;2,%22id%22&amp;#58;%2295c72cb5-c819-458c-96e3-b0fd63b5f367%22,%22innerHTML%22&amp;#58;%22%3Cp%3EThis%20is%20just%20another%20site%20page%3C/p%3E%22,%22editorType%22&amp;#58;%22Quill%22%7D&quot;><p>This is just another site page</p></div></div></mso:CanvasContent1>
<mso:BannerImageUrl msdt:dt="string">https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png, /_layouts/15/images/sitepagethumbnail.png</mso:BannerImageUrl>
</mso:CustomDocumentProperties>
</xml></SharePoint:CTFieldRefs><![endif]-->
<title>Another site page</title></head>
```

In the news page, you can find two important differences: **PromotedState** = 2.00000000000000 and the **FirstPublishedDate** which is defined.

A site page does not contain the FirstPublishDate element and the PromotedState value is set to 0.

## So, what makes a page a news page?

As it turns out, the **PromotedState** value needs to be set to **2** to display it via the news headlines web part. When you change the number of the site page content, it will be displayed in the news headlines web part:

{{< caption-new "/uploads/2016/10/102816_1451_Whatmakesap4.png" "Promoting a site page to a news page" >}}

In the screenshot, you can see that my site page article now gets displayed, but something seems to be wrong with the date. This is where the **FirstPublishDate** fits in. When you add this to the content of the site page and refresh the homepage.

```html
<mso:FirstPublishedDate msdt:dt="string">2016-10-28T07:00:00Z</mso:FirstPublishedDate>
```

You will see a similar output:

{{< caption-new "/uploads/2016/10/102816_1451_Whatmakesap5.png" "Added the publish date" >}}

I hope this gave you some insights into how the new news page functionality works behind the scenes.