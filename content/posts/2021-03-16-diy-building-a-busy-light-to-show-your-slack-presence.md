---
title: 'DIY: Building a busy light to show your Slack presence'
slug: /diy-building-busy-light-show-slack-presence/
author: Elio Struyf
type: post
date: 2021-03-16T17:37:38.487Z
draft: false
tags:
  - Slack
  - Busy Light
categories: []
comments: true
---

Going back a year in time, I created a post about building my Busy Light, which I connected to the Microsoft Graph. Homebridge is used to control the busy light, its colors, and statuses.

{{< caption-new "/uploads/2021/03/slack3.jpg" "Busy light controlled by Slack presence"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAA0ACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APLfj98Urrwr+xF8bvBmkyaB/ZWs/Cfx7o9j4f07wzY+GL630yyu722ukg1KPVLfRrkx2FnNfNavbHUdbjjvZ7VTLA6y/H4LNstzDhaCzjKuFfa5VPDQweYUOfDZv9bWOwmXUK1LDUsTThicRHF4yisRShh8TXjR+sY6qlRw9aS5OPc2peH3ETzWrm/HtLJs1zrJMmxWFlhJ5zkFOrxNXqYPA061ehlOKxeBwUsdLCYaOMqYnC4HD18Zg8HOrCVWLX8XephJNS1CRchXvrt1HHAaeQj9DXr0pv2VPb+HD/0leZ79R/vJ6L45d/5n5n9u/wC0v8LPhZ4R/wCCcup+OLTwRZav4y+NPwW8N+LNZ8QeJLp9Zm0G71rTLPxPLD4asZYYtL0prW58Ta1ZW2pWdjb6tLYX00Go3t/ncPzqdGlldbL50ozqV8wxNSEqtSpJKjTk/bzjThGyk3ZU4ym5ckV7iWqP1jEwWZ5dmFeqoU1g8voP2dKCiqzpyioe0d/+fl61RqN6tR3m7pNfxT6haxG/vjjreXPYf89nr9Dpfw6f+CH/AKSj8ln8c/8AFL82f//Z" "3024" >}}

{{< blockquote type="Info" text="The related article: [Building a busy light to show your Microsoft Teams presence](https://www.eliostruyf.com/diy-building-busy-light-show-microsoft-teams-presence/)" >}}

The busy light has been running without issues since I hang it at my office until earlier this week. It did not break. It was because I stopped using Microsoft Teams and switched to Slack.

{{< blockquote type="Reason" text="I moved to another company." >}}

## Getting my busy light working again

To be sure that my wife and kids know I am in a meeting. I had to dive into the Slack APIs to understand how presence works in Slack.

Slack and Microsoft Teams' significant difference in your presence is that Slack only has two presence states: `online` and `away`, where Microsoft Teams supports many more.

I was checking at my new colleagues and reading some articles. Slack uses a combination of the presence and the user's status.

{{< caption-new "/uploads/2021/03/slack2.png" "Slack status messages"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAAC5SURBVGXBwU7CQBSG0e/eTp0WupM0YenK938eH0AiiTHYMLUd7i/uajjHDuNRXd/jZpRSeGTUupKalBj2AwJCPDAz5hlcEdS6siwLbdtiZmxJAgmXxHE8kPMTkjAzIoKIICKICCRw7va7Gzl35Jxxdx4J5+7j8wd3509KiaZx/jNS8/yCj69ggV1nkoIESDAvlZDwr3fS7XLi9DYhia2u6/AIhl3PeTqTarmgtYDE1jI5bsbynVjLlV9Dc18WG1WGMgAAAABJRU5ErkJggg==" "560" >}}

Like the Google Calendar app, some apps can automatically change your status when jumping into a meeting. 

To make Slack's presence work with my busy light. I started by creating a fork of the [Homebridge Presence switch connected to Microsoft Graph](https://github.com/estruyf/homebridge-presence-switch-msgraph), and removed all the authentication and Microsoft Graph logic.

{{< blockquote type="Info" text="[Homebridge presence switch connected to Slack](https://github.com/estruyf/homebridge-presence-switch-slack)" >}}

The logic of calling the Microsoft Graph got replaced by calling the profile-, presence-, and dnd-API from Slack.

By calling these three APIs, the Homebridge plugin can provide you the following busy light states:

- `Available`
- `Away`
- `DnD`
- `Offline`
- `<Slack status>`: This is a state you control yourself. You can add all your status texts and their corresponding colors.

You can find more information about the plugin and the installation process on the [Homebridge presence switch connected to Slack](https://github.com/estruyf/homebridge-presence-switch-slack) repository.

{{< blockquote type="Important" text="The Homebridge plugin also creates additional switches for each of the presence states. These switches allow you to automate your home even more. Like for instance, when I go to a meeting, my speaker will automatically stop playing." >}}

{{< caption-new "/uploads/2021/03/slack4.jpg" "Presence switch"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAoACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7A/hPrHw1tNR0bwVqPwmu9R+26X4TsbXVbrwF8O4fDOlv/AGVvurx9Xm146te290jfaZ5ZtLbUD9kkne3eW6jR/AyvKcr/ALNwDeXYCTeCwjblg8M3d4ene79lzSbd5NycpOUm29kvpM5znOFnGbf8K2ZaZljVFfXcQowUcRUioQUaiUYq2i2je0bRUYr4d+J/hDwta/Ev4h2troemWttbeOfFsFva2tultbW0EOv6hHDBb28OyGCCGNVjihiRI4o1VI1VVAH4rm+CwUM2zSEKFGEIZjjYxhCKhGEY4mqoxjGNoxjFJJRSSSSSSSP6EyPMMfUyTJ6k8TWqTnleXznUm3Oc5SwlFynOck5TlJtuUpNyk2222z2X4X+IvEFx8O/Bz3Gu6xO8nhjw8JGm1O9laQW+mxi3Ds87FhAJZRCGJ8oSSBNods/SZRmOYf2Xl/8At2M0weHS/wBqr7KnFJfHskrLsj5riLKcrWd5rbLcvV8wxbdsHh9W60m2/wB3q22231bbPz28Za9rlz4v8VXNzrWrXFxceJNcnnnn1G8lmnml1O6klmmlkmZ5JZHZnkkdmd3YsxJJNfleOxOInjsZKVetKUsViJSlKrNylJ1ptyk3Jttt3bererP2LLcJhYZdgIQw2HhCGCwsYQjRpxjGMaFNRjGKilGMUkkkkklZaH//2Q==" "379" >}}

{{< caption-new "/uploads/2021/03/slack5.jpg" "Presence switches"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAA8ACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APy0+Bn/AASp+OP7QngT9kXX7f4xfDHT7L9rfQvinq+kxa/4Y1jUbnwta/DC1uL9odait0jtNRudQjso47OSzW3+wsFLPcsGd/5e4y+lRw7wbmPibluJ4VznG1PDPFcO4TF1KGMy6lDNJ8Q1aVKMsMqk+bDQwrq3l7dN17Wgot6fe5bwFjMyo5HXhj8NSWd08ZUpxlSrSdBYNSbU7K1R1OWy5NIve5+KXiS01fwr4i17wvcanLNP4b1rVNBnmtbi4W2lm0e+n0+SS3WTY4gd7dmiDojiMqGVTkD+nsBjIZhgMFj6cZQp47CYbGU4TtzwhiaMK0Yz5W480YzSlytq6dm0fD1oSo1atFyu6VSdNtN2bpycW1fWza08j6M8G/tQ/HnwVpPwwsvDfx6+Mvhiy+Gln4gtvAFroHxK8caTa+AofEcTxeIIfB0Gm6zBH4ah15ZZE1ePQ0s01JJXW+WVWavnMd4e+H+a1M2rZpwPwhmNbiGeEqcQVcdw1k+LqZ5PL2nl883nXwVSWZTwLjF4SWMdZ4ZxTouDSO2lnGb4eOGjQzTMaMcGqiwkaWNxNOOFVW6qrDqFVKiqqbVRU1HnTtK6PljUrua/1C/vriea6uLy9urue5uJHmuLia4neaWeeWVmklmmd2klkkZnd2ZnYsSa+rp06dKnClShCnSpwjTp06cVCnTpwSjCEIRSjCEIpRjGKSikkkkjzm3JuUm5Sk25Sbbbbd223q23q29Wz//Z" "1170" >}}

## The hardware

The hardware is still the same as the one I used for the Microsoft Teams Busy Light: [busy light hardware](https://www.eliostruyf.com/diy-building-busy-light-show-microsoft-teams-presence/#the-hardware).

## The server

To control the LED HAT on the Raspberry Pi, I use a service I wrote in `Python`: [the busy light service](https://www.eliostruyf.com/diy-building-busy-light-show-microsoft-teams-presence/#the-busy-light-service).

## The Slack permission scope

The `Homebridge Presence` Slack App I have created will ask you to consent to the following permissions to get the information it requires to control the lights correctly.

{{< caption-new "/uploads/2021/03/slack1.png" "APP Permissions"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABkSURBVE3BQRKCUAxEwTcJJiWl3v+Q7AHrf0fZ2a1t23yeJ93Nuq78s013ExEsS995PF903dj3nTEGmYltJCGJOSdRVbynmR8zxuA4Di6SqCoiAtss/PSShKCqkIQkMpPMxDaXL4mNKFwqx67wAAAAAElFTkSuQmCC" "653" >}}

You can find more information about the Homebridge plugin installation process on the repo its readme: [plugin installation](https://github.com/estruyf/homebridge-presence-switch-slack#installation).

*Happy meeting time*