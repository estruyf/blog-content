---
title: Things you need to know when implementing Azure AD in your Office add-ins
author: Elio Struyf
type: post
date: 2014-10-28T14:52:13+00:00
slug: /things-need-know-implementing-azure-ad-office-apps/
dsq_thread_id:
  - 3836535653
categories:
  - Apps
  - Office
  - Office 365
tags:
  - Apps
  - Excel
  - JavaScript
  - Office
  - Office App
  - Outlook
  - OWA
  - PowerPoint
  - Project
  - Word
comments: true
---

Some time ago I wrote a sample Office app made use of Azure Active Directory to get access to SharePoint resources. I experienced some different behaviour in my Office App between the online client (Outlook Web App) and the rich client. This post describes the behaviour I noticed when implementing Azure AD authentication in my Office App.

## Background information

The implementation of Azure AD in an Office App can be achieved in two ways:

1.  You can use the Office 365 API tools ([Microsoft Office 365 API Tools Extension](https://visualstudiogallery.msdn.microsoft.com/7e947621-ef93-4de7-93d3-d796c43ba34f));
2.  You can do it yourself by writing all the redirection code yourself.

I used both of them, if you go for the second approach, you get a better understanding in how things work. With the first approach a lot is automated (example: you do not need to create the authorization URL yourself), but in the end, they should both get the same result: an access token.

When my app opens, it gets redirect to the authorization link to retrieve the RefreshToken from Azure AD. When the RefreshToken is retrieved, the AccessToken can be created, and that can be used to open a SharePoint context / call the SharePoint REST APIs / etc... This is how my code looked like in the beginning:

```csharp
private readonly string _clientId = ConfigurationManager.AppSettings["ida:ClientID"];
private readonly string _appKey = ConfigurationManager.AppSettings["ida:Password"];

// https://login.windows.net
private readonly string _authorizationUri = ConfigurationManager.AppSettings["ida:AuthorizationUri"];

private const string ServiceResourceId = "https://<tenant>.sharepoint.com";

public async Task<ActionResult> Index(string code)
{
    var authContext = new AuthenticationContext(_authorizationUri + "/common", true);

    // Check if you received an authorization code, if not you need to sign in
    if (code == null)
    {
        // Get the authorization URL (https://login.windows.net/common/oauth2/authorize)
        var redirectUri = authContext.GetAuthorizationRequestURL(ServiceResourceId, _clientId, new Uri(Request.Url.AbsoluteUri.Split('?')[0]), UserIdentifier.AnyUser, string.Empty);
        return Redirect(redirectUri.ToString());
    }

    // If the code is empty, show the user the error page
    if (String.IsNullOrEmpty(code)) return RedirectToAction("Error", new { error = "AuthToken", error_description = "The authorization code was not correclty retrieved."});

    // If a code is retrieved, the access token can be generated
    var clientCredentials = new ClientCredential(_clientId, _appKey);
    var authResult = await authContext.AcquireTokenByAuthorizationCodeAsync(code, new Uri(Request.Url.AbsoluteUri.Split('?')[0]), clientCredentials);
    Session["AccessToken"] = authResult.AccessToken;

    return RedirectToAction("SiteInfo");
}
```

When the index page gets loaded, the first thing to do is to check if the authorization code is null. If this is true that means that you need to be redirected to Azure AD to get authenticated. Once you are authenticated, it will give pass that authentication token to your app.

So if the first check is true, then you are going to retrieve the authentication URL, and redirect to it. Once you are authenticated you will be redirected back to your app, and the code variable will not be null. This authentication code can be used to create an AccessToken to use for calling your Office 365 resources.

### Outlook Web App

This is what happens in Outlook Web App when the app gets opened:

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune1.png" "OWA - Mail App Error"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAbklEQVR4nD3CQQrCMBAF0Nz/DO4E3XTjWsjCSwhBEe2iESK2STqJP5OJtIiPpwDUnzJPFz+eozdzNMg3xl0RkSxaE8Tn4XHd2H77sns37GjslHMuBA8UIH3o9LZdCseSdUmas1Z5xSupLMKt1f8vBg5wGWt77sMAAAAASUVORK5CYII=" "494" "215" >}}

The app returns an error. If you check the authentication flow in Fiddler, you can see that everything worked just fine:

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune2.png" "Fiddler Authentication Flow"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARklEQVR4nAXBSQ6AIAwAQP7/Nq8mJm4JItJiW0qscGTGSYQu+pOGzefEyq2QCRm/n9XucD3ag3bDPi3XfKIHDlkTl0hGdQCyUzcKcNBJZwAAAABJRU5ErkJggg==" "998" "220" >}}

