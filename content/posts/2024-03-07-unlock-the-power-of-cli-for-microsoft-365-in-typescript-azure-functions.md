---
title: Using CLI for Microsoft 365 in TypeScript Azure Functions
longTitle: ""
customField: ""
slug: /cli-microsoft-365-typescript-azure-functions/
description: "Learn how to use the CLI for Microsoft 365 in TypeScript Azure Functions to automate tasks for Microsoft 365. "
date: 2024-03-07T09:11:17.224Z
lastmod: 2024-03-07T09:11:17.224Z
preview: /social/d0e61dbd-19ac-47f7-8297-c07ac32e67ef.png
draft: false
comments: true
tags:
  - Automation
  - Azure Functions
  - Microsoft 365
  - TypeScript
type: post
---

The CLI for Microsoft 365 allows you to manage your Microsoft 365 tenant settings and data. It provides a powerful and flexible way to automate tasks for Microsoft 365, and lately, I have been using it in my Azure Functions to automate a couple of tasks.

In this article, I will show you how to use the CLI for Microsoft 365 in TypeScript Azure Functions by explaining the following:

- Configuring certificate-based authentication
- Using the certificate logging in the Azure Function for CLI for Microsoft 365
- Using CLI for Microsoft 365 in TypeScript Azure Functions

## Prerequisites

To follow along with this article, you will need the following:

### Local development environment

- Node.js
- [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?pivots=programming-language-typescript)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli): The Azure CLI is used to authenticate with the Azure Key Vault locally

### Microsoft 365 tenant and Azure subscription

- Azure subscription
  - Azure Key Vault
- Microsoft 365 tenant

### Useful Visual Studio Code extensions

- [Azure Resource](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups)
- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)

## Configuring certificate-based authentication

I chose to use certificate-based authentication for the authentication, as it is a secure way to authenticate with Microsoft 365 services and because my Azure subscription is not linked to my Microsoft 365 tenant. Certificate-based authentication can also be used for multi-tenant applications.

First, you must create a certificate instead of generating this locally, as I used the Azure Key Vault. We can use the Azure Key Vault to generate a self-signed certificate, so we do not have to create it locally and upload the certificate.

### Create a self-signed certificate in Azure Key Vault

On your Azure portal, navigate to your Azure Key Vault (or create one if you do not have one). Then, follow the steps below to make a self-signed certificate:

- Click on the `Certificates` in the left menu
- Click on `Generate/Import` in the top menu
- Fill in the form with the following details:
  - Method: `Generate`
  - Certificate Name: `cli-m365-cert` (or any name you prefer)
  - Type: `Self-signed certificate`
  - Subject: `CN=cli-m365-cert` (or any name you prefer)
  - Validity: `12 months` (or any duration you prefer)
  - Key type: `PKCS #12`

{{< caption-new "/uploads/2024/03/create-certificate.webp" "Create a self-signed certificate"  "data:image/jpeg;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSCIAAAABH0AgQPF/ZzGDGxERZ4WaAEgYhjf9M0BPM0T0P9YQ968BVlA4ICoAAACQAQCdASoKAAcAAUAmJaQAAudZfggA/v6FqOAmYW+OZDncWPHTK2SZAAA=" "1772" >}}

- Click on `Create`

Please give it a couple of seconds to generate the certificate. Once the certificate is generated, click on the certificate name and follow the steps to download the certificate:

- Click on the certificate under the `current version` column
- Click on `Download in CER format` in the top menu

{{< caption-new "/uploads/2024/03/download-cer.webp" "Download in CER format"  "data:image/jpeg;base64,UklGRlwAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSA0AAAABD3Bu74iIsAIR/Q8FAFZQOCAoAAAAsAEAnQEqCgACAAFAJiWkAuwA3RhbgAD+/Ddtnerr4n56hRi7i+3gAA==" "1300" >}}

- Keep the downloaded file safe, as we will use it in one of the upcoming steps

### Create a Microsoft Entra ID - App registration

Next, we need to create an app registration for the Azure portal. The App registration will be used to authenticate with the CLI for Microsoft 365 to your tenant.

{{< blockquote type="important" text="Make sure you create the new app registration on the tenant linked to your Microsoft 365 environment" >}}

