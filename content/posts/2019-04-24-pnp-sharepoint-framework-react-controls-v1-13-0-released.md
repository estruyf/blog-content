---
title: PnP SharePoint Framework React Controls v1.13.0 released
author: Elio Struyf
type: post
date: 2019-04-24T19:46:47+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-13-0-released/
categories:
  - Development
  - SharePoint
tags:
  - PnP
  - React
  - SharePoint Framework
  - SPFx
comments: true
---

Version 1.13.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**New control(s)**

*   `Progress`: New control added [#230](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/230)
*   `DateTimePicker`: New control added [#21](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/21)
*   `RichText`: New control added [#20](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/20)

**Enhancements**

*   `SecurityTrimmedControl`: Support for item and folder permission checks added [#271](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/271)
*   Retrieve the user its profile picture from SharePoint instead of Office 365 / Outlook [#248](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/248)
*   Added `Lithuanian` localization [#247](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/247)
*   `FileTypeIcon`: Added support for PDF icon file types [#260](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/260)
*   `WebPartTitle`: Added the ability to render a `see all` link or custom component [#228](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/228)
**Fixes**

*   `PeoplePicker`: Fix for single quotes around the ms-peoplepicker class [#275](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/275)
*   `RichText`: Fix for toolbar that appears at top of the page [#265](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/265)
*   `ListItemAttachments`: Updated import statement reference in the documentation [#254](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/254)
*   `ListView`: Updated documentation for the `iconFieldName` property [#245](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/245)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): [Francis](https://github.com/PzKfWg), [Fredrik Andreasson](https://github.com/Varuuna), [Hugo Bernier](https://github.com/hugoabernier), [Tautvydas Duda](https://github.com/ltdu), [Özgür Ersoy](https://github.com/moersoy), [Robert Lindström](https://github.com/robert-lindstrom), [Alex Terentiev](https://github.com/AJIXuMuK). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).