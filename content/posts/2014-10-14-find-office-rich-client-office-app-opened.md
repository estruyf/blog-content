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

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh1.png" "CoercionType Object of Word"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAvUlEQVR4nB3OWU7DMBQFUO9/CYgq7IBFIH4IhVJhlMomSkMqI4/x8O5r+oXEWcERP8YqNWmtY4zM3BoRIedsrSOCiCnp2ajTcJ4m7yxAzKi1BO+ZIUJav8bL4SjfDp9qPK+FckWI+WJsrhBrio97d/cUu2f3sN/u+23Xb13P3QvtXm8C1Kbf9DGM82JShc8UC1yqapzd2sSVYXx+P0qzLLftCmoMArVByuC9YMCELE/fzjow/8dRatVKl1L/AB9nvWdVe74uAAAAAElFTkSuQmCC" "281" "198" >}}

## Excel

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh2.png" "CoercionType Object of Excel"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAApUlEQVR4nCXJvRLBQBQG0H3/Ro28hFqjY8IMGYZI/CQZIyHJrrv33m9RKZz2mKbtd/tTnuXWOoSgqgCIqH22IcAwc3F7HNOsKitr7b+9p77rABginxb3TbJLkm1+OrOoKNyLmqYVBAPxk1U9mDbjWR3FYRh/RvE3ihEtdLT8Gqg8rZ+v0+Jasr5fXrzAkd8fss6SERFHnF0q13eAqgqgzFSVpQj/AO0+oeW8s1IuAAAAAElFTkSuQmCC" "281" "162" >}}

## PowerPoint

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh3.png" "CoercionType Object of PowerPoint"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmUlEQVR4nBXH0Q7BMBQA0P7/L3ggMv7Au7CEEBYLJi0yM8tmu11nvb3rTIjzdliSFUKEggsAiYZqrRENgPwXDZOlutyS095PH9GbdNfoj0WtQCvoLDKQchnEc09MV4HrhzwjntEhUsf4JZ4N03U12RW9WT5009GWHM86XjveYH9RDtbIiExRqrPg6T3sqP5a/W2RKoivHFX+A9yrhdqqFDpwAAAAAElFTkSuQmCC" "281" "143" >}}

## Project

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh4.png" "CoercionType Object of Project"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAl0lEQVR4nAXBZwrCMBgA0Nz/pwgV9RAeQSy0ClUEBx0aIrZ0mGZ/SRfqewi/q9s9w08slQJrDYABAGspbRnjSAjxypv4eiHPTEveWzM4GDsrW6oFQ4zzKC39UxKc010Ux4Ug1BHqkpylhUBGy82xnm352m9WoZkHvbcfFodxGYIXOGQBpFIPTFhdTB18e5ic/g1W0op/yj+6A4WTU3pnjAAAAABJRU5ErkJggg==" "260" "119" >}}

## The code

There are a couple of ways to achieve this, here is my approach:

```javascript
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

```javascript
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

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh5.png" "APP opened in Word"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgklEQVR4nGN4/+nbh88/3rz/+v7Tt/efvv/+8/c/FPz7/v07Q+30/dE1GxIbNyc0bkpq2pzcvCWlZUta69bYuo19S08wuOcsUw2arhEyE0IqBUwVcemTcJ/AZdMVUr6GYerqM/WzDjXPPdI053DjnMONsw/XzzrUMPtQ5dT9C7dcBABVN0tPrBz2mgAAAABJRU5ErkJggg==" "335" "129" >}}

### APP opened in Excel

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh6.png" "APP opened in Excel"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhElEQVR4nGP48v3r5+9fP377/PHbl4/fPv/+++c/DPz88ZOhe+u8qGmlKXNqk2ZXJ8+pTZvXkDG/MWtBU8Ks6ql7ljMETswTz7WTK3KRynOQKXASybbmSDbkSTNliNEImVzAMH3vioKlHeUr+0qW95Su6ClZ3lO0rKtkeXf2wpY5B9YCAKT/RlAHdt6LAAAAAElFTkSuQmCC" "339" "130" >}}

### APP opened in PowerPoint

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh7.png" "APP opened in PowerPoint"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhElEQVR4nGP4/fnTn69ffn/68PvLpz9fPv/78/s/DPz49Yvh8dSmu5VJ9+sz79Vl3K/PvN+Yfb8p+0Fz3v269KdzexiuxTtfdFK45Kp80UnhgrPiJTfVS26q5yzFT2syX09wYXgyreVBfcbD5twHTTkPmnIeNuc8aM550JR9vyrp6exOAFRQTjWTc6C9AAAAAElFTkSuQmCC" "332" "132" >}}

### APP opened in Project

{{< caption-new "/uploads/2014/10/101414_1319_Findoutinwh8.png" "APP opened in Project"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAg0lEQVR4nGP4/P3z159fP379+Pn7ly/fv/z5++c/DPz+9Zuha0NH9pyswgUFBfPzixYUFC8sKltcWr6kLH9+3oyd0xl82ry0izT1inW0CzX1irV1i7Rl0qVk06UF4vlCe4MZejZ1Fy0sLFtSWrK4uGxxSfmS0qKFhcWLirLnZk3dMRUAiXREyFkCa44AAAAASUVORK5CYII=" "334" "130" >}}