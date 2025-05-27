---
title: "Integrate testing in Power Apps release pipelines"
longTitle: "How to integrate testing in your Power Apps release pipelines"
customField: ""
slug: "/integrate-testing-power-apps-release-pipelines/"
description: "Learn how to set up a robust CI/CD pipeline for Power Apps that integrates automated testing to ensure reliability across your environments."
date: "2024-05-27T15:28:06.125Z"
lastmod: "2024-05-27T15:28:06.550Z"
preview: "/social/power-apps-release-testing.png"
draft: false
comments: true
tags:
  - "PowerApps"
  - "Testing"
  - "Playwright"
  - "CI/CD"
  - "GitHub Actions"
type: "post"
fmContentType: "post"
---

In my [previous blog post](/start-testing-power-apps-playwright/), I showed you how to start testing your Power Apps with Playwright. But once you have your tests in place, the next logical step is to integrate them into your release pipeline.

With a robust CI/CD pipeline, you can ensure that your Power Apps solution is thoroughly tested before it reaches your production environment. This gives you confidence that what you deploy works as expected and helps catch issues early in the development cycle.

In this blog post, I'll guide you through setting up a complete CI/CD pipeline for your Power Apps solution that includes automated testing. This pipeline will handle exporting your solution from a development environment, running tests against it, and deploying it to production if the tests pass.

## Getting started

For this post, I've created a [GitHub repository](https://github.com/estruyf/powerapp-release-testing) that demonstrates a complete setup for Power Apps release testing pipelines. The repository contains all the necessary files to set up a CI/CD pipeline for a Power Apps solution with automated testing.

The repository includes:

1. GitHub Actions workflow for the CI/CD pipeline
2. Custom GitHub Actions for solution export, testing, and release
3. End-to-end tests using Playwright

Let's dive into each of these components to understand how they work together.

## The CI/CD pipeline overview

The CI/CD pipeline consists of three main stages:

1. **Export**: Export the Power Apps solution from the development environment
2. **Testing**: Run end-to-end tests against the exported solution
3. **Release**: Import the solution to the production environment if tests pass

Here's a visual representation of this workflow:

{{< caption-new "/uploads/2024/05/power-apps-release-pipeline.webp" "Power Apps release pipeline overview" >}}

The pipeline is triggered either manually or automatically when changes are pushed to the main branch. This allows you to have control over when to run the pipeline while also ensuring that any new changes to your main branch trigger an automated deployment process.

## Setting up the GitHub Actions workflow

Let's start by looking at the GitHub Actions workflow file that orchestrates the CI/CD pipeline:

```yaml
name: Release StickerApp Solution

on:
  workflow_dispatch:
  push:
    branches:
      - main

env:
  SOLUTION_NAME: StickerApp

jobs:
  export:
    name: Export StickerApp Solution from DEV Environment
    runs-on: ubuntu-latest
    environment: DEV

    steps:
      - uses: actions/checkout@v4
      
      - name: Export Solution
        uses: ./.github/actions/export
        with:
          environment-url: ${{ vars.ENVIRONMENT_URL }}
          app-id: ${{ vars.CLIENT_ID }}
          tenant-id: ${{ vars.TENANT_ID }}
          client-secret: ${{ secrets.CLIENT_SECRET }}
          solution-name: ${{ env.SOLUTION_NAME }}

  testing:
    name: Testing StickerApp Solution on DEV Environment
    runs-on: ubuntu-latest
    needs: export
    environment:
      name: DEV
      url: ${{ vars.M365_PAGE_URL }}

    steps:
      - uses: actions/checkout@v4

      - name: Run the E2E test
        uses: ./.github/actions/playwright
        with:
          M365_PAGE_URL: ${{ vars.M365_PAGE_URL }}
          M365_USERNAME: ${{ secrets.M365_USERNAME }}
          M365_PASSWORD: ${{ secrets.M365_PASSWORD }}
          M365_OTP_SECRET: ${{ secrets.M365_OTP_SECRET }}
          environment: DEV

  release:
    name: Release StickerApp Solution to PROD Environment
    runs-on: ubuntu-latest
    needs: testing
    environment: PROD

    steps:
      - uses: actions/checkout@v4

      - name: Release StickerApp Solution
        uses: ./.github/actions/release
        with:
          environment-url: ${{ vars.ENVIRONMENT_URL }}
          app-id: ${{ vars.CLIENT_ID }}
          tenant-id: ${{ vars.TENANT_ID }}
          client-secret: ${{ secrets.CLIENT_SECRET }}
          solution-name: ${{ env.SOLUTION_NAME }}
```

