---
title: Rendering results from multiple item display templates in the CSWP
author: Elio Struyf
type: post
date: 2015-05-13T13:19:38+00:00
slug: /rendering-results-from-multiple-item-display-templates-in-the-cswp/
dsq_thread_id:
  - 3836884650
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

A few weeks ago a customer asked me if it was possible to create a display template which visualizes article results according to the page layout that got used. This customer has various types of articles and page layouts set up in their environment. The display template was required for the main roll-up of the articles and users had to have the same experience as going to the article itself.

> **Note**: The approach that is described in this article is not limited to only page layouts. The approach can also be used for other managed property values. For example if you want to visualize the results accordingly from the site location they were retrieved or based on their content type.

## Problem

When you want to visualize search results, the easiest approach is to use the Content by Search Web Part (CSWP), but there is one major problem when using this web part. The CSWP allows you to define only one **item** display template. That means that you need to define all the styles into one item display template. Depending on the number of styles you have to define, this item display template would get enormous and it gets difficult to maintain.

A better approach would be to have a display template for each style like you could do with result types for the Search Result Web Part. Having multiple display templates makes it easier to maintain each individual styling, but it requires to have a mechanism to load these templates.

An idea I to load these templates was to create a template which I call the "routing" template. This routing template is an item display template which has a number of checks in place to load the right display template and render the results.

> **Note**: Another approach would be to make use of the Search Result Web Part and creating result types for all the styles. Be aware that this approach could have an impact for the visualization of results in your search center (if you define them on the same level). The approach itself also requires some configuration to get everything correctly configured.

## Routing template

As mentioned the routing template is just an item template which contains a couple of checks. These checks all start with an array in which you define the managed property value and the matching template to load.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
var defaultLayout = 'Item_BodyOnly.js';
var layouts = { 
    'PageFromDocLayout.aspx' : 'Item_BodyOnly.js',
    'ArticleLeft.aspx' : 'Item_ImageLeft.js',
    'ArticleRight.aspx' : 'Item_ImageRight.js',
};
{{< / highlight >}}

Next, you write the code to retrieve the display template that needs to get loaded from the array.

> **Important**: you need to add the managed property you want to check to the ManagedPropertyMapping attribute. In this example PublishingPageLayoutOWSURLH is used. This managed property holds the page layout URL that got used for the article.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
var pageUrl = $getItemValue(ctx, 'PublishingPageLayoutOWSURLH');
if (!pageUrl.isEmpty) {
    // Get the page name 
    var url = pageUrl.value[0].value;
    if (!$isEmptyString(url)) {
        // Retrieve the corresponding display template
        var pageName = url.substring(url.lastIndexOf('/') + 1);
        // Retrieve the display template to load from the array
        var dtName = layouts[pageName];
        // Check if a display template value is retrieved
        if ($isEmptyString(dtName)) {
        	// Use the default display template
            dtName = defaultLayout;
        }

        /* NEXT CODE SNIPPET */
    }
}
{{< / highlight >}}

On line 4, the page layout value is retrieved and looks like this:

`http://site-url/_catalogs/masterpage/PageFromDocLayout.aspx`

On line 7 the page name gets retrieved from the URL. This is required to get the display template which is defined in the array.

> **Note**: If you want to work with another managed property like the site location or content type, you have to define the values in the **layouts** array and modify the code to make it work for your managed property.

If the managed property value did not exist in the array (in this example it would be a page result with a page layout which is not defined), a default layout gets set to visualize the result. This is done on lines 11 - 14.

Once you know the filename of the display template to load, you have to write the code to get the display template loaded. Loading the display template can be done with the following code:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Load the display template for the corresponding page layout
var dtUrl = '~sitecollection/_catalogs/masterpage/Tests/';
var dtFullUrl = dtUrl + dtName;
// Register the display template to load
RegisterSod(dtName, Srch.U.replaceUrlTokens(dtFullUrl));

(function (id) {
	// Load the display template
    EnsureScriptFunc(dtName, null, function () {
    	// Retrieve the display template function
        var templateFunc = Srch.U.getRenderTemplateByName(dtFullUrl, null);
        // Render the display template
        var markup = CoreRender(templateFunc, contexts[id]);
        // Render the markup retrieved from the template on the page
        render(markup, id);
    });
})(id);
{{< / highlight >}}

On the second line you define the location where your display templates can be found. Once the display template is loaded, the **CoreRender** function gets called which will render the item mark-up. This mark-up needs to be added to the DIV element defined in the routing template, this is done by calling the **render** function on line 15.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
var render = function (markup, id) {
    var elm = document.getElementById(id);
    if (!$isNull(elm)) {
        elm.innerHTML += markup;
    }
};
{{< / highlight >}}

The render function is nothing special, it retrieves the DIV element of the current item and appends the item display template mark-up to it.

Once the code is in place, you configure the CSWP to use routing template as the item display template.

{{< caption-legacy "uploads/2015/05/051315_1319_Renderingre1.png" "Configure to load the routing template" >}}

Here you can see a simple result output:

{{< caption-legacy "uploads/2015/05/051315_1319_Renderingre2.png" "Routing template loaded and rendered three other templates" >}}

Here I have three different item display templates: Item_BodyOnly.js, Item_ImageLeft.js, Item_ImageRight.js. In these display templates I defined a block with a different background color, the display template filename and page title.

## Adding managed properties

If you want to add new managed property mappings to one of the item display templates, you also have to add the same managed property mapping in your routing template. The reason for this is because the CSWP is not aware of your item display templates, it only knows the property mappings which are defined in the routing template.

Once the routing template is loaded, this template passes the current processed result with its managed properties to the item template.

### Example

For example if you map the author managed property in the Item_ImageLeft.html display template like this:

{{< highlight html "linenos=table,noclasses=false" >}}
/* BEFORE */
<mso:ManagedPropertyMapping msdt:dt="string">'Path','Title':'Title'</mso:ManagedPropertyMapping>

/* AFTER */
<mso:ManagedPropertyMapping msdt:dt="string">'Path','Title':'Title','Author':'Author'</mso:ManagedPropertyMapping>
{{< / highlight >}}

You will also have to add this 'Author': 'Author' mapping in the Item_Routing.html display template:

{{< highlight html "linenos=table,noclasses=false" >}}
/* BEFORE */
<mso:ManagedPropertyMapping msdt:dt="string">'PublishingPageLayoutOWSURLH','Path','Title':'Title'</mso:ManagedPropertyMapping>

/* AFTER */
<mso:ManagedPropertyMapping msdt:dt="string">'PublishingPageLayoutOWSURLH','Path','Title':'Title','Author':'Author'</mso:ManagedPropertyMapping>
{{< / highlight >}}

Once you have done this and you refresh the page the Item_ImageLeft results should now include the author name.

{{< caption-legacy "uploads/2015/05/051315_1319_Renderingre3.png" "Updated Item_ImageLeft.js template" >}}

## Download and using the templates

The templates that have been created for this article can be found on the SPCSR respository on GitHub: [Loading and rendering other display templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Loading%20and%20rendering%20other%20display%20templates).

If you want to make use of the templates, make sure to update the **defaultLayout** variable and **layouts** array in the **Item_Routing.html** display template.