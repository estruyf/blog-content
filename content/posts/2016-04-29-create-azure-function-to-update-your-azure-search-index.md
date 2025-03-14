---
title: Create an Azure Function to update your Azure Search Index
author: Elio Struyf
type: post
date: 2016-04-29T19:14:48+00:00
slug: /create-azure-function-to-update-your-azure-search-index/
dsq_thread_id:
  - 4787648185
categories:
  - Azure
  - Development
  - Node.js
tags:
  - Azure
  - Functions
  - Node.js
comments: true
---

A couple of months ago I switch from the default WordPress search functionality to Azure search. In order to update my Azure search index, I created a web job which runs every hour and adds or updates the latest 25 posts. Each night the web job will do a full re-index of all the articles. The web job is a console application written in C#. With the new Azure Functions functionality which was announced at Build, this got me thinking about its capabilities and how you can compare it with web jobs.

In my opinion, Azure Functions are similar to web jobs, without the hassle to configure the jobs or schedules. The Azure Functions are much easier and everything about them can be done from within the Azure Portal itself.

> **Info**: more information about Azure Functions be found here - [https://functions.azure.com](https://functions.azure.com)

After some tests, I can say that for me the benefits of using Azure Functions instead of web jobs are:

*   The ease to get started
*   Configuration is a matter of clicks
*   Ability to update code from the Azure Portal
*   Run an Azure Function from a HTTP API endpoint
*   It supports Node.js and C#


## My test case

As I mentioned, my current web job runs every hour. That means once I publish a new blog article it can take up to a maximum of 60 minutes before the article appears in the index. So I thought that this would be a good test case for my first Azure Function to optimize this process.


## My first Azure Function

I choose to write the Azure Function with Node.js as this is very easy to create and update in the portal.

> **Info**: here is a link to the code of my Azure Function: [Azure Function code](https://github.com/estruyf/AzureFunction-Update-Latest-Article-SearchIndex).

When you are going to create your first function, you will notice that there are a number of templates available for you to choose from. This is great to get started. In my case, I choose to start with the **HttpTrigger - Node** template. This means that the function will run when it receives a HTTP request.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA1.jpg" "HttpTrigger - Node template"  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQI/8QAHxAAAQMDBQAAAAAAAAAAAAAAAQAEBQIh0QMRFTFj/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANFMoqPrIBYtAOraFGFWYmOB249nbwowiIP/2Q==" "780" "342" >}}

Once you clicked on the **HttpTrigger - Node** template, you will end up in the development view where you also receive the **function URL** which can be used to trigger the function to run.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA2.png" "Azure function developer view"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAXUlEQVR4nB3MgRGEIAwEQPqv7Jv4DoRxlJAjdwRHt4Attdbx8eEA3H3Cr+6//zh7FES01o5W69nMLEhJEZzMzF0g3deNYQFMxyL3yv3JzDLg3SwiliSKJOMNJGXmA+g4dByWTS4cAAAAAElFTkSuQmCC" "624" "278" >}}

Of course, I am not going to manually call the URL every time I publish a new article. For this, I make use of an IFTTT recipes which checks for new RSS items.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA3.png" "IFTTT recipe"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAaElEQVR4nAFdAKL/AP+tMP+cBv2qLv/AVZ5+VGBpfnRtc2VtelRYZH59hQD/w2n+tkv8vl//0YK4pIuNkqCYl5yNlJ6DhY6ioagA+P7/8Pn+8fj89vr7/v7+//7/+vv6+/r5//7+////DulAC57OKz8AAAAASUVORK5CYII=" "431" "139" >}}

The whole recipe looks like this:

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA4.png" "IFTTT recipe configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAABnWAAAZ1gEY0crtAAAA2ElEQVR4nGWOS07DMBRFvdgug0mkSGSWFWRCF9E1IDGHEZ2C6k8SO7Hf11Ub0VI4uoMnHd2rZ9Lp03mfc15zIeb6iAlTtNZa575c+PZh/CGEEGM0+/1L3/dt2z7/ouu6pmmGYTDLlZQiIhARIgIAIjKRiBgXpiWXAgjEJHpLQlBVM81pjsuyFkAiViQmFhadoYiqCeOYcxYRIuL/nzvnrbUAwFdUdRPbYawPcVlZK4nc3L3NkKtgrVx169+56LdZD1YOVl5HqSryuGGaY929191HfTr+Gb7oM2GCTtSuAuoLAAAAAElFTkSuQmCC" "470" "572" >}}

### What about the code, what does it do?

