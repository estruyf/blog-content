---
title: '#DevHack: Create SharePoint library with the Microsoft Graph'
slug: /devhack-create-sharepoint-library-microsoft-graph/
author: Elio Struyf
type: post
date: 2020-11-26T15:02:28.695Z
draft: false
tags:
  - API
  - Development
  - Microsoft Graph
  - SharePoint
categories: []
comments: true
---

When you are reading this, you are looking to create a SharePoint library from the Microsoft Graph. It is straightforward but a bit confusing because you will have to use the `lists` endpoint. When you are a SharePoint developer, we all learned that a list is not the same as a library, and lists get created under the `/lists/` URL path. Document libraries are not.

{{< blockquote type="Info" text="[Documentation to create a new list](https://docs.microsoft.com/en-us/graph/api/list-create?view=graph-rest-1.0&tabs=http)" >}}

When you want to create a new document library, you can perform the same call as mentioned in the create list documentation page instead of using the `genericList` template value. Use the `documentLibrary` value.

```text
POST /sites/{site-id}/lists
Content-Type: application/json

{
  "displayName": "YourLibraryName",
  "list": {
    "template": "documentLibrary"
  }
}
```

{{< blockquote type="Info" text="More information about all properties can be found here: [JSON body representation](https://docs.microsoft.com/en-us/graph/api/resources/list?view=graph-rest-1.0#json-representation)." >}}

*That is it for this #DevHack*
