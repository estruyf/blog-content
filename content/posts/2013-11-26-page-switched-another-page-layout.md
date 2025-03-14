---
title: The Page Cannot be switched to Another Page Layout
author: Elio Struyf
type: post
date: 2013-11-26T12:46:26+00:00
slug: /page-switched-another-page-layout/
dsq_thread_id:
  - 3836902614
categories:
  - Branding
  - SharePoint
tags:
  - Page Layouts
  - SharePoint Designer
  - Styling
comments: true
---

I'm currently working on a migration project at a client. It's a migration from SharePoint 2010 to 2013, which involves some re-development and branding. For the branding part, where this post focusses on, a couple of new page layouts needed to be created. The purpose of these page layouts is to replace the old versions, and to move from five almost completely the same page layouts to only one page layout.

Last week I was at the point of provisioning the new page layout and doing the remapping of the old ones. All went very smoothly with a PowerShell script at first sight, but checking the pages, I saw a problem with a specific custom site template. On these sites, the pages were still using the old page layouts. Although the new page layout was linked to that page item. I tried to do the remapping again via code and from the UI, but neither worked. The reference to the page layout were set up correctly, but the page itself kept using the old page layout.

The next thing I did was opening the site templates project and the pages were provisioned correctly, but the next step that caused the problem. When the page was provisioned, the person that created that solution, provisioned the web parts on the page by overwriting the page content itself. Due to this, the page references were gone, and the page layout couldn't be switched.

## Solution

The solution I tried, which also worked, was detaching the page layout from the page and reattaching it again. This method was something I hadn't used for quite a long time.

You can easily test this by opening your site in the good "old" SharePoint Designer, navigate to the library, and right click on the page that's causing the problem. There you'll find the option to detach the page layout: **Detach from Page Layout**.

{{< caption-new "/uploads/2013/11/112613_1245_ThePageCann1.png" "Detach from Page Layout"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAIAAADt1dgcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABW0lEQVR4nG2Q2WodMRBE5/9/yw4xJE+B2PgGYs+dRUtrbS0jjUYao5vYfvGBLhqKLooeXp6Jd0FKabQ5P2hd9lKGK2PaISOEcw4grLW13szzPI5j+HkZf/zl356m+8fp7vf1/ml6+EO/X8gvGh9pGAQbZyYvE2OYuMvURqIjtRuEg2EaEEY0ksxzDH4LfotdvcOcUq11YFyh81obbYxSWkiplOIgfIjdDt6XUnLOe95z3mPc9typtfVqtz0752KMvuNCCCml/83nlSJaRqmUal1WSmnwobXW/l0vK0Fr+1usFUJQSgGAUaa1KeUYKJfOB0SsrdXaap++tNaOowyEK+c9ANTWzrN1eaeHKzYarTiHo9ZP58MW9Gq0klJ57xHRGFtKucW0UsowL6uUgjMGAGhRK73v5fN6WnpzQoix+EU4APfeUcLSlr+wX6YFQEzXaXx9NdbmnNM7McY34YcAgvfHmKwAAAAASUVORK5CYII=" "210" "378" >}}

After that the option will be switched to **Reattach to Page Layout**:

{{< caption-new "/uploads/2013/11/112613_1245_ThePageCann2.png" "Reattach from Page Layout"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAIAAADw0OikAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABf0lEQVR4nG2R227bMAyG9f5Ptrs124qiRZImWWKbEqkTJdmxZWlQEhTttg+6Eg//T1Lsn/sQIhEZbWot9SviLNEFhkECSGOMcy6vpZSWWGoVA5w8e42oUcmhZ2e/VG97/drZp1338x02u+7H+7AFtwV/svPJzmKH4fliv70cN0f162y+74enPWwO6g2vbziJRW+DM0Pf52VZ17W0V0rOZV1bcym1dl4CEJFCBAClcOh7bZoJUWtNKUmQXdeFEGqtpRlvTNMk2PM8zzHGGEJKMaY0juOYxnmey6M6RqWUJq1JyztKrbcWwvkGInrnlVSIyByu1+u9v/h97rxzSrZqKeWl64go3SilCCTtnUMk9szMRKRJE2ltTM5ZAJoYI3v+6xiPpQ6AzG3unNse2lTN1ON0IoQwjVMIYV3b1z38gYD+4p0zTcvgbWtpHD/yxOl8cdYiotZ6WZZpmnLOn7UVMx8PB+vcf6yBImctSMkh5pz/0ZbKeyZCGCDGWEpZP/EHJKVXbsPTfkIAAAAASUVORK5CYII=" "205" "424" >}}

In my case I had to do this on a lot of sites and pages. So I created a PowerShell script for it to fix it.

```powershell
$spInstalled = Get-PSSnapin ' Select-String Sharepoint
if (!$spInstalled)
{
    Add-PSSnapin Microsoft.Sharepoint.PowerShell
}

$siteUrl = "http://YOUR-SITE"
$webserviceUrl = $siteUrl + "/_vti_bin/publishingservice.asmx"
$PublishingProxy = New-WebServiceProxy -Uri $webserviceUrl -UseDefaultCredential
$site = Get-SPSite -Identity $siteUrl

foreach($web in $site.AllWebs) {
    write-host "Start processing " $web.Title " - " $web.Url -ForegroundColor Yellow

    if ([Microsoft.SharePoint.Publishing.PublishingWeb]::IsPublishingWeb($web)) {
        $pubWeb = [Microsoft.SharePoint.Publishing.PublishingWeb]::GetPublishingWeb($web)

        $splist = $web.Lists.TryGetList("Pages")
        if ($splist) 
        { 
           $query = New-Object Microsoft.SharePoint.SPQuery; 
           $query.Query = "<Where>
                              <Contains>
                                 <FieldRef Name='PublishingPageLayout' />
                                 <Value Type='URL'>YOUR-PAGE-LAYOUT.aspx</Value>
                              </Contains>
                           </Where>";
           $items = $splist.GetItems($query);

           foreach ($item in $items) {
                $pubPage = $pubWeb.GetPublishingPage($item.ID)
                write-host "Remapping the page layout and web parts" $pubPage.Title -NoNewline

                if ($pubPage.ListItem.File.CheckOutType -eq "None")
                {
                    $pubPage.CheckOut()
                }
                $PublishingProxy.DisconnectPageLayout($pubPage.Uri.AbsoluteUri)
                $PublishingProxy.ReconnectPageLayout($pubPage.Uri.AbsoluteUri)

                $item.File.CheckIn("Update Web Parts via PowerShell", [Microsoft.SharePoint.SPCheckinType]::MajorCheckIn)
                $item.File.Publish("Publish Web Parts via PowerShell")
                if ($item.File.DocumentLibrary.EnableModeration)
                {
                    $item.file.Approve("Approved via PowerShell");
                }

                write-host " - DONE" -ForegroundColor Green
           }
        }
    }
    $web.Dispose();
}
$site.Dispose();
write-host "Script completed" -ForegroundColor Green
```


> **Note**: change the site and page layout references to that of your environment.