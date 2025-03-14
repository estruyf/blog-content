---
title: Uploading images to your OneDrive with PowerApps
author: Elio Struyf
type: post
date: 2016-12-19T13:01:43+00:00
slug: /uploading-images-to-your-onedrive-with-powerapps/
dsq_thread_id:
  - 5392780074
categories:
  - Office 365
  - PowerApps
tags:
  - Android
  - Apps
  - iOS
  - PowerApps
comments: true
---

Since my last post, I got a couple of questions about uploading files to OneDrive or SharePoint. Last week I worked on a solution to find out how it "could" work(s). The only solution I found is not so elegant and it only works for OneDrive at the moment. There is no solution yet for SharePoint.

The reason why the upload to OneDrive is not so elegant, is because it involves using an Excel file. At this moment, making a connection to OneDrive can only be done via an Excel file. So, I had to find a way to link images in Excel files. Part of the solution has been written by the PowerApps team themselves.

> **Info**: Adding images to Excel - [https://powerapps.microsoft.com/en-us/tutorials/add-images-to-excel/](https://powerapps.microsoft.com/en-us/tutorials/add-images-to-excel/)

Still I had to find a way to upload images to OneDrive, so I thought.

## How I achieved it

### Step 1

First you need to create a new Excel file with a table. One of your headers needs to have a name like **Picture[image]**. The important part of the name is [image]. The prefix does not matter.

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim1.png" "Excel table"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAU0lEQVR4nEXBMQ6AIAwAQP7/LiKDJgX2dpAWmmhp4AWO3oVcKxESESIyN1U1szmnuw8dIddynWdKR4wRAHrvzCIizHy3FqAUM9t7r7Xc/f09ZvMDQj9Pf8Qke9wAAAAASUVORK5CYII=" "265" "89" >}}

One you have such a file, upload it to a folder in your OneDrive.

### Step 2

In PowerApps make a OneDrive for Business connection to the Excel file you uploaded.

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim2.png" "OneDrive Excel connection"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAnElEQVR4nD3NQQ6DMAwEwPz/N/1An9BzL1XVAyCIFWKb2G6shAqQOtdd7YZ5npdliRAhASISETMTESKmlAIzb7ylmFZYVZWIcs6lFDNT1VBrNTUCQkAVZWYRcff9FEQEEUVF7chqre5up9ZaKKVM4yQi+7733t0dAGKMwzCISNCv3R731/ihjIjYWrt6vfdjvHp9ju+80fd0Xf79AIEtyF3IUm3lAAAAAElFTkSuQmCC" "257" "180" >}}

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim3.png" "Table datasource"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAVUlEQVR4nF3MQQrAMAgEQP//wZZ8wQTtQjxEYgt6aTunFXYlTr13Zr6+RIRUtQ4AlmaqQO5+v7g7gNqYGY0xjvNUVTOrRqS11t6bRKS1BmDO+XsTEQ8bz492CCEhswAAAABJRU5ErkJggg==" "259" "126" >}}

Once connected, you can start implementing your logic.

### Step 3

Add a **camera control** or **add image** media control to your app. For this test, I choose the add image media control. You also need a button to start the upload process, and if you want, you can also add a gallery to show the uploaded images.

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim4.png" "Test application components"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAIAAABrQaqyAAAACXBIWXMAABnWAAAZ1gEY0crtAAABtUlEQVR4nF2QTW/aQBRF55/3B3TVRVZdpGogaUuIiJpuokZNpBAKwRASEMaugcDYxth4Pt+MjYGp3HZV6ezefbq6B0kpMy00MA28RPE8A614pgXnFCkQwHxJsaQYmM8302Q5EGQBDDMaIwCRwXrjvyxH3xUPePxrMbyWdKlFwMgaZVrFeDS4rVjX78ePVyvsrPAkWNibyOMsQVJQt3PRvzl+vqv2b47t7rd4NZ1P2k73kqYhYmTttr+4Pz//xWmd4fGPWe/Sbp4E8xckaOJZDad97j3WvW7d616U6c6526mF8yFSCopM5ppnwEEyKcqFuRa7XArOkNbaGJNvd+8q/bcfekdngzdHremSGmOkhH/n/f7gvKZjL3Vm6dCNhdoaY5RSSCuVa5Kp9FAwU1BTcLPjW01yRQQnZTcwX6Svm9BO/JGgviCYJbPSWqklyxL87FkNGjnAAiUiEk08q0HCUfkNkk+txvj+ZPZ0lYZjbN9Oe1/tZsXr1jfR/I+1ds1untoPVbtZnbQ+ue3a5OHUvv/oe09lt2YrSDGQQKY+0FDREFKsaMBpgqSUxe6wLfb/UewN5+I3tdfEjoOU9xUAAAAASUVORK5CYII=" "432" "750" >}}

