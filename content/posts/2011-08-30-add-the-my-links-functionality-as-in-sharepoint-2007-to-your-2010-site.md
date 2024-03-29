---
title: Re-add the My Links Functionality as in SharePoint 2007 to Your 2010 Site
author: Elio Struyf
type: post
date: 2011-08-30T17:00:03.000Z
slug: /add-the-my-links-functionality-as-in-sharepoint-2007-to-your-2010-site/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Re-add-the-My-Links-Functionality-as-in-SharePoint-2007-to-Your-2010-Site.aspx
dsq_thread_id:
  - 3836445220
categories:
  - My Site
  - SharePoint
tags:
  - Custom Actions
  - My Links
  - My Site
  - Visual Studio
comments: true
---

Clients that migrate from SharePoint 2007 to SharePoint 2010 may miss the old **My Links** functionality in their "new" environment.

In SharePoint 2007, you had the option to add sites to your My Site by clicking on a link in the User Context Menu.

{{< caption-legacy "uploads/2011/08/083011_1347_AddtheMyLin1.png" "My Links Functionality in SharePoint 2007" >}}

In SharePoint 2010 this option is not there anymore.

{{< caption-legacy "uploads/2011/08/083011_1347_AddtheMyLin2.png" "SharePoint 2010 - User Context Menu" >}}

The functionality is still there, but only for adding libraries to **My Links**. It can be found on the Library tab -> Connect to Office -> Add to SharePoint Sites.

{{< caption-legacy "uploads/2011/08/083011_1347_AddtheMyLin3.png" "SharePoint 2010 Document Library - Add to SharePoint Sites" >}}

