---
title: 'Part 1: Create Your First Search Refiner Control Template'
author: Elio Struyf
type: post
date: 2013-10-21T11:45:24+00:00
slug: /part-1-create-first-search-refiner-control-template/
dsq_thread_id:
  - 3836446301
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

In the first part of this blog post series about custom search refiner controls, I'll describe what is minimal needed to create a clean refiner control display template. This template can later be used as a starter's template for the creation of other refinement controls.

## Create a New Search Refiner Control Template

The first thing you'll need to do, is creating a new HTML file in the Master Page Gallery. The default refiner controls templates are located in: Master Page Gallery / Display Templates / Filters (`http://your-site/_catalogs/masterpage/Display Templates/Filters`), but it doesn't matter where you put you template file in the master page gallery (only the file properties need to be in place). I place my display templates in a separated project folder in the master page gallery. This way it's easier to find them and they stay grouped together.

The content to start with looks like this:

```html
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"> 
<head>
<title>Custom Refinement</title>

<!--[if gte mso 9]><xml>
<mso:CustomDocumentProperties>
<mso:CompatibleManagedProperties msdt:dt="string"></mso:CompatibleManagedProperties>
<mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
<mso:CompatibleSearchDataTypes msdt:dt="string"></mso:CompatibleSearchDataTypes>
<mso:MasterPageDescription msdt:dt="string"></mso:MasterPageDescription>
<mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106604</mso:ContentTypeId>
<mso:TargetControlType msdt:dt="string">;#Refinement;#</mso:TargetControlType>
<mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
</mso:CustomDocumentProperties></xml><![endif]-->
</head>
<body>
    <div id="CustomRefinement">

    </div>
</body>
</html>
```

Once you save this template the JavaScript file gets created and the template will be visible in refinement configuration panel.

For this post I set my refinement panel to use my custom template with the **Brand** result type, but you can use the result type you like.

{{< caption-new "/uploads/2013/10/102013_1616_Part1Create1.png" "Refiner Settings" >}}

## Important Display Template Property

There is an important property in the search refinement control template that can be used to specify for which types of search data your refinement control is to be used. This is the **CompatibleSearchDataTypes** property. By leaving the property empty it can be used for whatever data type.

The values that can be applied are the following:

*   Text
*   Integer
*   Decimal
*   DateTime
*   YesNo

The values need the following prefix and suffix: ";#". Examples:

```html
<mso:CompatibleSearchDataTypes msdt:dt="string">;#Text;#</mso:CompatibleSearchDataTypes>
<mso:CompatibleSearchDataTypes msdt:dt="string">;#Text;#Integer;#Decimal;#DateTime;#YesNo;#</mso:CompatibleSearchDataTypes>
```


### Show the Refiner Title

At the moment, the custom refiner control template won't show anything. This is because the HTML template doesn't has any output to visualize. In the next steps I'll explain how to add the collapsible title and the refiner values.

To show the refiner title, you need to add some JavaScript and HTML mark-up to the template. The mark-up that you need to add looks like this:

```html
<!--#_
  // Needed objects
  var listData = ctx.ListData;
  var hasControl = true;

  // Check if the current Refinement Control can be exists
  if ($isNull(ctx.RefinementControl) '' $isNull(ctx.ClientControl)) hasControl = false;

  if (hasControl) {
    if(!$isNull(listData) && !$isEmptyArray(listData)) {
      // Show the refinement title
      var isExpanded = Srch.Refinement.getExpanded(ctx.RefinementControl.propertyName);
      var iconClass = (isExpanded == "true"? "ms-ref-uparrow" : "ms-ref-downarrow");
      var refinerCatTitle = Srch.Refinement.getRefinementTitle(ctx.RefinementControl);
      // Display style > needed to hide the refinement list when collapsed
      var displayStyle = (isExpanded == "true"? "" : "none");
_#-->
      <div id='Container'>
        _#= Srch.U.collapsibleRefinerTitle(ctx.RefinementControl.propertyName, ctx.ClientControl.get_id(), refinerCatTitle, iconClass) =#_
      </div>
<!--#_
    }
  }
_#-->
```

The mark-up can be added inside the **DropdownRefinement** block. The mark-up contains some objects like **ctx.ListData** which contains all the refiners for the current results.

The **Srch.U.collapsibleRefinerTitle** function is used to display the collapsible refiner title.

{{< caption-new "/uploads/2013/10/102013_1616_Part1Create2.png" "Refiner Title" >}}

If you don't want to have this, you can remove the function call and display the refinement name instead: **refinerCatTitle**.

## Show the Refiners Values

