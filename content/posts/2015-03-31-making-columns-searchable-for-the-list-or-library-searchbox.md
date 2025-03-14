---
title: Making columns searchable for the list or library searchbox
author: Elio Struyf
type: post
date: 2015-03-31T08:52:17+00:00
slug: /making-columns-searchable-for-the-list-or-library-searchbox/
dsq_thread_id:
  - 3836883315
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Managed Properties
  - Search
  - Search Results
comments: true
---

One of the handiest features that were added to a list or library is the in-place searchbox. The in-place searchbox allows you to quickly search for items or documents while staying in the list or library context (in previous versions you were redirected to a search page). When you have used this list or library searchbox, you may have experienced some problems like not been able to retrieve the items you needed or even retrieving no items at all. These problems can be related to columns from your list that are not configured as searchable.

As an example I created a contacts list with the following items:

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum1.png" "Default contact list with items"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhElEQVR4nF3KSQ6DMBAFUe5/0yiAsfv36KEjwiJSavtqY1A5z1prZub6b3s3L3ASvxqr6lyrj/FjkmANj06sou4xSGzOsda8OXOBCEy9dxFhAOB34aOp97Flpqp4WI+wb2peECe5PczMrIgIAKpqHkezvVkf82GIcUTcH1Ab7c1fl5LEB3VXy2DmkMq9AAAAAElFTkSuQmCC" "493" "346" >}}


If I do a search on for a specific company like **Contoso**. I should expect to retrieve all the contacts linked to Contoso, but instead, I am retrieving none.

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum2.png" "Search for contoso in the contacts list"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeUlEQVR4nGWMOQ4CMRDA8v9vIlIFZefKnMkioMRyZ8kNAV5j9N7nnOePxpbLc6l7pEdF+K66z7l/uV/2nDrZLtbHwDGB1C2PWNTezSJFPTOzCog1Uuwj8PKIZmbEhEjEzESL6fPfFV+aiAAAAgBciDhJWZbqYpHMeAMik618m5B4YwAAAABJRU5ErkJggg==" "365" "230" >}}


> **Note**: The searchbox does the following search query to retrieve the items: "path:path-to-the-list AND your-query-text".

In order to be able to search for content inside a column, that column needs to be searchable. A searchable column means that you can search based on a term without specifying the managed property name to find your information. Mikael Svenson wrote a great article on this topic: "[What makes a SharePoint column searchable?](http://techmikael.blogspot.no/2014/07/what-makes-sharepoint-column-searchable.html)". In this article, you can read more about crawled and managed properties and what makes the content of your column searchable.

**Note 1**: Be sure that your items have been crawled and indexed.

**Note 2**: Be sure to leave the Local SharePoint Results (result source) as the default. Mikael Svenson also wrote a post about this: "[How to: (Unexpectedly) Block the usage of the list/library search box in SharePoint](http://techmikael.blogspot.com/2015/03/how-to-unexpectedly-block-usage-of.html)".

In this example, the **company** column needs to be checked to see if it is searchable. First, you need to find the corresponding managed property inside the search schema. For the company field, this is the** OrgNames** managed property. The OrgNames property is configured as follows:

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum3.png" "OrgNames managed property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVR4nGP48v3XfzD49+/fDzD4+fPnn9+/X3389v7LTwDHhx00Eq2o8wAAAABJRU5ErkJggg==" "935" "70" >}}

As you can see in the above screenshot, the managed property is mapped to two **crawled properties**. In my situation, both these crawled properties are not configured to include its content in the full-text index:

{{< caption-new "/uploads/2015/03/Screenshot-2017-09-21-13.56.39-1.png" "OrganizationNames crawled property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAiUlEQVR4nG2P2Q6FIAxE+/8fKg8GRGSriHMzzd0enOTQ0mUCsm0bSM4Zx3GgtWaRsJZSQq0V0nu3RFUx58R934gx2gB7ZIwB4XGep8FBiotd1XKKdaED+Yp3Or/dybwuSAgB3nvs+25oaxgxQkOwpY9kXVcsywLnnMVSys/9T0I3uhL+nm99GnwB4RcRBXTeeJEAAAAASUVORK5CYII=" "800" "567" >}}

