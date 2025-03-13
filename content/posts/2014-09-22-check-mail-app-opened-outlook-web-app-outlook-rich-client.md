---
title: Check if your mail app is opened in Outlook Web App or Outlook rich client
author: Elio Struyf
type: post
date: 2014-09-22T12:57:22+00:00
slug: /check-mail-app-opened-outlook-web-app-outlook-rich-client/
dsq_thread_id:
  - 3838737802
categories:
  - Development
  - Office 365
tags:
  - JavaScript
  - Office 365
  - Office 365 Dev
comments: true
---

During the development for my proof of concept mail app, I needed to know in which context my app was running. By default you have the option to set the startpage for the desktop, tablet or mobile view ([Set up a mail app for Outlook on tablets and mobile devices](http://msdn.microsoft.com/en-us/library/office/dn594603%28v=office.15%29.aspx)), but you do not have the option to change the view when opened in a rich client. Eventually it turned out that you have two ways to check in which context your app is running and they are really simple to implement.

## Solution 1: check the querystring parameters

The first solution is to check the URL to see if it contains a querystring parameter named **et**. That querystring parameter is only present if the app is opened in the Outlook Web App context. If the app is opened in a rich client context, the querystring parameter will not be present.

The URL loaded in the OWA context looks like this:

`https://APP-URL?et=#&_xdm_Info=GUID'ocii4'https://outlook.office365.com/owa/?realm=tenant.onmicrosoft.com&wa=wsignin1.0#path=/mail`

The URL loaded in the rich client context looks like this:

`https://APP-URL`

> **Note**: I found the difference when looking at the requests in Fiddler.

To translate this to code, we need to check if the querystring parameter **et** is present in the URL, if it is, we know that the app is opened in the browser. The code looks like this:

```javascript
$(function () {
  var querystring = document.location.search;
  if (querystring !== null && querystring !== "") {
    var param = "et";
    if (querystring.indexOf('?' + param + '=') !== -1 '' querystring.indexOf('&' + param + '=') !== -1) {
      $('#content-main .padding').append('<h2>App opened in the browser</h2>');
    } else {
      $('#content-main .padding').append('<h2>App opened in the client</h2>');
    }
  } else {
    $('#content-main .padding').append('<h2>App opened in the client</h2>');
  }
});
```

> **Note**: this solution can also be used in managed code.

## Solution 2: check the OWAView property (recommended)

The other option you have is checking the **OWAView** property. This property only contains a value if it is opened in an Outlook Web App context ([reference](http://msdn.microsoft.com/en-us/library/office/jj715282%28v=office.1501401%29.aspx)). So if the value is undefined, you know that the app is opened in the client.

The code looks like this:

```javascript
Office.initialize = function () {
  var context = Office.context;
  if (typeof context.mailbox.diagnostics.OWAView === "undefined") {
    $('#content-main .padding').append('<h2>App opened in the client</h2>');
  } else {
    $('#content-main .padding').append('<h2>App opened in the browser</h2>');
  }
};
```


## Result

{{< caption-new "/uploads/2014/09/092214_1257_Checkifyour1.png" "App opened in OWA" >}}

{{< caption-new "/uploads/2014/09/092214_1257_Checkifyour2.png" "App opened in the rich client" >}}