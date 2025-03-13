---
title: "#DevHack: Caching data for your VSCode extension"
slug: "/devhack-caching-data-vscode-extension/"
author: "Elio Struyf"
type: "post"
date: "2021-03-24T13:38:56.670Z"
draft: false
tags:
  - "Extensions"
  - "VSCode"
  - "Caching"
categories: []
comments: true
preview: "/social/e660970a-a0d8-41d9-9699-0c745ac59843.png"
---

For my [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-msgraph-autocomplete) to autocomplete the Microsoft Graph APIs, I wanted to improve the speed of the suggestions by implementing a cache. That way, you would not have to do the same API calls each time.

## In-memory cache has its limits

Initially, I started with just an in-memory cache. An in-memory cache is easy to establish, but whenever you close your VSCode session. The cache will be gone. Next time, the cache has to be created all from scratch.

## What are the options?

Luckily VSCode provides you a couple of options to cache data for your extension. There are two places where you can cache data:

- `workspaceState`: When you want to cache data for the current workspace/project.
- `globalState`: When you want to cache data independent of your current project.

Both of these states are a `Memento` object, which allows you to `get` and `update` a value.

{{< blockquote type="info" text="There is also a `SecretStorage` which can be used to set/retrieve/delete secrets." >}}

## Using the VSCode state

For my extension, I choose to use the `globalState`, as I want to cache the Microsoft Graph data independently from the current project. Using the `workspaceState` is similar to the `globalState`.

Start by creating the cache as follows:

```typescript
export async function activate(context: vscode.ExtensionContext) {
  
  const defaultData: CacheObject = { v1: {}, beta: {} };
  const cacheName = `${EXTENSION_NAME}_cache`;
  const cache = context.globalState.get<CacheObject>(cacheName, defaultData);

  ...
}
```

Once created, you can put data into the cache:

```typescript
// Add API response to the right API version of the cache
cache[version][path] = apiData;
await this.context.globalState.update(cacheName, cache);
```

When you added the data. You can start retrieving it as follows:

```typescript
cache = context.globalState.get<CacheObject>(cacheName);
```

Currently you can only get and update data, you cannot clear/delete the cache. If you can override the cache with a default value.

```typescript
const clear = () => {
  cache = {};
  await context.globalState.update(cacheName, {});
}
```

{{< blockquote type="info" text="You can find a complete example of using the VSCode state here: [CacheProvider.ts](https://github.com/estruyf/vscode-msgraph-autocomplete/blob/main/src/providers/CacheProvider.ts)." >}}