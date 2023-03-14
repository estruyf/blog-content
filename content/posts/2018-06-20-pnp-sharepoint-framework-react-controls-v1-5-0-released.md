---
title: PnP SharePoint Framework React Controls v1.5.0 released
author: Elio Struyf
type: post
date: 2018-06-20T07:18:19+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-5-0-released/
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

Version 1.5.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**New control(s)**

*   New `PeoplePicker` control added [#19](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/19)

**Enhancements**

*   Added properties to the `TaxonomyPicker` to specify which terms are disabled/not-selectable [#82](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/82)
**Fixes**

*   Bug in `TaxonomyPicker` where values are not updated by an async change [#83](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/83)
*   `FieldUserRenderer` uses email prop for `GetPropertiesFor` [#84](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/84)
*   Fixed issue in single selection mode when all group items were selected in the `ListView` when user clicked on the group header [#86](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/86)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): Asish Padhy, Alex Terentiev. Thank you for your contributions

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).