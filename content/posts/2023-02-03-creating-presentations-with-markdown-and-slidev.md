---
title: Make impactful presentations with Markdown and Slidev
longTitle: ""
slug: /impactful-presentations-markdown-slidev/
description: This article by Elio explains how you can use Markdown and Slidev to create
  powerful and effective presentations that captures the attention of your
  audience.
date: 2023-02-03T12:36:14.041Z
lastmod: 2023-02-03T12:36:14.041Z
preview: /social/e3c2daa6-28be-4732-8b98-e4cbb11b3ec4.png
draft: false
comments: true
tags:
  - Markdown
  - Speaking
  - Slidev
type: post
---

I have done many presentations over the years, and my go-to tool has always been PowerPoint. It has all the features I needed, but I always struggled with the time it took to create the presentation. First, you need to get a suitable template, place the images in the correct place, and add the text, but adding code to slides is even trickier and not easy to maintain.

A couple of years ago, I tested out a couple of tools to create presentations with just Markdown but never got the hang of it. I always needed something, or it just did too much.

A couple of weeks ago, when I started to create a new presentation/workshop deck for getting started with Visual Studio Code extension development, I decided to give it another try and move away from PowerPoint. The reason was that it would contain too much code, and I wanted to ensure that syntax highlighting was working correctly and that the code itself was easily updated.

