---
title: Sub-Site Theme/Composed Looks Inheritance How To
author: Elio Struyf
type: post
date: 2012-12-06T19:26:27+00:00
slug: /sub-site-themecomposed-looks-inheritance-how-to/
dsq_thread_id:
  - 3836445998
categories:
  - Branding
  - SharePoint 2013
  - Styling
tags:
  - Composed Looks
  - Styling
  - Themes
comments: true
---

With the new theme engine from SharePoint 2013 I had a few questions about how sub-sites could inherit the theme/composed looks from the parent.

Let me first start with the differences between the 2010 and 2013 theme engine.

## Differences between SharePoint 2010 and 2013 Theme Engine

In 2010 when you uploaded a PowerPoint Theme file to the theme gallery (Site Settings > Themes), it was also available to use on all sub-sites.

{{< caption-legacy "uploads/2012/12/theme1.png" "SharePoint 2010 Themes are inherited" >}}

In the new version of SharePoint there is a significant difference between the previous one. The 2013 one works with a composed looks list (more information can be found [here](https://www.eliostruyf.com/themes-and-composed-looks-in-sharepoint-2013/)). When you create your own Composed Look Items, these items are not inherited along the sub-sites. That means that you will need to re-create them on the sub-sites if you want to be able to use them.

_Maybe the idea behind it is that you will only select a theme or composed look on the top site, and then inherit the sub-sites from the root sites' one (I could be wrong, if so, ignore this sentence).
_

## Theme Inheritance - Publishing Sites

Theme inheritance is very simple if you are working with publishing sites or sites where you manually activated the publishing features on site collection level.

In SharePoint 2010 you needed to go to the Site Theme page (Site Settings > Site Theme) to set the inheritance.

{{< caption-legacy "uploads/2012/12/theme2.png" "SharePoint 2010 Theme Inheritance" >}}

In SharePoint 2013 this functionality is moved to the master page settings page (Site Settings > Master Page) under the Theme section of that page.

{{< caption-legacy "uploads/2012/12/theme3.png" "SharePoint 2013 Theme Inheritance" >}}

## Theme Inheritance - Non-Publishing Sites

But what with non-publishing sites? These sites do not have this functionality. Unfortunately, the only way to set up theme inheritance is via code.

I created a C# version and a PowerShell version.

### C\#


{{< highlight csharp "linenos=table,noclasses=false" >}}
var url = "http://your-site";
using (var site = new SPSite(url))
{
  Console.WriteLine("RootWeb Theme: " + site.RootWeb.ThemedCssFolderUrl);

  if (!string.IsNullOrEmpty(site.RootWeb.ThemedCssFolderUrl))
  {
    foreach (SPWeb web in site.AllWebs)
    {
      // Set the theme for the sub-web
      web.ThemedCssFolderUrl = site.RootWeb.ThemedCssFolderUrl;
      web.Update();
      web.Dispose();
    }
  }

  Console.WriteLine("Done...");
  Console.Read();
}
{{< / highlight >}}


### PowerShell

{{< highlight batch "linenos=table,noclasses=false" >}}
$url = "http://your-site"
$site = Get-SPSite -Identity $url
Write-Host "RootWeb Theme: " site.RootWeb.ThemedCssFolderUrl

foreach ($web in $site.AllWebs) {
  Write-Host "Web Title: " $web.Title
  Write-Host "Web Theme: " $web.ThemedCssFolderUrl

  $web.ThemedCssFolderUrl = $site.RootWeb.ThemedCssFolderUrl
  $web.Update()

  $web.Dispose()
}

$site.Dispose();
{{< / highlight >}}


My approach would be to create a SharePoint solution with a Feature Receiver (on the activated event) and a Web Event Receiver (for the WebProvisioned event).

This approach also works for SharePoint 2010 sites.