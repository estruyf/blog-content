---
title: Creating and renewing your Microsoft Graph webhook subscriptions
author: Elio Struyf
type: post
date: 2017-03-09T09:29:13.000Z
slug: /creating-and-renewing-your-microsoft-graph-webhook-subscriptions/
dsq_thread_id:
  - 5616054911
categories:
  - Development
  - Microsoft Graph
  - Office 365
tags:
  - Webhook
comments: true
---

Webhooks are an easy way to do something when an event occurs. For example, when you want to do something when a new email is received. Currently, I have such a webhook subscription running which checks every mail for mail trackers. I just love to have control of my emails and know which of them are being tracked. Not that I do not read them. To highlight the emails that are tracked in my inbox, I tag them with a tracking category.

{{< caption-new "/uploads/2017/03/030917_0923_Creatingand1.png" "Email which is tracked" >}}

The original code for this was written about a year ago. One of the downsides back then was that the user, in this case, myself, had to manually update the webhook subscription. For this, I created a portal where I saw my current subscriptions and could trigger an update.

In the beginning, when webhooks for the Microsoft Graph were in beta, it was no option to create or update these subscriptions via application permissions. It had to be done from the user context itself, and as the maximum expiration time for mail, subscriptions is a maximum of 4230 minutes (or 2.9375 days). I had to go to my site every 2/3 days to renew my subscription and must confess that after a while I stopped renewing it. Although I had created a subscription checker that sent me an email when it was about to expire.

A couple of weeks ago, I was reading through the Microsoft Graph documentation and saw this sentence:

> **Note**: The /v1.0 endpoint allows Application permissions for most resources. Conversations in a Group and OneDrive drive root items are not supported with Application permissions.

Which of course is some great news when you want to create webhook subscriptions and do not want to bother your users with updating them themselves.

## Creating webhook subscription via application permissions

When creating new subscriptions via user permissions, the request looks like this:

```html
POST https://graph.microsoft.com/v1.0/subscriptions
Content-type: application/json

{
  "changeType": "created",
  "notificationUrl": "https://url-to-your-api",
  "resource": "me/mailFolders('Inbox')/messages",
  "expirationDateTime":"2017-03-09T09:43:00.00Z",
  "clientState": "subscription-identifier"
}
```


> **Note**: the documentation of this endpoint can be found here - [https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/subscription_post_subscriptions](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/subscription_post_subscriptions)

Notice the **resource** and **changeType** properties in the body of the request. The **resource** property specifies the type of resource for which you are creating a new subscription. The **changeType** property specifies the type of events you want the subscription to run. In this case, the subscription will call my API when a new mail is received.

When you want to do this via application permission, you cannot use the resource URL which is used above. With application permissions, you are not running in the context of a user, so you should change the resource URL as follows in the body:

```json
{
  "changeType": "created",
  "notificationUrl": "https://url-to-your-api",
  "resource": "Users/<user-id>/mailFolders('Inbox')/messages",
  "clientState": "subscription-identifier"
}
```

Notice that **me** parameter in the URL is changed to `User/<user-id>`.

## Renewing webhook subscription via application permissions

Renewing subscriptions is done the same way as you would do from the user context, as you normally only pass the new expiration date.

> **Note**: check out the update subscription documentation - [https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/subscription_update](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/subscription_update)


## Which permissions do you need to set in the Azure AD app?

It depends on the type of resource you want to access. In my case, emails which should be retrieved and updated, so my application only requires the **Mail.ReadWrite** application permissions:

{{< caption-new "/uploads/2017/03/030917_0923_Creatingand2.png" "Microsoft Graph Application Permissions" >}}

## Mail tracker repository

If you are interested in the mail tracker code, keep an eye on this repository on GitHub: [Mail tracking with Microsoft Graph](https://github.com/estruyf/Mail-Tracking-Microsoft-Graph).
