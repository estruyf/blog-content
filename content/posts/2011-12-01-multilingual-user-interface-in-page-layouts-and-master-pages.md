---
title: Multilingual User Interface in Page Layouts and Master Pages
author: Elio Struyf
type: post
date: 2011-12-01T18:39:21+00:00
slug: /multilingual-user-interface-in-page-layouts-and-master-pages/
Xylot:
  - http://www.xylos.com/blog/post/1045/SharePoint-Multilingual-User-Interface-in-Page-Layouts-and-Master-Pages/
dsq_thread_id:
  - 3836445394
categories:
  - Branding
  - MUI
  - SharePoint
tags:
  - Master Page
  - MUI
  - Page Layouts
  - Variations
comments: true
---

On the 30th of November I went the [Biwug](https://biwug.be/) sessions about SharePoint 2010 Multilingual User Interface. It were very interesting sessions that gave a good overview of variations, language packs, resource files, ...

Based on what I heard in this sessions, I wanted to make a small addition related to the branding process and MUI.

When you create master pages or page layouts, you can create content specific HTML blocks. These language specific content blocks can easily be created with a SharePoint Control called: **LanguageSpecificContent**.

_A container control that renders content conditionally based on the language code of the current Web site (SPWeb)._ [MSDN](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.webcontrols.aspx)

This means that the control checks the language in which the site has initially been created. So nothing will happen when the language gets changed from within the user context menu. But this solution can be used when you have a publishing site with language variations enabled.

## Usage

To use this SharePoint Control, the following assembly needs to be registered on your master page or page layout (this is referenced by default).


{{< highlight xml "linenos=table,noclasses=false" >}}
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
{{< / highlight >}}


The next step is to create your language specific content, this can be done as follows.


{{< highlight html "linenos=table,noclasses=false" >}}
<SharePoint:LanguageSpecificContent runat="server" Languages="LCID">
  <ContentTemplate>
    ...
  </ContentTemplate>
</SharePoint:LanguageSpecificContent>
{{< / highlight >}}


In the **Languages** attribute you could specify the language code (locale identifier: [LCID](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.splocale.lcid.aspx)). You can insert your language specific content between the **ContentTemplate** tags.

## Example


{{< highlight html "linenos=table,noclasses=false" >}}
<SharePoint:LanguageSpecificContent runat="server" Languages="1033">
  <ContentTemplate>
    [EN] Text
  </ContentTemplate>
</SharePoint:LanguageSpecificContent>
<SharePoint:LanguageSpecificContent runat="server" Languages="1043">
  <ContentTemplate>
    [NL] Tekst
  </ContentTemplate>
</SharePoint:LanguageSpecificContent>
{{< / highlight >}}


On an English site you get this:

{{< caption-legacy "uploads/2011/12/120111_1839_Multilingua1.png" "English Specific Content" >}}

On a Dutch site you get this:

{{< caption-legacy "uploads/2011/12/120111_1839_Multilingua2.png" "Dutch Specific Content" >}}