---
title: Testing and debugging your SPFx solutions in production without causing any impact
author: Elio Struyf
type: post
date: 2018-03-29T13:22:38+00:00
slug: /testing-and-debugging-your-spfx-solutions-in-production-without-causing-any-impact/
dsq_thread_id:
  - 6583370478
categories:
  - Development
  - SharePoint
tags:
  - Debugging
  - SharePoint Framework
  - SPFx
comments: true
---

Hey developer, the solution which was just deployed in production is not working. Can you have a look at and fix it? This is probably something which you might have heard before. As every user and environment are unique, it could be caused by different things.

> **IMPORTANT**: Use this approach to test and find out what is wrong. Do not use it to develop new functionality into your solution(s).

Within JavaScript / TypeScript project, your first thing to check is the browser developer tools console. These might give you your first clue.

{{< caption-legacy "uploads/2018/03/032918_1310_Testingandd1.png" "Browser developer tools errors" >}}

In most cases, when things go wrong, you will see errors like these in the console and they also point you to the line in the script where it happened. I know that you might think right now, but aren't the production bundles for SharePoint Framework solutions minimized? Yes, they are.

{{< caption-legacy "uploads/2018/03/032918_1310_Testingandd2.png" "Minimized JS files" >}}

Chrome has the capability to make these scripts "pretty" again. Which allows you to make reading and debugging them a little bit easier, but still it might be hard.

## An ideal solution

For simple things making these scripts "pretty" again would be sufficient, but in most cases, you want to debug the code you wrote and not the one that got transpiled, minified and bundled. Luckily there is a solution for this in SharePoint Framework, which is to use the **loadSPFx** and **debugManifestFile** query string parameters which are also used for SPFx extension debugging. Lucky for me, Waldek wrote about it today, so most of it written in his article.

> **Read more**: [Easily test SharePoint Framework web parts on modern pages](https://blog.mastykarz.nl/easily-test-sharepoint-framework-web-parts-modern-pages/) from Waldek Mastykarz.

The process of what you can do when something happens in an environment where your solution is already deployed is the following:

*   Spin up your local development environment with: `gulp serve --nobrowser`
*   Append the following to the URL: `?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js`
*   Click on **Load debug scripts**
*   Open the page and start debugging

{{< caption-legacy "uploads/2018/03/032918_1310_Testingandd3.png" "Debugging your local files instead of the bundle" >}}

Doing it this way, you are actually loading the web part from your own local instance without impacting anyone else which is using it. Plus, it allows you to also test out some environment specific things, which you might not have taken into account in your dev./test environments.

## Using this method for multiple environments

You can also make it easier and configure all your known environments in your SPFx solution. Read more about this in Mikael Svenson his post: [Quick tip: easily test SharePoint Framework web parts on modern pages (addendum to Waldek's post)](http://www.techmikael.com/2018/03/quick-tip-easily-test-sharepoint.html).