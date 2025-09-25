---
title: "Azure Functions missing after zip deploy from GitHub Actions"
longTitle: "Troubleshooting Azure Functions not loading after zip deploy from GitHub Actions"
customField: ""
slug: "/azure-functions-missing-zip-deploy-github-actions/"
description: "Learn how to troubleshoot Azure Functions that don't appear after zip deployment from GitHub Actions, including platform architecture configuration fixes."
date: "2025-09-25T06:31:23.091Z"
lastmod: "2025-09-25T06:31:23.780Z"
preview: "/social/e7f8e647-df17-4186-bd79-9bc37f1be3b1.png"
draft: false
comments: true
tags:
  - "Azure"
  - "Azure Functions"
  - "GitHub Actions"
  - "Deployment"
  - "Troubleshooting"
type: "post"
fmContentType: "post"
---

Deploying Azure Functions via zip deployment from GitHub Actions is a common practice, but sometimes you might encounter a frustrating issue where your functions are present in the `wwwroot` directory but don't show up in the Azure portal and can't be called. This post walks through diagnosing and fixing this specific deployment issue.

## The problem

After a successful zip deployment from GitHub Actions, your Azure Functions appear to be deployed correctly, the files are in the `wwwroot` directory, but:

- Functions don't appear in the Azure portal UI
- Functions can't be invoked
- The host seems to be running but not loading any functions

## Initial investigation

When this happens, the first place to check is the Azure Function host logs. You can access these through Kudu by navigating to:

```
https://<your-function-app>.scm.azurewebsites.net/DebugConsole
```

Then navigate to the host log files at:

```
C:\home\LogFiles\Application\Functions\Host
```

## The warning message

In my case, I found a log file containing this warning:

```
2025-09-24T21:26:43.580 [Warning] No job functions found. Try making your job classes and methods public. If you're using binding extensions (e.g. Azure Storage, ServiceBus, Timers, etc.) make sure you've called the registration method for the extension(s) in your startup code (e.g. builder.AddAzureStorage(), builder.AddServiceBus(), builder.AddTimers(), etc.).
```

This generic warning doesn't immediately point to the root cause, but it confirms that the host isn't finding any functions.

## Finding the root cause

Digging deeper into the logs revealed the actual error:

```
2025-09-24T21:26:08.923 [Error] Error: Worker was unable to load entry point "dist/src/functions/http_co_speaker_invitations_id_delete.js": \\?\C:\home\site\wwwroot\node_modules\skia-canvas\lib\v6\index.node is not a valid Win32 application.
2025-09-24T21:26:08.923 [Information] \\?\C:\home\site\wwwroot\node_modules\skia-canvas\lib\v6\index.node
```

This error message is the key: `is not a valid Win32 application`. This indicates a platform architecture mismatch - the deployed binary doesn't match the runtime platform.

## The solution (for me)

The fix is to configure your Azure Function App to use the correct platform architecture. In this case, switching to 64-bit platform resolved the issue:

1. Navigate to your Azure Function App in the Azure portal
2. Go to **Configuration** > **General settings**
3. Change **Platform** from **32 Bit** to **64 Bit**
4. Save the configuration

After making this change, the functions appeared in the portal and became accessible.

## Alternative debugging approach using Application Insights

Instead of manually browsing through Kudu logs, you can use the Azure Function logs with a KQL query that can help:

1. Navigate to your Azure Function App in the Azure portal
2. Go to **Logs** under the **Monitoring** section
3. Use the following KQL query to filter for relevant errors:

```kusto
let myAppName = "<your app name>";
let startTime = ago(1d);
let endTime = now();
union traces,requests,exceptions
| where cloud_RoleName =~ myAppName
| where timestamp between (startTime .. endTime)
| where severityLevel > 2
| where message has "entry point"
```

This query will surface any errors related to entry point loading, making it easier to spot platform architecture issues or other deployment problems.

{{< caption-new "/uploads/2025/09/logs-azure-functions.webp" "KQL query for finding the reason behind &quot;no functions&quot; on Azure Functions host" >}}

## Conclusion

Platform architecture mismatches can cause frustrating deployment issues that aren't immediately obvious. The key is knowing where to look for the real error messages beyond the generic warnings. By checking the detailed host logs and ensuring your Azure Function platform configuration matches your deployment artifacts, you can resolve these issues quickly and get your functions running smoothly.