---
title: PnP SharePoint Framework React Controls v1.13.2 released
author: Elio Struyf
type: post
date: 2019-05-22T13:32:50+00:00
slug: /pnp-sharepoint-framework-react-controls-v1-13-2-released/
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

Version 1.13.2 of the SharePoint Framework React Controls (`@pnp/spfx-controls-react`) has been released. This is an open source library that shares a set of reusable React controls, which can be used in your SharePoint Framework solutions.

This release includes the following changes:

**Enhancements**

*   Improvements to the `Lithuanian` localization [#285](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/285)

**Fixes**

*   `IFrameDialog`: dimensions issue [#303](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/303)
*   `DateTimePicker`: IE11 layout issue [#301](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/301)
*   `FileTypeIcon`: Only displays PDF&#39;s in SPFx `1.8.2` [#300](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/300)
*   `FieldNameRenderer`: Fails to encode URI when `hasPreview` [#296](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/296)
*   `TaxonomyPicker`: Cannot find name `TermLabelAction [#293](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/293)
*   `ListItemAttachments`: Move deleted attachments to the recycle bin [#291](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/291)
*   `DateTimePicker`: Does not respect `isMonthPickerVisible` prop [#283](https://github.com/SharePoint/sp-dev-fx-controls-react/issues/283)
*   `ListItemAttachments`: Render issue fixed + improvements to the attachment API calls [#282](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/282)
*   `RichText`: Fixes an issue when hitting enter in the control [#277](https://github.com/SharePoint/sp-dev-fx-controls-react/pull/277)

## Contributions

This release wouldn&#39;t be possible without the help of (in alphabetical order): [Tautvydas Duda](https://github.com/ltdu), [Thomas Granheim](https://github.com/ThomasGranheim), [Robert Lindström](https://github.com/robert-lindstrom), [Alex Terentiev](https://github.com/AJIXuMuK). Thank you for your contributions.

## Try it out today

Get the latest release of the `@pnp/spfx-controls-react` from npm by executing in the command line: `npm i @pnp/spfx-controls-react -S -E`.

You can check out the documentation here: [https://sharepoint.github.io/sp-dev-fx-controls-react/](https://sharepoint.github.io/sp-dev-fx-controls-react/)

## Issues and feedback

If you have issues or feedback, don&#39;t hesitate to reach out to the team on GitHub via the issue list: [https://github.com/SharePoint/sp-dev-fx-controls-react/issues](https://github.com/SharePoint/sp-dev-fx-controls-react/issues).