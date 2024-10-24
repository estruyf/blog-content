---
title: Adding or deleting GitHub project (classic) labels on issues
longTitle: ""
description: In this article, Elio explains how you can use GitHub Actions to automatically add or delete project labels to issues when you add, move, or delete.
date: 2022-05-18T14:57:42.798Z
lastmod: 2022-05-18T14:57:42.288Z
preview: /social/4afb7f9b-8819-4434-9203-125d7ee8ccda.png
draft: false
comments: true
tags:
  - GitHub
  - GitHub Actions
type: post
slug: /adding-or-deleting-github-project-labels-on-issues/
---

{{< blockquote type="important" text="This approach makes use of GitHub classic projects and are being discontinued. The approach will not work for new Projects as they require you to use the webhook functionality in order to create Project Item triggers." >}}

Since projects got added to GitHub, I started using it more and more. For [Front Matter](https://frontmatter.codes), I am using projects to manage its releases. Before projects, I used milestones, but with projects, it is easier to follow up on what things I still need to do before the release.

{{< caption-new "/uploads/2022/05/github-project.png" "GitHub Project example from Front Matter"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAAC+SURBVF3BPU7DQBCA0W/Wi3GMkQhBCC5AR8v9j0FFS4UgTnD2b2aQkZAi3pOn5xcPscfdsHJCRFh1IjR3RIRWKzHg5GUGd0LXIe6oKk0EEcHMACGO11fspge+5z2tGePNPek4U08HprtH0mFPywuxFkU/vzAzEOGXNVQb72+vrESE0PcXDJsNIQRWEjpCPwHCuVhKpZaCm0EI4I64As65MAyXbG93DOPIH22F/2JOmZwS7o6qko8f1LRgapz7AdbCZOBiLdvsAAAAAElFTkSuQmCC" "1118" >}}

One thing I was missing was a sort of label in the issue list to easily spot which issues were already added to a project release. 

To enhance my experience on GitHub, I went on the journey to find out if it was possible with GitHub Actions.

## Getting the event type and project data

To label the issue, what I needed to know were two things:

1. The event type. Was the issue added to or deleted from the project;
2. The name of the project.

The **event type** can be retrieved from the `github.event.action` environment variable. In the case for my actions, I configured it to trigger on `project_card` with the `[created, moved, deleted]` types.

The **project name** is a bit trickier as it is not passed as an environment variable. You will have to do an API call to get the project name. The API is provided by the `github.event.project_card.project_url` environment variable. In my case, the variable its value is: `https://api.github.com/projects/14468471`.

Via a CURL command execution, you can receive this information. 

{{< highlight yaml "linenos=table,noclasses=false" >}}
- name: Fetch project data
  run: |
    echo 'PROJECT_DATA<<EOF' >> $GITHUB_ENV
    curl --request GET --url '${{ github.event.project_card.project_url }}' --header 'Authorization: token ${{ secrets.GITHUB_TOKEN }}' >> $GITHUB_ENV
    echo 'EOF' >> $GITHUB_ENV
{{< / highlight >}}

{{< blockquote type="Info" text="The notation you can see here is to store the CURL response in an environment variable called **PROJECT_DATA**. You can find more information about setting environment variables in the [GitHub documentation](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#multiline-strings)." >}}

Once you have the name, all you need is to use the [Simple Issue Labeler](https://github.com/marketplace/actions/simple-issue-labeler) action to add or remove your project labels.

Here you can see the whole GitHub workflow:

{{< highlight yaml "linenos=table,noclasses=false" >}}
name: Project labelling

on:
  project_card:
    types: [created, moved, deleted]

jobs:
  automate-issues-labels:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch project data
        run: |
          echo 'PROJECT_DATA<<EOF' >> $GITHUB_ENV
          curl --request GET --url '${{ github.event.project_card.project_url }}' --header 'Authorization: token ${{ secrets.GITHUB_TOKEN }}' >> $GITHUB_ENV
          echo 'EOF' >> $GITHUB_ENV

      - name: Add the project label
        uses: andymckay/labeler@master
        if: ${{ contains(github.event.action, 'created') || contains(github.event.action, 'moved') }}
        with:
          add-labels: "Project: ${{ fromJSON(env.PROJECT_DATA).name }}"

      - name: Remove the project label
        uses: andymckay/labeler@master
        if: ${{ contains(github.event.action, 'deleted') }}
        with:
          remove-labels: "Project: ${{ fromJSON(env.PROJECT_DATA).name }}"
{{< / highlight >}}

When you add or remove your issues to a project, the labels will now be automatically added or removed.

{{< caption-new "/uploads/2022/05/project-labelling.png" "Project labelling for issues"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACGSURBVE3BQQ6CMBRF0dv+giYEdKBxEY4cuv/lmKgxKEJ/+wwzzwnny1W7vuM1vimlIIkYI5KQIC8zkki1Fj7ThEVj5e5IYr8bCATujycESJ4zeZmpVfy7LQurWiur1LQtQ98xjhNeHAgEIJpRirPy7EQE32nGzEgpAUKI7abldDzQNA2WjB+mYUZyA2cSigAAAABJRU5ErkJggg==" "470" >}}