---
title: Transform the “SharePoint” Suite Bar Text into a Breadcrumb with PowerShell
author: Elio Struyf
type: post
date: 2013-03-11T11:18:49+00:00
excerpt: |
  Where is the breadcrumb in SharePoint 2013? There isn't one out-of-the-box, but this post helps you to get one back. 
  The out-of-the-box Seattle or Oslo master pages don't have a breadcrumb located in their HTML markup. That makes navigating from sub-sites to their parent site difficult, if you have not set a good global navigation structure.
slug: /transform-the-sharepoint-suite-bar-text-into-a-breadcrumb-via-powershell/
dsq_thread_id:
  - 3836445866
categories:
  - SharePoint 2013
  - Styling
tags:
  - Breadcrumb
  - ECMAscript
  - PowerShell
  - Styling
comments: true
---

Where is the breadcrumb in SharePoint 2013? There isn't one out-of-the-box, but this post helps you to get one back.

The out-of-the-box Seattle or Oslo master pages don't have a breadcrumb located in their HTML markup. That makes navigating from sub-sites to their parent site difficult, if you have not set a good global navigation structure.

This got me thinking about a solution to create a breadcrumb that could easily be added to the SharePoint sites.

## The Idea

A few weeks ago I was playing with the **SuiteBarBrandingElementHtml** property to change the SharePoint text in the top left corner to my company name.

