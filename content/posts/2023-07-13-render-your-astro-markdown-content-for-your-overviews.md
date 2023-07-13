---
title: Render your Astro markdown content for your overviews
longTitle: ""
customField: ""
slug: /render-astro-markdown-content-overviews/
description: Learn how to easily render your Astro markdown content for overviews using Astro.glob() in this blog post.
date: 2023-07-13T13:16:03.235Z
lastmod: 2023-07-13T13:16:03.235Z
preview: /social/b7dbff0d-5a7f-4014-80fb-7092e4264bc3.png
draft: false
comments: true
tags:
  - Astro
  - Markdown
type: post
---

I wanted to create a roll-up of the latest news articles on our new BIWUG community site (which still needs to be released).

{{< caption-new "/uploads/2023/07/biwug-news.png" "BIWUG News Rollup"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAADBSURBVG3Bz0oCQQDA4d9sO87sKJNmh8KDBy+RB1MUFkKEThH0XkEP0L1j6El9A29eRBCv9ge6eQhZmGZ37AX6PrF7/3gJIdycWosxCUII/rGKz2rVtvMulSomHAuU1GRZhvMOrRRRFKFV4uPZ0zPz8ZRWWUJiubsfsS9pJq9vXMkjv7rC7XBAVMXSSB/ZmkuWvuC7KKif1LkYPLA056zywKfPiV2nuSkdFrI7vOYQArbXIxMC87UmHXX5yXNq/f7mD4WPPhJi1QqPAAAAAElFTkSuQmCC" "1299" >}}

When I retrieved the news collection data, I only got the front matter data and the markdown content.

Looking at the Astro documentation, I found several ways to get the HTML. The first one was to use the `marked` dependency, although I found an easier and better way to utilize the `Astro.glob()` functionality.

With the [Astro.glob()](https://docs.astro.build/en/guides/imports/#astroglob) function, you can provide a glob pattern to retrieve your files, and it returns the front matter data, the Astro Content component.

On the BIWUG website, I used it as follows:

<!-- FM:Snippet:Start data:{"id":"Highlight (single)","fields":[{"name":"type","value":"typescript"},{"name":"selection","value":"---\nconst allNewsPosts = await Astro.glob(`../content/news/*.md`);\nconst newsPosts = allNewsPosts.map(n => ({\n  title: n.frontmatter.title,\n  Content: n.Content\n}));\n---\n\n<section class=\"news__section mt-16\">\n  <h2>Stay Up to Date</h2>\n  <h3>Latest News and Exciting Events</h3>\n\n  <div class=\"mx-auto mt-8 grid max-w-max grid-cols-1 place-content-center gap-x-16 gap-y-12 md:grid-cols-2\">\n    {\n      newsPosts.map(({ title, Content }) => (\n        <article class=\"bg-white space-y-4 p-8 shadow-md rounded-md border border-gray-200\">\n          <h2>{title}</h2>\n\n          <Content />\n        </article>\n      ))\n    }\n  </ul>\n</section>"}]} -->
{{< highlight typescript "linenos=table,noclasses=false" >}}
---

const allNewsPosts = await Astro.glob(`../content/news/*.md`)
const newsPosts = allNewsPosts.map(n => ({
  title: n.frontmatter.title,
  Content: n.Content
}));
---

<section class="news__section mt-16">
  <h2>Stay Up to Date</h2>
  <h3>Latest News and Exciting Events</h3>

  <div class="mx-auto mt-8 grid max-w-max grid-cols-1 place-content-center gap-x-16 gap-y-12 md:grid-cols-2">
    {
      newsPosts.map(({ title, Content }) => (
        <article class="bg-white space-y-4 p-8 shadow-md rounded-md border border-gray-200">
          <h2>{title}</h2>

          <Content />
        </article>
      ))
    }
  </ul>
</section>
{{< / highlight >}}
<!-- FM:Snippet:End -->

<!-- FM:Snippet:Start data:{"id":"Blockquote","fields":[{"name":"type","value":"info"},{"name":"selection","value":"You can also use the `getCollection()` API, but this requires you to use `entry.render()` for each news article."}]} -->
{{< blockquote type="info" text="You can also use the `getCollection()` API, but this requires you to use `entry.render()` for each news article." >}}
<!-- FM:Snippet:End -->
