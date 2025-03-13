---
title: Extend Karma to get better code coverage and test reports for your SharePoint Framework solutions
author: Elio Struyf
type: post
date: 2017-09-26T08:16:19+00:00
slug: /extend-karma-config-to-get-better-code-coverage-and-test-reports-for-your-sharepoint-framework-solutions/
dsq_thread_id:
  - 6171341553
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Code coverage
  - SharePoint Framework
  - SPFx
  - Unit tests
comments: true
---

In one of the previous posts I showed that since SharePoint Framework version 1.2.0, code coverage reports were added. When you run the **gulp test** task, it will execute the tests, and generate a code coverage report which you can find under the **temp/coverage/js** project folder.

> **Read more** about this in the following article: [SharePoint Framework code coverage reports for unit-tests](https://www.eliostruyf.com/sharepoint-framework-code-coverage-reports-for-unit-tests/)

In a code coverage report, you can check if your unit-tests covered all your code. If you already checked out these reports, you might have noticed that they can almost never be 100% covered. In some cases, you still have to write a couple of tests, but for SharePoint Framework (and any other TypeScript) project, this is in many cases related to something else. In SharePoint Framework, we write everything in TypeScript, once we start the tests, it will transpile all the TypeScript to JavaScript files and does the tests and code coverage reports based on the JS code.

Is that wrong? No, it is not, but when you open the code coverage report, you will see code that will never get covered. Like for example this:

{{< caption-new "/uploads/2017/09/092617_0751_ExtendKarma1.png" "__extends TypeScript helper function" >}}

In this example, you see the **__extends** function which is not completely covered. This is not a function you wrote yourself. It is a function TypeScript automatically adds to your JS file when you are extending classes in your TS. Basically, it is a helper function to support extending in ES5 code.

But how can you get full coverage for this? Luckily there are some plugins for Karma and Istanbul that can give you better reports based on the original TypeScript code. In order to get these reports, you have to extend the default SharePoint Framework Karma configuration.

## Extend the Karma configuration in SPFx

> **Important**: Credits go where credit's due. [Vincent Biret](https://twitter.com/baywet) already shared this in one of his talks and [**spfx-devops-vsts**](https://github.com/baywet/spfx-devops-vsts) GitHub repository. I would like to thank him for sharing the configuration.

In order to extend the Karma configuration in your SPFx solution, you first have to create a new **karma.config.js** file. The basic configuration looks as follows:

```typescript
"use strict";
const existingKarmaConfig = require('@microsoft/sp-build-web/lib/karma/karma.config');
const gulp_core_build = require("@microsoft/gulp-core-build");
const path = require('path');

module.exports = function (config) {
  existingKarmaConfig(config);

  // Add your code here
};
```

To allow the Karma process to pick up your configuration file, you will have to update the **gulpfile.js** content to this:

```typescript
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.initialize(gulp);

// Extending Karma
const karmaTask = build.karma;
if (karmaTask) {
  karmaTask.taskConfig.configPath = './config/karma.config.js';
}
```


> **Important**: Check the path to your Karma config file in the last line. In my example I added it to the **config** folder.


## Add better code coverage reports

Now that the basic configuration part is done, you can start to do additions to the configuration. For example, in order to get better code coverage reports, you can make use of a Karma plugin called: **karma-remap-coverage**.

First, you will have to install this to your project with the following command: `npm install karma-remap-coverage --save-dev --save-exact`.

Once installed, open your **karma.config.js** file, and include this plugin to the file:

```typescript
const remapCoverageReporter = require('karma-remap-coverage');
```

The next step is to add the configuration for this plugin. After the **existingKarmaConfig(config);** line, add the following code:

```typescript
// Add the remap-coverage - code coverage for the original files
config.reporters.push('remap-coverage');
config.coverageReporter = {
  type: 'in-memory'
}
config.remapCoverageReporter = {
  'text-summary': null,
  html: path.join(gulp_core_build.getConfig().tempFolder, 'coverage/html'),
  cobertura: path.join(gulp_core_build.getConfig().tempFolder, 'coverage/cobertura.xml')
};
config.plugins.push(remapCoverageReporter);
```

Now run your gulp test task again, and you should get a new **HTML** folder in the **temp/coverage** directory. If you check the generated **index.html** file. You will notice that the outcome will be different to the first generated coverage report. Here is the outcome of my JS coverage:

{{< caption-new "/uploads/2017/09/092617_0751_ExtendKarma2.png" "Default code coverage report" >}}

Here is the new report:

{{< caption-new "/uploads/2017/09/092617_0751_ExtendKarma3.png" "Code coverage report after extending the Karma configuration" >}}

The **placeholder** coverage went from 90.63% to 100%. All had to do with the **__extends** helper function. In the newly generated report, you can see that the coverage is based on the original code.

{{< caption-new "/uploads/2017/09/092617_0751_ExtendKarma4.png" "React TSX component file" >}}

## What can you do more?

There is a lot you can do once you have this in place. If you go to the npm site, you can search for Karma plugins which can further extend your unit-tests. One other useful plugin which I like to use is the **HTML reporter**. This generates an HTML file of the unit-test outcomes. Which is a lot easier to check that the console output.

In order to get the Karma HTML reporter, you first have to install it via: `npm install karma-html-reporter --save-dev --save-exact`

Add the following to the **karma.config.js** file:

```typescript
const htmlReporter = require('karma-html-reporter');
```

This is the required configuration:

```typescript
// Add the HTML reporter
config.reporters.push('html');
config.htmlReporter = {
  outputDir: path.join(gulp_core_build.getConfig().tempFolder, 'karma-html-report'),
  templatePath: null,
  focusOnFailures: true,
  namedFiles: true,
  pageTitle: 'sp-dev-fx-controls-react unit-tests report',
  urlFriendlyName: false,
  reportName: 'sp-dev-fx-controls-react-report',
};
config.plugins.push(htmlReporter);
```

When you now run your unit-tests, you should see a new **karma-html-report** folder in the temp directory. If everything went good, it should contain an HTML file with the following output:

{{< caption-new "/uploads/2017/09/092617_0751_ExtendKarma5.png" "HTML test report" >}}

You can check the following project to see the complete configuration: [https://github.com/sharepoint/sp-dev-fx-controls-react](https://github.com/sharepoint/sp-dev-fx-controls-react)

Happy testing!