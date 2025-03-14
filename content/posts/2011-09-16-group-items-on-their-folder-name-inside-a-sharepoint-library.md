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

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso1.png" "Group Documents"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nE2NQQ7DIAwE8/8v5tBLo1aBEGJYg2OCq6gS7Rx3NNoJwEGZi/iduJ5m1rsNpjXC4WRG/5+HltbmhwuBNuiLONWoTX/azOi5lJT30laqG+QoUa/75dYe/p3YJQlZ9OpfRv0BFGSRo48rmCUAAAAASUVORK5CYII=" "270" "148" >}}

A possible solution could be to add a new metadata field to the content type and manually add the folder name as the metadata value. It is very easy to add and requires no custom development, but it requires an extra manual step from the document creator.

This manual step can also be automated by a SharePoint 2010 Document library functionality called **Column default value settings**. It can be found on the document library settings page under the **General settings** section.

The **Column default value settings** enable you to define a default value for a metadata column per folder.

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso2.png" "Default column value"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfElEQVR4nCXBSwrCMBAA0BzfK1g3ClI/qJQK/pCC3kJwV3CTTD4TJJPETEV8T6z2192xa8639nLfHLq6OU3XbTXfjmeL0WQpPGKkkFNi5mFgZy06RyFwoh68oJj+cs4xRqW0dWgsvj0+eik+pRQuhX8CkVRKawNgNMjnC75hf2pZo3DrtAAAAABJRU5ErkJggg==" "605" "258" >}}

## Approach

*   Go to the document library settings;
*   Create a new column called: **Folder name (Single line of text)**;
*   Click on **Column default value settings** under the **General settings** section;
{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso3.png" "Culumn default value settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAqUlEQVR4nEWM2Q6CMBQF+/8fpzGySIIgCtaW7sttC4JGjHFy3iZnkOCMPMhIx5HSB8Yjpeu6vn4g44PQTlqQFoR2QlsfZ59mAzOkJ8I69TpdROhEaFnAZiImERNbDtxNiLl0FWGQsZehZTCouPzbL0Tt1PHQqzio2DDAOn3Fug0RBTWxNwEDdw2xdwnLsswbn/e168o8b+rzfrevyrI6VUVeZFl2PByd928mJMR2OvbFzAAAAABJRU5ErkJggg==" "191" "131" >}}
*   On the left side you will see your folders, and on the right site the columns for which you could give up a default value;
{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso4.png" "Folders, columns"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nC3BQQ5AMBBA0d7/gnaSRixIDdOaxoj5bLyXxmkZsqxiRW2vJtr65e73aR0iyTYfVYEn4P0BEQF83Yo5qG2wV+oAAAAASUVORK5CYII=" "545" "88" >}}
*   Click on the folder name, and after that on the column name;
{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso5.png" "Default column value"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfUlEQVR4nBXBSwrCMBAA0BzfK2TVhbQuipaCRfyAHsOFu4KbJpNPq5mZ6ER8TzX9aTdcusO1P97a/bneDtWm0+tWV/VKNwp8IEw5cxEppcwxxOAxJWEc7aKWNzIzEnHORATOOx/Ahdcc7+OkkD8i8pU/RDTGAIAF5+z0eNofR1lqFB6qiu8AAAAASUVORK5CYII=" "605" "256" >}}
*   Click **Use this default value**, and fill in the folder value and click OK;
*   Repeat this process for each folder.
Now when you upload a document to a folder, the **Folder name column **will automatically get the default value.

To prevent users being able to fill in their own value, you could hide the **Folder name column** from the new and edit forms.

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso6.png" "Hidde column from forms"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAd0lEQVR4nB3Chw3DIBAAQPbfL5SHx/QvsWLJZIDI0Z0ZY/Tea22iuvf33vu+n/vfiGoptZTa2hAWEWVRZiFiFjXneeZ8xJggJkyIeMSEmDAEQMymTbbOv6yDABDAu+A9REjWOmIxi999rDWJHzznWsQiSsSf6/oBvaiFnwLaaw8AAAAASUVORK5CYII=" "201" "93" >}}

## Result

{{< caption-new "/uploads/2011/09/091611_1231_GroupItemso7.png" "Group by on folder name"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nFWO2w7CIBAF+f+PFBNRi3It7EIX2W1Mmmjndc4kRwFAqdg3iivQ+MgZ9QxVezSpL6G8rAXEkxaRhwNoFHG8K8KWmfmvjnBdsont5spFa+c8DRI5FmqKZHPHCgGHTehrX3ua8zihPHpbmisUgSbzN+MfOwyTrbMFe9QlAAAAAElFTkSuQmCC" "275" "176" >}}

## Attention: SharePoint Foundation

The **Column default value** functionality is not available in SharePoint Foundation.