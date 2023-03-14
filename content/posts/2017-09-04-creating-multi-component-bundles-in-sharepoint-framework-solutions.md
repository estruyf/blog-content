---
title: Creating multi-component bundles in SharePoint Framework solutions
author: Elio Struyf
type: post
date: 2017-09-04T17:50:03+00:00
slug: /creating-multi-component-bundles-in-sharepoint-framework-solutions/
dsq_thread_id:
  - 6119416742
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - SharePoint Framework
  - SPFx
comments: true
---

One of the new things in the latest releases is the functionality to bundle multiple components into a single JavaScript bundle file.

> **Quote**: Multi-component bundles can make it easier to share code and logic across similar components, as well as reduce the overall size of your JavaScript since you only get one instance of the shared code.

This is not yet documented, but as I was updating my gulp task script for changing environment settings, I wanted to test things out.

## Config.json updates

The process of creating multi-component bundles seem fairly easy. Since the v1.2.0 release of SharePoint Framework, the config.json structure got changed.

### The old structure

{{< caption-legacy "uploads/2017/09/090417_1744_Creatingmul1.png" "Old config.json structure" >}}

In the old structure, the entries property contained an entry per asset you were building. For example, a web part or extensions.

### The new structure

In the new structure, it looks like this:

{{< caption-legacy "uploads/2017/09/090417_1744_Creatingmul2.png" "New config.json version 2.0 structure" >}}

> **Info**: When you want to migrate an application from an older version to the current v1.2.0 one, you will have to update the config.json file. Luckily there is a handy command for this: gulp --upgrade. Once you have ran this, the config.json structure gets updated to version 2.0. Mikael Svenson wrote an article about the upgrade process which you can read here: [http://www.techmikael.com/2017/08/how-to-update-sharepoint-framework.html](http://www.techmikael.com/2017/08/how-to-update-sharepoint-framework.html)

What you can see in the updated config file is that the **entries** section has been changed to a **bundles** section. By default, for every component, a new bundle will be created, like how it was with the previous configuration file.

So, if we would add a couple more components, we get the following output:

{{< caption-legacy "uploads/2017/09/090417_1744_Creatingmul3.png" "Multiple component bundles" >}}

## Making your own multi-component bundles

In order to make multi-component bundles, you will have to add your component entries to a specific bundle of your choice. Like you can see here:

{{< caption-legacy "uploads/2017/09/090417_1744_Creatingmul4.png" "Combining components into one bundle" >}}

What I did in this bundle is combining the **hello-world-web-part** and **second-web-part** in one bundle called the** multi-webpart-bundle**. When you now bundle your project, this will create two bundles:

{{< caption-legacy "uploads/2017/09/090417_1744_Creatingmul5.png" "Bundle file ouput" >}}

At the end of the **multi-webpart-bundle.js** file, you can see that it exports two components:

{{< caption-legacy "uploads/2017/09/090417_1744_Creatingmul6.png" "Bundle component ID details" >}}

These IDs correspond to the IDs in the manifest of the web parts. When you test the web parts in the workbench, you will only see that one bundle file being loaded for both web parts:

{{< caption-legacy "uploads/2017/09/090417_1744_Creatingmul7.png" "Sources in Chrome" >}}

> **Info**: this was just an article to show you what you can expect and how it works. The documentation around this topic will probably be released very soon.
