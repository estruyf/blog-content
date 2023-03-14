---
title: 'Quick Tip: Converting SharePoint 2010 Application Page to SharePoint 2007'
author: Elio Struyf
type: post
date: 2011-05-10T09:46:23+00:00
slug: /quick-tip-converting-sharepoint-2010-application-page-to-sharepoint-2007/
dsq_thread_id:
  - 3850020579
categories:
  - Development
  - SharePoint
tags:
  - Application Page
comments: true
---

When you need to convert an application page from SharePoint 2010 to SharePoint 2007, these are the steps that need to be done:

1.  Change the "SharePoint.WebControls" and the "SharePoint.Utilities" assemblies version numbers from "14.0.0.0" to "12.0.0.0";
2.  Remove the "Microsoft.Web.CommandUI" assembly line:
{{< caption-legacy "uploads/2011/05/051011_0946_ConvertingS1.png" "Assembly Reference to be removed" >}}
3.  Change the "DynamicMasterPageFile" attribute name to "MasterPageFile", and replace the value with the following:
{{< caption-legacy "uploads/2011/05/051011_0946_ConvertingS2.png" "MasterPageFile Attribute" >}}

The result should be something like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>

<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>

<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ApplicationPage1.aspx.cs" Inherits="estruyf.Project.ApplicationPage1" MasterPageFile="~/_layouts/application.master" %>
{{< / highlight >}}
