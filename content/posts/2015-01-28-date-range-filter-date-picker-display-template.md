---
title: Date range filter with date picker display template
author: Elio Struyf
type: post
date: 2015-01-28T09:45:53+00:00
slug: /date-range-filter-date-picker-display-template/
dsq_thread_id:
  - 3836535693
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Refiner
  - Search
comments: true
---

Some time ago I wrote a blog post series about creating your own search refiners for SharePoint 2013.

> **Note**: here you can find the posts - [Creating Custom Refiner Control Display Templates for SharePoint 2013](https://www.eliostruyf.com/creating-custom-refiner-control-display-templates-for-sharepoint-2013/).

A couple of persons have asked me how they could implement a date picker to the [range search refiner control](https://www.eliostruyf.com/part-7-working-ranges-search-refiner-control/) I created in the last post.

I have added the following code to the template:

{{< gist estruyf a5e5aeefef4104707ee7 >}}

To call the init function, I added the following line of code in the **AddPostRenderCallback** block:

{{< gist estruyf f088845655a644d7a8e0 >}}

The code registers the necessary jQuery files and once the init function gets called, it will add the date pickers to the two input fields.

## Result

The refiner template renders the following output:

{{< caption-new "/uploads/2015/01/012815_0945_Daterangefi1.png" "Range filter display template"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgElEQVR4nF2P3QqDMAxG8/4PWeqcF2N2tvYnSRPnaIegnrvDgS8EvF/sYI0x4/iosu379wwwc1zXXAoiXso/f5x7ThNz3VTrFREBZhKRLs3PEBF471PKqnqPIqoKKUYmbNIH+YA6ECLOPoeE75ALUjtzwMywRLKv5CINc84ot8d+aiboa6SQha0AAAAASUVORK5CYII=" "173" "134" >}}

{{< caption-new "/uploads/2015/01/012815_0945_Daterangefi2.png" "Range filter with date picker"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABA0lEQVR4nCVNy26DMBD0//9UQ0Ou6SWpRKsAZlmbR6B4DbYxYCqSOcxoHtKwUZNAVErt+x62LYSw77v3DhqOdcL6v2EgvaxhWcO6Bb+GLRyzRs1q8qxoxkbZlvxT+04v1eDJLOvi1WhHO7Pb7Xa5XJIkOZ0+oiiK4/NnFN3v3+c4vl6/mJQyTdPsheTn95E+OOdCiBIKDsicc/M8W2v84p1z1joiRaSU0t1TMmPMNE7TNOlxNMYQESJWVVUUUNeSdV0HAIj4ZkSB5VGXACgr1vc9AEgpsUQhZHkAhcBDSmRt22ZZVhTAOX+2ZS3znHMAyHMOkB7fRKS1JtLOajMNL/vOhn/fBy3SJPENqgAAAABJRU5ErkJggg==" "265" "283" >}}

## Download

The refiner display template can be downloaded here: [Date refiner with jQuery UI datepicker](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Refiners/Date%20refiner%20with%20jQuery%20UI%20datepicker).