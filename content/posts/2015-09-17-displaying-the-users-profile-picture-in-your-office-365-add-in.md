---
title: Displaying the user’s profile picture in your Office 365 add-in
author: Elio Struyf
type: post
date: 2015-09-17T10:12:01+00:00
slug: /displaying-the-users-profile-picture-in-your-office-365-add-in/
dsq_thread_id:
  - 4137853800
categories:
  - Development
  - JavaScript
  - Office 365
tags:
  - Graph
  - JavaScript
  - Office 365
  - Unified API
comments: true
---

For one of our internal Office 365 add-ins I wanted to display the user's profile picture via the Office 365 Unified APIs.

> **Note**: At the moment there is not much documentation about the Unified API and retrieving the user's profile picture. You could fall back on the documentation about the [Outlook User Photo REST API](https://msdn.microsoft.com/en-us/office/office365/api/photo-rest-operations).

In my Office 365 add-in I am displaying the image via JavaScript and the authentication process is done via ADAL.js.

## Unified API permissions

To be able to retrieve the user's profile picture, you first need to add the **Sign in and read user profile (Office 365 unified API)** permission to your application in Azure Active Directory.

{{< caption-new "/uploads/2015/09/091715_1011_Displayingt1.png" "Unified API permissions" >}}

Once this permission is given, you will be able to make your calls.

## Unified API call

If you already used the Outlook User Photo REST API you will see that the Unified API call can be done in the same way.

### Get photo metadata

If you want to know which user profile picture dimensions are available, you could make use of one of the following endpoints:

**Largest available photo**

The largest available user picture can be retrieved by calling the following REST endpoint: [https://graph.microsoft.com/beta/me/Photo](https://graph.microsoft.com/beta/me/UserPhoto)

{{< caption-new "/uploads/2015/09/091715_1011_Displayingt2.png" "API output" >}}

**All available photos**

If you want to know all the dimensions that are available. You could call the following endpoint: [https://graph.microsoft.com/beta/me/Photos](https://graph.microsoft.com/beta/me/UserPhotos)

{{< caption-new "/uploads/2015/09/091715_1011_Displayingt3.png" "API output all photos" >}}

Here is an example how you could call the REST API via JavaScript:

```javascript
var authContext = new AuthenticationContext(config);
authContext.acquireToken("https://graph.microsoft.com", function (error, token) {
    var request = new XMLHttpRequest;
    request.open("GET", "https://graph.microsoft.com/beta/me/Photo");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
            var jsonData = JSON.parse(request.response);
            console.log(jsonData.Id);
        }
    };
    request.send(null);
});
```


### Retrieve the image (blob) and display it with JavaScript

Once you know which user profile pictures are available, you could retrieve the image via the Unified API.

**Get the largest photo**

To retrieve the largest user photo, you need to use the following endpoint: [https://graph.microsoft.com/beta/me/Photo/$value](https://graph.microsoft.com/beta/me/UserPhoto/$value)

> **Note**: notice the **$value** at the end of the URL, this will make sure you retrieve the image blob instead of the metadata.

**Get a specific photo dimension**

You are also able to retrieve a photo with a specific dimension. For that you need to use the **Id** from the photo metadata and append it to your endpoint like this: [https://graph.microsoft.com/beta/me/Photos/48X48/$value](https://graph.microsoft.com/beta/me/UserPhotos/48X48/$value)

**Displaying the image blob**

Once you know the REST endpoint to use, you need to add a **responseType** to your XMLHttpRequest in order to retrieve an image blob. Here is my example code:


```javascript
var authContext = new AuthenticationContext(config);
authContext.acquireToken("https://graph.microsoft.com", function (error, token) {
    var request = new XMLHttpRequest;
    request.open("GET", "https://graph.microsoft.com/beta/me/Photos/48X48/$value");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = "blob";
    request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
            var imageElm = document.createElement("img");
            var reader = new FileReader();
            reader.onload = function () {
                // Add the base64 image to the src attribute
                imageElm.src = reader.result;
                // Display the user's profile picture
                document.getElementsByClassName('user-picture-box')[0].appendChild(imageElm);
            }
            reader.readAsDataURL(request.response);
        }
    };
    request.send(null);
});
```

In order to read the image blob, the **FileReader** ([more info about FileReader](http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api)) interface is required. This will be used to convert the blob to a data URL:

{{< caption-new "/uploads/2015/09/091715_1011_Displayingt4.png" "base64 image" >}}

You can also use **URL.createObjectURL**, this method creates a DOMString containing an URL representing the object given in parameter.
> **Note**: More information about this createObjectURL method can be found here: [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL).
The code for using this approach looks like this:

```javascript
var authContext = new AuthenticationContext(config);
authContext.acquireToken("https://graph.microsoft.com", function (error, token) {
    var request = new XMLHttpRequest;
    request.open("GET", "https://graph.microsoft.com/beta/me/Photos/48X48/$value");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = "blob";
    request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
            var imageElm = document.createElement("img");
            var url = window.URL '' window.webkitURL;
            var blobUrl = url.createObjectURL(request.response);
            imageElm.src = blobUrl;
            document.getElementsByClassName('user-picture-box')[0].appendChild(imageElm);
        }
    };
    request.send(null);
});
```

Your element now contains a link to the object in your DOM.

{{< caption-new "/uploads/2015/09/createObjectURL.png" "URL.createObjectURL approach" >}}

The final output of the two code snippets is the user's profile image:

{{< caption-new "/uploads/2015/09/091715_1011_Displayingt5.png" "Profile picture (48x48)" >}}

## Updates

### 18/09/2015

Updated the post to show the URL.createObjectURL approach. This approach is also explained in an article from [Waldek Mastykarz](http://blog.mastykarz.nl/office-365-groups-api/).

### 3/10/2015

Updated the post with the UserPhoto endpoint that got changed to Photo. More information about this can be found here: [Update 3 on Office 365 Unified API](http://dev.office.com/blogs/Update-3-on-Office-365-unified-API).