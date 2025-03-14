---
title: 'Selecting Data With XSLT: SPSBE Part 1'
author: Elio Struyf
type: post
date: 2012-06-13T06:56:48+00:00
slug: /selecting-data-with-xslt-spsbe-part-1/
Xylot:
  - http://www.xylos.com/blog/post/1274/Selecting-Data-With-XSLT-SharePoint-Saturday-Belgium-Part-1/
dsq_thread_id:
  - 3883818276
categories:
  - SharePoint
  - SharePoint Designer
  - Web Part
  - XSLT
tags:
  - SharePoint Designer
  - SPSBE
  - Styling
  - Web Part
  - XSLT
comments: true
---

On the SharePoint Saturday Belgium I gave an introduction presentation about XSLT ([Slides](http://www.slideshare.net/estruyf/introduction-to-xslt-spsbe07 "Presentation")). In the following blog post series, consisting of three parts, I will step by step explain my given demos.

## Selecting Data With XSLT

The first demo that I gave was about selecting data with XSLT. The best way to start with this is to create an empty web part page and use a Data View Web Part.

### Step 1

Open your site in SharePoint Designer and create a new web part page.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa1.png" "Create Web Part Page"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQUlEQVR4nAE2Acn+AOuiS+/Ws+zu7efm4+Lj4+Tj5OPk5uPl6OTl5ubm6ADp1ZH66rz99Ofz8ev07OPw6uLp5ubw8fb39fPx8fIAq6+Sip+nlqu7rrzFnLHHma7DssHQqLvMpbnLu8nXAM7Z5b7S8cTU5tbf5XOVuHKUtdjj8oOhwBlRhFqApQDp6+Xn7vno7fLO2N94mLdvkbDR3euqv9Y0ZJBvkK8Ajai+U3udhaG6mrHHoLjRsMTarsHVnLLLk6zFtMXYAF6FqAA3cJiyzbvL3pOvyrHH3svZ6ZavynOUtbTE2gCnu8+PqsavwtfAz+GUrseWr8i6ytvn7PHh6O/i5u0A3Of2q8Lar8PZs8jcpr3Wv9Dk6/L7////////9vb4AOLj56K0yp2yyLbF1pasxLjH2vT1/Pb29/b3+PLy9nQ/557+MHDRAAAAAElFTkSuQmCC" "286" "275" >}}

Give your page a meaningful name:

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa2.png" "Web Part Page Title"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeUlEQVR4nB3KSxbCMAgAwNz/hC5cGErzL6SQRjcSX531uBdsuIdWmwf/eAKGwkwAgIgxJYchx1T3EGMqtTZRHdcc15zvz0HkWmuwIWw7dxEdIiqip6joKKW6g2jcedpaZva129dsrXUQu5yziJy9MzMR996JCP+89z/VNItWKiABNQAAAABJRU5ErkJggg==" "485" "259" >}}

### Step 2

Click inside the **PlaceHolderMain (Custom)** and on the **Insert** ribbon, click **Data View **-> **Empty Data View**.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa3.png" "Data View Web Part"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAIAAABMTvt6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACTklEQVR4nD2Q7W7TMBiFfYncA9fCDy4AJDY+pDGJHyAEY0xj2tgGAoSmtpSlbdaPtUnjOLZfO2nsxPk2Kmg8f4+O9JyDsuBk3XvEJ/t5nt0GSUDTpq6Xa+ZhXtc1KvzXvW/7/uhNnm1+OjSgylq7xOCHwlqLMu/V6uSemjxQiViv14yDVioIAhKSWMaITN8OT+57/Ye/Bv3h8LfjjDDG/V5v4k6x76P+YPDp5Oji8uLz+fn5xeXp2dnR8fGHw8P3BweHH4+Q5weOMw6pyEyltFGZSXWeaiPj1L1ZoMh3GnwaJ4pRBgCEkCDAVV03TYsJRatZ39JLleWcMc5YURRVWXZd17at5wdo99ljq6/iJGWMSSnbrrN3jNwZ2nn62GZXMt4IsR3a3WGtHTou+vrl2MrvcZL+i//Ttu1i6aFy4zf4NFUaBOR5bozJ87xt27puQhKh5cIpyQ+AGGMc4q12GIbGFGVZrTwPRUw44/lo7E7c+Wx+O7weLZZ+UTabjY4oQ1lCYuYpnTO6HcY5RCEJQ6K1powjSajkvlJaALC/AAdjTFlV2/bcZan0N6mWQnDGCSFSyq6zTdOEhCERs5ht44hEnDMATsIwimhZVSFlKE+5YN4mVRIAgCulrO2s7ZqmBhAoS0HyIFU5gGAMTFHe3dJxiLfmgN1NwoF6/uom18K2WdfowiTz+RSl0YCMX8bLF/71Dp09J+5uMHqi13sW9gr6DhUmrauERQuCZ1E4pWQu+EoKr6lkXcbIFKUpGiFTEAmHmEHMIeEi0VmZ5dUfQ0OJ9A1rhlkAAAAASUVORK5CYII=" "175" "423" >}}

