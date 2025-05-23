---
title: The challenges of migrating my Wordpress site to Hugo
slug: /the-challenges-of-migrating-my-wordpress-site-to-hugo/
author: Elio Struyf
type: post
date: 2019-08-29T20:55:34.216Z
draft: false
tags:
  - Static site
  - Hugo
categories: []
comments: true
---

After almost three years, I finally made my over to a static site generated by [Hugo](https://gohugo.io/). From the moment I started blogging in 2010, I used Wordpress. Wordpress was the best option back then. As the hosting company which I used only supported PHP, and I also got into coding by learning PHP when I was a student.

Over the years, my blog has moved from hosting company to hosting company, until I finally made the last move to Azure. Where it probably stayed for the longest time. The coolest part of hosting it on Azure was that I could integrate it with other services like Azure Search. I even made my custom Wordpress indexer which added/updated/removed articles when they were created/updated/deleted.

The most challenging part was the performance of the site. I wanted to make it as quick as possible. For this, I once even created my Redis caching system. Over time I removed it and started using WP Super Cache. This plugin did an amazing job, but still, a lot of files were loaded by plugins or the platform itself. For example, I wrote some code to block these files from loading and added the CSS and JS in my theme so that fewer files needed to be fetched. Still, that wasn't good enough and as a developer, you always want to try new things.

## The things I tried

Three years ago I started thinking about moving away from Wordpress. During these years I tried a couple of methods.

### First attempt

The first thing I tried was using Wordpress for only its CMS features and using Azure Search as my way of retrieving the date (in combination with my Azure Search Indexer). This was also a hobby project to get me to learn React. The POC I created is still online [http://js.eliostruyf.com/](http://js.eliostruyf.com/ "My blog driving by React and Azure Search").

> **Info**: Not sure why I never made the move over to this project with my blog, but I used the same approach for the [BIWUG](https://www.biwug.be) website.

### Static proxy

Another thing I tried was a static proxy. The idea was that I would create two sites. The first site would be driven by static pages, the other one would be the actual Wordpress site how it was before.

Besides these two sites, there would be an Azure Function that would clear all the HTML files from the live site, and generate new HTML files from loading the data from Wordpress. 

Insite the live site/proxy, I created a special 404 page that would first check if the page/data existed on the Wordpress site, and if it didn't, a real 404 response/page appeared. Otherwise, the user got the freshly generated HTML file.

> **Info**: I still have the POC for this somewhere, but eventually didn't use it because of some complexities like RSS/Sitemaps/...

### Static Wordpress

Wordpress has a couple of plugins to generate a static site. I have tried them all, but never got the result I wanted. Plus the generation process of the static files takes a lot of time. With my blog, it was almost 15-20min, and that on my laptop or Azure VM.

### Trying static site generators

The last year I tried a couple of static site generators like Gatsby (which is a great one if you like React), NextJS, and finally Hugo.

Eventually, I choose Hugo because of its simplicity in the configuration. My main criteria were to work with Markdown files and have a simple but powerful templating engine. Both of these things I found in Hugo.

> **Info**: I know that everyone will have its preference, so I'm not going to push you over to Hugo.

## The struggles of moving

Finally, when I decided that Hugo was the site generator which I was going to use, I started reading articles about how others have achieved it. In many of these articles, it felt like the only thing they had to do was export & import their data, set the theme and they were done. This wasn't the case in my migration.

Here are my thoughts and struggles of migrating from Wordpress to Hugo.

### Where to host?

This was probably the easiest one. As I wanted to use the Azure Storage static website in combination with Azure CDN for custom domain names. As I already used this functionality in the past for setting up a static site generated by MKDocs, I knew most of the steps of how this had to be achieved.

### Theme migration

When migrating to a new platform, it might also be the right time to use a new theme. As I'm still happy with my theme which I used on Wordpress, I wanted a platform on which I could easily recreate it. 

Hugo has a powerful templating engine, but it takes time to get into it. Luckily their documentation is fantastic, and by using some of the Hugo themes available as references, I converted my theme in no time.

> **Info**: The templating engine is also one of the key benefits of Hugo. I was already far with the development of my theme in Gatsby, but creating the theme for Hugo was eventually much quicker.

### Migrating the content

The content, one of the key things and also one of the things that worried me the most. I had to migrate 323 posts. Exporting the content from Wordpress is simple, but converting it to a format which is usable by the new platform isn't. The most challenging part of the content conversion was going to be the code blocks. Over the years I think I used three different plugins on Wordpress for syntax highlighting and each time I switched, I had to do a MySQL query to update the HTML of the old code blocks to work with the new one. So I was prepared for the pain ☺️.

Luckily another benefit of Hugo is the migration paths it provides. They have a couple of possibilities for migrating/converting your Wordpress content over to Hugo.

During my migration, I used the [wordpress-to-hugo-exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter) plugin. Unfortunately, the markdown it gave me was bad. For example, for my images, I used Wordpress captions, and they were converted in a nice way which meant a lot of manual work.

Example:

```html
<figure id="attachment_8" aria-describedby="caption-attachment-8" style="width: 300px" class="wp-caption aligncenter">
  [<img class="size-medium wp-image-8" title="SharePoint Sticky Footer Example Image" src="https://www.eliostruyf.com/wp-content/uploads/2010/08/footer1-300x218.jpg" alt="SharePoint Sticky Footer Example Image" width="300" height="218" />][1]
  <figcaption id="caption-attachment-8" class="wp-caption-text">Footer on a OOTB Team Site</figcaption>
</figure>
```

In each figure, I had to remove the `[]`, and create the file link myself. As this was to much work for 323 posts, I looked for another solution.

The solution I found was a [Wordpress to Markdown script](https://github.com/ytechie/wordpress-to-markdown). Still, the markdown it generated was not ideal but was already a lot better and more consistent.

Example of the same exported image:

```html
[caption id="attachment_8" align="aligncenter" width="300" caption="Footer on a OOTB Team Site"]
  [![SharePoint Sticky Footer Example Image]
  (https://www.eliostruyf.com/wp-content/uploads/2010/08/footer1-300x218.jpg "SharePoint Sticky Footer Example Image")]
  (https://www.eliostruyf.com/wp-content/uploads/2010/08/footer1.jpg)
[/caption]
```

In my Hugo theme I created a shortcode which only needs the image URL and alt description to render the actual figure HTML output. This is what it looks like:

```go
< caption "uploads/2010/08/footer1.jpg" "Footer on a OOTB Team Site" >
```

Besides the images, all the code blocks had to be updated to use the Hugo code block syntax. These changes had to be done for all 323 posts. 

The first 10 posts I did took me about 5 minutes each to get them I wanted it to be. What I also saw was that Wordpress generated a lot of unnecessary `span` elements and sometimes even `span` elements with inline CSS. So to make my life easier, I wrote a quick and dirty VSCode extension which did the following things:

- Remove all the unnecessary HTML elements
- Add extra line breaks where needed. In most of my markdown files, there was no line break after a list. Which meant that all paragraphs that started after the list, were part of the last item of the list.
- Update all images to use my custom image shortcode
- Update all the code blocks
- Update all Github Gist script elements to the Gist shortcode of Hugo
- Fix markdown of quote blocks

This VSCode extension saved me a lot of time. What took me first 5 minutes per post, eventually went to only 10 seconds (run the command, scan if everything is ok).

Another thing which helped me during the theme migration was an element which I added at the top of my post to navigate to the next page and the original page on Wordpress. This way I could easily compare both pages.

{{< caption-new "/uploads/2019/08/migrate-to-hugo1.png" "Example of the next and original page navigation"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA7SURBVF3BSw5AUBBFwdOvPy9i/2s0YygR7TJWZdt+iE+GY2ZIwsfgkUAgREUQV99kJmc3SxXrnPy5GS8DPRMJfcGqOQAAAABJRU5ErkJggg==" "782" >}}

### Comments

Not an issue on my end as I'm using Disqus, so I didn't have to do anything but configure my Disqus ID and all was fine.

> **Info**: Depending on which platform you are using, this could be a bit more difficult.

### Contact form

For the contact form, I was using a plugin from Wordpress itself. When going static, this is not something you could use anymore. As an alternative, there are a couple of free to use form services which you can integrate on your static site. On my end, I went for the development path and created my custom Azure Function.

### Searching your content

Like already mentioned, on Wordpress, I used Azure Search with my custom indexer. On my new site, I also wanted to make use of this functionality. The only thing which I had to recreate was the indexer and this cost me almost no effort, as all I had to do was to use one of the available Azure Search Blob Indexers (less code to maintain). 

> **Info**: Maximilian Melcher already wrote an article about it how you can set it up if you are interested in it: [Setting up Azure Search for Hugo](https://melcher.dev/2019/03/azuresearch-and-hugo-free-and-awesome/).

Once the new indexer was created, all I had to do was copy my old AngularJS script (I know, I know) over to my search page and done.

### Ready to go live

Once I had everything in place, it was time to go live. I created an Azure Storage Account, pushed my files (via Azure DevOps), created my CDN with a custom domain and the waiting game could begin.

{{< caption-new "/uploads/2019/08/migrate-to-hugo2.png" "Waiting for the SSL provisioning on the CDN"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABVSURBVH3BMQ4CMQxFwfdXdhyLivtfMKKhitLZKwo6xIzWWp2ZuDuZyS/v88Iigr0313VRVUhCEnNOvrqfWETg7nxIoqqQxDmH7kYSDw9MEmbGGIN/blcIGDwzeBtmAAAAAElFTkSuQmCC" "681" >}}

This process takes between 6-8 hours. All you can do during these hours is ... waiting ... and pressing `f5`. Once the SSL certificate is deployed, the waiting game is over and you can finally check out your site. 

Which unfortunately didn't render as expected for everyone.

{{< caption-new "/uploads/2019/08/migrate-to-hugo4.png" "No styles loaded"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAADaSURBVI3BwU6DQBRA0fseE8CQoYkmJJ0uXNCf6P8v+g+uMI02XRgxTYvA9KFuTaWeI89PB0MQ5xKWj/eICFdMrnzIxWxCBIZhIMsyrhB9/3jj/Hmk8HfMcSEE0jRFRJijMUZEhFuUf9Ku6zAzblHvPcf2zDhG5miMkZfXkd2uY45+QxJl6A2zib+4PM9ZLh2Xy4QZqHKV2263/CjLkqbpiTHS9z3ee5Ik4XQ6UVUVulqtaNuWLMswM0SEEAIiQlEUbDYb6rrG7ff7qa5raZqGxWKBqrJer/ll+gKcCVJ5DW7M4AAAAABJRU5ErkJggg==" "352" >}}

I checked it myself via various browsers, VPN connections, Azure VMs, ... Until I saw this appearing:

{{< caption-new "/uploads/2019/08/migrate-to-hugo5.png" "The account being accessed does not support HTTP"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA6SURBVD3BwQGAIAwEwSUEPOm/TkHiP750pqx1ZzxBAaQTq0ZmUs3I5OfSwZwX7k7EpveOJFprjDH4vOh7EfEhQ9AFAAAAAElFTkSuQmCC" "569" >}}

Searching the www the only thing I found was that there is an issue on Azure CDN with custom domains and SSL if you used the Akamai tier. That was, of course, the one I was using, so to give it a try, I removed my CDN, and created another one for which I used Verizon this time.

{{< caption-new "/uploads/2019/08/migrate-to-hugo3.png" "Again the waiting game started..."  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAnSURBVGN88+bNf15eXgZWVlYGGPj+/TsDBwcHAwh8//6dgZmZmQEA5PQJ5pVQ3sYAAAAASUVORK5CYII=" "1046" >}}

The next day, the site was live, but still, the same issue appeared. After fiddling with a lot of settings, I suddenly thought of the CDN caching options of Cloudflare (which I use for my DNS).

{{< caption-new "/uploads/2019/08/migrate-to-hugo6.png" "Cloudflare caching"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABfSURBVDXBMQ7CMAxA0W87lpKxUxlYEZyg6v0nrsDUtUiZmDIEFzL0Pam1HqUU3B1RJZlx+kYwCJD+aK3Re0dEcHcGM+P52tneHx7XiZRzJiIwM1SVk6qy3i8st5kD+AFBuxeqNvtPkQAAAABJRU5ErkJggg==" "1037" >}}

Once I purged the cache from Cloudflare all was working correctly, so it appeared that it had already cached responses from when the SSL provisioning was going on. During that time, my site was not available. So if you go through the same process, don't forget to push this purging button before you yell that your site has been moved.

> **Info**: A couple of good articles if you want to make the move yourself are the ones that Andrew Connell wrote:
> 
> - [Hosting Hugo on Azure](https://www.andrewconnell.com/blog/hosting-hugo-on-azure/)
> - [Automated Hugo Releases With Azure Pipelines](https://www.andrewconnell.com/blog/automated-hugo-releases-with-azure-pipelines/)

### Extra: Maintain your articles

When stepping away from a CMS, but it also offers a lot of useful things like taxonomy management. To make my article creation easier I created a new VSCode extension [Front Matter](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter) which you can use for various static site generators. Currently, the extension mainly focusses on managing your article taxonomy like:

- Inserting tags/categories
- Creating new tags/categories
- Exporting all known tags/categories
- Remapping a tag/category in all articles
- Removing a tag/category from all articles

That was it. The site is now live for almost one week, and everything seems to be working nicely. If you have any questions, feel free to add a comment.
