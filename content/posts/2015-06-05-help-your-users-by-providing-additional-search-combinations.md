---
title: Help your users by providing additional search combinations
author: Elio Struyf
type: post
date: 2015-06-05T07:48:06+00:00
slug: /help-your-users-by-providing-additional-search-combinations/
dsq_thread_id:
  - 3836648418
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
  - Search Center
  - Searchbox
comments: true
---

In my session about improving your SharePoint search experiences that I presented at SPSBE and SPSParis, I discussed various tips and tricks to improve the search experience for a user. One of these tips was about visualizing other search keyword combinations.

One of the problems users may experience is that they do not know which keywords to enter for their search queries. Once they chosen their keywords and search returns a little to zero results, it is even harder for them to come up with other keywords. Another problem with keywords is that you do not always know which keywords are causing it that the search engine returns a small number of results. It could be that the user his search query was a bit too specific.

During my session I showed a demo of a search box that displays additional search combinations based on the keywords the user used. This functionality could help your users to show which keyword combinations could lead to more or better results.

## How it works

The example I showed during my session was about a user that searched with the following keywords: "installation manual sink". When the user searches with that query he gets the following result:

{{< caption-new "/uploads/2015/06/060515_0747_Helpyouruse1.png" "Default search experience when no results are found"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdklEQVR4nF2MSw7DMAgFff9jJt4kbWpsMPiDoHK7iTIavc1IL1yFX4BXqW9AIKldqU1qWmQASYCcPyklAMiZqPY+RIRZpLXKErAURFxLqKrubmZu5r4MqxH1PtoPVbUbgZljjNu+H+cpzM8850REQCYZ/+d7/gLNFq3Wvh5y+gAAAABJRU5ErkJggg==" "528" "292" >}}

The search query leads to zero results. As the web part suggests, the user needs to try to use different search terms, but of course it is guessing which keywords to use.

If you would implement a search box with search combinations, you would get the following result:

{{< caption-new "/uploads/2015/06/060515_0747_Helpyouruse2.png" "Search box with search combinations"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nB3CCQ6AIAwEQP7/VEUO6XZLKYmRyaQmWvpoA/WVodM8eMJ8qKXaei41P+W6s9JW7P/evsIjEhQKACIQku5uZiTn8QGpZVaDbrbIjQAAAABJRU5ErkJggg==" "533" "140" >}}

By showing the search combinations, the user could see which combinations give results and can change its query.

> **Note**: In the above query, the word **manual** was causing search to return zero results. By removing the keyword and doing a new query (which can be done by clicking on the magnify glass), the user will receive these two results.

Here is another example:

{{< caption-new "/uploads/2015/06/060515_0747_Helpyouruse3.png" "Another example of a search box with search combinations"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASklEQVR4nBXHQQ6AIAwEQP7/VWmRdneLQY1xbtM86DNt5gj4TF279lP75XWnVvNzdnMb4+jWzaliLdUKgKpGgoBIZEaEJACZf0R+i1ZVoB7V3w0AAAAASUVORK5CYII=" "527" "137" >}}

## How this is developed

The implementation of the search combinations functionality is done with a custom search display template for the **Search Results** web part. The reason why I choose to create a template for the search result web part is very simple. These templates will get executed every time a user does a new query. By adding the code in this template, you are sure that the custom code will also get executed.

> **Note**: If you want to implement this with a search box display template, you would need to add a couple of event handlers that trigger your code once a new query is performed. The search box display template only gets executed the first time the page loads.

The code that is added to the template does the following things:

*   Each time a user does a search query, the code retrieves the keywords from the search box;
*   The number of keywords used is checked. Only when three or more keywords are used other combinations will be presented (this is changeable parameter);
*   One by one a keyword gets removed and with the new values a Ajax search query will be performed;
*   The response of the Ajax call gets checked if the number of results for the query is more than 1 result, and if it are more results than the original query result number;
*   If the previous checks passed the search combination gets appended underneath the search box.

> **Note**: you can check out the code from the display template on the SPCSR GitHub repository.

## Download and configuration

This search result display template can be downloaded from the SPCSR GitHub repository: [Search box with keyword combination hints](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Search%20box%20with%20keyword%20combination%20hints).

> **Important**: you can find an Office 365 (Control_SearchResults_Hints.html) version and an on-premises (Control_SearchResults_Hints_OnPrem.html) version in the repository. The main difference between the two is the Ajax call to the search API. The on-premises version will use the verbose setting to support older SharePoint installations, where the Office 365 version is set to nometadata.

When you downloaded the **Control_SearchResults_Hints.html** (or the on-premises version) display template and the **searchbox.css** file, create a folder named **SearchDT** in the site collection master page gallery from where your search center is located, and upload and publish the downloaded files to the folder. You could also place them in another folder. When you do this, you will need to update the CSS reference in the display template.

To make use of the new search display template you need to edit **Search Result** web part and set the **Results control display template** to: **Default result with hints**.

{{< caption-new "/uploads/2015/06/060515_0747_Helpyouruse4.png" "Display template configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABHklEQVR4nE3P3W6DMAwF4Lz/q5WfIbVltAWplSgJEJIAcZw4tBPdLvZdnJsj2zK7XK9JckgPaZJmt1vTNE1d101dXy6XumnY43EviqI8narquzyfj8djVVWcCyE6KSUDcOBwAb+CX8DHD4q0AK6AzHu/WDdoK40djfUf79fLYlydZzFuAHYc+nEY5DiKXa+0AbDokRHRFiPsHIBD3KcBXAgUQmBEMXg/yd08L+9/iGivKYR1XQHgNxHR2j0DEYufze3zOYxjxznnou+HjneT0kRxrxGdUpPWepmN0UZpbcxMRBQjQ0RAP7u44qYtWb/9Hv57jIjmebm3ouvlo+1b3iulpJSD1ICBbdtrkjJNkjzPi688S9Msy8qyFIIHoh8EtmxCfNpMPAAAAABJRU5ErkJggg==" "262" "351" >}}

Once this is configured, store these changes and publish the page. Now you can start searching and the search combinations should appear underneath the search box.