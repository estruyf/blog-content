---
title: "#DevHack: Use Cloudflare CDN for your Azure Storage caching"
slug: /devhack-cloudflare-cdn-azure-storage-caching/
author: Elio Struyf
type: post
date: 2021-01-20T14:54:46.731Z
draft: false
tags:
  - Azure
  - CDN
  - Hosting
categories: []
comments: true
preview: /social/3f2e5f4d-d08b-4780-912a-2507d46995f8.png
---

Getting your files faster to your clients is very important. There are various options for this. Last year, we started to look into Azure CDN to quickly and reliably provide our source files to our customers. The Azure CDN is put in front of an Azure Storage account on which we host the files in different blob containers.

Azure CDN is highly configurable but has one major downside, its variable pricing. By variable I mean, that it will depend on the actual usage. We calculated that we would quickly pay over € 1000 to serve the files each month to serve our project's files. We got this number from the Azure calculator, and it gives you a good estimation.

Suddenly it struck me that we might be able to make use of Cloudflare. As they have fixed price offerings, you know what you will be paying each month. The process for setting up Cloudflare for providing your Azure Storage blobs is relatively easy.

## Cloudflare configuration

Go to Cloudflare, and register your domain. If you already have a registered domain, go to the **DNS** tab, and configure a CNAME record as follows:

{{< caption-new "/uploads/2021/01/cloudflare1.png" "CDN - CNAME record in Cloudflare"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAqSURBVBXBMQ4AIAwDsYMQ9f8/7VIEUxH2yMy2TUTQ3VRt1hKfJDyhzuUBNGsM0/lMlykAAAAASUVORK5CYII=" "830" >}}

- Type: `CNAME`
- Name: `cdn` (or anything you want)
- Target: `<azure-storage-account>.blob.core.windows.net`

{{< blockquote type="important" text="In the target, you need to add your name from the Azure Storage account." >}}

Once you configured this record, you can set up this custom domain on your Azure Storage Account.

## Setting up a custom domain for your Azure Storage account

On the Azure Storage portal, open your Azure Storage Account. Under **Blob service** you will find the **Custom domain** link.

{{< caption-new "/uploads/2021/01/cloudflare2.png" "Provide the CDN domain name for your storage account"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACuSURBVHXBQVLDMAxA0S/JxXHCojvufzqWTMK0E1uWDWGGZd+Tz73NTU40b7THzlvZ6K1yS8a6rvxL71qZE2Z7YmZEOzFVIoLjOLiYGamUwr7vXNydnDOtNUSEMQYigqqiZsYlIhhj4O703rn03okI3B3l1xiD3jtzTtwdVaXWiojg7ogI6esZSLlzK/zpMREVsoAgfKyGCCTrD3ROcs4sy8IrKc5Ja43zuyJ35ZUfzrFfdlC/uZoAAAAASUVORK5CYII=" "353" >}}

Once you filled in your domain name, you are all set in my case `cdn.eliostruyf.com`.

{{< blockquote type="important" text="It can take some time before the record is available, so go and grab a coffee first." >}}

That is all you need to do to configure Cloudflare CDN to use it for your Azure Storage Account.
