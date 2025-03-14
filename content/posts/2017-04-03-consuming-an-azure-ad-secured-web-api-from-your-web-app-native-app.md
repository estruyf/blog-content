---
title: Consuming an Azure AD secured web API from your web app / native app
author: Elio Struyf
type: post
date: 2017-04-03T11:52:38+00:00
slug: /consuming-an-azure-ad-secured-web-api-from-your-web-app-native-app/
dsq_thread_id:
  - 5691829107
categories:
  - Azure
  - Development
tags:
  - App Services
  - Web API
  - Web App
comments: true
---

Probably one of the great things about App Service is that you can easily secure your applications via Azure Active Directory. Securing a Web API or API App can easily be achieved by enabling the **app service authentication** option and selecting Azure Active Directory. The express configuration only requires a few clicks until you have it all up and running.

{{< caption-new "/uploads/2017/04/040317_1140_Consumingan1.png" "App Service Authentication"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAQklEQVR4nF3LQQ5AQAwF0N7/Lk7EVuQPUky78Js2tnj7J9h1GHF0C94RUV/S1m2asQDuTjJeSMrV7VQ189+rqsx8AJ6MVsoi6V+FAAAAAElFTkSuQmCC" "598" "178" >}}

Once this security option is enabled and navigate to your web API or web app, you should see the Microsoft login page before you can consume it.

Last week I was working on a couple of samples which show how you can consume these secured web APIs from within a web app and native application. The process itself is straightforward, but it is not so convenient to get it configured from the new Azure portal (maybe it is just me). The process itself is similar to what you would do when configuring Azure AD application permissions for other APIs like the Microsoft Graph API, SharePoint, ... The problem here is that you only see the APIs that Microsoft is pushing, but not your custom ones.

## Background information

In my scenario, I started with the following Azure AD applications:

{{< caption-new "/uploads/2017/04/040317_1140_Consumingan2.png" "My Azure AD applications"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAdUlEQVR4nB3MOw7CMAwA0Nz/DHCADizdkFAlFgQIdWRgLGO+TWJZsl0b0XeA53IrIUVmMTO1P1WttaWUEdEd34fxMwpsxLTtRKS1tq6ViNx1mJ7ne0fIuYjshyoAMLOZucfpNl9evoRl+cYYEREAvA8+hN77Dyoxb285WMuMAAAAAElFTkSuQmCC" "385" "147" >}}

*   **uazure-api**: is the Azure AD application which has been automatically been created when I secured my API via the Azure AD express configuration. Nothing should be configured on this application anymore.
*   **AdalConsoleClient** and **AADSecuredWebApp**: these are my two sample applications which should consume the uazure-api web API. These two require some configuration.

## Configuring your Azure AD application to consume the web API

Once you configured your Azure AD application, open it in the Azure Portal and click on **required permissions** from the settings panel.

{{< caption-new "/uploads/2017/04/040317_1140_Consumingan3.png" "Required permissions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAA9ElEQVR4nF2OvUoDQRSFbydYii/gW5hGsBKsfQkFsRHsfKUgQQ1C0EZBjEIKiVgpIiZZd7Kzu+PO3L+RIbgEP77unMs9sLJ1uLF3ur57Ap0D2NxvXds5Xt0+guun15vHcf9udHE7GjyMW6/unwfDF4gxMgWmoMLxH6qAzLPv3PugMRJzKxIRM4iqC1gU1jmX+n8QkYikuPYhN8baUpZAJGYBFv2yTW7m3ntVXWQqEhCZGVTVNR6Dj6rLqkiaRiITU2S2+mF1JK01CatCjnQ+M2cftvtuum+m91ldZtjPsDdppj4tJ+uy6bysAlWBauTFdenT81/R5SOD02EaIgAAAABJRU5ErkJggg==" "312" "357" >}}

By default, you should have the following configuration for the Azure AD application:

{{< caption-new "/uploads/2017/04/040317_1140_Consumingan4.png" "Default permission set"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAXElEQVR4nB3HOw6AIBAFQK6lRGsK72GIncZjCA16z8Wsj28wWk1GqNVN+6VWNy62mw+pjdSm12ZYrNpOgRCeB0AopbTWaq0ppZxz/BEAiMh7z8wxRmb+dt9EBOAF01RGZMT1HM0AAAAASUVORK5CYII=" "580" "165" >}}

On this tab, you should click on the **add** link at the top. This will open a new tab where you can select an API you want to access. It results in the following set of available APIs:

{{< caption-new "/uploads/2017/04/040317_1140_Consumingan5.png" "Available APIs"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAWklEQVR4nGOI6Vvr2brCo3VFxoS1+ZPWJnUuS+pcltK9IrVnZc6ENQwv//x99Offi///v//9+//f3/+ogOHvnz////z5/+/v9x8/3r3/8Pnzl5+/fv/6/QeCAOG6SoYi+Cq3AAAAAElFTkSuQmCC" "624" "175" >}}

Now as you can see, you cannot select your custom API in the list. The trick is that you have to search for it by its name. In my case: **uazure-api**.

{{< caption-new "/uploads/2017/04/040317_1140_Consumingan6.png" "Searching for your custom API"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAR0lEQVR4nGPQim7WiGwU96kQ9S6HIxGvMin/KpXweoZnb94/e/Ph9YcvaOjV+y8v339kePfz9/vffz/9/f8RFX34+//b3/8AiklCHDhcXWsAAAAASUVORK5CYII=" "567" "149" >}}

Once you select it, you can give it the delegated permission set to access the API via your Azure AD app.

{{< caption-new "/uploads/2017/04/040317_1140_Consumingan7.png" "Specifying the permissions for you custom API"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAaElEQVR4nAFdAKL/AGeGo1t+nVl9nF2Bn1t/nk12l1B5mlB5mkx1l1V8nADh9Pjg9vrn/v74/Pz8+vn9/fv////////+/v7//v4A1e72zez10vH67Pb45u/y6vT37/n97vj86fH17vb6UONHpNg4/6gAAAAASUVORK5CYII=" "624" "163" >}}

This is all the configuration which is required. Now that this is configured, you should be able to call the API the same way as how you would call the Microsoft Graph.

## An example of getting an access token and calling the API

Here is some sample code of my console application:

```javascript
var authority = "https://login.microsoftonline.com/<tenant-id>";
var clientID = "<client-id>";
var redirectUrl = "https://<tenant>.onmicrosoft.com/app/webapiconsoleclient";
var resource = "https://<URL-of-your-webapi>";

var authContext = new AuthenticationContext(authority);
var result = await authContext.AcquireTokenAsync(resource, clientID, new Uri(redirectUrl), new PlatformParameters(PromptBehavior.Always));

string authToken = result.AccessToken;
```

I hope this article helped you, happy coding!