---
title: 'Step by Step: Building Search-Driven Applications in SharePoint 2013 (SharePoint Conference – SPC12)'
author: Elio Struyf
type: post
date: 2012-11-14T17:22:00+00:00
slug: /step-by-step-building-search-driven-applications-in-sharepoint-2013-sharepoint-conference-spc12/
dsq_thread_id:
  - 3836445575
categories:
  - Development
  - SharePoint 2013
  - SPC12
comments: true
---

Search-driven solutions are applications that use a search engine to drive the data access and results presentation. Simple examples of such applications include image or travel searches in Bing. Microsoft SharePoint 2013 offers developers new ways to extend search to create search-based solutions and Apps. In this session, we will build a Search-driven SharePoint app that allows a law firm to manage proposals, people, offices, and experiences. The app will auto-provision components in Azure, and use the CSOM/REST API to access SharePoint Search across databases and document libraries in Office 365. Additionally, we will present a mobile companion app for searching the data. Attendees will exit the session with a strong understanding of search-driven solutions and many new ideas for using search to deliver end-user productivity.

Scot Hillier gave this session.

## Summary

### **Search overview for developers**

Data access technologies:

*   <span style="text-decoration: line-through;">CAML and SPQUERY (server side code)</span>
*   <span style="text-decoration: line-through;">LINQ (server side code)</span>
*   <span style="text-decoration: line-through;">CAML and SPSiteDataQuery (server side code)</span>
*   CAML and CSOM
*   REST
*   Search

The first three will be less used because we are moving to apps. The first three cannot be used in apps, because they are server side actions.

CSOM is used by:

*   No-code solutions
*   Search Center
*   Topic pages

**Search building blocks**

Managed properties:

*   Mapped to crawled properties

    *   Search service application
    *   Site collection

*   Site columns become managed properties

    *   Publishing and multiple lines prefixed with ows_r_<four-letter-code>
    *   Managed metadata prefixed with ows_taxId
    *   All others ows_q_<four-letter-code>

Managed properties now have properties:

*   alias: friendly name
*   multi-valued: managed property can have multiple values
*   queryable
*   refinable
*   retrievable
*   searchable
*   sortable
*   type: the data type of the managed property

Keyword query syntax

*   Keyword query language

    *   Property restrictions
    *   Boolean operators
    *   Wildcards
    *   XRANK: allows other results, but boosts the ones you care about
    *   NEAR, ONEAR
        *   NEAR: does not preserve the order between the terms. So this will bind SharePoint Apps
        *   ONEAR: preserves the order of the terms. So switching "Application" and "Identity" will return different results.
    *   WORDS
            *   This allows for the definition of synonyms

Search is a data driven access application.

No-code solutions:

*   Creating a list with links:
    *   Results for user tasks
    *   Results for corporate events

WORDS example query: WORDS (rest, representational state transfer) > it says that these words are the same

Building blocks:

*   Result sources
    *   Analogous to federated locations or scopes
*   Query rules
    *   Alters query under given conditions
            *   Example the keyword deck is interpreted as PowerPoint
*   Result types
    *   Determines how results are displayed
            *   Bringing back a event, task, ...
*   Search navigation
    *   Tabs for navigation search verticals

Result sources
*   Select a source
*   Apply a query transformation

Query rules

*   Applied to a given result source
*   Processed under specified conditions
*   Affects the query results

Result types

*   Bound to a given result source
*   Defined by a rule
*   Associated with a template for display
    *   Hover panels
    *   Determines how result type appears
    *   Created as an HTML file referencing Managed Properties

Export/import search settings

*   Configuration export
    *   SearchConfiguration.xml
    *   Handles rules, sources, managed properties, etc.
    *   Does not handle mater pages, templates, and web parts

*   Configuration import

    *   Import into site, site collection, tenancy
    *   Programmatically import with app

This functionality is really powerful. Now you do not have to write out how people need to implement your solution.

**No-code custom search**

Examples:

*   Links with pre-defined queries
*   Extend the search center
    *   My events
    *   My tasks
    *   My teams
    *   My portals
    *   My documents
*   Utilize the Content Search Web Part

Content Search Web Part can use result sources to retrieve results.

_Result source is a sub-set of the entire index you want to search._

Example of result source for My Events:

`{searchterms} contentclass=STE-ListItem_Events calenderEventDate>{Today-30}`

`{searchterms}=whatever the user typed in`.

Extending the search center can be done by adding pages, and set the predefined query to the search results web part.

Display template (master pages gallery > display templates > search):

TargetControlType: SearchResults > this specifies that the template can only be used for search results.

_Query Rules for what can you use it?_

If a user searches for training, you can create a extra rule so that search will query a list with all trainings. The link to the list can be specified like this: `Path:"URL-to-list"`.

**REST and CSOM**

This is the search access for any technology. Search provides you a REST and CSOM end point.

Development options:

*   **JavaScript/REST (this will be mostly used)**
    *   Recommended for remote applications
*   JavaScript/CSOM
    *   SharePoint-hosted apps only
*   C#/REST
    *   Can be cumbersome (provider hosted app)
*   C#/CSOM
    *   Recommended for remote applications

Executing RESTful searches:

Keywords: `http://server/site/_api/search/query?querytext="{KQL Query}"`

Show users in A to Z filters: `lastname | Letter-you-are-looking-for*`

**SharePoint APPs**

The same developments options are available.

_Permissions_

`<AppPermissionRequest Scope="http://sharepoint/search" Right="QueryAsUserIgnoreAppPrincipal" />` this is only needed if you want to query against the farm.