---
title: 'Part 4: Create a Dropdown Search Refiner Control'
author: Elio Struyf
type: post
date: 2013-11-01T09:02:07+00:00
slug: /part-4-create-dropdown-search-refiner-control/
dsq_thread_id:
  - 3836446314
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
  - Search Center
  - Styling
comments: true
---

In this blog post part of the search refiner control series, I'll show how to create a dropdown search refiner control. To make it a bit special, I've added the functionality of showing the filters that were available before the results were refined.

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create1.png" "Mockup" >}}

> **Note**: for this post I start with the file I created in part 2 of this series. Download the template here: [Custom Search Refiner Control Part 2](/uploads/2013/10/Display-Template-Part2.txt "Custom Search Refiner Control Part 2").

## Creating a Dropdown Menu

Creating a dropdown menu for your Search Refiner Control is really simple. The first thing to do is creating the select elements in html, to do this the mark-up of the control needs some modification. For this refiner template I'm going to work with only one dropdown element instead of two (unselected and selected array).

The mark-up is changed to this:

{{< highlight html "linenos=table,noclasses=false" >}}
<select id='ms-ref-unselSec' style='display:_#= $htmlEncode(displayStyle) =#_' onchange="javascript:new Function(this.value)();">
    <option></option>
<!--#_
    for (var i = 0; i < unselectedFilters.length; i++) {
      var filter = unselectedFilters[i];
      if(!$isNull(filter)) {
        var refiners = new Object();
        refiners[filter.RefinerName] = filter.RefinementTokens;
        ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'addRefinementFiltersJSON');
      }
    }

    var currentRefinementCategory = ctx.ClientControl.getCurrentRefinementCategory(ctx.RefinementControl.propertyName);
    // Check if the object is null or undefined && Count the tokens currently in place
    var hasAnyFiltertokens = (!Srch.U.n(currentRefinementCategory) && currentRefinementCategory.get_tokenCount() > 0);

    if (selectedFilters.length > 0 '' hasAnyFiltertokens) {
      for (var i = 0; i < selectedFilters.length; i++) {
        var filter = selectedFilters[i];
        if(!$isNull(filter)) {
          var refiners = new Object();
          refiners[filter.RefinerName] = filter.RefinementTokens;
          ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'removeRefinementFiltersJSON');
        }
      }
    }
_#-->
  </select>
<!--#_
    if (selectedFilters.length > 0 '' hasAnyFiltertokens) {
      var refinerRemoval = new Object();
      refinerRemoval[ctx.RefinementControl.propertyName] = null;
      ShowRefiner('Remove refinement', null, refinerRemoval, 'updateRefinersJSON');
    }
_#-->
</div><!-- CONTAINER CLOSING TAG -->
{{< / highlight >}}

As you can see, I changed the previous **DIV** elements to **select** elements. Another thing I've done is, I moved the **Remove refinement** link out of the **select** element.

The next step is to change is the **ShowRefiner** function. In that function the hyperlinks need to be changed to option elements.

{{< highlight javascript "linenos=table,noclasses=false" >}}
function ShowRefiner(refinementName, refinementCount, refiners, method) {
  // Create the onClick or onChange event
  var onClickOrChange = "$getClientControl(this)." + method + "('" + $scriptEncode(Sys.Serialization.JavaScriptSerializer.serialize(refiners)) + "');";
  // Check if the refinement contains results
  if (refinementCount != null) {
_#-->
     <option href='javascript:{}' value='_#= onClickOrChange =#_'>_#= $htmlEncode(refinementName) =#_</option>
<!--#_
  } else {
_#-->
    <div><a href='javascript:{}' onclick='_#= onClickOrChange =#_'>_#= $htmlEncode(refinementName) =#_</a></div>
<!--#_
  }
}
{{< / highlight >}}

This results in the following output:

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create2.png" "Dropdown Refiner" >}}

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create3.png" "Dropdown Refiner Values" >}}

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create4.png" "Remove Refinement" >}}

As you can see, creating a custom dropdown refiner control isn't that hard once you know what need to be updated. Now we go a step further, showing the elements that were there before the refining.

## Showing the Unselected Refiners

Once you refined your results, the unselected refiners array will be empty. This is due to the fact that the selected array will be populated once the result set is refined. The selected array contains the possible refiners once refined.

