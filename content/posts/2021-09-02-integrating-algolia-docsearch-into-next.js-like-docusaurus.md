---
title: "Integrating Algolia DocSearch into Next.js like Docusaurus"
description: "Learn more about using Algolia's DocSearch documentation scrapper and component in your Next.js website."
slug: "/integrating-algolia-docsearch-next-js-docusaurus/"
author: "Elio Struyf"
type: "post"
date: "2021-09-02T14:08:16.180Z"
lastmod: "2021-09-02T14:08:16.180Z"
draft: false
tags:
  - "Algolia"
  - "Next.js"
  - "Search"
  - "Documentation"
categories: []
comments: true
keywords:
  - "search"
preview: "/social/3b217772-ffd2-481c-bd2d-1805a1e1ee55.png"
---

For the new [Front Matter](https://frontmatter.codes) website, I needed to integrate search capabilities. Instead of building my own search experience this time, as I did on this website. I wanted to give [Algolia](https://www.algolia.com/) a try. 

The first time that I noticed Algolia was on the  [Docusaurus](https://docusaurus.io/) website. Docusaurus uses the service to search through all the documentation and works pretty fast and efficiently.

{{< caption "/2021/09/docsearch1.png" "DocSearch on Docusaurus"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAADHSURBVH3BO07DQBRA0fs+ziQoGksUhDIboGYXLIJt0bIAWtaCRE+JFX9ij/0QrUk4R26Px9BxpOt6rrnZ73FTYXYlpYprdinh9fMTd48PNNOZdp64JH984cPrO58vb/xnk2tchpE612zUmMaR76ZhTebAZ3eGtmVSZRgGIhbWSim4lUK13SIRiCiqwlrXdzgBYoouQURwUYCKCGaGm5Fzxsz4Q8Ajgojg17IsiAARrHlVbSj9mSKKEKS0w3QiIjA37g8HTm3HD/9mUkbbbvn2AAAAAElFTkSuQmCC" "575" >}}

It happens to be that Algolia also provides a search implementation for documentation site via [DocSearch](https://docsearch.algolia.com/). They will crawl your content, and you need to implement the controls on your website.

{{< blockquote type="Important" text="They do this only for documentation, and the website needs to be publically available. Besides that, you need to apply, and this can take a while." >}}

While waiting to have the Front Matter site approved, I found that you can run the services yourself. 

{{< blockquote type="Info" text="[Run DocSearch by yourself](https://docsearch.algolia.com/docs/run-your-own)" >}}

In this article, I will explain what I did to make it all work.

## Prerequisites

Before you can start, you require the following:

- An account for Algolia: [https://www.algolia.com/](https://www.algolia.com/)
- Created your first application on Algolia and an index. You will perform these steps while signing up.
- The **application ID** and **search only API key**. You can find both when going to your Algolia dashboard, click on **platform**, and in the **API Keys** section, you will find both.

## Integrating DocSearch into Next.js

I accidentally stumbled upon the following [docsearch.js GitHub repository](https://github.com/algolia/docsearch). This project provides you the component like the one that Docusaurus uses. Luckily, there is also a React version available as an npm package but without any documentation available for you to consume. 

Installing the component can be done by running: `npm i @docsearch/react@alpha`.

Once installed, you can use it as follows in your code:

{{< highlight typescript "linenos=table,noclasses=false" >}}
import * as React from 'react';
import { DocSearch } from '@docsearch/react';

export const Searchbox: React.FunctionComponent<{}> = ({}: React.PropsWithChildren<{}>) => {

  return (
    <DocSearch 
      apiKey={process.env.NEXT_PUBLIC_AGOLIA_APIKEY || ""} 
      indexName={process.env.NEXT_PUBLIC_AGOLIA_INDEX || ""} 
      appId={process.env.NEXT_PUBLIC_AGOLIA_APPID || ""} 
      disableUserPersonalization={true} 
      />
  );
};
{{< / highlight >}}

{{< blockquote type="Important" text="As you can see, the variables will be used in the `DocSearch` component." >}}

Once integrated, you need to add one final thing, the CSS. Otherwise, the components from DocSearch would not be styled.

Go to your `_app.tsx` file, and add the following reference:

{{< highlight typescript "linenos=table,noclasses=false" >}}
import '@docsearch/css';
{{< / highlight >}}

In my case, the result looks as follow:

{{< caption "/2021/09/docsearch2.png" "DocSearch its search component integrated on Front Matter"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAnSURBVGNU1zb+//LlKwYY4OTkZGBkZGQAgT9/fjOwsrIxMDIyMQAAvKkHZ+ovV6AAAAAASUVORK5CYII=" "1267" >}}

## Running DocSearch crawler

The final step is to get your data crawled and push the records to Algolia. If you applied for DocSearch, you would have to wait until your site is added to their system. If you do not want to wait, I recommend checking out the following guide from Algolia: [running your own crawler](https://docsearch.algolia.com/docs/run-your-own).

{{< caption "/2021/09/docsearch3.png" "DocSearch search suggestions on Front Matter"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAADZSURBVHXBTU7DQAyA0c9jNyT9UVsVdlyBNfe/C0sCAjXTpDOOUYW6gMJ78vj0HA+bNa/9G8K3AEQgAkSEpIoVr7z0PYwj/0mSMN57Gk1AkIdMdee3RdNighARIIK7I9za73dYWTRY2xDjhKjxF1XDtBYWo0PAGZgjuBGB2WpJimAshW6zRhHyMFC9chWAuc+gilYn58yViHIlKWGRB9yUWWC1bLmICC6maaKUgteCze2SGkEMR85z8FMi2R0fn0ds23SUeiZtD8xzQUSZphPVna7ruD8cyKeRL9KWbiHJukjLAAAAAElFTkSuQmCC" "577" >}}

{{< blockquote type="Info" text="In my case, I run the crawler on my Synology NAS every hour." >}}
