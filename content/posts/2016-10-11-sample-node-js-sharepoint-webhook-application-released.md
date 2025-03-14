---
title: Sample Node.js SharePoint webhook application released
author: Elio Struyf
type: post
date: 2016-10-11T08:08:57+00:00
slug: /sample-node-js-sharepoint-webhook-application-released/
dsq_thread_id:
  - 5213760490
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - GitHub
  - Node.js
  - TypeScript
  - Webhook
comments: true
---

A month ago Microsoft announced that the SharePoint webhook functionality is available in developer preview

> **Info**: here is the official article - [SharePoint Webhooks Developer Preview - Now Available!](https://dev.office.com/blogs/sharepoint-webhooks-developer-preview-now-available)

To test out the functionality myself. I created a sample Node.js application which is available in the [SharePoint developer samples](https://github.com/SharePoint/sp-dev-samples) repository: [Sample Node.js SharePoint webhook application](https://github.com/SharePoint/sp-dev-samples/tree/master/Samples/WebHooks.Nodejs).

With this sample application, you can spin up a local server and start creating / updating / deleting webhook subscriptions. When you created a webhook subscription to a library. Try making some changes in it and watch the **Webhook changes** section.

{{< caption-new "/uploads/2016/10/homepage-view.png" "Webhook application"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAVklEQVR4nEWMUQrAIAxDvf9BZe2kH4qitTWj/iwQCC8hqdaGtRbcHeccmBnmnNh7XxaOnOgpKEWw9S+ICK21O1BVhBLzi5wZ7nZBvDIzRARjDPQ+LvsAHMV0uZxwfqQAAAAASUVORK5CYII=" "2733" "811" >}}

If you want to test out this sample application, get the code from the SharePoint developer samples repository and follow the instructions on how you can try it out on your environment.