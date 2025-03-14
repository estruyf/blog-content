---
title: How to define add-in commands in an Outlook module
author: Elio Struyf
type: post
date: 2017-02-01T13:55:45+00:00
slug: /how-to-define-add-in-commands-in-an-outlook-module/
dsq_thread_id:
  - 5512447145
categories:
  - Add-in
  - Office
tags:
  - Outlook
  - Outlook module
comments: true
---

In January, a colleague and I built our first Outlook module. With the Outlook module extensibility, which was announced at Build 2016, you can create your own applications/modules inside the Outlook client. By default, you have mail, calendar, tasks, but now you have also the ability to put other applications in it. These modules are based on the existing add-in platform, which means that it is all web based.

> **Info**: Outlook module extensibility - [https://channel9.msdn.com/Events/Build/2016/P572](https://channel9.msdn.com/Events/Build/2016/P572)

Since this functionality was announced, I had the idea to use this module extensibility to create a task management system which aggregates and visualizes all your tasks from SharePoint and Planner in Outlook. That way the user does not have to know where the actual tasks were created, nor does he have to open another application. He can simply manage his tasks from within Outlook.


Back in December, I heard that Microsoft organized the second edition of its online hackathon: [Hack Productivity](https://hackproductivity.devpost.com/), which gave me the motivation to finally built it.


During the development phase in January, we noticed that there was not a lot of information about Outlook modules available. The only article that helped was the following:


> **Info**: Module extension Outlook add-ins - [https://dev.office.com/docs/add-ins/outlook/extension-module-outlook-add-ins?product=outlook](https://dev.office.com/docs/add-ins/outlook/extension-module-outlook-add-ins?product=outlook)

The article and corresponding sample gave us a good start, but we had still an issue with the add-in commands.


## Add-in commands background information

When you developed Outlook add-ins before, you might have made use of the add-in commands functionality which allows you to create buttons in the Outlook ribbon.

If you have not done this before. The way to implement it is by specifying a new control of type button in your manifest file.

> **Info**: sample Outlook add-in manifest with defined commands: [https://dev.office.com/docs/add-ins/outlook/manifests/manifests](https://dev.office.com/docs/add-ins/outlook/manifests/manifests)

Here is an example (check out the previous URL for a fully-detailed example):

```xml
<Control xsi:type="Button" id="btnSample">
  <Label resid="lblSampleButtonLabel" />
  <Supertip>
    <Title resid="lblSampleButtonLabel" />
    <Description resid="lblSampleButtonDescription" />
  </Supertip>
  <Icon>
    <bt:Image size="16" resid="icon-16" />
    <bt:Image size="32" resid="icon-32" />
    <bt:Image size="80" resid="icon-80" />
  </Icon>
  <Action xsi:type="ExecuteFunction">
    <FunctionName>sampleFunction</FunctionName>
  </Action>
</Control>
```

If you specified everything correctly in your manifest it will get displayed in Outlook. When you click on the button, it will execute the function which is defined in the **ExecuteFunction** action element. Which in this case is the **sampleFunction**.

To allow this functionality to work, you have to specify a **FunctionFile** element with a reference to a page that contains all the command action functions (JavaScript).

```xml
<FunctionFile resid="functionFile" />
```


## Implementing add-in commands in a Outlook module

When I was building the module, it looked as it used the same kind of functionality for defining commands.

In the sample manifest file of the Outlook module, there is also a FunctionFile reference defined. I updated this in my first implementation, with a reference to a function HTML file. When I loaded the module in Outlook, whatever I tried, the buttons functions were never triggered. When I opened Fiddler to check if my HTML was even loaded. I did not see any requests made to that file.

The last thing tried was to define the functions in my module JavaScript file. That is when the buttons began to work!

So, what I concluded is that the FunctionFile is not required for module add-in command.

## Sample

Here is a very simple Outlook module sample:

{{< caption-new "/uploads/2017/02/020117_1337_Usingaddinc1.png" "Sample Outlook module to show the command functionality"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA4ElEQVR4nE3KQUrDQBSA4ddeyLN4CHFXrF7AvVfwAF0obkQ9QBoFtZTQSFxpQuI0SScvb6bJDOm8UbAgftv/h/HZ08HF8nj2fjRLDi9XcBKOTx9H03A0DWEyh/PrxdU8GTq1VVRu8Hb59RCJ+0jcReJmUUAQBM8vr6bvWyKtiK12VjujnFHeaojfklUcr8sSEbFtm4ZwQ7rr9LYjpUHUzcdnmmUZNkiKeurbdTvsBmut9x6899//GGPSLC2KIs9z5xw4x+4XM3vvjTFCCCllXdfMDPv2d1hrq6pCRCklM/8At+zRQ/Yz9DkAAAAASUVORK5CYII=" "356" "297" >}}

On the following GitHub repository, you can check out the code: [Outlook module command sample](https://github.com/estruyf/OutlookModuleCommandSample).