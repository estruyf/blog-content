---
title: "My evolving relationship with AI in development"
longTitle: ""
slug: "/evolving-relationship-ai-development/"
description: "Explore my journey with AI in development, from prompt engineering to collaborative coding, and discover the future of AI-assisted programming."
preview: "/social/7a6e64fc-0093-42f7-a581-1de969ad511f.png"
date: "2025-12-01T08:30:21.662Z"
lastmod: "2025-12-01T08:30:22.777Z"
draft: false
comments: true
type: "post"
fmContentType: "post"
tags:
  - "AI"
  - "Automation"
  - "Development"
  - "GitHub Copilot"
---

I get this question a lot: "How do you use AI in your development workflow?" At the start of this year, everyone was talking about prompt engineering. You had to be very clear in your prompts, create good prompts, be or become a prompt engineer. I don't believe in that anymore. Well, not entirely.

Don't get me wrong, good prompts are still valuable, but the game has changed. AI has become so much better that even when you don't give enough context, it will do a pretty good job at creating what you want. And if it doesn't? You iterate. You refine. You collaborate.

This is the story of how my workflow evolved from writing comments for code to treating AI as a team member.

## The early days: comment-driven development

I've been using GitHub Copilot since the early beta version. Back then, development was straightforward: you opened a file, wrote code, and figured out how everything worked. When Copilot came along, you had to write comments to get code generated. Something like:

```typescript
// Create a function that fetches user data from the API
// and returns the user's name and email
```

And Copilot would generate the function for you. It was like, "whoa, this is already an improvement!" But it wasn't life-changing. Not yet.

## The shift: from listening to predicting

The moment everything changed was when Copilot started doing suggestions proactively. You were writing code, and all of a sudden you got auto-completions that made sense. It wasn't just listening to your commands anymore, it was predicting what you wanted to do next.

I still remember the moment I copied a variable, and Copilot already knew what I was going to do with it in another file. It predicted: "Before you were writing this function, so you probably want to use this variable here, and this is going to become the output." That was a really nice improvement to the flow because it made things much easier.

The progression looked something like this:

1. **Listening** - You tell it exactly what to do (comments)
2. **Predicting** - It anticipates your next moves (smart auto-completions)
3. **Agentic** - It takes on tasks and runs with them (the current state)

## The agentic mode: AI as a team member

Nowadays, AI can just do whatever you want. It can run as an agent where you prompt it, and it's going to write code or create a whole application for you. This is the big change that happened over the last couple of months.

Instead of crafting one perfect prompt, I now approach AI collaboration like I would with a junior or medior developer on my team. Here's how that works in practice:

### Step 1: The junior developer (initial prompt)

I start with a simple, high-level prompt. For example:

> Create me a dashboard with React and Tailwind CSS. The data I want to show is the session name, the description, and a link to the management page. Besides that, you also need to create a backend to fetch all the necessary data.

That's it. No 20-minute specification. Just a clear goal.

### Step 2: The medior developer (iterate and refine)

As the agent works, I watch its progress. And then I think: "It would be useful to have the session ID there, to show the speaker, to do XYZ." So my next prompt becomes:

> The backend you created, can you also add a couple of other properties to the API, like `sessionId` and `speakerDetails`, so this data can be shown on the session cards?

This approach is much quicker for me. I can quickly think about what I need, see the outcome, and refine. Instead of taking 20 minutes to fully spec it out upfront and then still having issues or ideas like "I could actually do it differently."

### Step 3: The senior developer (code review)

This is where I come in. I perform a thorough code review of what the AI delivers. This step is non-negotiable.

{{< blockquote type="info" text="You can also add an extra AI tool for code reviews, and they do a really good job. I wrote about this in: [My AI Code Review Journey: Copilot, CodeRabbit, Macroscope](https://www.eliostruyf.com/ai-code-review-journey-copilot-coderabbit-macroscope/)." >}}

A couple of weeks ago, I was working with an Azure Function and Table Storage. The AI wrote me a SQL statement. I don't have SQL in my application. I don't even know where it came from. The AI understood the goal, retrieve the speaker and session data, but completely hallucinated the method. It was thinking about SQL databases instead of Azure Table Storage.

If I didn't review that code and just blindly accepted it, things would have failed in my development environment. At the moment, AI still has some hallucinations, but it's becoming better and better because it has more context around the whole application. It basically lives in your code, so it knows probably more than you do about where everything is.

{{< blockquote type="important" text="Human oversight is indispensable. AI understands the *what* but sometimes fails on the *how*." >}}

## Spec it out for larger projects

For simple tasks, the iterative approach works great. But for bigger applications, I believe in spec'ing it out first. This is something we're seeing with tools like [GitHub Spec Kit](https://github.com/github/spec-kit) where you can spec out your project, take the time to think everything through, and then start working with an AI to implement features.

The idea is: once you have the specification, you hand it over to an AI agent. From that point, you evaluate the outcome. Is it good? What do we need to change? But there's always a person who needs to come into the picture for that code review.

## Why now is the best time to become a developer

I believe the time to learn how to develop is right now. All these AI tools like Copilot, Gemini, Claude, and others, they all spit out code. But if you don't understand it and blindly accept it, you never know what's going to production.

At the same time, it's a really nice time to become a developer. It's so easy to get started because you can begin without much knowledge. You can learn from prompting, creating solutions, seeing the outcome, and then start learning the tech from there. Start understanding what the AI agent is writing.

Even low-code/no-code platforms are shifting. With Power Apps on the Power Platform, their new vibe-coding offering, [Vibe - Power Apps](https://vibe.powerapps.com), is generating React code. You need to understand React to make sure your application is production-ready (or have confidence in the generated code).

{{< blockquote type="info" text="Understanding code is more valuable than ever. AI lowers the barrier to entry, but comprehension remains essential." >}}

## What's next: chained agents and workflows

Where does it go from here? We're already in that agentic mode where you give tasks to an agent. But we're starting to see workflows emerge: if Agent A does this and gives the outcome to Agent B, then we get a final solution.

For instance, you could give a development task to a development agent. Once it's done, it passes over to a review agent that does a security assessment. These fully automated flows are coming (some platforms already support it), with minimal human interference.

As AI gets smarter with less context, it will become even faster at achieving what you didn't even know you wanted to achieve. Its predictability and understanding of how things work is already a couple of steps ahead of what you're currently doing.

My role, and I think the role of many developers, is shifting towards higher-level planning, architecture, robust code review, and our creativity. The creative problem-solving and critical thinking remain irreplaceable.

## A note on context and documentation

In this fast-moving field, having access to current documentation is vital. For my agents, I use services like [Context7](https://context7.com/). Their MCP server helps LLMs and AI code editors access up-to-date documentation, which significantly improves the accuracy and relevance of AI-generated code.

---

I will try to review this post in a couple of weeks or months, or when I see a change in my behavior using AI, to keep it updated with my evolving workflow.

---

{{< blockquote type="note" text="This article was written with [Gemini CLI](https://github.com/google-gemini/gemini-cli) and [speedgrapher](https://github.com/danicat/speedgrapher), demonstrating how AI tools can also enhance the writing process itself." >}}
