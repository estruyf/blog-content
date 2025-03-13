---
title: Office graph search queries from within your SharePoint search center
author: Elio Struyf
type: post
date: 2014-10-01T14:07:30+00:00
slug: /office-graph-search-queries-sharepoint-search-center/
dsq_thread_id:
  - 3836883669
categories:
  - Delve
  - Office 365
  - Search
tags:
  - Delve
  - Office 365
  - Search
comments: true
---

Now that Delve is out, it is time to do some experiments with it. One of the things I wanted to test is if you can visualize results from Office Graph in your SharePoint search center.

You can of course query data on the Delve page itself, but most of our users always go to the default SharePoint search center to search for their content. By including an Office Graph search page to your SharePoint search center, your users do not have to leave your search center.

## Solution

The solution is really easy. A couple of months ago I wrote a post about how you could dynamically change the result source in a search center ([read more](Dynamically%20Changing%20the%20Result%20Source%20in%20a%20SharePoint%202013%20Search%20Center)). This was achieved by overriding the default **Srch.U.fillKeywordQuery** function, manipulating some parameters and doing a call to the original **fillKeywordQuery** function.

The same approach can be used to query data from Office Graph. What you need to do is adding a query property to the submitted query. The property to add is the **GraphQuery** property, the property can contain various values (you can check them out on the following [MSDN page](http://elst.es/OGraphAPI)). The GraphQuery property always needs an actor, the action is not always needed.

So what I wanted to achieve in my search center is to be able to add an actor ID and an action type.

Here is my code which you can add in a script editor web part on the search page.

```html
<input type="text" name="delve-actor" id="actorText" placeholder="ME or Actor ID">

<select name="delve-action" id="actionText">
  <option value=""></option>
  <option value="1021">PersonalFeed</option>
  <option value="1003">Modified</option>
  <option value="1015">OrgColleague</option>
  <option value="1014">OrgDirect</option>
  <option value="1013">OrgManager</option>
  <option value="1016">OrgSkipLevelManager</option>
  <option value="1019">WorkingWith</option>
  <option value="1020">TrendingAround</option>
  <option value="1001">Viewed</option>
  <option value="1033">WorkingWithPublic</option>
</select>

<script>
  // Show duplicated results
  if (typeof Srch.U.fillKeywordQuery !== 'undefined') {
    // Override the fillKeywordQuery function
    var originalFillKeywordQuery = Srch.U.fillKeywordQuery;
    // Override the default fillKeywordQuery function
    Srch.U.fillKeywordQuery = function(query, dp) {
      // Retrieve the current properties
      var properties = dp.get_properties();
      
      var actorText = document.getElementById('actorText');
      var actionText = document.getElementById('actionText');
      
      if (actorText !== null && actionText !== null) {
        var actor = actorText.value === '' ? 'ME' : actorText.value;
        var action = actionText.value === '' ?  '' : ',action:' + actionText.value;
        
        // Add the Office Graph properties
        properties["GraphQuery"] = 'ACTOR(' + actor + action + ')';
        
        dp.set_properties(properties);
        
        // Office Graph ranking model
        dp.set_fallbackRankingModelID("0c77ded8-c3ef-466d-929d-905670ea1d72");
      }
      
      // Call the default function to go further with the query processing
      originalFillKeywordQuery(query, dp);
    };
  }
</script>
```

The code gives you the following output:

{{< caption-new "/uploads/2014/10/100114_1407_Officegraph1.png" "Code output" >}}

> **Note**: you can add the code in a script editor web part that you can place above the search box web part.
_

The textbox can be used to include the actor ID. If you leave it empty, it uses **ME** as value for the actor, so the query will be done in the context of the current user. In the dropdown you can select which action type you want to query from Office Graph.

## Results

{{< caption-new "/uploads/2014/10/100114_1407_Officegraph2.png" "Default Office Graph query: ACTOR(ME)" >}}

{{< caption-new "/uploads/2014/10/100114_1407_Officegraph3.png" "Office Graph query: ACTOR(ME, action:1020)" >}}

> **Important**: refiners are not working, no refinement data gets returned.