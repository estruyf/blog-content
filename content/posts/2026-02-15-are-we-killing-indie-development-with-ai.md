---
title: "Are We Killing Indie Development with AI?"
longTitle: "The speed of building has outpaced the thinking: why we need a new moral standard for AI development"
slug: "/killing-indie-development-with-ai/"
description: "Explore the impact of AI on indie development and the need for a moral compass in coding. Are we sacrificing quality for speed?"
date: "2026-02-15T17:53:29.710Z"
lastmod: "2026-02-15T17:53:30.460Z"
preview: "/social/5f59a11b-79bb-48df-9b89-b8abc9ba3037.png"
draft: false
comments: true
tags:
  - "AI"
  - "Indie Dev"
  - "Opinion"
  - "Future of Coding"
type: "post"
fmContentType: "post"
---

I get this feeling a lot lately. I wake up with an idea, grab a coffee, open my editor, and thanks to the current generation of AI tools, I can have a working prototype before breakfast.

The barrier to entry for software development hasn't just been lowered; it's effectively been removed. We are in the era of "vibe coding," where natural language prompts turn into deployed applications in minutes. It is exhilarating. It is powerful.

But lately, I have started to wonder: **Are we killing indie development with AI?**

Don't get me wrong, I love these tools. I use [GitHub Copilot](https://github.com/features/copilot) and other LLMs daily. But I believe we have reached a tipping point where *the speed of building has outpaced the thinking part*. We are so focused on *how fast* we can build that we stopped asking *if* we should build.

{{< blockquote type="info" text="The speed of building has outpaced the thinking part." >}}

In this post, I want to talk about why we need a new "moral compass" for development in the AI age, and a potential solution to help us get there.

{{< blockquote type="important" text="I don't want to do any harm to any developer or their work. This is my own perspective and experience, feel free to disagree or make your own conclusions." >}}

## The speed trap

Five years ago, if you had an idea for a SaaS tool, say, a screenshot editor or a niche time-tracker,you had to sit down and plan. The friction of coding was a natural filter. You had to ask yourself: "Is this worth X hours of my life?"

Today, that cost is near zero. If you don't like the screenshot tool you're paying $15 a year for, you can prompt an AI to build a clone in an afternoon.

On the surface, this looks like freedom. But look a little deeper. That $15 tool you just cloned? It was likely built by another indie developer. Someone who spent months thinking about edge cases, designing the interface, writing documentation, and supporting users. By cloning it just because you can, you aren't just saving $15; you are actively devaluing the craft of independent software development and the livelihood of the person behind it.

If we all just clone everything we use, we completely commoditize the market. We create a sea of "good enough" AI-generated noise where no one can actually sustain a business.

{{< blockquote type="note" text="This screenshot tool is where I started to think about the impact of AI on indie development. I use [Xnapper](https://xnapper.com/) for years now, got a license for every device I own. Yesterday I saw somebody creating a clone, and mentioning it only took one hour to build. That is when I realized the true impact of AI on indie development and I started thinking about the broader implications." >}}

{{< caption-new "/uploads/2026/02/ai-tool.webp" "The tool is not the issue, it is the mindset" >}}

## The life of an indie developer in the AI age

Let me paint a picture that I think a lot of developers are starting to recognize.

You spend weeks, maybe months, building something. You think about the problem, you design the interface, you handle the edge cases, you support your users, you write the docs. You pour yourself into it. Then one morning, someone sees your product, opens their AI editor, and builds a "good enough" version in an afternoon. They ship it. Maybe they make it free, maybe they make it open source, maybe they just use it themselves and tell their friends, their community, their followers.

They did not steal your code. They did not copy your product. They just... rebuilt it. Close enough. Good enough. And now your product has competition that cost someone a few hours of prompting while it cost you months of your life.

But it does not stop there. A third developer sees that clone and thinks, "I can do this too, but I want it slightly different." So they prompt their own version. And a fourth. And a fifth. Each one is not a copy in the traditional sense. Nobody is violating a license. Nobody is stealing intellectual property. They are just building their own version that matches their use case.

