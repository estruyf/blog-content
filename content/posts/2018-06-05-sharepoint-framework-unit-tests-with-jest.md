---
title: SharePoint Framework unit-tests with Jest
author: Elio Struyf
type: post
date: 2018-06-05T20:05:54+00:00
slug: /sharepoint-framework-unit-tests-with-jest/
dsq_thread_id:
  - 6713738713
categories:
  - Development
  - SharePoint
tags:
  - Components
  - React
  - SharePoint Framework
  - SPFx
  - Unit tests
comments: true
---

Back in April 2017, I wrote about how you could write unit tests for SharePoint Framework components. This was created by a combination of the dependencies provides by SharePoint Framework itself and [enzyme](https://github.com/airbnb/enzyme) (JavaScript Testing utilities for React).

> **Info**: you can read more about writing unit tests for SharePoint Framework components here: [Writing unit tests for your SharePoint Framework components](https://www.eliostruyf.com/writing-unit-test-for-your-sharepoint-framework-components/).

There are a couple of downsides to this approach:

*   Unit tests are slow as the full SPFx build process needs to run every time you want to run your Unit Tests.
*   Harder to debug your unit tests as it is tightly coupled in the SharePoint Framework build process. Read more about it here: [How to debug your SharePoint Framework unit-tests](https://www.eliostruyf.com/how-to-debug-your-sharepoint-framework-unit-tests/).
*   Integration with other systems and tools is harder to achieve as it requires you to override the existing Karma configuration. Read more about it here: [SharePoint Framework code coverage reports for unit-tests](https://www.eliostruyf.com/sharepoint-framework-code-coverage-reports-for-unit-tests/).

## Let's decouple our unit-tests from SPFx build process

An easier way to test your solutions would be to decouple your unit-tests process from the SPFx build process. Of course, this is now so easy, but luckily there are some great tools which make is fairly easy. The tool I like to use these days for running my unit-tests is **Jest**. Jest calls itself a delightful JavaScript testing framework, and I must agree that it is easy to configure. The documentation is great to get you started. This article will show you how to configure Jest in your SharePoint Framework solutions so that you can quickly get started writing your unit-tests.

## Let's get started

As the base of this article, I'll use the project I created for my first unit-tests article: [https://github.com/estruyf/spfx-testing-wp](https://github.com/estruyf/spfx-testing-wp). This project contains a web part with a couple of already defined unit-tests.

To run our tests, we need the following developer dependencies:

*   enzyme
*   enzyme-adapter-react-15
*   jest
*   identity-obj-proxy: allows you to test SASS / LESS / CSS imports - [https://github.com/keyanzhang/identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy)
*   react-test-renderer
*   react-addons-test-utils
*   ts-jest: TypeScript preprocessor with sourcemap support for Jest - [https://github.com/kulshekhar/ts-jest](https://github.com/kulshekhar/ts-jest)

Run the following command to install all at once: `npm i enzyme @types/enzyme enzyme-adapter-react-15 @types/enzyme-adapter-react-15 identity-obj-proxy jest @types/jest react-addons-test-utils@15.6.2 react-test-renderer@15.6.2 ts-jest -D -E`.

> **Important**: use the same versions for **react-addons-test-utils** and **react-test-renderer** as the React version defined in the **package.json** file. At the moment of writing this article, this was version **15.6.2**.

Once installed it is time to configure Jest. As we installed **ts-jest** it allows us to add the Jest configuration to the **package.json** file. The most basic config is the following:

{{< gist estruyf 37ce9068d041ed4e3d5ec658fd94254f >}}

This is a slightly adapted version of the basic configuration which is shared on the ts-jest documentation. I applied the following changes:

*   **transform**: added **ts**;
*   **moduleFileExtensions**: removed jsx and node. As most of the time you will work with TS and TSX files;
*   **moduleNameMapper**: configuration for CSS and SCSS files. Otherwise, the unit-tests fail because the test runner does not understand what to do with these files.

In order to run your unit-tests, it might be best to do a change in the **scripts** property of your package.json file. In the scripts property, you see that **test** is already defined to **gulp test**.

{{< caption-new "/uploads/2018/06/060518_1952_SharePointF1.png" "Default scripts config in package.json"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgklEQVR4nCXNQQ6DIBBAUU7TUXFmQAcRBq1txIU2vf9xmsbkr97mm0ixsn5cSZxGt3Y4QT+CFcB/5oHhYL1cUc52msdzoWf2exmOgmE2gCHT/HVLpmwlyrWiJr+rf2vLkwGUjdPJxVGkVx5qoTX5qq0LYMWI3zoM0Av00pA0GO7rLT9tmR6Sy/Ht/AAAAABJRU5ErkJggg==" "243" "129" >}}

To run Jest, change "gulp test" to **jest**. That would be all. Once you did this, you can run your test as follows: `npm test`.

In many cases, this configuration is already enough, and the output will be as follows:

{{< caption-new "/uploads/2018/06/060518_1952_SharePointF2.png" "Jest test run"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiUlEQVR4nB3MSwrCMBAA0N5FbKqdcTKZpDEfU2qlFkRwJRSl9z+G1PWDV73XlR/f3bjU0wfm5XmXUmLLSbWiwFZ68GIjc0faiUSUXqFXsNnGyMGn0XS9hEHCwC6B9g26Bt3G4i869RSKcflkIkomm9FE4HAkX03zi65TW24N5z2dgcwBpf7PCuwP7iAfiKzeeNgAAAAASUVORK5CYII=" "624" "313" >}}

Depending on your usage of SharePoint Framework resources, it might be that you run against the following issue:

> **Error**: Cannot find module 'resx-strings/en-us.json' from 'SPCoreLibraryStrings.resx.js'

{{< caption-new "/uploads/2018/06/060518_1952_SharePointF3.png" "Jest resx string file not found"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmElEQVR4nBXM3QqCMBgA0L1HEFGRbs6t/X1bU7ciCaXArgq6C4pMyN7/LjoPcNDzPbrbd3J8zbph2n2aLl4abPwuzU1CNWpVqbUHKIQArZyELZWBcMDMpLlBSnphI4PAIeiiNptoXCVtEBBy6ZEp91baStk115SwJYZF5ggDwuCfD/1YXgd87pPTY97e66Y4BIK5XWUqofoHpWoiRXb1U30AAAAASUVORK5CYII=" "624" "288" >}}

Apparently, the test runner cannot find the en-us.json file. In order to make it work, you can add a mapping for this file in the already defined **moduleNameMapper** property like this:

{{< gist estruyf d1dea2c0e2d7810871810b171202f175 >}}

When running the test again, test output is the same as before:

{{< caption-new "/uploads/2018/06/060518_1952_SharePointF4.png" "Jest third test run"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiUlEQVR4nC3MSw6CMBAAUA6jFtKpnen0Q0sFgZAa4saFMWq4/zUMieuXvOq5bWb9HqbXafnA7X0vtu+TpE5IFmArHAPbROQRPXMEHoQKAnbbGSiGbjZ+4Dhye0XXSQy1crVyO5PPmHqMF+OyNunMWdusTFIUJYaqrA89FRiWhvJRt6BNo/6zAPsD6E0fhNTMHakAAAAASUVORK5CYII=" "624" "315" >}}

## Writing unit-tests

Unit-tests can be written with the use of enzyme. A sample of this is provided in the project. One requirement is that the test files have eighter **test** or **spec** in their name.

{{< caption-new "/uploads/2018/06/Screenshot-2018-06-05-22.02.14.png" "Test and spec files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAACXBIWXMAABYlAAAWJQFJUiTwAAAATklEQVR4nB3IQQqAIBRAwQ7TpqLE1PSbiEq26kRd/gXNcgYfOz5d6CNjQ8GGiovtPycNEwrGF4bzXVBR2HRC2cSqIyF1an+QfDMrYZx2PkzUIXLz5RCVAAAAAElFTkSuQmCC" "1252" "210" >}}

> **Info**: if you want to reference other test files, you will have to make your changes in the **transform** property.


## What are the benefits of using Jest

In my opinion, the benefits of using Jest in your SharePoint Framework solutions are:

*   Unit-tests are fast!
*   Easier to test and debug.
*   Much easier to extend. It is only a matter of installing the dependencies and applying the configuration. Like for instance tools like Istanbul ([Istanbul Jest configuration](https://github.com/facebook/jest/blob/master/docs/Configuration.md)).

## Testing out this sample

If you are interested in testing out this sample project, you can check out the code here: [https://github.com/estruyf/spfx-testing-jest](https://github.com/estruyf/spfx-testing-jest).

In the SharePoint SPFx sample repository, you can find another great sample from Velin Georgiev ([@VelinGeorgiev](https://twitter.com/velingeorgiev)): [https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-jest-testing](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-jest-testing).