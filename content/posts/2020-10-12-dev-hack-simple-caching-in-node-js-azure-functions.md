---
title: '#DevHack: Simple caching in Node.js Azure Functions'
slug: /devhack-simple-caching-node-js-azure-functions/
author: Elio Struyf
type: post
date: 2020-10-12T06:59:42.399Z
draft: false
tags:
  - Development
  - Devhack
  - Azure Functions
categories: []
comments: true
---

Azure Functions do not have an out-of-the-box caching mechanism. For caching, the recommended way would be to use a distributed cache like Azure Cache or Redis. These services each come with their price tag and might be too robust for the cache you want to create or need.

For Azure Function created with C#, you can use the good old [memory cache](https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory?view=aspnetcore-3.1). When your function is already warmed up, and processed data once, you can return results much quicker.

{{< blockquote type="Important" text="Memory cache is per instance, so when running on a consumption plan, and when it scales to multiple instances, the memory cache needs to rebuild itself. If you run on a massive scale, it's better to use a distributed caching system." >}}

## But what with Node.js?

The simplest option for Node.js JavaScript/TypeScript function is to use a library called [node-cache](https://www.npmjs.com/package/node-cache).

The library provides a simple caching module that allows you to `get`, `set`, and more. It works very similarly to what you can do with memory cache. 

**Example**:

```typescript
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as NodeCache from 'node-cache';

const fncCache = new NodeCache();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Check if there is a value in the cache
  const cachedName = fncCache.get("name");
  if (cachedName) {
      context.res = {
          // status: 200, /* Defaults to 200 */
          body: `Cached name: ${cachedName}`
      };
      return;
  }

  // Read the provided name
  const name = (req.query.name || (req.body && req.body.name));

  // Set value in the cache
  fncCache.set("name", name);

  context.res = {
    body: `Provided name: ${name}`
  };
};

export default httpTrigger;
```

The code snippet is just a simple example, but this can be very useful. For example, when you want to fetch data and pass this to the function caller. Instead of calling the API each time the function gets invoked, you can now return cached data. It also allows you to specify on a global level or local/key level what the expiration time is. This expiration time is handy to keep your data fresh, but still do not have too many calls.
