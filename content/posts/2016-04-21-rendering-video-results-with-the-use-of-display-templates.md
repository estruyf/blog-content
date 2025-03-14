---
title: Rendering video results with the use of display templates
author: Elio Struyf
type: post
date: 2016-04-21T18:57:03+00:00
slug: /rendering-video-results-with-the-use-of-display-templates/
dsq_thread_id:
  - 4765860059
categories:
  - Display Templates
  - JavaScript
  - Office 365
  - SharePoint
tags:
  - Display Templates
  - JavaScript
comments: true
---

Last week when I was configuring a content search web part to show the latest videos from the Office 365 Video Portal. I saw that the default **video** template which is available is not so feature rich as I expected.

The default video display template shows only a preview image with a link to the actual video.

{{< caption-new "/uploads/2016/04/042116_1851_Renderingvi1.png" "Default video display template"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAASUlEQVR4nAE+AMH/AJmptIGWqZWejo+Ue6yrtr295GmIoU9xjWphnX9xqgDE0t21xdK/yrnM0bPGycjP1dekucaUq7+hocWxrc+XsCfao5ZWpAAAAABJRU5ErkJggg==" "638" "129" >}}

The hover panel display template that is used to visualize video results can achieve more. It allows you to play the video when the hover panel is open.

{{< caption-new "/uploads/2016/04/042116_1851_Renderingvi2.png" "Video hover panel"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAvUlEQVR4nCXLsc7BUBTA8bMwdO9TdOuo6YSxEjbxCl5B0lcQtho7fBbBYGEhjEhvpUgkJrPJd3t7z7lH8F//+UFeSGZebkW3N0qzO2r1LyUiGmO01pCrnJnnf/t2fbiY7ZqtRrVaC4LA87w4juGn98ktPT+y7FoulyzLsm0bAMIwhEIXzHy53lIhTqekUvFc1/V933GcKIqg0B99OEwG/c45OxrDiMjfiAier89eb1bT+VgkgoiklEopRCSiNyKzgxIcGPYwAAAAAElFTkSuQmCC" "503" "310" >}}

As this video hover panel functionality is more useful for showing the latest videos than the default template. I created a new video template that uses the same functionality as that from the video hover panel.

## I present you the video template

The video template can be used for both videos that exist on SharePoint and the Video Portal.

> **Important**: this template is created for being used on Office 365 and is not tested for on-premises environments.

The template itself is made available like all the others on the SPCSR repository: [Video Display Template](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Video%20display%20template).

### Video Portal Results

For rendering the Video Portal videos, the template makes use of the videoportal.js file which is only available on Office 365.

The videos are rendered like this:

{{< caption-new "/uploads/2016/04/snip_20160422141117.png" "Video display template - Video Portal Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAACXBIWXMAABnWAAAZ1gEY0crtAAAB1ElEQVR4nFWOXUiTcRSH/1AYeBWWW2YQpm5lg0rQ9lFZmvsGhxQRCbO2Uve65pu8Lpybu8hYOaKPC4uIZLNIqvvosousxqguInWtYk1iE/Gm+yf2YhddPPwOnHOec0Rk5jmdgeu45CSOkWkcoWlsl29gD93EKU/TMXgN5e5ThFtOstnsRWuX2G4NUGsLsLVrgOoOP1WWfsS+XrqlBKJHucW27gANnitobAE0dok6Z5Baa2VhENHah0NOInrDd9jpCtJyJky9K8juHhmNTaLGKtHglmg8eY5T4dsI59AUwnCa6mN+qsz9bDlygU1tfaqpxnSWRpMDz/AUIv3qDcq9OSL35xmfeaZSqWMPXxB/9JKJB/M8eb2AKK+sU1guUfxW5leuRCFXophf5fePNVbyq2pvvfwHIfvTGOrGMOpitDdF/8Ooj9GiVRj2PkbIvhQH6sOY9DEON0U3mFDTpIth2DFG0DuLGL2YxqyP4jIncFsSav7DczxJ+54IofMpxIgvxX6tohorhsoLJl0UU3OcrrZxHJ0+lCHVOMfBXVex7I1jbK4MTW6cn+TEoShHWy8xOjCLyC0Wef/2K9kPy2TeLZFZWORz9jufsnk+ZvIsfSlT+LnGX83PJ67uZbfPAAAAAElFTkSuQmCC" "556" "728" >}}

> **Info**: the template renders the title, media duration and channel name of the video.

When you click on the play button, the preview image will be removed and the video gets loaded.

{{< caption-new "/uploads/2016/04/snip_20160422141136.png" "Loading video - Video Portal Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAlklEQVR4nI2NOwqEQBBE2z94DzFUMRXz8QwDMsFo5EXMPKyKJm+xo11MNnhUVXdBybqujOPINE1473+Y5xlrLdu2IV3XISKEYaj6TRRFqsYYpO97DXEcEwQBaZqSJIn6R5/fMAzvYp7nZFn2Lv497ZyjLEuapqGua6WqKs1t21IUBcuyIOd5chyHsu+78tzu++a6LvUAH1LBfSPSw9inAAAAAElFTkSuQmCC" "554" "364" >}}

Once loaded, it will start playing and you can pause the video or watch it in full screen.

{{< caption-new "/uploads/2016/04/snip_20160422141150.png" "Video player - Video Portal Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA70lEQVR4nAXBQUvCYACA4U8Iu1RQM4oYMWXTwdxsqBhp4SAyE+lgOEfDRbsY9CfCa2K3oCjJZk06dQq6Vr/r7XlE5/IapVhH32ugVQ7JlByaJ02CICDo+4RhyN14jKi2XMS6yqJsIFIqyc0sR40Gnn+B57l03R63oxGi1vYQkkpiI0e2ekzLC/H7AYPBFY5Tp1QsMRzeIA5OfZYzNkvpAmt6BblQwzBMyuVdTMtGWpU4d13EfrvLwlaOpJwnkdIQK9soShpd1dixTGwrT++sg/j8+uZ+MuNxOudhGvMUxcxeI+K3iI/5Oy+TZ/5+f/gHXw5y/pBE6zsAAAAASUVORK5CYII=" "552" "356" >}}

If you want there has been released a new template which retrieves the channel colors:

{{< caption-new "/uploads/2016/04/snip_20160425153527.png" "Channel colors"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAACXBIWXMAABnWAAAZ1gEY0crtAAABjUlEQVR4nE2QwWoaURiF7zOIL+XCpUr0BWbhzo1uXLj3AUq7SZepYEDoDK2oi8I0NSEtSdsMJSkxkGhsnBk749xx5s5X5gbaHvjh/pyPy3+OaLVaFItFDMPANE0GgwHD4ZDRaEStVtNev99H1Ot1hBAazBUEAWEYopSiVCppr91uIxqNhl6azaYG0zTVUK5yuay9Tqfz78f/wSzL9NswDAqFAr1eD3FQP9BgpVLBtm0sy2I8HjOZTKhWqxrsdruID+/ec3j4GvOtyWw600A+0+kMy7Q4Hh7jOA4ilhFyL0nShDiOiaVkv4+RcUSS7ElVqs8Q23DLYnnHcrXC9Vxc32Xjblh7D/xcX/G4ucdznxBkEMkIN/RR6jlErjyQlBKVKh1QZCojVpJ18IC3/U2w2xFJSZomZErpqpIkycHnznL5nofren97vPrucHT0Rt8utoHP468lnr/h7n7B9c0Pve+igJO5zctXL/B8F3F7+5XzizmX3845uzjl09zm7MsJp58/4lxfcrNwWD+t+ANfv6e/ZlWxXAAAAABJRU5ErkJggg==" "570" "766" >}}

> **Important**: this template does an extra Ajax call to retrieve the colors. If you want to use the template, this can be found in the GitHub repository with the following name: Item_Video_ChannelColor.html.


### SharePoint Video Results

Rendering the SharePoint Video results works a bit differently. These results make use of the media player functionality from SharePoint which is loaded via the mediaplayer.js file.

These videos render like this:

{{< caption-new "/uploads/2016/04/042116_1851_Renderingvi6.png" "Video Result - SharePoint Video"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAACXBIWXMAABnWAAAZ1gEY0crtAAABnklEQVR4nAGTAWz+AIucp3KHkG2AiXGEjHqNlnmMl3+TnIObq3eNpYiUrwBygo5nfo1LZndZdYtrkLGBobqGprxafqRafKNcbIkAZnZ/O1ZqUW+ER2V9UXGOYYGdQlVoX3qNUW6QW2eDAF9xezxVYmaBk2uGm26HnGeCljA7Rldqd0dWZ2FrggB7ma9fh6NkiJ9qjqh4nLtwk69GXnZje5FNV2B0hpcAwtHcr8LSssTRtsjWvM7dv9DetsPRusnYtcXTydbhAOLh3d3f0t7h1dnY0trb1d/f29/h3N7f2tzc2+fp5wCBf29neUlhdTpKUzA7TSgoOB8kNh0lMCQXHh1fbGkAfn5xXmxKanVVwsHBurisrbCno6mhT1RQGCAeY29tAGt5eD1XT1pmVdzXvM3Cubi1tqSrrUpaXDBBO3SBfAB0h2JrgS2hpD2cmjFTVydRThpjdy9FXFBHTUuioZIAgJRdan8ndYkyaYExf5IwlJ0yqLEqtLg6oqI719lrANjc08jOw87UxtLXxdvexefnx/n4zv//1v390Pv73ULB0vq2OIFSAAAAAElFTkSuQmCC" "242" "319" >}}

When you click on the play button, you will notice that the media player is different:

{{< caption-new "/uploads/2016/04/042116_1851_Renderingvi7.png" "Browser media player - SharePoint Video"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAxUlEQVR4nAG6AEX/AHCAiU1icHORo5zC2p3D2p7A1Zm91Jm/2Iy00pCuxABYbHY8XXFJaHpScoJnjqN3mKlniZmDq8NymKqYrbMAaIOPUneKLkVRRmZ2cZ+4a5aqWnuKbJiwSnOKd4yWAFNmajFQWkxqeGOGmIGrwom2zX+ux2mYrk1wf32UogBhbnNLWF5SXGFdZWhVY2pSZW9IXGc/UFg1PT9ia3AAxcrMs7Kvtba1vL69tbSytr7CvMHFur/CvcPI0drfstdg2uBOh58AAAAASUVORK5CYII=" "242" "154" >}}

The rendering is different because it makes use of the browser its media player functionality.

Why is this important?

Chrome and Firefox can render more video formats than Internet Explorer. So if you are loading these results in Internet Explorer I have added the functionality to highlight which images cannot be played.

{{< caption-new "/uploads/2016/04/042116_1851_Renderingvi8.png" "File format is not supported - SharePoint Video"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAACXBIWXMAABnWAAAZ1gEY0crtAAABnklEQVR4nAGTAWz+AH6RnmqAi2F3gGh8hXCGkHGGk3eNl3yXqXKLpXWFpQBxgIxsg5JPanxbd41ulLeFpb6LqsBafaJdfaJWZ4YAX3B5OlVpUG6DSWd+UW+MX4CcPk9iXXWJWHWVUV9+AFxueEFZZ2mElW2JnHCJnmyImzI9SFttek9dbFxmfgB5mLBhiaZkiJ9qj6p3nLxylrNGXXdlfpRZYmpxhJYAwM/asMLStMXTt8nXvs/ewtPhu8jVvs3busnXyNbhAOHg3N3g1N/h19nZ0tzc1uDh3ODi3N7g293e3Obo5gB/fW1pfU9hdj9KVDM7TywnOSMjNyAlMyUaISFUY18AenttX25NanZVv7+8trSoqaykoKeeUlZTGiEgVmViAGd3dT5bUllnWN/bxdTJwMC8vaiwsk1gYiY6OWd4cgBqfmBedjSYm0edmD1TVS1MRx9hdDc3VUJAUjiWlYcAR045NjkYOj4hLTQeMjkhQEEkOz8bQEMjPT4YX2BAALy9vaqsrK6wsLGysLOzr7e3s8HBu8zLxMXFvtHRzNkFxlbL4CPiAAAAAElFTkSuQmCC" "242" "318" >}}

Notice the message on the second video which tells you that the format is not recognized by IE.

## How to query your videos?

### Query Video Portal videos

If you want to retrieve all the videos from the Video Portal, you can query them as follows:

```html
SPContentType="Cloud Video"
```

### Query SharePoint videos

If you want to retrieve all the videos that you uploaded to SharePoint, you can query them as follows:

```html
SPContentType="Video"
```

> **Info**: this is the default video content type that is used in the asset library. If you made a custom content type for your videos, be aware that you need to adapt this query.


## Download the template

The template is available in the SPCSR GitHub repository: [Video Display Template](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Video%20display%20template).

## Updates

### 25/04/2016

A new template has been released that displays the Video Portal channel color.