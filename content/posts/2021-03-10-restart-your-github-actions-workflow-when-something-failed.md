---
title: "Restart your GitHub Actions workflow when something failed"
slug: "/restart-github-actions-workflow-failed/"
author: "Elio Struyf"
type: "post"
date: "2021-03-10T13:34:45.867Z"
draft: false
tags:
  - "GitHub"
  - "GitHub Actions"
  - "DevOps"
categories: []
comments: true
preview: "/social/970289f5-20c6-4557-804f-ee59aadbb9f8.png"
---

Sometimes it happens that your GitHub Actions workflow fails. When this happens, it is appropriate to check what exactly went wrong before you restart it. 

Sometimes it could be a timeout or something that was incorrectly configured on the site to test. This issue is precisely the case for my [doctor](https://getdoctor.io) build/test/release GitHub Actions workflow as I do so many changes to test out the tool. It happens from time to time during scheduled runs. My environment makes the workflow fail. The solution is to start the workflow again and specify it needs to start clean.

This process is something [doctor](https://getdoctor.io) supports. The only thing that I need to do was a manual restart of the workflow. To make it easier, I wanted to automate this process.

## Restarting the workflow

Restarting the GitHub Actions workflow can be achieved by using the `workflow_dispatch` event trigger.

{{< blockquote type="info" text="[Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)" >}}

First of all, you need to add the `workflow_dispatch` event trigger to your GitHub Actions workflow.

{{< blockquote type="info" text="Check out the `doctor` flow here: [release.yml on GitHub](https://github.com/estruyf/doctor/blob/main/.github/workflows/release.yml)." >}}

When that trigger is in place, all you need is to implement the job to run when a failure happens that restart your flow. The job itself is nothing more than an API call to the GitHub API, which triggers the workflow. 

The API URL is: `https://api.github.com/repos/{user}/{repo}/actions/workflows/{workflow-id}/dispatches`.

{{< blockquote type="important" text="You can find the workflow its ID by navigating to the following URL `https://api.github.com/repos/estruyf/doctor/actions/workflows`." >}}

{{< caption-new "/uploads/2021/03/restart2.png" "Get the workflow ID"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAAC0SURBVH3BwU6EMBRA0Vv6oC1QQB0S///PjOtBIExsIOUpOzMLzzHrumrOmWEY+I9Ya5mmiXme8d4TQqDve56JMQbnHDln9n3nOA5SSlxUFREhhICwfMHnB+b1RvvyRl3XeO95Jmfs+b69c3nc7yzLQtM0XFQVESHGiFhriTFSFAXOOaqqQkT4yxiDnOfJtm3knCmKgrZt6boOVeViraUsS+QX4ziSc0ZVUVVSSlxUFVUlxsgPXARKXxyQX1QAAAAASUVORK5CYII=" "771" >}}

For the restart process itself, I use a job that only gets triggered when the workflow ran via its schedule, and it failed on one of my builds.

```yaml
##################################
### Run when a schedule failed ###
##################################
restart_when_failed:
  name: Restarts the scheduled run when it failed
  runs-on: ubuntu-latest
  if: github.event_name == 'schedule' && failure()
  needs: [build, build_pwsh, build_cmd]
  steps:
    - name: Retry the workflow
      run: |
        curl -i \
        -X POST \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Authorization: token ${{ secrets.ACTIONS_PAT }}" \
        https://api.github.com/repos/estruyf/doctor/actions/workflows/6155745/dispatches \
        -d '{"ref": "${{ github.ref }}" }'
```

{{< blockquote type="info" text="By checking for the `schedule` event type, I can make sure it does not go in an endless loop of restarting the workflow." >}}

In the code block, there are two variables in use. One is the branch ref from on which it was running. You need this value for restarting the flow on the right branch. 

The other one is the `secrets.ACTIONS_PAT`. This secret is a personal access token with the `workflow` scope.

{{< caption-new "/uploads/2021/03/restart1.png" "PAT - workflow scope"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAnSURBVGOUV1L/z8TEzPD58yeGP3/+MIAABwcnAwz8Z/jPwPD/PwMA8p0LUeXWQVIAAAAASUVORK5CYII=" "425" >}}

Configure the `PAT` in your project secrets. Once set, your flow can now automatically restart itself.

{{< caption-new "/uploads/2021/03/restart3.png" "Restart workflow from job"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABrSURBVDXBUQ7CIBBF0cswWFP3oD/uf2cmJmqxdOAZPjwnXW937RFIAomIIKWEJMYYSGLygbBk1O9GKYXWdtwdCXoP/hwzPEHOmcu64qXQIzgtC3XbMDP66Pjn9UYSk58XsMyzPpiOoxERTD9+KTn6PunfnQAAAABJRU5ErkJggg==" "1362" >}}

I hope this helps you fully automate your processes.