If you added the gallery, configure the **AllItems** property to make use of your Excel table connection:

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim5.png" "Use Table1 as Items source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAWUlEQVR4nB3HMQrAIAwFUO+mRHHzms7tbUrrR6iTKFkS6VLatz1DRN57IooxbvuWc04phRCstc45U0oBcLdWa2Xm3vt34LhOAIaZReT5qepaS0TGGHNOVX0B5LpCa3+IZCcAAAAASUVORK5CYII=" "469" "126" >}}

### Step 4

Now it is time to add the upload functionality. For the "upload" functionality, you should make use of the **patch** function.

> **Info**: More info about the Patch function - [https://powerapps.microsoft.com/en-us/tutorials/function-patch/](https://powerapps.microsoft.com/en-us/tutorials/function-patch/)

In the OnSelect property of the button, add the following: Patch(Table1, Defaults(Table1), {Picture:AddMediaButton1.Media})

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim6.png" "Using the patch function"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAJklEQVR4nAXBQQ0AMBACsPkXxAEJf0QgZu2TlGRbW4oA7s42SdsfXY8WQ1QdNLcAAAAASUVORK5CYII=" "624" "93" >}}

> **Info**: If you are using the camera control, you should add write **Camera1.Photo** (and have configured the take picture functionality) instead of **AddMediaButton1.Media**.

You can also reload the gallery when this action is done by adding **Refresh(Table1)** to the OnSelect property of the button.

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim7.png" "Refresh gallery"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAHUlEQVR4nGN4//79VzB4+/btazB48+bNq1evIAwAsqob3JO+3x4AAAAASUVORK5CYII=" "624" "35" >}}

### Result

Once you have implemented this configuration, it is time to test it out. First select an image and click on the upload button, once the image is uploaded, you should see the gallery update.

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim8.png" "Result: upload / patch Excel table"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAIAAADt1dgcAAAACXBIWXMAABnWAAAZ1gEY0crtAAABdElEQVR4nMXOSUsCYQDG8fer9CGic5cuHToFQYdO4aVMgiCDCkKkIc1SK03MCoswykqjRVNwIYnJcnJpMsEOEpXNPi6zvG9Yp0Do2O/68IcHSM3a62uFYmlFfJMaVajUoCKqsqjIQr0hAKFWjZ37VvwHlXJY4nGyfJ3KXeKFkMgTUHkH2Qp5kz4csVqwYxfH5vCXo63U8nbS7oiYU8UkuHnJhO+8i861AYPWbDMZLTPTbh12Pqf163fxIIiXMlhgyeN2dnT1dXb3DWmGJ/S6nQuX/WolUoiBs8xtj3FyzGDq1cy6A3vrPu+UzY5tbli9rmwhA0Kl+/7V2cn5hXGHeXTbtukzBeOrg1uYe99zGosCtk6nyXQijZ/Er6N54q6YqH0+UEKZKBJJMg9UVUUIIQhFUeRZjmWED4qTJRkhpChKa4YQNiXp8fk5R5J58rFQfOJ4HiEkyTKAELbqdlr1f84/z9v6o1ZVFdA0zTAM+435jaKoL0Qw0Hv/79o7AAAAAElFTkSuQmCC" "342" "607" >}}


