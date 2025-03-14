---
title: 'Office UI Fabric responsive grid: breakpoints, push/pull and other available classes'
author: Elio Struyf
type: post
date: 2016-01-18T12:43:36+00:00
slug: /office-ui-fabric-responsive-grid-breakpoints-pushpull-and-other-available-classes/
dsq_thread_id:
  - 4501557234
categories:
  - Office
  - UI Fabric
tags:
  - Add-in
  - Office
  - Styling
  - UI Fabric
comments: true
---

At the moment the documentation for Office UI Fabric is focussed on Office Add-ins. For example: if you check the grid styles, there is mentioned that there are utility classes for small, medium and large devices, but there is more functionality hidden inside the SASS/CSS files. In this article I will describe a couple of very useful CSS classes which you can use when building your own applications with the Office UI Fabric framework.

> **Note**: styles documentation - [http://dev.office.com/fabric/styles](http://dev.office.com/fabric/styles)

## UI Fabric Media Queries / screen breakpoints

First are the media queries or screen breakpoints. In the documentation you find that there are three main targets: small, medium, and large. These sizes can also be used in your Office add-ins. Here is an example of the add-in sizes when you resize the canvas:

**Small - ms-u-sm1 ... 12**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab1.png" "Small sized add-in"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAIAAABrQaqyAAAACXBIWXMAABnWAAAZ1gEY0crtAAABZElEQVR4nGO4dOrcmf1Hrx4/dffMmbvnzt07f+HeBTA6f/7OxYsMB/wDtkhKbVNQ3KmqulVKeqOg4CYhoS0iIhs4OA54eDAsdXfr5eGeKCY6UVysl5eni4Wlm42tl4Ojg4Fhsb09Q3xctJaGirGhrpGBjqmJgbm5sYmxvqmxgZaWWkJCLEN8fIy2lpqRkZ6Fhamfn3doaKCVlZmRoa6WpmpCfAxIWktT1cRY38hQ18hQ19hQz8hQ18RYH4u0sbGesREOaUMDHU0NFZBFhqjS2lqqRoa6FubGkRGhgQG+Jsb6xkYo0mr6elquLo57tm5YumCOjbU5itO0NVWNjUC2+vm4OznaGOhrY3eagb62oYEObpcb6YHCB5c0HCGkkxLjdHU0zM2MTE0M4MjczEhXRyMpMY4hLDRIVkZCXU1JVUUBjtTVlGSkxcNCgxjmzJnVUF/b2tLU0twIR60tTfV1NXPnzAYAMuCTEs7tnToAAAAASUVORK5CYII=" "251" "416" >}}

**Medium - ms-u-md1 ... 12**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab2.png" "Medium sized add-in"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAABnWAAAZ1gEY0crtAAABKUlEQVR4nFXMzUoCURwF8D8KtfENIggF587M/b7jKAhZOuPXOF5rERGVI84T9OE7hOlCUgls36MUrawXikYygrM48OMc+Fg8vz88fs5m6+l0PZmuJ5NNvsbjt/kcXrG92t15yWSW6fQTwBxgAbBMpRYAK8uCXtCUtuFyXHalVykflYslxUqKCYxOeyF0wjahlpDULapmy/f8asGVUjEbI33ShbDTIhgpSQXHFCNGTCmIkgzbea3DH6YJS0EcxaUgCVNs57u6k/BmoVh8fd6/ONswxUY9aP6tBccN/7hWPRQcJ4y8oPHvnFGLM/v33Ah1ALrb5swqONxRrODwbaHE1L0QvFoll903UQ4Z2W1MlMse7Pn1GoxGd1F0FQ8Hw2G0TRwPov7l7f3NN08IXx5jgFB9AAAAAElFTkSuQmCC" "351" "417" >}}

**Large - ms-u-lg1 ... 12**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab3.png" "Large sized add-in"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAv0lEQVR4nDXJS07CUBQG4LsPEyNKtfQ+zn8ePEICDArWctsOHLgLhybuwLEDNwDEAaskmJh8s8+d++G0mJ9EjsABdASumA/V5DcPLq+WfH87e3qwYrSmsKFgxWhWjnF309e1a9pdJC8GSGIFK0GSGPtY7ofevTQ1pYoRFnP9+f76/HgHeVOK/jF33V/HiXBSSW+vuWu3QFD57+a5jqEUjiAPCkSeEYSjr4p9zq5tdyA/NZiSSjIlU5oaKJbd0F8Aco8xlIYkkV4AAAAASUVORK5CYII=" "555" "416" >}}

