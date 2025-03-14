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

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI1.png" "Fiddler"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAqklEQVR4nDXM3RKBQABA4X3/d6m4MLqo3W0V2vy0yNQwxoxBiTFRytZuLnDuzweox1zKiD0Ze0tEqNbVFbWnaD2l01dVFTRN0/4ryyoveVHx5+td1fIYJ6CuaymlEKJt27woDqckTm/nyzW9Z5vdHnDOhRBfI3tkdDTwpy6be8FiNrLxD5dSfu8wYNGahYG/jVZTOgTQNBAyITQsjC2MHQKHBNoWdB2CDP0DPE2bzmqNG48AAAAASUVORK5CYII=" "605" "371" >}}

Normally it will immediately start logging, so when you start SharePoint Designer and open a connection to your site, Fiddler will have logged all the traffic between SharePoint Designer and the site. If not, click **File <span style="font-family: Wingdings;">à</span> Capture Traffic**.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI2.png" "Traffic between SPD and SP Site"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhElEQVR4nAXB2w6DIAwAUP7/7+bCshhxkECVyqWVogt72TmK69qvJp1qAeemnD2iDeHNHMe4Vc5GpDWhnMCYCdEfR3Duve22S1MlLb2f0qmUYO2UkkdcA8z3/b0uURBXqkxEcd+0fgIE5z7GLGP8mEnBvlAlYooRXvoB4L1386xTxvPkP4jjiJ3ptQ2RAAAAAElFTkSuQmCC" "466" "256" >}}

Now that Fiddler captures the traffic between SharePoint Designer and your SharePoint site, you can create a new page (if you already have one with a Data View Web Part on it, you can use it).

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI3.png" "Empty Data View"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZklEQVR4nBXHTQtAMBgA4P1bohxoLg4Ku3FRzn6ZwxrzUVLyse01r9RzeUhAk7Jpk6J2wsyPmUd/fszcKKdpRfZ1A4MPvBbwAbSAaP+iRaOBdFxzeYnxFOPB5SmmWy5qmJVcdD8dH2YjR3hiyPF/AAAAAElFTkSuQmCC" "605" "160" >}}

Insert an empty data view. You could also insert a list or library, but this will already have some custom styling. If you want to create your own, you should better start from an empty data view.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI4.png" "Data Source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAIAAAB2RJoKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACEElEQVR4nD2OS0/bQBSF52d223/FohULCrRqUSuFICRoaESABYRXeDgmIXGcOPaM52nPy6+pElq+xV3cc+49B7DwHA42SdDLZLFIBGWK0GweYS5yjAXIg2/93g6dHibUXNzHpqh4ph78yNgCphxk48/h6UcZ7HIug1mktWGU4ZRQQjEmYPm0+dz5EA42Hu69h7u7eRhNXyeD+8d4EY+efXDV7x8e7ne7nU7npNvtHh8ftQ8O2u12q7X/++QPGHnDiT8UTJa6KFRhlTW5NtIIKu4GQwDD24ZcYsxhksAkns8XhFDnXFWWQZiA0eOpo5c8UymCnPGmaeq6XslV5flTsL214QovhgQmsdbGOdescc7tfG+BXz8+OXmDEOOcu//Ua3mvdQSi6bVjt+ts+LZt1rMqq5dxACR6quA5ZTlO8VupN+qq1toAGA4cu8GYU8rKsvwnutUPoy2wxKvgGWNScFGW1bujaRprLND0pSbXCNE4TmACMcbv5Y3SIFs+1eic0lU2Z7yqqvdrrRSYDEeO9xGkMIkxxghCRmmaYms0TCUQyWOTnlGmEaKECIRomjIhlLUlJgpk0CvgBUEBXHho6RP4ipa+lYnJo2DyAqb+FZ/upeMvy+FWMtpG420afK3pT0d2adwDSuq6UtEiiKJwNnuN4zBazAQnzhWr5lpbqQzneZZJznPGM5HJLFNKWa3tX1k/WF5E+cZ1AAAAAElFTkSuQmCC" "187" "408" >}}

