---
title: Why I picked Cypress over Selenium
slug: /picked-cypress-selenium/
author: Elio Struyf
type: post
date: 2020-09-02T08:00:37.967Z
draft: false
tags:
  - Cypress
  - PnP
  - Testing
  - UI Tests
categories: []
comments: true
---

For the [PnP Virtual Conference](https://pnp.github.io/pnpconference), I did a talk about how to start with UI testing. During the session, someone asked me why my preference is Cypress and not Selenium. As the session was only 30 minutes, it is hard to fit every bits and piece in it. That is the intention of this article to tell you why we are using Cypress.

Selenium is one of the essential tools for UI testing and is around for a  long time. I might even dare say that they set the standard, but that does not mean others; you cannot test out other tools.

One of the benefits of newer tools is that they can take the lessons learned from what already was done and make it better or focus on a particular thing where the other tools fail. Another reason is that a new tool does not have to take all of its technical depts when releasing new versions, or make sure that tests keep working when upgrading.

Here are a couple of reasons why I would recommend Cypress.

## Language

When writing tests for front-end applications or UI Tests, I like to keep them as close as possible to the language of the application itself. In my case, I mostly write TypeScript. For me, it makes more sense to have my tests that way in TypeScript/JavaScript.

Cypress comes out-of-the-box with TypeScript/JavaScript support, and it makes it very intuitive to use. Writing tests feels similar to how you would interact with the DOM in TypeScript/JavaScript.

Selenium supports many more languages, where JavaScript is one of them, but it does not get their primary focus. The latest version of the Node.js Selenium web driver was released three years ago. There is an alpha version, but no updates have happened there for six months — nothing to blame, as the tools work great with other languages.

## Setup

Cypress comes with a quick and easy setup. In our team, we are already using Node.js, so all we had to do was run `npm install cypress`, and we are ready to start writing tests.

**Is it that easy?**

It really is that easy, and best of all; it works cross-platform without any issues. 

With Selenium, you have to install the relevant web drivers and tools before you can get started.

## Testing experience

For me, one of the most significant advantages is the test runner, which you can use on your device. In my opinion, this test runner has two main advantages. 

1. Quickly run a test by picking and choosing.
  - For developers, this is great when enhancing functionality in the application so that you can see if things keep working.
  - It is easy for testers to validate if a certain functionality works without having to run any hard to remember commands.
2. The UI gives you a good overview of how tests run and give you snapshots to go back in time.

{{< caption "/2020/09/cypress1.png" "Screenshot of Cypress during the PnP session"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACiSURBVBXB0WrCMBSA4f8kqTZMF0ERX2JX+v6PMXAIu9mmFTUl2lWwJ9n8Pjld2uK9pznsyYMS25ZSMvVohJaCEWFQxYmACITZDGcty9WSvuvwr4HHMPC4XflpGpwxDhHDuLIYI6gqKSUK0Hcdu48tMZ5xvh6TS0E1Y4zlaRoCfjLFWsvbekOKZxz/VJXf/k6oXnj63r2Tq5rP4xf3FFlUc/4ANnxJzzh29yMAAAAASUVORK5CYII=" "3028" >}}

This UI makes a huge difference to any other tool. When running the tool on your automation pipelines, this does not matter. As there, you might just run all tests at the same time.

## Automatic waiting for elements

When writing tests, a really neat function is that it automatically waits/retries to get the elements you need from the page. This functionality makes it great when working with async loaded components.

## Automation

Automation is essential for every solution/product. With automation, you can gain so much time that you can use to focus on other solution/product-related processes.

As Cypress runs on Node.js, it can run almost anywhere without issues. For instance, running on Azure DevOps is practically as easy as running it locally. To run Cypress, you do not need a special Azure DevOps agent. You can use one of the provided hosted build agents from Azure DevOps. No need to provide your own build agent/containers.

## Debugging during tests

As Cypress is running in Electron, you can open its browser developer tools. The developer tools might come in handy for debugging tests or to validate what is happening on the page you are testing. 

For instance, when an element is not visible, you can check what might went wrong.

## Extensibility

Cypress made it very easy to extend it to your needs. You can do this by creating plugins (which run on the Node.js side) or commands which run on the current test instance. 

**Why would you care?**

With custom plugins or commands, you can, for instance, create your authentication methods. That way, they are reusable in all your tests. Write once; use everywhere.

## What Selenium does better

Suppose you want to test all browsers, including Internet Explorer 11 (which finally has a set date to be end-of-life) and Safari. Selenium is the way to go forward.

> **Info**: With this article, I do not want to make you move over to Cypress. If you are currently using it and are happy with it? Continue using it as it is always better not to change a working system. If you are now looking to implement UI testing or experiencing some troubles with the current system. I would recommend giving Cypress a try. 
