---
title: "Control Your Mac with a 3-Button Voice Setup"
longTitle: "Switching to a 3-button voice setup: how I control my Mac with Handy and VoiceSnippets"
slug: "/control-mac-3-button-voice-setup/"
description: "Discover how to control your Mac effortlessly with a 3-button voice setup for a seamless workflow and enhanced productivity."
date: "2026-03-11T12:00:00Z"
lastmod: "2026-03-11T12:00:00Z"
preview: "/social/3b1d9d57-5eb2-4321-84ac-f3641bd31866.png"
draft: false
comments: true
tags:
  - "DevHack"
  - "Workflow"
  - "Automation"
  - "macOS"
  - "Productivity"
type: "post"
fmContentType: "post"
---

A while back, I wrote a post called [Stop typing, start talking: How voice dictation changed my workflow](https://www.eliostruyf.com/stop-typing-start-talking/), where I shared how I was shifting my workflow to use my voice more and more. At the time, I was still relying heavily on my main keyboard to trigger these voice commands. It was an improvement, certainly, but it wasn't perfect. I still had to wrangle my fingers into odd positions to hit complex shortcut combinations.

As a developer, I'm always curious about optimizing my physical workspace. I wanted a way to trigger my voice tools without thinking, and without looking down. So, I decided to buy a 3-button keyboard (actually 4, but I only use three).

In this post, I will share how I use a tiny, three-button keyboard to control my entire machine with my voice. 

## The hardware: three buttons to rule them all

Nowadays, I use a new programmable keyboard with just three buttons (well, technically four, but I only need three to use it). It is the SinLoon Mini Programmable Mechanical Keyboard.

{{< caption-new "/uploads/2026/03/mini-keyboard.webp" "My 3-button SinLoon macro keyboard setup" >}}

The goal is simple: instead of hitting `Ctrl+Alt+Shift+Something`, I just press a single chunky button. 

I must admit, the setup for the hardware has one slight catch. The SinLoon keyboard uses a custom app that you have to download via a Google Drive link. That sounds a bit shady, but it is totally fine. The real downside is that the configuration app only works on Windows, while I do all my development work on macOS.

To map the keys, I plugged the keyboard into a Windows machine, opened the app, and set the shortcuts by clicking the virtual keys in the UI window. Once you send the keybindings to the macro board, they are saved directly on the device. When I plug it back into my Mac, it works flawlessly.

## The software: translating buttons to actions

I configured the three buttons to trigger the specific tools that power my voice-first workflow:

1.  **Button 1:** Triggers [Handy](https://handy.computer/), my go-to tool for transcribing voice to text anywhere. It sends `Ctrl+Alt+Shift+R`.
2.  **Button 2:** Triggers [VoiceSnippets](https://github.com/estruyf/VoiceSnippets), a custom app I built for running commands and text expansion based on spoken trigger words. It sends `Ctrl+Alt+Shift+S`.
3.  **Button 3:** Acts as my `Enter` key. 

{{< caption-new "/uploads/2026/03/VoiceSnippets.webp" "VoiceSnippets app to controls your computer with trigger words" >}}

{{< blockquote type="tip" text="By offloading these complex `Ctrl+Alt+Shift` shortcuts to a dedicated macro pad, you completely eliminate the awkward finger aerobics usually required to trigger background apps." >}}

## VoiceSnippets in action

The real magic happens when you pair a single button press with automation. VoiceSnippets listens for specific trigger phrases and executes pre-defined actions. 

Here is how that works in practice. When I want to spin up a project in Visual Studio Code, I press Button 2 and say "Start development". 

VoiceSnippets interprets that and runs the following configuration:

```json
{
  "id": "492188f5-4ddd-4f12-ba02-37b1a72eaa36",
  "trigger_word": "start development",
  "expansion": "<delay Cmd+Shift+Pms> → Focus terminal view → <Enter> → <delay 1000ms> → npm run dev → <Enter>",
  "command_type": "Workflow",
  "category": null,
  "aliases": [],
  "workflow_steps": [
    { "step_type": "shortcut", "value": "Cmd+Shift+P" },
    { "step_type": "text", "value": "Focus terminal view" },
    { "step_type": "key", "value": "Enter" },
    { "step_type": "delay", "value": "1000" },
    { "step_type": "text", "value": "npm run dev" },
    { "step_type": "key", "value": "Enter" }
  ],
  "app_filters": [
    { "id": "com.microsoft.VSCode", "name": "Code" }
  ]
}
```

{{< caption-new "/uploads/2026/03/start-development-command.webp" "VoiceSnippet: Start development command configuration" >}}

This sequence opens the VS Code command palette, focuses the terminal view, waits a second to ensure the terminal is ready, and then types and runs `npm run dev`. 

I also use text expansion with variables. For example, checking out a git branch:

```json
{
  "id": "474bf19d-938f-4893-bfe2-390990bd7c17",
  "trigger_word": "branch {name}",
  "expansion": "git checkout {name}",
  "command_type": "TextExpansion",
  "category": null,
  "aliases": [],
  "workflow_steps": null,
  "app_filters": []
}
```

{{< caption-new "/uploads/2026/03/voicesnippets-branch-command.webp" "VoiceSnippet: branch command" >}}

If I say "branch dev", VoiceSnippets automatically expands it to `git checkout dev`.

## A real-world workflow

When I am answering questions or being interviewed by an AI tool like Ghostwriter, the seamless nature of this setup really shines. Here is the exact loop:

1.  I hold down **Button 1** (Handy).
2.  I speak my answer out loud.
3.  I release **Button 1**.
4.  I tap **Button 3** (Enter).

Handy transcribes the text directly into the prompt box, and the Enter button submits it. I can do this process over and over while leaning back in my chair. I do not have to touch my mouse or look down at a full keyboard. I just press the button and talk. 

## The takeaway

It is remarkably faster to have dedicated physical inputs for voice triggers. Once muscle memory sets in, you never have to look down—you just know the button is exactly where it needs to be, and it will work every single time. 

If you spend a lot of time writing, prompting, or executing repetitive terminal commands, I highly recommend exploring a voice-driven approach. Start using your voice today!

Let me know what you think.

## Resources

*   **[VoiceSnippets](https://github.com/estruyf/VoiceSnippets)** - My custom app for macOS voice automation.
*   **[Handy](https://handy.computer)** - The AI transcription tool I use for dictation.
*   **[SinLoon Mini Programmable Mechanical Keyboard](https://www.amazon.de/-/en/dp/B0GC97ZT4M)** - The hardware powering the 3-button setup.

---

{{< blockquote type="note" text="This article was created using the [Ghostwriter for VS Code](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-ghostwriter)." >}}