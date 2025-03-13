---
title: Dynamically Changing the Result Source in a SharePoint 2013 Search Center
author: Elio Struyf
type: post
date: 2013-12-18T15:59:38+00:00
slug: /dynamically-changing-result-source-sharepoint-2013-search-center/
dsq_thread_id:
  - 3836446346
categories:
  - Search
  - SharePoint 2013
tags:
  - JavaScript
  - Search
  - Search Center
  - Searchbox
comments: true
---

Almost two months ago Pascal Van Vlaenderen asked a question on twitter if there's a way to specify the Result Source in the QueryString ([https://twitter.com/VanVlaenderenP/status/392920559853383680](https://twitter.com/VanVlaenderenP/status/392920559853383680)). Since that time, this question was on my to-do list to check this out.

What I proposed back then, was to change the result source in the data provider object with JavaScript. This week I had some spare time to sort this thing out.

## Solution

The solution to change the result source in a SharePoint 2013 search center is to inject your own JavaScript function that will change the result source.

First thing to do is to find out the function where all the properties are set of your search results. All the magic happens in the **Srch.U.fillKeywordQuery** function. In that function the query text, result source ID, row limits, etx... are set.

To not completely rewrite the fillKeywordQuery function, we are going to store the reference to the original function, and call this at the end.

You don't need to write a lot of code to dynamically change the result source. What I wanted to achieve is when I used `<documents>` or `<pictures>` as a keyword in the search box, it should dynamically change the result source. My code looks like this:

```html
// Show duplicated results
if (typeof Srch.U.fillKeywordQuery !== 'undefined') {
    // Override the fillKeywordQuery function
    var originalFillKeywordQuery = Srch.U.fillKeywordQuery;
    // Override the default fillKeywordQuery function
    Srch.U.fillKeywordQuery = function(query, dp) {
        // Retrieve the current query text
        var queryText = dp.get_currentQueryState().k;
        // Check for your custom keywords
        if (queryText.indexOf('<documents>') >= 0) {
            // Remove the custom keywords text from the search query
            dp.get_currentQueryState().k = queryText.replace('<documents>', '');
            // Set the documents result source
            dp.set_sourceID('e7ec8cee-ded8-43c9-beb5-436b54b31e84');
        } else if (queryText.indexOf('<pictures>') >= 0) {
            // Remove the custom keywords text from the search query
            dp.get_currentQueryState().k = queryText.replace('<pictures>', '');
            // Set the pictures result source
            dp.set_sourceID('38403c8c-3975-41a8-826e-717f2d41568a');
        } else {
            // Specify an empty source ID to reset the default one
            dp.set_sourceID("");
        }
        // Call the default function to go further with the query processing
        originalFillKeywordQuery(query, dp);
    };
}
```

This piece of code can be added in a **Script Editor Web Part** on the results page of your search center.

To know the IDs of your search results, you can navigate to the **Site Settings** > **Search Result Sources** (under the Site Collection Administration section) > Click on the result source > you'll find the Result Source ID in the URL.

/_layouts/15/EditResultSource.aspx?level=sitecol&**sourceid=e7ec8cee-ded8-43c9-beb5-436b54b31e84**&view=1

> **Note**: at the moment this isn't working togheter with the search refiners. Right now when you're going to refine the results, the custom keyword will be removed. This is something new on my to-do list.