---
title: PnP SharePoint Framework React Controls v1.12.0 released
author: Elio Struyf
type: post
date: 2019-02-22T09:03:47+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-12-0-released/
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

Version 1.12.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**New control(s)**

*   `ListItemAttachments`: New control added [#177](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/177)
*   `IFramePanel`: New control added [#226](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/226)

**Enhancements**

*   Added `Russian` localization [#214](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/214)
*   `TaxonomyPicker`: Ability to specify term actions [#237](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/237)

**Fixes**

*   `TaxonomyPicker`: Terms are sorted incorrectly under the wrong parent [#199](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/199) [#229](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/229)
*   `TaxonomyPicker`: Issue with custom sort order of items underneath root terms [#231](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/231)
*   `PeoplePicker`: Fix for issue where values couldn't be cleared [#234](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/234)

## Contributions

This release wouldn't be possible without the help of (in alphabetical order): [Patrik Hellgren](https://github.com/patrikhellgren), [João Mendes](https://github.com/joaojmendes), [David Opdendries](https://github.com/spdavid), [Piotr Siatka](https://github.com/siata13), [Alex Terentiev](https://github.com/AJIXuMuK), [Tse Kit Yam](https://github.com/tsekityam). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don't hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).