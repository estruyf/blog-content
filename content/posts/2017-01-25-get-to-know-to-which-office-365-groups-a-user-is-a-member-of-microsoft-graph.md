---
title: Get to know of which Office 365 Groups a user is a member of (Microsoft Graph)
author: Elio Struyf
type: post
date: 2017-01-25T15:12:30+00:00
slug: /get-to-know-to-which-office-365-groups-a-user-is-a-member-of-microsoft-graph/
dsq_thread_id:
  - 5492637029
categories:
  - Microsoft Graph
  - Office 365
tags:
  - Office 365 Groups
comments: true
---

Getting to know to which Office 365 groups users are a member of, is very useful information. You can use this information for building your own group applications or to keep a record where users have access to (governance / guest access).

The way to retrieve the groups is already documented in the Microsoft Graph documentation, but it is a bit hidden and deserves more attention.

> **Microsoft Graph documentation**: [https://graph.microsoft.io/en-us/docs](https://graph.microsoft.io/en-us/docs) - look for: GET unified groups I'm member of.


## Office 365 Groups I am a member of

If you want to know the groups you are a member of. You can call the following API:

```html
https://graph.microsoft.com/v1.0/me/memberOf/$/microsoft.graph.group?$filter=groupTypes/any(a:a eq 'unified')
```

Based on the following article: [Office 365 Groups REST API](https://dev.office.com/blogs/GroupsRESTAPI). There is an easier way to get the groups where you are a member of:

```html
https://graph.microsoft.com/v1.0/me/joinedGroups
```


> **Info**: At the moment, I have not found any reference to this endpoint in the documentation (only on the relationships list of the user: [relationships](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/user)) and it seems that it is already available on v1.0.


## Office 365 Groups where the user is a member of

If you want to know to which groups a user is a member of, you can only make use of the **memberOf** endpoint. The endpoint to call is:

```html
https://graph.microsoft.com/v1.0/users/<user-id>/memberOf/$/microsoft.graph.group?$filter=groupTypes/any(a:a eq 'unified')
```
