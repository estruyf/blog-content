---
title: PnP SharePoint Framework React controls v1.16.0 released
slug: /pnp-sharepoint-framework-react-controls-v-1-16-0-released/
author: Elio Struyf
type: post
date: 2019-12-16T09:59:14.595Z
draft: false
tags: []
categories: []
comments: true
---

Version 1.16.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

- `FilePicker`: Fixes for OneDrive CORS issues [#407](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/407)
- `ListItemPicker`: added new control property `filter` [#392](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/392)
- allowing to use context from any type of SPFx extensions: [#419](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/419)
- `Placeholder`: remove unused and vendor specific CSS [#426](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/426)

**Fixes**

- Documentation fix for `FilePicker`: updated `accepts` value in props [#404](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/404)
- The `FilePicker` control doesn't work in many languages due to missing localization keys [#412](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/412)
- Documentation fix for broken links of Property Controls landing page [#388](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/388)
- Documentation fix to include new components from v 1.15.0 [#394](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/394)
- `DateTimePicker`: dropdown for time not handling AM/PM correctly [#405](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/409)
- Documentation fix for `index` page: updated link to Chart controls [#417](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/417)
- Documentation update for SPFx On Premises notice: [#418](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/418)
- Documentation update for `ListItemPicker`: `valueColumnInternalName` should be `keyColumnInternalName`
- `RichText`: Fix "Align Left" button [#429](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/429)
- Documentation update for `FilePicker`: misspelling [#432](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/432)
- `IFramePanel`: Fix doubled scroll issue when iframe content is higher than frame height [#431](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/431)
- `PeoplePicker`: `errorMessage` not showing [#420](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/420)
- `IFrameDialog`: `commitPopUp` typo causes popups with classic forms to not close after hitting save [#433](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/433)

## Contributions

This release wouldn&#39;t be possible without the help of (in alphabetical order): [Piotr Siatka](https://github.com/siata13), [Dani Domínguez](https://github.com/danidz96), [Siddharth Vaghasia](https://github.com/siddharth-vaghasia), [João Mendes](https://github.com/joaojmendes), [PrasadKasireddy](https://github.com/PrasadKasireddy), [Chad Eiserloh](https://github.com/c-eiser13), [Koen Zomers](https://github.com/KoenZomers), [Dmitry Rogozhny](https://github.com/dmitryrogozhny), [Alexander Kleshcheov](https://github.com/SharePickle), [Hugo Bernier](https://github.com/hugoabernier), [Beniamin](https://github.com/bbronisz), [Giovani Martini](https://github.com/giovanibm)..

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don&#39;t hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).
