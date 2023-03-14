---
title: Adding some AngularJS magic to your display templates – part 4
author: Elio Struyf
type: post
date: 2014-08-12T06:40:26+00:00
slug: /adding-some-angularjs-magic-to-your-display-templates/
dsq_thread_id:
  - 3842117900
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

The last posts were about integrating AngularJS into display templates, and how you could optimize the code. Once you start using the templating from AngularJS it is quite easy to add extra functionality to the templates. In this post I give you a couple of additions to the template created in the previous posts.

## Adding search functionality

One of the simplest things to add with AngularJS is a search box to filter out the results containing a specific keyword. For this you will need to do two things:

1.  Add a text input;
2.  Update the ngRepeat directive with your filter option.

The text input which needs to be added to the, looks like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<input type="text" ng-model="search.Line1" placeholder="Filter results" />
{{< / highlight >}}

The ngRepeat directive needs to be updated with a filter property:

{{< highlight html "linenos=table,noclasses=false" >}}
<li ng-show="ResultRows.length" ng-repeat="ResultRow in ResultRows ' filter:search:strict">
{{< / highlight >}}

This results in the following output:

{{< caption-legacy "uploads/2014/08/081214_0640_AddingsomeA1.png" "Template with a searchbox" >}}

{{< caption-legacy "uploads/2014/08/081214_0640_AddingsomeA2.png" "Filtered results" >}}

> **Note**: I configured the search box to filter on the **line 1** property with **ng-model="search.Line1"**.

## Alternating row classes

Alternating row classes are very easy to insert, this can be done with the ngClassEven or ngClassOdd directives. The code for this looks like this:

{{< highlight html "linenos=table,noclasses=false" >}}
// Replace this line in the template
<div class="cbs-Item">

// With this line
<div class="cbs-Item" ng-class-even="'ms-alternatingstrong'">
{{< / highlight >}}

The code will automatically add an alternating class to the even rows.

{{< caption-legacy "uploads/2014/08/081214_0640_AddingsomeA3.png" "Alternating rows" >}}

## Grouping results

The last thing I prepared is how you can group results. First thing to do is put an order by filter in the ngRepeat directive.

{{< highlight html "linenos=table,noclasses=false" >}}
<li ng-show="ResultRows.length" ng-repeat="ResultRow in ResultRows ' orderBy:'Line2'">
{{< / highlight >}}

> **Note**: I have set the order by for the "line 2" property, so if you want to test it, make sure that you specify a managed property for the "line 2" property.

Next is the heading you want to show for the group, this heading only needs to be shown the first time. To show the header the ngShow directive can be used. In the ngShow directive, we will a function to call to check when the a new group starts.

For this a function call is needed in the ngShow directive.

{{< highlight html "linenos=table,noclasses=false" >}}
<h2 ng-show="CreateGroupHeader(ResultRow.Line2.value)">
  {{ ResultRow.Line2.value }}
</h2>
{{< / highlight >}}

The function looks like this:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
// Grouping function to check if the heading changed
$scope.currentGroupHeader = '';
$scope.CreateGroupHeader = function (value) {
  var showHeader = $scope.currentGroupHeader === value ? false : true;
  $scope.currentGroupHeader = value;
  return showHeader;
}
{{< / highlight >}}

This needs to be added inside the controller code.

{{< caption-legacy "uploads/2014/08/081214_0640_AddingsomeA4.png" "Template with grouping" >}}

Of course there are a lot more possibilities with AngularJS and display templates, these were just some simple ones to show you the possibilities and to get you started.

## Download

You can download these templates on the following location: [AngularJS Templates - Part 4](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/AngularJS%20Templates%20%28CSWP%29/Part4 "AngularJS Templates Part 4")