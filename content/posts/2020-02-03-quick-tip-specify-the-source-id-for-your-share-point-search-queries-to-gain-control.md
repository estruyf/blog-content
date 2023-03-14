---
title: >-
  Best practice: specify the Local SharePoint results source ID to gain search
  control
slug: /best-practice-local-sharepoint-results-source-id-gain-search-control/
author: Elio Struyf
type: post
date: 2020-02-03T13:08:03.172Z
draft: false
tags:
  - Development
  - Search
  - SharePoint
categories: []
comments: true
---

When creating solutions based on SharePoint search, you best always define the source ID of the **Local SharePoint results** source with each call. By providing that source ID with each request, you make sure that the results you expect for your solutions are always the same.

## Which ID?

The **Local SharePoint results** source ID you are looking for is: `8413cd39-2156-4e00-b54d-11efd9abdb89`.

## How?

The "how" depends on the type of solution you are building. For instance, if you are using CSOM or REST APIs, this would be different.

### REST API

In a REST API, it would look as follows: `/_api/search/query?querytext='<your-query>'&sourceid='8413cd39-2156-4e00-b54d-11efd9abdb89'`.

### CSOM API

{{< highlight csharp "linenos=table,noclasses=false" >}}
KeywordQuery keywordQuery = new KeywordQuery(clientCtx)
{
    QueryText = $"<your-query>",
    SourceId = new Guid("8413cd39-2156-4e00-b54d-11efd9abdb89")
};
{{< / highlight >}}

## Why?

If your building custom solutions for environments, you do not control. It could mean that the results you were expecting are not the ones that SharePoint return. In most cases, the reason is that an admin changed the default result source, but that is not always the case.

Last week we ran into an interesting situation where results were different for app-only calls versus user calls to search. During a quick troubleshooting session with [Mikael Svenson](https://twitter.com/mikaelsvenson), we found that the quick fix was to include this source ID.

Be sure to always use it. That way, you keep control because the **Local SharePoint results** source cannot be changed.

*Keep on searching*
