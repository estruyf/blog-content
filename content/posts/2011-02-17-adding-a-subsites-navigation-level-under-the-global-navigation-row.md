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

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs1.png" "Subsite navigation dropdown"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAW0lEQVR4nAXBSQ6AIAwAQP7/Ms8ePLkRSAhCWCqQgi1xRqw6LXfazOtLVzCg1BCiNk/KgB3FafPlG2AvNof9wdyIiZnmnEQktHHKeOKvx1KlH9A+5sNVGZoD/AE45FRw1bANgAAAAABJRU5ErkJggg==" "248" "68" >}}

In this post I will show you how to display these subsites on their own navigation row. The end result is shown in the picture below.

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs2.png" "Final result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAkUlEQVR4nBXF2Q7BQBQA0Plsf+MnhKd6kQhpIxJLhKBFdZquc2e5SyPEeTkK9GYoF+CwB+c8eh/+EYkIMSu/G3/XI13395euO2PBFrpseyMizKygq9A2g0ggAo8BiQkJkQmFSWVNOHefp5FTRfMb7CsuW5vptrEIOKjokE+TS3QslqmZJNfZNl09XPKmOMc4xx8YxokpD5EejgAAAABJRU5ErkJggg==" "230" "117" >}}

## Hide the subsites dropdown menu

First you need to hide the subsites dropdown menu from the global navigation.

*   Open your custom master page or a duplication of the "v4.master" master page in code view.
*   Do a search on "TopNavigationMenuV4". This is the standard global navigation menu.
*   Set the "MaximumDynamicDisplayLevels" attribute to "0";

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs3.png" "Global Navigation code"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgklEQVR4nE3Muw7CIBhAYd7/yRxMvAzECrFIpNCC1haQ/kDBRAf9hjMeFLhmh4nsPKfR3Espa/2DqlKxucztIFgQHBJABsgxfppQ7VQ9YmhYj7W8LsmFZB14v0xz9C809vRx2mi6J+eWSm3WMRT4zSdJnngrKNX6Zm03OONyqLV8vQGcSYy/A77xvgAAAABJRU5ErkJggg==" "376" "196" >}}

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

{{< caption-new "/uploads/2011/02/021711_1526_AddingaSubs4.png" "Subsite navigation level final result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAIAAACgHXkXAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABkUlEQVR4nCWQS47TQBRFa53sghk7YAPMEAtgwIBRQwYIQSNA3SYCQdMhUSdOxy67XK7Pe68+r+zGKEK6gyMd6QyuYH9X1KeUQkiZYkw5n5cSM5dSxHzzfHn/SMvdn6PaHu63x9Z5aNqulT1SEMUcpuZqyiFnZubM/B9KKcwstmOqmnB9tAqy1qPshxijsa6VvQcU+zHfKt70YaQEAKOxSIRE1nlEFA/tavn9NPquH91oPVLwAM57onCOl83L+eNjNM3upO7bHhCtdV0/DKM565xSIMo5z/MUM2NIIXMpXJhzSsIBSGU6pTWmzzVc7mHvp9HY+iStB3F55y7Whzc/jl/b/PZWv7raX/xsq26q+qlSszj5WGt7skmFqfPpZKhxqaO5o6mFIv7uXizfn6C3ddPp0SASeKfVAN7PhUXZvp7Xz5CwUcY48BgAyVoXQjx/HmIERCKapxKIAoXMPGLqHBmMQg62blUttcV4aPqj1BrSlxpWG7OWUXy4s6tf8lpN7zbD6kZ+Gx4qvVR6WZulGpZ/mR24dgVtPAIAAAAASUVORK5CYII=" "199" "323" >}}

[Download v4](/uploads/2011/02/Subsite-Navigation-level.master.txt)

[Download nightandday](/uploads/2011/07/nightandday_toplevelnavigation.zip)