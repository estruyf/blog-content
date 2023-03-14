---
title: Running the CollabDays Benelux event on Azure Static Web App
slug: /recap-of-collab-days-benelux-running-an-event-on-azure-static-web-app/
author: Elio Struyf
type: post
date: 2020-10-25T10:52:45.271Z
draft: false
tags:
  - Community
  - Azure
  - Static site
  - Azure Functions
  - GitHub
categories: []
comments: true
---

This article recaps the CollabDays Benelux event that [BIWUG](https://biwug.be) and [DIWUG](https://www.diwug.nl) organized together and happened on the 24th of October. We held the event virtually due to Covid-19, like most of the events in 2020. We decided that we wanted to do this as a virtual event together around May/June timeframe to make sure we could let it happen.

Our initial plan was to book a meeting room (the Benelux war room) to communicate and coordinate the event. Unfortunately, due to the increasing number of Covid-19 patients in the Netherlands and Belgium, we had to change those plans a week before the event. We decided that it would be best that we would host it from two locations. 

## Meet the team

Before I start giving some numbers, let me thank each team member for making this event a huge success. Running an event is not something you can do on your own. It takes a lot of effort from each one of us.

{{< caption "/2020/10/collabdays1.png" "The CollabDays Benelux team"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACQSURBVF3BQQuCMBiA4dfaaIqHQRGe8+D//0VBB6FDmCbuY9m36DAIn6cYhiHFGMnquqaqKrbMNE3sizfzstJ1Hdlyv3J7BOzB0bYXTNM0pJQ4sVEfOZsIFKgqu3me6fueEAL/PlowTi+e44iqYkSElBIiQgiBsiz5sdbivednXVeM9x4RQVUxxpA553DOkX0B4MZEJqOQSOUAAAAASUVORK5CYII=" "707" >}}

Thank you [Karine](https://twitter.com/kboske), [Jim](https://twitter.com/Ptidaelus), [Rick](https://twitter.com/RickVanRousselt), [Thomas](https://twitter.com/ThomasVochten), [Maarten](https://twitter.com/maarteneekels), [Bram](https://twitter.com/bramdejager), and [Albert-Jan](https://twitter.com/appieschot).

{{< caption "/2020/10/collabdays2.jpg" "Group picture of the whole team"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAgACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APLPjf4M0P8AY68J+MPijb/GX4WXsvhnxnfeIzoOh+P/AOzItds/G1yfGPim+8NDxvongnX5NW03x94ouxYJB4NuPDWo+FNJ1NNAW51vU7TxUfs6XjVxRxFnmb4TIcfm2aZ5jpyxUqNHKP7S4KqUaKlWxdHGQpYuKcMRz4jC1HOph7Ymth3LFNUIUWf8Qk4Nx9fCYfiXIcvyrIsbg54fMs+eZYrL+OcHi5wp4bAYnB4uk3hMNDDwwmBqubpVp06UcTFU40MXXv5jY/ttfse31lZ3up/tZSpqV5a291qCWnwy8WtapfXESS3a2zf26m63Wd5BC21cxhTtHQf01lLwNLKsspVKdGnUpZfg6dSFTL6c6kJww1OM4VJxwnLOcZJqUo+7KSbWjPyTNfCfMMRmeY4jB5+1g6+PxlbCpcR51RSw1XEVJ0LUaeZqnSXspR/dwShD4Y+6kf/Z" "2048" >}}

## Stepping away from Microsoft Teams

Maarten explained it pretty well in Discord yesterday:

{{< caption "/2020/10/collabdays3.png" "Why we were not using Microsoft Teams"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAAA3SURBVDXBMQ6AQAgAsII+zsHJ///DxHCgi20c5zUEs2wx1lqeajMEBt0t67npYqhG7jJT+ET4vQjoGLuytlfTAAAAAElFTkSuQmCC" "1299" >}}

Going back to June, we outlined a plan to get the best community feeling during the event. Most of the attendees come to our event to connect with others and, of course, also to learn. That is why we wanted to go for Microsoft Teams meetings instead of Microsoft Teams Live events.

We figured out that this might create issues as attendees can accidentally start sharing or unmute themself. We experienced something else in other events because attendees do not join the meetings correctly and lose the ability to chat. Microsoft Teams Live events would solve the first issues, and so we formed a new plan. 

Some time passed, and each one of us attended multiple virtual events. We all noticed that you do not get the community feeling we were aiming for with Microsoft Teams Live events. Besides that, the speaker's experience is not always that simple for joining the right tenant and following up on questions. We had to think about how we could make our attendees feel more connected and provide an easy solution for our speakers to present their content.

## Going for Streamyard and Discord

During Ignite, [Luise Freese](https://twitter.com/LuiseFreese) and I were interviewed by Microsoft with a tool called Streamyard. I was impressed with its simplicity and learned that Microsoft uses it for other community events like Hacktoberfest. After a couple of meetings and tests with the team, we agreed that Streamyard would be the tool to use. 

You can compare [Streamyard](https://streamyard.com/) to OBS running in the cloud, but a lot easier to configure and maintain. Plus, Streamyard allows you to stream to many sources like Youtube, Facebook, Twitch, and more.

{{< blockquote type="Info" text="The only downside we found is that videos in Streamyard are limited to 5min and 100mb. Our sponsor videos were about 6min and 250mb in size. To overcome this, we split all videos into two parts. Next time, we could create a PowerPoint that we keep rotating before/after each session on a VM." >}}

To engage with our attendees and provide them a way to connect with the speakers and other attendees, we decided to use Discord. We went for Discord because it does not require you to have an account or application to start chatting.

## Bringing the experiences together

To make it as easy as possible for our attendees, we chose to create a website. The website we wanted to create needed to fulfill the following requirements:

- Easy to use
- Switching between channels/sessions
- View the schedule
- Speaker overview
- Sponsors overview
- Links to the Discord channels
- Links to the feedback forms
- Code of conduct
- And of course, it needed to be fast

{{< blockquote type="Important" text="Our website for the CollabDays Benelux can be found here: [https://collabdaysbenelux.eu](https://collabdaysbenelux.eu)." >}}

{{< caption "/2020/10/collabdays4.png" "The website couple of minutes before going live"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAklEQVR4AewaftIAAAEYSURBVHXBSy8DURiA4fd855zvnOmgRN1CSSxE9GfY8Ks1YmXRWFiJSCTiEiYVQ3Wmc5HuWHgeM83ztrWW1ljqpqaoaoIq3goighjDnLscjRieD1Hv0Rjwqqj3iFNqLOOvgsXNPdz97Q1XF2d017ZY7vUopwVb/T5WPcYl0Lak3684bRrSdkJiSjoe8rtHlgZHJJ0U65WinBFjRD7Kkuy7YWkhwU7fSXsp8vnI1801KoYkBkQsLkkX6W/v0F1Z5SGb8vT8wlv2wf7hEbPXjMk4o7++jjs+OeVwMEBDIKrHmhaxHuc9opE6H2M14la6XbweIGJIo6Ih8MfmBnOuqhvyokIMRPX8x3WSwG7wzBkRZlVFVdckIfDbD7XjW8rgGJ2HAAAAAElFTkSuQmCC" "1387" >}}

### How did we create the website?

As a big fan of Static Websites, I choose to create the event website with React and host it on an Azure Static Web App.

The front-end is developed by using React and Tailwind CSS.

On the back-end, the website makes use of [Sessionize](https://sessionize.com/). Sessionize is the platform we in BIWUG use for all of our events to gather speaker submissions and create a schedule. The tool itself is excellent. It provides all the things you need for event organizers. On the website, we used the Sessionize APIs to visualize our schedule and speakers.

In the documentation, I read that data needed to be cached locally and be 100% sure that we would not get throttled or bringing the Sessionize APIs down. I choose to put an Azure Function in between to cache the data an extra time.

I created a `config.json` file that gets validated each minute on the client to perform changes on the website smoothly. Initially, I wanted to go for WebSockets, but as Azure Static Web Sites does not have this out-of-the-box available, I just went for a straightforward solution. This `config.json` has proven itself, as we could quickly push new alerts and update the channel/session links from Youtube.

Each change we did in the config took about 1-2 minutes before it was visible online.

{{< caption "/2020/10/collabdays10.png" "GitHub Actions flows during the event which were unnoticeable for our attendees"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAAC+SURBVEXBi07jMBQFwDm2my0t//+jILHKw5cmEjCTj8/PWtfN+/PplDAzLN3l6+u/+9vdmHO6BOUSJHGqKkE7jkMSl7js069931Uxeu+q2LadKmlNG8OPtEgYrTXbtrmNO4qE+NVbdxpe5pxKiQgmqsolFIaXx+MhCeUlgiROEcFY11XSUJ6PJ0r5s+2bN3fjdluM0bU0VYXYZvk34tRbVxg1p2NHp6oksdyGH4VgtN7s+2FZFhSJQlU5tRaFb0o6VI8Uw3QGAAAAAElFTkSuQmCC" "913" >}}

#### Whole technology stack

- React
- Tailwind
- TypeScript
- Azure Functions
- GitHub Actions
- Azure Static Web Apps
- Cloudflare

### Website changes during the event

The website ran without any issues the whole time, never did it failed us, and we even pushed a couple of changes based on feedback from our attendees. Here are the top three changes I can recall:

- Open external alert links in a new tab;
- Links to the schedule and speakers overview should not redirect the user to channel 1;
- Add a `next session` description in the channel overview.

## Let us talk about the numbers

The numbers are just crazy. The website held up on a huge load and kept performing very fast.

During the event, I posted the following screenshot from Google Analytics:

{{< caption "/2020/10/collabdays5.jpg" "Site statistics during the event"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAIACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7j7JFXUNMjVVWNtImdkUAIzCaPDMoGCw3NgkZG488mvLlOfsqr5pXVaKT5npeLv1PnI1avNBe0qW5Zac8rb+pxFr81tbs3zM0ERZjySTGpJJPJJPJJ5Jrm9pU/5+T/APApf5m7qVLv357v7Uv8z//Z" "1040" >}}

After the event, we looked back at the number and asked ourselves if these numbers could be correct. A day after the event, I evaluated the numbers, and probably Google Analytics was not showing us the right numbers at that time. However, the final numbers are still high.

### Number of pageviews

In total, we had **123000** pageviews, which meant that our attendees used channel switching a lot.

{{< caption "/2020/10/collabdays6.png" "Total pageviews"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACOSURBVG3BO07EQBBF0fvK5bbbEp+Y/W+JBZCQWUTTI8ZTVUBAAPI5uoxRW+/8uh7J6obEH17mXG53hCiKj+uNyMJMPDZHEhJ4HZ/03hljsG0bLw8rZ1yTkzLmZSVlzCbOWFZxHHfmybBKIoKIICLY953Xt3cyEw+MKlgl/luWhaeakITzrU3iTGuNZ4kfX8Q3OPo0LYgLAAAAAElFTkSuQmCC" "1327" >}}

To be sure, I verified these statistics with the load on the Azure Web Apps, and there I saw a similar number of hits.

{{< caption "/2020/10/collabdays7.png" "Page hits on Azure Web App"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACdSURBVHXBPWoCURiG0ecbL/hvFQt3YOVKXKGrcBMiKVIFsTZYiI0w49915n6vSWBAUM+xvDiq027xjkt4ckK/10XinxlPGvwKkEkiVs7y50weEy7xSmZmuGCxOTP7PLDeR3ZFRZnEoyCJJHG6OX/mqwIzmIxaTMd9apmZcSlFrXRxS+Jre6FyUQuxrMijMx42AQFG7Xt35aMbGDQz7jLTTsz5oZK9AAAAAElFTkSuQmCC" "2865" >}}

### Unique number of people

Out of all these pageviews, we had **390** unique users on the website.

{{< caption "/2020/10/collabdays8.png" "Unique visitors per country"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAAklEQVR4AewaftIAAAFZSURBVHXB0Y7aMBRF0X2uHZqkSPD/P8gDFVSqWgKOfSaWmgpVM2vpfr97nmeGYaCzzeVy4XQ6Mc8zXWuNfDwekcTONtM00V2vV8ZxZF1X8oZ3kiilUErh8XgwjiO3241sGxsk/jmdTizLwjRNjOPI+Xwmaq08Xis/fz/ZPZ9PSinUWlnXlVIKYRsEpTaWUulyzkgiIrBNzpmwjYAUwTgkupwzXc6ZiEASWRJCDCnY2UYStukigrBNt6yVH78WdpKQRGebYGczHhKdbSKCiMA2OWdigw0R4vhtoIsIUkpIIqVEa41orWHMfBh4V2ulq7XSBRshSq3sbCOJThJdtNaQIIX4SkqJ2GCbUs1Xaq1Ea41uPiT+Z5tOEsFGEo9XZWcbSbwLNs3m+zjwmYigC/56lspnWmt0wSYk/rxWSm3sJNFJQhIhCdtgM6TgK9FaA8R0yOwksZOEJD4ANQWwQrnTs6QAAAAASUVORK5CYII=" "543" >}}

### Busiest hour

The busiest hour was at 11 am, where we had a total of 135 attendees on the website. Followed by noon (104 attendees) and 10 am (101 attendees).

The number of attendees on each channel was equally spread.

### Azure Functions called

To give you an insane number. The Azure Function for retrieving the schedule and speaker details has received **one million** hits.

{{< caption "/2020/10/collabdays9.png" "One million Azure Function calls"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAABvSURBVG3BwQ4BAQxF0fs6jWD8/4ciNjPtI2Uh4hxdb3efT0ck8U93U9XkZV2RwDaS+BURZEJIjDKj2vwTNqMaqo2Bx9bsbb6FxIcxsLcRbwZsRvJiw2EJJMgQNqPatCFD5LYXEcESwjaSkBgpYTOe+885C5UZnicAAAAASUVORK5CYII=" "2858" >}}

### Discord

On Discord, we had 220 active members who wrote more than 1200 messages altogether.

### Costs

Some people asked me about the costs. As this runs all under a sponsorship subscription, the cost analysis is not available. With Azure support, I was still able to grab all the data.

#### Azure Static Web App

The website's total cost over the weekend with all the function calls included was: € 0,06.

#### Streaming

Like mentioned before, for streaming, we used Streamyard, and we went for the monthly professional version, which costs € 45.

## Thank you all

To wrap it all up, I want to thank each one of you that attended our event. 

Thank each of the 21 speakers for showing up on time and presenting their valuable content to the attendees.

Each of our sponsors, because without their support, we could not make this event take place.

The fantastic team behind [BIWUG](https://biwug.be) and [DIWUG](https://www.diwug.nl). Finally, we did something which we wanted to do for years. We organized an event together and did not have to agree where it would occur, as there was only one option.

*I hope to see you all next year, hopefully, in real life. Stay safe!*
