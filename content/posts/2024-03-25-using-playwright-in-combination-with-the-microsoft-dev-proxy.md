---
title: "Use Playwright with Microsoft Dev Proxy on GitHub Actions"
longTitle: "Using Playwright in combination with the Microsoft Dev Proxy on GitHub Actions"
customField: ""
slug: "/playwright-microsoft-dev-proxy-github-actions/"
description: ""
date: "2024-03-25T19:15:43.679Z"
lastmod: "2024-03-25T19:15:43.679Z"
preview: "/social/eec23b5d-da00-4123-8b12-d2c80dc49093.png"
draft: true
comments: true
tags: []
type: "post"
---

Part of the process of testing the [Microsoft Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview) on GitHub Actions, was to use it in combination with [Playwright](https://playwright.dev/). The advantage of this combination is that you can use the same mock data or API responses which you use during development to test your solutions.

In this blog post, I will show you how to use Playwright in combination with the Microsoft Dev Proxy in your GitHub Actions workflow.

{{< blockquote type="info" text="Before you can continue, make sure you followed the [Playwright - Getting started](https://playwright.dev/docs/intro) instructions." >}}

## Things to know before you start

When you want to test your solutions, you should aim towards a desired outcome, otherwise a test would fail.

The Dev Proxy can be used to , you need to know what the expected responses are.

That means that you need to watch out for using for instance the `GenericRandomErrorPlugin` plugin to simulate random errors. When you would use this plugin in combination with your tests, you will not be able to predict the outcome of your tests.

## Setting up Playwright

When you followed the Playwright getting started guide, you should have a basic setup in place. The next step is to add the Dev Proxy to your setup.

In your `playwright.config.ts` file, you can add the following code:

```typescript {title="playwright.config.ts"}
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    proxy: {
      server: 'http://localhost:8000'
    }
  }
});
```

## Configuring the GitHub Actions workflow

Once the configuration is in place, you can start configuring your GitHub Actions workflow.

### Using a macOS runner

### Using an Ubuntu runner

Things are a bit more complicated when you want to use the Dev Proxy with Playwright on an Ubuntu runner. The reason is the root certificate and the way how those certificates are managed per browser.

#### The quick approach

The simple approach is to ignore HTTPS errors by setting the `ignoreHTTPSErrors` to `true` in your Playwright configuration.

```typescript {title="playwright.config.ts"}
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    proxy: {
      server: 'http://localhost:8000'
    },
    ignoreHTTPSErrors: true
  }
});
```

#### The more secure approach

If you are only using Chromium in your tests, you can add the certificate to the Chromium [NSS Shared DB](https://chromium.googlesource.com/chromium/src/+/master/docs/linux/cert_management.md).

{{< blockquote type="info" text="The problem here is that Firefox does not have a central location where it looks for certificates. It looks into the current profile, which is why the quick approach or macOS runner would be better suited." >}}

To add the certificate to the NSS Shared DB, you can use the following steps:

```yaml {title="Add certificate to NSS Shared DB - GitHub Actions steps",hl_lines="14-20"}
- name: Install the Dev Proxy certificate
  timeout-minutes: 1
  run: |
    echo "Export the Dev Proxy's Root Certificate"
    openssl pkcs12 -in ~/.config/dev-proxy/rootCert.pfx -clcerts -nokeys -out dev-proxy-ca.crt -passin pass:""

    echo "Installing the Dev Proxy's Root Certificate"
    sudo cp dev-proxy-ca.crt /usr/local/share/ca-certificates/

    echo "Updating the CA certificates"
    sudo update-ca-certificates
    echo "Certificate trusted."

    # echo "Installing certutil"
    sudo apt install libnss3-tools

    # echo "Adding certificate to the NSS database for Chromium"
    mkdir -p $HOME/.pki/nssdb
    certutil --empty-password -d $HOME/.pki/nssdb -N 
    certutil -d sql:$HOME/.pki/nssdb -A -t "CT,," -n dev-proxy-ca.crt -i dev-proxy-ca.crt
```

The highlighted lines in the code snippet above show how you can add the `dev-proxy-ca.crt` certificate to the NSS Shared DB of Chromium. The `CT,,` trust arguments mean that the self-signed certificate is trusted for SSL client authentication.