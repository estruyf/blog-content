---
title: Sorting Not Working in the Search Results Web Part with Predefined Query in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-04-26T15:20:39+00:00
excerpt: This blog post describes how you to allow your search results being sorted when using a predefined query in the Search Result Web Part of SharePoint 2013.
slug: /sorting-not-working-in-the-search-results-web-part-with-predefined-query-sharepoint-2013/
dsq_thread_id:
  - 3836445896
categories:
  - Search
  - SharePoint 2013
comments: true
---

This week I noticed something strange when configuring a Search Results Web Part with a predefined query. The results were retrieved perfectly, but the sorting configuration was not doing what I defined. The search result web part was configured to get the documents from a specific site and sort them by the creation date.

I had configured the search query in the Query Builder of the Search Web Part to retrieve the documents (which is very easy with the query builder). Underneath the sorting tab, I configured it to sort by the creation date.

Here you can see the sorting configuration:

{{< caption-legacy "uploads/2013/04/042613_1520_SortingNotW1.png" "Query Builder Sort Options" >}}

Storing the settings was not giving me the correct result. Whatever I configured in the sorting settings, the web part ignored the settings.

## Solution: Results Source Approach

Configuring the sorting in the web part settings did not work, so the next thing I tried was to create a result source with the same query. Creating a result source can be done on the Site Collection itself, so you do not need to go to Central Administration.

_Note: [here](http://technet.microsoft.com/en-us/library/jj683115.aspx) you can read how to configure a custom result source._

For the result source I used the same configuration and sorting settings as in the search results web part.

{{< caption-legacy "uploads/2013/04/042613_1520_SortingNotW2.png" "Result Source Sorting" >}}

The nice thing about this results sources is that they can be used in the Query Builder.

{{< caption-legacy "uploads/2013/04/042613_1520_SortingNotW3.png" "Sorted Result Source" >}}

After the creation of the result source I configured the search results query builder and specified my result source as the query that needs to be used.

{{< caption-legacy "uploads/2013/04/042613_1520_SortingNotW4.png" "Use the created result source as query" >}}

**Note**: the query text may remain empty.

This approach works perfectly, the result source does the sorting, instead of the search results web part.