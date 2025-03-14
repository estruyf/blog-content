---
title: Filtering results on predefined set of values in your display template
author: Elio Struyf
type: post
date: 2015-03-09T13:41:47+00:00
slug: /filtering-results-predefined-set-values-display-template/
dsq_thread_id:
  - 3836535718
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

For one of my clients I investigated the possibility to include result filtering or refinement into a display template for the Content Search Web Part. The reason to include this filtering functionality into a display template is to make it easier to fit into the corporate design. Another reason is to minimum the amount of display templates that get loaded on your page.

The first thoughts that could pop up in your mind would be to approach it by adding a Refinement and Content Search web part on the page. The advantage by making use of the refinement web part is that you do not have to worry about the refinement values because they are automatically retrieved by the web part. The downside is that this web part requires two additional display templates that get loaded on your page, and it also makes the design process a bit more difficult.

## How it works

As I mentioned in the title of this article, the filtering of the search result is done by a predefined set of refinement values. In my display template these values are displayed as a link for each type of content. This allows the user to quickly filter the results for a specific type. Example: showing news category links in order to let the user filter the news based on his preference.

Start by creating a new control display template and add a link to the control display template like this:

```html
<a href="#" onclick="search.refine.click($getClientControl(this), 'Filter value 1');return false;" title="Refine on 'Filter value 1'">Refine on 'Filter value 1'</a> - 
<a href="#" onclick="search.refine.click($getClientControl(this), 'Filter value 2');return false;" title="Refine on 'Filter value 2'">Refine on 'Filter value 2'</a>
```

In the link element an **onclick** attribute is specified with a function call. Once you click on the link, the function executes a refinement query with the filter value that you clicked. In order to make it work, you need to add the following code block inside a script element in your template:

```javascript
Type.registerNamespace('search.refine');

search.refine = function() {
  var managedProperty = 'ManagedPropertyName';
  var operator = 'or';

  var click = function (cc, value) {
    // Create a new querystate
    var queryState = new Srch.QueryState();
    queryState.s = 1;

    // Get the current refinement
    queryState.r = checkRefinement();

    // Add the clicked refinement value
    var refiner = { key: managedProperty, value: value };
    var rc = new Srch.RefinementCategory(refiner.key);
    rc.t = refiner.value;
    if (!Srch.U.e(operator)) {
      rc.o = operator;
    }
    Srch.U.appendArray(queryState.r, rc);

    // Do the refinement
    var queryEventArgs = new Srch.QueryEventArgs(queryState);
    queryEventArgs.userAction = Srch.UserActionType.refine;
    cc.raiseQueryReadyEvent(queryEventArgs);
  },
  checkRefinement = function (cc) {
    var currentRefinement = [];
    if (!Srch.U.n(cc)) {
      var refiners = cc.get_dataProvider().get_currentQueryState().r;
      if (!Srch.U.n(refiners) && refiners.length > 0) {
        for (var i = 0; i < refiners.length; i++) {
          var refVal = refiners[i];
          if (!Srch.U.n(refVal)) {
            Srch.U.appendArray(currentRefinement, refVal);
          }
        }
      }
    }
    return currentRefinement;
  };

  return {
      click: click
  };
}();
```

In the code above you can find two functions: **click** and **checkRefinement**. In the **click** function a new QueryState object is created in which the selected refinement value gets defined. The **checkRefinement** function is required to see if there is already another refinement in place.

At the moment the template output looks like this:

{{< caption-new "/uploads/2015/03/030915_1341_Filteringre1.png" "Display template with filter links"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfElEQVR4nE2Oiw5DIQhD/f+f3RQsT92CJtttTghJKdDoRWPo6NLfgHiuvdb+qQkTiYsnLFmdJR7ubp3AMFgM+NRg8cj/QMMEi6mnR2GRD3c3ZSKYx/qUdnGM29dygk2NB85at6DRaNZttRQLHORQL6x10yqWOFE+FRr3wS9Up+npb7trUQAAAABJRU5ErkJggg==" "456" "354" >}}

When clicking on the **Refine on 'docx'** link you only retrieve **docx** documents.

{{< caption-new "/uploads/2015/03/030915_1341_Filteringre2.png" "Search results filtered on docx file extension"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVR4nE2O2w7DMAhD8/8/26UBzLWtSDdpCPFgONjjOGgtnafMj0A9suqq61fjJCG4WJIG9syq+77eHnMxwWEhGmIpFgRn9SUtNs0wsYBmH1lgt0Vm1TiXEEy0OdYg9BvWiOwEYy7h9m7p5Xq37b/RGA5vGpbY9rBUz8ja0cRg+U8TenrkA+/e6S2LtYBkAAAAAElFTkSuQmCC" "456" "356" >}}

The thing that remains is a link that allows you to remove the current filter that is in place. As like in the first step, you need to add a new link and a function to the template.

```html
<a href="#" style='display:_#= $htmlEncode(displayStyle) =#_' onclick="search.refine.all($getClientControl(this));return false;" title="Refine results">All results</a>
```

The corresponding function:

```javascript
all = function (cc) {
  var queryState = new Srch.QueryState();
  // Clear the refinement object
  queryState.r = [];
  // Do a new query
  var queryEventArgs = new Srch.QueryEventArgs(queryState);
  cc.raiseQueryReadyEvent(queryEventArgs);
}
```

In the **all** function the refinement gets removed by creating a new QueryState in which you do not specify any query parameters or properties. This QueryState triggers the web part to perform the original (query you specified in the query builder) search query.

{{< caption-new "/uploads/2015/03/030915_1341_Filteringre3.png" "All results link"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVR4nCWKSQ7AIAzE+P9naQLZGBIqWsmyfHDjPomUWXsXJqVHiGztzKyqajqYxcUxP9QxbZHc4ZxqbqYBi+0BXzcsEPidTcbgaRb7Tg4NyGcNLOQLCHp0IFnkgqIAAAAASUVORK5CYII=" "394" "152" >}}

## Making the filtering values customizable

The downside of working with predefined values is that the template can only be used for one type of results. So if you want to use this template for a different kind of content, you need to copy the templates and do your changes in the copied version. This is not a preferred way of working.

In one of my previous articles, I explained how you can add configurable settings into your display template: [Adding configurable settings to your display templates](https://www.eliostruyf.com/adding-configurable-settings-display-templates/). You can apply that approach by adding two setting properties into your item display template that allow you to define the managed property name and the corresponding filter values. If you want to use the template for another kind of content, you just need to modify the display template setting properties in the web part.

{{< caption-new "/uploads/2015/03/030915_1341_Filteringre4.png" "Filter settings in the property mappings section"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA7UlEQVR4nG3PzW4DIQwEYN7/9Voppyjdn3Q3wC4GAgaDcVVVyqHtp7mM5jQKEc9YjMczlB0QqYvIGEPGEBHlnNu12fXxMMeyaXucDkBrk3JmZmWNmacZwKf09AAhxBCi994BIKJqrSEWZpb/KKO1tZao/UJEKSUFzqWUufe/MxEpazR4/+ovtdacs4rPiKWwCI/B34ekM3fm1nshUvl2w3XFdU3zlOclTRNtG2vd9r3c7+rx/jbN8+eyHMZG7+E8S869ViLK1ip3vWqAwzkIMebMIn2MNgaJ1BDUebnsH9PTmApQnCPvf1K9z9v2BWt/V3BmBYzFAAAAAElFTkSuQmCC" "266" "317" >}}

You can find the final versions of the item and control template on GitHub: [Result refinement display templates (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Result%20refinement%20display%20templates%20(CSWP) "Result refinement display templates - CSWP").