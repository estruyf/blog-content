---
title: "Centralize your project files for your GitHub repositories"
longTitle: "Centralize your project health files for your GitHub repositories"
customField: ""
slug: "/centralize-project-files-github-repositories/"
description: "Learn how to centralize project health files your GitHub repositories using a special repository called .github"
date: "2024-07-02T14:05:23.716Z"
lastmod: "2024-07-02T14:05:24.213Z"
preview: "/social/645a04ff-4ed3-4bab-a6d2-e12679364b04.png"
draft: false
comments: true
tags:
  - "GitHub"
type: "post"
---

When you manage multiple repositories on GitHub, you can centralize your project health files like issue templates, pull request templates, code of conduct, and more. By centralizing those files, you can automatically reuse them across all your repositories or overwrite them when needed. You can achieve this by creating a special repository called `.github`.

> **Info:** You can read more about this feature in the [Creating a default community health file](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file) documentation.

I had forgotten about this feature, but I was reminded of it when I was setting up a new repository and had to add my `funding.yml` file again.

## Start by creating a `.github` repository

All you need to do is create a new repository on GitHub and name it `.github`. That's it! GitHub will automatically recognize this repository as a special repository and use it to centralize your project health files.

## Adding your Project Health Files

The [supported file types](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file#supported-file-types) section of the GitHub documentation lists the files you can centralize.

In my case, I have added my `funding.yml` file and `CODE_OF_CONDUCT.md` file to my `.github` repository. This way, I can easily reuse them in all of my repositories.

> **Info:** Check out my [.github](https://github.com/estruyf/.github) repository.

Here is an example from before I had a `.github` repository:

![Before the .github repository](/uploads/2024/07/before-github-repository.webp)

And here you can see the new `.github` repository with the `funding.yml` and `CODE_OF_CONDUCT.md` files:

![After the .github repository is added](/uploads/2024/07/after-github-repository.webp)
