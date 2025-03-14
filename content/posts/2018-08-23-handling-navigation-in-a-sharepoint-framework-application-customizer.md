---
title: Handling navigation in a SharePoint Framework application customizer
author: Elio Struyf
type: post
date: 2018-08-23T08:18:49+00:00
slug: /handling-navigation-in-a-sharepoint-framework-application-customizer/
categories:
  - Development
  - SharePoint
tags:
  - Navigation
  - React
  - SharePoint Framework
  - SPFx
comments: true
---

Probably one of the most difficult things when working with application customizers is how it behaves while navigating. Modern sites have their own page navigation mechanism which provides a great user experience as the page does not require a full-page refresh. Only the things that are changed will get loaded/unloaded from the page. This system has its perks, like for example that you cannot always control the link behaviour.

> **Info**: Julie Turner wrote a great article about SharePoint Framework and link behavior: [https://julieturner.net/2018/08/spfx-anchor-tags-hitting-the-target/](https://julieturner.net/2018/08/spfx-anchor-tags-hitting-the-target/)

This new navigation experience is important for your application customizer and the way you implement it. There are various ways you can navigate to a page. In this article I will take the following scenarios into account:

**Scenario 1**

*   Clicking on a link to another page with the application customizer applied
*   Navigating back to the previous page

**Scenario 2**

*   Opening an Office UI Fabric panel
*   Click on a link to a page where the application customizer is applied

**Scenario 3**

*   Opening an Office UI Fabric panel
*   Click on a link to a page where the application customizer is not applied

> **Note**: The panel is only used to easily show the issue which could occur, just imagine that the panel is one of your services, components, .... As there are other ways of solving this, this approach shows you how to correctly unmount your components when they are not required anymore.

## The project

For covering all scenarios, I created the following application customizer:

{{< caption-new "/uploads/2018/08/082318_0800_Handlingnav1.png" "Sample project header"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAoElEQVR4nG2LPQ6CQBSE3+2UYAhoaPQgGDGx8CDWlCa2XsDOSu00FkYhiywsf2/3rYkrVE6+4ptkBqLpJHRnK8dfjvy55QUDNxh6C2sc2v7admCzv+bPWPOUCq7LwiAZa5PkcY8hq5G3WKD6IgWqRlEtMaua7VlAhcRKmZaSiR+iVboLkNbUFeNSkQElQT/8GyDqz9ro5VVHx/fuxA+3/AOnvrjWiyOMSgAAAABJRU5ErkJggg==" "624" "432" >}}

This will be the code to start with:

{{< gist estruyf 8b3356c56eeb907867027fdd45e9844d >}}

The header component can be checked out in the shared project: [GitHub project link](https://github.com/estruyf/appcustomizer-navigation-issues-spfx).

## Supporting scenario 1: watch navigation changes

The first issue that could occur happens when you use the application customizer its context in your React components. In the screenshot above you see that I have my name + URL location shown. Both values are coming from the context object provided by the application customizer.

When you would navigate to another page, check what happens:

{{< caption-new "/uploads/2018/08/scenario1-issue.gif" "Navigation issue 1" >}}

Nothing happens, and the reason for this is that your component doesn't get updated. Luckily this can easily be fixed with adding a **navigatedEvent** listener. You can do this by adding the following code in the **onInit** function:

{{< gist estruyf 34fefdbd49e9502e76170f5d84454a43 >}}

Once this is in place, every time you are going to navigate to another page, it will trigger to re-render your component.

{{< caption-new "/uploads/2018/08/scenario1-solution.gif" "Navigation solution 1" >}}

Now you see the URL location getting changed on every page navigation event.

## Supporting scenario 2: did something change?

In the next scenario we open an Office UI Fabric panel and navigate to another page. Let's see what happens:

{{< caption-new "/uploads/2018/08/scenario2-issue.gif" "Navigation issue 2" >}}

As you can see, the panel stays open. This is great because you are not doing a full-page refresh. So, the page routing system of SharePoint is working very well but could also give you some troubles.

How can you solve this? The React way would be to implement the **componentDidUpdate** method in the header component and tell it to undo things when an actual update happened. For instance, in this case hiding the Office UI Fabric panel.

The easiest way for this would be to check if the list ID or list item ID got changed, but there is an issue now. If you would integrate it like this:

{{< gist estruyf f5af92df14de1934b52ceda5664b9a07 >}}

The above code would not work, as both the prevProps.context and this.props.context reference the same object. The list id and item id check will always be false.

{{< caption-new "/uploads/2018/08/082318_0800_Handlingnav2.png" "Issue with the list and item change validation"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOklEQVR4nDXJwQ3AIAwDQIYhsYRiUEE23X+yvnrfa76vOB2xyVXlzAfoEQBsN+kecmdfVRzjZM6/JX1LdAp+A1U+CwAAAABJRU5ErkJggg==" "624" "126" >}}

A better way is to pass the list and list item IDs from within the application customizer itself.

{{< gist estruyf 454da82384179ce4e5e22d712c4a6281 >}}

The code in the componentDidUpdate method would look like this:

{{< gist estruyf ab87567bb85823601cb13839c1786199 >}}

Once that is in place, it should have solved this issue:

{{< caption-new "/uploads/2018/08/scenario2-solution.gif" "Navigation solution 2" >}}

## Scenario 3: correctly disposing of your components

Another issue that could happen is when you navigate to a page where the application customizer is not enabled. To show you the issue I will open the same Office UI Fabric panel and navigating to the page without the application customizer.

{{< caption-new "/uploads/2018/08/scenario3-issue.gif" "Navigation issue 3" >}}

Did we not just solve the closing panel issue? Yes, we did, but this only works on pages/sites where the application customizer is active. On page/sites where it is not active, the code is not actually running. Which is true, but if you navigate from a page where you had the controls enabled, they will still be known to your browser.

{{< caption-new "/uploads/2018/08/082318_0800_Handlingnav3.png" "Components are not unmounted"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAApklEQVR4nGXGuw6CMBhA4T6LBaQt/m25qY2DGh+eKBYQHAwI0U1dDYlNRBNXT77hoO3hfKrbpm7b7vpzaZrudn88+94Yg/qX+fz1HobhN2iXJFrrNMtSrfda50WRFXlW5MeqqsoSrWdqFUeKe4HHOKUhh5CDpMSPJUQCea47VYuNipaRFMAJZbbjMDwCwZicIGHbQgYqDObc8xkDQoG4MHZsy8IYfwFT4GEisJd7NAAAAABJRU5ErkJggg==" "624" "396" >}}

The issue here is that they are not unmounted/disposed of the page. But there is another issue. Notice that when I navigate back to the page where the application customizer is enabled. The application customizer is not displayed anymore. This will not be the case for all projects, but what I did in this sample solution. I created a singleton which gets initialized with the context of the application customizer. I also implemented the **componentWillUnmount** method to dispose of the singleton once the component gets unmounted from the page, but this never gets called because the header never gets unmounted. When navigating back to the page, it will use the old context which causes issues:

{{< caption-new "/uploads/2018/08/082318_0800_Handlingnav4.png" "Property is undefined"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGNwFRSMUFAIUlX119V1lJM34OLSZmLSYmTUYWXVYWEBAEkHA8w2tkzwAAAAAElFTkSuQmCC" "624" "76" >}}

To solve both of these issues, you will have to implement the **onDispose** method in the application customizer itself. The onDispose method gets called whenever the SharePoint tells the loaded placeholder to dispose of their content. This is what you define in the **placeholderProvider.tryCreateContent** method.

If your placeholder contains only HTML, you could just remove all nodes, but in React it is a bit different. In order to correctly dispose the loaded, React components, you can make use of the **ReactDom.unmountComponentAtNode** method. This method requires the DOM element in which the components are loaded.

{{< gist estruyf 08fb04a4177463532cf6c2fb09b1dbfc >}}

Once this is implemented, this should solve both my Office UI Fabric panel issue and my singleton disposal.

{{< caption-new "/uploads/2018/08/scenario3-solution.gif" "Navigation solution 3" >}}

Notice that when navigating to the page where the application customizer is not enabled, the console logs that it is unmounting the header component. This means that the disposal code does its job. Also, the Office UI Fabric panel is gone. As all the components got correctly disposed of, navigating back to the page is not causing any issues anymore for the singleton, this gets initialized again and the application customizer gets displayed correctly.

## Checking out the code of this solution

The code of this solution has been shared on the following GitHub repository: [https://github.com/estruyf/appcustomizer-navigation-issues-spfx](https://github.com/estruyf/appcustomizer-navigation-issues-spfx)

Happy navigating through SharePoint.

_Keep on coding_