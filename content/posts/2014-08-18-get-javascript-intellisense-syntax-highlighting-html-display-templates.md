---
title: How to get JavaScript intellisense and syntax highlighting in HTML display templates
author: Elio Struyf
type: post
date: 2014-08-18T12:50:26+00:00
slug: /get-javascript-intellisense-syntax-highlighting-html-display-templates/
dsq_thread_id:
  - 3836535633
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

It is very easy to create your own HTML display templates in SharePoint 2013, but one thing you probably miss the most, is intellisense and syntax highlighting for your JavaScript code. All the JavaScript code needs to be written in a HTML comment, which will eventually be normal JavaScript code when the HTML gets converted.

One way you could solve the intellisense problem is to create a separated JavaScript file and write all the code in it. You could add a reference in the display template or copy and paste the code inside a HTML comment section.

When you choose to create a separated JavaScript file, you need to know that it involves some extra overhead for the browser. Yet another file needs to be loaded on the page. If the code is only necessary in a single display template, it is best to write it in the display template itself.

Once you are starting to write your code in a HTML comment section, it is also difficult to see the typos you make or incorrect use of methods. That is why I took the time to see if there is not a better way to do this.

You could also write your code in the JavaScript version of the display template. Which is a good solution if you know how it works. The HTML part is a bit more difficult write in the JavaScript version, and you show keep the metadata up to date yourself (which is normally automatically done by the HTML template). That is why I prefer working in the HTML version of the display template.

## How can you get intellisense and syntax highlighting inside your templates?

The trick to achieve it is very simple once you know it. You need to create a function in which you write all the JavaScript code and you return the data required for your template.

Now the question is, where are you going to write that function?

The function needs to be created in the script section of the HTML display template. As an example I will rewrite the default two lines display template.

```html
<script>
function getSearchDataForTwoLines(ctx) {
  var itemData = [];

  var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_2lines_");
  itemData["containerId"] = encodedId + "container";

  var linkURL = $getItemValue(ctx, "Link URL");
  linkURL.overrideValueRenderer($urlHtmlEncode);
  itemData["linkURL"] = linkURL;

  itemData["iconURL"] = Srch.ContentBySearch.getIconSourceFromItem(ctx.CurrentItem);

  var line1 = $getItemValue(ctx, "Line 1");
  var line2 = $getItemValue(ctx, "Line 2");
  line1.overrideValueRenderer($contentLineText);
  line2.overrideValueRenderer($contentLineText);

  itemData["line1"] = line1;
  itemData["line2"] = line2;

  return itemData;
}
</script>
```

> **Note**: there can only be one script section in your HTML display template.

I created a new object that will contain all the necessary data for the HTML template, this object is returned at the end of the function. Next is to call the **getSearchDataForTwoLines** function. The only problem is that this function cannot be accessed directly from the comment HTML section. The code in the script section gets placed in a separated function in the JavaScript version of the display template.

The trick to access that function can be done with the same technique SharePoint uses for calling the generated display template functions. Every display template registers its function on the page, and can then be called by another template of web part. The function that is used for this is **Srch.U.registerRenderTemplateByName("name-to-call-the-function", function)**.

So you need to add a function call in the script section:

```javascript
Srch.U.registerRenderTemplateByName("getsearchdatafortwolines", getSearchDataForTwoLines);
```

> **Note**: the name to call your function can best be written in lower case because it gets converted afterwards.

Now that the function is registered, it knows the exact location and can be called within the comment section like this:

```html
<!--#_
  var itemData = Srch.U.getRenderTemplateCollection().getsearchdatafortwolines(ctx);

  var containerId, linkURL, iconURL, line1, line2;
  containerId = itemData["encodedId"];
  linkURL = itemData["linkURL"];
  iconURL = itemData["iconURL"];
  line1 = itemData["line1"];
  line2 = itemData["line2"];
_#-->
```

The only thing which is necessary in the last code block is the function call. It is not necessary to define the variables, it can be done in the HTML template, but it just makes your code a bit cleaner.

Now all the code can be written in the script section, and there you have your intellisense and syntax highlighting.

Let me know what you think about this solution, and if it can speed up your work.

## Download

The example item display template can be found on the following location: [display template with intellisense](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Display%20Template%20to%20get%20intellisense "Display template with intellisense").