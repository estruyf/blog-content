---
title: What is required for Display Templates?
author: Elio Struyf
type: post
date: 2013-10-11T08:15:16+00:00
slug: /required-display-templates/
dsq_thread_id:
  - 3836597494
categories:
  - Display Templates
  - SharePoint 2013
tags:
  - Display Templates
comments: true
---

Yesterday we had the first [Biwug](http://www.biwug.be/) Quiz. One of the questions was the following:

Display Templates require one of the following options:

1.  HTML
2.  **JavaScript**
3.  JavaScript & HTML
4.  XSL

Everyone has answered that you need the JavaScript and HTML file, but this isn't correct. The correct one was number two JavaScript. To clarify the answer I will show you why you don't need the HTML file.

The HTML file only makes the creation process of display template easier.

If you create a new site collection from the team site definition, you will only have the JavaScript files available in the master page gallery.

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi1.png" "JavaScript versions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUUlEQVR4nD3JQRIDIQgEQP//WYHgyKC4W0ml7Gs3AHPOiFhrVVVmAiCTZGY2YKhqBJ+/Y6Zk7r3NPg3w3ntE3BbpJH9tbQxXFXevqm+eIyK3XzbndFpecNTfAAAAAElFTkSuQmCC" "493" "221" >}}

The HTML versions become available once you have activated the **SharePoint Server Publishing Infrastructure** feature.

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi2.png" "JavaScript & HTML versions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVR4nD3OWQ7DMAgEUN//qqmJVwawBJXjpnzyGDRpMgNQVRFZa8kzAETEzNJgbq2ttSLC3Wutqtb7MDN3T2PydX16b4eJiIHnSCNiMxGZ2eH7vkWk9X42aTAy0bl191KKiPY/T+acM4A3TTvdmtn7POd82m0mAlA3/9K7yJzzcC1FVcfYzSPiC2fL5+7GnWGCAAAAAElFTkSuQmCC" "495" "411" >}}

If you aren't working with the HTML file (what I don't recommend) you will have to do some manual actions.

First of all, start by making a copy of one of the existing display templates. I choose to create a copy of the Item_TwoLines.js file.

The next step is to modify the properties for that file like this:

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi3.png" "Item Properties"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAApklEQVR4nD2PSQ7DIAxFuf8tuyNCEDHYeMKtAmrezqPeDwCAkxAnEeHG3b8bdw8jVoqfPmqtda11uv4njD6gNSK673vOqarvqZkFZlrrWbyuK6XUWmPmOaeIjDECjHH+lFJyzoh4ZmbWew+qdlxkw8wi4u5rrdZasM2pX6+1QcSAiAAgIqWUWiszE9H58aiZmW5ijDnno31Q1fDGSCkBgKoy84mnqj9ZbCOtNReekAAAAABJRU5ErkJggg==" "372" "377" >}}

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi4.png" "Item Properties"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlklEQVR4nEXOwRLDIAgEUP//T20IyQQDCEI61Wn7Dtx22cLM7p6Z27Zd18XM95eqlt67iKjqawKAfd+JSFXdvYwpIszM3dcdY2SmmZVnighEBIBaKwAg4nmen3IRYWYROY6jT2aWmc/ziMg/XWvtvUfEGGO9aK0Vn8wMEdeo1hoR3fdNREVV1/KIWE0///LM1ImZV2Bl3sPtBQRWvriqAAAAAElFTkSuQmCC" "368" "327" >}}

Once you have modified these properties, it is time to change the template a bit.

To start you will need to update your template URLs in the display template because the reference will be set to the old file.

```javascript
ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js';

Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js", DisplayTemplate_dee7d9226aa44ed7b709d342fec837ee);

$includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fItem_TwoLines_Custom.js"), RegisterTemplate_dee7d9226aa44ed7b709d342fec837ee);
```

Then it is up to you what you want to modify in the template, I added a text element that shows "My file extension is: FileExtension".

This is the end result:

{{< caption-new "/uploads/2013/10/101113_0815_Whatisrequi5.png" "Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWklEQVR4nC2Nyw6AMAgE+/+f6rOAUGh1MTVOJnPZwxZhMlqMVpcdcSFk1gl3ZGZhEZND5XRljMBw3J7PSDxzbmahZyj1xug2HZZAfhRm1rpq3Zoc6Po7XxhdXxZ5dCrLdxBMAAAAAElFTkSuQmCC" "309" "130" >}}