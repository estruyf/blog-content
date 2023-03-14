---
title: '#DevHack: Deep linking to Microsoft Teams in Android and iOS'
slug: /devhack-deep-linking-microsoft-teams-android-ios/
author: Elio Struyf
type: post
date: 2020-10-21T13:33:10.367Z
draft: false
tags:
  - Development
  - Devhack
  - Microsoft Teams
categories: []
comments: true
---

This week #DevHack is about opening Microsoft Teams deep links from your solution/app. For a new proof of concept, I wanted to open a chat/app from my PWA app quickly. Luckily Microsoft Teams supports this with their `deep links` functionality.

{{< blockquote type="Info" text="Read more about Microsoft Teams deep links here: [deep links documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-links)" >}}

In the documentation, it states that you must use the `https://teams.microsoft.com/l/...` URL. The URL point to `chats`, `meetings`, `apps`, and more. In your browser, this works fine. For instance, if you use this URL in an anchor element: `https://teams.microsoft.com/l/chat/0/0?users=<email>`. It will automatically open Microsoft Teams chat for the specified user.

When I tried this approach on iOS, I faced an issue that another browser window would open on top of your PWA. When you reopen your PWA, you will have to close the browser window first before continuing the app, which is not an ideal situation.

Luckily the solution to solve it is very simple. Instead of specifying `https`, you can use `msteams`. This change will redirect your request to Microsoft Teams on your mobile instead of first opening a browser and redirecting you.

The URL would look as follows: `msteams://teams.microsoft.com/l/chat/0/0?users=<email>`.

**PS**: PWA is fun and powerful.
