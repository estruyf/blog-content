---
title: Showing Alternating Rows in the Content Search WebPart (Display Template)
author: Elio Struyf
type: post
date: 2013-08-08T15:00:55+00:00
slug: /showing-alternating-rows-in-the-content-search-webpart-display-template/
dsq_thread_id:
  - 3836446677
categories:
  - Display Templates
  - SharePoint 2013
  - Styling
tags:
  - Display Templates
  - Search
comments: true
---

Showing alternating rows can be done in various ways, you can do it via jQuery or even with CSS. Another way is to add an alternating class to the item via the Item Display Control. I'll explain the last method in this post.

> **Note**: here are the references to the jQuery and CSS methods: [jQuery Odd Selector](http://api.jquery.com/odd-selector/) - [CSS Even and Odd](http://www.w3.org/Style/Examples/007/evenodd.en.html)

## Let's start

What do you need to create an alternating row class functionality? The only thing you really need is the current item index number.

Luckily this index number can be retrieved from the current context:

```html
var currentItemIdx = ctx.CurrentItemIdx + 1;
```

> **Note**: the +1 isn't necessary, but I'll use it in a later step to check the last item.

When you retrieved the index number, the next step is to check if it's an even or odd number. This can be done by checking if the number is divisible by 2 (even numbers), if the condition is met, you can set the class name to a variable.

```html
var altClass = "";
if (currentItemIdx % 2 === 0) {
  altClass = "alternative";
}
```

This variable can be used to be added to the class property of your HTML element like this:

```html
<div class="cbs-Item _#= altClass =#_" id="_#= containerId =#_" data-displaytemplate="Item2Lines">
```

Now that you added the alternating class to the item row, you'll need to do the styling in your CSS file.

{{< caption-new "/uploads/2013/08/080813_1419_ShowingAlte1.png" "Alternating rows"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATUlEQVR4nE3LQQ6AIBAEQf7/ToMQJSrs7KKMYLiZdOrWDkCDUEEUmlKFBkLe9vQxXNrT5Zcc11nwOfiyRTkPKdlUnVnlvOUnXgWl9Lt+m8RV9h61c+EAAAAASUVORK5CYII=" "495" "128" >}}

## Extra Information

Another useful property is the RowCount, so you can check if the last item is processed:

```html
ctx.CurrentGroup.RowCount
```

Here is an example how to use it:

```html
<!--#_
if(currentItemIdx === ctx.CurrentGroup.RowCount) {
_#-->
  <div class="ms-noWrap">I'm the last row</div>
<!--#_
} else if (currentItemIdx === 1) {
_#-->
  <div class="ms-noWrap">I'm the first row</div>
<!--#_
}
_#-->
```

{{< caption-new "/uploads/2013/08/080813_1419_ShowingAlte2.png" "First row - Last row"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASElEQVR4nEXGSQ6AIBAEQP7/U0VUejaIDZrowaQOlSICJQfA8Fd8GRxz3qlW1Lxq2X7HbmYq0tyTm0te2rlTQcMloApNqRi9P6J5VgL7uWdxAAAAAElFTkSuQmCC" "504" "163" >}}