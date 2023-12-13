---
title: "It is Demo Time; how to make your live code demos smoother"
longTitle: ""
customField: ""
slug: "/demo-time-live-code-demos-smoother/"
description: "Discover how to make your live coding demos smoother and more efficient with the new Visual Studio Code Extension - Demo Time."
date: "2023-12-13T08:44:26.741Z"
lastmod: "2023-12-13T08:44:26.741Z"
preview: "/social/db589ba8-9096-4a5b-9470-e946fbba421d.png"
draft: false
comments: true
tags:
  - "Demo Time"
  - "Development"
  - "Extensions"
  - "Live Coding"
  - "Visual Studio Code"
type: "post"
---

I have had many sessions at conferences over the years. One thing I always liked to do is perform live demos. Although I know things could fail, it is also fun to show the audience how things work.

Those live coding demos take a lot of preparation to ensure everything goes smoothly. I have tried out different approaches over the years, from having notes to creating snippets to using an app that holds those snippets. Code snippets make it easier to copy and paste code, but it is still a lot of work to ensure you have all the snippets you need and require a script to follow. For instance, when you need to create a file with a specific name, add code to it, and then run it.

{{< caption-new "/uploads/2023/12/paste-snippet.png" "Code Snippets" >}}

In the last presentation I gave at [ESPC](https://www.sharepointeurope.com/), [Stephan van Rooij](https://twitter.com/svrooij) approached me after my session and asked me if I ever tried out [CodeTour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour).

> **Info**: CodeTour is a Visual Studio Code extension that allows you to create a tour of your code. It is a great way to show your code to others and get familiar with it.

I used it several times with some repositories but never thought about using it for my demos. The extension allows you to have to insert code snippets in your tour.

Last week, I tried it to see how it could help me. The guided experience did not feel suitable for coding demos, as it requires too much clicking, but I could see the value of scripting my demos in such a way. That is how I came up with a new Visual Studio Code Extension called [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time).

## Demo Time

{{< caption-new "/uploads/2023/12/demo-time.png" "Demo Time logo" >}}

Demo Time is a Visual Studio Code extension that allows you to script your demos. That way, you only need to script it and run it during your presentations. All you need to do is explain the code you are showing/adding/running.

The focus of the extension is to make all steps possible, from creating files, adding code, highlighting code, etc.

### How does it work?

You start by installing the [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time) extension. Once installed, you can initialize a new demo by clicking the **initialize** button from the Demo Time panel.

{{< caption-new "/uploads/2023/12/{{< caption-new "/uploads/2023/12/demo-time-initialize.png" "Initialize new demo" >}}.png" "Initialize a new demo" >}}

It creates a `.demo` folder with a `demo.json` file, but you can rename it or add other JSON files in it if you want.

In the `demo.json` file, you can add your demo steps:

```json
{
  "$schema": "https://elio.dev/demo-time.schema.json",
  "title": "Playwright demo",
  "description": "Playwright demo for Microsoft 365",
  "demos": [
    {
      "title": "Login to Microsoft 365",
      "description": "Login to Microsoft 365 using Playwright",
      "steps": [{
          "action": "create",
          "path": "/tests/login.setup.ts",
          "contentPath": "snippets/login.setup.ts"
        },
        {
          "action": "open",
          "path": "/tests/login.setup.ts"
        }
      ]
    }
  ]
}
```

The above code sample shows an example where a file must be created and opened. The `contentPath` is the path to the snippet file. You can also use `content` to insert inline code, but I figured out that separate code files are easier to maintain.

### Demo Time panel

Once you have your demo steps, you can start running them. To run it, click the **step** from the Demo Time panel.

{{< caption-new "/uploads/2023/12/demo-time-steps.png" "Demo steps" >}}

When you run the demo, it will show you the executed steps. You can also see the progress of the demo.

{{< caption-new "/uploads/2023/12/completed-demo-steps.png" "Completed demo steps" >}}

### Demo Time - Demo

Here you can see a demo of the extension:

{{< video "/uploads/2023/12/demo-of-demo-time.mp4" "Demo of Demo Time" >}}

Let me know what you think of it. I am curious to hear your feedback.
