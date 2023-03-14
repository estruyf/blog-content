---
title: >-
  Showing a spinner when dynamically loading resources for your SPFx property
  pane
slug: /showing-spinner-dynamically-loading-resources-spfx-property-pane/
author: Elio Struyf
type: post
date: 2020-03-11T20:04:07.078Z
draft: false
tags:
  - Development
  - SharePoint
  - SharePoint Framework
  - Web Part
categories: []
comments: true
---

In your SharePoint Framework web parts, you have the option to load resources dynamically. These resources could be data you want to fetch or dynamically load controls before the property pane panel gets shown. To achieve this, you implement the logic in the `loadPropertyPaneResources` method.

> **Info**: You can find more information about dynamically loading controls here: [Special property pane dynamic loading](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-loading).

## The issue

The issue with dynamically loading resources/controls for the property pane is the user experience. When you open the property pane for the first time, all these resources need to be loaded, and during that time, you get to see just an empty white panel.

{{< caption "/2020/03/spinner1.gif" "Empty property pane while loading resources" >}}

## What can you do?

Version `1.17.0` from `@pnp/spfx-property-controls` dependency includes a couple of helpers. These helper methods focus on making this experience much better.

To make it work, you have to implement this property pane spinner as follows:

{{< gist estruyf fe3e11a381adc31320abcdc1bb3707d1 >}}

Once this is implemented, you and your users will see the following experience.

{{< caption "/2020/03/spinner2.gif" "Showing a spinner while loading the property pane" >}}

> **Info**: You can find the documentation of the helper here: [PropertyPaneHelpers](https://sharepoint.github.io/sp-dev-fx-property-controls/helpers/PropertyPaneHelpers/).

*Hope this makes your web part experience better as well*
