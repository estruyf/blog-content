---
title: Homepages on Sharepoint all share the same unique ID
slug: /homepages-sharepoint-all-share-the-same-unique-id/
date: 2019-08-26T11:45:00+02:00
draft: false
type: post
tags:
  - Unique ID
categories:
  - SharePoint
comments: true
--- 

It appears that some time ago (weeks/months), the unique ID of a SharePoint homepage is not unique anymore and is shared with other homepages pages in your environment. The problem occurs when creating new SharePoint sites. Once the site has been created, it will most likely share the same ID with a couple of other homepages.

> **Info**: This issue let me think back of what Wictor Wilen wrote about in 2016 where web ID "GUID" is not unique anymore, and that they all share the same one. Read more: http://www.wictorwilen.se/when-a-guid-is-not-really-unique-i-m-looking-at-you-sharepoint.

Why do I say "most likely", in a couple of my environments I found a couple of unique IDs that are shared. So it appears that they change over time, or depending on how they were created.

For example in my environment I currently see the following IDs being reused:

- `{0B3C1D63-6C78-4D45-8FD2-2B08D9A3630A}` -> 19 pages
- `{ab87b4f7-68a0-45f8-a1dd-7966a52efe1d}` -> 7 pages

Another example:

{{< caption-new "/uploads/2019/08/unique-id-fig1.png" "Sample of a tenant with multiple of the same unique IDs for pages"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABCSURBVBXBQQ2AMBREwbct/pCABERyIcEFqQgS+ncJM1q3Pcd5Md+HspnzpbdOAAFOaBLLPQZJIYnEVBk7/ASEUIgPLrQi7+eI7TwAAAAASUVORK5CYII=" "1084" >}}

So in this case you can say that the field `UniqueId` !== unique.

> **Important**: When building a solution that requires these unique IDs to be unique, this causes a lot of issues. When you expect only one page, you get many instead.

## Solutions

What can you do about this situation?

1. Recreating the homepages, so that you own them.
2. If you use the unique ID in a custom solution, you can, for instance, use a combination of the site ID, web ID and the unique ID.

The first one is really simple to do and the steps go as follows:

- Go to the site with the page
- Open the Site Pages library
- Select the **Home.aspx** page
- Create a copy of the page via the **Copy to** action
- Use the current location, and click **Copy here**
- Delete the **Home.aspx** page
- Rename the newly created page (probably **Home1.aspx**) to **Home.aspx**
- Make the new page the homepage by clicking on the three dots and click on **Make homepage**
