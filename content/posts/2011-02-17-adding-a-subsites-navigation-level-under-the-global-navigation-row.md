---
title: Adding a Subsites Navigation Level Under the Global Navigation Row
author: Elio Struyf
type: post
date: 2011-02-17T15:26:53+00:00
slug: /adding-a-subsites-navigation-level-under-the-global-navigation-row/
dsq_thread_id:
  - 3836444629
categories:
  - Master Page
  - Navigation
tags:
  - Master Page
  - Navigation
  - v4.master
comments: true
---

Normally subsites are displayed in a dropdown menu when the site collection publishing feature is activated.

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs1.png" "Subsite navigation dropdown" >}}

In this post I will show you how to display these subsites on their own navigation row. The end result is shown in the picture below.

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs2.png" "Final result" >}}

## Hide the subsites dropdown menu

First you need to hide the subsites dropdown menu from the global navigation.

*   Open your custom master page or a duplication of the "v4.master" master page in code view.
*   Do a search on "TopNavigationMenuV4". This is the standard global navigation menu.
*   Set the "MaximumDynamicDisplayLevels" attribute to "0";

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs3.png" "Global Navigation code" >}}

## Add the a new sitemap data source

The new sitemap data source is used to retrieve the subsites from the parent site. The following code can be added after global navigation menu.

```html
<asp:SiteMapDataSource
	ShowStartingNode="False"
	SiteMapProvider="GlobalNavSiteMapProvider"
	id="topSiteMap2"
	runat="server"
	StartingNodeOffset="1"/>
```

The most important attribute in the code is "StartingNodeOffset". This attribute needs to be set to "1" to show the underlying subsites. If set to zero, the parent sites will be displayed.

## Add a new asp menu

This menu will use the newly created sitemap datasource.

```html
<SharePoint:AspMenu
	ID="TopNavigationMenu2"
	Runat="server"
	EnableViewState="false"
	DataSourceID="topSiteMap2"
	AccessKey="<%$Resources:wss,navigation_accesskey%>"
	UseSimpleRendering="true"
	UseSeparateCss="false"
	Orientation="Horizontal"
	StaticDisplayLevels="1"
	MaximumDynamicDisplayLevels="1"
	SkipLinkText=""
	CssClass="s4-tn subSites"/>
```

The code needs to be added **after** the global navigation menu.

## Add some styling to the navigation row

```css
.subSites {
  background: #CCEBFF;
  width: 100%;
}
.subSites li.static > .menu-item {
  color: #000;
}
.subSites li.static a:hover {
  color: #000;
}
.subSites li.dynamic > a:hover {
  color: #000;
}
.s4-toplinks .s4-tn a.selected {
  border-bottom: 1px solid #CCEBFF;
}
.s4-toplinks .subSites a.selected {
  background: none;
  border:0;
  font-weight: bold;
}
```

## Result

That is all, so you see it is fairly simple to add a new navigation level to your master page. The cool part about it, is that the subsite navigation will only be show if the parent site contains subsites.

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs4.png" "Subsite navigation level final result" >}}

[Download v4](/uploads/2011/02/Subsite-Navigation-level.master.txt)

[Download nightandday](/uploads/2011/07/nightandday_toplevelnavigation.zip)