---
title: Fixing the slider with bar graph refiner for custom date and time managed properties
author: Elio Struyf
type: post
date: 2015-01-26T15:26:02+00:00
excerpt: This post explains a problem with the out of the box slider with bar graph refiner in SharePoint 2013. The refiner does not work in some cases when you are working with custom managed properties. This post shows you what happens and how you can solve it.
slug: /fixing-slider-bar-graph-refiner-custom-date-time-managed-properties/
dsq_thread_id:
  - 3836535695
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

Last Friday there was a discussion on Twitter about a problem with the Slider with bar graph refiner. The problem is that the refiner does not work properly when you use custom date and time managed properties.

When you would use a custom date and time managed property, you get the following output:

{{< caption-new "/uploads/2015/01/012615_1525_Fixingthede1.png" "Custom date and time managed property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA3klEQVR4nFVQbU7DMBTL/a/FxhXYhgRam5KkXdtsaV4S8j5QW5iE5V+2bFlWWGvakHNeQgBIIsJ/UDkna0zTaq073bbT7IkIEX9tgOic67Q2nTbWGWPa5jrcRmZhJkVEzOxDfLtayAURCXEX1zQRicg0zy/H12WJIkIreOVuQ2Xb346HQ4zLtotEeB+oaq3vjWm+nOm0nYK9J3tPzsOHGVMpqpQSHh5r3WrXTiZGxNl7gKRKzu0Epz6fXDz3cBnSZYBznz9HiDGq71IAYMv8IyLWWtdbHo+wL3qe9XztB5wRO9mgs8NyAAAAAElFTkSuQmCC" "185" "203" >}}

If you compare this with an OOTB managed property, the date formatting you would expect a rendering like this:

{{< caption-new "/uploads/2015/01/012615_1525_Fixingthede2.png" "OOTB managed property"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAx0lEQVR4nGWOwU7DMBBE/f9/VfUGHDhCqUAhja0Et6Rx7F2vvbuV1fZAeZrbaDTPEFGMawhhWQIzy18MADhnnbXjOP1rxYiIqvo5vO46KlVUWG5pNTOrqnV2s90SZW2I6n1dmX8CffX25flpBYRSUy5AFUvbt++uH6x1w6Ef/HyK5AOOv+HzMOVMrQ5rjIDnNUXAylpZqNT5vKQEJufcHePO497jh4f3Ke09vE3wfUoIyaRGbD7CV6m7GjOzQcQEIKLM8hARuQBmfiBF4DC92gAAAABJRU5ErkJggg==" "185" "177" >}}

As you can see, the labels underneath the graph are different.

## The problem

The problem is that the code which retrieves the labels for the slider with bar graph refiner only checks the property name to know the data type of the managed property.

> **Note**: there are better ways to check the managed property data type. This post is intended to give more information about the problem and a way to solve the issue.

Here is a code snippet:

{{< gist estruyf a5cbf1d5322021285fe4 >}}

The first thing that the code does is checking if the managed property name exists in an array of known managed properties. Of course, if you are using a custom managed property, yours will not be in it. Here is the array of the known date and time managed properties:

{{< gist estruyf abaa31b5c1bad2015e90 >}}

If the managed property was not found in the array, the code will check for the OWSDATE suffix at the end of the managed property name. This is in place if it is an auto-created managed property by SharePoint, but if you have a naming convention for your managed properties this will most likely not include the OWSDATE suffix at the end.

So for example, if you have a custom managed property named **CustomCreated**, the two checks will not retrieve the correct data type because the property does not exists in the array and does not contain an OWSDATE suffix.

The Twitter discussion started with a post to a blog post explaining the problem and how you can solve it by appending the OWSDATE suffix to your custom property: [SharePoint Search Results with DateTime field refiner](http://sharepointroot.com/2015/01/22/sharepoint-refiner-with-datetime-field/).

## Display template solution

Now as I said, if you have your own naming conventions in place, you would not like it that you need to add the suffixes to the property name.

Another solution to solve this issue is to trick the code into thinking that it is rendering a date and time managed property. Here is a code snippet from my updated refiner:

{{< gist estruyf b7108e73d498e5154584 >}}

So what this code does is it retrieves the property name and checks if the OWSDATE suffix is in place. If it does not exist, the code appends the OWSDATE suffix and retrieves the labels for the graph. When the labels are retrieved, the property name gets reset to the original name, and the rest of the code gets executed.

{{< caption-new "/uploads/2015/01/012615_1525_Fixingthede3.png" "Custom managed property rendered correctly"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAIAAADw0OikAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABbElEQVR4nG2QzXLcIBCEef/XSpzYyTEnr+Ot9QJCFrKEBAzD35CSFKfW5XTNiR4a+mM5J++dtRYAjDEAobVG72IYglLdlXMhhJTSLEtKKef81waAQWulur7v+tdBdUpwPpultVZrZbXW1tq0ul/PIqb0L7Yetw97GPSXr3cY4+3DdNgG0lWqnz8eZhdcrGvILlbYg1iM8cyV6Hop+DAtC6QF0mgsV0PJhSGicw4QrfMQsFKrRDHn2cyIyFKMYobTGH+P+DTiSYeThkeNcg4xRoYBnLNtE90OUd2K5ZQCItF+8HGIiB1rpZScy22lQywAKNVdLi99J48MutHWm6jOq3/kQ87lI5V3alrru2/fEfE/1Hwm2b8+3N9jRGpbbyI69lhK6czVC5eX87McjbY4rEFN60WNpezUlnV1HpbVWg+5Ui4VMI5vbzsWxOvkd2o7OB2eNJw0iskjhg0qBPhMbWNWK4uIzvvjR5+p/QHRJVy0Mp7gcwAAAABJRU5ErkJggg==" "189" "395" >}}

## Using the predefined managed properties

Another solution instead of adding **OWSDATE** to your managed property name can be to use one of the predefined managed properties: RefinableDate00, RefinableDate01, ...
The code will also check for these kind of properties via a regular expression: `(Refinable)?(String|Date|Int|Double|Decimal|YesNo)[0-9][0-9]`.

{{< gist estruyf 0eb0138831d1f6ba6589 >}}

## Download

The display template can be downloaded here: [Slide bar graph for custom managed properties](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Refiners/Slide%20bar%20graph%20for%20custom%20managed%20properties).

## Updates

### 03/01/2017

Remy Bosman mentioned a problem on Office 365 with the slider display template. After some investigation, it seems that there were some code changes made to the search.clientcontrols.js script file. The code I used to trick the template into believing it is rendering a known date type managed property, does not work anymore. For more information about the issue, you can check my comment on the Microsoft Tech Community site: [Display a RefinableDate as Slider Refiner](https://techcommunity.microsoft.com/t5/SharePoint/Display-a-RefinableDate-as-Slider-Refiner/td-p/33821). As a workaround, I published a new display template for Office 365 which renders the labels correctly. It can be found in the GitHub repo: [Filter_SliderBarGraph_Date_O365.html](https://github.com/SPCSR/DisplayTemplates/blob/master/Search%20Display%20Templates/Refiners/Slide%20bar%20graph%20for%20custom%20managed%20properties/Filter_SliderBarGraph_Date_O365.html).