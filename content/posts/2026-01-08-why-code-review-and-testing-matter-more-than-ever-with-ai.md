---
title: "Why code review and testing matter more than ever with AI"
longTitle: ""
slug: "/code-review-testing-matter-ai/"
description: "Explore why code review and testing are essential in the age of AI to ensure quality and reliability in your development workflow."
preview: "/social/801819bc-a51a-4cde-a278-ea196554d9e3.png"
date: "2026-01-08T11:41:14.694Z"
lastmod: "2026-01-08T11:41:15.355Z"
draft: false
comments: true
type: "post"
fmContentType: "post"
tags:
  - "AI"
  - "code review"
  - "E2E"
  - "GitHub Copilot"
  - "testing"
  - "Playwright"
---

A couple of days ago, I posted a tweet that sparked more controversy than I expected. The message was simple: "Always review the code AI generates. Here's an example where it thought it was a good idea to add a hardcoded file path to load an image."

The responses? Let's just say not everyone was on board with my approach.

"Perhaps it is a better solution to write the code yourself in the first place? Microslop and other companies going all-in on 'AI' are soon to see it fail them completely, why waste time on it now?"

"Perchance, learn to program yourself. Get good, etc."

These dismissive comments became the catalyst for this post. Because here's the thing: those critics are missing the point entirely. This isn't about whether AI is "good enough" or whether we should use it at all. It's about how we adapt our workflows to work effectively with AI while maintaining the quality and reliability our users deserve.

## The hardcoded path that started it all

Let me tell you about the macOS notch app I built. I wanted a simple utility to show my currently playing music and GitHub Copilot premium request status in the notch area. There's one small problem: I don't know Swift. At all.

