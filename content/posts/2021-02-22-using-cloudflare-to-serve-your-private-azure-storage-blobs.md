---
title: "Using Cloudflare to serve your private Azure Storage Blobs"
slug: "/cloudflare-serve-private-azure-storage-blobs/"
author: "Elio Struyf"
type: "post"
date: "2021-02-22T17:57:54.883Z"
draft: false
tags:
  - "CDN"
  - "cloudflare"
  - "Azure"
categories: []
comments: true
preview: "/social/00905423-209f-418e-a135-f95756ff7b81.png"
---

Recently I wrote about how to use Cloudflare as a CDN for your Azure Storage Containers/Blobs. The process for setting up Cloudflare for Azure Storage is straightforward. 

{{< blockquote type="info" text="[Use Cloudflare CDN for your Azure Storage caching](https://www.eliostruyf.com/devhack-cloudflare-cdn-azure-storage-caching/)" >}}

Now to make this work, you need to configure the Azure Storage to be anonymously accessible. This setting is the default when creating a new storage account. When you go to the Azure Security Advisor, you might see a message saying: **Storage account public access should be disallowed**.

{{< blockquote type="important" text="Do not do these steps immediately in production!" >}}

You can disable it on the Storage Account under **Configuration** -> **Allow blob public access** -> set to **disabled**.

