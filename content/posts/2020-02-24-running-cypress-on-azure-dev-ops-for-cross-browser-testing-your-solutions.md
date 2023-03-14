---
title: Running Cypress on Azure DevOps for cross-browser testing your solutions
slug: /running-cypress-azure-devops-cross-browser-testing-solutions/
author: Elio Struyf
type: post
date: 2020-02-24T19:54:13.064Z
draft: false
tags:
  - Development
  - E2E
  - Testing
  - UI Tests
categories: []
comments: true
---

In my journey, selecting the best tool to automate the end-to-end tests for our products, I had been testing out Cypress for a while. Cypress is just a fantastic tool. It is easy to set up, documentation is up to date, and it makes it easy to verify features/implementations with its UI. For me, there were two downsides. The first one was cross-browser support. The second downside is that everything gets loaded in an iframe. The iframe approach makes it harder to test full-page flows for SharePoint, but that is not a problem for all solutions. 

Recently a new major version of Cypress was released: `4.0.0`. The biggest change in this release is the cross-browser support.

> **Info**: Cypress 4.0.0 release notes - [changelog](https://docs.cypress.io/guides/references/changelog.html#4-0-0)

This change means that Cypress now allows you to test in Chrome, Firefox, Microsoft Edge, and more. These are the three major browsers that we currently support. Sadly, but not unexpected, is no support for IE11. We still have to solve it with our old tools and manual testing.

> **Info**: [Cypress cross-browser testing](https://docs.cypress.io/guides/guides/cross-browser-testing.html#Continuous-Integration-Strategies)

In this article, I show the approach I took to implement the Cypress in Azure DevOps to automate your tests.

<blockquote class="important">
<p><strong>Important</strong>: If you are interested in using Cypress for SharePoint solution testing, check out the following post: <a href="https://www.eliostruyf.com/cypress-testing-sharepoint-solutions/" title="Using Cypress for end to end testing your SharePoint solutions">Using Cypress for end to end testing your SharePoint solutions</a>.</p>
</blockquote>

## Cross-browser testing in Cypress

Cross-browser testing with Cypress has been made very easy. All you have to do if you run the tool is to select the browser.

{{< caption "/2020/02/cypress1.png" "Cross-browser support in cypress"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABYSURBVG3BORbCMBBEwd/MghdOSYAPAgGXdUKGHtIQEeEq3R/PqoJRg/Dgx8yIcPro1Ch8u13JTCKCI/V5c/LE8zwhGfO8IPFnf3Uu5vi6LgghcUjVaa3xBRedGjT9rcYNAAAAAElFTkSuQmCC" "600" >}}

When you want to run the tests from the command line, you can use the **--browser** flag. Example: `cypress run --browser chrome`.

## Running on Azure DevOps

Running on Azure DevOps is almost as easy as running it locally. To run Cypress, you do not need a special Azure DevOps agent. You can use one of the provided hosted build agents from Azure DevOps. No need to provide your own build agent/containers.

The quickest way to get you started is by checking out the sample project I created: [https://github.com/estruyf/cypress-sharepoint-sample](https://github.com/estruyf/cypress-sharepoint-sample).

This sample project contains three stages for testing the solution in the following browsers:

- Chrome
- Firefox
- Microsoft Edge

{{< caption "/2020/02/cypress2.png" "Stages for each browser"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAADxSURBVIXBQS8DURiF4fd895rW3CJFI03sxP//QWywENJNQytmdI47i+5GPI+6rnNKif8E1dPzC5+7HZvNhoggIogIIoKIICLIVDfrW06SOFsssM2UTHXaBH+xTUSQqfbdwOPbB9dpx0gSkliv1xxlqlkyd5cZuKCUwpFtbCOJTJVSopTCFEmMMtW+G3h43bI6+eKobVuWyyW2GWWqeYb71QyYUUphSqaKCNq2ZWSbKZnq+2fgfbvnPB8YhoGUEqUUUkrYRhJBFZgs6Pue+XyOJGwjCUmMMlVOwdWiARqapuHINraRRD4cDthGEqO+75nyC85SUpQAlezgAAAAAElFTkSuQmCC" "300" >}}

All stages run in parallel (if supported for your environment and when agents are available, of course) and provide a video + screenshot at the end of each run. You are able to add additional browsers if you want to.

## Things you need to do to run it

To test out the pipeline, you will have to the following things:

- Start by creating a new variable group on Azure DevOps. I use two, one for my DEV branch and one for my master branch. If you only want to use one branch or one environment, you can remove the dynamic grouping expression in the `azure-pipelines.yml` file.
- Add the following variables to the group:
  - **CI**: `true`
  - **username**: `<sp-username>`
  - **password**: `<sp-user-password>`
- Optional parameters are:
  - **cypress_project_id**: `<cypress-project-id>` - the ID of the project Cypress gave you.
  - **cypress_record_key**: `<cypress-record-key>` - If you want to record to Cypress.io.
  - **verbose**: `true` or `false` - Allows you to run the pipeline in verbose mode, and will add some extra logging. Cypress will also run in DEBUG mode by setting it to true.
- In the `azure-pipelines.yml` file, update the dynamic group name variables from `estruyf-dev` and `estruyf-master` to your corresponding group names.

{{< caption "/2020/02/cypress3.png" "Azure DevOps variable group"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAABuSURBVHXBOxLCMBBEwTerMUtGcf878slcVrBYgRKV6dbr/S07uG0brZnBbqzcAu6Z2GaqKiZJDD4hiariH0n4sxdPdSRhm4hAEis/EjKTKSK44sxkkMTQe8c2K3OqKiKCobWGJFbB6TgOpojgyg8csxejwk/k6wAAAABJRU5ErkJggg==" "700" >}}

<blockquote class="important">
<p><strong>Important</strong>: If you want to record your results to Cypress.io, you will have to specify the Cypress project ID and key as well. You can find more information to create these keys can here: <a href="https://docs.cypress.io/guides/dashboard/projects.html#Setup" title="Cypress recording setup">Cypress recording setup</a></p>
</blockquote>

## What does the pipeline do precisely?

{{< caption "/2020/02/cypress4.png" "Azure DevOps pipeline steps"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAYAAAB/sn/zAAAAAklEQVR4AewaftIAAAFqSURBVG3BgW6bMABF0fts40BCM/X//7GItksGxn6DqZmiqudomiZv24ZtYoxcLhd+EnLO/AkrtmmtMU0T67rysK4ry7IQYoz86l44nU5s20bOmZwzDzlnYowkdp/bb3qdOJRSmOcZ27TWuF6vHBK7ECJCHFJKjOPIwTaSqLWS2AkIIZBzpus6HiRxsE1gZ/OfbbZto5SCbR4SOwncjG2WZcE2h3EciTHSWiPwpblRSkEStVYOtVYOkkjsqhvJJsZIKYUQAtfrFUkcbBPY2UYStVZCCBzWdeVBEoHdGM8I8ex+v/P+/o5tDondZ70x6MTBNq+vrzwLEoFvYozM88wzA4EvNv/Y5vD29sbHxwe2sU1i95IutNaQRM6ZYRj4Lt3vd0opSKLve/q+57uu60iSuNVEr5XWGrfbjWEYkMSzJIkuBSIRSUhCEpJ4lkopZIxt+r6n6zp+Es7nM3PrOSzLwjRNPCulsC4LfwHUtMDi5CWLjgAAAABJRU5ErkJggg==" "300" >}}

As you can see, the pipeline works in three stages. One stage per browser you want to support. Each of the stages executes the same set of tasks (from installing to uploading test results).

At the end of each stage, the screenshots (when tests failed), videos, and `JUnit` test reports get uploaded as pipeline artifacts.

{{< caption "/2020/02/cypress5.png" "Cypress video artifacts"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAAECSURBVIXBwYoaQRSG0e9WXcsCWwKjIWsfwPd/ltm4yk5oko60rXbdf+xFQAYmOceGYdD9fud0OmFmHA4Huq7jM1+tVrg7x+MRM+Mrqf/1h/fTT879b/7F92/f+PH9jf9xnsZxpNaKu/MVNzNKKQzDQESQUqKUwna75VWShLuzXq+RxKLrOiQhCUlIwnlKKbHZbEgpsbjdbpgZknB3cs44LyQREczzjCQWOWcWzlNEcL1eGccRM2O/3/NZMjNyznRdh7sjib7vOZ/PmBlmhpnhkpimicvlgiRaa+x2O1JKSOIvjwgWtVZyzrTWaK0REbzyiGCeZ6Zp4vF4kFKi1kophVcfrDB8mGwxkHkAAAAASUVORK5CYII=" "250" >}}

The test results on Azure DevOps look like this:

{{< caption "/2020/02/cypress6.png" "Test results"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABpSURBVHXBOw7CMBBF0TvO8zgOkSyasP9FwQ4AiZomvwmUNJxjj9fziGUnIsg5Y2a01jAzfulUBsKhL44k/tEX8zxzvd+YxgvJetZlpRZB7NRacXdUSsHdsXeiS8F5HJDEsW10EqRERPAB+fAegTSsTv4AAAAASUVORK5CYII=" "914" >}}

If you configured the Cypress record variables, you could also check out the results on your Cypress dashboard.

{{< caption "/2020/02/cypress7.png" "Test results on the Cypress dashboard"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABgSURBVG3BQQ6CUAxAwfdKIYT739PgwsRAfw0Sd874eL56XZKcApV/FGI/dqaQCFFQUFCoKqqK8yxyy5UexVAuDchtjEYFIZtGReWrG5WLgoJAvvuALiJmbvIzLzNVRSgfz6Uj9tdQfrUAAAAASUVORK5CYII=" "3412" >}}

> **Info**: The Cypress dashboard provides you a more detailed overview of all the tests, but it is not required to use this.

## Benefits of using Cypress

If you are looking for an E2E testing tool, definitely try out Cypress. Here are a couple of reasons why I would choose Cypress:

- Using a language that our developers/testers already understand
- Tests can be validated quickly during the DEV phase
- When enhancing or fixing a bug of an already existing feature. It - allows you to confirm if previous functionality works as expected.
- It provides a way for developers to document the use case.
- Videos of each test run.
- Validate screenshots of failing tests.

*Happy testing*