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

{{< caption-new "/uploads/2011/06/062111_1631_QuickTipCus1.png" "Custom Actions in SharePoint Designer"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA9klEQVR4nB3JMU7DMBQAUB+KmYsVBnYOwMLAwsIEEkdAXWBA0CqRIjVpYjv+dhLbP7YTm9YI3vqI+Xyq91/toS0bVtXQsx2tr/jxhjcb2twS93DhHi9F+VbVbVEUQhzRglKdUnSaGBmKO76794ZbgyCYDwsDnVLKf86EfVyz903AaZ4DWmsM9j3EGP83E3F4lfWL0ROiW8Ia1zQjzqidX73zJCwLoqeU9X0vlfpJiQPsigIO26r8JssardUAMAyDlCqfT6N2+5LypmpbSVKM1loJAEKMw5BzdmhY1wql66Yjs+ZKadoxIWTwYY3Zq+14fA7rSevpF+xH81A93XneAAAAAElFTkSuQmCC" "261" "236" >}}

These custom actions can be used to start a workflow, navigate to a form, and navigate to a custom URL.

{{< caption-new "/uploads/2011/06/062111_1631_QuickTipCus2.png" "Action Types"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZ0lEQVR4nCXCSwrCMBAA0Nz/eiqIaA3NfJuZdCgki3Qj1MdLnyUDim7uHua7t6jWzHZVizhSc4dS3Oy4RETv/ZznnHOMkVT4cb/l76JMQsiEm4pbdasqnNzq+/WENTOWf4KVEYSRCX6yrW2FCngOhQAAAABJRU5ErkJggg==" "501" "202" >}}

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


```text
~site/ = /demo/CustomAction/SubSite/
~sitecollection/ = /demo/CustomAction/
{ItemId} = 2
{ItemUrl} = /demo/ CustomAction /Lists/Custom/2_.000
{SiteUrl} = http://jtb-sp2010elst2/demo/CustomAction
{ListId} = {59e393f7-3fc3-4408-86f9-6819bbdf6886}
{RecurrenceId} = Not tested
```

More information about the RecurrenceId can be found [here](http://gvaro.wordpress.com/2009/03/17/recurrenceid-attribute-of-the-customaction-element/).
