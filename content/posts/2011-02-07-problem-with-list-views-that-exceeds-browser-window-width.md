---
title: Problem With List Views That Exceeds Browser Window Width
author: Elio Struyf
type: post
date: 2011-02-07T18:11:50+00:00
slug: /problem-with-list-views-that-exceeds-browser-window-width/
dsq_thread_id:
  - 3836445293
categories:
  - Branding
tags:
  - Footer
  - jQuery
  - List views
  - v4.master
comments: true
---

Last week a customer indicated that layout problems could arise with list views. The problem arises when the amount of data/columns that is visible, exceeds the browser width. This creates an empty space next to the title row when the user scrolls horizontally.

{{< caption-legacy "uploads/2011/02/020711_1811_ProblemWith1.png" "" >}}

This problem occurs when loading the page, the JavaScript of SharePoint sets the browser window width to the title row element.

After some research I found two solution to set the width of the list view to the title row.

{{< caption-legacy "uploads/2011/02/020711_1811_ProblemWith2.png" "" >}}

## Solution 1

The first solution is a CSS based and works only for IE 8, FF and Chrome. Add the following CSS code to a custom stylesheet.

{{< highlight css "linenos=table,noclasses=false" >}}
#s4-workspace {
  position: relative;
}
#s4-bodyContainer {
  position: absolute;
}
{{< / highlight >}}

## Solution 2

This solution makes use of some JavaScript to set the correct width to the title row. This solution works on IE 7, IE 8, FF, and Chrome.

The code will check if the list view width and when it is wider than the browser window width, the list view width is set to the title row.

In the code I added an array of elements to which the width needs to be set when the list view is too wide. The standard elements to which the width needs to be assigned to are the top navigation section (#s4-topheader2) and the site description section (.s4-title).

This solution also works when using my footer solution. You will just need to add the ".footer" element to the JavaScript array.

{{< highlight html "linenos=table,noclasses=false" >}}
<script type="text/javascript" src="jquery.min.js"></script>
<script>
  $(function() {
    //Retrieve the width from list view table
    var tableWidth = parseInt($("#WebPartWPQ2").width());
    
    if(tableWidth > parseInt($("body").width())) {
      //Retrieve the left margin for the quicklaunch
      var leftMargin = $("#MSO_ContentTable").css("margin-left").replace("px", "");
      var newSize = tableWidth + parseInt(leftMargin);
      
      //Array with the elements that need to get the new width
      var elmArray = new Array("#s4-topheader2",".s4-title");
      
      var arLen = elmArray.length;
      //Loop over each array element
      for ( var i = 0, len = arLen; i < len; ++i ){
        //Get the left padding size
        var leftPadding = parseInt($(elmArray[i]).css("padding-left").replace("px", ""));
        //Set the correct width to the element
        $(elmArray[i]).width(newSize - leftPadding );
      }
    }
  });
</script>
{{< / highlight >}}