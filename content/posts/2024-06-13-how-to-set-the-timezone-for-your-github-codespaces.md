---
title: "How to set the timezone for your GitHub Codespaces"
longTitle: ""
customField: ""
slug: "/set-timezone-github-codespaces/"
description: "Learn how to set the timezone for your GitHub Codespaces and avoid issues with dates."
date: "2024-06-13T10:23:21.911Z"
lastmod: "2024-06-13T10:23:21.911Z"
preview: "/social/31b3e480-6a29-4b9f-8efe-d60d708b7cd1.png"
draft: false
comments: true
tags:
  - "Azure"
  - "Codespaces"
  - "Date Formatting"
  - "GitHub"
  - "Timezone"
type: "post"
---

A couple of days ago, someone opened an issue for [Front Matter CMS](https://frontmatter.codes/) about the auto-update of the modified date in their articles that did not follow the date format. In the issue, they shared a video recording of the problem. I noticed that [GitHub Codespaces](https://github.com/features/codespaces) was used. GitHub Codespaces provides you with a cloud-based development environment for your repository.

When I looked into the issue, I noticed it was related to the fact that the GitHub Codespace uses UTC/GMT as its time zone. You can verify this by running the `date` command in the GitHub Codespace terminal.

{{< caption-new "/uploads/2024/06/terminal-date.webp" "Date and time result"  "data:image/jpeg;base64,UklGRmAAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSA0AAAABD/AcpoiIsP4R/Y8CAFZQOCAsAAAAkAEAnQEqCgACAAFAJiWkAAJcJc0QAP6JpC3otfjV1/w6fdXeUqpg31bYAAA=" "832" >}}

You can also check the timezone by running `cat /etc/timezone` in the terminal.

{{< caption-new "/uploads/2024/06/terminal-timezone.webp" "Timezone result"  "data:image/jpeg;base64,UklGRlgAAABXRUJQVlA4WAoAAAAQAAAACQAAAAAAQUxQSAsAAAAAVYODg4ODg4ODVQBWUDggJgAAALABAJ0BKgoAAQABQCYlpAACW8LXbAAA/cJvSeO0uwiuCMw8gAAA" "1012" >}}

Because the GitHub Codespace uses UTC as its time zone, the date formatting on the server side did not follow the user's timezone (+07:00), resulting in an incorrect date in the article.

{{< caption-new "/uploads/2024/06/gh-codespace-timeformat.webp" "GitHub Codespace - Date formatting"  "data:image/jpeg;base64,UklGRlgAAABXRUJQVlA4WAoAAAAQAAAACQAAAAAAQUxQSAsAAAAApcPDw8PDw8PDpQBWUDggJgAAALABAJ0BKgoAAQABQCYlnAJ0AN0YXewA/uuV9c+BfCuC0L9S+yQA" "2270" >}}

To overcome this issue, I looked into how to set the timezone for the GitHub Codespace. The solution I found is to set the `TZ` environment variable, which will be explained in the following steps.

## Setting the timezone for GitHub Codespaces

There are a couple of ways to set an environment variable for a GitHub Codespace:

- In the `.devcontainer/devcontainer.json` file in your repository
- In the Codespaces secrets settings
- Using a custom Dockerfile
- Using a [dotfiles repository](https://docs.github.com/en/codespaces/setting-your-user-preferences/personalizing-github-codespaces-for-your-account#dotfiles)

{{< blockquote type="info" text="You can read more about it in the [persisting environment variables and temporary files](https://docs.github.com/en/codespaces/developing-in-a-codespace/persisting-environment-variables-and-temporary-files) documentation of GitHub Codespaces." >}}

In this article, I will focus on the first two options.

### Setting the timezone in the devcontainer.json file

When a GitHub Codespace starts, it uses a Docker container to run your development environment. The `.devcontainer/devcontainer.json` file configures the container.

{{< blockquote type="important" text="As the file is part of your repository, the settings are shared with everyone who uses the repository." >}}

When you do not have a `.devcontainer/devcontainer.json` file in your repository, you can manually create it or run the `Codespaces: Add Dev Container Configuration Files...` (command ID: `github.codespaces.configureDevContainerCommand`) command from the command palette.

Once you have the `.devcontainer/devcontainer.json` file, you can set the `TZ` environment variable in the `remoteEnv` property.

```json
{
  "remoteEnv": {
    "TZ": "Europe/Brussels"
 }
}
```

{{< blockquote type="tip" text="You can find a list of timezones on the [Wikipedia page](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)." >}}

After you have saved the file, you can restart the GitHub Codespace to apply the changes. You can do this by running the `Codespaces: Rebuild Container` (command ID: `github.codespaces.rebuildEnvironment`) command from the command palette.

Once the GitHub Codespace has restarted, you can verify the timezone by running the `date` command in the terminal.

{{< caption-new "/uploads/2024/06/terminal-date-europe.webp" "Date and time result"  "data:image/jpeg;base64,UklGRl4AAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSA0AAAABD/AbpYiIsP4R/Y8CAFZQOCAqAAAAsAEAnQEqCgACAAFAJiWcAsOw3RhbgAD+3fODJN/g03Y7bTErKg90YAAA" "834" >}}

### Setting the timezone in the Codespaces secrets settings

This method has the advantage of allowing you to apply environment variables to specific repositories without committing changes to the repository. This keeps the settings private and only available to you.

To set the timezone in the Codespaces secrets settings, you can follow these steps:

- Go to GitHub
- Open your profile settings
- Click on the **Codespaces** link under the "Code, planning, and automation" section
- Click on the **New secret** button
- Add the `TZ` environment variable with the timezone value (e.g. `Europe/Brussels`)
- Select the repositories where you want to apply the environment variable

{{< caption-new "/uploads/2024/06/gh-codespace-secrets.webp" "GitHub Codespaces - Secrets settings"  "data:image/jpeg;base64,UklGRoAAAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSCIAAAABHyCmIfr388liakRETEJNACQMw5v+GaCnGSL6H2uI+9cAVlA4IDgAAACwAQCdASoKAAcAAUAmJaQAAudqxkMAAP7+Eiy13jyEBIt+zCG6JUZvEwM98KU5BI1mmpu564AAAA==" "1962" >}}

- Click on the **Add secret** button

After you have added the secret, you can restart the GitHub Codespace to apply the changes. To do this, run the `Codespaces: Rebuild Container` (command ID: `github.codespaces.rebuildEnvironment`) command from the command palette.

Once the GitHub Codespace has restarted, you can verify the timezone by running the `date` command in the terminal.

{{< caption-new "/uploads/2024/06/terminal-date-europe.webp" "Date and time result"  "data:image/jpeg;base64,UklGRl4AAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSA0AAAABD/AbpYiIsP4R/Y8CAFZQOCAqAAAAsAEAnQEqCgACAAFAJiWcAsOw3RhbgAD+3fODJN/g03Y7bTErKg90YAAA" "834" >}}
