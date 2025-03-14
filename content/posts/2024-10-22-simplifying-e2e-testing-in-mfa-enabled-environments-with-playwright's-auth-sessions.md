---
title: "E2E testing in MFA environment with Playwright auth session"
longTitle: "Simplifying E2E testing in MFA-enabled environments with Playwright's auth sessions"
customField: ""
slug: "/e2e-testing-mfa-environment-playwright-auth-session/"
description: "Easily perform E2E testing in MFA environments using Playwright's authenticated session state. Learn how to automate your tests without logging in every time."
date: "2024-10-23T10:05:24.847Z"
lastmod: "2024-10-23T10:05:25.382Z"
preview: "/social/ac3248d5-bb35-49b4-ab84-297bcc78c2a8.png"
draft: false
comments: true
tags:
  - "Authentication"
  - "E2E"
  - "MFA"
  - "Playwright"
  - "Testing"
  - "GitHub Actions"
type: "post"
fmContentType: "post"
---

A couple of months ago, I found a way to end-to-end test your solutions, which require you to log in on Microsoft with multifactor authentication enabled. The solution is to use a time-based one-time password (TOTP) that you can generate on the fly during your automated tests.

{{< blockquote type="info" text="You can read more about the approach in the [automating Microsoft 365 login with multi-factor authentication in Playwright tests](https://www.eliostruyf.com/automating-microsoft-365-login-mfa-playwright-tests/) article." >}}

Unfortunately, the TOTP approach is not possible for everyone, as the organization can disable this option. In these cases, you need to find another way to automate your tests, as the other options always require manual intervention.

