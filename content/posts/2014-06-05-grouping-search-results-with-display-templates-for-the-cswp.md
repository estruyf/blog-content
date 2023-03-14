---
title: Grouping search results with display templates for the CSWP
author: Elio Struyf
type: post
date: 2014-06-05T09:36:57+00:00
slug: /grouping-search-results-with-display-templates-for-the-cswp/
dsq_thread_id:
  - 3836535569
categories:
  - Display Templates
  - Office 365
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

This post was something that has been on my to-do list for quite some time, and was also requested by a couple of people. So finally I found the time to work this out.

Back in SharePoint 2010 and 2007 we could easily group the results in the Content Query Web Part, but this functionality isn't included in the Content Search Web Part. In this post I'll how I achieved grouping of the search results with display templates.

## How I did it

You have a couple approaches to achieve this. My approach is to create a new current context **ctx** variable, and add an grouping object to it. In this grouping object I'll store the HTML content for its corresponding group.
For this approach a **control** and **item** display template needs to be created. In the control template the object is created, and will be filled up from data coming from the item template. In the control template a post render event is required to visualize the array values.

### Control Template

This is the code which is in the DIV container of the control template:

{{< highlight html "linenos=table,noclasses=false" >}}
<script>
  Type.registerNamespace('search.Grouping');

  search.Grouping = function() {
    var currentCtx;
    return {
      init: function (currentContext, encodedId) {
        currentCtx = currentContext;

        // Creating a new grouping object
        currentCtx.Grouping = {};

        // Add an on post render callback, this will be excuted when all the results are rendered
        AddPostRenderCallback(currentContext, function() {
          var groupElm = document.getElementById(encodedId);
          search.Grouping.show(groupElm);
        });
      },
      push: function (grouping, content) {
        // Add the markup to the grouping array 
        if (typeof currentCtx.Grouping[grouping] !== "undefined") {
          currentCtx.Grouping[grouping] += content;
        } else {
          currentCtx.Grouping[grouping] = content;
        }
      },
      show: function (groupElm) {
        var groups = currentCtx.Grouping
        // Add the content to the page
        for (var key in groups) {
          groupElm.innerHTML += String.format("<div class='group'><h2 style='color:#000'>{0}</h2>{1}</div>", key, groups[key]);
        }
      }
    }
  }();
</script>

<div id="Control_List">

<!--#_
  var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_Grouping");

  // Grouping init
  search.Grouping.init(ctx, encodedId);

  if (!$isNull(ctx.ClientControl) &&
    !$isNull(ctx.ClientControl.shouldRenderControl) &&
    !ctx.ClientControl.shouldRenderControl())
  {
    return "";
  }
  ctx.ListDataJSONGroupsKey = "ResultTables";
_#-->
  <div id="_#= encodedId =#_">
    _#= ctx.RenderGroups(ctx) =#_
  </div>
</div>
{{< / highlight >}}

The **currentCtx.Grouping** object will be filled with data from the item template with the HTML code of the result and the corresponding group value. In the estruyf.Grouping.init method, you find the **AddPostRenderCallback** method which will call the estruyf.Grouping.show method to visualize the HTML content.

### Item Template

First of all for the item template I configured the following **ManagedPropertyMapping**:

{{< highlight html "linenos=table,noclasses=false" >}}
<mso:ManagedPropertyMapping msdt:dt="string">'Link':'Path','Line 1'{Line 1}:'Title','Grouping':'SiteTitle'</mso:ManagedPropertyMapping>
{{< / highlight >}}

The **Grouping** property is the most important one, this is be used for configuring on which field the grouping needs to be set. The reason I went for this approach is that you can easily configure the field to set up the grouping on (in the next section **how to use it**, I'll describe how to use the templates, and how to set up another field to group on).

The next step is the code:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
var line1 = $getItemValue(ctx, "Line 1");
var grouping = $getItemValue(ctx, "Grouping");
var linkURL = $getItemValue(ctx, "Link");

// HTML Markup
var content = String.format('<div class="cbs-Item"><a class="cbs-Line1Link ms-noWrap ms-displayBlock" href="{0}" title="{1}">{1}</a></div>', linkURL, line1);

// Push the content to the grouping object
search.Grouping.push(grouping, content);
{{< / highlight >}}

As you can see, there isn't any is HTML written, everything done in JavaScript and will be visualized in the control template.

## How to use it

When you place the control and item display templates in the master page gallery of your site (the link to the files is at the bottom of the page), the following two templates become available in your Content Search Web Part:

{{< caption-legacy "uploads/2014/06/060514_0936_Groupingsea1.png" "Grouping templates" >}}

By default, it will sort everything on the Site Title managed property. This looks like this:

{{< caption-legacy "uploads/2014/06/060514_0936_Groupingsea2.png" "Grouping Results" >}}

You could also change the grouping property if you want. This can be done by overwriting the property mappings in the web part properties:

{{< caption-legacy "uploads/2014/06/060514_0936_Groupingsea3.png" "Group field mapping" >}}

The result will look a bit different now:

{{< caption-legacy "uploads/2014/06/060514_0936_Groupingsea4.png" "Results grouped on contentclass" >}}

## How to change the HTML output

If you want to change the HTML output, you will need to do two things:

1.  In the **item template** you need to change the HTML which is stored in the **content** variable;
2.  In the **control template** you need to update the HTML code which is written in the **estruyf.Grouping.show** method.

## Download

My display templates can be downloaded from the SPCSR GitHub project: [Result Grouping Templates (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Result%20Grouping%20Templates%20(CSWP) "Result Grouping Templates \(CSWP\)")

## Updates

### 1/12/2014

The code for this solution has been updated. Now the grouping object is not added on the **ctx** object, but it is added on our own **currentCtx** object.