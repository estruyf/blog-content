---
title: Starter JavaScript display templates for your projects
author: Elio Struyf
type: post
date: 2016-04-13T18:11:58+00:00
slug: /starter-javascript-display-templates-for-your-projects/
dsq_thread_id:
  - 4744481935
categories:
  - Display Templates
  - JavaScript
  - Office 365
  - SharePoint
tags:
  - Display Templates
  - JavaScript
comments: true
---

A while ago I wrote a post about my 10 tips and tricks when working with display templates.

> **Info**: you can find the article here: [My 10 SharePoint display template tips and tricks](https://www.eliostruyf.com/10-sharepoint-display-template-tips-tricks/)

In that article, I highlighted two ways of how you could provision your display templates to a SharePoint site. The first approach is provisioning the HTML template; the second approach is to only provision the JavaScript display template.

The HTML version is easier if you are new working with display templates. On the other hand, if you provision HTML display templates via a sandboxed solution. This HTML template requires a trigger (update) in order to generate the JavaScript version of the display template. Which results in a sandboxed solution with a feature receiver (code), which is deprecated. Another downside of this solution is that it requires the publishing feature to be activated on the site collection, otherwise, the JavaScript template will not get generated.

When you only provision the JavaScript version of the display template, you do not need to have that feature receiver in the sandbox solution and it does not require that the publishing feature has to be activated in order to work. The only downside that I see with this approach is that it requires a bit more configuration. Normally you have to provide all the metadata of your display template in the **CustomDocumentProperties** section of the HTML display template. SharePoint reads this information from the HTML template and sets the metadata on the HTML and JS display template files. This is not available if you only are going to provision JS display templates, so you have to provide this metadata via the elements file or when uploading the file to the master page gallery.

## Advantages

What I find to be the biggest advantage when working only with the JavaScript display template is that you have more control over your template. You are not writing what I call comment JavaScript anymore. Plus, what you write, will also be what will be available in SharePoint. This will be easier for testing and debugging the templates.

When the HTML template gets converted to a JavaScript file, it generates a template with a whole different structure and some additional code that is required for the display template to function correctly.

## JavaScript starter templates are available right now

In order to start building your own JavaScript display templates, there are some things you need to know before you can create them.

1.  You have to register your template in order that it can be used to render your items or control;
2.  Writing HTML will be a bit "harder", because now you have to store it in a variable;
3.  Making changes to the managed property mappings will have to be done in the master page gallery and in the template itself.

To make things easier we released some sample starter templates in the [SPCSR](https://github.com/SPCSR/DisplayTemplates/) GitHub repository.

> **Info**: I am not going to take all the credit; I also want to thank [Anatoly Mironov](https://chuvash.eu) for creating the starter item template and sharing this in the SPCSR GitHub repository. He also wrote an article about this template: [Minimal display template](https://chuvash.eu/2016/04/13/minimal-display-template/).

If you go to the following page in the SPCSR repository: [JavaScript Starter Templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/JavaScript%20Starter%20Template), you will find two templates which can be used:

1.  Control_Minimal.js
2.  Item_Minimal.js

In order to make use of these templates, they have to be uploaded to the master page gallery and you need to provide the metadata yourself.

## Template usage

If you want to make use of the templates or want to modify them. You need to be aware of two things:

*   The item and control template contain a **config** variable. In this variable, you have to specify the filename of the template. This is required to register the right template. For the Item template you will also have to specify the managed property mappings:

**Item template config**

```javascript
var config = {
    template: 'item_minimal.js',
    propertyMappings: { 'Path':null, 'Title':['Title'] }
};
```

**Control template config**

```javascript
var config = {
    template: 'control_minimal.js'
};
```


*   At the bottom of the template, there is some required JavaScript code to retrieve your JavaScript file and to register it.

```javascript
/* DO NOT REMOVE THE FOLLOWING LINES OF CODE */
// MDS needs to start on the head
// Retrieve all the loaded scripts
var allScripts = document.head.getElementsByTagName("script");
var scriptUrl = null;
var scriptNr = allScripts.length;
while(scriptNr--) {
    var crntScript = allScripts[scriptNr];
    if (crntScript.src !== null) {
        // Check if the right script is retrieved based on the filename of the template
        if (crntScript.src.indexOf('/_catalogs/') > 0 && crntScript.src.toLowerCase().indexOf(config.template.toLowerCase()) > 0) {
            scriptUrl = crntScript.src;
            break;
        }
    }
}    
if (scriptUrl !== null) {
    // Remove the query string 
    if (scriptUrl.indexOf('?') > 0) {
        scriptUrl = scriptUrl.split("?")[0];
    }
    // Insert the site collection token
    templateUrl = '~sitecollection' + scriptUrl.substr(scriptUrl.indexOf('/_catalogs/'));
    templateUrl = decodeURI(templateUrl);
    // Register the template to load
    register();
    if (typeof (RegisterModuleInit) === "function" && typeof(Srch.U.replaceUrlTokens) === "function") {
        RegisterModuleInit(Srch.U.replaceUrlTokens(templateUrl), register);
    }
}
```


> **Important**: Leave this code in place, or adapt it to your needs if you know what you are doing.


## Installation and configuration

You can upload the templates to the master page gallery, by this approach you will have to manually add the metadata yourself.

### Manual upload

**Control template**

For the control template you have to specify the following metadata:

*   Content type: **Display Template Code**
*   Name
*   Title
*   Target control type: **Content Web Parts** and **SearchResults** (depends on which type of web part you are creating the template)
*   Template level: **Control**

**Item template**

For the item template you have to specify the metadata as follows:

*   Content type: **Display Template Code**
*   Name
*   Title
*   Target control type: **Content Web Parts** and **SearchResults **(depends on which type of web part you are creating the template)
*   Template level: **Item**
*   Managed property mappings: 'Path','Title':'Title'
{{< caption-new "/uploads/2016/04/041316_1714_JavaScripts1.png" "Managed property mappings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAN0lEQVR4nFXKQQrAMAgEQP//WzcuuhhsIZBC5zxGMiIkVVVmzp89x8zsoy9J3W1fBODuANZF8gUBJVe4uh6eOQAAAABJRU5ErkJggg==" "627" "174" >}}

### Sandboxed solution - Module

If you are going to provision the templates via a sandboxed solution. You can create a module with the template files and the elements file will contain the following information:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Module Name="Templates" Path="Templates" Url="_catalogs/masterpage/CustomTemplates">
    <File Url="Control_Minimal.js" Level="Published" ReplaceContent="true" Type="GhostableInLibrary">
      <Property Name="ContentTypeId" Value="0x0101002039C03B61C64EC4A04F5361F38510660500A0383064C59087438E649B7323C95AF6" />
      <Property Name="MasterPageDescription" Value="This is the starter JS control display template." />
      <Property Name="Title" Value="Control JS" />
      <Property Name="TargetControlType" Value=";#Content Web Parts;#" />
      <Property Name="DisplayTemplateLevel" Value="Control" />
      <Property Name="HtmlDesignAssociated" Value="FALSE" />
      <Property Name="TemplateHidden" Value="FALSE" />
      <Property Name="ContentType" Value="Display Template Code" />
    </File>
    <File Url="Item_Minimal.js" Level="Published" ReplaceContent="true" Type="GhostableInLibrary">
      <Property Name="ContentTypeId" Value="0x0101002039C03B61C64EC4A04F5361F38510660500A0383064C59087438E649B7323C95AF6" />
      <Property Name="MasterPageDescription" Value="This is the starter JS item display template." />
      <Property Name="Title" Value="Item JS" />
      <Property Name="TargetControlType" Value=";#Content Web Parts;#" />
      <Property Name="DisplayTemplateLevel" Value="Item" />
      <Property Name="ManagedPropertyMapping" Value="'Path','Title':'Title'" />
      <Property Name="HtmlDesignAssociated" Value="FALSE" />
      <Property Name="TemplateHidden" Value="FALSE" />
      <Property Name="ContentType" Value="Display Template Code" />
    </File>
  </Module>
</Elements>
```


## Download the templates

The templates are available in the SPCSR GitHub repository: [JavaScript Starter Templates](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/JavaScript%20Starter%20Template)