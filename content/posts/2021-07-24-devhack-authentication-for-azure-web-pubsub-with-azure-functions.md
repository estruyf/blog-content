---
title: "#DevHack: Authenticate Azure Web PubSub with Azure Functions"
slug: /devhack-authentication-azure-web-pubsub-azure-functions/
description: Get to know how you can use an Azure Function to retrieve an authentication token for your Azure Web PubSub service.
author: Elio Struyf
type: post
date: 2021-07-26T07:42:21.610Z
lastmod: 2021-07-26T07:42:26.211Z
draft: false
tags:
  - Azure Functions
  - WebSockets
  - Azure Web PubSub
categories: []
comments: true
preview: /social/3e49f8be-1a85-4c60-88bd-5e5b9e1e36e7.png
keywords:
  - pubsub
  - azure
---

This week, I tested out the Azure Web PubSub service, which is still in preview when writing this article. The Web PubSub service is a real-time messaging service that allows you to use the WebSockets APIs and the publish-subscribe pattern. It is excellent for collaborative applications.

{{< blockquote type="info text="You can find the developer documentation at [Azure Web PubSub Service - Github](https://azure.github.io/azure-webpubsub/)." >}}

## What can do service do?

There is nothing "new" or "fancy" about the service. It provides you what it promises, an easy way to spin up a WebSocket service with the language you want on both server- and client-side.

## Authentication with Azure AD

In my case, I want to use the service for authenticated users only. All users get authenticated by Azure AD and communicate with secured Azure Functions.

In the documentation, you will find an example of using GitHub for authentication and an Azure Functions sample where the user is provided via a query string parameter.

To be more secure, I wanted to implement this within one of my Azure Functions instead by validating the access token and use the user ID from the decoded token.

For the Web PubSub service, I created an `authenticate` function. Before calling this function, you first need to do the typical OAuth dance before calling this secured function.

Inside the function, the OAuth token is retrieved from the request headers, decoded, and validated. 

{{< blockquote type="info" text="You can find a sample version of the function on my sample repository [Azure auth function for Web PubSub](https://github.com/estruyf/azure-samples/tree/main/azure-pubsub-azurefunctions)." >}}

The function's code decodes the OAuth token and uses the user's object ID to request an Authentication Token URL from the Web PubSub service. When a URL is retrieved, it gets returned. This URL can be used within your client-side application to open the WebSocket.
