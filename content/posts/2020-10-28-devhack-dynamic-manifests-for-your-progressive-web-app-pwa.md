---
title: '#DevHack: Dynamic manifests for Progressive Web App aka PWA'
slug: /devhack-dynamic-manifests-progressive-web-app-aka-pwa/
author: Elio Struyf
type: post
date: 2020-10-28T10:25:18.062Z
draft: false
tags:
  - Development
  - Devhack
  - PWA
categories: []
comments: true
---

In the previous #DevHack, I told you how to use deep links in your PWA for Microsoft Teams. This approach I currently implemented in one of my proof of concepts. Another functionality that my POC needed to have is to have dynamic manifest creating for the PWA.

{{< blockquote type="Info" text="[#DevHack: Deep linking to Microsoft Teams in Android and iOS](https://www.eliostruyf.com/devhack-deep-linking-microsoft-teams-android-ios/)" >}}

In this #DevHack, I will tell you how you can make it possible to get dynamic manifests for your PWA using Azure Static Web Apps and Azure Functions.

## Approaches

When I started my journey with PWAs and dynamic manifests, I found two approaches:

1. Create the manifest on the fly with JavaScript;
2. Use a dynamically generated manifest.

The first approach is what I used from the start. This approach does not require anything special, except some extra JavaScript code to add the page's manifest data. 

This approach worked fine on iOS and Windows/macOS, but we noticed a different behavior when testing it on Android devices. Android never recognized our PWA as a "real" PWA. Instead, Android created it as a bookmark to the site.

## Solution

The only working solution for dynamically generated manifests is to make use of an API. My POC created as an Azure Static Web App can handle this by adding an Azure Function.

{{< highlight typescript "linenos=table,noclasses=false" >}}
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const name = req.query.name;
  const enityId = req.query.enityId;
  const appId = req.query.appId;

  context.res = {
    body: {
      name,
      short_name: name,
      description: name,
      background_color: "#ffffff",
      theme_color: "#ffffff",
      display: "standalone",
      start_url: `/entity/?appId=${appId}&enityId=${enityId}&name=${name}`,
      icons: [
        {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "/maskable_icon.png",
          "sizes": "196x196",
          "type": "image/png",
          "purpose": "any maskable"
        }
      ]
    },
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export default httpTrigger;
{{< / highlight >}}

In my React application, I call the Azure Function with the following logic:

{{< highlight react "linenos=table,noclasses=false" >}}
<Helmet>
  <link id="teams_manifest" rel="manifest" href={`/api/manifest.webmanifest?${QS_APP_ID}=${encodeURIComponent(appId)}&${QS_ENTITY_ID}=${encodeURIComponent(enityId)}&${QS_NAME}=${appName}`} />
</Helmet>
{{< / highlight >}}

{{< blockquote type="Info" text="using [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) to do changes to the document head." >}}