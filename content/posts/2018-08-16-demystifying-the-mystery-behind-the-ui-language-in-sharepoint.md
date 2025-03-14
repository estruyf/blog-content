---
title: Demystifying the mystery behind the UI language in SharePoint
author: Elio Struyf
type: post
date: 2018-08-16T19:31:35+00:00
slug: /demystifying-the-mystery-behind-the-ui-language-in-sharepoint/
categories:
  - SharePoint
tags:
  - Language
  - UI
comments: true
---

Have you ever wondered what exactly determines in which language SharePoint will be loaded? In this article, I will explain what the flow is which determines the UI language.

## Site language settings

It all starts with the supported languages on the site. You can check them out here: https://<site-url>/_layouts/15/muisetng.aspx.

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin1.png" "Site - Language Settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAf0lEQVR4nFXOyQ7DIAwEUP7/S0lFvGBsTFhapVETdS5zeBppAjPnnHcA+wYBEZGYYQdTDSJCxLXW3rtkUdW11vuXkEW0FHefc6rqGOO2k0UKE2kpc85aq2oZoz+cUnptW4zR3ZnZzP7WZtZaO45zgYgAu7s/fNX1hohTSiL55g/FGctH8ovFZgAAAABJRU5ErkJggg==" "532" "374" >}}

Be sure that the language you want to use is checked on in the list of **alternate language(s)**.

## User profile language preferences

SharePoint uses the user profile language preference as the primary source to define the UI language to render. Once you set this setting, you will have to wait a couple of minutes before this is applied.

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin2.png" "Preferred display language"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZUlEQVR4nC2NQRLDIAwD/f+XJqXTMklsi8jgDqF70UE7kpibqgK4VM3sc91bxfu8I4Kk1FoBkDS3iBiTnpl4kH1/lVJIAhhjZGbv/ZEm4g53I9naf5Dk8jJTVhja99DTljMvVv0DCTuSKO9FwNUAAAAASUVORK5CYII=" "624" "283" >}}

## Preferred browser language

Another place where you could define is the browser its settings.

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin3.png" "Preferred browser language"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZUlEQVR4nF3LQQ6DMAxE0dz/gJV6BaggOI4T8IxTCbEhX7N7miT503tmDJCO1073pLrm7WvWm9XxDmRy4DiyVSM5sQMJgEgppURwRMzs4L7/gGu6PtxaF9lUa9VFdXEE79wpdv0B4qyv9oV+vy0AAAAASUVORK5CYII=" "624" "405" >}}

When you configure the preferred languages in which you want to load websites, the browser will send this information by an **Accept-Language** header with each request to the site.

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin4.png" "Accept-Language header"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAS0lEQVR4nFXKQQ7AIAgEQP/S6CIkBrCNorf+/1GNx8550jgms7BIyfn6S733ubaaq/kZQAFABFAB0nJ/I/b9hNlQDbO7tcrMLJXqB9BxD8YSYMrAAAAAAElFTkSuQmCC" "624" "172" >}}

SharePoint can also make use of these language preferences, but make sure that you did not specify any language preference in your user profile. Otherwise, that would overrule the language preference of the browser.

The language order will also be taken into account, so if in the above order DE or German is not supported on the site, it falls back on EN or English.

## SharePoint UI language flow

To make it easier I created a quick flowchart to show the language UI process:

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin5.png" "SharePoint UI language flow"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgUlEQVR4nEWO2xKDMAhE8/9/2qqJ5LIQSaBjtZaXZZczwwb/zTQjyhSTmT1huNVsNq5brO91sswGU/2fu0jd6cudqACVThtsDONet0Svxca46BYvOwNyEcDdDxHkci2cS2dGLkFYeu+mo8W9LOs8VFWZmcEA7t91J26QhhLTU9vdP9eazGq36OdnAAAAAElFTkSuQmCC" "624" "455" >}}

I hope this helps you to understand what determined in which language SharePoint was loaded.