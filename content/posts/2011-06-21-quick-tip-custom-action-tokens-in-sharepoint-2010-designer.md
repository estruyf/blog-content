---
title: 'Quick Tip: Custom Action Tokens in SharePoint 2010 Designer'
author: Elio Struyf
type: post
date: 2011-06-21T16:31:19.000Z
slug: /quick-tip-custom-action-tokens-in-sharepoint-2010-designer/
dsq_thread_id:
  - 3836444689
categories:
  - SharePoint
  - SharePoint Designer
tags:
  - Custom Actions
  - Ribbon
  - SharePoint Designer
comments: true
---

SharePoint 2010 Designer allows you to create custom actions for the SharePoint ribbon or the item context menu.

{{< caption-legacy "uploads/2011/06/062111_1631_QuickTipCus1.png" "Custom Actions in SharePoint Designer" >}}

These custom actions can be used to start a workflow, navigate to a form, and navigate to a custom URL.

{{< caption-legacy "uploads/2011/06/062111_1631_QuickTipCus2.png" "Action Types" >}}

For the last option you can make use of "Tokens". These tokens enable you to create a variable URL's.

The tokens that could be used are the following:
<table style="margin: 0 auto;">
<tbody>
<tr>
<td>**Token**</td>
<td>**Replaced With**</td>
</tr>
<tr>
<td>~site</td>
<td>SPContext.Current.Web.ServerRelativeUrl</td>
</tr>
<tr>
<td>~sitecollection</td>
<td>SPContext.Current.Site.ServerRelativeUrl</td>
</tr>
<tr>
<td>{ItemId}</td>
<td>item.ID.ToString()</td>
</tr>
<tr>
<td>{ItemUrl}</td>
<td>item.Url</td>
</tr>
<tr>
<td>{SiteUrl}</td>
<td>web.Url</td>
</tr>
<tr>
<td>{ListId}</td>
<td>list.ID.ToString("B")</td>
</tr>
<tr>
<td style="width: 100px;">{RecurrenceId}</td>
<td>item.RecurrenceID</td>
</tr>
</tbody>
</table>

## Examples


{{< highlight text "linenos=table,noclasses=false" >}}
~site/ = /demo/CustomAction/SubSite/
~sitecollection/ = /demo/CustomAction/
{ItemId} = 2
{ItemUrl} = /demo/ CustomAction /Lists/Custom/2_.000
{SiteUrl} = http://jtb-sp2010elst2/demo/CustomAction
{ListId} = {59e393f7-3fc3-4408-86f9-6819bbdf6886}
{RecurrenceId} = Not tested
{{< / highlight >}}

More information about the RecurrenceId can be found [here](http://gvaro.wordpress.com/2009/03/17/recurrenceid-attribute-of-the-customaction-element/).
