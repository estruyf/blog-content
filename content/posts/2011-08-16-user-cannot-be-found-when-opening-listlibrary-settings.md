---
title: User Cannot be Found When Opening List/Library Settings or Workflow Settings
author: Elio Struyf
type: post
date: 2011-08-16T16:34:40+00:00
slug: /user-cannot-be-found-when-opening-listlibrary-settings/
dsq_thread_id:
  - 3836445183
categories:
  - SharePoint
tags:
  - Claims
  - Error
comments: true
---

Since a couple of months I have encountered the **User cannot be found **error a few times when accessing the **List Settings** or** Library Settings**.

{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb1.png" "User cannot be found" >}}

In my case I encountered this error in the following scenarios:

*   After switching the web application to **Claims-based authentication**;
*   After migrating some sites to another SharePoint farm.

## Solution

The solution is to republish all existing workflows (also the default ones) through SharePoint Designer 2010. The problem arises due of the fact that the workflows were published by a user who is not known by SharePoint.

In the **Claims-based authentication** scenario the user did not have the claims-based prefix before its username (ex: **i:0#.w**'domain\username).

In the **Migration** scenario the sites were restored in another AD domain.

To republish the workflows you can follow the next steps:

1.  Open your site in SharePoint Designer 2010;
2.  Click on the **Workflows** link from the **Site Objects** menu;
{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb2.png" "Existing Workflows" >}}

3.  Click on the workflow name, this will open your workflow;
4.  Click on the **Publish** button;
{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb3.png" "Publish the workflow button" >}}

5.  Do step 3 and 4 for all the workflows.
{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb4.png" "Republished workflows" >}}

Go back to your **List** or **Library Settings** and the error should be gone.