On the CLI for Microsoft 365 documentation, you can follow the [Use your own Microsoft 365 Entra ID identity](https://pnp.github.io/cli-microsoft365/user-guide/using-own-identity) steps to create a new App registration.

{{< blockquote type="important" text="Follow it until you have to assign the permissions to the App registration." >}}

When you followed the steps on the documentation, you should have done the following:

- Created a new App registration
- Configured the authentication for console applications
- Enabled the public client flows

You did have to stop at the permissions because we will assign the permissions in the next step ourselves. The permissions in the documentation are for user-based (delegate) permissions, but we will use application-based permissions.

#### Assign the permissions to the App registration

For this example, I will use the minimum permissions required to read the sites in the Microsoft 365 tenant:

- Microsoft Graph: `Sites.Read.All`
- SharePoint: `Sites.Read.All`

{{< blockquote type="important" text="Make sure you have the required permissions to assign the permissions to the App registration" >}}

To assign the permissions to the App registration, follow the steps below:

- Navigate to the App registration you created
- Click on `API permissions` in the left menu
- Click on `Add a permission` in the top menu
- Click on `Microsoft Graph` in the list
- Click on `Application permissions`
- Search for `Sites` and select the `Sites.Read.All` permission
- Click on `Add permissions`
- Click on `Add a permission` in the top menu
- Click on `SharePoint` in the list
- Click on `Application permissions`
- Search for `Sites` and select the `Sites.Read.All` permission
- Click on `Add permissions`

Once you have added the permissions, you need to grant admin consent to the permissions. To do this, click on `Grant admin consent for <your tenant>` in the top menu.

{{< caption-new "/uploads/2024/03/application-permissions.webp" "Configured the application permissions"  "data:image/jpeg;base64,UklGRnYAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCAAAAABHyAWTPzd+sOZRkSEDMUNyMBR8aLHeCKi/9E8IULNA1ZQOCAwAAAA0AEAnQEqCgAEAAFAJiWcAAL3hXg8nVgA/vvXhv8Da2KCvPq1xgXArACULNh5AAAA" "1924" >}}

#### Configure the certificate in the App registration

Now that we have the app registration and the permissions configured, we need to configure the certificate for the app registration. By adding the previously created certificate to the App registration, we can use it to authenticate with the CLI for Microsoft 365. Follow the next steps to configure the certificate:

- Navigate to the App registration you created
- Click on `Certificates & secrets` in the left menu
- Click on `Upload certificate` in the top menu
- Click on `Choose file` and select the downloaded CER file
- Click on `Add`

Once you have uploaded the certificate, you will see the certificate in the list.

{{< caption-new "/uploads/2024/03/upload-certificate.webp" "Uploaded certificate to your app registration"  "data:image/jpeg;base64,UklGRlYAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSAwAAAABD1D1iAisQET/QwFWUDggJAAAALABAJ0BKgoAAgABQCYlpAAC6NzWBcAA/v3UyCwg+Lq24AAAAA==" "2122" >}}

## Creating the Azure Functions project

The previous configuration was required to start building our Azure Functions project. We will use the Azure Functions Core Tools to create the Azure Functions project.

{{< blockquote type="info" text="If you do not have the Azure Functions Core Tools installed, you can install it by following the [official documentation](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?pivots=programming-language-typescript)." >}}

### Initialize the Azure Functions project

I created a new Azure Functions project using the following command:

```bash {title="Initialize the Azure Functions project"}
func init cli-m365-azurefunctions-sample --typescript
```

### Install the required packages

Next, navigate to the created project and install the required packages:

```bash {title="Install dependencies"}
npm i @azure/identity @azure/keyvault-secrets @pnp/cli-microsoft365
```

We installed the `@pnp/cli-microsoft365` package to the Azure Functions project instead of globally installing it.

{{< blockquote type="info" text="The `@azure/identity` and `@azure/keyvault-secrets` packages are used to authenticate with the Azure Key Vault." >}}

### Configure the required settings

Open the project in Visual Studio Code and navigate to the `local.settings.json` file. Add the following settings to the file:

- `KeyVaultUrl`: The URL of the Azure Key Vault
- `CertificateName`: The name of the certificate in the Azure Key Vault
- `TenantId`: The ID of your Microsoft 365 tenant. You can find the Tenant ID on the Microsoft Entra ID overview page.
- `ClientId`: The Application (client) ID of the App registration you created

The settings should look similar to this:

```json {title="local.settings.json"}
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
    "AzureWebJobsStorage": "",
    "KeyVaultUrl": "https://<key vault name>.vault.azure.net/",
    "CertificateName": "cli-m365-cert",
    "TenantId": "<tenant-id>",
    "ClientId": "<client-id>",
  }
}
```

{{< blockquote type="important" text="Make sure you replace the placeholders with your values" >}}

#### Why not use the Azure Key Vault references?

In the settings, we use the Azure Key Vault URL and certificate's name to retrieve the certificate. Another way would be using key vault references like: `@Microsoft.KeyVault(SecretUri=<certificate identifier>)`.

{{< caption-new "/uploads/2024/03/key-vault-reference.webp" "Using the Azure Key Vault reference"  "data:image/jpeg;base64,UklGRmQAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSBMAAAABD6AQQADEX7XxiYgYrEBE/0MBAFZQOCAqAAAAsAEAnQEqCgACAAFAJiWkAALc/0uw0AD+/g7gGLRH5gPqkU34zSGgAAAA" "2228" >}}

The downside of this approach is that you have to store the certificate value in the `local.settings.json` file, which is not recommended. By using the certificate name, we control everything in the Azure Key Vault.

### Using ESM modules in Azure Functions

As the latest version of CLI for Microsoft 365 uses ESM modules, we need to configure the Azure Functions project to use ESM modules.

In the `package.json` file, add the following line:

```json {title="package.json"}
{
  "type": "module"
}
```

Update the `tsconfig.json` file to the following:

```json {title="tsconfig.json"}
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": ".",
    "sourceMap": true,
    "strict": false
  }
}
```

### Create a new Azure Function

I created a new Azure Function using the following command:

```bash {title="Create a new Azure Function"}
func new --name getSiteTitle --template "HTTP trigger"
```

### Implement the Azure Function

Open the `./src/functions/getSiteTitle.ts` file and replace the content with the following code:

```typescript {title="./src/functions/getSiteTitle.ts",hl_lines="19-23"}
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { AzureCliCredential, ChainedTokenCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { executeCommand } from "@pnp/cli-microsoft365";

export async function getSiteTitle(_: HttpRequest, __: InvocationContext): Promise<HttpResponseInit> {
  const keyVaultUrl = process.env.KeyVaultUrl;
  const certificateName = process.env.CertificateName;
  const tenantId = process.env.TenantId;
  const clientId = process.env.ClientId;

  if (!keyVaultUrl || !certificateName || !tenantId || !clientId) {
    return {
      status: 500,
      body: "Missing environment variables",
    };
  }

  const creds: TokenCredential[] = [
    new DefaultAzureCredential(),
    new AzureCliCredential()
  ];
  const credentialChain = new ChainedTokenCredential(...creds);

  const client = new SecretClient(keyVaultUrl, credentialChain);
  const certificate = await client.getSecret(certificateName);

  if (!certificate || !certificate.value) {
    return {
      status: 500,
      body: "Certificate not found",
    };
  }

  const login = await executeCommand("login", {
    interactive: false,
    authType: "certificate",
    tenant: tenantId,
    appId: clientId,
    certificateBase64Encoded: certificate.value,
  });

  if (login.error) {
    return {
      status: 500,
      body: `Error logging in: ${login.error.message}`,
    };
  }

  const site = await executeCommand("spo web get", {
    url: "https://struyfconsultingdev.sharepoint.com",
  });
  const siteInfo = JSON.parse(site.stdout);

  return {
    status: 200,
    jsonBody: siteInfo.Title,
  };
}

app.http("getSiteTitle", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: getSiteTitle,
});
```

The Azure Function will authenticate with the CLI for Microsoft 365 using the certificate-based authentication and retrieve the title of the specified site.

{{< blockquote type="info" text="In the code, we make use of `executeCommand` from CLI for Microsoft 365. This allows us to call any of the CLI commands. You can read more on the [use CLI for Microsoft 365 programmatically](https://pnp.github.io/cli-microsoft365/user-guide/use-cli-api) documentation." >}}

### Locally running the Azure Function

To run the Azure Function, we need to be able to authenticate with the Azure Key Vault to fetch the certificate. On Azure, we will use a managed identity, but locally, we can use the Azure CLI authentication. The great thing about the `@azure/identity` package is that you can chain credentials, which allows you to use multiple authentication methods. The first one that succeeds will be used.

In the above sample, you can see the following credentials:

- `DefaultAzureCredential`: This credential will be used for the managed identity on Azure
- `AzureCliCredential`: This credential will be used for the Azure CLI authentication

To run the Azure Function locally, you first have to sign in to the Azure CLI:

```bash {title="Sign in to the Azure CLI"}
az login
```

{{< blockquote type="important" text="Be sure to login into the Azure environment where you configured the Azure Key vault." >}}

Once logged in, you can run the Azure Function using the following command or press `F5` in Visual Studio Code:

```bash {title="Build and run the Azure Function"}
npm run build && func start
```

The Azure Function will start, and you can navigate to `http://localhost:7071/api/getSiteTitle` to see the result.

{{< caption-new "/uploads/2024/03/azure-function-outcome.webp" "The title of the site as a result of executing the Azure Function"  "data:image/jpeg;base64,UklGRoAAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSB8AAAAAe7i4uLi4uLi4e7L//////////7J7uLi4uLi4uLh7AFZQOCA6AAAAUAIAnQEqCgADAAFAJiWUAnRrgLf/A9EKHlsAAP7773KiPgS4E0HjCvTtdfBnXFys/GxOsskGtV+gAA==" "660" >}}

### Running the Azure Function on Azure

{{< blockquote type="important" text="I will not go into detail on how to deploy the Azure Function to Azure." >}}

Assuming you have published the code to your Azure Functions, you must perform some configuration steps to make the function work.

#### Managed Identity

First, you must configure the managed identity for the Azure Function. This managed identity will be used to authenticate with the Azure Key Vault and retrieve the certificate.

Open the Azure Function in the Azure portal and follow the steps below:

- Navigate to the `Identity` tab
- Enable the `System assigned` identity

{{< caption-new "/uploads/2024/03/enable-system-assigned.webp" "Enable the system assigned managed identity"  "data:image/jpeg;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCAAAAABH0CQbePvuf0Y04iIiA41AQgw1q1/BgpH9D++EiHyFVZQOCAsAAAAsAEAnQEqCgAEAAFAJiWkAALnYdvXgAD+/ZYh3RD5ZN7DPocsyZrgC/kAAAA=" "1852" >}}

{{< blockquote type="info" text="You can also use `user assigned`, but for this kind of Managed Identity, you first need to create a User Managed Identity and make use of the `ManagedIdentityCredential` credential from the Azure Identity dependency." >}}

#### Key Vault access policy

Next, you must configure the access policy for the managed identity on the Azure Key Vault. Follow the steps below:

- Navigate to the Azure Key Vault
- Click on `Access policies` in the left menu
- Click on `Create` in the top menu
- Select the following permissions:
  - `Get` for `Secret permissions`
  - `Get` for `Certificate permissions`
- Click on `next`
- Search for your Azure Function by its name or use the object ID
- Click on `next` and `create`

{{< caption-new "/uploads/2024/03/key-vault-access-policy.webp" "Assigned the Azure Function - Managed Identity to the Azure Key Vault"  "data:image/jpeg;base64,UklGRl4AAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSBQAAAABD6AgbQPGv8x2R1NEBMcKRPQ/FFZQOCAkAAAAsAEAnQEqCgACAAFAJiWkAAMX/EKdQAD+/PzJOKVu31MAAAAA" "1792" >}}

#### Azure Function configuration

Finally, you will need to configure the Azure Functions settings. Follow the steps below:

- Navigate to the Azure Function
- Click on `Configuration` in the left menu
- Add the following settings:
  - `KeyVaultUrl`: The URL of the Azure Key Vault
  - `CertificateName`: The name of the certificate in the Azure Key Vault
  - `TenantId`: The ID of your Microsoft 365 tenant. The tenant ID can be found on the Microsoft Entra ID overview page.
  - `ClientId`: The Application (client) ID of the App registration you created

When you save the settings, the Azure Function can authenticate with the Azure Key Vault and retrieve the certificate.

{{< caption-new "/uploads/2024/03/azure-function-api.png" "Calling the Azure Function on Azure"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAVElEQVR4nGOYG2GxYmqQ4ZOpAfq3pgUb35kaaHAHRE8LMrwzLdgIJPZsir/eYgZPI83VtvoaL611Ve9ZaKs80JOXfKArJw7B8hL3dOXEX+nJiS8FAKq5IECvqUyGAAAAAElFTkSuQmCC" "884" >}}

## Conclusion

In this article, I showed you how to use the CLI for Microsoft 365 in TypeScript Azure Functions. We configured the certificate-based authentication and used the Azure Key Vault to store the certificate.

Be sure to read the [caveats when working with the CLI and certificate login](https://pnp.github.io/cli-microsoft365/user-guide/cli-certificate-caveats) to understand the limitations of this approach.
