---
title: Migrate from Disqus to GitHub Discussions (giscus)
date: 2022-11-28T11:15:08.015Z
draft: false
type: post
description: In this article, Elio explains how he migrated from Disqus to GitHub Discussions and how you can do so.
lastmod: 2022-11-28T11:15:08.015Z
preview: /social/0ff5e4c0-efc8-4b6c-af77-4341b4c02bff.png
comments: true
tags:
  - GitHub
  - GitHub Discussions
  - migration
slug: /migrate-disqus-github-discussions-giscus/
longTitle: ""
---

For years I have been using Disqus on my blog, and for a long time, I have been looking for a good alternative that would fit into the daily tools. Another reason why I wanted to move away from Disqus is because of their tracking and ads.

A long time ago, I looked at [utterances](https://utteranc.es), a commenting system based on GitHub issues. Although it sounded perfect, I found it not ideal for a long time. GitHub issues do not provide a threaded way of communication, so for a commenting system, it would be weird. Although, a week ago, I thought to give it a try.

While preparing for the migration, I did one last search and found another tool called [giscus](https://giscus.app). A comments system powered by GitHub Discussions and inspired by utterances. Quickly I found this the best-suited system.

## Preparing the migration

The first thing to do if you want to move away from Disqus is to export all your comments. You can do this as follows:

- Go to your Disqus account
- Click on **moderation** in the header
- Click on **export** link in the left menu
- Click on the **export comments** button
- Keep the XML file

## Preparing your repository

On GitHub, create a new public repository on which you need to activate the **discussions** feature. You can enable this feature once the repository is created. Go to the repository **settings**, and under the **features** section, enable **discussions**.

## The migration script

I have created a script to migrate all comments over to GitHub Discussions. 

{{< blockquote type="info" text="[Migrate from Disqus to GitHub Discussions](https://github.com/estruyf/disqus-to-github-discussions)" >}}

All you have to do is follow the steps defined in the repository.

{{< blockquote type="important" text="I recommend running the script with a GitHub App instead of your personal access token to prevent you from hitting the rate limit, which depends on the number of comments you have to migrate." >}}

{{< caption-new "/uploads/2022/11/github-discussions-migration1.png" "GitHub Discussions - Completed migration"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABgSURBVF3BQQ7CIBCG0Q/KFEy8iBtX3v9M1o0yP2WMMU2M76XL9RZDIiIwMyTxYbaSlwXyxM6Z0tqJTsLl1NpYa+Mr8O7o5fgzUR7bncOcO5AIQN6RxKHwZ+yDiCD4lXgDkhIsR5mYf2gAAAAASUVORK5CYII=" "1247" >}}

## Configuring and using giscus

After the migration is performed, it is time to use the tool of your choice. As mentioned, I went for giscus. The process of setting it up is straightforward. You must go to the giscus website [giscus.app](https://giscus.app) and go over the configuration section. Once you do that, the website provides you with a code snippet to add to your website.

{{< blockquote type="important" text="For the page to discussions mapping, make sure you use the **Discussion title contains page `pathname`** option." >}}

## The experience while creating the script

While creating the script, I experienced a couple of hiccups.

### Rate limit

The first one I already mentioned was the rate limit. When calling the REST or GraphQL API from GitHub, you need to be aware of the number of calls you can make, but there is a second-rate limit when creating issues/discussions.

When you hit this limit, you can temporarily not use the API, which means, if you are using your personal access token, you cannot comment/reply on GitHub, for instance.

The best way to overcome this is to use your own GitHub App.

The script will automatically try to recall the API after an exponential timeout during the migration.

### Notifications

Once I started the migration with my own GitHub App, I began to get notifications for each discussion/comment/reply. Make sure to ignore the repository until the whole migration is over temporarily. That way, you will not receive any emails.

{{< caption-new "/uploads/2022/11/github-discussions-migration2.png" "GitHub Discussions - Notifications"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAZCAYAAAAIcL+IAAAAAklEQVR4AewaftIAAAJsSURBVH3Bz2olRRTA4d+pPlXVfbubiTqDiqiguBKCG8EwuBDEJwjkHcXRRfI22epiZpObeNP/quscc1/A75NpmlxEaNuW/6NBG/569yc/vb1iWVeiRpZ1IYiQc+bNZ5/SakLXWvjlt1+p4oRDxtwYhharFQkBc2cqK2ruhBx5//c/zNNMjJFSNkQC3aGjazuqGzrmA+u+8frVRyypI6oyLwsCtF3H6/4VZxpE6GJmazvalHF3xnHEzBAR1rJiOCoiLPvGw/GB6XlCVVnXFXen73u+Gr/GcNTdEWAcRnLKiAjujpmRc0YQVALKi9hE9n2n1krTNJRSqLVyttuO4SgvtlpAoNaKiFBK4UxEaGPmTHmRm0jXdqSYOBuGATNDRFjKRnVDRYRl33j/4QPPpxOqSikFM6Pve7757lvMBHV33J1xHImqxBjZto2zrutITSQ1oLxoNXHoOnJKuDspJZqmQURYtpWKE6pVbm9vOZ1OHB8fmeaJx6dHjscH5nmm4hxSRnc3rq6umGxjdyhe0D7j5syhov+esEMlKIH7+3uSBWKBXhJ2WvFpo62Brj8wdj26eeXi4oI1VEoSNgo6tmDOTEWfnwlB0CQNZ6N2LPtCCIG6V0CIKXHoezrNhM13jscjz7ZSslByYItQIsxhxwXmfUXbJnF5eYmZUWvFzAgpYWac1aVwGAZ0Kit3d3d8/+MPzMuCRmVbN6IqmiJffv4FixW0Ty03Nzc8PT3h7pgZZoaqUmslbEZsArqUlXe//8HVz29ZthVVZVkWggRSTnz85hO6RtCokevrax5OT8ScOBuGAauVpmlgrezNzn+HtUitCL25NAAAAABJRU5ErkJggg==" "243" >}}

### Links and images

Images in Disqus were provided as hyperlinks in the export. I noticed this once the migration was completed, so I had to write a script to fix this. In the current script, all image links will be converted to actual image markup so that they will show up in the comment.

### Duplicate links with query string parameters

When a user opens your site, it will create a thread with the current URL. That means that when a user opens your page from Google translate, Google translate, cache, or any other tool, it creates new unwanted threads. 

In the migration script, I added some checks to ignore threads that do not originate from your site and do not include any query string parameters.