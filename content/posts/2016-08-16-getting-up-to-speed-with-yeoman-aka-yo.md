---
title: Getting up to speed with Yeoman aka “yo”
author: Elio Struyf
type: post
date: 2016-08-16T13:55:44+00:00
slug: /getting-up-to-speed-with-yeoman-aka-yo/
dsq_thread_id:
  - 5070068024
categories:
  - Development
tags:
  - Node.js
  - NPM
  - Yeoman
comments: true
---

Yeoman is yet another tool that you cannot miss in your client-side development toolset. In the previous post, I talked about [Node.js, npm](https://www.eliostruyf.com/getting-up-to-speed-with-node-js-and-npm/) and [Gulp](https://www.eliostruyf.com/getting-up-to-speed-with-gulp/). To make use of these tools it required some manual actions/configuration before you could start developing your project.

By now you may have asked yourself if this is always the case with every new project you are going to create. Luckily it is not the case. This is where Yeoman comes into the picture.

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto1.png" "Yeoman logo"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAABnWAAAZ1gEY0crtAAABBklEQVR4nGP4////v3///////+nz+9zyYr/I0DMXL/z////v37////9nALH+/P7/ct+JtT0GnHyyDAyN2XlgwT9Q6f////+6s/HK0vy5wTaTXfQ2NeXcf/wYbOo/hn9gQ24tWnNr34bWKP3mEM1NUyoeP3n67ds3kO4/YEN6yqtbq+vf75zwcX3ZgxMH7j549PPnD5A0xAmXr1wR5xNM4hdslhCLMLR4BDb879+/DP/+/YMYcOv67a7GssldxadOnIFYDLL73r1728Hg9OnTx44dP3rsxPnz5/ft27dz584LFy4wfP369eHDhzdv3nzw4MGtW7cuXbp45/ad69ev37x58927dwCY1dLSr75RSAAAAABJRU5ErkJggg==" "277" "240" >}}

> Yeoman: the web's scaffolding tool for modern webapps

As mentioned on the Yeoman website ([http://yeoman.io/](http://yeoman.io/)). Yeoman is a scaffolding tool for modern web apps. You can compare it to the templates which you have in Visual Studio. When you choose to make use of a particular Visual Studio template. Visual Studio puts in place all the required files and folders for your project. This project creation process is similar to what Yeoman does in the client-side developer world.

Yeoman creates projects base on the generator that you use. A generator is to Yeoman what a project template is to Visual Studio. The great thing about Yeoman is that it is not bound to be used only for JavaScript project creation. You can use Yeoman for "whatever" types of projects you want to create. An example is the ASP.NET 5 generator: [https://github.com/omnisharp/generator-aspnet](https://github.com/omnisharp/generator-aspnet) which contains templates for creating ASP.NET web applications.

> **Info**: why would do people want to use a APS.NET Core Yeoman generator instead of a Visual Studio template? The answer is simple. .NET Core can be used cross-platform. As there is no full blown Visual Studio IDE for Mac or Linux. You cannot make use of the project templates which are available in the Visual Studio IDE. This is why Yeoman generators can be used to generate these projects on a Mac or Linux machine (also on Windows of course).

The creation process of new projects with Yeoman is also done via command line. An example of this would be: **yo displaytemplates** or **yo office**.


{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto2.png" "Yeoman command line utility in action"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAoklEQVR4nB3JW27DIBAFUHaSCga4dzAPg4lJmzpV97+oKpXO3zFjhvPi58/2/M3ndyzzVucH1IZgQ7SG0VNj2khGIIi3Itb/X4QzpGQNGzxUqHLMfK4277lUUL1BdLWyNYKSi16v+fXs12usR9MUDCGlojSAkjL2Xs8115q1pZTxblW3UQiJFEBAAV2EA8W0psd9H7P1Udue9/42jtp70RT+AEUTJEXR9CxJAAAAAElFTkSuQmCC" "294" "204" >}}

> **Info**: yo is the Yeoman command line tool that you need to use. That is why "everyone" is talking about **yo Office** or **yo SharePoint** (which is probably coming with the SharePoint framework).


## Installation

The installation part of Yeoman requires you to have Node.js and npm installed on your machine. Once these prerequisites are in place. You can install Yeoman globally with the following command:

```bash
$ npm install -g yo
```


> **Info**: you need to install Yeoman globally to be able to use it as a command line utility.

Once the installation is completed. You can test it out by running:


```bash
$ yo
```

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto3.png" "Running Yeoman for the first time"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAjUlEQVR4nD3JWQ6DIBQAQC6i1gUQlO3JYxW73P9QTZO2yfwNMTibOOjQ7b5X2GnsTeqUHyi/LWwkgKpUTPkoFUOCEAG8PtCBN9YpIp2G1lJGDCA3toplFfRDUi4WYkHfXw2Dq2dMGR0oysYvPhHrVLtyyvh4nh6tkJTyif0QbbdSYy4hRLBuZ+v8P8anN+qCIGn3TOPxAAAAAElFTkSuQmCC" "262" "151" >}}

## Installing generators

