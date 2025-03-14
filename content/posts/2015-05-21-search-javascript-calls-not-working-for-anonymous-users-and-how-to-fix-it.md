---
title: Search JavaScript calls not working for anonymous users and how to fix it
author: Elio Struyf
type: post
date: 2015-05-21T19:25:18+00:00
slug: /search-javascript-calls-not-working-for-anonymous-users-and-how-to-fix-it/
dsq_thread_id:
  - 3836535730
categories:
  - Search
  - SharePoint 2013
tags:
  - JavaScript
  - Search
  - Search Center
  - Searchbox
comments: true
---

Back in December 2013 I wrote an article in which I explained how you could dynamically switch the result source with a search query keyword.

> **Note**: You can find the article over here - [Dynamically changing the result source in a SharePoint 2013 search center](https://www.eliostruyf.com/dynamically-changing-result-source-sharepoint-2013-search-center/).

The past few weeks I have got the same question a couple of times how to make it work for anonymous users. The problem when an anonymous user tries to switch the result source, it appears that nothing happens. The same results are returned as the original search query he performed.

The reason for this is that anonymous users need to be allowed on the site to change query parameters like the result source ID before they can perform such queries. To allow these query parameter changes for their queries, extra configuration is required on your site.

## Configuration

As you may or may not know, if you want to perform anonymous REST calls to the search API you have to specify a configuration file. In this configuration file you specify the action that are allowed for anonymous users to perform. This configuration file is also required if you want to do search queries from within you display templates or JSOM as an anonymous user.

> **Note**: More information about the configuration steps can be found on [Waldek Mastykarz](http://blog.mastykarz.nl/configuring-sharepoint-2013-search-rest-api-anonymous-users/) his blog and on [MSDN](https://msdn.microsoft.com/en-us/library/office/jj163876.aspx).

### Configuration steps

The following configuration steps are required:

*   Create a new document library**
**named **QueryPropertiesTemplate** on the site where you want to do your anonymous JS calls;
*   Create a new XML file named **queryparametertemplate.xml**, and copy the following XML content to the file:

```xml
<QueryPropertiesTemplate xmlns="http://www.microsoft.com/sharepoint/search/KnownTypes/2008/08" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <QueryProperties i:type="KeywordQueryProperties">
    <EnableStemming>true</EnableStemming>
    <FarmId>00000000-0000-0000-0000-000000000000</FarmId>
    <SiteId>11111111-1111-1111-1111-111111111111</SiteId>
    <WebId>222222222-2222-2222-2222-222222222222</WebId>
    <IgnoreAllNoiseQuery>true</IgnoreAllNoiseQuery>
    <KeywordInclusion>AllKeywords</KeywordInclusion>
    <SummaryLength>180</SummaryLength>
    <TrimDuplicates>true</TrimDuplicates>
    <WcfTimeout>120000</WcfTimeout>
    <Properties xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
      <a:KeyValueOfstringanyType>
      <a:Key>_IsEntSearchLicensed</a:Key>
      <a:Value i:type="b:boolean" xmlns:b="http://www.w3.org/2001/XMLSchema">true</a:Value>
    </a:KeyValueOfstringanyType>
    <a:KeyValueOfstringanyType>
    <a:Key>EnableSorting</a:Key>
    <a:Value i:type="b:boolean" xmlns:b="http://www.w3.org/2001/XMLSchema">true</a:Value>
  </a:KeyValueOfstringanyType>
  <a:KeyValueOfstringanyType>
  <a:Key>MaxKeywordQueryTextLength</a:Key>
  <a:Value i:type="b:int" xmlns:b="http://www.w3.org/2001/XMLSchema">4096</a:Value>
</a:KeyValueOfstringanyType>
<a:KeyValueOfstringanyType>
<a:Key>TryCache</a:Key>
<a:Value i:type="b:boolean" xmlns:b="http://www.w3.org/2001/XMLSchema">true</a:Value>
</a:KeyValueOfstringanyType>
</Properties>
<PropertiesContractVersion>15.0.0.0</PropertiesContractVersion>
<EnableFQL>false</EnableFQL>
<EnableSpellcheck>Suggest</EnableSpellcheck>
<EnableUrlSmashing>true</EnableUrlSmashing>
<IsCachable>false</IsCachable>
<MaxShallowRefinementHits>100</MaxShallowRefinementHits>
<MaxSummaryLength>185</MaxSummaryLength>
<MaxUrlLength>2048</MaxUrlLength>
<SimilarType>None</SimilarType>
<SortSimilar>true</SortSimilar>
<TrimDuplicatesIncludeId>0</TrimDuplicatesIncludeId>
<TrimDuplicatesKeepCount>1</TrimDuplicatesKeepCount>
</QueryProperties>
<WhiteList xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
  <a:string>RowLimit</a:string>
  <a:string>SortList</a:string>
  <a:string>StartRow</a:string>
  <a:string>RefinementFilters</a:string>
  <a:string>Culture</a:string>
  <a:string>RankingModelId</a:string>
  <a:string>TrimDuplicatesIncludeId</a:string>
  <a:string>ReorderingRules</a:string>
  <a:string>EnableQueryRules</a:string>
  <a:string>HiddenConstraints</a:string>
  <a:string>QueryText</a:string>
  <a:string>QueryTemplate</a:string>
  <a:string>SourceID</a:string>
  <a:string>Refiners</a:string>
</WhiteList>
</QueryPropertiesTemplate>
```

> **Note**: Two additional properties have been added to the **WhiteList** element. These properties are **SourceID** and **Refiner**. More information about these properties can be read in the last section of this article.

*   Update the **FarmId**, **SiteId**, and **WebId** elements in the XML content to that of your environment;
*   Upload the **queryparametertemplate.xml** file to the **QueryPropertiesTemplate** document library you created.

{{< caption-new "/uploads/2015/05/052115_1925_SearchJavaS1.png" "QueryPropertiesTemplate document library"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXUlEQVR4nCXJQRaDMAgFQO9/09REJAhfQyB9trOdrfPZ6n7S0X6IqNZaSplzrrW2IuPTn6aDRaV3Mxtj/O/tw5zMfSbuG4C7A4iIzHw7IrjLdYmq4kFmMDMAZjazL71lcz3KI/sNAAAAAElFTkSuQmCC" "441" "186" >}}

The last step that is explained in each of the two articles is the step where you need to add the **QueryTemplatePropertiesUrl** parameter and file location to your search Rest call. Of course this is not possible when you are working via JSOM.

When working with JSOM you need to specify the **QueryTemplatePropertyUrl** parameter on the **DataProvider** object. This can be performed like this:

```javascript
dp.set_queryPropertiesTemplateUrl('spfile://webroot/queryparametertemplate.xml');
```

To finish the code to switch the result source ID for anonymous users, the previous code snippet needs to get added to every call an anonymous user will perform.

```html
<script>
// Show duplicated results
if (typeof Srch.U.fillKeywordQuery !== 'undefined') {
  // Override the fillKeywordQuery function
  var originalFillKeywordQuery = Srch.U.fillKeywordQuery;
  // Override the default fillKeywordQuery function
  Srch.U.fillKeywordQuery = function(query, dp) {
    // Retrieve the current query text
    var queryText = dp.get_currentQueryState().k;
    dp.set_queryPropertiesTemplateUrl('spfile://webroot/queryparametertemplate.xml');
    // Check for your custom keywords
    if (queryText.indexOf('<documents>') >= 0) {
      // Remove the custom keywords text from the search query
      dp.get_currentQueryState().k = queryText.replace('<documents>', '');
      // Set the documents result source
      dp.set_sourceID('e7ec8cee-ded8-43c9-beb5-436b54b31e84');
    } else if (queryText.indexOf('<pictures>') >= 0) {
      // Remove the custom keywords text from the search query
      dp.get_currentQueryState().k = queryText.replace('<pictures>', '');
      // Set the pictures result source
      dp.set_sourceID('38403c8c-3975-41a8-826e-717f2d41568a');
    } else {
      // Specify an empty source ID to reset the default one
      dp.set_sourceID("");
    }
    // Call the default function to go further with the query processing
    originalFillKeywordQuery(query, dp);
  };
}
</script>
```

> **Note**: The highlighted line is where you need to set the query template property URL.

## Why are these additional WhiteList properties required

The **SourceId** element is required to allow anonymous users to change the result source ID for the query. If you only add this property, you get the following result:

{{< caption-new "/uploads/2015/05/052115_1925_SearchJavaS2.png" "An anonymous search call with SourceId on the WhiteList"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhklEQVR4nB3LOQ4CMQwAwHyIN/IAJL5DC0+gA1HRcOSynZis482BtNK0Y47n1+5w3Z+eTGQdeA9cpMi6aOelmvuHL49we2eiDJgz/4poEa3aWutmzjHn1FWt9wEJKEUkDxiARMT0PvqYUvXrgw3RRXCALkZMSVXNGNtWtd4CASTETWautf4BdP2LweFYnBUAAAAASUVORK5CYII=" "633" "301" >}}

When you only added the **SourceId** element, you do not get any refiners. That is why you also need to add the **Refiners** element to the white list. Once you have done this, you will get all the refiners where the managed properties are configured as safe.

{{< caption-new "/uploads/2015/05/052115_1925_SearchJavaS3.png" "An anonymous search call with SourceId and Refiners on the WhiteList"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgElEQVR4nDXCyw3CMAwA0CzCkozQibgyBCtwQaogdfyJ7cZuAHHi6ZXl+jgtt/Plrix1Q4Cmvo+cOb8eR6lsq0SzbNiBOqurR7fRPeb7XXbTzzzmPJ71BdQaYyPcEEh4jChrhYqCLMRKXbmbqLN6N8/MIrZbzBEBbUMh+lfTzPwBQ3SLB4GWYOIAAAAASUVORK5CYII=" "633" "310" >}}