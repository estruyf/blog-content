---
title: 'Fix: Search Box Suggestions Layout Problem When Used Outside a Search Center'
author: Elio Struyf
type: post
date: 2011-08-22T13:48:19+00:00
slug: /fix-search-box-suggestions-layout-problem-when-used-outside-a-search-center/
dsq_thread_id:
  - 3836444756
categories:
  - Search
  - SharePoint
  - Styling
tags:
  - CSS
  - Search
  - Searchbox
  - Styling
comments: true
---

Some time ago, I wrote about a layout problem when using the [People Search Box Web Part outside a SharePoint Search Center](https://www.eliostruyf.com/fix-people-search-box-has-layout-problems-when-used-outside-a-search-center/). Other layout problems occurs when you enable **Query Suggestions** for the **Search Box Web Part**.

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo1.png" "Query Suggestions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA/klEQVR4nD2OuW7DMBBE+f/fFVVJDBVOIVN2HMk6yF1SPCTA3KXFwAaSV0w380bUdV29VVVVvX98Ho9fTXOSsj2dZNueD4daDMNwfiGftACAiABgrf3petF1nZTycr40TSNlq5QCAK01In5fr2JZlmkcp3Hq+1vf9aDBORdC2LZtmmfhfAS0iBaNNWYZpxnQJuJSivNBxBBBgzUWEZXWzrl934molBJCFDk/iDNRfibnRJyIY9z2/a/d3watQSltjLXGjuM0K8WcQ1wFc06JmDO/Zh6PEtdVafx3h3lWxi5KqecvMABGa73vxb/cmYiY+Z7uKSVmJiLvfSnF+/ALt3UxKVvLG3QAAAAASUVORK5CYII=" "249" "286" >}}

What I experienced is that two different layout problems occur:

1.  When Search Suggestions are enabled for the Search Box in the Top Navigation Menu;
2.  When Search Suggestions are enabled for a Search Box on a page.

## Fix Search Suggestions When Used in Top Navigation Menu

### Problem

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo2.png" "Search Suggestions Problem in the Top Navigation Menu"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nGXJQQ7AIAgFUe5/0SbiVyyC0FXjzsSX2Q1F5FnmxxAZ2odWCOVlT52lMFcQmkwzP8RaTf3pjtd+qkFV8N6T4vAAAAAASUVORK5CYII=" "290" "97" >}}

### Solution

The following CSS code solves the layout problem.


```css
.srch-AutoCompContainer {
	display: block !important;
	top: 88px !important;
	min-width: 218px;
}

.srch-AutoCompListItem,
.srch-AutoCompHListItem {
	display: block !important;
}
```


**The CSS top attribute value depends on the height of the s4-titlerow**.

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo3.png" "Search Suggestions Fixed in the Top Navigation Menu"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAY0lEQVR4nFXJywoCMQwF0Pz/LwpuBnwxNk3bDLlNWmUUFc/2EPoPenf3lEupTarmUgmA/WPe/3y5rXcmkQKzjt27Abvm1nQ7LIm42UkMMcd8fHkM9zA4ieK46pI2VoyPiJgvT6v2kJssT97VAAAAAElFTkSuQmCC" "289" "152" >}}

## Fix Search Suggestions When Used on a page

### Problem

Search Suggestions are being displayed on top of the Search Box.

{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo4.png" "Search Box on a page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAALklEQVR4nFXBMRIAIAgDMP7/WQcoBU7QVROBuxoyPpWxFMYUZ8BjZvpxppXF2hcIzTpWhsi1lwAAAABJRU5ErkJggg==" "251" "51" >}}
{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo5.png" "Suggestions are displayed on top of the search box"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATElEQVR4nGXEQQqAMBAEwfz/iR4VBBGDB6POZHdWogcFi6bTCZwAyPpDMoF1XI+5MCIUL0lmngAOee+mrV9KLpT8YbfU5l7NzVtfki5aDXVEXhjd0gAAAABJRU5ErkJggg==" "253" "91" >}}

### Solution

The following CSS code solves the layout problem.


```css
.srch-AutoCompContainer {
    top: 34px;
}

.srch-AutoCompList {
    min-width: 218px !important;
}
```


{{< caption-new "/uploads/2011/08/082211_1348_FixSearchBo6.png" "Search Suggestions fixed on a page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAXElEQVR4nDXCWQ7CMAwFwNz/jvBZIaXQRLXr5Tk2QsBo2jl3mt1lCg3lX+Pj8XyJo4lwH8SqVcjw7wpXs1jZ1HDrfN+vbRpZVFXWx8pcazUAJD7YTjF1xB+AzHwD8pd0FhzykZwAAAAASUVORK5CYII=" "257" "113" >}}

## Changes

### CSS update: 02/11/2011

Changed the width parameter to **min-width**. This allows the suggestion box to automatically expand based on the suggestion text size.