When you dive into the SASS or CSS from Office UI Fabric, you can notice that there are defined more media queries and utility classes. These other screen breakpoints and utility classes could come in handy when you are creating web applications. Here you can see which media query breakpoints are available:

**Small**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab4.png" "Small device"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAABnWAAAZ1gEY0crtAAABG0lEQVR4nGOIS811D4j1DIqLSMiqbmipaWwLi8/0DIpz9onMLa5isPeK17XPUDaLy6+Z/uf3r79/f2eWT1YyjdOwSg6KLWBw9k82cM5Rt0oqrJv14OHDJ8+eZVVMVbdK0rFLD00oYXDyS9J3ylK3SsyunPrmw+e3Hz6nlk5Ut0zUsk0NTShicPJL0XfOU7NKKayf/R8Msqumq1mmaNtlgnQ7eEXp2sSom4dFp9ccPHLs0NET4cmV6uZhGubhwTE5DFu371y3YeOGTZtXr1u/aNnKRctWrl63fsOmzWvWrd+zbz/D9+/fv3z5+v37jzdv3504dfrkmbNv3r77/v0HRJDh//////79+////6vXry9evnLxytXXb97ABQFAqpu/Vf+hcQAAAABJRU5ErkJggg==" "348" "302" >}}

**Medium**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab5.png" "Medium device"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAABnWAAAZ1gEY0crtAAABFklEQVR4nGMIjUm1cQt29ApPzy0pr2ksr23MyCt18Ay3dApIyihgcPRJ1LHLMHTOvHD13r+/f/7/+3vzzmNtu1RNm5TA6AIGZ79kHfsMI5fsUxdu3bh54+69+5dvPNSxT9OySQ2KLQJJ64KlD5y8+ub9h7cfPh45c13XIUMTKu2fouuQY+Sae/Ha/f9gcPPuEx2HTC27jKDYYgZH72gd6ygD+5g5i1YfPHz04OGjC5ev17WJ1LAIC4jKYti+a/eGzZs3btmyfNWaRctXLV6+atnKNZu2bl23cePeAwcYvn///uXL1+/ff7x///7k6TMnT595++799+8/IIIM//////fv3////1+9fn3x8pWLl6++ev0aLggAw06lg1FDLZkAAAAASUVORK5CYII=" "349" "302" >}}

**Large**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab6.png" "Large device"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAABnWAAAZ1gEY0crtAAABIklEQVR4nAEXAej+AFJaYjxGVVhganZ8f3Z7f3Z8gHd9gFVdZzdBUGRrcwA9SV4eMl+Ik6n////39/f29vf///93g54ZLVpTXnIAQExgITVghpKp////2drc2tze////doOdHC9bVV90AD9LYCE1X4OQqPX3+OPm6ePm6ff6+3SCnRwwWlVfcwBATWIgNWSKlaz////9/f38/P3///95hqAbMF5VYHUAPEdXIzNUbXeJxsnKvcDEvcDDycvMYWyBHS5PUlxrALG0ta2wsKirrKClqKKmqaKmqaClqKmsrquurrq8vQD29vbz9PT3+Pft7u7IysvJy8zu7+73+Pjz9PT29/cA/////v7+////6enqz9HSz9LT6uvr/////v7+////hUSwMrXhwoAAAAAASUVORK5CYII=" "348" "302" >}}

**X-Large**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab7.png" "X-Large device"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAABnWAAAZ1gEY0crtAAABB0lEQVR4nGOIScryCIwrqaorqaorr2ksr22EsN38olOyihhsPWK9Y+r+/v37////79+/f/v27f///z9//vKMrPEIzmRw8En0iWn4+fvv33//bt+5d+Pm7f///3/78cszqtYrLIfBwTvBK7r+49efbz98evr89bOXb9+8+/ju83f3iBqwtE+Sb1zzv3///oMBhPHr9x/vmEavsFwGe68ox4CsPfsP7T14GIL2Hzyya+9BO990r5BUhm07d61et37RspVwtHDZysXLV61cs2733n0M375///zly8+fP95/+HDy9JmTp0+/fffu58+fn798+fb9OwPcvtev31y4dPnCpcsvX72CCwIA8oPAaUBhLyEAAAAASUVORK5CYII=" "349" "302" >}}

