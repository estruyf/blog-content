---
title: "Override SPFx context properties during Playwright E2E tests"
longTitle: ""
customField: ""
slug: "/override-spfx-context-properties-playwright-e2e-tests/"
description: "Learn how to override SPFx context properties while running Playwright E2E tests. It allows you to perform tests with your mocked properties."
date: "2024-07-08T13:34:57.735Z"
lastmod: "2024-07-08T13:34:58.265Z"
preview: "/social/d4bd837f-014b-498f-93ec-3b08af44db6e.png"
draft: false
comments: true
tags:
  - "Playwright"
  - "SPFx"
  - "E2E"
type: "post"
---

While creating new E2E tests for a SharePoint Framework solution, I wanted to test the solution with different permission sets. Usually, when you run your tests, you start these up with a user with the required permissions to run the tests. Instead of creating a new user with different permissions or different sites/pages to perform the tests, I looked into the possibility of overriding the context properties of SPFx.

By overriding the context properties, you can perform the tests against the same page and, in my case, the same user but with different permissions.

## How to override the context properties

You first need access to the `context` object to override the context properties. When working in a SPFx solution, you can access it from `this.context`, but during an E2E test, you need to get access to it differently.

There is a `moduleLoaderPromise` property on the `window` object, a promise that resolves to the `moduleLoader` object together with the `spClientSidePageContext` object.

To gain access, you can use the following code:

```typescript title="Get access to the context object"
// Wait until the `moduleLoaderPromise` is available
await page.waitForFunction(() => (window as any).moduleLoaderPromise);

// Get the `context` object
await page.evaluate(() => {
  const moduleLoader = (window as any).moduleLoaderPromise;
  if (!moduleLoader?.context) {
    console.log("Module loader context is not available");
    return;
  }

  return moduleLoader.context;
});
```

With the `context` object, you can override the properties. For example, in my case, I want to override the permissions of the `web` object to mock a user with owner, member, or visitor permissions.

```typescript title="Override the permissions of the web object"
const overridePermissions = async (page: Page, permission: "owner" | "member" | "visitor",) => {
  await page.waitForFunction(() => (window as any).moduleLoaderPromise);

  await page.evaluate(async ({ permission, type }) => {
    const moduleLoader = await (window as any).moduleLoaderPromise;
    if (!moduleLoader.context) {
      console.log("Module loader context is not available");
      return;
    }

    // Visitor permissions
    let permissionValue = { High: 176, Low: 138612833 };

    if (permission === "owner") {
      // Owner permissions
      permissionValue = { High: 2147483647, Low: 4294705151 };
    } else if (permission === "member") {
      // Member permissions
      permissionValue = { High: 432, Low: 1011028719 };
    }
    
    moduleLoader.context._pageContext._web.permissions._value = permissionValue;
  }, { permission, type, });
};
```

With the overridden permissions, you can perform your tests against the same page. You can use the `overridePermissions` function to switch between permission sets.

```typescript title="Perform tests with different permissions"
test.describe("Permissions", () => {
  test(`Full control`, async ({ page }) => {
    await page.goto(`<your url>`, {
      waitUntil: "domcontentloaded",
    });

    await overridePermissions(page, "owner");

    // Perform your tests
  });
});
```

## Conclusion

By overriding the context properties of SPFx, you can perform your E2E tests against the same page but with mocked properties, allowing you to test your solution quicker without creating new users, pages, or sites for each test case.

Of course, for in-depth testing of your solution, it would be better to use a user with the correct permission set, but for simple cases like when your solution needs to show or hide certain elements, the current solution is a perfect fit.
