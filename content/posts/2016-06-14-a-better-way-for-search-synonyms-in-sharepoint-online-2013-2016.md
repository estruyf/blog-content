---
title: A better way for search synonyms in SharePoint Online/2013/2016
author: Elio Struyf
type: post
date: 2016-06-14T08:09:57+00:00
slug: /a-better-way-for-search-synonyms-in-sharepoint-online-2013-2016/
dsq_thread_id:
  - 4908959154
categories:
  - Office 365
  - Search
  - SharePoint
tags:
  - JavaScript
  - Search
  - Synonyms
comments: true
---

Last year I did a couple of session about how to improve the search experience in your environment. In this session, I highlighted a couple of simple things that mostly stay untouched and things that can be quickly implemented.

One of these key takeaways was implementing synonyms. Configuring synonyms can be done via the thesaurus functionality and works on-premises differently than on SharePoint Online.

## Basics of implementing search synonyms

### On-premises

If you want to be able to search for synonyms in an on-premises environment. You have to create a CSV file which holds all your synonyms (key, synonym, language). Once you have created such a CSV file it has to be imported via PowerShell into SharePoint.

> **Info**: here you can find the process how to achieve it on-premises - [https://technet.microsoft.com/en-us/library/jj219579.aspx](https://technet.microsoft.com/en-us/library/jj219579.aspx)

Maintaining this CSV is quite a hassle, as you have to keep all the synonyms in that one file. So you have to be careful that you do not overwrite it.


Another hassle is the way you have to add two-way synonyms. If you want to configure a two-way synonym, you have to write multiple entries with all the possibilities. Example:


Human Resources,HR
HR,Human Resources


### SharePoint Online

On SharePoint Online works totally different because you have no way of importing a thesaurus in your tenant. There is a possibility of adding synonyms via query rules, but this is not an ideal approach. If you only have one synonym to include, it is ok to do this via query rules, but what if you have 100 or more of these synonyms to add? That means that you have to create a new query rule for every synonym which is even harder to maintain than the CSV file.


As this is a very commonly asked question by clients to add search synonyms to their environment, I wanted to look for a better way of implementing this on SharePoint 2013/2016/Online.


## A better way to go forward

[Mikael Svenson](https://twitter.com/mikaelsvenson) once showed me a script he created for including custom query variables via JavaScript. Together we started working on this script to make it also include synonym handling and we even included more useful functionality to it.

> **Info**: the script can be found in the SPCSR GitHub Repo: [search improvements](https://github.com/SPCSR/HelperFunctions/tree/master/SPO-Search-Improvements).

The synonym solution we created makes use of nothing more than a SharePoint list. This makes it very easy to manage all your synonyms.

{{< caption-new "/uploads/2016/06/061416_0803_Abetterwayf1.png" "Synonym list"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAVUlEQVR4nGXJOw6AQAhFUfa/URsTyThAhgdoMn4KPcVtLnHr68ZdLDKPH1qas4J3UdUAIuJ9VUUOZKapisjnuTth6lNmVtXViABwbxFpDzNz9zEGgBNl7pJ6L/fT/gAAAABJRU5ErkJggg==" "558" "291" >}}

> **Important**: go to the [GitHub repo](https://github.com/SPCSR/HelperFunctions/tree/master/SPO-Search-Improvements) to see how you can configure this in your environment.

{{< caption-new "/uploads/2016/06/061416_0803_Abetterwayf2.png" "Synonym result (highlighted properties)"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAr0lEQVR4nB3JuwrCMBSA4b6WD+UzOKujzuIqDk4+gCBuDl6gKipCa82lSRPTJqk96RGFf/q/aDJbdObb7mo3Pp37h3jwb3iMR/FlentE63vZWyaba4HYhAawbRExAAQARIys0W0bbF2nhPKci0K+td4ztnmRH5dV1UBw3udKUim5MsrY0tUQwo+994honaNCUCETSp6c8EK5/4+MMdBAZatHlqaMZYISyXKlff1BxC/avKLfoENwiwAAAABJRU5ErkJggg==" "627" "385" >}}

## Wait, there is more in it for you

As I mentioned, the script has more to offer than synonyms. We made it even better by including more useful functionality to it. Here is an overview of what you can expect or use in your environment:


*   **Removing noise words**: the keywords you use in your search query determine the set of results you get back from the search engine. Including noise words into your search query like "any", "are", "is", "another", might affect the query itself and could give you back poor set results. Our script contains a list of noise words and checks if one of them is used in your query. If that is the case, it will filter it out from the actual query that gets send to the search engine.

*   **A better way for including user variables**: there are a couple of performance issues with the default user variables that can be used in a search query. Our script makes it better, by automatically grabbing all your user profile properties and caching it to the current session.

> **Info**: if you want to know more about the performance issues with these user variables, you have two great articles that go in depth: [SharePoint Search {User.Property} Query Variables and Scalability](https://www.martinhatch.com/2016/01/sharepoint-search-user-property-query-variables-and-scalability.html) - [Be aware of the performance impact of using query variables in SharePoint and Office 365](https://skodvinhvammen.wordpress.com/2015/04/30/performance-query-variables-sharepoint-office-365/).


*   **Date variables**: we added a couple of additional date variables that make it easier to do date queries like {Day}, {Month}, {Year}, ...


## More information

If you want to learn more about this script, Mikael also wrote an article about it: [Bringing out the client side hammer - The one thing you should learn about SharePoint search in 2016](http://www.techmikael.com/2016/06/bringing-out-client-side-hammer-one.html).

## Using it in your environment

If you want to use the script in your own environment you can find all the details in the GitHub repository of how you can configure it: [https://github.com/SPCSR/HelperFunctions/tree/master/SPO-Search-Improvements](https://github.com/SPCSR/HelperFunctions/tree/master/SPO-Search-Improvements).