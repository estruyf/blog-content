---
title: Ringing the doorbell on your Sonos speakers
slug: /ringing-your-doorbell-on-your-sonos-speakers/
author: Elio Struyf
type: post
date: 2020-05-27T20:08:25.016Z
draft: false
tags:
  - Development
  - Sonos
  - Home automation
  - Alexa
categories: []
comments: true
---


Ringing your doorbell on your Sonos speakers

Ding dong!!! Earlier this week, I changed my old doorbell to the [Eufy video doorbell](https://www.eufylife.com/products/604/656/video-doorbell). When it arrived and wanted to install it, I found out that my current wiring with the intercom system was not supported. Luckily the doorbell has a battery, so instead of running on power coming from the old wires, it will run on the battery for six months.

**Info**: I also use the security cameras (first version). They stated that the battery lasts for one year, and the current cameras are still running on their first charge for more than a year.

Back to the doorbell, as I could not use my existing wiring, that also meant that I could not use my indoor chimes. Of course, this doorbell comes with a chime/home base station and notifications.

## The chime/doorbell issue

As I am living in a house, the chime does not reach very far. 

Like the Ring and Nest doorbell, Eufy also supports Alexa. With Alexa enabled, you can announce on your Echo devices when somebody rings the doorbell.

For other Alexa enabled devices, Amazon suggests creating routines as I have a couple of Sonos speakers in the house (which are all Alexa enabled). I found out that Sonos has not yet implemented support for routines.

There goes my solution to playing a doorbell sound on my speakers. When I searched on the internet for the options, the only thing I could find was either use IFTTT or a custom Alexa Skill.

IFTTT has a Sonos connector in beta, but the problem is that it does only one action. Like starting to play, pause, ... For a doorbell, this would work. When somebody rings, play the doorbell sound.

{{< caption "/2020/05/sonos1.png" "Sonos connector for IFTTT"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACySURBVE3BMa5GQBSA0c/kIkI0NAqFxk6sR2IVCkuxqSkkGpEQzTW89yskzvH+fvjo+54gCOi6ji/hQ1VpmgZjDPd9Y4zhZfiYpgkRIYoirLV8ybZt7PvOIwgCiqLgcZ4n0zTxSNMUGYaBcRxRVdZ1pa5rRIRlWVjXFVWlbVsMP57n4ZwjSRJEBN/3ieOYsiwJw5CHXNfFPM+8nHMcx4G1li/J85yqqniVZYmqYozhlWUZ/xTrSON4CurzAAAAAElFTkSuQmCC" "1364" >}}

The play stream action can be used for it and worked on the first try. BUT, the problem is that it kept playing the doorbell sound on all speakers. So quickly turned this off again.

I also thought about the custom Alexa skill, but that would involve a lot more work.

## The DIY approach

The do-it-yourself approach is always better, as whit this approach, you can create how you want it.

I went for the following solutions:

- Create an API running on my Raspberry PI, which allows me to play the doorbell sound on my speakers.
- Use `ngrok` to make the API available to create a tunnel to the API endpoint.
- Use Alexa in combination with IFTTT to call the API endpoint.

This solution took me one hour to create. Like I mentioned before, DIY means that you can make it the way you want it to work. In my case, when somebody rings my doorbell, the API will check if I am in a meeting. When that is the case, my office speakers will not play the doorbell sound (I still get the notification on my phone, so that is enough).

{{< caption "/2020/05/sonos2.png" "Playing doorbell sound on all speakers"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABgSURBVBXBQQoDIQxA0W8nEYK49TDddNH7n6SrRBAHnLHte+n5em82rGsx56TWynme5JxJJKIHEYH8oKLc+6aUgpmx1kJVGWMwP5M/cXdUFRHlOB703jEz3B0RobVGRPAFqx0pZ4ZIS20AAAAASUVORK5CYII=" "247" >}}

## The code

You can check out the project here: [https://github.com/estruyf/sonos-doorbell-api](https://github.com/estruyf/sonos-doorbell-api). I removed the logic to check if I am in a meeting, as that does a call to my [Busy Light Raspberry Pi](https://www.eliostruyf.com/diy-building-busy-light-show-microsoft-teams-presence/).

## Installation and configuration

To get started, you first have to clone the repository to your device. I am running this on one of my Raspberry Pi's. You can find more information to start up the API in the GitHub repository.

> **Info**: An excellent way to keep the API running is to use [PM2](https://pm2.keymetrics.io/). This tool makes sure your API keeps running.

When the API is running, you will only be able to call it from within your local network. In some cases, this might be enough. The only option was to trigger it from Alexa, which meant that I had to make it publicly available. 

An excellent tool for this is [ngrok](https://ngrok.com/). This tool allows you to create a tunnel for the website/API from the localhost you want to expose. 

I made use of the following `ngrok` service approach so that it always starts-up automatically when my Raspberry Pi reboots: [https://github.com/vincenthsu/systemd-ngrok](https://github.com/vincenthsu/systemd-ngrok).

My `ngrok.yml` file for the service looks like this:

{{< highlight yaml "linenos=table,noclasses=false" >}}
authtoken: <ngrok-auth-token>
tunnels:
  sonos-http:
    proto: http
    addr: 5050
    bind_tls: true
    region: eu
    auth: "<username>:<password>"
{{< / highlight >}}

Once the service is running, it will create a forwarding URL like `https://<id>.ngrok.io`.

<blockquote class="important">
<p><strong>Important</strong>: If you use the free plan, this endpoint will always change. When you sign up, you can quickly check the latest tunnel endpoint on the ngrok dashboard.</p>
</blockquote>

## Setting things up on IFTTT

Once the API and ngrok are up and running, it is time for the configuration on IFTTT. 

{{< caption "/2020/05/sonos3.png" "IFTTT applet for ringing the doorbell"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAAEISURBVG3BMUoDQRSA4f+9nWUSiYgKkaBiIVGrFJJGD5DKLr03kBzAw6TJXewEW7MWgm0Qd4O6u5N5ahFYJN8ndw/vtp0qizLiVcjryCau20pQgV3v8AqPi8gm7mtl+ET4riKdVDhoJ/TayjIYWR5YcyEae15REYoq0m0p71XkozKaNFEhRCNEo+0EFWglwkkn4WzHsab8UoGiNqJBURtbTjCgqI01V60MEUXFUAGfwEuxIq8iTc4p5FXkMxjL2viTCux7pcndnyuz2YyyLPlPRDi+GnF92sNNp1MmkwlpmjIYDAghoKpkWYY/6nNzecvr0xtuPB4zn88py5Km4XCIupT+8pnRxSE/cltmYBh9MhkAAAAASUVORK5CYII=" "726" >}}

Start by creating a new applet. For the `this` option, pick Alexa. To make it work with an Alexa routine, take the `Say a specific phrase` trigger and specify a phrase like: "ring my doorbell ding ding ding".

{{< caption "/2020/05/sonos4.png" "Alexa doorbell phrase"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAAEkSURBVI3Bz0oCQQDA4d/szO7OKEb+C0op7BAYHurYI/QCvVvPUA/QKwR1t0vtIQRZD5KNts7sTiZ0iYi+T0yn05DnOev1GiEEWmuccwghqKoKay3D4RDVaDSQUlIUBcYYnHPM53O01nQ6Hay1aK1RqTbE2vCt9J7dVptISr4kpkYEqOsny/PC4ytwVcD6wE/n7RiVRHB1GCMIlGVFCIGyLImTBO8ctXqdh3yNSiJBczHBWstBt4uIBDKWeL/CVQ6ZBlKZopY+8Jj2YAfGBVshQFEFtiZgfUD5AHevH/zlrB0T8U+KjYu9hOOG4jfZu8f6gGLjsq95y8bkeY4xhuVyyWw2YzQacXp0wk22Qu3XIm6zFc1kAL0BWy2gD/fA/GVFry75BILEfC+9r1pmAAAAAElFTkSuQmCC" "922" >}}

For the `that` option, pick the `webhook` action. This action allows you to create a web request.

{{< caption "/2020/05/sonos5.png" "Web request to your Sonos doorbell API"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAYAAAB/sn/zAAAAAklEQVR4AewaftIAAAHiSURBVG3BP2sUQRjA4d/svrNze5ucF5LziKCdEEEICucHsBEEv4BEW2vxa1hYWQsWoo1YCDZ2gYAgohYWQcEgSWE4421y2Z39M86cGiPkedSDdeuMKG5dLMmyjLIsMcZgrSWKIsqyJEkSxIiiq2Fra4vxeIzWmm63S1EUGGOo65o0TZE7V4TW4V3AOYe1liiO0KKZURArkBefGh69rdkrHP80QEOwkCqerxnEObg7mmKafUSEuq7RWjMcDgmefqwJBG/QqUjqEmNAKUUcO8ofX6l0xHxyhkDwNr73yaSHFJqmdZwyjnPZFFs37B02gCB4Tz60xBFEqsI56GrH6aQhsJEjELybq4JScGA5RhNs7rYEgrcY7TGYF3q9Hsflec6k6BAI3sP3c0QKnLMoxRGFoauZEbwbK8K8gcMKppXjuC9jRyB4K72cpMlBYOnsEmmaEuR5zqumQyB499+k1G1K3fJHyW8J/dQRCN618zEHFSf69tMRCN71lZhBpjjJ43c1geDde2mRSKEUVA0sz7WMFnYJdopFQCN4+xbP8dfmWLE5HhD0U0UgeHEEw0yB4j9TyxHBu31JuDrYYXt7myzLmEwmaK1ZvTxi7VlJIFkCrz+3NO0yyDKUgGFmfaNioaMIfgHjK6yI9v98uwAAAABJRU5ErkJggg==" "830" >}}

<blockquote class="important">
<p><strong>Important</strong>: As I configured basic authentication for ngrok. I need to specify the username and password in the API call.</p>
</blockquote>

{{< caption "/2020/05/sonos6.png" "Finish the applet"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAADfSURBVG3Bu04CQRSA4f+cmcVdLyQaNcYYEmJpeAHfv7ahoXALewtuAyozc5yVrFDwfWLFdDpls9kQQmA4HDKfz6nrmpQS4/GY0WiEp5hMJvRCCKgqTdNwzLeryNvnjgNlb0vv9X6Ab5eR2SJyWQkf68RdrbwvI8eeLhxKMVD4SsbzlePx3HGKp2hXCRVIZjgRKuWPceApvMDNmaICAlQqGLD4ySx2mY6nyIAB22Rkg2RG7eA7Gz1Px2CbjI4ZhJgJEbwIlQgdT5EBM1jHTMz8y2L0/EPjeLn27DlOua2VX8hRXFnBHgPKAAAAAElFTkSuQmCC" "718" >}}

When you created the applet, it is time to configure your Alexa routine.

## Create an Alexa routine for your doorbell

On the Alexa app, go to `routines` and create a new one. Choose on when this routine has to start up. For me, this is when my doorbell gets pressed.

The action which I want the routine to perform is to start the IFTTT applet.

When you linked Alexa with IFTTT, you should see the phrase you inserted when configuring your IFTTT applet.

{{< caption "/2020/05/sonos7.jpg" "Alexa doorbell routine"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAA0ACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP5ydXNnDBPFaasbZ3hgefTo7XXbZrx2SJAk4u5TbMBEEuI5DFCrI5UBtsYb+i05Npyi5bpSbg7W2f8AN5bu33n4HZQhyxahom4KM43vZ6pylG6ve+zu2nsc8Lq+HA+0gDgAS3nH/katuVf8+19z/wAzDn/6fP8A8Ch/8idm3gr7Rc3S/wBoRQ/Z5ZoMQ2BVH+zM8e/Yb07DJ5e5gGIBJPJyTz1Kzi7KK6Lr3t1bOmjh+eKbqPVc2sU2r9NOW9u9r97nPQvaCGINpGlysI0DSyNrQkkYKMyOItaiiDufmby4o49xOyNFwo61OKSTo0m0km2612+7tVSu99El2RxOlUbbWKrxTbaio4a0U3subDylZbLmk3bdt6n/2Q==" "532" >}}

Save this routine, and that is it. Go and press your doorbell.

**Ding dong**
