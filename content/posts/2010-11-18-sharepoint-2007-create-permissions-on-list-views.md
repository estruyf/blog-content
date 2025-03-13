---
title: 'SharePoint: Create permissions on list views'
author: Elio Struyf
type: post
date: 2010-11-18T08:06:25+00:00
slug: /sharepoint-2007-create-permissions-on-list-views/
dsq_thread_id:
  - 3836445045
categories:
  - Permissions
tags:
  - List views
comments: true
---

**_First of all I've tried the same approach for SharePoint 2010 and this works the same way._**

One of the things I miss the most in SharePoint 2007 is to set permissions on list views. I thought it was impossible to achieve this with the out-of-the-box functionality of SharePoint. After some research I found a way to achieve all this. My goal was to do it without writing or modifying any code in SharePoint. The solution consists of a number of manual steps, that I will describe in detail below, to accomplish this.

<!--more-->The idea was to place a list view inside a document library, so you can handle it as an ordinary document inside a list.

SharePoint Designer 2007 is necessary for the following steps.

- Create a new document library. I named it "ViewsLib", and I do not let it be shown on the quick launch.

{{< caption-new "/uploads/2010/11/library.jpg" "This document library will be used to store the list views." >}}

- Open the site in SharePoint Designer
- Right click on the list for which you want to create a new view, and choose "New" -> "List view page".

{{< caption-new "/uploads/2010/11/list_view_page.jpg" "Create a new list view." >}}

- Give up a name for this view and click "OK".

{{< caption-new "/uploads/2010/11/list_view_name.jpg" "Fill in the list view name" >}}

- Copy and paste the newly created view to the document library.

{{< caption-new "/uploads/2010/11/paste_view.jpg" "Paste the view to the document library." >}}

- Delete the view from the list, you do not need this one anymore. You will only need the one inside the document library.
- Go to the site and check all the list views. The new view should be available.

{{< caption-new "/uploads/2010/11/check_view.jpg" "Check list views." >}}

- Modify the view to suit your needs.

{{< caption-new "/uploads/2010/11/modify_view.jpg" "Modify the list view" >}}

- Inside the document library you can set item permissions on the view (ASPX Page).

{{< caption-new "/uploads/2010/11/manage_permissions.jpg" "Manage item permissions." >}}

{{< caption-new "/uploads/2010/11/edit-permissions.jpg" "Edit item permissions." >}}

When you test this view you will see that SharePoint will redirect you to the page in the document library.

So this is all you need to do. When you check the view with a user that has no permissions, he will get an access denied.

{{< caption-new "/uploads/2010/11/Reader_Test_View.jpg" "Test the view with a user that has no rights." >}}

{{< caption-new "/uploads/2010/11/Access_Denied.jpg" "The user will get an access denied on the view." >}}

## Changes

### Updates for Document Libraries: 31/05/2012

The previous approach does not work for Document Library views. When you try to copy the files you retrieve the following error message: 
**Server error: You cannot copy or move files between the Forms directory and a document library. First copy the file outside of the site and then upload from that location.**

The following approach can be followed in order to achieve a restricted view for document libraries.

#### Step 1

Create a new list view for the document library, and navigate to the document library in SharePoint Designer.

{{< caption-new "/uploads/2010/11/view1.png" "Document library view" >}}

#### Step 2

Double-click on the list view, this will open the list view in SharePoint Designer.

#### Step 3

Click **File** -> **Save As**.

{{< caption-new "/uploads/2010/11/views2.png" "Save as" >}}

In the save as pop-up windows, navigate to the list view document library, and save your file.

{{< caption-new "/uploads/2010/11/views3.png" "Save in" >}}

#### Step 4

Delete the old list view from the document library.

{{< caption-new "/uploads/2010/11/views4.png" "Delete the old list view" >}}

#### Step 5

Now you can set the item permissions on the document library view. The new view will already be available in the document library.

{{< caption-new "/uploads/2010/11/views5.png" "Document Library View" >}}