---
title: 'Order List Items Like in a Meeting Workspace: Part 3'
author: Elio Struyf
type: post
date: 2012-01-11T12:11:47.000Z
slug: /order-list-items-like-in-a-meeting-workspace-part-3/
Xylot:
  - http://www.xylos.com/blog/post/1078/Order-List-Items-Like-in-a-Meeting-Workspace-Part-3/
dsq_thread_id:
  - 3893838651
categories:
  - SharePoint
  - SharePoint Designer
tags:
  - Custom Actions
  - Reorder
  - SharePoint Designer
comments: true
---

In the previous parts I told you how you could enable the reorder functionality and create a custom reorder action in the ribbon. In this blog post I will cover how you could open the reorder page in a SharePoint dialog window.

Everywhere in SharePoint you got dialog windows. So it would be much cleaner to modify the custom action to also use a dialog box.

The final result looks like this:

{{< caption-new "/uploads/2011/12/120811_1811_OrderListIt1.png" "Reorder Dialog Result" >}}

## Model Dialog (JavaScript)

You will need to use JavaScript to open a dialog box. This can be done by creating a call a function called **showModalDialog**. More information about this function can be found here: [MSDN](http://msdn.microsoft.com/en-us/library/ff410058.aspx).

So what does this function need?


```javascript
SP.UI.ModalDialog.showModalDialog(options)
```


The option properties you will be using in this example are: **url** and **dialogReturnValueCallback**.

For the **url** property you could use the **Navigate to URL** value from the previous post.


```javascript
~site/_layouts/Reorder.aspx?List={ListId}
```


When working with a JavaScript call, the **~site** token will not work. This needs to be replace with this: **{SiteUrl}**.


```javascript
{SiteUrl}/_layouts/Reorder.aspx?List={ListId}
```


With the **dialogReturnValueCallback** property you can create a callback function that executes after a completed form submission.

We are going to use this property to create a callback function that automatically refreshes the page when the form submission was ok. You could use the following function.


```javascript
function(dialogResult, returnValue) { SP.UI.ModalDialog.RefreshPage(SP.UI.DialogResult.OK) }
```


The whole block looks like this:


```javascript
javascript:SP.UI.ModalDialog.showModalDialog({url:"{SiteUrl}/_layouts/Reorder.aspx?List={ListId}",dialogReturnValueCallback: function(dialogResult, returnValue) { SP.UI.ddModalDialog.RefreshPage(SP.UI.DialogResult.OK) }})
```


## Change Custom Action

The only thing that remains is to update your custom action that you created in Part 2.

*   Open the custom action;
{{< caption-new "/uploads/2011/12/120811_1811_OrderListIt2.png" "Custom Change Item Order Action" >}}
*   Change the **Navigate to URL** property with your JavaScript block;
{{< caption-new "/uploads/2011/12/120811_1811_OrderListIt3.png" "Update the Navigate to URL" >}}
*   Click **OK**.
Now you should have a custom action that opens a dialog box to the reorder page.

{{< caption-new "/uploads/2011/12/120811_1811_OrderListIt4.png" "Change Item Order Result" >}}

## Related Posts

[Order List Items Like in a Meeting Workspace: Part 1](https://www.eliostruyf.com/order-list-items-like-in-a-meeting-workspace-part-1/ "Order List Items Like in a Meeting Workspace: Part 1")

[Order List Items Like in a Meeting Workspace: Part 2](https://www.eliostruyf.com/order-list-items-like-in-a-meeting-workspace-part-2/ "Order List Items Like in a Meeting Workspace: Part 2")
