---
title: 'Part 5: The Search Refiner Control Methods Explained'
author: Elio Struyf
type: post
date: 2013-11-06T17:05:38+00:00
slug: /part-5-search-refiner-control-methods-explained/
dsq_thread_id:
  - 3836446593
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

In previous posts I showed you how you to build your own Search Control Refiners. This post will focus on the JavaScript methods that can be used for refinement. There are a couple of them, but when do you need to use which refiner method? I'll split this post up in sections to describe the actions that can be achieved.

## JSON URL

In SharePoint 2013 you can accomplish almost everything with just some REST calls. This isn't that different when working with search. The search web parts make use of a JSON formatted string in the URL to do the search and refinements. This can easily be checked by going to a search center perform a search and do some refinement. You'll end up with a URL like this:

`http://your-site/Search/Pages/Results.aspx#Default={"k":"custom refiner","r":[{"n":"FileType","t":["equals(\"docx\")","equals(\"doc\")","equals(\"docm\")","equals(\"dot\")","equals(\"nws\")","equals(\"dotx\")"],"o":"or","k":false,"m":null},{"n":"DisplayAuthor","t":["\"ǂǂ456c696f20537472757966\""],"o":"and","k":false,"m":null}]}`

I did the following actions:

1.  Did a search on **custom refiner**;
2.  Refined the results on **word** and **myself**;

That gave me that URL.

### JSON Break Down

*   k: keyword;
*   <div>r: refinement filter;</div>
    *   n: refiner name;
    *   t: refiner tokens;
    *   o: operator (and, or);
    *   k: use KQL (Boolean);
    *   m: this is the token to display value map. It's used when a custom refinement value (textbox) is used. This stores the value that you inserted, to visualize it in the refiner. Example: "m":{"equals(\"Item Value Text Box\")":"Item Value Text Box"}

{{< caption-new "/uploads/2013/11/110613_1705_Part5TheSea1.png" "Mapping Value" >}}

