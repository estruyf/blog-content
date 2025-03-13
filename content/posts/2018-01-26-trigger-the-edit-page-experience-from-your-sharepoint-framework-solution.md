---
title: Trigger the edit page experience from your SharePoint Framework solution
author: Elio Struyf
type: post
date: 2018-01-26T13:19:22+00:00
slug: /trigger-the-edit-page-experience-from-your-sharepoint-framework-solution/
dsq_thread_id:
  - 6439312659
categories:
  - Development
  - SharePoint
tags:
  - SharePoint Framework
  - SPFx
comments: true
---

This is a quick article to show you how you can open the edit page experience from your SharePoint Framework solution. Such a trigger could be useful so that you can trigger the page its edit mode from within your web part, footer, ...

Nothing more to say about it, so here is the code:

{{< gist estruyf 05998252eb75c8764da1f060e5cb30a9 >}}

Here is an example of what you could expect:

{{< caption-new "/uploads/2018/01/Jan-26-2018-14-57-24.gif" "Trigger edit page" >}}

When the page is checked out to someone else, you SharePoint lets you know who is editing it:

{{< caption-new "/uploads/2018/01/Jan-26-2018-14-58-18.gif" "Page is already checked out" >}}

## Other actions

Other actions like saving, publishing and discarding are also availble:

*   _api/sitepages/pages({id})/SavePageAsDraft
*   _api/sitepages/pages({id})/DiscardPage
*   _api/sitepages/pages({id})/SavePage