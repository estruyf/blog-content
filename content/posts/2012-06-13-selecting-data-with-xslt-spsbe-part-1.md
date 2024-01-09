---
title: 'Selecting Data With XSLT: SPSBE Part 1'
author: Elio Struyf
type: post
date: 2012-06-13T06:56:48+00:00
slug: /selecting-data-with-xslt-spsbe-part-1/
Xylot:
  - http://www.xylos.com/blog/post/1274/Selecting-Data-With-XSLT-SharePoint-Saturday-Belgium-Part-1/
dsq_thread_id:
  - 3883818276
categories:
  - SharePoint
  - SharePoint Designer
  - Web Part
  - XSLT
tags:
  - SharePoint Designer
  - SPSBE
  - Styling
  - Web Part
  - XSLT
comments: true
---

On the SharePoint Saturday Belgium I gave an introduction presentation about XSLT ([Slides](http://www.slideshare.net/estruyf/introduction-to-xslt-spsbe07 "Presentation")). In the following blog post series, consisting of three parts, I will step by step explain my given demos.

## Selecting Data With XSLT

The first demo that I gave was about selecting data with XSLT. The best way to start with this is to create an empty web part page and use a Data View Web Part.

### Step 1

Open your site in SharePoint Designer and create a new web part page.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa1.png" "Create Web Part Page" >}}

Give your page a meaningful name:

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa2.png" "Web Part Page Title" >}}

### Step 2

Click inside the **PlaceHolderMain (Custom)** and on the **Insert** ribbon, click **Data View **-> **Empty Data View**.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa3.png" "Data View Web Part" >}}

The reason why I always choose for an empty data view web part, is because you can choose for yourself which data you want to show. Otherwise the data view web part will show the default view.

### Step 3

When you added an empty data view web part, click on the **Click here to select a data source** link.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa4.png" "Select a data source" >}}

Select your task list in the **Data Sources Picker** screen and click **OK**.**
**

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa5.png" "Select the list to be used as data source" >}}

### Step 4

When you selected the data source, it will be visible at the right side under **Data Source Details**.

Select the **ID** and **Title** field.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa6.png" "Select fields" >}}

Click **Insert Selected Fields as ... **-> **Multiple Item View**.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa7.png" "Insert as Multiple Item View" >}}

Your columns should now be visible in the Data View Web Part.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa8.png" "Selected Columns" >}}

Right now SharePoint Designer generated the XSLT stylesheet for you, but you can also add columns yourself.

### Step 5

Create a new table cell at the right side.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa9.png" "Insert Cell at the Right Side" >}}

Click inside the new table cell, and click at the bottom on **Code**. This will bring you to the code line of the selected cell.

### Step 6

Remove the **<xsl:text xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" ddwrt:nbsp-preserve="yes" disable-output-escaping="yes">&amp;nbsp;</xsl:text>** string. This is automatically inserted by SharePoint Designer to put a space in the cell.

### Step 7

Write **<xsl:value-of select="** and you will see that SharePoint Designer automatically gives you a list of the available columns in the data source.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa10.png" "Available Columns" >}}

Select **@Priority** and close the element with "/>".

**<xsl:value-of select="@Priority" />
**

This will have the following result:

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa11.png" "Priority Column Values" >}}

### Step 8

The last step in this demo was to remove the numbers before the priority. To remove this we need to get the value behind the closing bracket + space ") ".

To do this you could use a XSLT function called **substring-after**.

Remove the select attribute and re-add it again and choose **XPath Expression Builder**. This will open a new window where you can see all the columns and XSLT functions.

In the **XPath Expression Builder** start typing the following: **substring-after(@Priority, ') ')**

The result is shown at the bottom:

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa12.png" "Expression Builder Result Values" >}}

Click **OK** and save your page. This will give you the following end result.

{{< caption-legacy "uploads/2012/05/051812_0628_SelectingDa13.png" "Result" >}}

## Part 2

In the next part I will explain my second demo about using XSLT statements.