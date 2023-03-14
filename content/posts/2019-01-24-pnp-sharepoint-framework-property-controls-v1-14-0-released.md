---
title: PnP SharePoint Framework Property Controls v1.14.0 released
author: Elio Struyf
type: post
date: 2019-01-24T16:29:43+00:00
slug: /pnp-sharepoint-framework-property-controls-v1-14-0-released/
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

Version 1.14.0 of the SharePoint Framework Property Controls (`@pnp/spfx-property-controls`) has been released. This is an open source library that shares a set of reusable property pane controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**New control(s)**

*   `PropertyFieldEnterpriseTermPicker`: New control to load term sets by using `@pnp/pnpjs` [#70](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/70) [#120](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/120)

**Enhancements**

*   `PropertyFieldCollectionData`: Setting to specify if item `creation` is enabled/disabled [#130](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/130)
*   `PropertyFieldCollectionData`: Setting to specify if item `deletion` is enabled/disabled [#131](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/131)
*   `PropertyFieldCollectionData`: Implemented a property to specify if field `editing` is enabled/disabled [#132](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/132)
*   Added `Chinese` localization [#137](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/137)
*   `PropertyFieldColorPicker`: Added a `isHidden` property [#138](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/138)
*   `PropertyFieldCollectionData`: return the item in the custom renderer [#147](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/147)
*   Added `Russian` localization [#142](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/142)

**Fixes**

*   `PropertyFieldTermPicker`: fix sort order with lowercased terms [#133](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/133)
*   `PropertyFieldCollectionData`: Bug with onCustomRender() [#135](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/135)
*   `PropertyFieldCollectionData`: Fixed bug with dropdown rendering in IE [#136](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/136)
*   `PropertyFieldNumber`: Min/max number check fix + localization label fixes [#141](https://github.com/SharePoint/sp-dev-fx-property-controls/pull/141)
*   `PropertyFieldTermPicker`: Fix layout issues in IE11 [#143](https://github.com/SharePoint/sp-dev-fx-property-controls/pull/143)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): [Simon-Pierre Plante](https://github.com/spplante), [Yannick Plenevaux](https://github.com/ypcode), [Alex Terentiev](https://github.com/AJIXuMuK), [Roger Zhang](https://github.com/RogerZhang-CatapultSystems). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-property-controls` from npm by executing in the command line: `npm i @pnp/spfx-property-controls -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-property-controls/issues](https://github.com/SharePoint/sp-dev-fx-property-controls/issues).