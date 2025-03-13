---
title: Use environment variables in Hugo to show branch information
slug: /environment-variables-hugo-show-branch-information/
author: Elio Struyf
type: post
date: 2021-03-02T10:24:23.742Z
draft: false
tags:
  - Development
  - Documentation
  - Hugo
  - Vercel
categories: []
comments: true
---

For the new documentation website of [Doctor](https://getdoctor.io), I wanted to do something similar like I did for [Pimp Your Own Bike](https://pimpyourownbike.com/) to show a message depending on the version/branch of the site I am using. For the `doctor` documentation, I wanted to use this method to show a `beta` message when using the beta site ([beta.getdoctor.io](https://beta.getdoctor.io/)).

{{< blockquote type="Related Article" text="[#DevHack: Configuring domains for your branches on Vercel](https://www.eliostruyf.com/devhack-configuring-domains-branches-vercel/)" >}}

The beta banner looks like this:

{{< caption-new "/uploads/2021/03/doctor1.png" "Difference between production and beta documentation site"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACPSURBVE3BQQqCQBiA0W/GmVmo0UIi0ZW3iC7RQbtEdBFXQu0siUZH/Uso6j21Ox0l1ZbMWNrBcw9PbCesjCVzjtZ7uqnHnPcHRIRrU5OXFbMIvcwo4NLU5GXFQkdRRDv06GxLNwWMMSTWcRs88abgMQZi5zC8bZKUhYggIiilKNI1/zQffgwIP0op+mni6wVpdjpblzT7WAAAAABJRU5ErkJggg==" "3822" >}}

## My approach

I used an environment variable for the bike stickers site, which I configured on [Vercel](https://vercel.com). In the code, I used the `process.env.<variable>` to check the branch during the build.

For `doctor`, I used [Hugo](https://gohugo.io/) as the static site generator. These environment variables work a bit differently but still easy to achieve.

To achieve the same in Hugo, you will need to create an environment variable prefixed with `HUGO_` or defined differently when using version `>=0.79.0` of Hugo.

I created a `HUGO_GIT_COMMIT_REF` variable for the' doctor' site, linked to `VERCEL_GIT_COMMIT_REF`, which passes me the branch name.

{{< caption-new "/uploads/2021/03/doctor2.png" "Environment variable on Vercel used in Hugo"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAlSURBVBXBsREAMAjEMOdb9h+VhgLnkN7M2N3sLlWFShKScFTOB7YuD++h6dH6AAAAAElFTkSuQmCC" "767" >}}

In the theme for Hugo, I retrieve the environment variable and check if it is not equal to the `main` branch. When that happens, the build will generate the static site with the beta message included.

```html
{{ $branch := getenv "HUGO_GIT_COMMIT_REF" }}
{{ if ne $branch "main" }}
  <div class="banner-beta py-2">
    You are currently checking the beta version of the documentation.
  </div>
{{ end }}
```