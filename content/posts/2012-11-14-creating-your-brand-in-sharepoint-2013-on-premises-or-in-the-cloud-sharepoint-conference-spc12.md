---
title: Creating Your Brand in SharePoint 2013 On-Premises or In the Cloud (SharePoint Conference – SPC12)
author: Elio Struyf
type: post
date: 2012-11-14T19:38:37+00:00
slug: /creating-your-brand-in-sharepoint-2013-on-premises-or-in-the-cloud-sharepoint-conference-spc12/
dsq_thread_id:
  - 3836445724
categories:
  - Branding
  - SharePoint 2013
  - SharePoint Online
  - SPC12
comments: true
---

The process of building, branding and delivering a well-designed web site is more than just skin deep. In this session we will walk you through best practices for planning, creating and deploying engaging web sites with SharePoint 2013 for both on-premises installations as well as SharePoint Online. We will also share best practices around the branding process with lessons learned from real world SharePoint branding projects. Whether you are an administrator, developer, manager, or someone else who just wants to make your SharePoint site look better - this session will leave you with the resources to get your branding project off to a good start and the guidance to make it all the way to completion!

Randy Drisgill, John Ross, gave this session

## Summary

### Introduction to branding

_Branding through the ages_

It all started with ranchers branding their cattle. This moved to being a symbol of quality.

_Website branding:_

The colors, fonts, logos, and supporting graphics that make up the general look and feel of a corporate website.

_Branding for SharePoint_

Master pages, page layouts > SharePoint specific elements

### Approaches to Branding SharePoint 2010

_Full effort_

Custom master pages, page layouts, XSLT

_Medium effort_

Custom CSS

_Low effort_

Page editing & themes

### Approaches to branding SharePoint 2013

_Full effort (stayed the same)   _

_Medium effort (a lot more functionality in SP2013)_

Design manager for publishing site

Custom CSS & background images

_Low effort (stayed the same)_

## Low effort branding

**Page editing is simular to 2010**

*   Windows 8 style icons
*   Easy page editing / linking
*   Add images, video, WP, and App Parts easily
**Team Sites**

*   Text layouts > quick prebuilt layouts
*   Collaboration focused
**Publishing Sites**

*   Customizable page layouts instead of text layouts
*   Communication focused

### Composed Looks

Themes in 2010 weren't very much used.

In SP2013 you have composed looks, which works more like Wordpress themes (not completely).

Composed looks are NOT created in the Office Clients. Everything is defined in XML files.

Note: making your own composed looks will require you to create a preview file.

## Medium Effort Branding

### Design Manager

*   Ease of Branding & design was a big feature in SP2013
*   Available in **SharePoint Server** for sites with **Publishing activated**
*   The hub for many new design features in SharePoint 2013
*   It is available from the site menu actions

### Common Design Tools

SharePoint Designer is no longer the only choice!

*   Still available if you are most comfortable with it
*   Warning: SharePoint designer lacks the design view
Map a drive to the site > Master Page Gallery and edit away

Use any tool you like to edit code:

*   Notepad++
*   Expression web
*   Dreamweaver

### HTML based Master Page & Page Layouts

Both Master Pages & Page layouts can now be edited in HTML

Design Manager can create a new minimal master page or page layout

### Snippet gallery

This provides a set of common snippets / SharePoint controls that you can use in your master page and page layouts.

### Create / Import Design Packages

Design manager can automagically create design packages!

Can be easily imported into another site even on a different farm

Creates a simple sandbox solution

Design manager **import is per site collection**, this means that you would have to manually apply it on each site collection.

### CSS

CSS used to override default SharePoint branding

Custom CSS options

*   CSS applied to a page with script editor web part
*   CSS applied to a custom master page
*   Using the alternate CSS feature of publishing sites

    *   Must activate the publishing features or create a publishing site

### CSS Tools

*   CoreV15 has even more lines of CSS
*   IE F12 Developer tools and / or **Firebug for firefox** (my preferred tool)
*   Highlight elements in the browser and see..;

    *   What style is being applied to the HTML element
    *   How CSS classes are overriding each other

*   Immediately see impact of changes

## Planning for Full Branding

[![Design considerations SP2013](/uploads/2012/11/A7rmfIECQAQnOO_.jpg_large-300x224.jpeg "Design considerations SP2013")](/uploads/2012/11/A7rmfIECQAQnOO_.jpg_large.jpeg)

1.  Vision & goals requirement
2.  IA / taxonomy / wireframes
3.  Create design
4.  Build HTML and CSS
5.  Create SharePoint Branding
6.  Create Rollups / custom dev.
7.  Test
8.  Create solution package
9.  Deploy to production

### Custom Master Pages

*   Use a starter master page: [http://startermasterpages.codeplex.com](http://startermasterpages.codeplex.com)
*   Similar to using design manager

    *   Create a WSP via Visual Studio
    *   Content Search Web Part

            *   Similar to CQWP but based on SharePoint search
        *   Catalogs for products

### WCM Features

*   Content Search Web Part

    *   Similar to CQWP but based on SharePoint search

*   Catalogs for products

## SharePoint Online Branding

The public facing website in SP Online is different, and now has new powerful features.

All Office 365 plans include one Public Website