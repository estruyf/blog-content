---
title: Things to check when something went wrong with your display template
author: Elio Struyf
type: post
date: 2016-07-06T14:07:39+00:00
slug: /things-to-check-when-something-went-wrong-with-your-display-template/
dsq_thread_id:
  - 4965004105
categories:
  - Development
  - Display Templates
  - SharePoint
tags:
  - Debugging
  - Development
  - Display Templates
  - JavaScript
  - Troubleshooting
comments: true
---

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche1.png" "Default message when there is a problem with your template"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAANklEQVR4nC3KOwoAIAwEUe9/VlET8yVbiJBmmjeDAxyQxNRaWhw4BnJsL0kMyeZjRd69AfK/PgBvOdgkm9//AAAAAElFTkSuQmCC" "248" "38" >}}

I receive a lot of questions about why display templates are not working or why managed properties do not contain a value. Most of the times the solution is similar to what has been already asked before, so I thought of writing this down in order that it can help everyone with similar issues.

For this article, I have gathered the most asked question. Feel free to suggest others via the comments.

## I downloaded the display template from the GitHub SPCSR repo and template is not working

This is actually a common one. It has nothing to do with the template in fact, but the way how you download the files from GitHub.

When you download the file via right-click > save link as (or save target as). The template will not work because it will also include the HTML of the GitHub page.

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche2.png" "Display template contains content from GitHub"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA9ElEQVR4nCWPwY7DIAwFObdpbSCYhJCW2ECSttuql/3/T1uRleZgaQ6ep8BIh+l8TWdIHSzn68FxdLAo7QqFHxcemgo4wZF1EPCsJwZihX0el3es37Hu5iZ6kiYG1pFxFAVGcMiUdr/sjouZxUxFT03rwOqCbMN6e37mx3v+7vG3hO3h1+K3TGtWYLKmamM1UzW3bO8C1H4DMXhWltYO06m7n7p0ujTaiv/+61GOfbFh1VE0FRxaPHrG0FBoi6bq0oaRsa/gBfwCfmkL46HtuAb++PnVp0JSnBSan04qBlGGKvbVDc9+2kwUG6u9ZxtXO+eL5T9B+CHvrS8HiAAAAABJRU5ErkJggg==" "538" "573" >}}

**Solution**

The best way to get the display template is to open it on GitHub so that you can see the file content.

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche3.png" "Click on the raw button"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAWUlEQVR4nCXCAQoCMQwEwP7/oYogJ5d0s8kmBRGHWW52GxBUVWWqiiQjAiCwXu/rs+kUav5DB+rrts1cvuEIMFn6VceGPZ6GSGmpZWYRVE/3SKNU+u6Zc84X7q1zmyFCpnkAAAAASUVORK5CYII=" "579" "250" >}}

Once you opened it, you will have a **Raw** button at the top. Click on that button and copy/paste the code to a new HTML file.

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche4.png" "Raw file content"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAc0lEQVR4nDXJWwoDIQxAUfe/REGYgkFLtNEg8VGtpQ49Xxeuct4hoX96RHz9xRgRkYiUtfa6HiEE5szMtVYRacdaSxljtNYA4JwDAO89EZVSeu+/nVISkfcxxui93zHn3HsrZs45i0ittbU251xrfY699xdcKo3fNwGVBwAAAABJRU5ErkJggg==" "624" "286" >}}

You can also right-click on this button and save the link as an HTML file.

> **Important**: if you do this in Internet Explorer, it will create a txt file. So be sure that you change this to HTML.


## Why is my display template is not displayed in the dropdown of available display templates?

There are a couple of reasons why a template would not appear in the dropdown list. Check each of the solutions in order to know to what it was related.

**Solutions**

*   Be sure that you published the display template. The template only becomes available when there is at least one major version;
*   If you have published it already and it still does not appear, try to re-publish it. I know it sounds stupid, but in most cases this works;
*   Check that you did not accidently set the template as hidden (uncheck the hidden template checkbox);

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche5.png" "Hidden template checkbox"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAGUlEQVR4nGP4/v37r1+//v379+3bt98YAADGEh1Wm6d5NQAAAABJRU5ErkJggg==" "624" "63" >}}

*   Check if the target control type is set to the web part in which you want to use it:

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche6.png" "Specify the target control type"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAOklEQVR4nHXJMQrAMAwEQf//pSpOqFKETgc2BJwuUy3sel6ZSdLdAUja1/pKkplFxO8GUFUzQ7K7SR7kM1evIn4lUwAAAABJRU5ErkJggg==" "514" "155" >}}

## Sorry, something went wrong. Template not found or has syntax errors

In 99 percent of the cases, this error is related to a bug in the code. That one percent will probably be related to someone that has deleted or moved the template. So if that is the case, you will have to put it back in place.

