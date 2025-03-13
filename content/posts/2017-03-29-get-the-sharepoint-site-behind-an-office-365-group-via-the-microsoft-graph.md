---
title: Get the SharePoint site behind an Office 365 Group via the Microsoft Graph
author: Elio Struyf
type: post
date: 2017-03-29T13:34:57+00:00
slug: /get-the-sharepoint-site-behind-an-office-365-group-via-the-microsoft-graph/
dsq_thread_id:
  - 5677045402
categories:
  - Development
  - Office 365
tags:
  - Microsoft Graph
  - Office 365 Groups
comments: true
---

Back in January, I wrote an article about how you could retrieve the site URL of an Office 365 Group.

> Linked article: [Get the site URL of an Office 365 Group via the Microsoft Graph](https://www.eliostruyf.com/get-the-site-url-of-an-office-365-group-via-the-microsoft-graph/)

The way how I achieved it back then was via calling the **drive** end-point and parsing the site URL from the response.

While I was testing out something today on the Graph Explorer, I noticed a new SharePoint Group end-point (atm only available on the beta endpoint). This makes it even easier to get the webUrl.

> **Info**: At this moment, I did not find any details yet about the API end-point in the beta documentation, but I am sure that it would not be for long until this is also covered.

The new API endpoint can be called as follows: `https://graph.microsoft.com/v1.0/groups/<group-id>/sites/root`

Here is a sample:

{{< caption-new "/uploads/2017/03/Screenshot-2017-05-10-20.28.39.png" "SharePoint site URL behind a group" >}}

When you only need the webUrl, you just have to call it as follows: `https://graph.microsoft.com/v1.0/groups/<group-id>/sites/root?$select=webUrl` or `https://graph.microsoft.com/v1.0/groups/<group-id>/sites/root/weburl`

## Update

Apparently, Mikael Svenson had already posted this on his blog: [Microsoft Graph adds SharePoint endpoint for Groups in the beta branch](http://www.techmikael.com/2017/03/microsoft-graph-adds-sharepoint.html).

### 10/05/2017

A client discovered today that the SharePoint API end-point was not available anymore. The article has been updated with the new API endpoint to use.