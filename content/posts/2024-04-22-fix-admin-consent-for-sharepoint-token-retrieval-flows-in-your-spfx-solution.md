---
title: "Fix admin consent for SP token retrieval flows in SPFx"
longTitle: "Fix admin consent for SharePoint token retrieval flows in your SPFx solution"
customField: ""
slug: "/fix-admin-consent-sp-token-retrieval-flows-spfx/"
description: "Learn how to fix admin consent issues with the  00000003-0000-0ff1-ce00-000000000000 SharePoint Entra App."
date: "2024-04-22T11:23:02.324Z"
lastmod: "2024-04-22T11:23:02.905Z"
preview: "/social/d9a3aa96-35ef-4f9b-95e2-0d699ffac14b.png"
draft: false
comments: true
tags:
  - "SharePoint"
  - "SPFx"
  - "Entra"
type: "post"
---

There have been a couple of changes in SharePoint recently related to retrieving access tokens for your SharePoint Framework solutions. One of the changes is that MSAL V3 now uses the `/_api/Microsoft.SharePoint.Internal.ClientSideComponent.Token.AcquireOBOToken` API to retrieve the access token. Typically, this API was only used when loading your solution from Microsoft Teams, but it will now also be used when loading your solution from SharePoint.

Due to this change, one customer started to experience issues with their SPFx solution. The solution used the `@pnp/graph` library to retrieve the access token and call the Microsoft Graph API. They noticed the solution was no longer working and were redirected to the `/_forms/spfxsinglesignon.aspx` page.

The `/_forms/spfxsinglesignon.aspx` page is used to overcome an issue with third-party cookies or when something goes wrong with token retrieval.

{{< blockquote type="info" text="You can read more about it in the [Help my browser keeps refreshing my SharePoint page](https://www.eliostruyf.com/browser-refreshing-sharepoint-page/) article." >}}

## The issue

When looking into the issue, I saw failing calls to `/_api/Microsoft.SharePoint.Internal.ClientSideComponent.Token.AcquireOBOToken?resource="https://graph.microsoft.com"&clientId="72b90cbc-8519-4213-8c4a-1f3527b9f5f8"`.

The error message that was returned was the following:

```json {title="Token retrieval error",wrap=true,linenos=false}
{
  "odata.error": {
    "code": "10001",
    "message": {
      "lang": "en-US",
      "value": "AADSTS65001: The user or administrator has not consented to use the application with ID '00000003-0000-0ff1-ce00-000000000000' named 'Office 365 SharePoint Online'. Send an interactive authorization request for this user and resource. Trace ID: 322f4528-fb10-4407-89e4-9de76da38900 Correlation ID: 827721a1-4047-8000-9395-cd41d1d50a48 Timestamp: 2024-04-22 10:12:52Z"
    }
  }
}
```

{{< blockquote type="info" text="The `72b90cbc-8519-4213-8c4a-1f3527b9f5f8` client ID, is the `SharePoint Online Client Extensibility Web Application Principal` Entra app in my tenant, and this app is used by SharePoint Framework solutions to retrieve the access token." >}}

What was weird is that the error message mentioned the `00000003-0000-0ff1-ce00-000000000000` or `Office 365 SharePoint Online` application ID, as this trust should be automatically set.

When the page got redirected to the `/_forms/spfxsinglesignon.aspx` page, the following message was returned in the query string:

```text {title="Token retrieval error",wrap=true,linenos=false}
AADSTS650057 Invalid resource. The client has requested access to a resource that is not listed in the requested permissions in the client's application registration. Client app ID 08e18876-6177-487e-b8b5-cf950c1e598c (SharePoint Online Web Client Extensibility). Resource value from request 72b90cbc-8519-4213-8c4a-1f3527b9f5f8.
```

## The solution

The issue was that the `SharePoint Online Client Extensibility Web Application Principal` Entra app was missing the **Authorized client applications** for the `SharePoint Online Web Client Extensibility` app and `Office 365 SharePoint Online`.

{{< caption-new "/uploads/2024/04/missing-authorized-client-apps.webp" "Missing authorized client apps"  "data:image/jpeg;base64,UklGRngAAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCYAAAABH6CQbQTIH3P3aNxpREScFYratoGqvroLXlX+XAYiov8RH6EfH1ZQOCAsAAAAsAEAnQEqCgAFAAFAJiWkAALoMFR6AAD+/kYxmWl5IRQdKqAmna1wxoAAAAA=" "2652" >}}

To fix this issue, you need to add the following client IDs to the **Authorized client applications** of the `SharePoint Online Client Extensibility Web Application Principal` app:

- `08e18876-6177-487e-b8b5-cf950c1e598c` (SharePoint Online Web Client Extensibility)
- `00000003-0000-0ff1-ce00-000000000000` (Office 365 SharePoint Online)
- `1fec8e78-bce4-4aaf-ab1b-5451cc387264` (Microsoft Teams)
- `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` (Microsoft Teams Web Client)

{{< caption-new "/uploads/2024/04/authorized-client-apps.webp" "Authorized client apps"  "data:image/jpeg;base64,UklGRngAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCAAAAABHyAWTPzlesOZRkSEDMUNyMBR8aLHeCKi/9E8IULNA1ZQOCAyAAAA0AEAnQEqCgAEAAFAJiWkAuwBDv9PfEAA/vykxr+o2hp2BZuTM0Sz2nbIhtkBhw6cAAA=" "1710" >}}

I do not know why those apps were missing from the configuration. They should normally be automatically added when accessing the SharePoint admin API access page. The solution started to work again once the first two client IDs were added.

{{< caption-new "/uploads/2024/04/succesfull-token-retrieval.webp" "Successful token retrieval"  "data:image/jpeg;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSB8AAAAAu9jY2NjY2NjYu93//////////9272NjY2NjY2Ni7AFZQOCAsAAAA8AEAnQEqCgADAAFAJiWcAANTUDmoGfIAAP78au0BzWZ+saTJI/s0+PIAAAA=" "2534" >}}