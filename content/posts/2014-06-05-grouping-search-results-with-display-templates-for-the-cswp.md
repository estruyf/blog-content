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

```html
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
```

The **currentCtx.Grouping** object will be filled with data from the item template with the HTML code of the result and the corresponding group value. In the estruyf.Grouping.init method, you find the **AddPostRenderCallback** method which will call the estruyf.Grouping.show method to visualize the HTML content.

### Item Template

First of all for the item template I configured the following **ManagedPropertyMapping**:

```html
<mso:ManagedPropertyMapping msdt:dt="string">'Link':'Path','Line 1'{Line 1}:'Title','Grouping':'SiteTitle'</mso:ManagedPropertyMapping>
```

The **Grouping** property is the most important one, this is be used for configuring on which field the grouping needs to be set. The reason I went for this approach is that you can easily configure the field to set up the grouping on (in the next section **how to use it**, I'll describe how to use the templates, and how to set up another field to group on).

The next step is the code:

```javascript
var line1 = $getItemValue(ctx, "Line 1");
var grouping = $getItemValue(ctx, "Grouping");
var linkURL = $getItemValue(ctx, "Link");

// HTML Markup
var content = String.format('<div class="cbs-Item"><a class="cbs-Line1Link ms-noWrap ms-displayBlock" href="{0}" title="{1}">{1}</a></div>', linkURL, line1);

// Push the content to the grouping object
search.Grouping.push(grouping, content);
```

As you can see, there isn't any is HTML written, everything done in JavaScript and will be visualized in the control template.

## How to use it

When you place the control and item display templates in the master page gallery of your site (the link to the files is at the bottom of the page), the following two templates become available in your Content Search Web Part:

{{< caption-new "/uploads/2014/06/060514_0936_Groupingsea1.png" "Grouping templates"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nE3MSQ6EIBAFUO5/SzcdsakgKsWHGuwENv22fwgd7XthIxz32Aif0t/panLcI9Racz77EDVXNTVfzFxUQ32eGI+UEhHte0SDTcwcYwxjDBGZdVNVd1/nSzhzLuVC7zKzNXV3EWHm0JhLKTmfAP5jAET0AxdLrjVUEh8eAAAAAElFTkSuQmCC" "203" "123" >}}

By default, it will sort everything on the Site Title managed property. This looks like this:

{{< caption-new "/uploads/2014/06/060514_0936_Groupingsea2.png" "Grouping Results"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAIAAAA7jDsBAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABKUlEQVR4nHWQ6WrEMAyE/f5v2F+lsGWbTZz4lHXZKdrsQdutGIzgk+RhnI/4dsrTiipdWIX7VSqsKt21TGGuJTSImFeoW4OEJbToa43oQHpCTagZNTWNTTYQ6WO/liuka5WtSmwSwJgvInrHGdUX9oXXYkPWVJkznwM17g6lN+4oTzXuQNaMsbsAcsnsi91cMl8S+ypT4iXzsL9R18oBZCkGNpC5cEHd990wSQe+HjTp0dDDWgS7aauFvyJNye4HkOc269AxtA/p9mof5urYPq14SXzM/i1XSYH6K3THFlaVtZr5xj9GHWsnMbGa/0faN7wkep/hY2lTpDnRw9QNryCfgc6RKukYvw06Am4JhSymF9awSc0o/A+uCZOH5GG7lOghLJWaRXbgb4a8SAjBmJbaAAAAAElFTkSuQmCC" "231" "465" >}}

You could also change the grouping property if you want. This can be done by overwriting the property mappings in the web part properties:

{{< caption-new "/uploads/2014/06/060514_0936_Groupingsea3.png" "Group field mapping"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAnUlEQVR4nG3O2wrCMBAE0Pz/RypozaZmm0tpdrO5tBJBsOhhXuZhYFSM8RmSdht4umHyW66lSJbW2nEcCgAMGLTWLQsAoEVrETQ454lILYgPbVJKIkJEmfNIzjSwqm3Y9/34R033iZlba/WslBJjVIiYEpUy+jcRWddVzWbOWXrvv+sQgkKL3nkR6f394qPWOp4bgOvlqrWWM2ZGxBenWAMCs+7nZgAAAABJRU5ErkJggg==" "204" "193" >}}

The result will look a bit different now:

{{< caption-new "/uploads/2014/06/060514_0936_Groupingsea4.png" "Results grouped on contentclass"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAIAAAA7jDsBAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABS0lEQVR4nGVR2Y4jMQj0///izssmE02mD3f74MadFZ1Ee6ESKgm7KCB9rXj9hh+3evmG6wSAqmzCJqQmnqhJywiF+k59I9gJa/CSEZok0FHYm3jlIPsJP47HGamL72gbWGWv5IVsAzUfxxlpR1u6Li2QQeema9e56m1n0pHYBtsQP8RGwAfpQB3q43g80gY2Nc3dcg+ZKX7bVEMjelfyDLajzU3Wbhva0rSzv6yJhRqf+UlQh9rbee669JBaut6LzC30C/3xW2wAO6qDeD8JipuPKF8Xuqz0udK9yC3zZaGfK31mvheOMkr0e0r9HwnEC4f5DWIw+vtpArKOiuJsA8TVX57f5UJlBn0P+q+4sDEZoxKc6OrnOp83S9w4blwiU2Oq7PpbKVW2Qj433dAyvpZ633muYn6kr50/JviYcGnSyApaiRNoQTM/fgFPVERlhpeOwQAAAABJRU5ErkJggg==" "191" "383" >}}

## How to change the HTML output

If you want to change the HTML output, you will need to do two things:

1.  In the **item template** you need to change the HTML which is stored in the **content** variable;
2.  In the **control template** you need to update the HTML code which is written in the **estruyf.Grouping.show** method.

## Download

My display templates can be downloaded from the SPCSR GitHub project: [Result Grouping Templates (CSWP)](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Result%20Grouping%20Templates%20(CSWP) "Result Grouping Templates \(CSWP\)")

## Updates

### 1/12/2014

The code for this solution has been updated. Now the grouping object is not added on the **ctx** object, but it is added on our own **currentCtx** object.