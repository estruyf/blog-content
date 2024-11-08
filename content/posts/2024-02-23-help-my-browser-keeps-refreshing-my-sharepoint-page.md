---
title: Help my browser keeps refreshing my SharePoint page
longTitle: ""
customField: ""
slug: /browser-refreshing-sharepoint-page/
description: Learn how to fix your SharePoint page from going into an endless refreshing loop when third-party cookies are blocked.
date: 2024-02-23T14:05:23.917Z
lastmod: 2024-02-23T14:05:24.546Z
preview: /social/6d66ef68-5495-4ba2-b85b-142b75074576.png
draft: false
comments: true
tags:
  - Browsers
  - Cookies
  - SharePoint
  - Troubleshooting
type: post
---

One of my customers reported that their SharePoint page kept refreshing in Firefox. While investigating the issue, it turned out it was an issue with the Microsoft Graph permission scope that was missing.

All we had to do was approve the permission scope in the SharePoint Admin Center - API access page, and it was fixed; the page stopped refreshing.

Although the solution is simple, I wanted to understand why this was happening.

## Why does the page keep refreshing?

Let us first check the experience:

{{< video "/uploads/2024/02/page-refresh-issue.mov" "SharePoint page refresh issue" >}}

When you look closely at the video, you will see that the page gets redirected to `/_forms/spfxsinglesignon.aspx`, bringing you back to the original page.

The `/_forms/spfxsinglesignon.aspx` page is used to overcome an issue with the third-party cookies, which are blocked by default in Firefox, and soon other browsers will do the same.

{{< blockquote type="info" text="The Chrome team is currently rolling this out (Q3 2024) - [Prepare for third-party cookie restrictions](https://developers.google.com/privacy-sandbox/3pcd)" >}}

As Firefox is blocking the third-party cookies, the flow of loading your page and solutions goes like this:

- The page loads
- The solution loads
- The solution code tries to retrieve an access token for Microsoft Graph
- The page gets redirected to `/_forms/spfxsinglesignon.aspx` to get the access token
- An error is returned (but you do not see this), and the page gets redirected back to the original page

{{< caption-new "/uploads/2024/02/msal-error.png" "Error during the token retrieval"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJElEQVR4nGPISIz/nxof+x9Mx8X8T4FikBgIp8RG/09LjP8PAKwBFUdUJJ/5AAAAAElFTkSuQmCC" "1224" >}}

- The original page loads and it starts all over again

## Why did it not happen before?

The issue does not occur in Chrome or Edge when writing the article. Third-party cookies are not yet blocked by default in these browsers.

As it is not yet blocked, the access token for Microsoft Graph is retrieved with the implicit grant flow, which uses the hidden iframe. As this is not blocked, only an error is returned in the console.

{{< caption-new "/uploads/2024/02/msal-error-console.webp" "MSAL token retrieval error"  "data:image/jpeg;base64,UklGRl4AAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSA0AAAABD/B294gIsQIR/Q8FAFZQOCAqAAAA0AEAnQEqCgACAAFAJiWUAnQBA310CsAA/vfSRMvtBdvZcg2puVeryuAA" "2568" >}}

This error gives the developer enough information to understand what is happening and fix the issue.

## How to fix the issue

### Solution 1: Approve the permission scope

The clean solution is to approve the permission scope in the SharePoint Admin Center - API access page. 

This solution allows your code to retrieve the access token by just one redirect and stops the page from refreshing.

### Solution 2: Configure sites for third-party cookie exceptions

It feels like we are back in Internet Explorer, where we had to tell our customers to add their SharePoint URL to the trusted sites. For Firefox, you can configure the third-party cookie exceptions in the settings.

Follow the following steps to configure the exceptions:

- Open the Firefox settings
- Go to the `Privacy & Security` tab
- In the `Enhanced Tracking Protection` section, click on the `Manage Exceptions...` button
- Add the SharePoint URL to the exceptions

{{< caption-new "/uploads/2024/02/firefox-exceptions.png" "Firefox third-party cookie exceptions"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACZSURBVDXBzWrCQBSA0W9u7oiLYvEHFN0VobQb3/89XIhrF4agCZJpmsxMxgTxHLP/+j6pZotMhMn0A+dqmqbhJSGSoap3LatyGUJY/fwe2Ky3WKuM6tpRFDnn85GB0QgkEf69J68qYoyMRIQ2Bt5UjSECPgTkUZJSous6Rt53vGnf9zdjTBJVZp9zrLXUf452s8MVOVwvDO5Pvx9DV13RrgMAAAAASUVORK5CYII=" "2602" >}}

Once configured, the solution will now try to retrieve the access token with the hidden iframe instead of getting redirected to `/_forms/spfxsinglesignon.aspx`.

{{< blockquote type="important" text="Chrome and Edge have similar settings." >}}

## Resources

If you want to know more about the third-party cookie restrictions, you can read the following resources:

- [Prepare for third-party cookie restrictions](https://developers.google.com/privacy-sandbox/3pcd)
- [SharePoint Framework (SPFx), Authenticating to API's and Third Party Cookies](https://www.blimped.nl/spfx-authentication-and-third-party-cookies/)
- [Allowing third-party cookies on your device](https://desystemshelp.leeds.ac.uk/help-allowing-third-party-cookies/)
- [Plans for MSAL 2.0 / Third-party cookies #5966](https://github.com/SharePoint/sp-dev-docs/issues/5966)
