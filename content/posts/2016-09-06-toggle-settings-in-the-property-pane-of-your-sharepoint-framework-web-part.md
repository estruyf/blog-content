---
title: Toggle settings in the property pane of your SharePoint Framework web part
author: Elio Struyf
type: post
date: 2016-09-06T14:30:36+00:00
slug: /toggle-settings-in-the-property-pane-of-your-sharepoint-framework-web-part/
dsq_thread_id:
  - 5123592083
categories:
  - Development
  - SharePoint
tags:
  - JavaScript
  - SharePoint Framework
  - SPFx
  - TypeScript
comments: true
---

With the SharePoint Framework it is fairly easy to configure the properties you want to expose in the property pane of your web part. All you have to do is specify each of the property pane fields you want to show in the **propertyPaneSettings** function underneath the **groupFields** property.

{{< caption-new "/uploads/2016/09/090616_1425_Togglesetti1.png" "propertyPaneSettings function"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAqElEQVR4nGWMwW6DQAxE91cKHq/XNmbJEqhEk1xo1EP//3sqyCVSn+YyeppJDbrEJRvUOrWuKEopdqCqmjjLui5zm0VU1VVPZSoiRJT6rq91bHMrWjwGj2GIiHF090MTkbs/tm29TPMYLWKZJs8ZHx2ABID7/udr+31+Px/3/bbtt+t+v36anWtAmJtIAFWk5lwzT5IrQEBiZlU9Pojeg5NkZsz8Kv/5A/7VKE/4RAh9AAAAAElFTkSuQmCC" "370" "314" >}}

There are various types of property pane fields like text, dropdown, toggle, checkbox, and if that is not enough or you need a special one, you have the ability to build it yourself.

When you are defining your properties, they will be immediately visible in the web part property pane. In most cases that is the behavior you want, but in my case, I wanted to be able to toggle between settings.

Let me give you an example so you can see what I mean. In my POC search web part, I have a dropdown that will be visible the first time you open the property pane:

{{< caption-new "/uploads/2016/09/090616_1425_Togglesetti2.png" "Property when toggle is off"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAV0lEQVR4nF3MwQoDIRCDYd//TQXR6szkkMzaggtL2+/wXwIpAPwwM5LvX6W11nt3d5KZ+T+b2VoLQEQ8N2Y25yRZxhi11tchKTPv8iiS3D0iAOy9ry+SPvmLkU5iHj1UAAAAAElFTkSuQmCC" "323" "146" >}}

This dropdown is used to select an internal template. I also have the option to show data from an external template, but I did not want to show both options. So what I did, I added the **"use an external template"** toggle. One you toggle this setting, the dropdown will be gone and a textbox appears.

{{< caption-new "/uploads/2016/09/090616_1425_Togglesetti3.png" "Property when toggle is on"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAZ0lEQVR4nDWJQQrDMAwE/f939Am559JbIT/IJbTQ2rK0ca2oEKwGHDIMc5mwxM/8epZSAJjZ/8K7YZget/vo+95ac/d+ejuhqhJzzBQzvVM8/W5abdOfBWglIImQSOJMwgTJAAmnFQd073EY0UTdOQAAAABJRU5ErkJggg==" "321" "135" >}}

This example works with a toggle, but you can also achieve this when you select a specific property in the dropdown or something else.

I achieved it with the following code:

```javascript
protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  let templateProperty: any;
  if (this.properties.propertyToggle) {
    templateProperty = PropertyPaneTextField('propertyOn', {
      label: 'Property shown when toggle is turned on'
    });
  } else {
    templateProperty = PropertyPaneDropdown('propertyOff', {
      label: 'Property shown when toggle is turned off',
      options: [{key: "Option1", text: "Option 1"}, {key: "Option2", text: "Option 2"}]
    });
  }

  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              }),
              PropertyPaneToggle('propertyToggle', {
                label: 'Property toggle'
              }),
              templateProperty
            ]
          }
        ]
      }
    ]
  };
}
```

Have fun coding with the SharePoint Framework!