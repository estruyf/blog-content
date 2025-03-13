---
title: Using the SharePoint RenderListDataAsStream API to fetch lookup and single managed metadata field values
author: Elio Struyf
type: post
date: 2018-03-19T15:23:01+00:00
slug: /using-sharepoint-renderlistdataasstream-api-fetch-lookup-single-managed-metadata-field-values/
dsq_thread_id:
  - 6562858241
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - API
  - REST
comments: true
---

The SharePoint item REST API has its limits. One (or two in this case) of these limits is about returning values for fields you specified, more in particular when using lookup- or managed metadata fields.

The problem with the lookup field occurs when it references a list from another web. In that case, the REST API will return an error message.

> **Info**: This issue has already been reported and a UserVoice request has been created a while ago: [Enable support for lookup columns in other webs in the REST API](https://sharepoint.uservoice.com/forums/329220-sharepoint-dev-platform/suggestions/9065329-enable-support-for-lookup-columns-in-other-webs-in).

Besides this lookup field problem, there is also an issue when using a managed metadata field which is configured to single term selection. Only when the field is configured to allow single term selection, the REST API returns the index of the term instead of the actual term label value.

{{< caption-new "/uploads/2018/03/031918_1517_UsingShareP1.png" "Managed metadata single value" >}}

> **Info**: also for this there is a UserVoice request: [Fix the REST API to return the value and not the Id when getting single value Managed Metadata field](https://sharepoint.uservoice.com/forums/329220-sharepoint-dev-platform/suggestions/10503294-fix-the-rest-api-to-return-the-value-and-not-the-i).

When you configure the field to be a multi-select term field, it returns the right labels.

## Using the RenderListDataAsStream API


> **Update**: The documentation of this endpoint has been added to the SharePoint development documentation: [Retrieve items as stream](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/working-with-lists-and-list-items-with-rest#retrieve-items-as-a-stream).

Normally you would use the following API endpoint to retrieve item information:

```html
GET - https://<tenant>.sharepoint.com/sites/<site-name>/_api/web/Lists(guid'<list-guid>')/items(1)?$select=MMField
```

As mentioned before, when using a lookup field, the endpoint returns an error message.

When using a single selection managed metadata term, you get the index returned instead of the label of the term. You can also see this in the above screenshot. The label I retrieved is **5** and I expected to get "Home".

In order to solve both issues, you can make use of the **RenderListDataAsStream** endpoint. This endpoint allows you to specify CAML queries (back to the "good" old days). The API endpoint only allows you to call it via POST requests.

> **Info**: More information about this endpoint can be found here: [https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.list.renderlistdataasstream.aspx](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.list.renderlistdataasstream.aspx)

Here is an example of how you could use the API:

{{< gist estruyf 5e46b8b5a03f4cdb61bc4ce3caa1c8e4 >}}

In case of a lookup field, you get the following response back:

{{< caption-new "/uploads/2018/03/031918_1517_UsingShareP2.png" "Lookup value from linked list living on another web" >}}

No more error message, you can see the lookup field value highlighted in the above screenshot.

For the managed metadata term field value, you get this in return:

{{< caption-new "/uploads/2018/03/031918_1517_UsingShareP3.png" "Correct label value of the specified term" >}}

The label now contains the label of the term.

## A sample of using the API in SPFx

Here is the sample using the API in an SPFx solution:

{{< gist estruyf c485c9df1797ba0aa66993674533adab >}}