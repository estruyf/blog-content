---
title: 'Step by Step: Search Development in SP2013 (SharePoint Conference – SPC12)'
author: Elio Struyf
type: post
date: 2012-11-14T19:49:09+00:00
slug: /step-by-step-search-development-in-sp2013-sharepoint-conference-spc12/
dsq_thread_id:
  - 3837303451
categories:
  - Search
  - SharePoint 2013
  - SPC12
comments: true
---

Come on a tour of the common development tasks needed to take advantage of the full power of SharePoint 2013 Search.  Ingest content from external sources via the BCS.   Enhance content prior to indexing via Content Enrichment.  Pinpoint relevancy with contextual targeting with Query Rules.  Leverage the Search Client Object Model to power search driven applications.  Make the most of the new Keyword Query Language improvements.  Customize the UX and make your search results shine!

Matthew King, Andrew Wardly gave this session.

## Summary

### Content Acquisition

#### Search Management

Central admin is great, but it is not repeatable > PowerShell is!

Scripts are available at TechNet Script Center: <http://technet.microsoft.com/en-us/scriptcenter/bb410849.aspx>

#### Optimize BCS for search

  1. Enable full search experience 
      1. Mark the source as search enabled > ShowInSearchUI
      2. Document contents > StreamAccessor
      3. External URL > DisplayUriField
  2. Plan for volume 
      1. Paging results > batching cookies
      2. Only return the data needed > finder method only needs document ids
  3. Plan for changes 
      1. Implement incremental changes

#### Content Enrichment

Web service callout: Service lives outside of SharePoint configuration.

SharePoint 2013 Search Query Tool: <http://sp2013searchtool.codeplex.com/>

Use this tool to test out and debug search queries against the SharePoint 2013 Search REST API.

### User Experience

#### Refiners

New refiners

  * Sliders
  * Slider with bar graph
  * Multi-value

Sliders: only available for integers managed properties.

#### Display templates

  * New to SP2013
  * Start with design manager
  * SP Designer 2013 doesn’t support “design view”
  * Work with HTML, the “JS” file is automagically created

#### Hover Panels

New functionality, customize by copying an existing one.

#### Search refiner creation

  1. Go to search center
  2. Open the page in edit mode
  3. Edit the refiner web part
  4. Add your new refiners 
      1. Per refiner you can choose what the refiner display template is
      2. With sliders you can set your own interval value
  5. Store the changes

#### Result block creation

  1. Create a result source
  2. Create your design files 
      1. Item_<your-name>.html
      2. Item\_<your-name>\_HoverPanel.html
  3. Create a result type 
      1. Select the display templates you have created
  4. Create a query rule by creating a new rule in the manage query rules settings on the site 
      1. What this does is it allows you to search you content in another data source, for example a BCS source.