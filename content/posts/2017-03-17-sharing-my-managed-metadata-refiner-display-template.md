---
title: Sharing my managed metadata refiner display template
author: Elio Struyf
type: post
date: 2017-03-17T11:16:57+00:00
slug: /sharing-my-managed-metadata-refiner-display-template/
dsq_thread_id:
  - 5640292079
categories:
  - Display Templates
  - Search
  - SharePoint
tags:
  - Display Templates
  - JavaScript
comments: true
---

Do you have a refiner template that shows the refiners based on the hierarchy of a term set, or can you explain how to build it?

These are probably two of the most asked questions I received the last couple of months/years. Back in 2015 I created such a template, but never shared it until today.

The template that is shared renders the following output:

{{< caption-new "/uploads/2017/03/Screenshot-2017-03-17-13.09.41.png" "Refiner output example" >}}

This corresponds to the exact same hierarchy of the term set:

{{< caption-new "/uploads/2017/03/Screenshot-2017-03-17-13.13.08.png" "Term set hierarchy" >}}

The template only applies a simple styling to indent the children but does nothing more. If you want, you are free to style it to your needs.

## Where can you find the template?

The managed metadata template can be found in the SPCSR GitHub repository: [Managed metadata refiner](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Refiners/Managed%20metadate%20refiner).

## Things you need to know about the template

There are a couple of things you need to know before you can start using this template.

1.  You will find <del>two</del> three templates in the repository. One for working with the term label value, one to work with the taxId value and one with which you are able to also filter on the parent terms. By default, SharePoint provides you the taxId managed property. But if you follow the best practices for working with managed properties in combination with managed metadata it could be that you configured it to use the label instead. Be sure to pick the right one.
2.  The template requires you to specify the term store ID. This is required for the template to retrieve all the terms from the term set. This is all explained on GitHub, so be sure to go through the configuration steps before uploading the template to your environment.

## Updates

### 23/03/2017

I just added a third template with which you can refine based on the parent terms. Here is an example:

{{< caption-new "/uploads/2017/03/refiner-template-parent.png" "Parent terms are refinable" >}}

If you compare this one, to the first image at the top. You will notice that **Europe** is now refinable. When you click on it, it will return all its children, so this allows you to go deeper into the hierarchy.