The reason why I always choose for an empty data view web part, is because you can choose for yourself which data you want to show. Otherwise the data view web part will show the default view.

### Step 3

When you added an empty data view web part, click on the **Click here to select a data source** link.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa4.png" "Select a data source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOUlEQVR4nGPYee3rqnMfl57+sPwMFC0DkyvOfNx57SvDvnt/dt36vfs2CG2/8WPnrV8w7p/99/8BAOttMdDAn8S0AAAAAElFTkSuQmCC" "224" "53" >}}

Select your task list in the **Data Sources Picker** screen and click **OK**.**
**

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa5.png" "Select the list to be used as data source"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAIAAABrQaqyAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABsElEQVR4nF2Q3U/TUADF779rgnsyMWrfiA/GEEPiiw8C6WBxKGCI82sfrOtoB2NjtmuXtb3tbXvvbWVzYFt8sGuvaQwkcHLeTk5+JweUuK0HT7Yev9hbff3lFS88f9te3+1v1o1PwmCD3wY9qXM+HAwHp2f9wja0AooJduezsCeJ4LjTbH7/LImt405TbDfk7pEktuRu2zLGrXoNTPXRRNcWl1GSXEdxUjiK4zhJrv90RQEQ9XDh9i2Huq63uLxijOV5nmUZY0zXVECVAzoVMLnI8yW7UXYby43q2tqbR6u7K8/4lad8iSuXuO0SV37IVV6u8wCpDdcYno0MqTdSNNsjcxv9hCgkwW9ZPgEIwSAMMfFIQDH2ojj6j2eMnZ5IwJ4qYRhiTDEJfJ9cRXGWszQtdvwYDYGpija0TNNUlbHjOH/T9M40ayw5NoTQdhyECU3vxVCTXBvq+uRiNr+l3mlDaJmGSQjNb7RcFmxtrADfQ4yxNE2zZdG4fwuCk18zGhDkOiY0JzacUox8F4bU70kCkMVGt/3tqF7bf7/zbmfzQ7X8tbb/ca9yeFCtlDf+AZuor3HqY9aEAAAAAElFTkSuQmCC" "237" "401" >}}

### Step 4

When you selected the data source, it will be visible at the right side under **Data Source Details**.

Select the **ID** and **Title** field.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa6.png" "Select fields"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0klEQVR4nD3LO0/CQAAA4PvlxNDBRbTQQWLAlRnSxoTYRQMKGEpTClzf3JW2wPVheTR3dTBCYvKtH/iczAaj6XCsDEbKysamFxju5h8wHKzqcAFtbWk5KPS3cUiycH9BMmAa0EM4TpMkTb7z/FScKaOsZOVPSRkD2NUty5zDaKb7io6n2lqZo48JlN/UL9UGlFIUZHePUq350mi/Cs/y1cNTv915B0VRkPRsWMhdh0GU7uPDjuRXJDn+7c3ucCuIN/ddri5VebHKi1xdrNR6fEv+BS7/rZ6kfgGcAAAAAElFTkSuQmCC" "296" "220" >}}

Click **Insert Selected Fields as ... **-> **Multiple Item View**.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa7.png" "Insert as Multiple Item View"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAIAAACZwRr8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdklEQVR4nE3NTXOTQByA8f3+H8COjqNnD3WmdcyMhhQ1ZGJMSwIpFAgpL5ss+xIgsLtFKe3fcaYHn+vv8KDL0dXF58nlyBwZ1vnF14+fjMmP5bfZyrRs07LR4mYzW6ym8xvrpz2d29P59XLt+9ss2OFgh9F9ileu59z6a9dzvdALItcPC16VjSpPEiXkGKTECe9vY3yXkC1m8UHEBxHlbIsZOv8Vv5o4b797b0z3tbk5M5yz8eqdFbxf5h+WCSKl5LKPssL24k2URxn1YoxFw2WfkgqpOoI+rA+L3DdEapV4fsxmLb2Gztd1glpuQ7Mo06t9+IXuxsXOoLFB4jHUlrXxkNIPAFBX1T7LCSGCUUqJVBoA1qlESncAIDhPk4wWlBAqhOCc9/2jVvqFC1LgHNOCMsbLsmyaZhiGU/MfU8oYY0fxrz+PTwAw9tXLW8m2ruuu+w0AzwDD8ATwHOEKlVXzoDrnrgiiHGd7zivZatnqttHtSf0F6QRwQiis9+QAAAAASUVORK5CYII=" "172" "234" >}}

