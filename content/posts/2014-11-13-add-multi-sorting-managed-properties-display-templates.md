---
title: How to add multi-sorting of managed properties in your display templates
author: Elio Struyf
type: post
date: 2014-11-13T09:39:26+00:00
slug: /add-multi-sorting-managed-properties-display-templates/
dsq_thread_id:
  - 3836535662
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
  - Sorting
comments: true
---

Last week I had an internal event where I did one of my new sessions: take your display template skills to the next level. One of the topics that I discuss during this session is how you can add sorting in your display templates.

> **Note**: this is something I blogged about a couple of months ago ([How to add sorting in display templates](https://www.eliostruyf.com/add-sorting-display-templates/ "How to add sorting in display templates") and [Table layout display template with managed property sorting](https://www.eliostruyf.com/table-layout-display-template-with-managed-property-sorting/ "Table layout display template with managed property sorting")).

During my talk someone asked if it is possible to sort the results on multiple managed properties. Currently I only did it for one managed property at a time.

As it turns out it is possible, but you need to include some extra JavaScript. In this post I will explain how you can achieve sorting of search results on multiple managed properties.

## How to add multi-sorting

If you want to add sorting possibilities into your display templates, you first need to register the sorting options to the available sorts array of your data provider. This is explained in my first post: [how to add sorting in display templates](https://www.eliostruyf.com/add-sorting-display-templates/).

The code for registering your sorts looks like this:

```JavaScript
var availableSorts = ctx.DataProvider.get_availableSorts();
availableSorts.push({"name":"Created-ASC","sorts":[{"p":"Created","d":0}]});
availableSorts.push({"name":"Created-DES","sorts":[{"p":"Created","d":1}]});
ctx.DataProvider.set_availableSorts(availableSorts);
```

To do the sorting of your results, you will have to include a trigger that uses one of the registered sorting options. The following methods are available to trigger the sorting: **sort** or **sortOrRank**. These methods can be used like this:

```html
// Sort or rank
$getClientControl(this).sortOrRank('Created-ASC');

// Usage
<a href="#" title="Created ASC" onclick="$getClientControl(this).sortOrRank('Created-ASC');">
    <img alt="Ascending" src="/_layouts/15/images/sortaz.gif">
</a>

// Sort
$getClientControl(this).sort('Created-ASC');

// Usage
<a href="#" title="Created ASC" onclick="$getClientControl(this).sort('Created-ASC');">
    <img alt="Ascending" src="/_layouts/15/images/sortaz.gif">
</a>
```

Now the problem is if you have multiple links on your page for managed property sorting (this could be the case if you are using my table layout display template), you will only be able to sort on one managed property at a time. If you click on another managed property to sort on, the previous one will get overridden.

Example: if you first so a sorting on the file size, the results get sorted on the file size. If you click on the author sorting links, the sorting on size is overridden by the author sorting.

{{< caption-new "/uploads/2014/11/111314_0939_Howtoaddmul1.png" "Managed property sorting (one at a time)" >}}

The reason for this behavior is because a new query gets executed behind the scenes without taking the previous sorting into account.

Here is a code snippet of what is happening behind the scenes in the Search.ClientControls.js file:

```JavaScript
// Get the available sorts on the data provider
var sorts = dataProvider.get_availableSorts();
if (!Srch.U.n(sorts) && sorts.length > 0) {
  for (var i = 0; i < sorts.length; i++) {
    var sort = sorts[i];
    // Find the triggered sort, once found, do a new query
    if (!Srch.U.n(sort) && sort.name === sortName) {
      var queryState = new Srch.QueryState();
      queryState.o = sort.sorts;

      ...

      queryState.s = 1;
      var queryEvent = new Srch.QueryEventArgs(queryState);
      queryEvent.userAction = 4;
      this.raiseQueryReadyEvent(queryEvent);
      return;
    }
  }
}
```

So if you want to include multi-sorting functionality to your display template, the only option you have is to write JavaScript code to enable this.

Here is my function to enable multi-sorting:

```JavaScript
function sortProperty(sortName, clientControl) {
  if (Srch.U.e(sortName)) {
    return;
  }
  var dataProvider = clientControl.get_dataProvider();
  if (Srch.U.n(dataProvider)) {
    return;
  }
  
  // Retrieve the available sorts
  var availableSorts = dataProvider.get_availableSorts();
  // Retrieve the current sorts
  var currentSorts = clientControl.get_dataProvider().get_currentQueryState().o;
  
  if (!Srch.U.n(availableSorts) && availableSorts.length > 0) {
    var triggeredSort;
    // Loop over each of the available sortings
    for (var i = 0; i < availableSorts.length; i++) {
      var sort = availableSorts[i];
      // Check if the sorting has been selected
      if (!Srch.U.n(sort) && sort.name === sortName) {
        // Store the current sorting
        triggeredSort = sort.sorts;
      }
    }
    
    var sortarray = [];
    var processed = false;
    // Check if there was already sorting in place
    if (!Srch.U.n(currentSorts) && currentSorts.length > 0) {
      // Loop over the current sorts
      for (var i = 0; i < currentSorts.length; i++) {
        var currentSort = currentSorts[i];
        // Check if the current sort is equal to the clicked sort
        if (currentSort.p === triggeredSort[0].p) {
          // Push the new sorting option on the array
          sortarray.push(triggeredSort[0]);
          processed = true;
        } else {
          // Push the unchanged sort on the array
          var sortObj = { p: currentSort.p, d: currentSort.d };
          sortarray.push(sortObj);
        }
      }
      // Check if the clicked sorting was processed.
      // If it is not processed, push it on the array.
      if (!processed) {
        sortarray.push(triggeredSort[0]);
      }
    } else {
      // If the results were not yet sorted, use the clicked sort option
      sortarray = triggeredSort;
    }
    
    // Do a new query with the sort information
    var queryState = new Srch.QueryState();
    queryState.o = sortarray;
    queryState.s = 1;
    var queryEvent = new Srch.QueryEventArgs(queryState);
    queryEvent.userAction = 4;
    clientControl.raiseQueryReadyEvent(queryEvent);
    return;
  }
}
```

> **Note**: the function expects the name that is specified in the available sorts array (in the code snippet above this is **Created-ASC** or **Created-DES**) and the current client control.

The code checks if a sorting is in place, and if that is the case, it will retain the sorting order and add or update the triggered managed property sorting.

The function can be called like this:

```html
<a href="#" title="Created ASC" onclick="sortProperty('Created-ASC', $getClientControl(this));">
  <img alt="Ascending" src="/_layouts/15/images/sortaz.gif">
</a>
```

Now if you have multi-sorting enabled in your display template, it can be useful to remove a specific sorting. For example: if you did a sort on Author and this didn't gave you the results you expected, by triggering a sorting removal the author sorting gets unset.

Here is a function I created to achieve the removal functionality:

```JavaScript
function removeSortProperty(property, clientControl) {
  if (Srch.U.e(property)) {
    return;
  }
  var dataProvider = clientControl.get_dataProvider();
  if (Srch.U.n(dataProvider)) {
    return;
  }
  
  // Retrieve the current sorts
  var currentSorts = clientControl.get_dataProvider().get_currentQueryState().o;
  
  // Check if the results are already sorted, otherwise the property cannot be removed
  if (!Srch.U.n(currentSorts) && currentSorts.length > 0) {
    var sortarray = [];
    var processed = false;
    // Loop over the current sorts
    for (var i = 0; i < currentSorts.length; i++) {
      var currentSort = currentSorts[i];
      // Check if the current sort is equal to the clicked sort
      if (currentSort.p !== property) {
        // Push the unchanged sort on the array
        var sortObj = { p: currentSort.p, d: currentSort.d };
        sortarray.push(sortObj);
      } else {
        processed = true;
      }
    }
    
    // Check if the sort option was removed from the sorting array
    if (processed) {
      // Do a new query with the sort information
      var queryState = new Srch.QueryState();
      queryState.o = sortarray;
      queryState.s = 1;
      var queryEvent = new Srch.QueryEventArgs(queryState);
      queryEvent.userAction = 4;
      clientControl.raiseQueryReadyEvent(queryEvent);
      return;
    }
  }
}
```

> **Note**: this function expects the property name that needs to be removed and the current client control.

The function can be called like this:

```html
<a href="#" title="Remove sorting" onclick="removeSortProperty('Created', $getClientControl(this));">
  Remove sorting
</a>
```


## Updated table layout display template

I have created a new "updated" version of the table layout display template to include this functionality. In the new template you can do multi-sorting and removing the set sorting.

{{< caption-new "/uploads/2014/11/111314_0939_Howtoaddmul2.png" "New sorting options (mutli-sort and removal)" >}}

{{< caption-new "/uploads/2014/11/111314_0939_Howtoaddmul3.png" "Sorting on file size and file extension" >}}

You can find the new version of the table layout display templates on the [SPCSR GitHub repository](https://github.com/SPCSR/ "GitHub SPCSR Repository"): [Table Layout with Multi Sort Templates (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Table%20Layout%20with%20Multi%20Sort%20Templates%20%28CSWP%29 "Table Layout with Multi-Sorting Templates \(CSWP\)").