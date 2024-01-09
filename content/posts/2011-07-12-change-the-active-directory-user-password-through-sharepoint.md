---
title: Change the Active Directory User Password Through SharePoint
author: Elio Struyf
type: post
date: 2011-07-12T07:06:42+00:00
slug: /change-the-active-directory-user-password-through-sharepoint/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Change-the-Active-Directory-User-Password-Through-SharePoint.aspx
dsq_thread_id:
  - 3837610324
categories:
  - Active Directory
  - Development
  - SharePoint
tags:
  - Authentication
  - Claims
  - Development
  - Password
comments: true
---

## Give the user control to manage their password through SharePoint.

When you want to use form based authentication for SharePoint authentication, one of the requirements could be that users can change their passwords from within SharePoint. Because this functionality is not OOTB available, you will need to create a custom web part or application page for it. Check what best matches your project requirements. The code behind it will be the same, and this is what will be covered in this blog post.

The assembly that will be used for changing the password is the following: **System.DirectoryServices.AccountManagement**.

When working with claims-based authentication (which is standard when form based authentication is configured), it is useful to add the following reference: **Microsoft.SharePoint.Administration.Claims**. This class can be used to encode and decode claims-based usernames.

## Coding

The first thing you will do in your code, is retrieving the current logged on users its username. When working with claims-based authentication your usernames will look something like this: **i:0#.f'admembership'user**. Before you can search the corresponding user in your Active Directory environment, you will need to decode the claim prefix from the username. This can be done with the **DecodeClaim** method from the **Microsoft.SharePoint.Administration.Claims** class.

{{< highlight csharp "linenos=table,noclasses=false" >}}
// Claims-based authentication
// - Decode the claims-based authentication name
string username = "";
SPClaimProviderManager mgr = SPClaimProviderManager.Local;

if (mgr != null)
{
  username = mgr.DecodeClaim(SPContext.Current.Web.CurrentUser.LoginName).Value;
}
{{< / highlight >}}

When you retrieved the username without the claims prefix, the corresponding Active Directory user can be searched. This can be done by the following code:

{{< highlight csharp "linenos=table,noclasses=false" >}}
// Get the domain context
using (PrincipalContext ctx = new PrincipalContext(ContextType.Domain))
{
  UserPrincipal user = new UserPrincipal(ctx);
  user = UserPrincipal.FindByIdentity(ctx, username);
}
{{< / highlight >}}

The only thing that is left, is to write the code for the password change.

{{< highlight csharp "linenos=table,noclasses=false" >}}
user.ChangePassword("OLD_PASSWORD", "NEW_PASSWORD");
user.Save();
{{< / highlight >}}

To whole block looks like this:

{{< highlight csharp "linenos=table,noclasses=false" >}}
// Claims-based authentication
// - Decode the claims-based authentication name
string username = "";
SPClaimProviderManager mgr = SPClaimProviderManager.Local;

if (mgr != null)
{
  username = mgr.DecodeClaim(SPContext.Current.Web.CurrentUser.LoginName).Value;
}

// Get the domain context
using (PrincipalContext ctx = new PrincipalContext(ContextType.Domain))
{ 
  if (username != "" && username != null)
  {
    UserPrincipal user = new UserPrincipal(ctx);
    user = UserPrincipal.FindByIdentity(ctx, username);
    //Change the old and new password by your own textbox values
    user.ChangePassword("OLD_PASSWORD", "NEW_PASSWORD");
    user.Save();
  }
}
{{< / highlight >}}

As you can see there is not much code to be written so that the user can change their password.

When you are going to execute this code, it could give you the following error: **Exception thrown by a target of invocation**. To solve this error, you will need to give the application pool account delegate control permissions to change the user its password. The best way is setting these permissions to a particular Active Directory Organizational Unit.