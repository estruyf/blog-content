---
title: How to make local Azure Static Web App development easier
slug: /local-azure-static-web-app-development-easier/
author: Elio Struyf
type: post
date: 2020-08-14T11:40:12.547Z
draft: false
tags:
  - Azure
  - Azure Functions
  - Development
  - Static site
categories: []
comments: true
---

Static sites are cool again (actually for a long time), and Microsoft knows that. Their new Azure Static Web App - App Service is currently in preview. At the moment, it still misses some key functionalities, but I am sure that these will get added once they put it in GA (hopefully to be announced at Ignite in September 2020).

> **Info**: The features I am mostly missing are the capability to link your Azure AD App and root domain configuration (at the moment only `www` works). Also, the option to gain access to the Storage Account the Functions are using might be useful. 

The learning paths and documentation are a great way to get you started ([Azure Static Web Apps documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)). Suppose you followed any of the learning paths or documentation for local development. They tell you how to start your Azure Functions and local server with `Live Server` extension for VSCode.

My preference is to run it without the VSCode extension. Instead, I make use of NPM scripts. By using a script, I can run and test it anywhere I want.

## Running static web app locally

To run the static web app locally, you will need the following NPM dependency: `npm-run-all`. If you want, you can also use `concurrently`, but my preference is the first one.

This dependency allows you to run multiple commands sequentially or in parallel. For the static web app, this is what we need. We need the server for the site, and the Azure Functions instance both running at the same time.

Here is my default configuration:

```json
"scripts": {
  "start": "npm-run-all --parallel start:*",
  "start:dev": "react-scripts start",
  "start:api": "cd api && npm start"
}
```

> **Info**: I like to use React, but if you use any other framework, be sure to modify the `start:dev` command to build and spin up your local server.

All you need to do is run the `npm start` command, and both services will start locally.
