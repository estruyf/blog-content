---
title: Sandboxed To-Do List Web Part on Office 365 – SharePoint Online
author: Elio Struyf
type: post
date: 2011-04-27T17:28:01+00:00
slug: /sandboxed-to-do-list-web-part-on-office-365-sharepoint-online/
dsq_thread_id:
  - 3842225876
categories:
  - Development
  - SharePoint Online
tags:
  - client object model
  - ECMAscript
  - Office 365
  - Sandboxed
  - SharePoint Online
  - Web Part
comments: true
---

Today I received my Office 365 account, so I thought it would be cool to check out if my sandbox web part, that I have created some time ago, is working on SharePoint Online.

Here is the link to the original blog post: [Creating a Sandboxed Visual Web Part from the To-do List](https://www.eliostruyf.com/creating-a-sandboxed-visual-web-part-from-the-to-do-list/)

If you are the lucky owner of an Office 365 Beta account, you can follow the next steps to make use of my To-Do list web part.

# Steps to make use of the web part

## Resources

The first step is to set the resource quota for your SharePoint Online site.

*   Open the Office 365 admin site;
*   Click on "**Manage**" under the **SharePoint Online** section;
{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo1.png" "Manage SharePoint Online" >}}
*   In the next window, click on "**Manage site collections**";
{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo2.png" "Manage Site Collections" >}}
*   Select the SharePoint Online site for which you want to set the resource quota;
*   Click under the "**Site Collections**" tab on "**Resource Usage Quota**";
{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo3.png" "Resource Usage Quota" >}}
*   In the resources textbox you can specify the number of resources for your site. I have used 200 in this example, if you are finished, click on save.
{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo4.png" "Number of Resources" >}}

## Deploying the sandboxed solution

When you set the number of resources for your site, you can upload the sandboxed solution to the site. Here is the download link for the solution: [To-Do List Web Part Solution File](uploads/2011/03/EStruyf.TodoWP_Solution.zip)

*   Go to your SharePoint Online site;
*   Open the "**Site Actions**" menu, and click on "**Site Settings**";
*   Under the "**Galleries**" section, click on "**Solutions**";
*   On the "**Solutions**" tab click "**Upload Solution**";

{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo5.png" "Upload User Solution" >}}
*   When the solution is uploaded, you need to activate the solution by clicking on "**Activate**" in the modal dialog window.
{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo6.png" "Activate User Solution" >}}

## Using the web part

When you have uploaded and activated the sandboxed solution, you can make use of the web part.

*   Go to the page where you want to use the web part;
*   Edit the page, and on the "**Insert**" tab, click "**More Web Parts**";
{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo7.png" "Insert To-Do Web Part" >}}
*   In the "Filter By" select "**E. Struyf**", select the "**To-do Web Part**", and click "**Add**";
{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo8.png" "Selecting and Adding the To-Do List Web Part" >}}
*   Configure the web part and you are done.

# Result

{{< caption-legacy "uploads/2011/04/042711_1727_SandboxedTo9.png" "Result" >}}