---
title: Adding a custom action to a callout in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-10-02T17:31:04+00:00
slug: /adding-a-custom-action-to-a-callout-in-sharepoint-2013/
dsq_thread_id:
  - 3836446683
categories:
  - JavaScript
  - SharePoint 2013
tags:
  - Callouts
  - Custom Actions
  - JavaScript
comments: true
---

A couple of weeks / months ago I wrote a blog post about how to you could hide the default social actions in the callout menu of a document library ([blog post](https://www.eliostruyf.com/hiding-the-social-actions-follow-share-from-the-document-libraries-in-sharepoint-2013/)). The trick to remove these actions was to override the footer template rendering of the callout.

This week I had the opposite question, how can you add a custom action to the callout with preserving the default actions. The first part isn't that difficult, but the last part "preserving the default actions" is.

## Solution

First things first, we start by adding a new custom action to the callout. When you want to add a new action to the callout, you will need to render a new footer template for the callout.

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
}
```

The code above will create a "Custom action" action to the callout.

{{< caption-new "/uploads/2013/10/100213_1731_Addingacust1.png" "Custom action in callout" >}}

As you can see the problem is that you lose the other actions, because the default footer was overridden.

To re-add the default actions, you have to call the SharePoint function that creates these actions. The downside is that these functions are different for each list / library.

**Library**: `CalloutOnPostRenderTemplate(renderCtx, calloutActionMenu)`

**My Documents Library (Skydrive Pro)**: `myDocsActionsMenuPopulator(renderCtx, calloutActionMenu)`

**Asset Library**: `AssetLibraryCalloutActionsMenuPopulator(renderCtx, calloutActionMenu)`

Once you know which function you need to call, it is just a matter of adding it to the code.

```javascript
function AddCustomAction (renderCtx, calloutActionMenu) {   
  // Add your custom action
  calloutActionMenu.addAction (new CalloutAction ({
    text: "Custom Action",
    tooltip: 'This is your custom action',
    onClickCallback: function() { console.log('Callback from custom action'); }
  }));

  // Show the default document library actions
  CalloutOnPostRenderTemplate(renderCtx, calloutActionMenu);
}
```

> **Note**: Line 10 needs to be changed in order to make it work on other list / library templates.

{{< caption-new "/uploads/2013/10/100213_1731_Addingacust2.png" "Default actions added to the callout" >}}

## Why is my follow action gone?

That is correct, the default functions from the library and asset library don't add the follow action by default. This action is added when the **Follow Content** feature on site level is activated. This feature adds a script block to the page where it overrides the default rendering of the callout of the libraries.

You can re-add the follow action like this:

```javascript
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

{{< caption-new "/uploads/2013/10/100213_1731_Addingacust3.png" "Custom action + Default actions + Follow action" >}}

As you can see it's possible to add your custom actions, but it involves a bit of extra coding.