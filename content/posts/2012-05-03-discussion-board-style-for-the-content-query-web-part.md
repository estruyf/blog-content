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

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB1.png" "Content Query - Discussion Board Items"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAtElEQVR4nE2P247DIAxE8/+fuOo2q5KWiyGACQ0mXKokK6XzMJJ1dDTyoALJQE+XBBKzKz9aIPUjg/DprmNMW95KyiWXSqXSVtuRQTscJ+6sNSCNVrPRRP/qbvs3jRCYWe6wsDlKv/beLowhSNDsxcM75dpzudiOJxN/uF8pn3frvbWjT2ysEwCI+C1d9rykm/QjhJtwf8qPyv9ClCE/7Jq2OmBYGBdC7fMvIbkCjCnXdv72AeoKAk4aq+dcAAAAAElFTkSuQmCC" "201" "181" >}}

As you can see in the image above, the content query web part returns **(Blank)** messages. These **(Blank)** messages are the replies users have made.

So why do messages return as **(Blank)**?

As you may or may not know, the discussion board contains two content types.

1.  Discussion;
2.  Message.
Message can only be used when you do a reply on a discussion (which creates folders), and they do not contain a Title/Subject field (this is hidden by default).

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB2.png" "Subject (Title) Field is hidden"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcElEQVR4nGXMyw7DIAxEUf//N3YTVcipKCYxRphHcJW2O6SzmLsZIArOOebTbK4gSYmiUpoOW8EDj1fq/TLtpn1+/fadgFzd2aRfY5ot74DOZ6mSamKNMUuqWf4iZTieOEMwCsN73ra270Z3WngXxA9yeq2PKJXycAAAAABJRU5ErkJggg==" "481" "287" >}}

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB3.png" "Reply on a discussion"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA1ElEQVR4nE2Oz04CMRjE+zJ64gmI8eQBSIxRbj4Cj0jksgeMbHQRUOCI2+WPa7efpV+3X6VdI5uok8kcJplfhnVue+3L7kXrqnF+c9K8/u/Tsy6bjhdP0eD+IY6Gj3dRPEpm8fglTmbJZN6PRuw9l2SM+zqUxhosQwhVVdW5E8D2aEII3nsp4UOIQkql9hrREa34lpXkqqMAQAgBIBG1cz/lNi+YsVTTiKhm/sI3efG39t6H4O3xgjV4IJtmG7YToDSC0kqj/FQpz95SzrM159nz6/IbzsjLyKCZ+4kAAAAASUVORK5CYII=" "438" "354" >}}

Because you do not need to add the subject in your reply, the title/subject field automatically gets **(Blank)** as field value.

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB4.png" "Subject (Title) field gets blank values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVR4nF2KOxKAIBDFuP9FsQEdcPfB/nAYK02TIklX650HMUQkIq5OtZG5d8LZ7jRUoSpzAvsQC5pG08xjrZUitkqpOR8A1pf0ChjM7O6//AA1DHUjVs0D2gAAAABJRU5ErkJggg==" "503" "180" >}}

## Discussion Board Content Query Web Part Style

The result of the Discussion Board Style will be the following:

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB5.png" "Discussion Board Style Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nB3BSwqAMAwFwN7/kIKkoC2W14R8VwrOtIvzRBBiQtxdVc0sM99f6zuP5bSDHulL7jEAMHNEVNUH3c04sCPcyu8AAAAASUVORK5CYII=" "446" "89" >}}

As you can see the (Blank) messages are replaced with the discussion subject. To do this, you can retrieve the subject from the **LinkUrl** of the message.

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB6.png" "Discussion subject can be retrieved from the URL"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATklEQVR4nC3JQQ7AIAgFUe9/RqlbbUIEQxfwDW3adPJ2U2qt4xyqapeZmUdkZt5/hQ7qo6+1AIS7M0MEIjEn3EtrjYiYGe8PqG5VfHbEA3eJVUxSo2ukAAAAAElFTkSuQmCC" "446" "142" >}}

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

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB7.png" "Content Query Web Part - Settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA60lEQVR4nGWPbW/DIAyE+f9/sIsUKg0oBFpITDEvaYGJdJq27tHJn3z2HZFSLdrsj2dtfage81BrnVBKp2myzqUUcRAQQ4wIsN1uV0LP59PpQ3BhjHbOAmzbtgGA0ZozRpSSSqllUUrJEMK+76WUWmvOaXWOAPgYU8o5DtI9jAe11tZa750YcxWXEY8zpm1Qdu+9P+uRsTaitXbOAcC6ruA9+PsL731EJD+nWqut1TfIPFOtdQgBAPwvAAARifceEXvv78aXWwgxz1TKS/hHjJEsR2Vr7aiV/ijnRDjnjH0yxqy1pZRj6Zuc8xdnk3GrVdFS3wAAAABJRU5ErkJggg==" "264" "345" >}}

When you save these settings, the result should be like this:

{{< caption-new "/uploads/2012/03/031112_1911_DiscussionB5.png" "Discussion Board Style Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nB3BSwqAMAwFwN7/kIKkoC2W14R8VwrOtIvzRBBiQtxdVc0sM99f6zuP5bSDHulL7jEAMHNEVNUH3c04sCPcyu8AAAAASUVORK5CYII=" "446" "89" >}}