> **Note**: there are already a few blog posts about this topic, so I will not explain this. Here is the blog post of Tobias Zimmergren on how you could change the text: [Change the "SharePoint" text in the top left corner](http://zimmergren.net/technical/sp-2013-tip-change-the-sharepoint-text-in-the-top-left-corner).

Changing the SharePoint text to your company name could be nice if you want some extra visibility, but still I find it a bit of unused space.

So this was the starting point of my idea, what if this could be replaced with a usable breadcrumb? That would certainly make navigating through sites a bit easier.

## The Solution

The **SuiteBarBrandingElementHtml** element only allows html code to be added, because it will just show it as plain text on your page. My approach is to make use of some SharePoint ECMAScript to retrieve the parent sites of the current site you are on, and create a breadcrumb with this information.

### Code

First of all we need some JavaScript code:

{{< highlight javascript "linenos=table,noclasses=false" >}}
(function () {
  if(document.addEventListener ) {
      document.addEventListener('DOMContentLoaded', function() {
          EnsureScriptFunc('sp.js', 'SP.ClientContext', JavascriptBreadcrumb);
      }, false);
  } else {
      window.setTimeout(function() {
          EnsureScriptFunc('sp.js', 'SP.ClientContext', JavascriptBreadcrumb);
      }, 0);
  }

  function JavascriptBreadcrumb() {
      this.elm = document.getElementById('javascript-breadcrumb');

      // Show the list link
      var list = "";
      if (ctx !== null && typeof ctx !== "undefined" && _spPageContextInfo.pageListId !== null && typeof _spPageContextInfo.pageListId !== "undefined") {
        if (ctx.listName !== null && typeof ctx.listName !== "undefined") {
            if (_spPageContextInfo.pageListId.toUpperCase() == ctx.listName.toUpperCase()) {
                list = "<a href='" + ctx.listUrlDir + "' title='" + ctx.ListTitle + "' style='color:#fff'>" + ctx.ListTitle + "</a> > ";

                // Check if you are inside a folder
                if (typeof ctx.rootFolder !== "undefined" && ctx.rootFolder !== "") {
                    var listUrl = decodeURIComponent(ctx.listUrlDir);
                    var rootFolder = decodeURIComponent(ctx.rootFolder);
                    rootFolder = rootFolder.replace(listUrl, "");

                    var folders = rootFolder.split("/");
                    for (var i = 0; i < folders.length; i++) {
                        if (folders[i] !== "" && typeof folders[i] !== "undefined") {
                            listUrl = listUrl + "/" + folders[i];
                            list += "<a href='" + listUrl + "' title='" + folders[i] + "' style='color:#fff'>" + folders[i] + "</a> > ";
                        }
                    }
                }
            }
        }
      }

      this.breadcrumb = "<a href='" + _spPageContextInfo.webAbsoluteUrl + "' style='color:#fff;'>" + _spPageContextInfo.webTitle + "</a> > " + list + "<span style='font-style:italic;'>" + document.title + "</span>";
      this.elm.innerHTML = this.breadcrumb;

      var clientContext = new SP.ClientContext.get_current();
      this.web = clientContext.get_web();
      this.parentweb = this.web.get_parentWeb();

      clientContext.load(this.parentweb);
      clientContext.executeQueryAsync(Function.createDelegate(this, onQuerySuccess), Function.createDelegate(this, onCreationFail));
  }

  function onQuerySuccess() {
      try {
          if (typeof this.parentweb.get_title() !== "undefined" && this.parentweb.get_title().toLowerCase() !== "intranet") {
              this.breadcrumb = "<a href='" + this.parentweb.get_serverRelativeUrl() + "' style='color:#fff'>" + this.parentweb.get_title() + "</a>" + " > " + this.breadcrumb;
              this.elm.innerHTML = this.breadcrumb;

              var clientContext = new SP.ClientContext(this.parentweb.get_serverRelativeUrl());
              this.web = clientContext.get_web();
              this.parentweb = this.web.get_parentWeb();

              clientContext.load(this.parentweb);
              clientContext.executeQueryAsync(Function.createDelegate(this, onQuerySuccess), Function.createDelegate(this, onCreationFail));
          }
      }
      catch (e) {}
  }

  function onCreationFail() {}
})();
{{< / highlight >}}

As you can see it is not that difficult. The event listener is very important if MDS (Minimal Download Strategy) is enabled on your site, so this may not be removed (when it is removed, your breadcrumb will not render).

## PowerShell Script

Applying this breadcrumb to your sites will be done via the web application **SuiteBarBrandingElementHtml** property. To do this you could use the following script:

{{< highlight powershell "linenos=table,noclasses=false" >}}
$spInstalled = Get-PSSnapin ' Select-String Sharepoint
if (!$spInstalled)
{
    Add-PSSnapin Microsoft.Sharepoint.PowerShell
}

$app = Get-SPWebApplication -Identity http://your-web-application-url

$markup = @"
<div id='javascript-breadcrumb' class='ms-core-brandingText' style='line-height: 15px; width: auto;'></div>
<script>
(function () {
  if(document.addEventListener ) {
      document.addEventListener('DOMContentLoaded', function() {
          EnsureScriptFunc('sp.js', 'SP.ClientContext', JavascriptBreadcrumb);
      }, false);
  } else {
      window.setTimeout(function() {
          EnsureScriptFunc('sp.js', 'SP.ClientContext', JavascriptBreadcrumb);
      }, 0);
  }

  function JavascriptBreadcrumb() {
      this.elm = document.getElementById('javascript-breadcrumb');

      // Show the list link
      var list = "";
      if (ctx !== null && typeof ctx !== "undefined" && _spPageContextInfo.pageListId !== null && typeof _spPageContextInfo.pageListId !== "undefined") {
        if (ctx.listName !== null && typeof ctx.listName !== "undefined") {
            if (_spPageContextInfo.pageListId.toUpperCase() == ctx.listName.toUpperCase()) {
                list = "<a href='" + ctx.listUrlDir + "' title='" + ctx.ListTitle + "' style='color:#fff'>" + ctx.ListTitle + "</a> > ";

                // Check if you are inside a folder
                if (typeof ctx.rootFolder !== "undefined" && ctx.rootFolder !== "") {
                    var listUrl = decodeURIComponent(ctx.listUrlDir);
                    var rootFolder = decodeURIComponent(ctx.rootFolder);
                    rootFolder = rootFolder.replace(listUrl, "");

                    var folders = rootFolder.split("/");
                    for (var i = 0; i < folders.length; i++) {
                        if (folders[i] !== "" && typeof folders[i] !== "undefined") {
                            listUrl = listUrl + "/" + folders[i];
                            list += "<a href='" + listUrl + "' title='" + folders[i] + "' style='color:#fff'>" + folders[i] + "</a> > ";
                        }
                    }
                }
            }
        }
      }

      this.breadcrumb = "<a href='" + _spPageContextInfo.webAbsoluteUrl + "' style='color:#fff;'>" + _spPageContextInfo.webTitle + "</a> > " + list + "<span style='font-style:italic;'>" + document.title + "</span>";
      this.elm.innerHTML = this.breadcrumb;

      var clientContext = new SP.ClientContext.get_current();
      this.web = clientContext.get_web();
      this.parentweb = this.web.get_parentWeb();

      clientContext.load(this.parentweb);
      clientContext.executeQueryAsync(Function.createDelegate(this, onQuerySuccess), Function.createDelegate(this, onCreationFail));
  }

  function onQuerySuccess() {
      try {
          if (typeof this.parentweb.get_title() !== "undefined" && this.parentweb.get_title().toLowerCase() !== "intranet") {
              this.breadcrumb = "<a href='" + this.parentweb.get_serverRelativeUrl() + "' style='color:#fff'>" + this.parentweb.get_title() + "</a>" + " > " + this.breadcrumb;
              this.elm.innerHTML = this.breadcrumb;

              var clientContext = new SP.ClientContext(this.parentweb.get_serverRelativeUrl());
              this.web = clientContext.get_web();
              this.parentweb = this.web.get_parentWeb();

              clientContext.load(this.parentweb);
              clientContext.executeQueryAsync(Function.createDelegate(this, onQuerySuccess), Function.createDelegate(this, onCreationFail));
          }
      }
      catch (e) {}
  }

  function onCreationFail() {}
})();
</script>
"@

$app.SuiteBarBrandingElementHtml = $markup
$app.Update();
{{< / highlight >}}


## Result

{{< caption-legacy "uploads/2013/03/subfolder.png" "Show LIbrary and Folders" >}}

{{< caption-legacy "uploads/2013/03/031113_1118_Transformth1.png" "Breadcrumb Sub-Sub-Site" >}}

{{< caption-legacy "uploads/2013/03/031113_1118_Transformth2.png" "Breadcrumb Sub-Site" >}}

{{< caption-legacy "uploads/2013/03/031113_1118_Transformth3.png" "Breadcrumb Top Site" >}}

## Download

Download the script here: [Suite-Bar-Breadcrumb.ps1 - update](uploads/2013/08/Suite-Bar-Breadcrumb.ps1-update3.txt)

## Revert to the default

If you want to revert to the default SharePoint text, it only requires to run the following script.

{{< highlight powershell "linenos=table,noclasses=false" >}}
$spInstalled = Get-PSSnapin ' Select-String Sharepoint
if (!$spInstalled)
{
    Add-PSSnapin Microsoft.Sharepoint.PowerShell
}

$app = Get-SPWebApplication -Identity http://your-web-application-url
$markup = "<div class='ms-core-brandingText'>SharePoint</div>"
$app.SuiteBarBrandingElementHtml = $markup
$app.Update();
{{< / highlight >}}


## Updates

### 13/06/2013

This solution won't work on SharePoint Foundation farms, on these farms the **SocialRibbonControl** feature is not present. A workaround could be to create your own solution (with an element file) to apply the control to the pages.

The element file looks like this:

{{< highlight html "linenos=table,noclasses=false" >}}
<?xml version="1.0" encoding="utf-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Control Id="SuiteBarBrandingDelegate" Sequence="100"
        ControlClass="Microsoft.SharePoint.WebControls.SuiteBarBrandingElement"
        ControlAssembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" />
</Elements>
{{< / highlight >}}


###  22/08/2013

Updated the script to make it work in IE8 and to fix a bug with checking folders.

Thank you [Vicent ](https://www.eliostruyf.com/transform-the-sharepoint-suite-bar-text-into-a-breadcrumb-via-powershell/#comment-1255 "Vicent")and [Max](https://www.eliostruyf.com/transform-the-sharepoint-suite-bar-text-into-a-breadcrumb-via-powershell/#comment-1258 "Max").

### 02/10/2013

Added the revert to default situation script.

### 21/11/2013

Updated the script based on the feedback from [Maarten](https://www.eliostruyf.com/transform-the-sharepoint-suite-bar-text-into-a-breadcrumb-via-powershell/#comment-1371 "Maarten").