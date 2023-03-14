---
title: Using Doctor on Azure DevOps to generate your documentation
slug: /doctor-azure-devops-generate-documentation/
aliases:
  - /doctor-azure-devops-generate-documenation/
author: Elio Struyf
type: post
date: 2021-02-26T08:44:53.046Z
draft: false
tags:
  - Azure DevOps
  - DevOps
  - Documentation
categories: []
comments: true
---

GitHub Actions is hot these days, but still, Azure DevOps is being used in many companies, and I do as well. Doctor a tool for publishing your markdown documentation on SharePoint, works nicely on Azure DevOps as well. 

{{< blockquote type="Info" text="I will use the [doctor sample](https://github.com/estruyf/doctor-sample) as the blueprint for this article." >}}

## The credentials

To start, you need to choose how you will publish your documentation to SharePoint. Doctor allows three types of authentication.

1. Certificate authentication
2. Username and password
3. Device code

The third option is only preferred when using it on your local machine. When you want to use certificate authentication, you need to do some steps before making use of it.

{{< blockquote type="Important" text="Things to do before you can use certificate authentication: [prerequisites for certificate authentication](https://github.com/estruyf/doctor#certificate-authentication)." >}}

## Using the credentials

On Azure DevOps, I recommend you make use of a `variable group` to connect to an `Azure Key Vault`. That way, all your secrets are secure and easy to be changed from one place. 

{{< blockquote type="Info" text="Tobias Zimmergren wrote an excellent article about this: [using Azure Key Vault Secrets from your Azure DevOps pipelines](https://zimmergren.net/using-azure-key-vault-secrets-from-azure-devops-pipeline/)" >}}

Using a variable group is always a good idea; you do not need to manage your variables in your pipelines. 

{{< caption "/2021/02/devops1.png" "Azure DevOps variable group"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAADRSURBVH3BsW3DMBRF0fs+P6m4sKtUGSFV9p8hU2QAl5JhUXyJDAhwE5+j6/XqUgoRAQpaq0giS0ESh4xstFZ5mxqv5Oh3ln6n1eSVvFwuSOIV2+T3z8znOw+1ViKCzCQieJZfH42dVWhZkHiwzcE2ua4rSChghIkoSOJgG9vkNE3YptbKf7ZtI5ZlYds2JLHrvSOJMQa9d+Z5JiKI8/nMuq6MMdhlJra53W7Y5nQ6UUohJBERjDGQhCQkUWullEJEIIngzzRNZCbPeu+MMbDN7hdWqlXtTKx/OwAAAABJRU5ErkJggg==" "759" >}}

## The pipeline

The pipeline itself is relatively straightforward — the `azure-pipelines.yml` file contents look like this:

{{< highlight yaml "linenos=table,noclasses=false" >}}
trigger:
- main
- dev

variables:
  - group: doctor-sharepoint

stages:
- stage: 'publish'
  displayName: 'Publish to SharePoint'
  jobs:
  - job: 'mkdocs_build'    
    displayName: 'Building Documentation'
    pool:
      vmImage: ubuntu-latest
    steps:
      - script: |
          debug=""
          if [[ $(System.Debug) = true ]]; then
            debug="--debug"
          fi

          cleanStart=""
          if [[ $(build.SourceBranchName) = "main" ]]; then
            cleanStart="--cleanStart --confirm"
          fi
          
          sudo npm i @estruyf/doctor@next -g
          doctor publish --auth certificate --certificateBase64Encoded $(CERTBASE64) --password $(CERTPASSWORD) --appId $(APPID) --tenant $(TENANT) --url $(URL) $cleanStart $debug
        displayName: 'Publish via Doctor'
{{< / highlight >}}

Under the variables property, the variable group called `doctor-sharepoint` in my case gets retrieved, which includes all the required environment variables.

The pipeline will get triggered whenever there is a push to the `main` or `dev` branch and does a clean-up first on `main`. If you set the `debug` system variable to `true`. Doctor will automatically run in debug mode, which gives you extra logging.

## Running the pipeline

Running the pipeline on Azure DevOps will give you the following result:

{{< caption "/2021/02/devops2.png" "Azure DevOps - Publish pipeline"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACDSURBVE3BWw6DIBRF0Y2CoS9n3HRodUjWxCJw5TT8dS23bZtKKUzTxPP1ZFneHOkgH5l/vprRhRDQ2RgYmB8P9mFEEp2Z4UMIlJzJOYNzDH7ibI3rfUYSTY3vvuNTTpzFiDGCYL5daBLOOTozAzP8LV6pY8V7T7d+VtTENyVqrUii+wFbzk8ry2LoJAAAAABJRU5ErkJggg==" "1134" >}}