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

{{< caption-new "/uploads/2017/09/090417_1744_Creatingmul1.png" "Old config.json structure"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVR4nBXKSw7AIAgFQI9i0oChPoP0I7TdeP9TNa5nkoA4ht49onuYhw03O1BBsm9JUHhOfI+7DV/jOJuqoJXFUCnj4jdEK8C1MVqpYOJMnH8SMBBOB3rWrAAAAABJRU5ErkJggg==" "557" "185" >}}

In the old structure, the entries property contained an entry per asset you were building. For example, a web part or extensions.

### The new structure

In the new structure, it looks like this:

{{< caption-new "/uploads/2017/09/090417_1744_Creatingmul2.png" "New config.json version 2.0 structure"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAX0lEQVR4nD3CyRGAIAwAQErxzIVJUBhBRu2/LH/ubJAN4H1jr2iMNP0BxxWGIDxjSXD3XLS2/azprKldRy62KYaoRNnZhGRlWf4SF+I5qBP0hs+Nh0dFdzZnNVIjpPEDA+8Uqux49HgAAAAASUVORK5CYII=" "557" "242" >}}

> **Info**: When you want to migrate an application from an older version to the current v1.2.0 one, you will have to update the config.json file. Luckily there is a handy command for this: gulp --upgrade. Once you have ran this, the config.json structure gets updated to version 2.0. Mikael Svenson wrote an article about the upgrade process which you can read here: [http://www.techmikael.com/2017/08/how-to-update-sharepoint-framework.html](http://www.techmikael.com/2017/08/how-to-update-sharepoint-framework.html)

What you can see in the updated config file is that the **entries** section has been changed to a **bundles** section. By default, for every component, a new bundle will be created, like how it was with the previous configuration file.

So, if we would add a couple more components, we get the following output:

{{< caption-new "/uploads/2017/09/090417_1744_Creatingmul3.png" "Multiple component bundles"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAn0lEQVR4nD3KUa4CIQxAUXbyRjO00BbaAoKimf0vy/jzkvt3bshGea+shOn+X4QD8AZ4CyQI7y2r94e2UfuorQlx/B1wBC6Iz8mz+Wr+MHf2Jq2LGmU6fwzvlwxzy+7culRNpWKpiSUGKQjdxMg1uZM7E8czHmf8i3AE8gLXhXOgMhlXzWokgplOTPdQjfja/Fl997nHa7e51CxXRSnwBVgoJMx/Ubh3AAAAAElFTkSuQmCC" "557" "377" >}}

## Making your own multi-component bundles

In order to make multi-component bundles, you will have to add your component entries to a specific bundle of your choice. Like you can see here:

{{< caption-new "/uploads/2017/09/090417_1744_Creatingmul4.png" "Combining components into one bundle"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmklEQVR4nEWKSW4DMQzA/JTW6Ui2Nkuul8kgl/z/U0WSQwEeCJCpBtO1qRFgBvx+8xIsGUtOlQ94XHzOMXRMm6uNaaL4WRPTrRjXbuNXxmpruweXejvg650V4Zy0uoymXUVRFFmA+Cg1J1HEbuIUQf4PezALJAqF5xPOXVwkpPmrER+VfgBzMi/6WHLNcY999fPua5tHbV7M4A9BgCTHG2V0nQAAAABJRU5ErkJggg==" "557" "363" >}}

What I did in this bundle is combining the **hello-world-web-part** and **second-web-part** in one bundle called the** multi-webpart-bundle**. When you now bundle your project, this will create two bundles:

{{< caption-new "/uploads/2017/09/090417_1744_Creatingmul5.png" "Bundle file ouput"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfElEQVR4nAXBSw6CMBAA0B7CheFjEQkKIRWDdmb6izvbiKu2yv1P4nvs89LbN8ToU/Qx+pxCziGnsP3W9f1k47ADEKiQNJBGJCBNkxj7S1fxks2isHYxThtHyiDg3Tr1kLdJDP35xGaxJ7oCASkpYWk7XvPi0JRNW/Nj9QcWoxnYjoGVgAAAAABJRU5ErkJggg==" "353" "150" >}}

At the end of the **multi-webpart-bundle.js** file, you can see that it exports two components:

{{< caption-new "/uploads/2017/09/090417_1744_Creatingmul6.png" "Bundle component ID details"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGNQtTAzt9d0dFa1sNNxdNBycdIwNdEwsVU2tFTQ01cBAGDCBgcatIKjAAAAAElFTkSuQmCC" "521" "75" >}}

These IDs correspond to the IDs in the manifest of the web parts. When you test the web parts in the workbench, you will only see that one bundle file being loaded for both web parts:

{{< caption-new "/uploads/2017/09/090417_1744_Creatingmul7.png" "Sources in Chrome"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZklEQVR4nC3JQQ6DMAwF0dz/VlyiW0yAmAKLguIkql1/BOqTZjWBmanvReTnrvpVVTO7e4SccxwnitPMKTHXWgE4/gLc0qe9aNxWlnJrrZVazOzZgLvK3m07z7xQHJb1TQMd5wngAqS8cbnWW5w5AAAAAElFTkSuQmCC" "242" "88" >}}

> **Info**: this was just an article to show you what you can expect and how it works. The documentation around this topic will probably be released very soon.
