---
title: Reviewing Cloudflare Pages to show what it has to offer
slug: /reviewing-cloudflare-pages-show-offer/
author: Elio Struyf
type: post
date: 2021-10-15T11:46:51.562Z
lastmod: 2019-08-22T15:20:28.000Z
draft: false
tags:
  - cloudflare
  - Static site
  - Jamstack
categories: []
comments: true
description: In this article I review Cloudflare its Pages service. A service that allows to host your Jamstack websites fast, secure, and easily.
keywords:
  - review
preview: /social/5162414a-cc9a-4bbd-9fe8-7973227c806c.png
---

Cloudflare is a name that probably does not need any introduction. It is a well-known service that provides one of the fastest and massively used content delivery networks (CDN).

Cloudflare developers have been busy as they have been building a lot of valuable new services like the one that I am talking about in this article Cloudflare Pages. Still, there is another interesting one called Cloudflare Images.

{{< caption-new "/uploads/2021/10/cloudflare-pages.png" "Cloudflare Pages"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACwSURBVDXBQU7DQAxA0W/PBIcUdRAL2FGJPeX89Ar0CGxygiKiliYZjxEL3pNxHON0+iKlRGuN3e6ZUgp/3J3qTk6JbGaYGS0a3pxhGFjXyvnyw1orvRmpV7KqoirclweiNa7XGeuNzeaWpIq74+7k7fTJ3Y0w2xOlbBER3B1EiAgiAhFB18dXpuEFCL6niVor/z6OR94PB+Z5JosqIkK0Bq0CAyLCsiy87ffknOm6jl9UsVDjUIIgxQAAAABJRU5ErkJggg==" "1071" >}}

## Jamstack and website development

Jamstack is a term used to describe a website built using a combination of different technologies to make it faster, more secure, and easier to scale. 

There are many services available on which you can host your Jamstack website. In the past, I wrote a post about comparing Netlify, Vercel, and Azure. As I am interested to see how many others are doing it, I wanted to see how the experience at Cloudflare Pages is.

{{< blockquote type="info" text="[Which service? Netlify vs Vercel vs Azure Static Web App](https://www.eliostruyf.com/netlify-vs-vercel-vs-azure-static-web-app/)" >}}

As Jamstack websites are so popular, Cloudflare jumped on it as well, and now help you get your website up and running in a few minutes.

### Signing up experience

One of the most important things, when you pick a service, is the sign-up experience. It should be as simple as possible, and otherwise, people will leave before they see what you have to offer.

In my case, I already had an account, so it was pretty easy to get started. Once logged in, it asked me to create a new project.

{{< caption-new "/uploads/2021/10/cloudflare-pages-create-project.png" "Create a new project"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABsSURBVDXBOw4CMQxAwecfiIgC0XH/Y1FQI223QRSb2CgFM9J7L3dHRADDTDETxpjsny/Xdsbd8dYayxgDkUIVqgpEcHeWzMSPmWx7cb9MqorMZFFVTi5EBIuGKY+b8nwfvLZJRBARIIpY8PcD/gAnCqJPyOMAAAAASUVORK5CYII=" "1094" >}}

Like Vercel, Netlify, Azure Static Web Apps, etc., it asks you to like the service to your GitHub account. 

{{< caption-new "/uploads/2021/10/cloudflare-pages-github.png" "Link to GitHub"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACNSURBVE3BQY6DMBBFwdfdDjODUFYcx/e/AedggzQI7P7Bu1RZZkpKjv/G78sYJOHuDBEOGCUziQjmH3GeJ2aGJIZ5nnF3ruvCefQUXcayLEzThCQigvu+yUyGwuM4O+qNEsG+72zbhiRqrbg7Q+Hx/gtSQTis60qtFTBaMyQxFB6tNYbsfBGliNYSM+MDLzhJF10YVCUAAAAASUVORK5CYII=" "932" >}}

Once linked, and you selected the site.

### Configuration of your site

Configuring your website starts by selecting the project to import.

{{< caption-new "/uploads/2021/10/cloudflare-pages-configure.png" "Configuring your project"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAAAklEQVR4AewaftIAAAEESURBVH3BMY4UMRCG0a/qr7Z7QZMQI85Exlk25AichRsRESKxQtM9tgtbCyuEBt6z3ntOtNYxgx9HpwZIYpGEmeGZiSRqLfTeEY3zPBljUEpBEq01gunWbvTWcXe2bcPMyEyu1yulFJZgevr+REQgiaXWiiT+FEyZictxdyQxxmCMgZkRESzBdLlcyEwwY5GEmbFkJkswtdYw2wBj38U9wXQ9TkoBN+c4Oma8KKWwBNNxHLg7kthKJST+FkwPeyXk7HvlX5xfIoL/CaaH1xdGgpnhbtwTLAlkcutQjLuCaTCZUTfnt6/fTj59/sJencf3b4neO86z8+TFm1fw8cM7ljEGPwFdBl78txFkagAAAABJRU5ErkJggg==" "880" >}}

Setting up the build and deployments looks familiar. You need to specify the framework you use, and if it exists in the list, it will preset all the paths and commands. If not, you can manually adapt it to your preferences.

By default, the project building happens on the servers from Cloudflare once you committed your changes to your repository. Additionally, you can also set up deployment hooks once your project has been configured.

{{< caption-new "/uploads/2021/10/cloudflare-pages-configure.png" "Configuring your project"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAAAklEQVR4AewaftIAAAEESURBVH3BMY4UMRCG0a/qr7Z7QZMQI85Exlk25AichRsRESKxQtM9tgtbCyuEBt6z3ntOtNYxgx9HpwZIYpGEmeGZiSRqLfTeEY3zPBljUEpBEq01gunWbvTWcXe2bcPMyEyu1yulFJZgevr+REQgiaXWiiT+FEyZictxdyQxxmCMgZkRESzBdLlcyEwwY5GEmbFkJkswtdYw2wBj38U9wXQ9TkoBN+c4Oma8KKWwBNNxHLg7kthKJST+FkwPeyXk7HvlX5xfIoL/CaaH1xdGgpnhbtwTLAlkcutQjLuCaTCZUTfnt6/fTj59/sJencf3b4neO86z8+TFm1fw8cM7ljEGPwFdBl78txFkagAAAABJRU5ErkJggg==" "880" >}}

When your site is deployed, you can make changes to your domain and set environment variables. 

In my case, I had an issue with the domain (which was already linked in Cloudflare) and had to go to the domain section to fix it. This configuration issue was the only hiccup I encountered.

## The verdict

### Pro

- Free tier
- Unique preview URLs
- Custom domain management
- HTTPS / SSL handling
- Cloudflare workers (Functions) + they come without a cold start
- Integrates nicely in the other services from Cloudflare

### Cons

- The free tier only allows one build at a time
- Extra's like identity management might cost you
- Configuration happens in various places (Pages, Workers, CDN, etc.)
- Limited to GitHub (might change in the future)
- Monorepo's are not yet supported
- For custom domains you need to transfer the domain to Cloudflare DNS

{{< caption-new "/uploads/2021/11/cloudflare-pages-dns.png" "Transfer domain to Cloudflare DNS"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABhSURBVHXBOxLCMAxAwWfJ+BPuf0B6ZigYYjkax+AiJbvhs9v8QQVKKfwTwxyYGe5Oa41aKyLCJaXEIjk4r114PCdvA3enHwfdT5beO2MM4nm7E2Nj2wolJ3KOXFQVVWX5AuH7KqtnSBBmAAAAAElFTkSuQmCC" "885" >}}

## Conclusion

I must say, I am very happy with the experience that Cloudflare Pages offers. What you get, for what you have to pay, is a great deal. 

I would love to see a more consolidated experience for all the different services that Cloudflare offers. That makes it easier to get started and manage your sites, but it would not be an issue if you are already familiar with Cloudflare.

When it comes down to simplicity, I would say that Cloudflare Pages is just behind Vercel. It provides you with what you need and does not come with too many bells and whistles to get started.

## Update

### 2021-11-03

When adding another site, I discovered that you can not link a domain to a project that is configured somewhere else. You can only add a domain to a project by transferring it to Cloudflare its DNS service.