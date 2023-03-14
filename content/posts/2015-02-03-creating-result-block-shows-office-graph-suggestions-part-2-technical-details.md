---
title: Creating a result block that shows Office Graph suggestions – Part 2 technical details
author: Elio Struyf
type: post
date: 2015-02-03T11:20:15+00:00
slug: /creating-result-block-shows-office-graph-suggestions-part-2-technical-details/
dsq_thread_id:
  - 3840658001
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

In the previous blog post I showed you how to create a result block with Office Graph suggestions. This was all done by three display templates. In this blog post I will describe in more detail what each of these templates does, and how I achieved it.

> **Note**: here is a link to the previous post: [Creating a result block that shows Office Graph suggestions - Part 1](https://www.eliostruyf.com/creating-result-block-shows-office-graph-suggestions-part-1/).

In this solution the three display templates that were created for this solution will get explained in more detail below.

*   OfficeGraph_Results.html
*   Item_OfficeGraph_Result.html
*   Item_OfficeGraph_HoverPanel.html

> **Note**: the display templates can be downloaded from GitHub - [Office Graph Result Block Templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Office%20Graph%20Result%20Block%20Templates "Office Graph Result Block Templates").

The end result of these display templates looks like this:

{{< caption-legacy "uploads/2015/01/office-delve-result-block2.jpg" "Office Graph result block" >}}

## OfficeGraph_Results.html - main template

This is the most important template because in this template the call to Office Graph will be done to retrieve results. But there is more, the template also renders the amount of items you configured in the result block, it refines the results when a specific refinement is in place, and visualizes the search results on the page.

I will explain each aspect of this template in the next sections.

### Total items to show in the result block

When configuring a result block, you can choose the amount of items you want to show in the result block. Once you do a query, the result block will only be provided with the amount of items that you specified.

In this scenario it works a bit different because the search results are retrieved by the REST call. That is also the reason why I specified to do a "*" star query for the result block. You need to make sure that at least one result item gets returned. Once a result item for the result block is retrieved, the OfficeGraph_Results.js display template will get loaded.

Now because we are calling a REST service, you need to be sure to limit the amount of results returned from your REST call.

Luckily you have a property that you can check to see the maximum items the result block may have. This can be retrieved from the CurrentGroup property:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
ctx.CurrentGroup.RowCount
{{< / highlight >}}

This property value will be appended to the REST query URL to set the **RowLimit** property.

### Only call the REST service once

Something else you need to take into account is the number of times you are going to call the REST service. You only want to make a call the first time the display template gets loaded and not for each result that is retrieved in the result block.

> **Note**: the control template will execute the item template for each result. So when three results are retrieved, the template will get executed three times in a row.

To solve this problem, I added a processCount variable. This processCount variable will be incremented each time the template gets executed. Only the first time when the first result gets rendered, the REST call will be done. The other times it will not do anything. This is done by the following code:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Get number of items to show in the Result Block
resultCount = currentCtx.CurrentGroup.RowCount;

// Get results from Office Graph
if (processCount === 1) {
  // Get the current keyword
  keywords = currentCtx.DataProvider.get_currentQueryState().k;

  // Do the REST call to Office Graph
  AddPostRenderCallback(currentCtx, function() {
    get();
  });
} else {
  // Reset the process count when the last item is loaded
  processCount = processCount === resultCount ? 0 : processCount;
}
{{< / highlight >}}


### Refine the Office Graph results

Once you retrieved the result in your search center, it can be that you want to do some refining. To support this, the Office Graph query will need to take the refinement into account. This can be done with the following code:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Check if the results are refined
if (!$isNull(currentCtx.DataProvider.get_currentQueryState().r)) {
  var refiners = currentCtx.DataProvider.get_currentQueryState().r;
  // Check if multiple refiners are in place
  if (refiners.length === 1) {
    refinement = String.format("&refinementfilters='{0}'", refiners.toString());
  } else {
    refinement = String.format("&refinementfilters='and({0})'", refiners.toString());
  }
} else {
  refinement = "";
}
{{< / highlight >}}

The code first checks if there is already some refining done on your results. If this is the case, the refiner's length will be checked. This check is required to allow multiple refinement on the result block (example: refine on file type and author). When there are multiple refiners in use, an **and** property should get added in order to make it work.

### Retrieving the Office Graph results

There is nothing special about retrieving the Office Graph results. Retrieving the results is done via an Ajax call to the search REST API.
{{< highlight default "linenos=table,noclasses=false" >}}
var restUrl = String.format("{0}/_api/search/query?QueryText='({1}) AND (FileExtension:doc OR FileExtension:docx OR FileExtension:ppt OR FileExtension:pptx OR FileExtension:xls OR FileExtension:xlsx OR FileExtension:pdf)'&Properties='TitleBasedSummaries:true,GraphQuery:and(actor(me\\,action\\:1021)\\,actor(me\\,or(action\\:1021\\,action\\:1036\\,action\\:1037\\,action\\:1039))),GraphRankingModel:action\\:1021\\,weight\\:1\\,edgeFunc\\:weight\\,mergeFunc\\:max'&SelectProperties='Author,AuthorOwsUser,DocId,EditorOwsUser,FileExtension,FileType,HitHighlightedProperties,HitHighlightedSummary,LastModifiedTime,LikeCountLifetime,ListID,ListItemID,OriginalPath,Path,Rank,SPWebUrl,SiteTitle,Title,ViewCountLifetime,siteID,uniqueID,webID,SecondaryFileExtension'&hithighlightedproperties='Title,Path'&RankingModelId='0c77ded8-c3ef-466d-929d-905670ea1d72'&RowLimit={2}&StartRow=0&BypassResultTypes=true{3}&ClientType='OfficeGraphTemplate'", _spPageContextInfo.webAbsoluteUrl, keywords, resultCount, refinement);
{{< / highlight >}}

Once the results are retrieved it gets interesting. If you ever did a REST call to the search API, you will know that the JSON object you retrieve is not the same as that of the default search query. You do not have a ctx.ListData object or such. All the results can be found in data.PrimaryQueryResult.RelevantResults.Table.Rows. So what I did is I create a CurrentItem object for each result that is retrieved. Doing it this way, I can make use of the default display template rendering and functions.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Create current item object
var currentItem = {};
currentItem = setFields(currentItem, result.Cells);

// Create CurrentItem object
var setFields = function (item, cells) {
  var i = cells.length;
  while (i--) {
    var cell = cells[i];
    item[cell.Key] = cell.Value;
  }
  return item;
};
{{< / highlight >}}


### Rendering the result HTML output

Now the fun part, rendering the Office Graph results onto your page. First I created a variable with my HTML mark-up and replaced the placeholders with the values I retrieved from search. This is one way of how that it can be approached, but as we are working in a search center, we can also use display templates to do the rendering.

To be able to use a display template to render the HTLM mark-up for your results from within the template, you first need to load the display template JavaScript file. You can do this from within the display template with this code:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Load the display template for the Office Graph results
var templateUrl = "~sitecollection/_catalogs/masterpage/OfficeGraph/Item_OfficeGraph_Result.js";
RegisterSod('Item_OfficeGraph_Result.js', Srch.U.replaceUrlTokens(templateUrl));

EnsureScriptFunc("Item_OfficeGraph_Result.js", null, function() {
  templateFunc = Srch.U.getRenderTemplateByName(templateUrl, null);
});
{{< / highlight >}}

The code registers and loads the template. Once the template is loaded, the display template function gets retrieved (Srch.U.getRenderTemplateByName). The approach is similar to how the default display templates get loaded. The function needs to be retrieved like this because the function names get automatically generated by SharePoint and contains a GUID in the name. Example: DisplayTemplate_82488fbf09274510b5e6618debdf3b80.

> **Important**: the reference to the template needs to be updated to the location in your master page gallery.

Once the display template function is retrieved, you can make use of it to render the HTML mark-up like this:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Set the current item to the context
currentCtx["CurrentItem"] = currentItem;
// Call the display template function to render the current item
resultsMarkup.unshift(CoreRender(templateFunc, currentCtx));
{{< / highlight >}}

When all the HTML for the results are retrieved it gets added on the page.

## Item_OfficeGraph_Result.html - Item display template

This is the display template to render the Office Graph results. There is nothing special to this display template. It retrieves the values from the current item to process and places it in the HTML mark-up.

> **Important**: this templates makes use of a hover panel display template, be aware that the reference to the hover panel template needs to be changed to the location in your masterpage gallery.

## Item_OfficeGraph_HoverPanel.html - Item hover panel display template

This template will be used to render the hover panel for the Office Graph results. Special thanks to [Mikael Svenson](https://twitter.com/mikaelsvenson) for the [Delve content search web part display templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/mAdcOW%20Search%20Center%20Templates/mAdcOWGraph). This hover panel template is based on one of his templates.

## Download

The templates can be downloaded on the following location: [Office Graph Result Block Templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Office%20Graph%20Result%20Block%20Templates "Office Graph Result Block Templates").