---
title: Getting past the CSWP item limit of 50 results
author: Elio Struyf
type: post
date: 2015-09-23T07:50:23+00:00
slug: /getting-past-the-cswp-item-limit-of-50-results/
dsq_thread_id:
  - 4156910853
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

The search result web part and content by search web part share the same item result limit of a maximum of 50 items that can be shown. If you want to show more items, the only option you have out-of-the-box is using a control template that allows paging (like List with paging for the CSWP). Another approach could be to add a **Load more** link that gets the next set of results.

> **Note**: I wrote an article back in August 2013 how you could add a load more link to your control template: [Create a Load More Results Link / Button for the Content Search Web Part (Display Template)](https://www.eliostruyf.com/create-a-load-more-results-link-button-for-the-content-search-web-part/).

Depending on what you want to achieve, paging or showing a load more button would not be sufficient. In my case I had to retrieve all the results in order to build a search based navigation control. Using the list with paging control was not an option, because the results needed to be displayed underneath its parent. Other situations may also require to retrieve the whole (or part) search result set in order to correctly display the results.

The solution for this is achieved by using a custom control display template and works on SharePoint on-premises and SharePoint Online.

## Getting past the limit

To get past this item limit, I wrote some code in the control display template that checks if there are more results to load, and if that statement is true, it gets the next batch of results. The control template retrieves batches of results (maximum of 50) and stores the result rendering in an array that gets visualized once all the results are retrieved.

### Retrieving the next batch of results

The first batch of results gets retrieved when the web part / page gets loaded. To retrieve the next batch(es) of results, you have to implement some checks to see if there are more results to load. This can be achieved by adding an **AddPostRenderCallback** block with the following code in the control template:

```javascript
AddPostRenderCallback(ctx, function() {
    // Get the DataProvider
    var dp = ctx.DataProvider;
    // Retrieve the number of items to show property (max. 50)
    var totalPerPage = dp.get_resultsPerPage();
    // Retrieve all properties
    var properties = dp.get_properties();
    // Check if the total results number is greater than the number of results that can be displayed max. of 50
    // check if the number of results that were retrieved is equal to the number to show
    // Check if the max. item limit (maxItems) is reached
    if (dp.get_totalRows() > totalPerPage && dp.get_rowCount() === totalPerPage && items.length < maxItems) {
        // Set the StartRow (skip results) property to skip the first batch
        properties["StartRow"] = $isNull(properties["StartRow"]) ? totalPerPage : properties["StartRow"] + totalPerPage;
        // Do the new query
        dp.issueQuery();
    } else {
        // Render the results if all are retrieved
        render();
        // Once all the items are rendered, we need to reset the array and delete the StartRow property
        items = [];
        delete properties.StartRow;
    }
});
```

As you can see in the code above, the **totalRows** (total results for the query) and **rowCount** (total retrieved results: max. 50) properties from the **DataProvider** object are used for the checks. There is a third check in place that is used to see if the total number of items in the array do not exceed the **maxItems** number.

> **Important**: This **maxItems** variable is added to the template to gain more control over the maximum number of items that may be retrieved. You can also remove this check, but know that this can have implications to your result load and page performance (+1000 for example). So use this property wisely and do not set it to high.

If each check is passed, a new search query gets issued with the **StartRow** property. The **StartRow** property can be used to specify which items it needs to skip from the first batch and from which index it needs to retrieve the next batch of results.

For each new batch of results, the **StartRow** property has to be incremented with the number of items that the web part should retrieve. In this template I make use of the number of items to show property which can be defined in the web part.

{{< caption-new "/uploads/2015/09/092215_1818_Gettingpast1.png" "Search batches" >}}

### Storing the item rendering in your array

As mentioned, all the rendered items are stored in an array. To add these items to the array, you can "hijack" the **ListRenderRenderWrapper** function. This ListRenderRenderWrapper function adds by default an opening and closing list element to the array. The advantage to use this function is that it gets called for each item that has been rendered. This makes it the perfect function to use to push the rendered item to your array. The code looks like this:

```javascript
var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl) {
    // Add each search result item to the array
    search.retrieval.add(itemRenderResult);
    return '';
}
```

> **Note**: add_item is a function in which the rendered item gets pushed to the array.

### Render the items on the page

Rendering the items on the page is very simple. In the first code snippet you can see a **render** function that gets called once there are no more items which need to be retrieved. In this render function the main DIV element gets retrieved and the rendered items get appended:

```javascript
render = function () {
    var elm = document.getElementById(elmId);
    if (!$isNull(elm)) {
        // Check if the maximum item limit is exceeded 
        if (items.length > maxItems) {
            console.log(items.length);
            items = items.slice(0, maxItems);
        }
        elm.innerHTML = items.join('');
    }
}

```

> **Note**: an extra check is in place to not show more than the maximum item number that is specified in the control template.

Because it can take a couple of seconds to retrieve all results (depending on the amount and number of batches it needs to retrieve), I added a loaded text that will be replaced by the search result items.

{{< caption-new "/uploads/2015/09/092215_1818_Gettingpast2.png" "Loading text" >}}

## Examples

Here are a couple of examples that show the number of items that are rendered, and how number of extra calls that were required to retrieve all the results:

> **Note**: this is removed from the final control template.

{{< caption-new "/uploads/2015/09/092215_1818_Gettingpast3.png" "Retrieving 10 results" >}}

{{< caption-new "/uploads/2015/09/092215_1818_Gettingpast4.png" "Retrieving 175 results" >}}

{{< caption-new "/uploads/2015/09/092215_1818_Gettingpast5.png" "Retrieving 600 results" >}}

## Download the control template

The control template from this article can be downloaded from the SPCSR GitHub repository at: [Getting past the item limit control template (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Getting%20past%20the%20item%20limit%20control%20template%20(CSWP)).

> **Note**: In this article I only described how you could do this for a CSWP display template, but this approach can also be used for a search result web part display template.

### How to use this template?

*   Download the template and add it to the master page gallery of your site (folder location does not matter);
*   Publish the template;
*   In the content by search web part, define the query you want to perform;
*   Set the **Control** property to the **All results** template;
*   Set the **number of items to show** to **50** (if you define a lower value, more calls need to be performed in order to retrieve all results);
*   Store these setting by clicking on the **OK** button.