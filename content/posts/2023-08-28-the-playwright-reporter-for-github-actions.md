---
title: The Playwright Reporter for GitHub Actions
longTitle: ""
customField: ""
slug: /playwright-reporter-github-actions/
description: Learn how to use the @estruyf/github-actions-reporter to quickly discern Playwright test results in GitHub Actions with
date: 2023-08-28T08:56:53.930Z
lastmod: 2023-08-28T08:56:54.541Z
preview: /social/d188aa82-13cc-4c9d-9ba2-78d6fc343ec4.png
draft: false
comments: true
tags:
  - CI/CD
  - GitHub Actions
  - Playwright
  - Testing
type: post
---

For developers leveraging GitHub Actions to automate workflows E2E tests, Playwright provides excellent documentation on its [use with GitHub Actions](https://playwright.dev/docs/ci-intro). By default, the setup uses the HTML reporter, offering a detailed look at test results. However, I found myself longing for a more straightforward overview of these results. This led me to develop a [GitHub Actions reporter](https://www.npmjs.com/package/@estruyf/github-actions-reporter). This reporter captures all the test outcomes and presents them as a concise GitHub Actions summary.

{{< caption-new "/uploads/2023/08/example-without-details.png" "GitHub Actions - Playwright test results"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABcSURBVHXBsRWDMBBEwQ9ITwm0YiJHduYWaQxKwRAI7vbcgDXTPV+f5b6v+TwO3J2GNZnZo4f3OE189x1J/BG9meEKJJFzpiWVUvDkUAOXaElXrVt4dEMMhETD9gPpKTD4IepW5QAAAABJRU5ErkJggg==" "1286" >}}

With this, you can quickly discern how many tests passed or failed. When used alongside the HTML reporter, it also provides in-depth details of each test result.

## How to use it?

To integrate the reporter into your workflow, start by adding it as a project dependency:

```bash {linenos=table,noclasses=false}
npm install @estruyf/github-actions-reporter
```

Next, you need to add the reporter to your `playwright.config.js` configuration:

```typescript {linenos=table,noclasses=false}
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html'],
    ['@estruyf/github-actions-reporter']
  ],
});
```

Once set up, executing tests on GitHub Actions will display the results in the summary.

{{< caption-new "/uploads/2023/08/example-with-details.png" "GitHub Actions reporter for Playwright with details markup"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABESURBVG3BsQ2AMAwEwHficSgoaKBjSeaiyCygfyMZ6H1ny7YfETHjIxIkUTg98p4AXyVBEswMhcfjypGd3lrHLzNRGC+p1x7nXO/CIwAAAABJRU5ErkJggg==" "1287" >}}

The reporter is also customizable, offering options such as detailed views and error displays. Dive into the [GitHub Actions reporter documentation](https://github.com/estruyf/playwright-github-actions-reporter) for a comprehensive understanding.

Give it a try and let me know your experiences. Feedback and suggestions are always appreciated!