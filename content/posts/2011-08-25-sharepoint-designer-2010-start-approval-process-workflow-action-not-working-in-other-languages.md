---
title: SharePoint Designer 2010 – Start Approval Process Workflow Action Not Working In Other Languages
author: Elio Struyf
type: post
date: 2011-08-25T13:24:42+00:00
slug: /sharepoint-designer-2010-start-approval-process-workflow-action-not-working-in-other-languages/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/itpro/Pages/SharePoint-Designer-2010-Start-Approval-Process-Workflow-Action-Not-Working-In-Other-Languages.aspx
dsq_thread_id:
  - 3836445373
categories:
  - SharePoint Designer
  - Workflows
tags:
  - SharePoint Designer
  - Workflow
comments: true
---

## Problem

When designing a SharePoint Designer workflow for a Dutch site, an error occurred when I used a language specific **Start Approval Process **action. The error only tells you that the workflow will not work: "Errors in the workflow prevent it from functioning correctly". It only highlights the **Approval Process** in red.

{{< caption-new "/uploads/2011/08/082511_1324_SharePointD1.png" "Workflow errors were found"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAd0lEQVR4nAXBiw3CIBAAUPYfyLiAMbUxqZTyO2yQysEhRdQFfI9NNnKHNxuurgzufYY2un16dDHD6XBkOdnNc6lALULOXEm5CGG1TpkgIMOcaomIcb57sQajtdE6xviirAywJzWq3YT94mhwZd0SJqqtf74/Cf4P6/JoGtEVMIQAAAAASUVORK5CYII=" "296" "124" >}}

{{< caption-new "/uploads/2011/08/082511_1324_SharePointD2.png" "Start Approval Process (Dutch) Error"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/ANzg5d7f5+Xf59zi6dzh6Nzh6OLn7ePp8+Pq8+Hm7Zv5Gstxj6wxAAAAAElFTkSuQmCC" "548" "68" >}}

"Het process Goedkeuring voor Current Item met Elst starten" is Dutch for: "Start Approval process on Current Item with Elst".

Digging deeper in the Approval process action, revealed that the problem lies in a **Log to History List** action.

{{< caption-new "/uploads/2011/08/082511_1324_SharePointD3.png" "Log in History List Action (Dutch) Error"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOLQ3eLN2uLO2+PL2d3X5czW5MvU4svT4tDZ6ODq94pUGZ2bTnxcAAAAAElFTkSuQmCC" "522" "28" >}}

In the **Log to History List** action three field values got an incorrect field reference. These incorrect field references are displayed with the following value: **[%.ReturnValue%]**.

{{< caption-new "/uploads/2011/08/082511_1324_SharePointD4.png" "Logging Text"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAb0lEQVR4nBXJ2w7EEBAAUP//fWykqHSr+2SaGdQlgmbP62HGGCE+1lqAG4kAbgAgCr33OSc7jq9SyjkXQ6y15lxyzqWU3vtai53u1Fpf1y+E0GpLKSFijKnV9m8pJeeCc7Ftat+t9/5JDyEi4RjjBdCNbthopMLgAAAAAElFTkSuQmCC" "465" "196" >}}

The following solution were tested for the Dutch (1043) and French (1036) language packs.

## Solution 1: Manual Steps in SharePoint Designer

This step requires some manual steps that will need to be done each time you use a language specific **Start Approval Process** action.

1.  Open SharePoint Designer 2010;
2.  Open your workflow in editor mode;
3.  Click on the **Approval** process action, this will open the task process;
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD5.png" "Approval Process"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOjp6urd3eS5uua5uezd3ujr6+Xk5Orp6ufm5uzs7ZL/GlYds/1MAAAAAElFTkSuQmCC" "319" "26" >}}
4.  In the task process window, under the **Customization **section, click ** Change the behavior of a single task**;
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD6.png" "Change the behavior of a single task"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAc0lEQVR4nB3C3Q6CIBgAUN7/xbpobmZyx/gZEPHzCYI2NwhdnR0ktSGUMS6dX6wHGyLE/JsKpIKWVLRbLWT1jiak/Tj6edb2bf8IXvF5o2SU+C7oJMWsFJYQdlhr3irKLtKB6JmLBzOYi5GpiXlX8qf13i+iyG2CgW4s9QAAAABJRU5ErkJggg==" "269" "112" >}}
5.  Search the **Log to History List** action that causes the error. This can be done by clicking on the **Check for Errors** button;
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD7.png" "Check for errors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA/0lEQVR4nBXJS0rDQAAA0LmNHkCP4ErcuHDjQYobr1ARXIlSulAMegBdFBEbqMXiJ5I0bZrEZmYyv0wymWSaikR82wdkd7M42y5PNrLeLlerlLAE0yViQhYLJIG63CqsfX21o+8O1r9tJnNGseBYV7qsKoCZYpnAqaCZ8N8mbaNrce9+3NThacMfgOekVn80fFxEvnN7fv3iJuu0Px8c5s97BluA8cIevkchkYINxtOxm7T0Qn52Cvf4v0tdzYOASwkhjsOYEYic7tfT0dTu8KAHaKby0uRlbZqfqm7MylA4IXAEY/s7egWzCAUxWiJKmfD8wJtFuTKElwlRfpj+AXVKydfb283pAAAAAElFTkSuQmCC" "125" "95" >}}
6.  Click on the **Log message**;
7.  Manually add new field references for the **Assigned To, External Participant, and DueDateTime** fields. First remove the **[%.ReturnValue%]**, click on the **Add or Change Lookup** button. In the **Data source** select **Current Task: Approval (Language Specific)**, in the **Field from source** select the correct field reference;
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD8.png" "Assigned To"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAjklEQVR4nBXEyxKCIBQAUP7/i1q0aFGtHPOBD0TgBsi9KGqj077pLA7rOlFVFecNESEi/ifvp0jx7TzTShdFOQzSWWu0VqMkDJFwTbM2wLQBIYTz0+XJrznc+yUzR2aO3H4fWc0sgBQ9hkkZizHF/YS4+XmneSt5x7iEVytNSGE9w/KpXbqJUEBsBpW34w+SV4K8sfuzbAAAAABJRU5ErkJggg==" "283" "131" >}}
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD9.png" "External Participant"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVR4nCXC3QqCMBQA4L3/C3URXQWBRSAO3Y/uuLntbEeZsKz7iD4+JoXinPd9nzOl/EcxYkTc950ZA23bKqX94py1FkxOuFH+XVcGMAshfMBzI0+34fKEu6kPqI2pnQTmvZ/GCRFhiS5kn4tNxaXicIuJmNa645xofR/H51VnKtcxiEBKDGDMF7CCg1mjCzyjAAAAAElFTkSuQmCC" "283" "130" >}}
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD10.png" "DueDateTime (Workflow Variables and Parameters)"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlElEQVR4nAXB3Q6CIBgAUN7/cbqoddUsf0ZrpUMZKAJqygcSq3TLy85BjHFCSFlWANYYAABr3WRgHKcQApKtzPOCc95rpZVUrZCiGTrlrZmdQ6KVlNJ+GA8J2af0iNm5NCnzV7k8qgYBmE7r2fvnZH34hOXnvttr3fx7NWBRnOFTlBSE1kLyWmDCdlkR3atLnGb49gd/5IE2sLUnuwAAAABJRU5ErkJggg==" "283" "131" >}}
8.  When you have added the new field references you should have something like this:
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD11.png" "Correct Field References"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/ANjY2eHh4t/f4NnZ29nZ2uHh4evq6+bm5+vr6/Hz9JUKGpR+wl8DAAAAAElFTkSuQmCC" "494" "64" >}}
9.  Re-check for errors and you should receive the following message:
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD12.png" "The workflow contains no errors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfElEQVR4nAXBuw7CIBQAUP7/S5wdnKsmOlZLDEohPCzcS60S2gLRyXMI62HXiPf08h5GxBExIALgnNLgPGmp3WxpCNALybi8cam01srEGJ/Ok1rW3zfXvE5pOTCzv9vPvNSSS8kekBjr7OCuD3O8qFOnz1Q3req4BQTGxR+03GnVHVSU+gAAAABJRU5ErkJggg==" "170" "69" >}}
10.  Publish your workflow.

