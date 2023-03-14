---
title: PnP SharePoint Framework Property Controls v1.7.0 released
author: Elio Struyf
type: post
date: 2018-06-12T18:35:55+00:00
slug: /pnp-sharepoint-framework-property-controls-v1-7-0-released/
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

Version 1.7.0 of the SharePoint Framework Property Controls (`@pnp/spfx-property-controls`) has been released. This is an open source library that shares a set of reusable property pane controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   Add `npm postinstall` script to automatically add the localization config [#64](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/64)
*   Add a description to the `PropertyFieldCollectionData` panel [#67](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/67)
*   Added a font field type for the `PropertyFieldCollectionData` control [#66](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/66)
*   Added a URL field type for the `PropertyFieldCollectionData` control [#72](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/72)
*   Field validation implemented to enable/disable save buttons in `PropertyFieldCollectionData` control. Related to previous enhancement.
*   Added properties to the `TaxonomyPicker` to specify which terms are disabled/not-selectable [#69](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/69)

**Fixes**

*   `PropertyFieldPeoplePicker` validation error does not clear as expected [#68](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/68)

## Try it out today

Get the latest release of the `@pnp/spfx-property-controls` from npm by executing in the command line: `npm i @pnp/spfx-property-controls -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-property-controls/issues](https://github.com/SharePoint/sp-dev-fx-property-controls/issues).