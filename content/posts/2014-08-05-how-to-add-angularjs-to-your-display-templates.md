---
title: How to add AngularJS to your display templates (CSWP) – part 1
author: Elio Struyf
type: post
date: 2014-08-05T06:45:55+00:00
slug: /how-to-add-angularjs-to-your-display-templates/
dsq_thread_id:
  - 3836535629
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

AngularJS is so popular these days that I wanted to check out the possibilities in combination with display templates. Once you know the steps to combine them, you could add the magic of AngularJS to your templates. Like for example the templating engine, filtering, directives, etc.

In the first post I will tell you more about my approach of how you could databind the result rows to an AngularJS template.

> **Note**: I will be recreating the default **Item_TwoLines** template.

## Referencing AngularJS

Before you could start, you will need to add a reference to the AngularJS JavaScript file. If you already have the AngularJS referenced somewhere in the master page, or on the page, you won't need to do this step. If you don't have it, add the reference like this in the control template:

```html
<script>
  SP.SOD.registerSod('angular', "//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.min.js");
</script>
```

> **Note**: I'm using **SP.SOD.registerSod** because that way you could ensure that the JavaScript file is loaded before executing your code. $includeScript loads the JavaScript asynchronously, so it could be that the file is not yet loaded when you need it.

## Loading AngularJS

Now that the AngularJS JavaScript file is referenced, the next step is to ensure that it is loaded, then we could start add our AngularJS magic. For that I will use the following piece of code:

```javascript
SP.SOD.executeFunc("angular", null, function() {
  // Write all Angular code inside this code block
});
```

## Creating the module and controller

The Angular module and controller needs to be created in the previous code bock, the code looks as follows:

```javascript
var app = angular.module('DisplayApp', []);
app.controller('DisplayControl', function ($scope) {
  // Write all the control logic in this code block
});
```

When working with display templates, the HTML that these templates render will be added to the page when the last result is completed rendering. This means that Angular could not automatically start the template binding. To solve this problem, we need to manually trigger it. Angular **bootstrap** function can be used to achieve this:

```javascript
angular.bootstrap(document, ['DisplayApp']);
```


## Providing the data

Next step is providing the search data for your template. The search data could be retrieved from the current context like this:

```javascript
ctx.ListData.ResultTables[0].ResultRows
```

To bind it, you could do it like this:

```javascript
if (ctx.ListData.ResultTables[0] !== null) {
  $scope.ResultRows = ctx.ListData.ResultTables[0].ResultRows;
}
```


## Template creation

Display templates already use a sort of templating engine. The control template provides the overall layout of how you want to present the results, and the item template will define the layout for the result itself.

But if you want to use the templating engine from AngularJS, it is easier to create the whole template in the control display template and not split it up over two display templates. That means that you can just remove the HTML from the item template (that has been written inside the first DIV element).

The template HTML looks like this:

```html
<div ng-controller="DisplayControl" id="_#= elementId =#_">
  <ul class="cbs-List">
    <li ng-show="ResultRows.length" ng-repeat="ResultRow in ResultRows">
      <div class="cbs-Item">
        <a class="cbs-Line1Link" href="{{ ResultRow.Path }}" title="{{ ResultRow.Title }}">{{ ResultRow.Title }}</a>
      </div>
    </li>
    <li ng-show="!ResultRows.length">
      _#= Srch.ContentBySearch.getControlTemplateEncodedNoResultsMessage(ctx.ClientControl) =#_
    </li>
  </ul>
</div>
```

> **Note**: you are still able to load JavaScript variables or functions as you would do in normal display templates with \_\#= =\#\_.

In the control template everything in the first **DIV** element can be removed, the only thing that need to stay in place is the following piece of code:

```html
<!--#_
ctx.ListDataJSONGroupsKey = "ResultTables";
_#-->
_#= ctx.RenderGroups(ctx) =#_
```

These two lines ensure that the group display template will be called, the group display template calls the item template for each item. So if you remove these two lines, nothing will be rendered.

The result of the template should look like this:

{{< caption-new "/uploads/2014/08/080414_1128_HowtoaddAng1.png" "AngularJS search results " >}}

## Hiding the template

When you are loading the page, you will see the following output until the dataset is binded to the template.

{{< caption-new "/uploads/2014/08/080414_1128_HowtoaddAng2.png" "AngularJS Template" >}}

This is because everything is loaded async. To solve this issue, you could hide the controller by adding "display:none" as style attribute, and show it once Angular is loaded.

```html
<div ng-controller="DisplayControl" id="_#= elementId =#_" style="display:none;">
```

The following code needs to be added to the item template:

```javascript
var elm = angular.element('#' + ctx.ElementId);
if (typeof elm !== "undefined") {
    elm.removeAttr('style');
}
```

Check out the complete templates to see how it is achieved.

## Download

The templates from part 1 can checked on the following location: [AngularJS Display Templates - Part 1](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/AngularJS%20Templates%20%28CSWP%29/Part1 "AngularJS display templates part 1").

## What's next?

In the next part I will show how you could create your own dataset, so that the template can show the icon, and the second line of info.