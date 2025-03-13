---
title: '#DevHack: Optimizing initial load JS from Next.js'
slug: /devhack-optimizing-initial-load-js-nextjs/
author: Elio Struyf
type: post
date: 2020-11-27T10:48:50.416Z
draft: false
tags: 
  - Development
  - WebDev
  - TypeScript
categories: []
comments: true
---

Now that my [PimpYourOwnBike](https://pimpyourownbike.com) website has launched. I started looking at where I can do some optimizations. When looking at the Next.js build output, I spotted a red number in the **First Load JS** section.

{{< caption-new "/uploads/2020/11/firstload1.png" "First load JS too big"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACQSURBVF3BSw5BQRBA0VtdJT4tTIglWIL9L0eQ5xev0V3FG5g4R1bbXZy6jn+b9Zrz5cJ8MmYsQupLYblY8K8vhdoa3evBPgqmqsxmU1QT19udiMDdSaMEAghfgbk7psooZ3LO1Fo5HE+oKmbGs39C3zB35/V+M4gIaq0IENUJD36SRzAwNUQEM0NEGLTW+PkAXa1GBtph7A4AAAAASUVORK5CYII=" "466" >}}

That would be the first thing on my list to optimize, getting this number from red to green.

## What is this `First Load JS`?

First of all, what is this `First Load JS` exactly? The documentation specifies that the value is based on the number of assets downloaded when visiting the server's page. The amount of JS shared by all is shown as a separate metric.

To make it simpler to understand, it is all the JS your website requires to start rendering your content. To get this first load JS number down, you have to write less code.

{{< blockquote type="info" text="`<===>`" >}}

Ok, that is not entirely true and might be very hard to achieve, but you need to get the bundle/chunk sizes down.

## How to lower the first load JS size?

### Use fewer dependencies

Check through your code if you have dependencies you might be referencing that are not required anymore.

I know this is what most articles you find will tell this. The reason is that it is very effective, but not easy to achieve. In many cases, you need all these dependencies.

### Lazy/dynamic loading components and dependencies

If you need all these dependencies, check what can be lazy or dynamically loaded. This approach means that you will load all the initial components on the page and asynchronously load all the less critical others, or they do not matter if they are loaded later.

The good thing about this approach is that it works both for React components for dependencies you want to use.

When using React, you typically use `React.lazy`, but this will not work if you are using Server-Side Rendering with Next.js. Luckily, there is a Next.js dependency called `dynamic`, which does the same thing.

{{< blockquote type="info" text="[Dynamic import Next.js documentation](https://nextjs.org/docs/advanced-features/dynamic-import)" >}}

```typescript
import dynamic from 'next/dynamic';
// Loading StickerForm component, showing spinner while fetching the component
// Use it like you're use to <StickerForm />
const StickerForm = dynamic(() => import('./StickerForm'), { loading: () => <Spinner /> });
```

Above, you see an example of how I load my form on the site. By only implementing this dynamic import, I got my first load JS size down to 89kB.

{{< caption-new "/uploads/2020/11/firstload2.png" "First load JS optimized"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACFSURBVE3BUQqCQBCA4d91VsXE3kzwBh2h+9+mZClKU3Zmegr8vmK83vyREqrG0TQOzOlJ0zdQQtj2nekycO47jrZ9J2vmtXx424Y4Tl1X9Jzo2pasyn1OhFaIW2RdvmCOqBruThUjDpQ5E6MQcyB4AQ62KkHVUDNEBDNDRChDIKvi7vz9AJxWRYe0MHwRAAAAAElFTkSuQmCC" "525" >}}

From project to project, it might be hard to achieve the same optimizations. So try to find these components or libraries, which are not instantly required for your page. For instance, this could be used for components that are, by default, loaded below the fold.

*Happy coding*

