---
title: "End-to-End Test Microsoft 365 Solutions with Playwright"
longTitle: ""
customField: ""
slug: "/test-microsoft-365-solutions-playwright/"
description: "This article explains how you can make use of Playwright to end-to-end test your Microsoft 365 (SharePoint & Microsoft Teams) solutions."
date: "2023-08-24T14:13:30.235Z"
lastmod: "2023-08-24T14:13:30.693Z"
preview: "/social/b52a2991-8723-4b74-88ac-59bb8ecf56a9.png"
draft: false
comments: true
tags:
  - "E2E"
  - "Microsoft 365"
  - "Playwright"
  - "Testing"
type: "post"
---

In the past, I have written a couple of articles about end-to-end (E2E) testing your SharePoint/Microsoft Teams solutions with Cypress, Puppeteer, and Playwright. I was a big fan of Cypress, but I must admit that Playwright caught up and became my favorite tool for E2E testing.

For me, the most significant advantage of Cypress was the visual UI for running your tests, but the main disadvantage was its use of an iframe, which caused issues for testing SharePoint and Microsoft Teams. In these other articles, I shared how you could overcome these issues, but a couple of versions ago, Playwright added its [UI mode](https://playwright.dev/docs/test-ui-mode), which is very similar to the Cypress UI but without the iframe issues. That, for me, was the main reason to switch to Playwright.

{{< caption-new "/uploads/2023/08/playwright-ui-mode.png" "UI mode of Playwright"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAClSURBVE3BzW3CQBCA0W9mZ10Jig9Y/PiSRMk19EgxvkEBWKYQcCLh7HonipAQ78mmbfcUX4/jSNM01HVNsEDOGXcnhEDXdSfLM8uU8muMkWEYWG1bPt/fKF4Q7q6Xa7bvX0e1IpJRcbarht3ui2d932OWfvjnqjhKSolpmng2zzOyWLwcgA+LhojgJXO7TbjzoKpHA86AuVYgSioBqSK449xp0PMfBTJHsH8dppsAAAAASUVORK5CYII=" "1342" >}}

In this article, I will show you how to get started with Playwright and how to test your Microsoft 365 solutions with it.

## Getting started

To get you started, I have created a [GitHub repository](https://github.com/estruyf/testing-microsoft365-playwright-template), which can be used as a template and contains the following:

- Default Playwright test configuration
- Login script for Microsoft 365
- Sample test for a SharePoint page
- GitHub Actions workflow to run your tests

## Authentication

To be able to run your tests for any of your Microsoft 365 solutions, you first need to authenticate. The easiest way in Playwright is to authenticate before running your tests. It is to use the `storageState` functionality. This `storageState` allows you to store the cookies and local storage of your browser session into a file that can be reused for your tests.

{{< blockquote type="info" text="Check Playwright's [authentication](https://playwright.dev/docs/auth) documentation for more information." >}}

For the Microsoft 365 authentication, a `login.setup.ts` file has been created with the following steps:

{{< highlight typescript "linenos=table,noclasses=false" >}}
import { test as setup } from "@playwright/test";
import { AuthFile } from "../constants/AuthFile";

/**
 * Login to Microsoft 365
 * More info: https://playwright.dev/docs/auth
 */
setup("authenticate", async ({ page }) => {
  await page.goto(process.env.PAGE_URL || "");

  const emailInput = page.locator("input[type=email]");
  await emailInput.waitFor();
  await emailInput.click();
  await emailInput.fill(process.env.USERNAME || "");

  await page.getByRole("button", { name: "Next" }).click();

  const passwordInput = page.locator("input[type=password]");
  await passwordInput.waitFor();
  await passwordInput.click();
  await passwordInput.fill(process.env.PASSWORD || "");

  await page.locator("input[type=submit][value='Sign in']").click();
  await page.locator("input[type=submit][value='Yes']").click();
  await page.waitForURL(process.env.PAGE_URL || "");

  await page.context().storageState({ path: AuthFile });
});
{{< / highlight >}}

{{< blockquote type="important" text="Make sure to use a test account which does not require MFA." >}}

{{< blockquote type="alert" text="The Playwright M365 starter template allows you to use MFA-enabled accounts too. For more information on using MFA-enabled acccounts, check the [Automating Microsoft 365 login with multi-factor authentication in Playwright tests](https://www.eliostruyf.com/automating-microsoft-365-login-mfa-playwright-tests/) article." >}}

The login has been added as a dependency for the other tests, meaning that when you run a test, it authenticates, stores the state in the `playwright/.auth/user.json` file, and then runs the test.

You can check this out in the `playwright.config.ts` file:

{{< highlight typescript "linenos=table,noclasses=false" >}}
export default defineConfig({
  ...
  projects: [
    {
      name: "setup",
      testMatch: /login\.setup.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: {
          width: 2560,
          height: 1440,
        },
        storageState: AuthFile, // Using the auth (storage state) file
      },
      dependencies: ["setup"], // Setup will run first
    },
  ],
});
{{< / highlight >}}

## Writing some tests

With the login configuration in place, you only need to write some tests.

Here is an example:

{{< highlight typescript "linenos=table,noclasses=false" >}}
import { test, expect, Page } from "@playwright/test";

test.describe("Page load", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    // Open a new page to be reused between tests
    page = await browser.newPage();
    await page.goto(process.env.PAGE_URL || "", {
      waitUntil: "domcontentloaded",
    });
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Check site header title", async () => {
    const header = page.locator("[data-automationid='SiteHeaderTitle'] a");
    await header.waitFor();

    await expect(header).toHaveText("Communication site");
  });

  test("Check screenshot", async () => {
    await expect(page).toHaveScreenshot();
  });
});
{{< / highlight >}}