It is a lot like art. You create a painting, something original, something you are proud of. Then somebody sees it and recreates it. Not a forgery, just their interpretation. But they have a bigger budget, a larger audience, better distribution. Suddenly their version is the one people see first. Others share that version instead of yours. This is what is happening a lot on social media with AI-generated content. The original creator is overshadowed by the faster, more accessible clone.

In the art world, we have a word for this erosion: it is called **devaluation**. In the software world, we are doing it at industrial scale, and we are calling it **innovation**.

I am not saying you should never build something that already exists. Competition is healthy, and sometimes a fresh perspective genuinely improves a category. But there is a difference between thoughtful competition and reflexive duplication. The question every developer should ask themselves is: **"If I know someone can clone my work in an afternoon, is it still worth building?"**

The answer, I believe, is yes, but only for the things that cannot be cloned in an afternoon. The deep domain knowledge. The community around your tool. The years of user feedback baked into every feature. The trust you have earned. Those are the things AI cannot reproduce with a prompt, and I definitely don't want to discourage people from building those things.

But you can only build those things if you commit to something long enough for them to develop. And that is the real danger of the current moment: not that AI makes building easy, but that it makes *abandoning* easy. Why invest years in one product when you can ship a new one every week?

## I am guilty of this too

I have no room to preach. I am right there in the trenches with you.

