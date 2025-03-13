---
title: Find out in which Office rich client your Office APP is opened
author: Elio Struyf
type: post
date: 2014-10-14T13:19:37+00:00
slug: /find-office-rich-client-office-app-opened/
dsq_thread_id:
  - 3838342036
categories:
  - Apps
  - Office
  - Office 365
tags:
  - Apps
  - Excel
  - JavaScript
  - Office
  - PowerPoint
  - Project
  - Word
comments: true
---

Some time ago I posted an article about how you can check in which context your mail APP has been opened in OWA or the Outlook rich client (read the post [here](https://www.eliostruyf.com/check-mail-app-opened-outlook-web-app-outlook-rich-client/)). I needed that solution for a proof of concept mail app.

The mail app is finished, so I wanted to go a step further and I also made the APP work in the other Office applications. An extra functionality I included in the APP was a way to retrieve in which context / rich client the APP was opened. By knowing in which rich client application the Office APP is opened, you can for example match the APP design / colors to that of the rich client application.

At the moment there is no easy way to know in which rich client application your APP has been opened.

> **Note**: this has been written for the Office 1.1 JavaScript API.

The way I found to achieve it is to check the **CoercionType** which your APP can use. Luckily the rich clients do not use the same **CoercionType** (more information about the types can be found [here](http://msdn.microsoft.com/en-us/library/office/fp161141%28v=office.1501401%29.aspx)).

The following CoercionTypes exist:

*   Office.CoercionType.Html: Word
*   Office.CoercionType.Matrix: Excel and Word
*   Office.CoercionType.Ooxml: Word
*   Office.CoercionType.SlideRange: PowerPoint
*   Office.CoercionType.Table: Excel and Word
*   Office.CoercionType.Text: Excel, PowerPoint, Project, Word
Here are some screenshots of the CoercionType object from the various applications:

## Word

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh1.png" "CoercionType Object of Word" >}}

## Excel

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh2.png" "CoercionType Object of Excel" >}}

## PowerPoint

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh3.png" "CoercionType Object of PowerPoint" >}}

## Project

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh4.png" "CoercionType Object of Project" >}}

## The code

There are a couple of ways to achieve this, here is my approach:

```JavaScript
if (Office.CoercionType.Ooxml) {
  // Opened in Word
  $('#content-header').css('background-color', '#2B579A');
} else if (Office.CoercionType.SlideRange) {
  // Opened in PowerPoint
  $('#content-header').css('background-color', '#D24726');
} else if (Office.CoercionType.Matrix) {
  // Opened in Excel
  $('#content-header').css('background-color', '#217346');
} else if (Office.CoercionType.Text) {
  // Opened in Project
  $('#content-header').css('background-color', '#31752F');
}
```

The code checks which CoercionType is available to use, and sets the background color of the container (you could also do other things, like storing the application name in a variable).

*   **Ooxml** is only available in Word;
*   **SlideRange** is only available in PowerPoint;
*   **Matrix** is available in Excel and Word, but if the APP was opened in Word, the first statement was already true;
*   **Text** this is available in every rich client application, but the last one that remains is Project.

```JavaScript
// The initialize function must be run each time a new page is loaded
Office.initialize = function (reason) {
  $(document).ready(function () {
    app.initialize();

    $('#get-data-from-selection').click(getDataFromSelection);

    if (Office.CoercionType.Ooxml) {
      // Opened in Word
      $('#content-header').css('background-color', '#2B579A');
    } else if (Office.CoercionType.SlideRange) {
      // Opened in PowerPoint
      $('#content-header').css('background-color', '#D24726');
    } else if (Office.CoercionType.Matrix) {
      // Opened in Excel
      $('#content-header').css('background-color', '#217346');
    } else if (Office.CoercionType.Text) {
      // Opened in Project
      $('#content-header').css('background-color', '#31752F');
    }
  });
};
```

If you add this code inside your Office.initialize, you get the following outputs:

### APP opened in Word

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh5.png" "APP opened in Word" >}}

### APP opened in Excel

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh6.png" "APP opened in Excel" >}}

### APP opened in PowerPoint

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh7.png" "APP opened in PowerPoint" >}}

### APP opened in Project

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh8.png" "APP opened in Project" >}}