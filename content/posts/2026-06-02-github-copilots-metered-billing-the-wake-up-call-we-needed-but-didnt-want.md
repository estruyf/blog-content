---
title: "Metered Billing for GitHub Copilot: A Necessary Shift"
longTitle: "GitHub Copilot's metered billing: the wake-up call we needed (but didn't want)"
preview: "/social/c93507f2-d7e8-4eb4-8420-0799add52fab.png"
slug: "/metered-billing-github-copilot-shift/"
description: "Explore the implications of GitHub Copilot's metered billing and how it reshapes developer workflows and AI tool usage."
date: "2026-06-02T13:21:30.750Z"
lastmod: "2026-06-02T13:21:31.366Z"
tags:
  - "AI"
  - "GitHub"
  - "GitHub Copilot"
---

On June 1, 2026, GitHub Copilot switched to metered token-based billing, and developers threatened to leave. [The Register reported on the exodus](https://www.theregister.com/ai-and-ml/2026/06/02/github-copilot-users-threaten-exit-as-metered-billing-kicks-in/5249826). My own usage preview showed roughly €600 extra per month, and that was during a period when I was on holiday for part of the time. A normal month? Probably higher.

Here's the thing: I think this change is good. Not comfortable, not popular, but good. And if your immediate reaction is to rage-quit to another platform, I'd ask you to pause and consider what this moment is actually revealing about how we've been using AI tools.

## The subsidy is over

Let's be honest about what flat-rate Copilot was: a subsidy. Microsoft was eating the cost of running increasingly expensive models so we could spin up clones, update variables with Claude Opus 4.8, and treat every interaction like it was free. It wasn't free. Someone was paying. Now that someone is us, and suddenly we care about efficiency.

I saw an image circulating recently: someone using Opus 4.8 (one of the most expensive reasoning models available) just to rename a file with AI. That's the behaviour the old pricing model enabled. We opened chat, typed whatever came to mind, and didn't think about which model was running or whether the task warranted it. The meter changes that calculus immediately.

Is it frustrating? Absolutely. I'm not thrilled about the €600-per-month reality either. But the frustration is doing something valuable: it's forcing us to think about what we're asking the AI to do, and whether the tool we're using is the right one for the job.

## The value-vs-willingness gap

Here's where it gets complicated. The work that generated my €600 usage was probably worth more than €600. I'm not arguing it wasn't valuable. But "is it worth it" and "will you pay for it" are two different questions.

If you're a developer at an enterprise, this goes through a budget line. The company clears it, you keep working, life goes on. But if you're an individual working on side projects, open-source tools, or indie experiments? You're not paying €600 a month. You just aren't. Not out of your own pocket for something that doesn't generate revenue.

That's the segment this hurts most: the explorers, the maintainers, the people building things because they're curious or because a community needs it, not because there's a business case behind it. The meter doesn't care about your motivation. It only cares about tokens.

## What this should make us do

It's day two of the change as I write this, and I've already started shifting how I work. Not because I'm leaving Copilot (I'm not — I still have my Pro+ license), but because the context has changed and I need to adapt.

Here's what I'm exploring:

**Model selection matters now.** I used to have my chat set to `auto`, letting GitHub pick the model for me. That was convenient, but it also meant I had zero control over cost. Now I'm actively thinking about which models to use for which tasks.

GitHub's own documentation offers a helpful [comparison table](https://docs.github.com/en/copilot/reference/ai-models/model-comparison#recommended-models-by-task) that buckets models by task rather than by name. "Fast help with simple or repetitive tasks" (Claude Haiku 4.5, Gemini Flash). "General-purpose coding and writing" (GPT-5 mini, GPT-5.3-Codex). "Deep reasoning and debugging" (GPT-5.5, Claude Opus 4.7/4.8, Gemini 3.1 Pro).

The advice is to pick by task, not by model name. That seems obvious now, but how many of us were actually doing it before June 1?

