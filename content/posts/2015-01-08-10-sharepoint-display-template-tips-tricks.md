---
title: My 10 SharePoint display template tips and tricks
author: Elio Struyf
type: post
date: 2015-01-08T13:43:27+00:00
slug: /10-sharepoint-display-template-tips-tricks/
dsq_thread_id:
  - 3837037243
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

In this post I tell you my 10 tips and tricks that could help you when creating your display templates.

## Tip 1: only do your changes in the HTML files, except if you know what you are doing

Best is to do your changes in the HTML version of the display template, otherwise you could end up with a corrupt JavaScript file. Making the changes in the HTML version is much easier.

For the people that are creating display templates in JavaScript, you can ignore this tip, you already know how it works.

## Tip 2: do not modify OOTB display templates, create a copy instead

Back in SharePoint 2007 and 2010 most of us applied changes to the ItemStyle.xsl for the Content Query Web Part. If you created your own version of the XSL file, you needed to create a copy of the webpart file and update the XSL reference.

In SharePoint 2013 it is much easier to do modifications to display templates and it is not required to update references. So if you need to update an OOTB template, just create a copy. By creating a copy, an update from SharePoint or feature re-activation will not override the template.

## Tip 3: where did I place my custom display templates?

Do not make it hard for yourself by placing custom display templates in the default master page location. Just create a project folder in the root of the master page gallery and add the templates to that folder. This will make things easier for everyone.

## Tip 4: what to do if you have a lot of code to write

If you have a lot of code to write, I would suggest to move the code to a separated JavaScript file. This makes it easier to debug your code and it can be re-used by other templates.

When you want to keep the code in the template itself. I would suggest to check out my post about how to get syntax highlighting in the HTML display templates: [How to get JavaScript intellisense and syntax highlighting in HTML display templates](https://www.eliostruyf.com/get-javascript-intellisense-syntax-highlighting-html-display-templates/ "How to get JavaScript intellisense and syntax highlighting in HTML display templates"). This will make it easier to spot errors in your code.

## Tip 5: how to provision display templates?

You have two ways to provision display templates:

1.  Provisioning the HTML file
2.  Provision only the JS template
My approach is to only provision the JS version of the display template to your sites and keep the HTML display templates in a separated project for your development environment.

The advantage of only provisioning the JS version is that the publishing feature does not need to be activated on the site, and that you do not need an event receiver to trigger the conversion from HTML to JS.

## Tip 6: check the managed property values and types you retrieve

It could save you some debugging time if you know what type of values you retrieve. For example if you expected a DateTime value, and you retrieve a string instead, you would not be able to perform the same actions.

To find out which values and types you retrieve, check out my [Ultimate Diagnostic display template](https://www.eliostruyf.com/ultimate-diagnostic-display-template/ "Ultimate Diagnostic display template"). Another tool that could help you is the [SharePoint 2013 Search Query Tool](https://sp2013searchtool.codeplex.com/ "SharePoint 2013 Search Query Tool").

## Tip 7: use $getItemValue(ctx, 'managed property') instead of ctx.CurrentItem.ManagedProperty

These two methods should give you the same values, but that is not always true. The $getItemValue method checks the suffix of the managed property name and it will convert it to the correct type if it is an auto-created property.

Auto-created managed properties have a suffix like OWSDATE behind it. In case of a date it is very important, because SharePoint stores them as text and not as string.

So if you would use ctx.CurrentItem.ManagedProperty to retrieve the managed property, you will get a text value. If you used the $getItemValue method, you retrieve a Date object.

Another advantage of using the $getItemValue method is when you are using fallback managed properties. For example if you have the following mapping: location:"country;region;city". When you do it with ctx.Currentitem, you will need to add a check to know if country is empty, so that you can retrieve the region value. Another check for the region value needs to be added to retrieve the value from city if it is empty. This are some additional lines of code that can be avoided if you use the $getItemValue method. $getItemValue will automatically retrieve the fallback managed property value if the first one is empty.

## Tip 8: dare to open the JavaScript display templates to find your syntax errors

Most of the JavaScript in HTML display templates is written in a comments sections. Which means that it is hard to spot syntax errors. Opening the JavaScript version of the template will make it easier to spot these syntax errors.

## Tip 9: keep in mind that it is client side rendering

When creating display templates that need to do a lot of stuff, they could give some performance issues for your clients. So try to keep the templates as clean as possible and as fast as possible.

**Keep it clean, keep it fast.**

## Tip 10: learn what you can do with JavaScript

Once you know the possibilities of JavaScript and SharePoint, you could make some marvellous templates. Also try out some frameworks.

## Extra - Tip 11: want to do DOM changes?

Use the AddPostRenderCallback method when you want to do DOM changes. That way you are sure that it happens when the display template is done rendering.

## Changes

### 18/02/2015

Updated tip 7 with the fallback managed property example from Mikael Svenson.