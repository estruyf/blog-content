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

{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD1.png" "Workflow errors were found" >}}

{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD2.png" "Start Approval Process (Dutch) Error" >}}

"Het process Goedkeuring voor Current Item met Elst starten" is Dutch for: "Start Approval process on Current Item with Elst".

Digging deeper in the Approval process action, revealed that the problem lies in a **Log to History List** action.

{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD3.png" "Log in History List Action (Dutch) Error" >}}

In the **Log to History List** action three field values got an incorrect field reference. These incorrect field references are displayed with the following value: **[%.ReturnValue%]**.

{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD4.png" "Logging Text" >}}

The following solution were tested for the Dutch (1043) and French (1036) language packs.

## Solution 1: Manual Steps in SharePoint Designer

This step requires some manual steps that will need to be done each time you use a language specific **Start Approval Process** action.

1.  Open SharePoint Designer 2010;
2.  Open your workflow in editor mode;
3.  Click on the **Approval** process action, this will open the task process;
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD5.png" "Approval Process" >}}
4.  In the task process window, under the **Customization **section, click ** Change the behavior of a single task**;
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD6.png" "Change the behavior of a single task" >}}
5.  Search the **Log to History List** action that causes the error. This can be done by clicking on the **Check for Errors** button;
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD7.png" "Check for errors" >}}
6.  Click on the **Log message**;
7.  Manually add new field references for the **Assigned To, External Participant, and DueDateTime** fields. First remove the **[%.ReturnValue%]**, click on the **Add or Change Lookup** button. In the **Data source** select **Current Task: Approval (Language Specific)**, in the **Field from source** select the correct field reference;
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD8.png" "Assigned To" >}}
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD9.png" "External Participant" >}}
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD10.png" "DueDateTime (Workflow Variables and Parameters)" >}}
8.  When you have added the new field references you should have something like this:
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD11.png" "Correct Field References" >}}
9.  Re-check for errors and you should receive the following message:
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD12.png" "The workflow contains no errors" >}}
10.  Publish your workflow.

## Solution 2: Change Field ID's in the Workflow XML

This solution requires that you change the **moss.actions** xml file for a specific language in the SharePoint root folder. If you do not want to modify any of the SharePoint root files, I recommend you to follow the first solution.

When I investigated the **moss.actions** file for the English, Dutch and French language packs, I noticed that the field ID's in the Dutch and French version, were different than those in the English version.


{{< highlight xml "linenos=table,noclasses=false" >}}
<!-- ENGLISH VERSION -->
<ns0:DynamicStringActivity x:Name="ID11464" __Context="{ActivityBind ROOT,Path=__context}" Value="Task created for [%ID11465.ReturnValue%] on behalf of [%ID11467.ReturnValue%]. Due by: [%ID11469.ReturnValue%]"/>

<!-- DUTCH VERSION -->
<ns0:DynamicStringActivity x:Name="ID11464" __Context="{ActivityBind ROOT,Path=__context}" Value="Taak gemaakt voor [%ID11158.ReturnValue%] namens [%ID11160.ReturnValue%]. Einddatum: [%ID11162.ReturnValue%]"/>

<!-- FRENCH VERSION -->
<ns0:DynamicStringActivity x:Name="ID11464" __Context="{ActivityBind ROOT,Path=__context}" Value="Tâche créée pour [%ID11158.ReturnValue%] de la part de [%ID11160.ReturnValue%]. Échéance : le [%ID11162.ReturnValue%]"/>
{{< / highlight >}}


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
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD5.png" "Approval Process" >}}
11.  Check the **Log to History List** action that caused the error. This should contain the correct field references.
{{< caption-legacy "uploads/2011/08/082511_1324_SharePointD11.png" "Correct Field References" >}}