---
title: Creating a Sandboxed Visual Web Part from the To-do List
author: Elio Struyf
type: post
date: 2011-03-03T19:00:34+00:00
slug: /creating-a-sandboxed-visual-web-part-from-the-to-do-list/
dsq_thread_id:
  - 3840525578
categories:
  - ECMAscript
  - Web Part
tags:
  - client object model
  - ECMAscript
  - jQuery
  - Sandboxed
  - Web Part
comments: true
---

In my [previous blog post](https://www.eliostruyf.com/creating-a-to-do-list-with-ecmascript/) I showed you how to create a to-do list with ECMAscript, the only problem is that you need to append the HTML and JavaScript code to a Content Editor Web Part. This isn't very flexible and therefore I made this blog post.

The purpose of this post is to show you how to add this code to a Sandboxed Visual Web Part. I choose a sandboxed solution, because of the advantage that you do not need to deploy it on the server. You can just add the solution to a site collection of your choice.

## Before starting

There are some prerequisite:

* Install the SharePoint Power Tools for Visual Studio 2010: [link](http://visualstudiogallery.msdn.microsoft.com/8e602a8c-6714-4549-9e95-f3700344b0d9/);
  * You will need this to be able to create sandboxed visual web parts;
* Visual Studio SP1: [link](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=75568aa6-8107-475d-948a-ef22627e57a5&displaylang=en);
  * The SP beta repairs a bug with User Control's. If you do not have this SP installed you are limited to around the 8000 characters inside a User Control. More info can be found [here](http://blog.mastykarz.nl/the-name-initializecontrol-does-not-exist-in-the-current-context-visual-web-part-sandboxed-bug-fix/).

## Creating a sandboxed solutions

### Create an empty project

Open Visual Studio 2010 and start by creating a "Empty SharePoint Project".

{{< caption-new "/uploads/2011/03/030311_1309_CreatingaSa1.png" "Create an empty SharePoint Project"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAy0lEQVR4nC3MzYuCQBiA8fn/LwvFLgRlRF8WuSAuCEtsdah7HYLoA900U2lmmnfGyHTeIPpdH3jIl2FW62aj73RH4541sd1FyxwP7bn7t5wuVkRJpsvyApTSROsCUWdKgOCIqJQijNKiKM80jdPkkReIKISQUiKilJKsN7sovuyDf8ZZfs+11vDyznsvOPjRNjhdQeALACil3vMoBX7N/NAPwpBSfrvnjAvvGB/PsPMS8lGzPo1vo2M3u06z99MeuO2BW6mZneGv5cyexwm199OH3yMAAAAASUVORK5CYII=" "605" "418" >}}

In the next window enter your SharePoint Site URL and check if the option "Deploy as a sandboxed solution" is checked.

{{< caption-new "/uploads/2011/03/030311_1309_CreatingaSa2.png" "Deploy as a sandboxed solution"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AL67uLm3srq3s7+8uMfEwMfEv8XCvsbDv8XCvcvIw1btFmdeQX8mAAAAAElFTkSuQmCC" "549" "64" >}}

### Add a Sandboxed Visual Web Part to the project

If you installed the SharePoint Power Tools, you are now able to add a sandboxed visual web part to your project.

Right click on your project name and choose: "Add" --> "New Item...".

{{< caption-new "/uploads/2011/03/030311_1309_CreatingaSa3.png" "Add a "New Item""  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nAFdAKL/ACw6VCw7VC49ViIxTG13iOLk5OPk5ejo6dvd38fL1gAdLUocLEkfLksQIUBsdonp6uzo6evw8PLt7u/6+vkAcnh/d32BfYGFbnR6oaSj6+ne7erf8e7h8e/l/v7+8gM4eb0dUDsAAAAASUVORK5CYII=" "605" "181" >}}

In the "Add New Item" window select "Visual Web Part (Sandboxed)" and add this to your project.

{{< caption-new "/uploads/2011/03/030311_1309_CreatingaSa4.png" "Sandboxed Visual Web Part"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOPewfHjsPDir+3frfjqtv/xu/7vuv/xu/jqtfPksY3MGbWnAphYAAAAAElFTkSuQmCC" "435" "37" >}}

### Add the HTML and JavaScript to the User Control

Now that you have created the visual web part it is time to add the HTML and JavaScript code from the [to-do list blog post](/uploads/2011/02/To-do_List.zip) to the User Control.

{{< caption-new "/uploads/2011/03/030311_1309_CreatingaSa5.png" "Add the HTML to the User Control"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAnklEQVR4nE3LyQ6CMBAA0P7/N3kwHjCgYjiQGJFEPMiS0Ba6MNNlavTkuz/WNlW2yw/7+pjVWfEoT7e8aIrL/Xxty6plixjsqA3HYB1syW+EG4UQiRJRYlJOgi/GAroA6AGDczHGQCkSEVvULJVUZvHRB/qtP2xVc9e93s9u7XvLBa4KtfYAAfG7VzWPw8CnyQphOLeCWylBK9DKAXwA9zSoTpnqL0wAAAAASUVORK5CYII=" "605" "365" >}}

If you do not have the Visual Studio SP1 Beta installed, the User Control's designer file (.ascx.g.cs) gets removed because of a bug in VS 2010 with User Control's.

### What do you have until now?

When you deploy the web part, it will look like this:

{{< caption-new "/uploads/2011/03/030311_1309_CreatingaSa6.png" "Current Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAwElEQVR4nGNo3n69YtPV8s03IagMjMq33CzYcH3SoTsMdhNParcdlqrdJ169V7x6r2TNPsmafdK1+wTKd7tMPc7w5fuvjx8/Pn33+cX7L0/ffv7x6/f//////QeB33//MUw59KB3792+vXdbdtyq2Xyjafvt1l132nbdadh+a9axRwyP3n698PDt6Xuvzj94c+XJ+1svP774+OPlJxB69fkHw+cfv5+++/zw9aen7z4/ffflw9cfv/9AzP7/5+8/AFG8jD5Z+nFHAAAAAElFTkSuQmCC" "411" "255" >}}

Right now you have a working to-do list, but you cannot choose which task list you want to use. In the next section I will show you how to create a custom tool part, so you can set the preferred task list.

## Coding

### Create a custom toolpart

Creating a custom toolpart for the Sandboxed Visual Web Part is not the same as creating it for a standard Visual Web Part.

A standard web part inherits from "Microsoft.SharePoint.WebPartPages.WebPart".

The Sandboxed Visual Web Part inherits from "System.Web.UI.WebControls.WebParts.WebPart", this means that the web part is handled like a ASP.NET Web Part. You can find more information about creating a custom toolpart (or EditorPart) [here](http://blogs.msdn.com/b/yardman/archive/2010/04/24/sharepoint-2010-sandbox-web-part-properties.aspx) and [here](http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.webparts.editorpart.aspx).

The code that you need to add to the code behind file looks like this:

```csharp
#region Custom ASP.NET web part property
public override object WebBrowsableObject
{
	get
	{
		return this;
	}
}

//Task list name string
private String _taskList = null;

[Personalizable(), WebBrowsable()]
public String taskList
{
	get { return _taskList; }
	set { _taskList = value; }
}

//Create an editor part to set the custom task list
public override EditorPartCollection CreateEditorParts()
{
	ArrayList editorArray = new ArrayList();
	CustomProperty edPart = new CustomProperty();
	edPart.ID = this.ID + "_editorPart1";
	editorArray.Add(edPart);
	EditorPartCollection editorParts = new EditorPartCollection(editorArray);
	return editorParts;
}

//Create a custom EditorPart to edit the WebPart control.
private class CustomProperty : EditorPart
{
	TextBox _tbTaskList;

	public CustomProperty()
	{
		Title = "To-do list settings";
	}

	public override bool ApplyChanges()
	{
		SandboxedTodo part = (SandboxedTodo)WebPartToEdit;
		//Update the custom WebPart control with the task list
		part.taskList = tbTaskList.Text;

		return true;
	}

	public override void SyncChanges()
	{
		SandboxedTodo part = (SandboxedTodo)WebPartToEdit;
		String currentList = part.taskList;
	}

	protected override void CreateChildControls()
	{
		Controls.Clear();

		//Add a new textbox control to set the task list
		_tbTaskList = new TextBox();

		Controls.Add(_tbTaskList);

	}

	protected override void RenderContents(HtmlTextWriter writer)
	{
		writer.Write("**Set the to-do list**");
		writer.WriteBreak();
		writer.Write("List:");
		writer.WriteBreak();
		_tbTaskList.RenderControl(writer);
		writer.WriteBreak();
	}

	//Return the task list name from the textbox
	private TextBox tbTaskList
	{
		get
		{
			EnsureChildControls();
			return _tbTaskList;
		}
	}
}
#endregion
```

When you deploy this solution, the web part will contain a new toolpart section.

{{< caption-new "/uploads/2011/03/030311_1309_CreatingaSa7.png" "Custom toolpart"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8UlEQVR4nD3O0WqDMABA0fz/d3QdKCbTuJg0MUnXPnV0g5WiNUbdwwZSSafo8KUwusEu5wMuIITEOMYYQwRJQpRS6W9CCK0UaGyz3+1NZoqsOLwe2o926qfBDePXeOkcqG1dlZXr3Lk9t5+t61x/6edxvs7X72ECeZ6b0hhTFMWpburmvanqypbWGmtNCSIcLe+Xi7uF53thFN42YowfcRhHK84AFxw9IIggZZSt2D/KqFISCCECGHi+F8AgoQll9E9CE6lSoLVGCPq+D2FAaaKU0vpGSrndbsDx7Sg5YyTertcbLTklL887ydmTTIvs9ANsLtHI0+Rm6QAAAABJRU5ErkJggg==" "227" "209" >}}

The last step is to make use of the inserted value by the JavaScript.

### Making use of the toolpart setting in JavaScript

The easiest method is to use the ASP.NET binding expression "<%= %>". The only thing that needs to be changed is list name variable in JavaScript and that needs to be set to:

```javascript
var ListName = '<%=taskList%>';
```

This will work perfectly, but if you do not want to retrieve an error message when you haven't inserted a list name value. You need to write the following if statement.

```javascript
if (ListName != null && ListName != "") {
  ExecuteOrDelayUntilScriptLoaded(Initialize, "sp.js");
}
```

## Files

Here is my Visual Studio Project.
[VS 2010 Project](/uploads/2011/03/EStruyf.TodoWP.zip "Download the to-do VS 2010 Project")

If you only want the Sandboxed solution file you can download it here.
[Solution](/uploads/2011/03/EStruyf.TodoWP_Solution.zip "Download to-do the solution file")

## Changes

### Link Update: 27/04/2011

I have updated the Visual Studio SP1 Beta URL to that from the Visual Studio SP1 url.