---
title: Getting likes and comments from modern pages
author: Elio Struyf
type: post
date: 2018-03-26T12:24:46+00:00
slug: /getting-likes-and-comments-from-modern-pages/
dsq_thread_id:
  - 6577331074
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - API
  - Comments
  - Likes
comments: true
---

If you are using a modern site in SharePoint Online, you might have noticed that there is a new footer / social bar control which contains actions that allow you to like a page, see the number of comments and page views.

{{< caption-new "/uploads/2018/03/032618_1158_Gettinglike1.png" "The social bar with like and comment capabilities" >}}

This is a very simple control and might be useful to you when building some social solutions like for example when building your own news page roll-ups or controls. In this article, I show which endpoints are used to retrieve this information from the page.

## Getting the page likes

The first party SharePoint controls make use of the following endpoint in order to fetch the page like information: `{webUrl}/_api/web/Lists(guid'{listId}')/GetItemById({itemId})/likedBy?$inlineCount=AllPages`

You can expect the following data from this endpoint:

{{< caption-new "/uploads/2018/03/Screenshot-2018-03-23-17.04.15.png" "Page likes" >}}

What is important in this call is the **$inlineCount** parameter, which returns you the number of likes for the provided item.

There is another API which you can use to get the same kind of information and this is the `likedByInformation` API. You call it as follows: `{webUrl}/_api/web/Lists(guid'{listId}')/GetItemById({itemId})/likedByInformation?$expand=likedby`.

The returned object looks like this:

```json
{
  "@odata.context": "https://....sharepoint.com/sites/APITesting2/_api/$metadata#likedByInformations/$entity",
  "@odata.type": "#Microsoft.SharePoint.Likes.likedByInformation",
  "@odata.id": "https://....sharepoint.com/sites/APITesting2/_api/web/lists('%7Bc3d4c46f-f4ae-454c-bfb7-6608dc01b19f%7D')/GetItemById(23)/likedByInformation",
  "@odata.editLink": "web/lists('%7Bc3d4c46f-f4ae-454c-bfb7-6608dc01b19f%7D')/GetItemById(23)/likedByInformation",
  "isLikedByUser": true,
  "likeCount": 1,
  "likedBy@odata.navigationLink": "web/lists('%7Bc3d4c46f-f4ae-454c-bfb7-6608dc01b19f%7D')/GetItemById(23)/likedByInformation/likedBy",
  "likedBy": [{
    "@odata.type": "#Microsoft.SharePoint.Likes.userEntity",
    "@odata.id": "https://....sharepoint.com/sites/APITesting2/_api/Microsoft.SharePoint.Likes.userEntity0a0ba3da-55f1-401e-a87e-6c8afa345548",
    "@odata.editLink": "Microsoft.SharePoint.Likes.userEntity0a0ba3da-55f1-401e-a87e-6c8afa345548",
    "creationDate": "2019-09-17T13:27:52.893Z",
    "email": "...",
    "id": 8,
    "loginName": "i:0#.f|membership|...",
    "name": "Elio Struyf"
  }]
}
```

## Getting the page comments

A similar API is used for the page comments. Instead of likedBy, Comments is used: `{webUrl}/_api/web/Lists(guid'{listId}')/GetItemById({itemId})/Comments?$expand=replies,likedBy,replies/likedBy&$top=10&$inlineCount=AllPages`

> **Info**: Vardhaman Deshpande wrote a good article about this topic last year: [Working with the Page Comments REST API in SharePoint Communication sites](http://www.vrdmn.com/2017/07/working-with-page-comments-rest-api-in.html).

The data this API endpoint returns looks like this:

{{< caption-new "/uploads/2018/03/Screenshot-2018-03-23-17.05.49.png" "Page comments" >}}

## Getting the number of likes and comments with one call

If you are only interested in retrieving the likes and comments, there is an easier way than calling the two APIs and extracting the **@odata.count** property. What you can do is make use of the **RenderListDataAsStream** in order to fetch this information. The likes count is available in the **_likeCount** field, and the comments count in the **_CommentCount** field. Here is a sample:

{{< caption-new "/uploads/2018/03/032618_1158_Gettinglike4.png" "Using the RenderListDataAsStream API" >}}

The body for this request looks as follows:

{{< gist estruyf 820076deff42be8d1ae1aba687f8ed85 >}}

This is what you could expect in return (check the highlighted lines):

{{< caption-new "/uploads/2018/03/032618_1158_Gettinglike5.png" "Nr. of likes and comments via the RenderListDataAsStream API" >}}

> **Info**: the reason why I used the RenderListDataAsStream API to retrieve these values is because both fields are lookup fields referencing to another site (root site collection in this case). RenderListDataAsStream is the only API which supports it.


## Updates

### 17/09/2019

Added the new `likedByInformation` API information.