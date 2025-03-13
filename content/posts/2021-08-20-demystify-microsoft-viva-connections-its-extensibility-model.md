---
title: Demystify Microsoft Viva Connections its extensibility model
slug: /demystify-microsoft-viva-connections-extensibility-model/
description: Are testing out the extensibility model of Viva Connections but are a bit confused about all the components? Read this article to get a better understanding.
author: Elio Struyf
type: post
date: 2021-08-20T11:47:29.549Z
lastmod: 2021-08-20T11:47:29.549Z
draft: false
tags:
  - SharePoint Framework
  - Viva
  - Viva Connections
  - Development
categories: []
comments: true
preview: /social/d1c61df0-c2bc-4328-ae82-5a794f171def.png
keywords:
  - Viva Connections
---

[Microsoft Viva Connections](https://www.microsoft.com/en-us/microsoft-viva) is a new experience to inform employees in your company and keep them engaged all from within Microsoft Teams. 

The nice part about Viva Connections is just a name, and you will have to brand it yourself. Meaning, it will be your experience, for your company.

Another significant part of Viva Connections is the extensibility. Viva Connections is all about tiles/cards to engage with your employees.

{{< caption-new "/uploads/2021/08/viva1.png" "Viva Connections"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAAEeSURBVF3BP0sCcQCA4de7n3VitZRGeZWWSTYIYdRQILQ1Gw41VVMtfZCgSWiIVqfWgqAC1zCHcCnEzKOk808qqOfpcTU09TyOVqtl80vXdUzT5L9Ss8m4x4Pgz+XVDU/FKkbPYGJMwao3cJogjbjYSWwh+LMWDpC+e6Dw+oxY8DI1HeDg+IjFYJDSWwHRtW0++n2GhwSJ7U0+o0v4/HPYRocZ1YdTllEUBZE1DM7LZfYGA1ajK7RNWA6HOLtIkbpOI3XaVCo1xIbLxUCxicVinCaThGb9FIsFTg53sSwLt9sNjReknP7Ffe4WhySTyef57raZ9Hqo6mWymUdkWUI3RhH9gYXTnqdRr7EfjyMLwXokgqZpqKqKVnqn1zP5AfBEcqEAjYXxAAAAAElFTkSuQmCC" "981" >}}

## The extensibility

SharePoint Framework provides the extensibility model for Viva Connections. 

{{< blockquote type="important" text="While writing this article, the extensibility story is only available in beta version 13 of SPFx. More info at [SharePoint Framework v1.13](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/release-1.13)." >}}

When you read the developer documentation of Viva Connections extensibility, you will notice they talk about SharePoint Adaptive Cards Extensions, but it might start to confuse you.

Adaptive Cards are a way to interact with the user, no matter which platform they use. We see these adaptive cards in Microsoft Teams and Outlook, but Viva Connections is not all about adaptive cards. Sure it uses adaptive cards, but it does not mean you should. 

Are you confused already? Good, then I can continue explaining what it is.

## What is the Viva Connections Extensibility story?

Viva Extensibility and mainly Adaptive Card Extensions (ACE) consist out of the following parts:

- Card (required)
- Quick View (optional)
- App (optional)

### The card

The card is the part that will render in the dashboard and will be used to show the information to your end-user. It serves as a component that you can surface on the dashboard or add to a SharePoint page. That makes cards reusable in your environment.

{{< caption-new "/uploads/2021/08/viva2.png" "Default card example from the developer documentation"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAklEQVR4AewaftIAAAC1SURBVI3BQWrDMBBA0a/RqCoDRkROC97Um257/7P0BMUlLdkkmBBZVRYBE0joe642/IPWWvmcvvna7/nY9tRlwasn556rWitK8/76wlufsRC4R2l+dzumaSLGyDzPlHJms8nEGBmGgQulMTPMjIuu6xjHERFhTWhKKcT4hIgQgiIi3FKalBIpJR5RmsPpxM/hiBfHuSxkM7rnyJrSeCdE9agI1YMX4ZY65wji2JqxVkrhSkT4A4bvMWWKOhYFAAAAAElFTkSuQmCC" "215" >}}

To "develop" these cards, you need to provide the data, and here is the thing. Behind the scenes, SharePoint uses a predefined adaptive card template to ensure the data is rendered correctly on any platform.

You, as a developer, do not have any control over the template. You can only provide the data, render buttons, and invoke actions when the card is selected.

{{< blockquote type="info" text="Microsoft provides the AC template, you provide the data for the AC." >}}

Sadly, you cannot add your template, which would make it easier to create reusable experiences, but why do they call it Adaptive Card Extensions? Well, that is because of the next part, the `Quick View`.

### The QuickView

The QuickView is where you can leverage adaptive cards. It allows you to show more information about what the card is all about. For instance, if you have a card that offers an alert, the quick view can reveal more details on the alert.

{{< caption-new "/uploads/2021/08/viva3.png" "QuickView - Adaptive Card"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB4SURBVG3BSRKCQBBFwVc9ACpy/0MisLFDLKK+snBnpumLP5Zn45oTXdeRUiIdx4EkWmts60pEIAn2F495prWGJIoi2N053acJM+NU+x5K4TaOIFGOCN7uXIaBnDM/tVZSqSgCMyNhRq4VM8PdcXfcnW1ZKIiI4PQBOQJEWWTkN7QAAAAASUVORK5CYII=" "553" >}}

This QuickView is fully customizable to your needs with Adaptive Cards, so it is not only about showing more details. You can also ask for more information, like creating a form and/or interacting with the user.

A QuickView is an optional part of the ACEs, as you can use a card without action(s) or define only an external link as action. Only when an action with the type of `QuickView` is defined will it be used. 

### The app

The app is a custom experience you have already created, like an expense approval system. It is not part of the extensibility story itself but allows you to make better-connected experiences.

For example, if you want to leverage Viva Connections to be a gateway to your custom app. You make a card that shows a reminder to submit your expenses at the end of the month. The card could bring you automatically to the app when the user interacts with it.

*I hope this helps you demystify the extensibility model from Viva Connections.*