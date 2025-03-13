---
title: Client side managed property value formatting for catalog item page layouts
author: Elio Struyf
type: post
date: 2014-02-25T20:34:25+00:00
slug: /client-side-managed-property-value-formatting-catalog-item-page-layouts/
dsq_thread_id:
  - 3836715888
categories:
  - Cross-site Publishing
  - SharePoint 2013
tags:
  - Cross-site Publishing
  - Page Layouts
comments: true
---

In the last two blog posts, I covered how you could check which managed properties are available for the catalog item and I also explained a problem with DateTime values. In this post I'll cover the topic on how you could format the values on the client side.

The reason I created this post, is because there isn't much information available around this topic. The last couple of weeks I experimented a lot with the possibilities of cross-site publishing. One of the most important things is how you could format these managed properties. Sometimes the out-of-the-box value formatting won't fit your needs, that's why I started looking at the possibilities to do the formatting via different ways.

Normally the catalog item reuse web part renders the values on the server side, but with this method you don't have a lot of flexibility. For example you only have two options to visualise a DateTime value, with or without the time.

In this post I'll cover how you could format these values with the catalog item reuse web part and the content search web part with display templates.

## Client Side Value Formatting

As an example I'll explain how you could format a DateTime value.

### Catalog Item Reuse Web Part

In this section I'll cover how you could use the catalog item reuse web part to format values on the client side.

The first thing to do is to open you catalog item page layout (master page gallery: `CatalogItem-<your term set>.html`), and add a new catalog item reuse web part.

```html
<!--CS: [owstaxIdSliceCategory] Start Catalog-Item Reuse Snippet-->
<!--SPM:<cc1:CatalogItemReuseWebPart runat="server" UseServerSideRenderFormat="True" ResultType="" NumberOfItems="1" UseSharedDataProvider="True" OverwriteResultPath="False" ResultsPerPage="1"  SelectedPropertiesJson="[&#34;PublicationDate&#34;]" ID="g_06e4745b_ed51_499a_a184_4b535d459892" __WebPartId="{06e4745b-ed51-499a-a184-4b535d459892}">-->
<!--SPM:<RenderFormat>-->
<!--DC:Renders value from search without any additional formatting.-->
<!--SPM:</RenderFormat>-->
<!--SPM:</cc1:CatalogItemReuseWebPart>-->
<!--CE:End Catalog-Item Reuse Snippet-->
```

> **Important**: you will need to update the **SelectedPropertiesJson** attribute with your managed property name.

The next step is to apply your own display templates to the catalog item reuse web part. By default the catalog item reuse web part always loads two display templates:

1.  RenderTemplateId: /_catalogs/masterpage/display templates/system/control_catalogdefault.js
2.  ItemTemplateId: /_catalogs/masterpage/display templates/system/item_catalogdefault.js

> **Note**: if you know why they load these templates, please let me know, because they don't seem to be used by default.

If you want to change the display templates to be loaded, you'll need to specify the **RenderTemplateId** in your web part (the web part only checks on this property if it's specified, otherwise it will load the default ones). The good thing about these templates is that they have a clean mark-up, they don't add unnecessary elements.

For this example I created a new display template that will be used for the DateTime formatting (the link to the display template can be found at the bottom). Here is how the web part code block looks like:

```html
<!--CS: [owstaxIdSliceCategory] Start Catalog-Item Reuse Snippet-->
<!--SPM:<cc1:CatalogItemReuseWebPart runat="server" UseServerSideRenderFormat="True" ResultType="" NumberOfItems="1" UseSharedDataProvider="True" OverwriteResultPath="False" ResultsPerPage="1"  SelectedPropertiesJson="[&#34;PublicationDate&#34;]" ID="g_06e4745b_ed51_499a_a184_4b535d459892" __WebPartId="{06e4745b-ed51-499a-a184-4b535d459892}" RenderTemplateId="~sitecollection/_catalogs/masterpage/Display Templates/System/Control_CatalogDefault.js" ItemTemplateId="~sitecollection/_catalogs/masterpage/estruyf/Item_CatalogDateTime.js">-->
<!--SPM:<RenderFormat>-->
<!--DC:Renders value from search without any additional formatting.-->
<!--SPM:</RenderFormat>-->
<!--SPM:</cc1:CatalogItemReuseWebPart>-->
<!--CE:End Catalog-Item Reuse Snippet-->
```

At the moment, the web part still renders the value server side. To change this behaviour you need to change a couple of things to the web part. This are the thing you need to change:

*   **UserServerSideRenderFormat** attribute should be set to **False**;
*   **UseSharedDataProvider** attribute should be set to **False**;
*   A new property needs to be added: **DataProviderJSON** and it should contain the query that needs to be executed against the correct result source.

