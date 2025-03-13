---
title: Adding a custom action to a callout based on the file type
author: Elio Struyf
type: post
date: 2014-12-12T14:25:28+00:00
slug: /adding-custom-action-callout-based-file-type/
dsq_thread_id:
  - 3836766337
categories:
  - JavaScript
  - Office 365
  - SharePoint 2013
tags:
  - Callouts
  - Custom Actions
  - JavaScript
comments: true
---

Back in October 2013 I wrote a post on how you could add your custom actions in a callout like this ([Adding a custom action to a callout in SharePoint 2013](https://www.eliostruyf.com/adding-a-custom-action-to-a-callout-in-sharepoint-2013/ "https://www.eliostruyf.com/adding-a-custom-action-to-a-callout-in-sharepoint-2013/")):

{{< caption-new "/uploads/2014/12/121214_1425_Addingacust1.png" "Callout with a custom action" >}}

This time I had the requirement to only add an action for a specific file type.

## Solution

The solution is rather simple. Here is the code from my previous post:

```JavaScript
SP.SOD.executeFunc("callout.js", "Callout", function () {
  var itemCtx = {};
  itemCtx.Templates = {};
  itemCtx.BaseViewID = 'Callout';
  // Define the list template type
  itemCtx.ListTemplateType = 101;
  itemCtx.Templates.Footer = function (itemCtx) {
    // context, custom action function, show the ECB menu (boolean)
    return CalloutRenderFooterTemplate(itemCtx, AddCustomAction, true);
  };
  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(itemCtx);
});

function AddCustomAction (renderCtx, calloutActionMenu) {  
  // Add your custom action
  calloutActionMenu.addAction (new CalloutAction ({
    text: "Custom Action",
    tooltip: 'This is your custom action',
    onClickCallback: function() { console.log('Callback from custom action'); }
  }));

  // Show the default document library actions
  CalloutOnPostRenderTemplate(renderCtx, calloutActionMenu);

  // Show the follow action
  calloutActionMenu.addAction(new CalloutAction({
    text: Strings.STS.L_CalloutFollowAction,
    tooltip: Strings.STS.L_CalloutFollowAction_Tooltip,
    onClickCallback: function (calloutActionClickEvent, calloutAction) {
      var callout = GetCalloutFromRenderCtx(renderCtx);
      if (!(typeof(callout) === 'undefined' '' callout === null))
        callout.close();
      SP.SOD.executeFunc('followingcommon.js', 'FollowSelectedDocument', function() { FollowSelectedDocument(renderCtx); });
    }
  }));
}
```

With this piece of code you can add a custom callout action for all documents, so what we need to implement is a check to see if the document is for example a PDF document. This information can be retrieved from the **renderCtx** object like this, and to be more specific, if you click to open the callout the **renderCtx** object contains all the information about the current item:

{{< caption-new "/uploads/2014/12/renderCtx.png" "renderCtx.CurrentItem" >}}

The file type can be retrieved like this:

```JavaScript
renderCtx.CurrentItem.File_x0020_Type
```

Once you know the file type, you could implement the check like this:

```JavaScript
SP.SOD.executeFunc("callout.js", "Callout", function () {
  var itemCtx = {};
  itemCtx.Templates = {};
  itemCtx.BaseViewID = 'Callout';
  // Define the list template type
  itemCtx.ListTemplateType = 101;
  itemCtx.Templates.Footer = function (itemCtx) {
    // context, custom action function, show the ECB menu (boolean)
    return CalloutRenderFooterTemplate(itemCtx, AddCustomAction, true);
  };
  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(itemCtx);
});

function AddCustomAction (renderCtx, calloutActionMenu) { 
  // Check if the current item is a PDF document
  if (renderCtx.CurrentItem.File_x0020_Type.toLowerCase() === "pdf") {
    // Add your custom action
    calloutActionMenu.addAction (new CalloutAction ({
      text: "PDF Action",
      tooltip: 'This is a PDF action',
      onClickCallback: function() { console.log('Callback from the PDF action'); }
    }));
  }

  // Show the default document library actions
  CalloutOnPostRenderTemplate(renderCtx, calloutActionMenu);

  // Show the follow action
  calloutActionMenu.addAction(new CalloutAction({
    text: Strings.STS.L_CalloutFollowAction,
    tooltip: Strings.STS.L_CalloutFollowAction_Tooltip,
    onClickCallback: function (calloutActionClickEvent, calloutAction) {
      var callout = GetCalloutFromRenderCtx(renderCtx);
      if (!(typeof(callout) === 'undefined' '' callout === null))
        callout.close();
      SP.SOD.executeFunc('followingcommon.js', 'FollowSelectedDocument', function() { FollowSelectedDocument(renderCtx); });
    }
  }));
}
```

On the highlighted line a check is in place to see if the current item is a PDF document, if that statement is true, the custom action gets added, otherwise nothing will be shown.

{{< caption-new "/uploads/2014/12/121214_1425_Addingacust2.png" "PDF document with a custom action" >}}

{{< caption-new "/uploads/2014/12/121214_1425_Addingacust3.png" "Word document does not get the custom action" >}}