---
title: >-
  How to make your site believe it isn't running in an iframe during Cypress
  E2E tests
slug: /tests-running-iframe-cypress-e2e-tests/
author: Elio Struyf
type: post
date: 2020-05-11T09:15:28.387Z
draft: false
tags:
  - Cypress
  - Development
  - SharePoint
  - Testing
  - UI Tests
  - Unit tests
categories: []
comments: true
---

Cypress is a fantastic front end testing tool but has one major limitation. I already blogged about it a while ago. The limitation is that it runs all tests within an iframe. This iframe approach makes sense, as it allows the tool to show the running tests and the page in one view. For me, this is also one of the strengths of the tool itself, but it could also make it impossible to test specific sites.

> **Info**: you can find my related article about setting up Cypress for SharePoint testing here: https://www.eliostruyf.com/cypress-testing-sharepoint-solutions/

For example, when running Cypress against SharePoint, it will be a different experience. Most of the Microsoft 365 and SharePoint controls would not be loaded. The positive side about it is that it speeds the page load time enormously, but the downside is that you cannot test your solution from A to Z.

Here is a screenshot of my page loaded in a browser:

{{< caption-new "/uploads/2020/05/iframe1.png" "Page loaded in a browser"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAADFSURBVHXBMU7CUBjA8f/7+vW9lqiLixsBWUjwDs4eghswOLp4BJy4hQncgTAyEycIhBgGosSSUCl9pklJOuDvZ14H7/7hzuJzT7NZ5/qqhjGGxXLNbvdDQSKHPnefiNQgIogYzhqNOvkpJz15pp9H9KbmEBGSJCHLMpxzqCqF0FqsMTzeRygl7z1BEBDHMZcoJeccYRjyH6FkrWU87PO13bCaz5iM3qgSKhYflsP+SLqH7eaWKqWi+9LjrNVpU1h+/5Jmnj+gBDmy4lxEIwAAAABJRU5ErkJggg==" "1321" >}}

Notice the differences here with loading it in Cypress:

{{< caption-new "/uploads/2020/05/iframe2.png" "Page loaded in Cypress"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAACxSURBVH3BQWrCQBSA4f/NexmGxEXAdQn1MC49St15DT1MXXbZlZveoXTXVEGtYRISEUYIpe33SdM0A4mq8tMwDMQYMe89IkJd16gq3nvMjBszwzmHiGCMZFlGnuf8xkiKoiCEwF8cSQiB3XZNc/nm8PXJbruh73vuHEnbtrw+v3M+njjtD7y9fOCc485IzIzFakk5nTIpS+bLJ8aMRESYPVbcqCpV9cCYxRgREf7TdR1XURMxPV7t924AAAAASUVORK5CYII=" "1206" >}}

This iframe approach does not only affect tests running against SharePoint but other sites as well. The issue with SharePoint is that you do not own the platform, so you cannot make any modifications to make sure it loads these elements whenever it is testing in Cypress.

## How to trick your site to load the full page experience

If you own/control the platform/site, you can verify if your website loads from Cypress with `window.Cypress`, and if that is the case, you could allow the elements to be loaded.

> **Info**: Detect if a site/app is running under Cypress: https://docs.cypress.io/faq/questions/using-cypress-faq.html#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress

If you do not have control or do not want to do any code changes, you can also make use of the `cy.stub` functionality. Stubs allow you to modify a function so that you gain control over it during your tests.

> **Info**: Read more on how to use stubs here: https://docs.cypress.io/api/commands/stub.html#Syntax

What if you do not have control, and there is no function to stub? This issue is the case when testing against SharePoint. SharePoint provides only the minified code to you, which means that the primary object name can be different with each version. Stubbing should still be a solution, but you might end up doing a lot of updates. 

### So how can we solve this issue?

First, you need to verify how the platform is doing the iframe check. In most cases, they will use `window.parent !== window` or `window.top !== window`, and this is where we are going to trick the site into believing it is the same.

## The solution

The way to trick your browser is not so hard. Usually, when you use the `cy.visit` method to open a specific page with Cypress.

```javascript
cy.visit(config.pageUrl);
```

What you can do, add the `onBeforeLoad` function. This function allows you to prepare things on the page before it gets loaded. To trick the site, all you need to do is this:

```javascript
cy.visit(config.pageUrl, {
  onBeforeLoad: (win) => {
    // Let the child think it runs in the parent
    win["parent"] = win;
  }
});
```

The result of this change looks like this:

{{< caption-new "/uploads/2020/05/iframe3.png" "Fully loaded page in Cypress"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAADcSURBVH3BMUrEQBSA4f+9eUuCqNOIC66FjQTxDJZ6Cwux8QA29laCXkMUC48iFmKtsCwEREHIZjKzIwsJ2Oj3yd39Y563gZwzk60x480NnHM8Pb+Qc0ZVSWbY+v4BRxOHilAUJWaOparaJYTAPML0O2OHlUdEaJqGEFq6ThiZgQgjM9QUv0iYqiIixBgpioKyLPnNgG3vUHoxRv5j9Lz3mBl/UXrOOW6vT/j6/GA2fePh5pjFIjFQeikl6vcdcgKSUs/2UHUMrOs6BmdXFyytrK1yenlOCIHXukWAH0XIS1yzhCU3AAAAAElFTkSuQmCC" "1156" >}}

## Example project

I have adapted the example project to include this scenario for you to check out the code. You can find the project here: [https://github.com/estruyf/cypress-sharepoint-sample](https://github.com/estruyf/cypress-sharepoint-sample).

*Happy testing*