{{< caption-new "/uploads/2021/02/cloudflare1.png" "Disable public access"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABeSURBVCXBSwoCMRBF0VtFdYuEhp65APe/MQeZdGIgH5+I51gpRe9a+UhsWyCBmeHurLVIKRER+PSdV78xxuC6Cq01zIzeO7UWcs7MOYm0B8/HgeuOJNwdSfyd/EQEX6FNLaaN1FW1AAAAAElFTkSuQmCC" "186" >}}

Switching the public access to **disabled** will lead to the following:

{{< caption-new "/uploads/2021/02/cloudflare2.png" "Public access to your blob is not allowed"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABVSURBVB3BQQ6DMAxFwfdth7RU6v2vmUVgEbBRO6MxRvXeWdeiKCThZkRr/Ph1szKJ9/5hHQcyQ3dCbLz6hiT+vNEyCQFzThRBUdR5In1xNyICd0cSD2NqHSHNvE5sAAAAAElFTkSuQmCC" "744" >}}

Now Azure Storage prevents you from publically accessing your blobs/files. Changing this setting will also cause the Cloudflare CDN to start returning the same issues (if not available in the cache).

## Solutions: Shared Access Signature

To fetch the blobs/files, you will need to make use of a Shared Access Signature (SAS). These SAS allow you to restrict access to particular services and actions you want to allow (read, write, delete, ...) when using them.

{{< blockquote type="info" text="[Using Azure CDN with SAS](https://docs.microsoft.com/en-us/azure/cdn/cdn-sas-storage-support)" >}}

In this case, we need to access our files from Azure Storage, a SAS that is only allowed to use it for **Blob** service and only allow **Read** permission. 

You can create such a SAS key by going to your Azure Storage Account -> **Shared access signature** -> and configure it as follows.

{{< caption-new "/uploads/2021/02/cloudflare3.png" "Creating your SAS Token for the CDN"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACRSURBVG3BQU4EMQxE0W+7WiD6AHP/07Fi2YyUxJVRCyE2vBfX93OrkjEnwY+IYO+NJCKCzERrTeyi25znB6riP1IJMlljgDe9m8gkAtwmK7lp9UQUbjPG5JCgza1tqpObqg4ii+PN6EgiA0ncDv5k26y1+Px6cl2DjMA2trGNbbobBRvt5nHCexnbEMEvu7E3L76GVNOti7AsAAAAAElFTkSuQmCC" "1538" >}}

{{< blockquote type="important" text="Be sure to make a record/reminder of this expiration date. Once it reaches the end date, you need to pass a new SAS for your service." >}}

Click the **Generate** button and copy the `SAS Token` (query string params).

Once you have that SAS token, you can test it out by adapting it to your CDN or blob URL.

{{< caption-new "/uploads/2021/02/cloudflare4.png" "File contents retrieved when SAS Token is provided"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABNSURBVF3BQRaCMBBEwd8zyRi8/0UFd4G0D5ZWad8/rnpxs01EEBIWIJHXxTxP2tjefI+DiGCMwVqL7J2WySMb1YuQRFVxm3NiG9v8+wGxBRwkLhNtFAAAAABJRU5ErkJggg==" "737" >}}

## Configuring it on Cloudflare

On Cloudflare, there is not a quick way to adapt your SAS token to the URLs. You will have to use a worker who adds the query string parameters to each request (if not cached).

{{< blockquote type="info" text="Cloudflare workers allow you to run services that can modify the HTTP requests and responses." >}}

On Cloudflare, select your domain, go to **Workers**, and click **manage workers**. When you have not created one yet, you will need to create an endpoint. Once Cloudflare created the endpoint. You will be able to configure the worker script on the website directly.

{{< caption-new "/uploads/2021/02/cloudflare5.png" "Creating a worker on Cloudflare"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABUSURBVDXBQQqEMBBFwffb7mDAS3j/i81qQBkY1MSWLKzSb/tmzAsRzisTkkSAJAYnCuf5J7MQEQyt37TrorWOu/PZD9ys0O8DmSGJYTIjauW11pkHwKwcH1KlfXsAAAAASUVORK5CYII=" "1344" >}}

The code the worker needs to execute looks like this:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  return fetch(`${request.url}${SASTOKEN}`);
}
```

The code uses a `SASTOKEN` environment variable which you can configure on the worker its settings. The value for the variable is the full query string that you copied after generating the SAS token.

{{< caption-new "/uploads/2021/02/cloudflare6.png" "Adding an environment variable"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB9SURBVGXBMRLCIBBA0b8bApkxTprUuf/FbKWRjCDZVWrfk5yz/7BtG6qKmeHApMplzuNZyKUSXEAQXqUQ50iMM+7OMKlw7CvHvhLutxUzx9xZUmRQ/oXzPBERUkq01hjcwRFCmBARWjdCbY0lJXrvvGslxoiKMLTrwyCqfAF/Xjk2Glt3ywAAAABJRU5ErkJggg==" "1057" >}}

One more thing is needed, which is where you link the worker for your CDN requests. You can do this by going back to the domain settings. Click on **workers** again and click on **add route**. A dialog will pop up to define the paths on which you want to use this worker. In my case, I used `cdn.elio.dev/*`.

{{< caption-new "/uploads/2021/02/cloudflare7.png" "Adding your custom route"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAADBSURBVG3BQW7CQAxA0W+PHRKFVqJbdj1FT9z79BBZJ0REhSljtyy6Qbwn5/M5t23D3TkcDjwzTRPm7ozjSESwrisigqoSEYgI+/2e4/GIZSZmhpnzTGuBCFhEMM8zXdfh3lGKEhHciQiqyjAMGH/6YaAfRrQUei88o6UUMpLr94bEjVtrXGvlkaUUSj8iwKXBTpKdO4+s1StdNFBFRMkWXNoPmcldbYmpYKd55nZasdcXpHP+LcuJWiufXwsf72/8AjULU+qsmJQbAAAAAElFTkSuQmCC" "472" >}}

When you try to use the CDN URL directly to your file, you will get its contents.

{{< caption-new "/uploads/2021/02/cloudflare8.png" "Getting your file contents via Cloudflare without providing the SAS Token"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABWSURBVD3BMQ7CMBBE0e/ZNSmSPhL3vxJXoKS00CrxkDS818YYvjA9wfxJ4vb5itf7IKsKGmQmvXcyAlrDmNtzMfsKWrcNT3MeJ1WFAUmEglCgSPKx8ANWxCANIRBxlQAAAABJRU5ErkJggg==" "913" >}}

On the caching, nothing changed. Your browser will still serve it from its cache if present.

{{< caption-new "/uploads/2021/02/cloudflare9.png" "CDN files still get cached, nothing changes"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAtSURBVBXBwQ0AIAgDwNIJcCCN+08jPxqNGO+sj1mSQBLnbCgTRsK9IWLhq1t4ZloQjXY75bgAAAAASUVORK5CYII=" "807" >}}
