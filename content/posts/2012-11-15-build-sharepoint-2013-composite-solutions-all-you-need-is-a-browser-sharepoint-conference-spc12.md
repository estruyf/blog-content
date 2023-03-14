---
title: Build SharePoint 2013 composite solutions – all you need is a browser! (SharePoint Conference – SPC12)
author: Elio Struyf
type: post
date: 2012-11-15T20:57:59+00:00
slug: /build-sharepoint-2013-composite-solutions-all-you-need-is-a-browser-sharepoint-conference-spc12/
dsq_thread_id:
  - 3836445751
categories:
  - SharePoint 2013
  - SPC12
comments: true
---

The possibilities are limitless when building SharePoint solutions using just the internet browser. The simple and intuitive interface makes it very easy to create robust applications. In this session, you will learn how to use the SharePoint 2013 framework of lists, libraries, pages, web parts and even apps to build powerful SharePoint solutions.

Asif Rehmani gave this session.

## Summary

This session is focused on No-Code solutions in SharePoint.

### What is a composite solution anyway?

A solution made of distinct parts or building blocks

#### Out-of-the-box building blocks

  * Sites
  * Lists & libraries > Apps
  * Pages
  * Themes
  * Search
  * Web parts
  * Site columns
  * Content types
  * Security management
  * SharePoint Designer
  * InfoPath
  * Access
  * Visual Studio > which does everything and more J

#### External tools to build solutions

#### Add functionality using third party Apps

SharePoint marketplace

### Scenarios (for site owners)

What can site owners do?

_Scenario 1_: Show me up to date information about a subject area on a page, but restrict it only to PDF files

  * Direct users to advanced search page to run their query
  * Program a solution for it using Visual Studio
  * Use a power user tool like SPD to create your solution
  * **Configure the OOTB web parts to create your solution** 
      * Build a result source > create your query via the query builder
      * Add a search results web part to your page
      * Change the query of the web part, and there you can define your result source (predefined query) that you want to use

_Note:_ Always start from an OOTB perspective, and extend it when needed.

The strength with this approach is that you can change the predefined query and the web part will show item based on the updated query.

_Scenario 2:_ Provide a place for users to submit expense reports created in Microsoft Word. Reports should be filterable and sort-able by Department and Expense.

  * The end user is responsible for filling out the metadata in columns
  * After the expense report is uploaded to the library, a workflow runs extracts the needed information into the columns
  * Look for a 3th party product
  * **Use Quick parts in MS Word** 
      * Create a new content type
      * Add your columns to the CT
      * Upload a new Word template
      * Go and create a new Document Library / App, and enable your content type in it
      * Modify the template via opening it from SharePoint, you now have the possibility to add the Quick Parts for your CT fields

_Scenario 3:_ if a expense submitted is greater than $ 200, notify the Boss

  * Manually email or call
  * Create a notification WF via visual studio
  * Use SharePoint designer workflow
  * Use a third party workflow app > there is an app for that 
      * Use Nintex >currently there is a preview version.

_Scenario 4:_ Make available key information from documents in columns as metadata for easy sorting, filtering, creating views, facilitating search etc.

  * Enforce that all users set the metadata when they upload each document
  * Assign a person to go through each document and manually extract each piece of relevant data
  * Create a solution programmatically that extracts the information from documents
  * Use a third party app for it > Pingar Metadata Extractor App can extract information out of your documents

_Scenario 5:_ show a location map right within the list or library (for example contact lists).

  * Buy a web part from a vendor
  * Create it from scratch in Visual Studio
  * Use some nifty JavaScript to embed into your page
  * Geolocation column is available OOTB > but this column needs to be added via code or PowerShell. 
      * Check this blog post: <http://www.wssdemo.com/Blog/archive/2012/09/28/use-geolocation-column-and-bing-maps-in-sharepoint-2013-lists.aspx>
      * When you added the column to your list, create a new “map” view which is also available OOTB