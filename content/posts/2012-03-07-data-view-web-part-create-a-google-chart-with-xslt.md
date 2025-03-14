---
title: 'Data View Web Part: Create a Google Chart With XSLT'
author: Elio Struyf
type: post
date: 2012-03-07T07:31:31+00:00
slug: /data-view-web-part-create-a-google-chart-with-xslt/
Xylot:
  - http://www.xylos.com/blog/post/1186/Data-View-Web-Part-Create-a-Google-Pie-Chart-with-XSLT/
dsq_thread_id:
  - 3836444802
categories:
  - SharePoint
  - SharePoint Designer
  - Web Part
tags:
  - Chart
  - Pie
  - Visualisation
  - Web Part
  - XSLT
comments: true
---

In this post I will explain how you could create a Google Pie Chart with the use of XSLT. The data that I am going to visualize are the tasks statuses, so that you get an overview of all the tasks.

The pie chart that will be used is the following: [Pie Chart](http://code.google.com/intl/us-en/apis/chart/interactive/docs/gallery/piechart.html).

## What do you need?

You only need to have SharePoint 2010 Designer and a standard task list with a couple of items in it.

## Actions

### Step 1.

Open your site in SharePoint 2010 Designer.

### Step 2.

Open the page were you want to put your chart in edit mode.

### Step 3.

Insert an Empty Data View by selecting the **Insert Tab** and click on **Data View** -> **Empty Data View**.

{{< caption-new "/uploads/2012/02/022012_1905_CreateaGoog1.png" "Empty Data View"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABBklEQVR4nAXBzW6CMAAA4L7/Ycc9i6clm/HgDkZQ+WtpaSnU0v9CRV1C9n2AfX2yJuejZPKO+slop+lRKWvcauwMxOQnm+Skh0nxuw3e0tMHrDNCB0I6kGUFxj2hI2V3RjltYXn9xRBihKsKgvO5qBrREjWIpYEcNXnSVQxx2zbvI8CXb1SeR1okx0lbk2r/0nkIcX2+gpbgdtr19S6Kw0MdOnhE18NDXkKIr/ff4iS4VLLrJj4EHzdMBMr3ZkA941qZ2YygLiEhgnPl/dq2fY/3zySsS3FOaZnBKW9xO2i9zPMfQqzHP8lmkhfJk4dFoCpKIaw1ybm1rhHD+TN2StyCKt9p+AegiQqzqFQ8MQAAAABJRU5ErkJggg==" "442" "455" >}}

### Step 4.

Click on the **Click here to select a data source** link and select the task list you want to use.

{{< caption-new "/uploads/2012/02/022012_1905_CreateaGoog2.png" "Select your task list"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAIAAABrQaqyAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB2ElEQVR4nF2QzW/SYADG3z9P/ReWJR5mjNEYDy5GEw/ejJkmZlm44AfqLiZjxKmDOoVCoR9sFCot5W2hn7SUfrCttEAIfQ3sYvbkuf0Ozwd4uXe09fjDvaeZK9/afHNzY+fGxusXrzIfP2cBSVLlSo2okHi5huM1ut5qtsRGUxA7kG2cAfaUwosYTZbrNEESpVaD5liGY5m+1BHaLfCX41iWHbne+PzC9XzX81zXHbmewLexwjGwxNK5waj60DTNyzBECCVJghCaxhFNEsDij12IKZo1n03RWskax3HEUFVg8Jh09oOHmqLqgii73jiMZmE08/1ghWsnB7tv9+5sv998sHv7Uer+s08Pn+/ffZLZSX37/asAuPrJhQM1faiqhjPyZ/NFFM+ieD4Jw1wuB3qyPLBsy7Zt29I0LQgChNAySRzHrpSLQIFNVelDqSfJK1+GkwShBKEoWldTO6dqH2q6LoqiaZrL5fKq/zSOGLIKtG6jL3ehJOm67vv+YrH4DxOgJ9Rl2OEFYTgcrlLXWu+eUGQVyCLnOI4xsPxgfO0WgiCA0uUDW/UGfUXkZJ7tCU1D5m0V6lK78gcDR9XmIc4cFKl0Np/6+j2dzX/5WUofFt7lsP088Q/fAqeRZRJXJQAAAABJRU5ErkJggg==" "242" "410" >}}

### Step 5.

Now that you have selected the list, the data source connection can be made by selecting some fields (Title and Status) and adding them as **Multiple Item View** to the data view.

{{< caption-new "/uploads/2012/02/022012_1905_CreateaGoog3.png" "Add items to view"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAIAAABrQaqyAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB3UlEQVR4nDWNTXPSQACG949586j8Cg96csYZD/WinfFj/AOevGjrtGVshAJaHAY7VtoAARRI+BRI0gSy2WSzmwSzNMk6+PHOe3vmeV/wqXJeLJ8VTr+Uq7VcqVL6fNbsji9bcrUmHQolIHVGoqTUGj1RUrZtKdqSmGiNcJQ9ygKkXaHpCE5GVFeJrlFd9Y0rqqsRDUvFIrD3downN5cvMtqzjPH8lvr0tvsy4+/eiBv5cvUc4MX02pzYirTq1d1Rxx5IzJhEC3n6oykIAiBozKOhpYuWLmKr5SybIf7OwhmE8CQnAA9OeDBczevmzwtba6zmIl11GJmtw6BUyANCQs45tBG0EcbERu7mOt5sNgElxZM8oDRI09g0TcuyHMfxMPZ9yhgLfFosbHGYJIlhGBBChBDGmHPOov/477jneYwxznn6J1HEQp9uvx2XxEkchCFyse24hPoR26x/RYFP8x8EQEjAOVdNAi3TdSD1UBLHaZoGPq19OweE+Jzz8dzJnbb2jmuv3lReH3w9/tj2KWlLEsB4i8WOdv/xu3uP9u/u7N95+PbBblZdzMXLi3+2amBoW65jJ0nCOY/jZDGbZA8PQEOsD+R+p91V+l251x3I/aEiD+R+sy6+zx79BqU4sfWVq+31AAAAAElFTkSuQmCC" "202" "349" >}}

The result of your added fields should look something like this (based on which items are in your list).

{{< caption-new "/uploads/2012/02/022012_1905_CreateaGoog4.png" "Data view result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAO0lEQVR4nF3JQQoAIAgF0e5/0mijlOIXTKJW1eyGVxrrvMqccDd4ni1E/HKqaq0tIjaLyMcAeh9mBvgC+DpXzbmaPnQAAAAASUVORK5CYII=" "496" "129" >}}

### Step 6.

Now we are going to start by building the chart in XSLT.

Replace the content of the XSLT template with **match="/"** with the following content:

```xml
<!-- Google Chart JavaScript Reference -->
<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<!-- Call the dvt_1 template -->
<xsl:call-template name="dvt_1"/>

<!-- Create the chart div -->
<div id="chart_div"></div>
```


### Step 7.

Replace the content of the XSLT template with **name="dvt_1"** with the following content:


```xml
<xsl:variable name="Rows" select="/dsQueryResponse/Rows/Row"/>
<xsl:variable name="RowCount" select="count($Rows)"/>

<!-- CDATA - (Unparsed) Character Data -->
<!-- The text inside CDATA will not be parsed by the XML parser. -->
<!-- Check http://code.google.com/apis/chart/interactive/docs/quick_start.html for more information -->
<xsl:text disable-output-escaping="yes"><![CDATA[
  <script type="text/javascript">
    google.load('visualization', '1.0', {'packages':['corechart']});
    google.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Tasks');
      data.addColumn('number', 'Status');

      data.addRows([
]]></xsl:text>

<!-- Call the body template -->
<xsl:call-template name="dvt_1.body">
  <xsl:with-param name="Rows" select="$Rows"/>
  <xsl:with-param name="FirstRow" select="1" />
  <xsl:with-param name="LastRow" select="$RowCount" />
</xsl:call-template>

<!-- Closing the JavaScript content -->
<xsl:text disable-output-escaping="yes"><![CDATA[
      ]);

      var options = {'title':'Task Overview', 'width':500, 'height':400, is3D: true, colors:['#4F81BD','#C0504D','#F79646','#9BBB59','#8064A2']};
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }  
  </script>
]]></xsl:text>
```


Important in this code are the **<![CDATA[ ]]** sections. These enable you to add/create JavaScript code to the page. More information about the use of **CDATA** can be found [here](http://www.w3schools.com/xml/xml_cdata.asp).

### Step 8.

The code in the previous step creates a call to the **dvt1.body** template. The purpose is to generate the rows to be used in the chart.

The content of the **dvt1.body** template needs to be replaced by the following code:


```xml
<xsl:param name="Rows"/>
<xsl:param name="FirstRow" />
<xsl:param name="LastRow" />
<xsl:variable name="dvt_Rows">
  <root>
    <xsl:for-each select="$Rows">
      <xsl:if test="(position() >= $FirstRow and position() <= $LastRow)"><xsl:copy-of select="." /></xsl:if>
    </xsl:for-each>
  </root>
</xsl:variable>

<xsl:for-each select="$Rows">
<!-- Sort items on the task status -->
  <xsl:sort select="@Status" order="descending"/>

  <!-- Retrieve the current status -->
  <xsl:variable name="NewGroup">
    <!-- Check if the name is changed since the last time this function was called. -->
    <!-- It returns an empty string if the value has not changed; otherwise, the previous value is returned. -->
    <xsl:value-of select="ddwrt:NameChanged(string(@Status), 0)" />
  </xsl:variable>

  <xsl:if test="not($NewGroup='') and position() >= $FirstRow and position() <= $LastRow or ($FirstRow = position())">
    <!-- Retrieve the current group name -->
    <xsl:variable name="GroupingName">
      <xsl:choose>
        <xsl:when test="$NewGroup=''"><xsl:value-of select="@Status" /></xsl:when>
        <xsl:otherwise><xsl:value-of select="$NewGroup" /></xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- Do not call the GoogleDataRow template on the first run, otherwise you will have an empty datarow. -->
    <xsl:if test="not((position()=1) or (position()=$FirstRow))">
      <xsl:call-template name="GoogleDataRow">
        <xsl:with-param name="fieldvalue" select="$GroupingName" />
        <!-- Count rows that share the same Status value -->
        <xsl:with-param name="total" select="count($Rows[@Status = $GroupingName])"/>
        <xsl:with-param name="last"></xsl:with-param>
      </xsl:call-template>
    </xsl:if>
  </xsl:if>

  <!-- Check if the current row is the last row to be processed. -->
  <xsl:if test="position() = count($Rows)">
    <xsl:variable name="GroupingName">
      <xsl:value-of select="@Status" />
    </xsl:variable>

    <xsl:call-template name="GoogleDataRow">
      <xsl:with-param name="fieldvalue" select="$GroupingName" />
      <!-- Count rows that share the same Status value -->
      <xsl:with-param name="total" select="count($Rows[@Status = current()/@Status])"/>
<!-- Let the function know that it is the last row -->
      <xsl:with-param name="last">true</xsl:with-param>
    </xsl:call-template>
  </xsl:if>
</xsl:for-each>
```


### Step 9.

All other default templates may be removed because they will not be used. Normally this should be the following templates:

*   name="dvt_1.rowview"
*   name="dvt_1.empty"
*   name="dvt_1.commandfooter"
*   name="dvt_1.navigation"

### Step 10.

The last thing that needs to be added is the **GoogleDateRow** template.


```xml
<!-- GoogleDataRow template -->
<xsl:template name="GoogleDataRow">
  <xsl:param name="fieldvalue" />  
  <xsl:param name="total" />
  <xsl:param name="last" />

    <!-- The Google JavaScript Chart expects the data to be written in the following format: ['String', number]   -->
  <xsl:choose>
    <xsl:when test="$last='true'">
      [&apos;<xsl:value-of select="$fieldvalue"/> - <xsl:value-of select="$total" />&apos;, <xsl:value-of select="$total" />]
    </xsl:when>
    <xsl:otherwise>
      [&apos;<xsl:value-of select="$fieldvalue"/> - <xsl:value-of select="$total" />&apos;, <xsl:value-of select="$total" />],
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>
```


This template adds the data row to the generated JavaScript code.

### Step 11.

Someone mentioned that only the first ten items are retrieved. This can be change by doing a search for **Name="MaximumRows"**, this will give you the following parameter: 

```html
<asp:Parameter DefaultValue="10" Name="MaximumRows"></asp:Parameter>
``` 

Remove this parameter and you will retrieve all the items.

## Result

{{< caption-new "/uploads/2012/02/022012_1905_CreateaGoog5.png" "Pie Chart Result 1"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAxElEQVR4nGP4////z58/X796/enTp/9g8O///7///kHYDCD+v7///v39////ty+fP7559fHt+8cPHr5+8wYiDVJ4/eTThRMP1sw7tenc8y8fXt2+eu7tuw9Q3S/ePuhpbS/NnhlRtLq2aOqT63dfvHrz/t37f//A0reeHJm2J/jk+og7RcF7nR1enTn1////P79/Q3V//P5py5qc1312r7psj9bmfP34BexCkKUMEOrX548vzu95eWnfr+9gObCD/v//DwAa3Lc1oGkV0QAAAABJRU5ErkJggg==" "415" "297" >}}

{{< caption-new "/uploads/2012/02/022012_1905_CreateaGoog6.png" "Pie Chart Result 2"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA70lEQVR4nGP4/Pnzk6dPXr16+efv379///3/9+/f/////v4D0/8Z/oDA3/8g9n+wyP9XLz++fvnm7Zs3f/78Yfj///+Xb68v3V+74uDxQ5de//v//+ODS7evXbl79/7v378Z3n59uuhY4dQ9QVE9M+xK9s3ecfPP308fP334+PHT379/Gd5fWH5xrsPZNUHFPXN8mo4k9x/+8OUn3CKGT8dX/Jxo/6fbc2FauVvj4ciWHZ+/fv///z/Imf//M3z7+PbuvJRjiTZrPX3Dsmcs23sFrBWs9/9/kNN+/fh69/D+i+vXPbr7AOIDiNz///8BIWPLd2ch2/8AAAAASUVORK5CYII=" "346" "269" >}}

## Download

[XSLT Data View Web Part](/uploads/2012/04/XSLT-Data-View-Web-Part.txt "XSLT Data View Web Part")