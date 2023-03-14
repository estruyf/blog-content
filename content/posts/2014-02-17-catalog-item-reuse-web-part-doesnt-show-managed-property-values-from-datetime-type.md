---
title: Catalog Item Reuse Web Part doesn’t show Managed Property Values from DateTime Type
author: Elio Struyf
type: post
date: 2014-02-17T19:32:02+00:00
slug: /catalog-item-reuse-web-part-doesnt-show-managed-property-values-from-datetime-type/
dsq_thread_id:
  - 3836535538
categories:
  - Cross-site Publishing
  - SharePoint 2013
tags:
  - Cross-site Publishing
  - Page Layouts
comments: true
---

Last week I was doing some experiments with the creation process of page layouts for a cross-site publishing site. After a couple tests with different types of data, I saw some weird behavior when using DateTime managed properties. The Catalog Item Reuse web part didn't show the value for a managed property of DateTime type. The auto-created managed property for that DateTime field worked correctly, but my custom one didn't.

This were the values for my auto-created managed property:

{{< caption-legacy "uploads/2014/02/021714_1932_CatalogItem1.png" "DateTime Values" >}}

The difference between the auto-created property and the custom property is the data type that is specified.

{{< caption-legacy "uploads/2014/02/021714_1932_CatalogItem2.png" "Date Time Managed Properties" >}}

Auto-created managed properties for a DateTime field are set to **Text**. My custom property was set to **Date and Time** because I also need it for filtering and sorting.

The values which these managed properties return are also very different:

*   **Text** value: "PublicationDateOWSDATE":"**2014-02-11T23:00:00Z**";
*   **Date and Time** value: "PublicationDate":"\/**Date(1392159600000)**\/".

After some digging in the assembly of the Catalog Item Reuse web part (Microsoft.Office.Server.Search.WebControls.CatalogItemReuseWebPart), I found that it does a parsing from a string to a DateTime. That way, you're custom values would never be converted correctly.

{{< highlight csharp "linenos=table,noclasses=false" >}}
private static string GetDateTimeValue(string searchData, bool dateOnly)
{
    DateTime time;
    string str = searchData;
    CultureInfo currentCulture = Thread.CurrentThread.CurrentCulture;
    if (DateTime.TryParse(searchData, currentCulture.DateTimeFormat, DateTimeStyles.AssumeUniversal, ref time))
    {
        str = dateOnly ? time.Date.ToString("D", currentCulture.DateTimeFormat) : time.ToString("f", currentCulture.DateTimeFormat);
    }
    return str;
}
{{< / highlight >}}

Another downside of the catalog item reuse web part, is that you cannot define the format of your date time. You only have the option to show the time or not.

If you want to do some formatting to your DateTime values, the best option you have is to visualise it with a Content Search Web Part.

> **Important**:: this blog post is written based upon my findings in SharePoint 2013 with the December 2013 CU installed.