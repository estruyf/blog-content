---
title: Correctly including scripts into your display templates
author: Elio Struyf
type: post
date: 2015-01-12T11:19:12+00:00
excerpt: This post explains why you should not use the $includeScript function and shows the correct way of including scripts into your display template.
slug: /correctly-including-scripts-display-templates/
dsq_thread_id:
  - 3836535670
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

When creating display templates it is sometimes required to load additional script and/or CSS files. These files can easily be referenced in a display template with the following functions:

*   $includeScript
*   $includeLanguageScript
*   $includeCSS

Now there is a problem when using these $include functions. The problem is that the function loads your referenced files asynchronously. So that means that if you need to call a function in the referenced JavaScript file, this could result in an error that states that the function is not defined. As the $include functions are loading the files asynchronously, you cannot be sure that the function will be available when you need to execute your code.

What I recommend is to use the $include function only if you do not have a dependency to one of these files. CSS file references will not give you any problems because it does not matter for your code when they get loaded.

Now, what can you do if your code happens to have a dependency to one of the referenced files? If that is the case, you need to update your code and use the **RegisterSod** function instead of the **$includeScript** function.

> **Info**: If you want to load a script dependency that is required in your item display template, you can also check out the following post: [How to load scripts that are required for your item display template rendering](https://www.eliostruyf.com/how-to-load-scripts-that-are-required-for-your-item-display-template-rendering/).

## Solution

As I already mentioned, the solution that I recommend is to switch to the SP.SOD.registerSod / RegisterSod function instead of using the $includeScript function. This function can be implemented in the script element, but the downside of it is that you cannot add the URL tokens to it. So it is best to only do it for external script references like for example jQuery:

{{< highlight html "linenos=table,noclasses=false" >}}
<script>
  RegisterSod('jquery-1.11.2.min.js', 'http://code.jquery.com/jquery-1.11.2.min.js');
</script>
{{< / highlight >}}

If you need to reference files with a URL token (~sitecollection or ~site) like you can do in the $includeScript function, you could use a function that is called: Srch.U.replaceUrlTokens. It is easier to place this code where you can find the rest of the JavaScript, otherwise, you need to ensure that the search JavaScript files are loaded. As everything in the script block gets executed before the scripts are registered, so you need to add some additional code. That is why I place this code in the first DIV element of the HTML display template.

So in my first example, my files need to be loaded in the following order:

*   Script1.js
*   Script2.js
*   Script3.js

This is the code that needs to be added:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
RegisterSod('script1.js', Srch.U.replaceUrlTokens("~sitecollection/_catalogs/masterpage/tests/script1.js"));
RegisterSod('script2.js', Srch.U.replaceUrlTokens("~sitecollection/_catalogs/masterpage/tests/script2.js"));
RegisterSod('script3.js', Srch.U.replaceUrlTokens("~sitecollection/_catalogs/masterpage/tests/script3.js"));
{{< / highlight >}}

This will register the scripts, but they are not yet loaded if you go to your page. To load them you will need to make use of the SP.SOD.executeFunc / EnsureScriptFunc function. There are some dependencies here, so there are two ways to do it:

1.  Call the EnsureScriptFunc function three times for each file (script 1, script 2, script 3);
2.  Define the script dependencies with RegisterSodDep function. This is the cleanest way to the job done.

If you are going to use the ensure script function three times, it will look like this:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
EnsureScriptFunc("script1.js", null, function() {
  EnsureScriptFunc("script2.js", null, function() {
    EnsureScriptFunc("script3.js", null, function() {
      Script3("Template");
    });
  });
});
{{< / highlight >}}

> **Note**: another way could be to load these files is with **LoadMultipleSods** or **SP.SOD.loadMultiple**: `LoadMultipleSods(['script1.js', 'script2.js', 'script3.js'], function() { // the code });`. This will load the files asynchronously, so if your files are depended on each other, this approach cannot be used.

Now by defining the script dependencies, it looks like this:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
RegisterSodDep('script2.js', 'script1.js');
RegisterSodDep('script3.js', 'script2.js');

EnsureScriptFunc("script3.js", null, function() {
  Script3("Template");
});
{{< / highlight >}}

When you add this to your display template and refresh the page, it returns the following log messages:

{{< caption-legacy "uploads/2015/01/011215_1032_Correctlyin4.png" "Scripts loaded in correct order" >}}

In this example I included three JavaScript files when you only need to add one reference like jQuery, for example, you do not have to add a dependency. You only need to register the reference to the jQuery script and the ensure script function.

## Refreshing your results

When you are going to refresh your results (which can happen on a search query, refinement, sorting, ... actions), that will trigger the display templates to get loaded again and render the results on the page. When the code is going execute the **EnsureScriptFunc** with the script3.js reference you will notice that the **Script3** function will not get executed. Why is this happening?

In the EnsureScriptFunc there are some checks in place to see if the script is loaded. The first time the function gets called, the script3.js reference is not yet loaded for the script on demand (SOD). You can check this in the SOD variable when the EnsureScriptFunc gets called:

{{< caption-legacy "uploads/2015/01/sod-not-loaded.png" "Script missing state" >}}

In the screenshot above you can see that the script has a state equal to 1 which corresponds to a missing state:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
Sods = {
  missing: 1,
  loading: 2,
  pending: 3,
  loaded: 4
};
{{< / highlight >}}

When the script reference is missing, the code will retrieve this script and once it is loaded, execute your code.

Now when you are going to refine, sort, or do a new search query, your results will get refreshed and the templates will get loaded again. When the EnsureScriptFunc function gets called, the SOD variable will now have the following state:

{{< caption-legacy "uploads/2015/01/sod-loaded.png" "Script loaded state" >}}

As you can see the script reference is not missing anymore because it is already loaded. This is very normal because there was not a page refresh, so the script is still available from the first result rendering. That is also why the **Script3** function will not get executed.

The solution to this is very easy. You have to specify the function name which you want to call as the second parameter in the **EnsureScriptFunc** function.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
EnsureScriptFunc("script3.js", 'Script3', function() {
  Script3("Template");
});
{{< / highlight >}}

The EnsureScriptFunc function will check if the parameter is not undefined or null. If this is not the case, it knows that it can execute the code which is written inside the block.

## Loading jQuery

For **jQuery** you will have something like this:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
RegisterSod('jquery-1.11.2.min.js', 'http://code.jquery.com/jquery-1.11.2.min.js')
EnsureScriptFunc('jquery-1.11.2.min.js', 'jQuery', function () {
  // Replace the next line with a function call
  console.log('jQuery ready');
});
{{< / highlight >}}

It could be that jQuery is already referenced in the master page or page layout. What you can do is checking if jQuery is loaded before registering your file:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
if (typeof jQuery === "undefined") {
  RegisterSod('jquery-1.11.2.min.js', 'http://code.jquery.com/jquery-1.11.2.min.js')
  EnsureScriptFunc('jquery-1.11.2.min.js', 'jQuery', function () {
    // Replace the next line with a function call
    console.log('jQuery ready');
  });
} else {
  // Replace the next line with a function call
  console.log('jQuery already loaded');
}
{{< / highlight >}}

## Background information

Let me show you what happens if you are going to implement your script with the $includeScript function. As an example, I created a copy of the default control_list.html display template and I added three different script references in the script block:

{{< highlight html "linenos=table,noclasses=false" >}}
<script>
  $includeScript(this.url, "~sitecollection/_catalogs/masterpage/tests/script1.js");
  $includeScript(this.url, "~sitecollection/_catalogs/masterpage/tests/script2.js");
  $includeScript(this.url, "~sitecollection/_catalogs/masterpage/tests/script3.js");
</script>
{{< / highlight >}}

For testing purposes, I added some demo functions in the script files to show log messages. Here is an example of the code from script1.js:

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
console.log('Script 1 loaded');

function Script1 (script) {
  console.log('Script 1 function called:' + script);
}
{{< / highlight >}}

In script2.js I do a call to the **Script1** function. In script3.js a call will be made to **Script1** and **Script2**. I also added an **AddPostRenderCallback** function to the template which will call the **Script3** function.

{{< highlight JavaScript "linenos=table,noclasses=false" >}}
AddPostRenderCallback(ctx, function () {
  Script3("Template");
});
{{< / highlight >}}

Now when I configure a Content Search Web Part in combination with this template, this is what the results are in my developer tools console:

{{< caption-legacy "uploads/2015/01/011215_1032_Correctlyin1.png" "Async script loading - incorrect" >}}

The first time I load my page script2.js was loaded before script1.js. That is why I received the error that **Script1** is not defined. If I refresh my page again this is what I get:

{{< caption-legacy "uploads/2015/01/011215_1032_Correctlyin2.png" "Async script loading - incorrect" >}}

Now the third script is loaded first. So the $include functions do exactly what they are supposed to do, they load the scripts onto your page async.

The correct result should have been like this:

{{< caption-legacy "uploads/2015/01/011215_1032_Correctlyin3.png" "Async script loading - correct" >}}

When using the $includeScript function the code gets executed from the moment the file is loaded. This is normal behaviour of course, but you have no control when it gets executed, or in which order it gets executed because it is asynchronous.

When you are working with some JavaScript frameworks and plugins, you need to be sure that the framework itself is loaded before the plugin scripts. For example jQuery needs to be loaded before jQueryUI. Also, you need to be sure that these files are loaded before you can execute your code. That is why you best use the RegisterSod and EnsureScriptFunc functions instead of the $includeScript function.

## Download

Here you can find all the scripts that are created for this post: [Blog GitHub Repository](https://github.com/estruyf/blog/tree/master/Correctly%20including%20scripts%20into%20your%20display%20templates "Blog GitHub Repository").

## Changes

### 18/02/2015

Added a section to give you more information how to correctly include a function call when your results get refreshed (for example: by refining the results).

### 20/04/2016

Updated the article with a section allocated to jQuery loading.