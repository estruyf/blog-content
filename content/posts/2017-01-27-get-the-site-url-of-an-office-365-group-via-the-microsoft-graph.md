---
title: Get the site URL of an Office 365 Group via the Microsoft Graph
author: Elio Struyf
type: post
date: 2017-01-27T09:46:35+00:00
slug: /get-the-site-url-of-an-office-365-group-via-the-microsoft-graph/
dsq_thread_id:
  - 5497962702
categories:
  - Microsoft Graph
  - Office 365
tags:
  - Office 365 Groups
comments: true
---

## Update

Since 29/03/2017 I discovered a new API endpoint which makes retrieving the SharePoint site URL even easier. You can read all about it in the following article: [Get the SharePoint site behind an Office 365 Group via the Microsoft Graph](https://www.eliostruyf.com/get-the-sharepoint-site-behind-an-office-365-group-via-the-microsoft-graph/)

## Original article

One important piece of information I required for an application which I am currently building is the site URL of the Office 365 Group site. Unfortunately, this piece of information is not provided by the groups details endpoint.

When you call the API to retrieve the group details, you get the following response:

```javascript
// API endpoint: https://graph.microsoft.com/v1.0/groups/<group-id>

{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups/$entity",
    "id": "41525360-8eca-49ce-bcee-b205cd0aa747",
    "classification": null,
    "createdDateTime": null,
    "description": "The Contoso group.",
    "displayName": "Contoso",
    "groupTypes": [
        "Unified"
    ],
    "mail": "contoso@a830edad9050849NDA1.onmicrosoft.com",
    "mailEnabled": true,
    "mailNickname": "contoso",
    "onPremisesLastSyncDateTime": null,
    "onPremisesSecurityIdentifier": null,
    "onPremisesSyncEnabled": null,
    "proxyAddresses": [
        "SMTP:contoso@a830edad9050849NDA1.onmicrosoft.com"
    ],
    "renewedDateTime": null,
    "securityEnabled": false,
    "visibility": "Public"
}
```

This API endpoint already provides you some very useful pieces of information, but nothing about the URL of the SharePoint site.

You might think to compose the site URL yourself with the information you retrieved via the details response. Which in fact is not such a great idea. When a SharePoint site with the same name as the group name already exists. The new group site will get created with a random number at the end. The group name property or mail address will not contain this number. So, you will never be sure if you composed the URL correctly.

## From where can you retrieve the site URL?

As I was going through all the API endpoints of a group. I stumbled upon the endpoint of the group drive (the linked document library). This drive endpoint can return a **webUrl**, which is in fact the URL to the document library of course. One minor thing, if you want to retrieve this piece of information, it requires an additional call. The call itself is easy one:

```html
https://graph.microsoft.com/v1.0/groups/<group-id>/drive/root/webUrl
```

The call will give you the following response:

```json
{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups('41525360-8eca-49ce-bcee-b205cd0aa747')/drive/root/webUrl",
    "value": "https://a830edad9050849nda1.sharepoint.com/sites/contoso/Shared%20Documents"
}
```

In this response, you can see the **webUrl** value, and as I already mentioned it includes the document library ("Shared Documents"). I think it is safe to presume that you would already know how to get it remove it.

## Sample

I also created a sample, so if you want to check out the following GitHub repository: [Office365GroupWebUrlViaMicrosoftGraph](https://github.com/estruyf/Office365GroupWebUrlViaMicrosoftGraph).