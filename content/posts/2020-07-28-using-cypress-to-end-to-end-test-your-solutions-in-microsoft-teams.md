---
title: End-to-End testing your Microsoft Teams solutions with Cypress
slug: /e2e-testing-microsoft-teams-solutions-cypress/
author: Elio Struyf
type: post
date: 2020-07-28T12:28:20.942Z
draft: false
tags:
  - Cypress
  - Development
  - E2E
  - Testing
  - UI Tests
  - Microsoft Teams
categories: []
comments: true
---

For a long time, I was looking for a way to start end-to-end test solutions in Microsoft Teams. The easiest way to start running these tests is against the web experience (`https://teams.microsoft.com`). That way, we can use tools like Cypress. Another reason to do these E2E tests with Cypress is that internally we use Cypress for all our E2E tests. 

Unfortunately, for a long time, I have been struggling to make it work, but finally, I found a way to get it running. In this article, I will describe the steps why things fail in Cypress and how to overcome these issues. You also find a link to a sample repository that gets you started quickly.

## The problems and solutions

First of all, why is it just not easy to get your tests running in Cypress for Microsoft Teams? There are a couple of complications here.

### iframes

#### Problem 1

I like the Cypress UI, it allows you to see the running tests, and go through all the snapshots of each test, but it also has its limitation. To show your running tests in the application, it makes use of an iframe. This iframe approach creates all sorts of issues.

First of all, we have the authentication part. Usually, when navigating to the Microsoft Teams page in your browser, you will get redirected to the sign-in page.

Due to the iframe approach in Cypress, this will give you the following issue:

{{< caption "/2020/07/msteams2.png" "Microsoft Login refuses to load"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAABISURBVI3BgQmAMBRDwZfw91+1A5SmKiiIKPZOrbXJqap4GmOQhEqCJA69d76YRWaRWVTcJCEJkrCNJC7FjW1s88YsKnZzTv5snmIY2mEdBdsAAAAASUVORK5CYII=" "937" >}}

The Microsoft login page does not like it that you load it from within an iframe.

{{< caption "/2020/07/msteams1.png" "Console error which shows Microsoft Login refuses to render" >}}

#### Solution 1

The solution for this is to make use of a separate login/authentication flow. For this flow, I make use of Playwright. 

> **Info**: [Playwright](https://github.com/microsoft/playwright) is a Node.js library to automate Chromium, Firefox, and WebKit.

The trick here is to do the whole authentication flow within Playwright, grab all the cookies and local storage key-value pairs, and pass these to you Cypress instance.

Check out the [teams-auth plugin](https://github.com/estruyf/cypress-msteams-sample/blob/master/cypress/plugins/teams-auth/index.ts) I wrote for Cypress. 

The plugin will first load Microsoft Teams and waits until it navigates you to the login page. Once the page is loaded, it starts entering the username and password. When these steps completed, the plugin grabs all cookies and local storage key-value pairs and passes them to Cypress.

> **Info**: The plugin makes use of [playwright-chromium](https://www.npmjs.com/package/playwright-chromium). This dependency makes sure that the footprint is lower as it will only fetch Chromium instead of all the supported browsers.

#### Problem 2

The iframe problem is not entirely solved. Authentication is the first part of the issue, and once you get past that, you will get stuck on the following page.

{{< caption "/2020/07/msteams3.png" "Stuck on the Microsoft Teams loading page"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAABRSURBVI3BsQmAQBBFwffX5VLbEPvvRBSbMDK56FYTQRbBm1GtNW68RQQPMyMi8FIKkvhjdDI6GcmyHmz7SeYk8zQiGZmTDIPzxejkrTUk8ecCaksVtQnpaewAAAAASUVORK5CYII=" "946" >}}

Opening the browser console will tell you more about what is happening.

{{< caption "/2020/07/msteams4.png" "Console error which mentions that it is not allowed to run in an iframe" >}}

This problem was the hardest to solve, and in the end, it was straightforward to get it resolved.

Microsoft Teams knows you are loading it in an iframe, and wants to prevent you from doing this. I contacted the Cypress team on this matter, but they were not interested in helping out or changing the iframe approach. It is understandable, but getting us past this issue might open a lot of useful use cases, like bot testing and such.

The only answer I got from the Cypress team was to override the method/function, which checks if the application runs in an iframe. Sadly, I had already tried this approach by implementing the overwrite in the `onBeforeLoad` and `onLoad` functions of the `cy.visit` method. For a few times I got it working, but I was just lucky.

#### Solution 2

I found the solution by checking the event catalog from Cypress: [Catalog of events](https://docs.cypress.io/api/events/catalog-of-events.html). At the end of the page, you find a screenshot that shows all the events in their chronologic order.

{{< caption "/2020/07/msteams5.png" "Cypress events"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB3SURBVBXBMRLCMBAEwbk92a4S/P+PBCRExpJuwd0xXm+fFGcK27TWYEx6Jnp2lIkkRBXY2MY2VYWBaxXn+UUR3EQmoSQzkUREgGDNC9Xi+nzwmDTGpMIMBzfbxAoex8HWOxDE1mjsDWG2FMFfBItB5c4yFMUO/ACzVjz4y49E1QAAAABJRU5ErkJggg==" "690" >}}

The event I was looking for the whole time, was the `window:load` one. With this event hook, we are now able to override the default Microsoft Teams iframe check. How this works is as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
cy.on('window:load', (win: any) => {
  const checkOverride = () => {
    if (win.teamspace && win.teamspace.AppController && win.teamspace.AppController.prototype && win.teamspace.AppController.prototype.isInIFrame) {
      console.log('teamspace available -> will now be overwritten');
      win.teamspace.AppController.prototype.isInIFrame = () => {
        console.log('Calling the custom iframe check');
        return false;
      };
    } else {
      console.log('teamspace not available')
      setTimeout(() => {
        checkOverride();
      }, 1);
    }
  };

  checkOverride();
});
{{< / highlight >}}

This code looks hackish, but unfortunately, this is currently the only way for us to get it up and running. As the`teamspace` instance has other methods, we have to wait until it is loaded. That is why the `setTimeout` functionality is in place. Once it is available, only the `isInIFrame` method gets overwritten.

Again, this will not work on the first try. Cypress will return the following error message:

{{< caption "/2020/07/msteams6.png" "Blocked the code from accessing the iframe"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACRSURBVD3BQXLCQAxFwfcljQ2Oi/tfjEVOYRapwvYwUgoWdOu8/xZm+M/CVxUIKEBCEURfV04FckfThABRXCbxUYXMiHZbmdeFv71z5KCZaC4qAvfgTZkENagczCHyeVJD9OEc+4FJJMbiEJmgAjPjJWOWEdeJjwIETU7sjwfnttFa4+JGi0b0F28jB713Dnf+AYdWORlcWnOWAAAAAElFTkSuQmCC" "572" >}}

The solution here is to bypass the browser its security warnings. You can do this by setting `chromeWebSecurity` to `false` in the `cypress.json` config file.

### Cookies and local storage

In the previous section, I mentioned Playwright is used for the authentication flow and pass the cookies and local storage. We require these cookies and local storage key-value pairs in Cypress to authenticate and start testing. The problem is that Cypress, by default, clears all cookies and local storage between each test. To overcome this, you can whitelist cookie names. Unfortunately, nothing exists to preserve the local storage, so what you can do is override the clear method. You can find this override in the [support index.ts](https://github.com/estruyf/cypress-msteams-sample/blob/master/cypress/support/index.ts#L24-L26) file.

## Result

Once you get past all these issues, you will finally be able to start your tests.

{{< caption "/2020/07/msteams7.gif" "Result of testing Microsoft Teams with Cypress" >}}

> **Info**: This was just a simple test, but it unlocks a lot of potential. This enables you to start testing your chat bots, messaging extensions, tabs, ... 

## Sample project

A sample project to get you started is available on GitHub: [https://github.com/estruyf/cypress-msteams-sample](https://github.com/estruyf/cypress-msteams-sample).

*Happy testing*

## Updates

### 13/08/2020

Together with my team we discovered that there was a problem when testing in Chrome or Chromium. This has to do with the cookie changes Chrome recently implemented. In Microsoft Teams, some of the cookies were set as `SameSite=None; Secure=false`. This is not allowed in Chrome anymore. In order to overcome this issue, I made a change when setting the cookies in Cypress so that all cookies get the `Secure` setting set to `true`. This way, the auth flow and pages should start loading correctly.