When you navigate to my GitHub project: [Azure Function Code](https://github.com/estruyf/AzureFunction-Update-Latest-Article-SearchIndex), you will see a couple of files. The **index.js** is the main file which contains all the logic.

The code itself in the index.js file does the following things:

*   Retrieve the last article via the Wordpress JSON API. For this, you have to enable the JSON API functionality in the Jetpack plugin. This allows you to make calls to _https://public-api.wordpress.com_. More information about the API endpoints can be found here: [Wordpress REST API Resources](https://developer.wordpress.com/docs/api/). There are also other plugins which enable API endpoints on the local site itself;
*   Once the latest article is retrieved, the object to index gets created. In my case, I make use of the following fields in my search index: postId, title, author, URL, content, date, excerpt, slug, tags, updated;

```javascript
// Article body
var articleBody = {
    "value": [
        {
            '@search.action': 'mergeOrUpload',
            postId: article.ID.toString(),
            title: article.title,
            author: article.author.name,
            url: article.URL,
            content: strippedContent,
            date: new Date(article.date),
            excerpt: article.excerpt,
            slug: article.slug,
            tags: tags,
            updated: new Date() // This field is used to know when it was last indexed
        }
    ]
};
```


*   The next step is to do a POST request to the Azure Search index endpoint to add the article to the index. This is the endpoint which is used for this: _https://<search-name>.search.windows.net/indexes/<index-name>/docs/index?api-version=2015-02-28_;
*   Once the request is done, a mail will be sent via SendGrid to notify if the Azure Function execution was successful or not.

### What is required for the code to run?

In order to be able to run the code, there are a number of app settings required:

*   **searchName**: name of your Azure search service;
*   **searchIndex**: name of the search index;
*   **searchKey**: the API Key that can be retrieved via the Azure Portal search service settings;
*   **wpSrvUrl**: this is the URL to the Wordpress API service: https://public-api.wordpress.com;
*   **wpSrcEndpoint**: the service endpoint, in my case this is: "/rest/v1.1/sites/www.eliostruyf.com/posts/?number=1&order_by=date&fields=ID,title,URL,content,date,excerpt,slug,author,status,tags";
*   **sendgridKey**: the Sendgrid API key that can be used to send emails;
*   **mailto**: the person to who you want to send the mail;
*   <div>**mailFrom**: mail from address.</div>

> **Important**: all the functions in the app use the same app settings, so best is to prefix them in order to know to which functions your settings belong.

These settings can be set in the **App settings** of the Azure Functions service.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA5.png" "App Settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAgklEQVR4nEXOUQ7DIAwDUO5SQlibphhDhXr/g02CTntfkSI7Ca01kiKiqp8p55x+Asla67Zt7g7AzGqtYwydQplExN1JllIAkMxTAFBKiTECeJ5njEGy9/5Pm1mM8TzP4zhE5Lqu1tq7XvdEBEDvPaUE4L7vt1xV17Tv+3rbzNx9pb+G8iReFSplcAAAAABJRU5ErkJggg==" "561" "376" >}}

You can find this app settings page by navigating as follows:

*   Azure Functions app -> Function app settings
{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA6.png" "Function app settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAPUlEQVR4nBXE0QrAIAgF0D6/IAfu6r7UQaaT0Xk4DRCIiCoA0afTPYjnxX3yIG6RGcd5R5qXea34bNXr9QPeES5FgySUwQAAAABJRU5ErkJggg==" "383" "61" >}}

*   Go to App Service Settings
{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA7.png" "App service settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAaElEQVR4nAFdAKL/AKzM6Haq2Im33om23oi23Yi23Yy434e13Xer2arK5wB5rNkhdsE+iMlEjctVls9Tlc9Jj8w+iMkid8F0qtgAoMXkY6DUa6TWbaXWfbDagrLcbqbWaqTWZKDUncPjnpo5vkFUa8gAAAAASUVORK5CYII=" "216" "70" >}}

*   Settings -> Application Settings
{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA8.png" "Application settings"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAV0lEQVR4nFXBUQqAIAwAUG9i4DZjgjadyvqw+98qCIJ6z80xrrVCCIhIRPjndNq0s9XKzAAQP5jZiUof3cxKKSklRAyvGKPLstd2iNScs6oSkfd+ewDADecmE9R/XabXAAAAAElFTkSuQmCC" "273" "111" >}}

## Making use of the code

If you want to make use of the code, the easiest way to do so goes as follows:

*   Download all the files from the GitHub repo: [Azure search function](https://github.com/estruyf/AzureFunction-Update-Latest-Article-SearchIndex);
*   Go to you Azure Portal: [https://portal.azure.com](https://portal.azure.com);
*   Navigate to your **Function App,** if you have created one. If you have not done this. The easiest way to start is by going to [https://functions.azure.com](https://functions.azure.com) and click on the **get started** button;
*   Create a new function based on the **HttpTrigger - Node** template;
*   Click on **Function app settings**;
*   Click on **Go to app service settings**;
*   Click on **tools;**

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA9.png" "Tools"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAgElEQVR4nB3JTQ6CQAwG0LkJte2034ThNxBdiBDixJi4Mdz/Lkbe9gURtsgxRncHkFIC4O58CsOAz8u68VbKc9225TTPMxH9m4XbNrvZva4Xd6oqUSUiAKoa+MLf4+iAMo7vaUqqj3Ulon3f+74PIpJzhtlVZFE11aZpRMTdzewH2BgZ7gsJbK0AAAAASUVORK5CYII=" "181" "86" >}}

*   Click on **Kudu**;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA10.png" "Kudu"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAmUlEQVR4nGXJQQ7CIBBAUQ5iUm1nhjKl4mAZkKJNjPH+RzJ24caft/smpdRaG4YB/wIAU1RLVhEhot+gPeec8dclatacJ+95N3lP1iKRYzb9Ui+31jTda221rqU8ag3T5BBnZvPm80tkG+31cNDj8avryul06/sN0awhPhd9qWZmAYiIEVEABCCNo/HnMIcgMbL3QITW/ljnPnTOJHpcoMe7AAAAAElFTkSuQmCC" "206" "140" >}}

*   Click **Go**;
*   Click on **Debug console** -> **CMD**;
*   Navigate to Site -> wwwroot -> function name;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA11.png" "Azure function file view"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAc0lEQVR4nFWKSw4CIRAFuca4AkJYsOAizhm4vnbCglGk+TS00bgYa/fqlcilxhgLItaGtTWaz5yxfAQRCUiv2x0QCxGN0YnG4zgAIKXUexd8Yq11nsz8d88vv5R5LhYhBO+9c85aK6VUSmmtjTHbdrnu+xumo3p7NxbZvAAAAABJRU5ErkJggg==" "624" "342" >}}

