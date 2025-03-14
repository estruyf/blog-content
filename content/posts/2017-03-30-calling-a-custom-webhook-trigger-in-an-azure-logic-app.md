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

{{< caption-new "/uploads/2017/03/033017_1912_Callingacus1.png" "HTTP Webhook action"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAh0lEQVR4nAF8AIP/AO3r7ebj5ubl5evq6fv7+tLp/7zd/7nb/8nk//P5/wD2+PTw8+z09PTu7u719fXx+v/q9f/p9f/n9P/6/f8Apcl0gLU20djHw8LF0tPS/vz7+vr3/fv6////////ALnVkp3FZd3j1tnY29/f3svLy9LS09na2v3+/v///x1takTcYMGPAAAAAElFTkSuQmCC" "170" "72" >}}

Fill in the following fields:

*   Subscribe method: POST
*   Subscribe URI: define the subscribe API endpoint
*   Subscribe body: **'@{listCallbackUrl()}'** > this is really important that it is formatted like this. You also must copy the single quotes.
*   Unsubscribe method: POST
*   Unsubscribe URI: define the unsubscribe API endpoint
*   Unsubscribe body: same as the subscribe body

{{< caption-new "/uploads/2017/03/033017_1912_Callingacus2.png" "HTTP Webhook action configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAIAAACZwRr8AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAA7klEQVR4nFWOW0vDQBCF9//jrxH8CeKTIAiVPlipTdPmnt3ZuewtSjZtjB+HeZjDzDnq6f1hXz43/XejvwZ7WtXBcbAX9Xp4/CzeqrYYTGWoXaWxAeqVE2+0DSFOaZrSz6oUpxCCEuFRj0gYMjHe5iLFRHVVd10HANZaADB3REQRUT+2lK9jvo3Lh4wihn3xcq4OGtp1+2cLszEaEb13acPyQ/Fsm7nHhpRSCMF7P2eXl7Kua2YSEd4w28w89JqQEclm4I5zThHZ43XXjVd2dvpPSkmx0Kn5aIYSaFxSEVFnAEA557wLTnyKt7bb5r/NaJGsJkQFjAAAAABJRU5ErkJggg==" "370" "507" >}}

> **Info**: notice the body fields, you can also specify it like that, but always use the single quotes.

Now one last thing, you must also specify the content-type header. Otherwise, the calls are not being made. You can specify the headers by clicking on the **show advanced options** link at the bottom of the action. Once the advanced properties are displayed, specify `{"Content-Type":"application/json"}` for the subscribe and unsubscribe headers.

{{< caption-new "/uploads/2017/03/033017_1912_Callingacus3.png" "HTTP Webhook action headers configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAn0lEQVR4nGWQwQ7CMAxD+/+fx5ELB5AGVOrUJm2cpENoZUxDPOVm2U4SRCSl1FpT1X7A3c0sACilAFj+6L0HEZmmKcZIRMxMX5gZwOpOKdVaAZiZDjDYwokKEYmIDV6DLVxVKwtzrbXlnJl573b30IRvz/Oco1pbls20Lx8E9fI43eN1ztEHP7KqmbqpQdB7Px62ygB4bWY3+/yiu+/zBq4UIo8CUsEIAAAAAElFTkSuQmCC" "370" "381" >}}

Once it is configured like this, the webhook trigger should start working.