The client did go to the index page (line 2) of that app, and from that index page it got redirected to the Azure AD login page (line 4). The authentication was fine, you can see that on line 8 the **RefreshToken** has been passed from Azure AD. The last line show that the client has been redirected to the **SiteInfo** page. That is the page where I make use of the **AccessToken** that was created on the landing page. So the error has nothing to do with the authorization process.

If you check the HTML of the error, you notice that this is a DIV container which is placed above the Office App iframe.

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune3.png" "Error container HTML"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AO/q9ero++vr/+/s++3r++/t+/Dt+/Hx/vf3/fr6/rZGHIapB391AAAAAElFTkSuQmCC" "1252" "132" >}}

When you remove the error container or hide it via CSS, you will see that your app is loaded without a problem:

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune4.png" "OWA - Mail App loaded behind the error container"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgklEQVR4nGP49evXv3///v//9+PX74kHn5Zvvle3/UH1tof1u57W73rK8P3799+///z/9+/Lj99hS+8ZTrphPuWGbv9Vzd4rmr1XGD58+PDjx49///79/ffv6esP95+/e/vtz9uvv99+AyGGv3//gg0Hga9fPn/68O7nj+8Q7v///wEi4Gf2LfoCeAAAAABJRU5ErkJggg==" "498" "215" >}}

**Note 1**: my app uses the AccessToken to connect to SharePoint and get the Site Title.

**Note 2**: you could also click on the retry button, this leads to another error message with a start button. If you then click on the start button, you get an error, which in my case did not have anything to do with the real problem.

### Outlook Rich Client

In the Outlook Rich Client the behaviour is completely different. You will get redirected to the Azure AD login page, and you will need to pass your credentials (this is not needed in the OWA because you are already logged in).

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune5.png" "Outlook Rich Client - Sign in"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAy0lEQVR4nFXPQW6EMAwFUO7e23TRI3TdfbvvohKkMAyEJIpj+zsVBA3TrywiPVn+7u5JnC9jKFPg9kRRqwGIMXaiUJjAjg9EYQaznb33nZmJSEoRQH2KiDjndlZVImJmVZUjjfu+72qtOWfn3LZtIYR1XUMIFz+mVRVH2mJmHoZh51LKPM+3I8uyEFHOmYhOZubf8RZiEmFmbuuvaUAo3eO2jNPUej1Xs9Hj9YM+f3Ywuw47+XvUl7fw/kW1muL0R3OYVcCIsSaQ/OM/Aeda3sPQh08AAAAASUVORK5CYII=" "349" "426" >}}

When I filled in my credentials and clicked on the **Sign in** button, the following happens:

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune6.png" "Outlook Rich Client - Pop-up"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlUlEQVR4nCXNWwrCMBCF4ex/I74ruAMXoPjWWgSlBU1ba5KZTC5zpPX5+w/H7C7DvukOt+50f597d7wO7XOsQCqaUjKfwIiEkqEKgFOxjiSyiBCRGb9hmW0IJJIAUMx28X6ZnHPee9O85PGOwH8MTrmfQtvHWiszGxuK5BU2Xdk6poSq2JiKVA1ZKSsXnbnMtL6sKfMPZnGrogX9dK8AAAAASUVORK5CYII=" "973" "595" >}}

An Internet Explorer window opens, and I need to sign in again, and the app will stay on the sign in page.

## Solutions

### Outlook Rich Client pop-up solution

The first thing to solve is the rich client problem. This is an easy one, the problem here is that the Azure AD login page (https://login.windows.net) and Identity Provider (https://login.microsoftonline.com) is not added to the **App Domains **list in the Office App manifest.

To solve this, go to the Office App Manifest, open the **App Domains** tab. This should be empty by default:

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune7.png" "App Domains"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAX0lEQVR4nHXKwQoCMQxF0fz/l1aaGJO+pJRGlBkZcKFnebl0ZxGWA/Ottd4ZwDgBoHakzicRUX2YuV1IVd39s48xIiIzIxIId6c5Z1U9L/VlrUVV9fpj700A8hcAZvYG/ResY5woinEAAAAASUVORK5CYII=" "682" "392" >}}

Add the Azure AD login and the Identity Provider URL to the app domains:

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune8.png" "App Domains"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZklEQVR4nGXMuw7EIAxEUf//jyJke/FzCyAQiUhpcopbjQYIkZCYmZBKKYgYEW7m7hkBtVZEejBza01VVU5EgYhE5KzdzCIij4hQM/gdmXl99N5hzrn3XmvtjzEGZOb/eD5f7i4iN8fTq9JYT1FMAAAAAElFTkSuQmCC" "683" "384" >}}

