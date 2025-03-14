---
title: Approve a multitenant permission scope for a SPFx solution
longTitle: Approve a multi-tenant webApiPermissionRequests scope for your SPFx solution
customField: ""
slug: /approve-multitenant-permission-scope-spfx-solution/
description: "Troubleshooting SharePoint Permission Approval: Learn how to create a Service Principal and define the correct resource for successful permission scope approval"
date: 2023-06-29T15:40:31.644Z
lastmod: 2023-06-29T15:40:32.331Z
preview: /social/3175dbcc-d76e-446b-bc8d-585265b2a0e8.png
draft: false
comments: true
tags:
  - Permissions
  - Service Principal
  - SharePoint
  - SPFx
type: post
---


It has been a long time ago since I wrote about SharePoint. Lately, I got into a Viva Connections project where I had to approve a multi-tenant webApiPermissionRequests scope and ran into an issue where it was impossible to approve the permission scope.

{{< caption-new "/uploads/2023/06/permission-request-1.png" "Failed permission approval"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABuSURBVE3BwQ3CMBBFwbffG1kR4Zg+uFAA5aU2LqnDkgsw8RoEUiRmrNa6AfdlWThJwt358/TrfLkdvT/Gq+PJ+OlBHB0l8WWmw6c5M9obMDxnIoKUEhEBEmMMzAwHdilNrTUkUUrB3VnXlZOk/QOIqCTKiyotqAAAAABJRU5ErkJggg==" "1125" >}}

The error that gets returned is `The requested permission isn't valid. Reject this request and contact the developer to fix the problem and redeploy the solution`, but it does not indicate what is wrong with the permission scope.

After some digging, I found out that the issue came from two things:

- Service Principal was not created
- The provided resource needs to be correct

## Service Principal

The first thing that needs to be done is to create the Service Principal in your Azure AD tenant. Typically, when you are going to use an application, you will need to consent to the application to be able to use it.

In the case of a SharePoint Framework solution, you will not get a consent screen, so you will need to create the Service Principal manually. You can do this by using PowerShell/Bash or the application's consent URL.

### Using PowerShell

```powershell
New-AzADServicePrincipal -ApplicationId {client-id}
```

### Using Bash

```bash
az ad sp create --id {client-id}
```

### Using the admin consent URL

You can use the admin consent URL:

```text
https://login.microsoftonline.com/common/adminconsent?client_id={client-id}
```

## webApiPermissionRequests - resource definition

Once you have created the Service Principal, you can approve the permission scope if you defined the correct resource. You can do this in a couple of ways:

- Using the display name of the application
- Using the client id of the application
- Using the app id URI of the application

When working with the `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` URL, you usually use the app id URI of the application for the `scope` parameter.

Although, in the `webApiPermissionRequests` property, the app id URI is invalid. You will need to use the display name or client id of the application.

{{< caption-new "/uploads/2023/06/permission-request-2.png" "Testing out the resource types"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB9SURBVHXBsQ3CUAxF0fv8HYkiBMEoFGzAZuwWiSIDZIUsENC3DSUN52jbtoek6zQdqQJJmBmtNX4sfjpfblncCxhc/OE2NKP6G7IjicxEEplJZhIR9N4xvsyM174TEazryjzPRARUUVWYGQ483b1zOJCZjOOIJMwMJARILB/uZTa7vmAwigAAAABJRU5ErkJggg==" "1145" >}}

From the above test, the first and second resource types are valid once the Service Principal is created. The third resource type is not correct.