It isn't possible to retrieve the old (unselected) refinement values from the current **ListData** object, because it doesn't contain these values anymore. It now has the refiner values for the new / refined set of results.

The approach to show the unselected values, is the same that I've used to create the load more results button for the CSWP (if you didn't read this post, here is the link to it: [Create a Load More Results Link / Button for the Content Search Web Part (Display Template)](https://www.eliostruyf.com/create-a-load-more-results-link-button-for-the-content-search-web-part/)).

The explained approach in that post is to store the results in a container outside the render area of the current display template. If they are stored inside the render area of that display template control, they'll be removed once the control is refreshes (happens each time you refine).

> **Note**: the following piece of code can be written with jQuery in a "cleaner" and quicker way.

The first thing you'll need is a hidden container that is used to temporally store the refiner option.

{{< highlight javascript "linenos=table,noclasses=false" >}}
// Create a new hidden block outside the current refinement control
var refElm = document.getElementById('Refinement');
var hiddenBlockID = ctx.RefinementControl.containerId + "_" + ctx.RefinementControl.propertyName;
var hiddenBlock = document.getElementById(hiddenBlockID);
// Check if the hidden block exists, otherwise we create one
if (hiddenBlock === null '' hiddenBlock.lenght <= 0) {
  hiddenBlock = document.createElement('div');
  refElm.appendChild(hiddenBlock);
  hiddenBlock.setAttribute('id', hiddenBlockID);
  hiddenBlock.setAttribute('style', 'display:none;');
}
{{< / highlight >}}

With this code a new block gets created in the refinement panel right after the search refiner control blocks, I gave it a unique ID to easily retrieve it.

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create5.png" "HTML Mark-up" >}}

The next step is to change the **ShowRefiner** function to populate the hidden block with the refiners. This is only needed for the unselected list of refiners, so we can add a check to see if the results aren't refined.

{{< highlight javascript "linenos=table,noclasses=false" >}}
// Check if there aren't filter tokens in place
if (!hasAnyFiltertokens) {
  var elm = document.getElementById(hiddenBlockID);
  var option = document.createElement('option');
  var text = document.createTextNode(refinementName);
  option.appendChild(text);
  option.setAttribute('value', onClickOrChange);
  elm.appendChild(option);
}
{{< / highlight >}}

If you test this now, you won't see anything visual, but if you check the hidden container, you'll see that it gets populated with the refiners.

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create6.png" "Hidden Container with Refinement Values" >}}

This list needs some clean up every time the template starts populating the unselected array. If you wouldn't do it, you'll end up with double items. To achieve this, I created a **ClearHiddenList** function that will be called each time before the unselected loop starts the enumerations.

{{< highlight javascript "linenos=table,noclasses=false" >}}
function ClearHiddenList() {
  var elm = document.getElementById(hiddenBlockID);
  while (elm.hasChildNodes()) {
    elm.removeChild(elm.lastChild);
  }
}
{{< / highlight >}}

As I said, the function call will be done just before the unselected array loop. I also added a check to see if unselected array contains items, otherwise the hidden block would be erased after every refresh.

{{< highlight javascript "linenos=table,noclasses=false" >}}
<!--#_
  if (unselectedFilters.length > 0) {
    // Clear the hidden list
    ClearHiddenList();
    for (var i = 0; i < unselectedFilters.length; i++) {
      var filter = unselectedFilters[i];
      if(!$isNull(filter)) {
        var refiners = new Object();
        refiners[filter.RefinerName] = filter.RefinementTokens;
        ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'addRefinementFiltersJSON');
      }
    }
  }
_#-->
{{< / highlight >}}

Almost there, we just need to append some extra bocks / containers to append the hidden refiners back to the dropdown. For this I'll use two option grouping **optgroup** blocks, these blocks get their own IDs.

{{< highlight javascript "linenos=table,noclasses=false" >}}
// Dropdown Group IDs
var unselDD = ctx.RefinementControl.containerId + "_Unsel";
var selDD = ctx.RefinementControl.containerId + "_Sel";
{{< / highlight >}}

The mark-up of these optgroup blocks look like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<select id='ms-ref-unselSec' style='display:_#= $htmlEncode(displayStyle) =#_' onchange="javascript:new Function(this.value)();">
  <option></option>
