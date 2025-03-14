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

{{< caption-new "/uploads/2014/12/121214_1425_Addingacust1.png" "Callout with a custom action"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAyklEQVR4nB2PXW7DIBCEuf+tcoPIkdpIVSslrYoxLOyyP5iaVpWZt5nvYWZcKYWImDmmFGOszCKias0aMztTBQBExIIlZwBI0x7HEJETl4IFSVVEjYiEudY6xui9OxUp/ptSUtiO9WsI/1IZlP+a7b27ZiYpcoYMucYgRGqmqq21fd/dT++qbUbGanPZKRU5Mb5/wLLA/Z5vN3o+iQVSQqTW5vLw+vJ2uXxer3FZ4PFIOa/exxjPL4jOr2tGrLWGbfMhIJLNbmY2s3+Ykvy90PNY8gAAAABJRU5ErkJggg==" "225" "209" >}}

This time I had the requirement to only add an action for a specific file type.

## Solution

The solution is rather simple. Here is the code from my previous post:

```javascript
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

{{< caption-new "/uploads/2014/12/renderCtx.png" "renderCtx.CurrentItem"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAi0lEQVR4nDWN2w6CMBQE+///54tvAgmoFHrh9EBbGAPqJJt92cyaRy/c7p7ulbFRGUaHnQLT6BjnhecUeHvBrOtK07RYaynLQg6eqkpJSlFlL4XjAJNSom1bvA9kEZJzVxcRcozs28aJERG6rmOeZ1QSoiv5tNR65dKdw+91Qz8MbM5RY7xs9Wf68wGqpMC4mjgTCwAAAABJRU5ErkJggg==" "524" "268" >}}

The file type can be retrieved like this:

```javascript
renderCtx.CurrentItem.File_x0020_Type
```

Once you know the file type, you could implement the check like this:

```javascript
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

{{< caption-new "/uploads/2014/12/121214_1425_Addingacust2.png" "PDF document with a custom action"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVR4nBXGSQ6AIAwAQP7/Ll/hejBiIKB0wbaiiXFO47Aq26NqKvI+f05AQGSm1prrhjzvxxBwSXU+bEpXASrIIpfa7YB13bwPMZ2FxQApjn2KIedMRB9vZ1RjBbk+EgAAAABJRU5ErkJggg==" "738" "245" >}}

{{< caption-new "/uploads/2014/12/121214_1425_Addingacust3.png" "Word document does not get the custom action"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVR4nAXBSw6AMAgFwN7/WB7CxKRx4a/GqjyoCLhyJplFrZVAAMzc4yMWFhHhiEhdxjAf/XSOR8tVx8tIHrTnVfX4Eqsva9nKfoNfDzUDiIiYWVV/SKRUMY0om1YAAAAASUVORK5CYII=" "732" "229" >}}