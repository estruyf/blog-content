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
{{< caption-new "/uploads/2012/05/051812_0651_UsingXSLTSt1.png" "End Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVR4nAXByxJAMAwF0P7/v1lbeEzpFE3cVJNisHGOIwVjBaIYmIPYTgdRYTlzks0ZFpm70jYWR/VtTdO+eA6DUkhz7+pnR9kqwvkWy/F6cr4ATXqLGP/941LO7m/mPQAAAABJRU5ErkJggg==" "539" "166" >}}

The best way to start with XSLT statements is with creating a new list view and adding conditional formatting to it.

## XSLT Statements

### Step 1

Open your site in SharePoint Designer and go to **List and Libraries** and click on your task list.

On the **Views** section click the **New** button, and give your list view a meaningful name.

{{< caption-new "/uploads/2012/05/051812_0651_UsingXSLTSt2.png" "Create a New List View"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeklEQVR4nC3CgQ6CIBQFUP7/D9saPDV5eIFXS0FB0Vbr7Ki+o6HvJ4CMvt0HwAMg6iyztazsgxyP7OCDpJxT+s1rXjcRUfJ8vecZ8MuSSqnftW6l7MfuQ1QxSmtHKVut9fxrrR3XdSFEBUBEogjgLbsJGC1rQ9oYbegDFOeLuU6iQoMAAAAASUVORK5CYII=" "438" "217" >}}

Click **OK**, and open the newly created view.

### Step 2

Select the whole row, do a right-click, and click on **Conditional Formatting**.

{{< caption-new "/uploads/2012/05/051812_0651_UsingXSLTSt3.png" "Conditional Formatting"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAuUlEQVR4nB3CAW6DIBQAUO5/syYzxdhizRZbAfsFwcJAQVRcspeHqjJgHEq8EuJYJxiVjI6Uji+uQQTU9Z7r38mvVBgYzaCM1FYq2zzhCQbdiuZeVt91c/mqLtca31+koaTpHq2ofzgyLYmAs35AW8i+tW4+9iPnfJ5nTguaYIxOrk45I5VgPW9TsHmb9+S2aNFbbB9/KLMZf4KQQ1doXug3jp86eYb8ciwx/z8nO3MAADkItYQU4v4HF+6/iW91rqEAAAAASUVORK5CYII=" "390" "258" >}}

At the right side the **Conditional Formatting** panel will open. Click on **Create** -> **Apply formatting**.

{{< caption-new "/uploads/2012/05/051812_0651_UsingXSLTSt4.png" "Apply formatting"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAz0lEQVR4nDXJuU7DMBgAYL//M4BYKkQZqVKaplxmaFClyCDhkB6RnfiK7cS9FgjlRwxI3/ah+8c0nuHx5CG5w5MER9Onm2h2mzynGV2QAo1TGr38GS2WWVHxSqxKnn+slmvGKomG8+Ic0wtMz+YlYbbzTmkjpFTGuLZFIWwBwGrltPTOcc5FLb77HgB2uyPqwh4AmsZL7buwl8p24XA6/fy3LaE3tn5TnIQmN5y0Ov861tAbb9bIsymE2BbXG3Ip6LB+v9pkA/Y6+NSjLY9/AcyatJ5xjVQIAAAAAElFTkSuQmCC" "164" "122" >}}

Set your condition as follows:

{{< caption-new "/uploads/2012/05/051812_0651_UsingXSLTSt5.png" "Set the Condition"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAArklEQVR4nD3Cxw6CMAAA0P7/pzgOGoNWQWwRBOrooATxYBwYrEwR49F48eUBG9mUeFvfsZGB51NkwOVCdx1LrpAPR4CHe12oIUlGJBmSKxS5trnpsjDjdrGOAAsi/9jiuNaFgjQd0zuOCuvQoLgxPQFkEDTlo87S/2f++2kKwXZAg8arfd/VQ2VZWdVFVad5eUnV6Xzu9gdgMp3JMKSMMsY454wLzXLh0sUIdXr9L6t7lTNbcDIVAAAAAElFTkSuQmCC" "466" "291" >}}

Click **Set Style**, and in the background section add #FFCFD1 as the **background-color** value.

{{< caption-new "/uploads/2012/05/051812_0651_UsingXSLTSt6.png" "Apply Custom Styling"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVR4nAXBiW6CMAAA0P7/pywxmYtbPGakMKAFW9pCuUpBjs25Q80mCSyL8T1wN1ncP5rT2ephtnxawjVElu29YOJRZkAIHMxT1VJsrOeTIg33XVWrUGeCeZBgEzR1M46DtVk8z6d5GidxZJsrTl3JMfVtcDodx3GgnuU7m0zSJCQEm1HgxhyzrQ0ul9+/cRDU4RyxwBEMhQIz5jLmUg+CVAa6kG+l+iL+h49LaFQWPGD0Sbe1VoAgyIhz6NqfLO8L3ZdVr8v/trvu38/HbyACN2RI5bKq1a7R3euu6aokiwqdJVLcANmnxfQKt/6uAAAAAElFTkSuQmCC" "387" "323" >}}

Click **Ok**.

### Step 3

If you switch to the code view and do a search for **Deferred** you should see the following code:


```xml
<xsl:if test="normalize-space($thisNode/@Status) = 'Deferred'" ddwrt:cf_explicit="1">background-color: #FFCFD1;</xsl:if>
```


To add the other background colors to the rows, you can add the following lines to the code:


```xml
<xsl:if test="@Status = 'Completed'">background-color: #DFFFDF;</xsl:if>
<xsl:if test="@Status = 'In Progress'">background-color: #DFDFDF;</xsl:if>
```


### Step 4

When you are using a lot of IF statements for the same column, you can use the choose statement.

In the choose statement you can express multiple tests to your column.

The IF statements can be easily changed to a CHOOSE statement. It will look like this:


```xml
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
```


Notice the **otherwise** element, this will be used when none of your tests met the condition.

## Part 3

In part 3 I will explain you how to re-create the Twitter web part that I created during my presentation.