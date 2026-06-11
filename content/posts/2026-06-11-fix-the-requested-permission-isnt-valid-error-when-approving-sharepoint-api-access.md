---
title: "Fix invalid Microsoft service API permissions in SharePoint"
longTitle: "How to fix missing Microsoft service API permissions in SharePoint Admin Center when approving API access"
slug: "/fix-invalid-microsoft-service-api-permissions-sharepoint/"
description: "Learn how to fix invalid Microsoft service API permissions in SharePoint and ensure smooth SPFx solution deployment."
date: "2026-06-11T08:40:22.542Z"
lastmod: "2026-06-11T08:40:23.113Z"
preview: "/social/d17540eb-b8a5-471d-bd4b-adffed22d60e.png"
draft: false
comments: true
tags:
  - "Azure CLI"
  - "Microsoft Entra ID"
  - "SharePoint"
  - "SPFx"
  - "Troubleshooting"
type: "post"
fmContentType: "post"
---

Earlier this week, Microsoft was testing one of our solutions for marketplace review. As part of this, we had to ask for API permissions for a Microsoft service. We got an error saying they could not approve the Azure Storage API permissions because "the requested permission isn't valid".

The full error message was:

> *The requested permission isn't valid. Reject this request and contact the developer to fix the problem and redeploy the solution.*

I wrote an article on how to [approve a multi-tenant WebApiPermissionRequests scope for your SPFx solution](https://www.eliostruyf.com/approve-multitenant-permission-scope-spfx-solution/), and that fixed a similar issue. In this case, the issue was not a multi-tenant app. It was a first-party Microsoft service that *should* have been available in my tenant.

Here is how I looked into the problem, why it happened, and how to fix it quickly.

## The configuration challenge

For this project, I needed my SPFx web part to connect to Azure Storage. In my `package-solution.json` file, I asked for the `user_impersonation` scope for the Azure Storage app ID (`e406a681-f3d4-42a8-90b6-c2b029497af1`).

Here is what that looks like:

```json
{
  "webApiPermissionRequests": [
    {
      "resource": "e406a681-f3d4-42a8-90b6-c2b029497af1",
      "scope": "user_impersonation"
    }
  ]
}
```

Usually, deploying a package with this setup creates a pending API request in the SharePoint Admin Center. But when I tried to approve it, I got the "requested permission isn't valid" error.

## The investigation: looking under the hood

When the UI shows an unclear error, the best next step is to open your browser's developer tools. I went back to the API access page in the SharePoint admin site, opened the Network tab, and clicked the approve button again.

I saw that the page called Microsoft Graph to get the Service Principal for the App ID I provided:

```text
https://graph.microsoft.com/beta/servicePrincipals/?$filter=appId eq "e406a681-f3d4-42a8-90b6-c2b029497af1"
```

The response gave the main clue:

```json
{
    "@odata.context": "https://graph.microsoft.com/beta/$metadata#servicePrincipals",
    "value": []
}
```

An empty `value` array meant the Service Principal did not exist in my tenant.

At first, this was confusing. This is not a custom third-party app; it is Azure Storage. To confirm, I went to Microsoft Entra ID (formerly Azure AD) and tried to find the API permission by hand. Still nothing.

{{< caption-new "/uploads/2026/02/missing-api-permission.webp" "Missing the Azure Storage API permission"  "data:image/jpeg;base64,UklGRjAAAABXRUJQVlA4ICQAAACQAQCdASoKAAMAAUAmJaQAApz+dxAA/v7FryKPtm16OYgAAAA=" "1684" "570" >}}

Then I opened my terminal and checked with the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/). When I ran a command for the tenant, I got a message saying there was no active Azure subscription.

That explained everything. I was working in a tenant without an Azure subscription (Azure services run in another tenant), so the Azure Storage Service Principal was never created automatically.

## The solution: creating the missing Service Principal

Once you know the Service Principal is missing, the fix is simple if you have Azure CLI (or Azure PowerShell) installed and you are signed in.

Manually creating the Service Principal for that App ID adds it to the tenant, and SharePoint can check the requested permissions.

Run the following command in your terminal:

```bash
az ad sp create --id e406a681-f3d4-42a8-90b6-c2b029497af1
```

{{< blockquote type="tip" text="If this happens for another Microsoft service, replace `--id` with the application ID of the service you want to grant permissions to." >}}

With the Service Principal active in the tenant, go back to the SharePoint Admin Center and click "Approve." It should now work.

{{< blockquote type="note" text="In the original article, I mentioned you could use the `adminconsent` URL to grant the permission, but this doesn't work for first-party Microsoft services. The adminconsent endpoint doesn't just provision the SP, it also tries to grant consent for that app's own required permissions. The Azure Storage app declares a dependency on 00000002-0000-0000-c000-000000000000, which is the legacy Azure AD Graph API. Both are Microsoft-owned first-party apps, and consent between two first-party apps can't go through the normal admin consent flow. It has to be preauthorized by the API owner (Microsoft) on their side. You can't configure that, so the flow blocks with AADSTS65002." >}}

## Resources

*   [Approve a multi-tenant WebApiPermissionRequests scope for your SPFx solution (Elio Struyf)](https://www.eliostruyf.com/approve-multitenant-permission-scope-spfx-solution/)