---
title: Provisioning Site Columns and Content Types via a SharePoint App
author: Elio Struyf
type: post
date: 2013-03-06T12:28:32+00:00
excerpt: "Now that sandbox solutions are deprecated in SharePoint 2013, we need to find new ways to provision content types and site columns to a site. In this post I'll describe how you could provision them via a SharePoint app."
slug: /provisioning-site-columns-and-content-types-via-a-sharepoint-app/
dsq_thread_id:
  - 3836446133
categories:
  - SharePoint
comments: true
---

Now that sandbox solutions with code behind are deprecated in SharePoint 2013, we need to find new ways to provision content types and site columns to a site. One way to do it is to provision them via a PowerShell script, which is not a bad idea. Another way could be to provision them via a SharePoint app.

If you have the choice between the two, I would go for the PowerShell approach, because it is easier to manage the scripts. When you don't have the choice, and need to use an app for this, you can us this blog post as a reference.

In this post I'll show you how you could provision a site column, content type, and link the site column to the content type.

## Creating a Provisioning App

The first thing to do is creating a new **App for SharePoint 2013** project (I set the host option of the app to **SharePoint-hosted**).

When you've created your project, set the **Permission**
**requests** settings in the **AppManifest.xml** file to **Web - Manage**.

{{< caption-new "/uploads/2013/03/030613_1228_Provisionin1.png" "App Permissions" >}}

If you don't set this permissions or set the permission to a lower level (read or write), you will eventually end up with the following message when your code gets executed:

{{< caption-new "/uploads/2013/03/030613_1228_Provisionin2.png" "Permission Message" >}}

## App Page Content

The HTML markup for the **PlaceHolderMain** section of the **Default.aspx** page, looks like this:


```html
<div>
  <p><a href="#" id="CreateSiteColumn">Create Site Column</a></p>
  <p><a href="#" id="CreateContentType">Create Content Type</a></p>
  <p><a href="#" id="LinkFieldToContentType">Add Field to Content Type</a></p>

  <p id="message"></p>
</div>
```


As you can see, three links will be shown, this way it is easier to test each step separately. You can also combine them if you want.

## App Provisioning Code

The coding will be done in the **App.js** file. The default App.js content may be deleted.

**Important**: you need to get the context of the SharePoint site for which you want to provision the content types. This will not be the current context, because that is the app site context. To get the context of the site collection, you can use this piece of code:


```javascript
clientContext = new SP.ClientContext("/");
web = clientContext.get_web();
```


I already told you that I split up everything in separately steps. For that I created three functions:

*   CreateSiteColumns;
*   CreateContentType;
*   LinkFieldToContentType.

The **CreateSiteColumns** function looks like this:

```javascript
// Create Site Column
function CreateSiteColumns() {
  SiteColumnsCollection = web.get_fields();

  var xmlField = '<Field Type="Text" DisplayName="EStruyf Field" Name="estruyf" Group="EStruyf Columns" Hidden="False"></Field>';

  this.SiteColumnsCollection.addFieldAsXml(xmlField, false, SP.AddFieldOptions.AddToNoContentType);

  clientContext.load(SiteColumnsCollection);
  clientContext.executeQueryAsync(onCreationSuccess, onCreationFail);
}
```


The **CreateContentType** function looks like this:


```javascript
// Create Site Content Type
function CreateContentType() {
  ContentTypeCollection = web.get_contentTypes();
  var newContentType = new SP.ContentTypeCreationInformation();
  newContentType.set_name("EStruyf Content Type");
  newContentType.set_description("This is my custom EStruyf content type");
  newContentType.set_group("EStruyf");

  ContentTypeCollection.add(newContentType);

  clientContext.load(ContentTypeCollection);
  clientContext.executeQueryAsync(onCreationSuccess, onCreationFail);
}
```


The **LinkFieldToContentType** function looks like this:


```javascript
function LinkFieldToContentType() {
  // Retrieve all content types
  ContentTypeCollection = web.get_contentTypes();
  // Retrieve the previously created field
  field = web.get_fields().getByTitle("EStruyf Field");

  clientContext.load(ContentTypeCollection);
  clientContext.load(field);
  clientContext.executeQueryAsync(onQuerySuccess, onCreationFail);
}

function onQuerySuccess() {
  var contentTypeEnumerator = ContentTypeCollection.getEnumerator();
  var myCt;
  // Find the previously created content type
  while (contentTypeEnumerator.moveNext()) {
    var ct = contentTypeEnumerator.get_current();
    if (ct.get_name() === "EStruyf Content Type") {
      myCt = ct;
      break;
    }
  }

  if (myCt != null) {
    // Create a field link reference
    var fieldLink = new SP.FieldLinkCreationInformation();
    fieldLink.set_field(field);
    // Add the field link reference to the content type
    myCt.get_fieldLinks().add(fieldLink);
    myCt.update(true);

    clientContext.load(myCt);
    clientContext.executeQueryAsync(onCreationSuccess, onCreationFail);
  }
}
```


The only thing that rests is to set some event handlers for the links on the Default.aspx page. I have done this with the following piece of code:


```javascript
$(document).ready(function () {
  clientContext = new SP.ClientContext("/");
  web = clientContext.get_web();

  $("#CreateSiteColumn").click(function () {
    $('#message').empty();
    CreateSiteColumns();
    return false;
  });

  $("#CreateContentType").click(function () {
    $('#message').empty();
    CreateContentType();
    return false;
  });

  $("#LinkFieldToContentType").click(function () {
    $('#message').empty();
    LinkFieldToContentType();
    return false;
  });
});
```


Here you can download the whole script here: [App.js](/uploads/2013/03/App-Provision-CT.js)

## Executing the Code

When you installed the app on your SharePoint site, you should have the following app page:

{{< caption-new "/uploads/2013/03/030613_1228_Provisionin3.png" "Provisioning Actions" >}}

Clicking the links, should give the following results:

**Site Column**

{{< caption-new "/uploads/2013/03/030613_1228_Provisionin4.png" "Site Column" >}}

**Site Content Type**

{{< caption-new "/uploads/2013/03/030613_1228_Provisionin5.png" "Site Content Type" >}}

**Linked Field in Content Type**

{{< caption-new "/uploads/2013/03/030613_1228_Provisionin6.png" "Linked Field in Content Type" >}}