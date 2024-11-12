---
title: "Mock Power Apps connectors in tests with Playwright"
longTitle: ""
customField: ""
slug: "/mock-power-apps-connectors-tests-playwright/"
description: "Learn how to mock Power Apps connectors in tests using Playwright for a controlled testing environment and accurate results."
date: "2024-11-12T09:19:10.583Z"
lastmod: "2024-11-12T09:19:11.230Z"
preview: "/social/91e72890-23ed-4b32-8cdf-c5e720f01618.png"
draft: false
comments: true
tags:
  - "API"
  - "Mocking"
  - "Playwright"
  - "PowerApps"
  - "Testing"
  - "Connectors"
type: "post"
fmContentType: "post"
---

Power Apps connectors allow you to connect your app to external services like SharePoint, Microsoft 365, or custom APIs. When you build a Power App, you can use these connectors to read and write data from these services. For instance, you can get a list of items from a SharePoint list, create a new item in a SharePoint list, etc.

When testing solutions, you want to do this in a controlled environment. For example, you want to see how the app behaves when the SharePoint list is empty or when it returns two items. Typically, you would mock the API calls to simulate these scenarios, but it works slightly differently in Power Apps. In this post, I will show you how to mock Power Apps connectors in tests with Playwright.

## How Power Apps connectors work under the hood

When you use a connector in Power Apps, it uses the actions defined in the connector. The main difference when you are used to working with APIs is that you do not have to write the HTTP requests yourself. Power Apps uses the Azure API Management connector to call the APIs.

{{< blockquote type="info" text="You can read more about this in the following article from Microsoft - [Power Platform - connecting to other data sources](https://learn.microsoft.com/en-us/power-platform/admin/security/connect-data-sources#connecting-to-other-data-sources)." >}}

When you open your Power App in the browser, you can see the calls to the API Management endpoint by looking at the `**/invoke` endpoint calls.

{{< caption-new "/uploads/2024/11/api-hub-connector-call.webp" "Calling the API via API Management"  "data:image/jpeg;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoKAAIAAUAmJZQAAup2wl8AAP78srKv80jhYQ+CRV/gy22CAAA=" "1311" >}}

As all calls go out to the `**/invoke` endpoint, it is hard to distinguish between the different calls. The trick is to look at the request headers.

In the request headers, you can find the `x-ms-request-url` and `x-ms-request-method` headers. These contain the information you need to know which connector is used and what action is performed.

Here is an example of calling the SharePoint list to fetch all items:

{{< caption-new "/uploads/2024/11/sharepoint-fetch-items.webp" "Connector call for fetching SharePoint list items"  "data:image/jpeg;base64,UklGRjAAAABXRUJQVlA4ICQAAACQAQCdASoKAAEAAUAmJZwAAudZt7gA/vxnccyBkZmfOx7XAAA=" "1138" >}}

Here is an example of calling a custom API:

{{< caption-new "/uploads/2024/11/custom-api-call.webp" "Connector call for a custom API"  "data:image/jpeg;base64,UklGRjAAAABXRUJQVlA4ICQAAACQAQCdASoKAAEAAUAmJZwAAp1HJkgA/vzKVK2u9zC27ZO8QAA=" "809" >}}

In both screenshots, you can see that the `x-ms-request-url` contains the connector ID. These IDs like `sharepointonline/4aee3a63496d4e3f998c3910ba712bf2` are required to mock the connector requests/responses.

