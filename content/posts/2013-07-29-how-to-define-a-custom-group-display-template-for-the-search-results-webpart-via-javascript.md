---
title: How to Define a Custom Group Display Template (GroupTemplateId) for the Search Results WebPart via JavaScript
author: Elio Struyf
type: post
date: 2013-07-29T19:06:01+00:00
slug: /how-to-define-a-custom-group-display-template-for-the-search-results-webpart-via-javascript/
dsq_thread_id:
  - 3836446652
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - Search
  - Styling
  - Visualisation
  - Web Part
comments: true
---

For my next blog post I needed to investigate how to use a custom Group Display Template for the Search Results WebPart. Unfortunately you can only set the Control Display Template and the Item Display Template in the Search Results WebPart properties.

{{< caption-new "/uploads/2013/07/072913_1905_HowtoDefine1.png" "Display Template Settings Search Results WebPart"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAIAAADw0OikAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABt0lEQVR4nEWRW3ObMBBG+f//q3Yf4mYKjhNsEtsCY4OE7ugK2g64bc7sk87s7O6n7OVlt93+3PzYbDfb8nh68vFRluUxz4vs/XB4/fVa5MW+2L+9HfZFkf/Om9vtvpJJISkdBOeCc0YpZ4wO1CxYa13mnA9aznyY+DAxAiklWGBjZCZmPgTPhtiiifSxbabuDjFAjFwaJm2WrJXvB346qq+KH0tWlhIhdb12p097QRmMoyzLrm1x3eC66euaNDW+ItK2LM8zmOcZ91Pfxb43j9488PjoIyYzIRHjDAB6rqv7cOcamxmbqRZehxkAEsCitZuIjmZ9+iYlSGnR3rtRSyUlZYwLoZTCmDjv4dnNKONchBD8SlyZ1/sXPc8zY4yuiAWZUooxxBgXDQCj1kIIRqlgTK4BE0K01v+0sVJr5QIxEzHRT89kIVs2NMYzbgixXEqqxCCjHsGMYEwG1uLdjpzPCtVDVYnzmZxOCqHEOVwui+YIEaWo4C6EZxrPb0tLasYApS54O47WGGftqHQMcZn8X1OpOow7TDAZ7o+OCSGdE1+fGXgPTeNuN3NFFiFb1wahv1VVfwA+6042M9SSgQAAAABJRU5ErkJggg==" "177" "369" >}}

If you want to specify the group display template, you have two options:

1.  Creating your own Search Results WebPart by extending the default one
2.  Applying a different Group Display Template via JavaScript

In this post I'm only going to explain the second option because I wanted to define it in my custom display templates. It's also easier to have only one Search Results WebPart, so that you do not have to worry when to use which web part.

During the debugging of the default JavaScripts files of SharePoint, I found out that there are three possibilities to set the custom grouping template:

1.  Make the Search Results WebPart think that it's an Content Search WebPart
2.  Overriding the default grouping template reference
3.  Using the set_groupTemplateId function

## First method

I found the first method when I compared the properties of the context from Search Results WebPart and the Content Search WebPart.

### Search Results WebPart

{{< caption-new "/uploads/2013/07/072913_1905_HowtoDefine2.png" "Search Results WP Properties"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAjElEQVR4nE3BWw7CIBAAQO5/rIrfHkDTVgN9UZbHstDK1piYmHRG3FrXPIp8suxZdnzp6qWrsufmnq7tJhazJvQpuoKh7rnupe6Z32U180YoZgPeB3De+xAxRcScC/OxWqiVxWIgRrQW/pxzPmHSSicioccFLBw/n5NhGAGceKlRKR1CIKLtZJpmIvoCY7+oLDq4xWgAAAAASUVORK5CYII=" "563" "311" >}}

### Content Search WebPart

{{< caption-new "/uploads/2013/07/072913_1905_HowtoDefine3.png" "Content Search WP Properties"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAjklEQVR4nBXMyRHDIAwAQPqvMRk/fJCI2BwCCYQFGW8Baw4LRKSqKSUiqrUyVxGJMTr3M193iogOxYRMVJmZuLUWQggxGjh9613HyIVuHToec86cC2I2sO7dh4F4rqt9vWFZ/LahtR5cTGiO/VNSGr0TojBLrcJ8txZDOKw1uwUA9+S5ELPq0885Mefr8n9PyKtHRmQ/dgAAAABJRU5ErkJggg==" "561" "355" >}}

The Content Search WebPart has a Group template property which isn't set on the Search Results WebPart. This property can be accessed via ctx['ClientControl'].$j_4

Inside the SharePoint JavaScript code of the search.clientcontrols.js file, there is a resolveRenderTemplate function which checks the Display Template needs to render. If the $j_4 property is filled in, it will use that reference, otherwise it will retrieve the value from the **RenderTemplateId** property.

To set the $j_4 property, you can use this piece of code:

```javascript
// On-premises
ctx['ClientControl'].$j_4 = "~sitecollection/_catalogs/masterpage/Tests/Clean-Search-Results-Item.html.js";

// Office 365
ctx['ClientControl'].$e_4 = "~sitecollection/_catalogs/masterpage/Tests/Clean-Search-Results-Item.html.js";
```

_Note: when I did some tests on Office 365, I found out that it's using a different property: ctx['ClientControl'].$e_4.
_

## Method 2

When the property isn't set in the previous method, it retrieves the reference from the **RenderTemplateId** property.

You can set the **RenderTemplateId** property like this:

```javascript
if(!$isNull(ctx.ListData.ResultTables[0])) {
  // Override the Group Display Template
  ctx.ListData.ResultTables[0].Properties.RenderTemplateId = "~sitecollection/_catalogs/masterpage/Tests/Clean-Search-Results-Group.js";
}
```

When this property is set, the code verifies and loads the referenced JavaScript file via the **ScriptApplicationManager**.

## Method 3

I found out that there is a better method when I was checking the **Search.ClientControls.debug.js** file. It turn out that you have a function called: **set_groupTemplateId(value)**.

This is the best approach for setting a custom grouping template via JavaScript. You can set this GroupTemplatId property like this:

```javascript
ctx.ClientControl.set_groupTemplateId('~sitecollection/_catalogs/masterpage/Tests/Clean-Search-Results-Group.js');
```

The last thing that needs to be done is to include the custom Group Display Template script in the custom (or default) Control Display Template from the Search Results WebPart.

```html
<script>
  $includeScript(this.url, "~sitecollection/_catalogs/masterpage/Tests/Clean-Search-Results-Group.js");
</script>
```

[Check out my next post about how to use this method to get rid of the unnecessary markup of the Search Results WebPart](https://www.eliostruyf.com/how-to-use-the-search-results-webpart-as-replacement-when-content-search-webpart-is-not-available-in-your-farm/ "How to use the Search Results WebPart as Replacement When Content Search WebPart is not available in Your Farm").

## Updates

### 31/07/2013

Added the third method.