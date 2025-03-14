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
{{< caption-new "/uploads/2018/01/Screenshot-2018-04-14-15.22.49.png" "Custom metadata integration with modern SharePoint Online pages and news"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAg0lEQVR4nFWO2QoEIQwE8/8/ui/ieCSeaC8tuMw+FOlgU1E+LiDGgJwzQmCOSCkdYoyHWivEe4/WGtZa2HsfmO9+szzPA+fcgZkm2s0MqnpyKQXCBxZ4gubWx5/9IizwPGE2U6jmn5mTduHyRs1QasUYA733w5wTwvaFf+Lkn94lAPgCtQAPJC7J8e0AAAAASUVORK5CYII=" "1652" "1076" >}}

One of the key things in the content creation process is metadata. This important for various reasons, which I not going to discuss in this article.

Normally if you want to use custom metadata for content, you start by adding columns and map them to a content type, list, or library. Modern SharePoint sites still work with this concept except for the new site pages. Site pages and custom metadata work a bit differently.

## Site page content type is not editable

Normally you start by adding a site column and mapping it to the content type, but if you try to do this for the **Site Page** content type, you will notice that this will not work. You cannot make any changes to the content type.

{{< caption-new "/uploads/2018/01/012518_1053_Custommetad1.png" "No option to add your own column"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nG2NQQ7DIAwE/f9Xcml6IHKCi2ywga3UNqd0jrPSLKWUHtsz5z0icIOYWa1ba2OMP3O43+2PtUhV10W7Gqbm7tqCDuZa65wTADOLCAAppfU+FijnvZTyjR3naWYAXiL+OX0D1FWvlFWatWwAAAAASUVORK5CYII=" "624" "391" >}}

## Adding the column to the site pages library

Another option might be to add the column directly to the site pages library. It will only get added to the **Wiki Page** and **Web Part Page** content types.

{{< caption-new "/uploads/2018/01/012518_1053_Custommetad2.png" "Location is only linked to the wiki page and web part page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVR4nC2L0QoAIQgE+/9fjcTNLITU47ybh2VhmMbMAESmiMxi721m3zZVdfdzTp2YAIOXrIjIzFdnpqr23u+9YwwiMrMsGgNfTUQR4e6V/Tzov3PlLFabsAAAAABJRU5ErkJggg==" "624" "279" >}}

> **Info**: Location is my custom field which I added to the site pages library.

In the UI the page will only contain the Name and Title which is changeable metadata.

{{< caption-new "/uploads/2018/01/012518_1053_Custommetad3.png" "Site Page property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAR0lEQVR4nDXLQQqAMAwEwP7/q6JozG6ybWkExblPc6CqQmM7cRj3i9SoXzMzgBGUUsretdaqKvUZOdv1MrsBuDvJ72WfzPEA1fJXOafVJ4sAAAAASUVORK5CYII=" "486" "142" >}}

## Where is the metadata?

You might ask yourself, where is the metadata of the page? This brings us back to when modern pages were introduced two years ago. Back then I wrote an article about what makes a page to be a news page.

> **Info**: you can read the related article here - [What makes a page to be a news page on SharePoint Online](https://www.eliostruyf.com/what-makes-a-page-to-be-a-news-page-on-sharepoint-online/).

In that article, I mentioned that the metadata of the page is stored in the page contents itself. You can check that out by downloading the page. Site pages have a publishing date, promoted state and more. These fields are not visible in the list, but they are in the content of the page.

{{< caption-new "/uploads/2018/01/012518_1053_Custommetad4.png" "The metadata is stored in the page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAS0lEQVR4nAXBgRHAIAgEMCep8EAFxb/r/ss1GXUvP5LFuy+72eziKfZ5M4ctjYYV/MA38AqWaojYnPqMyKjOtcNXwKEQuMJVTQTzB5c7DYDIyUg5AAAAAElFTkSuQmCC" "624" "169" >}}

## Ok, but how can I use custom metadata?

If you want to use custom metadata in combination with modern site pages, you will have to add your column to the site pages library to make it available to be used. Once you added your column, you can update the page metadata, but not how you are used to.

The metadata of the page can only be updated via the REST API, JavaScript, PowerShell, or in the page content itself (last one is not recommended). You can also use a third-party tool for it.

In my case, a SharePoint Framework web part which only gets displayed during page editing is the best solution. The metadata update can then be done via a POST request like this:

```typescript
const restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this.props.context.pageContext.list.id}')/items(${this.props.context.pageContext.listItem.id})`;
this.props.context.spHttpClient.post(restApi, SPHttpClient.configurations.v1, {
  headers: {
    "IF-MATCH": "*",
    "X-HTTP-Method": "MERGE"
  },
  body: JSON.stringify({ 'CustomLocation': locationValue })
})
```

Once you updated the metadata on the page, and check the content of the page again, you will see that your metadata was added:

{{< caption-new "/uploads/2018/01/012518_1053_Custommetad5.png" "Custom location information is added"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nCWKawqDMBAGc5Fmd7/NQ03aUmq2miB4/1MVEebHMIz7rPY7zn6M0W1069tN2/fN+nAeXiaWzMgkkVg9B8/qSR9eyYWEVDRXTQvScsn0CtMz3MW9s1hBq2iLrLO0cmEVVvHN7DRJKrjfOEMjI7KAoCSgP87XGDqJSScEAAAAAElFTkSuQmCC" "624" "324" >}}

## Is this searchable?

Yes, if you created a site column it is. Otherwise, you will have to create your own managed metadata mappings.

{{< caption-new "/uploads/2018/01/012518_1053_Custommetad6.png" "The metadata is searchable"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVklEQVR4nCXJyw5AMBAF0P7/74nYCBuqqqNtSucy9Ug426OmJYwzTdZpY7WxgzY+bnwWyJ0yFPndrck5CiEygxkAROT5qLpqurZfyS+WGBkn+MjlKn+/UB1VC9dZ7QQAAAAASUVORK5CYII=" "514" "168" >}}

## Creating your own content type

Another approach you can use is by creating your own content type which inherits from the Site Page. This way you would be able to add your custom field and use it in the SharePoint UI.

{{< caption-new "/uploads/2018/01/Screenshot-2018-01-25-14.20.18.png" "Custom site page content type"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAwklEQVR4nIWQ2w6DIBBE+f9v9PaiAiIgsDRNTKbZTW1stCnJPO3hMKyy6QmXHqCc4H1ACAHLsoCIcD5q8hUmEioVgbZtg3MOtVbs+/6JSluAWyzWdZXhkVKKWPkyR8UYYa2F914GDJyTUpIo7tO2LZqmwTRNF5iIJGLUWmOeZ4zjKB3vzGr1HsYYUCnS7Q4qDBpr5Wn9NrKZO13Ao2zOWX7HVW6NbOj7XuCj+C3IAC+Y9/gLEpChrut+7vELHIbhr/EFv2Tw6oGBu+gAAAAASUVORK5CYII=" "400" "517" >}}

Apparently, if you set this as the default content type of the site pages library, it will be automatically used when creating a page or news (on a Team- and Communication site).

> **Info**: If you use this approach, the metadata will get added in the page content too.
