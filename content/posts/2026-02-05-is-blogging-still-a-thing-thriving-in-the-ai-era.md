---
title: "Is blogging still a thing? Thriving in the AI era"
longTitle: ""
slug: "/blogging-thriving-ai-era/"
description: "Explore the future of blogging in the AI era and learn how to thrive with authenticity and strategic content creation."
date: "2026-02-05T14:01:59.618Z"
lastmod: "2026-02-05T14:02:00.148Z"
preview: "/social/57b70dcd-13cc-47dd-88f9-825cb31a3032.png"
draft: false
comments: true
tags:
  - "Blogging"
  - "AI"
  - "Writing"
  - "Content Creation"
  - "Ghostwriter"
type: "post"
fmContentType: "post"
---

Let’s address the elephant in the room immediately: **Is blogging still a thing?**

With the rise of Large Language Models (LLMs) and generative AI, the internet is flooded with content. You might be wondering if it's worth investing hours into writing a post when a bot can generate a 1,000-word article in seconds, or when users can just ask ChatGPT for an answer instead of visiting your site.

The short answer is: **Yes, it still matters.**, but the *way* we blog, the *reason* we blog, and *who* is reading our blogs has changed firmly.

I love blogging. It helps me clarify my thoughts and share knowledge. However, my approach has evolved. I’ve stopped fighting the AI wave and started surfing it, using it to amplify my voice rather than replace it. Here is the reality of blogging in 2026 and how you can adapt.

## The reality check: where did the humans go?

If you have looked at your analytics lately, you might have noticed a trend: human traffic is dipping, but "visitor" numbers might be steady or even rising. If you dig deeper, you’ll realize those aren’t people. They are bots.

Specifically, they are AI crawlers.

I recently checked my Cloudflare logs, and the activity is undeniable. My site is being crawled heavily by agents like `ChatGPT-User` (OpenAI), `PetalBot` (Huawei), and `Meta-ExternalAgent`.

Here is a snapshot of what that traffic looks like on my end (the last 24 hours):
*   **ChatGPT-User:** 2.22k requests
*   **BingBot:** 499 requests
*   **Meta-ExternalAgent:** 498 requests

{{< caption-new "/uploads/2026/02/crawl-bots.webp" "Cloudflare - AI Crawl Control" >}}

If I dig deeper, for the `ChatGPT-User` agent, I can see that the most requested pages are my review posts.

{{< caption-new "/uploads/2026/02/chatgpt-most-crawled.webp" "Most crawled pages by ChatGPT" >}}

{{< blockquote type="info" text="Cloudflare also offers managed `robots.txt` and bot blocking features, so you can decide how much of that traffic you want to allow or stop. It is worth noting that some bots have been caught bypassing `robots.txt`." >}}

### The shift in consumption

In the past, a user would search for a problem, click your link, read your tutorial, and maybe leave a comment. Today, an AI model scrapes your content, ingests the knowledge, and summarizes it for the user directly in a chat interface.

This drives users away from your site. It is a harsh reality.

