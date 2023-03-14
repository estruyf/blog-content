---
title: Programmatically Setting the Fetched Properties to an Extended Search Core Result Web Part
author: Elio Struyf
type: post
date: 2011-05-26T16:08:31+00:00
slug: /programmatically-setting-the-fetched-properties-to-an-extended-search-core-result-web-part/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Programmatically-Setting-the-Fetched-Properties-to-an-Extended-Search-Core-Result-Web-Part.aspx
dsq_thread_id:
  - 3836445345
categories:
  - Development
  - Search
  - SharePoint
  - Web Part
tags:
  - Search
  - Search Center
  - Web Part
comments: true
---

This week I needed to extend the search core result web part to be able to do some custom filtering and search result styling.

For the search result styling, additional fetched properties (columns) needed to be added programmatically to the Web Part properties. But every time I checked in the web part properties, these fetched properties were not added, and I end up with the default fetched properties.

After investigating the "Microsoft.Office.Server.Search" assembly I saw that you must meet three conditions.

1.  The "**SelectColumns**" (Fetched Properties) string may not be Null or empty;
2.  The "**PropertiesToRetrieve**" must be Null or Empty;
3.  "**UseLocationVisualization**" must be false.

{{< highlight csharp "linenos=table,noclasses=false" >}}
set
{
  if ((!string.IsNullOrEmpty(value) && string.IsNullOrEmpty(base.PropertiesToRetrieve)) && !base.UseLocationVisualization)
  {
    base.PropertiesToRetrieve = value;
  }
}
{{< / highlight >}}


## Solution

The solution to programmatically add your columns to the fetched properties is the following:


{{< highlight csharp "linenos=table,noclasses=false" >}}
protected override void OnInit(EventArgs e)
{
  //Set an empty string for the PropertiesToRetrieve property
  base.PropertiesToRetrieve = string.Empty;
  //Set the UseLocationVisualization property to false
  base.UseLocationVisualization = false;

  //Set the fetched properties
  base.SelectColumns = fetchProp;
}
{{< / highlight >}}


"fetchProp" is a string that contains the following content.

{{< highlight xml "linenos=table,noclasses=false" >}}
<Columns>
  <Column Name="WorkId"/>
  <Column Name="Rank"/>
  <Column Name="Title"/>
  <Column Name="Author"/>
  <Column Name="Size"/>
  <Column Name="Path"/>
  <Column Name="Description"/>
  <Column Name="Write"/>
  <Column Name="SiteName"/>
  <Column Name="CollapsingStatus"/>
  <Column Name="HitHighlightedSummary"/>
  <Column Name="HitHighlightedProperties"/>
  <Column Name="ContentClass"/>
  <Column Name="IsDocument"/>
  <Column Name="SiteTitle"/>
</Columns>
{{< / highlight >}}
