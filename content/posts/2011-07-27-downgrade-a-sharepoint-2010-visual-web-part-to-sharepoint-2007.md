---
title: Downgrade a SharePoint 2010 Visual Web Part to SharePoint 2007
author: Elio Struyf
type: post
date: 2011-07-27T14:53:48+00:00
slug: /downgrade-a-sharepoint-2010-visual-web-part-to-sharepoint-2007/
dsq_thread_id:
  - 3849926638
categories:
  - Development
  - SharePoint
  - Web Part
tags:
  - Visual Studio
  - Web Part
comments: true
---

When you need to downgrade/convert a SharePoint 2010 Visual Web Part to SharePoint 2007, you need to make the following changes to the user control to make it work for SharePoint 2007:

1.  In the Visual Web Parts User Control remove the following line:

```xml
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
```

2.  Change the version number of the following lines from **14.0.0.0** to **12.0.0.0**

```xml
<!-- Original -->
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<!-- Modified -->
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
```

3.  The next steps to downgrade can be found on Corey Roth his blog: [Using Visual Studio 2010 SharePoint Templates to deploy a web part in SharePoint 2007](http://www.dotnetmafia.com/blogs/dotnettipoftheday/archive/2010/07/15/using-visual-studio-2010-sharepoint-templates-to-deploy-a-web-part-in-sharepoint-2007.aspx).

## Original

{{< caption-new "/uploads/2011/07/072711_1453_DowngradeaS1.png" "Original References" >}}

## Modified

{{< caption-new "/uploads/2011/07/072711_1453_DowngradeaS2.png" "Modified References" >}}