---
title: "Using Dev Proxy in your GitHub Actions workflow on Ubuntu"
longTitle: "Using Dev Proxy in your GitHub Actions workflow on Ubuntu hosted VM"
customField: ""
slug: "/dev-proxy-github-actions-workflow-ubuntu/"
description: "Learn how to use Dev Proxy in a GitHub Actions workflow on an Ubuntu hosted VM for intercepting and inspecting your API calls"
date: "2024-03-25T14:39:09.644Z"
lastmod: "2024-03-25T14:39:09.644Z"
preview: "/social/b0e84964-d508-44bc-b643-c8443d0f1d1a.png"
draft: true
comments: true
tags:
  - "API"
  - "Dev Proxy"
  - "GitHub Actions"
  - "GitHub"
type: "post"
---

In one of my previous blog posts, I explained how you could use the [Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview) in a GitHub Actions workflow on a macOS runner. In this blog post, I will show you how to use the Dev Proxy in your GitHub Actions workflow on an Ubuntu runner.

{{< blockquote type="info" text="You can read how to configure it on a macOS runner in the [Using Dev Proxy in your GitHub Actions workflow on a macOS runner](https://www.eliostruyf.com/dev-proxy-github-actions-workflow-macos/) article." >}}

Most of the steps are the same, except how you trust the root certificate.

## Installing and running the Dev Proxy

Like the macOS runner, you can install the bash script provided in the Dev Proxy documentation on the Ubuntu runner. To include this into your GitHub Actions workflow, you can use the following step:

```yaml {title="Install and run the Dev Proxy - GitHub Actions steps"}
- name: Install Dev Proxy
  run: bash -c "$(curl -sL https://aka.ms/devproxy/setup.sh)"

- name: Run Dev Proxy
  run: ./devproxy/devproxy &
```

{{< blockquote type="info" text="The Dev Proxy commands is using an ampersand `&` to run it as a background service. You can read more about it in the [#DevHack: Running a background service on GitHub Actions](https://www.eliostruyf.com/devhack-running-background-service-github-actions/) article." >}}

## Trust the root certificate

Once the Dev Proxy is installed, you can run it, but you cannot yet intercept HTTPS traffic.

Similar to the macOS configuration, we must trust the self-signed certificate the Dev Proxy created. Here are the steps to achieve the certificate trust on an Ubuntu runner:

```yaml {title="Run Dev Proxy - GitHub Actions step"}
- name: Install the Dev Proxy's certificate
  timeout-minutes: 1
  run: |
    echo "Export the Dev Proxy's Root Certificate"
    openssl pkcs12 -in ~/.config/dev-proxy/rootCert.pfx -clcerts -nokeys -out dev-proxy-ca.crt -passin pass:""

    echo "Installing the Dev Proxy's Root Certificate"
    sudo cp dev-proxy-ca.crt /usr/local/share/ca-certificates/

    echo "Updating the CA certificates"
    sudo update-ca-certificates
    echo "Certificate trusted."

    # Set the system proxy settings (optional)
    echo "http_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV
    echo "https_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV
```

After running this step, you can intercept HTTPS traffic with the Dev Proxy.

## The complete GitHub Actions workflow

Below, you can find the complete GitHub Actions workflow file, which includes the installation of the Dev Proxy and the trust of the root certificate.

```yaml {title="Complete GitHub Actions workflow"}
name: Ubuntu Dev Proxy

on:
  push:
    branches:
      - main
      - dev
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
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
          echo "Export the Dev Proxy's Root Certificate"
          openssl pkcs12 -in ~/.config/dev-proxy/rootCert.pfx -clcerts -nokeys -out dev-proxy-ca.crt -passin pass:""

          echo "Installing the Dev Proxy's Root Certificate"
          sudo cp dev-proxy-ca.crt /usr/local/share/ca-certificates/

          echo "Updating the CA certificates"
          sudo update-ca-certificates
          echo "Certificate trusted."

          # Set the system proxy settings (optional)
          echo "http_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV
          echo "https_proxy=http://127.0.0.1:8000" >> $GITHUB_ENV

      # Include the additional steps you want to run after the Dev Proxy started
      - name: Test the Dev Proxy
        run: |
          curl -ix http://127.0.0.1:8000 https://jsonplaceholder.typicode.com/posts
          # When you used the system proxy settings, you don't need to specify the proxy in the curl command
          curl -i https://jsonplaceholder.typicode.com/posts
```

{{< caption-new "/uploads/2024/03/devproxy-with-trusted-root-certificate.webp" "Test Dev Proxy on GitHub Actions"  "data:image/jpeg;base64,UklGRnQAAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSCQAAAABH6CQbQTIn3L3eNxpREScFWoCIGEY3vTPAD3NENH/WEPcvwZWUDggKgAAAPABAJ0BKgoABwABQCYlnALsAQN9qaGwgAD+/tQofIXyVWeusWS/egAAAA==" "900" >}}

With this setup, you can use the Dev Proxy in your GitHub Actions workflow on a Ubuntu runner. These steps allow you to use the Dev Proxy with, for example, Playwright or any other tool to test your solutions.
