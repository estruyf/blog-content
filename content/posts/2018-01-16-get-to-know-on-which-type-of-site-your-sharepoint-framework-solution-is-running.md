---
title: Get to know on which type of site your SharePoint Framework solution is running
author: Elio Struyf
type: post
date: 2018-01-16T09:31:02+00:00
slug: /get-to-know-on-which-type-of-site-your-sharepoint-framework-solution-is-running/
dsq_thread_id:
  - 6417055166
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - SharePoint Framework
comments: true
---

Depending on the solution you are creating, you might want to know on which type of site your SharePoint Framework solution is currently running. This could be useful to enable or disable certain functionalities the solution you are creating depending on the type of site. For example: enable some extra collaboration features in your solution when used on a team site, and disable the features when used on a communication site.

In classic SharePoint, we could retrieve this information from the _**spPageContextInfo** object in JavaScript. When building SharePoint Framework solutions, you can rely on the **PageContext** which you can retrieve from the context of your current solution: **ApplicationCustomizerContext**, **ExtensionContext**, **FieldCustomizerContext**, or **WebPartContext**.

The site type can be retrieved as follows:

```javascript
this.context.pageContext.web.templateName
```


> **Info**: **templateName** returns the string representing the numeric identifier for the site definition or site template that was used to create the site.

What you get from this property is the web template ID. Here is a list of values you get from the modern sites and classic team site:

<table style="border-collapse: collapse;" border="1">
<tbody valign="top">
<tr>
<td style="padding-right: 15px;"><strong>Template name value</strong></td>
<td><strong>Site type</strong></td>
</tr>
<tr>
<td style="padding-right: 15px;">1</td>
<td>Classic team site</td>
</tr>
<tr>
<td style="padding-right: 15px;">64</td>
<td>Modern team site</td>
</tr>
<tr>
<td style="padding-right: 15px;">68</td>
<td>Communication site (topic, showcase, blank)</td>
</tr>
</tbody>
</table>