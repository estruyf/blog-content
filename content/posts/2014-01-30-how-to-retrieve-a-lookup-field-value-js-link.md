---
title: How to Retrieve a Lookup Field Value in JS LINK
author: Elio Struyf
type: post
date: 2014-01-30T10:55:20+00:00
slug: /how-to-retrieve-a-lookup-field-value-js-link/
dsq_thread_id:
  - 3836446354
categories:
  - JavaScript
  - SharePoint 2013
  - Styling
tags:
  - CSR
  - JavaScript
  - JS LInk
  - Styling
comments: true
---

This week I received a question from someone asking me about how you could retrieve the value from a lookup field in a JS Link field rendering file.

## Solution

Retrieving the value from a lookup field is easier than it used to be when working with XSL in SharePoint 2007 / 2010. With the new ways of rendering your items / fields, you don't have to remove the prefixes (item id ;#) anymore.

What you have to do is check if the object you retrieve contains data. Once you know that it contains data, you can obtained the value(s). Here is a code sample of how you could do it:

```javascript
var lookupSample = lookupSample '' {};

lookupSample.CustomizeFieldRendering = function () {
  // Intialize the variables for overrides objects
  var overrideCtx = {
    Templates: {
      Fields: {
        'singleLookupValue': { 
          'View' : lookupSample.singleLookupValue
        },
        'multiLookupValue': { 
          'View' : lookupSample.multiLookupValue
        }
      }
    }
  };

  // Register the override of the field
  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
}

lookupSample.singleLookupValue = function (ctx) {
  var output = [];

  var field = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
  // Check if field contains data
  if (field.length > 0) {
    // field[0].lookupId -> gives you the linked item ID
    var lookupValue = field[0].lookupValue;
  }
  // Push the value to the array
  output.push(lookupValue);
  return output.join('');
}

lookupSample.multiLookupValue = function (ctx) {
  var output = [];

  var field = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
  // Check if field contains data
  if (field.length > 0) {
    output.push('<ul>');
    for (i = 0; i < field.length; i++) {
      output.push('<li>');
      output.push(field[i].lookupValue);
      output.push('</li>');
    }
    output.push('</ul>');
  }

  return output.join('');
}

lookupSample.CustomizeFieldRendering();
```

In the code I showed you two examples:

*   The first one **singleLookupSample** can be used when you're working with a single lookup value;
*   The second one **multiLookupSample** can be used when you're working with multi lookup values.
The result of the rendering looks like this:

{{< caption-new "/uploads/2014/01/013014_1055_HowtouseaLo1.png" "Lookup Value Example" >}}