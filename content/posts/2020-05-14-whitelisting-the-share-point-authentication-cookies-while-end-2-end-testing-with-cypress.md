---
title: >-
  Preserving and whitelisting SharePoint authentication cookies while running
  E2E testing with Cypress
slug: >-
  /preserving-whitelisting-sharepoint-authentication-cookies-running-e2e-testing-cypress/
author: Elio Struyf
type: post
date: 2020-05-14T13:31:31.756Z
draft: false
tags:
  - Testing
  - UI Tests
  - Cypress
  - SharePoint
categories: []
comments: true
---

In the previous article, I explained how you could trick Cypress and SharePoint to load the whole page instead of a page on which most of the SharePoint controls did not load.

> **Related article**: [How to make your site believe it isn't running in an iframe during Cypress E2E tests](https://www.eliostruyf.com/tests-running-iframe-cypress-e2e-tests/).

In some cases, you might experience tests failing due to authentication issues.

{{< caption-new "/uploads/2020/05/cookie1.png" "Access denied"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAklEQVR4AewaftIAAADlSURBVDXBbU7CUBCG0Wfm3lsqCPwymOj+9+UCiGL4qG1nXtsYz7HIlARmhgDnTyIMwwxinqkS3MYEA8OIFKtajGEKDn2hq5Va3HhMiYApRFcMM+MyBH1zLkPwsqtUFqd9Y3W+z9zHZJiTw6Zweq78qynx8Tmyqc6cQoKn5lzHIL7FFOL92PBISIEbZMKuc8ZIts0ZpmQKsfJWjKfmXH+SMcT5NlPMGEOMIbadU9yoLIobKUiJ4oYEUwoBfXVWzmKYkr4a2+a4QUgUh746X48ZAc7idd8wA3ejFePYF6obKfF27DDgF8fYd3mIEp/XAAAAAElFTkSuQmCC" "309" >}}

If you check your network tab, you could notice a lot of network call errors.

{{< caption-new "/uploads/2020/05/cookie2.png" "Failed network call"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABKSURBVF3BwQ2AIBBFwcciJXCwGLX/fpCEwO43XJ1J1/2o9xdLiS0icHf+rByZs1ZKKcw5WWuxScLMkMR2jDGICCSRc6a1hrvz9wESXiWYWQtz0QAAAABJRU5ErkJggg==" "880" >}}

If you investigate a successful and failed call, you will notice that the requests do not include any authentication cookies. That is the reason why your SharePoint API calls start to fail.

Checking the cookies under the application page will show you none of the authentication cookies are present. 

{{< caption-new "/uploads/2020/05/cookie3.png" "No authentication cookies present"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABxSURBVH3BMQ6EIBBA0T/AEKHwCp7G+1+C2oKAEWMGq202m31P9n2f13VxnifrulJrZYxBzhnnHDFGcs4E5xyqSkqJOSfbtvFhZrTWMDOCmTHG4HkejuOglMI3ESEsy4KI0Hvnn6CqqCree3rv3PfNLy+5CzGDlIfjGwAAAABJRU5ErkJggg==" "602" >}}

This problem occurs due to the default logic of Cypress, where it clears all cookies before after each test. The interaction on the page itself will still work, but some of the API calls might start failing when cookies are not present

<blockquote class="important">
<p><strong>Important</strong>: Cypress automatically clears all cookies <em>before</em> each test to prevent the state from being shared across tests.</p>
</blockquote>

## Whitelisting or preserving cookies

The cookies we are interested in are the `FedAuth` and `rtFa` cookie. To make sure Cypress keeps these cookies during your tests, you can whitelist or tell to preserve them. To do this, you have to options:

- Preserving cookies per test suite
- Globally whitelisting

> **Info**: both of these cookies are retrieved with the authentication flow which got implemented in the following sample: [https://github.com/estruyf/cypress-sharepoint-sample](https://github.com/estruyf/cypress-sharepoint-sample)

To preserve cookies during tests, you can make use of the `Cypress.Cookies.preserveOnce` method. You can call this before each test case in your suite.

```javascript
// Add to your test suite
beforeEach () => { 
  Cypress.Cookies.preserveOnce('FedAuth', 'rtFa');
})
```

Another way to make sure Cypress keeps these cookies is to whitelist them globally. You can whitelist cookies as follows:

```javascript
// Add to: support/index.js
Cypress.Cookies.defaults({
  whitelist: ['FedAuth', 'rtFa']
})
```

Once you added one of the methods, it should now preserve the cookies between tests:

{{< caption-new "/uploads/2020/05/cookie4.png" "SharePoint authentication cookies are preserved"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACcSURBVG3BwWqDQBCA4X87s6gItkhPeR3f/wFyy62kSEVEt5rdmSS3FvJ9YRgGP46DbduoqoqcM+u68tT3PaUUmqZB27ZFVRERtv3Gx+eJ9v2GuePuhFIY5xWd55mUEmbGbhHNwvc44e485VzY9wPtuo4YI2bGdfzh63LGzPirDgF1d0SEZVl484LYL8J/gYA+UNc1MUamaSKlxCt3DydSxd/rhDkAAAAASUVORK5CYII=" "565" >}}

You should now be able to test out a full page flow:

{{< caption-new "/uploads/2020/05/cookie5.gif" "Full page flow testing" >}}

## Example project

I have adapted the example project to include this scenario for you to check out the code. You can find the project here: [https://github.com/estruyf/cypress-sharepoint-sample](https://github.com/estruyf/cypress-sharepoint-sample).

*Happy testing*