> **Note**: you can find more information on the fields: [QueryState members](http://msdn.microsoft.com/en-US/library/office/microsoft.office.server.search.webcontrols.querystate_members.aspx).

### Refinement Tokens

Most of the time, you'll see refinement tokens in the URL like this: **ǂǂ456c696f20537472757966**. This is the refinement value converted to HEX. If you are going to decode this from HEX to ASCII, you'll get **Elio Struyf**. You can also use the refinement values themselves. As you can see in the URL above, the **FileType** refiner uses the refinement values, instead of the tokens.

## Adding Refinement Filters

When you want to add refinement to the results, you have a couple of options:

*   **addRefinementFilter**: expects the filter name and filter token / value;
*   **addRefinementFilters**: this method expects a refiner object;
*   **addRefinementFiltersWithOp**: this is the method to use to add refinement with operators ('or', 'and').
*   **addRefinementFiltersJSON**: requires a JSON formatted input ({"Brand":["\\"\u01C2\u01C2426c61636b\\""]});
*   **addRefinementFiltersJSONWithOr:** (used for adding a multi-value filter - this is used for defining all the content classes for tasks, or defining the Word file extensions);
*   **updateRefiners**: although the name specifies something else, it can also be used to add refinement. This method requires a refinement object;
*   **updateRefinersJSON**: the same as the previous, but expects a JSON string.

These methods can be used on the refinement control. To test them, you can open up your browser developer tools (F12) and retrieve the refiner control like this:

```JavaScript
// Get the refiner control - the ID needs to be retrieved from your control
var refiner = $getClientControl(document.getElementById("ID of the search refiner"))
```

I'll show you how to use these refiner methods with a simple example.

### addRefinementFilter

```JavaScript
refiner.addRefinementFilter('FileType', 'html')
{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}`

### addRefinementFilters

With a single value:

```JavaScript
var refinerValue = {'FileType':['html']}
refiner.addRefinementFilters(refinerValue)
{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}`

With a multi-value:

```JavaScript
var refinerValue = {'FileType':['html','txt']}
refiner.addRefinementFilters(refinerValue)
{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"and","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"and","k":false,"m":null}]}`

### addRefinementFiltersWithOp

```JavaScript
var refinerValue = {'FileType':['html','txt']}
refiner.addRefinementFiltersWithOp(refinerValue, 'or')
{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"or","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"or","k":false,"m":null}]}`

```JavaScript
refiner.addRefinementFiltersWithOp(refinerValue, 'and')
{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"and","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"and","k":false,"m":null}]}`

### addRefinementFiltersJSON

With a multi-value:

```JavaScript
refiner.addRefinementFiltersJSON('{"FileType":["html"]}')
{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"and","k":false,"m":null}]}`

### addRefinementFiltersJSONWithOr

With a multi-value:

```JavaScript
refiner.addRefinementFiltersJSONWithOr('{"FileType":["html","txt"]}')
{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"or","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html","txt"],"o":"or","k":false,"m":null}]}`

### updateRefiners

```JavaScript
var refinerValue = {'FileType':['html']};
refiner.updateRefiners(refinerValue);
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}`

### updateRefinersJSON

```JavaScript
refiner.updateRefinersJSON('{"FileType":["html"]}')
{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":["html"],"o":"and","k":false,"m":null}]}`

## Update Refinement Filters

When you want to update your refiner with another value, you can make use of the following methods:

*   **updateRefiners**: requires a refiner object;
*   **updateRefinersJSON**: the same as the previous, but expects a JSON string.

### updateRefiners

```JavaScript
var refinerValue = {'FileType':['txt']}
refiner.updateRefiners(refinerValue)
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":[" txt"],"o":"and","k":false,"m":null}]}`

### updateRefinersJSON

```JavaScript
refiner.updateRefinersJSON('{"FileType":["txt"]}')
```

URL outcome: `{"k":"test","r":[{"n":"FileType","t":[" txt"],"o":"and","k":false,"m":null}]}`

## Remove Refinement Filters

The next methods that will be explained, are the ones that need to be used for removing the refinement. Removal of the refinement is a bit different than adding or updating refiners. When you want to remove a refinement, it can be that you want to remove a specific refinement and not the whole refinement. Let me clear that out with an example.

When you are refining the results on file type, it can be that you want to refine on two authors. If you want to remove author two from the refinement, you don't want to remove the whole refinement and refine again on the first author. You probably want just to remove that second author.

For this type of refinement removal, you have the **remove** methods:

*   **removeRefinementFilter**: requires the refiner name and token to remove;**
**
*   **removeRefinementFilters**: requires a refiner object;**
**
*   **removeRefinementFiltersJSON**: requires a JSON formatted refinement input.**
**
_Note: the remove methods need to have the exact refinement that is in place, otherwise it won't do anything.
_

When you want to remove the whole refinement (first and second author), it is easier to use the **update** methods:

*   **updateRefiners
**
*   **updateRefinersJSON
**

### removeRefinementFilter

```JavaScript
refiner.removeRefinementFilter('FileType', 'html')
```

### removeRefinementFiltersJSON


```JavaScript
refiner.removeRefinementFiltersJSON('{"FileType":["html"]}')
```


### removeRefinementFilters

Single value:

```JavaScript
var refinerValue = {'FileType':['txt']}
refiner.removeRefinementFilters(refinerValue)
```

Multi-value:

```JavaScript
var refinerValue = {'FileType':['html','txt']}
refiner.removeRefinementFilters(refinerValue)
```


### updateRefiners


```JavaScript
var refinerValue = {'FileType':null}
refiner.updateRefiners(refinerValue)
```


### updateRefinersJSON


```JavaScript
refiner.updateRefinersJSON('{"FileType":null}')
```


## Part 6

In part 6 I'll show you how to create a multi-value refiner.

## Blog posts in this series:

*   [Part 1: Create your first search refiner control template](https://www.eliostruyf.com/part-1-create-first-search-refiner-control-template/ "Part 1: Create Your First Search Refiner Control Template")
*   [Part 2: Adding Refinement Actions to the Custom Search Refiner Control](https://www.eliostruyf.com/part-2-adding-refinement-actions-to-the-custom-search-refiner-control/ "Part 2: Adding Refinement Actions to the Custom Search Refiner Control")
*   [Part 3: Working with File Types in the Search Refiner Control Template](https://www.eliostruyf.com/part-3-working-with-file-types-in-the-search-refiner-control-template/ "Part 3: Working with File Types in the Search Refiner Control Template")
*   [Part 4: Create a dropdown refiner control](https://www.eliostruyf.com/part-4-create-dropdown-search-refiner-control/ "Part 4: Create a Dropdown Search Refiner Control")
*   Part 5: The Search Refiner Control Methods Explained
*   [Part 6: Create a Multi-Value Search Refiner Control](https://www.eliostruyf.com/part-6-create-multi-value-search-refiner-control/ "Part 6: Create a Multi-Value Search Refiner Control")
*   [Part 7: Working with Ranges in the Search Refiner Control](https://www.eliostruyf.com/part-7-working-ranges-search-refiner-control/ "Part 7: Working with Ranges in the Search Refiner Control")