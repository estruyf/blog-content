---
title: What is the right approach to cache data in your solution?
slug: /right-approach-cache-data-solution-solution/
author: Elio Struyf
type: post
date: 2020-10-15T14:02:18.353Z
draft: false
tags:
  - Development
  - SharePoint
  - Caching
categories: []
comments: true
---

We all want to be the fastest. We all want to make sure our apps outperform others, but what do you need to do for it? In this article, I will explain what the best approach is to cache your solutions.

{{< blockquote type="Important" text="When building on top of a platform like SharePoint, you will always have to deal with the fact that you cannot be faster than the platform itself. First-party gets priority over third-party." >}}

## All client-side

As you create most solutions (SharePoint/Microsoft Teams) these days with code that runs on the client their devices, performance is critical. For this, you should not do too many API calls, use small bundles, compress images, have an excellent CDN and cache policy.

The hardest thing in this is the number of API calls, in my opinion. If you want to show data, you need to make API calls. That is the only way forward, and you can make it more performant by caching this data.

## Caching API requests

If it is an API you own, you can implement a cache on both the API (server-side) and the client (browser). If you use Microsoft Graph or any other API you do not own, you will have to rely on the browser.

Your options for caching are local-, sessionStorage, and IndexedDB. The local- and sessionStorage are the easiest ones to use. IndexedDB is great for more massive data sets, but the APIs are a bit bulky to use.

## Storage types explained

### Session storage

The `sessionStorage` is great for when you want to cache data for its current session. This type of storage is often used, for example, to store the OAuth access tokens. When the user opens a new tab or browser window, it creates a new session.

### Local storage

This type of storage is similar to the `sessionStorage` apart from the persistent data. Your data gets saved across all browser sessions. Also, when you close and reopen a tab/browser.

### IndexedDB

As the name describes, this is a database in your browser. It allows you to do SQL-based transactions. This type of storage is great for larger amounts of data or when you want to work offline.

## When to use what?

Before I tell you what to use, you need to know that local- and sessionStorage have a limit of 5MB data storage. For storing API requests, this is a lot of space you can use.

