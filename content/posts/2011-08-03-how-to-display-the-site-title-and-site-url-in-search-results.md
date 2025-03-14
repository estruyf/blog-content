---
title: How to Display the Site Title and Site URL in Search Results
author: Elio Struyf
type: post
date: 2011-08-03T10:15:40+00:00
slug: /how-to-display-the-site-title-and-site-url-in-search-results/
EUSP:
  - https://www.nothingbutsharepoint.com/sites/eusp/Pages/How-to-Display-the-Site-Title-and-Site-URL-in-Search-Results.aspx
dsq_thread_id:
  - 3836445103
categories:
  - Branding
  - Search
  - SharePoint
tags:
  - Search Center
  - Search Results
  - Styling
  - XSLT
comments: true
---

Recently I was restyling the search results, and one of the expectations was to display a hyperlink to the site of origin of the result.

Adding the site title of the returned results is very easy, this can be retrieved from the metadata property "SiteTitle". The web URL is a bit more difficult. My first thought was to check the crawled properties, but there is no reference for the web URL, only a reference for the site collection URL called: "ows_SPSiteURL".

My second thought was to some XSL manipulation, and this was the best approach.

The final result will be:
{{< caption-new "/uploads/2011/05/052711_1345_HowtoDispla1.png" "Search Result with Site Reference"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOvt7Nvm5d7n59zl5N/n5t/o6OTr6fH18e/y7/n5+aLpG2ERZbsZAAAAAElFTkSuQmCC" "572" "71" >}}
The things I did to establish this were:

1.  Adding Site Title column references to the fetched properties of the Core Result Web Part.
2.  Editing the XSLT from the Core Result Web Part.
In the following sections I will go deeper into the two steps.

## Adding column references (Fetched Properties)

Fetched Properties are used to let SharePoint know which metadata should be retrieved for each result.

The column that needs to be added is: "SiteTitle".

To add these columns go to your search result page or the page where you are using the core search web part.

*   Turn the page in edit mode;
*   Edit the "Search Core Results" web part;
*   Open the "Display Properties" section;
{{< caption-new "/uploads/2011/05/052711_1345_HowtoDispla2.png" "Display Properties Section"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAIAAABSnclZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQElEQVR4nDWQ25KCMBBE8//fZu2WIHJJAiEEg3LLHYKoWyB7HuZlurtmGvR9V9csjpOK0jzHWQZLSoWUYgfE8TXLIIYoSzOEEEaQN/dlea47IArDIAij6MJ5gxHECH4+n/f7/dkBOUZlSWvGbrcbIaVzzs/++Vx2zRv8/PzKHaWUlFIrJZWcJne4q6oyWmtjlNZCbCrn3ChFPwxKK1BRWhRFnud1fWOMEUIopcbYdV2f6wpOpxOldOg3hqHvu65tW2vtEY4xttZ67+d//LJYa7/HA940h3Uc74/HKIT3Xhvzeu3rMAjyoiBFwXlTM9a1nbV2nucjPDifp2map8k5N23TGq2dc0f49qyUoxBt30sphRTDMDwerTbbdSCJkzRJCSEQwiRJOedbcd4f4ddrlMZJHMUIoTTZpGF4YRX7Nv8HVUOfuwGycT0AAAAASUVORK5CYII=" "194" "300" >}}
*   Add the following column to the "Fetched Properties";
<Column Name=" SiteTitle "/>
*   Click "Ok".
The full "Fetched Properties" XML is the following:

```xml
<Columns>
  <Column Name="WorkId"/>
  <Column Name="Rank"/>
  <Column Name="Title"/>
  <Column Name="Author"/>
  <Column Name="Size"/>
  <Column Name="Path"/>
  <Column Name="Description"/>
  <Column Name="Write"/>
  <Column Name="SiteName"/>
  <Column Name="CollapsingStatus"/>
  <Column Name="HitHighlightedSummary"/>
  <Column Name="HitHighlightedProperties"/>
  <Column Name="ContentClass"/>
  <Column Name="IsDocument"/>
  <Column Name="ServerRedirectedURL"/>
  <Column Name="SiteTitle"/>
</Columns>
```


## Search result XSL styling

Now that the" SiteTitle" column is added as to the Fetched Properties, you can edit the Search result style.

*   Edit the "Search Core Results" web part;
*   Under the "Display Properties" section, click on the "XSL Editor" button;
{{< caption-new "/uploads/2011/05/052711_1345_HowtoDispla3.png" "XSL Editor"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZklEQVR4nAXB6wpAMBgA0L3/I7lEySXGaiOXRjJmy6X94cdXi3MQ7zjvRkZqJY/HPLe+1apOfclFmtOgaRiqAuMsr3DZsoYRSjDpmz6NEjEL1NY08JzQd33XybNYbftnP3jBgoUXfg4aTWA91neBAAAAAElFTkSuQmCC" "179" "55" >}}
*   Copy the content of the XSL Editor to the text editor of your choice;
*   Add the following two XSL templates before the </xsl:stylesheet> closing tag;

```xml
<xsl:template name="SPWebUrl">
  <xsl:param name="siteUrl" />
  <xsl:param name="contentclass" />

  <xsl:choose>
    <!-- Check the content class to see if it is a document -->
    <xsl:when test="$contentclass='STS_ListItem_DocumentLibrary'">
      <!-- Get Document Library Url Name -->
      <xsl:variable name="DocLib">
        <xsl:call-template name="StripSlash">
          <xsl:with-param name="text" select="$siteUrl"/>
        </xsl:call-template>
      </xsl:variable>

      <!-- Remove the document library from the url -->
      <xsl:variable name="SPWebURLString" select="substring-before(concat($siteUrl, '/'), concat('/', concat($DocLib, '/')))" />

      <xsl:value-of select="$SPWebURLString"/>
    </xsl:when>
    <xsl:otherwise>
      <!-- Get List Url Name -->
      <xsl:variable name="ListUrl">
        <xsl:call-template name="StripSlash">
          <xsl:with-param name="text" select="$siteUrl"/>
        </xsl:call-template>
      </xsl:variable>
      <!-- Remove the list name from the url -->
      <xsl:variable name="urlLists" select="substring-before(concat($siteUrl, '/'), concat('/', concat($ListUrl, '/')))" />
      <!-- Remove Lists from the url -->
      <xsl:variable name="Lists">
        <xsl:call-template name="StripSlash">
          <xsl:with-param name="text" select="$urlLists"/>
        </xsl:call-template>
      </xsl:variable>
      <xsl:variable name="SPWebURLString" select="substring-before(concat($urlLists, '/'), concat('/', concat($Lists, '/')))" />

      <xsl:value-of select="$SPWebURLString"/>
    </xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template name="StripSlash">
  <xsl:param name="text"/>
  <xsl:choose>
    <xsl:when test="contains($text, '/')">
      <xsl:call-template name="StripSlash">
        <xsl:with-param name="text" select="substring-after($text, '/')"/>
      </xsl:call-template>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="$text"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>
```


*   The next step is to add the following piece of code somewhere inside the "Results" template.

```xml
<a>
  <xsl:attribute name="href">
    <xsl:call-template name="SPWebUrl">
      <xsl:with-param name="siteUrl" select="sitename" />
      <xsl:with-param name="contentclass" select="contentclass" />
    </xsl:call-template>
  </xsl:attribute>
  <xsl:value-of select="sitetitle" />
</a>
```


*   Click "OK" and save the page.

## Result

Each search result contains the site hyperlink (depending on the location in the result template).
{{< caption-new "/uploads/2011/05/052711_1345_HowtoDispla4.png" "Final Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVUlEQVR4nC3KSQ6AIAwAQP7/Q70JMaIslkJLoAGNiecZdTq36N34kCgXLlRJhvQhMmQ+U4V0b95ZhAMBK5ZWqBN3rlI/voJfjTbeWYgxR2DgztT+8QJv4FUox39kiQAAAABJRU5ErkJggg==" "452" "144" >}}
This solution only works on items and documents. When sites are returned as results, the site url gets broken. To fix this you could check if the result "contentclass" is not equal to "STS_Site".