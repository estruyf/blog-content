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

{{< caption-new "/uploads/2013/03/031113_1118_Transformth1.png" "Suite bar breadcrumb"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVR4nAF8AIP/AEyY0lae1E6a01Kd1VWe1j6S0DyR0DyR0DyS0DyR0ADr7e/j6e3s7vHx8/Xy9PX29/f29/j5+Pj39/b29vUAp8/sgbnjJofPDHjISJrW8PT37fP3+Pj47+/v+fn5ALrY75rG6Fyk2kub13e04vX08+rq6u/w8Onp6v3+/jmHXS5QNl2aAAAAAElFTkSuQmCC" "315" "121" >}}

The downside was that this script only worked for on-premises environments because this functionality was not available on SharePoint Online.


Now with the new era of SharePoint development with SharePoint Framework and the extensions, we have a way to re-introduce the breadcrumb control again.


> **Info**: be aware that the SharePoint Framework extensions are currently in developer preview.

{{< caption-new "/uploads/2017/08/Screenshot-2017-08-09-09.56.46-1.png" "Modern UI Breadcrumb"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAABYlAAAWJQFJUiTwAAAArUlEQVR4nFXMuw4BQQCF4SlJ1iVxeSYvgE6CaFTeQrS6tWTDar2BywuotCpRMliEnV0zv1hROMnXnOIXmfaSVL5INp8jaVmkCwUSloUQ4l99NqfujmmOPWojl8bEozXxqA6GVD5sh7LtIFT4RGuN4bv+ek1nseIUKF6A0hptDOJ48bnd7wRKYaKIkjcl0+2x2e04SMnR95HXK0IpRRiGcc0Yzf58YSsljyCI/583C76V7cu36Z4AAAAASUVORK5CYII=" "450" "204" >}}

One of the available extensions is the application customizer. This one allows developers to add scripts / HTML to specifically provided placeholders. Like for example a header and footer placeholder. By making use of this extension model and the header placeholder, I created a breadcrumb sample project which is available in the SharePoint [sp-dev-fx-extensions](https://github.com/sharepoint/sp-dev-fx-extensions) GitHub repository.


> **Info**: check out the sample here - [https://github.com/SharePoint/sp-dev-fx-extensions/tree/master/samples/react-application-breadcrumb](https://github.com/SharePoint/sp-dev-fx-extensions/tree/master/samples/react-application-breadcrumb)

Here is another screenshot of the breadcrumb output:

{{< caption-new "/uploads/2017/08/Screenshot-2017-08-09-09.55.22-1.png" "Modern UI Breadcrumb sample output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAu0lEQVR4nFXLvWrCUACG4dOlhdCAGnppttBJUJciFHoD4l2YBuoPaEuldxAEN2fF0cmlCobkJCY5ac95S7L1g3d54BP204rbxh12vcaNZWE7DteWhRDif+0vn+54QmcypfU24uX9g+fZnAfX4971aA5fq4TWPxhj0MZQbrzZ0vOXfCcJlK515SKSMWmaooqigsfPBVf9Aev9HiklxyDgHEWIs4yJLxeUUvwWBYcwZHc6EZdnpciyjCzP+QMWc5W90kKIrAAAAABJRU5ErkJggg==" "450" "205" >}}

Feel free to contribute and make it better.