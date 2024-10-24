---
title: Leveraging Astro for React App Performance Boost
longTitle: ""
customField: ""
slug: /leveraging-astro-react-app-performance-boost/
description: "Boost React app performance using Astro: Learn how to split datasets, leverage Astro's routing mechanism, and optimize page sizes for faster performance."
date: 2023-07-13T09:23:46.654Z
lastmod: 2023-07-13T09:23:46.654Z
preview: /social/b9390ec4-e893-4633-b28e-3712471b69e5.png
draft: false
comments: true
tags:
  - Astro
  - Optimization
  - Performance
  - React
type: post
---

Earlier this week, I was working on optimizing an internal analysis website that uses many JSON files for its content collections. During the local development and with smaller datasets, the website was super fast, but when I received a larger dataset, I noticed that the website got very slow.

The slowness mainly came from the amount of data and the processing in React. The HTML page sizes quickly grew over **5 MB**. The reason was that I retrieved the whole collection in the Astro component and passed it to the React component.

For the website I was working with Astro for building the pages, but still heavily relied on React for the data processing, searching, filtering, and more. The code for the *simplified* component looked like this:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"typescript"},{"name":"selection","value":"---\nimport { getCollection } from \"astro:content\";\n\nlet dataSet = await getCollection(\"dataset\");\n---\n\n<Dashboard data={dataSet} client:only />"}]} -->
{{< highlight typescript "linenos=table,noclasses=false" >}}
---
import { getCollection } from "astro:content";

let dataSets = await getCollection("dataset")
---

<Dashboard data={dataSets} client:only />
{{< / highlight >}}
<!-- FM:Snippet:End -->

To improve the performance, I had to understand Astro better and look into dynamic routing to improve the performance and lower the page sizes.

## Optimizing the dataset size per page

First, I started thinking about how I could bring more logic over to Astro. Not every dashboard needs to have all the data always available. It could easily be split up into smaller datasets.

One way to achieve these smaller datasets, is to use Astro's [routing](https://docs.astro.build/en/core-concepts/routing/) mechanism.

The idea was to create the following routes:

- `/dataset/`: show an overview of all the available datasets
- `/dataset/<name>`: show the dashboard with the processed dataset by its name

To get both routes, you must use the rest parameter in the filename. In my case, this looks like this: `/pages/dataset/[...name].astro`.

When using routing in Astro, you must define all the paths in the `getStaticPaths()` function on the page.

{{< highlight typescript "linenos=table,noclasses=false" >}}
---
import { getCollection } from "astro:content";

export function getStaticPaths() {
  return [
    { params: { name: undefined } },
    { params: { name: "a" } },
    { params: { name: "b" } },
  ];
}

// Retrieve the dataset its name
const { name } = Astro.params;
---

<h1>Dataset: {name || "overview"}</h1>
{{< / highlight >}}

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"important"},{"name":"selection","value":"The `params` property is required to define the parameters of your paths. In my case, this is the `name` for the dataset."}]} -->
{{< blockquote type="important" text="The `params` property is required to define the parameters of your paths. In my case, this is the `name` for the dataset and corresponds to the filename." >}}
<!-- FM:Snippet:End -->

In the above code block, you can see a parameter `name` with the value set to `undefined`. This value is required to get the top-level page route.

In my case, datasets are not predefined, so I needed a dynamic routing approach which I achieved as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
---
import { getCollection } from "astro:content";

export function getStaticPaths() {
  let dataSets = await getCollection("dataset").map(ds => ds.name)

  // The logic of processing the dataset its data is removed for simplicity

  return [
    { params: { name: undefined } },
    ...dataSet.map(ds => ({ params: { name: ds.name } }))
  ];
}

// Retrieve the dataset its name
const { name } = Astro.params;
---

<h1>Dataset: {name || "overview"}</h1>
{{< / highlight >}}

With the above code, I could get routes like:

- `/dataset/a`
- `/dataset/b`

Although there are pages for each dataset, there is still no data passed for each page, only the name of the dataset.

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"I tried to get the collection data outside the `getStaticPaths()` function and use it on the page and inside the routes, but this is impossible, as stated in the documentation - [getStaticPaths](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)."}]} -->
{{< blockquote type="info" text="I tried to get the collection data outside the `getStaticPaths()` function and use it on the page and inside the routes, but this is impossible, as stated in the documentation - [getStaticPaths](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)." >}}
<!-- FM:Snippet:End -->

## Passing data to each route

To pass data to each of your routes, you need to define the `props` parameter on each route.

{{< highlight typescript "linenos=table,noclasses=false" >}}
---
import { getCollection } from "astro:content";

export function getStaticPaths() {
  let dataSets = await getCollection("dataset").map(ds => ds.name)

  // The logic of processing the dataset its data is removed for simplicity

  return [
    { params: { name: undefined }, props: { dataset: undefined } },
    ...dataSet.map(ds => ({ params: { name: ds.name }, props: { dataset: ds.data } }))
  ];
}

// Retrieve the dataset its name
const { name } = Astro.params;
const { dataset } = Astro.props;
---

<h1>Dataset: {name || "overview"}</h1>

{dataset && <Dashboard dataset={dataset} client:only />}
{{< / highlight >}}

To retrieve the data for the dataset, I only needed to add the following line: `const { dataSet } = Astro.props;`.

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"The `Dashboard` component is now simplified as well, as it does not need to"}]} -->
{{< blockquote type="info" text="The `Dashboard` component is simplified, as the dataset analysis is moved into the Astro component." >}}
<!-- FM:Snippet:End -->

With this logic in place, the original dataset page got split into an x-number of pages (depending on the number of JSON files and data to analyze), which are now much smaller and more performant as they only contain the data required to render the page.
