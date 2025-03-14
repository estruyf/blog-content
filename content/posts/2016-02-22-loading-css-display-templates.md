---
title: Loading CSS from your display templates
author: Elio Struyf
type: post
date: 2016-02-22T11:05:04+00:00
slug: /loading-css-display-templates/
dsq_thread_id:
  - 4600766431
categories:
  - Display Templates
  - SharePoint
  - Styling
tags:
  - Display Templates
  - Office 365
  - Search
  - SharePoint
comments: true
---

A while ago I wrote an article about how to correctly include scripts in your Display Templates. As the **$include** functions load files asynchronously on the page, it could happen that the JavaScript file is not loaded yet when you need it.

> **Info**: here is the link to the article - [correctly including scripts into your display templates](https://www.eliostruyf.com/correctly-including-scripts-display-templates/).

So for JavaScript files it is important that you know when they are loaded or in which order they are loaded to the page if there are dependencies. If you are in control of this process, you know when you can execute your code.

In the article I wrote that loading files asynchronously does not really matter for CSS files. Last week I was working on an environment where I saw some strange behaviour on page loads. When you opened the page for the first time, all the elements were placed on the page and after a second or two, they were rearranged and received their right style. This styling delay came from the use of the **$includeCSS** function in the display templates. As multiple display templates used this functionality, all these additional CSS files have to be loaded by your browser and once loaded the results are styled. So it could occur that the rendering of the results is quicker then loading the CSS files.

{{< caption-new "/uploads/2016/02/022216_1026_LoadingCSSf1.png" "Page load experiece"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAtUlEQVR4nGP49eXxm8fnfn99+v/f/3///v/4+vbatetXrly7fOXa5w8vGD4fini9VuX36bRzd++eefDo6q4WUzPLAH93IzP71VOSGL6cr/2wP+TH5bb3X79+/Pnr6bXtE/p65s6d19M78fzBxQyfjyW/3mj05VT2f2yA4evFxk+Hor5d6fz3D8T/9+/v7z8g8PvPn79//zB8Ohj6cpX856NxMA1gVXDdP+4t+3a168fD1VgNBwAOla/Ry0ip9gAAAABJRU5ErkJggg==" "627" "408" >}}

As I mentioned, the $include function load the resources asynchronously and that's why this behaviour could occur. If these are small CSS changes to your HTML elements, this would not be a big issue. But if you are creating carousels, graphs, or more advanced things, it may be of higher importance to have the CSS ready when the results are rendered on the page.

In this article I give you an overview of the approaches on how to add CSS code to the page.

## Using $includeCSS in your display templates

Using the $includeCSS function in your display templates is the easiest way to load required CSS files for styling your results. Be aware that could be a small delay for loading the CSS files (when the CSS files are cached by the browser, the delay is negligible), if the delay does not matter you could make use of this function like this:

```javascript
$includeCSS(this.url, "~sitecollection/_catalogs/masterpage/Project/carousel.css");
```

> **Note**: this function call can best be added in the script block of the display template.

## Loading your CSS via the master page or alternate CSS URL

If you are using a custom master page on the site, or if you applied an alternate CSS URL, you could add the CSS code to the CSS file. With this method you manage all your CSS code in one place and it is not scattered over multiple smaller CSS files. Another advantage is that you are sure that the CSS is loaded before the results are rendered.

> **Note**: This option may not be for everyone, if you are not using a custom master page, or you are only responsible for the development of these display templates and cannot touch anything else on the site. Another reason could be that you use the templates on multiple environments and you want to be sure that the CSS code is always available, if this is the case, you best check out the next approach.

## Writing CSS to the page from the display template

This approach can be used if neither of the previous approaches work for you. Instead of asynchronously loading the CSS, this approach adds the CSS to the page from the moment the display template gets loaded.

In a display template you are allowed to have one main DIV element (in which your write the HTML and JavaScript code), and a script block. Adding a style block to the display template will just be ignored by the engine that generates the JavaScript version of the display template. So you have to append the CSS to the page via some JavaScript code.

Here is the required code that you have to add in the **script block** of your display template:

```javascript
Type.registerNamespace('loadCssDT');
loadCssDT = function () {
    var added = false;

    // Add styles that are required for this template
    var styles = (function() {/*
        .cbs-Item {
            font-weight: bold;
        }
    */}).toString().slice(15, -3);

    return {
        init: function () {
            // Check if CSS is already added
            if (!added) {
                var head = document.head '' document.getElementsByTagName('head')[0],
                    style = document.createElement('style');

                style.type = 'text/css';
                if (style.styleSheet){
                    style.styleSheet.cssText = styles;
                } else {
                    style.appendChild(document.createTextNode(styles));
                }
                head.appendChild(style);
                // Set added to true, to not read the CSS code to the page
                added = true;
            }
        }
    };
}();
loadCssDT.init();
```

> **Note**: the code in the script block will be executed first when the display template gets loaded. That means that the CSS gets added before the results get rendered.
>  
> **Important**: watch out with the amount of CSS code you add via the display template.
>
> **Note 2**: you could also add the CSS reference to the page. Be aware that you have to write some code in order to check if the CSS file are already loaded.

### Sample template

The sample template is available here: [Item_Style.html (GitHub)](https://github.com/estruyf/blog/blob/master/Including%20CSS%20from%20your%20display%20template/Item_Style.html).