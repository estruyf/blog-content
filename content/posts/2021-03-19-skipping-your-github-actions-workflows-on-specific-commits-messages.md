---
title: '#DevHack: Skip GitHub Actions on specific commits messages'
slug: /devhack-skip-github-actions-specific-commits-messages/
author: Elio Struyf
type: post
date: 2021-03-19T08:39:40.681Z
draft: false
tags:
  - GitHub
  - GitHub Actions
  - DevOps
categories: []
comments: true
---

In the `doctor` project, I try to do as much as possible in one GitHub Actions workflow. Having all logic in one workflow makes it more convenient but comes with a couple of complexities. Like, do you want to run each action for every type of commit/PR/...?

{{< caption "/2021/03/skip2.png" "The whole GitHub Actions workflow"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABTSURBVDXBQQ7CQAwEwfbYREqekAsH/v89YFcbTw6IqjifL88xUQRrLcB0N7b5CaoKZSZgtu2BBPtxIAVVSWYgwRxvyhi3IYIIMb4frrXovviTxA04DiBl6x9G0wAAAABJRU5ErkJggg==" "1899" >}}

## Why I want to skip actions/jobs in my workflow

I host the documentation on Vercel. Vercel manages its build processes. You can also choose to use the Vercel Action for deploying your sources, but having it on the Vercel platform itself is straightforward.

When I was working on the documentation, I thought it would be useless to go through a complete workflow run when only the documentation was touched. I thought this does not have to happen, so why not skip these actions/jobs on specific commits. That is why I specified to skip all jobs when my commit contains `#docs` in the commit message.

{{< blockquote type="Info" text="You can use any text value that makes sense to you." >}}

## Skipping when commits contain a text value

If you want to skip your job or actions when the commit contains a specific text value in its commit message, all you have to do is add an `if` condition. In this condition, you can use the `contains` expression.

In the case of my `#docs` commit messages, the expression looks as follows:

{{< highlight yaml "linenos=table,noclasses=false" >}}
jobs:
  build:
    name: Build ${{ matrix.os }} - Bash
    runs-on: ${{ matrix.os }}
    if: ${{ !contains(github.event.head_commit.message, '#docs') }}
{{< / highlight >}}

{{< blockquote type="Important" text="Good thing to note is that the `contains` function is not case sensitive for the value to check." >}}

{{< caption "/2021/03/skip1.png" "Skipping all GitHub Actions when commit message contains `#docs`"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABVSURBVE3BQQ7CMAxFwedvV5HKCbrohvtfr9CQxGaFxIwd57PmnMiMMQaVSVbxLyKQu0MV2xZIsD923I1wwwVS8elv4nVdrLVorSGJ3m/WnGQufiTxBYY9IlQJe80IAAAAAElFTkSuQmCC" "1903" >}}

{{< blockquote type="Info" text="You can read more about the GitHub Actions expression syntax at [context and expression syntax for GitHub Actions](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#about-contexts-and-expressions)." >}}

*Happy automating*
