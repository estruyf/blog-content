---
title: Ultimate diagnostic display template
author: Elio Struyf
type: post
date: 2014-04-28T07:38:21+00:00
slug: /ultimate-diagnostic-display-template/
dsq_thread_id:
  - 3836535552
categories:
  - Display Templates
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

For my SharePoint Saturday Belgium 2014 session: "Sorry, something went wrong. How to start debugging your Display Templates", I created the ultimate diagnostic display template. With this display template you're able to retrieve all the available properties for your result.

{{< caption-new "/uploads/2014/04/042814_0738_Ultimatedia1.png" "Content Search Web Part Configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAIAAADt1dgcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABcklEQVR4nE2Q3W7bMAyF9f7vlRYp1ot0bX62dkOc2Ikj2ZIokZIlWh7sYNk+8IYgeA55xGbztl6/rNcvT0/Pm7fv+8OP3f6w2x8+trvtdife3z9Wq9W319efn5/H4/G8UJ/PVVVVp5OQSikpjTExxkBE+Cj06AURQsgtjheXKj3ksUwLV5c0DsJ7397kqbm2UlFM99k0TQOXmLLQxtT1ub1erpeLMcZa670vZdbIzMJacM4NMdICIoYQ8gIRiRBiZuZxzDwXjzPMnDLHGAUhdi58qdhA+tXFSsd/p1ESANDebg6Jx5LyvDSOYymFKCCRAHDLLbPgOGtzznmaplvbdqoTzvkYw+OfB6UUZhbG2LpptDZKqa7rjbVSKefcvRWzByJRcM7PNojOeUQCAEQUSqm6rnXfd0o6ALB6DgfAWjsMSRhjVG8aaRqpTWBDzH9jn73Re+3jQaWTTWczHPuY+L8xAGjA3xIVhGni5cN7pnkYhj8zNP5MHv+hvwAAAABJRU5ErkJggg==" "203" "360" >}}

When you configure the Content Search Web Part as shown above, it will output the property name, type and its corresponding value for the current result.

{{< caption-new "/uploads/2014/04/042814_0738_Ultimatedia2.png" "Output of the ultimate diagnostic template"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAATElEQVR4nE3KQQrAIAwF0dz/nnZh4ifVNNFCS0Gh+LYzZKeGGXKOiHt6NgTAzFI6mFlVW2s2XROhFHcHsEJEvBsSFncXllrrfyyjjw/LXHLMfpe19wAAAABJRU5ErkJggg==" "1177" "487" >}}

I also build in that it shows which of the values are null or empty. These values will be outputted like this:

{{< caption-new "/uploads/2014/04/042814_0738_Ultimatedia3.png" "Showing empty or null values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOklEQVR4nAXBQRLAQAQEwP3/G92UQTL2JuUm3YcvzQxARHT3rauqu1tVAA5JGGAWmV/3zLg7WU+miPyuqTcVStpGnwAAAABJRU5ErkJggg==" "355" "88" >}}

> **Note**: this display template is created for retrieving only one result.

## Office 365 and future on-premises updates

The template currently only works on on-premises, in Office 365 you first need to do some changes to the list via PowerShell to make use of the template. This is because Microsoft did some changes on the list and libraries. More information can be found in a blog post of Mikael Svenson - [Debugging Managed Properties using SharePoint Query Tool v2](http://techmikael.blogspot.no/2014/03/debugging-managed-properties-using.html "Debugging Managed Properties using SharePoint Query Tool v2").

## Download

The ultimate diagnostic display template can be found on the **SPCSR** GitHub repository: [GitHub SPCSR Project](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Ultimate%20Diagnostic%20Display%20Template%20%28CSWP%29 "GitHub SPCSR Project").

To use it, download the HTML template and upload it somewhere in your master page gallery. Configure your content search web part as shown above, and you are good to go.

Feel free to give feedback about it.