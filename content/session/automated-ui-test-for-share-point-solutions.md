---
title: "Automated UI Test for SharePoint Solutions"
slug: "/automated-ui-test-for-sharepoint-solutions/"
date: 2019-11-19 00:00:00
fmContentType: session
---

On this page, you can find some related references for the "Automated UI Test for SharePoint Solutions" session which Elio presented together with [Melanie Culver](https://twitter.com/CulverMelanie).

## Feedback

If you want, you can provide feedback via the following form: [feedback form](https://forms.office.com/Pages/ResponsePage.aspx?id=Vtz4mTosPUqMStd8d7hiNGBDzWQgQolNqpx-THyx6eVUNVVUUko1NkQwTUJQSFVYN1lXWUxYTkVGRy4u).

## Link to the slides of where the session was presented

- [2-5 December 2019 – European SharePoint, Office 365 & Azure Conference](https://1drv.ms/u/s!AukeddqwapKJhfUBdfN6lZiERY3H5Q?e=Aiaae7)

## Useful links

### Tools

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Robot Framework](https://robotframework.org/)
- [Selenium](https://selenium.dev/)
- [Changes to codsed UI tests in Visual Studio 2019](https://devblogs.microsoft.com/devops/changes-to-coded-ui-test-in-visual-studio-2019/)

### Recorders

- [Katalon Recorder](https://www.katalon.com/resources-center/blog/katalon-automation-recorder/)
- [Puppeteer recorder](https://github.com/checkly/puppeteer-recorder)
- [Selenium IDE](https://selenium.dev/selenium-ide/)

### Other Tools

- [node-sp-auth dependency](https://www.npmjs.com/package/node-sp-auth)
- [Pixel matching](https://github.com/mapbox/pixelmatch)
- [Jest testing framework](https://jestjs.io/)

## Code snippets

### node-sp-auth authentication for Puppeteer

```typescript
import * as spauth from "node-sp-auth";
const data = await spauth.getAuth(pageUrl, {
  username: username,
  password: password,
});
```

### Combining Puppeteer and Jest

```typescript
test('Should load the page', async (done) => {
  if (page) {
    await page.goto(configObj.pageUrl, {
      waitUntil: 'networkidle0’
    });
    expect(page).not.toBeNull();
    expect(await page.title()).not.toBeNull();
    expect(await page.title()).toBe("Automated UI Tests - Home");
    done();
  }
}, 30000);

/**
 * Start of the other page tests
 */
test('Check if caption element is present in the web part', async (done) => {
  const elm = await page.$('.caption’);
  expect(elm).not.toBeNull();
  done();
}, 5000);
```

## HTML sample for testing with custom attributes

```html
<div className="{styles.caption}" data-ui-test-id="caption">
  <p data-ui-test-id="caption-title">
    <b>{item.title}</b>
  </p>
  <p data-ui-test-id="caption-description">
    <i>{item.description}</i>
  </p>
</div>
```

The test code:

```typescript
/**
 * Start of the other page tests
 */
test('Check if caption element is present in the web part', async (done) => {
  const caption = await page.$('div[data-ui-test-id="caption"]’);
  expect(caption).not.toBeNull();
  done();
}, 5000);
```
