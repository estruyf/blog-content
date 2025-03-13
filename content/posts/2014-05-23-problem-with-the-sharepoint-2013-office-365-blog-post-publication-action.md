---
title: 'Problem with the SharePoint 2013 & Office 365 blog post publication action'
author: Elio Struyf
type: post
date: 2014-05-23T13:24:16+00:00
slug: /problem-with-the-sharepoint-2013-office-365-blog-post-publication-action/
dsq_thread_id:
  - 3836724275
categories:
  - Office 365
  - SharePoint 2013
tags:
  - Blog
  - JavaScript
  - Troubleshooting
comments: true
---

A client of mine is currently undergoing a migration from SharePoint 2007 to 2013. An important part of their migration is a blog site. This blog is used all over the company to spread news to the colleagues. Everything went fine during the migration process of the blog, but from the moment they started testing the functionality they saw some weird behaviour.

> **Note**: it was the default blog template from SharePoint 2007, so nothing has been modified to it.

On the Post lists, **Content Approval** is active to enable the users to let the posts be stored as draft. When this setting is turned on, you'll have three buttons on the new and edit form: **Save As Draft**, **Publish**, and **Cancel**.

{{< caption-new "/uploads/2014/05/052314_1324_BuginShareP1.png" "Blog post buttons" >}}

The problems that occurs in SharePoint 2013 is that the **save as draft** and **publish **buttons have the same behaviour. Normally when you click the **publish** button, the post should be saved with the status set to **approved**, so that it's available for everyone to see. But in SharePoint 2013 the publish action just does the same as the Save as draft action. The posts will be stored as draft and you need to do a manual approval make it available for the users.

Of course this is not the behaviour they wanted to have. They want the same behaviour like in SharePoint 2007 (and SharePoint 2010).

## Investigation

The publish or save action both submit the form data to the **ProcessQuery** endpoint. With the help of Fiddler I quickly saw the problem.

This is the JSON form data for the **save as draft** action:

```json
[{
  "SchemaVersion": "15.0.0.0",
  "LibraryVersion": "15.0.4525.1000",
  "ErrorInfo": null,
  "TraceCorrelationId": "9eb4939c-432e-7091-b7ba-7ee1117ac3d6"
}, 15, {
  "IsNull": false
}, 17, {
  "IsNull": false
}, 19, {
  "IsNull": false
}, 21, {
  "IsNull": false
}, 23, {
  "IsNull": false
}, 26, [{
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "Title",
  "FieldValue": "This is a new blog post (Save as draft)",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "Body",
  "FieldValue": "This is the content of the new blog post",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "PostCategory",
  "FieldValue": "",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "PublishedDate",
  "FieldValue": "5\u002f23\u002f2014 14:44",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "ContentType",
  "FieldValue": "Post",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "ContentTypeId",
  "FieldValue": "0x011000E46152F323094A409801522B8291D076",
  "HasException": false
}], 24, {
  "HasException": false,
  "ErrorInfo": null
}]
```

This is the JSON form data for the **publish** action:

```json
[{
  "SchemaVersion": "15.0.0.0",
  "LibraryVersion": "15.0.4525.1000",
  "ErrorInfo": null,
  "TraceCorrelationId": "81b4939c-33b0-7091-b7ba-7c0c62b73ada"
}, 15, {
  "IsNull": false
}, 17, {
  "IsNull": false
}, 19, {
  "IsNull": false
}, 21, {
  "IsNull": false
}, 23, {
  "IsNull": false
}, 26, [{
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "Title",
  "FieldValue": "This is a new blog post (publish)",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "Body",
  "FieldValue": "This is a new blog post by clicking on the publish button",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "PostCategory",
  "FieldValue": "",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "PublishedDate",
  "FieldValue": "5\u002f23\u002f2014 14:43",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "ContentType",
  "FieldValue": "Post",
  "HasException": false
}, {
  "_ObjectType_": "SP.ListItemFormUpdateValue",
  "ErrorMessage": null,
  "FieldName": "ContentTypeId",
  "FieldValue": "0x011000E46152F323094A409801522B8291D076",
  "HasException": false
}], 24, {
  "HasException": false,
  "ErrorInfo": null
}]
```

The two requests just do the same thing, in neither of the two, the moderation status is set. So it is quite logical that these two buttons do the same thing.

This problem also occurs on the default blog template in SharePoint 2013 and Office 365.

## Solution

I created a solution by overwriting a JavaScript function call. This is not a clean solution, but it will get you going until it hopefully gets fixed in one of the next updates.

```javascript
EnsureScriptFunc('mQuery.js', 'm$', function() {
  // Update the button functions
  var publishBtns = m$('.ms-formtoolbar input[value="Publish"]');
  var draftBtns = m$('.ms-formtoolbar input[value="Save As Draft"]');

  for (var i = 0; i < publishBtns.length; i++) {
    var elm = m$(publishBtns[i]);
    elm.attr("onclick", 'PublishClicked=true;'+elm.attr('onclick'));
  }
  for (var i = 0; i < draftBtns.length; i++) {
    var elm = m$(draftBtns[i]);
    elm.attr("onclick", 'PublishClicked=false;'+elm.attr('onclick'));
  }

  if (typeof SP.ListItem.prototype.validateUpdateListItem !== 'undefined') {
    SP.ListItem.prototype.validateUpdateListItem = function(formValues, bNewDocumentUpdate, checkInComment) {
      var formUpdateValue = new SP.ListItemFormUpdateValue();
      formUpdateValue.set_fieldName("_ModerationStatus");
      if (PublishClicked) {
        formUpdateValue.set_fieldValue(0);  
      } else {
        formUpdateValue.set_fieldValue(3);
      }
      formValues.push(formUpdateValue);

      var $v_0 = this.get_context();
      var $v_1;
      var $v_2 = new SP.ClientActionInvokeMethod(this, 'ValidateUpdateListItem', [formValues, bNewDocumentUpdate, checkInComment]);
      $v_0.addQuery($v_2);
      $v_1 = [];
      $v_0.addQueryIdAndResultObject($v_2.get_id(), $v_1);
      return $v_1;   
    };
  }
});
```

The code does the following things:

*   Update the publish and save as draft buttons **onclick** attributes with a variable that is set to true or false;
*   It overwrites the **SP.ListItem.prototype.validateUpdateListItem** function;
*   In the new function the variable **PublishClicked** gets checked to see if the post should be published, or saved as draft;
*   Depending on the **PublishClicked** value, the **_ModerationStatus** gets set to **0** (approved) or **3** (draft);
*   The default behaviour of the function gets executed.

I added this code on the **NewPost.aspx** and **EditPost.aspx** pages via a script editor web part.

## Result

If you are going to click on the **Save as draft** or **Publish** button, you'll see that the **_ModerationStatus** gets added to the request.

```javascript
// Save as draft
"_ObjectType_":"SP.ListItemFormUpdateValue","ErrorMessage":null,"FieldName":"_ModerationStatus","FieldValue":"3","HasException":false

// Publish
"_ObjectType_":"SP.ListItemFormUpdateValue","ErrorMessage":null,"FieldName":"_ModerationStatus","FieldValue":"0","HasException":false
```
