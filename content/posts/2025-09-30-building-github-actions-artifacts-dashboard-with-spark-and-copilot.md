---
title: "Building a GitHub Actions Artifacts dashboard with Spark"
longTitle: "Building a GitHub Actions Artifacts dashboard with GitHub Spark"
customField: ""
slug: "/building-github-actions-artifacts-dashboard-github-spark/"
description: "Create a GitHub Actions Artifacts dashboard using GitHub Spark to visualize and manage your CI/CD storage efficiently."
date: "2025-10-02T20:58:42.332Z"
lastmod: "2025-10-02T20:58:43.011Z"
preview: "/social/1abd14a5-9145-4026-b770-4653698342df.png"
draft: false
comments: true
tags:
  - "CI/CD"
  - "GitHub Actions"
  - "GitHub Copilot"
  - "GitHub Spark"
  - "Storage Management"
type: "post"
fmContentType: "post"
---

Another day, another email from GitHub telling me I'm running out of GitHub Actions storage. Sound familiar? If you've been managing multiple repositories with CI/CD workflows, you've probably experienced this pain too. GitHub doesn't provide a comprehensive dashboard to visualise artefact storage across all your repositories, making it nearly impossible to understand where your storage is being consumed.

{{< caption-new "/uploads/2025/10/hitting-the-budget-limit.webp" "Hitting my GitHub Actions Storage limit"  "data:image/jpeg;base64,UklGRpgAAABXRUJQVlA4WAoAAAAQAAAACQAACQAAQUxQSC0AAAABL6CQbQTI320Ep/JqREScRYZCSFaomwx+ADm8CSCG/IUiiOh/jKQzoF/K3RcAVlA4IEQAAADQAQCdASoKAAoAAUAmJaQAAup3/vX4AAD+/dihepDnXw09oWPf4wWSnDiwp2K9MYMTba2GvjKXe54HFeTZUp0pLAAAAA==" "1200" "1151" >}}

After creating [scripts to monitor](/monitor-github-actions-storage-usage-script/) and [clean up artifacts](/cleanup-old-github-actions-artifacts-script/), I realised what was really missing: a proper dashboard. So I decided to build one using GitHub Spark and GitHub Copilot. Here's how it all came together.

{{< caption-new "/uploads/2025/10/gh-cleaner.webp" "GitHub Actions artifacts Cleaner"  "data:image/jpeg;base64,UklGRpAAAABXRUJQVlA4WAoAAAAQAAAACQAABwAAQUxQSC4AAAABL6CmbQOGP8CcYdJBIyLi5AYKItmgHhL8AujwRgAZ9A+kQUT/Y0ieAehHufsCVlA4IDwAAACQAQCdASoKAAgAAUAmJaQAAudZfggA/v2ZF4Tr3Bm4tWutyDENIZvmwgbHV7ZDC9o4BlOjw6NvwcAAAAA=" "2584" "2104" >}}

{{< blockquote type="info" text="The GitHub Actions Artifacts Cleaner is available at [gha-cleaner.elio.dev/](https://gha-cleaner.elio.dev)." >}}

## The problem: GitHub's missing dashboard

GitHub Actions is fantastic for CI/CD, but storage management is a blind spot (for now). When you receive that storage quota warning, you're left with:

- No visual overview of storage usage across repositories
- No easy way to identify which repositories consume the most space
- No consolidated view of artefact retention policies
- Manual cleanup processes that are time-consuming and error-prone

{{< blockquote type="info" text="More information on the GitHub Actions storage limits can be found in the official documentation at [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions#free-use-of-github-actions)" >}}

## The vision: A centralised dashboard

Running the scripts helped, but still, I wanted a more user-friendly solution. My vision for the dashboard included:

- **Repository Overview**: List all repositories with their Actions storage usage
- **Artefact Details**: Drill down into each repository to see artefact sizes, ages, and retention policies
- **Artefact Delete**: Ability to delete individual or multiple artifacts directly from the dashboard
- **Cleanup Tool**: Bulk selection and deletion of old artifacts

