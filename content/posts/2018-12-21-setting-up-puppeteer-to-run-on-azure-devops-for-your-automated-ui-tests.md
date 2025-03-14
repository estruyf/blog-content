---
title: Setting up Puppeteer to run on Azure DevOps for your automated UI tests
author: Elio Struyf
type: post
date: 2018-12-21T12:27:36+00:00
slug: /setting-up-puppeteer-to-run-on-azure-devops-for-your-automated-ui-tests/
categories:
  - Development
  - SharePoint
  - Testing
tags:
  - Puppeteer
  - SharePoint Framework
  - SPFx
  - UI Tests
comments: true
---

A few weeks ago, I wrote about how you can use Puppeteer in combination with Jest to perform automated UI tests for your SharePoint solutions. In that article, you still had to run your tests manually start the tests. In this article, I will explain how you can automate this in Azure DevOps so that it can run on a schedule. With this automated pipeline in place, it makes it relatively easy to validate your solutions after new releases to your environment(s).

> **Related article**: [Testing the UI of your SPFx solution with Puppeteer and Jest](https://www.eliostruyf.com/testing-the-ui-of-your-spfx-solution-with-puppeteer-and-jest/)


## The project

For the project base, we use the one that was created for the previous article: [https://github.com/estruyf/spfx-ui-tests-sample](https://github.com/estruyf/spfx-ui-tests-sample).

## Changes required to run on Azure DevOps

In order to run on Azure DevOps, we need to install the **jest-junit** dependency to get test reports which Azure DevOps can process. You can install this to the project as follows: `npm i jest-junit -S -E`.

Once this is installed, the dependency needs to be configured. You can do this by adding the following **jest** object to the **package.json** file:

```json
"jest": {
  "reporters": [
    [
      "jest-junit", {
        "suiteName": "SharePoint SPFx Testing",
        "outputDirectory": "./reports/",
        "outputName": "./junit.xml"
      }
    ]
  ]
}
```

Here you can see where you should add it:

{{< caption-new "/uploads/2018/12/122118_1133_SettingupPu1.png" "Jest configuration for JUnit"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAn0lEQVR4nG3OawuCMBSA4WOSNAtc5TadBgm6rXncKtCC/v//iq6gCM+3l3OBtEV5utNyiAtPcrfKHZEvsfREOqAahbpFWQepCpiGt+AHqEGu+0ggMPVpI9S0BzcQ6SGdy4lGcfbr8jLTmIbCYOWRl37DNeHN//xXXtl9fV1ldilsIkw4XS7srnNM99vjg0oMJw8KaQhXMVOENZTVi/H0E7wVGlP18gw4AAAAAElFTkSuQmCC" "624" "587" >}}

If you want, you can already test out the outcome by running: `npm test`. If you tested it, it should have created a new folder **reports** and a **junit.xml** file. This is what is required for Azure DevOps to process the test results.

## Code updates

The code used from the repository is using a config.json file for passing the user, password, URL. We will change this to environment variables so that you can easily configure it in the build pipeline.

In the **./src/tests/spfx.spec.ts** file, you can remove lines 8-10. On line 16, you can replace the config with the following:

```javascript
const { USERNAME: username, PASSWORD: password, PAGEURL: pageUrl } = process.env;
```

Update all other references for the username, password, and pageUrl in the code.

You can see all changes in the **azure-devops** branch of the project: [https://github.com/estruyf/spfx-ui-tests-sample/tree/azure-devops](https://github.com/estruyf/spfx-ui-tests-sample/tree/azure-devops).

## Ready to run it on Azure DevOps

Once you implemented these changes, create a new repository in one of your Azure DevOps projects, and push the code.

### Configuring the tasks

Once the repository is created, you can create a new **build pipeline** with the following tasks:

{{< caption-new "/uploads/2018/12/122118_1133_SettingupPu2.png" "Tasks required for the automated UI tests"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAqElEQVR4nGXCTU7DMBAGUN//Tj0AYoWEBEiopWSTpLFdz9Qz3/gvSKB2w9NzZpZzDiGklIiImcfdvu9u8xGKcmdmrbXe+xijtubmZfF+U4iqmAEGQAE1AzG7ed0uIaas6SYs+hssuKmFK7nn4+n1az1eZLrW71gez7G+nIObPt6m2XsGoZO2R0afY3ZPhwNTqrXu/5RS3Of7aVmXEGJKJCKt9b+9D1X8AO5i5G3pTpdWAAAAAElFTkSuQmCC" "526" "427" >}}

As the agent, I use the **hosted macOS**, and the tasks should be configured as follows:

**Node Tool Installer**

I always update my Node.js version to speed up the process. For this one, I used version 10.x.

**npm**

Use the npm task to run an **npm install**.

**Command Line**

We will use this task to run the tests, but also to set the **password** as an environment variable because this cannot be retrieved otherwise.

```bash
export PASSWORD=$(PASSWORD)
npm test
```

Here is how I configured it:

{{< caption-new "/uploads/2018/12/122118_1133_SettingupPu3.png" "Command line tasks to run the test"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPUlEQVR4nGXJQQrAQAgEQf//XAXRGceEQA4LW/StrapIPgftYr5Ga+7e3STnIP1ZRGQmAF1IGsndvZ8kAC+U0HYIBDF5+wAAAABJRU5ErkJggg==" "624" "266" >}}

**Publish Test Results**

{{< caption-new "/uploads/2018/12/122118_1133_SettingupPu4.png" "Configuration for the Publish Test Results task"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZklEQVR4nHXOzQrDMAwD4Lz/e5auh8X5mRO3k9ySncpKPnwxQqCgqrvZeePuoH9B0kOptZkB43sKfV2QImdx2V49pWk71/JRncaSC4Cx6DfqT3jHzGM/yXEPoW1rFzERixGtgcTNBQ0Q60KCpJMSAAAAAElFTkSuQmCC" "624" "525" >}}

The last step is to publish the test results. Configure it to search for the **junit.xml** file and to run even if the previous task has failed. That way you will always get to see the testing results.

### Specifying the variables

The last thing before you can run it is to specify the pipeline variables, you will have to create the **username**, **password **(choose to lock this one, so nobody can see it), and **pageurl **variables.

## Ready to do some automated tests

Once you configured all these things, you are ready to give it a first spin. Queue a new build and wait for the outcome.

{{< caption-new "/uploads/2018/12/122118_1133_SettingupPu5.png" "Run an automated UI test"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0UlEQVR4nG2PWWrEMBAFdf9LOh7JS2tpuy3L2lryMAkBQ1K8v4KCJwY7qFmN4/iSUkmplBqGwRjbemvMwoeTiDbE8wxXuE7vQzhjjKUUZhbzCl+jdIi55Jhi5VqZa62lllKyMM7IWYNzYMChSymmnFJOueRcsgACNb1wQzigcrn73R8ITXqaJ9zRHqa19nTf+tDTMiNtztt/NBDISeLuFlp67/f9J76ss7VGWwhX8NE/G2Ld15eSGrRBjd4Vzv3+NH4QFMihIzoo0HERM38e/+4NKPs6gy82O3sAAAAASUVORK5CYII=" "404" "430" >}}

When clicking on the tests tab, you can see a test outcome:

{{< caption-new "/uploads/2018/12/122118_1133_SettingupPu6.png" "Check test results"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmElEQVR4nDXMbQrCQAxF0dn/WnQjgovQUgalNpmPTJNMxkiLPf8uD16AvO5gBQRAVNUxhp/CZ1kA0+hDRXrvzMwizLwdAiDO7/lyu07zI8b4er/maYox1kaVamDm3PL9eUdYSy1ERJh423rv2jXUWhu1r331aBERVRb5n5sZJlw+SymlNbJhZubuOed9dvdSC5zSwd2JiJl/X+nHsn7yELcAAAAASUVORK5CYII=" "624" "460" >}}

In case of a failed test, you see this:

{{< caption-new "/uploads/2018/12/122118_1133_SettingupPu7.png" "Check which results failed"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeUlEQVR4nFXLwQ6CMAwG4L3/oxkhHrx5M5FuDIyMQfu3ZRqOfvcvFKIhxpQiEUHw/RfGaSplBSAKVrCwQE4QFg6l1ue9vz369+Wau25eFhpeaUwUaeMtuPn8yXmdNWXJWc1Uzqeq7h7MrNaNWeAOM1U93Pd9b60B+AHpe45WFUtJNQAAAABJRU5ErkJggg==" "624" "289" >}}

Next steps are to configure the pipeline to run on a specific trigger or schedule. This is something you can implement underneath the **triggers** tab.

Enjoy the automated UI tests!