When these settings are stored, you are able to sign in without you getting any pop-up.

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune9.png" "Outlook Rich Client - App loaded"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAvElEQVR4nGP49vPPlx9/vv78A2KA2X///YeAP79/Mqy88CZ/48PyrY/Ktz6u3Pa4Ytvj2p1PGnc/qdj2aMmZVwz5Gx+KNV3Q6L6s2nVZseOScON5ocbzIo3nWavORi27y7D43JuMDY+Ltz7J3fgwd+PD7A0glLvxYcqaB9OPv2T4/evXl48fvn35DLUQCfz9+5fh67dv9+7ff/T48YePH3//+fv33384+vP3L8OfP39+gMHXr1///v2LphsAMKeuSmLrwlgAAAAASUVORK5CYII=" "343" "233" >}}

> **Note**: if you are testing this in the Outlook rich client, I noticed some caching problems. What you could do if your app gets loaded is to right click in the app and click on **reload**. This should solve the caching problems.

{{< caption-new "/uploads/2014/10/102814_1452_Thingsyoune10.png" "Outlook Rich Client - App reload"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAxUlEQVR4nAG6AEX/AOLv+N3s99np9eHu+N/t99nq9+fz++z1/Ofy+erw8wB2teJIndlPoNpRodpLntpiqdx5sdp1sNlzst2y0ecAUKHbHYbRJYrSKYzTD3/Qg7nf9u3m3N3d8e/u8O/tALzb8KnS76zT76rR7abP7cPb7dHW3cbO19fg6tvj7AD49vXw6+f38/D////////z9vnk6vDn7PLo7fTl6u8A8vP04+Xm5+nq7O7v+vz9/f7/////////////+/v6G3aWOnmroyIAAAAASUVORK5CYII=" "344" "222" >}}

### Fixing the Outlook Web App problems

The Outlook Web App problems seems to be related to a context that is undefined in JavaScript (sometimes a JavaScript error pop-up appears in IE). My thoughts were that the redirection via C# is handled off to fast in the OWA context. What I tried was to do the redirection via JavaScript, which worked perfectly fine. By doing it via JavaScript, you could first initialize your Office app, and then do the redirection.

> **Note**: I got this idea because in my first POC I did everything via JavaScript, and in that app I did not experience any problems with Azure AD.

Here is my updated code for the JavaScript redirection:

```csharp
public async Task<ActionResult> Index(string et, string code)
{
  var authContext = new AuthenticationContext(_authorizationUri + "/common", true);

  // Check if you received an authorization code, if not you need to sign in
  if (code == null)
  {
    // Get the authorization URL (https://login.windows.net/common/oauth2/authorize)
    var redirectUri = authContext.GetAuthorizationRequestURL(ServiceResourceId, _clientId, new Uri(Request.Url.AbsoluteUri.Split('?')[0]), UserIdentifier.AnyUser, string.Empty);

    // Redirect the client based on the context (Rich Client or Online)
    if (et == null)
    {
      return Redirect(redirectUri.ToString());
    }
    @ViewBag.URL = redirectUri.ToString();
    return View();
  }

  // If the code is empty, show the user the error page
  if (String.IsNullOrEmpty(code)) return RedirectToAction("Error", new { error = "AuthToken", error_description = "The authorization code was not correclty retrieved."});

  // If a code is retrieved, the access token can be generated
  var clientCredentials = new ClientCredential(_clientId, _appKey);
  var authResult = await authContext.AcquireTokenByAuthorizationCodeAsync(code, new Uri(Request.Url.AbsoluteUri.Split('?')[0]), clientCredentials);
  Session["AccessToken"] = authResult.AccessToken;

  return RedirectToAction("SiteInfo");
}
```

The changes are done in the highlighted code block (in the if statement to know if the code variable is null). In that block I added a check to see if the app is opened in OWA or the rich client. If the app is opened in the browser a query string property **et** gets added, you can find more information here: [Check if your mail app is opened in Outlook Web App or Outlook rich client](https://www.eliostruyf.com/check-mail-app-opened-outlook-web-app-outlook-rich-client/).

If the app is loaded in the rich client context, the redirection is done via managed code. For OWA the Azure AD authorization URL gets stored in a ViewBag property and will be used to redirect via JavaScript. The code on the index page looks like this:

```html
<script>
  Office.initialize = function (reason) {
    window.location.href = "@ViewBag.URL";
  };
</script>
```

The code is not that special, it first initializes the Office context before it does the redirection to Azure AD. If you test this in OWA, the app should work fine without showing the error container like before.

> **Note**: it is best to have a blank landing page (no content on the page), that way when the app gets loaded, you would not notice the authentication process.

## Controller code

{{< gist estruyf b7c7603d33c902860e9f >}}

## Changes

### 31/10/2014

Updated the code samples to support the new Office 365 API tools. A couple of things have changed when Microsoft published the new update this week (link to the extension: [here](https://visualstudiogallery.msdn.microsoft.com/7e947621-ef93-4de7-93d3-d796c43ba34f "Microsoft Office 365 API Tools Extension")). The biggest change was the DiscoveryContext, this is now obsolete. The authentication process works a bit differently now.