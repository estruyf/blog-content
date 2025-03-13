---
title: Group Items on Their Folder Name Inside a SharePoint Library
author: Elio Struyf
type: post
date: 2011-09-16T12:32:01+00:00
slug: /group-items-on-their-folder-name-inside-a-sharepoint-library/
dsq_thread_id:
  - 3836445243
categories:
  - SharePoint
  - Views
tags:
  - Documents
  - Grouping
  - Views
comments: true
---

Some time ago a client asked me if you could create a view where all the documents are grouped on the folder name. The folders were used to set the permissions on documents, so they could not be removed.

As you probably will know, folders could not be used in views to group documents. You could only group documents on their metadata.

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso1.png" "Group Documents" >}}

A possible solution could be to add a new metadata field to the content type and manually add the folder name as the metadata value. It is very easy to add and requires no custom development, but it requires an extra manual step from the document creator.

This manual step can also be automated by a SharePoint 2010 Document library functionality called **Column default value settings**. It can be found on the document library settings page under the **General settings** section.

The **Column default value settings** enable you to define a default value for a metadata column per folder.

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso2.png" "Default column value" >}}

## Approach

*   Go to the document library settings;
*   Create a new column called: **Folder name (Single line of text)**;
*   Click on **Column default value settings** under the **General settings** section;
{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso3.png" "Culumn default value settings" >}}
*   On the left side you will see your folders, and on the right site the columns for which you could give up a default value;
{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso4.png" "Folders, columns" >}}
*   Click on the folder name, and after that on the column name;
{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso5.png" "Default column value" >}}
*   Click **Use this default value**, and fill in the folder value and click OK;
*   Repeat this process for each folder.
Now when you upload a document to a folder, the **Folder name column **will automatically get the default value.

To prevent users being able to fill in their own value, you could hide the **Folder name column** from the new and edit forms.

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso6.png" "Hidde column from forms" >}}

## Result

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso7.png" "Group by on folder name" >}}

## Attention: SharePoint Foundation

The **Column default value** functionality is not available in SharePoint Foundation.