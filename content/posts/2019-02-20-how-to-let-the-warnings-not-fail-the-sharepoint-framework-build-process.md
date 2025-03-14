---
title: How to let the warnings not fail the SharePoint Framework build process
author: Elio Struyf
type: post
date: 2019-02-20T08:41:33+00:00
slug: /how-to-let-the-warnings-not-fail-the-sharepoint-framework-build-process/
categories:
  - Development
  - SharePoint
tags:
  - Gulp
  - SharePoint Framework
  - SPFx
  - tasks
comments: true
---

Something that is giving me some trouble for a long time is that the SharePoint Framework build process treads warnings as errors in production builds (when the **--ship** flag is present).

Let's start by giving some background information. During bundling/packaging of your SharePoint Framework solution, you could see two types of messages:

*   Warnings
*   Errors

{{< caption-new "/uploads/2019/02/022019_0828_Howtoletthe1.png" "Types of messages: warnings and errors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARklEQVR4nGOQU9RVVjVU0TBSUDMQU9YVkNXkl9Hil9HilNHkkNJgkFA1VTN2ltK2YJPSYhbTZBLVZBJRZxRRYxJRZxJRBwDxxQchqUKQMQAAAABJRU5ErkJggg==" "624" "132" >}}

When running a DEBUG build, both messages are not causing the process to fail by a stderr (or standard error). Only during a PRODUCTION build, you would get the following output:

{{< caption-new "/uploads/2019/02/022019_0828_Howtoletthe2.png" "Warnings and errors let the build process know something failed"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAYklEQVR4nGOQVtGXUzZUVjdR07KQ0zARVzEQkNcSkNfmltfiktVkEJbSUtEwlVEz4JZQYRVSYuSXZxZWZRVVZxIBIQYzlyBjt1g1q2ApfS9pfW8xHXdOGQMmETVmUXVmUXUAMUAMJ7fX+W0AAAAASUVORK5CYII=" "624" "171" >}}

Important is the above screenshot are the last two lines. In production builds, it returns an error to let the process know it failed. For errors this is, of course, necessary behavior, but what if you only have warnings?

{{< caption-new "/uploads/2019/02/022019_0828_Howtoletthe3.png" "Warnings let the build process think something failed"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAO0lEQVR4nGMQVTWQ1bFSMLCW0jITVTXiU9DhkNbklNHkkgWRDNKaluqmLrK6ltyyOtzSusyi6kwiCAQA+wQHa02uYS0AAAAASUVORK5CYII=" "624" "120" >}}

Even when there are only warnings, it will return a stderr error and let the process fail. Although these are "just" warnings, for the production build process they are seen as errors.

This might be an issue in your automated build/release pipelines. For instance, when you automatically bundle and package your solution on Azure DevOps, there is no way to tell that it should continue when warnings occur. The only option you have is to continue on error.

{{< caption-new "/uploads/2019/02/022019_0828_Howtoletthe4.png" "Azure DevOps - continue on error task option"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAjUlEQVR4nCXJURKCIBAAUA/fsZoO4gfKEKksErBLIKHbaO/3dYgoldJaT9M0DIOUcp5nRKy1MnOX8+dttNZPY4yUchxHpZT3vpRydiz7Q+RctpQSEbXWmPm4nP0K9XYHsKsQou97Ivo3X7pjb9+CMUYAWJZlvRhjAODs1naihIjOOQCw1oYQnHPee2b+AehJqKGmOct9AAAAAElFTkSuQmCC" "159" "95" >}}

Enabling the continue on error option might give you more troubles when "real" coding errors occur.

In my case, I want to always have the latest version on my DEV environment even when there are warnings. These warnings need to be solved once the pipeline runs for any other type of environment. That way, I am always able to try out my solution, without fixing the warnings and running the build pipeline again.


> **Info**: some of these warnings can also be suppressed like the one which is by default in place to suppress the warning for the CSS class name 'ms-Grid' as it is not created as camelCase. If you have warnings which will always occur and can be ignored, it is best to suppress them the same way with the build.addSuppression(string or regexp) function.


## Why are warnings treated as errors?

The reason for this is the following lines in the build process initialization:

{{< gist estruyf a6e1e481474bf07333fa6b98c7ab778b >}}

In the SharePoint build process, it defines that whenever you use the **production** or **ship** flag, the **shouldWarningsFailBuild** property is set to **true**.

## Overwriting the shouldWarningsFailBuild value will not work

The **shouldWarningsFailBuild** property is available for you to edit in the build configuration in the gulp file. Unfortunately, the build initialization will overwrite whatever you define. In the following screenshot you can see this happening:

{{< caption-new "/uploads/2019/02/022019_0828_Howtoletthe5.png" "Overwriting the shouldWarningsFailBuild option"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAtElEQVR4nD3NWQuCQBiFYUmlScrA1HFp09L5RtzGSdF2w+v+/8+JSQrO3QPnlQDqkveEnpPkGhwb7GeamyGcyhaRLSKtApY0g5ldUHxa7ErNTVWbKjb8OGRQDw5/zGmr+YVswcSMJ6YwwUbIotNrw+7LsJpiqmJQbPKfZB0Y8N6pbjjrjF05WyfIg6kLyKfIo5IeVR572uxq0E7b56oTCfhOnPeEvfnlSYtmS4p9roftWB3bH29xGqMvCUNTAAAAAElFTkSuQmCC" "624" "432" >}}

## Extending the build process

In order to be able to set the property so that you are in control, is by extending the SharePoint Framework build process. Luckily it is not so hard to achieve.

Here is the way you can achieve it:

{{< gist estruyf f191e43dc7382c8ade3ff6ffc2b2b30c >}}

With the following code in place, you are in control whenever you want to treat warnings as just warnings by using the **--warnoff** flag.

{{< caption-new "/uploads/2019/02/022019_0828_Howtoletthe6.png" "Build process running with the custom --warnoff flag"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAwklEQVR4nFXNXQ+BUByA8VO0smFezksbp9CL85+EFBaqjUUz48qlG3e+/wewzI3td/dcPKh4vOLbG9In7Et8cWsPV61hJDOBiIs6g5m/K3Cwq4plzfAVImQKEhkj7JRZh/Uivfb2eSNI6mZQYYDIN/yMw0lyGcWnhh1WiEDY/cNENE0Ktj3oUdKxAs0ElQulL1QOKgfUdWZ2mA02Wc/ftC1P6duqITQTNANk6qJ5do3OT0jvup9j79i0Yok6EnUlWr4/YHUd42gcWxYAAAAASUVORK5CYII=" "624" "429" >}}

With this **warnoff** flag in place, I can now specify in my DEV build pipeline to that warnings can be ignored, but for real production builds, they are treated as errors.

{{< caption-new "/uploads/2019/02/022019_0828_Howtoletthe7.png" "Using the --warnoff flag on Azure DevOps"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATElEQVR4nHXLSw7AIAhFUfa/WE2g8skTaNJp9UxvLpkZgO6uqu7GLnE8vjXSkeTuEVGf/qE5p4jsC2JmVT02ADTGMLPMPN9rLVXNixck/7CFCbhYnwAAAABJRU5ErkJggg==" "624" "355" >}}

I hope this helps you to gain some control over what you try to achieve in your automated builds.