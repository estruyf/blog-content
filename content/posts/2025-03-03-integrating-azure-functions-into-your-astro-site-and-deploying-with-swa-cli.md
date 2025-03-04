---
title: "Integrating Azure Functions into your Astro site"
longTitle: ""
customField: ""
slug: "/integrating-azure-functions-astro-site/"
description: "Learn how to seamlessly integrate Azure Functions into your Astro site for enhanced serverless capabilities and streamlined deployment."
date: "2025-03-03T15:54:42.288Z"
lastmod: "2025-03-03T15:54:42.813Z"
preview: "/social/9fd6c7b4-be93-489f-8128-9c3db12e9faa.png"
draft: false
comments: true
tags:
  - "Astro"
  - "Azure Functions"
  - "Deployment"
  - "GitHub Actions"
  - "Serverless"
type: "post"
fmContentType: "post"
---

In the [previous post](https://www.eliostruyf.com/deploy-astro-azure-static-web-apps-github-cli/), I showed you how to deploy your Astro site to Azure Static Web Apps using the Azure Static Web Apps (SWA) CLI. In this post, I will show you how you can integrate Azure Functions into your Astro site and deploy them using the same SWA CLI.

{{< blockquote type="important" text="To follow this post, it is important first to read the [Astro site deployment to Azure Static Web Apps with the CLI from GitHub Actions](https://www.eliostruyf.com/deploy-astro-azure-static-web-apps-github-cli/) article." >}}

## Why Azure Functions?

Azure Functions are serverless compute services that enable you to run event-triggered code without managing the infrastructure. It allows you to run your code without worrying about the underlying infrastructure. Azure Functions are a great way to run small code that various events can trigger.

The best part is that, in the context of Azure Static Web Apps, you can deploy your Azure Functions alongside your static site. This allows you to build a full-stack application with a static front-end and serverless back-end.

## Step 1: Create the Azure Functions API

The first step is to create an Azure Functions API. You can do this using the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) in Visual Studio Code or via the [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos&pivots=programming-language-typescript).

For this example, I used the Azure Functions Core Tools with the following command:

```bash {title="Create an Azure Functions API"}
# Create a new Azure Functions project
func init api --worker-runtime typescript --model V4

# Navigate to the new project folder
cd api

# Create a new HTTP trigger function
func new --template "HTTP trigger" --name http_name
```

{{< blockquote type="note" text="The Azure Functions project is created in the `API` folder next to your Astro site, which is located in the `app` folder." >}}

## Step 2: Configure the SWA configuration

You must update the file to make your SWA configuration aware of the Azure Functions project. You need to add the following configuration:

```json {title="./swa-cli.config.json", hl_lines="7-10"}
{
  "$schema": "https://aka.ms/azure/static-web-apps-cli/schema",
  "configurations": {
    "astro-func-swa": {
      "appLocation": "./app",
      "outputLocation": "dist",
      "appDevserverUrl": "http://localhost:4321",
      "apiLocation": "./api",
      "apiLanguage": "node",
      "apiVersion": "18",
      "apiDevserverUrl": "http://localhost:7071"
    }
  }
}
```

{{< blockquote type="info" text="The `apiLocation` is the path to your Azure Functions project, and the `apiLanguage` is the language of your Azure Functions. The `apiVersion` specifies the Node.js runtime version used for the functions. Ensure that this version aligns with your Azure Functions environment." >}}

## Step 3: Update the root package.json scripts

Update your `package.json` scripts on the root to include the Azure Functions build and dev commands.

```json {title="./package.json"}
{
  "scripts": {
    "build": "npm run build:app && npm run build:api",
    "build:app": "cd app && npm run build",
    "build:api": "cd api && npm run build",
    "dev": "npm-run-all --parallel dev:*",
    "dev:swa": "swa start",
    "dev:app": "cd app && npm run dev",
    "dev:api": "cd api && npm run start",
    "dev:api_watch": "cd api && npm run watch"
  }
}
```

