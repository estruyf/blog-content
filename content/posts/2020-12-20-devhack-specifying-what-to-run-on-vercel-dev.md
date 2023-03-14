---
title: '#DevHack: Specifying what to run on Vercel dev'
slug: /devhack-specifying-what-to-run-on-vercel-dev/
author: Elio Struyf
type: post
date: 2020-12-20T20:12:19.080Z
draft: false
tags:
  - Serverless
  - Vercel
  - Development
categories: []
comments: true
---

While developing the integration with Strava on our cycling club website, I wanted to use serverless functions to simplify the data retrieval from Strava. The website runs on [Vercel](https://vercel.com), and if you're going to test out your serverless functions locally, you will need to use Vercel its CLI.

You can install the Vercel CLI by running the following command: `npm i vercel -g`.

{{< caption "/2020/12/vercel3.png" "Installing the Vercel CLI"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAySURBVAEpANb/AVBeav/X4vYABAQEAAsQCADe9NQA+tnyAPz9/AD+//8AAQAAAPr7+wB6YBNEqg30YgAAAABJRU5ErkJggg==" "918" >}}

Once installed, login with the `vercel login` command and provide your email address, which you use for Vercel.

{{< caption "/2020/12/vercel4.png" "Logging in to Vercel"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAvSURBVGP0i0n///0PG8PjV98Y/vz5w8DIyMTw//8/hve8Txl+/vnG8PvqJwYQAADCuBRQJAzLjQAAAABJRU5ErkJggg==" "555" >}}

Once logged in, you can run the `vercel dev` command. If it is the first time for your repository, the CLI will ask you a couple of questions to connect your project.

{{< caption "/2020/12/vercel5.png" "Linking the project"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABOSURBVAXBOxZAQAxA0ZdEo7E5K9BbokqjtQOlhqMzH2cS98o4zVGj57wr2RtiRrhzDQetJOr+8KZMt6wbZsYXDRchwlFR3J0uoJSKqvID7mong1MtZC0AAAAASUVORK5CYII=" "561" >}}

When you provided all this information, the Vercel CLI retrieves this command's configuration from their website. 

When you want to change which scripts you want to run when initiating `vercel dev`, you will have to configure it in your project settings:

- Go to your Vercel dashboard
- Select the project
- Go to the project settings page
- Overwrite the **development command** under the "Build & Development Settings"

In my case, I changed this to `npm run start:dev`.

{{< caption "/2020/12/vercel1.png" "Configuring the build and development commands"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACKSURBVH3Bu5XDMAxFwQsIFBNH6r8wd+ACtIE+BJ4PAyUOdsb2fdd1XUyS2LYNM+NXuDtmRu+d6TgOJPFwd9Z1JboH7dWICP4TtAWqmMYYSGJyd8yMqsLd8TEG53kiiapCEpLITCRx3zeSiGVZMDOqikkSvXcerTX+Licyk8ykrAGOGWQmj/enAPEF62JOzm8D4j4AAAAASUVORK5CYII=" "770" >}}

When running `vercel dev`, you will see it retrieves your config, and runs the specified command.

{{< caption "/2020/12/vercel2.png" "Running the vercel dev command"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAySURBVAEpANb/AUtXYv/+AQgA6O37AAADAQD+/v4AAgMDAPb+6AD7BO8A7dfwAPv5/QBqMxNRq0g6hQAAAABJRU5ErkJggg==" "534" >}}

It is pretty neat that all of this can be configured from within their site. Great when you work within a team, and you all use the same configuration. Initially, I tried to configure this from the `package.json` scripts, where many others do this. 

*Happy developing*
