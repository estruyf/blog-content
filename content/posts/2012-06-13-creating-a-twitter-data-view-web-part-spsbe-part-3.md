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

{{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw1.png" "Create Data Source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABCklEQVR4nDWO2WqDQAAA9///o1BaQgxNjMZoVte9dz02V21z0D9oXCPRFiwJFOZtYBjwOpo+PU9GjjeZhW6A/AiHiMdUynLj+XNQqNRk9HzYHKtyW5DDTn5sRbVmp3cFl1MgGVqbfL8xptAEhZlItUCaJyYjvusAlkYL14mCKY4DjiPJoKArQVaFwp7rgEJTxXGumBakzIUpxG6df52q87GKlnMgWYxWC4JCjmGZ0UymnECaRoom9/jhc3+7dX3ft23b933Xddbauq6HYVCCgvNxb+vvxl6ujW3spbGX9mqvTf3703GKgMkYx5Fi8QOoGCw1vp9r4s3GIBPo3z3gCYL+0n/DSTAZv/wBGjLxdb9bAPIAAAAASUVORK5CYII=" "386" "399" >}}

Under the general tab you can set the name of your data source.

## Step 3

Create a new web part page and add an empty data view web part on it.

## Step 4

Select your Twitter Data Source.

{{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw2.png" "Select Data Source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAIAAABrQaqyAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB0UlEQVR4nGWQ3U/aUADF7x+8xz0sW7JkMTO6p0nGyzZNQKPzKyxMCZRRPoogUivQCty2txToB62UjwarlFvugmR72Xk9+Z1zcsDrD/uv3kXfbJ9thBM70fzmbi50Wo2kxXiWPT6PgZsyU+O4Gle949jbaqWDpIGpGVrXtgyBvwPlfJKmfuVpKkMl6N/JUjFbYugSQ8NmvVzMAIU96fEprgFty3Jd99HzZrOZ5z1NJuNsJgl0/qctFZzJE/lPYlsAWiM2gDnUNR5sezp1CSFBECyXJAjwzXUB9JAwmw6HQ8e2bccZzef+GnXdSZ5OASRDtadBSZJRp9WGhjkghOAgGI2GhRwFJP7K1PvdnoaQohuG5z0vCVkSgvGCyVFAFsqKLMsyarfaaqeLcbAOxwt/ZUv8VU9VIBRNw/QePYzxC/yXlvgiksRmq22+tC7X+kersjB2HNuyxuORP59jvPAXq/G+/7yaBkVYvxcrbKMuwNvaPVdvVtjG4GEiow6TSwPmuhKOpjdDFxuf49vhxMfQxdaXy7db5+8/naYScaCi1tDSTF1VFVEWmwqCel/R+x1ZbK1uyaTiVCJ2GT85jH7f+xbej3w9O44eHewdHez+OIz8AZbGrHQUJzxCAAAAAElFTkSuQmCC" "237" "402" >}}

## Step 5

In the data source select the following fields to be added to the data view web part:

- Item/google:image_link;
- Item/author;
- Item/description;
- Item/pubDate.
  {{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw3.png" "Select Fields"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABYklEQVR4nDWNW0vCYACGv/9rdOOVomA3oYVXYnVRgSWatZY582KSp2JzqCwpPDd0ubmDO+n81G1mGPXy3D3wvKBQIYsv1HOZyJdIvETiBQIvkbVmu95sV8gG6DGjdo9pdQetHsOw/HAsjjhJVIypbk5kHXQHwzr99t7qdvoMywnCVFN0k5dUTlRYTgRz0+QmPM8LCwjNBVzAJVyuNM0wjNknwwDbceByraiqbVs7rLVtWZa13n5vprK80wu4Ok8UgxHMf4T6Q4gviHgPbw/C6Y/WADiOY8J15AJ3BxIuT2zPe+XyxPZ9cXfghm52f+Nw1emNxpz8xcnsWGLHEi9osjLv9/t/38kH4iiaPT55Cp/lwqe5UBSLXOZJqg5se6OrApqtxO/KCEalMlTqkUqmq2iuUavTwLad+UzL4tQ9VkUwMoESCZS4Rl5TGapWo8FyZUFTl0RekiaGrm42zvZ/nU77Byi1KOKXVXVPAAAAAElFTkSuQmCC" "260" "320" >}}

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

{{< caption-new "/uploads/2012/05/051812_0726_CreatingaTw4.png" "End Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeUlEQVR4nBXGSwrCMBQF0Ox/Ba5BJ1JUkPjF3wY6dShIsWntM6l99zVXPKPjyumkuW2rsw/7RdgVr8OyOa3fV//cFPXFu9V8RnKARdiQM0iQRuqYkemqx90+kkLdhpBEkkgfo6lK1/UpOX8ss8KgCqgqhu+oSvJ/4AeMnG2lcLjf7QAAAABJRU5ErkJggg==" "521" "211" >}}
