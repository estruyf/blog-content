---
title: '#DevHack: Getting some clarity in your site analytics'
slug: /devhack-clarity-site-analytics/
author: Elio Struyf
type: post
date: 2020-11-17T08:00:40.609Z
draft: false
tags: 
  - Analytics
  - usage
  - Visitors
  - DevHack
categories: []
comments: true
---

This weekend I discovered a cool new tool from Microsoft called **Clarity**. The tool allows you to understand how users interact with your website. It can do this by using Google Analytics integration and features like session replays and heatmaps.

{{< blockquote type="info" text="[https://clarity.microsoft.com/](https://clarity.microsoft.com/)" >}}

I was not looking for such a tool. I just bumped into it. As I run a [online sticker store](https://pimpyourowndevice.com) these days, I thought to give it a try.

## Setting up Clarity

The setup is pretty easy once you logged in. The process is very similar to that of adding Google Analytics to your website. You start by creating a new project and adding the tracking code to your website.

{{< caption-new "/uploads/2020/11/clarity1.png" "Clarity setup"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAAB5SURBVH3By3LCMBBFwTOPsgyl//9Rg0MEmkuxy0Kh247j0JyTiKD3zkpVkWbG9XrBPZhz8p8Md8bvQICZ4e5s28ZfkvCfx4PxHBggiYhgJVtrjDHYWsPdWTEzsqqoKs7zZN93ViSRvXe+kcRHsiCJ++1GZPB6TTKTN74aOCmyk/QrAAAAAElFTkSuQmCC" "460" >}}

On the setup page, you will also find Google Analytics Integration.

{{< caption-new "/uploads/2020/11/clarity2.png" "Clarity tracking code + Google Analytics integration"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAEASURBVH3BXUrDQBSA0e/eudPJf14qiA+6D/e/BncgSJoWKiVtbTJX8qSI9BwZhsGLoqBpGu6xEALH45HD4cB2u0VEcHdEBHdHRFBVrKoq5nkm58x0+cLMCOJ0XcdvllIipYS7s0oboyxL/jIRIcZIzhkRIefMNE2s3B0RwcywcTew3++pqpIYNzRNjfPDgQXHipQIKozjiAVjPyrgzPNMjJG+72m7Dnvbzbx/Vph1vL40lFFZuTuqioigqlhfGnMuUFW6tiUG4T/21G94bAOmwu165pozIQSWZUFECCFQFAWmy5nT6YKosiwLdV0TLGIpkUxYuTv2cat5fmiJMXLPN/TDXbxzvH2xAAAAAElFTkSuQmCC" "639" >}}

## Get some clarity

Clarity is now only running for a day or two, but the project dashboard adds most of the value. 

{{< caption-new "/uploads/2020/11/clarity3.png" "Clarity dashboard"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAADXSURBVF3BUUoDMRCA4X8myaYWuoIKij4IvggewPufwEMoFIQFK7bdzW4mY4tvfp+8Dwe/6zPuDVVlmme6LiEi1H0hxkgLoNdrQZWThntjvcq0WlFAokASYgpo7jp2wxcpddRlwcw4MzPyesVxnBARtJRCf3XJcZrZzUJ1QUVwd8yM0oQzfdtODIeFYs5tn0lB+fheGC2AKNvPwmKOvj72lMnpLxLD8EOpToyRfqVMY+HlaYPgRHPYu+AOI4lQG/ebgJmRc+SPE4M3nm8StlQerjrMOXH++wWIq2wxfiTxzgAAAABJRU5ErkJggg==" "1915" >}}

This dashboard is also possible with Google Analytics, but I must say that this UI is so much easier and faster to navigate. 

## Recordings and Heatmaps

If you are interested to see how users are interacting with your pages, Clarity provides recordings and heatmaps.

Here is a sample of a recording:

<video width="100%" controls>
  <source src="/uploads/2020/11/clarity5.mp4" type="video/mp4">
</video>

The heatmap feature looks as follows:

{{< caption-new "/uploads/2020/11/clarity4.png" "Clarity Heatmap"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAAEQSURBVBXByy5DURiA0W/v/Z/TahVNOlDhCaQqMTCXGIgXwERCvKCZuZGp0BKXxKVBMBCX7ruetdTg8T3Pt4SxczTrdUQEEUFEyDlTGY//kMXZAqU1zkHwHmstSimMMQyG1/R7y6QU0SmDtY4YI9Y5QoiklCiKgtHoCec9KWdEAZ/vb9zfXFFog7q7ZeQ82wdH9FdWMUaTMwiV+MXZ6QnqYcDGLwxtydb+IT5mvA+ICJoJZwONxhTf7SWOy2k+jEYpTa0UxGgqmgnrE+eXF3S7C5SdNj81Q4yBGALeByrCRGtmjt2dPT5eXyEl1GwH5z0Pzy/U6nXmyhJhot3pMtXaRGtNzgqjFc1GjfW1HpWU4R+OYXkZs9z8lQAAAABJRU5ErkJggg==" "1504" >}}

## Pricing

This service is free to use. You only require a Microsoft account to get started.

## Overall

The service does exactly what its name suggests. It gives *clarity* over your usage analytics.

{{< blockquote type="important" text="At the moment of writing this #DevHack, I only used it for two days. I Will see how it evolves, but this looks promising." >}}
