---
title: 'Quick Tip: Adding an Active Directory Group Through the Permissions Web Service'
author: Elio Struyf
type: post
date: 2012-09-27T14:26:13+00:00
slug: /quick-tip-adding-an-active-directory-group-through-the-permissions-web-service/
Xylot:
  - http://www.xylos.com/blog/post/1288/Quick-Tip-Adding-an-Active-Directory-Group-Through-the-Permissions-Web-Service/
dsq_thread_id:
  - 3838217458
categories:
  - Development
  - SharePoint
tags:
  - Active Directory
  - Permissions
  - Web Services
comments: true
---

When working with the **addpermission** method from the permissions.asmx web service, you have the possibility to add permissions to a list or site for users or groups.

When you specify a group as permissionType, you could only specify a SharePoint group that exists on the site. You are not able to specify an Active Directory group, but that does not mean that it is not possible.

The trick to add Active Directory group permissions, is by adding them as an user instead of specifying group.

Here is an example of a SOAP message to add an Active Directory group to the site:


{{< highlight xml "linenos=table,noclasses=false" >}}
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <AddPermission xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
            <objectName>SiteName</objectName>
            <objectType>web</objectType>
            <permissionIdentifier>contoso\AllUserGroup</permissionIdentifier>
            <permissionType>user</permissionType>
            <permissionMask>-1</permissionMask>
        </AddPermission>
    </soap:Body>
</soap:Envelope>
{{< / highlight >}}


Two things are important:

1.  Set the permissionType to **user**;
2.  In the permissionIdentifier specify the Active Directory group as: **DOMAIN-NAME\GROUP-NAME**.