**XX-Large**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab8.png" "XX-Large device"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAABnWAAAZ1gEY0crtAAABD0lEQVR4nD2OPU/CUBhG789SHC11JF0YFDQRE5XAAAw0sX9CN0YRibiqDEpt00qh1vChrR9/QOxVShy4vTe2fQ1NNDnDyTOcPCiV3sruFErVg2JFLFWlsigVK2JZlNa385lcAS0lNxTDBoAgCCmlvu8HYQgAWt9eTe2iBJ+90R8BgFD28vpmO8+U/QCA3H3ihH2U4DOXt0MAwNPvd/dzgqcT7AFAWx0mhT20srapGM4iHjf/Res7nJBHy1z6sHZqmGZH1RXtTtG6sqr3LOuo1uCFHLq4ajfOzo+brXqzdRJT/+O6IyNCyJwQypg3m5n3lmk9fHkeZWxOCPF9BABRFAGAi/FgNB6Mxh8uXozxj187q8scz+ZPowAAAABJRU5ErkJggg==" "350" "302" >}}

**XXX-Large**

{{< caption-new "/uploads/2016/01/011816_1231_OfficeUIFab9.png" "XXX-Large device"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA80lEQVR4nE1NwUrDQBTc71UwpaSESg568OJZQay1TUxbqiApxoqeRGOjMYoWRO/Ggkga1N23Md3dJ6kQHOYwzDAzZEHTl/S6NmfVMKuGqen1Sm15sVIzzFXSaO0hohBCSskYAwA5ByIOvBOy3XIQcSYUz/KHx/HT8wuDTBQput4p2WxYEvGLZZTnH9PPyXtCef4NP9lM7bvHpGkV7b+1EkopRDwanpGVtfWb6P78Mri4uv5PPwg3tnbIwaG7a3faTq/t9Oxu3+72rU6hm5Yz8IYEACilAJCmaXgbhdFdkkw554XJOSmf4reJPwr8UfAax6X5C/k9233oXnDCAAAAAElFTkSuQmCC" "351" "302" >}}

## Hiding elements via visibility classes

Like in Bootstrap and other frameworks, UI Fabric has also classes to toggle when content needs to be visible and when it needs to be hidden. There are a couple of useful utility classes for this.
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup> <col /> <col /> <col /> <col /> <col /></colgroup>
<tbody valign="top">
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;"></td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**Small**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**Medium**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**Large**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**X-Large**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**XX-Large**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**XXX-Large**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenSm</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenMd</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenLg</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXl</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxl</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxxl</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">. ms-u-hiddenMdDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenLgDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXlDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxlDown</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenMdUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenLgUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXlUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
<tr>
<td style="border: 1px solid #b5b5b7; padding: 5px;">.ms-u-hiddenXxlUp</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">visible</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
<td style="border: 1px solid #b5b5b7; padding: 5px;">**hidden**</td>
</tr>
</tbody>
</table>

## Column ordering via pull, push and reset

Pulling or pushing elements is something that is also described in the Office UI Fabric documentation. With the pull and push utility classes, you are able to reorder elements on your screen based on the screen sizes. This is useful when you have an element which is important and has to be pulled upwards when you are working on a small screen device. In a more complex grid scenario it could be that you want to push an element upwards on a small screen device, and push it downwards on a bigger version. This could require to make use of multiple push or pull utility classes. When this is the case, you will have to reset your push or pulls on the element.

**Push classes and reset**

Pushing: .ms-u-*Push1 ... 12

Reset: .ms-u-*Push0

> **Important**:** you will have to replace the "*" star in the pushing and reset classes. You can replace them with: sm, md, lg, xl, xxl, or xxxl. Example: .ms-u-smPush1 ... 12

**Pull classes**

Pulling .ms-u-*Pull1 ... 12

Reset: .ms-u-*Pull0

> **Important**:** you will have to replace the "*" star in the pulling and reset classes. You can replace them with: sm, md, lg, xl, xxl, or xxxl. Example: .ms-u-smPush1 ... 12

As you can see, a lot more is possible if you just check the contents of the CSS files.