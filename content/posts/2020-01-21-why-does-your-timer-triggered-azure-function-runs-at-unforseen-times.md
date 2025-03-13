---
title: Why does your timer trigger Azure Function run at unforeseen times?
slug: /timer-trigger-azure-function-run-unforeseen-times-/
author: Elio Struyf
type: post
date: 2020-01-21T15:30:19.273Z
draft: false
tags:
  - Azure Functions
  - Azure
categories: []
comments: true
---

Why does your timer trigger Azure Function run at unforeseen times?

Has it ever happened that your timer triggered Azure Function was running on unforeseen times? We had it for two functions, and could not immediately find out where or why this was triggered more than once an hour.

{{< caption-new "/uploads/2020/01/azurefunctions1.png" "Timer function running multiple times per hour"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA5SURBVDXBIQ6AQAwAwSUlGBT9/xuLwpBcl1Qws1WV3U1m8rw353Ex1lpEBKOq2FW6GxUUlZ/KiAg+4bUgvrp6lcAAAAAASUVORK5CYII=" "739" >}}

One of the functions should run once every hour, but as you can see, sometimes it runs more. Between 10-11, it ran three times.

## What is the issue?

While checking the timer function documentation, I saw this alert about the **runOnStartup** property:

{{< caption-new "/uploads/2020/01/azurefunctions3.png" "runOnStartup property warning"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA+SURBVE3BUQ2AQAxEwbfXEjCABFTh3wIklNvyy4zOY++cBRIgyiZp/q6nyIhgWxfQYETQNm2DRGQyq3h18wEsGhWQNQPDxgAAAABJRU5ErkJggg==" "958" >}}

> **Info**: Due to this property, our function automatically started each time the service was restarted, scaled out, ... Documentation can be found here: [Timer trigger for Azure Functions documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=csharp#configuration).

## The solution

As the documentation specifies, you should not use this functionality in production. Best is to remove this property or set it to `false`. 

{{< caption-new "/uploads/2020/01/azurefunctions2.png" "Timer function running only once an hour after updating the property"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAtSURBVAXBQQoAIAhFwRcuJAy6/yHdBRL4qZmRmc/MWCuoe4i56W4k4e5UFZL4atoS1/SHoSUAAAAASUVORK5CYII=" "774" >}}

It might be that in some cases, you want this kind of functionality. In that case, you can leave it as is, and then you know why it happens.
