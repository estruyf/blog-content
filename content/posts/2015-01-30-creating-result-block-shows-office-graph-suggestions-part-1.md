---
title: Creating a result block that shows Office Graph suggestions – Part 1
author: Elio Struyf
type: post
date: 2015-01-30T12:47:38+00:00
slug: /creating-result-block-shows-office-graph-suggestions-part-1/
dsq_thread_id:
  - 3839740262
categories:
  - Office 365
  - Office Graph
  - Search
tags:
  - Delve
  - Display Templates
  - JavaScript
  - Office Graph
comments: true
---

There are already a various blog posts that show the power and value of Office Graph / Delve for your organisation, but not everyone will go to the Delve page to find their results. You also have your SharePoint search center were a lot of your users will go through to find their documents because they are used doing it that ways.

Now the idea I had was to bring these two search experiences closer together by integrating Office Graph results via a result block into the SharePoint search center. From the moment a user does a search for something, it would automatically queries Office Graph to retrieve the top three results (depending on the settings of the result block).

{{< caption-legacy "uploads/2015/01/office-delve-result-block2.jpg" "Office Graph result block" >}}

In this post I explain how you can achieve this on your Office 365 environment.

## What is required to create a result block

If you ever set up a result block in your search center, you will know that it all comes down to specifying a new query rule in which you configure a query or result source from which you want to retrieve the results. It is not different when you want to retrieve results from Office Graph.

Now there is one major problem, you cannot retrieve results from Office Graph directly with some search keywords. When you want to retrieve results from Office Graph you to pass the **GraphQuery** property. This **GraphQuery** cannot be added from within the query builder.

Together with [Mikael Svenson](https://twitter.com/mikaelsvenson), we tried to create a new result source for Office Graph via XML, PowerShell, etc..., but in the end nothing worked, it does not seem to take the property into account. Sometimes you do not get the results you were expecting to get.

> **Important**: there is also a **Local SharePoint Graph** result source available. This result source is not available in the result sources list, but it will show up in the query builder. Unfortunately the result source cannot be used because it always returns errors when trying to retrieve search results.

So what do you do when you cannot do a direct call to Office Graph via a query or result source? You find another solution to solve it.

The solution I came up with is by creating a display template in which I wrote some JavaScript code which will do a REST calls to retrieve results from Office Graph. The display template can be downloaded from GitHub together with two additional display templates which are used for the rendering of your Office Graph results and the hover panel.

Download: the files can be downloaded here: [Office Graph Result Block Templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Office%20Graph%20Result%20Block%20Templates "Office Graph Result Block Templates").

> **Important**: update the script references in the OfficeGraph_Results.html and item_OfficeGraph_Results.html files first, then upload these files to the master page gallery on your site. Search for the text: "Check if the location is the same in your environment" and change the reference underneath it. I places these templates in a folder named OfficeGraph in the master page gallery.

This approach requires some configuration on your site which will be explained in the next section.

## Query rule and result block configuration

Setting up a result block all starts by creating a new query rule for a specific context. Your search center will by default use the **Local SharePoint Results** result source, so this will also be the result source to use for adding the Office Graph result block.

{{< caption-legacy "uploads/2015/01/013015_1247_Creatingare1.png" "Manage query rules" >}}

The next step is creating a new query rule and defining when the result block needs to be added. Defining that is done by specifying query conditions, in this setup it should always be visible, and so I choose to remove the query condition.

{{< caption-legacy "uploads/2015/01/013015_1247_Creatingare2.png" "Creating a new query rule" >}}

> **Note**: if you want, you can change the context to all sources.
_

Under the actions section you can choose to add promoted results or a result block. Click on the **Add Result Block** link and in the dialog that opens we can configure the query. The result block is configured as follows:

{{< caption-legacy "uploads/2015/01/013015_1247_Creatingare3.png" "Result block configuration" >}}

*   **Title**: change it to something like - Office Graph suggestions for "{subjectTerms}";
*   **Configure Query**: I changed it to a * query. You need to be sure that you always retrieve results because the real results are coming from Office Graph;
*   **Items**: change the number of items to your flavour;
*   **Block display order**: set the block to always show above the core results;
*   **Item Display Template**: the last thing is to set the Item display template to **Office Graph Results**, this display template can be found on the following link: [Office Graph Result Block Templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Office%20Graph%20Result%20Block%20Templates "Office Graph Result Block Templates").

Once you configured the result block. Store your query rule and it will redirect you to the list of query rules where your new query rule will be available:

{{< caption-legacy "uploads/2015/01/013015_1247_Creatingare4.png" "Office Graph suggestions query rule" >}}

## Office Graph result block

Once the query rule is created, you can go to your search center and do a search query. If everything is configured correctly, you should get a similar result like this:

{{< caption-legacy "uploads/2015/01/013015_1247_Creatingare5.png" "Office Graph suggestions" >}}

If you hover over an item, the hover panel will show the Delve card like result:

{{< caption-legacy "uploads/2015/01/013015_1247_Creatingare6.png" "Office Graph result with hover panel" >}}

Refining the results will also refine the Office Graph Results:

{{< caption-legacy "uploads/2015/01/013015_1247_Creatingare7.png" "Office Graph result refinement" >}}

## Part 2: technical implementation

If you are interested, in the second post I will explain in more detail how these templates were created and how they are working together.