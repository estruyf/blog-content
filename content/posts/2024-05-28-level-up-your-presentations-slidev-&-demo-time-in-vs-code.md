---
title: "Level Up Your Presentations: Slidev & Demo Time in VS Code"
longTitle: ""
customField: ""
slug: "/level-presentations-slidev-demo-time-code/"
description: "Learn how to enhance your presentations and live coding demos with Slidev and the Demo Time extension in Visual Studio Code. "
date: "2024-06-07T13:27:19.803Z"
lastmod: "2024-06-07T13:27:20.408Z"
preview: /social/3d2b1699-3569-450b-9e60-5ade4dbb064e.png
draft: false
comments: true
tags:
  - "Demo Time"
  - "Live Coding"
  - "Presentation"
  - "Slidev"
  - "Visual Studio Code"
type: "post"
---

Since I have created the Visual Studio Code - [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time) extension. I have been experimenting with ways of taking full advantage of presenting my slides and demos in a more interactive way. A couple of weeks ago at [Cloud Summit](https://cloudsummit.eu/), I did a presentation about GitHub Actions and scripted my whole slide and demo flow with the help of the [Slidev](https://sli.dev/) and the [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time) extension.

{{< caption-new "/uploads/2024/05/scripted-presentation.webp" "Presenting from Visual Studio Code" >}}

In this article, I tell you how I am using Slidev and the Demo Time extension to present and perform live coding without any stress of demo gods.

## The slides

As mentioned, I used [Slidev](https://sli.dev/) for my slides. The advantage is that you can write your slides in Markdown and can publish those as a static website. The website makes it easy to share your slides with others, but also to show them straight from Visual Studio Code. An advantage of this is that you can easily switch between your slides and demos, and you do not have to context switch between different applications. It keeps you audience focused on the content you are presenting.

For example, my slides are available at [https://slides.elio.dev/20240515-cloudsummit/](https://slides.elio.dev/20240515-cloudsummit/).

To show these in Visual Studio Code, you can make use of the **Simple Browser** capability (available from the command palette - ID: `simpleBrowser.show`). When you first execute the command, it will ask you to provide the URL of the website you want to show.

{{< caption-new "/uploads/2024/06/simple-browser.webp" "Opening the slides in Visual Studio Code" >}}

With Demo Time, we can script the opening of the slides by using the `executeVSCodeCommand` action in combination with the `simpleBrowser.show` command.

## The demos

As I love to do live coding, but also want to make sure that I do not make any mistakes, I use the [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time) extension. This extension allows you to script your demos and execute them step by step.

Typically, I create first the demo, and then I script the steps I want to show. For example, in the GitHub Actions its first demo was to create a new workflow file. The steps I scripted were:

```json {hl_lines="6-19"}
{
  "$schema": "https://elio.dev/demo-time.schema.json",
  "title": "1. Crafting",
  "description": "",
  "demos": [
    {
      "title": "1. Craft a GitHub Actions workflow",
      "steps": [
        {
          "action": "create",
          "path": "/.github/workflows/main.yml",
          "contentPath": "./crafting/step1.yml"
        },
        {
          "action": "open",
          "path": "/.github/workflows/main.yml"
        }
      ]
    }
  ]
}
```

In the above example, a new `/.github/workflows/main.yml` workflow file is created with the content coming from the `./crafting/step1.yml` file. After that, the file is opened in the editor.

{{< caption-new "/uploads/2024/06/first-demo.webp" "First demo: create workflow file and open it" >}}

The extension allows you to run various types of actions like:

- Creating a file
- Opening a file
- Highlighting code
- Inserting code
- Executing VS Code commands
- Running terminal commands
- etc...

## The combination

The combination of Slidev and the Demo Time extension is powerful. You can script your whole presentation and demos in Visual Studio Code. This way, you can easily switch between your slides and demos without any hassle.

To start the presentation, I created a step which opens the slide, closes the sidebar, and the panel.

```json {hl_lines="8-20"}
{
  "$schema": "https://elio.dev/demo-time.schema.json",
  "title": "0. Defaults",
  "description": "",
  "demos": [
    {
      "title": "🛝 Open slides",
      "steps": [
        {
          "action": "executeVSCodeCommand",
          "command": "simpleBrowser.show",
          "args": "{SLIDES_URL}"
        }, {
          "action": "executeVSCodeCommand",
          "command": "workbench.action.closeSidebar"
        }, {
          "action": "executeVSCodeCommand",
          "command": "workbench.action.closePanel"
        }
      ]
    }
  ]
}
```

From the Demo Time panel, you can follow the steps and execute them one by one. This way, you can focus on the content you are presenting and not on the steps you need to take.

{{< caption-new "/uploads/2024/06/demo-time-panel.webp" "Demo time panel and its steps" >}}

## Conclusion

The combination of Slidev and the Demo Time extension is powerful. It allows you to script your whole presentation and demos in Visual Studio Code. This way, you can easily switch between your slides and demos without any hassle. It keeps you focused on the content you are presenting and not on the steps you need to take.

I hope this article encourages you to try out this combination for your next presentation. If you have any questions or need help, feel free to reach out to me.
