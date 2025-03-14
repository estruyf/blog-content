---
title: "#DevHack: Dismiss messaging extension dialog in MS Teams"
slug: "/devhack-dismiss-messaging-extension-dialog-ms-teams/"
author: "Elio Struyf"
type: "post"
date: "2020-11-27T14:13:22.946Z"
draft: false
tags:
  - "API"
  - "Development"
  - "Microsoft Graph"
  - "SharePoint"
categories: []
comments: true
preview: "/social/df905238-628c-4638-a5b6-781fca59b312.png"
---

Currently, I am developing my first "real" Microsoft Teams app with SharePoint Framework. In this app, I am making use of the new messaging extension capability.

{{< blockquote type="info" text="[what are messaging extensions?](https://docs.microsoft.com/en-us/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions)" >}}

While developing a form in my extension, I wanted to cancel and submit a button. When I started implementing the cancel button, its `onClick` event, I was lost in how to close the dialog. 

While going through the documentation, I found that you can do this by calling `microsoftTeams.tasks.submitTask()`. It was a bit hidden away on this page: [task modules](https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/task-modules-tabs#htmljavascript-taskinfourl).

In your SharePoint Framework code, it looks as follows:

```typescript
if (this.context.sdks.microsoftTeams) {
  // Close the current dialog
  this.context.sdks.microsoftTeams.teamsJs.tasks.submitTask();
}
```

*Happy MS Teams development*
