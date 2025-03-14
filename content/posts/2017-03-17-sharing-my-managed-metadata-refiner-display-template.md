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

{{< caption-new "/uploads/2017/03/Screenshot-2017-03-17-13.09.41.png" "Refiner output example"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAACXBIWXMAABYlAAAWJQFJUiTwAAABCUlEQVR4nHXRy26CYBCGYe7/TnoHXbUbrQliQeRgFARTaeDXBETCMT9vA91I1G81iyczkxmlbVuqqqLrOoa6aRrquh7r+yhxHDOfzzFNE8MwUFWV2WzGfr8fQd/3/zDPc6IoIgxDHMfB8zyEEEgppx0HOADbttF1HU3TSJJk0m2IUhQFl8uZLEu55TdeRbleM9b2FnVlsN15tBKk7B8hgBZVvG1yPvyCxbHgbiITOGQZ1XwGJYufmk3SPIey77HDGDMUfG0jrKN4AaXEdV38nYtj6oQH7zkcdjJEx7tfsvx9HDvC4Y6+7/NtWli7gNXawnFs0jSdwrIsx88EwYHLWRCdTuP7siybwD8t7u6U95qs6AAAAABJRU5ErkJggg==" "264" "348" >}}

This corresponds to the exact same hierarchy of the term set:

{{< caption-new "/uploads/2017/03/Screenshot-2017-03-17-13.13.08.png" "Term set hierarchy"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA7ElEQVR4nHWQ3UrEMBBG99W9cvFC8Cm83Ieo915UQRalld1N0zRtJmlt2tLmk8myYv35IIEwJ2cm2Tjn0BbPqOQB70cJpQnGdviZDW+tI0ipINJ7vD1cYZ9sQek10KYIDITlDPreQ+sG4mmH1+QG++QO+vEW6F7WYAgB1loY6kDuA1I1cK3HpfbVmjPPM5yzaJoaQpxwOh5AxpyN38FlWTAMA/q+h9YaQghUVRXPK/CSaZpARKjrGlLKeInb/wkyVJZlBJVS/xuNMREqigLjOK5B1jPkvY8/wPOxjWf/9Rgu8sqyLBrzPI9WBj8BZSulNxHrensAAAAASUVORK5CYII=" "342" "392" >}}

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

{{< caption-new "/uploads/2017/03/refiner-template-parent.png" "Parent terms are refinable"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAACXBIWXMAABYlAAAWJQFJUiTwAAABU0lEQVR4nGWRXU/CQBBF+/9/iy9EPh6KigkhIY00SgVENIKpRYst3dJ2yxaO2UXFj32Yndk992YmY202G8IwJMsypJToOk1T8jwniiKqqkIfy/d9bNum1WrhOA7dbpd6vU6tVjPvWmhAnSRJwmq1YrlcooXaSedlWR4dX4KAq8GAdvuMeqNBs9mk07mg3+9/QwbcqS2ZiJF5Si5i8uzQo5QF+/3+CPprhesX3AaS/lPOc7w1H7sfkAHfhKL3kDL0Mzp3CYuo/AT5DerwEEpOBhEtb01vlnI+FWyrP446iKJiHBRcTgWDRcYslAhZ8RO1vlp5DKVxtO8SGsOY05uYIDn0qxnrMNmeV1HiLjbM3wuewoK0UKhq999xmVbY9xmntwnOc4H6M42lN+J5nlmfN7xmPPJwrxxTu6573IwQgvl8zmQyYTye4PsvjEYjI9a3UsqAH5rADIp9ZmWTAAAAAElFTkSuQmCC" "200" "285" >}}

If you compare this one, to the first image at the top. You will notice that **Europe** is now refinable. When you click on it, it will return all its children, so this allows you to go deeper into the hierarchy.