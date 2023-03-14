---
title: Merge search results from multiple search web parts together
author: Elio Struyf
type: post
date: 2015-08-17T15:51:18+00:00
slug: /merge-search-results-from-multiple-search-web-parts-together/
dsq_thread_id:
  - 4041071646
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

Over the past months I received the same question a couple of times from customers and blog readers if there way to specify the number of search results per category / division / department. Their requirement was to display for example three global news articles and two news articles from the division the user belongs.

The standard search web parts only let you define the number of search results you want to display and the number of results per group.

{{< caption-legacy "uploads/2015/08/081715_1551_Mergesearch1.png" "Number of items to show" >}}

When you configure your results to group in the query builder (underneath the refiners tab). You will also have the option to specify the number of results to show per group. This grouping functionality is powerful, but it has the limitation that the amount is specified per group. You are not able to specify it per group value.

{{< caption-legacy "uploads/2015/08/081715_1551_Mergesearch2.png" "Group search results" >}}

So if you want to be able to specify the number of results per query / category / division, I always gave the advice to develop it via JS in combination with calling the REST APIs. Right now I can tell you that it can also be achieved via the use of multiple search web parts and display templates. The result of these templates look like this:

{{< caption-legacy "uploads/2015/08/081715_1551_Mergesearch3.png" "Merged search results" >}}

## Combining search result display templates

The way to achieve it is by using multiple search web parts on a page and a custom display template. In each of the search web parts you define the query and the number of results you want to display. In the display template you have to create a function that will hold the HTML from all the rendered items. Once the HTML for all the individual items is retrieved, it can be visualized on the page.

> **Note**: If you read my blog post about how you could group search results via a display template, you will see some similarities in this approach ([grouping results article](https://www.eliostruyf.com/grouping-search-results-with-display-templates-for-the-cswp/)).

The display template has to wait until all the search web parts are finished rendering their items. So you have to write some code in order to let your display template know it has finished rendering. Luckily [Mikael Svenson](https://twitter.com/mikaelsvenson) already blogged this back in April: [how to run code after all CSWPs are finished](http://techmikael.blogspot.be/2015/04/how-to-run-code-after-all-cswps-have.html).

In his article he added a code snippet that needs to be added to each control templates that will be used on the page to know when all the content search web parts are finished rendering. This code snippet with a small adjustment will be used in our control template. The adjustment that has been added to the snippet is a check to know if the search web part uses the same control template. This check is required because you only have to way until the web parts that are using the control template to merge the search results are finished. The updated code looks like this:

{{< highlight javascript "linenos=table,noclasses=false" >}}
AddPostRenderCallback(ctx, function(){
  // Loop over all queries on the page
  var allRendered = true;
  for (group in Srch.ScriptApplicationManager.get_current().queryGroups) {
    var displays = Srch.ScriptApplicationManager.get_current().queryGroups[group].displays;
    if (displays.length > 0 && 
      !displays[0].get_renderedResult() && 
      displays[0].get_visible() && 
      displays[0].get_renderTemplateId() === ctx.ClientControl.get_renderTemplateId()) {
      // Check if results are rendered
      allRendered = false;
    }
  }
  // Check if the work is finished
  if (allRendered) {
    renderItems();
  } else {
    // Still have to wait to render the items
  }
});
{{< / highlight >}}

The code for the function which holds the HTML markup is very simple:

{{< highlight javascript "linenos=table,noclasses=false" >}}
push = function (sortField, content) {
  items.push([sortField, content]);
}
{{< / highlight >}}

From within the item display template you push the HTML markup from each item to the custom function defined in the control template. This push can be called from within the item template.

> **Note**: If you want to know more on how you can register your functions and to get syntax highlighting in your display templates, you can read the following article: [how to get JavaScript intellisense and syntax highlighting in HTML display templates](https://www.eliostruyf.com/get-javascript-intellisense-syntax-highlighting-html-display-templates/).

In the item template you can call the function as follows:

{{< highlight javascript "linenos=table,noclasses=false" >}}
search.combine.push(sortField, output);
{{< / highlight >}}

Once the search web parts are finished rendering, the **renderItems** function gets executed. This function retrieves the DIV element from the first search web part and appends the HTML from the items to it.

{{< highlight javascript "linenos=table,noclasses=false" >}}
// Render the items on the page
renderItems = function () {
  // Order the items based on the sortfield
  items.sort(firstColumnOrderDes);
  // Show items
  var elm = document.getElementById(containerId);
  if (!$isNull(elm)) {
    // Only show the values from the second column
    elm.innerHTML = items.map(function(val, index){return val[1]}).join('');
    elm.style.display = "block";
  }
};
{{< / highlight >}}


## Configuration

First of all, there is one catch with this approach, the search result sorting is done per web part. That means that the results of each query get appended at the end of the array in the control template. If you sorted on the created date if may be that the newest item is not the first item that will be displayed.

To support sorting in the display template, I added an extra **SortField** managed property mapping to the item display template. The value from this field will be used in the array to sort the merged results (in the control template you can already find two sorting functions: **firstColumnOrderDes** and **firstColumnOrderAsc**). If you want to switch the sorting order, you can change the function call on line 65 from the control template.

If you want to make use of these templates or approach, have to follow the next steps in order to be able to merge search results:

1.  Add your search web parts to the page (one per result group / query);
2.  Select the **control combine** and **item combine** template in each of the web parts;
3.  In each web part go to the property mappings section and select to change the mappings of the managed properties;
4.  In the **SortField** define the field on which you want to do your sorting.

{{< caption-legacy "uploads/2015/08/081715_1551_Mergesearch4.png" "Managed property mappings" >}}

Once these things are configured, you would have the following result:

{{< caption-legacy "uploads/2015/08/081715_1551_Mergesearch5.png" "Merged search results" >}}

The final result of these templates is not very "sexy", they are only created to show you how this can be achieved.

In this example I used two web parts. When you open the page in edit mode, you will see that all the results are redirected to the first content search web part.

{{< caption-legacy "uploads/2015/08/081715_1551_Mergesearch6.png" "Merged search results / web parts in edit mode" >}}

## Download these display templates

You can find the display templates at the SPCSR GitHub repository: [merge search result templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Merge%20Search%20Result%20Templates).