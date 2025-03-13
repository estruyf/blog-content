---
title: How to Provision Your Design Files in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-01-31T20:43:55+00:00
slug: /how-to-provision-your-design-files-in-sharepoint-2013/
dsq_thread_id:
  - 3836446071
categories:
  - Branding
  - SharePoint 2013
tags:
  - Page Layouts
  - Provisioning
comments: true
---

When upgrading my clients' page layouts from SharePoint 2010 to 2013, I stumbled on something annoying. The content of my page layouts was not being updated when I deployed a new version of my page layout solution. Everything seemed to be correct, because the file itself was correctly provisioned the first time. But when I made a change in one of my Page Layouts and redeploying the solution, the content of the page layout stayed the same.

## Provision a Page Layout

To provision a Page Layout in SharePoint 2010 to the master page gallery, I used this kind of markup:

```html
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Module Name="PageLayouts" Url="_catalogs/masterpage">
    <File Path="PageLayouts\My-Article-Page.aspx" Url="My-Article-Page.aspx" Type="GhostableInLibrary">
      <Property Name="Title" Value="My Custom Article Page" />
      <Property Name="MasterPageDescription" Value="This is my custom Article page for SharePoint 2010" />
      <Property Name="ContentType" Value="$Resources:cmscore,contenttype_pagelayout_name;" />
      <Property Name="PublishingAssociatedContentType" Value=";#$Resources:cmscore,contenttype_articlepage_name;; #0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900242457EFB8B24247815D688C526CD44D;#" />
    </File>  
  </Module>
</Elements>
```

_Note: Spaces have been added to the PublishingAssociatedContentType to better fit on the screen_

In SharePoint 2013 a couple of things have changed. The new markup that SharePoint itself uses for provisioning a page layout file looks like this:

```html
<File Path="PageLayouts\My-Article-Page.aspx" Url="My-Article-Page.aspx" Type="GhostableInLibrary" Level="Draft">
  <Property Name="ContentTypeId" Value="0x01010007FF3E05 7FA8AB4AA42FCB67B453FFC100 E214EEE741181F4E9F7ACC43278EE811003A22BFC19B81124C923710F952434E5E" />
  <Property Name="FileLeafRef" Value="My-Article-Page.aspx" />
  <Property Name="MasterPageDescription" Value="This is my custom Article page for SharePoint 2010" />
  <Property Name="UIVersion" Value="15" />
  <Property Name="Title" Value="My Custom Article Page" />
  <Property Name="PublishingHidden" Value="FALSE" />
  <Property Name="PublishingAssociatedContentType" Value=";#Article Page;#0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900242457EFB8B24247815D688C526CD44D;#" />
  <Property Name="HtmlDesignAssociated" Value="FALSE" />
  <Property Name="ContentType" Value="Page Layout" />
  <Property Name="_ModerationStatus" Value="3" />
  <Property Name="FileDirRef" Value="_catalogs/masterpage" />
  <Property Name="FSObjType" Value="0" />
</File>
```

_Note: you can check this by creating a design package via the new Design Manager, and check the content that has been generated.
_

When creating a custom page layout solution, I placed this markup in the elements file. But when the solution got deployed, the content of the page layout never updated from the moment the page layout got published.

## Overwriting the Page Content

It seems that there is a new attribute that can be set when provisioning files to SharePoint. This new attribute is called **ReplaceContent**, and as the name itself says, it specifies if you want to replace the content of the file.

The **ReplaceContent** attribute needs to be used in the **File** element like this:

```html
<File Path="PageLayouts\My-Article-Page.aspx" Url="My-Article-Page.aspx" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true">
...
</File>
```


## Provision a Published Version

But the ReplaceContent is not the only useful attribute that has been introduced in SharePoint 2013. You now have a **Level** attribute which specifies if the file is provisioned as draft or published version.

```html
<File Path="PageLayouts\My-Article-Page.aspx" Url="My-Article-Page.aspx" Type="GhostableInLibrary" Level="Draft">
<File Path="PageLayouts\My-Article-Page.aspx" Url="My-Article-Page.aspx" Type="GhostableInLibrary" Level="Published">
```


## Wrap-up

So if you want to provision your design files to SharePoint, it is best to use the two new attributes that have been introduced in SharePoint 2013. This will make things a bit easier, and you will not have to create any type of event receiver to publish your design files.

## How to Provision Your Master Pages

For provision master pages, the same approach as discussed above can be used. The only difference will be the properties you're going to provide. The properties that I use in my elements file the following:

```html
<File Url="your-master-page.master" Type="GhostableInLibrary" Level="Published" ReplaceContent="true">
  <Property Name="ContentTypeId" Value="0x01010500BF544AFE46ACEF42B8DA22C9CE89526E" />
  <Property Name="UIVersion" Value="15" />
  <Property Name="Title" Value="Your Master Page Title" />
  <Property Name="ContentType" Value="Master Page" />
  <Property Name="_ModerationStatus" Value="0" />
  <Property Name="FSObjType" Value="0" />
</File>
```


## Updates

### 13/06/2013

Added the **How to Provision Your Master Pages** section.