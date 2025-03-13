---
title: Which service? Netlify vs Vercel vs Azure Static Web App
slug: /netlify-vs-vercel-vs-azure-static-web-app/
author: Elio Struyf
type: post
date: 2020-08-18T08:27:15.896Z
draft: false
tags:
  - Hosting
  - Azure
  - Azure Functions
  - GitHub
  - GitHub Actions
  - Static site
categories: []
comments: true
---

I like to use static websites. It is fun to see that so many go back to the "old" way of working, but still try to find our ways to add our content dynamically.

> *Retro tech is hip again*

Last year I made my move to static with my blog, which is now running on the [Azure Storage static website](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-host) option and powered by [Hugo](https://gohugo.io/) and do not regret it. It is a lot easier to use, and you do not have to worry about updates from the CMS you are using.

Microsoft is not the only one that provides you this static website option, and many people might not even know about the Microsoft Azure offerings. Even Microsoft is coming with a new and easier static site offering called *Azure Static Web Apps*, which has close integration with Azure Functions.

As I work mainly on the Microsoft technology stack, I wanted to explore other options to see what the competition has to offer. That is why I tested Vercel and Netlify (also running a test on Heroku - but as I did not check it out thoroughly, I did not want to include it).

> **Info**: Azure Static Web App is currently still in preview, so it is unfair to compare it against well-known brands. To give it a chance, I will only tell my findings and wish list for the platform.

## Netlify

For the [Pimp Your Own Device - Sticker store](http://pimpyourowndevice.com/), I wanted a host that could easily make the static web site deployment work. As some people I know make use of Netlify, I wanted to give it a try.

The sign-up experience and configuration were straightforward. Think I spend less than one hour on setting up the deployment and configure my domain. Compared to my previous experience with Azure Storage Static sites, this was a considerable change. No fiddling around with CDNs and SSL certificates. The service does all of that for you. In the end, this is all you want, because let us be honest, who likes waiting?

Netlify also has a free tier, which is excellent to get you started. In most cases, the free tier is even enough if you want to host a blog. The best is to check out their pricing model as there are a lot of things you need to take into account. There are many things measured, and you will have to pay when you reach certain thresholds like, for instance:

- Bandwidth
- Deployment time (build minutes)
- Serverless function executions
- Form submissions

Besides that, the service has a lot of great features. It has plugins that you can use during deployment (like a plugin to purge your Cloudflare Cache), and forms as static websites do not have any back-end (if you do not write it yourself). Netlify forms make it easy for you to have your contact forms on your website.

Honestly, the thresholds are high enough to run your website. In our case, with the sticker store, the build minutes are the most important. Every time somebody buys a sticker, our inventory gets updated, and this triggers a new build. The build minutes are currently the only threshold we face. You can purchase extra build minutes for $ 7 and gives you 500 minutes on top of the 300 minutes you get in the free tier.

The builds itself are very fast and allow you test out your site before you put it public.

Check out their pricing plans: [Netlify Pricing Plans](https://www.netlify.com/pricing/).

{{< caption-new "/uploads/2020/08/netlify.png" "Netlify"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABISURBVDXBMQ6AIAxA0d/WheIBjDPewPuPBhPPYRxcwTBpHHhPWmuvmmGqdCJCd1wn91MZtryzpETwwOgRUaGUipkS3Vmnmd8H5FAP55Hng94AAAAASUVORK5CYII=" "991" >}}

### Pro

- Free tier
- Extra features like forms and build plugins
- Full DNS Management (it has its name servers)
- Free SSL and automated configuration
- AWS Functions
- Identity management: allows you to manage and authenticate users on your site
- Other services available to purchase like analytics
- Allows you to run multiple sites

### Cons

- There are a lot of thresholds per tier set like bandwidth and deployments minutes
- Most probably the starters plan is enough, as it already comes with 100GB bandwidth and 300 deployment minutes
- Pay extra if you exceed bandwidth or deployment times.
- Functions have a 10 seconds execution limit

## Vercel

Vercel (formerly ZEIT) is another service that allows you to deploy your web projects like static sites quickly. It has a lot in common with Netlify but comes with less extra features, but comes with simplicity.

The reason I wanted to test out Vercel is that I had yet again another project that needed to be put online. I could have used Netlify, of course, but where is the fun in that. No, I wanted to see how another service was handling things. The project itself is a URL shortener that I created with Hugo to generate short URLs for all the stickers we have in our store. Short URLs make it easier to share them via Instagram.

Last week, when I was sitting on my sofa, I was checking out a couple of services like Netlify, and Vercel was the one that got my attention. Before its name change, it seemed to have a bad reputation, but a lot has changed. Their pricing model is exciting. The pricing models come with fewer limitations and threshold limits.

So I thought, why not give it a try. From my phone, I managed to put the site online in 10 minutes. Yes, just 10 minutes, and this includes the domain configuration.

> **Info**: Fun fact, I would have never thought that I would ever put a site online just from my phone. When I started creating websites, I had to upload all my files for hours over FTP. Indeed, FTP, because HTTP was the standard at that time.

All I had to do was link my GitHub project to Vercel. Tell Vercel which build commands it has to run and done.

{{< caption-new "/uploads/2020/08/vercel.png" "Vercel"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAAElSURBVDXBwW7aQBCA4X92xwvGLdBEShqqPkykvv+hl+bYhioXlILBxl4bz1Q+5PtkHEcPITBMRooBc+fYZe5XS2aTO26GiggOTIAhuIDGiIvwIUhAL+cLU+4ZgV4VJJK7Mz9fftFervz+u+fr7hs6mZFvA0bA3SjLkrfXP7wfDvxrWlIQqjKiIoLFxEID4tBdO94vDeuHJ6r7ieNhT6EB3WzWrAEXYd90fF8teH7+QUqJOo98Toqboe7O8XwihoBfT7z2zpdbyW3oSNUnTu6st3dozpnzsUZESEXB0A3YJvGw2zHLOSMxomGRWKxKgkPf91RVhapS1zVFURBjZKaK8PT4iCCICB/cnZmIYGbokDNN0zALIWBmbLdbRIS2bRERlssl/wHWGI26btvkVwAAAABJRU5ErkJggg==" "510" >}}

### Pro

- Free tier (which includes unlimited bandwidth - fair use policy)
- Simplicity
- Domain management - unlimited sites and domains
- Free SSL
- Deployments are not based on minutes like with Netlify, but on how many deployments you can do per day (100 for free tier)
- Simple deployments
- Great documentation
- Create APIs with functions
- Every build has a unique URL to test out changes

### Cons

- Deployments/builds are a bit limited, but you can extend things with GitHub actions for example
- No extra features
- No identity integration

> **Info**: check the Vercel [platform limitations](https://vercel.com/docs/platform/limits).

## Azure Static Web Apps

Azure Static Web Apps is the new kid on the block. Since the 12th of May, 2021, the service went from preview to general availability. 

Both Vercel and Netlify run within their application. Azure Static splits it up into two pieces. The deployments of your sites will run on GitHub Actions or Azure DevOps (currently in preview), and the site itself gets hosted on Azure. The great thing is that you can configure everything from the Azure Portal itself. For GitHub Actions the workflow file will automatically be configured for you and uses the [Oryx](https://github.com/microsoft/Oryx) system. 

> **Info**: The connection to GitHub is not an issue for me, but it might be for others. A good thing about this is that you can easily extend it. It requires a bit more knowledge as it is YAML-based, but is out-of-the-box more powerful than Netlify and Vercel.

With GitHub's Actions, you get a lot more power over the whole deployment pipeline. However, Oryx might be a black box, do not be scared by it. Oryx will automatically figure out which platform you use and do the builds according to your use.

A great thing about Azure Static Web Apps is their seamless integration with Azure Functions. Do you need an API? Add an API folder to your solution and initiate a new Azure Functions project. This approach is similar to that of Netlify and Vercel.

Overall the service is similar to the others mentioned but is a little bit harder to configure. If you are not familiar with Azure yet, there are many things to set before getting started. If you do, you get a lot of power in return. As there are so many options on Azure, and you can easily integrate other services.

One of the great things is that Azure Static Web Apps come in two plans. A free plan already comes with many great features like custom domains, SSL, managed API support and managed Authentication/Authorization. What was lacking during the preview was bringing your Azure AD App for authentication and leveraging the full potential of Azure Functions. This lack of functionality is now gone with the standard plan, which you get for $ 9 or € 7.6 per month.

In the free plan, you could only use the HTTP triggered Azure Function. With the Standard plan, you can bring your Azure Function app into the game. The same goes for authentication and authorization, you are not limited to the service-defined ones (Azure Active Directory, Facebook, Google, GitHub, and Twitter), but you can now bring your custom authentication. 

These changes makes Azure Static Web Apps a strong competitor against Vercel and Netlify.

{{< caption-new "/uploads/2020/08/azure-static-web-app.png" "Azure Static Web App"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABNSURBVE3BWQrDMBBEwdcjSzLG2/3vZwK5w6iNPgKp0vP5+tg6ta9MvVUkYZthGAYBcV87x3mCRCkFSUy2yUyGjYElczCtrfIvImgR/LwAKRho1f8SagAAAABJRU5ErkJggg==" "1399" >}}

### What I like

- Usage of GitHub Actions. Using GitHub Actions for the deployments makes them very powerful.
- Seamless integration with Azure Functions
- Globally distributed on the Azure platform
- Custom domain support 
- Authentication providers build-in. You can use Azure Active Directory, Facebook, Google, GitHub, and Twitter. The configuration is a matter of writing your website routes in a JSON file.
- Staging environments powered by Pull Requests

### Wishes

{{< blockquote type="Important" text="These were written when the service was in preview." >}}

As it is a preview, I am not talking about the disadvantages as things will likely change or get improved. Instead, this is my wishlist for the service:

- If you compare it to Vercel and Netlify, you will have to do many more configuration steps. It would be great if they would implement a similar experience in which you do not have to go to the Azure Portal. I would love to see a simplified configuration.
- At the moment, the Azure Static Web App has hidden away from all the standard functionalities which an Azure Web App or Azure Functions has. For instance domain management, or more details on the Azure Functions. I would love to get full control of the functions, but this might be what you have to deal with when choosing this service.
- Full Azure Active Directory integration or bring your Azure AD App. If you can link your Azure AD App to the site, it would mean that you can get full control over the authentication and authorization process.

{{< blockquote type="Important" text="It is great to see that two of my wishes became reality. The simplicity is still similar to what it was before. That is where Vercel and Netlify score a lot of points." >}}

## Conclusion

In the end, all three of the services provide the same things. It will be your choice to see the best fit to your site you want to host. If I have to choose, I would consider these questions:

- Want quick and easy hosting? Go for Vercel.
- Want extra features like Forms and Identity management? Go for Netlify.
- Already using Azure? Want full control over the deployments? Go for Azure Static Web Apps.


## updates

### 27/05/2021

The article was updated to compare Azure Static Web Apps with the newly released features.