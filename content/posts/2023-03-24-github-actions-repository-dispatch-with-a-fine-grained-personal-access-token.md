---
title: "Dispatch a GitHub Action via a fine-grained PAT"
slug: "/dispatch-github-action-fine-grained-personal-access-token/"
description: "In this article, Elio shows how to trigger a GitHub Action flow by using a fine-grained Personal Access Token and the repository dispatch trigger."
date: "2023-03-24T13:21:56.269Z"
lastmod: "2023-03-24T13:21:56.269Z"
preview: "/social/5f45c3c0-05a2-42a1-b63c-956bebc505e9.png"
draft: false
comments: true
tags:
  - "GitHub"
  - "GitHub Actions"
type: "post"
longTitle: "Dispatch a GitHub Action via a fine-grained Personal Access Token"
customField: ""
---

Finally, I made a move with my blog to start using two repositories in production. One repository holds all the markdown content and assets, and another contains the content of my website. 

The reason for this change is that I want to use the content of my blog for testing out other static-site generators and frameworks.

{{< blockquote type="info" text="Here is an example of how to use it with Astro by [symlinking the content and assets](https://www.eliostruyf.com/symlink-content-astro-portability/)" >}}

I have been testing it out, and the flow works great. To make my site go live with this new setup, I needed to configure a GitHub Action to build and deploy my site.

What I want to achieve is the following:

{{< caption-new "/uploads/2023/03/dispatch-github-action.png" "Trigger a new build"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABlSURBVBXBQQ6DIBBA0Q9DUjRh3HKIbrvzjL1Yt16DhWBiG1Eq75k1l3et54ubiGXSQLfmwnldgEGs+bij1mfO28xtHDyGRvf9HaSUeHjPpGF3TmRRDQOtIWJRVbpWNmKMGEDELn+3pSLv1W+a1wAAAABJRU5ErkJggg==" "1148" >}}

## GitHub Action Trigger

The first thing I needed to do was add the trigger on my **Repository 1** containing the website's sources.

```yaml
on:
  repository_dispatch:
    types: update
```

Once you add this to the build flow, you can call a webhook on the repository to trigger the build.

## Trigger the GitHub Action

On the **repository 2** containing my blog's content, I needed to add a new workflow to trigger the build. When you go to the documentation, it will tell you to use a Personal Access Token (PAT) with the `repo` scope.

In my case, I wanted to use the [fine-grained personal access token](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/), as it allows more control over the permissions of the token.

To be able to call the webhook, you will need to add a token with the following scopes:

- Read access to **metadata** (by default enabled)
- Read and Write access to **contents**

{{< caption-new "/uploads/2023/03/fine-grained-permissions.png" "Fine-grained permissions"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAAC0SURBVF3BsVHDQBCG0W9Xd5I9yFRAC0REEFAIDdAniTuhAhhZutv9GTGjAN6zx6eX94x8bW3jIImIYJ4vjKcT67J8lIh4dvc3SUQmh7kUzm1jMaNHb4WdwH0gM5HE7qt3FuAssSu1VsC4rTf+c3PqNJES3lsnI3B3zIy/BBI7l8S6rigTM2MYBg4p0dpGRMcxKLWyy0wigsPDNIL4VcpQrijrWI3vPmBAZpKZfG6dy/0dkq4/shloBjte2PAAAAAASUVORK5CYII=" "831" >}}

Once you have the token, add it to the secrets of your repository, and configure the following workflow to trigger the build:

```yaml
name: Trigger blog to build

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger blog build
        uses: peter-evans/repository-dispatch@v1
        with:
          token: ${{ secrets.REPO_ACCESS_TOKEN }}
          repository: <username>/<repository>
          event-type: update
```