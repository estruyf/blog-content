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

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin1.png" "Site - Language Settings" >}}

Be sure that the language you want to use is checked on in the list of **alternate language(s)**.

## User profile language preferences

SharePoint uses the user profile language preference as the primary source to define the UI language to render. Once you set this setting, you will have to wait a couple of minutes before this is applied.

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin2.png" "Preferred display language" >}}

## Preferred browser language

Another place where you could define is the browser its settings.

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin3.png" "Preferred browser language" >}}

When you configure the preferred languages in which you want to load websites, the browser will send this information by an **Accept-Language** header with each request to the site.

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin4.png" "Accept-Language header" >}}

SharePoint can also make use of these language preferences, but make sure that you did not specify any language preference in your user profile. Otherwise, that would overrule the language preference of the browser.

The language order will also be taken into account, so if in the above order DE or German is not supported on the site, it falls back on EN or English.

## SharePoint UI language flow

To make it easier I created a quick flowchart to show the language UI process:

{{< caption-new "/uploads/2018/08/081618_1924_Demystifyin5.png" "SharePoint UI language flow" >}}

I hope this helps you to understand what determined in which language SharePoint was loaded.