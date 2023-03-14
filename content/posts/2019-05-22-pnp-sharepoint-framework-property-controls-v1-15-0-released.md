---
title: PnP SharePoint Framework Property Controls v1.15.0 released
author: Elio Struyf
type: post
date: 2019-05-22T13:27:53+00:00
slug: /pnp-sharepoint-framework-property-controls-v1-15-0-released/
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

Version 1.15.0 of the SharePoint Framework Property Controls (`@pnp/spfx-property-controls`) has been released. This is an open source library that shares a set of reusable property pane controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   `PropertyFieldCollectionData`: Add a property to be able to set a custom class on the collection data panel [#180](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/180)
*   `PropertyFieldListPicker`: Added `listsToExclude` property to the control [#176](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/176)
*   `PropertyFieldDateTimePicker`: Add ability to hide the date and time labels [#77](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/77)

**Fixes**

*   Callout icons missing with SPFx `1.8.2` web part [#178](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/178)
*   `PropertyFieldTextWithCallout`: still persists property value when error occurred [#172](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/172)
*   `PropertyFieldNumber`: not handling changes correctly [#170](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/170)
*   `PropertyFieldChoiceGroupWithCallout`: iconProps not working [#154](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/154)
*   `PropertyFieldDropdownWithCallout`: Options of type `Divider` and `Header` are ignored [#145](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/145)

## Contributions

This release wouldn&#39;t be possible without the help of (in alphabetical order): [Alex Terentiev](https://github.com/AJIXuMuK), [Ward Wilmsen](https://github.com/WardWilmsen). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-property-controls` from npm by executing in the command line: `npm i @pnp/spfx-property-controls -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## Issues and feedback

If you have issues or feedback, don&#39;t hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-property-controls/issues](https://github.com/SharePoint/sp-dev-fx-property-controls/issues).