---
title: Hiding the content by search web part (title) when there are no results
author: Elio Struyf
type: post
date: 2015-10-22T08:46:57+00:00
slug: /hiding-the-cswp-title-when-there-are-no-results/
dsq_thread_id:
  - 4248132875
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

If you are using content by search web part (CSWP), it might sometimes happen that no results are retrieved for a particular query. When this happens, the CSWP will by default not render any mark-up, but you can also configure the web part to show a message when no results are retrieved.

{{< caption-new "/uploads/2015/10/102215_0846_Hidingtheco1.png" "Show a no result message"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAoklEQVR4nGWJuQ4CMQxE8/9/tiVIS0PBJqHjcpxjE9uJEaFB4ulpNJoxRJQrQSYs/IgtVdFJJcFCJud8e8AT91IZUitNxoS4pyompRgj6mfp35wMZqp1N0RNhFXn9YcJiCFGYumqQ7VPh6r0TkSmpYT3ewbQ1saPfd+pFBOOB/DXYB16D9sGmw3WgrXgXLtcDC7LbV1fp5N4z1+dY/cp/Xx+A8Bg5XOrncxHAAAAAElFTkSuQmCC" "242" "187" >}}

Depending if this option is checked or not, you get one of the following output:

{{< caption-new "/uploads/2015/10/102215_0846_Hidingtheco2.png" "Web part configuration examples"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARUlEQVR4nGXKUQrAMAgDUO9/VkFhuq2plmHdvvYIIR8hP68bc8yooDoy15aZNBqQPxFBx/aePgC6SUSYWVVtq28vM3d/AGIedGWBYkmkAAAAAElFTkSuQmCC" "987" "436" >}}

> **Note**: The second web part is configured to show a no results message. The last web part is configured as default to not show.

This is how the web parts render when the page is not in edit mode.

{{< caption-new "/uploads/2015/10/102215_0846_Hidingtheco3.png" "Web part output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nG3JMQ4AIQwDwfz/vRewYwcQVzPVShs5a9ID/qCkB51Q4gbK0b/VvV9CEsmSnvsABxJYq8gqtnAAAAAASUVORK5CYII=" "629" "179" >}}

Nothing special of course, but if you configure the web parts to show the web part title they render a bit differently.

{{< caption-new "/uploads/2015/10/102215_0846_Hidingtheco4.png" "Web part output with title"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASElEQVR4nG3JSQ7AMAgEQf7/XrMMDDiKb7FS6luLqppZAHPbMyOOQrUnFfSkg3ZyENWSQETkCyT3l0TEWsvdM7O7782qrONvP415k397DJ+wAAAAAElFTkSuQmCC" "623" "281" >}}

As you can see, the web part titles will always be visible even if there are no results to show. In this case the last web part takes up unnecessary space on your page and this could affect your design. This can be solved by adding some additional code to your control template in order to hide the web part completely when you do not retrieve results.

## Hiding the web part (title) when no results are retrieved

In your control display template you can find the following code at the end:

```html
<!--#_
if (ctx.ClientControl.get_shouldShowNoResultMessage())
{
_#-->
        <div class="_#= noResultsClassName =#_">_#= $noResults =#_</div>
<!--#_
}
_#-->
```

This block will show the no result message when no results are retrieved. In order to hide the web part, this block needs to be updated to the following:

```html
<!--#_
// Check if the web part should be hidden (when no results are retrieved)
if (ctx.ClientControl.get_shouldShowNoResultMessage()) {
    var containerClass = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_hide");
    AddPostRenderCallback(ctx, function() {
        // Check if page is in edit mode
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode;
        var wikiInEditMode = document.forms[MSOWebPartPageFormName]._wikiPageMode;
        var inEdit = false;
        if (typeof inDesignMode !== "undefined") {
            inEdit = inDesignMode.value === "1" ? true : false;
        }
        if (typeof wikiInEditMode !== "undefined") {
            inEdit = wikiInEditMode.value === "Edit" ? true : false;
        }
        // Hide the webpart when page is not in edit mode
        if (!inEdit) {
            var container = document.getElementsByClassName(containerClass);
            if (container.length) {
                var elm = container[0];
                while ((elm = elm.parentElement) && !elm.classList.contains('s4-wpcell-plain'));
                if (typeof elm !== "undefined" && elm !== null) {
                    elm.style.display = "none";
                }
            }
        }
    });
_#-->
    <div class="_#= containerClass =#_"></div>
<!--#_
}
_#-->
```

> **Note**: if the page is in edit mode, the code will not hide the web part.

Once this code is in place, the web parts render as follows:

{{< caption-new "/uploads/2015/10/102215_0846_Hidingtheco5.png" "Web part configuration examples"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nFXOQQ4EIQhEUe9/VyMKoghlOtq9mHn5iworUpUhasNirhh2mgvABnZgJ1sOhHuc2z9gJxYhot67X+HxjQOJass5l1KYWa53MLPqTI2lEhGVVquqzh9mluaKADy+4n705rEfmDiuzmIldV8AAAAASUVORK5CYII=" "898" "570" >}}

{{< caption-new "/uploads/2015/10/102215_0846_Hidingtheco6.png" "Web part output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATUlEQVR4nGWJQQ6AMAzD9v/vrmq7tMkQAg6AlUNkj2luHp5YxWuJ+zQ1UF3Nai5U9anQaqooag8AmQmgAJL7zYgIs+nuACR9sx5I/vMBj+CTtUFJ1FwAAAAASUVORK5CYII=" "640" "312" >}}

> **Note**: as you can see in the screenshot above, the last web part (title) is not visible on the page when no results are retrieved.

## Download and configuration

The control template from this article can be downloaded from the SPCSR GitHub repository: [Control template](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Hiding%20the%20CSWP%20title%20when%20there%20are%20no%20results).

Once you downloaded the template, you need to place it in the master page gallery of your site collection. Your CSWP needs to be configured to use the **List (hide)** control template and to show a message when there are no results (this is required in order to execute the additional code).

{{< caption-new "/uploads/2015/10/102215_0846_Hidingtheco7.png" "Web part configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAsklEQVR4nE3E4WrDIBAAYN//9TZKuzFSGgnnnddo4tSopyX0T+HjUzlGv0Veg98icdhDGrWOVuN/dltS4Xqlv3tYTFxw15CBBvNgLmjTfVbhdkMAj6bnPI7cc5J0qjnlaVLH/CjGVGOEqBO9fxMA5UJwMRURGaN/aL2X1lQhDI85LktnFmuFWfi8ER7Pp3KXy2qtQ9yIVkR3Io/omYvWav/6tj+/+zSJMQ2gAcjJNDBd6xer1uF/3+fj+gAAAABJRU5ErkJggg==" "241" "183" >}}