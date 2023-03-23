---
title: "The Future of Documentation: Ready for Change?"
longTitle: ""
customField: ""
slug: /future-documentation-ready-change/
description: Discover the latest advancements in documentation technology and how tools like GitHub Copilot for Docs, Mendable, and OpenAI are changing the game.
date: 2023-03-23T07:41:15.181Z
lastmod: 2023-03-23T07:41:15.181Z
preview: /social/c3af868f-5e8b-419c-9797-71da58904a7a.png
draft: false
comments: true
tags:
  - AI
  - Documentation
  - GitHub
  - OpenAI
  - GitHub Copilot
type: post
---


A few weeks ago, I embarked on a journey to explore how OpenAI could change the way users interact with documentation. Imagine effortlessly accessing the information you need without reading through multiple pages. Instead, you just ask a question about configuring or using a tool, and voilà – the answer appears before you.

{{< caption-new "/uploads/2023/03/front-matter-cms-ai.png" "Front Matter CMS - Documentation AI"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAAExSURBVHXBMXbTQBiF0e+NxrItB8ISUqWmhnNgHayAdZIWWrIDWs6JsSXNWP88LMAl9+rh8e2nvNl8qLXS9z0vxzONxM2w3zOX8pSnef64R583ObPptySdqPMZiStxLGdsK2OICOZS+DUWBByGAdsYsxrHiTyXwjTP5PfvyF2HgWIzRvCHTf/1G9nAm/t7fn5/piRxk/hrt91ykchcvbo7cAd0qSNaICClhA3Rgh/LQuZqGAaE6HLHKiLAYEy0xipzVcvIqk2BADvod69prVFrZZW5Sl2PJDYpERFENFprgJDEKvNPqZXlstBaYyWJ5kbEwioLOI4XTtNErRUQ2EQ5cSOJLInT8QUJehm7oSS8O5AkllhYlguZVohLkFLCNraptXIjiVW225daq/kP20h6+g0eTrFpCSrgfAAAAABJRU5ErkJggg==" "770" >}}

You might be thinking, "That sounds a lot like ChatGPT." You're right! But what sets this concept apart is that it would be tailored to your specific dataset.

## The Journey Begins: Exploring Large Language Models

To kick off my exploration, I started to read more about Large Language Models and stumbled upon an incredible tool called [LangChain](https://github.com/hwchase17/langchain). This powerful tool allows you to create applications with LLMs.

My first test involved using two Markdown files and asking a question related to their content.

{{< caption-new "/uploads/2023/03/langchain-frontmatter.png" "Using LangChain against Front Matter docs"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABiSURBVA3BMQ6CQBCG0W92N1GQUNjZewlr7sFNqTkMlSSoK8788p5db/exac7DGj8wICfwAAkTaPtwmIp3p0ftLyMElAwekBNEIA7Rw/J8FXt/5+priwQCkoEEITBgd6j7/AdVuiqZIbYAtAAAAABJRU5ErkJggg==" "757" >}}

A few days later, I tuned into the [Syntax Podcast](https://syntax.fm/show/580/supper-club-astro-2-0-with-fred-schott), where [Fred Schott](https://twitter.com/FredKSchott) discussed Astro 2.0 and the AI bot they built for it. My immediate thought was, "That's precisely what I need!"

{{< blockquote type="info" text="Dive into [Houston AI](https://houston.astro.build/), Astro's AI assistant." >}}

Astro's team also used LangChain to integrate AI into their comprehensive documentation.

## Mendable: A Game-Changer in AI-Powered Documentation

As Astro's team showed me I was on the right path, I wanted to learn more about LangChain. That's when I discovered [Mendable](https://mendable.ai/), a chat-based search service. Mendable integrates natural language search into documentation, and it's even free for open-source projects!

The Mendable team was incredibly receptive and helped implement the service on the Front Matter CMS website.

{{< caption-new "/uploads/2023/03/mendable-frontmatter.png" "Mendable on the Front Matter CMS website"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAADeSURBVH3BS0oDQRRA0ZvX1Z+y045UiFE3ILgBwZ04c6VCxjoSZ4YEdBjJx6LLqve0BwFR8JzR0fHJXVHINf+YTs9nrhuPb8q6ukWVGCMxRn47nUwK6fseTYlBVVUURcFPB75h4ESEtuvwdc0gZ8VMiTESQiB/ftD4BpdSQlPCtS0ignaHyNkFHiM9PrBb7hgBTs0wM0IImBm6XiNvr6gqcbtlT/i22myIl1eYGSJCCIEQAikl9lxZlrTe495X5JxRVUQEEUFEcK7kZT7H+cbf112XN89PCH+JjFgslrMvNDdnKTz2w8UAAAAASUVORK5CYII=" "846" >}}

## Bring AI to Your Product

With access to the Mendable API, I set out to demonstrate its effectiveness by integrating it into Front Matter CMS. Users can now ask documentation-related questions directly within Visual Studio Code, eliminating context-switching and enhancing productivity.

{{< caption-new "/uploads/2023/03/front-matter-cms-ai.png" "Front Matter CMS - Documentation AI"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAAExSURBVHXBMXbTQBiF0e+NxrItB8ISUqWmhnNgHayAdZIWWrIDWs6JsSXNWP88LMAl9+rh8e2nvNl8qLXS9z0vxzONxM2w3zOX8pSnef64R583ObPptySdqPMZiStxLGdsK2OICOZS+DUWBByGAdsYsxrHiTyXwjTP5PfvyF2HgWIzRvCHTf/1G9nAm/t7fn5/piRxk/hrt91ykchcvbo7cAd0qSNaICClhA3Rgh/LQuZqGAaE6HLHKiLAYEy0xipzVcvIqk2BADvod69prVFrZZW5Sl2PJDYpERFENFprgJDEKvNPqZXlstBaYyWJ5kbEwioLOI4XTtNErRUQ2EQ5cSOJLInT8QUJehm7oSS8O5AkllhYlguZVohLkFLCNraptXIjiVW225daq/kP20h6+g0eTrFpCSrgfAAAAABJRU5ErkJggg==" "770" >}}

## Introducing GitHub Copilot for Docs

Mendable isn't the only player in the AI-driven documentation space. On March 22, 2023, the GitHub team unveiled [GitHub Copilot for Docs](https://githubnext.com/projects/copilot-for-docs). I had the privilege of testing it before launch and providing my feedback.

{{< blockquote type="info" text="If you go to the [GitHub Copilot for Docs](https://githubnext.com/projects/copilot-for-docs) website, you can add yourself to the waitlist." >}}

Although it can't be link to specific projects yet, I tried GitHub Copilot for Docs with React, Azure, and GitHub datasets.

{{< caption-new "/uploads/2023/03/github-copilot-for-docs.png" "GitHub Copilot for Docs"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAAD/SURBVG3Ba04bQRCF0e921czYvCRvBBbAOrOwsIz8ShB4TL+KHpSRIodz9Ov32w96f1qWGUnsWuvk/MHxeGT46fc3y+P59c9zikRvgRgkDpPzcPvA+6UwhAvh88x6XokIvgjWFU6nEztnmH2hTiDBNDmWDJ8cT4LS2ST++siF2iACkhm9ByB2ziATt8eFiOCwLEj8J7HpopaGknMpmVobrQdBsHMGJYE5ZkLJQcFGiF1iiAhAgEgKJHEtsUmi5JXzeqbUxnecIVrl7uaAubPxJCSBoJTKNDnOYGYgOCwz1yI6EUFikPiSc+ZaMqO1hudSX9wSktGBS678y80YXj4Bf0doEOFIx4oAAAAASUVORK5CYII=" "1310" >}}

The results were impressive, reaffirming my belief that AI is the future of documentation. AI is transforming countless processes, and documentation is no exception. While we'll always need well-crafted documentation to train AI, the way we consume it is undoubtedly evolving.

The GitHub Copilot team even featured my quote on their website!

{{< caption-new "/uploads/2023/03/github-copilot-docs-quote.png" "My quote on the GitHub Copilot for Docs website"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABZSURBVE3BsRGDMBBFwfelE9JgY8ohowg34h7JaEaZxyMCnSFjV99f+9RaV24kAQ6I3juv6blZCFracbwlUUoB5+Q4QgizQDRrhvs+5pQf08wlxsiQEncS+x8SkBbfkhNmjwAAAABJRU5ErkJggg==" "885" >}}

What are your thoughts on utilizing AI for documentation? Are you ready to embrace this game-changing shift?