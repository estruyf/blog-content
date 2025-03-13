---
title: Using Doctor in GitHub Actions for your documentation
slug: /doctor-github-actions-publishing-documentation/
author: Elio Struyf
type: post
date: 2021-02-19T17:04:15.278Z
draft: false
tags:
  - Azure
  - GitHub
  - GitHub Actions
categories: []
comments: true
---

Doctor is a tool that you can use to write your documentation in markdown and push it to your SharePoint. That way, you have one location to use and share the documentation in your company. In this article, I want to tell you more about how you can set up GitHub Actions to do automated documentation deployments.

{{< blockquote type="info" text="I will use the [doctor sample](https://github.com/estruyf/doctor-sample) as the blueprint for this article." >}}

## The credentials

Right now, Doctor supports three types of authentications:

1. Certificate authentication
2. Username and password
3. Device code

In GitHub Actions, you can only make use of the first two. Technically, the third is also a possibility, but in that case, it will not run fully automated.

Both of the options require similar steps. For certificate authentication, you will need to do some configuration first.

{{< blockquote type="important" text="Things to do before you can use certificate authentication: [prerequisites for certificate authentication](https://github.com/estruyf/doctor#certificate-authentication)." >}}

## Creating the workflow

In the project where you want to add the documentation, create the following directories: `.github/workflows`.

{{< caption-new "/uploads/2021/02/github1.png" "GitHub Actions workflow folder"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABuSURBVGXBQQ6CMBBA0d/puDARjTG64wje/0TowhigxUgrTmFDYuJ7bltfS3U8YV9DRHDO4VWJfccQAysZUyZ2LfX5wPh+MeVE+3wwxMAvYZFSIoQe9UL+ZCj8URaqGy6VkScPuz2lFMyM+61hNQO2LDFZdNVB3gAAAABJRU5ErkJggg==" "217" >}}

In the `workflows` folder, add a file named `publish.yml` (you can give it another name as well if you want). The file contents look as follows:

```yaml
name: Publish your documentation

on:
  push:
    branches:
      - dev
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '14'
        registry-url: https://registry.npmjs.org/
  
    - name: Install and publish
      run: |
        startClean=""
        # Check on which branch it is running
        if [[ ${GITHUB_REF} == "refs/heads/main" ]]; then
          startClean="--cleanStart --confirm"
        fi

        # Install doctor
        npm i @estruyf/doctor -g

        # Start doctor publish
        doctor publish --auth password --username "${{ secrets.USERNAME }}" --password "${{ secrets.PASSWORD }}" -u "${{ secrets.SITEURL }}" $startClean
```

As you can see, there is not a lot required to publish your documentation on SharePoint. The workflow automatically starts when you push your code to either the `dev` or `main` branch.

The workflow `run` task checks if the flow is running for the `main` branch. If that is the case, it will set some extra flags to specify to first do a clean-up on the site before publishing. Otherwise, it will just do page updates and not remove any pages.

{{< blockquote type="important" text="If you want to make use of `certificate` authentication, you will need to `--auth` argument to `certificate`, remove the `--username [username]` argument, and add the `--certificateBase64Encoded [certificateBase64Encoded]` base64 string you created in the prerequisites for security authentication." >}}

## Configuring the secrets

Once you have the workflow in your project, go to GitHub to configure the secrets to use in the GitHub Action.

You do this by going to your project on GitHub:

- Click on **Settings** of your project
- Click on **Secrets**
- Add for using `password` authentication, you need the `USERNAME`, `PASSWORD`, and `SITEURL` secrets.

{{< caption-new "/uploads/2021/02/github2.png" "The required GitHub secrets"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAAA9SURBVG3BuRGAQBADwdE+R/6pAtatIVyoolvndVsRrF78MyAqGjqTVcnb3sPMYMyhoCqbUGDzIUF3Y0wgHiu5ESCBhKb8AAAAAElFTkSuQmCC" "923" >}}

## Running your GitHub Actions workflow

Suppose the workflow and its secrets are in place. It is time to push your code. Once you did that, the Github Actions workflow will automatically start.

{{< caption-new "/uploads/2021/02/github3.png" "Publish your documentation flow in action"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABmSURBVE3BQQ7CMAxFwefEoFiQy7FgwenbQ2AV0fygLioxY5/tPXP7UmvFqyOJzCSiYWacXLNyv11xdw7LsvJ4vshMJHEqICbGPsQ+xNBEEr13IgIz4+CtBf9KMdwLLQL3C5oTSfwAOFQs+deGpB4AAAAASUVORK5CYII=" "771" >}}

*Happy documenting*
