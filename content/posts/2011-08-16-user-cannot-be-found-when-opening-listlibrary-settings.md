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

{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb1.png" "User cannot be found"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVElEQVR4nFXLuw6AMAxD0f7/X/IQZUApW9I0dhCqGDjLHSwXl1Ovw3wMdwABRARIZoIsSZrquqz7ttejisjdmveemSQL+SY+wHy+5kwApmpm/APwACcsdPNHQ02IAAAAAElFTkSuQmCC" "595" "266" >}}

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
{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb2.png" "Existing Workflows"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARUlEQVR4nAXB0Q5AMAwF0P3/x5FIbEHH7qYt7SIePTonzNTiocS9iIs94Pu8OtiqONjCmHRY3+bf3nSKlDZAnApn6JLrD3A9NQHi6OHbAAAAAElFTkSuQmCC" "605" "138" >}}

3.  Click on the workflow name, this will open your workflow;
4.  Click on the **Publish** button;
{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb3.png" "Publish the workflow button"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAnUlEQVR4nAXBMQ6CMBQA0J7GxPN5FOOmhzAuOrg4GYMFCgU0QgSkLS2Fwm+Ji4nvIbtZzusFZCcFP6216s1gRmXcpwOmLWLBucF77m9dTyUXXVOLVkopwX7NCMjD3PfI9bAqn0dRFuxF31VV5LlQpqwZGkbrJj5VO5AX1Q1ctM7aCWB2VusehfTphzRO4ogmQZSSOLvdCSZJ+shxSP8LAYGANTgB6wAAAABJRU5ErkJggg==" "246" "111" >}}

5.  Do step 3 and 4 for all the workflows.
{{< caption-new "/uploads/2011/08/081611_1634_UserCannotb4.png" "Republished workflows"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQ0lEQVR4nAXBMQ6AMAgAwP7/d11IjYgCgqUlRjdH7wqgAhl5yjX7vMXCItWH+hCLUptXfC0/OTu0bUGOfHa2Q3wl/gF19DVFsDIidQAAAABJRU5ErkJggg==" "605" "138" >}}

Go back to your **List** or **Library Settings** and the error should be gone.