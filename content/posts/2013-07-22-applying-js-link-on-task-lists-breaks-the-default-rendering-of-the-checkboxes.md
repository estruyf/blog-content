---
title: Applying JS Link on Task Lists Breaks the Default Rendering of the Checkboxes
author: Elio Struyf
type: post
date: 2013-07-22T08:00:40+00:00
slug: /applying-js-link-on-task-lists-breaks-the-default-rendering-of-the-checkboxes/
dsq_thread_id:
  - 3836446360
categories:
  - SharePoint 2013
  - Styling
tags:
  - JS LInk
comments: true
---

A few days ago a clever reader of my blog has informed me about a problem with the [Create a "% Complete" Progress Bar with JS Link in SharePoint 2013](https://www.eliostruyf.com/create-a-task-progress-bar-with-js-link-in-sharepoint-2013/) solution. He told me that when you apply the JS Link JavaScript to the web part, the checkboxes task checkboxes are rendered as **Yes / No** values. I saw on Tobias Zimmergren his blog that another reader has also mentioned this behavior (read it [here](http://zimmergren.net/technical/sp-2013-using-the-spfield-jslink-property-to-change-the-way-your-field-is-rendered-in-sharepoint-2013)).

I tested this problem, and as it turned out, it were not only the checkboxes that weren't rendering, but the other fields did not behave as they should be.

Let me first show you how a default task view rendering looks like.

{{< caption-legacy "uploads/2013/07/071913_1533_ApplyingJSL1.png" "Default Task List Rendering" >}}

The next screenshot shows you how rendering is from the moment you apply a custom JS Link reference:

{{< caption-legacy "uploads/2013/07/071913_1533_ApplyingJSL2.png" "Rendering with JS Link applied" >}}

As you see, the checkboxes aren't rendering, but also the Task Name text is not strikethrough, and the dates aren't colored red if task is overdue. This problems occurs with whatever JS Link you apply to the task list.

I did some investigation, and it turned out that the Task List web part already uses a JS Link reference to override the rendering of these fields (checkboxes, task name, due date). The default JS Link reference that the web part uses is: `/_layouts/15/hierarchytaskslist.js`.

This JavaScript file does a couple of things:

*   Overrides the default rendering of the Checkmark, DueDate, and LinkTitle columns;
*   Adding event receivers that automatically change the task status when you click on a checkbox;
*   Adds links to the context menu (Open, Add to timeline, Create Subtask);
*   ...

From the moment you apply your own JS Link reference, the hierarchytaskslist.js file won't be loaded anymore. That is why these kind of functionalities disappear.

## Solution 1

The solution for this problem is very simple, although I spend a couple of hours to this problem. The thing you need do is to also load the **hierarchytaskslist.js** script on your page.

This can easily be done by adding a script reference from within your custom JS Link JavaScript file with the following piece of code:

{{< highlight javascript "linenos=table,noclasses=false" >}}
RegisterSod('hierarchytaskslist.js', '/_layouts/15/hierarchytaskslist.js');
LoadSodByKey('hierarchytaskslist.js', null);
{{< / highlight >}}

My updated script looks like this:

{{< highlight html "linenos=table,noclasses=false" >}}
var taskSample = taskSample '' {};

taskSample.CustomizeFieldRendering = function () {
  RegisterSod('hierarchytaskslist.js', '/_layouts/15/hierarchytaskslist.js');
  LoadSodByKey('hierarchytaskslist.js', null);

    // Intialize the variables for overrides objects
  var overrideCtx = {
    Templates: {
      Fields: {
        'PercentComplete': { 
          'View' : taskSample.PercentCompleteRendering
        }
      }
    }
  };

  // Register the override of the field
  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
}

taskSample.PercentCompleteRendering = function (ctx) {
  var output = [];
  output.push('<div style="background: #BCBCBC; display:block; height: 20px; width: 100px;">');
  output.push('<span style="color: #fff; position:absolute; text-align: center; width: 100px;">');
  output.push(ctx.CurrentItem.PercentComplete);
  output.push('</span>');
  output.push('<div style="background: #D2421F; height: 100%; width: ');
  output.push(ctx.CurrentItem.PercentComplete.replace(" %", ""));
  output.push('%;"></div></div>');
  return output.join('');
}

taskSample.CustomizeFieldRendering();
{{< / highlight >}}


## Solution 2

You can add a second JavaScript reference to the JS Link property by using a pipe symbol `|`.

The JS Link property value in mine environment looks like this: 

`~sitecollection/_layouts/15/hierarchytaskslist.js|~sitecollection/_catalogs/masterpage/task_complete_rendering.js`.

## Result

The end result looks like when applied to the web part:

{{< caption-legacy "uploads/2013/07/tasks.png" "Result of the default and custom JS Link references" >}}

As you can see the checkboxes, strikethrough, overdue dates and my custom progress bar are working as it should be.

## Changes

### 23/07/2013

Found out that you can add multiple JavaScript files to the JS Link property by just using the pipe symbol "'" as separator.

### 07/10/2013

Modified the script to show the percentage number in the progress bar.