---
title: "Creating a Twitter Data View Web Part: SPSBE Part 3"
author: Elio Struyf
type: post
date: 2012-06-13T06:59:06+00:00
slug: /creating-a-twitter-data-view-web-part-spsbe-part-3/
Xylot:
  - http://www.xylos.com/blog/post/1276/Creating-a-Twitter-Data-View-Web-Part-SharePoint-Saturday-Belgium-Part-3/
dsq_thread_id:
  - 3895256373
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

The last XSLT demo I gave on SharePoint Saturday Belgium was about creating a Twitter web part by using a data view web part.

## Step 1

First of all you need to retrieve the Twitter search results as RSS feed. This can be done by navigating to the following URL: http://search.twitter.com/search.rss?q=YOUR-QUERY& rpp=TOTAL-RESULTS

- Change **YOUR-QUERY** by your search value;
- Change **TOTAL-RESULTS** by any number of results you want to retrieve.
  More information about this can be found [here](https://dev.twitter.com/docs/api/1/get/search).

## Step 2

The next step is to create a new data source in SharePoint Designer which will consume the Twitter RSS feed as source.

Open your site in SharePoint Designer and go to **Data Sources**. Click on **REST Service Connection** and enter your URL.

{{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw1.png" "Create Data Source" >}}

Under the general tab you can set the name of your data source.

## Step 3

Create a new web part page and add an empty data view web part on it.

## Step 4

Select your Twitter Data Source.

{{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw2.png" "Select Data Source" >}}

## Step 5

In the data source select the following fields to be added to the data view web part:

- Item/google:image_link;
- Item/author;
- Item/description;
- Item/pubDate.
  {{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw3.png" "Select Fields" >}}

When the fields are selected, click **Insert Selected Fields as** and choose **Multiple item view**.

## Step 6

Right know you should have a data view web part filled with five records. The first thing is to make the user image visible.

Click on the image link and switch to code view, this will bring you to the correct location in the code.

To make the image visible you need to change:

```xml
<xsl:value-of select="google:image_link"/>
```

To this:

```xml
![Twitter image]({google:image_link})
```

Notice the brackets { }, this can be used as short notation for selecting your data.

## Step 7

The next step is to make the username clickable. The result string that you retrieve from Twitter is something like this: **eliostruyf@twitter.com (Elio Struyf)**.

So what you need to do is retrieve the username (**eliostruyf**) and create a new link that references http://twitter.wom/Username

The users' full name will be used for the text to display.

To do this you could change:

```xml
<xsl:value-of select="author"/>
```

Into this:

```xml
<a>
<xsl:attribute name="href">
http://twitter.com/<xsl:value-of select="substring-before(author, '@twitter')" />
</xsl:attribute>
<xsl:value-of select="substring-before(substring-after(author, '('), ')')" />
</a>
```

## Step 8

In this step you will change the output rendering of the description field so that it renders HTML.

To let the description be rendered as HTML you will need to change:

```xml
<xsl:value-of select="description"/>
```

Into this:

```xml
<xsl:value-of select="description" disable-output-escaping="yes"/>
```

The disable-output-escaping parameter indicates that HTML characters like "<" and ">", will be output as is. No is the default value and they will be converted "&lt;" and "&gt;".

## Step 9

The last step is to remove the +0000 value from the date. This can be easily done by the substring-before function.

Change:

```xml
<xsl:value-of select="pubDate"/>
```

Into this:

```xml
<xsl:value-of select="substring-before(pubDate, '+0000')"/>
```

## Result

Your results should be something similar to this:

{{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw4.png" "End Result" >}}
