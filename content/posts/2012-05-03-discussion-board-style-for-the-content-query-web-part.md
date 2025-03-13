---
title: Discussion Board Style for the Content Query Web Part
author: Elio Struyf
type: post
date: 2012-05-03T08:30:41+00:00
slug: /discussion-board-style-for-the-content-query-web-part/
Xylot:
  - http://www.xylos.com/blog/post/1209/SharePoint-Discussion-Board-Style-For-The-Content-Query-Web-Part/
dsq_thread_id:
  - 3836445274
categories:
  - Web Part
  - XSLT
tags:
  - Content Query
  - Styling
  - Web Part
  - XSLT
comments: true
---

When you want to create a rollup from all discussion board (or a specific one) in SharePoint, you will notice that the Content Query Web Part does not have an appropriate style for it.

Every out of the box style from the Content Query Web Part returns the following result.

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB1.png" "Content Query - Discussion Board Items" >}}

As you can see in the image above, the content query web part returns **(Blank)** messages. These **(Blank)** messages are the replies users have made.

So why do messages return as **(Blank)**?

As you may or may not know, the discussion board contains two content types.

1.  Discussion;
2.  Message.
Message can only be used when you do a reply on a discussion (which creates folders), and they do not contain a Title/Subject field (this is hidden by default).

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB2.png" "Subject (Title) Field is hidden" >}}

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB3.png" "Reply on a discussion" >}}

Because you do not need to add the subject in your reply, the title/subject field automatically gets **(Blank)** as field value.

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB4.png" "Subject (Title) field gets blank values" >}}

## Discussion Board Content Query Web Part Style

The result of the Discussion Board Style will be the following:

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB5.png" "Discussion Board Style Result" >}}

As you can see the (Blank) messages are replaced with the discussion subject. To do this, you can retrieve the subject from the **LinkUrl** of the message.

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB6.png" "Discussion subject can be retrieved from the URL" >}}

The subject of the discussion exists in the LinkUrl, because when a discussion is started, it creates a folder with the subject as folder value.

The XSL style looks like this:


```xml
<!-- Discussion Style -->
<xsl:template name="DiscussionStyling" match="Row[@Style='DiscussionStyling']" mode="itemstyle">
  <!-- Retrieve the content type: 'Content Type' -->
  <xsl:variable name="Type" select="@Type" />
  <!-- Retrieve the discussion/message creatore: 'Created By' -->
  <xsl:variable name="Creator" select="@Creator" />

  <xsl:choose>
    <!-- Check if item is a reply -->
    <xsl:when test="$Type='Message'">
      <!-- Retrieve the ReplyId, ex: '7_.000' -->
      <xsl:variable name="MessageId">
          <xsl:call-template name="StripSlash">
              <xsl:with-param name="text" select="@LinkUrl"/>
          </xsl:call-template>
      </xsl:variable>

      <!-- Remove the ReplyId from the discussion URL -->
      <xsl:variable name="DiscussionUrl" select="substring-before(@LinkUrl, concat('/', $MessageId))" />

      <!-- Retrieve the discussion title from the URL -->
      <xsl:variable name="DiscussionTitle">
        <xsl:call-template name="StripSlash">
              <xsl:with-param name="text" select="$DiscussionUrl"/>
          </xsl:call-template>
      </xsl:variable>

      <span style="font-style:italic;">      
        [
          <xsl:value-of select="$DiscussionTitle" />
        ]({$DiscussionUrl}) (Replied by: <xsl:value-of select="$Creator" />)
      </span>
    </xsl:when>
    <xsl:otherwise>  
      [
        <xsl:value-of select="@Title" />
      ]({@LinkUrl}) (Posted by: <xsl:value-of select="$Creator" />) 
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>  

<xsl:template name="StripSlash">
  <xsl:param name="text"/>
  <xsl:choose>
      <xsl:when test="contains($text, '/')">
          <xsl:call-template name="StripSlash">
              <xsl:with-param name="text" select="substring-after($text, '/')"/>
          </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
          <xsl:value-of select="$text"/>
      </xsl:otherwise>
  </xsl:choose>
</xsl:template>
```


For the messages the ID (12_.000) will be removed from the LinkUrl, otherwise you will end up on a page that does not exist.

The XSL style can be added to the **ItemStyle.xsl**, which can be found at the following location: **http://your_sitecollection_url/Style Library/XSL Style Sheets/ItemStyle.xsl**.

When you add the content query to you page, change the **Styles** and **Fields** settings to match as in the following image.

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB7.png" "Content Query Web Part - Settings" >}}

When you save these settings, the result should be like this:

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB5.png" "Discussion Board Style Result" >}}