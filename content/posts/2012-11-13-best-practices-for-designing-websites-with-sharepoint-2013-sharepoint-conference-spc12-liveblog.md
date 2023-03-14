---
title: Best Practices for Designing Websites with SharePoint 2013 (SharePoint Conference – SPC12)
author: Elio Struyf
type: post
date: 2012-11-13T18:17:23+00:00
slug: /best-practices-for-designing-websites-with-sharepoint-2013-sharepoint-conference-spc12-liveblog/
dsq_thread_id:
  - 3852946437
categories:
  - Branding
  - SharePoint 2013
  - SPC12
comments: true
---

A deep dive on new features and capabilities that now allows designers greater flexibility for creating great looking web sites with SharePoint 2013. We will cover the new design manager, support for HTML editing tools, mobile channels, imaged and video renditions, SEO friendly site maps/URL&#8217;s and more.

This session is given by Alyssa Levitz, Ethan Gur-esh.

Sorry there internet connection wasn&#8217;t working during this session. Here is my summary:

## Summary

**Why developers / devs will love SP2013?**

  * Any web designer and developer can easily style & brand an SP2013 Publishing site
  * &#8220;Under-the-hood&#8221; platform investments that make SharePoint WCM much better

**Markup improvements**
  
Better markup, means better SEO.

_Which improvements?_

  * No more tables for web parts & zones!
  * Client-side rendering (AJAX) for Content Search WP
  * CSS completely re-written & simplified

_How much better is &#8220;better&#8221;?_

  * W3C HTML markup validator errors
  * SharePoint.Microsoft.com: 138 errors
  * SP Online Public Website: 19 errors
  * Contoso Electronics: 13 errors
  * Mavention.nl: 0 errors (Nicely done)

**SEO**

  * Clean URLs 
      * &#8220;/Pages&#8221; is removed from the URL
  * Country code top-level domains 
      * http://c.com/cars
      * http://c.be/cars
  * XML Sitemaps 
      * These are automatically generated and referenced in robots.txt
  * SEO properties 
      * You can set SEO properties per page
  * Webmaster tool integration

**Designing your web site in SharePoint 2010**
  
There was a brick wall between the design compositions and the SharePoint Design itself.

**Designing your web stie in SharePoint 2013**
  
Build your design compositions and upload them to SharePoint. The design composition get automatically converted and you can add controls via the snippet gallery.

_Design manager steps:_

  1. Upload your design files
  2. Convert the HTML file you have uploaded
  3. Check the preview of the converted HTML file 
      1. Preview Page allows you to test your design against an existing page (fill in a URL of a page).
  4. Go to the snippet gallery to find the controls that you can use in your design
  5. Configure your controls and copy and paste them to your design file
  6. When you are done, publish and apply the design to your site

The same steps can be done for creating page layouts. Designer don&#8217;t need to learn SharePoint controls anymore, the needed controls are automatically added to the generated page layout.

The snippets for page layouts are different than the one for master pages.

Web parts can automatically be configured in the snippet manager and copied to your design files.

Web designer and developer experiences

  1. Get your content: Cross-site collection publishing
  2. Convert your HTML design
  3. Create page layouts and use content search web parts

**Mobile Device Targeting**
  
Devices matter: it&#8217;s a mobile & touch-enabled web now.

_Device channels:_
  
Control experience based on user agent strings.

  1. Differentiate design with separated master pages: ex. account for different screen resolution
  2. Target content with device channel paths: test your channels

_Image Renditions:_
  
Multiple sizes, aspect ratios, and crops… But you still have one image. Image Renditions works with URL query string variables.
  
You can manually crop images also for existing renditions. This allows you to overwrite the default rendition if you are not completely satisfied with the result.

_Device Channel panel snippet:_
  
This allows you to have content targeted to a specific channel. For example: you can set the correct URL query variable for the mobile image, and the default one for the desktop version.

Debugging your device channel can be done by adding a URL Query Variable to your URL &#8220;?DeviceChannel=Name-of-your-channel&#8221;.

**Moving your design to another site**
  
Go create a package via the design manager and upload it to the production site again via the design manager.
  
Channels, Page Layouts, Master Pages, CSS, … everything gets packaged and re-created where the package is uploaded.