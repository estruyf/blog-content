---
title: >-
  Aborting your fetch requests in your SharePoint Framework extensions during
  navigation events
slug: /aborting-fetch-requests-spfx-extensions-navigation-events/
author: Elio Struyf
type: post
date: 2019-09-20T14:39:22.768Z
draft: false
tags:
  - Application Customizer
  - Development
  - Extensions
  - Navigation
  - SharePoint
categories: []
comments: true
---

Once again an article about navigation events. This time it has nothing to do with checks you need to implement to know when or to which page you navigated. This time it is about canceling/aborting API calls which your browser performs while navigating to another page. Most likely you can cancel these calls because they do no longer matter for the current page.

## Providing some context

Depending on the functionality of your application customizer, you might require to perform a couple of API calls to render your extension correctly. As we now work in a client-side driven context. It is essential not to make too many calls. That is why you best implement some checks to verify when you need to perform a new request. In React we can, for instance, use the current page, list item ID and list ID variables to validate if the component or service has to perform an update, but in some cases, this is not enough.

## The issue

What I experienced a couple of days ago, was when I navigated from page to page, all of a sudden, my control rendered with old data. The reason this happened was due to an API call which initiated on the previous page and did not return a response. That meant that my React component got data too late, and overwrote its current state with old data.

{{< caption "/2019/09/abort1.png" "Sample where first call response comes back after the second one"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABBSURBVB3BOQ6AMAxFwRf5izWC+98vDTV02DEKM+VqLXsP3INhXRbm/cCmDQlk/BTPzRtBz8TdOWtFEpaOFQMKwweYWBgBYDiJ2AAAAABJRU5ErkJggg==" "1181" >}}

> **Info**: In the above screenshot I on purpose delayed the API calls. If you check the ID from the second call, you notice that the first call gets returned after the second one. As you cannot always control the API speeds, this is where it could go wrong, and can cause issues while navigating through your hub/sites/pages.

## The easy solution

There are a couple of things you can do to overcome this issue in your codebase. One of the most straightforward approaches would be to generate a unique ID in the component (which you update when the component updates) and pass this unique ID with every request. Once the API data is retrieved, you give the API data and the unique ID as the return object. All you have to do then is to verify the unique retrieved ID and the ID in your component. If both are the same, you know that this is the data you want to use, everything else can be ignored.

> **Info**: This is also the solution I implemented in the above screenshot to show the "Is call ID the same" state.

As this is the most straightforward solution, it is probably not one of the best. Your browser still processes all the API calls, even when they are not required anymore.

## A better solution

A better solution would be to make use of the `AbortController`. The abort controller itself allows you to abort a fetch call whenever you tell it that it is not required anymore.

<blockquote class="important">
<p><strong>Important</strong>: The <code>AbortController</code> is currently in preview, but is supported in all modern browsers except for IE11 (but that one does not count as a modern browser).</p>
</blockquote>

The AbortController gives you two things:

- `signal` object which you pass to your fetch calls
- `abort` method which you use whenever you want to abort your calls

Whenever you pass a signal to a fetch call, it listens to your abort calls, which is very easy to implement and might make it even more natural than the previous solution.

In my application customizer, I initiate a new abort controller instance whenever it gets loaded.

> **Tip**: You could make this available as a singleton. Doing it this way, you can receive the signal quickly in your services and pass it to each fetch call which you want to cancel.

Whenever you notice that the control rendered on the previous URL and needs to be re-rendered, you can then trigger the abort, initiate a new abort controller instance, and render your application customizer again.

{{< caption "/2019/09/abort2.png" "Sample where one call got aborted"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABASURBVB3BgQ2AMAhFwcevItb9p1QHaNKCiXd2P2+NMTAz1koko/eTwztpO1fw29ydqkISmQtJRAQNsJpUNtTEB/4WFTEWji4gAAAAAElFTkSuQmCC" "1047" >}}

In the screenshot, you can see that only one call returns a response, the other one aborts when it is not required anymore. You can also verify this in your network tab by checking the call its status.

{{< caption "/2019/09/abort4.png" "Canceled request statuses"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABwSURBVDXByw6CMABFwXP7gCINGlzp//+YbIxrS0IDtMZFZ/RalmqtRRJxHJFEs+XMeZ5chgEXu449fTHOEeYZGUNjJcqa6ELAHTJsvqfWSnp/MEaUUkDidp3wY+TPeQp1z1jnmZ4PJNEcOVPWhPo7P8VbJVtcRQyUAAAAAElFTkSuQmCC" "803" >}}

<blockquote class="important">
<p><strong>Important</strong>: This approach can also be used in other parts of your webparts/extensions. Like if you have tabs in your web part, you can cancel API calls whenever you go to another tab view.</p>
</blockquote>

Here is the full code sample (this also includes the changes from the previous blog post about managing navigation events):

{{< gist estruyf d0c118301c7ae2f001e065ad8544974f >}}

*Happy coding*
