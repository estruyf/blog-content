---
title: Important managed properties for rendering people results
author: Elio Struyf
type: post
date: 2015-09-02T11:59:20+00:00
slug: /important-managed-properties-for-rendering-people-results/
dsq_thread_id:
  - 4090110772
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - People Results
  - Search
comments: true
---

For a client, my colleague and I were creating a new "who is who" functionality on their intranet via a couple search web parts. In order to show the full profile of a user we created a new page with a content by search web part that showed a single user result. This gave us more flexibility for styling the profile page.

In order to let users be able to modify their profile, we wanted to display a link to modify your profile on the page. This is something similar as you get in the default people search result display template:

{{< caption-new "/uploads/2015/09/090215_1158_Importantma1.png" "Default person result (profile link is highlighted) " >}}

To render this link in the default person item display template, four "managed properties" are required. The four properties are:

1.  ProfileViewsLastMonth
2.  ProfileViewsLastWeek
3.  ProfileQueriesFoundYou
4.  EditProfileUrl

If one of the first three properties contains any information, this means that your profile / search results is retrieved.

{{< caption-new "/uploads/2015/09/090215_1158_Importantma2.png" "Retrieved properties (your own person result)" >}}

For other people results these properties are always null.

{{< caption-new "/uploads/2015/09/090215_1158_Importantma3.png" "Retrieved properties (for other person results)" >}}

Now when we wanted to implement this kind of functionality in our own display templates. An issue occurred with these "managed properties", they never return any values.

Here is an example of a custom display template that shows these managed property values:

{{< caption-new "/uploads/2015/09/090215_1158_Importantma4.png" "Person result with custom display template" >}}

While I was digging through the code of the search DLL, I found out that these properties are only added if your own people result is processed. This is the reason why you do not retrieve these property values for other users.

> **Note**: As these properties are added when people search results are processed, they are not real managed properties in your search schema. Specifying these properties in the managed property mappings of your display template will not work.

What I also noticed in the code of the search DLL were a couple of checks for the service application ID and user profile GUID. If you already created or modified people display templates, you might know that these are managed properties that are mapped in the default item person display template:

1.  ServiceApplicationID
2.  UserProfile_GUID

Apparently if you do not specify these two property mappings (**ServiceApplicationID** and **UserProfile_GUID**) in your custom CSWP display template. You would not retrieve the other properties (ProfileViewsLastMonth, ProfileViewsLastWeek, ProfileQueriesFoundYou, EditProfileUrl).

Adding these two managed properties to the ManagedPropertyMapping element of your display template will return the necessary properties.

```javascript
<mso:ManagedPropertyMapping msdt:dt="string">'Title','AccountName','Path','PictureURL','ServiceApplicationID','UserProfile_GUID'</mso:ManagedPropertyMapping>
```

Here is an example of what these property values look like:

{{< caption-new "/uploads/2015/09/090215_1158_Importantma5.png" "Person result when ServiceApplicationID and UserProfile_GUID is mapped" >}}