---
title: 'Using XSLT Statements: SPSBE Part 2'
author: Elio Struyf
type: post
date: 2012-06-13T06:57:46+00:00
slug: /using-xslt-statements-spsbe-part-2/
Xylot:
  - http://www.xylos.com/blog/post/1275/Using-XSLT-Statements-SharePoint-Saturday-Belgium-Part-2/
dsq_thread_id:
  - 3837075709
categories:
  - SharePoint
  - SharePoint Designer
  - Web Part
  - XSLT
tags:
  - SharePoint Designer
  - SPSBEX
  - Styling
  - Web Part
  - XSLT
comments: true
---

This post explains the second demo that I showed at my SharePoint Saturday Belgium presentation.

The second demo was about XSLT statements. XSLT statements are used to put a conditional test against the data source you are using.

For example:

If my value is equal to "deferred" than show or do this.

In my demo I used this to change the background color or the table row based on the task status value:

*   Completed: Green;
*   Deferred: Red;
*   In Progress: Gray.
{{< caption-legacy "uploads/2012/05/051812_0651_UsingXSLTSt1.png" "End Result" >}}

The best way to start with XSLT statements is with creating a new list view and adding conditional formatting to it.

## XSLT Statements

### Step 1

Open your site in SharePoint Designer and go to **List and Libraries** and click on your task list.

On the **Views** section click the **New** button, and give your list view a meaningful name.

{{< caption-legacy "uploads/2012/05/051812_0651_UsingXSLTSt2.png" "Create a New List View" >}}

Click **OK**, and open the newly created view.

### Step 2

Select the whole row, do a right-click, and click on **Conditional Formatting**.

{{< caption-legacy "uploads/2012/05/051812_0651_UsingXSLTSt3.png" "Conditional Formatting" >}}

At the right side the **Conditional Formatting** panel will open. Click on **Create** -> **Apply formatting**.

{{< caption-legacy "uploads/2012/05/051812_0651_UsingXSLTSt4.png" "Apply formatting" >}}

Set your condition as follows:

{{< caption-legacy "uploads/2012/05/051812_0651_UsingXSLTSt5.png" "Set the Condition" >}}

Click **Set Style**, and in the background section add #FFCFD1 as the **background-color** value.

{{< caption-legacy "uploads/2012/05/051812_0651_UsingXSLTSt6.png" "Apply Custom Styling" >}}

Click **Ok**.

### Step 3

If you switch to the code view and do a search for **Deferred** you should see the following code:


{{< highlight xml "linenos=table,noclasses=false" >}}
<xsl:if test="normalize-space($thisNode/@Status) = 'Deferred'" ddwrt:cf_explicit="1">background-color: #FFCFD1;</xsl:if>
{{< / highlight >}}


To add the other background colors to the rows, you can add the following lines to the code:


{{< highlight xml "linenos=table,noclasses=false" >}}
<xsl:if test="@Status = 'Completed'">background-color: #DFFFDF;</xsl:if>
<xsl:if test="@Status = 'In Progress'">background-color: #DFDFDF;</xsl:if>
{{< / highlight >}}


### Step 4

When you are using a lot of IF statements for the same column, you can use the choose statement.

In the choose statement you can express multiple tests to your column.

The IF statements can be easily changed to a CHOOSE statement. It will look like this:


{{< highlight xml "linenos=table,noclasses=false" >}}
<xsl:choose>
  <xsl:when test="@Status='Deferred'">
    background-color: #FFCFD1;
  </xsl:when>
  <xsl:when test="@Status='Completed'">
    background-color: #DFFFDF;
  </xsl:when>
  <xsl:when test="@Status='In Progress'">
    background-color: #DFDFDF;
  </xsl:when>
  <xsl:otherwise>
    background-color: transparent;
  </xsl:otherwise>
</xsl:choose>
{{< / highlight >}}


Notice the **otherwise** element, this will be used when none of your tests met the condition.

## Part 3

In part 3 I will explain you how to re-create the Twitter web part that I created during my presentation.