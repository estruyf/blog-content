---
title: Creating Custom Refiner Control Display Templates for SharePoint 2013
author: Elio Struyf
type: post
date: 2013-10-17T20:26:54+00:00
slug: /creating-custom-refiner-control-display-templates-for-sharepoint-2013/
dsq_thread_id:
  - 3836805197
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - HTML
  - JavaScript
  - Search
  - Search Center
comments: true
---

As you may already know and seen, there has been quite a lot of improvements to create or change UI elements from SharePoint 2013, especially UI objects of search.

A topic that I wanted to blog about for quite some time now (first time I started this post was in April) will show you how to create your own custom refiner display templates.

Configuring these refiners can be configured by some clicks in the SharePoint Search UI and is described multiple times now on blogs ([Step by Step configuration to Add custom Refiners in the Refinement Panel of Search Results page for SharePoint Online](http://blogs.technet.com/b/sharepoint_made_easy/archive/2013/03/19/step-by-step-configuration-to-add-custom-refiners-in-the-refinement-panel-of-search-results-page-for-sharepoint-online.aspx)).

In this blog series I'll explain the creation process of refiner controls. This creation process has improved in comparison with SharePoint 2010. Refiner controls in SharePoint 2013 make use of Display Templates, no more XML editing. This means that you can create your own refiner controls with just some HTML and JavaScript mark-up, but some knowledge and default mark-up is required to create these templates.

I'll try to describe my creation process in this series. I split the creation process in different topics:

*   [Part 1: Create your first search refiner control template](https://www.eliostruyf.com/part-1-create-first-search-refiner-control-template/ "Part 1: Create Your First Search Refiner Control Template")
*   [Part 2: Adding Refinement Actions to the Custom Search Refiner Control](https://www.eliostruyf.com/part-2-adding-refinement-actions-to-the-custom-search-refiner-control/ "Part 2: Adding Refinement Actions to the Custom Search Refiner Control")
*   [Part 3: Working with File Types in the Search Refiner Control Template](https://www.eliostruyf.com/part-3-working-with-file-types-in-the-search-refiner-control-template/ "Part 3: Working with File Types in the Search Refiner Control Template")
*   [Part 4: Create a dropdown refiner control](https://www.eliostruyf.com/part-4-create-dropdown-search-refiner-control/ "Part 4: Create a Dropdown Search Refiner Control")
*   [Part 5: The Search Refiner Control Methods Explained](https://www.eliostruyf.com/part-5-search-refiner-control-methods-explained/ "Part 5: The Search Refiner Control Methods Explained")
*   [Part 6: Create a Multi-Value Search Refiner Control](https://www.eliostruyf.com/part-6-create-multi-value-search-refiner-control/ "Part 6: Create a Multi-Value Search Refiner Control")
*   [Part 7: Working with Ranges in the Search Refiner Control](https://www.eliostruyf.com/part-7-working-ranges-search-refiner-control/ "Part 7: Working with Ranges in the Search Refiner Control")