Auto mode can still be useful if you want to explore, as [GitHub's documentation on auto model selection](https://docs.github.com/en/copilot/concepts/models/auto-model-selection) explains, but you're not in control. You're letting the tool decide, and that decision has a cost you're now responsible for.

**Instructions files need to shrink.** On projects where I had a `.github/copilot-instructions.md` file defined, I'm now thinking about splitting it into multiple agents and skills. For some projects, this has been a long overdue task. The meter gave me the excuse to finally do it.

Why does this matter? Because the instructions file can be a very large file, and now that we need to be careful about the number of tokens we send, the smaller the file the better. Having an agent or skill allows us to select the type of action we want to perform. With agents, you can also define the model to use, so you don't have to think about which model to use per task. When you select the agent, the model comes with it.

A tip I got from [Jan De Dobbeleer](https://github.com/JanDeDobbeleer), a fellow GitHub Star and creator of [oh-my-posh](https://ohmyposh.dev/), was about path-specific instructions. Instead of one monolithic `copilot-instructions.md`, you create one or more `.github/instructions/**/*.instructions.md` files, each with an `applyTo` glob in its front matter (for example `applyTo: "**/tests/*.spec.ts"`).

The instructions only load for files that match the glob, so the model pulls in the relevant guidance instead of the whole file on every interaction. This is exactly the kind of context hygiene the meter rewards. [GitHub's documentation on path-specific instructions](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results#path-specific-instructions) walks through the mechanic in detail.

**Other tools exist.** I'm exploring [Claude Code](https://www.anthropic.com/claude), not because I want to migrate, but to see how it compares and what I can get with my license.

## The reflexive-building problem, revisited

Back in February, I wrote about [whether we're killing indie development with AI](https://www.eliostruyf.com/killing-indie-development-with-ai/). The hook was the Xnapper clone: a tool I've paid for across every device, cloned by someone in about an hour, just because they could. The speed of building had outpaced the thinking. We were using AI to spin up things reflexively, without asking whether they should exist. Also the price of building and using AI was lower than the price of purchasing an existing tool, so we were incentivized to build instead of buy.

The metered billing change accidentally reintroduces the pause-before-you-build discipline I argued was missing. The cost friction everyone is angry about might be the thing that makes us stop and ask: is this worth building? Is this worth the tokens? That's not a bad question to be asking.

## What happens next?

If everyone switches to another AI tool like Claude, Cursor, or Windsurf, won't Microsoft and GitHub get worried? I think (or hope) they will. The strength of GitHub Copilot was never the models themselves. It was the deep integration across the entire platform: repos, Actions, pull requests, IDE, all in one place. That's sticky in a way a raw API key is not.

So either GitHub course-corrects toward clearer, more predictable pricing to win back the developers it pushed onto the meter, or the rest of the industry follows GitHub's lead and metered billing becomes the norm everywhere. Both are plausible. The point is that this feels like a moment in motion, not a settled endpoint.

For now, I'm treating this as an opportunity to rethink how I work. Not because I want to, but because the context demands it. And maybe that's exactly what we needed.

## Resources

If you're looking for a practical guide to the new billing model and how to optimize your usage, on the clwd.be site someone wrote an excellent breakdown: [GitHub Copilot goes metered](https://clwd.be/blog/github-copilot-ai-credits-june-2026/).

- [The Register: GitHub Copilot users threaten exit as metered billing kicks in](https://www.theregister.com/ai-and-ml/2026/06/02/github-copilot-users-threaten-exit-as-metered-billing-kicks-in/5249826)
- [GitHub Docs: AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison#recommended-models-by-task)
- [GitHub Docs: Auto model selection](https://docs.github.com/en/copilot/concepts/models/auto-model-selection)
- [GitHub Docs: Path-specific instructions](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results#path-specific-instructions)
- [Jan De Dobbeleer (GitHub)](https://github.com/JanDeDobbeleer)