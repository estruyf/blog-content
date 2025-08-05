---
title: "Translating Documents with Azure AI Translator's sync API"
longTitle: "Translating documents with Azure AI Translator's synchronous API"
customField: ""
slug: "/translating-documents-azure-ai-translator-sync-api/"
description: "Discover how to leverage Azure AI Translator's Sync API for real-time document translation, simplifying your workflow and enhancing user experience."
date: "2025-08-05T07:18:52.670Z"
lastmod: "2025-08-05T07:18:53.268Z"
preview: "/social/b6d93362-3e07-4618-b770-175fad5a9ed8.png"
draft: false
comments: true
tags:
  - "AI"
  - "API"
  - "Azure"
  - "Document Translation"
  - "Translations"
type: "post"
fmContentType: "post"
---

The Azure AI Translator service offers two approaches for document translation: asynchronous batch processing and synchronous single-document translation. While the asynchronous approach is well-documented and widely used for large-scale operations, the synchronous API for single documents is a powerful yet underutilized feature that deserves more attention.

In this guide, I will talk a bit more on when to use the synchronous API and show you how you can implement it in your applications.

## What is synchronous document translation?

The synchronous document translation API allows you to translate a single document in real-time without requiring Azure Blob Storage. Unlike the asynchronous batch translation that processes multiple documents and requires storage containers, the synchronous API:

- **Processes one document at a time** - Perfect for on-demand translations
- **Returns results immediately** - No polling required
- **Requires no storage setup** - The translated document is returned directly in the HTTP response
- **Maintains document formatting** - Preserves the original layout and structure

## When to use synchronous vs asynchronous translation

### When To use synchronous translation when:

- You need **immediate results** for single documents
- Working with **smaller files** (under 10MB file size limits)
- Building **interactive applications** where users upload and receive translated documents instantly
- You want to **avoid Azure Storage complexity** and costs
- Processing **user-generated content** in real-time

### When to use asynchronous translation:

- Translating **multiple documents** simultaneously
- Working with **large files** or **batch operations**
- Building **background processing** systems
- You need to **translate entire document collections**

## How to use the synchronous API

In the [official documentation](https://learn.microsoft.com/en-us/azure/ai-services/translator/document-translation/quickstarts/rest-api#synchronously-translate-a-single-document-post), you can find the details about the query parameters and the request body structure, but not a lot of examples, that is why I thought it would be useful to provide a practical example of how to use the synchronous API in a web application.

```javascript
async function translateDocument(
  file,
  sourceLanguage,
  targetLanguage,
  subscriptionKey,
  endpoint
) {
  const url = new URL(`${endpoint}/translator/document:translate`);
  url.searchParams.append("targetLanguage", targetLanguage);
  if (sourceLanguage) {
    url.searchParams.append("sourceLanguage", sourceLanguage);
  }
  url.searchParams.append("api-version", "2024-05-01");

  const formData = new FormData();
  formData.append("document", file, file.name);

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Translation failed: ${response.status} ${errorText}`);
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

// Use a file input like: <input type="file" id="fileInput" accept=".docx,.pdf,.txt,.html,.htm,.rtf,.odt,.xlsx,.pptx">
const fileInput = document.getElementById("fileInput");
if (!fileInput.files.length) {
  console.error("No file selected");
  return;
}

const file = fileInput.files[0];
const translatedBlob = await translateDocument(
  file,
  "en",
  "es",
  "YOUR_SUBSCRIPTION_KEY",
  "https://your-resource.cognitiveservices.azure.com"
);

// Create download link
const link = document.createElement("a");
link.href = URL.createObjectURL(translatedBlob);
link.download = `translated-${file.name}`;
link.click();
```

This example demonstrates how to use the synchronous API to translate a document selected by the user. The function `translateDocument` takes the file, source and target languages, subscription key, and endpoint as parameters. It constructs the request URL, prepares the form data, and sends the POST request to the Azure Translator service.

The response is returned as a Blob, which can be used to create a download link for the translated document.

## Conclusion

The synchronous document translation API in Azure AI Translator is a powerful tool for real-time, single-document translations. It simplifies the translation process by eliminating the need for storage and allowing immediate results, making it ideal for interactive applications and user-generated content.