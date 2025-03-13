---
title: Running an Azure DevOps self-hosted agent on WSL
slug: /running-azure-devops-hosted-agent-wsl/
author: Elio Struyf
type: post
date: 2020-03-31T12:04:05.292Z
draft: false
tags:
  - Azure DevOps
  - WSL
categories: []
comments: true
---

Some time ago, I migrated my blog from Wordpress to a static site by Hugo. To generate the static pages, I make use of Azure DevOps pipelines. The **free tier**, which gives me up to 1800 minutes/month, is enough, but not this month. When I wanted to publish my blog post from yesterday, I got the following friendly message:

<blockquote class="important">
<p><strong>Error</strong>: Your organization has no free minutes remaining. Add a hosted pipeline to run more builds or releases. See https://eliostruyf.visualstudio.com//_admin/_buildQueue?_a=resourceLimits for more information.</p>
</blockquote>

{{< caption-new "/uploads/2020/03/wsl1.png" "Free tier limits"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAB/SURBVHXBQRKCMAxA0Z+QBsTh/vdkLDLYJtoFS9+TWmvy4+6oKv/Y6zhpkZCV2SaWZeZ27Du+rrg7tj0f3EQEEcHMGNSc1gOZFDvOi6t1yGRbZ1SV3jtDaw0RAS3YtjifCEopDKqKmTFEBKpKZmJaCiUCM0NEGDKT2/tqLGXiC0uPMXoUeJyBAAAAAElFTkSuQmCC" "534" >}}

## What are my options

First, I thought to wait it out, as the month is almost at its end. But hey, what is the fun in that? 

Then I thought, what if I create a self-hosted agent? That would be a great solution. As the free tier allows you to link one self-hosted agent, and you can use this for an unlimited number of minutes. 

What I did not want to do was change too much in my pipelines (best even nothing) as this agent will be sporadically used. One of my pipeline dependencies is that it runs on Linux on which it installs Hugo. That meant I could not run it on my Macbook or Windows machines. I was thinking about the following other options:

- Docker/Container
- VM

In my opinion, both of these would make it a bit more complex to get it up and running quickly. That gave me the idea to test it out on WSL. On my Windows device, I have **WSL2** running with multiple Linux distros. The one I picked for this sample is **Ubuntu-18.04**.

## The WSL configuration

> **Info**: I skip the WSL configuration, as I assume when reading this, you already have it in stalled on your machine. If not, you can follow this guide: [Windows Subsystem for Linux Installation Guide for Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

The WSL configuration for a self-hosted agent is straightforward. In order to enable it, all you need to do is follow the Azure DevOps documentation for creating a self-hosted Linux agent: [Self-hosted Linux agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-linux?view=azure-devops).

Essential steps in the guide are:

1. Create a personal access token;
2. Download and configure the agent.

<blockquote class="important">
<p><strong>Important</strong>: When you downloaded the sources, move them to your WSL location. By doing it this way, you make sure that you get the full speed of the Linux file system. Running node/npm on it will significantly be improved.</p>
</blockquote>

{{< caption-new "/uploads/2020/03/wsl2.png" "Configuring self-hosted on WSL"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACMSURBVEXBMU5DQRBEwTez+79sJN+UlJDTkDrjYjhDuzPdyCSuivePT8/zJCP4eTyQTbd4MWtt5tf9m9VNEBAQgLqpFrJ5GplkSYxMuhvJYDiOA/OSmczb25VdzeU82XsTEdjmdr2wqymLOQazd5GAbY4xaJuSKIndhW0kMQ38rkVE8CSb3Y3NPxsC+APrUF0HJsX5UQAAAABJRU5ErkJggg==" "1306" >}}

Once you did all the configuration steps, you should now have a new agent available, which is offline.

{{< caption-new "/uploads/2020/03/wsl3.png" "WSL agent available on Azure DevOps"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABcSURBVDXBuw0CMRRFwfM+uwFGQrgBqqH7bcQSZJYIDO8SIGZsjCEzo7VGRPC31mLOyfFIbpckT+3MtiXGj5lRVez7Tu+d+1VEBK7PG1Xh7lQVkshMJOHuPF+FJL55fyVbNLxMHAAAAABJRU5ErkJggg==" "872" >}}

> **Info**: When you get the following message `Must not start with sudo`, all you need to do is run: `export AGENT_ALLOW_RUNASROOT="1"` to fix it.

## Before starting your agent

As the agent will execute the same tasks as on your hosted agents, you need to make sure you have all the required tools installed to run your pipeline successfully. In my case, these tools were: zip and Azure CLI but will vary for each pipeline, of course.

```bash
# Install zip
apt-get install zip

# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

## Starting the agent

Once you installed all your prerequisites, you can start up your agent. To do this, all you need to run is: `./run.sh`.

{{< caption-new "/uploads/2020/03/wsl4.png" "Agent running on WSL"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABkSURBVBXBzQ3CMAyA0c9WDNmjYlOu3NmAA2IqOgDiJy5J7SLek8v1th2mCXfHzMhMaq1EBvN9RlQQhHI8nTErfNpC3e/YgBFJZuDN6ZEgUPpYeTxfqCrNnb9vH0QmawSqytsXfhPxNQ9WtwCGAAAAAElFTkSuQmCC" "562" >}}

The agent its status should now change to `online`.

{{< caption-new "/uploads/2020/03/wsl5.png" "WSL agent online status"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABGSURBVBXBsRGAIBBFwfc5RhQTa7H/bozUlESYA4dd3c871rRgZowxMDNCCEy1VsrnXEXEPW+klJDE1HtHEu5OzpmmxnlEfgFqFyL5UODSAAAAAElFTkSuQmCC" "1021" >}}

Now you should be able to use this agent for your pipelines.

## Additional configuration

> **Info**: If you plan to create a new pipeline, you do not have to follow the next steps.

As I want to be able to run the pipeline when I am out of credits, I looked for an easy solution. The first thing I tried was to set a variable that specified if it was going to run locally/self-hosted. The problem with it is that once you create a pipeline, it automatically configures the default agent pool or VM. In my case, this was the `Hosted Ubuntu 1604` agent.

{{< caption-new "/uploads/2020/03/wsl6.png" "Default agent is set to Ubuntu"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABYSURBVHXB0QrEIAxFwRMNroj//6UtQrg228eldGdsrZVeK6VW/jEzCrfjPIkIJPEmM/G9NxGBJFprjDF4KqXgN+acfFrjysTdeeNmhiQk0XtHEr8yEzPjCwikKBeP0Of+AAAAAElFTkSuQmCC" "484" >}}

Due to this, each time the pipeline starts it will immediatly stop and mention that you do not have credits anymore.

The start-up agent cannot be easily changed, so what I did was to create an additional pipeline, which uses the same `azure-pipelines.yml` from my project, but overwrote some settings like:

- Default agent pool for YAML: `default`;

{{< caption-new "/uploads/2020/03/wsl7.png" "Default agent pool"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABFSURBVE3BAQqAIBBFwfd1E6P7HzOIIiJa2lAInNG6HZEtYzYhmmAuhiR+AZj7Q5Lw96aRxHXulFpJSnQR2FILI4lOiNEHbYsRBvwpviwAAAAASUVORK5CYII=" "1266" >}}

- **Triggers** -> **Continuous Integration**: Override the YAML configration, and disable continuous integration. Enabling this setting will prevent that this pipeline will automatically run each time you push your code.

{{< caption-new "/uploads/2020/03/wsl8.png" "Disable continuous integration"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABVSURBVDXBsRKCQBBEwTfucoVyiRH//3NGJBbJFcgNEtCt1pq3/cfrOWIb6YHdiQgkccvP8mWqlb7xJ8Bc9nVlGgcyE0nk/K6UUsgMbkc3lAqYiOByAmReGlHUcl8eAAAAAElFTkSuQmCC" "1059" >}}

### The steps

These are the steps to create the additional flow for your WSL hosted pipeline:

- Go to Azure DevOps;
- Click on **Pipelines**;
- Click **new pipeline**;
- Select **Azure Repos Git** and click next;
- Select your project from the list and click next;
- Select **Existing Azure Pipelines YAML file**;
- Specify the path of the `azure-pipelines.yml` file in the project. Click continue;
- On the review page, you can override some variables if needed;
- Save the pipeline.

{{< caption-new "/uploads/2020/03/wsl9.png" "Pipeline review"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA+SURBVF3BsQ2AMAxFwRcMEoUr7z8eA6BfIMUoMaKg4a5JKjPjNcZkNmPfFj5VxXUXqyQyE3cnIvjrvXOcyQNQQBmx3ODURAAAAABJRU5ErkJggg==" "1273" >}}

Once you followed the previous steps, you should now have a new pipeline for your project. Still, a couple of extra configuration steps are required. 

- Click on the new pipeline;
- Click on **edit**;
- Click on the three dots next to **Run** and click on **Triggers**;

{{< caption-new "/uploads/2020/03/wsl10.png" "Triggers option"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACySURBVF3BQUrEMACG0e+fJjMMdJHsitZC7uHSM3gZvYeX8TBddmVaKE4hIbFdDAy+p23bKrtSCnepwM+tYE7gLyAJw67WyjiOxBix1jKdX/j4jlyt+Hr9pW1bjCSapiGEQAiBw9Ot8vl2oT2fCF1BEkYSMUbWdUUSfd/z7A3v/spdzhnDzjmHc45DrZWUEv+ZlBLLsjDPM6UUhmGgaRoeScJM04T3nq7rOOScyTnzyFrLH9wuQ5hO/1UjAAAAAElFTkSuQmCC" "239" >}}

- Underneath the **Triggers** tab, you can configure to disable the continuous integration.
- On the **YAML** tab underneath **Pipeline**, you can specify the default agent pool to use for the pipeline. For my pipeline, I choose **default**.

Once you completed these configuration steps, you will now be able to run the pipeline manually, and it should execute on your WSL agent.

{{< caption-new "/uploads/2020/03/wsl11.png" "Pipeline running on the WSL agent"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABbSURBVDXBwQ3DIAxA0W9jJyClyqFDdJiu3V1y4BwOoEBDpb4nOefBLaWEmfHXWqOUwudQXs+AbdsDd2PqvSMijDFYlpUYI+/9YtKzQa0VEUFVCSEwifDj7qgqXzfBGGLPfAsQAAAAAElFTkSuQmCC" "1321" >}}

Here is another screenshot on WSL terminal itself:

{{< caption-new "/uploads/2020/03/wsl12.png" "Self-Hosted agent job listener"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABCSURBVC3BOxJAUBBFwXOHFUtlFiST2ROy95k3o1Tp1rJuGZG03rnuBx+BSZD8gkDM+3GSgEmU2vhMZkjCfVBqJYEXiHQeG2ix7e4AAAAASUVORK5CYII=" "1353" >}}
