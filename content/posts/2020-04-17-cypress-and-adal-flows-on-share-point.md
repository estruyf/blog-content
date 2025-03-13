---
title: >-
  How to use Cypress to test your SharePoint solution with an Azure AD-secured
  API
slug: /cypress-test-sharepoint-solution-azure-ad-secured-api/
author: Elio Struyf
type: post
date: 2020-04-17T15:19:10.723Z
draft: false
tags:
  - Development
  - SharePoint
  - Testing
  - UI Tests
  - Cypress
categories: []
comments: true
---

How to use Cypress to test your SharePoint solution with an Azure AD-secured API

In January 2020, I explained my approach to how you can make use of Cypress to test out your SharePoint solutions. Cypress is great to use and simple to configure. I like the capability of running individual tests on your local machine to verify if the solution is still working as expected once you implemented changes, and do full runs after nightly builds.

> **Info**: Related article: [Using Cypress for end to end testing your SharePoint solutions](https://www.eliostruyf.com/cypress-testing-sharepoint-solutions/)

There is one thing I did not explain yet. The approach that I provided only works for solutions that require SharePoint access. When you have a solution that includes an Azure AD-secured API like the Microsoft Graph, this approach is not going to work.

{{< caption-new "/uploads/2020/04/cypress1.png" "Canceled Access Token retrieval via ADAL"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABCSURBVBXBwQ2AIBREwbeKdsBFLYX+e8ECYGP4wTCjUspsrWGbJeeMbcYYzP1kUXyk637o3UhCEktEIAlt4kgH9a3810YZowYvwy4AAAAASUVORK5CYII=" "402" >}}

## Why does it not work?

The reason why it does not work is because of a limitation in Cypress (web security).

{{< caption-new "/uploads/2020/04/cypress2.png" "Failing Cypress tests due to missing access token" >}}

Currently, when requesting access to an Azure AD-secured API. You first need to get an access token. If you are using the default SharePoint Framework approach for it, it will request it via an ADAL flow. The ADAL flow will use a hidden iframe that performs a cross-origin call to `login.microsoftonline.com`. This cross-origin call will not work as Cypress will prevent it.


{{< caption-new "/uploads/2020/04/cypress3.png" "ADAL hidden iframe on the page" >}}

> **Info**: You can find more information about Cypress and cross-origin iframes here: [https://docs.cypress.io/guides/guides/web-security.html#Cross-origin-iframes](https://docs.cypress.io/guides/guides/web-security.html#Cross-origin-iframes).

In the future, Cypress will support these kinds of implementations, but at the moment, there is no clean way to support it.

Does that mean you cannot use Cypress for testing your solutions with Azure AD-secured APIs? Not at all, you will be able to do this, but you have to implement some changes.

## Gathering the required data

As Cypress cannot request an access token via the hidden iframe automat, you will have to do this yourself. The workaround is to implement the **password credentials** flow. With this flow, you can get an access token by passing the username, password, tenant, `client ID` of the Azure AD App, and client secret of the Azure AD App (it depends).

> **Info**: As you already have the username and password of the user to access SharePoint, you need only three new parameter values.

If you do not know these parameter values, you can retrieve the tenant and client ID from the `login.microsoft.com` call.

{{< caption-new "/uploads/2020/04/cypress4.png" "Check your login.microsoft.com call to retrieve the right parameters"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAAB0SURBVBXBMQ7CMBBFwbdeJx2iAkQHyknScf8TIGioKCLc2N585Bl7rKu6RJpnzAzM2HfRW8XMqLUy5M9WAFHrl+v5RGuNQRLuTkqJiCCX34byhI7O8/2CPEEPcMdaQ9ohJfJyv1FKQRJ2OTD03nF3hohAEn8S0TuX/2PbXgAAAABJRU5ErkJggg==" "591" >}}

You can also retrieve them from the Azure Portal -> Azure Active Directory:

- **Tenant**: You can retrieve the tenant ID from the properties section (Directory ID).
- **Client ID**: You can retrieve this ID your Azure AD Application (application ID).

> **Info**: You can find more information about this flow here: [Microsoft identity platform and OAuth 2.0 Resource Owner Password Credentials](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth-ropc).

<blockquote class="important">
<p><strong>Important</strong>: The flow requires you to provide a client secret when your Azure AD App is not registered as a public client. By default, the public client is turned off (on the authentication section).</p>
</blockquote>

{{< caption-new "/uploads/2020/04/cypress5.png" "Client Secret creation"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACrSURBVE3BQXLCMAxA0S9LstNQyv3PSBcdICTBjtRh0Zm+J4/bdz63QFW53oNj7AiCqhIZCIKZYT0ql0vD3bG2sa4KJP+JCBYkqsqbSlIVWpsopZCZ/LG+LVzXha/zmWJORGBmuDsiQu8dEcHEGuUYtOmDI4J5nokI9n3H3XF33qzWStWJMQbjCO63H06nT9yd3juv1wsRoYzeGWOgqohARmBaEBIhIYPn8uAXWRVSEk3ehmQAAAAASUVORK5CYII=" "783" >}}

When you would not provide the `client secret`, you might end up with the following error:

{{< caption-new "/uploads/2020/04/cypress6.png" "No client secret provided with the password flow"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACOSURBVG3BUWoDMRBEwdc9IxFy/3M6hv2I19rVGMUEEuMq3b6uNfcbkY3MBhQU/wyKLDb4LMoHZx8g8WoOyDYuqAZkwC4UhjCLerLUTKwQ6gkWEjALxgmz4Jz8SmxI4TCEQeKdnNs3Ogr1BBtJFAUFykAtWFJhqIO6H/zoiXoD8SSxJBaLJPTRwEYtIMxfD99RMDYlrxMeAAAAAElFTkSuQmCC" "804" >}}

## Implementing the flow to grab the access token

Once you have the username, password, tenant, client ID, and client secret, you can request the access token as follows:

{{< gist estruyf ad69ff9001887351ee595ca6c8efc4db >}}

What you can see in the above code, is that Cypress will first authenticate and get an access token from Azure AD for the provided resource. 

> **Info**: I provided these parameter values as in the Cypress config file.

Once the access token is retrieved, it will add the required session storage values to the current browser window, so that the SharePoint will initiate the ADAL flow.

> **Info**: If you implemented your own ADAL flow, you should be able to use a similar approach. Usually, only the way where and how you store the access token is different.

## Testing it out

Once everything is in place, all you have to do when writing your test is use `cy.visitWithAdal(pageUrl)` instead of `cy.visit(pageUrl)`. This way, Cypress first does the Azure AD authentication flow and grabs the access token, before it starts loading SharePoint.

{{< caption-new "/uploads/2020/04/cypress7.png" "The result of the tests with the ADAL flow included"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA6SURBVG3BsQ2AQAwEwT2DLDmmGAogoFGgyJf+TEbEjK7n7kVBRGAbSdjm02a6WffzYFNSVWQmf8YYvHtiEeR0yH39AAAAAElFTkSuQmCC" "832" >}}

## Example project

I have adapted the example project to include this scenario for you to check out the code. You can find the project here: [https://github.com/estruyf/cypress-sharepoint-sample](https://github.com/estruyf/cypress-sharepoint-sample).

*Happy testing*
