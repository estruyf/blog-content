---
title: Highlight on-premises search results in your hybrid configuration
author: Elio Struyf
type: post
date: 2016-02-02T09:17:27+00:00
slug: /highlight-premises-search-results-hybrid-configuration/
dsq_thread_id:
  - 4544414658
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint
tags:
  - Display Templates
  - Hybrid
  - Search
  - SharePoint
comments: true
---

Last week I finally found some time to get my demo tenant up and running with hybrid search configuration. The new hybrid search experience eliminates the need of the result block. All results are aggregated together right now. So that means if you do a search query, you could get SharePoint Online results and on-premises results.

> **Important**: There are some disadvantages about using hybrid search. Mikael Svenson wrote an article about it which talks about them and made a checklist to see if hybrid search is good to implement in your environment: [Why Hybrid Crawl in SharePoint is a cold hot potato](http://www.techmikael.com/2015/11/why-hybrid-crawl-in-sharepoint-is-cold.html).

{{< caption-new "/uploads/2016/02/020216_0908_Highlighton1.png" "Default hybrid search behaviour"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmklEQVR4nB3BOw4CIRAAUG7lHa3sPYuJpVYWFjY2JkZhYWH4w8wsmPieOF7U7nDfn95MlGvtf4g0xti2TdhQoGCqfYW4+tRa5z/zUQmi8KluYxJ2qeVXK2WUgTWVcjtfX4+nKDmNMRFR6mVxznhvADTERjznFCEEJGJCtRoNoD3Y4HurrTZmFjHG3jsRSa20Mwas9S7nXEph5h+FJaiS1WfvFgAAAABJRU5ErkJggg==" "624" "384" >}}

> **Note**: first result is from SharePoint Online, the other two is from my on-premises environment.

This is a great step forward, but what if you can only access your on-premises content via the corporate network or VPN?

That would expect from your users that they have to check the path of the content to where it leads. This is not ideal, so a better solution would be to highlight the on-premises or external (yes, on-premises content is seen as external content for Office 365) content in your search center like this:

{{< caption-new "/uploads/2016/02/020216_0908_Highlighton2.png" "Hybrid search with on-premises/external content highlighting"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAnklEQVR4nBXMMQ7CMAwAwPyKbzLxHxAbAxITCwuItmnS1k7TxI7dBHEPOHO69ofj43j+7ipbJmYuhUVKrXWvu4E1ZVai4mH1EIlIRVRl/HRhBrPEXGsrTP3Y9c4O3nqY1pTul9v7+TLbFmtrnNNgewfgAScED2tiaa0ZRPxfnK2zDsEj+IBEmYlU1YQQShEpbN3glmnCecYlxi2lpKo/gciofN8p/5cAAAAASUVORK5CYII=" "624" "388" >}}

{{< caption-new "/uploads/2016/02/020216_0908_Highlighton3.png" "Notification text on VPN icon"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAoUlEQVR4nB3BSw6CMBQAwF7N87k28TSudGmMcSFKVBIQ+qVU+qHvtWB0hmz37WpzWe8aQHRhij8AAPMfsT7knBMikwNXZrQWYkwJVct43ZF+DHleEIFKRpXgSggtPUJxup4PR+KdW5bF+VBU9b2TJVUlVbe2fygvYibGGESEGJ/N+8VExUXFJdNGfZy2E7HWAmBC4IL2Rg+jGUbjvY9TSIhfIaenBxXd95YAAAAASUVORK5CYII=" "624" "396" >}}

In the above screenshots you can see that I added a small image to highlight that the content can only be accessed on the corporate VPN. This small change can spare your users from frustration that they cannot open the document.

## Highlight external content

If you want to implement this in your environment, you will have to add two display templates (and the image) to your SharePoint Online Search Center and create a new result type for the external content.

### Display templates

The display templates for this can be found on the SPCSR Github repository: [Highlight external content in your Hybrid Search](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Highlight%20external%20content%20templates%20for%20Hybrid%20Search)

> **Important**: these files have to be uploaded to the master page gallery in a folder called "hybrid-search". You could also place them somewhere else, but this requires some changes to the templates.

In the repository, you will find three files:

1.  Item_CommonItem_Body_External.html
2.  Item_External.html
3.  vpn-small.png

The **Item_CommonItem_Body_External.html** display template has been modified to show the VPN image next to the file extension icon.

> **Important**: if you placed the files in another folder than was specified above, you have to update the VPN image reference. By default, it is set to: `~sitecollection/_catalogs/masterpage/hybrid-search/vpn-small.png`

The **Item_External.html** display template ensures that the external body template gets loaded and used for the external content.

> **Note**: these display templates have to be published before you can proceed to the next step.

### Result type configuration

Once the display templates are added to your SharePoint Online search center, it is time to create a new result type. What we want is to target all the external content to make use of the new templates. The nice thing is that there is a new managed property available with hybrid search called **IsExternalContent**. This managed property has the value **true** if it is content coming from your on-premises environment.

Here are the steps in order to create a new result type for your external content:

*   Go to Site Settings > **Search Result Types**;
*   Click on **New Result Type**;
*   Configure the result type like in the following screenshot:

{{< caption-new "/uploads/2016/02/020216_0908_Highlighton4.jpg" "Result type configuration"  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQI/8QAHxAAAgAFBQAAAAAAAAAAAAAAAAECAxEhUSIxM0Fx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A085uuX1bFCqqyDHzweMdbBa//9k=" "780" "681" >}}

> **Information**: Condition has to be set with Managed Property **IsExternalContent** equals any of **true**. The action has to be set with the **External Item** display template.

*   Click **save** to store this result type.
Once this result type is configured and you search for content, you should see that the external content gets highlighted with a VPN image.

> **Note**: It does not necessarily have to be a VPN icon; it can be whatever you want it to be. If you want for example to change the background of the external search results, this would also be possible and can be done by some modifications to the templates.