In the above test, I used the logic to [reuse a single page](https://playwright.dev/docs/test-retries#reuse-single-page-between-tests) between all your tests. With this logic, the page will not be closed between each test; instead, it gets reused. It will speed up your tests SharePoint and MS Teams can be slow to load on the first time.

## Out-of-the-box visual comparisons

Another great feature of the Playwright's testing library is that it includes visual comparisons. This functionality allows you to take screenshots of your pages and compare them with previous versions. These comparisons are great for detecting visual regressions between your versions/code changes.

{{< blockquote type="info" text="When I did my first talk on E2E testing, I showed a solution I created with [pixelmatch](https://github.com/mapbox/pixelmatch). Playwright also uses this library." >}}

The result of such a visual comparison can be seen in the following screenshot:

{{< caption-new "/uploads/2023/08/playwright-visual-comparison.png" "Visual comparison of a page"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACNSURBVDXBQWrDUBBEwdfzR6vE2uYAMRh0e98nAl/AeBNBhL6mYy1Upd77PSK+JXGyzUES2IDn3Lbt2lqbJCGJqmJZFmwzDAOZyZtyXVciAklUFZLITE77vmObtE3vHUlUFRHBobWGbU45jiMHv57wmNFtgr9fuHxhQBKHjIgfwAhoho9PaB1CIAHibf4HvTc774R3nGsAAAAASUVORK5CYII=" "1900" >}}

{{< blockquote type="info" text="Here I have added a button to the page which pushes the content at the bottom downwards." >}}

To add a visual comparison to your test, all you need is the following code:

{{< highlight typescript "linenos=table,noclasses=false" >}}
test("Check screenshot", async () => {
  await expect(page).toHaveScreenshot();
});
{{< / highlight >}}

{{< blockquote type="important" text="The first time you run this, it creates the screenshot. Next time you run the test, it will use the screenshot (snapshot) for its comparison." >}}

## Conclusion

Playwright is an excellent tool for E2E testing your Microsoft 365 solutions. It is easy to get started with and has many great features out-of-the-box. To learn more about Playwright, check out their [documentation](https://playwright.dev/docs/intro).

{{< blockquote type="info" text="You can make use of the following GitHub Repository to get you started: [E2E Testing of Microsoft 365 solutions with Playwright](https://github.com/estruyf/testing-microsoft365-playwright-template) " >}}

## Updates

### 2024-07-24

The Playwright M365 starter template can now be used in combination with MFA-enabled accounts. For more information check the [Automating Microsoft 365 login with multi-factor authentication in Playwright tests](https://www.eliostruyf.com/automating-microsoft-365-login-mfa-playwright-tests/) article.
