---
title: >-
  Why it is important to keep the version in sync when using the library
  component in SharePoint Framework
slug: /important-version-sync-library-component-sharepoint-framework/
author: Elio Struyf
type: post
date: 2019-11-19T13:46:07.558Z
draft: false
tags:
  - Development
  - SPFx
  - SharePoint
categories: []
comments: true
---

A couple of months ago, I moved a couple of my projects to make use of the library component in SharePoint Framework. The library component allows you to share common logic between your projects. Sharing code through your projects is having many benefits like smaller bundle sizes, more comfortable to fix bugs, no code duplication, ...

> **Information**: Official documentation of the library component is available here: [Using library component type in SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/library-component-overview)

## Important things to note about the documentation

If you head to the documentation page, it points out a couple of essential things:

- Only host **one** library component version at the time
- Not supported to have other component types
- Not supported using site collection app catalog

The first point is the most important one, as this could cause issues quickly. You must keep versions in sync. Keeping the version in sync means that whenever you update the library component, project its version number. You need to update to the same version in the projects which depend on this library component.

## It is simple enough, but issues could be huge

It is easy to understand that version numbers need to be in sync, but if you accidentally forget it or rollback to an older version. You need to remember also to rollback the library component. The error messages which SharePoint provides do not always makes things clear.

When you accidentally reference an incorrect version in a web part, you see the following message:

{{< caption "/2019/11/library-component-1.png" "Web part with an incorrect version reference"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACHSURBVB3BSw7CMBAFwX7zCVbuf0nWiEhxbA8yVXp/nlpVhIkWxp+AAgRh0MIIf74EhQncXpgZtYqtVmE4911EzYcCPJPeO1XFJonMxN1xd2KthSTGGEgiIogINkn03slMYozBdV3MOTEz3J3WGpmJmeHubJGZnOfJnBNJRATHcZCZuDutNbYf4oMzsC/8YDoAAAAASUVORK5CYII=" "813" >}}

This message tells you what the issue is. As it points out two things:

1. It cannot load the component (web part)
2. Failed to find the manifest of a component (library component) for a specific version

As you probably own both of the projects, it is easy to check the version numbers and fix the issue.

When you are using an Application Customizer, it is a bit different. There you get the following error message (in the browser its console):

{{< caption "/2019/11/library-component-2.png" "Application Customizer issue when referencing incorrect library version"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAqSURBVGN0FRX7z8jBwfD5yxeGH1+/Mvz9+5cBDP7/Z/jPwMDAyMjIAAIATEENNs9UnyQAAAAASUVORK5CYII=" "1919" >}}

This was my original issue of where it all started for me. In the above error message, you do not see any reference to the library component, so you might think that SharePoint has an issue with loading the manifest file of your application customizer, which is, of course, not the case. Debugging the SharePoint JS code, you can find out where the issue is coming.

{{< caption "/2019/11/library-component-3.png" "Debugging SP JS code"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABaSURBVDXBMQ6DMAxA0e+SilAxVr0Kvf9VmGGgCtgJwVUG3pPpO3kuhcbMEAL5VPyq9DFyC8/xYpl/3D7vF3EY0E1JdpLUaMK+VqhOIyIUPTiSYLmAO333wIE/EM8qDpxjYgcAAAAASUVORK5CYII=" "1382" >}}

By placing a breakpoint on that code and refreshing the page, the breakpoint gets hit twice, first, for the library component and second for the application customizer. 

Here is the output of the variable `n` when it first hits my breakpoint:

{{< caption "/2019/11/library-component-4.png" "Library component loading issue"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAjSURBVBXBwQ0AIAgEsJ7j8HP/1YgY2tyqed3WQRIreDMGjQ/OYwl5H6BLUQAAAABJRU5ErkJggg==" "1375" >}}

For the library component, there is no error shown in the browser console. The only pointer you have is the application customizer project ID, which might lead you to the wrong path.

<blockquote class="important">
<p><strong>Remember</strong>: Check if the version of the library component in the <code>package.json</code> file is the same as the dependency version in the <code>package.json</code> files of the depended projects.</p>
</blockquote>

*Happy coding*
