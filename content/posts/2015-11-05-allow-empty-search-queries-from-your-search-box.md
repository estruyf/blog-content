---
title: Allow empty search queries from your search box
author: Elio Struyf
type: post
date: 2015-11-05T22:24:58+00:00
slug: /allow-empty-search-queries-from-your-search-box/
dsq_thread_id:
  - 4293458234
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
  - Web Part
comments: true
---

This article explains a quick tip how you can allow empty search queries. This functionality is necessary when you have pages on which you configured the search web parts to use predefined queries in order to show results when the page gets loaded.

> **Note**: This could be either configured in the web part itself or via a result source.

If you also placed a search box on the page to search through the results, once you start searching, you have no easy way to go back to the initial result set. You are not able to just remove the keywords from the search box, because by default the search box does not allow you to do empty keyword queries. What you have to do is reload the page without the search parameters in the page URL.

{{< caption-legacy "uploads/2015/11/Screenshot-2015-11-05-11.52.36_thumb.png" "Empty search query is not allowed" >}}

> **Note**: In the screenshot above you can see that there was a query performed with the keyword: **test**. Once the keyword gets removed from the search box you cannot reset the initial query.

Of course refreshing the page is not a great experience, so there must be a better way.

## Quick fix

The fix for this is rather easy. There is a property that can be set on the search box. The property for this is called **AllowEmptySearch** and is by default set to **false**. When you update this property to **true**, which can be done by exporting the search box web part, and changing the following line in the XML:

{{< highlight html "linenos=table,noclasses=false" >}}
<!-- old value -->
<property name="AllowEmptySearch" type="bool">False</property>

<!-- new value -->
<property name="AllowEmptySearch" type="bool">True</property>
{{< / highlight >}}

> **Note**: you can also update the web part with PowerShell.

Another way to approach it is via setting this property from within your display template. To update the property within the search box display template, you have to add the following lines of code:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Allow empty keyword searches
if (!ctx.ClientControl.get_allowEmptySearch()) {
    ctx.ClientControl.set_allowEmptySearch(true);
}
{{< / highlight >}}

Once this property is set to **true**, you will be able to remove the keywords from your search box and do empty searches. This allows you to reset it to the initial result set.