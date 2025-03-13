---
title: How to add an attachment to a mail via an OWA App
author: Elio Struyf
type: post
date: 2014-09-01T08:28:30+00:00
slug: /add-attachment-mail-via-owa-app/
dsq_thread_id:
  - 3836535640
categories:
  - Development
tags:
  - JavaScript
  - Office 365
  - Office 365 Dev
comments: true
---

For one of our company events later this month, I developed a demo OWA app which could add attachments to a mail. I used the following MSDN article to achieve this: [Add and remove attachments to an item in a compose form in Outlook](http://msdn.microsoft.com/en-us/library/office/dn568061(v=office.15).aspx). In the article they give a good overview, but there is one little problem with the example code. This code does not include the file extension, so you end up with unrecognised files in OWA.

{{< caption-new "/uploads/2014/09/090114_0828_Howtoaddana1.png" "Files without extensions" >}}

The first one is a JPG file, the second one a Word document. Because the file extensions are not included, the files cannot be opened in Office Web Apps.

If you would manually upload the files, you get this:

{{< caption-new "/uploads/2014/09/090114_0828_Howtoaddana2.png" "Files with extensions" >}}

I contacted Microsoft, and Adam Sheldon pointed me in the right direction. He told me to check if the file extension was added in the **AttachmentName** property.

I quickly tested this and you do indeed need to include the file extension to the **AttachmentName** property.

So the example code requires an updated:

```javascript
var mailbox;
var attachmentURI = "https://webserver/picture.png";
var attachmentID;

Office.initialize = function () {
  mailbox = Office.context.mailbox;
  // Checks for the DOM to load using the jQuery ready function.
  $(document).ready(function () {
    // After the DOM is loaded, app-specific code can run.
    // Add the specified file attachment to the item
    // being composed.
    // When the attachment finishes uploading, the
    // callback method is invoked and gets the attachment ID. 
    // You can optionally pass any object that you would  
    // access in the callback method as an argument to  
    // the asyncContext parameter.
    mailbox.item.addFileAttachmentAsync(
      attachmentURI,
      attachmentURI.substring(attachmentURI.lastIndexOf('/') + 1),
      { asyncContext: null },
      function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
          write(asyncResult.error.message);
        } else {
          // Get the ID of the attached file.
          attachmentID = asyncResult.value;
          write('ID of added attachment: ' + attachmentID);
        }
      }
    );
  });
}
  
// Writes to a div with id='message' on the page.
function write(message){
  document.getElementById('message').innerText += message; 
}
```

**Note**: only line 19 has been modified.

**Important**: this is written for the JavaScript API for Office 1.1