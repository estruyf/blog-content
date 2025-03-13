---
title: 'Part 3: Working with File Types in the Search Refiner Control Template'
author: Elio Struyf
type: post
date: 2013-10-29T09:40:12+00:00
slug: /part-3-working-with-file-types-in-the-search-refiner-control-template/
dsq_thread_id:
  - 3836446587
categories:
  - Display Templates
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
  - Search Center
  - Styling
comments: true
---

In the previous posts I explained how to create a new refiner control, but there is one search data type that needs some special attention. The search data type that will be explained in this post is the FileType. In this post I'll show you the things that are so special about working with filetypes.

> **Note**: for this post I'll use the display template that was created in the previous post: [Custom Search Refiner Control Part 2](/uploads/2013/10/Display-Template-Part2.txt).

## Point 1: Comparison Custom Template versus Default Template

You'll get the following output with the custom display template:

{{< caption-new "/uploads/2013/10/102913_1018_Part3Workin1.png" "Custom Template used with File Type" >}}

The output of the default template is the following:

{{< caption-new "/uploads/2013/10/102913_1018_Part3Workin2.png" "Default Template used with File Type" >}}

The first thing you'll notice is that the names of the file types are different. The custom display template uses the exact file type values, where the default template is using user friendly names.

This comes from the fact that the default template has a function that does this remapping:

```javascript
function mapResultType(listData)
{
  var map = { };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSAccess")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["accdb", "accdc", "accde", "accdr", "accdt"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_AdobePDF")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["pdf"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Assignment")] = {
    "RefinerName": "ContentTypeId",
    "RefinementValues": ["0x010063C2F478ACC511DFB869B5BFDFD720851252*"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Blog")] = {
    "RefinerName": "WebTemplate",
    "RefinementValues": ["BLOG"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Book")] = {
    "RefinerName": "ContentTypeId",
    "RefinementValues": ["0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900ABD371128A994A0B98E7E888866B392F*"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Community")] = {
    "RefinerName": "WebTemplate",
    "RefinementValues": ["COMMUNITY"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Course")] = {
    "RefinerName": "ContentTypeId",
    "RefinementValues": ["0x010063C2F478ACC511DFB869B5BFDFD720851101*"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Discussion")] = {
    "RefinerName": "ContentTypeId",
    "RefinementValues": ["0x012002*", "0x0107*"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Email")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["eml", "msg", "exch"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSExcel")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["odc", "ods", "xls", "xlsb", "xlsm", "xlsx", "xltm", "xltx", "xlam"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Image")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["bmp", "jpeg", "png", "tiff", "gif", "rle", "wmf", "dib", "ico", "wpd", "odg"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Lesson")] = {
    "RefinerName": "ContentTypeId",
    "RefinementValues": ["0x010063C2F478ACC511DFB869B5BFDFD720851251*"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_NewsfeedPost")] = {
    "RefinerName": "ContentTypeId",
    "RefinementValues": ["0x01FD4FB0210AB50249908EAA47E6BD3CFE8B*", "0x01FD59a0df25f1e14ab882d2c87d4874cf84*"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSOneNote")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["one"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSPowerPoint")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["odp", "ppt", "pptm", "pptx", "potm", "potx", "ppam", "ppsm", "ppsx"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSProject")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["mpp"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSPublisher")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["pub"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_SharePointSite")] = {
    "RefinerName": "contentclass",
    "RefinementValues": ["STS_Web", "STS_Site"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Task")] = {
    "RefinerName": "contentclass",
    "RefinementValues": ["STS_ListItem_GanttTasks", "STS_ListItem_Tasks", "STS_ListItem_HierarchyTasks", "STS_List_GanttTasks", "STS_List_Tasks", "STS_List_HierarchyTasks"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_TeamSite")] = {
    "RefinerName": "WebTemplate",
    "RefinementValues": ["STS"]
  }; 
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Video")] = {
    "RefinerName": "ContentTypeId",
    "RefinementValues": ["0x0120D520A8*"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Visio")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["vsd", "vsx"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSWord")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["docx", "doc", "docm", "dot", "nws", "dotx"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Webpage")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["HTML", "MHTML"]
  };
  map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Archive")] = {
    "RefinerName": "FileType",
    "RefinementValues": ["zip"]
  };

  var retListData = new Array();
  var assocListData = new Array();
  for (var i = 0; i < listData.length; i++)
  {
    var filter = listData[i];
    var mappedRefinementName = null;
    for(var key in map)
    {
      if (map[key].RefinerName == filter.RefinerName)
      {
        for (var j = 0; j < map[key].RefinementValues.length; j++)
        {
          var actualValue = filter.RefinementValue.toLowerCase(), candidateValue = map[key].RefinementValues[j].toLowerCase();

          if (actualValue == candidateValue ''
            (filter.RefinerName.toLowerCase() == "contenttypeid" && actualValue.startsWith(candidateValue.substring(0, candidateValue.length - 1)))) 
          {
            mappedRefinementName = key;
            break;
          }
        }
        if (!$isNull(mappedRefinementName))
        {
          break;
        }
      }
    }

    var mappedFilter = new Object();
    if (!$isNull(mappedRefinementName))
    {
      mappedFilter.RefinerName = map[mappedRefinementName].RefinerName;
      mappedFilter.RefinementCount = filter.RefinementCount;
      mappedFilter.RefinementName = mappedRefinementName;
      mappedFilter.RefinementTokens = [];
      var resultTypeTokenWrapper = (mappedFilter.RefinerName.toLowerCase() == "contenttypeid") ? function (x) {return x;} : 
                                                     Srch.RefinementUtil.stringValueToEqualsToken;
      for (var j in map[mappedRefinementName].RefinementValues) {
        mappedFilter.RefinementTokens.push(resultTypeTokenWrapper(map[mappedRefinementName].RefinementValues[j]));
      }

      if ($isNull(assocListData[mappedFilter.RefinementName]))
      {
        assocListData[mappedFilter.RefinementName] = mappedFilter;
      }
      else
      {
        assocListData[mappedFilter.RefinementName].RefinementCount += mappedFilter.RefinementCount;
      }
    }        
  }

  for (var key in assocListData)
  {
    retListData[retListData.length] = assocListData[key];
  }

  return retListData;
}
```

