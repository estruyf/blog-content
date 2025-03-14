---
title: Moving The Searchbox Into The Top Ribbon v4.master
author: Elio Struyf
type: post
date: 2010-08-27T14:19:03+00:00
slug: /moving-the-searchbox-into-the-top-ribbon/
dsq_thread_id:
  - 3836444950
categories:
  - Branding
  - SharePoint
tags:
  - Ribbon
  - Searchbox
  - SharePoint Foundation
  - SharePoint Server
  - v4.master
comments: true
---

I have seen that some people have difficulties with moving the searchbox position to the top ribbon in SharePoint 2010 v4.master file.

Two months ago I did this for a client to have more space for all the subsites.

Here is what I have done to let it work in IE 7 - 8 and Firefox.

```html
<asp:ContentPlaceHolder id="PlaceHolderSearchArea" runat="server">
  <SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" Version="4"/>
</asp:ContentPlaceHolder>
```

The first thing I have done is replacing the searchbox control in the masterpage to the top ribbon, besides the user menu control. You can search for "PlaceHolderSearchArea" and cut this section.

After you have cut this section search for the div with an id of "s4-trc-container-menu" (this is where the user menu control is placed). Above this div you should create a new div and place your copied code in this section. It should look like this:

```html
<div class="searchField" id="s4-searcharea">
  <asp:ContentPlaceHolder id="PlaceHolderSearchArea" runat="server">
    <SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" Version="4"/>
  </asp:ContentPlaceHolder>
</div>
```

Right now it still does not work.

