---
title: Making columns searchable for the list or library searchbox
author: Elio Struyf
type: post
date: 2015-03-31T08:52:17+00:00
slug: /making-columns-searchable-for-the-list-or-library-searchbox/
dsq_thread_id:
  - 3836883315
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Managed Properties
  - Search
  - Search Results
comments: true
---

One of the handiest features that were added to a list or library is the in-place searchbox. The in-place searchbox allows you to quickly search for items or documents while staying in the list or library context (in previous versions you were redirected to a search page). When you have used this list or library searchbox, you may have experienced some problems like not been able to retrieve the items you needed or even retrieving no items at all. These problems can be related to columns from your list that are not configured as searchable.

As an example I created a contacts list with the following items:

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum1.png" "Default contact list with items" >}}


If I do a search on for a specific company like **Contoso**. I should expect to retrieve all the contacts linked to Contoso, but instead, I am retrieving none.

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum2.png" "Search for contoso in the contacts list" >}}


> **Note**: The searchbox does the following search query to retrieve the items: "path:path-to-the-list AND your-query-text".

In order to be able to search for content inside a column, that column needs to be searchable. A searchable column means that you can search based on a term without specifying the managed property name to find your information. Mikael Svenson wrote a great article on this topic: "[What makes a SharePoint column searchable?](http://techmikael.blogspot.no/2014/07/what-makes-sharepoint-column-searchable.html)". In this article, you can read more about crawled and managed properties and what makes the content of your column searchable.

**Note 1**: Be sure that your items have been crawled and indexed.

**Note 2**: Be sure to leave the Local SharePoint Results (result source) as the default. Mikael Svenson also wrote a post about this: "[How to: (Unexpectedly) Block the usage of the list/library search box in SharePoint](http://techmikael.blogspot.com/2015/03/how-to-unexpectedly-block-usage-of.html)".

In this example, the **company** column needs to be checked to see if it is searchable. First, you need to find the corresponding managed property inside the search schema. For the company field, this is the** OrgNames** managed property. The OrgNames property is configured as follows:

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum3.png" "OrgNames managed property" >}}

As you can see in the above screenshot, the managed property is mapped to two **crawled properties**. In my situation, both these crawled properties are not configured to include its content in the full-text index:

{{< caption-legacy "uploads/2015/03/Screenshot-2017-09-21-13.56.39-1.png" "OrganizationNames crawled property" >}}

{{< caption-legacy "uploads/2015/03/Screenshot-2017-09-21-13.54.30-1.png" "ows_Company crawled property" >}}

> **Info**: in this case only the ows_Company crawled property is important, as the other one is only used for people results.

As the managed property OrgNames is only configured as **queryable** and the linked crawled properties are not included in the full-text index. The content can only be searched for by including the property name in the query (queryable).

> **Info**: Queryable means that you need to include the managed property name in order to search for the information you want. You could test this in your list by doing a query like this: **ManagedPropertyName:QueryText**. You can test this in the list by searching for **OrgNames:Contoso**.

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum4.png" "Search on Contoso with Managed Property name" >}}

This search query returns the items with the company set to Contoso. Of course, you cannot expect from your end users to always type the managed property name in front of the search query, so you best enable the managed property to be searchable.

> **Info**: if the "include in full-text index" option was checked for the **ows_Company** crawled property, the following configuration for the managed property is **not** required.

## Making the managed property searchable

If you are working in an on-premises environment, you can enable this on the managed property linked to your site column. You need to edit the managed property in order to get a **Searchable** checkbox (only available in the Search Service Application), enable this and store your change.

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum5.png" "Searchable checkbox" >}}

The managed property now has the following configuration:

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum6.png" "Configure OrgNames to be searchable" >}}

> **Important**: when working with Office 365 you cannot enable the searchable checkbox directly in the corresponding managed property. In Office 365 you need to create a new managed property, link it with the crawled property of your column and make the managed property searchable.

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum7.png" "Custom managed property in Office 365" >}}

Wait for a full crawl to happen or start one. Once it finished, you can go back to the list or library. Do your search query again without the managed property name. Right now you should retrieve the same items like in the previous query.

{{< caption-legacy "uploads/2015/03/033115_0852_Makingcolum8.png" "Search for contoso after a full crawl" >}}

## My managed property is not marked as searchable, and I am able to search on its contents

This is possible when one of the crawled properties (in most cases you will have two ows_ and ows_q_) of the column is marked to be included in the full-text index.

{{< caption-legacy "uploads/2015/03/Screenshot-2017-09-21-14.17.54.png" "Include in the full-text index" >}}