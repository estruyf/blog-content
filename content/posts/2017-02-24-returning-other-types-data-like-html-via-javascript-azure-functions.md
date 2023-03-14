---
title: Returning other types of data like HTML via JavaScript Azure Functions
author: Elio Struyf
type: post
date: 2017-02-24T14:45:32+00:00
slug: /returning-other-types-data-like-html-via-javascript-azure-functions/
dsq_thread_id:
  - 5580888302
categories:
  - Azure
  - Development
tags:
  - Azure
  - Functions
comments: true
---

A couple of weeks ago I wrote a simple Office add-in which just added a custom add-in command. An add-in command only requires that you specify an URL to a page / HTML file to make it work. As it would be overkill to create a website for just that one file, I thought about using an HTTPTrigger Azure Function to return me the necessary HTML for my command.

As it turned out it is quite easy to return the mime type of your choice with an Azure Function. In order to do this, you must specify the content-type header for the object you want to send back as the response. Like for example: HTML is `text/html`, XML is `text/xml`, text is `text/plain`.

Here is an example of an HTTPTrigger function which returns HTML:

{{< highlight javascript "linenos=table,noclasses=false" >}}
const fs = require('fs');
const path = require('path');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var res = {
        body: "",
        headers: {
            "Content-Type": "text/html"
        }
    };

    if (req.query.name '' (req.body && req.body.name)) {
        // Just return some HTML
        res.body = "<h1>Hello " + (req.query.name '' req.body.name) + "</h1>";

        context.done(null, res);
    } else {
        // Read an HTML file in the directory and return the contents
        fs.readFile(path.resolve(__dirname, 'index.html'), 'UTF-8', (err, htmlContent) => {
            res.body= htmlContent;
            context.done(null, res);
        });
    }
};
{{< / highlight >}}


> **Info**: Notice line 9 - 11 where I specified the content-type header.

{{< caption-legacy "uploads/2017/02/022417_1432_Returningot1.png" "Sample of the HMTL output" >}}