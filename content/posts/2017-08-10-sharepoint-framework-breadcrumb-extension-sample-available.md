---
title: SharePoint Framework breadcrumb extension sample available
author: Elio Struyf
type: post
date: 2017-08-10T08:44:17+00:00
slug: /sharepoint-framework-breadcrumb-extension-sample-available/
dsq_thread_id:
  - 6055010225
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Breadcrumb
  - Extensions
  - SharePoint Framework
  - SPFx
comments: true
---

When SharePoint 2013 got released there was something missing in the UI. There was no breadcrumb control anymore like in SharePoint 2010. A couple of clients and users were struggling finding their way on the site. In March 2013, I created a script that allowed you to transform the SharePoint text in the suite bar (on the left side) into a breadcrumb.

> **Info**: read more about it - [Transform the "SharePoint" Suite Bar Text into a Breadcrumb with PowerShell](https://www.eliostruyf.com/transform-the-sharepoint-suite-bar-text-into-a-breadcrumb-via-powershell/).

{{< caption-new "/uploads/2013/03/031113_1118_Transformth1.png" "Suite bar breadcrumb" >}}

The downside was that this script only worked for on-premises environments because this functionality was not available on SharePoint Online.


Now with the new era of SharePoint development with SharePoint Framework and the extensions, we have a way to re-introduce the breadcrumb control again.


> **Info**: be aware that the SharePoint Framework extensions are currently in developer preview.

{{< caption-new "/uploads/2017/08/Screenshot-2017-08-09-09.56.46-1.png" "Modern UI Breadcrumb" >}}

One of the available extensions is the application customizer. This one allows developers to add scripts / HTML to specifically provided placeholders. Like for example a header and footer placeholder. By making use of this extension model and the header placeholder, I created a breadcrumb sample project which is available in the SharePoint [sp-dev-fx-extensions](https://github.com/sharepoint/sp-dev-fx-extensions) GitHub repository.


> **Info**: check out the sample here - [https://github.com/SharePoint/sp-dev-fx-extensions/tree/master/samples/react-application-breadcrumb](https://github.com/SharePoint/sp-dev-fx-extensions/tree/master/samples/react-application-breadcrumb)

Here is another screenshot of the breadcrumb output:

{{< caption-new "/uploads/2017/08/Screenshot-2017-08-09-09.55.22-1.png" "Modern UI Breadcrumb sample output" >}}

Feel free to contribute and make it better.