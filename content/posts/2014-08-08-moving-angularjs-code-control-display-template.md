---
title: Moving all your AngularJS code to the control display template – part 3
author: Elio Struyf
type: post
date: 2014-08-08T09:20:37+00:00
slug: /moving-angularjs-code-control-display-template/
dsq_thread_id:
  - 3836535636
categories:
  - Display Templates
  - Office 365
  - SharePoint 2013
tags:
  - AngularJS
  - Display Templates
  - JavaScript
  - Search
comments: true
---

The last two post were about how to create display templates that make use of AngularJS. Another thing I was thinking of is if it is possible to move all the code from the item template to the control template, so that the item display template can be ignored. Moving all the code to the control display template is possible, but fully eliminate the item display template is not possible. The item display template is necessary for the property mappings, but by moving the code, you only need to maintain the control display template.

This post shows you how to move all the code from the item display template to the control template.

## Item template

As said in the introduction, the item template is still needed for the property mappings, but the rest of the code can be removed. That means everything within the first **DIV** element may be removed completely.

```html
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"> 
<head>
  <title>AngularJS Part3</title>

  <!--[if gte mso 9]><xml>
  <mso:CustomDocumentProperties>
  <mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
  <mso:ManagedPropertyMapping msdt:dt="string">'Link URL'{Link URL}:'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:'','FileExtension','SecondaryFileExtension'</mso:ManagedPropertyMapping>
  <mso:MasterPageDescription msdt:dt="string">This is the item display template for AngularJS.</mso:MasterPageDescription>
  <mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106603</mso:ContentTypeId>
  <mso:TargetControlType msdt:dt="string">;#Content Web Parts;#</mso:TargetControlType>
  </mso:CustomDocumentProperties>
  </xml><![endif]-->
</head>

<body>
  <div id="Angular_part3">
  </div>
</body>
</html>
```


## Control template

In the control template we will insert the code that was previously written in the item template.

```javascript
SP.SOD.executeFunc("angular", null, function() {
  var elm = angular.element('#' + ctx.ElementId);
  if (typeof elm !== "undefined") {
    elm.removeAttr('style');
  }
  
  var app = angular.module('DisplayApp', []);
  app.controller('DisplayControl', function ($scope) {
    if (ctx.ListData.ResultTables[0] !== null) {
      $scope.ResultRows = [];
      angular.forEach(ctx.ListData.ResultTables[0].ResultRows, function(row) {
        // Set the display template property mappings
        ctx['DisplayTemplateData'] = new Object();
        ctx['DisplayTemplateData']['ManagedPropertyMapping'] = this.DisplayTemplateData.ManagedPropertyMapping;
        ctx['CurrentItem'] = row;
        
        var item = [];
        item.Path = $getItemValue(ctx, "Link URL");
        item.Line1 = $getItemValue(ctx, "Line 1");
        item.Line2 = $getItemValue(ctx, "Line 2");
        item.DocIcon = Srch.ContentBySearch.getIconSourceFromItem(row);
        $scope.ResultRows.push(item);
      });
    }
  });
  angular.bootstrap(document, ['DisplayApp']);
});
```

This will not work right now. If you test it, you are going to retrieve empty values for all properties. The reason for this is that the **ManagedPropertyMapping** cannot be set in the control display template. The item template is needs to be loaded one time to retrieve the configuration. For this I have a neat little trick, you could check what the item display template is for the current item and trigger it to load once.

The full code for this looks like this:

```javascript
// Check if the DisplayTemplateData exists
if (typeof ctx['DisplayTemplateData'] === "undefined") {
  ctx['DisplayTemplateData'] = new Object();
}
if (typeof this.DisplayTemplateData.ManagedPropertyMapping === "undefined") {
  // Retrieve the item template
  var itemTemplate = Srch.U.resolveRenderTemplate(ctx, row, "Item");
  // Execute the item template
  CoreRender(itemTemplate, ctx);
  // Set the display template property mappings
  ctx['DisplayTemplateData']['ManagedPropertyMapping'] = this.DisplayTemplateData.ManagedPropertyMapping;
}
```

So what it does is: with the **Srch.U.resolveRenderTemplate(ctx, row, "Item")** function you retrieve the item template for the current item. Because this is the same for every item in case you are using a Content Search Web Part, it is only needed to load it only one time. Once you have the template, it needs to be called in order to retrieve the managed property mappings. This is done with the **CoreRender** function.

The end result will looks the same as the previous part, but without custom JavaScript or HTML in the item display template.

{{< caption-new "/uploads/2014/08/080614_1930_Movingallyo1.png" "AngularJS template result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfElEQVR4nGWM2QrFMAhE8/+/2lBqXLKN5iLt25VBhOOcQkS11uu6GvP5mzLnGmazd18rgMxegf1hEQXdzoT27PaACUze7cOqBmlu6l3dxLvFXifiACe8qHWYJFB2lfx7t4nPUZgl2yqpzYPTHPEm5ZvJ9ZVnCcoQcuWY4weBvMvw8UBYcwAAAABJRU5ErkJggg==" "435" "291" >}}

## Download

The templates from this post can be downloaded from the following location: [AngularJS Templates (CSWP) - Part 3](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/AngularJS%20Templates%20%28CSWP%29/Part3 "AngularJS Templates \(CSWP\) - Part 3").

## What's next?

In the next part I show how you could add some AngularJS magic to your display templates.