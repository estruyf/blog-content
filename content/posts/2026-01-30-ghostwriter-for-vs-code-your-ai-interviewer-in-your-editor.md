---
title: "Ghostwriter for VS Code: your AI interviewer in your editor"
longTitle: ""
slug: "/ghostwriter-code-ai-interviewer-editor/"
description: "I am releasing a new VS Code extension that brings the Ghostwriter interview experience directly into your editor, helping you write authentic content faster."
date: "2026-01-30T10:08:05.598Z"
lastmod: "2026-01-30T10:08:06.093Z"
preview: "/social/eca809b4-eaf7-4c71-8c83-ba1f69acf209.png"
draft: false
comments: true
tags:
  - "VS Code"
  - "AI"
  - "GitHub Copilot"
  - "Writing"
  - "Productivity"
type: "post"
fmContentType: "post"
---

Last week, I was experimenting with the [GitHub Copilot SDK](https://github.blog/2023-10-18-github-copilot-extensions-public-beta/) to see how to use it within an Electron app. That experiment led to the creation of the standalone [Ghostwriter App](https://github.com/estruyf/ghostwriter-app). But as I was building it, I realized something important. 

Why leave the editor?

Most of us live in **Visual Studio Code**. Switching context to a separate app just to draft a blog post feels like friction we don't need. So, I decided to minimize that friction.

{{< caption-new "/uploads/2026/01/ghostwriter-vscode.webp" "Ghostwriter for VSCode"  "data:image/jpeg;base64,UklGRsAAAABXRUJQVlA4WAoAAAAQAAAACQAABwAAQUxQSC4AAAABN6CgbRuGP8q+4VhoRESg5wCKIklqLiiIBuIbC1jBvxEcRPQ/NjMfA8D5CBG5VlA4IGwAAADwAQCdASoKAAgAAUAmJZQCdAEPEP56egAA/pq3/orRvd/7vT8KPT2Z2lLfag3bo5Mv7/7zcn4bWE2MyY7D2fwX/45+ynKh/+lTObUa8hYe8GZo51Q4tL21wZiw8niJCPDWXOFhzmODKwDgAAA=" "4116" "3400" >}}

In this post, I want to introduce you to the **Ghostwriter for VS Code** extension. It brings the concept of "interview-based writing" directly into your favorite editor, leveraging the GitHub Copilot Chat API without needing the CLI or complex SDK setups.

## The problem with AI writing

We have all seen *that* kind of AI content. You know the type of content, it sounds smart but says nothing useful. That's what you get when AI writes for you instead of with you.

The standard workflow usually looks like this:
1.  Open ChatGPT or Copilot.
2.  Type: "Write me a blog post about React hooks."
3.  Get a wall of text that sounds like everyone else.
4.  Spend an hour rewriting it to sound like you.

I wanted to flip this script.

AI-assisted writing works best when it acts as your **interviewer**, not your ghostwriter. 

## Enter Ghostwriter for VS Code

The core philosophy behind the entire [Ghostwriter ecosystem](https://github.com/estruyf/ghostwriter-agents-ai) is simple: **You are the expert.** The AI's job is just to get the information out of your head and organize it.

Instead of prompting an AI to generate content from thin air, Ghostwriter facilitates a conversation. It asks you thoughtful questions to draw out your unique insights, experiences, and specific examples. Then, and only then, does it structure those answers into a polished draft.

And now, you can do this right inside VS Code.

### How it works

I already integrated similar chat-based functionality into [Front Matter CMS](https://frontmatter.codes/), so extending this logic to a dedicated extension felt like a natural progression.

Here is how the workflow looks in practice:

1.  **Open the Extension:** You start a new session within VS Code by using the `Ghostwriter: Open Ghostwriter` command.
2.  **The interview:** The extension (powered by GitHub Copilot) starts asking you questions based on the topic you want to cover.
3.  **Your answers:** You answer casually, just like you are talking to a colleague. You share your war stories, your code snippets, and your opinions.
4.  **The writing:** Once the interview is done, you can use the transcript to generate a draft blog post, article, or documentation.

The result isn't a generic AI article; it's **your** article, organized by AI. It solves the "blank page" problem without sacrificing authenticity.

{{< caption-new "/uploads/2026/01/ghostwriter-homepage.webp" "Ghostwriter extension homepage"  "data:image/jpeg;base64,UklGRoQAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCgAAAABJyAkIP6PlPzgRkTEZFAIyQp1z6CPwZsEUsjfK4WI/sfYPgHxdmYuVlA4IDYAAADQAQCdASoKAAYAAUAmJZQCdAEOPANYAAD+/rjTvlGqXztl3JUQSh1995K7ZPjK2UCesRbgAAA=" "4116" "2366" >}}

#### The interview process

{{< caption-new "/uploads/2026/01/ghostwriter-interview.webp" "The interview process"  "data:image/jpeg;base64,UklGRoYAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCgAAAABJyAkIP6PlPzgRkTEZFAIyQp1z6CPwZsEUsjfK4WI/sfYPgHxdmYuVlA4IDgAAADQAQCdASoKAAYAAUAmJQBOgCPw4GTLwAD+/k2ncDmHw6MfoArHzPXz3PVncQRivMGliRhF3ygAAA==" "4116" "2366" >}}

#### Writing the draft

{{< caption-new "/uploads/2026/01/ghostwriter-draft.webp" "The generated draft"  "data:image/jpeg;base64,UklGRogAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCgAAAABJyAkIP6PlPzgRkTEZFAIyQp1z6CPwZsEUsjfK4WI/sfYPgHxdmYuVlA4IDoAAADQAQCdASoKAAYAAUAmJQBOgCICis5skAD+/pH64akELjotUOGpTd8Tnp/bSRroY8b63Y6NzStmaAAA" "4116" "2366" >}}

## Building the extension

Technically, building this was a fun challenge. I wanted to showcase how you can use GitHub Copilot's capabilities from an extension without actually requiring the heavy lifting of the [GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli) or the full SDK for every little interaction.

By tapping into the chat API provided to VS Code extensions, I could create a lightweight wrapper content creation workflow. It removes the need for you to manually manage agent files or prompts, you just experience the app.

For those interested in the code, or if you want to see how I handled the conversation flow, the project is open-source.

{{< blockquote type="info" text="You can find the source code and contribute to the project on GitHub: [Ghostwriter for VS Code](https://github.com/estruyf/ghostwriter-vscode)." >}}

## Why this matters

I wrote deeper about the philosophy of "interview-based writing" in a previous post: [How I was interviewed by AI to write blog posts](https://www.eliostruyf.com/interviewed-ai-write-blog-posts/). 

The gist is this: It is faster than writing everything from scratch, but it is far more genuine than pure AI generation. It captures your voice because the source material is literally *your voice*.

If you have valuable knowledge to share but struggle to structure it, this tool offers a middle path.

## Try it out

The extension is part of a growing ecosystem. If you prefer a standalone experience, you can still check out the experimental [Electron App](https://github.com/estruyf/ghostwriter-app). But for my daily workflow, staying in VS Code is king.

I am keen to hear what you think. Does being "interviewed" help you write better? Give it a spin and let me know.

**Happy writing!**

## Resources

*   **Ghostwriter Agents:** [github.com/estruyf/ghostwriter-agents-ai](https://github.com/estruyf/ghostwriter-agents-ai)
*   **Ghostwriter App (Electron):** [github.com/estruyf/ghostwriter-app](https://github.com/estruyf/ghostwriter-app)
*   **Original Article:** [How I was interviewed by AI to write blog posts](https://www.eliostruyf.com/interviewed-ai-write-blog-posts/)
