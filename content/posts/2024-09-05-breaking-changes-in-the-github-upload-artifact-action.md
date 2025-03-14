---
title: "Breaking changes in the GitHub upload-artifact action"
longTitle: ""
customField: ""
slug: "/breaking-github-upload-artifact-action/"
description: "Learn about the recent GitHub `actions/upload-artifact` update that excludes hidden files by default, impacting workflows."
date: "2024-09-05T13:51:03.139Z"
lastmod: "2024-09-05T13:51:03.761Z"
draft: false
comments: true
tags:
  - "CI/CD"
  - "Deployment"
  - "DevOps"
  - "GitHub Actions"
type: "post"
fmContentType: "post"
preview: "/social/4a8d1978-f5a0-4e1c-9741-2f815b92dae5.png"
---

In August 2024, GitHub announced it would exclude hidden files by default in the `actions/upload-artifact` GitHub Action. If you are using this action in your workflow, you should be aware of this change, as it might break your workflow.

{{< blockquote type="info" text="Read more about it on the [notice of upcoming deprecations and breaking changes in GitHub Actions runners](https://github.blog/changelog/2024-08-19-notice-of-upcoming-deprecations-and-breaking-changes-in-github-actions-runners/) blog post from GitHub." >}}

In my case, for [Front Matter CMS](https://frontmatter.codes), I use a two-step workflow. In the first step, the localization files are generated, and in the second step, the extension is built and published.

Suddenly, I noticed the builds were failing because some files were missing. One of those was the `.vscodeignore` file.

While unaware of this change, I looked into the issue and quickly discovered that it was due to the change in the `actions/upload-artifact` action. To fix this, I had to add the `include-hidden-files` input to the action.

```yaml  3
- uses: actions/upload-artifact@v4
  with:
    include-hidden-files: true
    name: ${{ inputs.PACKAGE_NAME }}
    path: .
```