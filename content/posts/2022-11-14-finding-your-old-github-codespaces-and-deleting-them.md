---
title: "Finding your old GitHub Codespaces and deleting them"
longTitle: ""
slug: "/finding-github-codespaces-deleting/"
description: "In this article, Elio explains how you can find your old Codespace instances which take up space and how to remove these."
date: "2022-11-14T08:39:21.525Z"
lastmod: "2022-11-14T08:39:21.525Z"
preview: "/social/f5368fc1-a64e-4cb6-bd77-3e1c9504e7b8.png"
draft: false
comments: true
tags:
  - "GitHub"
  - "Codespaces"
type: "post"
---

Over the weekend, I received a couple of emails I was running out of GitHub Codespaces storage. My limit is 20GB, but more interesting is that I rarely use codespaces. 

{{< caption-new "/uploads/2022/11/github-codespaces1.png" "GitHub Codespaces storage usage"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAEmSURBVHXBz0obURTA4d+5c+6dJEbRTNpFRVyZLkQfQVwKuu8r9AGat8siNLtCXiFCiwsFE4vI/NE7x5nUUCr0++TbePzl6vLqrNvt8D/T6fS7fh6Nzk9OT77GGBERMCPWNc45EpfgvWexWDgVEepYg0G/v0Xa6fCemaG9Xo/hMGPjIWdtt8s/lDf3yyUxRuJLRFW5ezRc4hhmGS2lkRcFwQckFcqyBIM0TWnleU5LaZS/bjAzVJXtNKWVr37Dh4xYR1pKo84GVM8VJfAEmBnS7yFFAcKa0hgM9qiqirKqiDEiCEni8CEQvKelvAkhML39wfXjT0A43N7n4uCMDaVh/HE8OOLT1kdae2EH4y+dTCaz1WqV0CiejSoa3oGI0PFCaz6fz14BaRRppbvjlDwAAAAASUVORK5CYII=" "580" >}}

The last time I used Codespaces was about a year ago, but I couldn't remember which repository it was. I tried to check a couple of repositories but without success.

When reaching out to GitHub and following the documentation, I found out how to best find all of your old Codespace instances.

{{< blockquote type="info" text="[Viewing your GitHub Codespaces usage](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/viewing-your-github-codespaces-usage)" >}}

## Finding your old Codespaces

To find your old Codespaces, you must first go to your **Billing and plans** page, which you find under your settings.

{{< caption-new "/uploads/2022/11/github-codespaces2.png" "Storage usage on billing"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABuSURBVF3BMQ6CQBCG0e9nh9AZY21nbWXiGbiW98OLWCuIuzNjQmV8T8fT+XbY7y6fdSUy2WTwa56fd+uyXaVuLGYM/QCIVt+0WtlImPXFwhvdumDuWAZChDvuzkYiIrBleU0PFTKT9Mo/SXir0xecNzWqbo7gfgAAAABJRU5ErkJggg==" "840" >}}

You will see a **Codespaces** status, but this does not return the instances. For that, you have to generate a **usage report**.

You can create a usage report by clicking on the **Get usage report** button and selecting the date range of your preference. I went for the last seven days.

In the report, you will see the old Codespace instances.

{{< caption-new "/uploads/2022/11/github-codespaces5.png" "Billing report with Codespace instances"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABSSURBVA3BMQ6AIAwF0I9pCGFh5hTOeEk8gvfpxDlqImGplEXfc/WsVynHjh8RYa0F7z3MJuY7kXMGMzfqT3e3yBZCQIwRYwyklKCqMDOICFTVfRIdI9kKBoMPAAAAAElFTkSuQmCC" "1038" >}}

## Deleting your old Codespaces

Now the only thing to do is delete these instances. With the report, you get the **repository slug**. Use the slug to your GitHub repo, where you can find the Codespace.

{{< caption-new "/uploads/2022/11/github-codespaces3.png" "Finding the old Codepace instance on the repository"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAEBSURBVIXBQUrDQBSA4f/NvDRJG9sUXbnyHIILRfBUrjyUG8EjeATBlYuqkKZJbDLzbJSCguj3yaI8Op0WB+feK5okWIyIc5gZybEgXnh9XN3rJMsu5uXhjSYJi3JJ17Zkec5715GeCMW0oF011+q9kmY53nuauiaaUVcVWZZjT57n+oXhLaLslMslMUQ29RqHEC3QdS2fRBipc45NXSMiGBBj4AczRhpjoN9u+Y+yJ0KiCiKYGaOh79lTdiZpymgYBmII/EbZMVGucscgGWsRHqoNTd8jIhhflFHsua0CIQS+MzP2FAQRhyYOn80ZhW7NnmGMZFYszvLp7JI/tE199wGkNmq2KIi0fQAAAABJRU5ErkJggg==" "460" >}}

Delete the Codespace, and you are done.

{{< caption-new "/uploads/2022/11/github-codespaces4.png" "Codespaces cleaned"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAAD+SURBVH3BUU7CQBCA4X92pnQLSsH44Ak8hYkJiQfzXCYeRZ99AIUCbYHt6Nb46vdJvbx9mM7mK1VFzXB3RATcsbuABNi8r19tUsbVfHHzbFZQL5d0bUuMkb7viffKtKxo10dM1ShjhQbluN8zuLNvGmKsSG/Kx2HDZesYOHW9wN057BsCMLjTdS0jETILQdl+fZKJCCMRcGfkTmYpJbIQApOypJpOUVWaXcP5fGJIiczIFDwOXPTEIV0gQSoSrgN0jIwsgEQoioJMBMIQOF16vGdkZGcY1tCXBgjg4M5w6vlj/JiUJSBgBgip25GpKs4vmV3NH6vZ9RP/aA/Nyzdjv2l2Wy5C9gAAAABJRU5ErkJggg==" "465" >}}

{{< blockquote type="important" text="Repeat these steps for your old Codespaces, which you do not use anymore." >}}