---
title: "Using Dev Proxy in your GitHub Actions workflow on Ubuntu"
longTitle: "Using Dev Proxy in your GitHub Actions workflow on an Ubuntu hosted VM"
customField: ""
slug: "/dev-proxy-github-actions-workflow-ubuntu/"
description: "Learn how to use Dev Proxy in a GitHub Actions workflow on an Ubuntu hosted VM for intercepting and inspecting your API calls"
date: "2024-03-27T08:25:54.824Z"
lastmod: "2024-03-27T08:25:55.495Z"
preview: "/social/4b5ad901-280e-4823-ae25-30b828ae9dfa.png"
draft: false
comments: true
tags:
  - "API"
  - "Dev Proxy"
  - "GitHub Actions"
  - "GitHub"
type: "post"
---

In my previous blog post, I explained how you could use the [Microsoft's Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview) in a GitHub Actions workflow on a macOS runner. In this blog post, I will show you how to use the Dev Proxy in your GitHub Actions workflow on an Ubuntu runner.

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

Once the Dev Proxy is installed, you can run it, but you cannot yet intercept HTTPS traffic. That is where the next step comes in. You need to trust the root certificate.

## Trust the root certificate

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

{{< blockquote type="info" text="The commands used in the above GitHub Actions step are very similar to how it is configured on a Docker container. You can find the official documentation for the Docker container in [Configure Dev Proxy certificate in your Docker container](https://learn.microsoft.com/en-gb/microsoft-cloud/dev/dev-proxy/how-to/use-dev-proxy-with-dotnet-docker?pivots=client-operating-system-windows#configure-dev-proxy-certificate-in-your-docker-container) documentation section." >}}

After running this step, you can start intercepting HTTPS traffic with the Dev Proxy.

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

With this setup, you can use the Dev Proxy in your GitHub Actions workflow on a Ubuntu runner.

{{< blockquote type="info" text="Templates are available on the following [GitHub repository](https://github.com/estruyf/devproxy-github-actions-templates)." >}}