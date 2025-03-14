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

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat1.png" "Creating a new Azure Functions project"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAtUlEQVR4nC3L207DMAwA0Pz/h4H2AGgXKGhiVYZgje01TmKnadcsCIn3c4z9Rp8KjNHRCFeOkn0QuLJoBhZzGVCSIBEAiEhrTTVzCLdlDjqZEOO6rt6zA/DMrbWUZJrKn5tvZnCu1tUzI5Gq1lpVcylza03KYs4/SJzJMxFKSvd7TSkty/K/D8dh/3HpjnZwI1DgkJEiIHuvXy6azc6+vJ6fDva9p67HtxN2PW22p8fnz4et/QXndcMx0w6djQAAAABJRU5ErkJggg==" "531" "368" >}}

But there is an issue, once you created your project and want to add the **SharePointPnPCoreOnline** dependency to the project. You will notice that the installation is failing. This has to with the **Newtonsoft.Json** dependency that is used for the Azure Functions SDK is older than what SharePointPnPCoreOnline dependency requires.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat2.png" "Issues when installing the latest version of SharePointPnPCoreOnline"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARUlEQVR4nAXBAQqAIAwAQP//r4hC26zp3LTMUOgZ3hnARdJWn+OtkLMjWpl3VSdiSwGDPljn8YwXpciZgojetfX2jT7+CQimMlaPN1etAAAAAElFTkSuQmCC" "624" "130" >}}

The Azure Functions SDK currently has a dependency set to 9.0.1, but SharePoint PnP Core requires at least 10.0.3. Luckily the solution to fix this is very easy and is also documented on the Azure Functions SDK GitHub page. All you need to do is to manually install another Newtonsoft.Json version.

> Read more about it on: [loading a different Newtonsoft.Json version](https://github.com/Azure/azure-functions-vs-build-sdk)


## Installing a newer Newtonsoft.Json dependency version

The solution to overcoming this issue is by first manually installing a newer version of Newtonsoft.Json via NuGet. Be sure that the version you are going to install equal or higher than 10.0.3.

In my project, I used version 12.0.1 of Newtonsoft.Json.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat3.png" "Installing version 12.0.1 of Newtonsoft.Json"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nD3C2w2AIAwAQPbfjdbwkmpoFWhZg/jj5ZwH9IAh5kqUy0nXzfJ8Wd4+XIgJ8GgsamtMnWpq678BJ+kzuWCZFDMAAAAASUVORK5CYII=" "624" "136" >}}

## Installing SharePointPnPCoreOnline dependency

Once Newtonsoft.Json is installed, you can proceed with installing the SharePointPnPCoreOnline dependency to your project.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat4.png" "Installing the latest version of SharePointPnPOnlineCore"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nCXKURKCIBAAUO5/sGqE3WURqdHQwNzFWzjU93sGkMgzeeYweg5xSss753XL61bqbgDJOjdY6wBv90ecUqn79xDRdogaIgYkBzj0gICUnq/u2kSb+YHtBojkPfM8LyLdOscphTF+ShU9D1Ftp7bzb6LtAvDyfwJR8iliAAAAAElFTkSuQmCC" "624" "318" >}}

## Running Azure Functions with SharePoint PnP core

Now that all the dependencies are installed, it is time to test it out.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat5.png" "Running the Azure Functions with SharePoint CSOM code"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nGPo6OoODg2OjIkKj4wKj4wMCg46cvTk////v33/+fv3b4Zfv//8+vX7Pxj8+/cPQv77Cyb//QMAz6UvkUa1kMYAAAAASUVORK5CYII=" "624" "132" >}}

Here is the result of the HTTP request function.

{{< caption-new "/uploads/2019/01/013119_1952_Usingthelat6.png" "The Azure Functions result output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOklEQVR4nCXCQQ6AIAwEQP7/SlOILGW35YJeiXEyRbncZ4dfdluFNVgb39oBlogk5TOkRYaU+lHvfg6a2zbwgNMlPAAAAABJRU5ErkJggg==" "624" "121" >}}

Happy coding!