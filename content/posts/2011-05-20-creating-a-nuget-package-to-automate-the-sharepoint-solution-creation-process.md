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

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu1.png" "NuGet Manifest File"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/ALva2M7Z3+Ti4d3e3tzc3Nvb29zc3OLi4t3d3fDw8IzNGfq6uoKPAAAAAElFTkSuQmCC" "185" "19" >}}

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

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu2.png" "SharePoint Branding Project"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAIAAACZwRr8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQUlEQVR4nE3PQU+DMBgGYH6md2/+AP+LFy/uZryYePBglmxR52QbrUChICUMxhi0GaywaYEaZGZ+1yfvm/dTyDoYG8+TiQp1S50BAM3ReEL8cL8XO35Q1nHsEW8O8WIxn07fAABBEFBKpZRt2yqM0owyoGOMMULIcZyqquTfKYyxLGM61GwL6YYRRZEQ4sSUUkaZY4ywbWmaxhjra49c5Pkmo9ixV/FaVVXf93vuT5FSFkWVpvEKPyLLgRAihJIkOU6TUjZN29TfFd8uI4JtBAAkhJimSSntmPNqlycpGX4YOkJICFHXtRCiaZqO+568KKCT2tiFABDic867ab9WV3sO3ZXr2rZtEULCMOzf6/ir3LzP7m9un64HD2zbhU6PSSnFYTN8uTu/HJxdXJk46seemHNGnNdgufz0vLIs/6d/AK+cfX2iY6StAAAAAElFTkSuQmCC" "168" "228" >}}
Go to the location where you created your NuGet manifest file and create a folder with the name "content". This folder will be used to add the SharePoint content (Modules, mapped folders), so that it can automatically be added when installing the package to your project.

In my example I have copied the "_catalogs" module, the mapped "Images" folder, and the mapped "STYLES" folder to my NuGet "content" folder. Be sure that you also copied the "*.spdata" files. If you did not copy them, Visual Studio will recognize the content as common folders.

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu3.png" "NuGet Folder Structure"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfklEQVR4nGNomjA9NK3fNWpCTP68MxcvV3ctjMiYFpo+OSx9ckTmVIYv39+9e3fn8+dP///+ffP+zaU7D69ef3Dhyt0LV+7evPuM4fffH7fvn3pw/9GPHz++fvn8HxUw/P33/enzm1++fP//7++Xz5/+/vv/9+8/MPr79+8/AHXlY7uERsQDAAAAAElFTkSuQmCC" "377" "133" >}}

### Build the NuGet Package

When everything is added to the content folder, you are ready to build your package. Go back to the command console, and run the following command:


```css
Nuget pack EStruyfSP2010Branding.nuspec
```


When the command is complete, you end up with a new file named: EStruyfSP2010Branding.1.0.nupkg.

To check the package you can rename the "nupkg" extension to "zip" and open it.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu4.png" "NuGet Package Content"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgUlEQVR4nE3KuwrCMBQA0Pz//4iKbtIhpJJ4E2y8FlHBFJfE5uHVTEId9MyHxfvqiPp8uaYUvQ8/j+BDYOMwP3RqBzrGsdY3Eb3+sOE06/ZKtFvnbrXW5+SbiIitF8tWCG2MtdZMEDGllHMupbBm03DO+75XSgGA1lpKiYgA4Jz7APdmhQxJUqWZAAAAAElFTkSuQmCC" "182" "88" >}}

## Testing the NuGet Package

### Adding a package source

NuGet allows you to add new Package Sources in Visual Studio. These sources can be linked to a local folder on your server/PC, so you do not need to publish them to the NuGet site.