This function can be used in your template, this can placed at the bottom of your template.

## Point 2: Combined Refinement Information

Another thing you'll can see, is that different refinement titles are shown. For example **Newsfeed post, Team site** isn't shown in the custom display template. These refiners are shown because there is a mapping in the default template which enriches the FileType data type with extra information from the following types: **contentclass**, **ContentTypeId**, and **WebTemplate**.

The following code is used to combine these data types together:

```javascript
if (ctx.RefinementControl.propertyName === "FileType") {
  if (!$isNull(ctx.DataProvider.get_refinementInfo())) {
    if (!$isNull(ctx.DataProvider.get_refinementInfo()["contentclass"]))
    {
      listData = listData.concat(ctx.DataProvider.get_refinementInfo()["contentclass"]);
    }
    if (!$isNull(ctx.DataProvider.get_refinementInfo()["ContentTypeId"]))
    {
      listData = listData.concat(ctx.DataProvider.get_refinementInfo()["ContentTypeId"]);
    }
    if (!$isNull(ctx.DataProvider.get_refinementInfo()["WebTemplate"]))
    {
      listData = listData.concat(ctx.DataProvider.get_refinementInfo()["WebTemplate"]);
    }
  }

  if (hasControl)
    listData = mapResultType(listData);
}
```

When you adding this code to your display template, a modification is required to the loop that populates the selected and unselected arrays. The token mapping is already achieved with the remapping function, so it isn't needed anymore for the file type. The code needs to be changed to this:

```javascript
// Token mapping is already done for the FileType data
if (ctx.RefinementControl.propertyName !== "FileType") {
  filter.RefinementTokens = [filter.RefinementToken];
  filter.RefinementTokenWrappedValues = [Srch.RefinementUtil.stringValueToEqualsToken(filter.RefinementValue)];
}
```

The result of this looks like this:

{{< caption-new "/uploads/2013/10/102913_1018_Part3Workin3.png" "File Type Custom Refiner" >}}

## Point 3: File Type Groups

The remapping function does more than just converting the file type to a friendly name. The file types are also mapped to with the possible values, this means that when you refining your results on the **docx** file type, the "**doc**", "**docm**", "**dot**", "**nws**", "**dotx**" are also taken into account.

When doing a refinement right now, you'll end up with no results. To solve this problem, another method needs to be used for file type refinement. The method to use is the **addRefinementFiltersJSONWithOr**. The difference between **addRefinementFiltersJSONWithOr** and the **addRefinementFiltersJSON** method is the operator that they use. The **addRefinementFiltersJSON** uses an **AND** operator, where the **addRefinementFiltersJSONWithOr** uses an **OR** operation.

