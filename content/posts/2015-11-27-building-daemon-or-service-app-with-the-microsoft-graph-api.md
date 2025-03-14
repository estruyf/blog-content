---
title: Building daemon or service app with the Microsoft Graph API
author: Elio Struyf
type: post
date: 2015-11-27T15:24:04+00:00
slug: /building-daemon-or-service-app-with-the-microsoft-graph-api/
dsq_thread_id:
  - 4355553702
categories:
  - Microsoft Graph
  - Office 365
tags:
  - Microsoft Graph
  - Office 365
  - Office 365 Dev
  - Unified API
comments: true
---

In my previous blog post I described the process how to create all day events with the Microsoft Graph API. I used this method for synchronizing an external planning system to Office 365. This enabled our users to go to a MVC site and manually start the synchronization process. The next thing on my to-do list was to create a daemon or service application which performs a synchronization on a scheduled basis via an Azure WebJob.

In order to create / modify events in a user's calendar, the service application requires app-only permissions. This can be configured via an Azure AD application. You are able to define the permission levels of various services like calendar, mail, groups, etc. which your application has to access. In this article I describe what I had to do in order to successfully configure and create such a service application.

## Create a certificate (optional)

First of all you need a certificate. For the development process of you application you can make use of a self-signed. When you put your service application in production it is best to make use of a trusted certificate. So if you already have a self-signed or trusted certificate, this step is not required.

To create a self-signed certificate you can make use of the **makecert.exe** tool. Here are the steps to execute:

