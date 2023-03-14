---
title: PnP SharePoint Framework React Controls v1.8.0 released
author: Elio Struyf
type: post
date: 2018-09-12T15:49:02+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-8-0-released/
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

Version 1.8.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   `PeoplePicker`: Specify to hide or show the users/groups which are hidden in the UI [#122](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/122)
*   `WebPartTitle`: changing font-sizes on different resolutions [#114](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/114)
*   `WebPartTitle`: Added accessibility tags for web part title [#121](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/121)
*   `ListView`: Resizable columns - introduced a `isResizable` property [#119](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/119)
*   `FieldNameRenderer` double click support added [#116](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/116)
*   `TaxonomyPicker`: table markup changed to DIV [#113](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/113)
*   `PeoplePicker`: ability to specify the source site to load users from [#110](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/110)
*   `TaxonomyPicker`: Disable the terms which are set as deprecated or unavailable for tagging [#109](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/109)
*   `PeoplePicker`: Specify principle type to retrieve (users, groups, ...) [#94](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/94)

**Fixes**

*   `FieldLookupRenderer`: Fixed URL querystring params [#126](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/126)
*   `IFrameDialog`: dialog width is not correct in IE11 [#118](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/118)
*   `PeoplePicker`: fix freezes when typing in search values [#117](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/117)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): [Thomas Lamb](https://github.com/ThomasLamb), [Joel Rodrigues](https://github.com/joelfmrodrigues), [Mikael Svenson](https://github.com/wobba), [Alex Terentiev](https://github.com/AJIXuMuK). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).