---
title: Simplify localization in SharePoint Framework projects
author: Elio Struyf
type: post
date: 2019-07-15T12:31:44+00:00
slug: /simplify-localization-in-sharepoint-framework-projects/
categories:
  - Development
  - SharePoint
tags:
  - Localization
  - SharePoint Framework
  - SPFx
  - Translations
comments: true
---

When you need to support multiple languages for your SharePoint Framework solutions. It can be a hassle that you have to maintain each and every localization per component in their related **loc** folder.

> **Official localization documentation**: [localize SharePoint Framework client-side web parts](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts).

{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc1.png" "Default component localization files" >}}

If you have one component in your project, this is easy to maintain, but once you will have a couple more. It will become harder, but also, it could be that keys will have to be duplicated over each and every component its localization file.

> **Example**: You have a **save** button and want to reuse the localized label in each of your components. This would result in duplicate keys across these localization files. When you need to change the label, you will have to do it to all components. Each component will also have its own localization file that will be loaded.

{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc2.png" "Generated localization files" >}}

## Making it easier

A way to make localization easier and to be able to share your localization keys over each component in the project would be to create a **localization** folder at the root of your **src** directory with your localization files in it.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc3.png" "Global localization folder" >}}

Specify the name of the **localization module** in the new global **mystrings.d.ts** file, like:


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc4.png" "Global localization file" >}}

In your project's **config.json** file (./config/config.json), update the **localizedResources** property, to use the newly created localization file.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc5.png" "Global localization file registration" >}}

Per component update the localization strings import reference to use the new global localization strings module.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc6.png" "Update localization "strings" dependency import" >}}

Once you have done these changes, you only need to take care of one global localization file. Another advantage is that only one localization file will be loaded on your page for all the components.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc7.png" "One global localization file" >}}

## Extra: useful VSCode extension

To make localization even easier, I created a Visual Studio Code localization extension which allows you to quickly create / import localization keys and modules into your components.

> **Check it out**: SPFx Localization - [https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-localization](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-localization)

The extension also allows you to export all localizations to a CSV file. This allows makes it easier to pass it to your translators and later when they are finished, you can do an import which automatically creates all localization files from the CSV file.