## Solution 2: Change Field ID's in the Workflow XML

This solution requires that you change the **moss.actions** xml file for a specific language in the SharePoint root folder. If you do not want to modify any of the SharePoint root files, I recommend you to follow the first solution.

When I investigated the **moss.actions** file for the English, Dutch and French language packs, I noticed that the field ID's in the Dutch and French version, were different than those in the English version.


```xml
<!-- ENGLISH VERSION -->
<ns0:DynamicStringActivity x:Name="ID11464" __Context="{ActivityBind ROOT,Path=__context}" Value="Task created for [%ID11465.ReturnValue%] on behalf of [%ID11467.ReturnValue%]. Due by: [%ID11469.ReturnValue%]"/>

<!-- DUTCH VERSION -->
<ns0:DynamicStringActivity x:Name="ID11464" __Context="{ActivityBind ROOT,Path=__context}" Value="Taak gemaakt voor [%ID11158.ReturnValue%] namens [%ID11160.ReturnValue%]. Einddatum: [%ID11162.ReturnValue%]"/>

<!-- FRENCH VERSION -->
<ns0:DynamicStringActivity x:Name="ID11464" __Context="{ActivityBind ROOT,Path=__context}" Value="Tâche créée pour [%ID11158.ReturnValue%] de la part de [%ID11160.ReturnValue%]. Échéance : le [%ID11162.ReturnValue%]"/>
```


In the English version the following ID's are used:

*   Assigned To: **ID11465**
*   External Participant: **ID11467**
*   DueDateTime: **ID11469**
In the Dutch and French version the ID's are different:

*   Assigned To: **ID11158**
*   External Participant: **ID11160**
*   DueDateTime: **ID11162**
Follow the next steps to change these ID values.

1.  Navigate to the following location on your SharePoint server: SharePoint Root\TEMPLATE**\<LANGUAGE CODE>**\Workflow;
2.  Make a copy of the **moss.actions** file.
3.  Open the **moss.actions** file in a text editor;
4.  Do a search with the following string: **x:Name="ID11464"**;
5.  In this XML Node change the **ID11158 **-> **ID11465**, **ID11160** -> **ID11467**, and **ID11162** -> **ID11469**;
6.  Save the **moss.actions** file;
7.  Do an IISRESET;
8.  Open your site in SharePoint Designer 2010;
9.  Open or create a new workflow and add the language specific **Start Approval Process** action;
10.  Click on the **Approval** process;
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD5.png" "Approval Process"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOjp6urd3eS5uua5uezd3ujr6+Xk5Orp6ufm5uzs7ZL/GlYds/1MAAAAAElFTkSuQmCC" "319" "26" >}}
11.  Check the **Log to History List** action that caused the error. This should contain the correct field references.
{{< caption-new "/uploads/2011/08/082511_1324_SharePointD11.png" "Correct Field References"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/ANjY2eHh4t/f4NnZ29nZ2uHh4evq6+bm5+vr6/Hz9JUKGpR+wl8DAAAAAElFTkSuQmCC" "494" "64" >}}