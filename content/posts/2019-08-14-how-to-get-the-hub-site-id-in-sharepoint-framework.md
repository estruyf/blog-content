---
title: How to get the hub site ID in SharePoint Framework
author: Elio Struyf
type: post
date: 2019-08-14T16:48:37+00:00
slug: /how-to-get-the-hub-site-id-in-sharepoint-framework/
categories:
  - Development
  - SharePoint
tags:
  - HubSite
  - sharepoint-framework
  - SPFx
comments: true
---

When setting up a portal on SharePoint Online these days, you most likely will do it with a hub site driven approach. With hub sites, you have one root site collection, which can be seen as the parent, and all children are associated with it.

{{< caption-legacy "uploads/2019/08/081419_1643_Howtogetthe1.png" "Hub site association" >}}

When building solutions for your hub sites, you probably need to know on which hub site your solution is currently running. If that is the case, there are two ways in order to find out.

## The SPFx context object

On the web part/extension context, you can find the current used hub site ID in the good old **legacyPageContext** object. The property you are looking for is the **hubSiteId** or **departmentId**. Example: `this.context.pageContext.legacyPageContext.hubSiteId` and `this.context.pageContext.legacyPageContext.departmentId`.

## Via an API call

Another way, and good to have as a fallback, is to retrieve the hub site ID via a SharePoint API call. The best one is the following: `/_api/site?$select=IsHubSite,HubSiteId`.

This API returns the following:

{{< gist estruyf d29ce1433ac1fe01b216becaed1a2cf2 >}}

The **IsHubSite** allows you to check if you are currently at the root of the hub (the parent site).

The **HubSiteId** provides you the ID you are looking for.

## Updates

### 9/09/2019

Just spotted a new **hubSiteId** property on the **legacyPageContext** object which can also be used to retrieve the hub site ID.