On the [http://yeoman.io/generators/](http://yeoman.io/generators/) page, you find all the available Yeoman generators:

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto4.png" "Yeoman generators search page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAM0lEQVR4nD3CyQ0AIAwDMPbflQdnaIsSBA8sp9qnB2PLN39YYN0pl9rGMDP3IEVK0nwAHBZ+Ong2y0zsAAAAAElFTkSuQmCC" "624" "113" >}}

The first way to install a generator is to let Yeoman search for it. You do this as follows:

*   Run **yo**;
*   Select **install a generator**;
*   Type in the name and press enter:

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto5.png" "Yeoman generator installation"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAQUlEQVR4nBXC2w2AIAwAQHYhbekjVoTQfqhh/6mMlyt592fHu9fI01zREIWw1T/VMmJGrn754SpGrNAEWYAFSOADWuUKodIQUc4AAAAASUVORK5CYII=" "624" "148" >}}

*   Yeoman will search on npm for your generator and once it is found you can press enter again to install it:

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto6.png" "Yeoman generator installation process"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAQUlEQVR4nGMwtdK1sjOytDM0NNPV0FJX1VZT01JTU1eCIAYXV0cjE0NDY0MTUyMLKzM9PW0dXS1dPS09fS0dPU0AWTMLB5bxygUAAAAASUVORK5CYII=" "624" "126" >}}

Now there is another way and most likely the one you will be using the most. If you go to a project on GitHub or npm, the developer will tell you the command to use to install the generator. Like for example on my display template generator page: [https://www.npmjs.com/package/generator-displaytemplates](https://www.npmjs.com/package/generator-displaytemplates)

The command to install the display template generator is:

```bash
$ npm install -g gulp yo generator-displaytemplates
```


> **Info**: the command will also install the gulp and yo dependencies.

The same goes for the Office generator. If you go to the GitHub page of the [Office generator](https://github.com/OfficeDev/generator-office). The development team mentions the following install command:

```bash
$ npm install -g tsd bower gulp yo generator-office
```


> **Info**: the command will also install the tsd, bower, gulp and yo dependencies.


## Using generators

Once you have installed a generator, it is time to make use of it. You can do this by typing yo followed by the name of the generator:

```bash
$ yo displaytemplates
```

As Yeoman is a command line utility, there are no wizards for specifying the project name, description, and other project related information. Instead, Yeoman will ask you this questions in the command prompt:

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto7.png" "Yeoman questions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAhklEQVR4nEXJbQ7CIAwAUG5idGtpS2GwD8bIcNz/VMZoNHn/nkkZcuO9SdoHl25ID7R/hhmckDiKye9l3nLQQEjDt8VBCFYU1zxd/ThbjsnZX1se1CPRSAwaRD2LAOL9w6w5HmVNeQnbrPMEwY+MIPaN0ZS6tGdtV+39rGdxUYFHYABGYHgBIwwfFWCXfocAAAAASUVORK5CYII=" "419" "238" >}}

Of course, these questions vary based on the type of generator you are using. These questions are defined by the developer.

Once you answered all questions, the generator will do its thing to create your project.

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto8.png" "Yeoman project installation and configuration"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAd0lEQVR4nBXJSw6DIBAAUM/RhQEKw89hKpGotSAkuOiq6f0v0/Rt34DLGJ98z48te4qAs/TEPDE7cdBicIGlrK6rnzW3Vko5EJ1SAuD+b3C3lGXv7XitGCyR00YIOYLmSvPh833H1aQ0x4UwWAx221OtxRszOfMDYTgWVa3k+z4AAAAASUVORK5CYII=" "372" "145" >}}

In this case, you will end up with the following files and folders in the project root:

{{< caption-new "/uploads/2016/08/081616_1346_Gettingupto9.png" "Project files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAABnWAAAZ1gEY0crtAAAA3UlEQVR4nF3QbY6EIAwGYO9/oEn2AnOB/cg4rE4Eq6CACs5GEOjEdb/c92eftmmaWWuNMdNkRzOHEBExpYSI3vsQQjZ9Ro2L1CbEDf4mSwlT9Dif71bzVmg9NABQw+LcxltP8qs8cajynDBWi5YDNAcO6kn27Y3cOBeH5TtHfepFvbh1r+7XfTOm0fZaqQbaTgglVTwycuN5y/O3y+vzCzD4z/ruGGXkcqUV1cPws/+LhVkaaGhVkSspi1Lw7jCtZsdqKMl7QQohupi29/3y+LH2UgJljLLJmP1eRHwAlmJWkhvYehwAAAAASUVORK5CYII=" "161" "198" >}}

## Building your own generators

You could go one step further and that is to start building your own generators. Yeoman also got you covered. They developed a generator to build your own generators: [https://github.com/yeoman/generator-generator](https://github.com/yeoman/generator-generator). I will not go into more details how you can build your own generators, but if you are interested in doing so, definitely check out the [writing your own Yeoman generator](http://yeoman.io/authoring/) page.

## Getting up to speed series

The files used for this article can be found here: [getting up to speed series](https://github.com/estruyf/blog/tree/master/Getting%20up%20to%20speed%20series) on GitHub.

Other articles in this series:

*   [Getting up to speed with Node.js and npm](https://www.eliostruyf.com/getting-up-to-speed-with-node-js-and-npm/)
*   [Getting up to speed with Gulp](https://www.eliostruyf.com/getting-up-to-speed-with-gulp/)
*   Getting up to speed with Yeoman aka "yo"
*   [Getting up to speed with webpack](https://www.eliostruyf.com/getting-up-to-speed-with-webpack/)