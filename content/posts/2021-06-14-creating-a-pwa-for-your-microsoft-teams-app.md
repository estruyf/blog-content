---
title: Creating a PWA for your Microsoft Teams app
slug: /creating-pwa-microsoft-teams-app/
author: Elio Struyf
type: post
date: 2021-06-14T14:42:11.954+02:00
draft: false
tags:
  - Microsoft Teams
  - PWA
categories: []
comments: true
preview: /social/f787d55e-3ce1-4d96-8c79-17ba9216e3f5.png
lastmod: '2021-06-28T13:27:22.361Z'
keywords:
  - pwa
---

Progressive Web Apps (PWA) are nothing new, but you see more and more websites implementing them. PWA provides you a way to bring your site as an app to your desktop/tablet/mobile. For [Squarl](https://squarl.com), I first thought of creating a mobile app, but at the beginning of a new product. There is a lot to take care of, which made me feel a native mobile app is a right thing? It will be in the future of the product, but PWA will provide all functionality to get started.

Before implementing the PWA functionality in the site, I took a look at the Microsoft Teams mobile experience. The advantage of using your app in Microsoft Teams is the whole authentication logic. When your app is using SSO, you do not need to do anything anymore. Only the mobile layout for your application is a requirement.

{{< blockquote type="Important" text="There are cases where you need a real mobile app experience, but using the Microsoft Teams experience is an easy way to start." >}}

## Why would you use the app in Microsoft Teams?

Authentication and security. As a user, you already signed in to your Microsoft Teams app. That way, you do not have to do this in your app or PWA. All of these things are taken care of in the Microsoft Teams app itself. You only need to care about the functionality. 

## How can users access your app?

Finding your app in the mobile Microsoft Teams UI is not as intuitive like on the desktop client. For instance, a personal tab typically appears on the app bar. On mobile, the app bar is at the bottom but does not show any custom apps. You need to click on the **more** tab and find the app you want to use.

<video height="70%" controls>
  <source src="/uploads/2021/06/default-experience.mp4" type="video/mp4">
</video>

In this case, many users will not know that they can also access the app on their mobile. 

## Improving the experience

Let us go for the best of both, use the Microsoft Teams experience, but use a PWA to make it easier to reach your app. 

Now you might be thinking, how would a PWA help you to get a better user experience?

I came up with the PWA to redirect the user to the app in your Microsoft Teams client. This way, the user does not need to undergo the same manual actions to open your app. One click on an app icon, and it will load it in the Microsoft Teams client. The experience looks as follows:

<video height="70%" controls>
  <source src="/uploads/2021/06/squarl_as_pwa.mp4" type="video/mp4">
</video>

The good part of this solution is that it is pretty easy to set up, and you only need to keep one codebase up to date. For Squarl, the PWA is created on the public website.

## Cool, how do you start?

What you need are two things:

1. PWA manifest file
2. Redirect logic

In my case, I have added both on the public website and are accessible on the `/pwa` path.

### PWA Manifest

The manifest is required for the PWA as your browser uses that to create the app.

My manifest looks as follows:

{{< highlight json "linenos=table,noclasses=false" >}}
{
  "dir": "ltr",
  "lang": "en-US",
  "name": "Squarl - Stop searching, start working.",
  "short_name": "Squarl",
  "display": "standalone",
  "background_color": "#fbb03b",
  "theme_color": "#ffffff",
  "description": "Squarl - Stop searching, start working",
  "orientation": "portrait",
  "related_applications": [],
  "prefer_related_applications": "false",
  "icons": [
    {
      "src": "/manifest-icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/manifest-icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/favicon.ico",
      "sizes": "16x16 24x24 32x32 48x48 64x64 128x128 256x256"
    }
  ],
  "start_url": "/pwa?redirect=true",
  "screenshots": []
}
{{< / highlight >}}

{{< blockquote type="Important" text="Notice the `redirect` query string parameter in the `start_url` property. The website uses the `redirect` query string to know if your app needs to be redirected. You can also create another path if you want." >}}

You need to add the manifest to your page with the following `link` element.

```
<link rel="manifest" href="/manifest.json" />
```

### The redirect logic

To redirect to your app in Microsoft Teams, you need to create a deep link URL. The URL which you need for the app looks as follows: 

```
msteams://teams.microsoft.com/l/entity/{app id}/{entity}
```

The `app id` is the ID you defined in your Microsoft Teams app manifest. The entity is the `tab` ID you want it to open. For example, for Squarl it looks as follows:

```
msteams://teams.microsoft.com/l/entity/8b15fc13-87f2-4ff4-8149-d075220d3dbd/index
```

You will need to implement the logic to redirect the user to your deep link on the page you want to load for your PWA. 

**Wait!** It just requires one more thing when you would do a `location.href = "your deep link"`. It will not work. What will happen is that your link will open a browser, and from the browser, you get redirected to your Microsoft Teams client. A way to make it work without opening the browser is by adding a link and clicking on the link via JS. That way, it will redirect you properly. Once you implemented this logic, your PWA should behave similarly to what I showed above.
