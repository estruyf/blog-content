---
title: "How to start developing your own plugins for Homebridge"
slug: "/how-to-start-developing-your-own-plugins-for-homebridge/"
author: Elio Struyf
type: post
date: 2019-08-22T15:20:28.000Z
draft: true
tags: []
categories: []
comments: true
---

## First things First

- Stop the service: `sudo hb-service stop`
- Install the correct version of Node.js:

```bash
nvm install 12.15.0 --reinstall-packages-from=12.4.0
nvm uninstall
```

## Create a new plugin

## Start debugging

Add the `-I` flag to turn on the insecure mode: https://github.com/oznu/homebridge-config-ui-x/wiki/Enabling-Accessory-Control

`DEBUG=* ~/.nvm/versions/node/v12.15.0/bin/homebridge -D -I -P ./`

`DEBUG=* ~/.nvm/versions/node/v12.15.0/bin/homebridge -D -I -U ~/nodejs/homebridge/homebridge-toggle-switch/debug -P ~/nodejs/homebridge/homebridge-toggle-switch`

`DEBUG=* homebridge -D -I -U ~/nodejs/homebridge/homebridge-toggle-switch/debug -P ~/nodejs/homebridge/homebridge-toggle-switch`

`homebridge -D -I -U ~/nodejs/homebridge/homebridge-toggle-switch/debug -P ~/nodejs/homebridge/homebridge-toggle-switch`

https://github.com/oznu/homebridge-config-ui-x/wiki/Enabling-Accessory-Control

## debugging

`node --inspect-brk ~/.nvm/versions/node/v12.15.0/bin/homebridge -D -I -P ~/nodejs/homebridge/homebridge-toggle-switch`

`node --inspect=127.0.0.1:51226 ~/.nvm/versions/node/v12.15.0/bin/homebridge -D -I -P ~/nodejs/homebridge/homebridge-toggle-switch`

## Settings

https://github.com/oznu/homebridge-config-ui-x/wiki/Developers:-Plugin-Settings-GUI


https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-macOS
https://github.com/oznu/homebridge-config-ui-x/wiki

https://github.com/homebridge/homebridge/blob/master/README.md#plugin-development


```
sudo npm install @eliottrobson/homebridge-macos -g --registry "https://npm.pkg.github.com"
ln -s /usr/local/lib/node_modules/@eliottrobson/homebridge-macos /usr/local/lib/node_modules/homebridge-macos-@eliottrobson
```


```
DEBUG=* /usr/local/bin/homebridge -D -U ~/nodejs/homebridge/homebridge-dev -P ~/nodejs/homebridge/homebridge-macos
```


/System/Volumes/Data/Users/eliostruyf/.nvm/versions/node/v12.4.0/bin/homebridge