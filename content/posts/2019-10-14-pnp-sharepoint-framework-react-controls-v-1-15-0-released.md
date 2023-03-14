---
title: PnP SharePoint Framework React controls v1.15.0 released
slug: /pnp-sharepoint-framework-react-controls-v-1-15-0-released/
author: Elio Struyf
type: post
date: 2019-10-14T20:09:36.933Z
draft: false
tags: []
categories: []
comments: true
---

Version 1.15.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

*New control(s)*

- `FilePicker`: New control added to the library [#366](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/366)
- `GridLayout`: New control added to the library [#350](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/350)
- `Carousel`: New control added to the library [#227](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/227)

*Enhancements*

- `TaxonomyPicker`: Localization keys added to the buttons [#361](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/361)
- Swedish localization support added [#359](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/359)
- Improved German translations [#338](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/338)
- `DateTimePicker`: added options to render time part as mask or dropdown [#330](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/330)
- `ListItemPicker`: option to select a key column [#350](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/355), [#381](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/381)
- Improved Russian translations [#384](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/384)
- `RichText`: Added the ability to add a third Color Swatch Group called custom. This will allow you to add custom colors to the font color selector. [#385](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/385)

*Fixes*

- `TaxonomyPicker`: Tags icon styling issue on IE11 [#356](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/356)
- `DateTimePicker`: Does not respect dateLabel and timeLabel [#346](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/346)
- `PeoplePicker`: Get loginName with ensureUser [#342](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/342)
- `PeoplePicker`: Fix missing required field label [#371](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/371)

## Contributions

This release wouldn&#39;t be possible without the help of (in alphabetical order): [amortsell](https://github.com/amortsell), [Hugo Bernier](https://github.com/hugoabernier), [Robert Lindström](https://github.com/robert-lindstrom), [pfc2k8](https://github.com/pfc2k8), [Piotr Siatka](https://github.com/siata13), [Alex Terentiev](https://github.com/AJIXuMuK), [Luis Robertto Mello](https://github.com/mellolr1), [eweintraub](https://github.com/eweintraub).

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don&#39;t hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).