When I built **[Front Matter CMS](https://frontmatter.codes)**, it was way before the AI boom. I had to think deeply about the problem because the investment of time was massive. I looked at the market, saw a gap in Visual Studio Code, and built it because nothing else existed.

Compare that to recently. I built a set of cycling tools (never released by the way) for myself. Did similar tools exist? Absolutely. Were they better? Definitely. But I wanted to see how far I could get with AI. I treated it as a training exercise. In the end, I started paying for a tool called [Join](join.cc), which does the same thing, because it was better and I could focus on my actual work instead of maintaining a tool that was just "good enough" for me.

I did the same with **FrameFit**. I investigated the market a little, didn't see an exact match, and just started building.

There is a difference between building for education (learning how AI tools work) and releasing products that dilute the hard work of others. My worry is that we are blurring that line. We are shipping our "training exercises" as products, and it is making the ecosystem messy for everyone.

And I know this because I have been on both sides of it.

## What actually survives

Here is the thing that made me stop and reflect. I have projects on both sides of this line, and they feel completely different.

**[Demo Time](https://demotime.show)** is something I have been building for years. Not weeks, not weekends, years. It started because I was a conference speaker who kept running into the same problem: demos failing on stage. Nobody had built a proper solution inside Visual Studio Code, so I did. Over time, it grew because I kept showing up. I used it at conferences, talked to other speakers, iterated based on real feedback from people doing real presentations at events like Microsoft Ignite, GitHub Universe, and OpenAI DevDays. Today it has over 26,000 installations.

None of that came from code. The code is open source. Anyone can see it, fork it, or rebuild it. Someone could probably vibe-code a basic version in a weekend. But what they cannot replicate is twelve years of conference speaking that taught me what presenters actually need. You would need that experience, or a big company and budget behind you, to even come close. The relationships with the community, the trust that comes from being the person who shows up, year after year, and keeps making the tool better because you genuinely use it yourself. That is not something you can prompt into existence.

Compare that to FrameFit. I built it, I use it, and it works. But if it disappeared tomorrow, I wouldn't lose any sleep over it. Demo Time? That is like a child to me. I put my passion into it.

That contrast taught me something important: **AI cannot commoditize the human context around software.** Community, trust, domain expertise, showing up consistently over time. These are not features you ship. They are moats you build by caring about something longer than a weekend.

The developers who will thrive are not the fastest shippers. They are the ones who pair AI speed with human judgment. Who build communities, not just codebases. Who invest in trust, not just features. But that only happens if we slow down enough to think about what we are doing.

## The thinking process

We need to re-introduce friction into our process. Not the old friction of writing boilerplate code. That friction is gone, and good riddance. I am talking about the friction of *thinking*. The pause that forces you to examine your intentions before you act on them.

Before AI, "thinking" was mandatory. The cost of building was high enough that it naturally filtered out bad ideas. Now, that filter is gone, and thinking must be a conscious, deliberate choice. When I have an idea now, I am trying to force myself to pause before I open Visual Studio Code or prompt a new agent.

I try to run through these four questions:

1.  **What problem does this actually solve?** (Is it a real pain point, or just a cool feature?)
2.  **Does it already exist?** (Have I actually looked, or am I assuming I'm the first?)
3.  **If it exists, what is my unfair advantage?** (Why will mine be better? Is it just cheaper because I didn't verify the edge cases?)
4.  **Can I make the existing solution better instead of rebuilding it?**

That last one is crucial. If there is an open-source tool that does 80% of what you want, the "old" way was to contribute a Pull Request. The "AI way" often tempts us to just rebuild the whole thing from scratch because it feels faster.

But "faster" isn't always "better" for the community. And here is the irony: we could use AI itself for this thinking step. Instead of prompting an LLM to start building, prompt it to research what already exists first. Use AI for the thinking, not just the building.

## Introducing the "Product Moral Compass"
I don't expect AI platforms that allow you to vibe code to solve this for us. Their business model is predicated on you writing more code (read: prompts), not less. They want you to spin up new projects constantly. They have no incentive to say, "Hey, wait, this already exists."

Think about it: when was the last time you saw a developer advocate from one of these platforms demonstrate how to *contribute to an existing project* instead of building something new from scratch? Their marketing is all about speed, novelty, and the thrill of creation. Not about responsibility.

{{< blockquote type="info" text="Instead of marketing how quickly they can build the next screenshot tool, AI platforms could show how to contribute to an existing one." >}}

So, I started thinking: **What if we used AI to stop us from building with AI?** You could say that this is a paradox, but I think it is actually a necessary evolution of our responsibility as developers.

I am exploring the idea of a **Product Moral Compass Agent**.

Imagine a mandatory first step in your "vibe coding" workflow. Before you start generating code, you pitch your idea to this agent. It interviews you, not to judge you, but to make sure you are making an informed decision.

*   **You:** "I want to build a Chrome extension that organizes simple bookmarks."
*   **Agent:** "Okay, analyzing... I found 3 highly-rated open-source projects and 5 indie SaaS products that do exactly this. Here are the links, the pricing, and what each one covers. Do you still want to proceed?"

This agent would act as the "thinking partner" we are skipping. It could:

*   Perform deep market analysis in seconds.
*   Surface existing open-source repos you could contribute to instead.
*   Present paid alternatives with pricing, so you can see what $15 a year actually gets you.
*   Challenge your unique value proposition with honest questions.

If you still want to build it after that? Great. Go ahead and start coding. But at least you are making an informed, conscious decision rather than reflexively adding more noise to the world.

## The challenge

I am currently building this agent. The first version is available on GitHub: [Product Moral Compass Agent](https://github.com/estruyf/ghostwriter-agents-ai/blob/main/agents/product-moral-compass.ghostwriter.md). Yes, I am aware of the irony, I am proposing to build something new to stop people from building new things. But I ran it through my own four questions first, and nothing like it exists yet.

Once it is ready, I will share it openly so that any developer can use it as part of their workflow. Not as a gatekeeper, but as a guide. A thinking partner that helps you pause, research, and decide before you build.

In the meantime, here is what you can do right now: the next time you have an idea, spend ten minutes with your favorite AI tool and ask it to find every existing solution first. Check your own bank statements. Are you already paying for a tool that solves this? If so, respect that developer's work. Look at GitHub. Is there a repo that could use your help instead of your competition?

The time to learn is right now, but the time to *think* is also right now.

I want you to keep building. I want you to be prolific. But let's not let the ease of creation destroy the value of what we create.

**I am curious to hear your thoughts.** Is this gatekeeping, or is it a necessary evolution of our responsibility as developers? Let me know in the comments below.

---

{{< blockquote type="note" text="This article was created using the [Ghostwriter for VS Code](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-ghostwriter)." >}}