{{< caption-new "/uploads/2020/10/size-matters.jpg" "Size matters for caching data"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAcACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APvbxTqH7V0fiHU7bwZ4a/Z+l8KqZJNE1TxP4k+IEOtXEUs94LaO/wBN0rw7PaQ3NtbRWf29Ibx4JpLkyWd5iKS1X9wrQz94mo8PiMop4XRUo1sNjKtVrVt1HTxNGKkrKKcbxak24JxSl/M9GeQRwtOOIw+bVMW3J1Z0MThKNGOyiqcamHrSnF+9KSmoSTUVGclJ8vutn/aBs7U6ibRdQNtAb5bLzWs1vDEv2lbRpwszWwm3iBplWUxbDIofIr1483LHncXPlXM4pxi5W95xi3JqLd7Jyk0tG3ueRLl5pcikocz5VJqUlG/uqUlGKlJKybUYpvVRWx//2Q==" "1950" >}}

### Are you the only one using it?

When you maintain the site, platform, or solution, you can certainly use the local- and sessionStorage. Only when you know when you will need to store more data, you might want to think about IndexedDB.

### What if you are building on top of a platform?

On SharePoint, you are, for sure, not the only one. Besides all the first-party solutions, you might have to take the third-party components also into account. Why? The reason is that each one of these components can take their share of the cake. Once you reach the local- or sessionStorage limit, depending on your solution, it might fail or slow down as data cannot be cached or retrieved from the cache. Of course, this could also affect the first-party or any other third-party components from using the storage.

When building solutions that will run on top of a platform you do not own, I would recommend using `IndexedDB`. With IndexedDB, you will avoid running into the space limit as its limit is the user's disk space.

{{< blockquote type="Important" text="There is a downside using `IndexedDB`. The downside is that the APIs feel like they were invented in 1999. They feel outdated and too complicated to use. Funny enough, this is something they are aware of. On the Mozilla Developers documentation [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) they even recommend using a library to make it easier." >}}

## Would IndexedDB not just be overkill?

Initially, I would have said yes to this question, but times changed, SharePoint became a lot more popular. SharePoint Framework itself became more popular, so everyone starts to cache. Here is an example of an OOTB team site in my environment (no customizations).

```bash
-------------------------
spfx-ndsi-1602769746742-197: 183987 Bytes => 0.17546367645263672 MB
spfx-ndsi-1602751398844-478: 256225 Bytes => 0.2443552017211914 MB
spfx-ndsi-1602751393221-402: 192882 Bytes => 0.1839466094970703 MB
spfx-ndsi-1602769742738-121: 502457 Bytes => 0.47918033599853516 MB
spfx-ndsi-1602769746715-521: 294128 Bytes => 0.2805023193359375 MB
Keys Starting With: spfx-ndsi
Total Keys: 5
Total Length: 1429679
Total Length (in MB): 1.363448143005371
-------------------------

-------------------------
odsp-ds-ViewNavDataSource-version: 36 Bytes => 0.000034332275390625 MB
odsp-ds-FavoriteFeed-version: 36 Bytes => 0.000034332275390625 MB
odsp-ds-acronymAndColors: 2 Bytes => 0.0000019073486328125 MB
odsp-ds-FavoriteFeed: 2 Bytes => 0.0000019073486328125 MB
odsp-ds-SiteDataSource({0209078f-7066-4a2c-b363-53d5ff3683bb})-version: 36 Bytes => 0.000034332275390625 MB
odsp-ds-AudiencesDataSource-version: 36 Bytes => 0.000034332275390625 MB
odsp-ds-acronymAndColors-version: 36 Bytes => 0.000034332275390625 MB
odsp-ds-SiteDataSource({fd5cd288-9f51-4560-aa2f-e42f8c90f54e})-version: 36 Bytes => 0.000034332275390625 MB
odsp-ds-ViewNavDataSource: 2 Bytes => 0.0000019073486328125 MB
odsp-ds-SiteDataSource({0209078f-7066-4a2c-b363-53d5ff3683bb}): 2 Bytes => 0.0000019073486328125 MB
odsp-ds-SiteDataSource({fd5cd288-9f51-4560-aa2f-e42f8c90f54e}): 2 Bytes => 0.0000019073486328125 MB
odsp-ds-AudiencesDataSource: 2 Bytes => 0.0000019073486328125 MB
Keys Starting With: odsp-ds
Total Keys: 12
Total Length: 228
Total Length (in MB): 0.000217437744140625
-------------------------

-------------------------
mssearchux-cache-sphome-mappednews: 35710 Bytes => 0.03405570983886719 MB
mssearchux-cache-sphome-mappedprefetch: 56881 Bytes => 0.054245948791503906 MB
mssearchux-cache-psst: 7388 Bytes => 0.007045745849609375 MB
mssearchux-cache-searchConfiguration: 6669 Bytes => 0.006360054016113281 MB
mssearchux-cache-spsites-activitiesprefetch: 79790 Bytes => 0.07609367370605469 MB
mssearchux-cache-pspd: 1564 Bytes => 0.001491546630859375 MB
mssearchux-cache-3sqf: 7904 Bytes => 0.007537841796875 MB
mssearchux-cache-searchcenterurl: 233 Bytes => 0.00022220611572265625 MB
mssearchux-cache-site-activities-rawsprefetch: 311950 Bytes => 0.2974987030029297 MB
mssearchux-cache-warmupMsb: 716 Bytes => 0.000682830810546875 MB
mssearchux-cache-warmupSubstrateSearch: 244 Bytes => 0.000232696533203125 MB
mssearchux-cache-personalaccountname: 752 Bytes => 0.0007171630859375 MB
mssearchux-cache-searchConfigurationFromEcs: 7126 Bytes => 0.0067958831787109375 MB
mssearchux-cache-sphome-rawnews: 345187 Bytes => 0.3291959762573242 MB
mssearchux-cache-sphome-rawsprefetch: 98427 Bytes => 0.09386730194091797 MB
Keys Starting With: mssearchux-cache
Total Keys: 15
Total Length: 960541
Total Length (in MB): 0.9160432815551758
-------------------------

remainingStorage: 2316080
remainingStorage (in MB): 2.2087860107421875
```

{{< blockquote type="Info" text="Here are only the ones logged that take the most space. When starting to search and navigating through the environment, this number goes up quickly as you can see at the end of the log, only 2MB available out of the 5MB." >}}

## Making your life easier

For the solutions we create at Valo, I thought why not make a dependency that makes it easier to use the IndexedDB for caching data. 

The dependency called `@valo/cache` is available on npm: [@valo/cache](https://www.npmjs.com/package/@valo/cache).

**Happy developing**