---
title: Deploying Branding Files Using a Sandbox Solution
author: Elio Struyf
type: post
date: 2011-11-27T18:20:00+00:00
slug: /deploying-branding-files-using-a-sandbox-solution/
Xylos:
  - http://www.xylos.com/blog/post/1029/SharePoint-Deploying-Branding-Files-Using-a-Sandbox-Solution/
dsq_thread_id:
  - 3849751994
categories:
  - Branding
  - SharePoint
tags:
  - Master Page
  - Sandboxed
comments: true
---

When you want to create a SharePoint 2010 sandbox branding solution, you will notice that your files will be in draft (Checked out). This means that these files are not available yet for all users. Therefore two actions need to be done for each file:

*   Check in the file;
*   Approve the file.
As an example I deployed a master page using a sandbox solution. When the solution is deployed and the feature is activated, the master page file has the following properties.

{{< caption-new "/uploads/2011/11/112711_1815_DeployingBr1.png" "Master Page in draft"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0UlEQVR4nDWNzUrDQBRG51niSqHQld1FBLsTVwFJ38FnU6guDJQYkZQiQboQEUGRRohJ7uR3JplJ7oy0qYdvcRYfHDK1r8Zn9pFpjU4vD03LmFwMOzg+N05mZP36dj2/v3Mebxeu4z55fuAtgwc/8FfBjftMaFbwmiFiK4RSSu8YJCoFgayQshOyixKapkBpBgApQJnTj5+U0DznjGGPrK4428N5o/supIxEv3GSxEVVlVwiolKotQaA8Pvz5f2LlNsrb5qWtT3+t6WU2LUbqP4Ads+tdf1N4A8AAAAASUVORK5CYII=" "605" "422" >}}

As you can see the file is **not checked in** and the approval status is still **draft**.

## Solution

A solution is to check in and approve the file when the feature is activated.

Create a feature event receiver for the feature that deploys the branding files (in this example this is a Site Collection feature), and write code for the **FeatureActivated** event.

The following code retrieves the file, checks it in, and approves it.


```csharp
public override void FeatureActivated(SPFeatureReceiverProperties properties)
{
  using (SPSite site = (SPSite)properties.Feature.Parent)
  using (SPWeb web = site.RootWeb)
  {
    // Set the master page url
    string masterUrl = site.ServerRelativeUrl;
    if (!masterUrl.EndsWith(@"/"))
    {
      masterUrl = masterUrl + @"/";
    }

  // Retrieve the file
    SPFile file = web.GetFile(masterUrl + "_catalogs/masterpage/v4_estruyf.master");
    // Check in the master page
    file.CheckIn("Checked in by the branding feature.");
    // Approve the master page
    file.Approve("Approved by the branding feature.");
    file.Update();
  }
}
```


When the new solution is deployed, you will see that the file is now a **major version** and **approved**.

{{< caption-new "/uploads/2011/11/112711_1815_DeployingBr2.png" "Approved Master Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA00lEQVR4nB2MzWrCQBgA9130ZkG8mZsUCp7Uk1D7EH04aaWCEgQtItYfgtBShKLGZH++jUk2qcluVtZh5jqo+fJae+pVGt3q4/NDo1uy2sZ6u2R1ylYLbZxdfzAajqfvY/ttaE8+l7PFejpfLb6c/oeNMGGJEEqp5D+VudR3VFForc8+RphCnstrlmHGGQMAzgAoZVEY/fzukU9oHMdSyii8xAZhEkIXxd/xhDyMLwGINE0ydR+bbRBw7Llbx0H7g+v65OSRgw+EhywweoQS4Nvd9w1nRKudi+o8IgAAAABJRU5ErkJggg==" "605" "422" >}}