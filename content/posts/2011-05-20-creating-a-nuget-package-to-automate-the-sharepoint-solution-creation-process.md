---
title: Creating a NuGet Package to Automate the SharePoint Solution Creation Process.
author: Elio Struyf
type: post
date: 2011-05-20T14:00:12+00:00
slug: /creating-a-nuget-package-to-automate-the-sharepoint-solution-creation-process/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Creating-a-NuGet-Package-to-Automate-the-SharePoint-Solution-Creation-Process.aspx
dsq_thread_id:
  - 3841668467
categories:
  - Branding
  - Development
  - SharePoint
tags:
  - NuGet
  - Package
  - Solution
  - Visual Studio
comments: true
---

In this blog post I will talk about how to automate the SharePoint solution creation process by making use of NuGet. As an example I will use NuGet to automate the SharePoint Branding process in Visual Studio.

NuGet is a package management system for your develop environment. NuGet makes the process of importing .NET libraries into your current project a lot easier. You can find more information about NuGet on: [http://www.nuget.org](http://www.nuget.org)

The idea to automate some processes came from the fact that, for me, every branding project starts with the same manual operations to prepare my Visual Studio project. These steps include:

*   Adding a SharePoint Module for my masterpage and theme;
*   Adding mapped folders to the "Images" folder and "Styles" folder.

## Requirements

Before you can start, you will need to download the following files:

1.  NuGet Visual Studio add-in: [http://www.nuget.org](http://www.nuget.org)
  *   Install this to your Visual Studio environment.

2.  NuGet command line program: [http://nuget.codeplex.com/releases/view/58939](http://nuget.codeplex.com/releases/view/58939)
  *   Make sure NuGet.exe is added to your path.

## Creating a NuGet package

### Creating a NuGet manifest file

The first thing you need to do is creating a "nuspec" or  NuGet manifest file. This can be done by opening a command console, and run the following command:


```css
nuget spec EStruyfSP2010Branding
```


This command creates the "nuspec" file in the current path.

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu1.png" "NuGet Manifest File" >}}

When you open the file you have something like this:


```xml
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>EStruyfSP2010Branding</id>
    <version>1.0</version>
    <authors>elst</authors>
    <owners>elst</owners>
    <licenseUrl>http://LICENSE_URL_HERE_OR_DELETE_THIS_LINE</licenseUrl>
    <projectUrl>http://PROJECT_URL_HERE_OR_DELETE_THIS_LINE</projectUrl>
    <iconUrl>http://ICON_URL_HERE_OR_DELETE_THIS_LINE</iconUrl>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>Package description</description>
    <tags>Tag1 Tag2</tags>
    <dependencies>
      <dependency id="SampleDependency" version="1.0" />
    </dependencies>
  </metadata>
</package>
```


This is my cleaned up version:


```xml
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>EStruyfSP2010Branding</id>
    <version>1.0</version>
    <title>SP2010 Branding Starter Files</title>
    <authors>E.Struyf</authors>
    <owners />
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>This package contains the starter files for a SP2010 Branding project.</description>
    <summary />
    <language />
  </metadata>
</package>
```


### Adding SharePoint Content

When the NuGet manifest file is created, your next step will be to build the NuGet package by adding the SharePoint Content. An easy way to do this is by creating a new Visual Studio Project and adding the necessary SharePoint Modules, Mapped Folders, etc.

My branding project looks like this:

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu2.png" "SharePoint Branding Project" >}}
Go to the location where you created your NuGet manifest file and create a folder with the name "content". This folder will be used to add the SharePoint content (Modules, mapped folders), so that it can automatically be added when installing the package to your project.

In my example I have copied the "_catalogs" module, the mapped "Images" folder, and the mapped "STYLES" folder to my NuGet "content" folder. Be sure that you also copied the "*.spdata" files. If you did not copy them, Visual Studio will recognize the content as common folders.

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu3.png" "NuGet Folder Structure" >}}

### Build the NuGet Package

When everything is added to the content folder, you are ready to build your package. Go back to the command console, and run the following command:


```css
Nuget pack EStruyfSP2010Branding.nuspec
```


When the command is complete, you end up with a new file named: EStruyfSP2010Branding.1.0.nupkg.

To check the package you can rename the "nupkg" extension to "zip" and open it.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu4.png" "NuGet Package Content" >}}

## Testing the NuGet Package

### Adding a package source

NuGet allows you to add new Package Sources in Visual Studio. These sources can be linked to a local folder on your server/PC, so you do not need to publish them to the NuGet site.

To add a new Package Source, open Visual Studio with NuGet installed. Click "Tools" -> "Options" -> "Package Manager" -> "Package Sources".

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu5.png" "NuGet Package Sources" >}}

In this window you can add your local folder as a Package Source for NuGet.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu6.png" "Custom NuGet Package Source" >}}

### Testing the package

Start a new empty SharePoint project, and right click on "References" -> "Add Library Package Reference".
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu7.png" "Add Library Package Reference" >}}
This step opens the NuGet Package manager window.

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu8.png" "NuGet Package Manager Window" >}}

Under the official NuGet package source you can see your custom package source. Open your package source and install the package.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu9.png" "Custom NuGet Package" >}}
This should have added your files to the project.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu10.png" "Content added by NuGet" >}}

## Download

[NuGet Branding Package](/uploads/2011/05/EStruyfSP2010Branding.1.0.zip)