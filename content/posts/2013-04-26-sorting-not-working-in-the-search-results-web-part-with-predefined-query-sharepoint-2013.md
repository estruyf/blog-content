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

{{< caption-new "/uploads/2013/04/042613_1520_SortingNotW1.png" "Query Builder Sort Options"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVR4nDWMWxLDIAzEuP9hW8Bk7fUDOkmm+pVGrQuGwOjw7RHunlnnnP3Qlsh1LQBQU1UAay1Vrapbk8xMAKRFBMk5512bq1frvY8xqioi3uHe+5mfrN3mlM+3Q40P/iciMrMJ2EXHAkmz+19V7v6mP4hwru1VJsuYAAAAAElFTkSuQmCC" "615" "372" >}}

Storing the settings was not giving me the correct result. Whatever I configured in the sorting settings, the web part ignored the settings.

## Solution: Results Source Approach

Configuring the sorting in the web part settings did not work, so the next thing I tried was to create a result source with the same query. Creating a result source can be done on the Site Collection itself, so you do not need to go to Central Administration.

_Note: [here](http://technet.microsoft.com/en-us/library/jj683115.aspx) you can read how to configure a custom result source._

For the result source I used the same configuration and sorting settings as in the search results web part.

{{< caption-new "/uploads/2013/04/042613_1520_SortingNotW2.png" "Result Source Sorting"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAb0lEQVR4nE3MWwrDMAxEUe9/sQ2WZY3eKXGg9HwNDNzBzItFLbrr/tPHWETMIgIAqqrA3htAVT23mmaEyDazzFTVOUlkQ129Bk1aRHX8mmfcWT2I6PpcbxmAmbmbu4d7Zg7eOheIYeZvv7sjwh/xBbJ5rzqo2wVjAAAAAElFTkSuQmCC" "615" "362" >}}

The nice thing about this results sources is that they can be used in the Query Builder.

{{< caption-new "/uploads/2013/04/042613_1520_SortingNotW3.png" "Sorted Result Source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMElEQVR4nC3KSQoAMAgEQf//XHGJMDoBk7p2i6mfrJnh6kVylnikWgB4GUBV/RV9ASSxOxItyrHSAAAAAElFTkSuQmCC" "889" "141" >}}

After the creation of the result source I configured the search results query builder and specified my result source as the query that needs to be used.

{{< caption-new "/uploads/2013/04/042613_1520_SortingNotW4.png" "Use the created result source as query"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARUlEQVR4nDXKQQqAMBADwP7/rSLKapvNJq0oOOdpx63zApD82Vpr2dOejWQVVUVSUub7kIzOjmoRse1HB6WyPT4YIxOyHu/iV5v6y4MrAAAAAElFTkSuQmCC" "620" "189" >}}

**Note**: the query text may remain empty.

This approach works perfectly, the result source does the sorting, instead of the search results web part.