---
title: '#DevHack: CORS for Cloudflare cached Azure Storage blobs'
slug: /devhack-setting-cors-azure-storage-blobs-cloudflare/
author: Elio Struyf
type: post
date: 2021-02-15T15:44:35.311Z
draft: false
tags:
  - Azure
  - cloudflare
  - cors
  - Devhack
categories: []
comments: true
---

In the previous post, I told you why we moved to Cloudflare CDN to serve our Azure Storage files instead of Azure CDN. During the testing of Cloudflare, I found out that CORS headers were not present for the files. Usually, this is not needed if you only retrieve one file, but if you want to retrieve another file, for instance, a template from your site, these cross-origin resource sharing headers are required.

{{< blockquote type="Info" text="Read more about the move to Cloudflare here: [Use Cloudflare CDN for your Azure Storage caching](https://www.eliostruyf.com/devhack-cloudflare-cdn-azure-storage-caching/)." >}}

On the Azure CDN, I configured the CORS as an extra header to send with the response, but on Cloudflare, you cannot configure it easily on the portal. Luckily there are two ways to provide CORS headers via Cloudflare:

1. Create a Cloudflare worker that processes each request and adds the header. This approach requires some development and should only be used, in my opinion, if you do not have another choice.
2. On the Cloudflare support site, they state to set the CORS headers on the *origin server*. [Using cross-origin resource sharing (CORS) with Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200308847-Using-cross-origin-resource-sharing-CORS-with-Cloudflare). This approach is pretty straightforward.

## Setting CORS headers on Azure Storage

All you need to do to set the CORS headers is to open your Azure Storage Account in the Azure Portal. On the Azure Storage account, you can search for **CORS**.

For each of the services, you can define the CORS setting individually. In my case, I am only interested in the `blob service`. You can define for which kind of actions you want to pass the CORS headers on this settings page.

{{< caption-new "/uploads/2021/02/cors.png" "CORS Config on Azure Storage"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA3SURBVDXBMRKAIBAEwZlbc/z/JyVGEYvAbq/eVxIEkvBTqSo2leNsjWdO7jHYkiBgFSrrXVjyARdYDRgGlmG2AAAAAElFTkSuQmCC" "1577" >}}

Once you set your preferred settings, go back to Cloudflare and purge your cache to see an effect on all the files immediately.