- Locate the **makecert.exe** tool on your computer. If you have Visual Studio installed, you can run it from the Visual Studio command prompt. Or if you have Fiddler installed, you find it in the Fiddler program folder. When you have neither of these installed, you can get it from the Windows SDK: [MakeCert](<https://msdn.microsoft.com/en-us/library/windows/desktop/aa386968(v=vs.85).aspx> "MakeCert");
- Once you have located the makecert tool, execute the following command:

```bash
makecert -r -pe -n "CN=CompanyName AppName Cert" -b 11/25/2015 -e 11/25/2017 -ss my -len 2048
```

- Once the certificate is created, you have to open the Microsoft Management Console. Easiest way is with the **mmc.exe** command;
- Open the Current User's certificate folder via: File > Add/Remove snap-in > Click on certificates > choose **My user account** and click Finish > click OK;

{{< caption-new "/uploads/2015/11/image_thumb3.png" "My user account certificates"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA6klEQVR4nC3Ny0rDUBhF4bz/4zhTCiJSxIFFxBIrSU7yJ+eW27mkIB0taXXwzTZrF855RARtDNL31E2DUi2D1ljr8H5kXhaKRim6TtCDRg8D1miGXsgpsy4zXduSUqKolFC+H6j399T7B5qXHer1EXN4Rr898b27Y+k7CpGW+vhB9VWi6gqrB0bnWKeRsC5MWgijo2hFqMtPRu+Z5oWcN1LKxBhJ28bsLWHyFMY61KkkhpWYEiEEYvyTcmZ2hvVa3M5nJt3dbmLOt/HVGiMhZyZriNfiz+VCnBxeFOMg/zpMq+hVi5yOpGXkF3bdJs0V2S7GAAAAAElFTkSuQmCC" "718" "581" >}}

- Find the certificate you created in the list;

{{< caption-new "/uploads/2015/11/snip_20151126090355_thumb.png" "The certificate I created"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAL0lEQVR4nAXBMQ4AIAgEQf//SxNUog05CypcZ9qyzhyTsw++nGFGRCCJzORVcXX5/TEl0yy4UhUAAAAASUVORK5CYII=" "680" "26" >}}

- Export the certificate as **PFX** and **CER** by right clicking on the certificate > All Tasks > Export;
- Go through the export wizard and choose **Yes, export the private key** > Next > Check the password checkbox and fill in a password for the PFX;

{{< caption-new "/uploads/2015/11/snip_20151126090910_thumb.png" "Insert a password for your certificate"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAA7DAAAOwwHHb6hkAAABCElEQVR4nFWPy07CUBCG+7CuQFfufACvCx+FhSuNqyIXQVqJiYkLxQA5Qin0lEPa0+tnTiGIf/JlJpNvJhmrf3tK57JO+6JG+7xG/6rOy/XxnsHNCa2zI6zp8yPCaTJzbMTAxnObLHZ4rs3qrcO3fYcVrzwCFeEHIXGaEyVZVZOsqPoCCGdTI86JYo03n7P0fVbLJWqtUOuQjVpjIsUYSwcL0iwnCAKklBWmV0qhta7E7UUj5jnyQDRkWQZl+Scm0idUG4QQJEmypyiK/6J5JtIp44kgilPSrESnBbkRDUb8mWzFKrvtw5S7mTQXP54eGA17fDkdRm6X0euWT7fLsGXz3mvh3Df4BRVbbuSOPE46AAAAAElFTkSuQmCC" "549" "536" >}}

- Choose the location to store the PFX file and click finish;
- Repeat the same steps, but choose in the export wizard **No, do not export the private key **and complete the wizard;
- Once you completed the export wizard twice, you should have the PFX and CER files.

## Azure AD application configuration

As I mentioned, your service application requires app-only permissions to perform Microsoft Graph API calls. In order to do this, you have to create an Azure AD application.

### Add an Azure AD application

Follow the next steps to create a new Azure AD application:

- Open the Azure management portal and go to your active directory;
- On the **Applications** tab, click on the **ADD** button;
- In the dialog window choose to **Add an application my organization is developing**;

{{< caption-new "/uploads/2015/11/snip_20151126093137_thumb.png" "Add a new application"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjb8jGPfAAAAUklEQVR4nD2MWw6AIBADuf9RfREjC2xLxShqMx9Npmkg6UBrBAlAUv8iKdBRklXLbrkmQ6nNIWAsAi0f05qWaA93mTeP+6ulszizs6IN/vPe+wVUnHToOWjMrAAAAABJRU5ErkJggg==" "600" "226" >}}

- Give your application a name;

{{< caption-new "/uploads/2015/11/snip_20151126093352_thumb.png" "Application name"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAdUlEQVR4nI2OUQoCMQxEe/8LuAdavYLoLUppm7ZJZ5moYMWPHQiTMI8hYYwBEYGqwlTBmzulNt0v1wdCrRUpJdCbNJRSIE0WcLs9EdjGkC1zTpiZOzW+QUIxRp+cswcfLY1s6L37mL1++wsuyY/Og+9ft/2OAypgD4ld+dq9AAAAAElFTkSuQmCC" "627" "446" >}}

- Specify the sign-on URL and APP ID URI;

{{< caption-new "/uploads/2015/11/snip_20151126114150_thumb.png" "Sign-on URL and APP ID URI"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAdUlEQVR4nI3MSQ7CMBAFUd//NBA4DgrsEcRD2oNsdyGyixwhetl6v8w0O+iFmAutNY6u9445zxbSivOBkvP2VO0DNqfbgryfvBaL9wFnLZI8oHu4FUskiBBjRESQtI7Fy/27hqb7wgCnP6CqYq6P37DWSs6ZD8RBEYUS3MxmAAAAAElFTkSuQmCC" "626" "447" >}}

> **Note**: The sign-on URL does not matter in this case, because you will use a certificate to get the access token. I entered the Azure Web App URL where the WebJob is going to run.

- Once you have completed this wizard your application is added and you are able to specify the permissions for your application.

### Application permissions

Now that the Azure AD application is created, it is time to set the application permissions for your app.

- Click on the **Configure** tab of your application;
- Scroll to the bottom of the page and click on the **Add application**;

{{< caption-new "/uploads/2015/11/snip_20151126152137_thumb.png" "Permissions to other applications"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAASklEQVR4nD3Hyw2AIBBAQfrvwHjUbvSALZDQgAGWzy7P6MHbjJOspLuR00BESblQW6dI/d16x/m4cYSVMyxccUd1MOfEzDDVz+8fMQ1L9gvE98wAAAAASUVORK5CYII=" "832" "163" >}}

- Add the **Microsoft Graph **by clicking on the plus button and store this configuration;

{{< caption-new "/uploads/2015/11/snip_20151126152213_thumb.png" "Add Microsoft Graph to the permissions list"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjb8jGPfAAAAKklEQVR4nAEfAOD/AMPk873j9Lvj9Lvi88Pb6bbd7bXe77zj9LPd7cPk8oq+GYNVcWiuAAAAAElFTkSuQmCC" "715" "81" >}}

- Once the Microsoft Graph has been added to the list of permissions to other applications. Click on the **application permissions** dropdown and select your required set of permissions for your application;

{{< caption-new "/uploads/2015/11/snip_20151126152528_thumb.png" "Give the required set of permissions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAcUlEQVR4nB2OSQ4DIRAD+f8r5xKiRNMwEPatIvDNsqpkVWtlrUXvDXEe+zhaa+Sc8T/HzpwTNcY4ZfTO11huYw8UQsA5f7YtUmXTpVJK5XbhGHNKxBgJMTEXjG185MFYc4bX+8N1XWitERFEDDGlc+MP2Qmat0V2vNgAAAAASUVORK5CYII=" "836" "340" >}}

- Click on the **save** button at the bottom of the page to store your configuration.

### Configure your certificate public key in the application manifest

The next step is to configure your certificate public key in the Azure AD manifest. First of all you need to retrieve the keys. [Richard diZerega](https://twitter.com/richdizz "Richard diZerega") created a PowerShell script for this on his blog:

```powershell
$certPath = Read-Host "Enter certificate path (.cer)"
$cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2
$cert.Import($certPath)
$rawCert = $cert.GetRawCertData()
$base64Cert = [System.Convert]::ToBase64String($rawCert)
$rawCertHash = $cert.GetCertHash()
$base64CertHash = [System.Convert]::ToBase64String($rawCertHash)
$KeyId = [System.Guid]::NewGuid().ToString()
Write-Host "base64Cert:" $base64Cert
Write-Host "base64CertHash:" $base64CertHash
Write-Host "KeyId:" $KeyId
```

Once you have the **base64Cert**, **base64CertHash** and **KeyId** value, go back to your Azure AD application and download the manifest file:

{{< caption-new "/uploads/2015/11/snip_20151126160723_thumb.png" "Download Manifest file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAA7DAAAOwwHHb6hkAAABbElEQVR4nEWOS0/iYAAAv1+kRjcgXQtFqdLSVihUhCry2IKRzQqCgpr4ionx4MGbMVET78bE+IyI8a7cd3/A7kV/w2ziHvYwt5lkxM/f7xx3Xjnt9v7z3OOk+8ZZt8fR4yu//nwgLq4fCaeKpCtN7FKdRKGOU2zgeE2y1TaSkeXy9glxff/EZMZjfnGV0sIyXrVFaX6FcrVFpb6O4eS5eXhGXN11GLVc4tkyRtrDzJSxMt5nbKZLDEeS3Dx0/4lO4Tvt7X1qq7tUlrb4sbJDc22XuUoDaTzFXecFYaXzKDGXoDaFojtE7Vmi9gzBiSTh2DRhcxZrKo/whaLIepZAJI5uuxydnFNrbeALacjjNrLu4lc0hGqkkPVpJDXOWCzFUnsTt7iANGowoiaQtQwjqokofFtEMXOfLzmvwc7eIZv7Bzi5Ml/VJIqVJziRQPQP+RgMhBjwSSgRDSNuEzUTBIJh+oaGGfCH6P/i5y+KdN7iHOXB0QAAAABJRU5ErkJggg==" "134" "129" >}}

Open the manifest file, and replace the **keyCredentials** property with the following value:

```json
"keyCredentials": [
    {
        "customKeyIdentifier": "base64CertHash",
        "keyId": "KeyId",
        "type": "AsymmetricX509Cert",
        "usage": "Verify",
        "value":  "base64Cert"
    }
],
```

> **Important**: update the **base64Cert**, **base64CertHash** and **KeyId** value in this JSON string.
> When you updated the manifest file, upload it to the Azure AD application. Now you can almost start building your application.

## Certificate configuration on the Azure Web App

I created the service application as a Azure WebJob, this makes scheduling of the job very straight forward. Once you start building your application, the first thing you have to do is retrieving the certificate and getting an access token. To retrieve your certificate in your application, you can make use of Azure Key Vault or another option is to add the certificate to the App Web to which you publish your WebJob. The last approach is the one I used.

To configure a certificate on an Azure Web App, it should be scaled to the basic or standard tier.

{{< caption-new "/uploads/2015/11/snip_20151127115443_thumb.png" "Switching to basic tier"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAASUlEQVR4nC3GOwqAMBBFUfffuC53IFhrk0Y0byaTj1cEiwNnynKubNyf/9EGtT24OlE7tQ8mM0cysoSXQkSQXaTjZJk39jWhMF5pqUzCG9+rBgAAAABJRU5ErkJggg==" "466" "96" >}}

> **Note**: the whole certificate configuration process is explained on the following Azure documentation page: [Using Certificates in Azure Websites Applications](https://azure.microsoft.com/en-us/blog/using-certificates-in-azure-websites-applications/ "Using Certificates in Azure Websites Applications").

> **Important**: switching to basic tier brings a cost with it.

Once you uploaded the certificate to your Azure Web App, it should look like this:

{{< caption-new "/uploads/2015/11/snip_20151127115912_thumb.png" "Uploading your certificate"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAALElEQVR4nCXJyQ0AIAwDMPZflh4klegjCPVrL/MQWLrdikwdQNtcIMUa//cAGCsmx1jXf7AAAAAASUVORK5CYII=" "876" "119" >}}

> **Important**: Now there is one thing before you can start building your app. In order to be able to retrieve the certificate for your application, you have to make it accessible by adding an app setting: **WEBSITE_LOAD_CERTIFICATES** with the certificate **Thumbprint** value (you could also use "\*").

{{< caption-new "/uploads/2015/11/snip_20151127120442_thumb.png" "WEBSITE_LOAD_CERTIFICATES setting"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAPklEQVR4nCWMOQ7AMAzD8v+/1jegOBlUuB04UCC03JMeSWDznMvuS6CJ/TM++3INPiKMnBisKqoozexjfE5eaW1NT0BPk/4AAAAASUVORK5CYII=" "876" "171" >}}

Once this is added, you are ready to start developing.

## Building your daemon or service app

If you already have a Visual Studio web project, you can add the Azure WebJob project when you right-click on your web project > **New Azure WebJob Project**.

{{< caption-new "/uploads/2015/11/image_thumb4.png" "New Azure WebJob project"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA8klEQVR4nHWQS2+CQBhF+f//RxeumyZNFz5SnzBQYYAZhBkoUl/AaTSmi1ZvcnYnX757naWnEHLProKsvNJzvvT8jaOLA0LWv6Iy3WMx1ns22+omXknyM+dL91/8jAwrv0BmR5Rp0aZ9fFGElqVf8eFaguSEsk9+zLIIP1izDV3yIiY3Kbaq2R9aDqee7zuO621wfYErBKGUmLJk7cXMlopIHVFFd8ORacPcK/HjI4mBtGiRecNUGFZRQ/rVk9X31tciaXFB2w5ddewWc4KXV8K3d7LJFBtGODLKCZLmNo22Pbsa9GLBdDhgNhoxGQ4Q4zE/15h5+obq3o8AAAAASUVORK5CYII=" "455" "435" >}}

Another way to start is by creating a console application. Once you are finished you can publish it by right-clicking on the project > **Publish as Azure WebJob**. This is the method I used for this blog post.

{{< caption-new "/uploads/2015/11/snip_20151127121350_thumb.png" "Publish a application as an Azure WebJob"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjb8jGPfAAAAe0lEQVR4nB3BSwrCMBAA0Nz/Mm4ERRAXblypCFa0rWgSi81kivnMDCELBd9TzoEbIcScYrq/P9sWF0cz27Xz/WN5MirEODootbKIMH+rHDrYnHHdxFWT1WSH4XpLL5sBiJmYLr3RPhvPTyAVAG3Xg9YZkf4m9EKpCBWhHwv0bNs9sdsGAAAAAElFTkSuQmCC" "558" "202" >}}

> **Note**: more information about this can be found here: [Deploy WebJobs using Visual Studio](https://azure.microsoft.com/en-us/documentation/articles/websites-dotnet-deploy-webjobs/ "Deploy WebJobs using Visual Studio").

### Get the certificate

The first thing you need when you start building your application is to retrieve the certificate. This can be done as follows:

```csharp
private static X509Certificate2 GetCertificate()
{
    X509Certificate2 certificate = null;
    var certStore = new X509Store(StoreName.My, StoreLocation.CurrentUser);
    certStore.Open(OpenFlags.ReadOnly);
    var certCollection = certStore.Certificates.Find(X509FindType.FindByThumbprint, Thumbprint, false);
    // Get the first cert with the thumbprint
    if (certCollection.Count > 0)
    {
        certificate = certCollection[0];
    }
    certStore.Close();
    return certificate;
}
```

> **Note**: this piece of code requires the **Thumbprint** of your certificate in order to find it.

### Get an access token

Once you acquired the certificate in by code. Your next step is to retrieve an access token to call the Microsoft Graph API. Here is the code to retrieve an access token:

```csharp
private static async Task<string> GetAccessToken(X509Certificate2 certificate)
{
    var authenticationContext = new AuthenticationContext(Authority, false);
    var cac = new ClientAssertionCertificate(ClientId, certificate);
    var authenticationResult = await authenticationContext.AcquireTokenAsync(GraphUrl, cac);
    return authenticationResult.AccessToken;
}
```

> **Note 1**: this code requires the following NuGet package to be installed to your project: Microsoft.IdentityModel.Clients.ActiveDirectory.

> **Note 2**: this piece of code requires the **Authority** (https://tenant.onmicrosoft.com), **ClientId** (you can find it on the Azure AD application configure page), **GraphUrl** (https://graph.microsoft.com).

### Retrieving events from the Microsoft Graph API

Now that we have an access token, you are finally able to do calls against the Microsoft Graph API. Here is an example of how you can retrieve events:

```csharp
var client = new RestClient(GraphUrl);
var request = new RestRequest("/v1.0/users/{UserId or UserPrincipleName}/Events", Method.GET);
request.AddHeader("Authorization", "Bearer " + token.Result);
request.AddHeader("Content-Type", "application/json");
request.AddHeader("Accept", "application/json");

var response = client.Execute(request);
var content = response.Content;
```

> **Note 1**: this code is created with the **RestSharp** client, which can be installed from NuGet.

> **Note 2**: you have to specify the user's ID or Principle Name in order to retrieve the events.
> Once you have this, you can start adding your own calls and logic. The last thing that remains is publishing WebJob project to Azure and you are done.

{{< caption-new "/uploads/2015/11/snip_20151127130142_thumb.png" "WebJob result in Azure"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjb8jGPfAAAAUElEQVR4nDXCUQqAIAwAUO9/uM5Qugnp1ubUFPsJgh7PAQUkL51sSl3lr7akPea2HbmS9ksa6y3la0NtSJ3mAKI/PAREiEycU05nYmImLlpeQjRTo+JbiRMAAAAASUVORK5CYII=" "1161" "308" >}}

## Demo application code

The code of the demo application can be found at GitHub: [Microsoft Graph Service Application Demo](https://github.com/estruyf/MicrosoftGraphServiceAppDemo "Microsoft Graph Service Application Demo").

## Useful resources

The following links have helped me accomplish to create my service app:

- [Using Certificates in Azure Websites Applications](https://azure.microsoft.com/en-us/blog/using-certificates-in-azure-websites-applications/ "Using Certificates in Azure Websites Applications")
- [Performing app-only operations on SharePoint Online through Azure AD](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/05/03/performing-app-only-operations-on-sharepoint-online-through-azure-ad.aspx "Performing app-only operations on SharePoint Online through Azure AD")
- [Deploy WebJobs using Visual Studio](https://azure.microsoft.com/en-us/documentation/articles/websites-dotnet-deploy-webjobs/ "Deploy WebJobs using Visual Studio")
