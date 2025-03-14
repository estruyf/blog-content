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

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge1.png" "User object from Microsoft Graph V1.0"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAX0lEQVR4nD3JQQ6DMAwEQP7/MNRDJaQ2IdTEa9YxyTcQUtu5zgT6qljrrgZvzqCH95/pY8ecy5JemxY44oz/3S3GRy7P9E4lgYiI0cfo49tGz4q8Qw8DUVnFREzY6NEuVyxonsNgD3MAAAAASUVORK5CYII=" "478" "180" >}}

As you can see, one of my guest users I have added is my professional account. All these external users have **#EXT#** in the **userPrincipalName**. First I thought to do a "contains" or "search" query, but it appears that is not yet possible.

When I went to check my Azure Active Directory users, I saw an interesting property: **User Type**.

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge2.png" "Azure AD User Identity"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAi0lEQVR4nFWOQQ7CMAwE82E+yDN6QeIJEEKdkKbx2hvUVByYk6Wx1xtifAE2xiDZVTn+CLrvZocG8IwxpbeI5JxFpNYatm07Nd0J1X6gEwABAHlEOnkvkBl/viAZeu8+dVJelnJ99DGG/SoEdz8nc1+en9SUbm7WFLe1zeu5YUArUks+iuW8iqylfgGWWcuT2msaDAAAAABJRU5ErkJggg==" "522" "346" >}}

For all the external users in my environment this is set to **Guest**. The best news is, you can also query this property via the Microsoft Graph API.

If you want to retrieve all the external users inside your tenant, all you should do is user the following API call:

> **API Call**: https://graph.microsoft.com/v1.0/users?$filter=userType eq 'Guest'

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge3.png" "Guest user API call"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAcklEQVR4nE3Jyw7CIBCFYd7/6Yy3GgptZxyqRrpgAAWCiaErvs05yS/CJ39TKaXknNvs57ertQpnX/b5YGbn2DeBvWcfYowpJQEAx9Nl1EoqqRcNd6SOeFs7TPOgJBKa1aydlrfNnkd9uF1nmJCQDPX5D1LriQsExJAgAAAAAElFTkSuQmCC" "627" "320" >}}

## Beta endpoint

When I was writing this post, I found out that the beta endpoint gives you even more information about the user. This would have saved me some time today.

{{< caption-new "/uploads/2016/12/122316_2012_Retrievinge4.png" "User object in the beta endpoint"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAABnWAAAZ1gEY0crtAAAA3ElEQVR4nFWPWW7DMAxEff9rtUhRJHGNxtoXrpJ6jEIOkrTEgB98GHK4AHFCjACALCqis/dHLZn4/WZX62uFPnrrrbX2woX504bdOmEe42f0Mfp44YR0Mm7dN5P3iJGVVfVpXwpN98XaL7/fggk1Fqra9Hmb3m72ZPzF+BCziozxZzmrbjGvLvqUKzNJ03/RkM4urTaklI/JOPTAJHr15uy+TTKuuAAhYQaG+3sLMl+928KUyTFhLlQKlXu6mfxj95v1pRZRQUFgAAGdGdp0mwI2x4KVhJAPzBNr018+mDm6j0xh6wAAAABJRU5ErkJggg==" "498" "580" >}}