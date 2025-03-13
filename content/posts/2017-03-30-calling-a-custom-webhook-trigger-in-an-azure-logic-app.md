---
title: Calling a custom webhook trigger in an Azure Logic App
author: Elio Struyf
type: post
date: 2017-03-30T19:20:41.000Z
slug: /calling-a-custom-webhook-trigger-in-an-azure-logic-app/
dsq_thread_id:
  - 5681404778
categories:
  - Azure
  - Development
tags:
  - Logic Apps
  - Webhook
comments: true
---

I am currently busy with preparations for my next course about development on Azure. One of the things that is covered in the course is Logic Apps. Today I was exploring the development options and what you could achieve by creating / integrating custom APIs.

Custom APIs enable you to extend your logic app flow and there are two ways how you can do this:

1.  Poll triggered action
2.  Webhook triggered action

> **More information**: [Creating a custom API to use with Logic Apps](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-create-api-app)

In the previous mentioned article, there is a link to a sample that you can use as a starter template.

> **Logic App Trigger sample**: [https://github.com/jeffhollan/LogicAppTriggersExample](https://github.com/jeffhollan/LogicAppTriggersExample)


One thing the article does not cover is how you can make the call to the custom webhook trigger. I was struggling with it to get the Logic App action call my endpoint. With the help of one of my colleagues, we finally got this working.


## How to use the custom webhook trigger

Once you downloaded the sample or created your own version of it. You should publish it to Azure (or somewhere else where it is accessible).

Add an **HTTP Webhook** action in your Logic App.

{{< caption-new "/uploads/2017/03/033017_1912_Callingacus1.png" "HTTP Webhook action" >}}

Fill in the following fields:

*   Subscribe method: POST
*   Subscribe URI: define the subscribe API endpoint
*   Subscribe body: **'@{listCallbackUrl()}'** > this is really important that it is formatted like this. You also must copy the single quotes.
*   Unsubscribe method: POST
*   Unsubscribe URI: define the unsubscribe API endpoint
*   Unsubscribe body: same as the subscribe body

{{< caption-new "/uploads/2017/03/033017_1912_Callingacus2.png" "HTTP Webhook action configuration" >}}

> **Info**: notice the body fields, you can also specify it like that, but always use the single quotes.

Now one last thing, you must also specify the content-type header. Otherwise, the calls are not being made. You can specify the headers by clicking on the **show advanced options** link at the bottom of the action. Once the advanced properties are displayed, specify `{"Content-Type":"application/json"}` for the subscribe and unsubscribe headers.

{{< caption-new "/uploads/2017/03/033017_1912_Callingacus3.png" "HTTP Webhook action headers configuration" >}}

Once it is configured like this, the webhook trigger should start working.
