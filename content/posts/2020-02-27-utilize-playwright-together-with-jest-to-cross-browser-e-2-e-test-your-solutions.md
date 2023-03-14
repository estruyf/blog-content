---
title: Utilize Playwright together with Jest to cross-browser E2E test your solutions
slug: /utilize-playwright-jest-cross-browser-e2e-test-solutions/
author: Elio Struyf
type: post
date: 2020-02-27T17:52:11.832Z
draft: false
tags:
  - Development
  - E2E
  - Testing
  - UI Tests
categories: []
comments: true
---

On my journey to select the best tool for our end-to-end tests for our teams, I tested out the recently announced Playwright tool from Microsoft. This tool is the new version of Puppeteer (as the core team members moved to Microsoft). 

> **Info**: The benefits of E2E tests are that it validates if your features work (or keep working when implementing changes), and also provides a more code-driven approach of documenting the features and user flows.

Like Puppeteer, Playwright allows you to automate browser tasks (navigating to a page, taking a screenshot, interacting with the page, and more). The best functionality is that it has cross-browser support. You can run tests against Chromium, Firefox, and WebKit. 

<blockquote class="important">
<p><strong>Important</strong>: Playwright is still in development, so do not expect everything to work.</p>
</blockquote>

It is also good to know that Playwright is not a testing tool, but you can use it for this functionality. That is where Jest is coming into play. You can also use other test runners, but in my experience, Jest is the one that works with minimal configuration.

