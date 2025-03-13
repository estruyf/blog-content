---
title: Parse application/x-www-form-urlencoded in Azure Function
slug: /Parse-application-www-form-urlencoded-form-data-azure-function/
author: Elio Struyf
type: post
date: 2020-08-22T07:13:43.185Z
draft: false
tags:
  - Azure
  - Azure Functions
  - Development
  - Webhook
categories: []
comments: true
---

For a Mailchimp webhook, I had to parse the `application/x-www-form-urlencoded` form data to JSON. Azure Functions does not automatically do this for you, so you have to provide your parser. I knew that I had already done this, so I went on a search journey through my code. 

To make it easier next time, I wanted to share the code snippet with the rest of you. As you will notice, there isn't a lot of code required.

```typescript
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { parse, ParsedQs } from 'qs';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.rawBody) {
    const parsedData: ParsedQs = parse(req.rawBody);

    context.res = {
      body: parsedData
    };
  }

  context.res = {
    body: 'No raw body data'
  };
};

export default httpTrigger;
```

This code snippet makes use of the [qs](https://www.npmjs.com/package/qs) (querystring) dependency. To install this dependency to your project, all you need to do is: `npm i qs -S -E`.