---
title: Pinning SharePoint 2010 Sites With IE9
author: Elio Struyf
type: post
date: 2011-04-11T16:04:37+00:00
slug: /pinning-sharepoint-2010-sites-with-ie9/
dsq_thread_id:
  - 3858764642
categories:
  - Branding
  - Master Page
  - SharePoint
tags:
  - IE9
  - jQuery
  - Master Page
  - v4.master
comments: true
---

Thanks to [Katrien De Graeve](http://blogs.msdn.com/b/katriend/) for giving me the inspiration of this blog post. Last week on the HTML5 Web Camp session in Belgium, she talked about the site pinning functionality of IE9. She also recommended a jQuery plugin called [ie9ify](http://ie9ify.codeplex.com/) that makes site pinning integration much easier. The day after the session I started experimenting with the ie9ify plugin, and it was working as suspected.

But "easier" was not the case when I tried to implement it in SharePoint 2010. Several problems occurred, so I tried an alternative solution of adding the site pinning functionality to my SharePoint site. In this blog post I will give you a brief overview of the ie9ify with SharePoint 2010 problems, and explain my alternative solution.

The end result will be:
{{< caption-new "/uploads/2011/04/041111_1604_PinningShar1.png" "IE9 Site Pinning with Custom Jump List"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAIAAACZwRr8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABj0lEQVR4nE3JPW/TQACA4fsd/AvYmJk7ImChMxtTZ8TapcwsFYgiIdLy0aoVIJCVoIJD6o/ENnUdp/Y5dmI7sWPnfGffnQ8FFl492wsUw1GvYvVyarizMUzGMHGDDQcm8sUQmKaWw8F1mHlBFC/ymgnyF2bix0AHzm8FedIEzoNpiGtaU/4PoXygDoFtKZUvhfNlUayahgoh2naDt0JWdGCZagV7QRjXBIv/aoU4/6UD01DLybc0Q4QQjAmlnHPBuWBMfO9rwDDUtde1rjwfBnGywKRhXFDWNrTt9TWgmnYUhkm2zooK1xwRighDhK0J68kaGBiu5S9hGPthMoEzbxovC1xitkK019eBarlxvp4tyigt4qyKM5QjtqrYoqw3Wx45+mQ+NGxtZJuX7shyXD8KojQvm66sgYvR2LF9GKXXcB6lZYH5CtESM8zET8UAx6edg867NyfSy8PTk8/S0dnX/c7H/bcfnr8+fHX0Hjx7cmN758HTF18e7+59Us4PpO7t7bs372/durd159HDPzEXadvA+QoWAAAAAElFTkSuQmCC" "289" "415" >}}

## Problems with ie9ify and SharePoint 2010

The first problem was the following JavaScript error: "Object doesn't support property or method 'ie9ify'". This error can be solved when all the necessary scripts are moved to the bottom of the master page.

After this fix, the next problem occurred. The meta tags were not added on every page load. Maybe this has something to do with the JavaScript of SharePoint itself.

Another problem was that only the navigation button color were working.
{{< caption-new "/uploads/2011/04/041111_1604_PinningShar2.png" "Navigation Buttons"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAxUlEQVR4nAG6AEX/AKi5yK3F4rrK2LG+yrPJ4b/U6bTI3anA2qS50ae+1QCkvNbKtIP0uEvyuE3Jt46vxd6ovtawuLquusKjvtwAycCk/7Yq+MJe+7s//7Yqubqvw7ia+rc+77dPvMC6AM+pXO+qLOrGhOGwVe6jGcatd9qpSu6sNvGzRM2rZQC8sJHxlgDwqyzyngvwlgC1t627rIbxnQLlnhmusaUAmq/GuJlay5Y0y5c2sphim7POmbHMnKCal5+jlbDPeOJ3Vi5W9jQAAAAASUVORK5CYII=" "71" "41" >}}
All the other functionality like adding links to the jump lists were not working.

## Alternative site pinning solution

Because of all these problems with of implementing ie9ify with SharePoint, I started to create my own solution to make it work.

I started adding the meta tags with regular JavaScript, so that the code does not need to wait until the page is fully loaded.


```javascript
AppendToHead("application-name", document.title.toString());
AppendToHead("msapplication-tooltip", document.title.toString());
AppendToHead("msapplication-starturl", "http://" + location.host);
AppendToHead("msapplication-navbutton-color", "Orange");

function AppendToHead(name, content) {
  var headID = document.getElementsByTagName("head")[0];      
  var newMeta = document.createElement('meta');
  newMeta.name = name;
  newMeta.content = content;
  headID.appendChild(newMeta);
}
```


After some testing, the meta tags are added every time the page is loaded, and the site can be pinned to the taskbar.

## Custom Jump lists

The next step is to create a custom jump list with all the SharePoint lists that are visible in the Quick launch.

The first thing you need to do, is to check if the site is opened in pinning mode. This can be checked with the following statement:


```javascript
if (window.external.msIsSiteMode()) { }
```


After that you need can start by creating your custom jump list. To add links to the jump list, I made use of jQuery to iterate over each list item anchor element in the quick launch.


```javascript
$(function() {				
  //Clear jumplist
  window.external.msSiteModeClearJumplist();
  //Create a new jumplist
  window.external.msSiteModeCreateJumplist("SharePoint Lists");
  
  //Add links	to the jumplist			
  $('.ms-quickLaunch ul li>ul>li>a').each(function() {					
    var $el = $(this);
    window.external.msSiteModeAddJumpListItem(
      $el.text(), 
      $el.attr('href'), 
      "http://" + location.host + $('link[type^=image]').attr('href')
    );
  });
    
  //Display jumplist
  window.external.msSiteModeShowJumplist();
});
```


## The code

This is the full code block that can be added in the head section of the master page.


```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js" type="text/javascript"></script>
<script type="text/javascript">        
  //Check if site is pinned
  if (window.external.msIsSiteMode()) {
    $(function() {				
      //Clear jumplist
      window.external.msSiteModeClearJumplist();
      //Create a new jumplist
      window.external.msSiteModeCreateJumplist("SharePoint Lists");
      
      //Add links	to the jumplist			
      $('.ms-quickLaunch ul li>ul>li>a').each(function() {					
        var $el = $(this);
        window.external.msSiteModeAddJumpListItem(
        $el.text(), 
        $el.attr('href'), 
        "http://" + location.host + $('link[type^=image]').attr('href')
        );
      });
      
      //Display jumplist
      window.external.msSiteModeShowJumplist();
    });
  }
  else {
    //Add meta tags
    AppendToHead("application-name", document.title.toString());
    AppendToHead("msapplication-tooltip", document.title.toString());
    AppendToHead("msapplication-starturl", "http://" + location.host);
    AppendToHead("msapplication-navbutton-color", "Orange");
  }
  
  function AppendToHead(name, content) {
    var headID = document.getElementsByTagName("head")[0];      
    var newMeta = document.createElement('meta');
    newMeta.name = name;
    newMeta.content = content;
    headID.appendChild(newMeta);
  }
</script>
```


## End Result

{{< caption-new "/uploads/2011/04/041111_1604_PinningShar1.png" "IE9 Site Pinning with Custom Jump List"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAIAAACZwRr8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABj0lEQVR4nE3JPW/TQACA4fsd/AvYmJk7ImChMxtTZ8TapcwsFYgiIdLy0aoVIJCVoIJD6o/ENnUdp/Y5dmI7sWPnfGffnQ8FFl492wsUw1GvYvVyarizMUzGMHGDDQcm8sUQmKaWw8F1mHlBFC/ymgnyF2bix0AHzm8FedIEzoNpiGtaU/4PoXygDoFtKZUvhfNlUayahgoh2naDt0JWdGCZagV7QRjXBIv/aoU4/6UD01DLybc0Q4QQjAmlnHPBuWBMfO9rwDDUtde1rjwfBnGywKRhXFDWNrTt9TWgmnYUhkm2zooK1xwRighDhK0J68kaGBiu5S9hGPthMoEzbxovC1xitkK019eBarlxvp4tyigt4qyKM5QjtqrYoqw3Wx45+mQ+NGxtZJuX7shyXD8KojQvm66sgYvR2LF9GKXXcB6lZYH5CtESM8zET8UAx6edg867NyfSy8PTk8/S0dnX/c7H/bcfnr8+fHX0Hjx7cmN758HTF18e7+59Us4PpO7t7bs372/durd159HDPzEXadvA+QoWAAAAAElFTkSuQmCC" "289" "415" >}}
The only thing that is not working is the taskbar icon. For some reason IE9 does not take the favicon, on a custom HTML sample page with the same favicon it works correctly. If you have any advice or a solution, feel free to add a comment.

## References

[http://msdn.microsoft.com/en-us/library/gg131029%28VS.85%29.aspx](http://msdn.microsoft.com/en-us/library/gg131029%28VS.85%29.aspx)

## Updates

### Site Icon: 15/04/2011

The site icon problem has something to do with the "msapplication-starturl" meta tag. If you specify a full URL or do not implement the meta tag, then the site icon works. 

{{< caption-new "/uploads/2011/04/SiteIcon.jpg" "Working Site Icon"  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAdEAABBAIDAAAAAAAAAAAAAAACAAEDBCGhEhOS/8QAFQEBAQAAAAAAAAAAAAAAAAAABQb/xAAeEQAABgIDAAAAAAAAAAAAAAAAAQIDBCERElHR8P/aAAwDAQACEQMRAD8AqNmdqVYo7TySGUbcCEsDjG9KZFassTt3H6dEUtCUZOOY57Cs9CdG69Q//9k=" "59" "38" >}}