---
title: '#DevHack: cross-platform testing your tool on GitHub Actions'
slug: /devhack-cross-platform-testing-tool-github-actions/
author: Elio Struyf
type: post
date: 2020-12-18T16:36:28.643Z
draft: false
tags:
  - GitHub
  - GitHub Actions
  - Documentation
categories: []
comments: true
---

One of the Doctor's objectives, a documentation tool that converts markdown to SharePoint pages, was to make it usable cross-platform. Initially, I created this as an internal tool for Valo and would only be used on Azure DevOps or GitHub Actions. In the first release, I focussed on making the tool available to others like you and seeing if there was any interest in it.

{{< blockquote type="info" text="[Doctor - the static site generator for SharePoint](https://www.eliostruyf.com/doctor-static-site-generator-sharepoint/)" >}}

Once the first version was released, one of the first tasks was to get this cross-platform support in place. Each OS has its challenges, but Windows was the worst of all. As Doctor uses the CLI for Microsoft 365, the JSON data provided to the commands had to be formatted correctly. Where on macOS and Linux, it is relatively easy. On Windows, it took some time to get it right. For instance, the string replacement looks like for getting JSON within a JSON object to work.

{{< caption-new "/uploads/2020/12/github5.png" "String replacement for Windows"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABGSURBVAXB0QmAMAxAwZekKVLaD5fQ/WcTQWtJvJPzPLK68a2FBKgk90yKBqZCEeUNUDOj98YYjVqdtYJt7EQmpSjXM3F3fqUkFeU2roWZAAAAAElFTkSuQmCC" "316" >}}

There are also some differences between the standard command prompt and the PowerShell prompt. That is why I wanted to find a way to make sure that I can quickly check if it still works on each of them.

## GitHub Actions

GitHub Actions is the perfect fit for this, as you can create various flows from build/release/testing. In Doctor's case, I went for a flow that runs on each PR and validates if the project builds, retrieves the sample site repository, and checks if it can publish on Windows, Linux, and macOS.

Here is what it looks like:

{{< caption-new "/uploads/2020/12/github1.png" "Builds running for each OS"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAB8SURBVF3B0Q6CMAxA0dutLcMY//8rjU8sDLoaH0iI58jn886kIoC5A4mbo1q5U7MFKYXFnTmTrXdEDsYYqCoiAgIacXAOyIRaK1vfeZkjVYgEMvnR1lbmBDMFhOdDGXuntZVEuKiZc4k5UW0sTUkgYnIp/Ik4iPOkiHD3BbdRMVU+KvbWAAAAAElFTkSuQmCC" "1004" >}}

In the actions, you can see that four builds are happening. Two of them are running in a matrix strategy. I took Windows out of the matrix strategy as I wanted to specify the shell to use. Setting the shell in a matrix is currently not possible, it seems.

{{< caption-new "/uploads/2020/12/github2.png" "Completed builds and publish"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAB6SURBVGXBQQoCQQxFwfeTdDLi/e8ogiuVQdvpVhfCgFU6Xc6zvBDQMhEQEbQW7MXxcCTkZDa+rrc7E+i94+6MOQl3om+dOTfMhLmzPp5kFjIx+JB4jYktWVQVEYHJqMV5PlbcxF4ccuFnG4PmSasGEjD5Mf6IL0nsvQGswSKHOaz20wAAAABJRU5ErkJggg==" "980" >}}

When you would open a PR, it would start the flow of the same actions.

{{< caption-new "/uploads/2020/12/github3.png" "PR Tests"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACCSURBVDXBsRIBQRBF0dvTb3ZWQCmBQOr/P0iuCCVU7ZaZbgTOseVxyaE9pIPBvNliRfxFJCMC1d2Z+/XG1GYM47m+kDvujllBctYeiC8jMSAzGB36u+NyJOFe+FFksOQbjYmIoLWJ1mZqrZRSkIQikJfC6XBEcsAY5lgmgQEGGciSDxeYMYlVYMkZAAAAAElFTkSuQmCC" "926" >}}

These actions make it easier to validate if the incoming PR is not breaking any of the logic which is currently in place.

{{< caption-new "/uploads/2020/12/github4.png" "Completed PR Tests"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACHSURBVE3BIQ7CQBCG0a/7T3chDSE4LIYDoLn/CXAoREMQCBRNuztDcH2vu73vcWDHVoVhGJDEWvOgemDn/YlxfEJOTNMHmTAJSUiGlPguDWPFw6FCXRZkRu6dlAp/VqMyx0zvornTl0LOG3LOSMIkSI61aDzixTJVrscLpB4iqHR4QBeOUvADKLQ3fmRDrcsAAAAASUVORK5CYII=" "922" >}}

You can find the code of this GitHub Action here: [Test Build and Publish](https://github.com/ValoIntranet/doctor/blob/main/.github/workflows/test-build.yml).

Can you still live without all these automation tools? I definitely cannot anymore. It will not take human testing away completely, but for sure, it makes things a lot easier and quality better.