At CollabDays Belgium 2024, I presented a session about automating your Playwright tests on GitHub actions. Afterward, I chatted with [Paul Beck](https://www.pbeck.co.uk) about using Playwright's codegen tool to store an authenticated session state.

Instead of logging in every time, you manually log in on your device, store the authenticated session state, and provide this for your automated tests. That way, you can start your automated tests with an authenticated session, and there is no need to log in every time. The approach would work as long as the session is valid. You must re-authenticate and store the new session state if the session expires.

In this article, I will show you how to use this approach to simplify your end-to-end tests in MFA-enabled environments.

## Things to know before you start

The authenticated session state is stored in a JSON file that holds the cookies and local storage data. A couple of essential cookies, like the **FedAuth** cookie, are needed to access Microsoft 365.

The **FedAuth** cookie expires in 7 days. If it expires, you need to re-authenticate.

The expiry can be automatically extended during the sliding window period. Typically, this happens automatically, but when you are working in an automated environment, you need to find a way to update the authenticated session state with the refreshed cookies.

## Creating the authenticated session state

To create an authenticated session state, you need to follow these steps:

- Run the Playwright's codegen command with the `--save-storage=<auth file path>` argument.
  
  ```bash title="Create the authenticated session state"
  npx playwright codegen <url> --save-storage=<auth file path>

  # example
  npx playwright codegen https://struyfconsultingdev.sharepoint.com/sites/playwright --save-storage=playwright/.auth/m365.json
  ```

- The command will open the browser and navigate to the provided URL.
- You need to log in and authenticate yourself.

  {{< caption-new "/uploads/2024/10/playwright-codegen.webp" "Playwright's codegen experience"  "data:image/jpeg;base64,UklGRo4AAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCIAAAABH0AgQPH/Z/GCGxERZ4WaAEgYhjf9M0BNQ0T0P9YQ99cAVlA4IEYAAACwAQCdASoKAAUAAUAmJZwCdADyf/xoAP76Vxbf4JVNip2L0ZfR6fmUsRM6ZIfZJPXLuBS77Az7EanbmrMGuBHDsd8UxDAA" "1200" >}}

- After the authentication, you can close the browser and see that a new file has been created.

{{< blockquote type="important" text="Never push this file to your repository, and best to do this with an account you only use on a test environment." >}}

## Using the authenticated session state in your tests

Once you have the authenticated session state, you can use it in your tests. You define this in your `playwright.config.ts` file.

```typescript title="playwright.config.ts"
import { defineConfig } from "@playwright/test";

export default defineConfig({
  ...
  projects: [
    {
      name: "chromium",
      use: {
        storageState: "playwright/.auth/m365.json",
      }
    }
  ],
});
```

{{< blockquote type="info" text="If you checked out the TOPT article, you will notice that the `setup` dependency is removed as we manually did the login." >}}

## Using the authenticated session state in GitHub Actions

When using the authenticated session state in GitHub Actions, you must ensure the file is available in your repository.

You can create a GitHub Actions secret that holds the content of the authenticated session state file, but this approach has an issue. The file is too big to store in a secret.

{{< caption-new "/uploads/2024/10/gh-action-secret-limit.webp" "The authenticated session size is too big"  "data:image/jpeg;base64,UklGRl4AAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSA0AAAABD3Bg64gIsQIR/Q8FAFZQOCAqAAAA0AEAnQEqCgACAAFAJiWkAAL2r+ifXbAA/vkHs1OjGo4PPmFjXhAsVAAA" "900" >}}

### Only keep the cookies

To solve this issue, you can only store the cookies in the authenticated session state file. This way, the file size is reduced, and you can store it in a GitHub Actions secret.

You only need to keep the `cookies` property from the authenticated session state file. You can remove the `origins` property, which holds the local storage data.

When you update the authenticated session state file, you can store it in a GitHub Actions secret.

{{< caption-new "/uploads/2024/10/auth-secret.webp" "GitHub Actions - Authenticated Session Secret"  "data:image/jpeg;base64,UklGRoAAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCIAAAABHyAQQWNttcYwR0QsQUHbNsz++LOoyrEqjYj+B1jyyw8WVlA4IDgAAACwAQCdASoKAAQAAUAmJZwAAveEKoIAAP765Wz/570w2ocHjZIREY+bRhZgdQQQImqQzY0bGvxIAA==" "900" >}}

### Create the authenticated session state in your GitHub Actions workflow

To use the authenticated session state in your GitHub Actions workflow, you must create the file before running your tests. Here is an example of how you can do this:

```yaml title=".github/workflows/e2e-testing.yml"
- uses: actions/github-script@v7
  with:
    script: |
      const { writeFileSync } = require('fs');
      writeFileSync('./playwright/.auth/m365.json', process.env.M365_AUTH_SESSION, 'utf8');
  env:
    M365_AUTH_SESSION: ${{ secrets.M365_AUTH_SESSION }}
```

{{< blockquote type="info" text="In this example, the `M365_AUTH_SESSION` secret holds the content of the authenticated session state file. Be sure to update the path to your preferred location." >}}

{{< blockquote type="important" text="You need to add this step before you start your Playwright tests" >}}

### Running your tests

When you have the authenticated session state file in place, you can run your tests by providing only the URL you want to start them (depending on the configuration).

```bash title=".github/workflows/e2e-testing.yml"
- name: Run Playwright tests
  run: npx playwright test
  env:
    M365_PAGE_URL: ${{ inputs.M365_PAGE_URL }}
```

### Updating the authenticated session state (when it expired)

As mentioned, the authenticated session state will expire after a certain period. When this happens, you need to re-authenticate and update the authenticated session state file. To update the authenticated session state file, follow the same steps to [create the authenticated session state](#creating-the-authenticated-session-state).

Once you have the updated file, remove the local storage data and update your GitHub Actions secret.

### Keeping your session alive (optional)

You can extend the session lifetime by running a script at the end of your tests to update the authenticated session state file. This way, you can keep your session alive for a more extended period.

To be able to do this, you will have to implement a couple of things:

- A new Playwright script to refresh and clean up the auth file
- A new GitHub Actions workflow step to run the script to update the secret
- A fine-grained Personal Access Token, the secret update

#### Refreshing the authenticated session state from Playwright

To refresh the authenticated session state, I am using the project teardown functionality, which runs after all dependent projects have finished.

```typescript title="playwright.config.ts"
import { defineConfig } from "@playwright/test";

export default defineConfig({
  ...
  projects: [
    {
      name: "chromium",
      use: {
        storageState: "playwright/.auth/m365.json",
      },
      teardown: 'refresh auth',
    },
    {
      name: 'refresh auth',
      testMatch: "refresh.auth.ts",
      use: {
        storageState: "playwright/.auth/m365.json",
      },
    }
  ],
});
```

In the `refresh.auth.ts` file, you can implement the logic to refresh the authenticated session state.

```typescript title="refresh.auth.ts"
import { test as teardown } from '@playwright/test';
import { readFile, writeFile } from 'fs/promises';

const AuthFile = "playwright/.auth/m365.json";

teardown('Refresh and clean up the auth file', async ({ page }) => {
  // Refresh the session
  await page.goto(process.env.M365_PAGE_URL || "");
  await page.waitForURL(process.env.M365_PAGE_URL || "");
  await page.context().storageState({ path: AuthFile });

  // Clean up the local storage data
  const authContent = await readFile(AuthFile, 'utf-8');
  const auth = JSON.parse(authContent);
  delete auth.origins;
  await writeFile(AuthFile, JSON.stringify(auth, null, 2), 'utf-8');
});
```

#### Creating a fine-grained Personal Access Token

To update the authenticated session state secret, you can make use of a fine-grained Personal Access Token (PAT).

To create a new token, you can go to the [Fine-grained Personal Access Tokens](https://github.com/settings/tokens?type=beta) page. The best approach is to create it only for the test repository and give it **read and write** access to the **secrets** scope.

{{< caption-new "/uploads/2024/10/fine-grained-pat.webp" "Fine-grained personal access token"  "data:image/jpeg;base64,UklGRpAAAABXRUJQVlA4WAoAAAAQAAAACQAACgAAQUxQSCQAAAABH0AgQBkMp+wwRUTEm0FR2zZQd/NnUZXjtO8gRPQ/KN+bP+VWUDggRgAAALABAJ0BKgoACwABQCYlnAAC512odQAA/vxDI6FAPOueEZ60HNyOz3/gQOxSBfi8Ocp4u+svxT7rU0IpElc4RR7bxf6IAAA=" "900" >}}

{{< blockquote type="note" text="Another way to update the secret is to use the [GitHub Actions Access Tokens - Action](https://github.com/qoomon/actions--access-token)." >}}

Create a new secret in your repository which holds the PAT.

{{< caption-new "/uploads/2024/10/pat-secret.webp" "GitHub Actions - PAT Secret"  "data:image/jpeg;base64,UklGRoIAAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCEAAAABHyAUQGMrpTiCKSJiCYoiEILGWz36N7FniIj+h4wUvwwAVlA4IDoAAADQAQCdASoKAAUAAUAmJZwAAuyhquIcAAD+/KUogbEV2MibUbmR3rink9PxvqWCJ9y9Gq4+d5r8SAAA" "900" >}}

#### Updating the authenticated session state secret

To update the authenticated session state secret, you can make use of the following GitHub Actions workflow step:

```yaml title=".github/workflows/e2e-testing.yml"
- name: Update the auth session
  if: ${{ !cancelled() }}
  working-directory: ./e2e
  run: |
    echo "Updating the auth session"
    updatedAuthSession=$(cat ./playwright/.auth/m365.json)
    gh secret set 'M365_AUTH_SESSION' --body "$updatedAuthSession" --repo ${{ github.repository }}
  env:
    GITHUB_TOKEN: ${{ secrets.GH_SECRETS_TOKEN }}
```

{{< blockquote type="important" text="You need to add this step after you run your Playwright tests" >}}

## The complete GitHub Actions workflow

The complete GitHub Actions workflow includes creating the authenticated session state file, running the tests, and updating the authenticated session state secret.

```yaml title=".github/workflows/e2e-testing.yml"
name: Release

on:
  workflow_dispatch:
  push:
    branches:
      - main
      - dev

jobs:
  testing:
    name: e2e testing with auth session
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      # Create the auth file based on the contents from `secrets.M365_AUTH_SESSION`
      - uses: actions/github-script@v7
        with:
          script: |
            const { writeFileSync } = require('fs');
            const authSession = process.env.M365_AUTH_SESSION;
            writeFileSync('./e2e/auth.json', authSession, 'utf8');
        env:
          M365_AUTH_SESSION: ${{ secrets.M365_AUTH_SESSION }}

      - name: Run Playwright tests
        run: npx playwright test
        env:
          M365_PAGE_URL: ${{ inputs.M365_PAGE_URL }}

      # Add your artifact upload step here

      - name: Update the auth session
        if: ${{ !cancelled() }}
        run: |
          echo "Updating the auth session"
          updatedAuthSession=$(cat ./auth.json)
          gh secret set 'M365_AUTH_SESSION' --body "$updatedAuthSession" --repo ${{ github.repository }}
        env:
          GITHUB_TOKEN: ${{ secrets.GH_SECRETS_TOKEN }}
```

## Conclusion

Using the authenticated session state can simplify your end-to-end tests in MFA-enabled environments. This approach allows you to start your tests with an authenticated session, and there is no need to log in every time.

Please use this approach only in the test environment and never push the authenticated session state file to your repository.
