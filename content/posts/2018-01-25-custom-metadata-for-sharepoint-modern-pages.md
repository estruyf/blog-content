---
title: Custom metadata for SharePoint modern pages
author: Elio Struyf
type: post
date: 2018-01-25T11:03:07+00:00
slug: /custom-metadata-for-sharepoint-modern-pages/
dsq_thread_id:
  - 6437040987
categories:
  - SharePoint
  - SharePoint Online
tags:
  - Metadata
  - Modern Sites
comments: true
---


> **UPDATE**: Beginning of April 2018, Microsoft announced a new feature which allows custom metadata integration with modern pages and news (Office 365 Roadmap ID: [27251](https://products.office.com/business/office-365-roadmap?filters=&featureid=27251)).
{{< caption-legacy "uploads/2018/01/Screenshot-2018-04-14-15.22.49.png" "Custom metadata integration with modern SharePoint Online pages and news" >}}

One of the key things in the content creation process is metadata. This important for various reasons, which I not going to discuss in this article.

Normally if you want to use custom metadata for content, you start by adding columns and map them to a content type, list, or library. Modern SharePoint sites still work with this concept except for the new site pages. Site pages and custom metadata work a bit differently.

## Site page content type is not editable

Normally you start by adding a site column and mapping it to the content type, but if you try to do this for the **Site Page** content type, you will notice that this will not work. You cannot make any changes to the content type.

{{< caption-legacy "uploads/2018/01/012518_1053_Custommetad1.png" "No option to add your own column" >}}

## Adding the column to the site pages library

Another option might be to add the column directly to the site pages library. It will only get added to the **Wiki Page** and **Web Part Page** content types.

{{< caption-legacy "uploads/2018/01/012518_1053_Custommetad2.png" "Location is only linked to the wiki page and web part page" >}}

> **Info**: Location is my custom field which I added to the site pages library.

In the UI the page will only contain the Name and Title which is changeable metadata.

{{< caption-legacy "uploads/2018/01/012518_1053_Custommetad3.png" "Site Page property" >}}

## Where is the metadata?

You might ask yourself, where is the metadata of the page? This brings us back to when modern pages were introduced two years ago. Back then I wrote an article about what makes a page to be a news page.

> **Info**: you can read the related article here - [What makes a page to be a news page on SharePoint Online](https://www.eliostruyf.com/what-makes-a-page-to-be-a-news-page-on-sharepoint-online/).

In that article, I mentioned that the metadata of the page is stored in the page contents itself. You can check that out by downloading the page. Site pages have a publishing date, promoted state and more. These fields are not visible in the list, but they are in the content of the page.

{{< caption-legacy "uploads/2018/01/012518_1053_Custommetad4.png" "The metadata is stored in the page" >}}

## Ok, but how can I use custom metadata?

If you want to use custom metadata in combination with modern site pages, you will have to add your column to the site pages library to make it available to be used. Once you added your column, you can update the page metadata, but not how you are used to.

The metadata of the page can only be updated via the REST API, JavaScript, PowerShell, or in the page content itself (last one is not recommended). You can also use a third-party tool for it.

In my case, a SharePoint Framework web part which only gets displayed during page editing is the best solution. The metadata update can then be done via a POST request like this:

{{< highlight typescript "linenos=table,noclasses=false" >}}
const restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this.props.context.pageContext.list.id}')/items(${this.props.context.pageContext.listItem.id})`;
this.props.context.spHttpClient.post(restApi, SPHttpClient.configurations.v1, {
  headers: {
    "IF-MATCH": "*",
    "X-HTTP-Method": "MERGE"
  },
  body: JSON.stringify({ 'CustomLocation': locationValue })
})
{{< / highlight >}}

Once you updated the metadata on the page, and check the content of the page again, you will see that your metadata was added:

{{< caption-legacy "uploads/2018/01/012518_1053_Custommetad5.png" "Custom location information is added" >}}

## Is this searchable?

Yes, if you created a site column it is. Otherwise, you will have to create your own managed metadata mappings.

{{< caption-legacy "uploads/2018/01/012518_1053_Custommetad6.png" "The metadata is searchable" >}}

## Creating your own content type

Another approach you can use is by creating your own content type which inherits from the Site Page. This way you would be able to add your custom field and use it in the SharePoint UI.

{{< caption-legacy "uploads/2018/01/Screenshot-2018-01-25-14.20.18.png" "Custom site page content type" >}}

Apparently, if you set this as the default content type of the site pages library, it will be automatically used when creating a page or news (on a Team- and Communication site).

> **Info**: If you use this approach, the metadata will get added in the page content too.
