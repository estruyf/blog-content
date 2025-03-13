---
title: '#DevHack: Using Azure CDN with SAS on Verizon Premium'
slug: /devhack-azure-cdn-sas-verizon-premium/
author: Elio Struyf
type: post
date: 2021-02-25T14:01:24.668Z
draft: false
tags:
  - azure storage
  - CDN
  - Azure
categories: []
comments: true
---

In the previous article, I explained how you could use the Shared Access Signature (SAS) in Cloudflare. The reason that I use this approach is to make sure the Azure Storage cannot be publicly accessed. Only via a SAS token blobs can be retrieved or updated. If you want to do this for Azure CDN, I pointed to the documentation to configure this, but it seems that it has changed a bit over time.

{{< blockquote type="info" text="[Using Cloudflare to serve your private Azure Storage Blobs](https://www.eliostruyf.com/cloudflare-serve-private-azure-storage-blobs/)" >}}

The article I used to configure it on the Verizon CDN was this one which tells you how to [hide CDN SAS token using a rewrite rule](https://docs.microsoft.com/en-us/azure/cdn/cdn-sas-storage-support#option-2-hidden-cdn-sas-token-using-a-rewrite-rule). You can accomplish this via the Verizon its **Rules Engine**, which has been updated to version 4 a long time ago. The interface and configuration are a bit different.

{{< blockquote type="important" text="Before setting your Azure Storage Account not publicly accessible, be sure to configure the rules first and wait until they are provisioned. It can take 4 hours before your rules are provisioned. After the provisioning, you can safely switch the Azure Storage its public access." >}}

## Configuring the rewrite rule

When you go to your CDN on the Azure Portal and click on **Manage**, it will open the Verizon configuration.

On the configuration page, hover over the **HTTP Large** and click on **Rules Engine V4.0**.

{{< caption-new "/uploads/2021/02/azurecdn1.png" "Rules Engine v4.0"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABNSURBVE3BMQ7DMAwEwRWPgtTQ+f/vYsC1Gps1gxQGNNPWWpWZmBlxfKjWGC7+JPEydyciiAjyubnOL5mJJHY+50QSVYUkeu+MMdiZGT878xQMXs+sLAAAAABJRU5ErkJggg==" "861" >}}

You will end up on a page with an overview of all the active policies/rules. Create a **new** one under **Drafts**.

{{< caption-new "/uploads/2021/02/azurecdn2.png" "New draft policy/rule"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAmSURBVDXBKQ4AMAwDsByg//9rwUCkTAOzeXbrGdjGRxJtkQSPJFzmUQn1X5iy1AAAAABJRU5ErkJggg==" "1176" >}}

Specify the name for your new rule, and click **continue**. On the Rule builder, you can start creating your new rewrite rule, and this is where it became a bit different.

Click on **+ Rule** and after that, click on **+**, and choose **Match**

{{< caption-new "/uploads/2021/02/azurecdn3.png" "Create new rule"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAAC4SURBVIXBvY5FUBSA0W9z/MVBqfAOSk/jtRXUEqVCCDmOPaOY5FZ31hLvvf7iP0ZV2bYNVeV5HkSEVxiGOOcIgoAsyzAiQlmW/FFVRISXqiIivMy2bSRJQpqmfBM451iWhfM8+cbkeU5RFLyO4yAMQ7z3iAhxHHPfN1EUYdZ1ZZ5n1nXFWov3nuu6MMZQ1zVN05AkCWaaJoZhoCgKxnFk33c+9X1PVVWYruto2xZVRUQQET5Za3n9AJXtUDYf4GMcAAAAAElFTkSuQmCC" "208" >}}

Set the select category dropdown to **General**, and the select match dropdown to **Always**. Click the **+** under the condition, choose **URL** for the category, and **URL Rewrite** for the feature.

In the source input field, add your CDN its internal relative path: `/<cdn-ID>/<CDN-name>/(.*)`.

{{< blockquote type="info" text="Note the regex at the end. This regex will retrieve everything that comes after the CDN name, and we can use it for the destination input." >}}

In the destination input, add the following: `/<cdn-ID>/<CDN-name>/$1?sv=2020-02-10&ss=b&srt=o&sp=r&se=2021-02-23T17:24:39Z&st=2021-02-23T09:24:39Z&spr=https&sig=<token>`. Replace everything after `$1` with your own SAS token from the Azure Storage Account.

{{< blockquote type="info" text="The `$1` placeholder will be replaced automatically by the CDN with the value from the regex in the source URL." >}}

{{< caption-new "/uploads/2021/02/azurecdn4.png" "Source and destination configuration for rewrite"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACGSURBVF3BwWqEQBBF0VuvSlFcGLII+f/fm2RcCM4wbXeFXghhzrFt2zIiGKcZN3B3LqUUOncnBhmtVl7PB8uycKm1Ionz9wZywmJgkJBEKYV39vHJef8hTnNmF5IwM8yMLjMxM7r4+kbT6Lg7XWbSWqPb953jOOgkEbTEwpDEf+u6cslM/gAVEC4+A36hbAAAAABJRU5ErkJggg==" "1292" >}}

Click on **Lock Draft as Policy**, which brings you to create the policy deployment screen. Select your environment (Production), add a message, and click on **Create Deploy Request**.

{{< caption-new "/uploads/2021/02/azurecdn5.png" "Create Deploy Request"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABqSURBVDXBuRXDIBBAwb+HAKkPB+6/GweuQSkIdv0IPCP3faeqUs4LFzAz/p7nYTMz3Esl1mKNjh4HYwxaa0QEIkL/ftBS8FYOeg9qragqZoaIkJnMOblebzaPCNydzGQTETITM8Pd2TKTH3Q4K1NS2fq9AAAAAElFTkSuQmCC" "1303" >}}

Now the CDN will start the deployment and will notify if it succeeded.

{{< caption-new "/uploads/2021/02/azurecdn6.png" "Waiting on deployment"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABfSURBVF3BQQ6DQAwEwfaMcQ78/6EQKSLaBUd7TVUcx9ERQdaLzSIiWGwz52SRROZWLKKJCMYYSGJ5ngfbdDdKi3sOIoLuJjORxLxvPteXxTZZVVQV/9zN+zy5LPZ95wcW8yMbrI/xrAAAAABJRU5ErkJggg==" "1300" >}}

{{< blockquote type="important" text="Once this process is completed, make sure you wait a couple of hours before the new policy/rule is implemented on all nodes. Documentation tells you that this process can take up to 4 hours." >}}