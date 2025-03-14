---
title: How to debug your SharePoint Framework unit-tests
author: Elio Struyf
type: post
date: 2017-10-10T15:26:12+00:00
slug: /how-to-debug-your-sharepoint-framework-unit-tests/
dsq_thread_id:
  - 6204652692
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Debugging
  - SharePoint Framework
  - SPFx
  - Unit tests
comments: true
---

The reason you probably read this post is that you already wrote some unit tests for SharePoint Framework projects and you stumble upon a problem and want to debug one of your unit-tests.

Apparently, the process is not so easy as linking your debugger to the gulp test task. There is a bit more plumbing involved to get a good experience. In this article, I explain a couple of ways to start debugging your unit-tests.

> **Info**: For this article, I assume that you already written some unit-tests. As I will not be explaining how to write them. For more information about writing unit-tests, you can read the following article: [Writing unit tests for your SharePoint Framework components](https://www.eliostruyf.com/writing-unit-test-for-your-sharepoint-framework-components/).


## The quick way

First of all, the quick way to debug your unit-tests is by running the following command: `gulp test --debug`. This would start the test process with an open debugging session and allows you to run your tests in your browser.

Is it that easy? More or less. I indeed said that there was some more plumbing involved, and you will immediately see what I mean by that.

When you run the command, the test task will start, but from the moment it starts up the **Karma** process it will wait.

{{< caption-new "/uploads/2017/10/101017_1516_Howtodebugy1.png" "Waiting for your browser"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABJ0AAASdAHeZh94AAAAQUlEQVR4nGNQdXBTcvHSc/S0d/SycfCwtHUztnAwsXDUN7HVM7JmULVxV7T3Vrd1t7B3tXXysnXysrB1NbGESgMAsFgN4OSrz78AAAAASUVORK5CYII=" "624" "106" >}}

The reason it waits is to allow you to connect to the test process via the following URL: http://localhost:9876. When you open your browser to that location, you see the following page:

{{< caption-new "/uploads/2017/10/101017_1516_Howtodebugy2.png" "Karma running on localhost"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABJ0AAASdAHeZh94AAAAk0lEQVR4nGWLzwsBURSF338uwtKv+QdmwcKUZzNkvFK2stCbpEdE2Skrxtz35t6rR5R8ncV3Th0hV6HUvWQ7GG2isYnidX+ou7N9bE6pPixFW1Ubk1JLVZpJOZjXgmk9XHTUWR6vO3NJhX1YyGx+g/wOkHknJH5hrRXE5EPEHymwQEJmBgDhh1/eV2Z2zolv+QcRn7G+oaopUXDhAAAAAElFTkSuQmCC" "624" "383" >}}

By clicking on the **debug** button (or by directly loading the following page: http://localhost:9876/debug.html), you can start your debugging session in Chrome. Check the console for the test output.

{{< caption-new "/uploads/2017/10/101017_1516_Howtodebugy3.png" "Console test output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABJ0AAASdAHeZh94AAAAiElEQVR4nBWLRxLDIBDA+P8fk7jQtgLGLPYtg66SHACoChL7mIgpBC9FqzJBJGbHLKcPMQEg19pEtbU2zFLOYwyHxL/tSBlYVERLraVUVUXEOadj0W0/Th9jSt5HACQWMxOR53nW/fmuIIQISCkv3/u9b3u/u9NSjzMQ8XVdw2zYYs7ZWnvf9w8cj6YUz6Ku9QAAAABJRU5ErkJggg==" "624" "359" >}}

> **Tip**: Probably the easiest way to start is by using the **debugger** statement in your tests. That way you do not have to look through the code to set your breakpoints.

{{< caption-new "/uploads/2017/10/101017_1516_Howtodebugy4.png" "Debugging in your browser developer tools"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABJ0AAASdAHeZh94AAAAVklEQVR4nAXBSQ6AIAwAQP7/QxOjESlLoWUpqHByRm07AGgiarXUkrvIWnN9D9eJJErf1hq+joCevSN0BbHFkFOSRKIADNE4tdEQwVmOgWNqdbzvFOk/E5pTEFth4vUAAAAASUVORK5CYII=" "624" "208" >}}

## Debugging unit-tests in Visual Studio Code

Now that you know how to start a debugging session, it is time to show you how to do the debugging in Visual Studio Code.

Adding the following configuration to your **launch.json** file in Visual Studio Code will allow you to debug your unit tests in VSCode instead of Chrome.

```json
{
  "name": "Debug unit test (simple)",
  "type": "chrome",
  "request": "launch",
  "url": "http://localhost:9876/debug.html"
}
```

You start your debugging session again by running: `gulp test --debug`. Once started, you can press F5 to start the VSCode debugging session.

{{< caption-new "/uploads/2017/10/101017_1516_Howtodebugy5.png" "Debugging your tests in VSCode"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABJ0AAASdAHeZh94AAAAwklEQVR4nB3JR27DMBAAQD5GxcuyS4pFrIpEwnKQXAPk/z8JHGBuw5Dcqq1PTW8ZlAEMMxAow9HPoBnHlEKj/Ent24QK2kkRpAqLsAu3jOs6qA93Qf9R4zeUrtA/pFvFG+MUpR19HzkcwnYyB1d++b93AyZB2VJFPGbhp9VMYGewE7gJHMMtupyf92h9z89UzlxqLS3G4lLxTOrE0Y08rvb6Ou543f7se/uoW6o6Mk5JYFT25JS1CA+TFO1aBZBh5u4PPTEwrvTQgNwAAAAASUVORK5CYII=" "624" "480" >}}

This was not that, hard, right? This is indeed the quick way to debug your unit-tests. The next step will be to extend the unit-test process to get a better experience. The reason why is if you take a good look at the above two screenshots, you will see a **tests.js** file which is being loaded. This file is a bundle of all your tests created by Webpack. Depending on the number of files and code, you might experience that this process of debugging is very slow. A better way is to debug the individual unit-test files, but it requires a couple of things.

## Extending the test runner in order to get a better debugging experience


> **Info**: The things you need to do in order to extend your test runner, are explained in the following article: [Extend Karma to get better code coverage and test reports for your SharePoint Framework solutions](https://www.eliostruyf.com/extend-karma-config-to-get-better-code-coverage-and-test-reports-for-your-sharepoint-framework-solutions/).

If you followed the article mentioned above, you should now have a custom **karma.config.js** file in your project and a Karma config binding in the gulpfile.js file.

Config binding:

```typescript
const karmaTask = build.karma;
if (karmaTask) {
  karmaTask.taskConfig.configPath = './config/karma.config.js';
}
```

The reason why we want to add a custom Karma config to add source maps into the generated **tests.js** bundle. In order to get this, add the following code to your **karma.config.js** file:

```typescript
"use strict";
const existingKarmaConfig = require('@microsoft/sp-build-web/lib/karma/karma.config');
const sourcemap = require('karma-sourcemap-loader');

module.exports = function (config) {
  existingKarmaConfig(config);

  // Check if in debug mode
  const debug = process.argv.indexOf('--debug') !== -1;
  if (debug) {
    /* Adding sourcemaps to the tests */
    config.plugins.push(sourcemap);
    for (let key in config.preprocessors) {
      config.preprocessors[key].push('sourcemap');
    }
    config.webpack["devtool"] = 'inline-source-map';
    console.log(config);
  }
};
```

One more thing, in order to run the test task, you will have to install the **karma-sourcemap-loader** module to your project. You can do this by running: `npm install karma-sourcemap-loader --save-dev --save-exact`.

Right now, when you run the unit tests again with the debug flag, you should see the following outcome in the Chrome developer tools:

{{< caption-new "/uploads/2017/10/101017_1516_Howtodebugy6.png" "Running your tests in the source file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABJ0AAASdAHeZh94AAAAVElEQVR4nB3BQQ6AIAwEQP7/Qr0ImiCBSllaSvRiTJxxMaY95N2nRiQMsHIVkaFqIsMVgt94XUI4oveBUsrxpFKv2gB1HRhmjNrFIH3OblOf+3l/HwHIU4+XZBeEAAAAAElFTkSuQmCC" "624" "163" >}}

Note that you are not debugging in the **tests.js** file anymore.

The last step is to add a new configuration to the **launch.json** file in order to debug the test in VSCode.

```json
{
  "name": "Debug unit test (advanced)",
  "type": "chrome",
  "request": "launch",
  "url": "http://localhost:9876/debug.html",
  "webRoot": "${workspaceRoot}",
  "sourceMaps": true
}
```

Once this configuration has been added, run the gulp test command and press F5.

{{< caption-new "/uploads/2017/10/101017_1516_Howtodebugy7.png" "Debugging your tests in VSCode with source maps"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABJ0AAASdAHeZh94AAAAb0lEQVR4nAXBSxbCIAwAQM7iprY0gRIg/FGB9+rG+x/HGQFIJ7kyPuE90Tlt4g76ccCOl0QrDkU1pF8qd+ZV8qy5NWarA/tUhthOT1dN8Tt4hTh96N53qypTa22JJzgwBagrZGkSmqyAN2lRxxhefyipGWvBw5sAAAAAAElFTkSuQmCC" "624" "224" >}}

> **Info**: At the moment, I only got it working with the JS source maps, if you now or find a way for getting the TypeScript files, feel free to let me know.


## Sample

The unit-test SPFx sample that I created has been updated with the configuration of this article. You can check out the sample here: [https://github.com/estruyf/spfx-testing-wp](https://github.com/estruyf/spfx-testing-wp)