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

{{< caption-new "/uploads/2010/11/library.jpg" "This document library will be used to store the list views."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAII/8QAHxAAAQQBBQEAAAAAAAAAAAAAAQACAwQSISIjMVHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABYRAQEBAAAAAAAAAAAAAAAAABEBAP/aAAwDAQACEQMRAD8A0zRqQyU4i4OOTdd5+qH0a2buId+lETa3Ahv/2Q==" "983" "383" >}}

- Open the site in SharePoint Designer
- Right click on the list for which you want to create a new view, and choose "New" -> "List view page".

{{< caption-new "/uploads/2010/11/list_view_page.jpg" "Create a new list view."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQj/xAAmEAABAgMGBwAAAAAAAAAAAAABAgMABBEFEhMVITEiI1JTYZLR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRMf/aAAwDAQACEQMRAD8AoKal5dSFS5SnEZdNA2ggkE6Co8QplMh0L91QI++6ixHnws410G8da8R3rB6LYnihPOG3bT8izG8DeH//2Q==" "399" "426" >}}

- Give up a name for this view and click "OK".

{{< caption-new "/uploads/2010/11/list_view_name.jpg" "Fill in the list view name"  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHxAAAQQBBQEAAAAAAAAAAAAAAQACAwQREyExMpHR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQADAAAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ANbmgqU3x6VKsS48lpyPCFYTMcATWgyd+p+oiitjD//Z" "284" "127" >}}

- Copy and paste the newly created view to the document library.

{{< caption-new "/uploads/2010/11/paste_view.jpg" "Paste the view to the document library."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgQFB//EACQQAAIBAwMDBQAAAAAAAAAAAAEDAgAEERITIQYUMUFRccHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABYRAAMAAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A3Pp+FxObGrcpLHNlvAohqnIADJxjJ+atdrcDgXCgB7Wg/aO6t0obawTDa1k8rOPTP2adBOPJNK0If//Z" "235" "301" >}}

- Delete the view from the list, you do not need this one anymore. You will only need the one inside the document library.
- Go to the site and check all the list views. The new view should be available.

{{< caption-new "/uploads/2010/11/check_view.jpg" "Check list views."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUI/8QAHBAAAgICAwAAAAAAAAAAAAAAAQIAAwQRITFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/ANNLj0g06qTryRXYh2APAMRF1I//2Q==" "826" "256" >}}

- Modify the view to suit your needs.

{{< caption-new "/uploads/2010/11/modify_view.jpg" "Modify the list view"  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMI/8QAGhAAAgMBAQAAAAAAAAAAAAAAAQMAAhFT0f/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAaEQACAgMAAAAAAAAAAAAAAAAAAgEDETFR/9oADAMBAAIRAxEAPwDSDaqopZWqtdthAA8ktXzEREtaY1AZZun/2Q==" "799" "375" >}}

- Inside the document library you can set item permissions on the view (ASPX Page).

{{< caption-new "/uploads/2010/11/manage_permissions.jpg" "Manage item permissions."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQI/8QAIxAAAQMCBQUAAAAAAAAAAAAAAQACAwQSERMxYZEUIUKx4f/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAYEQEAAwEAAAAAAAAAAAAAAAACAAFBUf/aAAwDAQACEQMRAD8A0DT0UbZZIjm2t8wy7vwVZ0TToXYbs+J6clssuB1t9J7jtwkm8uCgeT//2Q==" "319" "331" >}}

{{< caption-new "/uploads/2010/11/edit-permissions.jpg" "Edit item permissions."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHhAAAQQBBQAAAAAAAAAAAAAAAQACAxEEBRQxUZH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABkRAAIDAQAAAAAAAAAAAAAAAAACAQMxEf/aAAwDAQACEQMRAD8A3rTY45MosdG2mvoEc0qO2i6PpRFNLtK6GWO4f//Z" "497" "206" >}}

When you test this view you will see that SharePoint will redirect you to the page in the document library.

So this is all you need to do. When you check the view with a user that has no permissions, he will get an access denied.

{{< caption-new "/uploads/2010/11/Reader_Test_View.jpg" "Test the view with a user that has no rights."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMI/8QAHRAAAgIDAAMAAAAAAAAAAAAAAQIEEQADBSNh0f/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAYEQEAAwEAAAAAAAAAAAAAAAABAAIRA//aAAwDAQACEQMRAD8A0NH5UWVo1bdkeKxalt46E0PdZBuVBViGgQiQaPgT5jGK9Lamwypgz//Z" "821" "458" >}}

{{< caption-new "/uploads/2010/11/Access_Denied.jpg" "The user will get an access denied on the view."  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQI/8QAHxAAAAYBBQAAAAAAAAAAAAAAAAECAwQFESE0k8HR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAYEQEAAwEAAAAAAAAAAAAAAAABAAIDIv/aAAwDAQACEQMRAD8A0bV1sOXEbekR2VrMsatpPoUnSVudnH40+AAnRS6RQ5J//9k=" "822" "320" >}}

## Changes

### Updates for Document Libraries: 31/05/2012

The previous approach does not work for Document Library views. When you try to copy the files you retrieve the following error message: 
**Server error: You cannot copy or move files between the Forms directory and a document library. First copy the file outside of the site and then upload from that location.**

The following approach can be followed in order to achieve a restricted view for document libraries.

#### Step 1

Create a new list view for the document library, and navigate to the document library in SharePoint Designer.

{{< caption-new "/uploads/2010/11/view1.png" "Document library view"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAACmSURBVHicPYwxC4JAHMXv60ZE0BJR9BWaW8ramoP2KCIHKwni7NRLPS3zlAsXRbx/qNRvecPvvYcEd0JzbxiYEMt1HcaYlBJ+oLKEJCTPh+ozN03TPM//rtIAUBTwDm53fMIG8Tyvacga1FwlIraoSW2LUjuOeaOrtYQqxCfSLuftTj0cNf2K/VfCAh5xgaDWWSYWq02rP+uNl92R0hkq7cF8Ml1/AabHn52oY3RVAAAAAElFTkSuQmCC" "219" "127" >}}

#### Step 2

Double-click on the list view, this will open the list view in SharePoint Designer.

#### Step 3

Click **File** -> **Save As**.

{{< caption-new "/uploads/2010/11/views2.png" "Save as"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAEjSURBVHicJYtbb4IwGED7/3/KkmWJ2zInmiG6MTFbjFguA5wiFykgAu3XFnxYFpKT83Jy0Ha7weZGGY9W+nw2efoylpOX0ff6Q529zt8mKCVVFMWOjdumrq/VYMEhJ1maxCg5mkWe7oOAUSo4AKPAaHg8kCwrc4JsSyVp+OO60SnkwDophrVt6rIgyHM/C5LEURT4HsnOHEAK3vfdre8AGMpC+5InvufZtrUzt6fwCIwy2gJtadsgLkTT1PvAF4Lf+k5w4MAGGG2RlLKpr45lWRhfq+uQpRBSiv+cntsir87pqakvAmgnQHJW5tmlJAIYGitYXZiqZuysg+snjhc7XqwbO93A/m+KRs+rsbK+f1zePajK3JxqeKph9d2ZLWxNd/4AhQYkUJTE+2gAAAAASUVORK5CYII=" "193" "211" >}}

In the save as pop-up windows, navigate to the list view document library, and save your file.

{{< caption-new "/uploads/2010/11/views3.png" "Save in"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAACaSURBVHicdctNE4FAHIDx/f4fxpjJNN4StUxthTSKpGFVkt2kq62/g+nod3ouD+r1JWkwsjaH7T72gosf0mOc+hH1o7PrecjAwyKnANC2LXR+XddvNJvIeZYAwEeIpiNEAwBVVSF1Kj/ut7+36+inYJcmNMtS9ixeJeeclZxxVlzjENmGZiwVslItU3OIvibYIdg2NTwfLxT5C7x7oBUgDGQtAAAAAElFTkSuQmCC" "605" "379" >}}

#### Step 4

Delete the old list view from the document library.

{{< caption-new "/uploads/2010/11/views4.png" "Delete the old list view"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAFfSURBVHicLc5fT4JAAABwvnyvfYYeXGWtrYfaCp2gTq2W5KFoqRzy7wBBgTs4DzCusfX8e/kJcbCBq/Fmq/ueV1UV57wqTp/KYqrzhbYW6ponB9M211F0rKqq5pyd8tlc20TchEDgnOcUQ+PbMg2ME855UVDwpSHEEaobPp/ZzcPLxeXtVVtqP4460sdUWbwBPPqKG2aMfiqz0RtQ1ZWm/Rg7k9Isp4TkpOFjmqmL5Xa9ig+Oh5xDFJYFK4tTiolQ/xaEJDtrp+uQUuoh14C667oZSTHOhOVsoirvrmOn8YGxUxSG4T7wkOv7KMtzYdCXhgNpPJSkzrNlW67rGFA3IIyPUcPXD7Iodlv3fbhZOmgf+D5OE4LTkrGGh31Z6r7OVWCbW8vx/l9lcS4ZJrkAlIncewXK+88KhPvAsmzf9wkmGOM4wYIKDMdy0ngfBl5HVlp3nSdxKsrzlx4QB9ofIeRXIDIE+bUAAAAASUVORK5CYII=" "318" "405" >}}

#### Step 5

Now you can set the item permissions on the document library view. The new view will already be available in the document library.

{{< caption-new "/uploads/2010/11/views5.png" "Document Library View"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADQSURBVHicHcGBaoJAAADQ+/8/CaRGNAxi1FjMWa05M7s787xLPfXEnMfZORAd7D2wgZ1h17brr18Ma/v0tpmtVlP4NdXx5OhawIuKy62yvcSFdH+KjmfGC5ELUdfiFGYgFWXVKESbc9hgJglvh2Hs+2EYR1YoIOi6TU3/c+4d5thZoO8Fx2bkmR1/ZvgVVMiooyW+7JD/TvEH9q2E7HJ26Mo9JQ5IrtuME3j7DWJ1TR+Ea/nox39x2YIiWJapE9A7Ihkk+f2n0VpJKTutwqT6A5IztdV93a5ZAAAAAElFTkSuQmCC" "175" "129" >}}