---
title: How to add sorting in display templates
author: Elio Struyf
type: post
date: 2014-06-06T09:27:06+00:00
slug: /add-sorting-display-templates/
dsq_thread_id:
  - 3836535598
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

An idea where I'm currently working on involves sorting of the search results in display templates. So I thought it would be interesting to share this information already. You will see that enabling sorting, won't involve a lot of code. You just need to know what you need to do, before you can start sorting the results.

## How to implement it

I created a copy of the **Control_ListWithPaging.html** control template. I chosen this template, because if you are going to sort a set of search results, this will be on the whole set, not only the ones that are displayed. So by using the paging control template, you can step through the pages to see the other results in a sorted order.

> **Important**: sorting could only work if the managed property is sortable. You could check this in your search schema.

First of all, what you need to do if you want to add sorting to your display template, is to register the sorting properties on the data provider which your display template will be using.

For this post I'll use the creation date, which is linked to the **Created** managed property.

```javascript
var availableSorts = ctx.DataProvider.get_availableSorts();
availableSorts.push({"name":"Created-ASC","sorts":[{"p":"Created","d":0}]});
availableSorts.push({"name":"Created-DES","sorts":[{"p":"Created","d":1}]});
ctx.DataProvider.set_availableSorts(availableSorts);
```

In the code above I added two sorting options, ascending sorting and descending sorting for the creation date. As you can see in the push method is a JSON string value which contains two attributes:

*   Name: sort property name > this will be used to trigger the sorting via JavaScript;
*   Sorts: here you define the sorting: p = managed property name, d = direction - 0 = ascending / 1 = descending.

Once you add these sorting options to the array, they need to be registered in the **DataProvider** with the **set_availableSorts** method.

Now that the sorting options are set to the data provider object, it is time to visualize these sorting options. The visualization can be done with the following piece of HTML code:

```html
<a href="#" title="Created ASC" onclick="$getClientControl(this).sortOrRank('Created-ASC');return false;">
  <img alt="Ascending" src="/_layouts/15/images/sortaz.gif">
</a>
<a href="#" title="Created DES" onclick="$getClientControl(this).sortOrRank('Created-DES');return false;">
  <img alt="Descending" src="/_layouts/15/images/sortza.gif">
</a>
```

In this piece of HTML code, you'll find two links that trigger the sorting once they get clicked. This is done in the **onclick** attribute of the anchor element, and it uses the current control which executes the **sortOrRank** method (the **sort** method can also be used). This **sortOrRank** method requires one of the **name** (sort property name) values which you have set in the piece of JavaScript above.

## Result

> **Important**: sorting could only work if you set the query builder to build the query in advanced mode. Once in advanced mode, the sorting tab becomes available. If you'll use the predefined queries, the sorting won't do anything to the set of results.

{{< caption-new "/uploads/2014/06/060514_1439_Howtoaddsor1.png" "Sorting tab in advanced mode" >}}

This is the result if you added this to your control template:

{{< caption-new "/uploads/2014/06/060514_1439_Howtoaddsor2.png" "Default set of results" >}}

### Results in ascending order

{{< caption-new "/uploads/2014/06/060514_1439_Howtoaddsor3.png" "Results in ascending order" >}}

### Results in descending order

{{< caption-new "/uploads/2014/06/060514_1439_Howtoaddsor4.png" "Results in descending order" >}}

## Download

My display templates can be downloaded from the SPCSR GitHub project: [Result Sorting Template (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Result%20Sorting%20Template%20%28CSWP%29 "Result Sorting Template \(CSWP\)").