To add a new Package Source, open Visual Studio with NuGet installed. Click "Tools" -> "Options" -> "Package Manager" -> "Package Sources".

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu5.png" "NuGet Package Sources"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAxUlEQVR4nAG6AEX/AJyjtZKcsqKrwZKbsX+KoIeRp42WrY2Xro+ZsKapswDe3Nnv7uv////r6+nj5ubo6uvt8PH2+fzn5+TIxL4A1tbW5+fo+/v87Ovr/f39/////v7+////4+Hfv725AN7e3tvb2vz8++vq6PX29fr7+/n5+f39/efm5MzKxQDg4N/j4+P8/f3g3tvZ19Tp6Ofn5uTm5ePa2NTNysYAuri1uri1x8TCwr+8v7y4v725v725uLWytbKvsrCthkyVMkK95hYAAAAASUVORK5CYII=" "605" "353" >}}

In this window you can add your local folder as a Package Source for NuGet.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu6.png" "Custom NuGet Package Source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgUlEQVR4nAXB3Q6CIBgAUN7/RbprLZufQ9MuLH40UUSdZhaClG69Q+cgDB6cDhi8wD8mURCHIO6sU2Vbi1YJpGqZccY5o5Rwxm7XNOOsFMWyGGNm1I9TpTrZ9EI2j0m77Te79amt/WzGrSjM30CG/VnsfApkiAuN+Ziqb5S/LpX9Aw04YMOk4z8ZAAAAAElFTkSuQmCC" "208" "83" >}}

### Testing the package

Start a new empty SharePoint project, and right click on "References" -> "Add Library Package Reference".
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu7.png" "Add Library Package Reference"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAe0lEQVR4nE3CQQuCMBQA4P3/f9KlQ9BN6VQsLHqIKBk4Uqdkz01Hbkqw18FLHx/LivR4OgfhQQhBRN57+sO01ts93+z4C0c1GPOx1i2TnddsUG0Sc+ya/B4DRFkKVflQWOu+Vtgw8t/ZTc6UKG9dBe3zKsXlLWEZc2eKHzRGbCoaOOPqAAAAAElFTkSuQmCC" "337" "118" >}}
This step opens the NuGet Package manager window.

{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu8.png" "NuGet Package Manager Window"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAxUlEQVR4nAG6AEX/AIiRoIWPnHyJn4KPrI+XsIuWs4mUtJeivp+qyKWsvQC6vr/DxsTR2Nu/yc3OycPe29jZ2Nff4Nv///zs7e4As73LqbPDtsLS1N7m4d/f8vLz6+zs0dLS6Ono4eLjAP3+/v////b7/9Tg5+nn5ezt7fX19O7u7fT08+fm5QDY2tzY2dzi5+3W3uba2tvb3d/n6Or39/r7/f/l5ugAiY6WbnaEaHCAbHSDaHGBaHCAanKCZ3B/c3uJio2UwsyKNKlMWV4AAAAASUVORK5CYII=" "605" "340" >}}

Under the official NuGet package source you can see your custom package source. Open your package source and install the package.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu9.png" "Custom NuGet Package"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAASUlEQVR4nAE+AMH/AJG+16O5w6ylnqaloaakoK2rpq2rp8G+us/Nx8jPwADGy87HyMjIxb/Fwr3Fw77MycTW087Sz8vU0czY09Ay6iyv43dEHwAAAABJRU5ErkJggg==" "303" "60" >}}
This should have added your files to the project.
{{< caption-new "/uploads/2011/05/051711_1620_CreatingaNu10.png" "Content added by NuGet"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAtElEQVR4nE3L3QqCMBgA0L3/c3RRz9BlUGLkz/InP3OyatQcmDTLXLYvEoLO/SFVJe+dcdbhTd93WR4EvhACEa21iEiMMU3TXJSWfLVP3SQFSkM2stYSRFRKXRt9TmZ5OM/ykhV7KaVS6rsRsW3b7ml44VJ/GUVJHEda68eI9L15v1843DyovLiELAUAxhjnvK5rcjiK/lEHm2mcbn1vAwD4h5zEuWvVwpkUB05DCgDDMNifD26Zvfh+mQI4AAAAAElFTkSuQmCC" "137" "100" >}}

## Download

[NuGet Branding Package](/uploads/2011/05/EStruyfSP2010Branding.1.0.zip)