---
title: Retrieving the list or library name of a search result in display templates
author: Elio Struyf
type: post
date: 2015-01-16T12:24:14+00:00
excerpt: In this post is explained how you could retrieve the list or library name within a display template. The approach makes use of the available REST endpoints.
slug: /retrieving-list-library-name-search-result-display-templates/
dsq_thread_id:
  - 3836535679
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

A question was asked a while ago on StackExchange by a person with whom I worked together at one of my clients. He asked if it was possible to get the list or library name via a managed property so that it can be used in a display template.

The problem is that there is not a property that has this list name information. If you are working on-premises you could create a content enrichment service that will link this information to your item, but this is not possible in an Office 365 / SharePoint Online scenario.

In this post I explain how I achieved it with JavaScript in a display template.

## Solution

In your item display template you will need to following two properties: **SPWebURL**, **ListID**. These are OOTB properties in Office 365, but on-premises you only have the ListID property. The SPWebURL property will need to be manually added to the environment.

> **Note**: here is a post about how you can get the web URL via a managed property on your on-premises environment: [Retrieve the web URL for a search result via a managed property](https://www.eliostruyf.com/retrieve-the-web-url-for-a-search-result-via-a-managed-property/).

```html
<mso:ManagedPropertyMapping msdt:dt="string">'SPWebURL','ListID','Link URL'{Link URL}:'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:'','FileExtension','SecondaryFileExtension'</mso:ManagedPropertyMapping>
```

Once you have the web URL and list ID it is only a matter of creating a correct REST URL to retrieve the list / library title via a REST call. The REST URL looks like this:

`https://estruyfd2.sharepoint.com/sites/IRD/_api/Web/Lists(guid'4d46792d-0fd0-4850-aa29-4f3ea8310ac4')?$select=Title`

So what you need is to do an Ajax call to that REST endpoint and once you retrieved the information write it back to an element on the page. In the HTML code I added a SPAN element with a class called **listname**. That element will be used to add the list / library name to it.

```html
<strong>List / Library name:</strong> <span class="listname"></span>
```

Now you need to do some coding. So for each item you will need to retrieve the list name, but retrieving it for each search result would be a bit overkill. For example: if you have 50 items that are retrieved, you would do 50 calls to the rest endpoint. But if your items are only coming from five different lists or libraries you invoked it 45 times too much.

> **Note**: in worst case your items are coming from 50 different list / libraries, so these 50 calls are necessary.

So to optimize the process I included a list object in my code. All the different list names will be stored in this object linked with the list ID, but this is not enough. The first time your templates gets rendered it will still do these 50 calls because the title name is not yet stored. For this problem I included a check if the list object for the list ID is defined. If the list object is defined, I know that an Ajax call is already initiated for that list ID, and I set the list ID as class name on the SPAN element. These elements that are linked to the class are filled up when the Ajax call is finished.

Let me explain this again, but this time I do it via some screenshots to make things clear:

{{< caption-new "/uploads/2015/01/011615_1224_Retrievingt1.png" "Loaded elements and REST call" >}}

Here is a screenshot of what happens the first time I load my page. The display initiates a call to the REST endpoint to retrieve the library title. In this example only one library needs to be called, so only one call will be performed instead of five calls because my code checks if it is already initiated.

In the HTML code you will find the following classes on the SPAN elements:

{{< caption-new "/uploads/2015/01/011615_1224_Retrievingt2.png" "Listname element with list ID as class name" >}}

When you go to the next page and back to the previous, the following HTML code is in place:

{{< caption-new "/uploads/2015/01/011615_1224_Retrievingt3.png" "List name can be retrieved from object in memory, no need to do an Ajax call" >}}

Now the element does not contain the list ID as class name. This is because it was not necessary to do an Ajax call, the list title is retrieved from the list information object.

Here is the code that does all the magic:

{{< gist estruyf d8d3cee26ae5b7025edb >}}

## Result

The final result looks like this:

{{< caption-new "/uploads/2015/01/011615_1224_Retrievingt4.png" "Elements with corresponding library name" >}}

## Download

The item template from this post can be downloaded from the SPCSR GitHub repository: [Retrieve the list name in a display template](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Retrieve%20the%20list%20name%20in%20a%20display%20template "Retrieve the list name in a display template").