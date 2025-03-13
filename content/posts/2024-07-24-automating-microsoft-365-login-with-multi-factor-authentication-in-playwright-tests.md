---
title: "Automating M365 login with MFA in Playwright tests"
longTitle: "Automating Microsoft 365 login with multi-factor authentication in Playwright tests"
customField: ""
slug: "/automating-microsoft-365-login-mfa-playwright-tests/"
description: "Learn how to automate the login process for Microsoft 365 with multi-factor authentication (MFA) using Playwright in this informative blog post."
date: "2024-07-24T10:13:18.887Z"
lastmod: "2024-07-24T10:13:19.398Z"
preview: "/social/d766d99b-6feb-4625-a03f-1302c26f1877.png"
draft: false
comments: true
tags:
  - "Automation"
  - "M365"
  - "MFA"
  - "Playwright"
type: "post"
fmContentType: "post"
---

I have been using Playwright to automate my tests for a long time, but one thing I struggled with was automating the login flow for Microsoft 365 with a multi-factor authentication (MFA) account. When using an MFA-enabled account, you must provide an additional manual step to complete the login process.

{{< caption-new "/uploads/2024/07/mfa-prompt.webp" "MFA prompt to approve the sign-in request"  "data:image/jpeg;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAACQAACgAAQUxQSCQAAAABH0AgQBkMq/zwQ0TEm0FR2zZQd/NnUZXjtO8gRPQ/KN+bP+VWUDggUAAAAPABAJ0BKgoACwABQCYlpAAC6ngYJ0JAAAD++9hTPkvvYdJJUhmv4Furt0dUh+CQIZw9/3EwnSnsobznzjmPpC/JBVV26Uh5gfkXCSMmAAAA" "600" >}}

{{< blockquote type="info" text="If you want to learn more about E2E testing for Microsoft 365 solutions, I wrote about it [End-to-End Test Microsoft 365 Solutions with Playwright](https://www.eliostruyf.com/test-microsoft-365-solutions-playwright/)." >}}

In my speaking sessions about Playwright, I have been saying it would be easier to use an account without MFA enabled, but only on a QA/test environment. But in reality, this is not always possible. Many companies have MFA enabled for all their accounts, and you need to deal with it. I decided to try it and see if it was possible to automate this.

{{< blockquote type="note" text="I have had a couple of discussions around this topic and got suggestions to access tokens, APIs, etc. One of the things I tried myself was to use the `auth.json` file (generated during a local login run) as a secret provided during CI/CD, but the problem with this approach is that you need to keep the auth up-to-date. The tokens expire, and you need to refresh them. Updating these tokens in your CI/CD pipelines is not something you want to do in your tests. You want a clean and reliable way to automate your tests." >}}

In this post, I will show you how you can automate the login flow for Microsoft 365 with an MFA-enabled account using Playwright.

## Playwright M365 starter template

