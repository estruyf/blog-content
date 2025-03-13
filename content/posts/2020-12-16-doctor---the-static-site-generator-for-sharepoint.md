---
title: Doctor - the static site generator for SharePoint
slug: /doctor-static-site-generator-sharepoint/
author: Elio Struyf
type: post
date: 2020-12-16T16:24:15.782Z
draft: false
tags:
  - SharePoint
  - Static site
  - Documentation
categories: []
comments: true
---

I love static sites! In 2020 I have created ten production sites with various static site generators and a couple of POCs. My favorites are [Hugo](https://gohugo.io/) and [Next.js](https://nextjs.org/).

{{< caption-new "/uploads/2020/12/doctor3.png" "Doctor logo"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAAECSURBVF3BMUsCYQCA4fc+j8rwUoIOryIhInCpwXIo2g5sagxaW1pamkOosTX8DS1tNRR11FBTUEPCUSGJBJZ0hdyd2vWJdsNNPY9CZKm4vdd9rd5sBM5y0PbzHdk/37+0S0RUQiu52XHdNIvy+qIy9iFTbiuuJ368DFAiIgh1cvOG8/JcXYxprj5X0IPfOEpi1D/aGlojEiNUv7ffa6fW4WZhtT6RlOsjmui3mo46PPj2eXzXvSKk8M9O3jhw/W55OpO2d8/KD0QUUxOTQMPyepKQqYkp4BsILK8niSimJk6AGvAEfAFZQABJoAFUgAUVGACaQBZoA2ngFjCAGSAFPP4BbqpYsOFmxCsAAAAASUVORK5CYII=" "500" >}}

## The story

Internally in our team, we did the same. For our Valo partner/client documentation, we used `mkdocs` as our static site generator. Static is just fast and relatively easy to use. All our developers know how to use Markdown, and it is also a great way to add code snippets and such.

A couple of months, we were discussing to start writing some developer guidance. Which tools are we using, how do we do things, and why? The platform's idea would be to make it easier for anyone new to quickly get started and get a good view of how our team works.

As this was developer focussed in the first place, we started thinking about a static site. Although we opted for Azure DevOps wiki, as we are thinking about moving towards GitHub, we went for `mkdocs`. The platform should also consolidate all the documentation that lives in the project repository, wiki, and old intranet (soon to be removed).

After a couple of iterations, I asked the question: are we doing the right thing here? Is this platform the right thing to use? After that, I proposed the crazy idea to move all our documentation to SharePoint.

The first thought was, it would be hard to maintain. As a developer, you want to add the documentation as quickly as possible so that you can go and focus on your code again. Going to SharePoint meant our developers would have to add multiple web parts on the page (text, images, snippets, ...).

That is when the second crazy idea came. What if I create a static site generator for our team?

## Doctor came to life

After that meeting, I did a quick proof of concept with the CLI for Microsoft 365 and Markdown web part in SharePoint. I never saw a real use-case in the web part, but it makes total sense for Doctor.

After some fiddling around, and some tests, it would work. All I had to do was create a new CLI for Microsoft 365 command, which allows updating the contents/properties of a web part.

{{< blockquote type="info" text="The required command to create was [spo page control set](https://pnp.github.io/cli-microsoft365/cmd/spo/page/page-control-set/)." >}}

Once I created `control set` command, my next task was to build an internal tool we could use during a CI/CD. As I saw value for others and as Valo, we want to help others in the community. I made this an open-source project.

{{< blockquote type="info" text="The reason for using the CLI for Microsoft is because it is feature-rich, and I do not want to reinvent the wheel. Using the CLI allows the tool to open many more possibilities in the future and build upon the shoulder of giants." >}}

## What makes Doctor great?

The great thing about Doctor is that you can keep the documentation as close to your code as you want. Of course, you do not have only to use it for development projects. You can also use it for other scenarios like documentation and architecture projects.

The tool itself will keep the pages up to date on SharePoint. During this process, it does the following:

- Check if the page exists. If not, it will create the page
- Check if the Markdown web part with a specific ID exists. If not, add it
- Update the Markdown from the current page to the web part

{{< caption-new "/uploads/2020/12/doctor1.png" "Doctor publish command output"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAADWSURBVHXBv0rDQADA4d/l/qCQZBDU1priUvQdHF18DRefUBxdFFz0CbS4RUM1kVhyRy7nSQchCH6fuDi9jPOdgrvynlp+EkLAWkvf94ypm/dbcpthjCGGyEaapoQQEEKgtcY5h4oyIcsyjDF478nznLZtkYmkfC3x3rOhRPimsx22s0QizjlCCDRNw5g6Pwvs730AEq173iq4utb8pR4edymKQ56el6zXkf+oIzVn6ibMJlOEFizLFyq1oq5rYoz8SmbygJPtBcdbC6pqRau+GIYBrTVjP/9hXmACqKWPAAAAAElFTkSuQmCC" "364" >}}

The process is straightforward but so powerful.

{{< blockquote type="info" text="Right now, the tool does only create and update. It will not remove any content. I have already added this as an enhancement to the issue list: [Specify if you allow pages to be removed on publish #7](https://github.com/estruyf/doctor/issues/7)." >}}

## What makes it great to move your documentation with Doctor to SharePoint?

For us, the move of our documentation to SharePoint has the following advantages:

- Dogfooding (as we have an intranet project, it is a great way to dogfood it as well).
- One platform to rule it all, but still use the most familiar tools to use. For instance, HR can use SharePoint, but Development can use Markdown, and it all ends up on the same platform.
- Powerful search capabilities of Microsoft 365
- You can modify the page, add web parts to it, change its layout, and so much more as long as you keep the Markdown web part on the page. It will only update that.
- Your ID department will love it as they can manage security and do not have yet another platform to support.

## Getting started

If you want to get started, check out the documentation on the `doctor` GitHub repository: [@estruyf/doctor](https://github.com/estruyf/doctor).

Installing the `doctor` on your machine can be done by running: `npm i -g @estruyf/doctor`.

To make your start as easy as possible, I shared a sample repository for you to use: [doctor sample](https://github.com/estruyf/doctor-sample). Clone it, and get started.

{{< caption-new "/uploads/2020/12/doctor2.png" "Doctor sample output on SharePoint"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACbSURBVH3BOwrCQBRA0TuTNyMBP71gExcgFn5AwR0obtFGwcLCfQlpMvmYeWphZzzHFEWhTVMzHI74R5IkATwhBFQjYPgQEbz3fMnpfOF6u/OsKsqy4sMYMETquqRtleNhj0zGY1bzGXmeoxr5ZZplyG67Yb1ckKYp3nu6WHGOp3PUqkRVulgRoe8cjxBo2pYulrfEWga+R1SlywtogzeIFi+p2gAAAABJRU5ErkJggg==" "572" >}}

## What do you think?

Of course, you like your tools and see value in them, but what do you think? Would this be something you see yourself using? Do you face similar challenges in your company when it comes to where to write documentation?

Happy to chat about it in the [discussion](https://github.com/estruyf/doctor/discussions) section of the repository.

## Feedback?

In case you have feedback/ideas. Feel free to add them to the [discussions](https://github.com/estruyf/doctor/discussions) section as well. 

## Can I contribute?

Yes, you can! It is for the community, so if you see the value and want to add something, please do a PR. I would be pleased to merge it and credit you in our changelog and socials.

*Happy documenting*

