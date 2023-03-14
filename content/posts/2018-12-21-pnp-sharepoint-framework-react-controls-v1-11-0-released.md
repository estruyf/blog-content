---
title: PnP SharePoint Framework React Controls v1.11.0 released
author: Elio Struyf
type: post
date: 2018-12-21T13:51:38+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-11-0-released/
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

Version 1.11.0 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**New control(s)**

*   `Map`: Newly introduced map control is available [#14](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/14)
*   `ChartControl`: Newly introduced control to render charts [#15](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/15)

**Enhancements**

*   `PeoplePicker`: Allow the people picker to search on site level and on tenant level [#97](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/97)
*   `ListView`: Added support for filtering [#99](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/99)
*   `PeoplePicker`: Make the titleText property not required [#184](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/184)
*   `Placeholder`: Added the ability to specify if the button can be hidden [#206](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/206)
*   Updated the `office-ui-fabric-react` to the same version as in SPFx 1.7.0

**Fixes**

*   `IFrameDialog`: fix for spinner which keeps appearing on the iframe [#154](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/154)
*   `PeoplePicker`: fix SharePoint groups which could not be retrieved [#161](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/161)
*   `TaxonomyPicker`: fix sort order with lowercased terms [#205](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/205)

## Contributions

This release wouldn&#39;t be possible without the help of (in alphabetical order): [Hugo Bernier](https://github.com/hugoabernier), [Asish Padhy](https://github.com/AsishP), [Piotr Siatka](https://github.com/siata13), [Anoop Tatti](https://github.com/anoopt), [Alex Terentiev](https://github.com/AJIXuMuK), [Tse Kit Yam](https://github.com/tsekityam). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don&#39;t hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).