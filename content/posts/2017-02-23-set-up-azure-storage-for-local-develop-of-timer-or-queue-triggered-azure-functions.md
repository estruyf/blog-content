---
title: Setting up Azure Storage for local develop of timer or queue triggered Azure Functions
author: Elio Struyf
type: post
date: 2017-02-23T11:35:44+00:00
slug: /set-up-azure-storage-for-local-develop-of-timer-or-queue-triggered-azure-functions/
dsq_thread_id:
  - 5577477036
categories:
  - Azure
  - Development
tags:
  - Azure
  - Functions
comments: true
---

These days I use Azure Functions quite a lot for automating things. Since the general availability of Azure Functions which was announcement back in November 2016, they are becoming even more popular and are being used for various kinds of things.

Even the local development process of Azure Functions got a lot better. Right now, you have the following options: **Azure Functions CLI**, **Visual Studio Tools for Azure Functions** or use the **Serverless Framework**.

> **Azure Functions CLI**: [https://www.npmjs.com/package/azure-functions-cli](https://www.npmjs.com/package/azure-functions-cli)
>
> &nbsp;
>
> **Visual Studio Tools for Azure Functions:**[https://blogs.msdn.microsoft.com/webdev/2016/12/01/visual-studio-tools-for-azure-functions/](https://blogs.msdn.microsoft.com/webdev/2016/12/01/visual-studio-tools-for-azure-functions/)
>
> &nbsp;
>
> **Serverless Framework**: [https://azure.microsoft.com/en-us/blog/announcing-new-azure-functions-capabilities-to-accelerate-development-of-serverless-applications/](https://azure.microsoft.com/en-us/blog/announcing-new-azure-functions-capabilities-to-accelerate-development-of-serverless-applications/)

It is up to you to choose which one you want to use. As I love to work with Visual Studio Code and Node.js, I choose to use the Azure Functions CLI.

When I created my first timer triggered Azure Function locally, I always received ScriptHost errors. This blocked me from being able to debug my function. The error itself only said: "A ScriptHost error has occurred", which of course does not say much of what is going on.

I logged this issue on GitHub and got a response that timer triggered functions also require storage to run.

> **Info**: Here you can find the issue on GitHub - [https://github.com/Azure/azure-functions-cli/issues/45](https://github.com/Azure/azure-functions-cli/issues/45)

The error message got improved with the latest update of the Azure Function CLI. When you now create a new timer function without storage configuration you get the following error:

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS1.png" "Storage connection error" >}}

To solve this problem, you should add an Azure Storage account or make use of the Azure Storage Emulator.

## Using the Azure Storage Emulator

First, you must install the Azure Storage Emulator on your machine.

> **Info**: Azure Storage Emulator - [https://docs.microsoft.com/en-us/azure/storage/storage-use-emulator](https://docs.microsoft.com/en-us/azure/storage/storage-use-emulator)

Once you downloaded the emulator, install it on your machine and run it:

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS2.png" "Start Azure Storage Emulator" >}}

From the moment, the emulator is running, you must configure the local environment to make sure that it uses this storage emulator. To do this, run the following command: `func settings add AzureWebJobsStorage UseDevelopmentStorage=true` or add `"AzureWebJobsStorage": "UseDevelopmentStorage=true"` to the AppSettings.json file.

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS3.png" "Update connection string to use development storage" >}}

When this is configured, run your function (example: `func run TimerTriggerJS`), and it should start to work:

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS4.png" "Running a time function" >}}

To stop the Azure Storage Emulator, you can run the following command: `AzureStorageEmulator.exe stop`

## Using Azure Storage

As mentioned, you can also make use Azure Storage directly. Via this way, you do not have to install the storage emulator on your machine.

To make use of this approach, you should add the connection string of your Azure Storage location to the AppSettings.json file as follows: `DefaultEndpointsProtocol=https;AccountName=<storage-name>;AccountKey=<account-key>`

> **Info**: more information about the connection string can be found here: [https://docs.microsoft.com/en-us/azure/storage/storage-configure-connection-string](https://docs.microsoft.com/en-us/azure/storage/storage-configure-connection-string)

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS5.png" "Azure Storage connection string" >}}

Once added, the result should be the same when running the function:

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS6.png" "Running timer function with the Azure Storage connection string" >}}

On the Azure Storage account in the portal, you should see the following folders being added to the container once the function ran for the first time:

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS7.png" "Azure storage container" >}}

{{< caption-legacy "uploads/2017/02/022317_1053_SetupAzureS8.png" "Timer function folder" >}}