---
title: Using the latest SharePoint PnP Core Online dependency in your Azure Functions
author: Elio Struyf
type: post
date: 2019-01-31T19:59:33+00:00
slug: /using-the-latest-sharepoint-pnp-core-online-dependency-in-your-azure-functions/
categories:
  - Development
  - SharePoint
tags:
  - Azure Functions
  - PnP
comments: true
---

Azure Functions are a great and easy way for implementing and automating tasks for your SharePoint Online environment. You could use it for various tasks like implementing scheduled jobs (timer jobs), elevating permissions via an API call to fetch/create data, ...

Starting to create new Azure Functions is simple with the Azure Functions project template in Visual Studio.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat1.png" "Creating a new Azure Functions project" >}}

But there is an issue, once you created your project and want to add the **SharePointPnPCoreOnline** dependency to the project. You will notice that the installation is failing. This has to with the **Newtonsoft.Json** dependency that is used for the Azure Functions SDK is older than what SharePointPnPCoreOnline dependency requires.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat2.png" "Issues when installing the latest version of SharePointPnPCoreOnline" >}}

The Azure Functions SDK currently has a dependency set to 9.0.1, but SharePoint PnP Core requires at least 10.0.3. Luckily the solution to fix this is very easy and is also documented on the Azure Functions SDK GitHub page. All you need to do is to manually install another Newtonsoft.Json version.

> Read more about it on: [loading a different Newtonsoft.Json version](https://github.com/Azure/azure-functions-vs-build-sdk)


## Installing a newer Newtonsoft.Json dependency version

The solution to overcoming this issue is by first manually installing a newer version of Newtonsoft.Json via NuGet. Be sure that the version you are going to install equal or higher than 10.0.3.

In my project, I used version 12.0.1 of Newtonsoft.Json.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat3.png" "Installing version 12.0.1 of Newtonsoft.Json" >}}

## Installing SharePointPnPCoreOnline dependency

Once Newtonsoft.Json is installed, you can proceed with installing the SharePointPnPCoreOnline dependency to your project.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat4.png" "Installing the latest version of SharePointPnPOnlineCore" >}}

## Running Azure Functions with SharePoint PnP core

Now that all the dependencies are installed, it is time to test it out.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat5.png" "Running the Azure Functions with SharePoint CSOM code" >}}

Here is the result of the HTTP request function.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat6.png" "The Azure Functions result output" >}}

Happy coding!