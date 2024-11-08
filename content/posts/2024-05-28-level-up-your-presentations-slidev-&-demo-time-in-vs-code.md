---
title: "Level Up Your Presentations: Slidev & Demo Time in VS Code"
longTitle: ""
customField: ""
slug: "/level-presentations-slidev-demo-time-code/"
description: "Learn how to enhance your presentations and live coding demos with Slidev and the Demo Time extension in Visual Studio Code."
date: "2024-06-07T13:27:19.803Z"
lastmod: "2024-06-07T13:27:20.408Z"
preview: "/social/be0bc913-21c2-49cb-832c-89c6c78d9daf.png"
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

Ever since I created the Visual Studio Code - [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time) extension, I have been experimenting with ways of taking full advantage of presenting my slides and demos more interactively. A couple of weeks ago at [Cloud Summit](https://cloudsummit.eu/), I did a presentation about GitHub Actions and scripted my whole slide and demo flow with the help of the [Slidev](https://sli.dev/) and the [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time) extension.

{{< caption-new "/uploads/2024/05/scripted-presentation.webp" "Presenting from Visual Studio Code"  "data:image/jpeg;base64,UklGRrwAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSC8AAAABL6CmbSSGP8vby//vlUZExKOaCYWQrFA3GfwAcngTQAz586QQ0f8od18D+h1JBwBWUDggZgAAAFACAJ0BKgoABgABQCYlkAJ0Bpi8AtDoHg+r4AD++r7+Y4dZv1cH/un9HPchaksg4xpwaMN2B4XX/U/z16P//qlyFuIL9fCJ+tfV0B4tOhTYROuybBnK8vgqnhbxxpNZ55zQeHroAA==" "2672" >}}

In this article, I explain how I am using Slidev and the Demo Time extension to present and perform live coding without the stress of demo gods.

## The slides

As mentioned, I used [Slidev](https://sli.dev/) for my slides. The advantage is that you can write your slides in Markdown and publish those as a static website. The website makes it easy to share your slides with others and show them straight from Visual Studio Code. An advantage of this is that you can easily switch between your slides and demos, and you do not have to context switch between different applications. It keeps you audience focused on the content you are presenting.

For example, my slides are available at [https://slides.elio.dev/20240515-cloudsummit/](https://slides.elio.dev/20240515-cloudsummit/).

To show these in Visual Studio Code, you can use the **Simple Browser** capability (available from the command palette - ID: `simpleBrowser.show`). When you first execute the command, it will ask you to provide the website URL you want to show.

{{< caption-new "/uploads/2024/06/simple-browser.webp" "Opening the slides in Visual Studio Code"  "data:image/jpeg;base64,UklGRqQAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCEAAAABHyAgIf5flQ3ciIiYhJoASBiGN/0zQE8zRPQ/1hD3rAEAVlA4IFwAAACwAQCdASoKAAYAAUAmJZACdAD0h9dkAP75CfC6x7338eHcEp+f/M9z7Xv9aAlde4g37fW0gYj3qJt+9AJM6LtdwFZ/6IMrO0K4OhznJaOvfD9v/xR7xTcuAZfcAA==" "1954" >}}

With Demo Time, we can script the opening of the slides by using the `executeVSCodeCommand` action in combination with the `simpleBrowser.show` command.

## The demos

I love live coding but also want to avoid mistakes, so I use the [Demo Time](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-demo-time) extension. This extension allows you to script and execute your demos step by step.

Typically, I create the demo first and then script the steps I want to show. For example, in the GitHub Actions, its first demo was to create a new workflow file. The steps I scripted were:

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

In the above example, a new `/.github/workflows/main.yml` workflow file is created with the content from the `./crafting/step1.yml` file. The file is then opened in the editor.

{{< caption-new "/uploads/2024/06/first-demo.webp" "First demo: create workflow file and open it"  "data:image/jpeg;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCEAAAABHyAgIf5flQ3ciIiYhJoASBiGN/0zQE8zRPQ/1hD3rAEAVlA4ICoAAACwAQCdASoKAAYAAUAmJaQAAvh1xMQAAP7+bI7SxjLI4Chc7K7k4r9sAAA=" "1954" >}}

The extension allows you to run various types of actions like:

- Creating a file
- Opening a file
- Highlighting code
- Inserting code
- Executing VS Code commands
- Running terminal commands
- etc.

## The combination

The combination of Slidev and the Demo Time extension is powerful. You can script your whole presentation and demos in Visual Studio Code. This way, you can easily switch between your slides and demos without any hassle.

To start the presentation, I created a step that opens the slide and closes the sidebar and the panel.

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

You can follow the steps from the Demo Time panel and execute them one by one. This way, you can focus on the content you are presenting rather than the steps you must take.

{{< caption-new "/uploads/2024/06/demo-time-panel.webp" "Demo time panel and its steps"  "data:image/jpeg;base64,UklGRoAAAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCMAAAABHyAUQGMvoiwyKiJiCQoaSXHo+HdB8Ni+iIjof0RSjf+RBABWUDggNgAAALABAJ0BKgoABQABQCYlpAAC51l/dwAA/vpZG81a+dvLYK9FVECP9kc3fltuSOMEg/kCOlmAAA==" "538" >}}

{{< blockquote type="tip" text="It makes it easier when you split up your whole presentation into multiple sections where, at the start, you can use a base template for the demo. You always have a new starting point if something goes wrong without running all the steps again." >}}

{{< blockquote type="info" text="The example can be found here: [GitHub Actions Presentation](https://github.com/estruyf/presentation-github-actions)" >}}


## Conclusion

The combination of Slidev and the Demo Time extension is powerful. It allows you to script your presentation and demos in Visual Studio Code. This way, you can easily switch between your slides and demos without any hassle. It keeps you focused on the content you are presenting, not the steps you need to take.

This article encourages you to try out this combination for your next presentation. If you have any questions or need help, feel free to contact me.
