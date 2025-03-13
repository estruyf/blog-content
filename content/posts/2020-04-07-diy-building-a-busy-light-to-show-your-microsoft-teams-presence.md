---
title: 'DIY: Building a busy light to show your Microsoft Teams presence'
slug: /diy-building-busy-light-show-microsoft-teams-presence/
author: Elio Struyf
type: post
date: 2020-04-08T08:04:04.676Z
draft: false
tags:
  - Microsoft Graph
  - Microsoft Teams
  - Busy Light
categories: []
comments: true
---

For many of us, working from home is mandatory these days. For me, nothing major changed. I was already used to work from home since I joined Valo 2,5 years ago. 

One thing that has changed is that my children are now at home while I am working. Luckily I was prepared for it (I thought). At the end of 2019, I bought myself a Luxafor wireless busy light. 

{{< caption-new "/uploads/2020/04/busy1.jpg" "Luxafor busy light"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAoACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APHfiJ4n17xPoGuan4O1vVtf8C2KX3h2Xw5rGp+OpIPA2uXepaJZWl9b6RrumaR9i1iDSpvEvh+3uNR+3WGs2kuqXek2jR6fBqsv4XmOXZtmuHyxT4hrYWjgK2DxtfCYbBYeEc2r0aGKw2LjiHWnilSwtSpjMLiaawLpVsNVw8IfWsRQxMoR/oPwx4vyjgzOM7x+M4Yo5/DMshzPJabxOJdCOA+uzpuliYP6rOtVnReGlanfDyq2SlUhTjVo4j8tpb6fzJMQ4G9+MHj5jx07dK+ljhK0YxXM3aKV9dbK19+u501uMsqq1qtSGFpU4VKtScKaUfcjOblGHw/ZTS+R/QH+2Zp2n+GtQ8FeFPDljZ6B4XsdIdrLw3ottDpWgWbSavocshtdHsUg063MksssjmK3QvJI7tlnYn5OlVqzxVLnqVJ3U0+acpXtVoWvdu9rK1+yPi6MIQoVeSEI7fDFR6VeyR+GFxBB9on/AHMX+ul/5Zp/fb2r7uLdlq9l18j5c//Z" "640" >}}

In the beginning it worked fine, but it had some limitations. To overcome some of these limitations, I even created myself a website to synchronize my Microsoft Teams' presence with the busy light. This synchronization is something the product can do by itself on Windows, but not yet on macOS.

> **Info**: The site can be found here: [https://luxafor-presence.azurewebsites.net/](https://luxafor-presence.azurewebsites.net/)

After a couple of days, I noticed my kids were running into my office. Although I asked them to look at the light, they answered that it was always off. Tested the device for some days, and it appears that it frequently lost connection or the battery died. Every time it lost its connection, I had to do some manual interactions to re-establish the connection.

## Lockdown extended

As the lockdown in Belgium got extended for another two weeks (and probably more weeks to come), I had to come up with a solution. 

Recently I created myself a Homebridge plugin to do some state management for my Flic buttons I use in the house.

> **Info**: **_Homebridge_** is a lightweight NodeJS server you can run on your home network that emulates the iOS HomeKit API - [https://homebridge.io/](https://homebridge.io/).

Last Friday, I got the idea to create a busy light with a Raspberry Pi Zero W and Homebridge integration.

{{< caption-new "/uploads/2020/04/busy2.png" "DIY Busy light created with Raspberry Pi and Pimoroni LED Hat"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAAEwSURBVDXByypEcRzA8e//9/+fMy4hmtwNUmyUbKxkpWxYeAbPoHgBT+AZPIIlG4qNcsslI5mGM85cyu005n9h4/NRuzuboVypY4NhfnaSJE1p2oDWBq01lbTKYylBhoZ6iSXjsXiHdT9EcUwURYjwx2OdQymF6euCwoBwU9RorXl+STg8PcW1HMMmx+DMNEopJPnoplRrB29pvGfUJuB9K09tskWt3uCf3D080eUt64sLOAxfLsN3Krw4PAHrPYGAyQ8WGC0s8WUV5/t7JANVdC5GxBBwhBBQKOTo+IS3tM59Q+js7qf5nJEdlHHVJjkRvPeICCbfP8JrWmd+ZZWK+aDtJqJ4cUkr98Pc8jivn9+4psWsbWyj4jaers5QpoOx8SnyPRFxbIi0oXJ9i4jnFy9Pg2s8WdgWAAAAAElFTkSuQmCC" "700" >}}

> **Info**: The Homebridge integration is just because I already had it running in the house, that way, it was easy to turn on/off. You can also do it without if you want.

## The hardware

To get started, you first need to get yourself some hardware. I went for the following equipment:

- The device: [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/): small, quick, and has a WiFi chip on board. I went for the one without the pre-soldered header.
- ~~The LEDs: [Pimoroni Unicorn pHAT 🦄](https://shop.pimoroni.com/products/unicorn-phat): this HAT gives you 32 (8x4) RGB LEDs.~~
  - It seems that Pimoroni does not sell these Unicorn pHATs anymore. Someone recommended to use the [Waveshare LED HAD](https://www.waveshare.com/wiki/RGB_LED_HAT) which works the same way.
- [pHAT diffuser](https://shop.pimoroni.com/products/phat-diffuser): The LEDs are bright, so to make it easier for the eyes, I bought a diffuser.
- [Pogo-a-go-go Solderless GPIO Pogo Pins](https://shop.pimoroni.com/products/pogo-a-go-go-solderless-gpio-pogo-pins): when you do not want to solder yourself.

{{< caption-new "/uploads/2020/04/busy3.png" "Pimoroni Unicorn hat."  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAADqSURBVIXBsUsCUQDA4d9575lGgkv3PC2zPYKGcGjrhijag6ClvX8tSxoCoQa9FomgKYdLIbswCBs89O7yXjYEEUTfZyRJog3D4D8pZrTWfJlOE/4iwijkxfd5G74TRyFzUmAXS1iWwjRNvgmtP2i26vS7HpXVNRYLK4yCEd1HD0spSktlspkMqXASkLNy9CZDatfnuM0z/OcewXhMrX5Ko3FBHEeIfF6xv31Edd3hqn3J7Z2LP7jnwevg3rQpLIfE0Q6CGSnTFO0KB7vHONU9vKcWg9c+G5snOFsO2fkFBD9ImcZWZWx1yG+fXTNXCCVALTYAAAAASUVORK5CYII=" "737" >}}

> **Info**: On the picture you can see where you need to place the pins. An instruction video can be found on the product page.

- [Pibow Zero W](https://shop.pimoroni.com/products/pibow-zero-w): when you want a simple case. I only used the bottom part of the case, but you can use the whole case with the Unicorn hat.
- 8GB micro sd
- 5-meter micro-USB cable

{{< caption-new "/uploads/2020/04/busy4.png" "Installing and configuring the Raspberry Pi Zero"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAAE8SURBVAXBOy9DUQDA8f953GrvbfWhTYMFISmDWgwGAzMxWn0Mo4/gQxgYJRaLxMAkgpB4RES86lmt4rrn3nP8fmJtddkFmQCtQOAQUlCtVimVelBeCmNisBbpEEACzpJYRzqdJuV5OOcwSYzFIZRCmzghjC1KCu7ensi080SZkIoqk5Ld+BkfrRW62eoQmZjOb8j64RE2gqGxIl4DTk5u6K2UWFqcRw0P9K1IITh+uscYgUwsflBhemSI2mA/hVxA4/kdeXpxw2O7xeNvSPjWxnx88dD8oK9aZnR4AK0UO/sH6GI+4NlFzE3Uucw/II2lkM/y2WxxfnXL1u4BgZ9GFss5prJdzNTHKXRnQYeoxHB2fs323iG5rM9f9Ieen12g8/rKxuYed1/vBOqTRvOby9sXtPb4/vlhsl7jH/XTg5h26+FMAAAAAElFTkSuQmCC" "700" >}}

## The software

The hardware cannot run without software, so for my solution itself, I made use of the following software/tools:

- [DietPi](https://dietpi.com/): lightweight Debian OS. Used this as well for my PiHole, and really like its simplicity.
- Once I installed the DietPi, I specified to install the following software from the DietPi Optimized Software list:
    - [RPI.GPIO](https://pypi.org/project/RPi.GPIO/): This software is available from the DietPi optimized software list
- [Homebridge](https://homebridge.io/): this can run fine on the Raspberry Pi, if you are not an Apple fan, you can try to use something else. You will only have to port the code from the Homebridge plugin I wrote to your platform preference.
    - The installation guide I followed was this one: [Install Homebridge on Raspbian](https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-Raspbian)

{{< caption-new "/uploads/2020/04/busy5.png" "The Homebridge UI"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAADCSURBVF3BwS4DURSA4f/ce5poZtPUJCLShA1DI8GGPgJe1DNIt7Z2iK3YtKElMy1zxz3Hysb3yenRnotnlmvnq+1wd/6LMaJnu31OdpSb+44cNhAJBIFVm7GcyWaYGWFWB+5elI+1UX8uSClRbo/YLEtEoBccdye81srz3Gm7zCoJg3KLy6trzi8mfLeJoD3MDC2KgpQSB4cV4+Mxdd0wnd7y9PCIqtKmH2KMhKZpMDOGwwFVtc/bbM7yfYGqIiL8+QXwSFj2L7Z8EwAAAABJRU5ErkJggg==" "1616" >}}

Once you got all the hardware and software installed, it is time to build the solution.

## The solution

My solution contains two parts: 

- **Lightweight Python API** for switching and turning the LEDs ON/OFF. I also added a status API in it to verify when the last call happened, what the CPU temperature, is and the color.
- **Homebridge plugin** for managing the presence

> **Info**: The reason why I split it up in two is that my Homebridge is running on another Raspberry Pi in the house, but it can entirely run on the same device. Another reason is that I don't like to work with Python 🐍, so I wanted to keep that part as simple as possible.

<blockquote class="important">
<p><strong>Important</strong>: To retrieve your presence, the Homebridge plugin uses the currently in <code>beta</code> Microsoft Graph Presence API. The API is at the moment only supported for work or school accounts. More information here: <a href="https://docs.microsoft.com/en-us/graph/api/presence-get?view=graph-rest-beta&tabs=http" title="Get presence">Get presence</a>.</p>
</blockquote>

### The busy light service

For the service, I wrote myself a straightforward API. At the moment it contains the following API endpoints:

- `api/on` - GET: turn the LEDs on, it will set a random color.
- `api/off` - GET: think you can guess what it does.
- `api/status` - GET: Returns the current RGB colors, timestamp of the last call, last called API, and the CPU temperature.
- `api/switch` - POST: This allows you to specify the colors to set. The following request body is required:

```json
{
  "red": 0, // 0 - 255 
  "green: 0, // 0 - 255 
  "blue": 0, // 0 - 255,
  "brightness": 0.5, // 0.5 is the default, you can specify between 0.4 and 1. This property is optional.
  "Speed": null // Optional: allows you to set the blinking speed. If you want to get more attention for your busy light.
}
```

<blockquote class="important">
<p><strong>Important</strong>: You can find the code of the service I am using here: <a href="https://github.com/estruyf/unicorn-busy-server" title="GitHub source code of Unicorn Busy Light">https://github.com/estruyf/unicorn-busy-server</a></p>
</blockquote>

The quickest way to start is to get the files copied to your Raspberry Pi (if you want, you can install Git, which makes it easier to clone and fetch updates later). Once you copied the files, you should be able to run the `install.sh` script. This script installs the required Python dependencies.

> **Info**: The installation script was updated recently, and only supports `Raspbian/Ubuntu`. The original installation script is provided as a fallback script. In case you are running another distro, feel free to submit a PR or use the `install-fallback.sh` script.

Once all dependencies installed successfully, it is time to test out the API. You can execute the following script to get the API up and running: `python3 server.py`.

{{< caption-new "/uploads/2020/04/busy6.png" "Python API running on DietPi"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA9SURBVDXBgQ2AIBAEwf0TarAAKrD/xvQ5HhMTZ+Ic1+6tswHngwvsiddCBASfVjqYBLYpREWxJAhxZ/J7AYFzGTOK6tbbAAAAAElFTkSuQmCC" "673" >}}

**The following actions are not required anymore, the installation scripts will automatically perform these steps for you. Just in case you want to know what is happening in the scripts, I leave the manual steps here so that you can verify the installation.**

When the API is up and running, you can test out the API endpoints like `api/on` and `api/off`. If you verified the API works, you could create a start-up service. That way, each time you reboot the Raspberry Pi, it will automatically start. The steps I used for this are the following:

- Copy the service file via: `sudo cp busylight.service /etc/systemd/system/busylight.service`.
- Start the service `sudo systemctl start busylight` (to see if it is correctly copied and can start). If you want, you can use `sudo systemctl status busylight` to verify the status of the service.
- Enable the service: `sudo systemctl enable busylight`.

That is all you need to do for the busy light API service.

### Homebridge plugin

Homebridge is good, but I must confess, I have a little love/hate relationship with it. First of all, the installation for me went smoothly. The software is built on Node.js, which makes it easy for me to start building my integrations.

Sadly it is only available in JavaScript, and no definition files are available, but that did not prevent me. I had to do some digging through the code to understand how it internally all works. Luckily I already had a bit experience; a week or two before, I created a plugin already for stateful switches.

<blockquote class="important">
<p><strong>Important</strong>: You can find the source code of the plugin I wrote here: <a href="https://github.com/estruyf/homebridge-presence-switch-msgraph" title="GitHub source code of Presence Switch with Microsoft Graph">https://github.com/estruyf/homebridge-presence-switch-msgraph</a></p>
</blockquote>

This plugin is available as an NPM dependency as well. By providing it via an NPM dependency, it allows you to install it in Homebridge from its UI quickly.

- Go to your Homebridge site and log in
- Click on plugins
- Search for: `Homebridge Presence Switch Msgraph`
- Click on install

Once installed, go to the `config` section of Homebridge, and add a new `accessory` to the `accessories` array which looks like this:

```json
{
  "name": "Presence Indicator",
  "accessory": "presence-switch",
  "appId": "707e1e80-fd26-46dd-bdd1-6d8e1a585eea",
  "interval": 1, // Polling interval in minutes
  "setColorApi": "http://0.0.0.0:5000/api/switch", // API could be different in your case
  "offApi": "http://0.0.0.0:5000/api/off", // API could be different in your case
  "onApi": "http://0.0.0.0:5000/api/on", // API could be different in your case
  "startTime": "8:30", // Optional: Specify the time you start time
  "endTime": "18:00", // Optional: Specify the time your workday ends
  "weekend": false,  // Optional: Specify if you want to turn on the LEDs in the weekend
  "statusColors": {}, // Optional: Allows you to set the status colors for available, away, busy
  "lightType": "", // Optional: Not yet implemented
  "debug": false
}
```

<blockquote class="important">
<p><strong>Important</strong>: The <code>appId</code> (also known as the client id) defined in the config is multi-tenant enabled and will ask you for the following permission scopes: <code>Presence.Read</code> and <code>User.Read</code>.</p>
</blockquote>

After making any change to the `config.json` file, you have to restart the Homebridge service to allow it to recognize the new accessory.

```bash
sudo hb-service stop
sudo hb-service start

OR

sudo hb-service restart
```

If the accessory gets recognized, you should see the following message appear in the console output of Homebridge:

{{< caption-new "/uploads/2020/04/busy7.png" "Accessory asking to sign-in to acquire an access token to call the Microsoft Graph"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAklEQVR4AewaftIAAAAqSURBVGP08PT4/+bLV4bvv34x8DExMfz+/Zvh////DDDw//9/BkZGRgYAlycQmtqYI9UAAAAASUVORK5CYII=" "1385" >}}

The accessory will ask you to sign in via `https://microsoft.com/devicelogin`. Internally the accessory uses the Azure AD Device Flow. As you can only retrieve your presence via delegated permissions, the device flow is the cleanest way. Once you see this message appear, you have 15 minutes to sign in to the service. 

When you signed in, it shows a message that an access token is acquired. The accessory will now start to poll the Microsoft Graph each minute or the number you defined in the config.

One more thing, in the Homebridge UI, you will have to turn on the **Presence Indicator** accessory. Otherwise, it will just call the OFF API.

{{< caption-new "/uploads/2020/04/busy8.png" "Turn ON the presence switch. You can also do that in iOS Home."  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAADKSURBVDXBwUrDMBzA4d8/TbfmAdwQPPQJ+jweetGTBw8+rBcFWSmCFNZQWuJiSBPpYN8nTdNk7z3GGKy1bJRSiAhVVWGMoes69OnrEyVcpcyVACFmEGGTUkKrHNkVQqGEEBNaCQj4v5UQEzf6cDzycH8gxMz7xwnnPZtEZr8v2eSc0Y9Przy/vFHfVbRtS9/3WGuZpom6rlmWhXmeUTuJ5N8zN5fLhbIs2XjvKYoCpRR6GAaGn2/seWAcR5xzrOtKCAHnHCklvPf8A6XMZgsH5xd8AAAAAElFTkSuQmCC" "527" >}}

### Azure AD App (Optional)

If you want to create your own Azure AD app. All that it requires are the following actions:

- Create a new Azure AD App in your tenant. More information can be found here: [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
- Add the `Presence.Read` permission scope to the **API permissions** settings
- On the **Authentication** page, enable **Treat application as a public client** (underneath advanced settings. You require to enable this setting for the device code flow.
- Once you performed these steps, you need the `appId` for your presence accessory. You can find this ID by clicking on the **overview** tab and copy the **Application (client) ID** into the Homebridge `config.json` file.

{{< caption-new "/uploads/2020/05/busy1.png" "Application or client ID required for your presence accessory"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABGSURBVBXBQQ6AIAwAwa3UFrnr/59nYmKUQw9GwDgj+3EOT6BmmDmqiUmEX++dgSACWlxxd1qtPPdFvA1bMmXdiAiYM30IHyODFgyjNSl0AAAAAElFTkSuQmCC" "1183" >}}

That should be it. I hope this article helps you to get your kids/partner out of the office. Feel free to share your feedback/ideas/results.

> **Extra**: If you want to test out the Microsoft Graph endpoints, you can make use of the Graph Explorer which is available here: [https://developer.microsoft.com/en-us/graph/graph-explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).

## Results

When everything is up and running, the LED should automatically change color when your presence changes in Microsoft Teams.

{{< caption-new "/uploads/2020/04/busy9.png" "Status is set to busy"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAGMSURBVAXBy24SURzA4d+5DFAK0xFF7oXUqokxMdVVE6OJCxdNXBjd6sIn6Xu48RFcNPoALrqqtdGd2KRCA8jdKnRwzvn7ferj+7finJA4j/OCiNCo1fHOMRnPqDfKGK2xpz/65MOIf164XK04/3nG0eFnBqMJqVSG3GxMsVjAnhwfEccOTIDHMB0NmUxn4IXoSsjw5AutaANb3Wwyn13Q/t6m0+2xV7jGbedZF8275V9mi5jLvMNGpRYq56jOO4x/OcLEURYhVmCVwnkPWqNr1QpPH+5QCNfJZTwZDUGgWHhAASIoY7CDbpdB94zTgTD8nWKa8/RjYWoEARSgjMYef/3GdDKnd94llCUlvUHFGpaicN6DgNIau1mr0Gw0UMawWhaJR1PSgSGDxpMQANZaTKIX+9m1iF5/yN179zkcDfjkhI4xzHxCMBxRrlzH7j56gZIM7YMP5KMi1c1twmBF4iH754I7a2muPnmMSaWz+/WbD9jde8VC8hhi3rx+RrPV4MatLXZePqe0vcV/RMquYJcrWuoAAAAASUVORK5CYII=" "700" >}}

{{< caption-new "/uploads/2020/04/busy10.png" "Status is set to away"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAAAklEQVR4AewaftIAAAGoSURBVBXBzWoTURiA4fc750z+U+IkNWkoQlFBRFfiwoXuxCsQN+LeG/BivAKFIgVx4UZBpIQKhoRaEyLFVgVtTdIkziTzc+aozyNvXj132niIFpQo+v0enc4ucRKTxAnWZtjMYqLYUtQ5nIXJbMJoNOTH8SGLxYLUWuqlKqmXw7x7+xrfb1Bdq9HZ22X0uUsSB1RKBc7mAeNvE5TvY0qVNaIk4rj/AYlOeHj/GutVx9HPJTsvu8xcRi7LMNVGm2qtiY5PWGnFvZttTk9/Mx0vKRiYCf841Ga7xe1bN/D9BpnL+BPGLBNLmjkyB05AxGHiYMr+x/fMVwrtFajUm6ySFKWWgOM/Acx4OkUpTZA4tCkg8RxPNFoZBEEERAR1MBwyWYRsbz9j8GVAEEWk4RzsCkRQCIJg/M0NztWbtBptTKVMb3+CX4wJI0uaObSAUoI5OhtTq2/x6PETPh30ePpiBxtNKeaF5UrIaw+lPMzdOw+4cvk6Jmcor1/gcNAlnOcJFwH5cpHWZgPrFTCXLl4lU4ZwZfn1/Ss5bahtbOHOW2xqSVJLnCT8BckDwrXx7VY7AAAAAElFTkSuQmCC" "700" >}}
