---
title: PnP SharePoint Framework Property Controls v1.13.0 released
author: Elio Struyf
type: post
date: 2018-12-13T16:53:41+00:00
slug: /pnp-sharepoint-framework-property-controls-v1-13-0-released/
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

Version 1.13.0 of the SharePoint Framework Property Controls (`@pnp/spfx-property-controls`) has been released. This is an open source library that shares a set of reusable property pane controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   Updated the `office-ui-fabric-react` to the same version as in SPFx 1.7.0 [#105](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/105)
*   `PropertyFieldPeoplePicker`: Ability to select only from a specific site [#9](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/9)
*   `PropertyFieldCollectionData`: Added support for custom field rendering [#122](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/122)
*   `PropertyFieldCollectionData`: Added the functionality to sort the items in the collection [#123](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/123)
**Fixes**

*   `PropertyFieldDateTimePicker`: Fix for the hours dropdown not showing values [#112](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/112)
*   `PropertyFieldCollectionData`: Issue with debounce validation overriding the inserted values [#113](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/113)
*   `PropertyPaneWebPartInformation`: Remove redundant 'Description' label [#119](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/119)
*   `PropertyFieldCodeEditor`: Handle initial value after updating properties [#121](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/121)

## Contributions

This release wouldn't be possible without the help of: [Erwin van Hunen](https://github.com/erwinvanhunen). Thank you for your contribution.

## Try it out today

Get the latest release of the `@pnp/spfx-property-controls` from npm by executing in the command line: `npm i @pnp/spfx-property-controls -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-property-controls/issues](https://github.com/SharePoint/sp-dev-fx-property-controls/issues).