The next step is to show the refiner values of the current search results. The approach that is used in the default SharePoint template is to work with two HTML blocks. One block for the unselected refiners, and one block to be shown with the selected refiners. In this post I'm only going to create the first block with unselected refiner values.

To visualize these refinement items you need to add two arrays (the selected one will be used in the next post), one array for the unselected refiners, and one for the selected refiners.

```javascript
// (un)selected filter arrays
var unselectedFilters = new Array();
var selectedFilters = new Array();
```

The following piece of code is used to fill the arrays with the values it retrieved.

```javascript
// Fill the arrays with refinement values
for (var i = 0; i < listData.length; i++){
  var filter = listData[i];
  if(!$isNull(filter)){
    filter.RefinementTokens = [filter.RefinementToken];
    filter.RefinementTokenWrappedValues = [Srch.RefinementUtil.stringValueToEqualsToken(filter.RefinementValue)];

    if (ctx.ClientControl.hasAllRefinementFilters(filter.RefinerName, filter.RefinementTokens) ''
      ctx.ClientControl.hasAllRefinementFilters(filter.RefinerName, filter.RefinementTokenWrappedValues)) {
      selectedFilters.push(filter);
    } else {
      unselectedFilters.push(filter);
    }
  }
}
```

Currently only the unselected items array will be used. To visualize the refinement items from the unselected array, you can add an unselected section block to the **Container** element. In this unselected block a loop need to be created that enumerates all refinement items. The refinement items will be visualized by calling another function **ShowRefiner**.

```html
<div id='UnselectedSection' class='ms-ref-unselSec' style='display:_#= $htmlEncode(displayStyle) =#_'>
<!--#_
  for (var i = 0; i < unselectedFilters.length; i++) {
    var filter = unselectedFilters[i];
    if(!$isNull(filter)) {
      var refiners = new Object();
      refiners[filter.RefinerName] = filter.RefinementTokens;
      ShowRefiner(filter.RefinementName, filter.RefinementCount);
    }
  }
_#--> 
</div>
```

The **ShowRefiner** function looks like this:

```html
<!--#_
  function ShowRefiner(refinementName, refinementCount) {
    // Check if the refinement contains results
    if (refinementCount != null) {
_#-->
      _#= $htmlEncode(refinementName) =#_
<!--#_
    }
  }
_#-->
```

The end result of this part is just an enumeration of all the refinement values.

{{< caption-new "/uploads/2013/10/refiner2.png" "Refiner values" >}}

## Adding Total Items per Refinement Value

If you want to add the total of items per refiner, you can modify the **ShowRefiner** function by adding the **refinementCount** variable to the output.

```html
<!--#_
  function ShowRefiner(refinementName, refinementCount) {
    // Check if the refinement contains results
    if (refinementCount != null) {
_#-->
      _#= $htmlEncode(refinementName) =#_ (_#= refinementCount =#_)
<!--#_
    }
  }
_#-->
```

{{< caption-new "/uploads/2013/10/refiners.png" "Refiner values with total items per refiner" >}}

## Part 2

The next part we'll add the refinement actions to the each item, so that refining the search results can be tested.

## Download

Here you can download display template: [Custom Refinement Control](https://github.com/estruyf/blog/tree/master/Refiners/part1).

## Blog posts in this series:

*   Part 1: Create your first search refiner control template
*   [Part 2: Adding Refinement Actions to the Custom Search Refiner Control](https://www.eliostruyf.com/part-2-adding-refinement-actions-to-the-custom-search-refiner-control/ "Part 2: Adding Refinement Actions to the Custom Search Refiner Control")
*   [Part 3: Working with File Types in the Search Refiner Control Template](https://www.eliostruyf.com/part-3-working-with-file-types-in-the-search-refiner-control-template/ "Part 3: Working with File Types in the Search Refiner Control Template")
*   [Part 4: Create a dropdown refiner control](https://www.eliostruyf.com/part-4-create-dropdown-search-refiner-control/ "Part 4: Create a Dropdown Search Refiner Control")
*   [Part 5: The Search Refiner Control Methods Explained](https://www.eliostruyf.com/part-5-search-refiner-control-methods-explained/ "Part 5: The Search Refiner Control Methods Explained")
*   [Part 6: Create a Multi-Value Search Refiner Control](https://www.eliostruyf.com/part-6-create-multi-value-search-refiner-control/ "Part 6: Create a Multi-Value Search Refiner Control")
*   [Part 7: Working with Ranges in the Search Refiner Control](https://www.eliostruyf.com/part-7-working-ranges-search-refiner-control/ "Part 7: Working with Ranges in the Search Refiner Control")