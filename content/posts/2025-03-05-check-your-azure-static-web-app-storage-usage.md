---
title: "Check your Azure Static Web App storage usage"
longTitle: ""
customField: ""
slug: "/check-azure-static-web-app-storage-usage/"
description: "Learn how to easily check your Azure Static Web App's storage usage directly in the Azure Portal with this step-by-step guide."
date: "2025-03-06T13:28:19.793Z"
lastmod: "2025-03-06T13:28:20.324Z"
preview: "/social/a0972664-405e-4546-a8a9-0ef1578a524c.png"
draft: false
comments: true
tags:
  - "Azure"
  - "Azure Static Web Apps"
type: "post"
fmContentType: "post"
---

Azure Static Web Apps offer several plans, including a free plan and a standard plan (and a dedicated plan which is currently in preview). Each plan comes with specific quotas and limits, one of which is storage capacity.

{{< blockquote type="info" text="You can find more details about these quotas here: [Quotas in Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas)" >}}

{{< caption-new "/uploads/2025/03/swa-storage-limits.webp" "Static Web Apps - Plans" >}}

If you're wondering how to check the storage usage of your Azure Static Web App, I recently discovered a way while exploring the Azure Portal.

## Checking Storage Usage

Instead of estimating storage usage from your local build output, you can check it directly in the Azure Portal:

1. Go to the [Azure Portal](https://portal.azure.com).
2. Search for your Azure Static Web App.
3. Click on **Diagnose and solve problems**.
4. Select **Configuration and Management**.

This page provides various details about your Static Web App, including a **Storage Usage** section that displays the current storage consumption.

{{< caption-new "/uploads/2025/03/swa-storage-usage.webp" "Static Web App - Storage Usage" >}}

I hope this helps you better understand and monitor the storage usage of your Azure Static Web App.

