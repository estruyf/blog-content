---
title: Search for Office 365 Group documents
author: Elio Struyf
type: post
date: 2016-09-20T10:58:15+00:00
slug: /search-for-office-365-group-documents/
dsq_thread_id:
  - 5158355295
categories:
  - Office 365
  - Search
  - SharePoint
tags:
  - Office 365 Groups
  - Search
comments: true
---

I just got a question from someone who wanted to know how to retrieve all the Office 365 Group documents he had access to.

When you are having a lot of groups in your organization, files could be spread across them. Search is in most cases the answer to finding your documents easily. So having a property on which you can flag them as a group document would be helpful in this case.

I did a quick search on my Office 365 tenant and checked the managed properties of a document living on a standard team site and one on a group site. Luckily there is a useful property which is already provided by SharePoint called: **SiteTemplate** which you can use to do your query.

{{< caption-legacy "uploads/2016/09/092016_1054_SearchforOf1.png" "Document living on a team site" >}}

{{< caption-legacy "uploads/2016/09/092016_1054_SearchforOf2.png" "Document living in an Office 365 Group" >}}

So if you want to retrieve all search content from Office 365 Groups, all you have to do is search for: **SiteTemplate=Group**.

{{< caption-legacy "uploads/2016/09/092016_1054_SearchforOf3.png" "SiteTemplate query" >}}

You can also configure this as a group search vertical so that it is easier for the user to limit their search scope.

{{< caption-legacy "uploads/2016/09/092016_1054_SearchforOf4.png" "Groups search vertical" >}}

> **Important**: Only information of public groups is searchable. Private groups are not accessible for search, so this information cannot be retrieved. You can also test this by doing in a search in the private group itself. You will see that it would not find any documents.

{{< caption-legacy "uploads/2016/09/snip_20160921084010.png" "Private group search" >}}