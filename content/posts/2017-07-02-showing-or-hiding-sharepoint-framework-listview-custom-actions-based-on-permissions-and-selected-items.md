---
title: Showing or hiding SharePoint Framework ListView custom actions based on permissions and selected items
author: Elio Struyf
type: post
date: 2017-07-02T13:44:03+00:00
slug: /showing-or-hiding-sharepoint-framework-listview-custom-actions-based-on-permissions-and-selected-items/
dsq_thread_id:
  - 5958276583
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Extensions
  - ListView Command Set
  - SharePoint Framework
  - SPFx
comments: true
---

With the latest release of the SharePoint Framework generator, they introduced extensions. These extensions provide you a way to extend the modern site experience in SharePoint. You can, for example, add your own headers and footers, override how fields are rendered and create some custom list actions.

In this article, I will focus on how you can use the **ListView Command Set** extension to create your own custom list actions that are shown based on permissions and selected list items.

> **Info**: If you never tried out the ListView Command Set extensions, I recommend you to read the following article: [Build your first ListView Command Set extension](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api).


## Show and hide commands based on users its permissions

If you followed the documentation article to create your first ListView Command Set, you created two custom commands which trigger an alert once invoked. One thing you might want to add is the ability to view or hide the custom commands if the user has certain permissions in the list.

For example: hide a delete command if the user has only read permissions to the library. Luckily the implementation for this is not that hard to achieve.

First, you can check if the user has specific list permissions via the **hasPermissions** method this.context.pageContext.list.permissions.hasPermission() and pass in the required permission.

Once you know if the user has the right permissions, you can implement the code to hide or show the action in the <del>**onRefreshCommand**</del> **onListViewUpdated** method. Here is some sample code:

{{< gist estruyf 8b8ae60cf3e06f411184734d81b8c54f >}}

## Show or hide actions when items are selected

Another common thing which you might want to achieve is to show or hide actions when item(s) are selected in the list. This can be achieved by checking the **event.selectedRows** object in the <del>**onRefreshCommand**</del>** onListViewUpdated** method.

{{< gist estruyf c47b55808a0a933ab8825f236404322d >}}

Here is the result output of this code. First, you do not see any of the command actions:

{{< caption-new "/uploads/2017/07/070217_1332_Thingstokno1.png" "Custom actions are not shown"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAWklEQVR4nE3CzRFAQAwG0G1LdWrQhBLc3TWgCMNYSWS//Jjh4s0r3SD9xGnXdtRKrA2qgPm3jIvMK4nwXuWk+7z4qER3+5Z0acoA8sfdIiIjijaDeWbGDwB/PRBScpG6oAyIAAAAAElFTkSuQmCC" "624" "269" >}}

Once you selected an item, both will be visible:

{{< caption-new "/uploads/2017/07/070217_1332_Thingstokno2.png" "Actions become available when one item is selected"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAATklEQVR4nD3HsRGAMAwEQfdGjdREA4REpAS29Pq3DAljAi7YmSvLqv10a7WBfTzKWzmmfVq2I64aPTOUVCcFkhJCQRW4hxu+AjAzuP/7AiLxVGl9huJhAAAAAElFTkSuQmCC" "624" "169" >}}

Once you select one more item, only the second one will be displayed:

{{< caption-new "/uploads/2017/07/070217_1332_Thingstokno3.png" "Only the multi-select action will be shown when multiple items are selected"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAaElEQVR4nE3GsQ2AIBBAUYZxVTsXcQdLO61sCKiFnYUmHHAQ5UCDxsSXX3xWlFg1ljysG+zKGDzQB+tPzAVW966btbOgtFYKAABdhk8skTsPpEDXDxHFGFNKrB2WSQo5jvIjhOCcv3MDkyRtuOGextgAAAAASUVORK5CYII=" "624" "266" >}}

## Retrieve the selected items information when action is clicked

The same selected rows information can be used for retrieving item information when you clicked on the action. This could be useful if you want to do some updates to the selected items in your code.

Here is some sample code:

{{< gist estruyf 99b177cbdfd53237beb37649719dca78 >}}

{{< caption-new "/uploads/2017/07/070217_1332_Thingstokno4.png" "Retrieve the selected item column information"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAATklEQVR4nCXK7QqAIAxGYe//IgcGisOP9YZBtnCRPX/PcUTEzCGGEGPi1M+uj6qqmfnNu5zzAYhIrVVEsONvc87WmhtjfPNyL9dSSgHwAlNEVUzqyc7YAAAAAElFTkSuQmCC" "439" "130" >}}

## Updates

### 31/01/2018

Since the initial release of the extensions and the GA version, a couple of things have changed. The article has now been updated with the new API methods and interfaces.