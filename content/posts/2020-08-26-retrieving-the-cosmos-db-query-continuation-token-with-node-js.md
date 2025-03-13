---
title: Retrieving the CosmosDB query continuation token in Node.js
slug: /retrieving-the-cosmos-db-query-continuation-token-with-node-js/
author: Elio Struyf
type: post
date: 2020-08-26T11:51:01.969Z
draft: false
tags:
  - Node.js
  - Development
  - CosmosDB
categories: []
comments: true
---

For one of our internal tools at Valo, I am creating a portal for managing our project localizations. The portal itself will be produced as a static website and hosted on Azure Static Web App. The great thing about Azure Static Web Apps is that it comes with hosting and the ability to create Azure Functions.

The portal uses the Azure Functions for managing the localization data. Initially, I started to create the project with Azure Table Storage, but I quickly stumbled upon a couple of limitations (speed, query, paging). When I was rethinking the architecture, I first wanted to do a combination of Azure Search and the table storage. The biggest issue is that the localization schema continuously changes. Search schemas can be adapted, but you will have to recreate the index, which is not optimal in most cases.

> **Info**: Read more about [updating Azure Search index](https://docs.microsoft.com/en-us/rest/api/searchservice/update-index).

Another approach would be to move to Azure Cosmos DB, but that comes with a price tag. You have the [free tier](https://azure.microsoft.com/en-us/updates/azure-cosmos-db-free-tier-is-now-available/), but this gives you only a discount. If you use more, you will start paying for your usage.

At build earlier this year, they announced that there would also be a Serverless tier released in preview in the summer. The good news is that this tier is now available and fits the needs I have for my app.

That said, I started developing. First, I pushed over my content from Azure Table Storage to Cosmos DB. All good, so I started creating my Azure Functions to retrieve my data. We talked about +2000 keys, so I had to implement some paging and stumbled upon another issue. Cosmos DB, its continuation tokens were only supported for .NET and the Java SDK.

> **Info**: I use Node.js (TypeScript) straightforward, I like to work with TypeScript/JavaScript, and Azure Static Web Apps only supports TS/JS functions in the preview.

## Continuation tokens in Node.js

When you follow the Node.js documentation, they show the following code snippet to retrieve all items:

```typescript
const querySpec = { query: "SELECT * from c" }; 
const { resources: items } = await container.items.query(querySpec).fetchAll();
```

Instead of using `fetchAll()`, you also got `fetchNext()`. This method retrieves the next batch from the feed. As an option, you can provide the `continuationToken`. Problem is that this token is always `null`. If you check the response headers, you only get the following:

```typescript
const querySpec = { query: "SELECT * from c" }; 
const resources = await container.items.query(querySpec).fetchNext();
```

{{< caption-new "/uploads/2020/08/cosmos1.png" "Headers from Cosmos DB query"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABASURBVBXBQQoAIQwEwc4QkMH/v9ODBxE0LlsVY4w356S1hm3OOdhm701VUVX03smI4LfW4t7Lew9JSMI2kshMPpwgG//ptG3GAAAAAElFTkSuQmCC" "356" >}}

When I fiddled around with the query options, I noticed that if you provide the `PartitionKey` to the query options, you get many more headers back.

{{< caption-new "/uploads/2020/08/cosmos2.png" "Returned continuation token"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAklEQVR4AewaftIAAADbSURBVF3BQU7DMBCG0e8fT2I7KT4B4v7nAjZdt8JCjjPQXdX3dL1eQxK1Vo7jQBL7vuPuPDNJ9N653+9EBJKYc/LK+TfGoPeOJLZtI+eMmZFzZt93JOHx/cn4/iKlhLvze55YrTxMd36ArRRc7x/Y/gYSI4LWGqUU3J2IYFkWIgI3M8yMlBK1VtydWivujiQigpQSPudkjMFxHEQErTUigjknEYEkzAyPCB7mnKzryu12o/fOuq5I4jxPJOFmhruzLAs5Z1prtNZ45WbG5XIhpUQpBTPjPE/MjGd/+3pYoRlTUUYAAAAASUVORK5CYII=" "583" >}}

You will also find the `x-ms-continuation` header with the `continuationToken` value in the headers.

Here is how you can use it in your code:

```typescript
const results = await container.items.query(querySpec, {
  maxItemCount: 20,
  partitionKey: "category",
  continuationToken
}).fetchNext();

return {
  items: results.resources,
  nextPageToken: results.continuationToken
};
```
