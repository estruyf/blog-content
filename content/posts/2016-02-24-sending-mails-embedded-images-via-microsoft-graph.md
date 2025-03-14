---
title: Sending mails with embedded images via the Microsoft Graph
author: Elio Struyf
type: post
date: 2016-02-24T16:21:14+00:00
slug: /sending-mails-embedded-images-via-microsoft-graph/
dsq_thread_id:
  - 4607590099
categories:
  - Development
  - Microsoft Graph
  - Office 365
tags:
  - Mail
  - Microsoft Graph
  - Office 365
comments: true
---

The Microsoft Graph keeps getting better and better. Since it was released, a lot more endpoints and functionality has been added. In one of my applications I make use of the **sendMail** endpoint to send notification about progress updates. I wanted to improve the notification mail by embedding images into the mails. The information for this can be found in the documentation of the Microsoft Graph, but it involves going through a couple of pages and trying things out yourself as there is not a sample available.

> **Info**: these are some useful pages:
> - [sendmail endpoint](http://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/user_sendmail) 
> - [attachment resource type](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/attachment) 
> - [fileAttachment resource type](http://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/fileattachment)

In this article I walk you through the process how you can send mails via the Microsoft Graph API with embedded images.

## Mail message model

It all starts with the model of your mail message. All the properties that you can pass for a mail message can be found here: [http://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/user_sendmail](http://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/user_sendmail)

On the documentation page you see a JSON sample object with its properties. Of course you do not to include all these properties when you want to send a mail. Also the sample shows you how to send an attachment, but not how to embed an image. The answer for this can be found in the **fileAttachment resource type** documentation. Here are the essential properties you will need in your mail model:

```csharp
using Newtonsoft.Json;

namespace ES.SendMail.Models
{
    public class Mail
    {
        public Message message { get; set; }
        public bool saveToSentItems { get; set; }
    }

    public class Message
    {
        public string subject { get; set; }
        public Body body { get; set; }
        public Torecipient[] toRecipients { get; set; }
        public bool hasAttachments { get; set; }
        public Attachment[] attachments { get; set; }
    }

    public class Body
    {
        public string contentType { get; set; }
        public string content { get; set; }
    }

    public class Torecipient
    {
        public Emailaddress emailAddress { get; set; }
    }

    public class Emailaddress
    {
        public string name { get; set; }
        public string address { get; set; }
    }

    public class Attachment
    {
        [JsonProperty("@odata.type")]
        public string odatatype { get; set; }
        public string contentBytes { get; set; }
        public string contentId { get; set; }
        public string contentLocation { get; set; }
        public string contentType { get; set; }
        public string name { get; set; }
    }
}
```

The most important part about the mail model is the **Attachment** class. This contains all the required properties for successfully including images to the mail.

> **Important**: it is important to include the **@odata.type** for your attachment. If you do not include it, your request ends up in a bad request. If you want to embed an image, it has to be set to **#microsoft.graph.fileAttachment**.

## Creating the mail message with an embedded image

If you already developed an application in the past where you were required to embed images in mails. You will know you have to work with **Content-ID** or **CID** references in the HTML mark-up. Once these CID references are in place, you have to link the images as a resource and specify the CID per attachment. This is no different when working with the Microsoft Graph. As you can see in the model, you can also specify the **contentId** property to the attachment.

First of all, you create the mail mark-up like this:

```html
var mailMarkup = @"<h1>A mail with an embedded image <img src='cid:thumbsUp' alt='Thumbs up' /></h1>";
```

> **Note**: as the image source I specified **CID:thumbsUp**. You will have to specify this CID reference when you add the attachment to the mail message.

Here is a sample of how you can build the mail message with the model specified above and the embedded image:

```csharp
var mail = new Mail
{
    message = new Message
    {
        toRecipients = new[]
        {
            new Torecipient
            {
                emailAddress = new Emailaddress
                {
                    address = email,
                    name = email
                }
            }
        },
        body = new Body
        {
            content = mailMarkup,
            contentType = "HTML"
        },
        subject = "Mail with an embedded image",
        hasAttachments = true,
        attachments = new[]
        {
            new Attachment
            {
                odatatype = "#microsoft.graph.fileAttachment",
                contentBytes = contentBytes,
                contentType = contentType,
                contentId = "thumbsUp",
                name = "thumbs-up.png"
            }
        }
    },
    saveToSentItems = true
};
```

> **Important**: in attachment I specify contentBytes and contentType of the image. ContentBytes is the binary contents of the file, also known as Base64. ContentType is the image type like **image/png** or **image/jpeg**.

## Sending out the mail

Now you only need to send out the mail message. This can be done like this:

```csharp
// Send the mail
var client = new RestClient(Resourse);
var request = new RestRequest($"/v1.0/users/{email}/microsoft.graph.sendMail", Method.POST);
request.AddHeader("Authorization", "Bearer " + accessToken);
request.AddHeader("Accept", "application/json");
// Remove null objects from the serialized JSON object
var jsonBody = JsonConvert.SerializeObject(mail, Formatting.None, new JsonSerializerSettings
{
    NullValueHandling = NullValueHandling.Ignore
});
request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);
var response = client.Execute(request);
```

> **Note**: this code makes use of a NuGet package called **RestSharp** which makes it easier to do rest calls from C#. You are free to use whatever you want.

When you run this code, it would give you the following result:

{{< caption-new "/uploads/2016/02/022416_1612_Sendingmail1.png" "Mail message with an embedded image"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAX0lEQVR4nGWKOwqAMBAFc/+L2HkDD7LFYsxaScD9mKSLEoJBcKrhzXMsZnblnEWEmVU1pXS/uGWe9m3NpdRa+zSkZTvI5BTV7zpOrlvn7y3HGBHRe09EiAgAIQQAUNUHo3CPQ6WR3UMAAAAASUVORK5CYII=" "338" "165" >}}

## Sample application

I have created a sample application for this. You can find it on GitHub: [https://github.com/estruyf/Mail-Embed-Images-with-Microsoft-Graph](https://github.com/estruyf/Mail-Embed-Images-with-Microsoft-Graph)

If you want to try this application, you will first have to create an Azure AD application and fill in the **Client ID** and **Redirect URL** in the app.config file. You will also have to add your tenant ID. This can be the domain name (tenant.onmicrosoft.com) or the ID.