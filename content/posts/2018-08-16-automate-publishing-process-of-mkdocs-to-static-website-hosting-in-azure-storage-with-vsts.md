---
title: Automate publishing process of MkDocs to Static Website hosting in Azure Storage with VSTS
author: Elio Struyf
type: post
date: 2018-08-16T13:13:59+00:00
slug: /automate-publishing-process-of-mkdocs-to-static-website-hosting-in-azure-storage-with-vsts/
categories:
  - Development
  - VSTS
tags:
  - Automation
  - CI/CD
  - Documentation
  - MkDocs
  - Visual Studio Team Services
comments: true
---

For Valo Intranet, we recently started using **MkDocs** ([https://www.mkdocs.org/](https://www.mkdocs.org/)) for building our product documentation. The great part about **MkDocs** is that can generate a completely static HTML site based on Markdown files. This makes it easy to maintain and can live in a source-controlled environment. MkDocs is for example used in projects like Office 365 CLI, PnP SPFx React and Property controls for the documentation.

> **Info**: Here are the URLs to the projects to check out the documentation: [https://pnp.github.io/office365-cli/](https://pnp.github.io/office365-cli/) - [https://sharepoint.github.io/sp-dev-fx-property-controls/](https://sharepoint.github.io/sp-dev-fx-property-controls/)

With the preview of static website hosting feature in Azure Storage which was recently announced. Azure Storage makes it a great location for hosting these static HTML generated sites by MkDocs.

> **Check out more on**: [Static website hosting in Azure Storage (Preview)](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)

In this article, I explain how you can set up an automated Visual Studio Team Services release pipeline for your static site hosted on the static site feature from Azure Storage.

## The configuration of Azure Storage

If you want to make use of the Static Website feature in Azure Storage, you need to be sure to use **general purpose v2** account type:

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub1.png" "Be sure to specify General Purpose v2 (StorageV2)"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAIAAACExCpEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA+ElEQVR4nAXBa26DIAAAYI6w7d8SFZ2KCOKjtr4AUVsfYBeTXWBJL7AjLVl20H4fIJT0g5JSjtPIBeeCJyyxbKuqq+JUgDRju9mM0fu+H8ex6e3+eddGCyloQgHJcqG/+M0o1atRccHHaZRKYoJDFAIUhCwtaJJB6ELoep5n245t2Z7r+YEP4hCv/WSmRQ+3WV0ZTs9Z1V2EqDmjCYgoKwaTyiVXJqvFRxAUZdm0Tds1MYkBrJa3x9/L9+/r4/9d/8CsczCDrgM96Ps+IIReKt60/alsQkRwzDCmEcIRwihEAKN4HpZ1WrfrNg/zOm3n/BL5JMFpHJEnUy44JIZHrw4AAAAASUVORK5CYII=" "310" "280" >}}

Once you have such a storage account in place, you could click on the **static website** option and enable it. During this configuration step, also set up the **index document name** to **index.html** and **error document path** to **404.html**.

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub2.png" "Enable static website feature"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABD0lEQVR4nF3NvU5DMQwF4LwYEysCFkZWBsZKiAXxAkgMVEJIDDwLL8DAwEBFBVJpe+nNTW5qO06cH9R2KPTI2+djq6Orp9Prx5PLh+OL+4PB8HBwt57h/vnt3tmNSsKEwMxRJCXpAZu2NeCQfRRRQGStFZFaaymFg8wnzevz2+R9GlNUGmXRGWttjKsNz3H21YxexvPPn1qrAkd975iZiFJKnmX+3cASPXIkUYGxt5aIEFFEQkzOggcOFFJICjzprgMARMw5S871TxSz996XUvI6MeVSypaDBGNMCKHWuuF/bVyiMYaZNwd22YFvW01Eq3YpuxyyGGs6rTutRaLk7eMVLxyPpvZjZsaNW4Ds8C+ri2lO7acpnQAAAABJRU5ErkJggg==" "493" "647" >}}

Once you save this configuration, it will present you a URL of where you could access the static site:

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub3.png" "Enabled static website feature provides you the endpoint"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAlUlEQVR4nF3MywrCMBCF4bz/ywg+hYh7pdZNmkZoYyfJpJNrG7GIqN/2cH4mRzycH7uT4yrXWte1fmMD0IWb/XG49ZpmNMYionPOWktEbAT05EqcS8lpkzcxxpQSu8u+bdumuXLOhRBd1wkhpJRaawBg0zQppYwx1tqc34FPgwGAUgoRvffLspRfrzcAEFEI4W8rpTwBsGnHCjIY6gQAAAAASUVORK5CYII=" "404" "277" >}}

## Project setup with YAML

To make the CI process part of your project and source controlled, you can now make use of YAML builds.

