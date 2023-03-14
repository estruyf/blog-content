---
title: PnP SharePoint Framework Property Controls v1.9.0 released
author: Elio Struyf
type: post
date: 2018-08-10T14:47:03+00:00
slug: /pnp-sharepoint-framework-property-controls-v1-9-0-released/
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

Version 1.9.0 of the SharePoint Framework Property Controls (`@pnp/spfx-property-controls`) has been released. This is an open source library that shares a set of reusable property pane controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   `PropertyFieldCollectionData`: Added custom validation for `string`, `number`, `icon`, and `URL` field types [#74](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/74)
*   `PropertyFieldCollectionData`: Add an option to specify a default value [#86](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/86)
*   `PropertyFieldCollectionData`: override placeholder for the inputs [#87](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/87)
*   `PropertyFieldCollectionData`: Hide save button when "Add and save" is shown [#88](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/88)

**Fixes**

*   `PropertyFieldMultiSelect`: fixed an issue where the control didn't retain the preselected values when dropdown options were provided async [#85](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/85)
*   `PropertyFieldOrder`: fixed an issue where items where provided async [#81](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/81)

## Try it out today

Get the latest release of the `@pnp/spfx-property-controls` from npm by executing in the command line: `npm i @pnp/spfx-property-controls -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-property-controls/issues](https://github.com/SharePoint/sp-dev-fx-property-controls/issues).