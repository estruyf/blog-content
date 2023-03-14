---
title: '#DevHack: Installing Hugo on Windows with WSL'
slug: /devhack-installing-hugo-windows-wsl/
description: Get to know how you can install Hugo io on Windows by using Windows Subsystem for Linux (WSL) in combination with Homebrew.
author: Elio Struyf
type: post
date: '2021-08-01T15:38:52.132Z'
lastmod: '2021-08-01T15:38:52.132Z'
draft: false
tags:
  - Homebrew
  - Hugo
  - Linux
  - WSL
  - Windows
categories: []
comments: true
keywords:
  - Windows
  - Hugo
preview: /social/284e52dc-61ec-4a15-87f8-1308039457dc.png
---

There were a couple of reasons for me to test out Windows 11, but the main reason was to give a new life to a device I hardly used anymore.

Ever since I bought my Mac Mini for the office, my previous desktop device (running Hackintosh) kept turned off. To make sticker printing easier in the office, I thought to give it a new life and install Windows 11. That way, I could see how cool/uncool it is compared to macOS.

Since I installed Windows 11, I started to like it. It is something new, but not only that. Windows has innovated over the years. With Windows Subsystem for Linux (WSL), it became pretty powerful and can use many tools I am used to on macOS.

I wanted to check how easy it is to get my blog developer workflow up and running on Windows 11.

## Background information

For my blog, I am using [Hugo](https://gohugo.io/) for statically generating my website. Besides that, I use a couple of node.js scripts to create specific pages/content automatically.

## Installing Hugo

On macOS, I would open my terminal and type `brew install hugo`. I thought this would not work for Windows, so I went to the documentation. To my surprise, I found out that Homebrew also works on Linux.

WSL is what I will primarily be using because it makes Node.js-based solutions install and run faster and allow me to use NVM. So, Homebrew would be a great approach.

The steps I had to take:

- Install WSL: `wsl --install` (*optional if you have not yet installed it* - more information on [how to install WSL on Windows](https://docs.microsoft.com/en-us/windows/wsl/install-win10))
- Go to the [Homebrew site](https://brew.sh/), and copy the install script. Run the script in your WSL terminal instance.
- Once Homebrew is installed, you need to run a couple of extra commands to make it available (these can be found here: [Homebrew on Linux](https://docs.brew.sh/Homebrew-on-Linux#install)):

{{< highlight bash "linenos=table,noclasses=false" >}}
test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)

test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)

test -r ~/.profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
{{< / highlight >}}

- Now that the `brew` command is available, you can run `brew install hugo`.
- Once completed, you will have access to the `hugo` command, generate a new site, or build/serve an existing one.

{{< blockquote type="Important" text="Hugo will only be available in your WSL environment this way. This is not an issue on my end, as WSL is my primary terminal instance." >}}

{{< caption "/2021/08/hugo-in-wsl.png" "Hugo running in WSL"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAB5SURBVF3BWw6CQBREwdNX4iMIC/Db/a8NY0YHR/sqHxpilU6nc861chh7thG0TeC58SMREt2uH9gPI7dyo6WZHxXb/IvjsSciaM/GvVZs80+IrlwL11Kwk00ISygTO1nrpukCgiQJFkLiI1nrXmkyk4URwhgQ4ksSb/JUOvfs5jv0AAAAAElFTkSuQmCC" "1115" >}}
