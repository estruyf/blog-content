---
title: How to use the Search Results WebPart as Replacement When Content Search WebPart is not available in Your Farm
author: Elio Struyf
type: post
date: 2013-07-30T10:54:32+00:00
slug: /how-to-use-the-search-results-webpart-as-replacement-when-content-search-webpart-is-not-available-in-your-farm/
dsq_thread_id:
  - 3836446394
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - Styling
  - Visualisation
  - Web Part
comments: true
---

The purpose of this post is to show you how you could use the Search Results WebPart to visualize dynamic data like the Content Search WebPart (CSWP). To help you in this process I created some cleaned up display templates so that it becomes a bit easier to create your own HTML markup in them.

> **Note**: this solution also works on Office 365, that means you don't have to wait until the Content Search WebPart is available on Office 365.

The CSWP is a very simple to work with, compared to the Content Query WebPart we had in SharePoint 2007 / 2010. These days I use it in almost every project, but what happens if your client suddenly says: "Sorry, but we only have the SharePoint Standard edition"? There goes your CSWP implementation. That means you have three (or more) options:

*   Content Query WebPart
*   Search Results WebPart
*   Custom Development (not an option in the project)

The Search Results WebPart is the best option. The Search Results WebPart does the same thing as the CSWP, it fetches results and shows them by using display templates.

Indeed there are differences between the Search Results WebPart and the CSWP. The CSWP is made to visualize dynamic data, that makes it's easier to manage the display templates and allows you to change the property mappings.

{{< caption-legacy "uploads/2013/07/072913_1948_Howtousethe1.png" "Property Mappings in the CSWP" >}}

> **Note**: to be honest, I never change these property mapping, the only time I do this, is when I'm using the diagnostic display template.

But the biggest difference are the display templates they use. The Search Results WebPart display templates are built to show you information in fixed way.

The display templates for the CSWP are used to visualize dynamic data. For example: slideshows, a list of items, etc...

## So they aren't using the same display templates, what now?

The first thing you need to do when you're going to use the Search Results WebPart to visualize dynamic data, is to create new display templates that excludes the <span style="color: black;">unnecessary </span>search results specific HTML markup.

What you wouldn't need is:

*   Scopes, language, sorting
*   Paging
*   Footer information (preference link, alert me)

{{< caption-legacy "uploads/2013/07/072913_1948_Howtousethe2.png" "Search Results Footer Section" >}}

These things can also be hidden by turning of the specific properties in the Search Results. Best is to create a new Control Display Template for the Search Results WebPart, because you will need to add some extra markup in a later step.

## Control Display Template

This is how my cleaned-up Control Display Template looks like:

{{< highlight html "linenos=table,noclasses=false" >}}
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"> 
<head>
<title>Clean Search Results Control</title>

<!--[if gte mso 9]><xml>
<mso:CustomDocumentProperties>
<mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
<mso:MasterPageDescription msdt:dt="string">Displays the Search Results control.</mso:MasterPageDescription>
<mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106601</mso:ContentTypeId>
<mso:TargetControlType msdt:dt="string">;#SearchResults;#</mso:TargetControlType>
<mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
<mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
</mso:CustomDocumentProperties>
</xml><![endif]-->
</head>
<body>
    <script>
    </script>

    <div id="Control_SearchResults">
<!--#_        
        // Don't remove the following line
        ctx.ListDataJSONGroupsKey = "ResultTables";
_#-->
        <div class="sr-clean">
            _#= ctx.RenderGroups(ctx) =#_
        </div>
    </div>
</body>
</html>
{{< / highlight >}}


## Item Display Template

The next step is to create a new Item Display Template. The Item Display Template is used to visualize the mapped properties from your search schema. The default item display templates from the Search Results WebPart are all designed to show search related information (hover panel, etc...).

Here is how a cleaned-up version of an Item Display Template looks like:

{{< highlight html "linenos=table,noclasses=false" >}}
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"> 
<head>
<title>Clean Search Results Item</title>

<!--[if gte mso 9]><xml>
<mso:CustomDocumentProperties>
<mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
<mso:MasterPageDescription msdt:dt="string">This is the item template.</mso:MasterPageDescription>
<mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106603</mso:ContentTypeId>
<mso:TargetControlType msdt:dt="string">;#SearchResults;#</mso:TargetControlType>
<mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
<mso:ManagedPropertyMapping msdt:dt="string">'Title':'Title','Path':'Path','Description':'Description'</mso:ManagedPropertyMapping>
<mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
<mso:CrawlerXSLFile msdt:dt="string"></mso:CrawlerXSLFile>
<mso:HtmlDesignPreviewUrl msdt:dt="string"></mso:HtmlDesignPreviewUrl>
</mso:CustomDocumentProperties>
</xml><![endif]-->
</head>
<body>
    <div id="Item_Site">
<!--#_
        if(!$isNull(ctx.CurrentItem) && !$isNull(ctx.ClientControl)) {
            var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_CleanItem");
            var title = ctx.CurrentItem.Title;
            var path = ctx.CurrentItem.Path;
_#-->
        <div id="_#= encodedId =#_">
            <p><a href="_#= path =#_" title="_#= title =#_">_#= title =#_</a></p>
        </div>
<!--#_ 
        } 
_#-->
    </div>
