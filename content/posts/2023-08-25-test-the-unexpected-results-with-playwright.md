---
title: Test the unexpected API results with Playwright mocking
longTitle: ""
customField: ""
slug: /test-unexpected-api-results-playwright-mocking/
description: "Test unexpected API results with Playwright mocking: Simulate server issues, throttling, ... to make sure your application handles it as expected."
date: 2023-08-25T14:22:30.885Z
lastmod: 2023-08-25T14:22:31.365Z
preview: /social/520b8d94-5990-49f9-bdd9-9b4cd9230623.png
draft: false
comments: true
tags:
  - API
  - Mocking
  - Playwright
  - Testing
type: post
---

When building applications, you can expect things to go wrong. For instance, calls you make to APIs like a server issue, incorrect formatted body, throttling, and much more. A great tool to locally test these unexpected scenarios is [Microsoft 365 Developer Proxy](https://github.com/microsoft/m365-developer-proxy) which can be used for both Microsoft 365 APIs, but also for any other APIs. You can use the tool to simulate errors, throttling, and much more.

The tool is great during development and local testing, but when running your tests in a CI/CD pipeline, you need to have predictability and control over the results. As otherwise, your test might fail, and you have to investigate what went wrong.

Testing these unexpected results is still important as you want to make sure that your application can handle these scenarios and to make sure that your users get a proper error message.

In this article, I will show you how you can test the unexpected results with Playwright.

## Getting started

To get you started, make sure you already have a Playwright test configuration. You do not have one yet? Check out the [Playwright documentation](https://playwright.dev/docs/intro). If you want to create tests for Microsoft 365, SharePoint, or Microsoft Teams, you can use my [Playwright template](https://github.com/estruyf/testing-microsoft365-playwright-template).

## Mocking API failures

A nice feature from Playwright is the ability to mock API calls. This feature allows you to pass responses, but also to simulate failures.

### Mocking an internal server error

To mock an API call, you need to use the `page.route` method. Here is an example of how you can mock an internal server error:

```typescript {linenos=table,noclasses=false}
await page.route("**/_api/web/lists", async (route) => {
  await route.fulfill({
    status: 500,
  });
});
```

{{< blockquote type="info" text="In the example above, I am mocking the call to the `/_api/web/lists` endpoint. When the call is made, I am returning a 500 status code." >}}

A complete test looks like this:

```typescript {linenos=table,noclasses=false}
test("API failed - 500", async () => {
  await page.route("**/_api/web/lists", async (route) => {
    await route.fulfill({
      status: 500,
    });
  });

  const result = page.getByTestId("api-result");
  await result.waitFor();

  await expect(result).toHaveText("Result: 500 - Internal Server Error");
});
```

{{< blockquote type="info" text="The expected result depends on how you handle the error in your application. In this example, I am expecting the error to be displayed as `Result: 500 - Internal Server Error`." >}}

### Mocking a throttling error

When using third party APIs, you might be throttled when you make too many calls. To test this scenario, you can use the following code:

```typescript {linenos=table,noclasses=false}
await page.route("**/_api/web/lists", async (route) => {
  await route.fulfill({
    status: 429,
  });
});
```

Now, this will always return a 429 error. In case of throttling, you might also want to test out your retry logic. What you can do is to check out the number of API calls that were made, and after X-times, perform the actual call. For that you can use the `route.continue()` method.

Here is an example of how you can do this:

```typescript {linenos=table,noclasses=false}
test("API throttled (success) - 429", async () => {
  let nrOfCalls = 0;

  await page.route("**/_api/web/lists", async (route) => {
    nrOfCalls++;

    if (nrOfCalls === 3) {
      route.continue();
    } else {
      await route.fulfill({
        status: 429,
      });
    }
  });

  const result = page.getByTestId("api-result");
  await result.waitFor();

  await expect(result).toHaveText(
    "Result: 429 - Too Many Requests, 429 - Too Many Requests, 200"
  );
});
```

{{< blockquote type="info" text="In the example above, I am mocking the call to the `/_api/web/lists` endpoint. When the call is made, I am returning a 429 status code. The first two times, I am returning the 429 error, but the third time, I am calling the `route.continue()` method. This method will continue the call to the actual endpoint." >}}

When you run this in the UI mode of Playwright, you will see the following result:

{{< caption-new "/uploads/2023/08/mocking-429.png" "Mocking 429 calls"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAC2SURBVC3BMU7DQBRF0fv+2BKENCwhSZG0FChrQ1CBKECsg924i4zZQ5ICLDT2+M+AJc7Rfn/7PgxpN00Tq9WazWaNmeGe8Zw5HY80TdNVMabdNPlNKYWP9kDbHgDh7tzdP/D2+kJKiSrnTEojZmJxtUQS7k7f9zw/PTKThMUYKaWwvLxmK2eREhfjiCTMjJkkjH/fP2c+S6APgS8ghIAkZpKogI4/IQTquibnjCSGYaCUwszMul+v3VVlyKjmUgAAAABJRU5ErkJggg==" "1620" >}}

### Mocking an incorrect body response

Another scenario you can test is when the response's body is incorrect. For instance, when retrieving a list of items, the body is formatted differently than expected.

Here is an example of how you can mock this:

```typescript {linenos=table,noclasses=false}
test("API result with wrong body", async () => {
  await page.route("**/_api/web/lists", async (route) => {
    await route.fulfill({
      json: {
        items: [
          // ...
        ]
      }
    });
  });

  const result = page.getByTestId("api-result");
  await result.waitFor();

  await expect(result).toHaveText("Result: 200 - Unexpected response body");
});
```

{{< blockquote type="info" text="In the example above, I am mocking the call to the `/_api/web/lists` endpoint. When the call is made, I return a JSON object with an `items` property. In the body, you can add any other objects you want, as long as it is something your application does not expect and you can test for." >}}

## Conclusion

You can test many other scenarios, such as timeouts, when data creation fails, etc., but I hope this article gives you a good insight into why and how you can test these scenarios.

Testing unexpected results is important to ensure your application can handle these scenarios. Playwright allows you to easily mock these "unexpected" API calls so you can make sure that your application handles them as expected.