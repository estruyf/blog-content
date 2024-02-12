---
title: "Using GitHub Project webhooks to manage labeling repo issues"
longTitle: ""
customField: ""
slug: "/github-project-webhooks-manage-labeling-issues/"
description: "Learn how to automate project management using GitHub Project webhooks for labeling issues."
date: "2024-02-12T08:40:39.063Z"
lastmod: "2024-02-12T08:40:39.063Z"
preview: "/social/f5d98ac3-fbdb-4bae-90ee-9c09ac9904b5.png"
draft: false
comments: true
tags:
  - "Automation"
  - "GitHub"
  - "Webhook"
type: "post"
---

For managing the Front Matter CMS releases, I have been using [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) in combination with GitHub Actions for automatically labeling my issues, which I add to the Project board. I must say: "Add to my Project (classic) board."

The classic Projects experience has been discontinued, and there is a big difference when using the new Projects experience, which is creating projects on the user or organization level.

Previously, you could create those classic projects on the repository level, which allowed hooking it up with some GitHub actions to add or remove issue labels when managing them on the project board. These labels enable quick filtering of issues in the list for a specific status or project.

{{< caption-new "/uploads/2024/02/issue-project-labels.webp" "Project labels on the issues"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABmSURBVE3BQQ6CMBBA0T+2kLAgJsiChTHR+x+Bu5hwAtuggTrTwaXvyTBd58sw3gRo2pb3ugICOKcQqGao6hLd/R677tEIaIXan6n5RRChlEJKiZ8Q7WvPbd/NRHCB/ClYzqDKn+UAG7EtmFsl3fYAAAAASUVORK5CYII=" "900" >}}

{{< blockquote type="info" text="Read more about on [Adding or deleting GitHub project (classic) labels on issues](https://www.eliostruyf.com/adding-or-deleting-github-project-labels-on-issues/)." >}}

When I wanted to move to the new project experience, I had to create my project on the user or organizational level, meaning I had to find another solution for automatically labeling my issues.

The approach for automating your project management is by using webhooks. Webhooks allow your integrations to listen to event actions that occur on GitHub, so it can be used to notify you when a new project is created or when you manage the project items (create, edit, delete).

{{< blockquote type="info" text="Read more on [GitHub webhooks documentation](https://docs.github.com/en/webhooks)." >}}

In this article, I will guide you through how you can configure and use the GitHub webhook functionality for project management.

## Limitation

There is a limitation; the approach I will tell you more about is only possible on projects created at the organizational level. The reason is that when writing this article, GitHub does not yet allow you to create project webhooks on the user level.

## My project and repository setup

My setup is the following:

- Repository is managed on user level
- Project is created on an organizational level

{{< blockquote type="info" text="I did not want to move the repository, so I kept it on the user level, but you can also be on an organization." >}}

## GitHub App

For the authentication and webhook configuration, I choose to use a GitHub App, as an app provides you with all the functionality you need for this kind of scenario.

You can create a new app in the [developer settings - register new GitHub App](https://github.com/settings/apps/new).

I configured the app as follows:

- Activate the **webhook** functionality, and set the URL to your endpoint. If you do not yet know it, you could use a service like [smee.io](https://smee.io) to experiment with it.
- Set a webhook secret to make the webhook functionality more secure.
- Set the permissions
  - Repository permissions:
    - **Issues**: Read & write
    - **Metadata**: Read-only
  - Organization permissions:
    - **Projects**: Read-only
- Subscribe to **Project V2 item** events
- Create a **private key**, which you need for authenticating your app.

### Installing the app

Once you have created the app, you can install the app on the user/organization.

If you use a setup similar to mine, you will notice the difference between the user and organization installation permissions. 

{{< caption-new "/uploads/2024/02/github-app-personal.webp" "GitHub App installed on user level"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABhSURBVHXBOw7CQAxAweeNreQIyaVokDguPUG05Aik3Wo/IJuGCikzcjmdH7fnNvfWKO1NIBAQBPFp/Ox6Xe9LSmkREUYbqLXi7vwRHaeJISVyzrg7R7SU8jLVMDN67xzYv5tpKTiMXXVVAAAAAElFTkSuQmCC" "900" >}}

{{< caption-new "/uploads/2024/02/github-app-organization.webp" "GitHub App installed on organization level"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABjSURBVG3Buw3CUAyG0c9c8/AGZCgaJNalB0QLI5AJsHKD/NNQoZxjp8Pxfnk893Pv5DQjDARC6DPxM/r5ehtaa4OZsd04mYmq+GOriGAXgSSqClWxxN+Zr7W7qoreO2bGgvELyCUvYltfLuYAAAAASUVORK5CYII=" "900" >}}

## The sample project

I have created a sample project to get you started. You can find it here: [GitHub Project Labeling](https://github.com/estruyf/github-project-labeling).

{{< blockquote type="info" text="The sample project will also work when you use it on an organizational level only." >}}

The project makes use of Azure Functions, and if you deploy to Azure, all you need to do is configure the following settings:

- **WEBHOOK_SECRET**: set the value which you provided when creating the GitHub App
- **GITHUB_APP_ID**: this can be found on the GitHub App instance once you have created it
- **GITHUB_APP_PRIVATE_KEY**: add the private key. You can put it in Azure Key Vault and link it to your Azure Function.

### Following the best practices

The Azure Function follows the [best practices](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks):

- Subscribe to a minimum of events
- Use a webhook secret and validate it for each call
- Check the event type before processing
- Use the `X-GitHub-Delivery` to prevent replay attacks

### The logic

The logic for the app works as follows:

#### On project item creation or moving between statuses

- GitHub triggers the Azure Function webhook
- The project item is retrieved and checked if it is an **issue**; if not, it will not continue.
- The issue is retrieved
- The repository labels are retrieved
- Project label is created and set
- The status label is created and set
- Other status labels are removed from the issue

#### On project item removal

- Removal of the project label
- Removal of the status label
