---
title: SharePoint Framework code coverage reports for unit-tests
author: Elio Struyf
type: post
date: 2017-09-15T08:17:56+00:00
slug: /sharepoint-framework-code-coverage-reports-for-unit-tests/
dsq_thread_id:
  - 6145001334
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

A while ago I wrote an article about writing unit tests for your SharePoint Framework components. One of the missing things was a code coverage report to check how well you unit-test your codebase.

> **Read more**: [Writing unit-tests for your SharePoint Framework components](https://www.eliostruyf.com/writing-unit-test-for-your-sharepoint-framework-components/)

Apparently, with the v1.2.0 of SharePoint Framework they added a tool called [**Istanbul**](https://istanbul.js.org/) which can generate such reports. The great thing is, you do not have to do anything to get it working, all you have to do is writing your tests.

## Why would this be useful?

Writing your test and seeing them complete is one thing of knowing you wrote "good" code, but did you actually test every line of code? These code coverage reports are extremely useful to check that you are prepared for all certain scenarios of how your code will be used and the expected outcome.

Also, you can see the lines of code in your files that will never get executed. That gives you useful insights in the code that you might want to remove, or for which you have to write additional tests.

A good resource for learning more about Istanbul can be found here: [learn-istanbul](https://github.com/dwyl/learn-istanbul).

## What do I need to do?

As mentioned, you only have to take care of writing your tests. Once your tests are completed, just run: `gulp test`.

{{< caption-legacy "uploads/2017/09/091517_0803_SharePointF1.png" "Test gulp task output" >}}

## Where do I find the report?

Once you ran the test task with gulp, you can find the code coverage report in the **temp/coverage/js/** project folder. Open the **index.html** file to check out the report.

{{< caption-legacy "uploads/2017/09/091517_0803_SharePointF2.png" "Coverage folder" >}}

## What do such reports look like?

If you never used **Istanbul** before, here is what they look like:

{{< caption-legacy "uploads/2017/09/091517_0803_SharePointF3.png" "Code coverage report" >}}

In the above screenshot, you can see three controls for which I wrote some tests. The listView control as you can tell from the red bar, is not completely covered yet in my tests.

You can also click on the control names to dig deeper into the files and code.

{{< caption-legacy "uploads/2017/09/091517_0803_SharePointF4.png" "Code coverage file report" >}}

In this screenshot, you see that two files were used in my tests and that the scss.js file is fully covered. The **js** file is only 89.29% covered when clicking on that file, you can see the actual code and which code coverage you are missing.

{{< caption-legacy "uploads/2017/09/091517_0803_SharePointF5.png" "Code coverage untested code report" >}}

At the moment, the coverage that I am missing as you can see in the screenshot is the one for the TypeScript helpers that get added when code gets transpiled to ES5 JS.

Happy testing your SharePoint solutions!

BTW: Thanks to [Velin Georgiev](https://github.com/VelinGeorgiev) for mentioning this.