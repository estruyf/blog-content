---
title: 'Fix: V4.master Recurring Meeting Workspace Error: ‘g_InstanceID’ is Undefined'
author: Elio Struyf
type: post
date: 2011-02-08T17:24:01+00:00
slug: /fix-v4-master-recurring-meeting-workspace-error-g_instanceid-is-undefined/
dsq_thread_id:
  - 3845668527
categories:
  - Master Page
tags:
  - Meeting Workspace
comments: true
---

In SharePoint 2007 a problem with JavaScript occurred when you used a recurring meeting workspace. When you clicked on the hyperlinks under &#8220;Select a date from the list below&#8221; a JavaScript error was thrown. 

[Michmon][1] found a solution for this problem and he made a [blog post][2] on MSDN about it.

Now in the SharePoint 2010 days, this problem has been resolved in the &#8220;MWSDefaultv4.master&#8221; master page. This is the standard master page that is used for meeting workspaces. When you want to make use of the &#8220;v4.master&#8221; like I did, the same problem occurs as in SharePoint 2007.

{{< caption-new "/uploads/2011/02/020811_1723_FixV4master1.png" "g_InstanceID JavaScript Error"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAkElEQVR4nE3NPQrCMAAG0JzJwR9w8EqO3kSsiMfQzUW0CF1UxB+Q1ERNa4JKSkxs80mdCm9/xOqbFDy5xgmnSnApmBQsdwbwAMj+biLmImZDakPqSrFbnM2Sfk+PnHQnRXuEzhiNwNcHvhmUWkPU+uhNLVkd09k2nR/ULkXVWmBzeRP9Up/saY3+ZxW+MJn+AdgLgbP+AmKqAAAAAElFTkSuQmCC" "589" "277" >}}

## Solution

The solution is still the same, only the version number has changed.

- Add the following line of code to the v4.master page.

```xml
<%@ Register Tagprefix="Meetings" Namespace="Microsoft.SharePoint.Meetings" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
```

- Add the following line of code after the body tag.

```html
<Meetings:PropertyBag runat="server"/>
```

 [1]: http://blogs.msdn.com/b/spdsupport/
 [2]: http://blogs.msdn.com/b/spdsupport/archive/2008/03/24/how-to-fix-recurring-meeting-workspace-error-g-instanceid-is-undefined.aspx