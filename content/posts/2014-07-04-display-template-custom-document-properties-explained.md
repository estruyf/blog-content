---
title: Display template custom document properties explained
author: Elio Struyf
type: post
date: 2014-07-04T15:04:53+00:00
slug: /display-template-custom-document-properties-explained/
dsq_thread_id:
  - 3836611772
categories:
  - Display Templates
  - SharePoint 2013
tags:
  - Display Templates
  - Search
comments: true
---

In this post all the search display template custom document properties of are explained.

Here is an example of how an out-of-the-box display template document property section looks like:

```html
<mso:CustomDocumentProperties>
  <mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
  <mso:ManagedPropertyMapping msdt:dt="string">'Link URL'{Link URL}:'Path','Line 1'{Line 1}:'Title','Line 2'{Line 2}:','FileExtension','SecondaryFileExtension'</mso:ManagedPropertyMapping>
  <mso:MasterPageDescription msdt:dt="string">This Item Display Template will show a small thumbnail icon next to a hyperlink of the item title, with an additional line that is available for a custom managed property.</mso:MasterPageDescription>
  <mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106603</mso:ContentTypeId>
  <mso:TargetControlType msdt:dt="string">;#Content Web Parts;#</mso:TargetControlType>
  <mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
  <mso:HtmlDesignStatusAndPreview msdt:dt="string">http://site/_catalogs/masterpage/Display Templates/Content Web Parts/Item_TwoLines.html, Conversion successful.</mso:HtmlDesignStatusAndPreview>
  <mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
</mso:CustomDocumentProperties>
```


## Content Type IDs

The following values can be specified for the **ContentTypeId** property:
<div>
<table style="border-collapse: collapse;" border="1"><colgroup> <col style="width: 312px;" /> <col style="width: 321px;" /></colgroup>
<tbody valign="top">
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">**Display Template**</td>
<td style="padding-left: 7px; padding-right: 7px;">**ID**</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Control Display Template</td>
<td style="padding-left: 7px; padding-right: 7px;">0x0101002039C03B61C64EC4A04F5361F385106601</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Group Display Template</td>
<td style="padding-left: 7px; padding-right: 7px;">0x0101002039C03B61C64EC4A04F5361F385106602</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Item Display Template</td>
<td style="padding-left: 7px; padding-right: 7px;">0x0101002039C03B61C64EC4A04F5361F385106603</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Filter Display Template</td>
<td style="padding-left: 7px; padding-right: 7px;">0x0101002039C03B61C64EC4A04F5361F385106604</td>
</tr>
</tbody>
</table>
</div>

```html
<mso:ContentTypeId msdt:dt="string">0x0101002039C03B61C64EC4A04F5361F385106601</mso:ContentTypeId>
```

## Target Control Type

This property **TargetControlType** specifies which web parts can use the display template.
<div>
<table style="border-collapse: collapse;" border="1"><colgroup> <col style="width: 312px;" /> <col style="width: 321px;" /></colgroup>
<tbody valign="top">
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">**Web Part**</td>
<td style="padding-left: 7px; padding-right: 7px;">**Property Value**</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Content Search Web Part</td>
<td style="padding-left: 7px; padding-right: 7px;">Content Web Parts</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Search Result Web Part</td>
<td style="padding-left: 7px; padding-right: 7px;">SearchResults</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Search Hover Panel (used in the in combination with the item template)</td>
<td style="padding-left: 7px; padding-right: 7px;">SearchHoverPanel</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Searchbox</td>
<td style="padding-left: 7px; padding-right: 7px;">SearchBox</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Refinement Web Part</td>
<td style="padding-left: 7px; padding-right: 7px;">Refinement</td>
</tr>
<tr style="border:1px solid #000">
<td style="padding-left: 7px; padding-right: 7px;">Taxonomy Refinement Web Part</td>
<td style="padding-left: 7px; padding-right: 7px;">TaxonomyRefinement</td>
</tr>
</tbody>
</table>
</div>

```html
<mso:TargetControlType msdt:dt="string">;#Content Web Parts;#</mso:TargetControlType>
```


## Master Page Description

As the name suggests, the **MasterPageDescription** property defines the description you want to give to the display template.

```html
<mso:MasterPageDescription msdt:dt="string">Description</mso:MasterPageDescription>
```


## Template Hidden

The **TemplateHidden** property specifies if the template is hidden for people to select it in one of the search web parts. Values can either be **0 (visible)** or **1 (hidden)**.

```html
<mso:TemplateHidden msdt:dt="string">0</mso:TemplateHidden>
```


## Managed Property Mapping (Item Display Template)

The **ManagedPropertyMapping** property needs to be used to determine which managed properties needs to be retrieved to make use of them in the item display template. The format in which these should be provided is: "slot name"{display name in web part properties}:"managed property name".

> **Note**: the display name isn't required, you could also specify it as: "slot name":"managed property name".

```html
<mso:ManagedPropertyMapping msdt:dt="string">'Link URL'{Link URL}:'Path','Title':'Title'</mso:ManagedPropertyMapping>
```

You could also specify multiple values for a specific slot. That way, if the first property doesn't contain a value, it takes the next one.

```html
<mso:ManagedPropertyMapping msdt:dt="string">'Picture URL'{Picture URL}:'PublishingImage;PictureURL;PictureThumbnailURL'</mso:ManagedPropertyMapping>
```


## Compatible Search Data Types (Filter Display Template)

The **CompatibleSearchDataTypes** property can only be used in the filter display template. It specifies for which types of search data types the template can be used.

The following values can be used:

*   Text
*   Integer
*   Decimal
*   DateTime
*   YesNo

```html
<mso:CompatibleSearchDataTypes msdt:dt="string">;#Text;#</mso:CompatibleSearchDataTypes>
<mso:CompatibleSearchDataTypes msdt:dt="string">;#Text;#Integer;#Decimal;#DateTime;#YesNo;#</mso:CompatibleSearchDataTypes>
```

> **Note**: more information about this property can be found here: [Create Your First Search Refiner Control Template](https://www.eliostruyf.com/part-1-create-first-search-refiner-control-template/).

## Compatible Managed Properties (Filter Display Template - Optional)

With the **CompatibleManagedProperties** property you can specify the managed property names you would like to use the filter display template with.

The values in this property should be separated with commas.

```html
<mso:CompatibleManagedProperties msdt:dt="string">contentclass,FileType</mso:CompatibleManagedProperties>
```

> **Note**: at the moment I haven't used this property. During the first tests, I didn't notice any difference by applying this property. If you check the JavaScript version of the display template, you'll see that the **CompatibleManagedProperties** property is added, but it's never used. 

## Html Design Associated

This **HtmlDesignAssociated** property describes if there is a JavaScript version of the display template associated to the HTML version.

```html
<mso:HtmlDesignAssociated msdt:dt="string">1</mso:HtmlDesignAssociated>
```


## Preview URL (will automatically be defined by SharePoint)

The **HtmlDesignStatusAndPreview** will automatically be defined by SharePoint from the moment you create the HTML display template. This property gives a link to the HTML version of the display template and a status description. If there is a problem, it will say **Warnings and Errors**. Otherwise you'll get **Conversion successful**.

## Design Conversion Succeeded (will automatically be defined by SharePoint)

The **HtmlDesignConversionSucceeded** is linked to the previous property. If the display template conversion is successful the following property and value gets added to the display template:

```html
<mso:HtmlDesignConversionSucceeded msdt:dt="string">True</mso:HtmlDesignConversionSucceeded>
```
