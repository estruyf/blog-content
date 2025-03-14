---
title: "#DevHack: GitHub Actions do not run step on schedule"
slug: "/devhack-github-actions-run-step-schedule/"
author: "Elio Struyf"
type: "post"
date: "2021-02-25T14:14:41.404Z"
draft: false
tags:
  - "GitHub"
  - "GitHub Actions"
  - "DevOps"
categories: []
comments: true
preview: "/social/2f85c01e-adb0-4456-afe4-cf12b53d73d8.png"
---

When creating a whole new Github Actions workflow for [Doctor](https://github.com/estruyf/doctor), I wanted to do as much as possible from one workflow and be able to limit specific actions depending on how it triggered. 

I wanted my GitHub Actions to run on each push to the `dev` and `main` branch and run the tests on a schedule. Instead of creating two workflows, I wanted to use only one workflow and specify not to run my release step to npm when triggered on a `schedule`.

The condition for this is relatively easy. All you need to know is the `event type` and the property name to use. 

You can find all property names on the [context and expression syntax for GitHub Actions](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context). The one we need for the workflow is `github.event_name`. 

You can find the event name values on the [events that trigger the workflows](Events that trigger workflows - GitHub Docs) page. In this case, the value is `schedule`.

The condition its implementation looks as follows:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Do not run on a schedule
        run: echo Just a message.
        if: ${{ github.event_name != 'schedule' }}
```

This results in:

{{< caption-new "/uploads/2021/02/schedule1.png" "Skip step on a schedule"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAD6SURBVIXBsU7DMBCA4d/niwNSCR1AAp4HCYn3X4CdlIEGUmipY9/RDEiIoXxfuL27d1Xl4fGJY/S5f6FJicXijFmQgJtDgI/Nhh+6223Z7bb8R2OMXF3fkPdfiAgiQt/3/KVmxnr9ypQz7o6I0DQN7k6MkVorpRQ0hMDJySltSjRNg6oSCDiOiDAMA6UUxMyYckZVCSEwTROO4+6klHB3ZspBnjLb7Sdmhogwc3dm7s5MY4x03TlWC6pKSgkzo9ZKzplhGJgpB23bsv8yUkqYGSKCqtK2LcvlknEc0Vorq1VPLYVjNMbIxcUlU97TdR21Vjbjhrf3N377BkYhgn8pFJ0wAAAAAElFTkSuQmCC" "271" >}}
