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

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA1.jpg" "HttpTrigger - Node template" >}}

Once you clicked on the **HttpTrigger - Node** template, you will end up in the development view where you also receive the **function URL** which can be used to trigger the function to run.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA2.png" "Azure function developer view" >}}

Of course, I am not going to manually call the URL every time I publish a new article. For this, I make use of an IFTTT recipes which checks for new RSS items.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA3.png" "IFTTT recipe" >}}

The whole recipe looks like this:

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA4.png" "IFTTT recipe configuration" >}}

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

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA5.png" "App Settings" >}}

You can find this app settings page by navigating as follows:

*   Azure Functions app -> Function app settings
{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA6.png" "Function app settings" >}}

*   Go to App Service Settings
{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA7.png" "App service settings" >}}

*   Settings -> Application Settings
{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA8.png" "Application settings" >}}

## Making use of the code

If you want to make use of the code, the easiest way to do so goes as follows:

*   Download all the files from the GitHub repo: [Azure search function](https://github.com/estruyf/AzureFunction-Update-Latest-Article-SearchIndex);
*   Go to you Azure Portal: [https://portal.azure.com](https://portal.azure.com);
*   Navigate to your **Function App,** if you have created one. If you have not done this. The easiest way to start is by going to [https://functions.azure.com](https://functions.azure.com) and click on the **get started** button;
*   Create a new function based on the **HttpTrigger - Node** template;
*   Click on **Function app settings**;
*   Click on **Go to app service settings**;
*   Click on **tools;**

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA9.png" "Tools" >}}

*   Click on **Kudu**;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA10.png" "Kudu" >}}

*   Click **Go**;
*   Click on **Debug console** -> **CMD**;
*   Navigate to Site -> wwwroot -> function name;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA11.png" "Azure function file view" >}}

*   Drag and drop the files from the GitHub repo on to the existing files;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA12.png" "Drag and drop files" >}}

*   Run **npm install**;

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA13.png" "Run npm install" >}}

*   Once this is done, you can start using the Azure Function. If you go back to Azure Function in the app, you can click on run to test out the function itself.

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA14.png" "Do a test run" >}}

## Result

Once the function executed, a notification will be sent to the mail address you configured in the app settings:

{{< caption-new "/uploads/2016/04/042916_1851_CreatinganA15.png" "Mail notification" >}}

## Resources

Here are a couple of articles that can help you create your first Azure Function:

*   [Create your first Azure Function](https://azure.microsoft.com/en-us/documentation/articles/functions-create-first-azure-function/)
*   [Using Azure Functions with the Microsoft Graph and BING Translator API's](http://www.jeremythake.com/2016/04/using-azure-functions-with-the-microsoft-graph-and-bing-translator-apis)
*   [Azure Functions developer reference](https://azure.microsoft.com/en-us/documentation/articles/functions-reference/)

## What is next?

My next job will be to convert my Azure Search Indexer web job to an Azure Function.