This workflow file defines the three jobs we mentioned earlier:

1. **Export job**: Exports the Power Apps solution from the development environment
2. **Testing job**: Runs end-to-end tests on the exported solution
3. **Release job**: Imports the solution to the production environment if all tests pass

Each job depends on the successful completion of the previous job through the `needs` parameter. This ensures that the testing only happens if the export is successful, and the release only happens if the tests pass.

## Environment configuration

The workflow uses GitHub Environments for managing environment-specific configuration. Each environment (DEV and PROD) has its own set of variables and secrets.

### Environment variables

For both DEV and PROD environments, you need to set the following variables:

- `ENVIRONMENT_URL`: The URL of your Power Platform environment
- `CLIENT_ID`: The Azure AD application (client) ID for authentication
- `TENANT_ID`: The Azure AD tenant ID

Additionally, for the DEV environment, you need:

- `M365_PAGE_URL`: The URL of your Power App

### Environment secrets

For both environments, you need:

- `CLIENT_SECRET`: The Azure AD application client secret

For the DEV environment, you also need:

- `M365_USERNAME`: The username for authenticating to your Power App
- `M365_PASSWORD`: The password for authentication
- `M365_OTP_SECRET`: The OTP secret for MFA (if enabled)

{{< blockquote type="important" text="It is recommended to create a service account with the appropriate permissions for CI/CD operations. This way, you can avoid using personal credentials in your pipelines." >}}

## Custom GitHub Actions

To make the workflow reusable and maintainable, I've created custom GitHub Actions for each stage of the process. Let's look at each of these in detail:

### Export Action

The Export Action handles exporting your Power Apps solution from the development environment:

```yaml
name: 'Export Power Platform Solution'
description: 'Exports managed and unmanaged Power Platform solutions and uploads them as artifacts.'

inputs:
  environment-url:
    description: 'The URL of the Power Platform environment.'
    required: true
  app-id:
    description: 'Azure AD application (client) ID.'
    required: true
  tenant-id:
    description: 'Azure AD tenant ID.'
    required: true
  client-secret:
    description: 'Azure AD application client secret.'
    required: true
  solution-name:
    description: 'Name of the solution to export.'
    required: true

runs:
  using: "composite"
  steps:
    - name: Install Power Platform Tools
      uses: microsoft/powerplatform-actions/actions-install@v1

    - name: Create solutions directory
      run: mkdir -p "${{ github.workspace }}/solutions"
      shell: bash

    - name: Export Solution (managed)
      uses: microsoft/powerplatform-actions/export-solution@v1
      with:
        environment-url: ${{ inputs.environment-url }}
        app-id: ${{ inputs.app-id }}
        tenant-id: ${{ inputs.tenant-id }}
        client-secret: ${{ inputs.client-secret }}
        solution-name: ${{ inputs.solution-name }}
        solution-output-file: "${{ github.workspace }}/solutions/${{ inputs.solution-name }}_managed.zip"
        managed: true

    - name: Export Solution (unmanaged)
      uses: microsoft/powerplatform-actions/export-solution@v1
      with:
        environment-url: ${{ inputs.environment-url }}
        app-id: ${{ inputs.app-id }}
        tenant-id: ${{ inputs.tenant-id }}
        client-secret: ${{ inputs.client-secret }}
        solution-name: ${{ inputs.solution-name }}
        solution-output-file: "${{ github.workspace }}/solutions/${{ inputs.solution-name }}.zip"
        managed: false

    - name: Upload Managed Solution
      uses: actions/upload-artifact@v4
      with:
        name: "${{ inputs.solution-name }}_managed"
        path: "${{ github.workspace }}/solutions/${{ inputs.solution-name }}_managed.zip"

    - name: Upload Unmanaged Solution
      uses: actions/upload-artifact@v4
      with:
        name: "${{ inputs.solution-name }}_unmanaged"
        path: "${{ github.workspace }}/solutions/${{ inputs.solution-name }}.zip"
```

