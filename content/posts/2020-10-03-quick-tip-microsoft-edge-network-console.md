---
title: '#DevHack: Microsoft Edge - Network Console'
slug: /DevHack-microsoft-edge-network-console/
author: Elio Struyf
type: post
date: 2020-10-03T08:07:29.842Z
draft: false
tags:
  - Development
  - Devhack
categories: []
comments: true
---

For a long time, I loved using Postman for API testing. Ever since the Chrome apps got deprecated, the experience was not the same anymore.

Since then, I have been using Charles, Insomnia, and some other tools.

This week I discovered an experimental feature in Microsoft Edge which allows you to edit and replay API calls from within the browser. The feature is called `network console`, and you need to activate it currently under the `experimental` features of the DevTools.

{{< caption-new "/uploads/2020/10/edge1.png" "Enable network console"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAADrSURBVF3B23HCMBRF0X0sWYJAA2mF/utICXwQJFsP6yZkzIwna+l2u9myLIR5ZhuDx+PBf2MMfOsbrTU+zmfOIXC9Xrnf77yYGdsY1FLwznm899TWGGaklJFEa41aK2/T1iutNcwMSVwuH9RaqbVyNLEzMySRcyaEgPeeI59z5m0thRdJnE4nzIwxBsuyMLGTRJhnJGHGH0ms68qLZ2dmSCLGyPP5pJTCkWfnnCOEgBnEGEkpkVLipfeOZydNSKK2ytY7Ywycc4DYtg3PrvfGuoqcF8DovVNK4c3zaxZ8Ro9zE1wiX9+ZUgpHP7ExixwJCzPnAAAAAElFTkSuQmCC" "772" >}}

Once you activate this experimental feature, refresh your page, and right-click on an API call. This should make the `edit and replay` available, which opens the new network console.

{{< caption-new "/uploads/2020/10/edge2.png" "Edit and replay"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAACqSURBVH3BwU6EMBRA0dvpK+W5Aybhz8b41+M/GE1MMEIKlBJ5hsXsjOe42/OLfby/MU0T/5HLxVHXNSklUkr8xTmHqCp936OqmBkxRrz3HMfBOI6ccs7IvCx8fw1s28b1ekVEcM6RUiKEwGnfd+RJlc9SUFXatqWqKswMEeHBe4+keSbGSCmFYRiIMXIqpbCuK6dlWZDX+x07fui6jqZpcM5hZoQQyDnz8Avnekw2TSouTQAAAABJRU5ErkJggg==" "415" >}}

This will be your new playground for API testing:

{{< caption-new "/uploads/2020/10/edge3.png" "Test out responses"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAAklEQVR4AewaftIAAABDSURBVBXBwRGAIAxFwRcBZ8Rq1P57wmMI8B137bofjTGI7kgi7QcpF5hBdEcSv/y2xloTM0MSuLOlQq0nKe+EO2MtPgxOI1IbDRMVAAAAAElFTkSuQmCC" "1985" >}}

> **Info**: Personally, this is a splendid feature because you do not have to take care of auth. All tokens/cookies/headers are already added to the API call, so all you need to do is start testing and changing your parameters.
