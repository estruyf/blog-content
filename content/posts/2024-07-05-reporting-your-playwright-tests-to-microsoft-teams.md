---
title: "Reporting your Playwright tests to Microsoft Teams"
longTitle: ""
customField: ""
slug: "/reporting-playwright-tests-microsoft-teams/"
description: "Learn how to easily report your Playwright test results to a Microsoft Teams channel with the help of the playwright-msteams-reporter reporter."
date: "2024-07-05T15:01:13.964Z"
lastmod: "2024-07-05T15:01:13.964Z"
preview: "/social/e51b81b7-041e-48fe-ae42-acabb21f8d50.png"
draft: false
comments: true
tags:
  - "Microsoft Teams"
  - "Playwright"
  - "Testing"
  - "E2E"
type: "post"
---

When you work in a team that uses Microsoft Teams as its primary communication tool, it can be useful to report your test results directly to a Teams channel. This way, everyone on your team can quickly see the test results and act on them if needed.

{{< caption-new "/uploads/2024/06/e2e-test-results.webp" "Playwright test results in Microsoft Teams"  "data:image/jpeg;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCIAAAABHyCmIfrnc8piakRETEJNACQMw5v+GaCnGSL6H2uIe9YAVlA4ICoAAACQAQCdASoKAAYAAUAmJaQAAudZtgAA/v3YoGH87hRv4QfwQvyShLR+AAA=" "958" >}}

In this article, I will show you how you can report your Playwright test results to a Microsoft Teams channel.

## Prerequisites

Before you can start reporting your Playwright test results to Microsoft Teams, you need to have the following:

- A Playwright project
- A Microsoft Teams webhook URL
- The [playwright-msteams-reporter](https://www.npmjs.com/package/playwright-msteams-reporter) dependency

### Setting up the Microsoft Teams webhook

The `playwright-msteams-reporter` dependency uses the incoming webhook feature in Microsoft Teams. You can find more information on how to do this in the [Microsoft documentation](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=newteams%2Cdotnet#create-an-incoming-webhook).

Once you have configured the incoming webhook, you will receive a URL that you can use to send messages to a specific channel. Copy this URL, as you will need it in the reporter's configuration.

{{< caption-new "/uploads/2024/06/incoming-webhook-url.webp" "Incoming webhook URL"  "data:image/jpeg;base64,UklGRnwAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCMAAAABH6CQbQTI32sE47lHIyLiRChuQAaOihc9xhMR/Y/mCRFqHgBWUDggMgAAAJABAJ0BKgoABAABQCYlnAACW8e8xAD++VKU0Gge51s8fOQPjzrTarY9L9ehDyc8MAAA" "680" >}}

### Installing the reporter

To install the `playwright-msteams-reporter` dependency, run the following command in your Playwright project:

```bash {title="Install the reporter"}
npm install playwright-msteams-reporter
```

## Configuring the reporter

Once you installed the reporter, it is time to configure it. In your `playwright.config.js` configuration file, you can add the following configuration to enable the reporter:

```typescript {title="Configure the reporter"}
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html'],
    [
      'playwright-msteams-reporter',
      {
        webhookUrl: "<webhookUrl>",
      }
    ]
  ],
});
```

{{< blockquote type="important" text="Add the webhook URL to the `<webhookUrl>` property." >}}

### Mentioning users on failed tests

The `playwright-msteams-reporter` also supports mentioning users in the message when a test fails. To enable this feature, you can add the `mentionOnFailure` property to the configuration:

```typescript {title="Configure the reporter with user mentions"}
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html'],
    [
      'playwright-msteams-reporter',
      {
        webhookUrl: "<webhookUrl>",
        mentionOnFailure: "Name <name@sample.be>, name@sample.be",
      }
    ]
  ],
});
```

{{< blockquote type="important" text="When a test fails, the reporter will mention the user(s)." >}}

{{< caption-new "/uploads/2024/06/failed-e2e-tests.webp" "Failed tests with mentions"  "data:image/jpeg;base64,UklGRnQAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCIAAAABFyAWTPz5dgaTRkTEgoK2bZjubwBb/miGIaL/IZ4hH/EAVlA4ICwAAACQAQCdASoKAAYAAUAmJaQAAudZtgAA/v3YoGsrDa+DmXrbBI6h03soAAAAAA==" "971" >}}

### Linking to the GitHub workflow run

You can add a link workflow when running your Playwright tests in a GitHub Actions workflow. To enable this feature, you can add the `linkToResultsUrl` property to the configuration:

```typescript {title="Configure the reporter with workflow URL"}
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html'],
    [
      'playwright-msteams-reporter',
      {
        webhookUrl: "<webhookUrl>",
        mentionOnFailure: "Name <name@sample.be>, name@sample.be",
        linkToResultsUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
      }
    ]
  ],
});
```

## Running your tests

Once you have configured the reporter, you can run your Playwright tests. The reporter will send a message with the test results to the configured Microsoft Teams channel.

{{< caption-new "/uploads/2024/06/e2e-test-results.webp" "Playwright test results in Microsoft Teams"  "data:image/jpeg;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCIAAAABHyCmIfrnc8piakRETEJNACQMw5v+GaCnGSL6H2uIe9YAVlA4ICoAAACQAQCdASoKAAYAAUAmJaQAAudZtgAA/v3YoGH87hRv4QfwQvyShLR+AAA=" "958" >}}

More configuration options are available for the `playwright-msteams-reporter`. For more information, check out the [playwright-msteams-reporter](https://www.npmjs.com/package/playwright-msteams-reporter) documentation.

Give it a try, and let me know your experiences. Feedback and suggestions are always appreciated!