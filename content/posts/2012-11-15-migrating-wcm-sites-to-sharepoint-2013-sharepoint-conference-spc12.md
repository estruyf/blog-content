---
title: Migrating WCM Sites to SharePoint 2013 (SharePoint Conference – SPC12)
author: Elio Struyf
type: post
date: 2012-11-15T19:45:10+00:00
slug: /migrating-wcm-sites-to-sharepoint-2013-sharepoint-conference-spc12/
dsq_thread_id:
  - 3929338231
categories:
  - Branding
  - SharePoint 2013
  - SPC12
comments: true
---

In this session we will discuss upgrade and migration strategies for taking an existing SharePoint 2010 WCM internet site and moving it to SharePoint 2013 &#8211; while taking advantage of the new features and capabilities for building web sites. We will demonstrate the common steps needed for migrating a site from 2010 to 2013 and provide a hand on demos for different site migration options.

Israel Vega gave this session

## Summary

### Common Internet site customization groups

  * UI and Branding
  * Rollup and syndication
  * Platform consolidation
  * Extranet and secure collaboration
  * Design tool support
  * Design manager
  * Custom 404 pages
  * Snippet gallery
  * Clean URL
  * And a lot more

### New Internet site specific features

### Internet site migration related features

Claims based authentication

  * Move to windows claims

Search

  * You will need to rebuild your search experience

SPD Design view removed

No in-place upgrade

Web analytics

Workflow

### Why do you want to move?

Better neighborhood > new platform.

Outgrew the space > feature removal / upgrade

Inspired by a new space > UI/UX/IA redesign

### Before you move

Why you are moving? Motivation!

What are you moving? Inventory your stuff > count sites and content

### Identifying your move type

  1. Existing to new
  2. Existing to new + > I want to be more than just new, add new features to your site
  3. New from existing > content migration
  4. New > create a brand new site

These four scenarios all start from a different perspective.

### Obtain your “moving supplies”

  * WSP’s and source code
  * Wireframes and design
  * Content

_Note:_ find a good partner that knows how to move, and where you could rely on during the move of your sites.

### Upgrade site collection

You now have two hives installed on your server:

  * 14 hive
  * 15 hive

When you are moving your sites, nothing will break.

### Upgrade Master Page to SP2013

Your old master pages will not directly work on your new site, you will need to upgrade them and tell SharePoint that it is a “15” version master page.

New markup for Master Pages

  * CS: start > Lets the start of the markup know to the parser (Comment Start)
  * SPM: SharePoint markup
  * MS / ME: Markup start / end
  * CE: end > Lets the end of the markup know to the parser (Comment End)

The Master Page Gallery can be connected to your desktop via WebDAV. This means that it will also work for other platforms, read Apple Macs.

### Tips

  * Inventory the placeholders in the MP
  * Create a new 15 “dev temp” site collection
  * Copy your site assets
  * Search 
      * Enable the search center template
      * Create a new search center > like in SP2010
      * Enable publishing
  * Update MP and Page Layouts 
      * Map the snippets
  * Reset Master pages (test)

### What if I don’t move to the HTML design model?

How do I deploy and manage design assets?

How do I manage design assets?

You will need to do a lot of manual steps like you were doing in SP2010.

### Enabling managed navigation

  * Friendly URLs AKA FURLs
  * Add a tagging term set to your content types
  * Create a term set for your site and attach it
  * Create your terms and category pages (optional)

_Upgrading the MMS Database_

This can be done via PowerShell

_Upgrade the Navigation Control_

New data source needed for your navigation control

### Creating a navigation term set

  1. Create a term set
  2. Set the term set that it can be used for navigation
  3. Term-Driven Page with Friendly URL
  4. Change target page URL

### Dealing with post migration stress syndrome J

Will people find us?

  * 404, 301, 302, SEO? What you can do is add a old URL to the pages, and if the someone uses the old URL of the page, the user gets redirected and a web part on the page can be created to find the new URL that matches the old URL metadata.
  * Broken links, orphaned content

Did we do the right thing?

  * Performance
  * Statistics and Ratings

Where can we reduce the stress?

  * User information, passwords, profiles
  * Cutover and content lockdown

### Considerations

  * Update your WSP’s and deployment 
      * Don’t undo your changes
  * What about apps?

### Configuring the publishing cache accounts

For windows and SAML Claims, this must be configured for publishing sites

### Integration technique-Use cross site publishing (XPS)

  1. If you don’t have MMS fields in SP2010 > Add managed metadata field for tagging
  2. Tag content
  3. Activate XPS
  4. Publish
  5. Full Crawl
  6. Build a rendering site
  7. Consume

### Summary of the Summary: Steps to move your SharePoint sites to 2013

Phase 1: just move to SP2013

Phase 2: Enable new SP2013 features

Phase 3: new user interface redesign