Laura Rogers made a blog post to make the My Links available on the My Site. Her post can be found on the following URL: [SharePoint 2010 - Where'd "My Links" Go?](http://www.sharepoint911.com/blogs/laura/Lists/Posts/Post.aspx?List=676af157-7d96-4e15-a987-54b8a3e4d948&ID=74).

**But what if you want to add SharePoint sites or lists to the My Links section?**

This requires some manual steps to add the links to the My Links section. Most of the clients would not like this, they just want it to work as in SharePoint 2007.

In this post I will explain my approach to "re-add" the same functionality like in SharePoint 2007. The result would look like this.

{{< caption-legacy "uploads/2011/08/083011_1347_AddtheMyLin4.png" "SharePoint 2010 - User Context Menu With My Links Functionality" >}}

## Add to My Links Custom Action

The first thing I will explain is how to add the **Add to My Links** option to the User Context Menu.

In SharePoint 2007, three pages were being used when you clicked on the Add to My Links. The first page that opened was the **/_Layouts/QuickLinksDialog.aspx** page. This page contained an iframe that opened the **/_Layouts/QuickLinksDialog2.aspx** that immediate did a form submission to the **/_Layouts/QuickLinksDialogForm.aspx** page.

These pages still exist in SharePoint 2010, but they give you some JavaScript errors. For this reason I created a new application page that automatically does a form submission with Query String variables.

This is the markup for the application page.

{{< highlight html "linenos=table,noclasses=false" >}}
<html>
  <head>
    <title>Add Site to My Links</title>
  </head>
  <body>
    <form id="ctl00" target="_self" action="QuickLinksDialog2.aspx" method="post" name="ctl00">
      <input id="QuickLinksTitle" type="hidden" value="" name="QuickLinksTitle">
      <input id="QuickLinksUrl" type="hidden" value="" name="QuickLinksUrl">

      <script language="Javascript">
        var form = document.forms[0];

        form.QuickLinksTitle.value = queryString('Title').replace(/%20/g, " ");
        form.QuickLinksUrl.value = queryString('URL');

        form.action = queryString('Source') + '/_layouts/QuickLinksDialogForm.aspx';
        form.submit();

        //Retrieve the query string variable
        function queryString(name) {
          name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
          var regexS = "[\\?&]" + name + "=([^&#]*)";
          var regex = new RegExp(regexS);
          var results = regex.exec(window.location.href);

          if (results == null)
            return "";
          else
            return results[1];
        }
      </script>

    </form>
  </body>
</html>
{{< / highlight >}}


The next step is to create a custom action that adds a link to the User Context Menu. To make it SharePoint 2010 "friendly", the application page will be opened in a common dialog window. For this I created a small JavaScript function that can easily be called from the custom action.


{{< highlight javascript "linenos=table,noclasses=false" >}}
function Mylinks_Dialog(siteURL, Title, URL) {
    var options = {
        title: "Add to My Links",
        showClose: true,
        allowMaximize: false,
        autoSize: true,
        url: siteURL + '/_layouts/estruyf.mylinks/estruyf.QuickLinksDialog.aspx?Title=' + Title + '&URL=' + URL + '&Source=' + siteURL
    };
    SP.UI.ModalDialog.showModalDialog(options);
}
{{< / highlight >}}


This JavaScript function is also added by a custom action. The custom action markup looks like this.


{{< highlight xml "linenos=table,noclasses=false" >}}
<CustomAction
  ScriptSrc="/_layouts/estruyf.mylinks/estruyf.mylinks.js"
  Location="ScriptLink"
  Sequence="100">
</CustomAction>
{{< / highlight >}}


The last step is to add the custom action which adds the **Add to My Links** option to the User Context Menu. The custom action markup looks like this.


{{< highlight xml "linenos=table,noclasses=false" >}}
<CustomAction
    Id="estruyfAddLink"
    GroupId="PersonalActions"
    Location="Microsoft.SharePoint.StandardMenu"
    Sequence="1"
    Title="Add to My Links"
    Description="Add this page or any other to your Links list."
    ImageUrl="/_layouts/images/ctoa32.png">
  <UrlAction Url="javascript:Mylinks_Dialog('{SiteUrl}', document.title, window.location.href);" />
</CustomAction>
{{< / highlight >}}


As you can see in the **UrlAction** the **Mylinks_Dialog** function is called. This would give the following result in SharePoint.

{{< caption-legacy "uploads/2011/08/083011_1347_AddtheMyLin5.png" "Add to My Links Dialog" >}}

## Manage Links Custom Action

Now that I explained you how to add the **Add to My Links**, the next step is to add the **Manage Links** option to your site. This is an easy step, because you only need to create a custom action that links to the **/_Layouts/MyQuickLinks.aspx** page. This is the same page that is used as in SharePoint 2007.


{{< highlight xml "linenos=table,noclasses=false" >}}
<CustomAction
    Id="estruyfMyLinks"
    GroupId="PersonalActions"
    Location="Microsoft.SharePoint.StandardMenu"
    Sequence="2"
    Title="Manage Links"
    Description="Reorganize or delete items in your Links list."
    ImageUrl="/_layouts/images/ctom32.png">
  <UrlAction Url="~site/_layouts/MyQuickLinks.aspx" />
</CustomAction>
{{< / highlight >}}


{{< caption-legacy "uploads/2011/08/083011_1347_AddtheMyLin6.png" "Manage My Links Page" >}}

## Files

If you want to install this solution you can download the my SharePoint 2010 solution file.

[Solution File](/uploads/2012/02/estruyf.MyLinks.Solution.File_.zip)

Deploy the solution to your SharePoint environment and activate the following site collection feature: **estruyf MyLinks Feature**.

{{< caption-legacy "uploads/2011/08/083011_1347_AddtheMyLin7.png" "estruyf MyLinks Feature" >}}

If you want to make changes to the code, here is my Visual Studio project.

[VS Project](/uploads/2011/08/estruyf.MyLinks.VS_.Project.zip)

## Useful Links

[My Links missing in SharePoint 2010](http://sharepointreporter.wordpress.com/2010/10/21/my-links-missing-in-sharepoint-2010/)

[SharePoint 2010 - Where'd "My Links" Go?](http://www.sharepoint911.com/blogs/laura/Lists/Posts/Post.aspx?List=676af157-7d96-4e15-a987-54b8a3e4d948&ID=74)

## Updates

### Changes: 2/02/2012

Solution file and code is updated to solve the Access Denied error Manjiri Patil had discovered. This was due to the fact that the application page was using an incorrect URL.
