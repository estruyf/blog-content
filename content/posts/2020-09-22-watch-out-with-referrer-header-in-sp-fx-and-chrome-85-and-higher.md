---
title: SPFx issues with the new Referrer-Policy in Chrome >= 85
slug: /watch-referrer-header-spfx-chrome-85-higher/
author: Elio Struyf
type: post
date: 2020-09-22T11:42:25.339Z
draft: false
tags:
  - Development
  - Security
  - Browsers
categories: []
comments: true
---

Since version 85 of Chrome, the default referrer policy has changed from `no-referrer-when-downgrade` to `strict-origin-when-cross-origin`. This change might have a significant impact on your SharePoint Framework solutions when they rely on the referrer header (or better, the referer header with a single "r"). 

## What is the referrer header?

Whenever your browser does an API call, the `referrer` header gets used to indicate the page's origin from where it was performed. 

With the previous default in Chrome (`no-referrer-when-downgrade`), this would be the full URL of the page in SharePoint. Example: `https://tenant.sharepoint.com/sites/<site>/SitePages/just-a-page.aspx`.

With the new policy, the URL provided changes from the full URL to the origin URL. Example: `https://tenant.sharepoint.com/`.

## What is the impact?

On the Google Chrome documentation page, they mention that visual impact is expected to be limited. 

When building solutions only in SharePoint, this will not generate any impact when used without a back-end. If you use a back-end and use the referrer header as a validation mechanism, this will impact your solution. As you now receive the SharePoint tenant URL, instead of the absolute page URL.

{{< caption-new "/uploads/2020/09/chrome1.png" "Referrer header - origin URL"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA8SURBVDXBwQ3AIAwEwb3gSHTl/tvhaZAv4pEZZaYlUXuDTVXxG2NwzmGtxdPdRARvBN2NJCRxGbDNnJMPlf0Zmb2+crYAAAAASUVORK5CYII=" "398" >}}

{{< blockquote type="info" text="Read more about the new default referrer policy in Chrome on: [A new default Referrer-Policy for Chrome: strict-origin-when-cross-origin](https://developers.google.com/web/updates/2020/07/referrer-policy-new-chrome-default)" >}}

## What with other browsers?

Only Chrome and Safari seem to be using the `strict-origin-when-cross-origin` referrer-policy at the moment by default.

Microsoft Edge and Firefox are still using the `no-referrer-when-downgrade` policy, but be aware, for Microsoft Edge, they are experimenting with the `strict-origin-when-cross-origin` policy, and the Firefox team is considering to move as well.

You can follow the status of the browser implementations here: https://github.com/privacycg/proposals/issues/13

## What can you do for now?

If you rely on the `referrer` header for your API, best is to specify the `referrerPolicy` for these calls as follows:

```typescript
await ctx.httpClient.post(creatorUrl, HttpClient.configurations.v1, {
  headers: {
    "Authorization": `Bearer ${token}`,
    "content-type": "application/json",
  },
  referrerPolicy: 'no-referrer-when-downgrade', // Provide `referrerPolicy` option for falling back to the previous default
  body: JSON.stringify(msg)
});
```

The result should be that the full URL now gets provided when calling the API.

{{< caption-new "/uploads/2020/09/chrome2.png" "Referrer header - full URL"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAjSURBVAXBQREAMBCEMJBW/4Zu9kMT33ttYxsqd0eFSkWFyge2PROIJAyQ7gAAAABJRU5ErkJggg==" "887" >}}