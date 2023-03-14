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

{{< caption-legacy "uploads/2012/03/032812_1826_TakeyourSha1.png" "Social Tags Results" >}}

## User Control

You have various possibilities to show these tag results on your page. One of these possibilities, which I am going to explain, is a user control.

The advantage of creating an user control is that you can add the control into your master page, and so it will be displayed on all the pages that uses this master page.

My user control looks like this:

{{< highlight html "linenos=table,noclasses=false" >}}
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
{{< / highlight >}}

And this is the content of the code behind:

{{< highlight csharp "linenos=table,noclasses=false" >}}
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
{{< / highlight >}}


## Master Page

When you deploy your (or mine, can be downloaded at the bottom) user control to SharePoint, you need to reference it in your master page.

### Step 1

Open your master page in SharePoint Designer and add the user control reference at the top of the master page.

{{< highlight html "linenos=table,noclasses=false" >}}
<%@ Register TagPrefix="estruyf" TagName="SocialTags" src="~/_controltemplates/estruyf/Tags.ascx" %>
{{< / highlight >}}


### Step 2

Find the place where you want to add the user control.

In my example I added a new table column next to the social data buttons. You can do this by doing a search for the following class **s4-socialdata-notif** and change the HTML to this:

{{< caption-legacy "uploads/2012/03/032812_1826_TakeyourSha2.png" "HTML Code for Social Tags Location" >}}

{{< highlight html "linenos=table,noclasses=false" >}}
<td>
  <!-- Social Tag Control -->
  <estruyf:SocialTags runat="server"/>
</td>
<td class="s4-socialdata-notif">
  <SharePoint:DelegateControl ControlId="GlobalSiteLink3" Scope="Farm" runat="server"/>
</td>
{{< / highlight >}}

Save and publish your master page. When you now go to a SharePoint page, you should have the following result.

{{< caption-legacy "uploads/2012/03/032812_1826_TakeyourSha3.png" "Social Tags Result" >}}

## Download

[Social Tagging Control](uploads/2012/03/estruyf.SocialTaggingControl.zip)