```html
<!--CS: [owstaxIdSliceCategory] Start Catalog-Item Reuse Snippet-->
<!--SPM:<cc1:CatalogItemReuseWebPart runat="server" UseServerSideRenderFormat="False" ResultType="" NumberOfItems="1" UseSharedDataProvider="False" OverwriteResultPath="False" ResultsPerPage="1"  SelectedPropertiesJson="[&#34;PublicationDate&#34;]" ID="g_06e4745b_ed51_499a_a184_4b535d459892" __WebPartId="{06e4745b-ed51-499a-a184-4b535d459892}" RenderTemplateId="~sitecollection/_catalogs/masterpage/Display Templates/System/Control_CatalogDefault.js" ItemTemplateId="~sitecollection/_catalogs/masterpage/estruyf/Item_CatalogDateTime.js" DataProviderJSON="{&#34;QueryTemplate&#34;:&#34;owstaxidSliceCategory:{URLTOKEN.1}&#34;,&#34;SourceID&#34;:&#34;DED6E249-29C2-4C53-839D-2DF8970BD8A8&#34;,&#34;PropertiesJson&#34;:&#34;{&#39;Tag&#39;:&#39;{Term}&#39;}&#34;}">-->
<!--SPM:<RenderFormat>-->
<!--DC:Renders value from search without any additional formatting.-->
<!--SPM:</RenderFormat>-->
<!--SPM:</cc1:CatalogItemReuseWebPart>-->
<!--CE:End Catalog-Item Reuse Snippet-->
```

> **Important**: if you search for the "DataProviderJSON" value in the page layout, you'll find the correct value to use for your environment.
_

After a page refresh you see the value appear:

{{< caption-new "/uploads/2014/02/022514_2034_Clientsidem1.png" "Client side value rendering" >}}

The ASPX code looks like this:

```html
<cc1:CatalogItemReuseWebPart 
	runat="server" 
	UseServerSideRenderFormat="False" 
	ResultType="" 
	NumberOfItems="1" 
	UseSharedDataProvider="False" 
	OverwriteResultPath="False" 
	ResultsPerPage="1" 
	SelectedPropertiesJson="[&quot;PublicationDate&quot;]"
	ID="g_06e4745b_ed51_499a_a184_4b535d459892"
	RenderTemplateId="~sitecollection/_catalogs/masterpage/Display Templates/System/Control_CatalogDefault.js" 
	ItemTemplateId="~sitecollection/_catalogs/masterpage/estruyf/Item_CatalogDateTime.js" 
	DataProviderJSON="{&quot;QueryTemplate&quot;:&quot;owstaxidSliceCategory:{URLTOKEN.1}&quot;,&quot;SourceID&quot;:&quot;DED6E249-29C2-4C53-839D-2DF8970BD8A8&quot;,&quot;PropertiesJson&quot;:&quot;{'Tag':'{Term}'}&quot;}">
<RenderFormat>
</RenderFormat>
</cc1:CatalogItemReuseWebPart>
```


### Content Search Web Part

Another possibility is to use the Content Search Web Part to render the managed property values.

```html
<!--MS:<cc1:ContentBySearchWebPart runat="server" AlwaysRenderOnServer="False" ResultType="" BypassResultTypes="False" NumberOfItems="1" QueryGroupName="Default" FrameType="None" __WebPartId="{18a39c80-a5c3-4476-950d-0eee191ed90a}" RenderTemplateId="~sitecollection/_catalogs/masterpage/Display Templates/System/Control_CatalogDefault.js" ItemTemplateId="~sitecollection/_catalogs/masterpage/estruyf/Item_CatalogDateTime.js" SelectedPropertiesJson="[&#34;PublicationDate&#34;]" DataProviderJSON="{&#34;QueryTemplate&#34;:&#34;owstaxidSliceCategory:{URLTOKEN.1}&#34;,&#34;SourceID&#34;:&#34;DED6E249-29C2-4C53-839D-2DF8970BD8A8&#34;,&#34;PropertiesJson&#34;:&#34;{&#39;Tag&#39;:&#39;{Term}&#39;}&#34;}">-->
<!--ME:</cc1:ContentBySearchWebPart>-->
```

The ASPX code for this block looks like this:

```html
<cc1:ContentBySearchWebPart 
	runat="server" 
	AlwaysRenderOnServer="False" 
	ResultType="" 
	BypassResultTypes="False" 
	NumberOfItems="1" 
	QueryGroupName="Default"
	FrameType="None"
	ID="g_18a39c80_a5c3_4476_950d_0eee191ed90a" 
	RenderTemplateId="~sitecollection/_catalogs/masterpage/Display Templates/System/Control_CatalogDefault.js" 
	ItemTemplateId="~sitecollection/_catalogs/masterpage/estruyf/Item_CatalogDateTime.js" 
	SelectedPropertiesJson="[&quot;PublicationDate&quot;]" 
	DataProviderJSON="{&quot;QueryTemplate&quot;:&quot;owstaxidSliceCategory:{URLTOKEN.1}&quot;,&quot;SourceID&quot;:&quot;DED6E249-29C2-4C53-839D-2DF8970BD8A8&quot;,&quot;PropertiesJson&quot;:&quot;{'Tag':'{Term}'}&quot;}">
</cc1:ContentBySearchWebPart>
```

The output is just the same as the previous one:

{{< caption-new "/uploads/2014/02/022514_2034_Clientsidem2.png" "Client side value rendering" >}}

## Overwrite the property mapping

To override the default property mapping, you need to specify the managed property in the following attributes:

*   PropertyMappings: **PropertyMappings="DateTime:PublicationDate"**
*   SelectedPropertiesJson: **SelectedPropertiesJson="[\&quot;PublicationDate\&quot;]"**

## Download

With this method, a lot more possibilities are possible.

Here is the template that is used for this post: [Item_CatalogDateTime](/uploads/2014/02/Item_CatalogDateTime.html)