Click on **Click here to select a data source** and select the data source that you want to use. On the right side the **Data Source Detail** tab will open.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI5.png" "Data Source Details"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAIAAADt1dgcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABz0lEQVR4nG2M62/SYBSH3/95fjAx0YQxEihmYwKdl2hi/GLYMgnXQoOOEhwMpwyprDDoS0cvlL6lpRdapJiCJsb4yy8nJ+fJecBpupxKl96fF1Ppcr5ySXxsUPU2Vf9W+9zOlWrgy3W32eo0W53rdq9/NxlBUeBVnkeSqDF9DvATNLmXBX7GTxRFMTVtqeuurjmW+RNyMmg2mlj8A5bIRvFs7CWRfFN5/vZT/DX56l21WmsBSeAq1M3TF2XspBQ9KUVwAsOJx9hZ6DhDViiwcle9ofwEO38YOtsLpB7s+90LpB5F0gRJAdd16cE0GMuFjvP7R9ngUTZw6M9gLHdBXYHVakUPpoHDTHSrxXAinChiOBFJEs3Wd1/e7U8PYnksWQwnCuF4IfQsH0kUDmL5euMGOI7L3qPTzGWu/JWs0iRFly/o7fKj3bkFlrVUdXuuIstcbP7E87zNZjNioY+RZisKsu2lt83a89brtY9HENi2IyNDFKXd6d9v23YU1RyPucXC+L98ppqQHUui5Dju3xhCbic34QjyE17Xfwt2uHfLABZKg6HQY8aCgAzDnc8tTbNV1TQMt0sPAHM36w8RM0SCuFBVGyG/imJpmstC+RfdI8Chr+qSkwAAAABJRU5ErkJggg==" "239" "431" >}}

If you go back to Fiddler, new records should be available. When you are working with a Web Part page it will the following record.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI6.png" "Data Source Request in Fiddler"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGNwi+4W0SuSNi3Td29Ss6/Rcqoz9moR1S/i185Xta0FAIevCKmMmYAOAAAAAElFTkSuQmCC" "566" "17" >}}

If you do not know exactly which of the records is from the data source request, you could check the time and refresh the data source.

Select the record, and in the **Inspector **tab, select **Raw** output.

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI7.png" "Get raw output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABJ0lEQVR4nB3E226CMAAA0P7/pyzZ25I55zYUpcrFlksRiRKMigEKlHITRVg0OTlgCefi+HP6/gZHH8LP10yYzP4mz4Xx9HcExPkCQlkUJQhlRUWqhhUVIayaRFPUBQjCaH8453XbDUM/DN3Lve/7YYhpBE5BuNaJ6x2DMEt5UzRd1fbl9VHfhyTLge0YZGs5rm07lmXrtmN5/s7zd/7R27oW0BXBmH+v1dlaE00dGlgi5tIylhuiuI4GoLRS4cre7vaHU0gZzYqEVQkrU15HNANQlldrhE1yDmmYsChlvGrzquXNjfESWPbGcff+MYhTnvG6arvy2hXNrWzuaV6CS0gTVtCM04zHaR5n+SVOWFHXt0deVgBCCesYIYTwE35NCFEUeSr8/QM4XB2wNUIqMQAAAABJRU5ErkJggg==" "605" "665" >}}

Normally you will get a notification that the message is encoded. This message could easily be decoded by clicking on the notification message: **Response is encoded and may need to be decoded before inspection. Click here to transform.
**

After you clicked on the notification message, you will retrieve the decoded SOAP message (XML output).

{{< caption-new "/uploads/2011/11/111511_1703_UseFiddlerI8.png" "SOAP Message"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeklEQVR4nBXC0QrCIBQAUP//n6JGbWi73etWymIGg3oIaYi7orVeosMR1XZTH/btUSrZEIKmEyEQQqeREIQCpLO9DKObHn6Or8BLXrl8uawxFaEAQPdmGH2Ic0yBM5eV83spn5iy2DVdJW0N17af0NyN8/bmjfu37vkDl8NnVP6XlVsAAAAASUVORK5CYII=" "603" "228" >}}

Fiddler can be used for a lot more than retrieving SOAP messages, but for me this is very useful when I doing some XSLT styling.