---
title: Search for Office 365 Group documents
author: Elio Struyf
type: post
date: 2016-09-20T10:58:15+00:00
slug: /search-for-office-365-group-documents/
dsq_thread_id:
  - 5158355295
categories:
  - Office 365
  - Search
  - SharePoint
tags:
  - Office 365 Groups
  - Search
comments: true
---

I just got a question from someone who wanted to know how to retrieve all the Office 365 Group documents he had access to.

When you are having a lot of groups in your organization, files could be spread across them. Search is in most cases the answer to finding your documents easily. So having a property on which you can flag them as a group document would be helpful in this case.

I did a quick search on my Office 365 tenant and checked the managed properties of a document living on a standard team site and one on a group site. Luckily there is a useful property which is already provided by SharePoint called: **SiteTemplate** which you can use to do your query.

{{< caption-new "/uploads/2016/09/092016_1054_SearchforOf1.png" "Document living on a team site"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAcUlEQVR4nCXLwQrCMAyA4b7/G+kb7CAeZWOiHoYKK5qmXdKkTYT5Hz/4w31Z3usHsQIQAGGuAMzcfC9cnuO0zpFikZwFuZF579a0q3YNw+kwnI/x+8Ja9h8SpcSpSCGlMM3j9fbAnLjxnzbZSMjM3P0HV5NxMHyLEd4AAAAASUVORK5CYII=" "627" "257" >}}

{{< caption-new "/uploads/2016/09/092016_1054_SearchforOf2.png" "Document living in an Office 365 Group"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAa0lEQVR4nE3MSwqDMBRG4ex/U0I3oCWDtkILTsQqmDS5D69/QsVRe/jGx72XNUSmbEygDCZ8/3LtcO1GP9JEltP2EUipFRXlVJz3l9Y3yzwkTUFClEhGbMw7y67u3t8ez1cKq5VNoQpF/f0Pc8dxfRSj8lsAAAAASUVORK5CYII=" "627" "262" >}}

So if you want to retrieve all search content from Office 365 Groups, all you have to do is search for: **SiteTemplate=Group**.

{{< caption-new "/uploads/2016/09/092016_1054_SearchforOf3.png" "SiteTemplate query"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAOUlEQVR4nE3CQQ7AIAgEQP//z55MawRWVqTWaydTBONu0sS6InL/w2epyuuBmKnBneR0Mla++4uVB/1VOekHuwiKAAAAAElFTkSuQmCC" "518" "82" >}}

You can also configure this as a group search vertical so that it is easier for the user to limit their search scope.

{{< caption-new "/uploads/2016/09/092016_1054_SearchforOf4.png" "Groups search vertical"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAMElEQVR4nEXHQQ4AIAgDQf7/V08aWoQmRjw4p13LzGr67pQEwLwBIONFENNjrC3pAB3ZOntsk2RIAAAAAElFTkSuQmCC" "514" "84" >}}

> **Important**: Only information of public groups is searchable. Private groups are not accessible for search, so this information cannot be retrieved. You can also test this by doing in a search in the private group itself. You will see that it would not find any documents.

{{< caption-new "/uploads/2016/09/snip_20160921084010.png" "Private group search"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAgUlEQVR4nH2OTQoCMQyFc3pvMTuP4GJOMODSpSuXCmVmVdukbfKGDFoUfz54kISPR+i8G3AdJzRVaKkws6+hy/6A2/GELAyJd0jKPZxSn0lhqK1CVfHKs8nvBgOZD2pvkiMiWOZ5kx36MB7EGBFC6PtP0RtLKf8b/S9mBmdGE9nEFTHMEggVjY9sAAAAAElFTkSuQmCC" "1611" "1057" >}}