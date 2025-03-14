---
title: "Order List Items Like in a Meeting Workspace: Part 1"
author: Elio Struyf
type: post
date: 2012-01-03T17:36:32+00:00
slug: /order-list-items-like-in-a-meeting-workspace-part-1/
Xylot:
  - http://www.xylos.com/blog/post/1077/Order-List-Items-Like-in-a-Meeting-Workspace-Part-1.aspx
dsq_thread_id:
  - 3864929084
categories:
  - SharePoint
  - SharePoint Designer
tags:
  - Reorder
comments: true
---

As you may or may not know, there is functionality in the Meeting Workspaces to reorder the discussion points on the agenda. This functionality enables you to change the order of the discussion points, but you can also enable this functionality on other lists. It requires some manual steps which are explained in this blog post.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt1.png" "Change Item Order"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAq0lEQVR4nAXB226CMBgA4L7/k3g3fYFd7UpNzDZMBGmhlJaeD/wtIlnCvg9Jn7Uh39XX+fbpXcOGe48vDt6EcWE9mueyxI41p5/rYV9xMp0df/d9V9NUSkHGhkl0vDnK9gMC5tIzrlOCEJM2DuXtz6Rc94Kq0DLxpKOwQcfsYGHSoHV9AeSBTvWD9D2ng3R2VipYCzFmtL03gFI/uqp6UqoIEQRzjEdChNb+H5jeogPP07fZAAAAAElFTkSuQmCC" "271" "167" >}}

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt2.png" "Change Item Order Form"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlElEQVR4nBWIsQ6CMBQA+79uCnFiUXDSgRAT9X/8CFEHtSJpQCiF2Ne+vprecMkdizf7ZHtMdqfFOp+v8igt4qyIsmKZ5rPswJpvpwZpLThEtMYa8N4TBT3akb3etQZwFA4RSTlYROcDr06zvpfkQhI5NPo3KTRgjfaon41i1QBiBKGg6qaSiysX90974eLG63NZ/wGYh4IBfeOrYQAAAABJRU5ErkJggg==" "447" "223" >}}

In this blog post I show you how you can enable this reorder functionality on other list/libraries.

First of all you need to make the **Order** field visible inside your list. To make this field visible, you can use the following PowerShell script.

```powershell
$url = "Web_URL"
$site = Get-SPSite($url)
$web = $site.OpenWeb()
$list = $web.lists["List_Name"]
$orderField = $list.Fields["Order"]
$type = $orderField.GetType()
$mi = $type.GetMethod("SetFieldBoolValue", [reflection.bindingflags]"nonpublic, instance")
$parameters = "CanToggleHidden", $true
$mi.Invoke($orderField, $parameters)
$orderField.Hidden = $false
$orderField.Update()
$web.Dispose()
$site.Dispose()
```

**Note: before you execute this script, change the Web_URL and List_Name in the PowerShell script.**

When the field has been unhidden, you can check the list columns. Normally the **Order** field should now be visible.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt3.png" "Order Field Visible"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhElEQVR4nB3MUQ7EIAgAUe9/0G27WamAVEGFjf2b5CWTrvMEgFJKuQsxE+HOuyAiM6VPpkyiY7A8XEVVuyqUgkit93QcYCzRWs8Zf7+5VkRIrYg450zfE0bd3DJ04ohwd5Gn1vpytbk8IlrvLOK+W0SYX76o29jD1hrAbWbhbmaqutb6A0jnrLyhOVYXAAAAAElFTkSuQmCC" "596" "376" >}}

The **Order** field will not be visible on item forms, or you must enable it by code or PowerShell script (which is not recommended).

From this moment on, each time you create a new item, the order field automatically increments the order value. To check this you can make this **Order** column visible in a SharePoint list view, and you can also set the sorting setting to sort by the **Order** column.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt4.png" "Sort by Order Column"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAbUlEQVR4nCXN2Q0DIQwAUfrvcoNvmzU2KSBC+R49zXB3ZmEWVVO1qu4+3WfvytyjqgHpeT6Z+32zqqv6nC+zzAmDbckEN4+ICYCIREzEqhqxRmYpoKm5xwSkG4Xovtxj5K4gjovXHzOLyKVrvT+xhIlJhZJg+wAAAABJRU5ErkJggg==" "290" "139" >}}

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt5.png" "Order Values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVR4nE2KQQqAMBDE+v9PehZRsLXd7szUFVTEkFuStlylQRBgRDhg3QGa0+Bp3vZqnRKoM2JIDkhqUO415VKsNRKHP8PLeZumpaxtZB9f+HMBU3J1U4mcZIgAAAAASUVORK5CYII=" "480" "192" >}}

You can change the order by navigating to the following URL:

```bash
SiteURL/_layouts/Reorder.aspx?List={ListId}
```

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt6.png" "Change Item Order Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAY0lEQVR4nFXLywqAIBBAUT+7QCICwYg2RUX/mJCvdCZHg1p1uNvLun6o5VKJuRITlwvv169m2NpxZyHolDIClJLLX4SbHad31iqlEOGFVwiJiCgDANPWxRgR8TsykXfevYwxD7u9Z5Xe/0+YAAAAAElFTkSuQmCC" "605" "233" >}}

Changing the order results in changes to the **Order** field value.

{{< caption-new "/uploads/2011/12/120811_1736_OrderListIt7.png" "New Item Order (Check Order Values)"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaklEQVR4nC2LSQoDMQwE/f+nBoeJR9bSWkbBJE1RUIceN5HBtyixesTarHYys7p7eHhEZhazHCvU8GFfKuo8siozuxuGqmI1FrukJtPGOm941NMGZKXB1bAkLtkMGnO/XySTQBr9/Nc/ur8Nm5GsYKkDNwAAAABJRU5ErkJggg==" "286" "139" >}}

## Part 2

In the next part I will show you how you can create a custom action with SharePoint Designer to reorder the items.
