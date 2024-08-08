---
title: "Manage branch subdomains without Netlify DNS"
longTitle: ""
customField: ""
slug: "/manage-netlify-branch-subdomains-netlify-dns/"
description: "Learn how to manage Netlify's branch subdomains using external DNS like Cloudflare, bypassing the need for Netlify DNS, for seamless deployment."
date: "2024-08-08T15:15:40.645Z"
lastmod: "2024-08-08T15:15:41.098Z"
preview: "/social/ec3bd329-ed91-4ecc-b608-9120b4dd4346.png"
draft: false
comments: true
tags:
  - "Cloudflare"
  - "Deployment"
  - "DNS"
  - "Netlify"
  - "Next.js"
type: "post"
fmContentType: "post"
---

In the last weeks, I have been moving the [Front Matter CMS](https://frontmatter.codes) documentation and APIs to different hosting providers. The documentation and APIs were hosted on Vercel, but they stopped their open-source program, which made me look for alternatives. I decided to move the documentation to Netlify and the APIs to Azure.

The documentation site is generated with Next.js and uses the `main` and `dev` branches to deploy the production ([frontmatter.codes](https://frontmatter.codes)) and beta ([beta.frontmatter.codes](https://beta.frontmatter.codes)) versions.

## Branch domains

On Vercel, you can add a domain to a specific git branch.

{{< caption-new "/uploads/2024/08/vercel-subdomain.webp" "Configure your branch domain on Vercel"  "data:image/jpeg;base64,UklGRmwAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSB8AAAAAsdfX19fX19fXsdL//////////9Kx19fX19fX19exAFZQOCAmAAAAMAEAnQEqCgADAAFAJiWcAANwAP78nHycFCSySnuZYelHfGeAAAA=" "967" >}}

On Netlify, you can do the same with **branch subdomains**. This feature allows you to have a subdomain for each branch, and Netlify will deploy the branch to that subdomain.

You must enable the **branch deploys** feature on Netlify for this to work. You can configure this on the **site configuration** page, under the **branches and deploy contexts** section.

{{< caption-new "/uploads/2024/08/netlify-branches-deploys.webp" "Enable branch deploys on Netlify"  "data:image/jpeg;base64,UklGRnoAAABXRUJQVlA4WAoAAAAQAAAACQAABwAAQUxQSCIAAAABFyAWTPwB9+WSRkTEgoK2bZjubwBb/mxGIaL/IZ4hX/EAVlA4IDIAAADQAQCdASoKAAgAAUAmJZwCdAEQ/dpN4AD+/iYqisCDl88Q4gwmW5g+ljAkMkKO1CAAAA==" "2012" >}}

{{< blockquote type="important" text="One thing to note is that you cannot change the subdomain name. It automatically becomes the name of the branch." >}}

As I was using `dev` as the branch name, the subdomain becomes `dev.frontmatter.codes`.

{{< caption-new "/uploads/2024/08/netlify-branch-subdomains.webp" "Add your branch subdomain on Netlify"  "data:image/jpeg;base64,UklGRn4AAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCMAAAABHyAkIP6/U53hRkTEJBS1bQNVfXUXvKr8uQxERP8jPkI/PgBWUDggNAAAAPABAJ0BKgoABQABQCYlnAJ0ARD51NuoAAD+/achu3kPkfHMS/q61fJ/7FPvOOvbAiK4AAA=" "1724" >}}

{{< blockquote type="note" text="A solution to be able to use `beta.frontmatter.codes` instead of `dev.frontmatter.codes`, was to rename the `dev` branch to `beta`. Another option I chose was to use my own DNS provider, Cloudflare, to manage the subdomains." >}}

## Manage branch subdomains

In the [branch subdomains documentation](https://docs.netlify.com/domains-https/custom-domains/multiple-domains/?_gl=1%2a1udjxfk%2a_gcl_au%2aNjkwOTcxNTQxLjE3MTkzOTQ4MzM.#branch-subdomains) from Netlify, you can find a link to manage the branch subdomains with your own DNS provider, which made me move back to Cloudflare.

When you want to add your subdomain for a specific branch, ensure it is deployed on Netlify.

Netlify deploys your production branch (defined in the branches and deploy contexts setting) to the `https://<project-name>.netlify.app` domain. You can find this information on the **production domains** overview.

{{< caption-new "/uploads/2024/08/netlify-domain-configuration.webp" "Production domains on Netlify"  "data:image/jpeg;base64,UklGRn4AAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCEAAAABHyAWTPzlesOZRkSEDDUBkDAMb/pngJ5miOh/rCHuWQMAVlA4IDYAAAAQAgCdASoKAAYAAUAmJZwCdAEQ/jX2npaYAP7+S3wWT6+OIP7ibTLqLRKI000cQFgqOsXAAAA=" "1718" >}}

The branch deploys are available at `https://<branch-name>--<project-name>.netlify.app`.

For Front Matter CMS, the URLs are:

- Production: `https://frontmattercms.netlify.app`
- Beta: `https://beta--frontmattercms.netlify.app` (since writing this post, I have changed the branch name from `dev` to `beta` for consistency)

Once you know your branch URL, you can add a CNAME record to your DNS provider. In Cloudflare, you can add a CNAME record with the following settings:

- Type: CNAME
- Name: `beta`
- Target: `<branch-name>--<project-name>.netlify.app`

{{< caption-new "/uploads/2024/08/cloudflare-cname-netlify.png" "Subdomain configuration for your Netlify branch URLs"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAANElEQVR4nAEpANb/AO/v77Hy8vLb+Pj41Pn5+dXr6+vV6+3t1fTx8NXv6+jT+Pj53fPz86zs1iRmYC0hkgAAAABJRU5ErkJggg==" "1026" >}}

{{< blockquote type="tip" text="When you use your own DNS provider, you can define your subdomain name instead of using the name of the branch. For the example, I added the `dev` name and linked it to the `beta--frontmatter cms.netlify.app`, which allows me to use the `dev.frontmatter.codes` subdomain for the beta branch." >}}

Once you have added the CNAME record, wait a few minutes for the DNS to propagate, and you will be able to access your branch subdomain.
