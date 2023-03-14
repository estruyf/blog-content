---
title: Someone is DDoS-ing my Azure Functions, and what to do
longTitle: Someone is DDoS-ing my Azure Functions, and here is what you can do
slug: /ddos-azure-functions-front-door/
description: In this article, Elio explains how someone started spamming one of his Azure
  Functions to fake their statistics and what he did to overcome it.
date: 2022-10-26T08:32:55.784Z
lastmod: 2022-10-26T08:32:55.784Z
preview: /social/e9b65aef-2e03-4e5f-a02c-16b17dfb47d0.png
draft: false
comments: true
tags:
  - Azure Functions
  - Front Door
  - WAF
  - Firewall
type: post
---

Last week, all of a sudden, my Azure subscription got suspended. As the subscription runs on credits and is optimized to be way below the limit, I was surprised to see that I suddenly reached the spending limit.

Usually, the monthly cost for the subscription is around 50-60 EUR. This month, it suddenly got above 150 EUR, but why?

Looking into cost management, I saw a cost spike in the Log Analytics service that Application Insights uses. Typically, this service costs me 10 EUR per month, but now, all of a sudden, it was above 90 EUR.

{{< caption-new "/uploads/2022/10/ddos-azure-function1.png" "Cost increase on Azure subscription"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACPSURBVIXBvQ7BUBiA4ff8SGqq0SKxuHUXYDd2cw0SP4c2kUYEPZx8/aQDE/o8JqWkzjv6WBEBBRRQQAEFFFBAYVUXeOscGH56yoNFmGOtMfxTxj2igqVHaDZ0PN8onFPN9r6mOC3peGlbrnKhjIFj3FHFQBUPNHLjLR+M8C0CjWU6nDHWCVme4ZxDFYzh4wX5vULLuB9y5gAAAABJRU5ErkJggg==" "643" >}}

As this service is part of the Visitor Badge ([visitorbadge.io](https://visitorbadge.io)) service I provide, I dug a bit deeper to see what was going on.

The Visitor Badge service consists of two parts, the website, and the API which provides the badges. The API runs on an Azure Functions consumption plan. The price of this Azure Functions plan went up due to the execution time.

{{< caption-new "/uploads/2022/10/ddos-azure-function2.png" "Azure Function execution cost"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABASURBVBXBQQ6AIAxFwdf+EsX7XxRxoRGqYcZaO796VJacE5dYrt7Z9p0Shee58TFeDAgJMyMkQiIzyTlRCHfnB/B4FfPSXy1TAAAAAElFTkSuQmCC" "914" >}}

## Investigating what was going on

After checking the costs, I went to Application Insights to see the live metrics of the Azure Functions. When the metrics view loaded, I noticed there were a lot of servers/hosts running. It must have been above 20. I just remembered that I had to screenshot it at that moment. 

A quick restart of the Azure Function service led to stopping these servers/hosts, but quickly +10 hosts started up again, and immediately the requests were coming in. 

{{< caption-new "/uploads/2022/10/ddos-azure-function3.png" "Function servers - hosts running"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABUSURBVHXBQQ6DMBRDwWdHfBVx/1tmk0WJBFLcsm9n1HvPcRwkYavivi5s01pjJZzvk31/4bUWYwzmnAiwzcM2Aqo2qgpLIgn/SOJhviTxiySS8PgAGpEe2OUQQpIAAAAASUVORK5CYII=" "1064" >}}

At that moment, I knew that something was spamming the API. The log output was even more fun, as it was impossible to follow.

{{< caption-new "/uploads/2022/10/ddos-azure-function4.png" "Azure Functions log"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAABiSURBVFXBQQ6CQAAEsM66B3/g0f9/0AQVRgLRxDbX273bayGhJfHV95OyLg+TyhhOIUHJ0IRWEtMhDimxiz9lSrSbU2loZQxahzDtMi5+EkHtMlBtTa2uLwRFVMlgW7VFfADhWi8qPmlfjQAAAABJRU5ErkJggg==" "1548" >}}

## Checking the function execution

Opening the metrics in Application Insights showed that on the 16th of October, something started to call the API a lot. At some point, it was even 4 million executions.

{{< caption-new "/uploads/2022/10/ddos-azure-function5.png" "4 million Azure Function calls at the start of their script"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAABUSURBVI3BQQoCQRRDwZeAeP+jigjCzE9kFi5bu0pJykJaLCEJ88Nxli+3ZaWUS1ssiRUhLpIwm8wms2FSzB/vIyTFj+eLc8qkTGFSpjABC+43I5UPdTMttI/lS2EAAAAASUVORK5CYII=" "1216" >}}

That increased the cost of my Azure Functions and Log Analytics services.

## Digging into the logs to see what was causing it

The log screenshot above showed that a person configured a job on Amazon hosts to call the API with a Python script. All to increase the number of visitors on their GitHub profile.

The first thing I implemented on the API was a way to ban specific paths/users. It is the first time it has happened since I launched the service, but apparently, people still like to fake their stats, unfortunately. If this happens again, the badges will now show up as follows.

{{< caption-new "/uploads/2022/10/ddos-azure-function6.png" "Banned badge"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACKSURBVI3BLQ7CMBiA4bc/STsEJBgQ3ALBeUgQnIKT4HDcZTM4HAKBIWFhzZps/SiZgQTB8/AvReb8aDmeTDf8UD/u+9iG0pI5X6zW88V2JoIgeGPYXc50CZwvTrENpWWgGhGeCG8xCSiNMZq+7xSZJYttqI6364EPxjoECE1dkSkGGtCA4psACUgvVh4vtThwwgYAAAAASUVORK5CYII=" "181" >}}

Still, the problem with the Python script DDoSing my Azure Function API, went on, so I had to find a better solution for it.

## Opening a new door

Initially, I thought about blocking the IPs from which the calls were requested, but as they were coming from Amazon services, I didn't want to block any valid IPs.

Solving the problem within the Azure Function service or code would not be a solution, so I eventually went for Azure Front Door with a couple of Web Application Firewall rules.

{{< caption-new "/uploads/2022/10/ddos-azure-function7.png" "WAF rules to block requests"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAvSURBVAXBMQrAMAwEwbVAjY+Q/P+VNkbFqXFmhu3b3UgTu4kIMpOqQhL7LN7n4weSyg/7KohxvgAAAABJRU5ErkJggg==" "742" >}}

With these two rules in place, the number of Azure Function executions decreased drastically as right now, a couple of user agents get blocked, and other requests are rate limited.

Here, the Python requests automatically get a 4xx code and will not hit the Azure Function.

{{< caption-new "/uploads/2022/10/ddos-azure-function8.png" "Requests per user-agent"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA1SURBVCXBMQrAMBDEQGkL//+vB0lj1sFkxpk5ay2S0Ja9N0lQUVFRyfs8zAxXW+R3TlG5BD4WhRWr8r+WbQAAAABJRU5ErkJggg==" "1563" >}}

{{< blockquote type="important" text="Since I have been running this service for two days, the script has already generated +6 million requests. If you want to fake your stats, make them at least believable for others (just my tip)." >}}

In a graph, it looks as follows:

{{< caption-new "/uploads/2022/10/ddos-azure-function9.png" "Azure Front Door - Requests"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABPSURBVD3BMQ6DQAxE0T822iZSutz/jikwhMUTbcN7qjrcfTPGIDNZ2hDicU2zKZJvgc+JuDHwuxoJZpslQ2x7FZ/3i0UhbNMGARmi24D5AznZJN48RofNAAAAAElFTkSuQmCC" "1233" >}}

Now on the Azure Functions side, things look a lot better:

{{< caption-new "/uploads/2022/10/ddos-azure-function10.png" "Azure Functions - Executions"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABJSURBVHXBwQ2AMAwEwbVjQx70XykIoSQ+RAHM2HndQovMJDP5E1NO3xIBzyjGKp5RgFESezjuEFaDuYzmzqdn4+iBJMwMSZTEC26AIhYNmdBeAAAAAElFTkSuQmCC" "1233" >}}

{{< blockquote type="info" text="Notice the difference in 8 million calls compared to 15k function executions." >}}

## The rule configuration

The rule to block specific user agents looks as follows:

{{< caption-new "/uploads/2022/10/ddos-azure-function11.png" "User-agent rule"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAklEQVR4AewaftIAAAEkSURBVIXBTW7UQBCA0a9+3O4edmQ27OD+x+ESBEWyEJlxB091gRXNJjjKe7IsS/7DGIFMjYgEEjelTspORPBaK2MMWmuICL8vnadfF758/oS7AQIk2nunlIKIsHt8Dr7/2FiWBTPH3XGf8ForKsLdt3Pl68PMLiJ4lfh13VBVJlV2qsr/Elc1IgJ35z1jDLzOipnxEe+909eVh/MZEeFI5sBFhLlWRARV5Uim4FMpmCqqyntEBBebEAaZiZlxJDPxl+sz7katjdvtxpHMgbfWiAhUFVXhSKbhEcG6rowxqLXyVoyBmuOQTNNEaw0z5S1LYyS4qjHGRu+dUgpHzByf55l5ntltkWx/XsgRnE4nRIQ7/3m9cEpQEUopFDcSIyK4y0z+AvWHfRyadwBuAAAAAElFTkSuQmCC" "564" >}}

The rule to rate limit by IPs looks like this:

{{< caption-new "/uploads/2022/10/ddos-azure-function12.png" "Rate limit rule"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAAD/SURBVIXBy2pUQRiF0e+/1anSQSaBDPT9n8encKAZNJqQzrnUloMEmkDIWna5XCRN5hSWC8cUp3Sjt0AS7k66OxHFGAMz4/HPC78uz3y7KzIX3nhm0lrDzDh9XYKewY+fGxFBZpKZ5LZtSMLdcXfC4OGu8f2+2LaNkzTxqkIS1+uVfd85uTu3zJxct4PRG1XFKSKoKt7LKec4DjKTj8w58bE4SHwm13VlXV+p1viIJNLdWZbOugvTTkTQWuOWJLKqmHNSaWQO3pPEKTUnT09/GX3g4bRq3JoCzyCX3ll657QdYl1fkSZjDMyM4L/8/fLMFxkGtNaoCiA4joM3kvgHAc9uHeI3nCAAAAAASUVORK5CYII=" "567" >}}

Here are a couple of helpful articles I used to configure the rules:

- [Configure a WAF rate limit rule](https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-rate-limit-configure)
- [Implement IP-based rate limiting in Azure Front Door](https://anjoiype.medium.com/implement-ip-based-rate-limiting-in-azure-front-door-79a518e6f02c)
- [Configure an IP restriction rule with a Web Application Firewall for Azure Front Door](https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-configure-ip-restriction)

Hopefully, the [Visitor Badge](https://visitorbadge.io) will run smoothly again.