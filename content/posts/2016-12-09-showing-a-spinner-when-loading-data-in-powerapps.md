---
title: Showing a spinner when loading data in PowerApps
author: Elio Struyf
type: post
date: 2016-12-09T14:13:32+00:00
slug: /showing-a-spinner-when-loading-data-in-powerapps/
dsq_thread_id:
  - 5367636281
categories:
  - Office 365
  - PowerApps
tags:
  - Android
  - Apps
  - iOS
  - PowerApps
comments: true
---

This week I built my first application with PowerApps for our company. I wanted to create it via PowerApps to finally see its capabilities and to use it as a showcase for our customers. I must say that it is quite powerful, but some things are not so convenient and can be simplified.

For my application, I am making use of a custom API endpoint which it requires when you open the application. I noticed when you configure such a data flow in your app. The user will have no clue what is going on when he starts the app because no information is shown, only a couple of dots at the top.

To make the user aware that there is a process going on in the background. I have added a spinner into my app. This spinner gets removed once the necessary information is retrieved. In this article, I explain step by step how I achieved it.

## Adding a spinner to the app

First, you need to get a spinner GIF. When you search on the internet for "spinner gif" you will find a lot of sites on which you can configure the spinner you want to use for your application.

Once you have the spinner, you should copy & paste it into the PowerApps app. Which creates an image object in the app.

{{< caption-new "/uploads/2016/12/120916_1404_Showingaspi1.png" "Spinner in a PowerApps app" >}}

Now that you have the spinner added, it will always be visible in the app. The next step is to hide it once your data or process is completed. In my case, I am retrieving information from my custom API and it is configured in the **OnVisible** action of my screen object.

{{< caption-new "/uploads/2016/12/120916_1404_Showingaspi2.png" "Screen Onvisible action" >}}

> **Info**: This is only one way of how you do the data retrieval in PowerApps. Another one would be to configure it directly onto the gallery object AllItems property.

Once your process for data retrieval is defined, you can specify when the spinner can be hidden. In my case, it will be when the **User** data source is not blank. In the **Visible** design property, define the following: **IsBlank(Users)**.

{{< caption-new "/uploads/2016/12/120916_1404_Showingaspi3.png" "Image Visible property" >}}

> **Info**: In case of using the gallery object, you can check if the **Gallery.AllItems** contains your items.

Once you configured it, you should get the following result when starting your app:

{{< caption-new "/uploads/2016/12/powerapps-spinner.gif" "PowerApps spinner" >}}