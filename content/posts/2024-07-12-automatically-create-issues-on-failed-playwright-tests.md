---
title: "Create GitHub issues on failed Playwright tests"
longTitle: "Automatically create GitHub issues on failed Playwright tests"
customField: ""
slug: "/create-github-issues-failed-playwright-tests/"
description: "Learn how to automatically create GitHub issues for failed Playwright tests with the Playwright Issue Creator action, available on the GitHub Marketplace."
date: "2024-07-12T14:32:18.125Z"
lastmod: "2024-07-12T14:32:18.654Z"
preview: "/social/05e8865d-5d20-4673-8b0f-803079d9c622.png"
draft: false
comments: true
tags:
  - "Automation"
  - "DevOps"
  - "GitHub"
  - "Playwright"
  - "Testing"
type: "post"
fmContentType: "post"
---

As various projects I maintain for customers include end-to-end (E2E) tests using Playwright, which run on a daily schedule and on every new release, I wanted to automate following up on failed tests. Instead of manually creating issues, I automated the process using GitHub Actions and the GitHub API. This worked great, but I thought to myself, why not share this with the world? So, I created a GitHub Action that does exactly that.

{{< caption-new "/uploads/2024/07/playwright-failed-test-issue.webp" "Sample issue created by the Playwright Issue Creator action"  "data:image/jpeg;base64,UklGRn4AAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSCMAAAABHyAWTPz5OoOZRkSEDEVt20BVX90Fryp/MsMQ0f+Ij9AfHwBWUDggNAAAANABAJ0BKgoABwABQCYlpAAC94YyIEQAAP792Fx7V5HNbrEs/UnCLfCaBdiTzb5zs7NwAAA=" "1900" >}}

In this blog post, I will explain how you can use GitHub Action to create issues on failed Playwright tests automatically.

## The GitHub Action

The GitHub Action is called [Playwright Issue Creator](https://github.com/marketplace/actions/playwright-issue-creator) and is available on the GitHub Marketplace.

The Playwright Issue Creator action relies on the JSON report created by the [JSON reporter](https://playwright.dev/docs/test-reporters#json-reporter) to verify the test results.

{{< blockquote type="info" text="The GitHub Action only creates an issue if there is no issue open with the following name `{prefix} {suite title} {test title} ({project})`. If one already exists, the extension adds a comment (can be turned on/off)." >}}

## Usage

### Include the JSON reporter to your Playwright config

As mentioned, the GitHub Action relies on the JSON report created by the JSON reporter. 

You can include the JSON reporter in your Playwright config or use the `--reporter json` flag when running your tests.

#### Using the JSON reporter in your Playwright config

```javascript 
import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [
    ["json", { outputFile: "results.json" }]
  ]
});
```

#### Using the `--reporter json` flag

```bash 
PLAYWRIGHT_JSON_OUTPUT_NAME=results.json npx playwright test --reporter=json
```

### Create a GitHub Action workflow

Create a new GitHub Action workflow in your repository and add the following content:

```yaml 
name: Playwright Tests

on:
  schedule:
    - cron: "0 6 * * *"

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest

    # Assign write permissions for issues to the GITHUB_TOKEN
    permissions:
      contents: read
      issues: write
    
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: npm

      - name: Install dependencies
        run: npm ci
      
      - name: Run Playwright tests
        run: npx playwright test

      - name: Playwright issue creator
        if: always()
        uses: estruyf/playwright-github-issue-creator@v1.1.0
        with:
          report-path: results.json
          issue-prefix: "E2E: "
          issue-labels: "playwright, bug"
          add-project-label: true
          add-comment: true
          job-summary: true
```

{{< blockquote type="important" text="The GitHub Action requires permissions to create issues, so you need to assign those permissions to your `GITHUB_TOKEN`." >}}

{{< blockquote type="tip" text="All the configuration options are explained on the [Playwright Issue Creator](https://github.com/marketplace/actions/playwright-issue-creator) page." >}}

### Run your tests

After you set up the above GitHub Action workflow, the test will run daily at 6 o'clock. You can, of course, add more triggers or run the tests on every push.

*Happy testing!*