<!--#_
  if (selectedFilters.length > 0 '' hasAnyFiltertokens) {
_#-->
  <optgroup label="Selected Refiners" id="_#= selDD =#_">
<!--#_
    for (var i = 0; i < selectedFilters.length; i++) {
      var filter = selectedFilters[i];
      if(!$isNull(filter)) {
        var refiners = new Object();
        refiners[filter.RefinerName] = filter.RefinementTokens;
        ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'removeRefinementFiltersJSON');
      }
    }
_#-->
  </optgroup>
<!--#_
  }
_#-->
  <optgroup label="Other Refinements" id="_#= unselDD =#_">
<!--#_
  if (unselectedFilters.length > 0) {
    for (var i = 0; i < unselectedFilters.length; i++) {
      var filter = unselectedFilters[i];
      if(!$isNull(filter)) {
        var refiners = new Object();
        refiners[filter.RefinerName] = filter.RefinementTokens;
        ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'addRefinementFiltersJSON');
      }
    }
  }
_#-->
  </optgroup>
</select>
{{< / highlight >}}

> **Note**: for the visual part, I changed the order form the loops. I've placed the selected loop above the unselected one.

Right now the result looks like this once you refine your results:

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create7.png" "Dropdown with Refinement Groups" >}}

## Adding the Hidden Refiners to the Dropdown

To append the hidden refiners to the dropdown, we need to implement a callback function that populate the hidden refiners once the refiner controlled finished rendering.

This can be achieved by using the **AddPostRenderCallback** function.

{{< highlight javascript "linenos=table,noclasses=false" >}}
// Run this after the control is rendered - this will populate the unselected option group
AddPostRenderCallback(ctx, function() {
  if (hasAnyFiltertokens) {
    // Get the hidden block
    var hiddenOptions = document.getElementById(hiddenBlockID).children;
    var unSelGroup = document.getElementById(unselDD);
    var selGroup = document.getElementById(selDD);
    // Clone all the elements from the hidden list to the unselected option group
    for (var i = 0; i < hiddenOptions.length; i++) {
      var selectedElm = GetAllElementsWithAttribute(selGroup, 'value', hiddenOptions[i].getAttribute('value').replace('updateRefinersJSON', 'removeRefinementFiltersJSON'));
      if (selectedElm === null '' selectedElm.length <= 0) {
        var cloneElm = hiddenOptions[i].cloneNode(true);
        unSelGroup.appendChild(cloneElm);
      }
    }
  }
});
{{< / highlight >}}

If you now do a search and refine the results, you will see that the hidden refiners are added to the dropdown.

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create8.png" "Dropdown with Refinement Groups and Values" >}}

If you want to use one of the **other refiners**, you'll need to change the method that is used for refining the results. We cannot use the **addRefinementFiltersJSON**, we should use the **updateRefinersJSON** method instead. This is because the refinement that is in place needs to be updated, instead of adding an extra refinement.

The ShowRefiner function call in the unselected loop should be changed to this:

{{< highlight html "linenos=table,noclasses=false" >}}
ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'updateRefinersJSON');
{{< / highlight >}}

One last thing is to don't populate the selected option to the unselected list. To check this we need to add a check in the **AddPostRenderCallback** function to check if the element is in the selected list.

{{< highlight javascript "linenos=table,noclasses=false" >}}
function GetAllElementsWithAttribute(element, attribute, value) {
  var matchingElements = [];
  var allElements = element.getElementsByTagName('*');
  for (var i = 0; i < allElements.length; i++) {
    if (allElements[i].getAttribute(attribute)) {
      if (value === allElements[i].getAttribute(attribute)) {
        matchingElements.push(allElements[i]);
      }
    }
  }
  return matchingElements;
}

// Run this after the control is rendered - this will populate the unselected option group
AddPostRenderCallback(ctx, function() {
  if (hasAnyFiltertokens) {
    // Get the hidden block
    var hiddenOptions = document.getElementById(hiddenBlockID).children;
    var unSelGroup = document.getElementById(unselDD);
    var selGroup = document.getElementById(selDD);
    // Clone all the elements from the hidden list to the unselected option group
    for (var i = 0; i < hiddenOptions.length; i++) {
      var selectedElm = GetAllElementsWithAttribute(selGroup, 'value', hiddenOptions[i].getAttribute('value').replace('updateRefinersJSON', 'removeRefinementFiltersJSON'));
      if (selectedElm === null '' selectedElm.length <= 0) {
        var cloneElm = hiddenOptions[i].cloneNode(true);
        unSelGroup.appendChild(cloneElm);
      }
    }
  }
});
{{< / highlight >}}

