---
title: 'Take your SharePoint social features to the next level with “I like it” and “Tags” counters: Part 3'
author: Elio Struyf
type: post
date: 2012-04-05T08:00:56+00:00
slug: /take-your-sharepoint-social-features-to-the-next-level-with-i-like-it-and-tags-counters-part-3/
Xylot:
  - http://www.xylos.com/blog/post/1240/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-3/
NBSP:
  - https://www.nothingbutsharepoint.com/sites/devwiki/articles/Pages/Take-your-SharePoint-social-features-to-the-next-level-with-I-like-it-and-Tags-counters-Part-3.aspx
dsq_thread_id:
  - 3836446628
categories:
  - Development
  - SharePoint
tags:
  - Social Features
comments: true
---

In the previous parts I showed you how to retrieve all tags for a specific page/item.

In this part (the last one) I will show you how you can integrate these tags into your design.

This will be the final result:

{{< caption-new "/uploads/2012/03/032812_1826_TakeyourSha1.png" "Social Tags Results"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAfUlEQVR4nGNQs/SDIw1rf3VrfyOXcDP3aB27YDVLP4ZTZ66eOnPl1Jkrp89e3X3g1P5DZ06cuXLkxMXjp6/sO3Sa4T8S+Pjh29cv3//8/vPr5++fP39/fP+J4fvXH2/ffnz37tO7d58+ffzy7cv371++vX77+fPHr9duPQMAQFZYRLsiq0wAAAAASUVORK5CYII=" "307" "137" >}}

## User Control

You have various possibilities to show these tag results on your page. One of these possibilities, which I am going to explain, is a user control.

The advantage of creating an user control is that you can add the control into your master page, and so it will be displayed on all the pages that uses this master page.

My user control looks like this:

```html
<style>
    .tagging {
        height: 50px;
        min-width: 48px;
    }
    .tagging>div {
        height: 20px;
        padding-left: 24px;
    }
    .tagging .number {
        font-size: 16px;
        font-weight: bold;
        float:left;
    }
    .tags {
        background: #E7E7E8 url(/_layouts/images/socialtag.png) no-repeat 4px center;
        margin-bottom: 7px;
    }
    .likes {
        background: #E7E7E8 url(/_layouts/images/QuickTagILikeIt_16.png) no-repeat 4px center;
    }
    .border-left {
        width: 0;
      height: 0;
      border-top: 10px solid white;
      border-bottom: 10px solid white; 

      border-left:10px solid #E7E7E8;
        float: right;
    }
</style>

<div class="tagging">
    <div class="tags">
        <div class="number"><asp:Label ID="lblTags" runat="server" Text="0"></asp:Label></div>
        <div class="border-left"></div>
    </div>
    <div class="likes">
        <div class="number"><asp:Label ID="lblLikes" runat="server" Text="0"></asp:Label></div>
        <div class="border-left"></div>
    </div>
</div>
```

And this is the content of the code behind:

```csharp
using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.Office.Server.SocialData;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;

namespace estruyf.SocialTaggingControl.ControlTemplates.estruyf.SocialTaggingControl
{
    public partial class Tags : UserControl
    {
        private string _tags = string.Empty;
        private string _likes = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            GetTags();

            lblTags.Text = _tags;
            lblLikes.Text = _likes;
        }

        private void GetTags()
        {
            try
            {
                SPSecurity.RunWithElevatedPrivileges(delegate()
                {
                    using (SPSite site = new SPSite(SPContext.Current.Site.Url))
                    using (SPWeb web = site.OpenWeb())
                    {
                        var type = typeof(SocialTagManager);
                        var methods = type.GetMethods(System.Reflection.BindingFlags.DeclaredOnly ' System.Reflection.BindingFlags.NonPublic ' System.Reflection.BindingFlags.Instance);
                        var method = methods.FirstOrDefault(m => m.ToString() == "Microsoft.Office.Server.SocialData.SocialTag[] GetTags(System.Uri, Int32, Microsoft.Office.Server.SocialData.SocialItemPrivacy)");
                        if (method == null) throw new MissingMethodException("Social Tag method not found.");

                        SPServiceContext serviceContext = SPServiceContext.GetContext(site);
                        SocialTagManager stm = new SocialTagManager(serviceContext);

                        // Check if the current page is the homepage
                        Uri uri = System.Web.HttpContext.Current.Request.Url;
                        SPFolder root = web.RootFolder;
                        if (uri.AbsoluteUri.Contains(root.WelcomePage))
                        {
                            uri = new Uri(SPContext.Current.Web.Url);
                        }

                        var itemTags = (SocialTag[])method.Invoke(stm, new object[] { uri, 1000, SocialItemPrivacy.PublicOnly });

                        _tags = itemTags.Count(t => t.Term.Name.ToLower() != "i like it").ToString();
                        _likes = itemTags.Count(t => t.Term.Name.ToLower() == "i like it").ToString();
                    }
                });
            }
            catch (Exception)
            {
            }
        }
    }
}
```


## Master Page

When you deploy your (or mine, can be downloaded at the bottom) user control to SharePoint, you need to reference it in your master page.

### Step 1

Open your master page in SharePoint Designer and add the user control reference at the top of the master page.

```html
<%@ Register TagPrefix="estruyf" TagName="SocialTags" src="~/_controltemplates/estruyf/Tags.ascx" %>
```


### Step 2

Find the place where you want to add the user control.

In my example I added a new table column next to the social data buttons. You can do this by doing a search for the following class **s4-socialdata-notif** and change the HTML to this:

{{< caption-new "/uploads/2012/03/032812_1826_TakeyourSha2.png" "HTML Code for Social Tags Location"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAbklEQVR4nBXJ2xLDEBAAUP//g81LLypDSWSQZdklMj2vR4zGXqbvAl7lXdfNXeRjTlzKiHGKmvuhYJfg3jlaPDT+VrKmB8/cpyAcSZ9Wlm1F8wT1Ym3m6RFi/3eNzX7C8ghOw1UQ8mzYGYmQieYNTiBxJPPScp4AAAAASUVORK5CYII=" "450" "190" >}}

```html
<td>
  <!-- Social Tag Control -->
  <estruyf:SocialTags runat="server"/>
</td>
<td class="s4-socialdata-notif">
  <SharePoint:DelegateControl ControlId="GlobalSiteLink3" Scope="Farm" runat="server"/>
</td>
```

Save and publish your master page. When you now go to a SharePoint page, you should have the following result.

{{< caption-new "/uploads/2012/03/032812_1826_TakeyourSha3.png" "Social Tags Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAApklEQVR4nAGbAGT/ALOyrsTI0cbHz7a5w7i8xbq/yb7Czbi8x73CzLO4wgD5+/z8/f70+Pz3+/39///17erd2tDn6eLMycnq6usA9ff4+Pj44+Xl5OXm7/L0ybitnoZusJR8ZUIruLm5APP3+f7+/v79/f39/P///8a5r5KCbrGdjpiAcLu5vADx9PX7/Pz////+/v7////d19O1rqLJwLjKx8PPzc1NAHslIPYJAAAAAABJRU5ErkJggg==" "605" "324" >}}

## Download

[Social Tagging Control](/uploads/2012/03/estruyf.SocialTaggingControl.zip)