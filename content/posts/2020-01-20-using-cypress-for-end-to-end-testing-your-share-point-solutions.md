---
title: Using Cypress for end to end testing your SharePoint solutions
slug: /cypress-testing-sharepoint-solutions/
author: Elio Struyf
type: post
date: 2020-01-20T13:10:01.384Z
draft: false
tags:
  - Development
  - SharePoint
  - Testing
categories: []
comments: true
---

Last year I already wrote an article about how you could implement visual UI tests for your SharePoint solutions by using Puppeteer in combination with Jest. I still use these tools for setting up various UI tests in our products, but a couple of months ago, a tool called Cypress caught my attention.

> **Info**: [Testing the UI of your SPFx solution with Puppeteer and Jest](https://www.eliostruyf.com/testing-the-ui-of-your-spfx-solution-with-puppeteer-and-jest/).

Cypress is a proven End-to-End testing framework that many React and Angular applications (also other types of course) are using. The tool itself wants to create a fast, easy, and reliable testing framework that runs within a browser. The power is that it provides you all the tools required with a minimal amount of configuration.

{{< caption-new "/uploads/2020/01/cypress1.png" "Cypress overview"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACFSURBVDXBSxLCIBBAwcc4SSn5eRJz/53lYeI+ViFMBJSF3a7+mBl2fBgHT1NKQURoQgjo6YTmnBER/OVMMqNTRUT4897TyHEcxJgARy2VnDMxRsyM5n5/sG1PtO97VCspJbquo1KJKTEOA8263lBVNIQ3uRSWeWLfX8zzxHVZ+JumEeccX300P9lXzfDuAAAAAElFTkSuQmCC" "1696" >}}

## Great, but does it work for SharePoint?

The short answer is **no**, or not straight away. The reason for this is the authentication. Authentication is something you have to take care of in Cypress. 

To test your SharePoint page, you will have to use a username and password (best to use a managed account), and you will have to go through the full authentication loop by filling in the login fields on the Microsoft login page. This approach is very similar when you use Selenium for testing your solutions.

Even when you implement the authentication flow, you nevertheless run into an authentication issue. The reason for this is that the page you will open does not get the authentication cookies that SharePoint needs.

> **Related issue**: [Cypress GitHub issue for login through Azure AD](https://github.com/cypress-io/cypress/issues/1342).

In the related issue, you can get more context about what is going wrong.

## How to solve this authentication issue?

There are two ways to approach this authentication issue, but both require you to fetch the authentication headers/cookies and provide them to the Cypress request.

In my case, I first implemented it by using Puppeteer in combination with `node-sp-auth` dependency. This approach is similar to the one I used for setting up my Visual UI tests with Puppeteer and Jest. The only difference here is that Puppeteer is used to getting the cookies from the browser session and pass them onwards to Cypress.

A couple of months ago, I noticed a comment from [csuzw](https://github.com/csuzw), which created a very similar approach, but with actually going through the `login.microsoftonline.com` authentication flow.

> **Info**: [Azure AD SSO plugin scripts for Cypress](https://gist.github.com/csuzw/845b589549b61d3a5fe18e49592e166f). 

The approach was a bit cleaner than mine, and I combined them to a new `SharePointLogin` plugin for Cypress.

## Show me some code

The solution contains two things:

SharePoint login Cypress plugin, which handles the authentication + retrieves and returns the cookies.
Cypress SharePoint authentication command, which calls the plugin with the provided options. This command itself is optional, but it cleaner to have. Otherwise, you will have to include this code in every `test`/`spec` file.

Here you can find the code from both the plugin and the command:

{{< gist estruyf 0206ae4c9b5b05c25545fd5464f09408 >}}

The actual test/spec file could look like this:

{{< gist estruyf 9987abd4993e2ffeb601b6f5b25833a6 >}}

> **Info**: In the `before` method, Cypress will establish the authenticate first before all tests start. 

Once this is in place, you can start writing your tests.

{{< caption-new "/uploads/2020/01/cypress2.png" "Cypress with SharePoint tests"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAAClSURBVI3BQWrCQBSA4f/lvWRsFom0i7YrA+JGxQMIwYt02UPYA5T2IB5ICtLeoxuTjDMSUHAh4vfJuKpWk+nszXeBGCPee3qDgUPV6P397ja2rOv5ev3x7pxDRFBNuLRvOr6/PrdWliXPL6/k+QMuS7mmKApMVXl6HHKLiJBwJ2t94L/x9EKI+BAggmqCJkKvPUTELB1lmVtwYmYggu86ztq2+TkCdTot5j4OXTAAAAAASUVORK5CYII=" "1824" >}}

## Running your tests

Once all your tests are in place (as well as the plugin + command), you can start running your tests with: `cypress open` (if you have cypress globally installed). In my case, I configured the command as a npm script:

```json
"scripts": {
  "test": "cypress open"
}
```

{{< caption-new "/uploads/2020/01/cypress3.png" "Cypress running tests for SharePoint solutions"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACYSURBVG3BUU4CMRSG0e/vLZ3CgxopbIEEtwGrkV26ITVmQpnpLSGEF8M52u8/voa8Wp/PFfeOd8eb4+7cBDOGlC7x83TabUrZLFLips0TCoYkujutNaZpvsTj4cC6FPKQURAhBNIiIomHcRyJc2t8//wS9Ick8jKzLe/8F4NFXl7fuBNmgWciPrNMRu8dM0MStVYk8VBr5QoTQDZ1/eCANQAAAABJRU5ErkJggg==" "2080" >}}

## Limitation

Not to forget, there currently is one major limitation when using Cypress for E2E testing your SharePoint solutions. This limitation involves that you do not have access to the SharePoint command bar. Due to this, you cannot verify the whole page flow, but also you will not be able to edit the page and your web part.

The reason is that SharePoint checks if it runs in an iframe. When it does, it will not render specific controls like the suite bar, command bar, and a couple of other things.

This limitation might not be a problem when you want to test out an already configured web part. Application customizers would be fully testable when they do not have a different rendering in edit mode.

{{< caption-new "/uploads/2020/01/cypress4.png" "Completed SharePoint tests, but without the command bar"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB6SURBVHXBQQrCMBRF0fvjx4YWEbsKh7oMceACRZfWScWhoKGIkOZJ5nqOnS9XuQVkhgHznJFAEpWZIYQfTkfasCTGhoU7Brg7KSW6rsPMqELfroixoZpzJudMFcobJD7TgyrwxzjcSa8n43Cjcn6QxHa/o1pvekopfAFbBy3NOSninwAAAABJRU5ErkJggg==" "2050" >}}

<blockquote class="important">
<p><strong>Important</strong>: In order to overcome this limitation, you can check out the following article that I wrote: <a href="https://www.eliostruyf.com/tests-running-iframe-cypress-e2e-tests/" title="How to make your tests believe it isn't running in an iframe during Cypress
  E2E tests">How to make your tests believe it isn't running in an iframe during Cypress
  E2E tests</a></p>
</blockquote>

## Checking out the code

I made a sample project available, so it is easier and quicker to get started without worrying about all plumbing yourself. You can find the project here: [Cypress E2E testing for SharePoint solutions sample](https://github.com/estruyf/cypress-sharepoint-sample)

*Happy E2E Testing*