The first tool I tried was [Slidev](https://sli.dev/). This is also the one if finally decided to stick with. 

{{< caption-new "/uploads/2023/02/slidev-1.png" "Slidev"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAADGSURBVC3BT0rDQBTA4d+beVNc1KG9gaLgGaxXcuktXHsJl4J3cF+K2bioCEL+2FQNtMnkjQT8PokxPp/E04v+t0NECMGTkiEi5JyZpJTeVETOr+9urzaPTzSvBaoB7zJpHMk5MxERU+ccL/cP5DQw6YcRccpiEQnq2e1/yBmUMGN+donVDW35QcpKCHNWNytCThTrDe/lF2rHA22xxsyYzIKyXEaqqqIpa77bPel4QM1sOwyD8s/1HXX5Sd/tGM3wXhnVb/8AJZJgTHQcJkAAAAAASUVORK5CYII=" "1530" >}}

## What is Slidev?

Slidev is a web-based slides maker which has a presenter view. It is designed for developers and allows you to create slides with Markdown. Best of all, you can even add HTML and Vue components to your slides. Which, for me, were my first steps in the world of Vue.

### Is Slidev for you?

Whether Slidev is right for you depends on your specific needs and preferences. If you are looking for a simple and efficient way to create presentations and are comfortable using Markdown as a formatting language, then Slidev could be an excellent choice for you.

I have always been a fan of Markdown, it is a simple and easy way to write content. I have used it for years to write blog posts, but I never thought about using it for presentations.

As it uses Markdown, your focus is more on the content first than the design.

Ultimately, the best way to determine if Slidev is right for you is to try it out and see if it meets your specific needs and preferences.

## Getting started

To get stared, all you have to do is follow the guide, which you can find on the [Slidev - Getting started guide](https://sli.dev/guide/#create-locally).

Following the guide will end up with a new project containing a `slides.md` file. This is the starting point of your presentation. There are enough samples in it to get you started.

## How I am using Slidev

When trying out Slidev, the **multiple entries** feature was the most useful. This feature allows me to split my presentation into multiple files/sections (like I did in the past with PowerPoint) and then include them in my `slides.md` file.

This **multiple entries** feature also makes it easy to restructure your presentation, as you can move these sections around in your `slides.md` file.

Here is an example of how I am using this feature:

{{< highlight md "linenos=table,noclasses=false" >}}
---
layout: cover
theme: the-unnamed
---

# Getting started with Visual Studio Code Extension development

Elio Struyf

---
layout: about-me

helloMsg: Hello!
name: Elio Struyf
imageSrc: https://elio.dev/eliostruyf_2022.jpg
job: Lead DevTools Engineer @ Rapid
line1: "#Stickerpreneur @ pyod.shop"
line2: "#Maintainer @ Front Matter CMS"
social1: "@eliostruyf"
social2: eliostruyf.com
social3: elio@struyfconsulting.be
---

---
src: ./slides/intro/index.md
---

---
src: ./slides/commands/index.md
---
{{< / highlight >}}

All the sections are located as you can see in a `slides` folder.

{{< caption-new "/uploads/2023/02/slidev-2.png" "Slides folder"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAYAAAB/sn/zAAAAAklEQVR4AewaftIAAAGVSURBVHXBS24TMQCA4d8eO5lXowBlAVVVseMESCypxDG4BzfgSCyQWLDnGCxa2nTSedgz9tg4C0QIw/eJvKzfXF29ug4x0LYd+8c9v128fMHuoSH46avKdPWuVPKTXz1H6CfM8owYIgdNB1I/ZRzvPkoQeFUQIokgXxcgJAgJQoKQgECSSA2buqZp9hhruawKLqucY6osC87rDbo648PFOa83Fd+t51treLYuONj5DuWc434/QHvDjyD4fNvS9T3HnHMo5zyzN2RrTVGU3Nz+ZDCWY857JEkmFSrTtF3PMBiWSJLRBYwdWWnNarViiSQRAgSCeZ5xzrFEkshVSV7k9MNAiJElkkR4g5sm6qrifxTJPHs62zLYCQFE/qVItFIU9ZZthLv7B4y1nJIkLhRkSnO/azDWskSRPDY7ooAQAlorDrzzRP5QJH6dk+c5Sim6vifGiHeeY5JETyNKK4QUZFlGPxgif5MkEQhzQGWKfhiIMXJKktRVhR1HrLVUZckSodfV2zwv3282W+w4YozhlJuGL78Acy657dFRRVcAAAAASUVORK5CYII=" "444" >}}

The contents of a slide looks like this:

{{< highlight bash "linenos=table,noclasses=false" >}}
---
layout: cover
title: Introduction
background: intro/question.webp
---

# Why your own extensions?

---

# Setting up your development environment

- `yo` aka `yeoman`
- `generator-code` aka the project template
- `@vscode/vsce` aka the Visual Studio Code Extension Manager
{{< / highlight >}}

Each `---` starts a new slide. You can also add a layout to each slide.

{{< blockquote type="important" text="What is also great about this way of adding content is that you do not create a master slide and theme conflicts when copying/pasting content." >}}

## Viewing your presentation

To view your presentation, you can run the following command:

{{< highlight bash "linenos=table,noclasses=false" >}}
npm run dev
{{< / highlight >}}

The command starts a local server (default on `http://localhost:3030`) and opens your browser with the presentation view.

{{< caption-new "/uploads/2023/02/slidev-3.png" "Slidev presentation view"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACmSURBVD3BvS5EURSG4fdba+1zdhg5BdMgOtG7GjehdQeuSKc2jYJqtAqSU5EMJhk/Zy/ReB5F1y+s1EMSZIaHM7VkqIVdfTGuv3nbbJ5DycHx5fnR1ukJisCKowi8dnhfmN09cH92kZGADTP6/Tly549tV5AoewPd4xNhEAl8XN3webtkvXonM5FESOzwg7284iYis43j9cLaNPFPIiJYaaI6tJbjL2jANX3jq88sAAAAAElFTkSuQmCC" "1964" >}}

One of the features that blew me away was the presenter's view; it feels just like you are using PowerPoint.

{{< caption-new "/uploads/2023/02/slidev-4.png" "Slidev presenters view"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAC3SURBVE3BPWoCQRiA4Xd+3HVXoqiIsorgMdJZWISANxByE6+RMpAL5AjpAoKdIGII2KgQCLgwIrLOfKJVnkfVW+0vXxRdEeHGGEOiPMeLkFUThqNnDvnv1tpBL2s+PfZNHIPRROWISlpi+/GJWX3TbDxw9kFs1GvTeRmjtEKnCTq2mGqF2nrDbrbg9e2dEAL2OF/yM5lyco5w8VilqWmPcY7/rM8Pe5fnGhEEKJTiD8FqCMKdiOyvXeVDOG/4EakAAAAASUVORK5CYII=" "1963" >}}

## What about themes?

Theming is where it gets interesting. If you like to use some web developer skills, you can easily create your theme or use one from the [Slidev theme gallery](https://sli.dev/themes/gallery.html#official-themes).

I went for a custom theme, as I wanted to port my PowerPoint template over to a Slidev theme. As a base, I used the default, and after a couple of hours, I got it all working. 

{{< blockquote type="info" text="In case you are interested, I make my theme called **The unnamed** available as well. [Slidev - The unnamed theme](https://github.com/estruyf/slidev-theme-the-unnamed)" >}}

## More power with custom components

You can create your own Vue components if you want more power over your slides and their content.

In my case, I wanted a rectangle, circle, and hide/show component, so I created these components and made them available as well: [Slidev - Custom components](https://github.com/estruyf/slidev-addon-components).

## Conclusion

With its extensive feature set and easy-to-use functionality, Slidev has been a great asset to my workflow. Additionally, its support for Markdown allows me to create content quickly and with minimal effort. I am delighted with Slidev, and I intend to use it for my upcoming presentations.

Give it a try and let me know what you think about it.