We saw ta brutal example of this recently with **Tailwind CSS**. Auhenticity and community are vital, but for businesses relying on documentation traffic, AI can be devastating. [Adam Wathan](https://adamwathan.me/), the creator of Tailwind, noted in a GitHub discussion that traffic to their documentation dropped **40%** from early 2023, despite the framework being more popular than ever. This loss of direct traffic contributed to significant layoffs because the docs were the primary funnel for their commercial products. Blogs and product documentation are not the same, but the principle remains: if AI can answer your users' questions without them visiting your site, your direct relationship with your audience weakens.

{{< blockquote type="note" text="Read more about it in the [Tailwind CSS Discussion](https://github.com/tailwindlabs/tailwindcss.com/pull/2388#issuecomment-3717222957)" >}}

## The problem with "AI slop"

Because AI is eating up traffic, many creators have responded by using AI to churn out mass content to game the system. You have seen these posts. They are soulless.

*   They overuse emojis 🚀✨
*   They use dashes and bullet points for everything.
*   They adopt weird fads, like writing entire articles in lowercase.
*   The prompt was clearly just: *"Hey AI, write a post about X."*

As a reader, when I encounter this, I stop reading immediately, certainly when text is written in all lowercase. My mind cannot focus on it. It breeds distrust. If you didn't care enough to write it (or at least structure the thought), why should I care enough to read it?

{{< blockquote type="important" text="The second part is most important. You need to give your thoughts, your content, and your ideas. Make it authentic!" >}}

**Authenticity is your only moat.** The specific reason my reviews are currently my most-read content is that they are deeply personal, subjective, and based on real-world testing, things AI cannot fully fake yet (or maybe it can).

## A new workflow: interviewing myself

So, how do we balance efficiency with authenticity? I don't write entirely manually anymore, but I also never let AI write from scratch.

My secret weapon is **getting interviewed by AI** (not so secret anymore).

I use a tool called **Ghostwriter**. It started as AI agents, evolved into an Electron app, and now includes a VS Code extension. Instead of staring at a blank page, I initiate an interview session. That way, I get to speak my thoughts out loud, and the AI captures them. It are my words, my voice, and my opinions, but structured by AI.

### How it works:

#### The interview process

- I tell the AI the topic I want to cover (e.g., "Is blogging still a valid career?").
- The AI acts as a journalist. It asks me 10 to 50 specific questions depending on the depth required.
- I answer these questions.
- Once the interview is complete, a transcript is available for the writer agent to process.

#### The writing process

- Once the interview is complete, I assign the transcript to the writer agent. 
- It compiles my answers into a structured blog post.
- From the draft, I can ask to do further refinements, like adding an introduction, conclusion, or formatting code blocks.

{{< blockquote type="important" text="This distinction is critical: **It is my input, my voice, and my thoughts.** The AI is simply doing the heavy lifting of structure and grammar. It isn't researching the topic for me; it's organizing *my* research." >}}

## To block or not to block?

Given that bots are scraping our content and lowering our direct traffic, should we block them?

It depends on your goal.

### Scenario A: the passion blogger

If blogging is a hobby, a personal brand play, or a way to learn (like it is for me), **let the bots scrape.**

I am not going to block AI bots. I believe my content provides value, and if that value reaches a user via ChatGPT or via my website, I am generally okay with that. My goal is to share knowledge. I've been blogging since 2010 and I know that blogging is not going to generate a source of income for me directly. It is a way to build my personal brand, share knowledge, and connect with like-minded people.

### Scenario B: the business

If your blog is your product, like the Tailwind documentation, you need to be strategic. If AI is answering your customers' questions without them ever seeing your product pitch, your business model is bleeding.

In this case, you are not being hostile to progress by blocking bots in your `robots.txt`; you are protecting the direct relationship with your audience that keeps your lights on.

## The verdict

Blogging is not dead, but the era of "content farming" is over.

If you want to blog in 2026:

1.  **Make it YOURS.** Authenticity is the only thing AI cannot replicate.
2.  **Go Shorter.** People (and bots) want concise info. You don't always need a 2,000-word essay.
3.  **Use AI as a tool, not a creator.** Let it interview you. Let it format for you. Do not let it think for you.
4.  **Diversify traffic.** You could build an email list, show up on social, and encourage direct visits. Organic search is less reliable now.
5.  **Build a community.** Engaged readers matter more than raw traffic. Reply, ask questions, and create a place for people to gather.
6.  **Build in public.** Show your work, share decisions, and invite feedback. That kind of transparency is hard to fake with AI.
7.  **Check your stats.** Know who is reading—humans or machines—and decide if you need to protect your content.
8.  **Blog to support, not replace, your brand.** You won't build a personal brand through blogging alone. Combine it with speaking, building products, or creating tools. My blog supports my conference talks and Demo Time work—it's part of the ecosystem, not the whole thing.

I still learn best by writing. I write to clarify my thinking. If that's why you blog, keep going. The bots can watch, but they can't replace the human spark.

---

### Resources

*   [Ghostwriter for VS Code](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-ghostwriter) - The extension I use for AI interviewing.
*   [Ghostwriter Agent Definitions](https://github.com/estruyf/ghostwriter-agents-ai/blob/main/agents/interview.ghostwriter.md) - The specific "Interview" agent I use.
*   [How I get interviewed by AI](https://www.eliostruyf.com/interviewed-ai-write-blog-posts/) - My detailed guide on this workflow.
*   [Tailwind CSS Discussion](https://github.com/tailwindlabs/tailwindcss.com/pull/2388#issuecomment-3717222957) - Commentary from Adam Wathan on the impact of AI on documentation traffic.
*   [Cloudflare - How to block AI crawlers](https://www.cloudflare.com/learning/ai/how-to-block-ai-crawlers/) - Guide on blocking AI crawlers with Cloudflare.

---

{{< blockquote type="note" text="This article was created using the [Ghostwriter for VS Code](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-ghostwriter)." >}}