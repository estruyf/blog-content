---
title: Adding Properties to Timer Jobs
author: Elio Struyf
type: post
date: 2012-04-13T13:40:48+00:00
slug: /adding-properties-to-timer-jobs/
Xylot:
  - http://www.xylos.com/blog/post/1196/SharePoint-Adding-Properties-to-Timer-Jobs/
dsq_thread_id:
  - 3839639101
categories:
  - Development
  - SharePoint
tags:
  - Timer Jobs
  - Visual Studio
comments: true
---

Adding properties to timer jobs could be handy if you want to set the reference to a particular site collection, or if you want to set some parameters that are needed to run the job.

You could add these properties just like you would add properties to a SharePoint site.

The following code can be used to add a property to the timer job at the creation process.

```csharp
// Create new timer job
TimerJob timerJob = new TimerJob("TimerJobName", site.WebApplication);
// Add property to timer job
timerJob.Properties.Add("Property_Name", "Property_Value");
```

To read the property in the timer job, you could use the following code.

```csharp
String propertyValue = (string)Properties["Property_Name"];
```

Most of the time I use these properties to specify the site collection for which the timer job needs to run, or define a value for querying items.