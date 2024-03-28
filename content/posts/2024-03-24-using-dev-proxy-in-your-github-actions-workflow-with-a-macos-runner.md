---
title: "Using Dev Proxy in your GitHub Actions workflow on macOS"
longTitle: "Using Microsoft Dev Proxy in your GitHub Actions workflow on a macOS hosted VM"
customField: ""
slug: "/dev-proxy-github-actions-workflow-macos/"
description: "Learn how to use Dev Proxy in a GitHub Actions workflow on macOS hosted VM for intercepting and inspecting your API calls"
date: "2024-03-26T08:15:17.760Z"
lastmod: "2024-03-26T08:15:18.374Z"
preview: "/social/00c21f36-38b0-42d3-a838-9ae6fc4ae65b.png"
draft: false
comments: true
tags:
  - "API"
  - "Dev Proxy"
  - "GitHub Actions"
  - "GitHub"
type: "post"
---

Lately, I have been working with the [Microsoft's Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview), a tool for API simulation, mocking, and testing. One of the things I wanted to try was to use the Dev Proxy in a GitHub Actions workflow so that I could use it in combination with Playwright to test my solutions with mocked APIs.

The Dev Proxy is a .NET Core application that can run on any platform that supports .NET Core, so it works on Windows, Linux, and macOS. I chose to use a macOS virtual machine/runner because, at the time of writing, the Dev Proxy cannot automatically trust the root certificate.

{{< blockquote type="info" text="Currently there is an issue open on the Dev Proxy GitHub repository to add support for trusting the root certificate on macOS - [Dev Proxy #601](https://github.com/microsoft/dev-proxy/issues/601)." >}}

In this blog post, I will show you how to use the Dev Proxy in your GitHub Actions workflow on a macOS virtual machine.

{{< blockquote type="important" text="Be aware of that jobs running on Windows and macOS runners that GitHub hosts consume minutes at 2 and 10 times the rate that jobs on Linux runners consume. You can read more about it in the [GitHub Actions - Minute multipliers for hosted runners](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#minute-multipliers) documentation section." >}}

## Installing the Dev Proxy

Let us start with installing the Dev Proxy on the macOS virtual machine. We can use the bash script provided in the Dev Proxy documentation for this. To include this into your GitHub Actions workflow, you can use the following step:

```bash {title="Install Dev Proxy - GitHub Actions step"}
- name: Install Dev Proxy
  run: bash -c "$(curl -sL https://aka.ms/devproxy/setup.sh)"
```

## Running the Dev Proxy as a background service

Once installed, you can run the Dev Proxy as a background service by adding an ampersand `&` at the end of the command.

{{< blockquote type="info" text="You can read more about it in the [#DevHack: Running a background service on GitHub Actions](https://www.eliostruyf.com/devhack-running-background-service-github-actions/) article." >}}

Here is what the GitHub Actions step looks like:

```yaml {title="Start Dev Proxy - GitHub Actions step"}
- name: Run Dev Proxy
  run: ./devproxy/devproxy &
```

## What about HTTPS endpoints?

When you start using the Dev Proxy like this on GitHub Actions, you will encounter issues when calling HTTPS endpoints. In my case, I got the following error when testing it with Playwright:

```bash
Error: page.goto: net::ERR_PROXY_CONNECTION_FAILED at https://frontmatter.codes/
```

These issues are normal because to intercept HTTPS traffic, you must trust the root certificate which gets created by the Dev Proxy. When you run the Dev Proxy on your local machine for the first time, it will prompt you to trust the root certificate.

{{< caption-new "/uploads/2024/03/devproxy-certificate.webp" "Trust the self-signed certificate"  "data:image/jpeg;base64,UklGRoIAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSC4AAAABL6AWAAI26NDVuSCCKSJiQnkoZGCF2mIIoJ1DAD+D9vxxUojof9Tu+knKNwADVlA4IC4AAADQAQCdASoKAAYAAUAmJZwAAu1/gr4MAAD+/r6vjpqRUZMmuwgpLIV87IcJAAAA" "900" >}}

As it runs in a non-interactive mode in GitHub Actions, you cannot trust the certificate that way. To solve this, we will have to include a couple of extra steps in our workflow to trust the root certificate and be able to intercept the HTTPS traffic.

## Trusting the root certificate

When the Dev Proxy asks you to trust the root certificate, and you accept it, it uses the [trust-cert.sh](https://github.com/microsoft/dev-proxy/blob/main/dev-proxy/trust-cert.sh) script to find the certificate and trust it.

My first attempt was to run the `trust-cert.sh` script in my GitHub Actions workflow. Unfortunately, this did not work because the `security add-trusted-cert` command requires a password to add the certificate to the login keychain.

After some research, I found an article about [Trusting Certificates in System Keychain without Prompting](https://twocanoes.com/trusting-certificates-in-system-keychain-without-prompting/). The article explains that you will not be prompted for a password when you add a certificate to the system keychain, and this will be our solution to make it work in our GitHub Actions workflow.

The script to trust the certificate in the system keychain looks as follows:

```yaml {title="Trust certificate - GitHub Actions steps"}
- name: Install the Dev Proxy's certificate
  timeout-minutes: 1
  run: |
    echo "Finding certificate..."
    security find-certificate -c "Dev Proxy CA" -a -p > dev-proxy-ca.pem

    echo "Trusting certificate..."
    sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain dev-proxy-ca.pem
    echo "Certificate trusted."

    # Set the system proxy settings (optional)
    echo "http_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV
    echo "https_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV

    # Required to test CURL with the Dev Proxy (optional)
    echo "SSL_CERT_FILE=$GITHUB_WORKSPACE/dev-proxy-ca.pem" >> $GITHUB_ENV
```

This script is similar to the [trust-cert.sh](https://github.com/microsoft/dev-proxy/blob/main/dev-proxy/trust-cert.sh) script, but instead of adding it to the login keychain, the certificate gets added to the system keychain.

At the end of the script there are three exports which are all optional. 

- The `http_proxy` and `https_proxy` environment variables can be used to set the system proxy settings on the macOS virtual machine.
- The `SSL_CERT_FILE` environment variable is required on macOS to make the `curl` commands work with the Dev Proxy.

{{< caption-new "/uploads/2024/03/devproxy-trust-certificate.webp" "Trust the self-signed certificate on the macOS virtual machine"  "data:image/jpeg;base64,UklGRlYAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSA0AAAABD3Bx8oiIsAIR/Q8FAFZQOCAiAAAAsAEAnQEqCgACAAFAJiWcAnQBDvbEyAD+/uSR3Uvp2shmAA==" "900" >}}

## The complete GitHub Actions workflow

Now that we have the certificate trust figured out, we can combine all the steps into a complete GitHub Actions workflow.

```yaml {title="Complete GitHub Actions workflow"}
name: macOS Dev Proxy

on:
  push:
    branches:
      - main
      - dev
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - name: Install Dev Proxy
        run: bash -c "$(curl -sL https://aka.ms/devproxy/setup.sh)"

      - name: Run Dev Proxy
        run: ./devproxy/devproxy &

      - name: Install the Dev Proxy's certificate
        timeout-minutes: 1
        run: |
          echo "Finding certificate..."
          security find-certificate -c "Dev Proxy CA" -a -p > dev-proxy-ca.pem

          echo "Trusting certificate..."
          sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain dev-proxy-ca.pem
          echo "Certificate trusted."

          # Set the system proxy settings (optional)
          echo "http_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV
          echo "https_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV

          # Required to test CURL with the Dev Proxy (optional)
          echo "SSL_CERT_FILE=$GITHUB_WORKSPACE/dev-proxy-ca.pem" >> $GITHUB_ENV

      # Include the additional steps you want to run after the Dev Proxy started
      - name: Test Dev Proxy
        run: |
          curl -ix http://127.0.0.1:8000 https://jsonplaceholder.typicode.com/posts
          # When you used the system proxy settings, you don't need to specify the proxy in the curl command
          curl -i https://jsonplaceholder.typicode.com/posts
```

{{< caption-new "/uploads/2024/03/devproxy-with-trusted-root-certificate.webp" "Test Dev Proxy on GitHub Actions"  "data:image/jpeg;base64,UklGRnQAAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSCQAAAABH6CQbQTIn3L3eNxpREScFWoCIGEY3vTPAD3NENH/WEPcvwZWUDggKgAAAPABAJ0BKgoABwABQCYlnALsAQN9qaGwgAD+/tQofIXyVWeusWS/egAAAA==" "900" >}}

With this setup, you can use the Dev Proxy in your GitHub Actions workflow on a macOS virtual machine. This allows you to use the Dev Proxy in combination with Playwright or any other tool for testing your solutions.