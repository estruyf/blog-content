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

{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc1.png" "Default component localization files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAsUlEQVR4nFWLzQqCQBgAP0NN7ZDmqmlam+u6/q1plPkDIUGHQHr/x4m6hDDMaQaUY74pr5LLBUTBIIBisNgfzc+zZsDtZPNRT/plcJoVgFhd8qjocHH3oqvkpLNbRIwm3C+7Fb4sTaKi6HujGEz6tWQxYxvushs7P6N8WPtc9LjsFUpQSV4BgGJ1z4PqETYv2k6km0j3dviox612qAEsJuPGYL3o5oKTLn4IdgIbAib9ABfXGHtSW4D5AAAAAElFTkSuQmCC" "332" "225" >}}

If you have one component in your project, this is easy to maintain, but once you will have a couple more. It will become harder, but also, it could be that keys will have to be duplicated over each and every component its localization file.

> **Example**: You have a **save** button and want to reuse the localized label in each of your components. This would result in duplicate keys across these localization files. When you need to change the label, you will have to do it to all components. Each component will also have its own localization file that will be loaded.

{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc2.png" "Generated localization files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGOQUddXMXRSMXRWN3FTM3ZVN3FTNXSW17aVUDETlNEFAFZ9BW7sPio2AAAAAElFTkSuQmCC" "656" "92" >}}

## Making it easier

A way to make localization easier and to be able to share your localization keys over each component in the project would be to create a **localization** folder at the root of your **src** directory with your localization files in it.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc3.png" "Global localization folder"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABBklEQVR4nEWQ3W6CMBhAPyb+LZlOoC2logv6tSjQIiKCzGzJRKPv/0CLF8uSc3XO3YGR0D2tpmk9mufgIpAYiPqHBklZmfrYrrB23Mgla8IkYdJn6DAEzqRShd6bIDm/hXoSmr6HtidfiQoogu+rgYfv+OFsTmzX+bvO4qnFU5tIShFCXwqhpqhWm0bvL6bsTHmV2ZkQnDOEPo2rqm6ODZb3rHlE+mvoREMnGrlr20OwaDxemHSfc/MtipufX0RxXVaP8HCfxe0zT5bm1GietNz8kO15ILLxIh+HeT9I4YUqe57zpFqW3eJwn0QHmK2eA1wET4JFJPhZLyjI9tOJ26HInvZvyy9Y1CbPpHqn1QAAAABJRU5ErkJggg==" "188" "179" >}}

Specify the name of the **localization module** in the new global **mystrings.d.ts** file, like:


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc4.png" "Global localization file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAATCAIAAAAmiQu5AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABqElEQVR4nFWQ2W7aQABFx6sMYjUejxe84WU8Hg8hXsYYmpCtJUGtovapav//P6pWRRDpvh3pnqsLJESC8nPefqP8vem+8v646TpctsGqRkEJAMSI7NeHH2H75Lf7UcwGUQ6MFOgJWGRAMMkorG16b+B+nLDRqhBgDiAWzFyAGIiIaMu1nvFp3CgOUVwCIL5EQMRdP25ff7cvvwK+C/ob2S6AccayU6oumyXtLG5VlyhOfmEQA8miBu5T/uZXDya71QIior/u/xFR4ZQHdvc95Dt7U2kBkawrvWgV87SLqqOeV5BRCRJgZFflNh1HtUXvZwmfpHQY0o9um86TLqqPOq7mhMoW+YAVhw38DST9It2qbjkMiWBeTZMs6t08Nc8/2eE96j7Zt0zziotecZjilJNVrXl0GBSCftX8z10a+S7hr1l38jYHk25HcTHwz8fJdmkV+7Q7xfwtqB8ha8Yple3zQNUtVRuLJlERHlpUNXPNwgrEspHJMAOqy7z4xc9PMfnCq3rXNn3T9HWz540fEqC4FEXbRXSH6IOTd5MlmXrFZFlMPapZ5A9OukcYgUANaAAAAABJRU5ErkJggg==" "404" "782" >}}

In your project's **config.json** file (./config/config.json), update the **localizedResources** property, to use the newly created localization file.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc5.png" "Global localization file registration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQ0lEQVR4nGPg1jIXNncWMXcRMrDnUjRmkdbhkjbgkjLgktJnl9Rl4JQxYFc2Ylc0ZFcCIVYZPR4pQz4ZI14ZY3ZJXQDyFgdlTAQt3QAAAABJRU5ErkJggg==" "430" "72" >}}

Per component update the localization strings import reference to use the new global localization strings module.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc6.png" "Update localization "strings" dependency import"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAYElEQVR4nAXBWwtAMBQA4NmNB8kD284sEoudXUrxovz/v+X7SLtetcvMBGmTgCgAG5fllISNlTqInBIHpPrkgMwEqlHYyAxyQDIeRG1f6+5+e4b97efb+KL2on0BX7ol/6GECbxrdLiDAAAAAElFTkSuQmCC" "433" "118" >}}

Once you have done these changes, you only need to take care of one global localization file. Another advantage is that only one localization file will be loaded on your page for all the components.


{{< caption-new "/uploads/2019/07/071519_1224_Simplifyloc7.png" "One global localization file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGMQ0TCS0HeWNnSRMXKVMXSVM/GQMXQV1rThUzFjk9YDAFA/BQl3D6gRAAAAAElFTkSuQmCC" "542" "64" >}}

## Extra: useful VSCode extension

To make localization even easier, I created a Visual Studio Code localization extension which allows you to quickly create / import localization keys and modules into your components.

> **Check it out**: SPFx Localization - [https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-localization](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-localization)

The extension also allows you to export all localizations to a CSV file. This allows makes it easier to pass it to your translators and later when they are finished, you can do an import which automatically creates all localization files from the CSV file.