*   Drag and drop the files from the GitHub repo on to the existing files;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA12.png" "Drag and drop files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAXUlEQVR4nDXJVwoDIRAAUO9/zi1G1tlYpjgFAkLe70vMXOszJvaJE0ksBpL9pfzinbOquruZhRsAfErpWzqecZyniOjm7gBQdrfWUvnSdd1EGBFrLVXtvddamVlEfrvwclgu4cu2AAAAAElFTkSuQmCC" "624" "255" >}}

*   Run **npm install**;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA13.png" "Run npm install"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAYElEQVR4nE3JMQqAIBgG0E/EVRyNv1UnCcFBRHATBzeJuoD3P0NQBL71ofeec3bOaa23376TlPK8bqSUrLVKKQCMMbw45wBaawghEJEQ4ou1a60YY5RSYozHwntvjJlzPnGqD2WIzCR8AAAAAElFTkSuQmCC" "624" "244" >}}

*   Once this is done, you can start using the Azure Function. If you go back to Azure Function in the app, you can click on run to test out the function itself.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA14.png" "Do a test run"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAX0lEQVR4nHWLuw2AMBBDb/+WQZgBMQE9XUqihCqQ4+wgPkVQxJPlwtYT51wIoZRCEg3iY1y8X29SSrlCVcVgAB6VZKkgKQDq6T3u4O/+2GxQ46bcFdIYV4+zdUPup+MEHr3NQ4LBFskAAAAASUVORK5CYII=" "391" "283" >}}

## Result

Once the function executed, a notification will be sent to the mail address you configured in the app settings:

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA15.png" "Mail notification"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAYklEQVR4nFXLQQrDMAxEUd//JFn5LiXQbdMDJAtprIyMkULdUshb/mEKSTNrEwBVFZExRk6lLvX5WNMwmkbEt/6V7fU+9oPnmXHzmzM/vfdO0t1J3t4Z6e6qiklEAJgZAJIXm6uQyM2onw8AAAAASUVORK5CYII=" "407" "215" >}}

## Resources

Here are a couple of articles that can help you create your first Azure Function:

*   [Create your first Azure Function](https://azure.microsoft.com/en-us/documentation/articles/functions-create-first-azure-function/)
*   [Using Azure Functions with the Microsoft Graph and BING Translator API's](http://www.jeremythake.com/2016/04/using-azure-functions-with-the-microsoft-graph-and-bing-translator-apis)
*   [Azure Functions developer reference](https://azure.microsoft.com/en-us/documentation/articles/functions-reference/)

## What is next?

My next job will be to convert my Azure Search Indexer web job to an Azure Function.