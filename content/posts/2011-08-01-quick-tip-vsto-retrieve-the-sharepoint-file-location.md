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

{{< caption-new "/uploads/2011/08/080111_1124_QuickTipVST1.png" "Document Information Panel"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AMvO19XY3tLT2trK0NnL0tjI0NrP19vc5drb483Q2IGOGP7C1u5/AAAAAElFTkSuQmCC" "605" "63" >}}

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

{{< caption-new "/uploads/2011/08/080111_1124_QuickTipVST2.png" "Retrieve File Location"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAX0lEQVR4nBXGQQqDMBAF0Nz/RL1ADyAEiWMoMQmaTvGPMwbtsvStnns8h5o88w4oM/4Rs7Pf1zdmdq2t2D+mp4gBCqiIHdpV+8Zw3k80l1ze05wDLWNIFOsrNYo10PID1b5RDnHnKsEAAAAASUVORK5CYII=" "605" "176" >}}

{{< caption-new "/uploads/2011/08/080111_1124_QuickTipVST3.png" "Retrieved Location"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXklEQVR4nAXByRGAIAwAQPpvyBJ8O+NHUUQJ4YjiAZHx565oWmVW7VYI4BxGxEiUznSXp4zaCwxnSncY5yhVfkrOzPzW+jFXT5foejlrOyxWGQ+WNhPQHfuRDdCk4AfB2VFpImTz8AAAAABJRU5ErkJggg==" "605" "177" >}}