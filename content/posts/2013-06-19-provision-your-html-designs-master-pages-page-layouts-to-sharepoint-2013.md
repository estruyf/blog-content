---
title: Provision Your HTML Designs (Master Pages / Page Layouts) to SharePoint 2013
author: Elio Struyf
type: post
date: 2013-06-19T16:42:11+00:00
slug: /provision-your-html-designs-master-pages-page-layouts-to-sharepoint-2013/
dsq_thread_id:
  - 3836445956
categories:
  - Branding
  - SharePoint 2013
tags:
  - Design Files
  - HTML
  - Master Page
  - Page Layouts
  - Styling
comments: true
---

A couple of months ago I wrote some posts about provisioning design files in SharePoint 2013 ([display templates](https://www.eliostruyf.com/how-to-provision-display-templates-in-sharepoint-2013/), [none html design files](https://www.eliostruyf.com/how-to-provision-your-design-files-in-sharepoint-2013/)). One thing I did not described is how you can provision your HTML master page and page layout design files.

Most of the research (read time) was already done when I was trying to find out the best way to provision display templates. It seemed that the best solution was to update and publish the display templates from the moment they got provisioned on your site. The update triggers SharePoint to convert the HTML layout to a JavaScript display template.

The same approach can also be used when you want to provision your HTML design files to SharePoint. In the following sections I'll describe what you need to do for provisioning a master page and page layouts.

## Provision HTML Master Page

When you create a new HTML master page in SharePoint 2013, it will automatically get all the required properties set in the file itself (if created with the design manager).

```html
<!--[if gte mso 9]><xml>
  <mso:CustomDocumentProperties>
    <mso:ContentType msdt:dt="string">Design File</mso:ContentType>
    <mso:ContentTypeId msdt:dt="string">0x0101000F1C8B9E0EB4BE489F09807B2C53288F0054AD6EF48B9F7B45A142F8173F171BD10003D357F861E29844953D5CAA1D4D8A3A</mso:ContentTypeId>
    <mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
    <mso:HtmlDesignFromMaster msdt:dt="string"></mso:HtmlDesignFromMaster>
    <mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
    <mso:HtmlDesignStatusAndPreview msdt:dt="string">http://sp2013app/brand/import/_catalogs/masterpage/custom-master.html, Conversion successful.</mso:HtmlDesignStatusAndPreview>
  </mso:CustomDocumentProperties>
</xml><![endif]-->
```

**Note**: If you created a copy from the Seattle or Oslo master page, the **ContentTypeId** property is not specified. You don't really have to specify the ID, the **ContentType** property is enough.

Provisioning the HTML Master Page is really easy, because you do not have to specify the properties anymore. Here is an example of the module elements file:

```html
<?xml version="1.0" encoding="utf-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Module Name="_catalogs" Url="_catalogs/masterpage" Path="_catalogs">
    <File Url="custom-master.html" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true" />
  </Module>
</Elements>
```

Important is that the property **ReplaceContent** for the file is set to true. Otherwise the content of the HTML file doesn't get updated if you create a new version of your branding package.

## Provision HTML Page Layout

HTML page layouts can be provisioned just the same way as the HTML master pages. The properties are also added to the file when it gets created:

```html
<!--[if gte mso 9]><xml>
  <mso:CustomDocumentProperties>
  <mso:ContentPlaceHolderHashPlaceHolderPageTitleInTitleArea msdt:dt="string">1</mso:ContentPlaceHolderHashPlaceHolderPageTitleInTitleArea>
  <mso:ContentPlaceHolderHashPlaceHolderMain msdt:dt="string">1</mso:ContentPlaceHolderHashPlaceHolderMain>
  <mso:HtmlDesignStatusAndPreview msdt:dt="string">http://sp2013app/brand/import/_catalogs/masterpage/HTML Page Layout.html, Conversion successful.</mso:HtmlDesignStatusAndPreview>
  <mso:ContentTypeId msdt:dt="string">0x01010007FF3E057FA8AB4AA42FCB67B453FFC100E214EEE741181F4E9F7ACC43278EE8110003D357F861E29844953D5CAA1D4D8A3B</mso:ContentTypeId>
  <mso:ContentPlaceHolderHashPlaceHolderPageTitle msdt:dt="string">1</mso:ContentPlaceHolderHashPlaceHolderPageTitle>
  <mso:ContentPlaceHolderHashPlaceHolderAdditionalPageHead msdt:dt="string">1</mso:ContentPlaceHolderHashPlaceHolderAdditionalPageHead>
  <mso:HtmlDesignFromMaster msdt:dt="string">http://sp2013app/brand/import/_catalogs/masterpage/seattle.html, http://sp2013app/brand/import/_catalogs/masterpage/seattle.html</mso:HtmlDesignFromMaster>
  <mso:PublishingAssociatedContentType msdt:dt="string">;#Article Page;#0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900242457EFB8B24247815D688C526CD44D;#</mso:PublishingAssociatedContentType>
  <mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
  <mso:ContentPlaceHolderChangedPlaceHolderTopNavBar msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderTopNavBar>
  <mso:ContentPlaceHolderChangedPlaceHolderPageTitle msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderPageTitle>
  <mso:ContentPlaceHolderHashPlaceHolderTitleBreadcrumb msdt:dt="string">683900979</mso:ContentPlaceHolderHashPlaceHolderTitleBreadcrumb>
  <mso:ContentPlaceHolderHashPlaceHolderFormDigest msdt:dt="string">1833940137</mso:ContentPlaceHolderHashPlaceHolderFormDigest>
  <mso:ContentPlaceHolderChangedPlaceHolderAdditionalPageHead msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderAdditionalPageHead>
  <mso:ContentPlaceHolderChangedPlaceHolderMain msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderMain>
  <mso:ContentPlaceHolderChangedPlaceHolderFormDigest msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderFormDigest>
  <mso:ContentPlaceHolderChangedPlaceHolderSearchArea msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderSearchArea>
  <mso:ContentPlaceHolderHashPlaceHolderLeftNavBar msdt:dt="string">1289116816</mso:ContentPlaceHolderHashPlaceHolderLeftNavBar>
  <mso:ContentPlaceHolderHashPlaceHolderSearchArea msdt:dt="string">50717157</mso:ContentPlaceHolderHashPlaceHolderSearchArea>
  <mso:ContentPlaceHolderChangedPlaceHolderLeftNavBar msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderLeftNavBar>
  <mso:ContentPlaceHolderHashPlaceHolderTopNavBar msdt:dt="string">2010927482</mso:ContentPlaceHolderHashPlaceHolderTopNavBar>
  <mso:ContentPlaceHolderChangedPlaceHolderPageDescription msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderPageDescription>
  <mso:ContentPlaceHolderHashPlaceHolderPageDescription msdt:dt="string">1337919370</mso:ContentPlaceHolderHashPlaceHolderPageDescription>
  <mso:ContentPlaceHolderChangedPlaceHolderPageTitleInTitleArea msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderPageTitleInTitleArea>
  <mso:ContentPlaceHolderChangedPlaceHolderTitleBreadcrumb msdt:dt="string">True</mso:ContentPlaceHolderChangedPlaceHolderTitleBreadcrumb>
  <mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
  </mso:CustomDocumentProperties>
</xml>
<![endif]-->
```

The module elements file looks like this:

```html
<?xml version="1.0" encoding="utf-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Module Name="_catalogs" Url="_catalogs/masterpage" Path="_catalogs">
    <File Url="HTML Page Layout.html" Type="GhostableInLibrary" Level="Draft" ReplaceContent="true" />
  </Module>
</Elements>
```


## What to do next?

When these design files get provisioned, one thing you'll notice is that at this moment no **master** or **aspx** file gets created. SharePoint still needs to have a trigger to start the conversion process of the design file.

This trigger can be just an item update without really changing anything to the item itself. Here is an example of the method I'm using:

```csharp
public static void EditAndCheckingAndApprove(SPFile file)
{
  try
  {
    // Edit the item, this triggers SharePoint to convert the HTML file
    if (file.CheckOutType != SPFile.SPCheckOutType.None)
    {
      UpdateHtmlPageLayoutProperty(file);
      file.Item.Update();
    }
    else
    {
      file.CheckOut();
      UpdateHtmlPageLayoutProperty(file);
      file.Item.Update();
    }

    // Check the file in and approve it if needed
    file.CheckIn("Checked in by the branding feature.", SPCheckinType.MajorCheckIn);
    if (file.DocumentLibrary.EnableModeration)
    {
      file.Approve("Approved by the branding feature.");
    }
  }
  catch (Exception Ex)
  {
  }
}

private static void UpdateHtmlPageLayoutProperty(SPFile file)
{
  if(file.Item.ContentType.Name != "Html Page Layout") return;

  // Update the HtmlDesignFromMaster property with your master page
  var Hyperlink = new SPFieldUrlValue { Url = string.Format("{0}/_catalogs/masterpage/Seattle.html", file.Web.Url) };
  file.Item["HtmlDesignFromMaster"] = Hyperlink;
}
```

> **Important:** the hyperlink of the **HtmlDesignFromMaster** property needs to match to your master page. Please update the hyperlink on **line 35** in your project.

## Updates

### 26/06/2013

Updated the C# code to support provisioning HMTL page layouts to a different site collection. When the **HtmlDesignFromMaster** property of a page layout is set to a master page on another site collection, you will retrieve a error when you want to open the page in the design manager.