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

{{< highlight csharp "linenos=table,noclasses=false" >}}
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
{{< / highlight >}}

When the index page gets loaded, the first thing to do is to check if the authorization code is null. If this is true that means that you need to be redirected to Azure AD to get authenticated. Once you are authenticated, it will give pass that authentication token to your app.

So if the first check is true, then you are going to retrieve the authentication URL, and redirect to it. Once you are authenticated you will be redirected back to your app, and the code variable will not be null. This authentication code can be used to create an AccessToken to use for calling your Office 365 resources.

### Outlook Web App

This is what happens in Outlook Web App when the app gets opened:

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune1.png" "OWA - Mail App Error" >}}

The app returns an error. If you check the authentication flow in Fiddler, you can see that everything worked just fine:

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune2.png" "Fiddler Authentication Flow" >}}

The client did go to the index page (line 2) of that app, and from that index page it got redirected to the Azure AD login page (line 4). The authentication was fine, you can see that on line 8 the **RefreshToken** has been passed from Azure AD. The last line show that the client has been redirected to the **SiteInfo** page. That is the page where I make use of the **AccessToken** that was created on the landing page. So the error has nothing to do with the authorization process.

If you check the HTML of the error, you notice that this is a DIV container which is placed above the Office App iframe.

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune3.png" "Error container HTML" >}}

When you remove the error container or hide it via CSS, you will see that your app is loaded without a problem:

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune4.png" "OWA - Mail App loaded behind the error container" >}}

**Note 1**: my app uses the AccessToken to connect to SharePoint and get the Site Title.

**Note 2**: you could also click on the retry button, this leads to another error message with a start button. If you then click on the start button, you get an error, which in my case did not have anything to do with the real problem.

### Outlook Rich Client

In the Outlook Rich Client the behaviour is completely different. You will get redirected to the Azure AD login page, and you will need to pass your credentials (this is not needed in the OWA because you are already logged in).

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune5.png" "Outlook Rich Client - Sign in" >}}

When I filled in my credentials and clicked on the **Sign in** button, the following happens:

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune6.png" "Outlook Rich Client - Pop-up" >}}

An Internet Explorer window opens, and I need to sign in again, and the app will stay on the sign in page.

## Solutions

### Outlook Rich Client pop-up solution

The first thing to solve is the rich client problem. This is an easy one, the problem here is that the Azure AD login page (https://login.windows.net) and Identity Provider (https://login.microsoftonline.com) is not added to the **App Domains **list in the Office App manifest.

To solve this, go to the Office App Manifest, open the **App Domains** tab. This should be empty by default:

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune7.png" "App Domains" >}}

Add the Azure AD login and the Identity Provider URL to the app domains:

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune8.png" "App Domains" >}}

When these settings are stored, you are able to sign in without you getting any pop-up.

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune9.png" "Outlook Rich Client - App loaded" >}}

> **Note**: if you are testing this in the Outlook rich client, I noticed some caching problems. What you could do if your app gets loaded is to right click in the app and click on **reload**. This should solve the caching problems.

{{< caption-legacy "uploads/2014/10/102814_1452_Thingsyoune10.png" "Outlook Rich Client - App reload" >}}

### Fixing the Outlook Web App problems

The Outlook Web App problems seems to be related to a context that is undefined in JavaScript (sometimes a JavaScript error pop-up appears in IE). My thoughts were that the redirection via C# is handled off to fast in the OWA context. What I tried was to do the redirection via JavaScript, which worked perfectly fine. By doing it via JavaScript, you could first initialize your Office app, and then do the redirection.

> **Note**: I got this idea because in my first POC I did everything via JavaScript, and in that app I did not experience any problems with Azure AD.

Here is my updated code for the JavaScript redirection:

{{< highlight csharp "linenos=table,noclasses=false" >}}
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
{{< / highlight >}}

The changes are done in the highlighted code block (in the if statement to know if the code variable is null). In that block I added a check to see if the app is opened in OWA or the rich client. If the app is opened in the browser a query string property **et** gets added, you can find more information here: [Check if your mail app is opened in Outlook Web App or Outlook rich client](https://www.eliostruyf.com/check-mail-app-opened-outlook-web-app-outlook-rich-client/).

If the app is loaded in the rich client context, the redirection is done via managed code. For OWA the Azure AD authorization URL gets stored in a ViewBag property and will be used to redirect via JavaScript. The code on the index page looks like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<script>
  Office.initialize = function (reason) {
    window.location.href = "@ViewBag.URL";
  };
</script>
{{< / highlight >}}

The code is not that special, it first initializes the Office context before it does the redirection to Azure AD. If you test this in OWA, the app should work fine without showing the error container like before.

> **Note**: it is best to have a blank landing page (no content on the page), that way when the app gets loaded, you would not notice the authentication process.

## Controller code

{{< gist estruyf b7c7603d33c902860e9f >}}

## Changes

### 31/10/2014

Updated the code samples to support the new Office 365 API tools. A couple of things have changed when Microsoft published the new update this week (link to the extension: [here](https://visualstudiogallery.msdn.microsoft.com/7e947621-ef93-4de7-93d3-d796c43ba34f "Microsoft Office 365 API Tools Extension")). The biggest change was the DiscoveryContext, this is now obsolete. The authentication process works a bit differently now.