For the file types an **OR** operation is required (because a file has only one file type). The **ShowRefiner** function call in the **unselected** loop looks like this:

```javascript
var addMethod = ctx.RefinementControl.propertyName === "FileType" ? "addRefinementFiltersJSONWithOr" : "addRefinementFiltersJSON";
ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, addMethod);
```

I have added a check to see if the control is used for file type refinement, so that the correct refinement can be achieved.

{{< caption-new "/uploads/2013/10/102913_1018_Part3Workin4.png" "File type refinement" >}}

The decoded URL looks like this: `http://your-site/Pages/DocumentResults.aspx#Default={"k":"","r":[{"n":"FileType","t":["equals(\"docx\")","equals(\"doc\")","equals(\"docm\")","equals(\"dot\")","equals(\"nws\")","equals(\"dotx\")"],"o":"or","k":false,"m":null}]}`

Completely at the end of the URL you can see the **OR** operation.

## Point 4: Removing the Current Refinement isn't Working

At the moment, the **Remove refinement** link is partly working. For some refiners it works, for some it doesn't. This is caused by the mapping with the **contentclass**, **ContentTypeId**, and **WebTemplate** data. At this moment the **Remove refinement** hyperlink removes the refinement for the current search data type (file type). When refining on one of the other data types, you'll need to remove the refinement for that data type. What you need to do is creating a link that removes the refinement for all data types that it can have:

```javascript
refinerRemoval[ctx.RefinementControl.propertyName] = null;
if (ctx.RefinementControl.propertyName == "FileType")
{
  refinerRemoval["contentclass"] = null;
  refinerRemoval["ContentTypeId"] = null;
  refinerRemoval["WebTemplate"] = null;
}
ShowRefiner('Remove refinement', null, refinerRemoval, 'updateRefinersJSON');
```


## Point 5: Additional File Types

Maybe you noticed it or not, but in the first screenshot XML and TXT file type are shown. Once I implemented the remapping function, it wasn't shown anymore. Inside the remapping function, there isn't a mapping for the XML or TXT file types, but you can add your own file types to the list like this:

```javascript
map["XML File"] = {
  "RefinerName": "FileType",
  "RefinementValues": ["xml"]
};
map["TXT File"] = {
  "RefinerName": "FileType",
  "RefinementValues": ["txt"]
};
```

The result looks like this:

{{< caption-new "/uploads/2013/10/102913_1018_Part3Workin5.png" "Custom File Types" >}}

## Download

Download the complete refiner control here: [Custom Refiner Control Part 3](https://github.com/estruyf/blog/tree/master/Refiners/part3).

## Part 4: Create a dropdown refiner control

Right now I explained the attentions points when working with file types are. Currently the refiner control is visualizing the items as a list, but this will change in the next part. In Part 4 I'll show you how to create a dropdown refiner control.

## Blog posts in this series:

*   [Part 1: Create your first search refiner control template](https://www.eliostruyf.com/part-1-create-first-search-refiner-control-template/ "Part 1: Create Your First Search Refiner Control Template")
*   [Part 2: Adding Refinement Actions to the Custom Search Refiner Control](https://www.eliostruyf.com/part-2-adding-refinement-actions-to-the-custom-search-refiner-control/ "Part 2: Adding Refinement Actions to the Custom Search Refiner Control")
*   Part 3: Working with File Types in the Search Refiner Control Template
*   [Part 4: Create a dropdown refiner control](https://www.eliostruyf.com/part-4-create-dropdown-search-refiner-control/ "Part 4: Create a Dropdown Search Refiner Control")
*   [Part 5: The Search Refiner Control Methods Explained](https://www.eliostruyf.com/part-5-search-refiner-control-methods-explained/ "Part 5: The Search Refiner Control Methods Explained")
*   [Part 6: Create a Multi-Value Search Refiner Control](https://www.eliostruyf.com/part-6-create-multi-value-search-refiner-control/ "Part 6: Create a Multi-Value Search Refiner Control")
*   [Part 7: Working with Ranges in the Search Refiner Control](https://www.eliostruyf.com/part-7-working-ranges-search-refiner-control/ "Part 7: Working with Ranges in the Search Refiner Control")