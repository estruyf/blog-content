---
title: "Using Dev Proxy in your GitHub Actions workflow on macOS"
longTitle: "Using Dev Proxy in your GitHub Actions workflow on a macOS runner"
customField: ""
slug: ""
description: ""
date: "2024-03-24T13:46:48.254Z"
lastmod: "2024-03-24T13:46:48.254Z"
preview: "/social/00355740-5659-4461-973b-07cdd3fe2b8e.png"
draft: true
comments: true
tags: []
type: "post"
---

Lately I have been working with the [Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview) a tool which can be used for API simulation, mocking, and testing. One of the things I wanted to try, was to use the Dev Proxy in a GitHub Actions workflow so that I could use it in combination with Playwright to test my solutions with mocked APIs.

In this blog post, I will show you how you can use the Dev Proxy in your GitHub Actions workflow on a macOS runner.

## Why a macOS runner?

The Dev Proxy is a .NET Core application and can run on any platform that supports .NET Core.

## Installing the Dev Proxy

## Running the Dev Proxy as a background service

## What about the root certificate?

### Trusting the root certificate

## The complete GitHub Actions workflow