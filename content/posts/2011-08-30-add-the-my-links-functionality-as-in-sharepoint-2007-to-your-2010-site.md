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

{{< caption-new "/uploads/2011/08/083011_1347_AddtheMyLin1.png" "My Links Functionality in SharePoint 2007"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAtUlEQVR4nAXB2wqCMBgA4L3/c0Q3XQRFBUWlQYc1XTBPE/1zZc3DllqMDnd9H+IZp1FsE7o+uhvnZGNCfJ4IgMjibIF8t5+FWJwzAek9v+aXS6PU25jv59d1T0RTIHE8Xi0t4ljEIREP8hvLRJDfPAC0Tc7LMO3NFgN7O9yTEaZT6k1cNvfilReia10Jed/hA6bUZUwqVbdt1TSP10vWNSq1Lqsq8H0AKKQsi0Ir/dDaGNO13R+JLphub7CzDQAAAABJRU5ErkJggg==" "251" "162" >}}

In SharePoint 2010 this option is not there anymore.

{{< caption-new "/uploads/2011/08/083011_1347_AddtheMyLin2.png" "SharePoint 2010 - User Context Menu"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABHklEQVR4nDWOy0oDMRRA812W4h/Y4k7cta50I251oT+gn+ZWBIvSyUxnksk7mST33kFq8SwPHDhscbFZrrdnq+1itT2/vFmuN1e3j/fPrw8vb9d3T8yHmKa844ILba1VyoxKD0Ja5w5iZIiINLuYtZ+mUk+UUqDWqVSGgIDYj6YZtNZWa+O9t9bFmKYpsxhTBQgFdKqp0j/zPM8VgH18vQ+i+WmGz2++bwc1Kiklb9qYJqKZ1ZIBYFBW29BJ241WmqCtR0RAYoiERL1yQvteOS50K600rpaKNJ/OqZGej6HTUfsEteScT54hESLytm+6Yc873vW8PeybVhtzqgmQdt3IhXEuhBCO3bEkRGK51grgfPAx+RB9iPA3hUSlwi8bYEUaREO8gwAAAABJRU5ErkJggg==" "258" "307" >}}

The functionality is still there, but only for adding libraries to **My Links**. It can be found on the Library tab -> Connect to Office -> Add to SharePoint Sites.

{{< caption-new "/uploads/2011/08/083011_1347_AddtheMyLin3.png" "SharePoint 2010 Document Library - Add to SharePoint Sites"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA+UlEQVR4nBXBy1KDMBQA0Pz/2g9Qq12pHa2PlS4cdemiLdEqIQ9yQwM0ECBAaRscz0FRGqmMuWxZ8Heli1RrpVRlresGwhSKyBv5vBRJEMofk5dZlle1G8dRp9tVgJHCp2x1JtYPGAcg1pRgRoK6TLQKKQlQ9HtSs3OOp9FiEi0mdHkRf03bzexg5r54RFbeGjpj+Fp833B8ZcTcyvuc3R2K52PxgjrxUW8oFQAAUoKI/0mAumm8P6KdkVUaMwGgEs5jLiTjcWmrYRi890iHTyR8pVwxEQMoLiRAYm3lXDuOI2oMb+oi0Wmeb/t+1/d91/WNc861w37/B0wz7sZ+SplmAAAAAElFTkSuQmCC" "251" "217" >}}

Laura Rogers made a blog post to make the My Links available on the My Site. Her post can be found on the following URL: [SharePoint 2010 - Where'd "My Links" Go?](http://www.sharepoint911.com/blogs/laura/Lists/Posts/Post.aspx?List=676af157-7d96-4e15-a987-54b8a3e4d948&ID=74).

**But what if you want to add SharePoint sites or lists to the My Links section?**

This requires some manual steps to add the links to the My Links section. Most of the clients would not like this, they just want it to work as in SharePoint 2007.

In this post I will explain my approach to "re-add" the same functionality like in SharePoint 2007. The result would look like this.

{{< caption-new "/uploads/2011/08/083011_1347_AddtheMyLin4.png" "SharePoint 2010 - User Context Menu With My Links Functionality"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAIAAADt1dgcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABm0lEQVR4nC2RS24UMRRFvSoSiSXQYgEMkjBHYggTJEawAVhUJkwakBBpOlWucvnv8r/9K5Ar3IkHV++d82Tw7MXN9eH26nB3dbh7/vL19eH21ZsP7z59ef/5683bj4BwweV6/A1/PaIFU4gwnJfzOCFM/4wI1Frbtl1SDpeSS2mt1lLLnlpbr3OpiKkBS6m0WldrndbGOV9qBTFeam0hVRNLzLXteXpSLuDn6Ruh8DTiHyc4zFhywRiHcPY+1NZAuoRcMlNGaYuFXoRmysrV1O7Q2X0VlZYrS6RBTCGhxWpzSn26dvW2SEfWQHU0IbVacs79hF63Vko5Q3SG6PQ4DRDBCQ0jFFK1toGyM0aqsbLBhxhj39fVt/93t20z1jsffYjeh23b/u7pNZwJZXwW9ozXiZuRm4Eq61zq+A0QLISQhHJMGSYMU+ZcZ+RSatvALL6nKGfhiXJYOmVjyTmE3aA1wOnR8oeZ6gmzcSbOh5RSeBJsDazwHsL7MzYPE52o0sY657zv/7FPz0fFIaFyWciCe2+c1x2fwiX9A6V27LUoWUegAAAAAElFTkSuQmCC" "258" "455" >}}

## Add to My Links Custom Action

The first thing I will explain is how to add the **Add to My Links** option to the User Context Menu.

In SharePoint 2007, three pages were being used when you clicked on the Add to My Links. The first page that opened was the **/_Layouts/QuickLinksDialog.aspx** page. This page contained an iframe that opened the **/_Layouts/QuickLinksDialog2.aspx** that immediate did a form submission to the **/_Layouts/QuickLinksDialogForm.aspx** page.

These pages still exist in SharePoint 2010, but they give you some JavaScript errors. For this reason I created a new application page that automatically does a form submission with Query String variables.

This is the markup for the application page.

```html
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
```


The next step is to create a custom action that adds a link to the User Context Menu. To make it SharePoint 2010 "friendly", the application page will be opened in a common dialog window. For this I created a small JavaScript function that can easily be called from the custom action.


```javascript
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
```


This JavaScript function is also added by a custom action. The custom action markup looks like this.


```xml
<CustomAction
  ScriptSrc="/_layouts/estruyf.mylinks/estruyf.mylinks.js"
  Location="ScriptLink"
  Sequence="100">
</CustomAction>
```


The last step is to add the custom action which adds the **Add to My Links** option to the User Context Menu. The custom action markup looks like this.


```xml
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
```


As you can see in the **UrlAction** the **Mylinks_Dialog** function is called. This would give the following result in SharePoint.

{{< caption-new "/uploads/2011/08/083011_1347_AddtheMyLin5.png" "Add to My Links Dialog"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA6ElEQVR4nD2OzUrDQBRG55F1KZq6EERTRJBaEd0IggguhEJtlRLFIRpDTRX0BSrF/mWaaSYz3smdK1X042wOZ/OxZc/f2D1a2dxb3ap51XqleuD59bXt/fWdw6WKz27uHoicBSAiRLQAzjlEJKIwTlirfYXotNaIKFLR738Mh+PB4LNQRcAjdt04I6IvYxAxy+RoNFZ5IeUcEW/5E2u22hYgz3OjjczkZDKVcj6bZWVZLnLnPiIiY4y1AGCVUqlIhRBGFwF/ZAFf5PLny/9+NYx77Pj0ovvyxqPnME7+6PEo6b6+n5xffgNR6c1s3R9olgAAAABJRU5ErkJggg==" "517" "402" >}}

## Manage Links Custom Action

Now that I explained you how to add the **Add to My Links**, the next step is to add the **Manage Links** option to your site. This is an easy step, because you only need to create a custom action that links to the **/_Layouts/MyQuickLinks.aspx** page. This is the same page that is used as in SharePoint 2007.


```xml
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
```


{{< caption-new "/uploads/2011/08/083011_1347_AddtheMyLin6.png" "Manage My Links Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nDXBMRKAMAwDwfz/pzQME5robMlU7K5nv6JEHYpqu49ku92Cdd2bzvycCGYmicQHF5s6xg/GnPoAAAAASUVORK5CYII=" "843" "196" >}}

## Files

If you want to install this solution you can download the my SharePoint 2010 solution file.

[Solution File](/uploads/2012/02/estruyf.MyLinks.Solution.File_.zip)

Deploy the solution to your SharePoint environment and activate the following site collection feature: **estruyf MyLinks Feature**.

{{< caption-new "/uploads/2011/08/083011_1347_AddtheMyLin7.png" "estruyf MyLinks Feature"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/ALy9vcrKyu7u7urq6/Dw8fn5+vr6+/X19ezs7PT09Jh3G0nQqUo1AAAAAElFTkSuQmCC" "552" "60" >}}

If you want to make changes to the code, here is my Visual Studio project.

[VS Project](/uploads/2011/08/estruyf.MyLinks.VS_.Project.zip)

## Useful Links

[My Links missing in SharePoint 2010](http://sharepointreporter.wordpress.com/2010/10/21/my-links-missing-in-sharepoint-2010/)

[SharePoint 2010 - Where'd "My Links" Go?](http://www.sharepoint911.com/blogs/laura/Lists/Posts/Post.aspx?List=676af157-7d96-4e15-a987-54b8a3e4d948&ID=74)

## Updates

### Changes: 2/02/2012

Solution file and code is updated to solve the Access Denied error Manjiri Patil had discovered. This was due to the fact that the application page was using an incorrect URL.
