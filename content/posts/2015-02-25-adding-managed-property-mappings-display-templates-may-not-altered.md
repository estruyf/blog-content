---
title: Adding managed property mappings to your display templates which may not be altered
author: Elio Struyf
type: post
date: 2015-02-25T09:54:17+00:00
excerpt: This post describes how you can add managed property mappings to your display template that cannot be altered in the UI of the Content by Search Web Part.
slug: /adding-managed-property-mappings-display-templates-may-not-altered/
dsq_thread_id:
  - 3836535714
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

One of the interesting things about display templates is that you can add managed property mappings that can be managed in the SharePoint UI. This allows users to define which properties they want to use in their templates.

{{< caption-new "/uploads/2015/02/022515_0954_Addingmanag1.png" "Property mappings" >}}

Now as a display template creator, it could be that you want to be in control so that the end user cannot make changes to certain properties in the UI. For example: you want to make sure that the users cannot modify the property mapping that corresponds to the path of the document or item.

## How to create a private property

The good news is that this functionality is by default available in your display templates, so you do not need to write extra code for this. What you need to do is adding the property mapping in a specific way to the **ManagedPropertyMapping** tag in the display template.

When adding additional property mappings to a display template, most of the time you will add them like this:

*   'property Name'{property display name}:'managed property'
*   'property Name':'managed property'

If you add properties mappings to the **ManagedPropertyMapping** tag like the two examples above, they will become available in the UI of the Content by Search Web Part.

There is another way of adding properties to your template and this is by just defining the managed property name like this:

*   'managed property'

> **Important**: you do not define a property name, only the managed property. If you do it like this, you create a "private" property for your template.

Here is an example of one of the OOTB templates:

```html
<mso:ManagedPropertyMapping msdt:dt="string">'Link URL'{Link URL}:'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:'','FileExtension','SecondaryFileExtension'</mso:ManagedPropertyMapping>
```

In this managed property mappings attribute **FileExtension** and **SecondaryFileExtension** are available to use in the template, but cannot be modified in the UI:

{{< caption-new "/uploads/2015/02/022515_0954_Addingmanag2.png" "Two lines property mappings" >}}

When you want to make sure that users cannot change the Link URL property, you will need to remove the text that is highlighted in yellow: <span style="background-color: yellow;">'Link URL'{Link URL}:</span>'Path' from the **ManagedPropertyMapping** tag.

```html
<mso:ManagedPropertyMapping msdt:dt="string">'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:'','FileExtension','SecondaryFileExtension'</mso:ManagedPropertyMapping>
```

{{< caption-new "/uploads/2015/02/022515_0954_Addingmanag3.png" "Property mappings without link URL" >}}

## How can I retrieve these "private" property values?

Retrieving values from these "private" properties is no different than the other properties mappings. You can make use of **$getItemValue(ctx, 'Managed Propery')** or **ctx.CurrentItem.ManagedProperty** to retrieve the value.

Normally when using $getItemValue, you specify the property name. With a private property this is not available, so you can just define the managed property name instead.