---
title: PnP SharePoint Framework React Controls v1.7.0 released
author: Elio Struyf
type: post
date: 2018-08-14T13:04:58+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-7-0-released/
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

Version 1.7.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   `PeoplePicker`: added functionality to initialize the control with person(s) or group(s) [#98](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/98)
*   `PeoplePicker`: support for searching on contains [#93](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/93)
*   `PeoplePicker`: find user based on email address [#95](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/95)
*   Bundle size: statically reference Office UI Fabric components in the FieldRenderer controls [#107](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/107)

**Fixes**

*   `FieldNameRenderer` onClick does not suppress default link behavior [#103](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/103)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): Octavie van Haaften, Asish Padhy, Mikael Svenson, Alex Terentiev. Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).