{{< blockquote type="note" text="You need the `npm-run-all` dependency to run the `dev` script. You can install it by running `npm install npm-run-all -D`." >}}

## Step 4: Run your Astro site and Azure Functions

To run your Astro site and Azure Functions locally, you can use the following command:

```bash {title="Run your Astro site and Azure Functions"}
npm run dev
```

{{< caption-new "/uploads/2025/02/wait-for-funcs.webp" "SWA waits for Astro site and Azure Functions" >}}

{{< blockquote type="note" text="Notice that the Static Web Apps CLI proxy service waits for the Astro server and the Azure Functions server to start before starting the application." >}}

Now, you can test the Azure Functions API on the `http://localhost:4280/api/name` endpoint. The nice part is that you don't need to think about CORS, as both the front and back end are running on the same domain through the Static Web Apps CLI proxy service.

## Step 5: Change the code of your Azure Functions

You can now make changes to the Azure Functions, and the development server will automatically pick up on them.

```ts {title="./api/src/functions/http_name.ts"}
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function http_name(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  return {
    jsonBody: {
      firstName: "Elio",
      lastName: "Struyf",
    },
  };
}

app.http("http_name", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: http_name,
  route: "name",
});
```

## Step 6: Adding the API call to your Astro site

To call the API, I'll use React to interact with the Azure Functions.

{{< blockquote type="info" text="Follow the following steps to add React support to your Astro site: [Add React to Astro](https://docs.astro.build/en/guides/integrations-guide/react/)" >}}

```tsx {title="./app/src/components/Hello.tsx"}
import * as React from "react";

export interface IHelloProps {}

const apiHost = import.meta.env.DEV
  ? "http://localhost:4280"
  : "https://<SWA URL>.azurestaticapps.net";

export const Hello: React.FunctionComponent<IHelloProps> = (
  props: React.PropsWithChildren<IHelloProps>
) => {
  const [name, setName] = React.useState({ firstName: "", lastName: "" });

  const fetchName = async () => {
    const apiUrl = `${apiHost}/api/name`;
    try {
      const response = await fetch(apiUrl);
      const { firstName, lastName } = await response.json();
      return { firstName, lastName };
    } catch (error) {
      console.log(error);
      console.log(apiUrl);
      return { firstName: "", lastName: "" };
    }
  };

  React.useEffect(() => {
    const getName = async () => {
      const fetchedName = await fetchName();
      setName(fetchedName);
    };
    getName();
  }, []);

  if (!name.firstName || !name.lastName) {
    return <p>Loading...</p>;
  }

  return (
    <p>
      Hello, {name.firstName} {name.lastName}
    </p>
  );
};
```

You can now use the `Hello` component to display the name fetched from the Azure Functions in the Astro component.

```tsx {title="./app/src/pages/index.astro"}
---
import { Hello } from "./Hello";
---

<Hello client:load />
```

{{< caption-new "/uploads/2025/02/calling-the-api.webp" "Calling the Azure Functions API from the Astro site" >}}

## Step 7: Update the GitHub Actions workflow

You need to update the GitHub Actions workflow to ensure that the Azure Functions are deployed with the Astro site.

```yaml
name: Deployment to Azure Static Web App

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: |
          npm ci
          cd app && npm ci
          cd ..
          cd api && npm ci

      - name: Build
        run: npm run build

      - name: Clean dependencies
        run: cd api && npm ci --omit=dev

      - name: Deploy
        run: npx @azure/static-web-apps-cli deploy -d ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_<ID> }} --env production
```

{{< blockquote type= "important" text= "Replace <ID> with the correct secret name for your Azure Static Web App deployment token. You can find this in the Azure portal under your Static Web App settings." >}}

## Step 8: Deploy your Astro site and Azure Functions

Push your changes to the repository, and GitHub Actions will handle the deployment. Once complete, you can access your site and test the Azure Functions API.

## Conclusion

You can add powerful serverless capabilities by integrating Azure Functions with your Astro site. The Static Web Apps CLI simplifies local development by providing a unified proxy, and GitHub Actions automates deployment to production.