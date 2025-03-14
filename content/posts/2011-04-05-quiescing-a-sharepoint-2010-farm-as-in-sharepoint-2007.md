---
title: Quiescing a SharePoint 2010 Farm as in SharePoint 2007
author: Elio Struyf
type: post
date: 2011-04-05T08:54:54+00:00
slug: /quiescing-a-sharepoint-2010-farm-as-in-sharepoint-2007/
dsq_thread_id:
  - 3836444670
categories:
  - Central Administration
  - Development
  - SharePoint
tags:
  - Central Administration
  - Farm
  - Quiesce
comments: true
---

In SharePoint 2007 you had the ability to quiesce the farm inside central administration. This ability is not implemented in SharePoint 2010, you need to use the STSADM command to achieve this.

```csharp
stsadm -o quiescefarm -maxduration minutes
```

But, I have done some research and development to achieve the same as in SharePoint 2007. In this blog post I will explain you how you can quiesce your farm by code, and I deliver you my SharePoint 2010 Solution file that makes the same functionality as in SharePoint 2007 available.

[QuiesceFarm Solution](/uploads/2011/04/estruyf.QuiesceFarm.zip "QuiesceFarm Solution")

## Programming

To be able to start writing some code to quiesce your farm, you need to add the following reference to your project: "Microsoft.Office.Server.Administration".

The next step is to retrieve your farm "SessionStateService". This service allows you to quiesce the farm.

{{< caption-new "/uploads/2011/04/040511_0854_QuiescingaS1.png" "Session State Service"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKElEQVR4nGO4cvHK5YuXr166CmJcuHzl4pVH9x89vPfwycMnN67dAACDXxlH5MFyNQAAAABJRU5ErkJggg==" "490" "36" >}}

```csharp
SessionStateService sessionStateService = SPFarm.Local.Services.GetValue();
```

Now the only thing we need is to write some code to quiesce the farm and to stop the quiescing.

The code for quiescing the farm, looks like this:

```csharp
sessionStateService.Quiesce(new TimeSpan(0, 0, 10));
sessionStateService.Update();
```

The code to stop the quiescing of the farm, looks like this:

```csharp
sessionStateService.Unquiesce();
sessionStateService.Update();
```


## SharePoint 2010 Quiesce Solution

The solution that I have created enables you to quiesce the SharePoint 2010 farm through central administration. This solution is based on the SharePoint 2007 version.

*   Add and deploy the **estruyf.QuiesceFarm** solution to your farm;
*   Go to **Central Administration** -> **Site Actions** -> **Site Settings**;
*   Open the **Manage site features **page;
*   Activate: **E. Struyf Quiesce Farm Feature**;
*   Navigate to **System Settings**;
*   Under **Farm Management**, the **Quiesce Farm** option should be available.

{{< caption-new "/uploads/2011/04/040511_0854_QuiescingaS2.png" "Quiesce Farm Option"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARElEQVR4nAXBSw6AIAwFQO5/Q6MbIBpNRX6hrTwwzpjV05HFR3Z3paoPI7QeGUmA+ZnRYRdnt52yhIaz6FXeyCg6FPMHzbE4hXsWRoYAAAAASUVORK5CYII=" "439" "99" >}}

## Result

When the SharePoint farm is not quiesced, you receive the following screen.

{{< caption-new "/uploads/2011/04/040511_0854_QuiescingaS3.png" "Quiesce Normal State"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPElEQVR4nE3B0QqAIAwFUP//MxWyZcNJYHNj1147J6mqmbk7NiKi5EIHyS2Dx3zetH8AUD0bXWsu4d4bf/xhOXRi+wJhAAAAAElFTkSuQmCC" "605" "137" >}}

When you quiesce the farm you will get the following results.

{{< caption-new "/uploads/2011/04/040511_0854_QuiescingaS4.png" "Farm in Quiescing state"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOUlEQVR4nE3BSQoAIQwEQP//Tg/j0nEhjAS0FTxZ5VTVLnLNuYL3+EJF69KHDrcfJFNMkmG/FUjJOPs8OYHKwo6qAAAAAElFTkSuQmCC" "605" "123" >}}

{{< caption-new "/uploads/2011/04/040511_0854_QuiescingaS5.png" "Farm Quiesced"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOklEQVR4nB3GQQrAIAwEQP//zOJBUDYpKxXRDYXMaQrJnSRdqT/V2qBP+vy4SkQoRQ7Aa372cRj6+AH8STmUI8oqugAAAABJRU5ErkJggg==" "605" "107" >}}

## Download

[QuiesceFarm Solution](/uploads/2011/04/estruyf.QuiesceFarm.zip "QuiesceFarm Solution")

[VS2010 Project](/uploads/2011/07/estruyf.QuiesceFarm.zip "VS2010 Project")