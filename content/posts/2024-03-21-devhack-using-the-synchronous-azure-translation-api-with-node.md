---
title: "#DevHack: use the synchronous Azure translation API in Node"
longTitle: "#DevHack: Using the synchronous Azure translation API in Node.js"
customField: ""
slug: "/devhack-synchronous-azure-translation-api-node/"
description: "Learn how to use the new synchronous Azure AI Translator service in Node.js without setting up a storage account. Get started with this quick tutorial."
date: "2024-03-21T16:59:07.718Z"
lastmod: "2024-03-21T16:59:07.718Z"
preview: "/social/6977792a-0460-4994-b681-66060ee85b8b.png"
draft: false
comments: true
tags:
  - "API"
  - "Azure"
  - "Devhack"
type: "post"
---

The Azure AI Translator service has a new synchronous API in preview. The nice thing about this API is that it does not require any Azure Storage account to be set up to which you typically need to upload the files to be translated. Instead, you can just send the document to be translated directly to the API and you will get the translated document back.

{{< blockquote type="info" text="You can read more information about the synchronous API on the [Get started with synchronous translation](https://learn.microsoft.com/en-us/azure/ai-services/translator/document-translation/quickstarts/synchronous-rest-api) article." >}}

In this post, I will show you how to use the synchronous Azure translation API in Node.js.

## Calling the synchronous Azure translation API

To call the synchronous Azure translation API, you need to send a POST request to the `https://{your-instance}.cognitiveservices.azure.com/translator/document:translate` endpoint with form data containing the document to be translated.

Here is an example of how you can call the synchronous Azure translation API in Node.js:

```javascript {title="Example of calling the synchronous Azure translation API"}
import { readFile } from 'node:fs/promises';
import { blob } from 'node:stream/consumers';

const sourceLanguage = "en";
const targetLanguage = "nl";

const api = "https://{your-instance}.cognitiveservices.azure.com/translator/document:translate?sourceLanguage={sourceLanguage}&targetLanguage={targetLanguage}&api-version=2023-11-01-preview";

const response = await fetch(api, {
  method: 'POST',
  headers: {
    'Ocp-Apim-Subscription-Key': '{your-subscription-key}',
  },
  body: formData
});

if (!response.ok) {
  console.log(`Error: ${response.status} ${response.statusText}`);
  console.log(await response.text());
} else {
  const data = await response.text();
  console.log(data);
}
```

That's it! You have now successfully called the synchronous Azure translation API in Node.js.