## Enter GitHub Spark: The perfect tool for the job

[GitHub Spark](https://github.com/spark) is GitHub's AI-powered tool for creating personalized micro apps. It's perfect for this use case because:

- **NL-based development**: Describe what you want in natural language
- **Managed runtime**: No deployment headaches
- **Interactive previews**: See changes instantly
- **Built-in UI components**: Professional-looking interface out of the box

## Building the dashboard with GitHub Copilot

Here's how I approached building the GitHub Actions Artifacts Dashboard:

### 1. Starting with a Simple Idea

I started with a basic prompt in GitHub Spark:

> "I want you to create a dashboard on which I can view in detail the GitHub Actions Artefact storage usage or all the repositories on my account."

GitHub Spark immediately generated a working prototype with:
- GitHub API integration with a Personal Access Token (PAT)
- Repository listing
- Basic storage metrics

### 2. Iterating with Natural Language

The beauty of GitHub Spark is that you can refine your app using natural language. I made several iterations:

> "Add the ability to delete a single artefact or all of them for a repo"
> "Add the ability to sign out"
> "After deleting an artefact, it should be removed from the list, but don't refresh the whole page"
> "Add support for enterprise repositories"

Each iteration was instantly deployed and ready to test.

### 3. Creating the repository and implementing changes to host it outside of GitHub

At this point, I had a working prototype, but I wanted to host it outside of GitHub. Right now, GitHub Spark apps can only be hosted on GitHub's infrastructure. They can be shared, but right now, it requires users to log in with their GitHub account in order to use it. I believe this will change in the future, but for now, I wanted to have more control over the hosting.

By creating the repository, I got more control over the code. One thing I had to do was to remove the `@github/spark` package and replace the `useKV` calls with local state management using React's `useState`.

Another thing I had to do was change the Vite configuration to make sure the app would build correctly.

All of this was achieved by asking GitHub Copilot to help me with the implementation details.

## Key features of the dashboard

The final dashboard includes:

### Repository Storage Overview
- Display all repositories with Actions storage usage
- Show artefact counts and retention policies

### Detailed Storage Breakdown
- Individual artefact details (size, age, workflow source)
- Retention status and cleanup actions

### Enterprise Repository Support
- Access repositories from enterprise organisations
- Fine-grained permission controls

### Auto-Cleanup System
- Bulk operations across multiple repos
- Preview mode to see what would be deleted
- Start cleanup with a single click

## Try it yourself

You can use the dashboard at [gha-cleaner.elio.dev](https://gha-cleaner.elio.dev) or check out the source code on [GitHub](https://github.com/estruyf/github-actions-artifacts-cleaner).

To get started:
1. Visit the dashboard
2. Create a GitHub Personal Access Token with Actions (read & write) and Metadata (read) permissions
3. Connect your repositories and start monitoring

{{< blockquote type="important" text="If you want to see the enterprise resources, make sure you create the PAT on the enterprise level and give it `Members (read)` permissions." >}}

## What's next?

Right now the dashboard is sufficient for my needs, but if you have any feature requests or ideas, please open an issue on the [GitHub repository](https://github.com/estruyf/github-actions-artifacts-cleaner).

## Conclusion

GitHub Spark and GitHub Copilot made rapid prototyping trivial: natural‑language prompts and AI‑assisted code generation produced a working dashboard in minutes. That prototype highlighted what a centralised view of Actions artifacts could look like and sped up implementation of key features.

Note the current limitation: Spark apps run on GitHub and require users to sign in. To self‑host the app it was necessary to extract the code, remove the `@github/spark` runtime, replace `useKV` with React `useState`, and tweak the Vite config so the app builds and runs independently. The result is available at https://gha-cleaner.elio.dev and the source is on GitHub.

If you want to try it, visit the dashboard or clone the repository and adapt the code for your environment. Feedback and feature requests are welcome via the repository issues.

AI tools like Copilot speed up repetitive work and help explore solutions faster, but human review and careful testing remain essential for production use.
