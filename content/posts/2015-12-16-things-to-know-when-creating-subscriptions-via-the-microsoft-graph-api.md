---
title: Things to know when creating subscriptions via the Microsoft Graph API
author: Elio Struyf
type: post
date: 2015-12-16T15:32:55+00:00
slug: /things-to-know-when-creating-subscriptions-via-the-microsoft-graph-api/
dsq_thread_id:
  - 4409128787
categories:
  - Microsoft Graph
  - Office 365
tags:
  - Development
  - Microsoft Graph
  - Node.js
comments: true
---

Now that webhooks are supported on the beta endpoint of the Microsoft Graph, I wanted to put it to the test and see how I could leverage it in my application. For one of my hobby projects built with Node JS, I wanted to show notifications when something changed in my calendar. During the development process I stumbled on a couple of things, which I will explain a bit more in this blog post.

If you want to receive notifications from Office 365, you can do this by creating a subscription for the following resources:

*   Mail
*   Contacts
*   Events

You will have to pass this resource while creating the subscription. A good thing to know is that you can only create the subscription with a user token (no app-only token). As I mentioned this subscription end-point is currently only available on the beta version of the Microsoft Graph API.

> **Note**: links to the documentation of the subscription endpoint
> 
> [http://graph.microsoft.io/docs/api-reference/beta/api/subscription_post_subscriptions](http://graph.microsoft.io/docs/api-reference/beta/api/subscription_post_subscriptions)
> 
> [http://graph.microsoft.io/docs/api-reference/beta/api/subscription_get](http://graph.microsoft.io/docs/api-reference/beta/api/subscription_get)

As it is still in beta there is not very much documentation available about how to use these end-points, so I had to figure out a couple of things myself.

> **Note**: the Microsoft Graph team is working very hard on the documentation and you can also contribute to it via the following GitHub repository: [https://github.com/OfficeDev/microsoft-graph-docs](https://github.com/OfficeDev/microsoft-graph-docs)

## No validation required

If you already used the Outlook Subscription API, you will know that you have to validate the subscription request by answering the first time with the **validationtoken**. At the moment this is not a requirement for the Microsoft Graph API. The subscription API does not validate your notificationUrl.

## Using HTTPS for your notification URL

During the creation of my subscription the API always returned the following message:

```json
{
  "error": {
    "code": "",
    "message": "An error has occurred.",
    "innerError": {
      "request-id": "a23d868d-eb3d-4e80-9d47-9c253aa0f6a1",
      "date": "2015-12-16T13:22:08"
    }
  }
}
```

This error message does not tell you much about the real problem. So I had to fiddle around and while I was reviewing my code, I saw that I was using the HTTP URL of my application. By changing this to HTTPS, the subscription got created. The error message could have been a bit clearer, so you have to know that you always have to use HTTPS for the notificationUrl property.

> **Note**: this issue has already been logged on the GitHub repo and Microsoft will add it to the documentation.

## Which notification payload can you expect?

Once your subscription is in place, the webhook will send notifications to your application. Of course you want to do something with this notification payload, but before you can do something you have to know how this payload looks like in order to create your model. The first time I just logged the JSON payload to my database in order to see what the payload looked like, and with that result I created my model.

Here is what the notification payload looks like:

```json
{
   "value":[
      {
         "subscriptionId":"00000000-0000-0000-0000-000000000000",
         "subscriptionExpirationDateTime":"\"2015-12-19T13:21:48.8410404Z\"",
         "clientState":"NodeJSNotifications",
         "changeType":"Updated",
         "resource":"Users/ddfcd489-628b-7d04-b48b-20075df800e5@1717622f-1d94-c0d4-9d74-f907ad6677b4/Events/AAMkADNkNmAA=",
         "resourceData":{
            "@odata.type":"#Microsoft.Graph.Event",
            "@odata.id":"Users/ddfcd489-628b-7d04-b48b-20075df800e5@1717622f-1d94-c0d4-9d74-f907ad6677b4/Events/AAMkADNkNmAA=",
            "@odata.etag":"etag",
            "Id":"AAMkADNkNmAA="
         }
      }
   ]
}
```


## Useful resources

You can also make use of the Outlook Subscription API. Simon Jaeger wrote a good article about it last week that describes the creation steps in more detail: [Call me back Outlook notifications Rest API](http://simonjaeger.com/call-me-back-outlook-notifications-rest-api/).