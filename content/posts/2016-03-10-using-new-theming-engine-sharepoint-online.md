---
title: Using the new theming engine on SharePoint Online
author: Elio Struyf
type: post
date: 2016-03-10T18:40:48+00:00
slug: /using-new-theming-engine-sharepoint-online/
dsq_thread_id:
  - 4651338204
categories:
  - Branding
  - JavaScript
  - Office 365
  - SharePoint
tags:
  - Branding
  - SharePoint
  - Styling
  - Theming
comments: true
---

Microsoft is currently rolling out a new theming engine for SharePoint Online. The difference between this new engine and the old one is that all the theme CSS changes are applied at runtime. The old engine processed all the CSS files that could be themed and stored them in the database.

> **Info**: more information about this functionality can be found here - [updated feature: SharePoint Online theming](https://community.office365.com/en-us/b/news_hub/archive/2016/02/24/updated-feature-sharepoint-online-theming-for-first-release-customers-only)

With this new theming engine, Microsoft makes use of JavaScript to let SharePoint know which stylesheets are can be themed and renders the additional CSS on the fly. This process goes as follows:

*   Your browser loads the page;
*   All the stylesheets get loaded;
*   Somewhere on the page, they added JavaScript code to register which files need to be themed. For each file that needs to be themed, a new style element gets added to the page.

Here is an example of the JavaScript registration code on the page:

```JavaScript
SPThemeUtils.RegisterCssReferences([{
  "Url": "\u002f_layouts\u002f15\u002f1033\u002fstyles\u002fThemable\u002fcorev15.css?rev=3SPC0\u00252BvXtHg59ywd1lIxqg\u00253D\u00253DTAG154",
  "OriginalUrl": "\u002f_layouts\u002f15\u002f1033\u002fstyles\u002fThemable\u002fcorev15.css?rev=3SPC0\u00252BvXtHg59ywd1lIxqg\u00253D\u00253DTAG154",
  "Id": "CssLink-014d73731d3e4c009f6779626502bee3",
  "ConditionalExpression": "",
  "After": "",
  "RevealToNonIE": "false"
}])
```

{{< caption-new "/uploads/2016/03/031016_1833_Usingthenew1.png" "Stylesheet and theming style block" >}}

What you can see in this screen shot is at the top the style block which contains all the theme CSS changes. Underneath the style block, the initial stylesheet reference can be found.

## How can you check if the new theming engine is available on your site?

The new theming engine introduces a new object called **SPThemeUtils** and is available from JavaScript and contains the following methods:

*   SPThemeUtils.ApplyCurrentTheme
*   SPThemeUtils.ClearThemeCache
*   SPThemeUtils.GetCurrentStyleSheetText
*   SPThemeUtils.GetCurrentThemeCacheToken
*   SPThemeUtils.GetSiteThemedCssFolderUrl
*   SPThemeUtils.GetThemedStyleSheets
*   SPThemeUtils.GetThemeColor
*   SPThemeUtils.IsSiteThemed
*   SPThemeUtils.LoadThemableResources
*   SPThemeUtils.RegisterAllImages
*   SPThemeUtils.RegisterCssReferences
*   SPThemeUtils.ReplaceCssTextForElement
*   SPThemeUtils.SetThemeRetriever
*   SPThemeUtils.Suspend
*   SPThemeUtils.UseCdnForCss
*   SPThemeUtils.UseClientSideTheming
*   SPThemeUtils.UseCobrandingInHeader
*   SPThemeUtils.UseShellThemes
*   SPThemeUtils.WhenThemeReady
*   SPThemeUtils.WithCurrentTheme
*   SPThemeUtils.WithSiteTheme

If you want to know if your site is currently using the new theming engine, you could use the **UseClientSideTheming** method in your browser console (developer tools).

```JavaScript
SPThemeUtils.UseClientSideTheming()
```

{{< caption-new "/uploads/2016/03/031016_1833_Usingthenew2.png" "Check if your site uses the new theming engine" >}}

> **Info**: If the function returns false, that means that the site does not use the new client side theming engine. It could also return undefined, that means that it is not yet available on your tenant.

## How can you make use of this new theming engine?

The advantage of the approach, is that your custom stylesheets which you want to use on the site do not have to pass through the theming engine anymore. With the old engine it was required to uploaded these stylesheets to SharePoint before you were going to apply a new theme to the site. With the new engine you can reference them whenever you want on the site.

The process of adding or referencing them on your page has not been changed. You can still do this in your master page or via the alternate CSS URL, but you now have another approach. You can now also load them via JavaScript to the page.

> **Info**: I will not discuss if adding stylesheets is a good approach or not, but at the moment there are not much options to choose from.

If you want to make use of this new theming engine with your custom stylesheets, you have to add a link to your stylesheet to your page like you would normally do. The important step in this process is that you give the link element an **id** attribute. This id will be used in the registration process and SharePoint uses it to find the location of where it needs to add the style block.

Here is some sample code of how you can approach it via JavaScript:

```JavaScript
var styleUrl = 'Link-to-your-stylesheet';
// Add the stylesheet to the page
var head = document.head;
var linkElm = document.createElement('link');
linkElm.id = 'CustomThemeFile';
linkElm.type = 'text/css';
linkElm.rel = 'stylesheet';
linkElm.href = styleUrl;
head.appendChild(linkElm);
// Register the stylesheet to be themed
var themeFile = {
	Id: 'CustomThemeFile',
	Url: styleUrl,
	OriginalUrl: styleUrl
}
SPThemeUtils.RegisterCssReferences([themeFile]);
```

> **Info**: An approach code be to apply your JavaScript code to your page via a custom action.
Here is my example CSS code:

```css
#s4-workspace {
	/* [ReplaceColor(themeColor:"AccentText",opacity:"0.4")] */ background-color:#efefef;
}

.ms-core-pageTitle, .ms-core-pageTitle a {
	/* [ReplaceColor(themeColor:"Hyperlink")] */ color:#262626;
}
```

This results in the following output (when a theme is applied on the site):

**Before**

{{< caption-new "/uploads/2016/03/031016_1833_Usingthenew3.png" "Before the custom stylesheet got applied" >}}

**After**

{{< caption-new "/uploads/2016/03/031016_1833_Usingthenew4.png" "Once the stylesheet got applied via JavaScript" >}}