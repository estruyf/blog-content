---
title: Speed up your SharePoint Framework build and release process in Azure DevOps
author: Elio Struyf
type: post
date: 2018-05-24T10:59:06+00:00
slug: /speed-up-your-sharepoint-framework-build-and-release-process-in-vsts/
dsq_thread_id:
  - 6688735698
categories:
  - Development
  - SharePoint
  - VSTS
tags:
  - Automation
  - CI/CD
  - Gulp
  - Office 365 CLI
comments: true
---

Automating your builds and releases for SharePoint Framework is easy to achieve on Azure DevOps. In the past, I have written how you can achieve it by using [custom Gulp tasks](https://www.eliostruyf.com/use-build-and-release-pipelines-in-vsts-to-automate-your-sharepoint-framework-deployments/) or using the [Office 365 CLI](https://www.eliostruyf.com/using-the-office-365-cli-in-your-vsts-ci-cd-pipelines-for-sharepoint-framework-solutions/). One thing both solutions have in common is that they are taking 5-10 minutes to complete. Which is not that bad, but they also do not contain a lot of tasks.

In this article, I will highlight what you can do to make your build and releases to complete faster.

## Basic setup

In my demo setup I used the following configuration:

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour1.png" "Simple build process"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATElEQVR4nG3KQQ6AIAwF0d7/cIQtnAGhiEYK9GPitr7tDBVmEYGhgKpSDaHmPNfa2xwKYu/P45AxAGyD2DlOqd1X7/0n1xhbKc9nGi834pHdpPVThwAAAABJRU5ErkJggg==" "624" "283" >}}

The host agent which is being used is the **hosted** one.

Once the build gets queued, it takes six minutes to get completed.

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour2.png" "First test run without any improvements"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQklEQVR4nGNo2tfUtL+57UBb3Z76/K15BdsKCrYXFGwrKNxeULi9kOHb1+9PXzx+8vjx2zfvPr7/+OH9Bzj6+OEjALd8LHTO7WXfAAAAAElFTkSuQmCC" "513" "97" >}}

## Node version

In the Office 365 CLI article, I mentioned that since SPFx version 1.4.1 you can make use of Node version 8. In most cases, this speeds up the build process already a lot. In my tests, it is 2 minutes in average faster on Node v8 versus the default Node version the host has installed (version 6).

To use Node v8 in your build and release process, all you must do is add the **Node Tool Installer** task to the process.

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour3.png" "Node tool installer task"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAGUlEQVR4nGN4//Xtm49vvn399uXrl98YAAC9axz/N6HErAAAAABJRU5ErkJggg==" "555" "80" >}}

Be sure to add it as the first task of the process and update the **version spec** setting to **8.x**.

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour4.png" "Increase Node version to 8.x"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVR4nG3CQQoAIAgEQP//25IlzdWiY9EwAsDN1q2qbHIypatGkMx3ntIUGO6s7w0QxVhfcyqxEAAAAABJRU5ErkJggg==" "624" "160" >}}

The updated process looks like this:

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour5.png" "Improved build process with Node v8"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATklEQVR4nG3JuwqAMAwF0Pz/t5VuIq6CQ4e+YjXQ3BpnsWc9FFJoranq+AFAx76lGHvvNkPXsp61Yox5Z+e4lFsEwKy9Lzkxs4iY2fP1AihzkfUkjpRaAAAAAElFTkSuQmCC" "624" "341" >}}

When you run this process, you should see a noticeable difference in execution time.

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour6.png" "Build process run with Node v8"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOUlEQVR4nGNo2tdYv7exbX9r/Z66/K35hVsLC7cVFGyFIoafX38+eHr3ydMnH999/PzhMzL68uELALYYLI690cyPAAAAAElFTkSuQmCC" "511" "98" >}}

The biggest performance increase is in the **npm installation**. The reason is that in Node v6 it is using npm version v3. In Node v8 during my test runs, it used npm v5 which introduced a lot of performance improvements. The task went from 4.2 minutes to 1.2 minutes in my test run.

## Using a macOS or Linux build agent

Can the process be even faster? Yes, and the way to achieve this is by using a hosted macOS or Linux build agents which are currently in preview.

> **Important**: you can only change to the macOS or Linux host if you do not depend on Windows platform related tasks like for example PowerShell.

Switching the host is simple, all you need to do is get over to the process and witch the agent queue:

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour7.png" "macOS host agent"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOklEQVR4nAXBgQ0AIQgDQPef9RMfQVAKjXdDdKuZRkqURu3bRVYTzQTGv+ybMpepH/MjDrudxQMm6gEC/Dn/GCAXlgAAAABJRU5ErkJggg==" "616" "102" >}}

Once changed, you can test it out by triggering a new build process. Here is the result of my process:

{{< caption-new "/uploads/2018/05/052418_1051_Speedupyour8.png" "Final run with macOS host agent"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMklEQVR4nGNoO9BWv6ehZV9rwdaC/K35+VvyQSQMMXz8/OnR8wfv3r7/9PETGvry+QsAr5ssd/XXqzQAAAAASUVORK5CYII=" "624" "99" >}}

Again, the biggest performance increase is in the npm installation process. This has to do how files are handles on Unix and Linux systems and with SPFx solutions, there are a lot of files involved. The task itself went from 1.2 minutes to 43 seconds in my test run.

## Conclusion

So overall, if you put both things in place, you can achieve a performance increase of almost 5 minutes, and this for a fairly simple process.

If you are looking to improve your build and release processes, I encourage you to test out these tips.