---
title: How to let custom property pane fields enable the apply button in SharePoint Framework
author: Elio Struyf
type: post
date: 2017-08-30T11:20:32+00:00
slug: /how-to-let-custom-property-pane-fields-enable-the-apply-button-in-sharepoint-framework/
dsq_thread_id:
  - 6106886390
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - Fields
  - Property Pane
  - SPFx
comments: true
---

Since the SharePoint Framework v1.2.0 release; it is now possible to let your custom property pane fields trigger the apply button in non-reactive property panes. Before this release, you had to implement your own logic to re-render the contents of your web part or use the reactive property pane.

## So, what changed?

In the previous versions, the **onRender** method of your custom property pane field had two arguments:

*   The HTML element
*   Context

{{< caption-new "/uploads/2017/08/083017_1110_Howtoletcus1.png" "Old onRender method"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAPklEQVR4nAXBgQ6AIAgFQP//QyvQxoMGDsPWXYOtgWegs3QLjTc83dNr1/52U4uD+ZKThEh46I0AJuaaWfkD4JA4ywxWCg0AAAAASUVORK5CYII=" "624" "116" >}}

Since version 1.2.0 a new argument has been added:

*   Change callback function

{{< caption-new "/uploads/2017/08/083017_1110_Howtoletcus2.png" "onRender method since v1.2.0"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAaklEQVR4nBXEQRLCIAwAQP7/SCBYHW1IAkrSUmxx3MM6rl3eSoWyZN1a//Y++jiPOec1L4dkfr1FCUkSCESKgYInz8rbsbvadqB7EljKAgKpJGyIbWWjcQ6XiR/PFxJy5fqpVMjMVNX0/w8wA3APwr+jWAAAAABJRU5ErkJggg==" "624" "232" >}}

This is a callback function which gets provided to your custom field by the property pane. You can make use of this to let the property pane know a change happened in one of your custom fields. If you use this in combination with a non-reactive property pane (that is the property pane with an apply button at the bottom) it will trigger the button to get enabled.

## Show me the code

Code snippet of my onRender method:

```typescript
/**
 * @function
 * Renders the custom field
 */
private render(elem: HTMLElement, ctx?, changeCallback?: (targetProperty: string, value: any) => void): void {
  const props: ISampleInsecurePasswordHostProps = {
    key: this.properties.key,
    label: typeof this.label === "undefined" ? null : this.label,
    description: typeof this.description === "undefined" ? null : this.description,
    initialValue: typeof this.initialValue === "undefined" ? null : this.initialValue,
    properties: this.properties,
    targetProperty: this.targetProperty,
    onRender: this.render,
    onChanged: changeCallback,
    onDispose: this.dispose,
    onPropertyChange: this.onPropertyChange
  };

  // Construct the JSX properties
  const element: React.ReactElement<ISampleInsecurePasswordProps> = React.createElement(SampleInsecurePasswordHost, props);

  // Calls the REACT content generator
  ReactDom.render(element, elem);
}
```

Code snippet of my method where I store my new property value:

```typescript
private notifyAfterValidate(oldValue: string, newValue: string) {
  this.props.properties[this.props.targetProperty] = newValue;
  this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);

  // Trigger the onChanged callback
  if (typeof this.props.onChanged !== "undefined") {
    this.props.onChanged(this.props.targetProperty, newValue);
  }
}
```


## Result

{{< caption-new "/uploads/2017/08/ezgif.com-optimize-2.gif" "Example of a custom field that triggers the apply button" >}}

The sample code of this custom field can be found here: [InsecurePasswordPropertyField.ts gist](https://gist.github.com/estruyf/5d571460e235b748c93547fc86d46e22).

> **BTW**: it is really not a good idea to store a password in the property pane. This is just created as an example to show that it is really a different field.