---
title: "Linking and Unlinking Multilingual Pages in SharePoint"
longTitle: ""
customField: ""
slug: "/linking-unlinking-multilingual-pages-sharepoint/"
description: "Learn how to link and unlink multilingual pages in SharePoint using the REST API."
date: "2023-09-29T10:52:33.580Z"
lastmod: "2023-09-29T10:52:33.142Z"
preview: "/social/86bf5a0d-c713-458a-aaa6-db11bcc929ce.png"
draft: false
comments: true
tags:
  - "Multilingual"
  - "SharePoint"
type: "post"
---

It has been a while since I wrote an article about SharePoint, but in the last couple of weeks, I got interested in linking and unlinking multilingual pages in SharePoint. This functionality is proper when you migrate pages from other sites to multilingual ones. Still, it can also be helpful to remap pages in case of some information architecture changes. Out-of-the-box SharePoint does not provide this functionality, but you can achieve it using the SharePoint REST API.

{{< blockquote type="info" text="Read the following article to get more background information on how multilingual pages work in SharePoint - [Using the new multilingual APIs in Modern SharePoint](https://www.eliostruyf.com/multilingual-apis-modern-sharepoint/)" >}}

In this article, I will show you how to link and unlink multilingual pages in SharePoint using the SharePoint REST API.

## Prerequisites

Before you can start linking and unlinking multilingual pages, you will need to get the following things:

- The form digest value of the site, we need to perform an update on the list items endpoint
- Disable read-only on the following fields `_SPIsTranslation`, `_SPTranslationLanguage`, and `_SPTranslationSourceItemId` of the Site Pages library

### Getting the form digest value

You can retrieve the form digest value via the `/_api/contextinfo` API or use the `DigestCache` service in SPFx.

```typescript 
import { IDigestCache, DigestCache } from "@microsoft/sp-http";

const digestCache: IDigestCache = context.serviceScope.consume(
  DigestCache.serviceKey
);
const formDigest = await digestCache.fetchDigest(this.serverRelativeUrl);
```

### Disabling read-only on the fields

To link and unlink a page, you need to set/unset values in the `_SPIsTranslation`, `_SPTranslationLanguage`, and `_SPTranslationSourceItemId` fields. By default, they are set to read-only, so before an update, you will need to turn off the read-only flag and enable it after the update.

```text 
POST https://<tenant>.sharepoint.com/<site>/_api/web/GetList(@listUrl)/fields/getByInternalNameOrTitle('<internal name>')?@listUrl='<site>/SitePages'

content-type: application/json;odata=verbose;
accept: application/json
X-RequestDigest: <form digest value>
X-Http-Method: MERGE
Odata-Version: 3.0

{
  "__metadata": {
    "type": "SP.Field"
  },
  "ReadOnlyField": false
}
```

{{< blockquote type="info" text="The `ReadOnlyField` property is where you define if the field is read-only or not." >}}

## Linking multilingual pages

In case you want to link a specific page to a multilingual page, you will need to get the following things:

- The source ID (better known as the `UniqueId`) of the page in the default language
- The locale of the page
- The ID (list item ID) of the page to link

For example, the default language of my site is English (en-us), and I want to link a Dutch (nl-nl) page to the English source page. I need the `UniqueId` of the English page, the Dutch page's list item ID, and the locale.

- `<source id>`: `UniqueId` of the English page: `f836da40-cc3c-44bf-af44-464662d5a123`
- `<locale>`: Locale of the Dutch page: `nl-nl`
- `<item id>`: The list ID of the Dutch page: `36`

You can link the Dutch page to the English page with these three things. You can do this with the following REST API call:

```text 
POST https://<tenant>.sharepoint.com/<site>/_api/web/GetList(@listUrl)/items(<item id>)?@listUrl='<site>/SitePages'

content-type: application/json;odata=verbose;
accept: application/json
X-RequestDigest: <form digest value>
X-Http-Method: MERGE
If-Match: *
Odata-Version: 3.0

{
  "__metadata": {
    "type": "SP.Data.SitePagesItem"
  },
  "OData__SPIsTranslation": true,
  "OData__SPTranslationLanguage": "<locale>",
  "OData__SPTranslationSourceItemId": "<source id>"
}
```

{{< blockquote type="info" text="We set the `_SPIsTranslation` to let SharePoint know it is a translation linked to the source page." >}}

Once you have executed this call, you will see that the Dutch page is linked to the English page.

## Unlinking multilingual pages

Unlinking a multilingual page is similar to linking a page. You can use the action to remove the link between the source page and the translation page to allow another page to be linked to the source page.

The call to perform is similar to the page linking one, but now we need to unset the `_SPTranslationSourceItemId` field value.

```text 
POST https://<tenant>.sharepoint.com/<site>/_api/web/GetList(@listUrl)/items(<item id>)?@listUrl='<site>/SitePages'

content-type: application/json;odata=verbose;
accept: application/json
X-RequestDigest: <form digest value>
X-Http-Method: MERGE
If-Match: *
Odata-Version: 3.0

{
  "__metadata": {
    "type": "SP.Data.SitePagesItem"
  },
  "OData__SPTranslationSourceItemId": null
}
```

Once you have performed the (un)link calls, do not forget to set the read-only flag back to `true` on the fields.
