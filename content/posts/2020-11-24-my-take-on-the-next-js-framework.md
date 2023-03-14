---
title: My take on the Next.js framework
slug: /my-take-on-the-nextjs-framework/
author: Elio Struyf
type: post
date: 2020-11-24T19:52:09.223Z
draft: false
tags: []
categories:
  - Development
  - WebDev
  - TypeScript
comments: true
---

Last week, just went I took my bike for a ride. I got an idea. What if I create a new store for selling online personalizable bike stickers? During the two-hour bike ride, I more and more got convinced of the idea. When I was back home, I started printing a couple of stickers to test it out. I showed it to a couple of people, and as the responses were positive, I knew that this would be a new side hustle under the [PimpYourOwnDevice](https://pimpyourowndevice.com) brand.

The store's idea would be that clients would create their own personalized sticker with their name and logo. I decided to go and make a website with React.

{{< blockquote type="Info" text="I do not limit it to only bikes, but just because I love cycling, this is my main focus." >}}

The result is this website - [https://pimpyourownbike.com]()

{{< caption "/2020/11/nextjs1.png" "PimpYourOwnBike"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAADgSURBVB3BTUrDQBiA4febTNpREEGEbAoiWkhuIHqC5HC6dNeVlxDxFi5FaP0hjajR1LaTZPIJPo9kx1MFQYR/SZLgW0/9VaOqiIkQEawAitKJxQyBZVmCwKAwRDGtRrh+g1WUOB5hxGCw+NZTFDlnF+cEhdHYcX11iTXjXU6yjIP9PVarX5ZvL6RpSl7keL/FOcfNbIZt1hvm8wWvbofQerbND92gyOabx+eK0AbW3YAVoPqsoX9nsDEm9Nze3fOweGLZfDA9PKIqS2QyOdVWBYPSI6iCs4agQAiIjSH0/AGzMmlsVeaOpAAAAABJRU5ErkJggg==" "1484" >}}

## Choosing the framework

A framework that was on my list to test out was [Next.js](https://nextjs.org). I already created a couple of websites with  `Create React App`, but sometimes it quickly gets very tricky. 

Like last time for the CollabDays Benelux event, I wanted to use Tailwind CSS.  Setting this up within the React app, without ejecting, was quite a challenge (in the end, I got everything up and running).

The thing that got triggered me to test out Next.js was the **Zero Config** setup. The last time when I saw this, it was from Jest and was right as well.

Next.js it would be, so time to start developing.

{{< caption "/2020/11/nextjs2.png" "Next.js"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAABgSURBVH3BsQqCUAAAwPM9kTTHQGyqaGzoK/p/XIX6BJWmcjFI0KXu/BGRm0Wc0OGMHUoMuKDCBn3AFRlqX0/ccMcbDx8BLQ7o0CLghdziGDGixx5bJGhQYMCI1EqBxA8TpqYQqTOe0EYAAAAASUVORK5CYII=" "400" >}}

## RTFM - Documentation 

Probably the thing most developers (including me) do not like to do. We immediately want to get our hands dirty. The start guide is excellent with that and quickly gets you started.

The documentation is very detailed and provided all the information which I required to build my website. The framework can be a bit overwhelming, as it comes with many features out of the box.

### What about Tailwind CSS?

Inside the documentation of their [built-in CSS support](https://nextjs.org/docs/basic-features/built-in-css-support) I found a reference to a GitHub sample project which shows how to use Tailwind CSS. 

{{< blockquote type="Info" text="the related project can be found here:  [https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss)." >}}

What I like about this approach is that it does not require any difficult configuration changes. Just used the typical way of using Tailwind in your project with PostCSS.

## Feature heavy, but still blazing fast builds

Do I need to say more? It is just fast. With all the magic that is happening behind the scenes, still, it can do builds in a matter of seconds.

Also, automated bundling and chuck creation is a pretty nice feature. Bonus points for the **zero config** setup.

{{< caption "/2020/11/nextjs3.png" "My Next.js config file"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABySURBVH3BQQrCMBCG0e8fU2isuBMEwRN4/wu5cicI2iaTjOQA+p6myy28VvZ5RiamKVFKJecZd8dr4/1ZSdE7w+E0g8S6dZZjxsygifJKLDkwyRgUoAgsYKegN6duTvOGopMgGB73J78UwCRjuJ4T/3wBjkYvYqBPNlMAAAAASUVORK5CYII=" "243" >}}

{{< blockquote type="Important" text="Even the scripts in `package.json` file kept unchanged." >}}

## The magic of `getStaticProps`

I love to use static site generators. When I started creating the website, I had to call an API to retrieve the latest data for the initial load. Just a small thing, but required each time. 

When I was reading the documentation, I found the `getStaticProps` static generation method. When implementing this method into your component file, you can provide static data for your component by fetching this data during the build.

In my scenario, while building the project, the API will get called, and the retrieved data will be provided to the component. Dynamically create static sites.

{{< blockquote type="Info" text="read more about the method: [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)" >}}

## APIs/APIs/APIs

What are you these days with a backend? Most of the time, you need an API to request data or store data. There are many different options. Typically I like to make use of Azure Functions.

Next.js provides a straightforward solution by allowing you to develop APIs just within the `pages` folder. Did I already say simplicity? I think that is another benefit of using Next.js. 

## Summing it all up

Here is my list or PROs:

- Simplicity 
- Routing is built-in and works excellent.
- Server-Side Rendering
- Speed, with such a heavy feature framework, the development does not feel heavy at all.
- Easy integration with PostCSS and Tailwind CSS.
- Less fiddling around with config files. The Next.js build automatically knows what it has to do. #Automagically 🦄
- `getStaticProps` - calling API on build or providing data to provide initial data for your component.
- Allows you to create APIs easily.

Probably you also want to know the CONs.

- You will need to create the APIs under the `pages` directory. It would make more sense for me to have them on the root level in an `API` folder.
- Relying on the structure of Next.js (opinionated), which is not necessarily a bad thing. Once you get started and your project grows, the more dependent you get on Next.js. The React app typically does not lock you in.