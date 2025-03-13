---
title: Table layout display template with managed property sorting
author: Elio Struyf
type: post
date: 2014-06-27T06:40:53+00:00
slug: /table-layout-display-template-with-managed-property-sorting/
dsq_thread_id:
  - 3836535599
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

In my last two blog posts I talked about how you could add sorting, and how to find out if a managed property is sortable. These two posts were created during the creating time of a table layout display template. Of course there are a couple of table layout templates already, but none had the option to sort the results. So the challenge was to create a table layout with sorting availability for the managed properties.

The result of this display template looks like this:

{{< caption-new "/uploads/2014/06/062714_0632_Tablelayout1.png" "Table layout" >}}

As you can see in the screenshot above, the **ModifiedOWSDATE** doesn't have sort icons after it, this means that the property isn't sortable.

**Note**: if you want to know more on how I achieved this, you could check the following blog posts:

*   [How to add sorting in display templates](https://www.eliostruyf.com/add-sorting-display-templates/ "How to add sorting in display templates")
*   [How to know if a managed property is sortable with JavaScript](https://www.eliostruyf.com/know-managed-property-sortable-with-javascript/ "How to know if a managed property is sortable with JavaScript")

## Other examples

Sorted on the Title property (ASC)

{{< caption-new "/uploads/2014/06/title-sorted.png" "Sorted on the title property" >}}

### Sorted on the Created property (Desc)

{{< caption-new "/uploads/2014/06/created-desc.png" "Sorted on the created property" >}}

## How to use it

Once the display templates are added to the master page gallery, these display templates become available for you in the CSWP settings:

{{< caption-new "/uploads/2014/06/062714_0632_Tablelayout4.png" "Display template settings" >}}

In the **Property Mappings** section, check "**Change the mapping of managed properties ..."** and choose which managed properties you want to visualize:

{{< caption-new "/uploads/2014/06/062714_0632_Tablelayout5.png" "Property mappings" >}}

## Updates

### 29/07/2014

#### Changing managed property names

I added the possibility to change the property names like "Property 1", "Property 2" to the name of your choice. This could be done by changing the following line in the item display template:

```javascript
var propertyNames = {"Property 1":"Property 1 header value","Property 2":"Property 2 header value"};
```

So if you want that "Property 1" will be displayed as "Title" and "Property 2" as "Author", you need to change it to this:

```javascript
var propertyNames = {"Property 1":"Title","Property 2":"Author"};
```


#### Document property links

A callout has been added to the display templates to show the **view properties** and **edit properties** link.

{{< caption-new "/uploads/2014/06/table-with-properties.png" "Document properties callout" >}}

### 06/08/2014

Updated the templates to retrieve the correct web url for the document property links. The following blog post of [Corey Roth](https://twitter.com/CoreyRoth "@CoreyRoth") helped me to achieve this: How to: [Get a ClientContext for a site given a full URL](http://www.dotnetmafia.com/blogs/dotnettipoftheday/archive/2014/02/12/how-to-get-a-clientcontext-for-a-site-given-a-full-url.aspx "How to: Get a ClientContext for a site given a full URL").

### 13/11/2014

Created a new table layout display template that enables you to do multi-sorting of managed properties. You could download these templates here: [Table Layout with Multi Sort Templates (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Table%20Layout%20with%20Multi%20Sort%20Templates%20%28CSWP%29 "Table Layout with Multi-Sorting Templates \(CSWP\)").

{{< caption-new "/uploads/2014/11/111314_0939_Howtoaddmul3.png" "Table layout with multi-sorting" >}}

## Download

The display templates (control and item) are available to download from the [**GitHub CSR**](https://github.com/SPCSR/ " SPCSR GitHub Project") project. Here is the direct download link to the files: [Table Layout with Sorting Templates (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Table%20Layout%20with%20Sorting%20Templates%20(CSWP) "Table Layout with Sorting Templates \(CSWP\)").