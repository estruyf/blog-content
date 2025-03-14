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


```xml
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
```


The next step is to create your language specific content, this can be done as follows.


```html
<SharePoint:LanguageSpecificContent runat="server" Languages="LCID">
  <ContentTemplate>
    ...
  </ContentTemplate>
</SharePoint:LanguageSpecificContent>
```


In the **Languages** attribute you could specify the language code (locale identifier: [LCID](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.splocale.lcid.aspx)). You can insert your language specific content between the **ContentTemplate** tags.

## Example


```html
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
```


On an English site you get this:

{{< caption-new "/uploads/2011/12/120111_1839_Multilingua1.png" "English Specific Content"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAApklEQVR4nAGbAGT/ABosQh0wRxgsRBwvQB4yQzJDWGx3hXN+iy5AVRYqQQCRmqScpq+WoKugqKWgq6q1usLy8vL7+/mutr6WoKoA7ezs+/v7/f39/////v7//v7+/v7//v7+////////APTUnvzZneTn8eLj6uHj6uLk6u3t8+7r8Ozr8fv4/AD03MD/4sLy8fjw7vPw7vPv7fLu7PHv7PL59vv/+/+lD3GoWYI+/gAAAABJRU5ErkJggg==" "250" "132" >}}

On a Dutch site you get this:

{{< caption-new "/uploads/2011/12/120111_1839_Multilingua2.png" "Dutch Specific Content"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAx0lEQVR4nDWMvwqCUBjF73tUtEVb5hQNNSTl0h+IoIamaoteor0XEBoiaGrrVZqiQBJJrUzymter3xdqHX7DgcP5kbwox5TlrNAsVruiNBSlYaHSyZSaOaFF5NG8PV7UOlN5NFC2u/NFvWr6cqXUe5NGf0Y0Xb8ZhmHdXeoyxgAAAT4f36WeSylhPg94GHKOiAiIEWKYlCQE1T2c1o7jW5Zjmi9GOXKEAFIInA/RcWPbnmk5z8fb94L4zX8QDCEmSrSp+b8hxy9lMaWwYr9RqwAAAABJRU5ErkJggg==" "227" "154" >}}