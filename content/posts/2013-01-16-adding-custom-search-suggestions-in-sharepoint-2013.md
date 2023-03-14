---
title: Adding Custom Search Suggestions in SharePoint 2013
author: Elio Struyf
type: post
date: 2013-01-16T18:29:04+00:00
slug: /adding-custom-search-suggestions-in-sharepoint-2013/
dsq_thread_id:
  - 3839862271
categories:
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - Search
  - Searchbox
comments: true
---

By default search suggestions are enabled on the default search boxes in SharePoint 2013.

{{< caption-legacy "uploads/2013/01/011613_1828_AddingCusto1.png" "Search Suggestions" >}}

Server administrators are still able to manually add search suggestions via PowerShell, but the commands have been changed a little.

Check out the following [blog post](http://blogs.technet.com/b/chad/archive/2010/06/24/tip-34-adding-a-sharepoint-2010-search-suggestion.aspx "Adding a SharePoint 2010 Search Suggestion") how to do it in SharePoint 2010.

The command that has been changed is the `New-SPEnterpriseSearchLanguageResourcePhrase`. This cmdlet now has a new required parameter named **Owner**.

Technet information about Owner: "Specifies the search object owner that defines the scope at which the corresponding **LanguageResourcePhrase** is created".

This Owner parameter is also used in the `Get-SPEnterpriseSearchLanguageResourcePhrase`.

The Available levels that can be used are:

*   Search Service Application: SSA;
*   Site Subscription: SPSiteSubscription;
*   Site Collection: SPSite;
*   Site: SPWeb.

You need to run the following commands to create search suggestions:

{{< highlight powershell "linenos=table,noclasses=false" >}}
$searchapp = get-SPEnterpriseSearchServiceApplication
$owner = Get-SPEnterpriseSearchOwner -level SSA

New-SPEnterpriseSearchLanguageResourcePhrase -SearchApplication $searchapp -Language En-Us -Type QuerySuggestionAlwaysSuggest -Name "Suggestion 1" -Owner $owner

Start-SPTimerJob -Identity "Prepare query suggestions"
{{< / highlight >}}
