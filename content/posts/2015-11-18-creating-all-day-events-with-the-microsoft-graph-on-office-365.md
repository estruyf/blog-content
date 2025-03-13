---
title: Creating all day events with the Microsoft Graph on Office 365
author: Elio Struyf
type: post
date: 2015-11-18T19:29:09+00:00
slug: /creating-all-day-events-with-the-microsoft-graph-on-office-365/
dsq_thread_id:
  - 4330787054
categories:
  - Microsoft Graph
  - Office 365
tags:
  - Microsoft Graph
  - Office 365
  - Office 365 Dev
  - Unified API
comments: true
---

Over the last couple of months I developed a calendar application that synchronized events from an external system to a user's calendar in Office 365. For the event creation process I made use of the Microsoft Graph previous known as the Unified API which was still in beta at that time. During the beta of the Microsoft Graph API things have changed a couple of times. That meant that I had to update my application once they introduced breaking changes or new improvements and there were a couple of breaking changes introduced during this beta period. Today Microsoft announced the general availability of the Microsoft Graph. With the launch of this first official version of the Microsoft Graph API we can expect that the API will not involve breaking changes when updates happen.

The Microsoft Graph has now a versioned v1.0 endpoint and there were again a couple of new API changes. The biggest change for the event creation process is that the start and end properties should now include the DateTime and TimeZone of the event. Durign the beta period you only had to pas the DateTime.

> **Note**: here are some references to the latest Unified API changes:
> 
> *   [Introducing the Microsoft Graph](https://blogs.office.com/2015/11/18/day-at-connect-introducing-the-microsoft-graph/ "Introducing the Microsoft Graph")
> *   [Office 365 Unified API Update 4](http://dev.office.com/blogs/Update-4-on-Office-365-unified-API "Office 365 ified API Update 4")
> *   [Outlook REST API changes to beta endpoint](http://blogs.msdn.com/b/exchangedev/archive/2015/10/14/tlook-rest-api-changes-to-beta-endpoint-part-ii.aspx "Outlook REST API changes to beta endpoint")
> *   [Connect() 2015 Office Extensibility News](http://dev.office.com/blogs/Connect-2015-Office-Extensibility-News onnect() 2015 Office Extensibility News")
> *   [Microsoft Graph API Documentation](https://graph.microsoft.io/ "Microsoft Graph API Documentation")

Of course with these API property changes I had to update the application once again to change all the beta endpoints to the new v1.0 endpoint and also the events creation process itself. While updating the event process code, I experienced some problems creating all day events. This article explains where you need to pay attention to in order to correctly create an all day event.

> **Note**: the same code can be used to create regular events.

## Event creation problems

The creation process of these events is not that hard at all. You only have to call the right endpoint and pass your event values.

The problem I struggled with was creating the event with the right time zone in order that it was displayed correctly in Outlook. The application itself was built with MVC and the creation of the events was done via C#. I used a library called RestSharp ([http://restsharp.org/](http://restsharp.org/ "RestSharp")) that makes using REST and HTTP API calls in .NET easier.

My model before the change looked like this:

```csharp
public class EventModel
{
    public string Id { get; set; }
    public string Subject { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public string ShowAs { get; set; }
    public bool IsAllDay { get; set; }
    public EventBody Body { get; set; }
    public bool IsReminderOn { get; set; }
}
```

I had to change the start and end properties in order to include the time zone.

```csharp
public class EventModel
{
    public string Id { get; set; }
    public string Subject { get; set; }
    public DateTimeTimeZone Start { get; set; }
    public DateTimeTimeZone End { get; set; }
    public string ShowAs { get; set; }
    public bool IsAllDay { get; set; }
    public EventBody Body { get; set; }
    public bool IsReminderOn { get; set; }
}

public class DateTimeTimeZone
{
    public DateTime DateTime { get; set; }
    public string TimeZone { get; set; }
}
```

Once I made this change to my event model, I start experiencing two problems:

1.  I got an event creation error: the start and end times for an all-day event need to be set to midnight;
2.  When the event eventually got created, it was not created with the right time zone. The event was spread over two days in Outlook.

### The start and end times for an all-day event need to be set to midnight

As the first problem itself describes, you have to set the start and end properties of the event to midnight. So first of all you need to be sure that the DateTime object is correctly set:

{{< caption-new "/uploads/2015/11/image_thumb.png" "DateTime object" >}}

Now this was not enough, I kept receiving the error. When I checked my serialized JSON object, I saw that it had taken the time zone into account, although it was not specified on the DateTime object.

{{< caption-new "/uploads/2015/11/image_thumb1.png" "Serialized DateTime object" >}}

What I noticed was that RestSharp always serialized the DateTime object to UTC format (indicated by the "Z" suffix) and took the current time zone into account. To solve this I switched to make use of the [Newton serializer](https://www.nuget.org/packages/newtonsoft.json/).  By making use of the Newton serializer the DateTime objects were serialized correctly:

{{< caption-new "/uploads/2015/11/image_thumb2.png" "Correct serialized DateTime object" >}}

So be aware that your start and end properties contain the right values the API expects.

### All day events that spread over two days

This had to do with the time zone in which the event gets created. You need to be sure that you are using the same time zone your user's calendar is set. At the moment there is no API available to get the time zone information.

## The code

Here is the code I used to create the all day events:

```csharp
var localZone = TimeZone.CurrentTimeZone;
var timezone = localZone.StandardName;
var newEvent = new EventModel
{
    Subject = agendaItem.Title,
    Start = new DateTimeTimeZone { DateTime = eventDate, TimeZone = timezone },
    End = new DateTimeTimeZone { DateTime = eventDate.AddDays(1), TimeZone = timezone },
    ShowAs = "Free",
    IsAllDay = true,
    Body = new EventBody { ContentType = "Text", Content = "estruyf" },
    IsReminderOn = false
};
var result = CreateAppointment(accessToken, newEvent);
```

This is what the create function does:

```csharp
public static bool CreateAppointment(string accessToken, EventModel appointment)
{
    var client = new RestClient("https://graph.microsoft.com/v1.0/");
    var request = new RestRequest("me/events", Method.POST);
    request.AddHeader("Authorization", "Bearer " + accessToken);    
    var jsonBody = JsonConvert.SerializeObject(appointment);
    request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);
    var response = client.Execute(request);
    return response.StatusCode == HttpStatusCode.Created;
}
```

The JSON object looks like this:

```json
{  
   "Id":null,
   "Subject":"My event",
   "Start":{  
      "DateTime":"2015-11-16T00:00:00",
      "TimeZone":"W. Europe Standard Time"
   },
   "End":{  
      "DateTime":"2015-11-17T00:00:00",
      "TimeZone":"W. Europe Standard Time"
   },
   "ShowAs":"Free",
   "IsAllDay":true,
   "Body":{  
      "ContentType":"Text",
      "Content":"estruyf"
   },
   "IsReminderOn":false
}
```

The same can be done when you are creating these events via JavaScript:

```csharp
var req = new XMLHttpRequest();
req.open("POST", "https://graph.microsoft.com/v1.0/me/events");
req.setRequestHeader("authorization", "Bearer " + accessToken);
req.setRequestHeader("content-type", "application/json");
req.onload = function (e) {
    if (req.readyState === 4) {
        // Check if the get was successful
        if (req.status === 201) {
            console.log(req.response);
        }
    }
};
req.onerror = function (e) {
    // Catching errors
};
req.send(jsonData);
```