> **Info**: At the moment of writing this article, the YAML CI is in preview and probably needs to be enabled in your environment. More information on using YAML builds can be found here: [https://docs.microsoft.com/en-us/vsts/pipelines/build/yaml](https://docs.microsoft.com/en-us/vsts/pipelines/build/yaml) - Here you can find more information about activating the preview features: [https://docs.microsoft.com/en-us/vsts/project/navigation/preview-features](https://docs.microsoft.com/en-us/vsts/project/navigation/preview-features)

In your MkDocs project, create a new **.vsts-ci.yml** file and add the following contents:

{{< gist estruyf b53b7a53b1c94329e5ca707b723d97fa >}}

Be sure to update the **azureSubscription** to the one on which you created the Azure Storage account (provide your Subscription name and ID). Also, make sure you authorized to use the subscription on VSTS, otherwise the file copy action would fail.

To make the installation process of the MkDocs dependencies, it is best to create a **requirements.txt** file with the following contents:

{{< gist estruyf 0f0c28cf3820a1e6b0d308f297792dfe >}}

> **Note**: if you are using other types of dependencies you can add them to the file and will automatically be installed during the first CI step.

Here is how what demo project structure looks like:

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub4.png" "Project files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVR4nG3J3QqCMBgA0D1G0/1vn1Nygmk5Zy4naPj+L9RFIATBuTvo4W/HsW17iq+Q1nl/r23nNHCwEqxEBsQ0dD7cwSpluFCUS8JE/oUIw0Jg7/u4PAurc3qhPDshxjMo2DD2YxgMyD/tmjKtcUlz2zVckt8WubG6dtW1LmtXKc0Iw2d/ANACG42+mSPhAAAAAElFTkSuQmCC" "361" "201" >}}

### Note on the YAML builds

When your account has permissions to create a new build pipeline, when pushing a master version, VSTS will automatically create the build pipeline and run it.

When you do not have the right permissions, you will have to create it yourself on VSTS. Once the YAML build preview feature is turned on, you would have the following option when creating a new build definition:

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub5.png" "Use YAML build pipeline"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVR4nAEfAOD/AOjs7+7z9/L3+/L3+/P3+/X5/fT5/fj7/ujw+LvT5rqiHFPwb7qEAAAAAElFTkSuQmCC" "624" "77" >}}

Configure it as follows:

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub6.png" "Specify the YAML file location"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMElEQVR4nE3JQQoAIAwDQf//VxGpYhobkd4Kc1m2LTPAweCNJ1WSWh9zn9xgeJHp/BidOpZDY3MiAAAAAElFTkSuQmCC" "624" "149" >}}

## Project setup without YAML builds

If you do not want to make use of the YAML builds, you could set up your build pipeline as follows:

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub7.png" "Manual build pipeline creation"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVR4nGXCOw6AIBAFwL3/wajkFhZrgoB8s/sIWNiQOBlyt2Pm+MSUUy651LKnEEPrDYBCFYqBrw4oQMYYZq619t5FZG3mXHTydVjrvReR8fMCq25yuPiHchMAAAAASUVORK5CYII=" "624" "236" >}}

The command line task can be configured with the same script as in the YAML build. The AzureBlob File Copy needs to currently use the **v2.* preview** version. The reason for this is that AzCopy dependency used in the preview version does now support the **$web** container in the Azure Storage. Before it returned an error because the dollar sign was not supported.

The rest of the AzureBlob File Copy task can be configured to your own needs.

## Testing out your automated site publish

To test out your automated process, you just must push your code to VSTS and a build process should start up. If you manually configured it, it will depend on how you set it up (continuous integration, scheduled builds, manually).

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub8.png" "Process output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA+UlEQVR4nFWPyW7DMAxE/f8fWTdpjMbxIpE0V0l2Yac99B3mwIcZgF3/2d+/7h99v+bk4aKipu80t24YHrevx+25DAuugK9xnOZp+B6AwMI6L25uG2/MrK6Z82Zc3tTSRQkzA4CNtiieJEvI8cfZZuF5nhBQjEd8ip96v7i02pqR1bLywlBbjRpR49RRQksD20Fb1oa2W6loQEa/4yKc0ioiaDBvU231/7hISjmlRESISEji8tomLdZFDXc/r0TC4sWzgvt2eD6qnm01zZABQE1BMUture6t7K2cmoiWeVmWmZDQ6Ilj1Di/3o/O3FRVROQKc2Nlc4uLHxl7dgH8gHNAAAAAAElFTkSuQmCC" "358" "454" >}}

Once the process completed, go check out your site on the provided URL when setting up the static site hosting feature in Azure.

{{< caption-new "/uploads/2018/08/081618_1256_Automatepub9.png" "Render of the static website"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAZklEQVR4nBXIzwpAMBwA4L3/I7hIlPYi0nJgtYgDQ/m3ftjiMtu0+k4fisotqZaQTEE2xOWB6ztlJ2aAGSRUoFl9dHs78ZC6L9opbzjle7eeI7zLY5Bz1llj7acuUBdIKbXWPj33A8aNT7vNQEACAAAAAElFTkSuQmCC" "624" "164" >}}