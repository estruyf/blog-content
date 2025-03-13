---
title: Adding configurable settings to your display templates
author: Elio Struyf
type: post
date: 2015-02-19T15:30:26+00:00
slug: /adding-configurable-settings-display-templates/
dsq_thread_id:
  - 3836535707
categories:
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - JavaScript
  - Search
comments: true
---

A question that has been asked to me a couple of times is if it would be possible to add some settings to the Content by Search Web Part which can be leveraged inside the display templates. This could be handy when you want to develop display templates for which you want to be able to change the rendering based on the settings that were configured in the web part.

Unfortunately you do not have such settings options available by default in the Content by Search Web Part. You could create your own web part by extending the CSWP in code, but this will not work in Office 365. A better solution is to add these settings inside the template itself, but how?

## Solution

The first thing you need to know about this approach is that it only works when you have a custom **item** display template. The reason is that the approach makes use of the managed property mappings from the item display template.

> **Note**: the settings can be used in the control template, but need to be added via the item display template either via the UI or defined in the template.

### Adding the settings to the item template

The first thing to do is adding the settings as managed property mappings to the **ManagedPropertyMapping** attribute inside the item display template. The managed property name will be used as the setting value. When creating the mapping, you best use a settings prefix to distinguish the settings from managed properties mappings.

Adding a managed property mapping to the attribute consists of the following parameters:

1.  Property name in your display template
2.  Display name for the web part settings (optional)
3.  Managed property name (will be used for the setting value)

Here is an example:

`'setting_Value1'{Setting 1}:'setting value'`

As you can see, the managed property name will be used as the setting value for your display template.

Here is an example of how my managed property mapping attribute:

```html
<mso:ManagedPropertyMapping msdt:dt="string">'Link URL':'Path','Line 1':'Title','Line 2':'','FileExtension','SecondaryFileExtension','setting_Value1'{Setting Description 1}:'2','setting_Value2'{Setting Description 2}:'String Value'</mso:ManagedPropertyMapping>
```


### Configuring the settings for your templates

Once these settings are added to the managed property mappings attribute, they will become available in the **Property Mappings** section of your CSWP toolpart:

{{< caption-new "/uploads/2015/02/021915_1530_Addingconfi1.png" "Template with custom settings" >}}

Now if a user wants to configure the settings, they will need to check the **Change the mapping of managed properties** checkbox and the property mappings become editable:

{{< caption-new "/uploads/2015/02/021915_1530_Addingconfi2.png" "Template with custom settings enabled" >}}

Now you are able to add your own values for the template:

{{< caption-new "/uploads/2015/02/021915_1530_Addingconfi3.png" "Template with custom settings changed" >}}

### Retrieving the settings in the item display template

The next thing to do is retrieving the values that or either set by default or in the CSWP toolpart. Retrieving these settings values in the item display template can be done in two ways:

1.  Retrieving it via the $getItemValue function;
2.  Retrieving it from the display template date or client control.

**Approach 1**

Retrieving the settings with $getItemValue is similar as retrieving managed property value:

```JavaScript
// Retrieve the setting
var setting1 = $getItemValue(ctx, "setting_Value1");
// Retrieve the setting value
var setting1_value = setting1.propertyMappings.toString();
```

**Approach 2**

Another approach is to retrieve the settings from the DisplayTemplateData object on your context in your display template. The DisplayTemplateData object gets created at the top in each display template, but in the item display template an extra property gets added to the object that contains the managed property mappings for the template. The code for retrieving the property mappings looks like this:

```JavaScript
var properties = "";
// Retrieve the properties from the display template data variable
var dtd = ctx['DisplayTemplateData'];
if (!Srch.U.n(dtd) && !Srch.U.n(dtd['ManagedPropertyMapping'])) {
    properties = dtd['ManagedPropertyMapping'];
}
```

Now if a user customizes the property mappings in the web part settings, this will not be change in the template of course, these changes are added to the web part. That means that they need to be retrieved from the client control object. So the next step to do is checking if there are some mappings set on the client control, if that is the case the properties variable will get overwritten with the client control mappings.

```JavaScript
// Retrieve the properties from the client control
var cc = ctx['ClientControl'];
if (!Srch.U.n(cc)) {
  if (!Srch.U.n(cc.get_propertyMappings)) {
    var mappings = cc.get_propertyMappings();
    if (!Srch.U.n(mappings) && !Srch.U.w(mappings)) {
      properties = Srch.Result.parsePropertyMappingsString(mappings);
    }
  }
}
```

Now that the properties are retrieved, you are able to retrieve the settings from the properties object like this:

```JavaScript
var setting1 = properties["setting_Value1"];
var setting2 = properties["setting_Value2"];
```

{{< caption-new "/uploads/2015/02/021915_1530_Addingconfi4.png" "Settings output example" >}}

### Retrieving the settings in the control display template

Retrieving the settings values in a control display template can only be achieved by the second approach that was discussed in the previous section.

{{< caption-new "/uploads/2015/02/021915_1530_Addingconfi5.png" "Control template that reads the settings" >}}

### Using these settings in your template

These settings can be used for various kind of things, one of the examples is to render a link to an overview page. I have set the following values to my settings:

*   setting_Value1 = http%3A%2F%2Festruyfd2.sharepoint.com%2Foverview
*   Setting_Value2 = Go to the overview

> **Important**: if you are adding hyperlink value, you will need to encode it first otherwise this value will be interpreted as an object.

In my control template I added some code to show a hyperlink which takes me to the overview page:

```html
<a href="_#= decodeURIComponent(properties['setting_Value1'].toString()) =#_" title="_#= properties['setting_Value2'].toString() =#_">_#= properties["setting_Value2"].toString() =#_</a>
```

{{< caption-new "/uploads/2015/02/021915_1530_Addingconfi6.png" "Custom settings rendering" >}}

## Download the example display templates

You can download the example templates from the [GitHub](https://github.com/estruyf/blog/tree/master/Adding%20configurable%20custom%20settings%20to%20your%20display%20templates "Adding configurable custom settings to your display templates").