You can also find the connector ID by going to the [Power Apps portal](https://make.powerapps.com/), navigating to "connections," and selecting the connector you want to mock. The same ID will be in the URL.

## Mocking the connector in Playwright

You can use the `page.route` method to mock API calls in Playwright. This method allows you to intercept requests and modify its response.

{{< blockquote type="info" text="You can read more about how to mock APIs in the following article from Playwright - [mock APIs](https://playwright.dev/docs/mock)." >}}

Here is an example of how you can mock the SharePoint list items call:

```typescript
await page.route("**/items", async (route) => {
 status: 200,
 body: JSON.stringify({
 value: [],
  });
});
```

We need to do a bit more work mocking the connector calls. First, we need to intercept the requests to the `**/invoke` endpoint. Then, we need to look at the request headers to determine which connector and method are called. Based on this information, we can return the correct response.

Here is an example of how you can mock the SharePoint list items call from a connector:

```typescript
const connectorId = "sharepointonline/4aee3a63496d4e3f998c3910ba712bf2";
const connectorMethod = "GET";

// Listen for the invoke endpoint
await page.route("**/invoke", async (route) => {
  // All calls to the invoke endpoint should be POST requests
  const apiMethod = route.request().method();
  if (apiMethod !== "POST") {
    // Continue the route if the method is not POST
    return route.continue();
  }

  // Retrieve the request headers
  const headers = route.request().headers();
  const requestUrl = headers["x-ms-request-url"];
  const requestMethod = headers["x-ms-request-method"];

  // Verify the request URL
  if (!requestUrl || !requestUrl.includes(connectorId)) {
    // Continue the route if the connector ID is not in the request URL
    return route.continue();
  }

  // Verify the request method
  if (!requestMethod || requestMethod !== connectorMethod) {
    // Continue the route if the method does not match
    return route.continue();
  }

  // Modify the response to your needs
  route.fulfill({
 status: status,
 contentType: "application/json",
 body: JSON.stringify({
 value: [],
    }),
  });
});
```

In the above code, we first check if the request is a POST request. Then, we retrieve the request headers and check if the `x-ms-request-url` contains the connector ID. If it does, we check if the `x-ms-request-method` matches the method we want to mock. If it does, we return the mocked response.

{{< blockquote type="note" text="The method your connector uses depends on the type of action you perform. Fetching items is a \"GET\" request, but adding a new item will be a \"POST\" request. You can always verify these method types by opening the app in your browser and checking the network traffic." >}}

## Simplify mocking with the Microsoft 365 Playwright helpers

To make it easier to mock the Power Apps connectors, I have created a library for Playwright called [playwright-m365-helpers](https://www.npmjs.com/package/playwright-m365-helpers). This library contains a set of helpers for end-to-end testing of Microsoft 365 applications with Playwright.

When working with Power Apps connectors, there are a couple of useful helpers:

- `mockConnector`: This helper allows you to mock a connector request based on the connector ID and method.
- `waitForConnectorRequest`: This helper allows you to wait for a connector request and return the request headers.
- `waitForConnectorResponse`: This helper allows you to wait for a connector request and return a mocked response.

Here is an example of how you can use the `mockConnector` helper:

```typescript
await mockConnector(
  page,
  "sharepointonline/4aee3a63496d4e3f998c3910ba712bf2",
  { value: [] },
  "GET"
);
```

This sample code does the same as the previous example, but it is more readable and more accessible to use.

## Integrating the mocked API calls in your tests

You can use the `page.route` or `mockConnector` methods in your tests. Here is an example of how I verify that my app works when the SharePoint list is empty:

```typescript
import { getAppFrame, getLabel, mockConnector } from "playwright-m365-helpers";

test("Check if no items label is shown", async ({ page }) => {
  await mockConnector(
    page,
    "sharepointonline/4aee3a63496d4e3f998c3910ba712bf2",
    { value: [] },
    "GET"
 );

  await page.goto(process.env.PA_PAGE_URL || "", {
 waitUntil: "domcontentloaded",
  });

  const canvas = await getAppFrame(page);

  const noItemsLabel = getLabel(canvas, "NoItemsLabel");
  await expect(noItemsLabel).toBeVisible();
});
```

In this test, I first configured the mock SharePoint list items call to return an empty array. Then, I navigated to the Power App. When the app loads, it will automatically call the SharePoint list. The mocked response will intercept this call. Finally, I verified that the label with the ID `NoItemsLabel` is visible.

## Conclusion

When testing Power Apps solutions, you want to do this in a controlled environment. You can mock the Power Apps connectors in tests with Playwright by intercepting the requests to the `**/invoke` endpoint. By looking at the request headers, you can determine which connector and method is called. Based on this information, you can return the correct response.

To make it easier to mock the Power Apps connectors, I have created a library for Playwright called [playwright-m365-helpers](https://www.npmjs.com/package/playwright-m365-helpers). This library contains a set of helpers for end-to-end testing of Microsoft 365 applications with Playwright.
