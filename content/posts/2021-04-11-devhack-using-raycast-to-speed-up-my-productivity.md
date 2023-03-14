---
title: '#DevHack: Using Raycast to speed up my productivity'
slug: /devhack-raycast-speed-productivity/
author: Elio Struyf
type: post
date: 2021-04-11T16:23:16.302Z
draft: false
tags:
  - Application
  - Productivity
  - Raycast
categories: []
comments: true
preview: "/social/d1986bd4-a5e8-4da9-98ed-a8f2e9875f61.png"
---

It does not happen often I write an article about a tool, but this time, I felt this tool deserved some extra attention.

[Raycast](https://raycast.com/) is a tool that you can compare to Spotlight from macOS and [Alfred](https://www.alfredapp.com/), and yes, it is macOS only. 

Many people use Alfred, and I have been using Alfred since I had my first Macbook. The biggest advantage of these applications is that you can quickly search your apps or execute tasks. What differentiates Raycast is that it is free, and it is straightforward to add custom scripts. You can write these scripts in `bash`, `python`, `nodejs`, and more.

{{< blockquote type="Important" text="They listen to feedback. I submitted feedback about the font size. In my opinion, it was a bit too small. In less than a week, the Raycast team released an update with this functionality implemented. Not only that, the team even sent an email thanking me for the feedback. ❤️" >}}

## How I got interested

It all started with an order on [Pimp Your Own Device](https://pimpyourowndevice.com). There was a bug in the search React I wrote for the site. Luckily, the person who wanted to place an order was so nice to send us a message. 

We talked a bit, and I saw she was working at Raycast, so I asked what it was. That is how it got me interested in testing out the product. I removed Alfred and installed Raycast instead.

## How can it help you

Apart from searching your applications, the most significant productivity boost it will give you is the custom scripts you can add. For sure, you will have many manual tasks you have to do daily to start your work.

{{< blockquote type="Info" text="Follow the steps in the following repository to get started with custom script creation for Raycast: [Raycast Script Commands](https://github.com/raycast/script-commands)." >}}

For instance, what I do frequently is open the Azure Portal. As I have various accounts, I always need to open the correct browser with the right profile.

My first improvement would be to create a script to open the portal in the right browser and profile.

{{< highlight bash "linenos=table,noclasses=false" >}}
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open Azure Portal (personal)
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🚀
# @raycast.packageName estruyf.azure.portal

# Documentation:
# @raycast.author Elio Struyf

hs=`hostname`
if [[ $hs == "ninja.local" ]]
then
  open -a "Google Chrome" 'https://portal.azure.com' --args --profile-directory=Default
else
  echo "Implementation for second machine"
fi
{{< / highlight >}}

{{< blockquote type="Info" text="The script is simple. In my case, I check my hostname to know where I am running the script as I work on two machines." >}}

{{< caption "/2021/04/raycast2.png" "Run the open Azure Portal script"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABASURBVDXBMQ6AMAwEwbVCqvBF/78kBQIpyvmomInM9DUnP+1Naw1JqApsxjg57uclgIhAErZZa1FV2Kb3jrT5AHRgJLx7oSb+AAAAAElFTkSuQmCC" "789" >}}

That is not it. Another improvement that makes things even quicker is to get my development flow started just by running the script. Why? In my case, when I am developing for a Microsoft Teams project, I need to open:

- Browser with the right profile for Microsoft Teams
- Browser with the right profile for the Azure Profile (another account)
- Visual Studio Code with the project
- Terminal opened in the project folder

The script for this looks as follows:

{{< highlight bash "linenos=table,noclasses=false" >}}
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open Squarl project
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🚀
# @raycast.packageName estruyf.code.squarl

# Documentation:
# @raycast.author Elio Struyf

hs=`hostname`
if [[ $hs == "ninja.local" ]]
then
  code ~/<path-to-project>
  hyper ~/<path-to-project>
  open -a "Google Chrome Canary" 'https://teams.microsoft.com/' --args --profile-directory="Profile 9"
  open -a "Google Chrome" 'https://portal.azure.com' --args --profile-directory=Default
else
  echo "Implementation for second machine"
fi

{{< / highlight >}}

Now I can just run my command, and it will automatically open all these instances.

{{< caption "/2021/04/raycast1.png" "Run the get started with developing your project"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABBSURBVDXBMQ6AIBBFwWeAinvK3aGxMAbC7l9j4cxxthajd37bjJwSLiF3IqDWSn7uC3MnJCSxzZgSn4iglMJakxcQFSenq0FITAAAAABJRU5ErkJggg==" "792" >}}

One more, for my blog, I place all the images in a `year/month` folder. This structure is still leftover from the WordPress days. I just kept the format. Each time I write an article like this one and want to add an image, I have to open that particular folder. With a custom script, I can now quickly open that folder, and if it does not exist, it will be created. Great for when we started a new month.

{{< highlight bash "linenos=table,noclasses=false" >}}
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open blog screenshots
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🏙
# @raycast.packageName estruyf.code.squarl

# Documentation:
# @raycast.author Elio Struyf

crntYear=$(date +'%Y')
crntMonth=$(date +'%m')

monthDir=~/blog/web-eliostruyf-hugo/static/uploads/$crntYear/$crntMonth
[ ! -d "$monthDir" ] && mkdir -p "$monthDir"
open $monthDir
{{< / highlight >}}

{{< caption "/2021/04/raycast3.png" "Quickly open the blog images folder"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA6SURBVGXBQQ6AMAhFwYdpY29p759wAAj0G9fO2LO33J0fiT6Hy4x7LUZEYmYg0d1Ioqr4SGLMSUbyAi/bHcqPxv+8AAAAAElFTkSuQmCC" "790" >}}

{{< blockquote type="Tip" text="For the icon, you can add a base64 encoded image. That way, you do not have to link it to a local or online file." >}}

*I hope [Raycast](https://raycast.com/) will improve your flow as well*