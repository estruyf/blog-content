---
title: "Running #PYOD online store with PowerPlatform and Azure"
slug: /running-online-store-powerplatform-azure/
author: Elio Struyf
type: post
date: 2020-09-11T12:26:43.668Z
draft: false
tags:
  - OnlineShop
  - PYOD
  - PowerAutomate
  - PowerPlatform
  - Azure
  - AzureFunctions
categories: []
comments: true
---

During the Corona crisis, [Luise Freese](https://twitter.com/LuiseFreese) and I was chatting about conferences and stickers. Nobody can get stickers these days, as all conferences are now virtual. That brought us to the crazy idea of opening our sticker store on which we want to sell stickers created for IT/Tech/DEV people.

{{< blockquote type="info" text="the store is called Pimp Your Own Device and is available at: [http://pimpyourowndevice.com/](http://pimpyourowndevice.com/)" >}}

The name itself is a pun, as Bring Your Own Device (BYOD) policies in companies are ubiquitous these days. That is why we went for PYOD.

If you think about an online store, you might think about a front-end, back-end, and database. At PYOD, we did it a bit differently. We wanted to learn from this experience. We wanted to see if we would be able to use the tools we use in our daily lives and see how far we could stretch their usage. That is why we did not go the traditional way, and choose to go for a static site powered behind the scenes by PowerPlatform and Azure Functions.

## Why did we do it?

Both Luise and I love stickers, and we both had a sticker form for a while where you could reach out to request stickers. We send them over for free (or by buying us a coffee).

These forms were a huge success, and because of that, we wanted to professionalize our approach. We would make it easier for anyone out there to get the stickers they like with our store. 

That is how PYOD was born. At first, we wanted to keep it simple and just a side project. Today we take this sticker business very seriously.

{{< blockquote type="info" text="Our mission is to highlight your uniqueness and technical expertise. Make *you* stand out." >}}

## The technologies we used

{{< caption-new "/uploads/2020/09/pyod-architecture.png" "Overview of the architecture and technologies behind PYOD"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACMSURBVCXBQU7DQBBE0V89PbbibaSsuP/xWKBECHu6CyLe0/P1dFfjJbpMZECI5Wbvb+Lrk358EH0ZlwDjfXHZeDRWU4K6P3hLz+ZcJ00jBUGTBDNOoHAbjUmqISsYDLTMJVEky8Fai2PwR6QQ0SAb24xj8oMwohBsO9ikRjCOnTfx72ZTArZE1wlz4xdFqk08VVj5BQAAAABJRU5ErkJggg==" "2395" >}}

The above mindmap shows an overview of all the technologies and services we use. You see, this is what I meant with not the typical approach.

## Why did we went for the static approach?

Our main project is the website, which is a static site generated with Hugo. 

The first question that might arise when you hear static is, should a shop not be dynamic? The inventory, orders, ... 

All of that is true, but the most significant advantage of going static is that there is no database, and therefore the content is a lot faster to render.

### Because something is static does not mean it cannot be dynamic

Most of the time if you talk about making your static website, dynamic. Many developers will tell you to go for a front end framework and some APIs. This approach is not necessarily a wrong idea, but that means you will have to create and maintain these APIs.

For PYOD, we made the content more dynamic by building the pages on the fly by using a build/release process - CI/CD. This process gets initiated when we do an inventory update or when somebody orders stickers. How? For that, you first need to know where we store our data.

## The data storage approach

All our data is stored in SharePoint, I know that a lot would run away from this approach, but both are very familiar with it. Also, as we both work remotely, we need to collaborate efficiently. SharePoint offers these capabilities to us.

{{< blockquote type="info" text="We tried the Common-Data Service (CDS) path, but that was too complicated for our use case." >}}

By using SharePoint, we can easily trigger PowerAutomate to initiate a flow to tell inventory updates happened. These PowerAutomate flows are what we use to provide the triggers on stickers' orders using webhooks.

A significant benefit of using PowerAutomate is that many practical actions are available for us as a small business. For instance, we use it to create orders and create envelopes automatically. Unfortunately, it does not yet automate putting the stickers in the envelopes, but automating the printing process is already a huge benefit.

## Is it all possible by using the PowerPlatform / PowerAutomate?

The idea of setting up the store by using the PowerPlatform was also to test out the platform's limits. See how far we can go, and know when it is an excellent time to move things over to development.

We believe that most use cases are possible with the PowerPlatform, but sometimes development would be a better approach for maintainability reasons. 

For instance, we make use of Azure Functions for our loyalty program and inventory generation. 

### Inventory generation

The inventory generation is a function that retrieves all the information from SharePoint and puts it in a format that can be used in the build process for generating all pages.

### Loyalty program

This program uses two functions:

To be able to check your current point balance;
Generating unique discount codes when you have enough points.

Compared to the previous function, this contains a lot more logic, so we choose to handle it via Azure Functions.

## Ignite and podcasts

Our shop and approach gained a lot of interest from the Microsoft 365 & Azure community. 

On September 09, 2020 the approach of our shop was featured on CTRL+ALT+Azure. CTRL+ALT+Azure is a podcast all about Azure and run by [Jussi Roine](https://twitter.com/JussiRoine) and [Tobias Zimmergren](https://twitter.com/zimmergren). The episode is [046 - Azure Static Web Apps with Elio Struyf](https://ctrlaltazure.com/episodes/046-azure-static-web-apps-with-elio-struyf).

On September 23, 2020, Luise and I will tell you more about the story and technology behind PYOD at Microsoft Ignite. If you want to join, the session is [CON134: Belgium Technology Extravaganza](https://myignite.microsoft.com/sessions/f31263a6-0456-4e47-8af2-fc9e8c4333eb).


## Lessons learned

I am delighted how this all connects and works. Personally, the biggest lesson I got out of this is how to work and stretch the limits of the PowerPlatform. As a developer, you need to think about what you can do and how to use your actions, instead of opening your editor and writing code. 