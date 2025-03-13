---
title: Handling page creation events in your SPFx application customizer
slug: /handling-page-creation-events-spfx-application-customizer/
author: Elio Struyf
type: post
date: 2019-09-11T11:02:18.811Z
draft: false
tags:
  - Development
  - Navigation
  - SharePoint
  - SharePoint Framework
categories: []
comments: true
---

Some time ago I wrote about things to check in your SharePoint Framework application customizer for making sure it behaves correctly on navigation events. This included checks to see if you navigated to another page, different hub site and site with another language.

In most cases, these are the checks that you want to put in place, to make sure that your application customizer renders the right data after a navigation event.

> **Info**: There are already a couple of articles written about the navigation events topic for application customizers:
>
> - [SharePoint Framework Application Customizer Cross-Site Page Loading](https://julieturner.net/2019/09/sharepoint-framework-application-customizer-cross-site-page-loading/) by Julie Turner
> - [Record page hit when SPA page transitioning in modern SharePoint sites](https://blog.velingeorgiev.com/page-hit-when-SPA-page-transitioning-modern-sharepoint-sites) by Velin Georgiev
> - [Handling navigation in a SharePoint Framework application customizer](https://www.eliostruyf.com/handling-navigation-in-a-sharepoint-framework-application-customizer/)
> - [Things to check in your SPFx application customizer after page transitions](https://www.eliostruyf.com/things-to-check-in-your-spfx-application-customizer-after-page-transitions/)

## One more thing to check or add

There is an issue when creating a new page in SharePoint. A couple of months ago (or even longer), when you created a new page from the UI. SharePoint created a new page for you with a unique name and opened it in edit mode. Nowadays, it does it differently. 

These days when you create a page, it redirects you to the following page on the site: `/SitePages/newpage.aspx?Mode=Edit`. This is good, as there won't be a new page created until you save it, or until the automated save action kicks in. This happens a couple of seconds after you gave your page a title and start editing the content zone.

Due to this change, there is no navigation event-triggered anymore when creating a new page. Which means that your application customizer will think it is still on the previous page.

{{< caption-new "/uploads/2019/09/new-page-event-without.gif" "No navigation event triggers when creation a new page" >}}

As you can see in the animated GIF, the navigation event isn't getting triggered when a new page gets created. Depending on the logic of your application customizer, you might want to know when it's on new page creation or do something after the page has been created.

## Adding an extra browser history check

As the navigation event handler will not be called during these new page creation transition, we need to find another solution. The solution for this is something I created for checking the display mode of the page from within an SPFx extension.

> **Related article**: [Check the page display mode from within your SharePoint Framework extensions](https://www.eliostruyf.com/check-page-mode-from-within-spfx-extensions/) 

The approach used in the related article was to bind into the browser history API. As this is what SharePoint uses these days for navigating between pages. The same approach can be applied here to check if a new page gets created, and when it is saved. 

{{< gist estruyf d81bb50b7596dceb2552a6b5d02ef576 >}}

The **bindToHistory** method will need to be called from the application customizer its **onInit** method. Inside the method, we bind into the history API, so every time a page navigation change happens, this will be seen by the binding. On each change, the new URL gets validated if it contains **newpage.aspx** and if it is in edit mode. That way we know that it is a new page. 

Whenever you click the save or publish button, there could be two scenarios:

The page was not automatically saved, which means **newpage.aspx** is still included in the URL;
Page was already saved, the URL doesn't contain **newpage.aspx** anymore, but will have the new page name instead.

Both of these transitions will be captured and will call the `handleNewPageReload` method. Inside this method, two checks are happening. 

Does the URL still contain **newpage.aspx**, if that is the case, we have to wait until it has been updated by SharePoint with the new page name.
Sometimes it happens that the page transition still includes the edit mode in the URL. In most cases, this happens when the page was automatically saved by SharePoint. In this case, you have to wait until the page is back in reading mode.

Due to the above checks, we need to wait and that is why the `setTimeout` is implemented and it will only check it 5 times. In my environment(s), after the second check, it is already fine. 

Once the page shows the read/view mode, the page will be fully reloaded. The reason for this is because we need to update the context of the application customizer. Otherwise, it keeps using the context of the previous page.

Once this code has been added in your application customizer, you will see the following behaviour:

{{< caption-new "/uploads/2019/09/new-page-event-with-check.gif" "Capturing navigation events when creation a new page" >}}

The full code with the previous checks in place looks like this:

{{< gist estruyf e2c2ad2570a754821369f57de26ea138 >}}

*Happy coding*
