---
title: PnP SharePoint Framework Property Controls v1.10.0 released
author: Elio Struyf
type: post
date: 2018-09-13T13:54:17+00:00
slug: /pnp-sharepoint-framework-property-controls-v1-10-0-released/
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

Version 1.10.0 of the SharePoint Framework Property Controls (`@pnp/spfx-property-controls`) has been released. This is an open source library that shares a set of reusable property pane controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   `PropertyFieldPeoplePicker`: Security groups come back with EntityType of `FormsRole` rather then `SecGroup` [#93](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/93)
*   `PropertyFieldCollectionData`: Add the current row's information in the `onGetErrorMessage` callback [#92](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/92)
**Fixes**

*   `PropertyFieldPeoplePicker`: No suggestions returned when using Security Groups, Multi-select and NO duplicates. [#90](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/90)
*   `PropertyFieldTermPicker`: Terms which are set as unavailable for tagging are still selectable [#94](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/94)

## Try it out today

Get the latest release of the `@pnp/spfx-property-controls` from npm by executing in the command line: `npm i @pnp/spfx-property-controls -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-property-controls/issues](https://github.com/SharePoint/sp-dev-fx-property-controls/issues).