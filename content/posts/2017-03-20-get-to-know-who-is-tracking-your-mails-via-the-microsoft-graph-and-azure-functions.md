---
title: Get to know who is tracking your mails via the Microsoft Graph and Azure Functions
author: Elio Struyf
type: post
date: 2017-03-20T11:43:22+00:00
slug: /get-to-know-who-is-tracking-your-mails-via-the-microsoft-graph-and-azure-functions/
dsq_thread_id:
  - 5648619104
categories:
  - Development
  - Office 365
tags:
  - Azure
  - Functions
  - Microsoft Graph
comments: true
---

We all get a lot of emails every day. Did you know that some of these emails are being tracked by others? There are various kinds of email trackers available, most of them work by inserting hidden images and/or changing the links in the mail by a tracking prefix. This allows them to see when and how many times you opened your email and which of the links you clicked from the mail.

Of course, this is useful information if you are sending out mail campaigns or to know if a person read your email. I do not mind that people are doing this, but I want to have a bit more control of which emails are tracked and which not.

When webhooks in the Microsoft Graph was announced last year, this was the opportunity to automate this process. I choose to give the emails which are tracked a tracking category and the name of the used tracker. This does not change anything to the mail itself, but still, gives you a highlight of the tracked emails.

{{< caption-new "/uploads/2017/03/031717_1442_Gettoknowwh1.png" "Example of tracking categories" >}}

Last week I have made this solution available on GitHub: [mail tracking via Microsoft Graph](https://github.com/estruyf/Mail-Tracking-Microsoft-Graph). So feel free to explore and test it out.

## How it works

The solution I created is based upon an Azure Function in combination with the Microsoft Graph.

> **Info**: You can find the configuration for this function is on GitHub repository.

<span style="color: black;">In the project, you find a [tracker.json](https://github.com/estruyf/Mail-Tracking-Microsoft-Graph/blob/master/trackers.json) file which contains all known trackers (which I could find, if you have more, feel free to share them) and their URL pattern to check.
</span>

<span style="color: black;">Here you see an example of Mailchimp:</span>

```json
{
  "name": "MailChimp",
  "url": "/track/open.php?u="
}
```

When you configured the Azure Function and created a new webhook subscription. The function will be called every time you receive a new mail. Once the function gets alerted, it retrieves the mail body and checks it for the known trackers from the list. If it found one of the URL patterns in the body, it will update the mail categories. It does not override the categories which may already be applied on your mail, these could be coming from a mail rule.

Here is an example how it works:

{{< caption-new "/uploads/2017/03/tracking-category-ex.gif" "Example how it changes the category" >}}


When you open the mail, you will see the following categories:

{{< caption-new "/uploads/2017/03/031717_1442_Gettoknowwh3.png" "Tracking categories after webhook call" >}}

Feel free to test out the code and provide feedback if you like it.