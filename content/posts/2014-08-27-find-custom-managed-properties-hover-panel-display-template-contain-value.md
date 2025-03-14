---
title: Find out why custom managed properties in the hover panel display template do not contain a value
author: Elio Struyf
type: post
date: 2014-08-27T07:22:54+00:00
slug: /find-custom-managed-properties-hover-panel-display-template-contain-value/
dsq_thread_id:
  - 3836611299
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

Hover panels are one of the things that make the search experience in SharePoint 2013 a lot better, you instantly retrieve a more information about a search result. Like every other display template, the hover panel templates are easy to create. The difference with a hover panel templates is that they get referenced from within an item display template. This is done with the **Srch.U.getShowHoverPanelCallback** function.

But there is another important thing you need to know when creating these template, and that is the location where you are adding the managed properties to use in the hover panel template.

When you open a hover panel template, you will see a **ManagedPropertyMapping** section at the top of the file (like in most of the display templates). In the default hover panels, this will already contain a couple of mappings, but this is the misleading part of the creation process. The managed properties for your hover panel do not need to be created or mapped in the hover panel template itself. The mapping needs to be done in the associated **item display template**.

> **Note**: the managed property mappings can be removed from the **ManagedPropertyMapping** section of the hover panel template, this will clean up the template, but it is not necessary.

Here is a result of what happens if you map the managed properties in the hover panel template:

{{< caption-new "/uploads/2014/08/082714_0722_Findoutwhyc1.png" "Hover panel without values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdElEQVR4nGXGyw5CIQxFUf7/SyEhFuFy2t4+MFEHJu6swS7u3nt/zvkgEpHzLjOJiJmLuw8i7M0MAVSEAcZOt3AvfmtvVbB5X7iWAp8P1VAtoXqNEXafzBPxlXHMQqSYmQoL8636rwCotbbWxhhzrfnTWusFL6mtlIUvhZUAAAAASUVORK5CYII=" "420" "267" >}}

As you can see, Author and Created do not show any value. If you map these managed properties in the item display template, you get the following results:

{{< caption-new "/uploads/2014/08/082714_0722_Findoutwhyc2.png" "Hover panel with values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAf0lEQVR4nEXHSRLDIAwAQf7/URO8YIRWJHAq5UO65jIpIkrZG0CtVUSe11p3a8ycIuI6DyZSYUFUESYi7NN9zZnCx7Ft516OT0ZoSiREJjyHhWma4f06EQBb4w6MSB1WxBMxVZO7m4ipDjMfNuztt2aWmDnnXEqp990Rof8h4hfQ7qyqmvA3MgAAAABJRU5ErkJggg==" "417" "268" >}}

That is of course good to know, but why do they need to be added in the item display template instead of the hover panel template?

## Why does it need to be mapped in the item template?

The reason why is very simple, in my previous post I talked about a function called **$setResultItem** ([$setResultItem a function that makes or breaks your search experience](https://www.eliostruyf.com/setresultitem-function-makes-breaks-search-experience/)). That function is going to store each of the results in memory. When the hover panel render function **Srch.U.getShowHoverPanelCallback** gets called (which has a reference set to the hover panel template), it will do another call to the **$getResultItem** when rendering the panel. This function **$getResultItem** retrieves the associated result from memory and that result will be set as the current item in the context.

```javascript
renderCtx = {
  ResolveTemplate: resolve,
  CurrentItem: item,
  ScriptApplicationManager: scriptManager
};
```

> **Note**: this is a piece of code from the **renderTemplate** function which sets the item retrieved from memory to the current context (ctx.CurrentItem).

Depending on what you use to retrieve the result, it could either be **ctx.CurrentItem.ManagedProperty** or **$getItemValue(ctx, "Property")**. They both use the current item to retrieve the result information and that is also the reason why the managed properties need to be added in the item display template.

The values which the hover panel display templates retrieves, are coming from the result object that the item display template stored in memory. So, if the manager property is not available in the item display template, it will not be available in the hover panel template.

I hope this has giving you some insight information of why you need to add the managed properties in the item display template.