> **Info**: As a reference, you can use the Puppeteer article, which I wrote some time ago: [Testing the UI of your SPFx solution with Puppeteer and Jest](https://www.eliostruyf.com/testing-the-ui-of-your-spfx-solution-with-puppeteer-and-jest/).
> 
> **Project**: The sample project for this article can be found on GitHub - [https://github.com/estruyf/playwright-jest-e2e](https://github.com/estruyf/playwright-jest-e2e).

## Things you need to start testing

To start, you will only need Playwright and Jest for your project dependencies:

{{< highlight bash "linenos=table,noclasses=false" >}}
npm init
npm i playwright jest -S -E
{{< / highlight >}}

Once you have created a new project and installed these two dependencies, all you need is the configuration to run the tests.

As I said, Jest requires minimal configuration, so you only have to update the **test** command in your `package.json` file to execute: `jest`.

## Writing your first test

Your first test could look like this:

{{< gist estruyf 30329c788aea4d92a8178d97905c5922 >}}

As you configured to run Jest as the test for `npm`, you are now able to run it via `npm test`.

{{< caption "/2020/02/playwright1.png" "Running tests with Playwright and Jest"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACTSURBVFXBSQ6CMABA0d9S2jA6hMjCw3gM7+vGq5igGAdaaqA1Llj4nqiPh6hkwnTuSZVimmeqIsNojR09OlW8Botyp46sMBitkVIghGAOgcE5uv5BiJEfuV1V5KnBmJS7G3hWE7fZMvoPVZmzkG2zYd82uNGTSEmzrlFJQgRiiCzU8215Dw7rPGWu2PnA5Wpx/PsCl+o9P7LErIAAAAAASUVORK5CYII=" "500" >}}

## Adding cross-browser support to your test

Until now, it is not so different compared to Puppeteer. I only had to change a small number of methods to migrate my Puppeteer tests to Playwright. The coolest part about Playwright is cross-browser support. You can configure this in your tests by adding a simple `for` loop.

The previous test will look like this:

{{< gist estruyf 00e016772a01a4c9d2d50ef1865f7343 >}}

Run `npm test` again, and Jest will now automatically test against all supported browsers.

{{< caption "/2020/02/playwright2.png" "Running cross-browser tests"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACtSURBVDXBTU4CQRCA0a+qe34COmKMOxNZuDPxCp7Cg3oKz+HOhBAQxBm6u7p0Frwnt2+vvvwW8ucvKsJwvUQEYlCmc+JFIakSx48t3bAAnOrO8eeEu9M0kZQL77sD1R0VQDUgCDPnnwggFKtcxBCUKWXMjOSGOLQSOJ5GrFaqOzN9fnrk4f6O0Eeu1gPtqqNvG4oZU8pcxK/Nju3+wOzGA2nMlBhY9B3VnVyM2R+ftU1pyHek/AAAAABJRU5ErkJggg==" "500" >}}

## Adding support for SharePoint Online testing

Testing against SharePoint is the same as how it was for Puppeteer. To authenticate, you can use the `node-sp-auth` dependency. With this dependency, you can get the authentication headers, and pass that to the Playwright browser. 

You can find the code for the SharePoint Authentication can here: [SharePoint Authentication helper](https://github.com/estruyf/playwright-jest-e2e/blob/dev/src/helpers/SharePointAuthentication.ts).

## Running on Azure DevOps

Running it on your local machine is useful for verifying when you are extending/changing features and want to know if everything works as expected. The real value lies in the automation part.

Azure DevOps is great, and Playwright can just run on the available hosted build agents without the need for any special configuration.

In the sample I created, you can verify the provided pipeline: [azure-pipelines.yml](https://github.com/estruyf/playwright-jest-e2e/blob/dev/azure-pipelines.yml) - [e2e.testing.yml template](https://github.com/estruyf/playwright-jest-e2e/blob/dev/devops/e2e.testing.yml).

The whole test pipeline looks like this:

{{< caption "/2020/02/playwright3.png" "Azure DevOps pipeline for Playwright and Jest"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAAAklEQVR4AewaftIAAAD+SURBVHXB4WrCMBSG4fecJqFG+8f7v0WFTilqmnxrYAUn2/PY9XrVuq7knAkh8J9QSuHr+cXtdqO1xvF4JMbIrpRCF06nEyklaq08n09ijOScebeuK2EYBpa6kIeMu1NKYZ5n3J1aK+fzmWFwAhs3ZxdjZJomfjMCGzfH3YkxklLiL4GNEJ0kaq0sy0I3jiPuTud8aK3RuTudJFprBDaG0VrDzDAzcs7sSilIIvBmXVe61+tFzpmUEjFGSik4m6aGJDpJuDspJd45m6bGzsyQxCfngyQkcblcmOcZSXSBzZQmaq1I4nA4MI4jO0l0zo/WGmbG4/Hgfr+zMzPMjG8CKYE1MlrjHgAAAABJRU5ErkJggg==" "500" >}}

Automatically screenshots are taken before and after each test. The pipeline publishes these screenshots as artifacts.

{{< caption "/2020/02/playwright4.png" "Screenshot artifacts"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABYSURBVH3B0RHCMAxEwXeyhZnxAP2XCFRgffhICiC7en++vo8bYwyu9NfzgSQykys9IqgqbPNPRNA5VBVrLfbeSOIkCdvYprVG55CZ2MY2kjjZJiKYc3L6AXcYIjieMbZCAAAAAElFTkSuQmCC" "800" >}}

<blockquote class="important">
<p><strong>Important</strong>: The sample tests are just as a reference for you to get started.</p>
</blockquote>

After all tests, the `JUnit` file gets published, and you can verify the test outcome. You can find the configuration for JUnit in the [jest.config.js](https://github.com/estruyf/playwright-jest-e2e/blob/dev/jest.config.js) file.

{{< caption "/2020/02/playwright5.png" "Test results"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABUSURBVG3BMQ7DIBBFwQcsyBEF9z9civRRrC1IBfvt9JlJ7q69N6UUcs6YGf/k1hq9d16fJ+f3zY+7I4k5J5KotWI3JBEEKUREMMYgpcTxODAz1lpca7slnQWaz0MAAAAASUVORK5CYII=" "700" >}}

If you want to run a similar pipeline on your environment, you need a variable group with the following settings:

{{< caption "/2020/02/playwright6.png" "Settings required to run the automated tests on Azure DevOps"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAAA+SURBVIXBMQoAIRAEwZ5lVfz/U80WYS4SjLwqrbU8xqC1xkvOObGNbW5VRe+dIyOCvTeSuGUmkjjCNlXFnw8oNhYU5L794AAAAABJRU5ErkJggg==" "700" >}}

> **Info**: The sample project for this article can be found on GitHub - [https://github.com/estruyf/playwright-jest-e2e](https://github.com/estruyf/playwright-jest-e2e).
>
> **Note**: Another approach might be to create a stage for each browser (and pass in the browser name as a parameter) and run the tests in parallel. This will speed up the tests.

## Conclusion

If you know Puppeteer, or used Puppeteer already. Playwright will be very easy to get you started. There are not a lot of differences. 

I like the simplicity of Playwright and how easy it is to use it with a testing framework like Jest. For complete test runs, it is great, but when it comes to single test runs, it requires a bit more manual steps for your testers or developers.

I also miss a video option like in Cypress. This makes it easy for testers/developers to understand what might have gone wrong during the automated tests. Screenshots are good, but videos make it a lot easier.

The most significant advantage is that the tests run in a "real" browser. Not in an iframe like Cypress. Maybe that does not matter for most solutions you are testing, but for SharePoint, this makes a huge difference. When a SharePoint page gets loaded in an iframe, you do not have all SharePoint page controls available.
