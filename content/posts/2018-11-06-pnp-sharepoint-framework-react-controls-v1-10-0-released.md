---
title: PnP SharePoint Framework React Controls v1.10.0 released
author: Elio Struyf
type: post
date: 2018-11-06T07:55:52+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-10-0-released/
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

Version 1.10.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**New control(s)**

*   `ListItemPicker`: New field control [#165](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/165)
**Enhancements**

*   Dutch localization added [#100](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/100)
*   German localization added [#101](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/101)
*   French localization added [#102](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/102)
*   `PeoplePicker`: Move defaultSelectedUsers from ComponentWillMount to ComponentDidUpdate Lifecycle [#135](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/135)
*   `PeoplePicker`: Initialize with users from a list item [#138](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/138)
*   `PeoplePicker`: Remove Messagebar error handling to match Office UI Fabric field error styling [#140](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/140)
*   `PeoplePicker`: REST API filter and nometadata header added to reduce payload [#139](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/139)
*   `PeoplePicker`: Allow to set the maximum number of suggestions `suggestionsLimit` [#143](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/143) [#148](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/148)
*   `TaxonomyPicker`: retreiving the terms in the correct custom sort order [#146](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/146)
*   `PeoplePicker`: Documentation format updated to make it easier to check the default values [#159](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/159)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): [Marc D Anderson](https://github.com/sympmarc), [Ole Bergtun](https://github.com/trillian74), [João Mendes](https://github.com/joaojmendes), [Markus Möller](https://github.com/mmsharepoint), [Asish Padhy](https://github.com/AsishP), [PooLP](https://github.com/PooLP), [Gautam Sheth](https://github.com/gautamdsheth), [Tse Kit Yam](https://github.com/tsekityam). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).