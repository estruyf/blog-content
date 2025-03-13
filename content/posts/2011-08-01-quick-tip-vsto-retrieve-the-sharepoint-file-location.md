---
title: 'Quick Tip: VSTO Retrieve The SharePoint File Location'
author: Elio Struyf
type: post
date: 2011-08-01T11:24:33+00:00
slug: /quick-tip-vsto-retrieve-the-sharepoint-file-location/
dsq_thread_id:
  - 3882753694
categories:
  - Development
  - Office
  - SharePoint
tags:
  - Add-in
  - VSTO
comments: true
---

Visual Studio Tools for Office (VSTO) can be used to develop add-ins (and more) for an Office application. In combination with the SharePoint Client Object Model, it could be used to retrieve additional information from a SharePoint site were the file is located.

You always need to specify a site URL when using the SharePoint Client Object Model. This URL can be retrieved from the document information panel.

{{< caption-new "/uploads/2011/08/080111_1124_QuickTipVST1.png" "Document Information Panel" >}}

This location can easily be retrieved in your VSTO add-in or document template. To retrieve this value use the following code snippet.

**Add-in**

```csharp
Globals.ThisAddIn.Application.ActiveDocument.Path
```

**Document Template**

```csharp
Globals.ThisDocument.Application.ActiveDocument.Path
```


## Example

{{< caption-new "/uploads/2011/08/080111_1124_QuickTipVST2.png" "Retrieve File Location" >}}

{{< caption-new "/uploads/2011/08/080111_1124_QuickTipVST3.png" "Retrieved Location" >}}