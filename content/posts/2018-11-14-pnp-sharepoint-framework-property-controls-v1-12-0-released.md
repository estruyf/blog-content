---
title: PnP SharePoint Framework Property Controls v1.12.0 released
author: Elio Struyf
type: post
date: 2018-11-14T11:05:20+00:00
slug: /pnp-sharepoint-framework-property-controls-v1-12-0-released/
categories:
  - Development
  - SharePoint
tags:
  - PnP
  - React
  - sharepoint-framework
  - SPFx
comments: true
---

Version 1.12.0 of the SharePoint Framework Property Controls (`@pnp/spfx-property-controls`) has been released. This is an open source library that shares a set of reusable property pane controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**New control(s)**

*   `PropertyPaneWebPartInformation`: New control to show more information about the current web part [#108](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/108)
*   `PropertyPanePropertyEditor`: New control that allows you to export/import property pane settings [#114](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/114)

**Enhancements**

*   Dutch localization added [#82](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/82)
*   French localization added [#84](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/84)
*   `PropertyFieldCollectionData`: Allow the user to specify a deferred validation time for each field [#98](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/98)
*   `PropertyFieldCollectionData`: added a onRenderOption option to allow custom option rendering [#102](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/102)
*   `PropertyFieldNumber`: Introduced the aria label [#104](https://github.com/SharePoint/sp-dev-fx-property-controls/pull/104)
*   Hide callout from the controls with callout if no message is provided [#107](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/107)
*   `PropertyFieldListPicker`: Add the ability to refresh target site while pane is open [#109](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/109)

**Fixes**

*   `PropertyFieldCollectionData`: Fixed catastrophic backtracking regex issue for URL validation [#99](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/99)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): [Paul Bullock](https://github.com/pkbullock), [Junle Li](https://github.com/lijunle), [PooLP](https://github.com/PooLP), [Erwin van Hunen](https://github.com/erwinvanhunen). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-property-controls` from npm by executing in the command line: `npm i @pnp/spfx-property-controls -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-property-controls/issues](https://github.com/SharePoint/sp-dev-fx-property-controls/issues).