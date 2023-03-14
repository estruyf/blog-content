---
title: How to Provision Display Templates in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-02-18T18:47:53+00:00
excerpt: "In this blog post I'll explain my first experiences with provisioning Display Templates in SharePoint 2013."
slug: /how-to-provision-display-templates-in-sharepoint-2013/
dsq_thread_id:
  - 3836445685
categories:
  - Display Templates
  - SharePoint 2013
tags:
  - Display Templates
comments: true
---

Putting HTML design files in the SharePoint Master Page Gallery feels a bit like adding them into a mysterious black box, you don't know exactly what is going to happen with them.

This blog post covers my first experiences with provisioning Display Templates to the Master Page Gallery.

The process of provisioning your design files is a bit trial and error when you are not using the design manager. I'm not using the design manager, because I like to have more control over my branding packages for clients.

On the 31st of January, I blogged about how you could provision your design files: [How to Provision Your Design Files in SharePoint 2013](https://www.eliostruyf.com/how-to-provision-your-design-files-in-sharepoint-2013/)

In that post I explained that two new attributes have been introduced in SharePoint 2013 when provisioning files.

*   Level: specifies if the file is provisioned as draft or published;
*   ReplaceContent: specifies if the content of the file may be replaced.

## 1. Don't Set the Level Attribute of the Display Template to Published

The first thing that you may not do when provisioning your display templates is setting the Level Attribute as Published. When you do this, and you only provision the HTML file, the JavaScript file doesn't gets generated. The JavaScript version only generates for Draft versions of an HTML file.

_Note: it seems that when you provision the HTML and JavaScript file together, that you are able to make use of the Level="Published" attribute when creating Content by Search Web Part styles. But this approach doesn't seem to work for refinement display templates, the engine will show you an error that the display template cannot be found.
_

## 2. Make Use of the ReplaceContent="True" Attribute

You need to make use of the ReplaceContent attribute, because when you don't, the file content of your HTML file or JavaScript file doesn't get updated.

## 3. You don't need to Specify Additional Metadata/Properties

Don't specify any additional properties when provisioning your HTML display templates. For example:

*   Display Content Type;
*   Title;
*   Description;
*   ...

These properties should all be in the Display Template Head section. Example of the Display Template header section:

{{< highlight html "linenos=table,noclasses=false" >}}
<mso:CustomDocumentProperties>
  <mso:CompatibleManagedProperties msdt:dt="string"></mso:CompatibleManagedProperties>
  <mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
  <mso:MasterPageDescription msdt:dt="string"></mso:MasterPageDescription>
  <mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106601 </mso:ContentTypeId>
  <mso:TargetControlType msdt:dt="string">;#Refinement;#</mso:TargetControlType>
  <mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
  <mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
  <mso:HtmlDesignStatusAndPreview msdt:dt="string">Link to the file, Conversion successful.</mso:HtmlDesignStatusAndPreview>
</mso:CustomDocumentProperties>
{{< / highlight >}}

When you provision your file as draft, the design engine will automatically fill in the metadata properties.

Provision your files like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<Module Name="_catalogs" Url="_catalogs/masterpage/Display Templates/Content Web Parts" Path="_catalogs/masterpage">
  <File Url="Item_Announcements.html" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true"></File>
</Module>

<Module Name="_catalogs" Url="_catalogs/masterpage/Display Templates/Filters" Path="_catalogs/masterpage">
  <File Url="Control_Custom_Refinement.html" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true"></File>
</Module>
{{< / highlight >}}

When provisioning JavaScript Display Templates you need to add one property to your elements file: **ContentType**. If you do not specify this content type property, your Item Display Templates for the Content by Search Web Part will not be recognized.

{{< highlight html "linenos=table,noclasses=false" >}}
<Module Name="_catalogs" Url="_catalogs/masterpage/Display Templates/Content Web Parts" Path="_catalogs/masterpage">
  <File Url="Item_Announcements.js" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true">
    <Property Name="ContentType" Value="Display Template Code" />
  </File>
</Module>
{{< / highlight >}}

_Note: filter display styles seem to not have any problems when you don't specify the ContentType property._

## 4. Provision the HTML and the JavaScript Files Together

This one is very important, I struggled with this one a couple hours. When you try to provision only the HTML file, the first time everything will run smoothly. Your JavaScript file will be created, and metadata is correctly filled in. But from the moment you make any modification to the HTML file in your solution and provision the file again, the HTML file gets updated, but the JavaScript file isn't.

The best way that worked for me is to provision the HTML and the JavaScript file together. It seems that the Design Manager also works this way. For the moment a file gets updates, it will package the HTML and JavaScript file.

The way I'm doing this right now is like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<Module Name="_catalogs" Url="_catalogs/masterpage/Display Templates/Filters" Path="_catalogs/masterpage">
  <File Url="Control_Custom_Refinement.html" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true"></File>
  <File Url="Control_Custom_Refinement.js" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true">
    <Property Name="ContentType" Value="Display Template Code" />
  </File>
</Module>
{{< / highlight >}}


## 5. Create a Feature Receiver to Update and Publish your Display Templates

When the display templates are provisioned, you will need to do the following two things:

1.  Trigger an update > this is needed to update the JavaScript file (so the JavaScript file should definitely have the correctly converted markup);
    *   The update can be triggered with "item.Update()";
2.  Publish the file > otherwise they will not be available of site readers.
The best way to update and publish your display templates is via a Feature Receiver on the FeatureActivated event. This is what I also used to do in SharePoint 2010 to publish the master page and page layouts when using a Sandboxed Solution.

You only need to publish the HTML version, from the moment the HTML file gets published, the engine will automatically published the associated JavaScript file.

## Updates

### 19/02/2013

Made some changes to the third and fourth section about how to provision JavaScript Display Templates.

### 29/04/2013

Made some modifications to the fifth section based on my experience of a previous project.