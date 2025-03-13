---
title: "Symlink your content in Astro for better portability"
longTitle: "Symlink your content in Astro: a simple solution for greater portability and flexibility"
customField: ""
slug: "/symlink-content-astro-portability/"
description: "Discover how to effortlessly symlink content in Astro for improved portability & flexibility. Learn to resolve Vite.js symlink issues with a simple fix."
date: "2023-03-15T16:47:03.723Z"
lastmod: "2023-03-15T16:47:03.723Z"
preview: "/social/dbb4f25c-472a-425c-b942-4a8ca223e110.png"
draft: false
comments: true
tags:
  - "Astro"
  - "Development"
  - "Static site"
  - "Framework"
type: "post"
---

Astro is a powerful static-site generator that allows developers to build lightning-fast websites. However, when trying to create a more portable and flexible blog by separating content from the website's source, I faced issues with symlinks/content not being recognized/found. 

In this blog post, I'll walk you through a simple solution to this problem and explain how you can easily symlink your content to an Astro project.

## Background: Why Separate Content from the Source Code?

It all started because I got interested in Astro; setting up a sample project is easy, but I wanted to start testing it against the data of my blog. That is when I began to think about more flexibility to test and experiment with different static-site generators and frameworks like Astro.

I started to think about how I could make it work so that I could still manage the content how I am used to managing it, without needing to copy/paste it to any other sample projects.

This need for adaptability led me to separate my content from the website's source code in another repository. By doing so, I could quickly start testing against other static-site generators or frameworks by adding a git submodule to the repository. The most significant benefit is no content duplication, and if I change a file, I can get the update on my Hugo blog project as well.

Another motivating factor behind this decision was enhancing my Front Matter CMS experience. By having a well-organized and independent set of content, I could build new features, refine the CMS's capabilities, and ensure seamless integration with other static-site generators and frameworks.

## Symlinking the content

First, I added my content to the Astro project by adding the git submodule. In my case, all the content and my Front Matter CMS configuration is added to a `.frontmatter` folder.

