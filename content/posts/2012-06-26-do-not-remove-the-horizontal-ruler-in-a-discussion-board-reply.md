---
title: Do Not Remove the Horizontal Ruler in a Discussion Board Reply
author: Elio Struyf
type: post
date: 2012-06-26T08:28:19+00:00
slug: /do-not-remove-the-horizontal-ruler-in-a-discussion-board-reply/
dsq_thread_id:
  - 3861593072
categories:
  - SharePoint
tags:
  - Discussion List
comments: true
---

This week a customer informed me that they were experiencing some problems with a web part someone developed. The web part showed the latest discussion board messages, but suddenly they received an error from the web part.

In the beginning we thought that it all had to do with special characters. The message subject was created with this the § character, instead of a 6.

After some testing, none of the special characters were giving this error, so it was back to square one.

Then we saw that the **Show Quoted Message** link was not visible in the reply, which is normally underneath the reply.

&nbsp;

{{< caption-new "/uploads/2012/06/060712_2004_DoNotRemove1.png" "Show Quoted Messages" >}}

&nbsp;

After some more research I finally found what was occurring the problem. It had to do with the horizontal ruler from the reply message. This horizontal ruler is used as a reference to split the reply from the original message.

&nbsp;

{{< caption-new "/uploads/2012/06/060712_2004_DoNotRemove2.png" "Horizontal Ruler" >}}

When you remove this horizontal ruler on the creation of a reply, SharePoint cannot see the difference between the reply and the original message. That was why the **Show Quoted Message** was not shown.

{{< caption-new "/uploads/2012/06/060712_2004_DoNotRemove3.png" "Horizontal Ruler Not Shown" >}}

&nbsp;

Behind the scenes, a normal message (message that was created with the horizontal ruler) has the following metadata fields for storing the HTML content:

*   Body: Reply + Quoted Message;
*   **TrimmedBody**: Reply;
*   BodyAndMore: Reply + Quoted Message;
*   MessageBody: Reply + Quoted Message;
*   **CorrectBodyToShow**: Reply;
*   FullBody: Reply + Quoted Message;
*   LimitedBody: Reply + Quoted Message.
The two most important for a message are: TrimmedBody and CorrectBodyToShow. These fields or used to store the actual message itself without the quoted message.

But when you do a reply without the horizontal ruler, the message will only contain the following fields:

*   Body;
*   BodyAndMore;
*   MessageBody;
*   FullBody;
*   LimitedBody.

TrimmedBody and CorrectBodyToShow do not exist for this message, and that is why the web part was returning an error.

## Examples

Here are some examples:

### Reply with the horizontal ruler

{{< caption-new "/uploads/2012/06/060712_2004_DoNotRemove4.png" "Example with the horizontal ruler" >}}

### Reply without the horizontal ruler

{{< caption-new "/uploads/2012/06/060712_2004_DoNotRemove5.png" "Example without the horizontal ruler" >}}