{{< caption-new "/uploads/2010/08/searchbox1.png" "Searchbox position to top ribbon problems"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS41SYr84AAAAEVJREFUeJxjYExezJSymCEZjJIWsKQu5stZIV60jiFhIUPSIga1pt06rXtVGncr126161pg3rYtZ/m5aceeqzTsEi7bCgDBJxmqs1kapAAAAABJRU5ErkJggg==" "215" "43" >}}

Now we start adding the css code and it isn't that hard for IE 8 and Firefox.

```css
.searchField {
  float: left;
  padding-top: 10px;
}
```

In Internet Explorer 7 it still looks the same as before we added the css. So we need to add some css that targets only IE 7. The trick here is to give the searchbox div a width and that's it.

```css
/* IE7 Adjustments */
.searchField table.s4-wpTopTable{
  *width: 200px;
}
```

## SharePoint Foundation Solution

When you are working in a SharePoint Foundation environment, you will notice that the previous approach gives a small problem.

{{< caption-new "/uploads/2010/08/searchbox_SPF.png" "SharePoint Foundation Search Image Problem"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAAElJREFUeJwBPgDB/wCAjZm7wsm0vMS2vsa0vMS8w8rIzdPEydDT19yDjpoAi5+tq7W+qbG6qbK7qLK6qrO7rLS9q7O8sbjBkJunLPQqTMwkaG8AAAAASUVORK5CYII=" "187" "46" >}}

This problem occurs because the SharePoint Foundation search box uses an additional css class to apply the styling. 

To solve this, you need to add the "s4-search" class in the div that you created in the previous section. It should look like this for the SharePoint Foundation master page:

```html
<div class="searchField s4-search" id="s4-searcharea">
  <asp:ContentPlaceHolder id="PlaceHolderSearchArea" runat="server">
    <SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" Version="4"/>
  /asp:ContentPlaceHolder>
</div>
```

Right now it should work, but a small change to the css needs to be made. Because the "s4-search" class has its own css paddings, the paddings from our "searchField" class overwritten. 

{{< caption-new "/uploads/2010/08/searchbox_SPF2.png" "SharePoint Foundation Search Box Padding"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAAChJREFUeJxjqOue0TVtUd+sJZPmLp8yb0XHtEXO4ZlWvgm2Acnm3nEA+rsOWhiX1H4AAAAASUVORK5CYII=" "416" "46" >}}

Add `!important` to your css padding-top attribute. The css class looks like this:

```css
.searchField {
  float: left;
  padding-top: 7px !important;
}
```

The result looks like this.

{{< caption-new "/uploads/2010/08/searchbox_SPF3.png" "SharePoint Foundation Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAAChJREFUeJxjqO6c1jVtUd/MJZPmLp8yb0XX9MUu4VlWvgm2gcnm3nEA+iwOWWfEpNEAAAAASUVORK5CYII=" "416" "46" >}}

## Result

Here are some screenshots of the different browsers.

{{< caption-new "/uploads/2010/08/searchbox2_FF.png" "Searchbox position to top ribbon Firefox"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS41SYr84AAAANZJREFUeJxljEFPwjAYQPv7PYnxB3jkRELiSU1Ew2DgpDEwwwwwgtrvq6zTbTrazvYj4NGXd3vJY7276D7gvdtg0B8Ng3E05hM+G4aPEx7zwYidXfJ2uLroL1vX8/Ob+enVc+dhHSTY5W8nnZA9xdFmW2y2xQLzlfxKPwr8LPPyW1WaJykDAGvMz87sTNP8OiLy3pdVRURKZexdoLWNP0B/OudUnhNRlmUsfRW1NuS9O+q9d84horX2kOu6pn9orY9zxZKXhUQQQgAAIkopJSIIkIjxbLoHyJfYDiA2XowAAAAASUVORK5CYII=" "605" "481" >}}

{{< caption-new "/uploads/2010/08/searchbox3_IE8.png" "Searchbox position to top ribbon IE8"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS41SYr84AAAANRJREFUeJxdjFFLwlAYQO+/7yGFfkBiGFGyzRlaWD6FwnwQFAZuu15JS5luQ5IR997P3e+T9SJ5Xg/nsId2r9l6bljd2qNbf2rfOy9N99VyO3b33XY67Nru3w2i2w9efZvd9MNKb2aNxDDcWOPVleOx7WZ+BNBaAWgAIEJCo6QkojRJ2OfyWyr9q48SCiiMQSyM+TnkRLTbJWz5tf6LziBiut+XdZqy1TqWWpv/xPFWKlXqPC8/iHgxIKIsy9h0MlkIwaNozrngPAhC3/fDIFgI4XneCX8I1FT2qa/BAAAAAElFTkSuQmCC" "605" "469" >}}

{{< caption-new "/uploads/2010/08/searchbox4_IE7.png" "Searchbox position to top ribbon IE7"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS41SYr84AAAAMtJREFUeJxVzTFPwkAYxvH77Cw64OBgNKgxGKSJJioYJYwdwcTBsBjj0l4K5Q5q7OH79mnvXmNY4Lf9hyePOryITqKndm/UOr8/6j4c3ww70eP17eDy7vngtKeuxvHLbDF8z/rTJHpN+pMk/shnuog/V2fjN2Wyr6bGLxHAFcDEAGhTiogxRiV6TlxtGIQGjefa143//imDSL40KtUZUMu+pbU+BGutSuc5Vwj77HpNzNYa5ZwTkRDC7nqb/99FUQCodjBR6Zz3PtX6D+Eg2IEIa6gGAAAAAElFTkSuQmCC" "605" "501" >}}

## Update

### Added SharePoint 2010 Foundation Section: 22/06/2011

A commenter called Dave pointed me out that there was a problem when you want to apply this to a SharePoint 2010 Foundation environment. The problem that arises with the SharePoint Foundation master page is that the search image is displayed below the search box.

{{< caption-new "/uploads/2010/08/searchbox_SPF.png" "SharePoint Foundation Search Image Problem"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAAElJREFUeJwBPgDB/wCAjZm7wsm0vMS2vsa0vMS8w8rIzdPEydDT19yDjpoAi5+tq7W+qbG6qbK7qLK6qrO7rLS9q7O8sbjBkJunLPQqTMwkaG8AAAAASUVORK5CYII=" "187" "46" >}}