</body>
</html>
{{< / highlight >}}


## Are we finished?

Not yet, if you are going to apply these two display templates. The results will look ok, but behind the scenes there is still some unnecessary HTML markup you need to get rid of.

{{< caption-legacy "uploads/2013/07/072913_1948_Howtousethe3.png" "Search Results" >}}

Here is a screenshot of the HTML markup. The unnecessary HTML markup is highlighted in green.

{{< caption-legacy "uploads/2013/07/072913_1948_Howtousethe4.png" "Unnecessary HTML Markup" >}}

## Where does this HTML markup come from?

This markup is rendered from the Default Group Display Template of the Search Results WebPart, and will be added when the **ctx.RenderGroups(ctx)** function gets called.

If you compare the Search Results Control template to that of the CSWP one, you will immediately see a difference.

The CSWP Group Template is going to call the Item Display Template to render the items.

The one from the Search Results WebPart does the following things:

*   Creates the promoted result block
*   Creates the ranked result block
*   **Calls the Item Display template**
*   Creates a more results block

> **Note**: these group templates can be found over here > Search Results Group Template (`sitecollection/_catalogs/masterpage/Display Templates/Search/Group_Default.html`) - CSWP Group Template (sitecollection/_catalogs/masterpage/Display Templates/Content Web Parts/Group_Content.html).

A cleaned-up version of the Group Template looks like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"> 
<head>
<title>Clean Search Results Group</title>

<!--[if gte mso 9]><xml>
<mso:CustomDocumentProperties>
<mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
<mso:MasterPageDescription msdt:dt="string">Displays the default group template. Items can be horizontally or vertically depending on how the item template styled.</mso:MasterPageDescription>
<mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106602</mso:ContentTypeId>
<mso:TargetControlType msdt:dt="string">;#SearchResults;#</mso:TargetControlType>
<mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
<mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
</mso:CustomDocumentProperties>
</xml><![endif]-->
</head>
<body>
    <div id="Group_Content">
<!--#_
if(!$isNull(ctx.ClientControl) && ctx.ClientControl.shouldShowTable(ctx.CurrentGroup))
{
    ctx.ListDataJSONItemsKey = "ResultRows";
_#-->
    _#= ctx.RenderItems(ctx) =#_
<!--#_
}
_#-->
    </div>
</body>
</html>
{{< / highlight >}}


## How to call another Group Display Template?

Now that you got the Group Display Template ready, need to let the Search Results WebPart know that it needs to use your custom one, instead of the default one.

You can easily do this by letting the Search Results WebPart know the new Group Display Template (check out this post how it works: [How to Define a Custom Group Display Template for the Search Results WebPart via JavaScript](https://www.eliostruyf.com/how-to-define-a-custom-group-display-template-for-the-search-results-webpart-via-javascript/ "How to Define a Custom Group Display Template for the Search Results WebPart via JavaScript")). To do that, you need to include your Group Display Template script in the Control Template, and setting the reference to the Group Display Template on GroupTemplateId property.

The final Control Template look like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"> 
<head>
<title>Clean Search Results Control</title>

<!--[if gte mso 9]><xml>
<mso:CustomDocumentProperties>
<mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
<mso:MasterPageDescription msdt:dt="string">Displays the Search Results control.</mso:MasterPageDescription>
<mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106601</mso:ContentTypeId>
<mso:TargetControlType msdt:dt="string">;#SearchResults;#</mso:TargetControlType>
<mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
<mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
</mso:CustomDocumentProperties>
</xml><![endif]-->
</head>
<body>
    <script>
        $includeScript(this.url, "~sitecollection/_catalogs/masterpage/Tests/Clean-Search-Results-Group.js");
    </script>

    <div id="Control_SearchResults">
<!--#_        
        // Don't remove the following line
        ctx.ListDataJSONGroupsKey = "ResultTables";

        // Set the Group Display Template
        ctx.ClientControl.set_groupTemplateId('~sitecollection/_catalogs/masterpage/Tests/Clean-Search-Results-Group.js');
_#-->
        <div class="sr-clean">
            _#= ctx.RenderGroups(ctx) =#_
        </div>
    </div>
</body>
</html>
{{< / highlight >}}

The HTML markup that it renders looks like this:

{{< caption-legacy "uploads/2013/07/072913_1948_Howtousethe5.png" "Clean HTML rendered by the Search Results WP" >}}

As you see, the unnecessary HTML markup is removed.

## Search Results WebPart Configuration

To make use of your display templates in the Search Results WebPart, you need to specify the following setting underneath the **Display Templates** section of the web part properties:

*   Results Control Display Template: your custom control template
*   Select **Use single template to display items**
*   Item Display Template: your custom item template

{{< caption-legacy "uploads/2013/07/072913_1948_Howtousethe6.png" "Search Result WP property settings" >}}

That is all, I hope these cleaned-up version help you with creating your own templates.

> **Important**: When you are going to use them, you need to change the Group Display Template URL in the Control template.

## Download

Download the files here:

- [Clean-Search-Results-Group](/uploads/2013/07/Clean-Search-Results-Group.html)
- [Clean-Search-Results-Control](/uploads/2013/07/Clean-Search-Results-Control1.html)
- [Clean-Search-Results-Item](/uploads/2013/07/Clean-Search-Results-Item.html)