---
title: Sorting search results by managed metadata properties
author: Elio Struyf
type: post
date: 2015-03-24T13:00:38+00:00
slug: /correctly-sorting-search-results-by-managed-metadata-properties/
dsq_thread_id:
  - 3836535721
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Managed Metadata
  - Search
  - Search Results
  - Sorting
comments: true
---

Most of the SharePoint environments these days make use of managed metadata. If you do so and want to use the managed properties within your search web parts, you could experience some strange behaviour when sorting your results based on these managed metadata properties. When using the auto-created managed properties linked to your managed metadata column for sorting, a disorder of your results can occur. In this article I give you more information about why it seems that your results are not in the correct order and how you can fix this issue.

For this article I make use of a simple list with items that are each mapped with a term (a, b, c, d, ...) to highlight the sorting problem.

## Issue

On a page I added a Content by Search Web Part (can also be a search result web part if you want) to show only the items of that specific list with test items. This is the output without sorting:

{{< caption-legacy "uploads/2015/03/032415_1246_Correctlyso1.png" "Search results without sorting defined" >}}


Now when I configure sorting for the results on my **owstaxIdTestTerm** managed property (which is the auto-created managed property linked to the managed metadata column), I retrieve the following search result order:

{{< caption-legacy "uploads/2015/03/032415_1246_Correctlyso2.png" "Search results with sorting defined" >}}


You can see that the result sorting seem to be in a sort of disorder, but for SharePoint your results are correctly sorted.

This behaviour is related to the managed property you use for configuring your sort order. In this example the sorting was performed with the **owstaxIdTestTerm** managed property which is the auto-created managed property by SharePoint mapped to the crawled property for your column.

Auto-created managed properties for managed metadata columns are by default mapped to a crawled property with the following name: **ows_taxId_ColumnName**. The ows_taxId crawled property contains the following information:

*   GP0: Term ID
*   L0: Term ID + Display value
*   GTSet: Term set ID

Here is a screenshot of the same result set with the internal values:

{{< caption-legacy "uploads/2015/03/032415_1246_Correctlyso3.png" "Managed properties term values" >}}


Highlighted in red is the term ID on which the sorting of the results is performed. If you check these term ID values, you can see that the results are correctly sorted. To solve this problem you need to configure the managed property to sort on the display value of the term which requires some extra configuration on your environment.

## Solution

The solution is to make use of another crawled property which does not contain this term ID related information.

Go to your search schema page and click on the **Crawled Properties** link. On the Crawled Properties page search for the crawled properties linked to your managed metadata column.

{{< caption-legacy "uploads/2015/03/032415_1246_Correctlyso4.png" "Crawled properties" >}}


You should get two crawled property results, a crawled property with and without a taxId in its name. The one without the taxId only contains the term its display value. This crawled property will not yet be mapped to a managed.

Click on the **Managed Properties** link and do a search for: **RefinableString**. Click on one of the RefinableString properties that is not yet in use, and map this managed property with the **ows_TestTerm** (ows_ColumnName) crawled property.

{{< caption-legacy "uploads/2015/03/032415_1246_Correctlyso5.png" "RefinableString - Managed Property" >}}


Wait for a full crawl or if you are working on-premises you could start one. Once the crawl is complete you can configure the new managed property on the sorting tab in the query builder. Now the results should be in the correct visual order:

{{< caption-legacy "uploads/2015/03/032415_1246_Correctlyso6.png" "Correctly sorted results" >}}


Now the results are sorted based on the display value of the managed property term instead of the term ID.