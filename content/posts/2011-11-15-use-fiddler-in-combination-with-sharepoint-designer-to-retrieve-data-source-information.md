---
title: Use Fiddler In Combination With SharePoint Designer to Retrieve Data Source Information
author: Elio Struyf
type: post
date: 2011-11-15T17:04:12+00:00
slug: /use-fiddler-in-combination-with-sharepoint-designer-to-retrieve-data-source-information/
Xylos:
  - http://www.xylos.com/blog/post/997/Use-Fiddler-In-Combination-With-SharePoint-Designer-to-Retrieve-Data-Source-Information/
dsq_thread_id:
  - 3838470682
categories:
  - SharePoint
  - SharePoint Designer
tags:
  - Fiddler
  - SharePoint Designer
  - SOAP
  - Web Part
  - Web Services
  - XSLT
comments: true
---

SharePoint Designer is a handy application when you want to do quick modifications to your site. Like for example creating a data view web part. When you are working with XSLT and want to create your own templates, it is useful to know the returned SOAP message (XML output). This is something SharePoint Designer does not provide. To retrieve this information, you need to use another application called Fiddler.

[http://www.fiddler2.com](http://www.fiddler2.com "Fiddler")

With Fiddler you are able to log all the HTTP requests between your computer (SharePoint Designer) and the site you are working on.

As they describe it on their website:

_Fiddler is a Web Debugging Proxy which logs all HTTP(S) traffic between your computer and the Internet. Fiddler allows you to inspect traffic, set breakpoints, and "fiddle" with incoming or outgoing data. Fiddler includes a powerful event-based scripting subsystem, and can be extended using any .NET language._

## Prerequisite

Download and install Fiddler to your computer.

[http://www.fiddler2.com](http://www.fiddler2.com "Fiddler")

## Logging data to Fiddler

When you open Fiddler, you will get the following window.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI1.png" "Fiddler" >}}

Normally it will immediately start logging, so when you start SharePoint Designer and open a connection to your site, Fiddler will have logged all the traffic between SharePoint Designer and the site. If not, click **File <span style="font-family: Wingdings;">à</span> Capture Traffic**.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI2.png" "Traffic between SPD and SP Site" >}}

Now that Fiddler captures the traffic between SharePoint Designer and your SharePoint site, you can create a new page (if you already have one with a Data View Web Part on it, you can use it).

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI3.png" "Empty Data View" >}}

Insert an empty data view. You could also insert a list or library, but this will already have some custom styling. If you want to create your own, you should better start from an empty data view.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI4.png" "Data Source" >}}

Click on **Click here to select a data source** and select the data source that you want to use. On the right side the **Data Source Detail** tab will open.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI5.png" "Data Source Details" >}}

If you go back to Fiddler, new records should be available. When you are working with a Web Part page it will the following record.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI6.png" "Data Source Request in Fiddler" >}}

If you do not know exactly which of the records is from the data source request, you could check the time and refresh the data source.

Select the record, and in the **Inspector **tab, select **Raw** output.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI7.png" "Get raw output" >}}

Normally you will get a notification that the message is encoded. This message could easily be decoded by clicking on the notification message: **Response is encoded and may need to be decoded before inspection. Click here to transform.
**

After you clicked on the notification message, you will retrieve the decoded SOAP message (XML output).

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI8.png" "SOAP Message" >}}

Fiddler can be used for a lot more than retrieving SOAP messages, but for me this is very useful when I doing some XSLT styling.