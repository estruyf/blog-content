---
title: How to load scripts that are required for your item display template rendering
author: Elio Struyf
type: post
date: 2017-09-21T18:36:21+00:00
slug: /how-to-load-scripts-that-are-required-for-your-item-display-template-rendering/
dsq_thread_id:
  - 6160603189
categories:
  - Development
  - Display Templates
  - SharePoint
comments: true
---

Based on the number of questions I receive in my mailbox, I can see that display templates are not yet forgotten. A long time ago, I wrote about how to correctly include scripts into your display templates.

> **Read more**: [Correctly including scripts into your display templates](https://www.eliostruyf.com/correctly-including-scripts-display-templates/)

The main issue when using the default functions (for example $includeScript) to include scripts into your templates, is that they are loading your scripts asynchronously. So, you never know when they are ready to be used. Which could be a problem when your code is dependent on that script.

In the article I wrote, I explain how to make use of the **RegisterSod** and **EnsureScriptFunc** functions to make sure the script is loaded before executing your code. This approach works great in control display templates and after your display templates rendered. Like for example, you could use the approach to make sure the display template loads jQuery and a slideshow plugin and starts cycling after the content has been rendered.

Now there is one thing which I did not yet cover in the article. That is a way to provide how you could load a script which is required for correctly rendering your item display template.

Most of the questions I received were about loading [Moment.js](https://momentjs.com/) for some advanced date rendering of the managed property values. In this article, I will show you a way to achieve this. Of course, this approach can be used for any other thing you want to achieve.

## It all starts in the control display template

You might ask yourself, why the control display template? That is because this template is the first template which gets loaded so we can do the registration of the scripts in that one. Another reason is that it is much easier to develop it via the control display template. Otherwise, you would have to create a lot of script load checks and DOM manipulations to get it working.

The first step is to register your script to load. This can be done like this:

```typescript
RegisterSod('moment.min.js', "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js");
```

Next is to write the **EnsureScriptFunc** function, which makes sure your registered script gets successfully loaded. One major change is that we will move all the code from the control display template into this function.

```typescript
AddPostRenderCallback(ctx, function() {
  // Ensure that the item script dependency is loaded
  EnsureScriptFunc("moment.min.js", 'moment', function() {
    ctx.ListDataJSONGroupsKey = "ResultTables";
    var $noResults = Srch.ContentBySearch.getControlTemplateEncodedNoResultsMessage(ctx.ClientControl);

    var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl) {
        var iStr = [];
        iStr.push('<li>');
        iStr.push(itemRenderResult);
        iStr.push('</li>');
        return iStr.join('');
    }
    ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;

    // Retrieve the placeholder element
    var elm = document.querySelector('#' + uniqueId);
    if (elm !== null) {
      // Render the results
      var resultsHtml = ctx.RenderGroups(ctx);
      // Check if the no results message need to be displayed
      if (ctx.ClientControl.get_shouldShowNoResultMessage()) {
        elm.innerHTML = '<div class="ms-srch-result-noResults">' + $noResults + '</div>';
      } else {
        // Render the items on the page
        var markup = [];
        markup.push('<ul class="cbs-List">');
        markup.push(resultsHtml);
        markup.push('</ul');
        elm.innerHTML = markup.join('');
      }
    }
  });
});
```


> **Important**: you can also see that there is a **AddPostRenderCallback** function defined. The reason this function has been included is to support async updates.

Due to the change of placing the code in the **EnsureScriptFunc** function, the way to render the display template markup on the page also had to change. Instead of giving the display template control over the rendering, our code will add the HTML onto the page.

In the code, you have to make use of a placeholder element to which add the HTML markup once it is retrieved.

The following is required for the placeholder element:

```typescript
var uniqueId = ctx.ClientControl.get_nextUniqueId();
```


> **Info**: Add this above the AddPostRenderCallback function.

The last thing to add to the control template is the placeholder element:

```html
<div id="_#=uniqueId=#_"></div>
```

Once you have all this in place, the control display template will first load the script dependency before rendering the item display template. By doing this, you can now make use of **moment** in the item display template. No other change is necessary for the item display template.

{{< caption-new "/uploads/2017/09/092117_1826_Howtoloadsc1.png" "Sample of the item display template rendering with moment.js" >}}

## Download the templates

To make it easier I shared the display templates I created for this sample here: [Item display template script dependency](https://github.com/estruyf/blog/tree/master/Item%20display%20template%20script%20dependency).