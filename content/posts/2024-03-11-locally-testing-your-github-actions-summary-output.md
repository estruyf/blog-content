---
title: "Locally verifying GitHub Actions Job Summaries"
longTitle: ""
customField: ""
slug: "/locally-verifying-github-actions-job-summaries/"
description: "Learn how to locally verify and test your GitHub Actions Job Summaries with the help of @actions/core dependency. Save time by testing before pushing changes."
date: "2024-03-11T09:46:31.518Z"
lastmod: "2024-03-11T09:46:31.519Z"
preview: "/social/c7b3bece-017c-4968-ae9e-90be9ab57642.png"
draft: false
comments: true
tags:
  - "GitHub"
  - "GitHub Actions"
  - "Testing"
type: "post"
---

GitHub Actions Job Summaries are a great way to provide more information on your job's output. This summary is shown in the Actions tab of your repository.

{{< caption-new "/uploads/2023/08/example-with-details.png" "GitHub Actions reporter for Playwright with details markup"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbklEQVR4nGMwNrObrWtsdVXX2Pq0uo7JWUU1nbNK6npgrKyhd1pJXe+akrruNAZ9C6uDRpaO/7X0zf+qaBn+V9U2QsKGf9R1Tf6raBvtZtA0NpunbWJ5U8fQ4ryyhv5FJXU9ZHxeUU3vlqKa3kwArS4odypGMBsAAAAASUVORK5CYII=" "1287" >}}

{{< blockquote type="info" text="You can read more about it on [Supercharging GitHub Actions with Job Summaries](https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/)" >}}

In this post, I'll explain how you can locally develop and test your GitHub Actions Job Summary outputs using the [@actions/core](https://www.npmjs.com/package/@actions/core) dependency.

{{< blockquote type="info" text="Testing your summary locally will save you some time, as you don't have to push your changes to GitHub to see if your summary output is working as expected." >}}

In my case, I used this approach to develop the [GitHub Actions Reporter for Playwright](https://www.npmjs.com/package/@estruyf/github-actions-reporter). This npm package generates a summary output for your Playwright tests.

## How to write a summary output

The easiest way to write a GitHub Actions summary is to use the [@actions/core](https://www.npmjs.com/package/@actions/core) dependency. The `@actions/core` dependency provides functions for inputs, outputs, logging, and more.

You can write the job summary using the `core.summary` methods. Once completed, you can call the `core.summary.write()` method to write the buffer to the Job Summary output on GitHub Actions.

```typescript {title="generateSummary.mjs | Summary sample"}
import * as core from '@actions/core';

const summary = core.summary;

summary.addHeading("My job summary heading", 1);
summary.addSeparator();

summary.addList(['item1','item2','item3'], true);

await summary.write();
```

The downside of this approach is that you have to push your changes to GitHub to see if your summary output is working as expected. When you try to run it locally, it will throw an error saying it is unable to find the `GITHUB_STEP_SUMMARY` environment variable.

## Testing your summary locally

To test your summary locally, you must set the `GITHUB_STEP_SUMMARY` environment variable. This variable defines the file path where the summary output should be written. Locally, we can pass a local file path to this environment variable.

Here is an example of how to set the `GITHUB_STEP_SUMMARY` environment variable when running your script locally.

```typescript {title="generateSummary.mjs | Local job summary testing"}
import * as core from '@actions/core';
import { join } from "path";
import { existsSync, unlinkSync, writeFileSync } from "fs";

const __dirname = import.meta.dirname;

if (process.env.NODE_ENV === "development") {
  const summaryFile = join(__dirname, "summary.html");
  if (existsSync(summaryFile)) {
    unlinkSync(summaryFile);
  }
  writeFileSync(summaryFile, "", "utf-8");
  process.env.GITHUB_STEP_SUMMARY = summaryFile;
  process.env.GITHUB_ACTIONS = "true";
}

const summary = core.summary;

summary.addHeading("My job summary heading", 1);
summary.addSeparator();

summary.addList(['item1','item2','item3'], true);

await summary.write();
```

When you run your script locally, you will see that the `summary.html` file is created with the content of your summary output. The generated file contents look like this:

```html {title="summary.html"}
<h1>My job summary heading</h1>
<hr>
<ol><li>item1</li><li>item2</li><li>item3</li></ol>
```