So I did what any developer in 2026 would do. I created a project plan and handed it over to [GitHub Copilot](https://github.com/features/copilot). Within a couple of hours, I had a working application. It ran perfectly on my Mac Mini. Everything loaded, the interface looked great.

Later that day, I switched to my MacBook. The app launched, but something was wrong. The images weren't loading. That's when I actually looked at the code.

```swift
func loadCopilotIcon() {
    // Multiple attempts to load icon
    let path = "/Users/eliostruyf/Developer/nodejs/DevNotch/assets/$2x32.png"
    // ... more hardcoded paths
}
```

There it was. A hardcoded file path. With my username. From my Mac Mini. The AI had generated code that worked perfectly in one context but failed completely in another.

{{< blockquote type="important" text="I didn't review the code because it worked, so I assumed it was all good. This was just for personal use, not production. But that mindset is exactly the problem." >}}

If this had been production code and I hadn't caught it during development, customers would have discovered the issue for me. And that's never a good look.

## What code review actually catches

Here's what I advocate at conferences/events/talks and what I failed to do myself: review AI-generated code. Not because AI is inherently bad, but because it doesn't always understand the full context of what you're building.

The hardcoded path issue required code review to catch. There were no tests yet. I discovered it by manually reading the code after the failure. But this brings up an interesting question: what if you don't have time to review every line? What if you're moving fast and the code "just works"?

This is where testing becomes your safety net.

## Testing as your AI safety net

I'll be honest. Even though everyone should review code, especially AI-generated code, people will still blindly accept what's created because "it just works." I've done it myself. We're all human, and we all take shortcuts.

Having good tests in place ensures everything that already works keeps working as intended. Tests don't get tired. They don't skip steps. They don't assume that because something worked yesterday, it'll work today.

Here's my testing approach:

1. Create use cases first
2. Create the solution from those use cases
3. Create end-to-end tests from the solution and use cases

For E2E testing, I use [Playwright](https://playwright.dev/). It gives me several critical capabilities:

- **Screenshot matching**: Verify that the UI looks exactly as expected
- **User flow validation**: Ensure buttons work and trigger the right actions
- **API verification**: Confirm that backend calls happen correctly
- **Change detection**: Catch unexpected modifications

{{< blockquote type="tip" text="When AI implements new features and changes pages or dashboards, if something new doesn't exist in your screenshots, the test fails. If AI accidentally deletes something (like a button) or creates duplicates, your tests will catch it." >}}

This is particularly powerful with AI-generated code. You're informed by tests that things changed, even if you didn't catch it during code review.

## How my workflow has evolved

I spend less time writing code these days. That probably sounds strange coming from someone who loves developing things, but it's true. Instead, I spend more time:

- Reviewing code
- Thinking about what I want AI to create
- Defining use cases and requirements
- Running tests and validating outcomes

I still write code myself when I can't explain to AI how to do certain things, or when I have it so clear in my head that it's faster to just write it. I still love developing things personally. But AI agents allow my creativity to take the lead, and I can do things much quicker.

{{< blockquote type="info" text="I wrote about my evolving relationship with AI in development in my post: [My evolving relationship with AI in development](https://www.eliostruyf.com/evolving-relationship-ai-development/)." >}}

## Understanding the fear

Those dismissive responses to my tweet? They didn't come from a place of technical superiority. They came from fear. And I get it. People are afraid AI will take over jobs. And yes, it will take over things. But that fear is causing some developers to dig in their heels rather than adapt.

Let me break down what I think is actually happening when developers react negatively to AI:

### Layer 1: Job displacement anxiety

This is the most visceral fear. You watch AI generate working code in seconds, and you think: "What does this mean for my career?" This hits junior developers especially hard. They're wondering if the traditional entry path into development is being automated away before they even get started.

### Layer 2: Loss of craft

Developers love the puzzle-solving aspect of programming. There's a worry that relying on AI will atrophy skills. That the profession becomes about prompt engineering versus actual engineering. There's an identity component here: if code generation becomes trivial, what makes a developer valuable?

### Layer 3: Quality and understanding concerns

This is more pragmatic. Developers who've debugged AI-generated code that looked plausible but was subtly wrong understand this fear. There's anxiety about teams adopting AI without understanding its limitations, leading to technical debt or security vulnerabilities.

### Layer 4: Economic uncertainty

Productivity gains mean companies might need fewer engineers. The bar for "good enough" code might drop, so non-developers can build what used to require specialists. This is a legitimate business concern, not just individual anxiety.

### Layer 5: The irony

Here's what I've observed: developers who actually integrate AI into their workflow, using [Copilot](https://github.com/features/copilot) or [Claude](https://www.anthropic.com/claude) for tedious bits while focusing on architecture, debugging, and genuinely hard problems, end up LESS afraid, not more. Fear seems highest among those who haven't found equilibrium with these tools.

{{< blockquote type="important" text="The 'just learn to code' mindset represents staying stuck in old methods while others embrace modern tools. It's driven by fear rather than practical evaluation." >}}

## The skills that will matter

Eventually, AI code will be perfect. Or close enough. But we'll still need to understand if it produces expected outcomes. We need to stay in control, and testing gives us that control.

Here are the skills and mindsets that will become most valuable:

### Creativity

This is the core fundamental skill. AI can write code, but it can't imagine the solution your users actually need. That comes from you.

### Systems thinking over syntax mastery

You need to understand what AI creates. Development and learning to develop is very important right now, but the focus shifts from memorizing syntax to understanding how systems work together.

### Taste and judgment

Can you make judgment calls on whether what's been created fits your current solutions, patterns, and architecture? Does it feel right? Does it align with your team's standards?

### Problem decomposition

Understanding business problems and formulating them into well-scoped tasks and use cases becomes critical. If you can't clearly define what you want, AI can't build it effectively.

### Debugging and verification

AI is getting better, but sometimes it can't do what humans can. You need full control over the environment your app is running in. You need to understand what's happening under the hood and figure out how to solve things when they go wrong.

### Communication and collaboration

The technical ceiling is rising for everyone, so differentiation happens elsewhere. Developers who can translate between business stakeholders and technical teams, mentor others, write clearly, and present well become force multipliers.

In my conference experience, the speakers who resonate aren't always the deepest technical experts. They're the ones who make complex ideas accessible.

### Comfort with ambiguity and continuous learning

The landscape is shifting fast. Clinging to a fixed skill set is risky. A mindset of "I'll figure it out" beats "I already know this" every time.

## Actionable advice for skeptical developers

If you're feeling anxious or skeptical about AI tools, here's my advice: pick one small, annoying task you've been putting off. Something tedious but not critical. Not your main project, not anything high-stakes. Maybe:

- Writing tests for a module you've neglected
- Converting old code to a newer pattern
- Drafting documentation
- Scaffolding a small utility script

The point isn't to be impressed. It's to get hands-on experience with what AI does well and where it falls short. Abstract fear thrives on imagination. Practical experience replaces it with calibration.

Here's what you'll find:

- AI gets you 80% of the way surprisingly fast
- You'll spend time fixing the last 20%, and that's instructive
- You'll start developing intuition for when to reach for AI and when to write code yourself
- You'll discover which prompts yield useful output versus confident nonsense
- You'll shift from "will this replace me?" to "how do I use this effectively?"

{{< blockquote type="note" text="Developers who struggle most either dismiss AI entirely without trying, or expect magic and get disillusioned. Developers who adapt fastest treat AI as a capable but flawed collaborator, useful for first drafts, brainstorming, and grunt work, while keeping their own judgment in the loop." >}}

## The organizational reality

When I talk about testing at companies, I actually get no pushback. People already know they need to test. They acknowledge testing is important. They recognize they need to do this for their solutions.

The real problem isn't resistance to the idea. It's taking the time to actually start doing it. It's the problem of procrastination: "We are going to do this later." Pushing it down the road instead of implementing it now.

The companies that have successfully made this shift? Most were already using E2E tests. Specifically, the companies I work for already had E2E tests because I implemented them. These companies had a much quicker and easier start when adopting AI during their development lifecycle.

For them, it wasn't really a change because everything was already there. Having tests in place BEFORE adopting AI made the transition smooth. The safety net was already built.

## Start embracing, learning, and using it

We should **NOT** be afraid of AI. We should embrace it, learn to use it, and get used to it. If we stay stuck in old routines, others will overtake us.

Use your strengths. Use your creativity to come up with solutions. And most importantly, start doing what we've always advocated: testing.

Write use cases. Develop end-to-end tests to validate your solutions keep working. Know what works after new features are implemented. Testing isn't new, but it's crucial now because we don't always know what AI is creating or doing.

Even if people don't review code as thoroughly as they should, tests catch issues before production. That's the safety net that lets you move fast with AI without breaking everything.

Don't stay stuck. Don't let fear drive your decisions. Start small, build intuition, and adapt. The future of development isn't about choosing between human code and AI code. It's about knowing how to work with both effectively.

---

## Resources

- [My evolving relationship with AI in development](https://www.eliostruyf.com/evolving-relationship-ai-development/) - My journey from prompt engineering to agentic AI
- [My AI Code Review Journey: Copilot, CodeRabbit, Macroscope](https://www.eliostruyf.com/ai-code-review-journey-copilot-coderabbit-macroscope/) - Exploring various AI code review tools
- [GitHub Copilot](https://github.com/features/copilot) - AI pair programmer
- [Playwright](https://playwright.dev/) - End-to-end testing framework
- [Claude](https://www.anthropic.com/claude) - AI assistant for development tasks

---

{{< blockquote type="note" text="This article was created using the [ghostwriter AI agents](https://github.com/estruyf/ghostwriter-agents-ai)." >}}
