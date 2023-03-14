---
title: Table layout display template with REST batching functionality support
author: Elio Struyf
type: post
date: 2015-04-28T11:46:06+00:00
slug: /table-layout-display-template-with-rest-batching-functionality-support/
dsq_thread_id:
  - 3836551209
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

Last week I went to the SharePoint Evolution Conference, which was a great event. At the conference I attended one of Andrew Connell's sessions about a deep dive into the SharePoint REST API. During Andrew's session he explained the REST API batching functionality which is at the moment only available in SharePoint Online / Office 365. The batching functionality allows you to batch up a number of HTTP requests to one single request. Andrew Connell already wrote two blog posts about this topic:

*   [Part 1 - SharePoint REST API Batching - Understanding Batching Requests](http://www.andrewconnell.com/blog/part-1-sharepoint-rest-api-batching-understanding-batching-requests)
*   [Part 2 - SharePoint REST API Batching - Exploring Batch Requests, Responses and Changesets](http://www.andrewconnell.com/blog/part-2-sharepoint-rest-api-batching-exploring-batch-requests-responses-and-changesets)

The session reminded that I needed to invest some time to optimize the table layout display templates to make use of this REST batching functionality.

> **Note**: You can read more about the table layout display template in this article - [Table layout display template with managed property sorting](https://www.eliostruyf.com/table-layout-display-template-with-managed-property-sorting).

If you used or read the article about the table layout display template, you probably know how I used a HTTP request to check if a managed property is sortable or not. The sortable check needs to be performed for every managed property that will be used. Depending on the number of managed properties you want to show with the display template, it results in the same number of HTTP requests. For example: if you configured the CSWP (Content by Search Web Part) to visualize the **Path**, **Title**, **LastModifiedTime**, **Created**, and **Author** managed properties it will perform the following requests:

{{< caption-legacy "uploads/2015/04/042815_1146_Tablelayout1.png" "Multiple HTTP requests to check if the managed properties are sortable" >}}

The first two requests returned a 400 error - Invalid parameter: SortList, which means that the corresponding managed property (path and title) are not sortable. By looking at the screenshot above, you could imagine what will happen if you are going to visualize ten managed properties. The REST batching functionality helps you reduce the number of requests that needs to be performed.

If you combine the HTTP requests from the screenshot into one batch it results in the following request:

{{< caption-legacy "uploads/2015/04/042815_1146_Tablelayout2.png" "Single batch request" >}}

This request gives the following response:

{{< caption-legacy "uploads/2015/04/042815_1146_Tablelayout3.png" "Batch request response" >}}

In the screenshot you can see that the response contains the responses for all the combined requests. If you compare this screenshot with the first one, you can see that the first two requests (highlighted in red - path and title) return the same error 400 message - Invalid parameter: SortList.

## Updates to the code

To support the batching functionality, the table layout display template codes needed some updates.

First you need to create the batch of requests to check the managed properties.

{{< highlight javascript "linenos=table,noclasses=false" >}}
var endpoint = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='*'&sortlist='" + prop + ":ascending'&RowLimit=1&selectproperties='Path'";
// Put the properties to the batch
batchContents.push('--batch_' + tableId);
batchContents.push('Content-Type: application/http');
batchContents.push('Content-Transfer-Encoding: binary');
batchContents.push('');
batchContents.push('GET ' + endpoint + ' HTTP/1.1');
batchContents.push('Accept: application/json;odata=nometadata');
batchContents.push('');
{{< / highlight >}}

Once the batch is created, the request can be done. The code for the batch request looks like this:

{{< highlight javascript "linenos=table,noclasses=false" >}}
var request = new XMLHttpRequest();
var restUrl = _spPageContextInfo.webAbsoluteUrl + '/_api/$batch';
request.open('POST', restUrl, true);
request.setRequestHeader('Accept', 'application/json;odata=verbose');
request.setRequestHeader('Content-Type', 'multipart/mixed; boundary="batch_' + tableId + '"');
request.setRequestHeader('X-RequestDigest', document.getElementById('__REQUESTDIGEST').value);
request.onload = function (e) {
    if (request.readyState === 4) {
        // Check if the GET request was successful
        if (request.status === 200) {
            var responseInLines = request.response.split('\n');
            // Loop over all the responses
            var j = 0;
            for (var i = 0; i < responseInLines.length; i++) {
                try {
                    // Parse the JSON response...
                    var result = JSON.parse(responseInLines[i]);
                    // Retrieve the corresponding property to te request 
                    // Responses are in the same order as the requests in the batch
                    var property = propOrder[j++];
                    // Check if the response returned an error
                    if (typeof result.error === 'undefined') {
                        // The property is sortable
                        addSortableProperty(property, tableId);
                    } else {
                        // The property is not sortable
                        addUnsortableProperty(property, tableId);
                        // Hide the sorting options
                        hideSortableOptions(property, tableId);
                    }
                } catch (e) {
                    // don't do anything... just keep moving
                }
            }
        }
    }
};
request.onerror = function (e) {
    // Catching errors
};
request.send(batchBody);
{{< / highlight >}}


## Download

Download the template on SPCSR GitHub Repository: [Table layout with sorting template](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Table%20Layout%20with%20Sorting%20Templates%20(CSWP)). Make sure that you use the Control_List_Table_Batching.html and Item_List_Table.html display templates.