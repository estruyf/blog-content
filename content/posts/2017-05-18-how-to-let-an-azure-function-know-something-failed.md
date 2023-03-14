---
title: How to let an Azure Function know something failed
author: Elio Struyf
type: post
date: 2017-05-18T14:26:37+00:00
slug: /how-to-let-an-azure-function-know-something-failed/
dsq_thread_id:
  - 5828664736
categories:
  - Azure
  - Development
  - Node.js
tags:
  - Azure
  - Functions
comments: true
---

Just a quick article about how you can let your Azure Function runtime know there was a problem during the execution. This is important when you are for example working with queue triggered functions.

The default method to let your Azure Function know it has finished is the **context.done()** method. When you use the method like this: **context.done()**, the runtime thinks everything was executed correctly. In the case of working with Azure storage queues, the actually processed message gets automatically removed. Which is, of course, unwanted behavior when something failed.

While I was reading through the Azure Functions Node.js reference documentation, I noticed that the first parameter you can pass to the **context.done** method is an error. Once you use it, the Azure Function is informed that there was a problem, and in the case of working with queues, it does not remove the message. The good thing is, the Azure Function will automatically retry 5 times before sending the message to a poison queue.

> **Info**: Azure Functions JavaScript developer guide - [https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node)

Here is an example of how you can use it:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
module.exports = function (context, myQueueItem) {
  context.log(`Start with the following message: "${myQueueItem}"`);
  context.log(`Dequeue count: ${context.bindingData.dequeueCount}`);
  context.done("Something failed");
};
{{< / highlight >}}

This is the output of the function:

{{< caption-legacy "uploads/2017/05/051817_1421_HowtoletanA1.png" "Log output of the sample code" >}}

As you can see in the above screenshot, the function gets triggered 5 times before it gets sent to a poison queue. When you would remove the error parameter, it will only be processed once. Throwing errors also result in the same outcome (one time processed).