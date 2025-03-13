---
title: View Duplicate Results in the SharePoint 2013 Search Center via JavaScript
author: Elio Struyf
type: post
date: 2013-12-19T19:50:46+00:00
slug: /view-duplicate-results-sharepoint-2013-search-center-via-javascript/
dsq_thread_id:
  - 3836446623
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

The blog post about how to [dynamically change the result sources in a search center](https://www.eliostruyf.com/dynamically-changing-result-source-sharepoint-2013-search-center/) was based on a solution that I created to show the duplicated results in a search center with JavaScript.

A standard Search Center in SharePoint 2013 doesn't show the duplicated results by default. You have two options to view the duplicates:

1.  Is to turn on the **Show view duplicates link** in the search result web part settings;
2.  Or you could change the web part property **TrimDuplicates** in the webparts file, and set this value to false.
The first result only shows a duplicates link when items have corresponding duplicates:

{{< caption-new "/uploads/2013/12/121913_1951_ViewDuplica1.png" "Default View Duplicates" >}}

When you click on the link, you retrieve the set of results with the duplicate items:

{{< caption-new "/uploads/2013/12/121913_1951_ViewDuplica2.png" "Duplicates Result Set" >}}

The second approach is most properly the way you want the result set to behave, because you retrieve all the results including the duplicates. The downside of this approach is that you have less flexibility. Or it's on, or it's off, you can't easily switch (or you need to create an additional page).

## JavaScript Solution

What I wanted to achieve is that you could quickly set if you want to show or hide the duplicate results. The code for this is really simple. All you need to do is override the **Srch.U.fillKeywordQuery** function by your own custom function and set if you want to show or hide the duplicates for your search query.

The code for this looks like this:

```html
<label for="duplicates">Show duplicates</label>
<input id="duplicates" type="checkbox" name="duplicates" value="duplicates">

<script>
// Show duplicated results
if (typeof Srch.U.fillKeywordQuery !== 'undefined') {
  var originalFillKeywordQuery = Srch.U.fillKeywordQuery;
  Srch.U.fillKeywordQuery = function(query, dp) {
    if (document.getElementById('duplicates').checked) {
      // Set the trim duplicates property to false
      dp.set_trimDuplicates(false);
    } else {
      // Set the trim duplicates property to true
      dp.set_trimDuplicates(true);
    }
      // Call the default function to go further with the query processing
      originalFillKeywordQuery(query, dp);
    };
}
</script>
```

This code can be added in a Script Editor web part. I placed this above my Search Box:

{{< caption-new "/uploads/2013/12/121913_1951_ViewDuplica3.png" "Script Editor" >}}

## Result

The result looks like this:

{{< caption-new "/uploads/2013/12/121913_1951_ViewDuplica4.png" "Result set without duplicates" >}}

{{< caption-new "/uploads/2013/12/121913_1951_ViewDuplica5.png" "Result set with duplicates" >}}

> **Note**: if you always want to show the duplicates, you only need to keep the **dp.set_trimDuplicates(false)** line and the **originalFillKeywordQuery(query, dp)** call to the original function.

```javascript
// Show duplicated results
if (typeof Srch.U.fillKeywordQuery !== 'undefined') {
  var originalFillKeywordQuery = Srch.U.fillKeywordQuery;
  Srch.U.fillKeywordQuery = function(query, dp) {
    dp.set_trimDuplicates(false);
      originalFillKeywordQuery(query, dp);
  };
}
```

> **PS**: as this will be my last blog post of the year, I wish you all a merry Christmas & happy new year.