{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim9.png" "Result: after upload"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAIAAADt1dgcAAAACXBIWXMAABnWAAAZ1gEY0crtAAACAElEQVR4nFXP/08ScRzH8c/f0r/QL/3UD/3Q+qH1S7/kVj9kba1NHasWzmVMzaiACR4cAomdWjCmZbIiIoHkW0KngoNBMfkiTiHg4A6Ou/vc3ae5bNTz18fer+0N2lSjVC5Vf9W6zYM2dch2KZZpdpkmwzQoqg5YrhHyrVjd72uVgNjZzlcSZNaf/BHg2Iws1UG6kouTq0OGGc36fIfOxItrRMywGDHagjOJfBQkysmNnWWdxTygVmAWvRafUBH3XnyeHH476iA/gMh+SusxEHbrmXNXzp6/fOPW4P3RkSWvBdvAvmQ2gTe1ffGpUjGtvXT7sW3dYXUtj80adYsL2BtbOpsEvvzuVbNKqdYocN0QMTvv1L4LGgcWntlc9o+hIGj1qG+ZxOb3hHcrFv6ZShfCYneP6uzv5HbD2TSQJAkhxEPRv3Xoj1UC8aO1QKlaZxFCoiiecpPm7kz6FJrAIyx8c9xDZo5ObgQBcALkoYDkHkIy+j9JkkChWCY8q3Q1fNwgo2lPthiSZaHPPbo2YnruiqyQe+65r2pTUNdiW32Gnfo0rr9w9+H14SncYyai1hbb7nPuoDCofHLtwZTZ+WpizqR3Ep0u0+d8paTCjWOvX9rdlk8xK+ZzCBz3zziETbp93KAohhIFWpIFWT594YQFAcp/khAUZQgl+Dee538DeSGtwYr/AOIAAAAASUVORK5CYII=" "342" "606" >}}

If you go to your OneDrive folder, you should now see a new folder which contains your images:

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim10.png" "Image folder has been added"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAX0lEQVR4nD3LQRLEIAhEUe9/U2ZhWRoQhYZUTGXe9neXOec6xhjM7O4i0lpj5swsZuaHqq61AKiqiOy9nxwRAOQwMwD5iYiSmVOVfkREtdb4vIsnb7eLr967u/+vb74BNW2Sb2I/5TYAAAAASUVORK5CYII=" "371" "183" >}}

## Things you need to be aware of

This functionality is not yet production ready. What I noticed is when you upload media files, like how I approached it in this article, the images are stored as a blob without a file extension.

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim11.png" "Image files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAT0lEQVR4nD3LQQ7AIAwDQf7/UQQcU8DBiYIKaudmrZxUleScU4/e+51jDADJzEgC8IOku6+17i1FBICcc621tVZKUdX4vJmkiDyHiJjZnzc2Y3R9HIOlngAAAABJRU5ErkJggg==" "507" "179" >}}

When you download the blob, and add the file extension, you will see that the file is valid. When you test it via the camera functionality. This behaviour is similar. Although depending on which device you test your application, it can be that for some the file extension gets correctly added.

{{< caption-new "/uploads/2016/12/121916_1250_Uploadingim12.png" "Image files with and without extensions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAmUlEQVR4nFXLyw6DIBBAUf//C0WG3VAQFaflUZwqNprY2Ls9uU0phZljjMtZSomZU0ohhJxzU2tl5lLKuq6fq3q2bVuz7zsRIaIxRmuNiDTP+9XBMWc3jqP3nmia52cIN2Z+IZqus1JaACtEHIZDaj15WYLWVkqnVA/QC5Gn6cbMEXEEGABc17m2fRP98+NhAY5bqUGp5P2PvwBw411wP//FAAAAAElFTkSuQmCC" "403" "324" >}}

## What with SharePoint?

Now, you can only create connections to SharePoint lists. You cannot do it for document libraries.

Another option, which is mentioned in the forums, is to make use of Flow in your PowerApp. I tried this approach, but there are still problems when passing the file its contents.