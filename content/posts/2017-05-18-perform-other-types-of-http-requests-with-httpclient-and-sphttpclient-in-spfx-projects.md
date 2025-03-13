---
title: Perform other types of HTTP requests with HttpClient and SPHttpClient in SPFx projects
author: Elio Struyf
type: post
date: 2017-05-18T06:24:21+00:00
slug: /perform-other-types-of-http-requests-with-httpclient-and-sphttpclient-in-spfx-projects/
dsq_thread_id:
  - 5827659325
categories:
  - Development
  - SharePoint
tags:
  - SharePoint Framework
  - SPFx
comments: true
---

If you already used the HttpClient and SPHttpClient in your SharePoint Framework projects, you might have noticed that you have two types of request methods options: GET and POST. These two types of requests are the most used ones, but what if you want to use other HTTP methods like PUT, PATCH, DELETE?

If you need to make calls with other HTTP methods, you can make use of the **fetch** which is available on both the HttpClient and SPHttpClient classes. The **fetch** method allows you to specify the HTTP method type per request yourself. Fetch is also used behind the scenes when you are using the GET and POST methods.

Here is an example of how you can make use of the **fetch** method and specifying the request method to perform:

```javascript
this.props.context.spHttpClient.fetch(restUrl, SPHttpClient.configurations.v1, {
  method: "PATCH",
  body: JSON.stringify({
    "Something": "Some content to patch"
  })
}).then((response: SPHttpClientResponse) => { 
  // Do your thing
});
```

Here is an example with the HttpClient, but you will notice that is not that different to use:

```javascript
this.props.context.httpClient.fetch(restUrl, HttpClient.configurations.v1, {
  method: "DELETE"
}).then((response: HttpClientResponse) => { 
  // Do your thing
});
```
