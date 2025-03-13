---
title: Retrieving external / guest users via the Microsoft Graph API
author: Elio Struyf
type: post
date: 2016-12-23T20:16:28+00:00
slug: /retrieving-external-guest-users-via-the-microsoft-graph-api/
dsq_thread_id:
  - 5405786143
categories:
  - Development
  - Microsoft Graph
  - Office 365
tags:
  - API
  - External users
  - Guest users
  - REST
comments: true
---

A project I was working involved retrieving all external / guest users that have been added to Office 365 and especially to Office 365 Groups. As it had to build in to an Office 365 application I choose to work with the Microsoft Graph.

First thing I did was retrieving all users with the standard API call:

> **API Call**: https://graph.microsoft.com/v1.0/users

This is one of the results I got from the API call:

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge1.png" "User object from Microsoft Graph V1.0" >}}

As you can see, one of my guest users I have added is my professional account. All these external users have **#EXT#** in the **userPrincipalName**. First I thought to do a "contains" or "search" query, but it appears that is not yet possible.

When I went to check my Azure Active Directory users, I saw an interesting property: **User Type**.

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge2.png" "Azure AD User Identity" >}}

For all the external users in my environment this is set to **Guest**. The best news is, you can also query this property via the Microsoft Graph API.

If you want to retrieve all the external users inside your tenant, all you should do is user the following API call:

> **API Call**: https://graph.microsoft.com/v1.0/users?$filter=userType eq 'Guest'

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge3.png" "Guest user API call" >}}

## Beta endpoint

When I was writing this post, I found out that the beta endpoint gives you even more information about the user. This would have saved me some time today.

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge4.png" "User object in the beta endpoint" >}}