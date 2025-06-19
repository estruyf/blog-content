---
title: "My migration story from Hugo to Astro"
longTitle: ""
customField: ""
slug: "/migration-story-hugo-astro/"
description: "My journey migrating from Hugo to Astro highlights flexibility, ease of use, and enhanced developer experience with React integration."
date: "2025-03-17T11:21:30.391Z"
lastmod: "2025-03-17T11:21:30.915Z"
preview: "/social/7abfa2cf-438b-44ae-8b61-4942965fe7fd.png"
draft: false
comments: true
tags:
  - "Astro"
  - "Hugo"
  - "Migration"
  - "Static site"
type: "post"
fmContentType: "post"
---

After years of good performance with [Hugo](https://gohugo.io/), I decided to migrate my blog to [Astro](https://astro.build). I choose to migrate for a few key reasons: **flexibility**, the **familiar syntax and programming language (JavaScript/TypeScript)**, and how **easy it is to get started** (in my case). In the past, I already used Astro a couple of times for some small projects (like [Demo Time](https://demotime.show)), and that made me feel comfortable making the switch.

The developer experience with Astro is incredibly smooth. You can start building very quickly once you get the hang of the `*.astro` files and how Astro handles components. Another advantage is that I can make use of React in a relatively easy way. I created a React app for the search functionality in my Hugo theme. I hooked everything up with webpack, but it still used a version that depended on Node.js 16. With Astro, it enables React integration, and you can start loading your React components in your Astro files.

{{< blockquote type="note" text="I still like Hugo, and I never had any issues with it. Since 2019, it worked flawlessly. But it was time for a refresh. Something that better aligns with how I develop today." >}}

## Background

In 2019, I migrated my blog from WordPress to Hugo to go fully static. It was a big step then, but Hugo delivered on speed, simplicity, and stability. The migration story is documented in [The challenges of migrating my WordPress site to Hugo](https://www.eliostruyf.com/the-challenges-of-migrating-my-wordpress-site-to-hugo/). One of the biggest pain points was converting the content from WordPress to Markdown, but it was ultimately worth it.

Over the years, my setup evolved to focus on portability and flexibility. I decoupled my content into a separate repo, managed it with Git submodules, and developed Visual Studio Code extensions and custom tooling around it (read: [Front Matter CMS](https://frontmatter.codes)). When I started looking at Astro more seriously, it was easy to get started because I just had to point Astro to my content repo. The decoupling was already achieved.

## Setup

As mentioned in the background story, my blog content lives in a separate repository that I include in my website via a Git submodule. If you are interested in how I set this up, you can read these articles:

- [Managing Hugo website content as a submodule](https://www.eliostruyf.com/managing-hugo-website-content-asset-submodule/)
- [Symlinking content in Astro for portability](https://www.eliostruyf.com/symlink-content-astro-portability/)

For my Astro setup, I symlinked my static folder and content directories, which I wanted to use on the new website, as follows:

```bash title="Symlinking content in Astro for portability"
# Clone the repository
git submodule add -b main git@github.com:estruyf/blog-content.git .frontmatter

# Update the submodule
git submodule update --init --recursive --remote

# Remove existing content directories
rm -rf src/content/posts
rm -rf public

# Create symbolic links to the content
ln -s "$(pwd)/.frontmatter/content/posts" "$(pwd)/src/content/posts"
ln -s "$(pwd)/.frontmatter/content/about-me" "$(pwd)/src/content/about"
ln -s "$(pwd)/.frontmatter/content/session" "$(pwd)/src/content/sessions"

# Create symbolic links to the speaking data file(s)
ln -s "$(pwd)/.frontmatter/data/speaking" "$(pwd)/src/content/speaking"

# Create symbolic links to the static folder, which contains all images
ln -s "$(pwd)/.frontmatter/static" "$(pwd)/public"
```

With these symlinks, everything was hooked up and ready to go.

## Content Conversion

Hugo uses shortcodes and partials `{{< partial >}}`, while Astro prefers components and Markdown/MDX. As I have over **500** blog posts, I did not want to update all of them manually to use new components. Therefore, I went for a different approach and created a couple of Remark plugins to convert the shortcodes/partials to Astro components.

{{< blockquote type="info" text="Here you can see an example of how you can create such a Remark plugin for Astro: [add a reading time Remark plugin](https://docs.astro.build/en/recipes/reading-time/)" >}}

For my content, I wrote a couple of these plugins to handle the following partials:

- **Callouts / Blockquotes**: Converts callout shortcodes to HTML blockquotes
- **Image Captions**: Converts image captions shortcodes to HTML figure elements
- **Gist Partials**: Converts Gist embeds to proper HTML elements
- **Video Partials**: Converts video embeds to proper HTML elements

For instance, the plugin for image captions converts the following Hugo shortcode:

```html title="Example of a caption shortcode" wrap
{{< caption-new "/uploads/2025/03/swa-storage-limits.webp" "Static Web Apps - Plans" "data:image/jpeg;base64,..." "855" >}}
```

To the following HTML code:

```html title="HTML output of the caption conversion" wrap
<figure class="caption__figure">
  <a class="lightbox" href="https://www.eliostruyf.com/uploads/2025/03/swa-storage-limits.webp" title="Show image">
  <span class="sr-only">Show image</span>
  <img src="data:image/jpeg;base64,..." data-src="https://www.eliostruyf.com/uploads/2025/03/swa-storage-limits.webp" alt="Static Web Apps - Plans" style="width:855px;" class="lazyloaded">
  </a>
  <figcaption class="caption__text">Static Web Apps - Plans</figcaption>
</figure>
```

With these four Remark plugins in place, I could make most of my Astro-compatible content.

### Code Highlighting

A trickier one was the code highlighting shortcode, which I used in older posts. When I started to use Hugo, I used this `{{< highlight >}}` shortcode to highlight code blocks.

Here is an example:

```html title="Example of a code block in Hugo"
{{< highlight typescript >}}
const greeting: string = 'Hello, World!';
console.log(greeting);
{{< /highlight >}}
```

Later on, I moved to triple backticks (\`\`\`), which is the standard way to do it in Markdown. To make my older posts compatible with Astro, I created a script to convert the old shortcode to the new syntax.

The script looped over all my posts and replaced the `{{< highlight >}}` shortcode with the triple backticks. 

```javascript title="Code to convert the old code block syntax to the new one"
data = data.replace(/{{< highlight (\w+)[^>]*>}}/g, '```$1');
data = data.replace(/{{< \/ highlight >}}/g, '```');
```

{{< blockquote type="alert" text="There was a bit more scripting involved to convert my Hugo code block frame titles and line highlighting too." >}}

Now, I use [astro-expressive-code](https://expressive-code.com/installation/), which renders beautifully styled and readable code blocks.

## Best Practices from the migration

### Use Data Files

In Hugo, I had a Markdown file for all my speaking sessions. This page was originally created in WordPress and then converted to Markdown. I updated the Markdown file for every session, but this was not the most efficient way to manage this data. 

At the beginning of 2024, I started using a JSON file to store this data. All the older sessions were still in the markdown file. With two Hugo partials, I showed the upcoming and past list of sessions.

In Astro, I wanted to switch to using a JSON data file. That meant all sessions had to be converted from HTML or Markdown to JSON. This conversion to JSON was a bit of work. First, I used ChatGPT and GitHub Copilot to convert the complete HTML or Markdown to a JSON list. Unfortunately, this did not work as expected. There were too many inconsistencies in the data, and it took too much time to correct everything. What worked well was to copy the single session data and pass it to the inline chat experience of GitHub Copilot. This way, I had more control over the process.

{{< video "/uploads/2025/03/convert-session-data-to-object.mp4" "Convert the session data with GitHub Copilot" >}}

Lesson learned: Use data files for data as much as possible. It makes it easier to manage and maintain.

### Watch for Breaking Changes

I started developing this theme a long time ago. Initially, I wanted to convert my Hugo theme to Astro. Over time, I changed my mind and started working on a completely new theme. 

Just before putting my website live, I discovered that Astro and Tailwind had new major versions that introduced some breaking changes.

- `page.body` → `page.rendered.html` in Astro. I used the page body to create descriptions/summaries where none are defined.
- Tailwind config refactor from `.mjs` to **utility-first** class definitions in CSS. This transition was more painful to get working.

It is all solvable but worth watching if you upgrade an old Astro site.

## Before and After

To illustrate the transformation, here are before and after screenshots of the blog:

Before Migration:

{{< caption-new "/uploads/2025/03/homepage-hugo.webp" "Previous version of the site"  "data:image/jpeg;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoKAA8AAUAmJaQAAu19MIEIsAD+/seZVthcQBn9qZqG3ZdCigk1cN6GAIWL77FcgAA=" "1592" "2377" >}}

After Migration to Astro:

{{< caption-new "/uploads/2025/03/homepage-astro.webp" "New website in Astro"  "data:image/jpeg;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoKAA8AAUAmJaQAAxe58UOp+ugA/v3UXFZXToyQSPOixp2YQ0sJleNhNjasbdDL8/6fI0AtmU/eDeam30CcwK6f/G6maOAFAAAAAA==" "1585" "2362" >}}

## Final Thoughts

I had a great time using Hugo. It was reliable, fast, and never gave me a reason to complain, but I am very happy I finally switched to Astro.

Astro makes it easy to get started. As my content was already in a separate repo, the transition was much smoother than my migration from WordPress to Hugo.

Feel free to reach out if you have any questions about the migration process or Astro. I am happy to help!