{{< caption-new "/uploads/2015/03/Screenshot-2017-09-21-13.54.30-1.png" "ows_Company crawled property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAi0lEQVR4nG2PyQ7EIAxD+f//bC+UHUEpi0fOtKM59ElWQgSOUd57OOeQUhLVWhFTRAgBtVSc54kxBhSbUooM5pxYayHGiJwzWmsiuXhdFx5xQHrv8uiBvaID9YPnMb66N4ijtRbHcUgmHwJaKeis1gL3BqK01ti2Dfu+S2W2x/kfZYwBXSn+nuHf+AAXshExSTrqLAAAAABJRU5ErkJggg==" "800" "572" >}}

> **Info**: in this case only the ows_Company crawled property is important, as the other one is only used for people results.

As the managed property OrgNames is only configured as **queryable** and the linked crawled properties are not included in the full-text index. The content can only be searched for by including the property name in the query (queryable).

> **Info**: Queryable means that you need to include the managed property name in order to search for the information you want. You could test this in your list by doing a query like this: **ManagedPropertyName:QueryText**. You can test this in the list by searching for **OrgNames:Contoso**.

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum4.png" "Search on Contoso with Managed Property name"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAd0lEQVR4nF3KSRLDIAwFUe5/1NhhEPqSAAEu24tUpbevg3BN8RtTWmvtvf4KB1msRrBEwszu0+f8cZFepbU+zsyfWEhalTbc5zOFtaaqiMDd1e4AEKywtjHD3hsC6M0Av5y4H8Wq9qBmOedCmSFnovxUxaCjDb8AYZet3AmZytgAAAAASUVORK5CYII=" "474" "283" >}}

This search query returns the items with the company set to Contoso. Of course, you cannot expect from your end users to always type the managed property name in front of the search query, so you best enable the managed property to be searchable.

> **Info**: if the "include in full-text index" option was checked for the **ows_Company** crawled property, the following configuration for the managed property is **not** required.

## Making the managed property searchable

If you are working in an on-premises environment, you can enable this on the managed property linked to your site column. You need to edit the managed property in order to get a **Searchable** checkbox (only available in the Search Service Application), enable this and store your change.

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum5.png" "Searchable checkbox"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nDXMiwmAAAgFQPef1E+BgoFK9AKjG+DoWFUF4PkBuBeZmS5mVlURYeaZ6e7MJHc/l5lFxLW+AMALlu1VwG5bCaIAAAAASUVORK5CYII=" "465" "128" >}}

The managed property now has the following configuration:

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum6.png" "Configure OrgNames to be searchable"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJklEQVR4nGP4+uPXfzD49+/fjx8/vn779vPnz9+/f7/++O3jt58Ax2YdM06ZmSAAAAAASUVORK5CYII=" "938" "71" >}}

> **Important**: when working with Office 365 you cannot enable the searchable checkbox directly in the corresponding managed property. In Office 365 you need to create a new managed property, link it with the crawled property of your column and make the managed property searchable.

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum7.png" "Custom managed property in Office 365"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOju8vX3+PLy8fHx8e7v7/X19PDy8+ft8e/y9ff6/LaAHFwY+pG1AAAAAElFTkSuQmCC" "838" "83" >}}

Wait for a full crawl to happen or start one. Once it finished, you can go back to the list or library. Do your search query again without the managed property name. Right now you should retrieve the same items like in the previous query.

{{< caption-new "/uploads/2015/03/033115_0852_Makingcolum8.png" "Search for contoso after a full crawl"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeUlEQVR4nF3KSRLDIAwFUe5/01QcBGj6GAlS3mSRt+0uwoPqp1baO8/Zf8rFqIyh3tjNLCIjd/4yyWSbuNfVtSsEa9hcsTKfp2SmmblbxHJ3AGomBjGsyHLOURV1jghVBSDCVeareddZ3J0a9U4i9q690WMo2G/M+AJqAa3W7nQ7wQAAAABJRU5ErkJggg==" "468" "279" >}}

## My managed property is not marked as searchable, and I am able to search on its contents

This is possible when one of the crawled properties (in most cases you will have two ows_ and ows_q_) of the column is marked to be included in the full-text index.

{{< caption-new "/uploads/2015/03/Screenshot-2017-09-21-14.17.54.png" "Include in the full-text index"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAaklEQVR4nFXNSQ7DIABDUe5/Twhzi8QMza/IqrX0drYsrLVofZFSotZKLUdhjMnem9Y6vQ+Ec5YQIsF7nHOcobGGd0rcn5u11kMopZBSotSFMeahjSbnzG/EK0a894QQKOeyd1prjDn/il8BuJmlZ1e3bwAAAABJRU5ErkJggg==" "628" "225" >}}