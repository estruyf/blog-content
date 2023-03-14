---
title: Using OAuth On-Behalf-Of flow in a Node.js Azure Functions
slug: /oauth-behalf-flow-node-js-azure-functions/
author: Elio Struyf
type: post
date: 2021-04-15T12:03:48.254Z
draft: false
tags:
  - Azure
  - Azure Functions
  - Node.js
  - OAuth
  - Azure AD
categories: []
comments: true
preview: "/social/fa822456-1832-44ef-972a-3729c68ea5a2.png"
---

While implementing a couple of Azure Functions, I needed to use the [OAuth 2.0 On-Behalf-Of flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow). With this flow, you can allow, for instance, an API to perform tasks on your behalf. This flow is great when you want to offload some of the work from the front-end or perform additional calls on the back-end when processing data.

For this type of flow, there are already a lot of samples out there. Unfortunately, most of them are outdated and written in C#. That is why I thought it would be a good idea to write this article, to show how you can use this OAuth On-Behalf-Of flow in Node.js Azure Functions.

{{< blockquote type="Code Sample" text="[msal-obo-azurefunctions](https://github.com/estruyf/azure-samples/tree/main/msal-obo-azurefunctions)" >}}

## Azure AD App Registration

First things first, it all starts with your **Azure AD App Registration**. 

This App Registration will be used for the following:

1. To acquire a token to call the Azure Function
2. The Azure Function will use the acquired token to request an Access Token from the same App Registration on your behalf.

Follow the following steps to set up the app registration:

- Go to your [Azure AD](https://portal.azure.com)
- Open **App Registrations** and create a new registration
- Give the app a meaningful name, select the type of accounts you want to support, and provide your redirect URL

{{< caption "/2021/04/obo1.png" "Azure AD App registration"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACCSURBVHXBQY7CQBAEweyuGhgh7P+/0keDx5hGCCHtgY2IZVlKEsdxMM8zkvjF9Sx8bpzaiX3sDHaajSS+qgr33gnANpL4JSLwbQzqePAmCdsEcJ0m/nKkUSZW0lrja2wbxYckfDmbqqL3TkTwH6/rijK53+5s2+Btuk5kJkUhJbJ4AUDxKroez9WbAAAAAElFTkSuQmCC" "900" >}}

- Once the app is registered, go to **expose an API** and click on the **set** link next to `Application ID URI`.
- By default, it will provide you a URI like: `api://<client-id>`. You can leave this in place, and click on **save**
- Under the **Scopes defined by this API**, add a new scope. In my case, I use `user_impersonation` as the scope name, but you can define it yourself.

{{< caption "/2021/04/obo2.png" "Create an app scope"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAADISURBVHXBwUrDQBSG0e+/c5PphART7ULowqXv/0SC4EaJCC1pm7QzKuKq6TkahqGUnAnu9H3PkpwznlYNlEIdI/mSWSZ8nifG8UCsa7xyQEggiZQSv0rJ+PvrwMfbJ0/PW/pNpOkalvhme0/70CAJM+M8XbhWcAmCGyCm+cQ5n3GvqOuKf6WAt12HxJ8CiAXC97sd43ggmNGv15gZ1wrGj+CBUDnH0xELwoKwICwIC0JmeIyRtmuRxC0C/OXrwsomHu8qUkrc8g0lTDqFtE00iAAAAABJRU5ErkJggg==" "637" >}}

- Save the scope

{{< caption "/2021/04/obo3.png" "Expose API overview"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABuSURBVE3BSQ6CUBBAwdcTyP3vaYwrwu/BsDBaJc/Xe/YwZoaI4KaqiAg/goYrx3HQXZznyVqLzCQzqUpuIuCZi+4GdR4RDNCVdDciQtXFtm14D1Qlt2sl5o6Z8aWqmBnuZpg5XoOZEuHMDKrKvw/WNTYO/VWZbAAAAABJRU5ErkJggg==" "1426" >}}
 
- Go to **API Permissions** and define the scopes you want to grant access to the run on-behalf-of flow. By default, it will have the Microsoft Graph `User.Read` scope already configured. We will use this scope in the sample.
- If you want, you can already do an **admin consent**.
- Go to **Certificates & Secrets** and create a new **client secret**. You will need the generated secret later on in the process, so copy it.
- On the **Overview** you can copy the `Application (client) ID` as well.

## The code

For this article, I prepared the following code sample: [msal-obo-azurefunctions](https://github.com/estruyf/azure-samples/tree/main/msal-obo-azurefunctions).

The sample project contains one Azure Functions `profile-get`, which will use the MSAL On-behalf-of flow to request an access token and get the current user its profile by calling the Microsoft Graph.

To use the sample, all you need to do is pass the `client id` and `client secret` to the `config` object in the `index.ts` file of the function.

{{< blockquote type="Important" text="The config object is added in the code to simplify the process. When you would use this in production, it is recommended to put these kinds of IDs and Secrets in Azure Key Vault. Read more on using the Key Vault in your Azure Functions on [Use Key Vault references for App Service and Azure Functions](https://docs.microsoft.com/en-us/azure/app-service/app-service-key-vault-references)." >}}

## The flow

Once you got all of it in place, you first need to retrieve a token to call the API. The scope you will use for this is the `api://<client-id>/user_impersonation`. 

With the retrieved token, you can call the Azure Function. Pass it as the `authorization` header.

{{< caption "/2021/04/obo4.png" "Performing the Azure Functions call"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABsSURBVG3BQQrCQBBE0V897UTUgEfw/lfKEVxlGSZ2SRaCgu9pXVdLME1nJCGJb1XF8ixyjME8zxy2bePQe8c2H4/7i7QL20QEmYkkbBMRHAy0PJG3y5WxF703WnayBRI/bBMy7HtRhmxC4q83eGIqUJ0VijoAAAAASUVORK5CYII=" "1494" >}}

When the Azure Function retrieves the call, it will first validate the JWT token to make sure it comes from known audiences. In this case, it is the Application ID URI `api://<client-id>`. If it is a valid token, that will be used to get an access token to call the Microsoft Graph on your behalf.

{{< blockquote type="Info" text="In the sample, you will find an `app` folder. This folder contains a sample express app that you can use combined with the Azure Function to test the flow." >}}