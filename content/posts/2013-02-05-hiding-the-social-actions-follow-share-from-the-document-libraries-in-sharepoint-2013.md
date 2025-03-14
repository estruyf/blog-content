---
title: Hiding the Social Actions (Follow / Share) from the Document Libraries in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-02-05T18:51:21+00:00
slug: /hiding-the-social-actions-follow-share-from-the-document-libraries-in-sharepoint-2013/
dsq_thread_id:
  - 3836446108
categories:
  - SharePoint 2013
  - Social
tags:
  - Callout
  - Social Actions
comments: true
---

SharePoint 2013 got very social, everything can be tagged, followed, shared. But these new social features require some user adoption, and it could be that your client does not want to have this functionality.

This is exactly what a client of us requested, they did not want to have the Follow and Share actions on their site and document libraries.

## Hiding the Site Social Actions

First of all, hiding the follow and share actions on your site is not that difficult. They can be hidden by some custom CSS.

{{< caption-new "/uploads/2013/02/020513_1851_HidingtheSo1.png" "Social Ribbon Actions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAW0lEQVR4nB3BwQ2AIAwAQFbzrau4jR9WcBujDycATGotJDRAoJhwp2Z9LfqctmPd78cZ65wxJufcB1VK4RhfAPoQEa11ABBC4EH13kWEmcl7IkLElJKI1Fpbaz/+ZVFbYq5jIgAAAABJRU5ErkJggg==" "517" "134" >}}

## Hiding Document Library Callout Actions

Hiding the callout actions in the document library is a bit more difficult, because the links do not have a specific ID or Class defined.

{{< caption-new "/uploads/2013/02/020513_1851_HidingtheSo2.png" "Document Library Callout Standard Actions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeUlEQVR4nDXJQQ5CIQxFUfa/I5fiDowtpZX2QQxUwzeeyR3csjMD6If7lR/3MLOy9wbARFyrXtqha60xRnm8Znc0abWKmf13c485Z7ndGxnecwIjIhCIAAD3k5KZqk2qMLGIMLOZ9d6BUNWS+TEzZiIiPnmKiKra5Qv86KoUVWHPGQAAAABJRU5ErkJggg==" "357" "200" >}}

The trick is to override the default callout that is generated for the document libraries. This is also what SharePoint does, they are overriding the default callout to add the **Follow** action in the callout.

To override the default document library callouts and hide the Follow action, you can use the following code:


```javascript
var registerOverrideToHideSocialActions = function(id) {
  var socialactionsOverridePostRenderCtx = {};
  socialactionsOverridePostRenderCtx.BaseViewID = 'Callout';
  socialactionsOverridePostRenderCtx.ListTemplateType = id;
  socialactionsOverridePostRenderCtx.Templates = {};
  socialactionsOverridePostRenderCtx.Templates.Footer = function(renderCtx) {
    var  renderECB;
    if (typeof(isSharedWithMeView) === 'undefined' '' isSharedWithMeView === null) {
      renderECB = true;
    } else {
      var viewCtx = getViewCtxFromCalloutCtx(renderCtx);
      renderECB = !isSharedWithMeView(viewCtx);
    }
    // By setting a null value as 2nd parameter, we do not specify additional callout actions.
    return CalloutRenderCustomFooterTemplate(renderCtx, null, renderECB);
  };
  SPClientTemplates.TemplateManager.RegisterTemplateOverrides( socialactionsOverridePostRenderCtx);
}
// Hide actions for default Document Libraries
registerOverrideToHideSocialActions (101);
// Hide actions for the document library on your My Site
registerOverrideToHideSocialActions (700);
```


The **registerOverrideToHideSocialActions** function is for two lists (101 and 700). ID **101** is a standard Document Library, and ID **700** is the My Documents Library on you My Site (SkyDrive Pro).

For hiding the Share action I created a custom footer template function (**CalloutOnPostRenderCustomTemplate**). The code for this function looks like this:


```javascript
function CalloutOnPostRenderCustomTemplate(renderCtx, calloutActionMenu) {
  var listItem = renderCtx.CurrentItem;
  var openText = GetCallOutOpenText(listItem, renderCtx);

  calloutActionMenu.addAction(new CalloutAction({
    text: openText,
    onClickCallback: function(calloutActionClickEvent, calloutAction) {
      CalloutAction_Open_OnClick(calloutActionClickEvent, calloutAction, renderCtx);
    }
  }));
}
```


**Download the full JavaScript code here: [Hide the Follow and Share Actions](/uploads/2013/02/Hide-Follow-Share.js)**.

_Note: Best is to add this code at the bottom of you master page. This can be either in a script block or in a script file itself (your choice, but a script file is always cleaner).
_

## Result

The result looks like this:

{{< caption-new "/uploads/2013/02/020513_1851_HidingtheSo3.png" "Callout without Follow and Share Actions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeklEQVR4nC2MWQoCMRQEc/8jeRUvoJil+22JyGTkjdZHU9BQZe8zIlRVLUn5q4lI2XvP8Nbaq1aSY4zeO4DjOCKiPGVRjeAASKoqSQIRsdYqtzse8M97mbmpZVct3Nws5sw4gNZ6Pm5+kRJOsuzzFJFaK674b1MIEfkCIgyqxyLOpKsAAAAASUVORK5CYII=" "360" "201" >}}

## Changes

### 14/02/2013

You also have a Site Level Feature called **Following Content** to disable the **Follow** functionality. When you want to hide the **Share** action, you will still need to override the default callout.