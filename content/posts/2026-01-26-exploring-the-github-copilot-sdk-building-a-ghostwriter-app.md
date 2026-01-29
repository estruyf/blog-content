---
title: "Exploring the GitHub Copilot SDK: Building a Ghostwriter App"
longTitle: ""
customField: ""
slug: "/exploring-github-copilot-sdk-building-ghostwriter-app/"
description: "Discover how to build a Ghostwriter app using the GitHub Copilot SDK and streamline your AI integration for technical content creation."
date: "2026-01-26T10:10:06.550Z"
lastmod: "2026-01-26T10:10:07.093Z"
preview: "/social/a2f09ad5-bc07-4075-8ad2-0ff029304edf.png"
draft: false
comments: true
tags:
  - "AI"
  - "Astro"
  - "Electron"
  - "GitHub"
  - "GitHub Copilot"
type: "post"
fmContentType: "post"
---

As a developer, I am always curious about how to optimize my workflow, especially when it comes to writing technical content. That was part of the reason I started to create the [Ghostwriter Agents for AI](https://github.com/estruyf/ghostwriter-agents-ai). One of the things I tried to take it a step further was to build a "Ghostwriter" application, but I never got around to finishing it. The reason was the AI layer. Should I build my own? Use an existing API?

With the release of the [GitHub Copilot SDK](https://github.blog/news-insights/company-news/build-an-agent-into-any-app-with-the-github-copilot-sdk/) I decided to revisit that idea. This artilce is the story of how I used the SDK to finally build my Ghostwriter app, and the lessons I learned along the way.

## The challenge: seamless AI integration

My goal was simple. I wanted an application that could act as an interviewer, asking me questions about a topic, and then use my answers to draft a post.

I already had the prompts ready in my [Ghostwriter Agents AI](https://github.com/estruyf/ghostwriter-agents-ai) project:
1.  **Interviewer:** A persona that digs into the topic.
2.  **Writer:** A persona that takes the interview context and generates the article.

The missing piece was the "glue." In my previous attempt, managing the AI context and API calls was a headache. I wanted something seamless, where I could just use what is already available in the ecosystem without reinventing the wheel.

## Starting with Astro

I must admit, when I first looked at the Copilot SDK, documentation was a bit scarce. There were some videos, but not many concrete samples. But hey, that’s part of the fun of the job, right? The best way I learn is by starting a new project.

I spun up a new [Astro](https://astro.build/) project. My plan was to create a simple website with an API that communicated with the Copilot CLI.

Here is the cool part: I actually used GitHub Copilot to write the integration code for me. I pointed it to the [GitHub Copilot SDK - Getting started](https://github.com/github/copilot-sdk/blob/main/docs/getting-started.md) page in the documentation, and it scaffolded the connection almost perfectly. All I had to do was review it to understand how the data flowed.

{{< caption-new "/uploads/2026/01/ghostwriter-website.webp" "Ghostwriter as an Astro website"  "data:image/jpeg;base64,UklGRoYAAABXRUJQVlA4WAoAAAAQAAAACQAACAAAQUxQSCkAAAABLyAkIP6PlPzgRkTEnMFA2ya7AzQ8OHgwgAX8C8JBRP9jkpyA+rbtBQBWUDggNgAAAPABAJ0BKgoACQABQCYljAJ0AQ8DBViJAAD+/loqpNhofflH0vAK+YM6qFGoxnO20Qxj5OnAAA==" "4116" "3500" >}}

## The pivot to Electron

The Astro prototype worked great for the interview logic, but I hit a snag when I thought about distribution.

The Copilot SDK relies on communicating with the Copilot CLI. If I hosted this as a web app, the backend wouldn't have that local CLI connection. I needed this to run locally on the user's machine.

I initially thought, "Perfect, I'll build a Tauri app!" I love working with Tauri, and it seemed like a natural fit. Unfortunately, the SDK doesn't support Rust just yet. So, I decided to move the project to **Electron**.

{{< blockquote type="tip" text="When writing this blog, I found out that ther is a community project available: [copilot-sdk (Rust)](https://github.com/copilot-community-sdk/copilot-sdk-rust)" >}}

## Solving the packaging puzzle

Moving to Electron solved the runtime issue, but it introduced a new one: packaging. When I tried to bundle the application, the communication with the Copilot CLI kept failing. It was one of those "it works on my machine" moments that drives you crazy.

That is when I discovered a feature that saved the project: the **Copilot CLI Server**.

Instead of relying on the default environment integration, you can manually start the Copilot CLI in server mode on a specific port.

```bash
copilot --server --port 4321
```

Once that server is running, you can tell the SDK exactly where to look. Here is how I configured the client in my Electron app:

```typescript
import { CopilotClient } from "@github/copilot-sdk";

// Connect to the local CLI server
const client = new CopilotClient({
    cliUrl: "localhost:4321"
});

// Use the client normally to start the interview session
const session = await client.createSession();
```

By spawning the CLI server when the Electron app starts, I established a reliable bridge between my UI and the AI.

## The result

With the connection fixed, the app now works exactly as I imagined. It runs the "Interviewer" agent to gather my thoughts, passes that context to the "Writer" agent, and generates a draft. All powered by the Copilot account I'm already signed into.

Don't get me wrong, it's still an early version, but the friction of "building the AI" is completely gone. I can focus entirely on refining the prompts and the user experience.

{{< caption-new "/uploads/2026/01/ghostwriter-app.gif" "The Ghostwriter app" >}}

## Conclusion

The GitHub Copilot SDK is a game-changer for developers looking to integrate AI into their applications without the overhead of managing authentication, AI, and API complexity. My journey from a stalled project to a working Ghostwriter app in Electron is proof of that.

What impressed me the most was how smoothly things came together once I understood the core concepts. The SDK abstracts away the messy parts like token management, session handling, streaming responses. It leaves you free to focus on your prompts and user experience.

If you're sitting on an idea that needs AI capabilities, the Copilot SDK removes one of the biggest barriers to entry. No need to negotiate with multiple API providers or implement your own LLM infrastructure. Just point to your local CLI, define your prompts, and build.

The journey wasn't completely frictionless. The initial documentation gap and the Electron packaging hurdle taught me a thing or two, but those are the kinds of challenges that are good to think out of the box, use your creativity, or GitHub Copilot to get it solved.

Let me know what you think if you give the SDK a try.

## Resources

*   [GitHub Copilot SDK](https://github.com/github/copilot-sdk)
*   [Ghostwriter App Repository](https://github.com/estruyf/ghostwriter-app)
*   [Ghostwriter Agents AI](https://github.com/estruyf/ghostwriter-agents-ai)

---

{{< blockquote type="note" text="This article was created using the [Ghostwriter app](https://github.com/estruyf/ghostwriter-app)." >}}