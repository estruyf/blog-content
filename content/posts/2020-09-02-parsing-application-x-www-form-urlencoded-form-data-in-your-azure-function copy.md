---
title: Parse multipart/form-data in Azure Function
slug: /parse-multipart-form-data-azure-function/
author: Elio Struyf
type: post
date: 2020-09-02T15:45:15.063Z
draft: false
tags:
  - Azure
  - Azure Functions
  - Development
categories: []
comments: true
---

While working on an internal Azure Static Web Site project, I needed to upload CSV files to an Azure Function to import data to Cosmos DB.

When uploading a file to your API, the `multipart/form-data` content-type is used. The body's format looks a bit "special" as it requires some parsing to get each file.

{{< highlight html "linenos=table,noclasses=false" >}}
-----WebKitFormBoundaryXvnFih9Jfw9ZdQNB
Content-Disposition: form-data; name': '"file"; filename="2020-9-2-localization.csv"
Content-Type: text/csv

id,name
test1,test1
test2,test2
------WebKitFormBoundaryXvnFih9Jfw9ZdQNB--
{{< / highlight >}}

Similar like the previous article about parsing `application/x-www-form-urlencoded` in Azure Function, this content type is something you have to parse yourself as well.

To make it easier, you will have to install the following dependency to your project: `npm i parse-multipart -S -E`. The code looks like this:


{{< highlight typescript "linenos=table,noclasses=false" >}}
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as multipart from 'parse-multipart';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const body = req.rawBody;
  // Retrieve the boundary id
  const boundary = multipart.getBoundary(req.headers["content-type"]);
  if (boundary) {
    const files: File[] = multipart.Parse(Buffer.from(body), boundary);

    if (files && files.length > 0) {
      // Do what you want to do with the file
    }

    context.res.status(200);
  } else {
    context.res.status(500).send("No file(s) found.");
  }
};
{{< / highlight >}}

I hope this helps you get started processing your uploaded files.