To make it easier to follow along, I have created a Playwright M365 starter template, which you can use to test this out. You can find the template on GitHub: [estruyf/testing-microsoft365-playwright-template](https://github.com/estruyf/testing-microsoft365-playwright-template).

Follow the **installation** steps in the README file to get the project running.

{{< blockquote type="tip" text="You can use the Playwright M365 starter template for MFA enabled/disabled accounts." >}}

## MFA-enabled account requirements

Before we start, we need an MFA-enabled account configured to use an authenticator app with a **time-based one-time password (TOTP)**. The TOTP is a temporary code that changes every 30 seconds. This TOTP code is a common way to use MFA for various services but is also essential for this automation.

{{< blockquote type="important" text="When using the Microsoft Authenticator app, you will be prompted to approve the sign-in request on your phone. Therefore, this manual step is harder to automate, and the TOTP approach is more appropriate." >}}

TOTP is an algorithm that generates a temporary code using a secret key and the current time. The best part about this algorithm is that we can make use of a library for Node.js called [OTPAuth](https://www.npmjs.com/package/otpauth) can be used to create the code, and this library allows us to automate the login flow.

### Add a TOTP to your account

To add a TOTP to your account, you need to go to your account's security settings. Here is how you can do it:

- Go to the [Security info](https://mysignins.microsoft.com/security-info) page of the account you want to use
- Click on the **Add sign-in method** button
- Select **Authenticator app** and click on **Add**
- Click on the **I want to use a different authenticator app** link
- Click on the **Next** button
- Click on the **Can't scan image?** link
- Copy the **Secret key** and keep it safe as you will need it later

{{< caption-new "/uploads/2024/07/totp-secret-key.webp" "Copy the TOTP secret key"  "data:image/jpeg;base64,UklGRo4AAABXRUJQVlA4WAoAAAAQAAAACQAACAAAQUxQSCEAAAABHyAQSPy9JlgojYgIGWoCIGEY3vTPAEWNENH/WEPcZw0AVlA4IEYAAACwAQCdASoKAAkAAUAmJZwAAuppIKf4AP79mM29iDJVYCzzf83TkON+63YWxtCyrZZXC1QtnkH0UvEZs76UB44Dna7xgAAA" "1200" >}}

- Use your authenticator app to scan the QR code
- Click on the **Next** button
- Enter the code from your authenticator app and click on the **Next** button

{{< blockquote type="important" text="The secret key is only shown once. If you lose it, you must remove the authenticator app and add it again." >}}

If you want to use something other than an authenticator app to create the TOTP, the starter template also provides a script to generate the TOTP based on the secret key. You can run the following command to generate the TOTP:

```bash title="Generate TOTP"
# Replace `<secret key>` with the secret key you copied earlier.
npm run generate:otp -- <secret key>
```

{{< caption-new "/uploads/2024/07/generate-totp.webp" "Generate the TOTP"  "data:image/jpeg;base64,UklGRnwAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSB8AAAAAdrKysrKysrKydqv//////////6t2srKysrKysrJ2AFZQOCA2AAAA0AEAnQEqCgADAAFAJiWkAAMTwzCgnQAA/vhFdvda5w34WAz8dr1/xLZ+k7kqMJ7BV7eLgAAA" "600" >}}

The Playwright M365 starter template allows you to configure both the Microsoft Authenticator and the TOTP authentication methods.

{{< caption-new "/uploads/2024/07/account-with-msauth-totp.webp" "Account with Microsoft Authenticator and TOTP"  "data:image/jpeg;base64,UklGRogAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCAAAAABFyAQSENYUUx0RMSCggBIELAWwkgd6oaI/ofMvXlkAlZQOCBCAAAA0AEAnQEqCgAGAAFAJiWkAAL6HxS+KAAA/vz+zI/kdr5lnDtlguoyuoq86dHUvy4/NcFPOdTWt9iyOwve01MYAAAA" "1122" >}}

{{< blockquote type="info" text="When your account has the Microsoft Authenticator app configured, the login flow will click on the link to use the other authentication method to log in." >}}

## Automating the login flow

Once your account is configured with the TOTP, you can automate the login flow. To understand how the login flow works, let's go through the steps:

1. Open the login page
2. Enter the email address
3. Click on the **Next** button
4. Enter the password
5. Click on the **Sign in** button
6. Check if the account has the Microsoft Authenticator app configured
   - If yes, click on the **Use another authentication method** link and select the **TOTP** option
7. Enter the TOTP code
8. Click on the **Next** button
9. Click on the **No**/**Yes** button to stay signed in (it does not matter which one you choose for the tests)

Here is what it looks like in the code:

```typescript title="The login flow in code"
import { test as setup } from "@playwright/test";
import * as OTPAuth from "otpauth";

const AuthFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // 1. Open the login page
  await page.goto(process.env.M365_PAGE_URL || "");

  // 2. Enter the email address
  const emailInput = page.locator("input[type=email]");
  await emailInput.click();
  await emailInput.fill(process.env.M365_USERNAME || "");

  // 3. Click on the "Next" button
  await page.getByRole("button", { name: "Next" }).click();

  // 4. Enter the password
  const passwordInput = page.locator("input[type=password]");
  await passwordInput.click();
  await passwordInput.fill(process.env.M365_PASSWORD || "");

  // 5. Click on the "Sign in" button
  await page.locator("input[type=submit]").click();
  
  // 6. Check if the account has the Microsoft Authenticator app configured
  const otherWayLink = page.locator("a#signInAnotherWay");
  await otherWayLink.waitFor({ timeout: 2000 });
  if (await otherWayLink.isVisible()) {
    // Select the TOTP option
    await otherWayLink.click();

    const otpLink = page.locator(`div[data-value="PhoneAppOTP"]`);
    await otpLink.click();
  }

  // 7. Enter the TOTP code
  const otpInput = await page.waitForSelector("input#idTxtBx_SAOTCC_OTC");
  let totp = new OTPAuth.TOTP({
    issuer: "Microsoft",
    label: process.env.M365_USERNAME,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: process.env.M365_OTP_SECRET,
  });
  const code = totp.generate();
  await otpInput.fill(code);

  // 8. Click on the "Next" button
  await page.locator("input[type=submit]").click();

  // 9. Click on the "Yes" button to stay signed in
  await page.locator("input[type=submit][value='Yes']").click();
  await page.waitForURL(process.env.M365_PAGE_URL || "");

  await page.context().storageState({ path: AuthFile });
});
```

{{< blockquote type="info" text="The login flow uses the [Playwright authentication](https://playwright.dev/docs/auth) method to store the signed in state in a `playwright/.auth/user.json` file that other browsers will use." >}}

As you do not want to run the authentication flow before every test, it is configured as a separate login flow in the Playwright M365 starter template. It is defined as a dependency on other projects. You can find this configuration in the `playwright.config.ts` file:

```typescript title="The login flow as a dependency" 20
const USE_MFA = process.env.M365_OTP_SECRET ? true : false;

export default defineConfig({
  ...
  projects: [
    {
      name: "setup",
      testMatch: USE_MFA ? /mfa.setup.ts/ : /login.setup.ts/,,
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
```

{{< blockquote type="important" text="When you provide the `M365_OTP_SECRET` in the starter template, it will make use of the MFA flow. Otherwise, it uses the password-only flow." >}}

## Using the Playwright M365 starter template locally

To use the Playwright M365 starter template locally, you need to follow these steps:

- Have the project cloned on your machine
- Follow the **installation** steps in the README file
- Configure the `.env` file with the following variables:
  
```bash title=".env file configuration"
# The URL you want to test (e.g., `https://<tenant>.sharepoint.com/`)
M365_PAGE_URL=<the URL you want to test>
M365_USERNAME=<your email address>
M365_PASSWORD=<your password>

# When using the MFA login flow
M365_OTP_SECRET=<the secret key you copied>
```

- Run the tests using the following command:

```bash title="Run the tests"
npm test

# Or if you want to run the tests in the UI mode
npm run test:ui
```

Here is a video of the login flow in action:

{{< video "/uploads/2024/07/m365-mfa-login.mp4" "Microsoft 365 - MFA login flow" >}}

## Running tests in GitHub Actions

The Playwright M365 starter template provides a GitHub Actions workflow configuration for running the tests in a CI/CD pipeline. The workflow configuration is in the `.github/workflows/e2e-testing.yml` file.

To use the workflow, make sure to configure the following variables and secrets in your GitHub repository:

### Variables

- `M365_PAGE_URL`: The URL you want to test (e.g., `https://<tenant>.sharepoint.com/`)

### Secrets

- `M365_USERNAME`: Your email address
- `M365_PASSWORD`: Your password
- `M365_OTP_SECRET`: The secret key you copied

## Conclusion

Automating the login flow for Microsoft 365 with an MFA-enabled account was easier than I thought. The Playwright M365 starter template provides a clean and reliable way to automate the login flow. This way, you can focus on writing your tests and not worry about the login flow.

{{< blockquote type="important" text="When you use the Playwright M365 starter template, make sure to keep your secrets safe. Do not commit them to your repository." >}}

You can find the Playwright M365 starter template on GitHub: [estruyf/testing-microsoft365-playwright-template](https://github.com/estruyf/testing-microsoft365-playwright-template).