---
title: "Be aware adding extensions to SharePoint Content Type Hub"
slug: "/be-aware-adding-extensions-sharepoint-content-type-hub/"
author: "Elio Struyf"
type: "post"
date: "2020-12-07T17:39:33.433Z"
draft: false
tags:
  - "SharePoint"
  - "Development"
  - "Application Customizer"
categories: []
comments: true
aliases:
  - "/be-aware-adding-extensins-sharepoint-content-type-hub/"
preview: "/social/6f7232e5-6c39-4eba-a43f-1433479dba11.png"
---

For one of our clients, we had a Microsoft support case open for a long time. On the client, its tenant, every time they created a new site collection, our Valo application customizers appeared automatically. Most of the time, this happened between 5-60 minutes.

Internally in our Valo codebase, we do not have anything which triggers this automation. We even do not use the tenant-wide-deployment mechanism on the app catalog level. What we use is a combination of a Site Design and some Azure Function magic.

We verified our codebase many times and ran lots of tests, but never could we reproduce this issue. To be sure, we had created a list of what can automatically activate the application customizer on each site:

- Site Design
- Scheduled task
- Timer Azure Function
- Tenant wide extensions
- Automated install of the app on each site collection

These options were all ruled out, but what was interesting was that the scope of the application customizer was not the same as how we define it in our Site Design. We usually do this on web level, and this was scoped on the site level.

Our partner did some further investigation and found that the extension had been added to the admin site, app catalog site, and the good old content type hub.

That was it, the Content-Type Hub. Adding an application customizer to the content type hub will automatically be added to each site after X minutes (basically waiting until the timer job has done the content type publishing to the site). So, be aware of where you activate your application customizers on your tenant, as it could spare you some time finding out why specific solutions are getting activated automatically.

{{< blockquote type="important" text="At the moment, I cannot tell you if this is a bug or by design." >}}