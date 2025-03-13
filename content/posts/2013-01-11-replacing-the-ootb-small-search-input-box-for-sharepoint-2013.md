---
title: Replacing the OOTB Small Search Input Box in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-01-11T16:50:38+00:00
slug: /replacing-the-ootb-small-search-input-box-for-sharepoint-2013/
dsq_thread_id:
  - 3836446036
categories:
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - Search
  - Searchbox
comments: true
---

This week I started with a branding upgrade project from 2010 to 2013. Throughout this upgrade process I needed to customize the OOTB small search input box (the search box that is shown at the top right of the site).

The requirements were the following:

*   Changing the default text (change the "search this site" text);
*   Allow query suggestions (this is enabled by default in 2013);
*   Change the result page address.
The process of replacing the search box is still the same as in 2010 or 2007, but I will guide you through it.

The Delegate Control in the master page stayed the same:

```html
<SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
```

The delegate control points to a file in the OSearchBasicFeature feature (like in 2010). The element file that is referenced is the **SearchArea.xml** file. The default location of this element file is: C:\Program Files\Common Files\microsoft shared\Web Server Extensions\15\TEMPLATE\FEATURES\OSearchBasicFeature\SearchArea.xml

The content of the file looks like this:

```html
<?xml version="1.0" encoding="utf-8" ?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Control  Id="SmallSearchInputBox" 
            Sequence="50"
            ControlClass=" Microsoft.Office.Server.Search.WebControls.SearchBoxScriptWebPart" ControlAssembly="Microsoft.Office.Server.Search, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c">
    <Property Name="UseSharedSettings">true</Property>
    <Property Name="RenderTemplateId">~sitecollection/_catalogs/masterpage/Display Templates/Search/Control_SearchBox_Compact.js</Property>
    <Property Name="EmitStyleReference">false</Property>
    <Property Name="ServerInitialRender">true</Property>
    <Property Name="TryInplaceQuery">false</Property>
    <Property Name="QueryGroupNamesJson">[&quot;MasterPage&quot;]</Property>
    <Property Name="ChromeType">None</Property>
    <Property Name="ID">SmallSearchInputBox1</Property>
  </Control>  
</Elements>
```

A lot of changes have been made compared to the previous version.

Here is the content of the 2010 version:

```html
<?xml version="1.0" encoding="utf-8" ?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Control Id="SmallSearchInputBox" 
           Sequence="50"
           ControlClass="Microsoft.SharePoint.Portal.WebControls.SearchBoxEx" ControlAssembly="Microsoft.Office.Server.Search, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c">
  <Property Name="GoImageUrl">/_layouts/images/gosearch15.png</Property>
  <Property Name="GoImageUrlRTL">/_layouts/images/gosearchrtl15.png</Property>
  <Property Name="GoImageActiveUrl">/_layouts/images/gosearchhover15.png</Property>
  <Property Name="GoImageActiveUrlRTL">/_layouts/images/gosearchrtlhover15.png</Property>
  <Property Name="DropDownMode">ShowDD</Property>
  <Property Name="SearchResultPageURL">/_layouts/osssearchresults.aspx</Property>
  <Property Name="ScopeDisplayGroupName"></Property>
  <Property Name="FrameType">None</Property>
  </Control>
</Elements>
```

Like in every new version of SharePoint, the assembly references have been changed, but the biggest change is that it is using a new control the **SearchBoxScriptWebPart** instead of the SearchBoxEx control.

One of the best changes (in my opinion) is the possibility to specify your own search box template file (this can be done by creating a new display template in the masterpage gallery). You can specify your own template by changing the **RenderTemplateId** property (OOTB referencing the Control_SearchBox_Compact.js file).

> **Note**: if you set the **ServerInitialRender** property to true, the control will not use the display templates, but render the HTML markup from the assembly instead.

The only "downside" is that new property names are being used. For instance the property to change the default text of the search box in 2010 was the **QueryPromptString** property, in 2013 this has been changed to the **InitialPrompt** property.

Changing the custom results page URL is now done with the **ResultsPageAddress** property (in 2010 this was the SearchResultPageURL property).

These were two properties I regularly used in SharePoint 2010, to see all the properties that are available in SharePoint 2013 they can be found here: [http://msdn.microsoft.com/en-us/library/microsoft.office.server.search.webcontrols.searchboxscriptwebpart_properties.aspx](http://msdn.microsoft.com/en-us/library/microsoft.office.server.search.webcontrols.searchboxscriptwebpart_properties.aspx)

> **Note**: an easy way to test out all the new properties is to create add a search box web part on a page via SharePoint Designer and changing the settings. There you could easily see what happens with the properties and what their values are.

## Replacing the search box

Replacing the OOTB search box can be done the same way as in SharePoint 2007 or 2010. The way to do this is overriding the delegate control for the SmallSearchInputBox.

1.  Create an empty SharePoint project in Visual Studio 2012;
2.  Add an empty element;
3.  Update the **element.xml** file content with the content you got from the SearchArea.xml file;
4.  Make your modifications to the **element.xml** file.
Here is an example of my elements.xml file:

```html
<?xml version="1.0" encoding="utf-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Control 
    Id="SmallSearchInputBox" 
    Sequence="10" 
    ControlClass=" Microsoft.Office.Server.Search.WebControls.SearchBoxScriptWebPart" ControlAssembly="Microsoft.Office.Server.Search, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c">
    <Property Name="ChromeType">None</Property>
    <Property Name="InitialPrompt">Search the intranet site</Property>
    <Property Name="RenderTemplateId">~sitecollection/_catalogs/masterpage/Display Templates/Search/Control_SearchBox_Compact.js</Property>
    <Property Name="ResultsPageAddress">../Search/Pages/Results.aspx</Property>
    <Property Name="ShowQuerySuggestions">true</Property>
    <Property Name="TryInplaceQuery">false</Property>
    <Property Name="UseSharedSettings">false</Property>
    <Property Name="QuerySuggestionMinimumPrefixLength">3</Property>
  </Control>
</Elements>
```

**Note**: sequence number must be smaller than the default one (default is set to 50).

**Note 2**: when you want to redirect the query to your own search page, the **TryInplaceQuery** property must be set to **false**.

Deploy your solution when you're ready.

## Changes

### 25/06/2014

Updated the sequence number of my example code to **10** instead of **25**. Mikael Svenson noticed that there was already a control set with that sequence number, so the searchbox control wasn't replaced correctly.