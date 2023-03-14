---
title: 'People Search & Extensibility in SharePoint 2013 (SharePoint Conference – SPC12)'
author: Elio Struyf
type: post
date: 2012-11-14T16:47:11+00:00
slug: /people-search-extensibility-in-sharepoint-2013-sharepoint-conference-spc12/
dsq_thread_id:
  - 3836444913
categories:
  - Search
  - SharePoint 2013
  - SPC12
comments: true
---

<div id="sessionBiography">
  <p>
    Learn about People Search capabilities in SharePoint 2013, and how to leverage external content sources (LOB) to create custom experiences based on user profile properties. Finally, learn how to deliver a user context aware personalized search experience.
  </p>
</div>

This session was given by Sana Khan, Mikael Svenson

## Summary:

**People are the real value of your organization**

People are being treated as first class objects in SharePoint 2013.

People search introduces a new feature set in SharePoint 2013.

When searching for people result blocks can be shown based on written documents or other things. Search will not only look at people properties, but check what people have done in the past.

Search features:

  * People as **first class objects** in enterprise search**
  
** 
  * **Expertise search** now based on authored content
  * **Smart matching** on location and phone number
  * **Robust and complete** name search solutions 
      * Fuzzy and fanatic matching has been involved
      * Introduction of name suggestions

**Extending people search**

Data can be stored outside of SharePoint:

  * Structured data in HR, CRM, SAP solutions
  * Unstructured data in file shares

**Enriching people content using BCS**

BCS can be used to enrich your people search. By using BCS you can extract data from various systems like for example a CRM system.

BCS can now use OData and REST data sources, but the external content types can only be created via Visual Studio.

Load data in via OData in search:

  1. Create a BCS external content type via Visual Studio
  2. Upload the BCS files to Central Admin BCS Service
  3. Crawl your BCS data source
  4. Link the crawled data to the User Profile Service
  5. Setup the property mapping
  6. Setup a new query rule on the site collection 
      1. By doing this you can set promoted result blocks
      2. The last thing is to customize the hover panels for the result blocks

&nbsp;

**User context for customizing enterprise search**

Putting you in the middle. Content closer to you is likely to be more relevant.

Find content closer to you in the organization:

  * Based on organization structure
  * Based on who you follow
  * Based on sites you follow

Turn business rules into queries.

Social features will help you find documents from people you are following. What it means is that it finds content that is closer to you.

**SPSocialFollowingManager** is a new class that helps you find followers.

Session take aways:

  * Make users **more productive** by the new experiences
  * It is easier to **customize and personalize**
  * People search in SP2013 is powerful