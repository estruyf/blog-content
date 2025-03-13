---
title: Do something after all refiners templates have completed rendering
author: Elio Struyf
type: post
date: 2016-01-22T09:03:43+00:00
slug: /do-something-after-all-refiners-templates-are-rendered/
dsq_thread_id:
  - 4512991933
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Template
  - JavaScript
  - Refiners
  - Search
comments: true
---

If you created your own display templates, you most probably have used the **AddPostRenderCallback** function. The AddPostRenderCallback function allows you to execute code once the display template completed rendering and this function can be used in every template (control, item, ...).

Now when you are creating your own refiner display templates and want to do something once all the refiners are rendered, the first approach would be to create a AddPostRenderCallback function in the refinement control template. If you would do this, you will notice that this function is going to get executed even before one of the refiners gets rendered. This is because the rendering of the refiner templates is works differently compared to that of a normal search result display template.

## Search template rendering

When you are using a search result web part, you have a **control**, **group** and **item** display template which will be used to render your results on the page. The control template is going to call the group template to render the group HTML with the following piece of code:

```JavaScript
ctx.RenderGroups(ctx)
```

The group template starts rendering the items with the following piece of code:

```JavaScript
ctx.RenderItems(ctx)
```

The item template passes the item HTML mark-up back to the group template, which on its turn passes it back to the control template.

{{< caption-new "/uploads/2016/01/012116_2011_Dosomething1.png" "Display template rendering flow" >}}

So if you use the AddPostRenderCallback function in the control template, this will get executed once the group and item templates are completed rendering.

## Refinement template rendering

The refiner templates rendering works differently compared to search results templates. First of all, the refinement control panel gets rendered (control_refinement.js) on the page. This results in a panel with empty DIV elements which are used as placeholders for rendering the individual refiners (ex: filter_default.js or filter_sliderbargraph.js).

Once the refinement panel is added to the page, the SharePoint JavaScript renders each refiner control and adds the HTML mark-up to the foreseen DIV element which got created with the refinement control template.

All this is achieved by the **Srch.Refinement.prototype.render()** function. The code of the render function looks like this:

```JavaScript
render: function Srch_Refinement$render() {
    this.$4q_4();
    // Render the refinement control panel
    Srch.DisplayControl.prototype.render.call(this);
    if (!Srch.U.n(this.$7_4)) {
    	// Render each refiner
        for (var $v_1 = 0; $v_1 < this.$7_4.length; $v_1++) {
            this.$5P_4(this.$7_4[$v_1]);
        }
    }
    var $v_0 = $get(this.get_emptyRefinementMessageId());
    if (!Srch.U.n($v_0)) {
        if (this.get_shouldShowNoResultMessage()) {
            Srch.U.ensureCSSClassNameNotExist($v_0, 'ms-hide');
        }
        else {
            Srch.U.ensureCSSClassNameExist($v_0, 'ms-hide');
        }
    }
    this.updateDisplayControlWithNewMessages();
    this.raiseResultRenderedEvent(new Srch.ResultEventArgs(this.$B_3));
}
```

> **Note**: line 4 renders the refinement control panel on the page, line 7 - 9 is going to render each refiner to the page.

Every time a template is completed rendering, it triggers the JavaScript code to call the **AddPostRenderCallback** function. So in case of the refinement control template, it gets called right after the rendering on line 4. Which is before the rendering of the individual refiner templates on line 7 - 9.

## Solution

In order to do something once all refiners are completed rendering you have a couple of options:

1.  Modify your refiner templates by adding an AddPostRenderCallback function with some logic that checks if other templates still have to load;
2.  Override the default refinement render function and add your own logic after the render function;

> **Note**: Mikael Svenson has also another approach, which you can read on his blog - [Do something after all refiners templates have completed rendering](http://www.techmikael.com/2016/01/do-something-after-all-refiners.html)

The first approach would require a lot of changes to your default refiner templates. So it is better to go for the second one.

Here is the code that can be added to your refinement control template:

```JavaScript
if (typeof Srch.Refinement !== "undefined") {
    Srch.Refinement.prototype.originalRender = Srch.Refinement.prototype.render;
    Srch.Refinement.prototype.render = function() {
        // Do something before the refiner rendering
        console.log('This is logged before the rendering started');

        // Call the original render function
        this.originalRender();

        // Do something after the refiner rendering
        console.log('This is logged when rendering is completed');
    };      
}
```


## Download

The display template that has been created for this article can be found in the SPCSR GitHub repository: [Execute code after all refiners are completed rendering](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Refiners/Execute%20code%20after%20all%20refiners%20are%20completed%20rendering)