Here is an example of such an error:

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche7.png" "Template not found or has syntax errors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAT0lEQVR4nGXGOw6AIBBFUfa/O4Ynv4bQKqBOTBQMarT15hRX8N649u28W7/uXyJpPUpZBiSoBGRgtZadY2NqjGLxPhFlpSaid4hmoHyOEB5BeVGkHfWANwAAAABJRU5ErkJggg==" "624" "167" >}}

**Solution**

As the error does not say much, the best way to solve it is to open your browser developer tools (f12) and go to the **console** first. In the browser console, check if there is an error logged. In most cases when you wrote a bug in the display template, you will see it in the console like in this example:

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche8.png" "Check browser console"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAKElEQVR4nAXBOQ4AMAgEsfz/oRQLGcSh1LFPmq37XkYa6VU1ZERDwwev/xvs3RgD1QAAAABJRU5ErkJggg==" "624" "65" >}}

If you click on the **file link**, the developer tools load the file and shows you where the error occurs:

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche9.png" "Most of the time the develop tools tell you the error"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAKklEQVR4nAEfAOD/AOjn5/76+v/+/ufk5OHe3t3b29TPz/LW1fXa2vrz86k9GxsWJi1UAAAAAElFTkSuQmCC" "355" "51" >}}

### What if you do not see any errors in the console?

Something else might be going on. Try to set a breakpoint in the JS template and debug the code to see where the error occurs.

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche10.png" "Debug your display template"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAaklEQVR4nAXBCRaCIBQAQO5/xpZXWvAU4q+C8MFm3DfsRMJEjFlEVStxIalynKU2tyUFOO6P9fNcUgSUmrBF6KzjbJdTFSR4v26StmHdrE/r17A5xpzTIaKVoutSgucUf95nH3DfOQMz/wF4UHFtM1HuoAAAAABJRU5ErkJggg==" "624" "260" >}}

## My managed property value is empty or null, but I am sure the content is indexed

If you are adding new property mappings to you display templates, it can happen that you retrieve empty values. Here are a couple of solutions that can help you solve it.

**Solutions**

*   If you are still developing the template, check if the template is at least checked-in. If it is not checked-in, your web part will not pick up the latest managed property changes;
*   If the template is ready for production, check that you published the latest version of your display template.
*   Use the SharePoint Search Query Tool ([https://sp2013searchtool.codeplex.com](https://sp2013searchtool.codeplex.com)). Specify the managed properties that you want to retrieve and perform the same query. Check if you retrieve managed property values via this tool.
    *   If this is the case, the problem can be related to the template.
    *   When you do not retrieve any values, it could be related to the content which might not be indexed yet.
*   When you introduced a new managed property in a display template associated with a result type, you will have to go to the result types page and do a property sync:
{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche11.png" "Property sync message"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAJ0lEQVR4nGP49Hrrx5frv73Z9PnVRhB6veXz641fXm/682nL3y97AZA1Gc74tnsoAAAAAElFTkSuQmCC" "624" "29" >}}

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche12.png" "Property sync message when updated"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAKElEQVR4nGM4/WrVyVfLTr1afvLl8lMvQeT5j6sufFpz/tPKK583AQBwVRfbw/Ql5QAAAABJRU5ErkJggg==" "624" "27" >}}

*   When people result managed properties get returned as empty like AccountName, CellPhone, .... You have to add the following managed properties to your display template mappings: **ServiceApplicationID** and **UserProfile_GUID**.

> **Info**: Read more about the people managed property mappings issue here: [Important managed properties for rendering people results](https://www.eliostruyf.com/important-managed-properties-for-rendering-people-results/http:/www.eliostruyf.com/important-managed-properties-for-rendering-people-results/).


## Watch out when downloading templates from SharePoint Online

You have to watch out when you download a display template via the **download a copy** ECB menu action in SharePoint Online.

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche13.png" "Download a copy of the file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAiUlEQVR4nD2OUQ7DIAzFuP9VV/JeSLLAQNVU2s2/liwXAKrEJjP5A8Baq8Q7M/uc8zzPtdZnzsycc/ZNoVkVqbWqKsnMPI5DVVtrtdbSPEi9tbuPMUj6huSlAZDsvUfEGENEzOzRNK9y1T2C2t790WYG4IlDhM1eahodwB1X1WI7IiLhfj//Nckvco/jpOEhnRMAAAAASUVORK5CYII=" "624" "487" >}}

When you do this, additional content gets added to your template at the bottom of the file:

{{< caption-new "/uploads/2016/07/070616_1349_Thingstoche14.png" "Additional content that gets added"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAXklEQVR4nAXB0Q5AIBQA0J4ZSUq5Zbe0yuzObPgA//9RzmFCF+cOhGTmKFwa/SYgdiI0PbYcmZwLQCC67+er9ELcpM3DlEdduEzMeopYajodXstKUgVldr0cHk9l6g/nYArVw98VSgAAAABJRU5ErkJggg==" "414" "121" >}}

This additional content has to be removed from the template before upload it to SharePoint again. If you do not do this, it generates an error in the JS template.

> **Info:** this additional data gets added by IIS. Microsoft is already aware of this.