This action:

1. Installs the Power Platform CLI tools
2. Creates a directory for storing solution files
3. Exports the managed and unmanaged versions of your solution
4. Uploads both versions as GitHub artifacts for later use

The action leverages [Microsoft Power Platform Actions](https://github.com/microsoft/powerplatform-actions) to interact with your Power Platform environments.

### Playwright Action

The Playwright Action handles running the end-to-end tests:

```yaml
name: E2E test
description: Runs the E2E test

inputs:
  working-directory:
    description: 'The working directory where the tests are located'
    required: false
    default: './e2e'
  environment:
    description: 'The environment to run the tests against'
    required: true
    default: 'dev'
  # Variables
  M365_PAGE_URL:
    description: 'URL of the environment'
    required: true
  # Secrets
  M365_USERNAME:
    description: 'Username for the environment'
    required: true
  M365_PASSWORD:
    description: 'Password for the environment'
    required: true
  M365_OTP_SECRET:
    description: 'OTP secret for the M365 environment'
    required: true
  CONNECTOR_SP_ID:
    description: 'Connector SharePoint ID for the M365 environment'
    required: true

runs:
  using: composite
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: npm
        cache-dependency-path: ${{ inputs.working-directory }}/package-lock.json

    - name: Install dependencies
      shell: bash
      working-directory: ${{ inputs.working-directory }}
      run: npm ci

    - name: Store Playwright's Version
      shell: bash
      working-directory: ${{ inputs.working-directory }}
      run: |
        PLAYWRIGHT_VERSION=$(npm ls @playwright/test --depth=0 | grep @playwright | sed 's/.*@//')
        echo "Playwright's Version: $PLAYWRIGHT_VERSION"
        echo "PLAYWRIGHT_VERSION=$PLAYWRIGHT_VERSION" >> $GITHUB_ENV

    - name: Cache Playwright Browsers for Playwright's Version
      id: cache-playwright-browsers
      uses: actions/cache@v4
      with:
        path: ~/.cache/ms-playwright
        key: playwright-browsers-${{ env.PLAYWRIGHT_VERSION }}

    - name: Install Playwright Browsers
      shell: bash
      if: steps.cache-playwright-browsers.outputs.cache-hit != 'true'
      run: npx playwright install --with-deps chromium

    - name: Run Playwright tests
      run: npx playwright test
      shell: bash
      working-directory: ${{ inputs.working-directory }}
      env:
        M365_PAGE_URL: ${{ inputs.M365_PAGE_URL }}
        M365_USERNAME: ${{ inputs.M365_USERNAME }}
        M365_PASSWORD: ${{ inputs.M365_PASSWORD }}
        M365_OTP_SECRET: ${{ inputs.M365_OTP_SECRET }}
        CONNECTOR_SP_ID: ${{ inputs.CONNECTOR_SP_ID }}

    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: snapshots-${{ inputs.environment }}
        path: ${{ inputs.working-directory }}/tests/**/*/screenshots/
        retention-days: 30

    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: report-${{ inputs.environment }}
        path: ${{ inputs.working-directory }}/playwright-report/
        retention-days: 30
```

This action:

1. Sets up Node.js and installs dependencies
2. Caches and installs Playwright browsers
3. Runs the Playwright tests with the appropriate environment variables
4. Uploads test results (screenshots and reports) as GitHub artifacts

### Release Action

The Release Action handles importing your solution to the production environment:

```yaml
name: 'Release Managed Solution'
description: 'Composite action to download, install tools, and import managed solution to PROD'
inputs:
  environment-url:
    description: 'The URL of the Power Platform environment.'
    required: true
  app-id:
    description: 'Azure AD application (client) ID.'
    required: true
  tenant-id:
    description: 'Azure AD tenant ID.'
    required: true
  client-secret:
    description: 'Azure AD application client secret.'
    required: true
  solution-name:
    description: 'Name of the solution to export.'
    required: true

runs:
  using: "composite"
  steps:
    - name: Download Managed Solution
      uses: actions/download-artifact@v4
      with:
        name: "${{ inputs.solution-name }}_managed"
        path: "solutions"

    - name: Install Power Platform Tools
      uses: microsoft/powerplatform-actions/actions-install@v1

    - name: Import solution to PROD Environment
      uses: microsoft/powerplatform-actions/import-solution@v1
      with:
        environment-url: ${{ inputs.environment-url }}
        app-id: ${{ inputs.app-id }}
        tenant-id: ${{ inputs.tenant-id }}
        client-secret: ${{ inputs.client-secret }}
        solution-file: "solutions/${{ inputs.solution-name }}_managed.zip"
        force-overwrite: true
        publish-changes: true
```

This action:

1. Downloads the managed solution artifact from the Export job
2. Installs the Power Platform CLI tools
3. Imports the managed solution to the production environment

## Writing end-to-end tests

Now let's look at how to write end-to-end tests for your Power App using Playwright. The repository includes a comprehensive test suite that tests a Sticker Inventory app:

```typescript
import { test, expect, Page } from "@playwright/test";
import {
  getAppFrame,
  getButton,
  getControlByName,
  getGalleryItems,
  getLabel,
  mockConnector,
  waitForConnectorResponse,
} from "playwright-m365-helpers";
import { inventoryItems } from "../mocks/inventoryItems";
import { waitForImages } from "../helpers/waitForImages";
import { fakeItem } from "../mocks/fakeItem";

test.describe("PowerApps", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(process.env.M365_PAGE_URL || "", {
      waitUntil: "domcontentloaded",
    });

    const splashScreen = page.locator("#playerSplashScreen");
    await splashScreen.waitFor({ state: "hidden" });
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Check if canvas is loaded", async () => {
    await getAppFrame(page);
  });

  // Example test for checking the sticker inventory screen
  test("All inventory items", async ({ page }) => {
    await page.goto(process.env.M365_PAGE_URL || "", {
      waitUntil: "domcontentloaded",
    });

    const canvas = await getAppFrame(page);
    const nextButton = getButton(canvas, "NextBtn_1");
    await nextButton.click();

    const response = await waitForConnectorResponse(
      page,
      `sharepointonline/${process.env.CONNECTOR_SP_ID}`,
      "GET",
      { logging: true }
    );

    const data = await response.json();
    const totalItem = data.value.length;

    const gallery = getControlByName(canvas, "Gallery1");
    await expect(gallery).toBeVisible();

    const galleryItems = getGalleryItems(gallery);
    await expect(galleryItems).toHaveCount(totalItem);

    await waitForImages(gallery);

    await page.screenshot({
      path: "screenshots/inventory-list-results.png",
    });
  });

  // More tests...
});
```

The tests use the `playwright-m365-helpers` library, which provides helper functions for interacting with Power Apps components. This library makes it easier to:

- Navigate to Power App screens
- Interact with controls like buttons, labels, and galleries
- Mock connector responses for testing different scenarios
- Wait for API responses and handle authentication

As mentioned in my [previous blog post](/start-testing-power-apps-playwright/), the `playwright-m365-helpers` package contains several useful helper functions for Power Apps testing. It abstracts away many of the complexities of dealing with Power Apps' iframe structure and control hierarchy.

## Testing data scenarios

One powerful feature of Playwright is the ability to mock API responses. This allows you to test how your app behaves with different data scenarios without needing to manipulate actual data in your environments.

For example, you can test how your app handles an empty list of items:

```typescript
test("Check if no items label is shown", async ({ page }) => {
  await mockConnector(
    page,
    `sharepointonline/${process.env.CONNECTOR_SP_ID}`,
    { value: [] },
    "GET"
  );

  await page.goto(process.env.M365_PAGE_URL || "", {
    waitUntil: "domcontentloaded",
  });

  const canvas = await getAppFrame(page);

  const noItemsLabel = getLabel(canvas, "NoItemsLabel");
  await expect(noItemsLabel).toBeVisible();
});
```

Or you can test form validation and submission:

```typescript
test("Check if a new sticker can be created", async ({ page }) => {
  // Mock empty inventory first
  await mockConnector(
    page,
    `sharepointonline/${process.env.CONNECTOR_SP_ID}`,
    { value: [] },
    "GET"
  );

  // Load the app and navigate to the form
  await page.goto(process.env.M365_PAGE_URL || "");
  const canvas = await getAppFrame(page);
  const createBtn = getButton(canvas, "CreateBtn");
  await createBtn.click();

  // Fill out the form
  const titleField = getInput(canvas, "TitleValue");
  const descriptionField = getInput(canvas, "DescriptionValue", true);
  const priceField = getInput(canvas, "PriceValue");

  await titleField.fill("TypeScript Bear");
  await descriptionField.fill("A serious coding sticker!");
  await priceField.fill("3.50");

  // Mock the POST request to create a new sticker
  await mockConnector(
    page,
    `sharepointonline/${process.env.CONNECTOR_SP_ID}`,
    fakeItem(999, "TypeScript Bear", "A serious coding sticker!", "image.png", 3.5, 75),
    "POST",
    201
  );

  const submitBtn = getControlByName(canvas, "SubmitFormBtn");
  await submitBtn.click();

  // Verify success
  const successMessage = getLabel(canvas, "SuccessMessage");
  await expect(successMessage).toBeVisible();
});
```

By mocking connector responses, you can test various scenarios including:
- Empty data sets
- Single item responses
- Multiple item responses
- Error conditions
- Form validation and submission

## Best practices for Power Apps testing and CI/CD

Here are some best practices to follow when setting up a CI/CD pipeline for Power Apps:

### 1. Use a service account for authentication

Create a dedicated service account with the necessary permissions to export and import solutions and authenticate to your Power Apps. This avoids using personal accounts in your pipelines.

### 2. Separate environment configurations

Use GitHub Environments or similar features in your CI/CD tool to separate configuration for different environments (DEV, TEST, PROD). This ensures that secrets and variables are kept separate and secure.

### 3. Mock connector responses for predictable tests

Use the `mockConnector` function to create predictable test scenarios. This allows you to test how your app behaves with different data without having to manipulate real data.

### 4. Take screenshots for visual verification

Include screenshots in your tests to capture the state of the app at different points. This is especially useful for debugging test failures.

```typescript
await page.screenshot({
  path: "screenshots/inventory-result-description.png",
});
```

### 5. Use a consistent naming convention for controls

Use a consistent naming convention for controls in your Power Apps. This makes it easier to target them in tests using functions like `getControlByName`.

### 6. Check console logs for errors

Monitor the browser console for errors during testing. Unhandled errors in your Power App might not cause visible issues but could indicate underlying problems.

### 7. Test for both happy paths and error conditions

Test how your app behaves in both normal and error conditions. For example, test what happens when a form is submitted correctly and when it has validation errors.

## Integrating with issue tracking

To make your CI/CD process even more robust, you can integrate test results with issue tracking. For example, you can use the [Playwright Issue Creator](https://github.com/marketplace/actions/playwright-issue-creator) GitHub Action to automatically create issues for failed tests:

```yaml
- name: Create issues for failed tests
  if: always()
  uses: estruyf/playwright-issue-creator@v1
  with:
    report-path: e2e/playwright-report/results.json
    issue-prefix: "E2E Test Failure: "
    issue-labels: "bug,e2e-test"
    add-project-label: true
    add-comment: true
    job-summary: true
```

This automatically creates GitHub issues with details about failed tests, making it easier to track and fix problems.

## Conclusion

Integrating testing into your Power Apps release pipeline is a powerful way to ensure reliability and quality in your business applications. By setting up a CI/CD pipeline that automatically exports, tests, and releases your Power Apps solutions, you can:

- Catch bugs early in the development process
- Ensure consistent behavior across environments
- Reduce manual testing effort
- Build confidence in your deployments

The combination of Power Platform actions for solution management and Playwright for end-to-end testing provides a comprehensive framework for automating your Power Apps development workflow.

The sample repository at [https://github.com/estruyf/powerapp-release-testing](https://github.com/estruyf/powerapp-release-testing) contains all the code and configuration needed to get started with your own Power Apps release pipeline. You can use it as a starting point for your own projects and customize it to fit your specific needs.

By following the approach outlined in this blog post, you'll be well on your way to implementing a robust CI/CD pipeline for your Power Apps solutions.