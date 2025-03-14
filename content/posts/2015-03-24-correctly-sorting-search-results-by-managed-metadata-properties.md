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

{{< caption-new "/uploads/2015/03/032415_1246_Correctlyso1.png" "Search results without sorting defined"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAgCAIAAACkZ366AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB+ElEQVR4nG2T67KdIAyFff+3bI9yE0WQmySBDqJ7tzNdP1RYM3HxJUwpJR/CEUrIgFTbq3prSimePvySpzpiytdQKQWRul1rRcRdKyn4zCVjC79lzA6A3SbEZWHz8hi7MQA4yk/9b7XmnGLqiinlfBH1yt1GRAAYi2ev1m7fi8n701j3W2dhr+28RubWWr0/JiICAK03ta5caSWlUkoq6U/fWptaa4jIOVuWhQvBOd+2zTkbQ6yt3cmJtN5WvW56W9VqrftiGa8X1cOLPslDCO48hbl2XwBHqDqe3c45hxiFdnI/nQ8xhvvwMedMRE+0zpRxJgZUIYTYNg34QmWMz8vMGWeMKaUQcYTodi8AgAillAIFAL7RAOC6Si5UAN/Nr6bzdOawv9coj3wBjvO2T/LWGhFtepVScqkEZ+Jm55wlesdBCMEYE1xKKY05ruuCUh67Eu37vu27MWbfd+/DXf8u/n+olUb3J+/9Yd28JeWuDPSd1Hafu5SScxb6ENqYw9njsNY650LwndqAqiQXnC1ccM6UVFqv1tlnUp/knEshO23dR/gfqG/7e6e7PtRyzjElF0tI4xL9hbTWKcbgTj/rKG3OBYgQEZ+J+FyiVQnGlh/Gl/mHMbYsc+/3NxrvthRSCmF2UzrRnuCh5v15yzvnYoxINKD+ATfdm6iuWLLfAAAAAElFTkSuQmCC" "166" "533" >}}


Now when I configure sorting for the results on my **owstaxIdTestTerm** managed property (which is the auto-created managed property linked to the managed metadata column), I retrieve the following search result order:

{{< caption-new "/uploads/2015/03/032415_1246_Correctlyso2.png" "Search results with sorting defined"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAfCAIAAABRS8vCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB2UlEQVR4nF1Ti26kMAzc///IVqeSh01CiRPyTjglsLttRwIJWfaMZ8zDWbsbQpvJl9bPF/rEI8Zo3fG1Em7WeR+89/4IIeScR/k8z5KzWoFzLgFASsk5IpCl1tqj955iZAvjQgjOORNmN6313s+7u/dea6m1lpJzzqWUi3iUU4ohxJBbzLX1oa3/wOM43PduP9DjHkqpbeJd7r3nnDaFQggBQxtnC5c8xnSe5+BOMXHGuRBSSCmkc67MObe0WisZstZaon03Oee3LRfZy6jzPG/6q9ta0pv5p+Pm8lA+131311pjCBI1l7iqgRVBKUXW3dw5JTkdQ0QAUCsaMiGEe7GSMyIqrRAQJFqiyTCHvyOcfNe7DV1T2nG43VgwiUIZuv7kHUIgeywr6d3OrAd88Fcwt7QVYfg245ZCAIJzU/nIO6Vl5M0548vCjKH+Gn7TTJvqQGvjae9b8yH6VK+8/+DhrNXf5hM97L7Mvja3ugY8T1GtQkoJgACCDx2H9yPv+xQZWxgbx8i4MTQlPLtba0TknBuJG/qV91Rb5/fT1B/XNqVt5mMNimJ9ev6rO6Wk9IaolNZaj7y11jHGmzvFKIQYpkoJUm5aG6L0/sdKXmfealUA6H14Df8PiwJ/AmCBbxMAAAAASUVORK5CYII=" "169" "527" >}}


You can see that the result sorting seem to be in a sort of disorder, but for SharePoint your results are correctly sorted.

This behaviour is related to the managed property you use for configuring your sort order. In this example the sorting was performed with the **owstaxIdTestTerm** managed property which is the auto-created managed property by SharePoint mapped to the crawled property for your column.

Auto-created managed properties for managed metadata columns are by default mapped to a crawled property with the following name: **ows_taxId_ColumnName**. The ows_taxId crawled property contains the following information:

*   GP0: Term ID
*   L0: Term ID + Display value
*   GTSet: Term set ID

Here is a screenshot of the same result set with the internal values:

{{< caption-new "/uploads/2015/03/032415_1246_Correctlyso3.png" "Managed properties term values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzElEQVR4nGWM22rDMBAF9f8/Z0eOG0ggxKSJSW1JK2lXl13LlLT0qcMwnKejFkBKmbnu/2lNOWcdOCSCaZoPh+V0+ho/XuM4a+2vV7UaCwAikimBMd7a4FwE8NZiiGp1PoTIte7b1v783bvI+xwAKJG73R5999R61vp1PD663pzPyljnvW9tZxZKiVJOpeRSUs65VGUhRMRSypYzIwoRIzK+u6Wk1nWxxhKinaZ7183D8Bz0PI6ffb9cLiqEEENsrW2tFebKXEVYpP74DVQB/XI9L01EAAAAAElFTkSuQmCC" "445" "384" >}}


Highlighted in red is the term ID on which the sorting of the results is performed. If you check these term ID values, you can see that the results are correctly sorted. To solve this problem you need to configure the managed property to sort on the display value of the term which requires some extra configuration on your environment.

## Solution

The solution is to make use of another crawled property which does not contain this term ID related information.

Go to your search schema page and click on the **Crawled Properties** link. On the Crawled Properties page search for the crawled properties linked to your managed metadata column.

{{< caption-new "/uploads/2015/03/032415_1246_Correctlyso4.png" "Crawled properties"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATElEQVR4nDXGWwqAMAwEwN7/lgoi0vpquqmVZCuCzteEqqqAu/Uf3d2MbiTDJnXeSyytmZPsvUttY8rTKrjusBwYoqSzQD9QzVDBmwffCVbBRPaKcgAAAABJRU5ErkJggg==" "374" "129" >}}


You should get two crawled property results, a crawled property with and without a taxId in its name. The one without the taxId only contains the term its display value. This crawled property will not yet be mapped to a managed.

Click on the **Managed Properties** link and do a search for: **RefinableString**. Click on one of the RefinableString properties that is not yet in use, and map this managed property with the **ows_TestTerm** (ows_ColumnName) crawled property.

{{< caption-new "/uploads/2015/03/032415_1246_Correctlyso5.png" "RefinableString - Managed Property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVR4nCXLURJCIQxDUfa/WRGnKbFJcXieST7viIjIXJG7nGXK7svPhqSJN0i5y63uc879Y8zXwmf7RjfzX7ck22MGY9eXBFBVADJzkytY0g9zCXVXBhUqVAAAAABJRU5ErkJggg==" "627" "221" >}}


Wait for a full crawl or if you are working on-premises you could start one. Once the crawl is complete you can configure the new managed property on the sorting tab in the query builder. Now the results should be in the correct visual order:

{{< caption-new "/uploads/2015/03/032415_1246_Correctlyso6.png" "Correctly sorted results"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAcCAIAAADX37lsAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABnUlEQVR4nGWSyZLkIAxE6/9/s8rsi20WAWKZwHbZ3T154JKB9JTSK3iv113sGHPt41L/6lUr+hAXpqXWxlprrNZq9w6xTnuMkVNijFFKCKWMMWtNiLHWx87GGmOsNWa1K5YyxmitTbv/p9bq9E7be6fsRtbsAHu/4caF1lqLAAuVTAihlJRCCG6MRcSrd4LIOKPsAGNsW9eUc61H8TFGyWV7tCOWX8XPGdqD1ibZaQfvlNkWk/ZY2het36n13hMkQjmljPKJQMiybus190SLMJH4fKSUcER2lp92xeq9D95753wIrbW7/AsRS0Fs/Rjkr14heGW2twbr89GuP2DXSnKilBFKlslFyPJRWudjMZMcYmScM84454JLiHBOf/1utcKpGGOEM6WreM4ZUobSSm3fUMZjxxD0ur9VsA7w0Bz6DPY5JkopWT6TayHLRxtTzoXeaHwuWkilSv5xTOcCEAuWkg/VOv9dvVMCH8ClBqX9uaTDBrCbewunVw8pQUopQSnlFxo/zvwzySbaNhf6DRUicCnFvEKpta1Yb7R/egYqEWtJzBkAAAAASUVORK5CYII=" "185" "527" >}}


Now the results are sorted based on the display value of the managed property term instead of the term ID.