---
title: Things which only happen just before you are about to release
slug: /things-which-only-happen-just-before-you-are-about-to-release/
author: Elio Struyf
type: post
date: 2020-05-04T12:13:08.222Z
draft: false
tags:
  - Development
  - Solution
categories: []
comments: true
---

Hey team, are we ready to release? Yes, push the button and ship it. Why are all our tests failing? Why are our builds crashing? Why can I not access our services? Sounds familiar? It seems to be a common issue when you are just about to release your solution/project/product/... 

Of course, these issues do not only occur during releases. They will happen from time to time, but they are more critical during releases as you want to ship.

In this article, I will go over a couple of lessons and issues which I collected over time, which all happened during or while we wanted to release one of our products. 

## Expired client secret 

A couple of releases ago, we were going through the final tests and did a couple of builds to confirm our release packages. Once we were happy with the result, we said to finally push the release button (not a real button, an Azure DevOps release pipeline which needs to run). Once the pipeline started running, it crashed. 

Ok, let us try it a second time. Nope, same result.  

Digging into our release steps showed us that our translation system did not work correctly, but the error we got was no so clear. It just gave us a generic message something had failed and to try again. 

After searching for the issue, we found out it was an expired client secret we used for the authentication against the system. As everyone would tell you, if you create client IDs and secrets, store them somewhere and set a reminder. We did create a reminder, but due to our focus on getting everything finalized and ready to release, we accidentally ignored it. 

The same thing can happen to an expired certificate, of course, so be sure to keep a record of that date as well.

### Lessons learned

- Try to avoid using client ID and secrets if you can like, for instance, using a managed account. 
- If you are using secrets, be sure to store them somewhere safe (Azure Key Vault or Password manager). Just in case if you need them again at a certain point. 
- Set a reminder to update the secret a couple of days/weeks before its expiring date. 

## Expired access token to your private artifacts feed 

Like the one before, this has also occurred many times. Internally we use a private Azure Artifacts npm and NuGet feed to share our common logic between products. In the past, when you were connecting your device to the feed. The Azure DevOps portal would provide you the configuration you needed to add in your `.npmrc` file. By default, the provided token was valid for 90 days. Guess when most of our issues occurred when installing/updating our packages? Of course, during the release. 

### Lessons learned 

- Remind yourself 
- First thing you do when an authentication error occurs to your private feed, be sure to check if your access token is still valid. 
- Manually create a personal access token that has a longer expiring date. 

The good news is that these days the portal will not automatically create an access token, it will mention to tell you to build it yourself and supply the steps. This way, you are in control and have a better understanding of where and when to create your PAC token.

## Service is down 

Hey, are you able to login to Azure DevOps or Microsoft 365, or is the service offline? Luckily, this does not happen very often that the service is not available, but it has happened a couple of times already. The only thing you can do is check the status pages of the services you use, and wait things out. 

> **Info**: you can find the status page of the Azure services can here: https://status.azure.com/en-us/status 

## Delayed password reset email 

These days we all use many services to manage or daily life and work. Sometimes it happens you forgot to add the password to your password manager, or something happened with the password, and you cannot log in. Luckily, we can always do a password reset and create a new password. Most of us will have done these steps many times. What is most frustrating about this? For me, it is the email which “should” arrive in my inbox? 

In many cases, the reset email arrives in my clutter or junk mail. No problem with that because I know where to look once asked. The frustrating part of it is the delayed emails or, in some cases, never received. If this is a critical part of your release process and must wait 10-60 minutes, this might feel like an eternity. 

### Lessons learned 

- Check your accounts regularly 
- Store your passwords in a password manager 
- Share your passwords only via a password manager 
- If you need to request a password reset, cross your fingers, and hope for the best 
- Extra: Enable MFA
- Extra: Document which external services you are using

## Unavailable hosted build agent 

We are using Azure DevOps heavily in our company. All our builds/releases and nightly environment provisioning runs on hosted agents. Over time these agents change or get retired. You have to keep an eye on it. Some time ago, we were relying on a specific OS version. As we did not see the message from Azure DevOps that particular OS version was about to retire, the day it happened, a couple of our pipelines started failing. 

Luckily, the UI and the logs quickly showed us the problem and we could quickly fix the issue. 

### Lessons learned 

Be sure to keep an eye on all updates coming from the platform/service you rely on. 
 
## Missing permissions scopes between environments 
 
On Azure and Microsoft 365, we rely a lot of Azure AD Apps and their permission scopes. In the beginning, this might be difficult to understand, but once you did it a couple of times, you get to understand it better when you use multiple environments for development and testing, for instance. With managing various environments, it might get a bit tricky process, and you could lose track of where you implemented which change. Sometimes you will do changes to test out things, but forget to document them, or you did too many changes at once, that you do not know which one made it work.

Always try to keep track of your changes, no matter what you are doing. Just write it down somewhere.
 
### Lessons learned 
 
- Document/document/document - try to keep track of what you are doing. This way, it will make your life easier to move to another environment, as you will know what you need to put in place to make things work. 
- Automate: try to make a script. Automation is always right. It makes your life easier, and the process will be faster. More important, your changes will apply in the same way for each time it runs.
 
## Updates on the platform 

This section will not affect all of you reading this post. Only if you are building a product/solution on top of another platform, you might know these pain points. 

As we are building a product on top of Microsoft 365, it happens from time to time (a lot) that updates on the platform affect us and our solution(s).  As we do not own the platform, you need to prepare yourself that these things can happen. 
 
For example, a couple of weeks ago, we wanted to push out a new release. The next day we opened SharePoint and saw a new type of header which affected our solution. Luckily, we spotted this on time and could implement a fix before the release. 
 
Sometimes we are not that lucky, and we have to fix things via a hotfix. The key thing here is our partners/clients and testing. Partners and clients will quickly tell you when things are starting to fail, but we will always try to be seeing and solving these issues before partners and clients do. 

To spot these platform changes as quickly as possible, we use an automated UI testing process. Automated UI Testing makes sure that your solutions keep loading and working as expected. Once automated UI runs start failing, we know that something has changed. These changes could be either on our end of that of the platform.

You can also use these automated UI tests to verify the platform itself still behaves or renders how you expect it for your solution(s).
 
Do not forget **manual testing**; this is crucial. The human eye can easily spot changes and see issues that your automated tests do not spot. 
 
> **Tip**: Try embracing the platform instead of fighting with it. If you do not own the platform, in the end, you will always lose. Be prepared for this. 