The outcome looks as follows:

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create9.png" "Dropdown with Refinement Values (no duplicates)" >}}

## Set the Selected Item

One last thing that needs to be done, is to set the selected item in the dropdown. This can be achieved by adding a Boolean value to the **ShowRefiner** function call, so that this value can be used to create a selected option once this value is true. The updated **ShowRefiner** function looks like this:

{{< highlight javascript "linenos=table,noclasses=false" >}}
function ShowRefiner(refinementName, refinementCount, refiners, method, selected) {
  // Create the onClick or onChange event
  var onClickOrChange = "$getClientControl(document.getElementById('"+ctx.RefinementControl.containerId+"'))." + method + "('" + $scriptEncode(Sys.Serialization.JavaScriptSerializer.serialize(refiners)) + "');";

  // Check if there aren't filter tokens in place
  if (!hasAnyFiltertokens) {
    var elm = document.getElementById(hiddenBlockID);
    var option = document.createElement('option');
    var text = document.createTextNode(refinementName);
    option.appendChild(text);
    option.setAttribute('value', onClickOrChange);
    elm.appendChild(option);
  }

  // Check if the refinement contains results && if the current item is selected
  if (refinementCount != null && selected !== true) {
_#-->
     <option value='_#= onClickOrChange=#_'>_#= $htmlEncode(refinementName) =#_</option>
<!--#_
  } else if (refinementCount != null && selected === true) {
_#-->
     <option value='_#= onClickOrChange=#_' selected='selected'>_#= $htmlEncode(refinementName) =#_</option>
<!--#_
  } else {
_#-->
    <div><a href='javascript:{}' onclick='_#= onClickOrChange=#_'>_#= $htmlEncode(refinementName) =#_</a></div>
<!--#_
  }
}
{{< / highlight >}}

The function call in the selected loop needs to be updated to set the value to true, and the two other calls (unselected loop, and removal link) need to be set to false.

{{< caption-legacy "uploads/2013/11/110113_0928_Part4Create10.png" "Selected Refiner" >}}

This was the last step for this post.

## Download

Download the complete search refiner control here: [Custom Search Refiner Control Part 4](https://github.com/estruyf/blog/tree/master/Refiners/part4).

## Part 5

In the next part of this series I'll explain the methods that can be used for refining your results. Currently we have used a few of them, but I didn't explain how they work and what they do. These things will be tackled in the part 5.

## Changes

### 03/02/2014

Andy pointed out that the onclick event doesn't work on dropdown options in Google Chrome. I have modified the code to now support Google Chrome. For this I changed all the **onclick** attributes to **value** attributes, and set an **onchange** attribute on the select element.

## Blog posts in this series:

*   [Part 1: Create your first search refiner control template](https://www.eliostruyf.com/part-1-create-first-search-refiner-control-template/ "Part 1: Create Your First Search Refiner Control Template")
*   [Part 2: Adding Refinement Actions to the Custom Search Refiner Control](https://www.eliostruyf.com/part-2-adding-refinement-actions-to-the-custom-search-refiner-control/ "Part 2: Adding Refinement Actions to the Custom Search Refiner Control")
*   [Part 3: Working with File Types in the Search Refiner Control Template](https://www.eliostruyf.com/part-3-working-with-file-types-in-the-search-refiner-control-template/ "Part 3: Working with File Types in the Search Refiner Control Template")
*   Part 4: Create a dropdown refiner control
*   [Part 5: The Search Refiner Control Methods Explained](https://www.eliostruyf.com/part-5-search-refiner-control-methods-explained/ "Part 5: The Search Refiner Control Methods Explained")
*   [Part 6: Create a Multi-Value Search Refiner Control](https://www.eliostruyf.com/part-6-create-multi-value-search-refiner-control/ "Part 6: Create a Multi-Value Search Refiner Control")
*   [Part 7: Working with Ranges in the Search Refiner Control](https://www.eliostruyf.com/part-7-working-ranges-search-refiner-control/ "Part 7: Working with Ranges in the Search Refiner Control")