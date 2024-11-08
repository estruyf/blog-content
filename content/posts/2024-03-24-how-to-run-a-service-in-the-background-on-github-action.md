---
title: "#DevHack: Running a background service on GitHub Actions"
longTitle: ""
customField: ""
slug: /devhack-running-background-service-github-actions/
description: Learn how to run a background service on GitHub Actions and use it in combination with other steps.
date: 2024-03-25T09:05:07.256Z
lastmod: 2024-03-25T09:05:07.932Z
preview: /social/e471cf63-a58e-4b7e-9436-11cd6ef3ae6d.png
draft: false
comments: true
tags:
  - Automation
  - CI/CD
  - GitHub Actions
type: post
---

Running background services on GitHub Actions can be helpful when you want to run some tests. For instance, start up the local server before running the tests. In my case, I was testing out [Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview) on GitHub Actions to see if I could use it in combination with Playwright to provide my mocks for my tests. Unfortunately, GitHub Actions does not support running multiple steps in parallel, so I had to find a workaround.

When searching for ways to run background processes on Linux environments, I found a solution to using an ampersand `&` at the end of the command.

Using the ampersand starts the service in the background and allows you to continue with the following command.

```bash {title="Start a process in the background"}
npm start &
```

{{< blockquote type="info" text="Thanks [Michael Heap](https://michaelheap.com/) for confirming that this is the right approach." >}}

## Starting a background service in your GitHub Actions workflow

The same approach can be used in GitHub Actions. When you use the ampersand `&` in your step, it starts up the service and continues to the next step in your workflow.

Here is an example of how to start a service in the background and then run your tests.

```yaml {title="GitHub Actions Workflow"}
name: Run tests

on:
  push:
    branches:
      - main
      - dev

jobs:
  testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci

      - name: Start service
        run: npm start &

      - name: Run tests
        run: npm test
```

In the above example, the `npm start &` command starts the local server in the background and continues to the next step: running the tests.

I hope this helps you when running a background service on GitHub Actions.
