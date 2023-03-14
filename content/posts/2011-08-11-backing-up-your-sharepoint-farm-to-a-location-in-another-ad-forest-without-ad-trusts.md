---
title: Backing Up Your SharePoint Farm to a Location in Another AD Forest Without AD Trusts
author: Elio Struyf
type: post
date: 2011-08-11T13:01:54+00:00
slug: /backing-up-your-sharepoint-farm-to-a-location-in-another-ad-forest-without-ad-trusts/
dsq_thread_id:
  - 3895266996
categories:
  - Active Directory
  - Backup
  - SharePoint
tags:
  - Accounts
  - Backup
comments: true
---

In the years that I work with SharePoint, I have made several farm backups. Usually I can make use of a backup location in the same Active Directory forest as that from the SharePoint server. For a few times the backup location was located in another Active Directory forest where there was a trust between the Active Directory forests.

The previous paragraph will be the case for the most of you. But what if you are in a situation where you have no choice than to use a backup location in another AD forest without any forest trusts.

## The Situation

To make it easier to understand I will talk about **SharePoint.com forest** where the SharePoint servers are located and the **Backup.com forest** where the backup server is located.

{{< caption-legacy "uploads/2011/08/081111_1301_BackingUpYo1.png" "Sketch of the situation" >}}

On the backup server a share has been made available for the SharePoint backup. When you access the shared location from the **SharePoint.com** forest, you will be prompted for your credentials.

But when you start a SharePoint backup, the current account needs to have access to the shared location, otherwise you will get access denied errors.

Working with mapped drives will not help you out, because SharePoint uses multiple accounts to transfer the data to the backup location (SharePoint Farm Admin Account and SQL service account).

## The Tests

When I was logged on with another user to the SharePoint server, I noticed that my credentials were not needed to gain access to the shared location.

After some investigation on the backup server, I discovered that the account I used on the SharePoint.com forest, was also defined as a local user on the backup server with the same password.

For certainty, I created a new local user on the backup server that also exists in the SharePoint.com forest with the same username and password. It turned out that this user also gained access to the shared location without being prompted for his credentials.

## The Solution

The solution to back up the SharePoint.com farm to the share in the Backup.com forest, is to create the same **user that initiates the backup (SharePoint Farm Admin)** and **SQL Service account** as a local user on the backup server (with the **same passwords**). Give these accounts **read and write access** on the shared location.

{{< caption-legacy "uploads/2011/08/081111_1301_BackingUpYo2.png" "Local user accounts" >}}

Restart your backup, normally the backup completes without any access denied errors.

If you still got any access denied errors, check the application logs to see which user does not have access to the shared location. Do the same process as described above for this user and restart the backup.