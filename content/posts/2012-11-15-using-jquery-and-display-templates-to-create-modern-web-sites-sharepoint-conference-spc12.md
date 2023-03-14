---
title: Using jQuery and Display Templates to create Modern Web Sites (SharePoint Conference – SPC12)
author: Elio Struyf
type: post
date: 2012-11-14T23:10:55+00:00
slug: /using-jquery-and-display-templates-to-create-modern-web-sites-sharepoint-conference-spc12/
dsq_thread_id:
  - 3836445936
categories:
  - Branding
  - Search
  - SharePoint 2013
  - SPC12
comments: true
---

In this session we’ll deep dive on how to use modern web tools like jQuery and CSS3 to build dynamic, search-driven web sites. We’ll show you how to create custom Display Templates that provide modern and interactive experiences to your online users.

Ethan Gur-esh, Jeremy Kelley gave this session.

## Summary

### Display templates

#### Logical Model of Display Templates

**Web Part**

Specifies the query and templates to use

Triggers templates when search results are available.

**Control Template**

Determines how to lay the items out on the page

Rendered once per web part on the page

**Item Template**

Determines how each item should look.

Rendered sequentially, once per search result item

**Control template**

After all items rendered, control template finishes rendering

**Always work with the HTML of the display template**.(I think I mentioned it enough by now)

#### Display template creation

Start by copying an existing one.

Include a language specific script in the display template: $includeLanguageScript(this.url, “<link-to-the-file>”) > use {Locale} in the link for the Country Code

Insert a normal script: $includeScript(this.url, “<link-to-the-file>”)

Write JavaScript between the following tags in a display template: <!&#8211;#_ _#&#8211;>

If you have want to use a lot of JavaScript it is best to create a separate JavaScript file and reference it via the new methods.

This is callback that can be used to execute a JavaScript function when the display template is loaded: $addRenderContextCallback(ctx, “OnPostRender”, <function-that-you-want-to-call>)

#### Getting data into CS display templates

Display templates specify inputs for data: metadata locations from the item.

Inputs are filled in with search managed properties specified by: <mso:ManagedPropertyMapping msdt:dt=”string”>’Price’:’BasePrice’<mso: ManagedPropertyMapping /> in the display template HTML file.

If you know that it is a multi-value property you can set up a fallback scenario if the first one does not contain a value. This can be done like this: ‘Price’:’BasePrice’;’NormalPrice’;’TotalPrice’

Include CSS into your display template: $includeCSS(this.url, “<link-to-the-file”)

Managed properties can be included into your elements like this: \_#= <managed-property-name> =#\_

GetPictureMarkup returns an image rendition based on dimensions.

Srch.ContentBySearch.getPictureMarkup()

#### Tying item and control templates together

You can use any (Control, Item) Templates combinations.

However, you may want to think about your designs as tightly coupled.

If you want to save information in the display template about the item that you want to use in the future, you can push the data to an array.

_Preview pane – recap_

Use OnPostRender to initialize information that is not dependent on individual result data

Save data for your event handlers using JavaScript

Inputs are all treaded as strings so validate data before using it

#### Search data provider

This provider can be shared between multiple web parts, or local to a single web part

This means that you can easily create inter-connected search experiences.

#### Interacting with search query context

You can manipulate search query context via JavaScript, creating dynamic experiences.

ctx.ListData

ctx.CurrentItem

ctx.ClientControl

For example this can be used to create an infinite scrolling search experience.

### Refiners

How refiners work: they modify the search context. The content ssearch display templates “just work” with refiners.

You can create your own refiners by creating new display templates.

A blog post will follow from Microsoft on how to create your own refiners after the conference.