{{< caption-new "/uploads/2023/03/updated-symlinked-folder.png" ".frontmatter folder as a submodule"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAABxSURBVH3BMQ6CMBSA4f+1BUpwksmBiZkjkHAV7+VhOJGJA4iRvlqZDDF8n9RN1wIDx0YH9JdzebNZYF6U+2Pll7PCGuLVkGgMOFeyvJQ9jZEvQ2JEmJ6CsZ49VTaGZJ7eZHnOqarwvuAfqZuuBQaOjR8inB5n2bZulAAAAABJRU5ErkJggg==" "497" >}}

Once the content was added, I only needed to symlink it to the `./src/content/` folder.

To start, I symlinked my `posts` folder as follows:

```bash
ln -s "$(pwd)/.frontmatter/content/posts" "$(pwd)/src/content/posts"
```

This command creates a symlink from the `./.frontmatter/content/posts` folder to the `./src/content/posts` folder.

{{< caption-new "/uploads/2023/03/symlink-posts.png" "Symlinked posts folder"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB0SURBVHXBwQ3CMBAEwL07C+QPH5QHSgtJDZFSD83QUJqyIcaW9+CNwowM4zzZWVdzQ60Nf2zBzJbbNT5ELyjvipQyfrXW7uru2F+OeBKklEASJEESJAE43B2BJPJeEUtDsIBcnjgiwzhPIrLiS1XRe8eB7QMyhDfd+XL9ZQAAAABJRU5ErkJggg==" "534" >}}

Unfortunately, this didn't work as expected. I got the following error:

{{< caption-new "/uploads/2023/03/symlink-error.png" "Asset include error"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABsSURBVHXBsQ3CMBBA0X+HLTkOBCIFiSEoKdmRxSgzBBUNMjkLY1MjwXvS9eMFOPJH8J5xc5jdfppOiJ7NjJQSXwQQ5f64BZftxTb2hDiwiwO0Si6Fd2uoCKVWlmy4ZMs12dP4QVeeLqwRdP4A4S4lBBCWif4AAAAASUVORK5CYII=" "1314" >}}

## Fix the content issues

I started to look in the Astro documentation but did not find a solution. When I discovered that Astro uses Vite, I realized it could relate to that tool.

I found the `preserveSymlinks` setting in the documentation and configuration references. 

{{< blockquote type="info" text="`preserveSymlinks`: Enabling this setting causes vite to determine file identity by the original file path (i.e. the path without following symlinks) instead of the real file path (i.e. the path after following symlinks)." >}}

So I updated the `astro.config.mjs` file with the following configuration:

```typescript
export default defineConfig({
  ...
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  }
});
```

Once the local server restarted, I started to see the content of my blog.

{{< caption-new "/uploads/2023/03/astro-blog-content.png" "Showing my blog content with Astro"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACeSURBVF3BMU4DMRCG0e8f28EgIdYoW3MPSs5Bw0Upc5gtkRPtgncGiETDe1qW5bX3/hIRjDGY55nWGv+856kdn+/uH9+SCQICCOdKAsSvNV/OH/TeMWus50QAZuAjmI6ZhymRTOQf1Fr5ssK6O8ngkMVNNjbB54DbA5gkJGEmImB3cIexw9iDy+YMD3Kt9VRKqX0TT3PhjwQRXIVz+gbFOD9XYhUQLwAAAABJRU5ErkJggg==" "755" >}}

## Linking my assets

As it works for the content, I could do the same for the assets of my site. In my public/static folder, I have two folders:

- `social`: For all my Open Graph images;
- `uploads`: For all my images (I kept this as I once moved from WordPress to Hugo).

I symlinked both folders as follows:

```bash
ln -s "$(pwd)/.frontmatter/static/social" "$(pwd)/public/social"
ln -s "$(pwd)/.frontmatter/static/uploads" "$(pwd)/public/uploads"
```

{{< caption-new "/uploads/2023/03/symlinked-asset-folders.png" "Symlinked asset folders"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAB8SURBVH3BwQ2CMBiA0a/Qlv4Q9SKJCWEEzgzgJE7mPAzi0ROJRdpQ4WY04T1VN10L9OwbNHA9X6r7aIT34wlL4ptyhjSFW8YqjhN6ihSl8GdJbDSr4CpKpckri881YQ68vGeT5sgmY6WkwIlDxHE6HrDW8EvVTdcCPfuGDy9uH7PS09jcAAAAAElFTkSuQmCC" "497" >}}

The blog post result looks like this:

{{< caption-new "/uploads/2023/03/symlinked-post-result.png" "Outcome of the symlinked content and assets"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAYAAAB/sn/zAAAAAklEQVR4AewaftIAAAHWSURBVHXBT2oUQRTA4d979aqmGyY9kATRiQvJMjtBRBB05R08gleQXMS9O29hLuBC3GaRbRLBxHRP/6lXpoWBMeD3yfn5+ftxHN+ICF3XcXx8zHK55IEzWz999tZL+cCOKRcsCDvEfnz/xvX1NU3TsNlsqOua9XqNuyMiNE3DarXCTk5OKKWwWCwQEf7HLi4uuL295fDwkKqqiDEyjiMigpmxv7/PzA4ODlgul4gI7s5ms0FEcHfcnaurK1arFZZSYpomzIxSCu5OSokYI6UUUkrEGLGbmxv6vielRN/3iAiqyszM2NvbI6WEqSoxRvq+5+joiFIKMxHB3QkhMLMQAu5OVVVcXl4iItR1zZaIEELA6romhMBMVXF3VJVZzhkRoZSCDsNA3/d0XUcpBRFBRHB3QgiYGTFGzN3JOWNm3N3doaqICDlnzIy6rnF37B4pJUSEEALujogQQiCEwDiOqCo2TRPDMKCqqCoiQlVVzOq6RkSYqYigqszcnZm7k3OmbVvatmVmTdMwjiOqymKxQEQopfCQpZR48fodqiM/f2Uo/PXq5XO+fP7ElnEvjz2SEm37m62u27BLuTcOI8MUSDGyVQr/MODr6enHknNm15PHj9hx9gf9p8V7629H5wAAAABJRU5ErkJggg==" "757" >}}

I hope this might help you achieve the same in your projects.