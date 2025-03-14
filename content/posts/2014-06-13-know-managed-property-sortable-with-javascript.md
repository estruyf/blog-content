---
title: How to know if a managed property is sortable with JavaScript
author: Elio Struyf
type: post
date: 2014-06-13T11:41:01+00:00
slug: /know-managed-property-sortable-with-javascript/
dsq_thread_id:
  - 3836882347
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

In my previous post I talked about how you could add managed property sorting in a display templates. The problem with this is that you need to know that the managed property is sortable. If the managed property isn't sortable, it won't work. Unfortunately if you're going to sort on an unsortable managed property, this will result in a web part with an error:

{{< caption-new "/uploads/2014/06/061314_1140_Howtoknowif1.png" "Error message when used an unsortable managed property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQ0lEQVR4nD3CMQrAIAwAQP//MBFCiGM+0A6trSTYGiGCm8eFdl9WX1fxr00z732fY4QzpSPGB7EAFAAhUiLNWRB/5gXDATY7hl0bWAAAAABJRU5ErkJggg==" "697" "167" >}}

When looking this up in the ULS logs, you'll find the following explanation: **Attribute vector 'ModifiedOWSDATE' not available for sorting**. So it tells you that the property on which you wanted to do the sorting, isn't a sortable manage property. It would be much cleaner if you retrieved an unsorted result set in my opinion, instead of this error.

But for one of my new display templates, I wanted to create something generic, so that I don't have to think about whether or not a managed property is sortable.

## Search REST api

My first thought was to work with the search REST api, because this is the easiest way to retrieve results with in JavaScript.

First of all you need to know what happens if you are going to sort with an unsortable managed property via the REST api. The URL I tested was the following:

`http://my-site/_api/search/query?querytext='your-query'&sortlist='ModifiedOWSDATE:ascending'&RowLimit=1`

> **Note**: the reason I added the row limit at the end, was because I'm only interested if results are returned.

I received the following result when entering this URL in IE:

{{< caption-new "/uploads/2014/06/061314_1140_Howtoknowif2.png" "REST Result when using an unsortable managed property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/APPn7uvZ4efa4enf4Ozh4fDj5Pnt7v78/P7+/v39/QDu6OnNx8fHycjIycrKycnT1NTf3uDj4+Pk5OTz8/OH/jVH6d5G/QAAAABJRU5ErkJggg==" "936" "189" >}}

Of course you get the same error message as before, which is a good thing, because you could argue that if when an error is retrieved, the managed property is not sortable.

> **Note**: of course this isn't fail prove. What if the REST API isn't available or something? As this would be one of the only ways you have to know if the managed property can be sorted (via JavaScript), it would be the best choice to go for.

## Solution

So the solution I worked out to check if a managed property is sortable via JavaScript, is to do an Ajax call to the search REST api with the managed property as sort option. If you receive results, you know that the managed property is sortable. When an error occurs, the managed property is unsortable.

This is the code I use to check if the managed property is sortable:

```javascript
var request = new XMLHttpRequest();
var restUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='The-search-query'&sortlist='ManagedProperty:ascending'&RowLimit=1&selectproperties='Path'";
request.open('GET', restUrl, true);
request.onload = function (e) {
  // 4 = Request is finished and response is ready
  if (request.readyState === 4) {
    // Check if the get was successful
    if (request.status === 200) {
      // Managed property is sortable
    } else {
      // Managed property is not sortable
    }
  }
};
request.onerror = function (e) {
    // Catching network level errors
};
request.send(null);
```

This is pure JavaScript code, so no additional framework is needed.

*   On **line 9**, you can write the code when the managed property is sortable.
*   On **line 11**, you write the code when the managed property is not sortable.
If you want to make use of this code in a display template, it's best to do the same search query as you have configured in the web part. This can easily be done by changing the REST URL variable to this:

```javascript
var restUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='" + ctx.ClientControl.get_dataProvider().get_queryTemplate() + "'&sortlist='ManagedProperty:ascending'&RowLimit=1&selectproperties='Path'";
```

With ctx.ClientControl.get_dataProvider().get_queryTemplate() you can retrieve the search query which is configured in the web part.

In one of my next posts I'll show how to combine this within a fully working display template.