Your columns should now be visible in the Data View Web Part.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa8.png" "Selected Columns"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nE2NQQ6AMAzD9v9Hcl6hwJgg7SaRosEF3yzFSpqkFvSIuMmIaK2bD40IkskMJO8Xkhew6FqPWsrh7snMyTHkWwPIA8lZzvNKZvavAczzoqplL6215O7fzVcbkEVU123be+8PB6WQ4WpTFz0AAAAASUVORK5CYII=" "301" "142" >}}

Right now SharePoint Designer generated the XSLT stylesheet for you, but you can also add columns yourself.

### Step 5

Create a new table cell at the right side.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa9.png" "Insert Cell at the Right Side"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVR4nAFdAKL/ANPV1MjKzMbIyLXOsa/PrLPRsbnWtrPQsLXVsr7buwDt6OXf5Orf6O7b4/Ti4NPi3svy8PP09fb39Pjx7/YA5+br5OTo4OHm4eTt5NzC6eHC6+vw5+js8PHy6+ztfFlNDteEQIYAAAAASUVORK5CYII=" "384" "134" >}}

Click inside the new table cell, and click at the bottom on **Code**. This will bring you to the code line of the selected cell.

### Step 6

Remove the **<xsl:text xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" ddwrt:nbsp-preserve="yes" disable-output-escaping="yes">&amp;nbsp;</xsl:text>** string. This is automatically inserted by SharePoint Designer to put a space in the cell.

### Step 7

Write **<xsl:value-of select="** and you will see that SharePoint Designer automatically gives you a list of the available columns in the data source.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa10.png" "Available Columns"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeElEQVR4nAXBSw7CIBAAUO5/He+gpgtXTfxAK5CoWLEUOzDMaMD3xHp/oHd5JmvdUU8n48cn2DfqF7oZBIcPAya3Hnq52cmtjJ3lzpS95d4EQfArPkf/NVppdc6wttZqra01RBTTLcQIOSWlLsNwJWIshIUK8bLEP4PNbofuP26DAAAAAElFTkSuQmCC" "516" "224" >}}

Select **@Priority** and close the element with "/>".

**<xsl:value-of select="@Priority" />
**

This will have the following result:

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa11.png" "Priority Column Values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmUlEQVR4nFXG6wqDIABAYd//0RrhYF3MzK0aZcsba5CW2mj9afBxOCDFLaL9vPhlDfbfbB3o7qgtk4k/jR5mxYzeHfORDEw1nOp4HRI/5n7Mfj1kjmOgH1CQyLBskySI8sxLCt7NdWqgG1EQ2PMiCLyPwIEXThCgayiraHnlmyJBlmdeUSBprKrL3N0sS02fWJbuw1LbJ4ahLzcnwH/rmAk4AAAAAElFTkSuQmCC" "280" "191" >}}

### Step 8

The last step in this demo was to remove the numbers before the priority. To remove this we need to get the value behind the closing bracket + space ") ".

To do this you could use a XSLT function called **substring-after**.

Remove the select attribute and re-add it again and choose **XPath Expression Builder**. This will open a new window where you can see all the columns and XSLT functions.

In the **XPath Expression Builder** start typing the following: **substring-after(@Priority, ') ')**

The result is shown at the bottom:

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa12.png" "Expression Builder Result Values"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAHklEQVR4nGPYvnndob07jhzYcXg/HO0Eox1HDuwCAFXWFij6znzQAAAAAElFTkSuQmCC" "383" "43" >}}

Click **OK** and save your page. This will give you the following end result.

{{< caption-new "/uploads/2012/05/051812_0628_SelectingDa13.png" "Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWklEQVR4nB3JWw6AIAxEUfe/U0ETYYrl0U4N3r+bczyiFaKvmhlJdyc551xr79F7TymdZ+pj0N3MIqJWAIiIzTnnUoqZ+R9JQFprm1X1uu4xJv/cPSIAiGz+AC4WdHNgVNPAAAAAAElFTkSuQmCC" "504" "215" >}}

## Part 2

In the next part I will explain my second demo about using XSLT statements.