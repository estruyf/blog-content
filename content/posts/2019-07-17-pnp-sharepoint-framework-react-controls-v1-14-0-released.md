---
title: PnP SharePoint Framework React Controls v1.14.0 released
author: Elio Struyf
type: post
date: 2019-07-17T17:47:04+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-14-0-released/
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

Version 1.14.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   German translations added for attachment and RichText controls [#333](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/333)
*   `SecurityTrimmedControl`: Added a wrapper `className` property for the parent element [#325](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/325)
*   `ListPicker`: Add ability to filter the control via OData [#319](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/319)
*   `IFrameDialog`: closing dialog on commit [#313](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/313)
*   `WebPartTitle` add support for section background color [#258](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/258)

**Fixes**

*   Fix in return type of onClick and onDoubleClick events [#321](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/321)
*   `ListPicker`: Fix for available dropdown selection after selection was done [#315](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/315)
*   Fixes to French translations [#312](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/312)
*   `RichText`: Issue on rendering the control in view mode [#287](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/287)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): [Amr Fouad](https://github.com/ministainer), [Joel Jeffery](https://github.com/joeljeffery), [Mark Powney](https://github.com/mpowney), [Dominik Schmieder](https://github.com/DominikSchmieder), [Alex Terentiev](https://github.com/AJIXuMuK), [Zhephyr](https://github.com/Zhephyr54). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).