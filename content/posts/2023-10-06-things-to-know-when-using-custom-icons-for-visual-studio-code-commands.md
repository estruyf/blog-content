---
title: "Things to know when using custom icons for VSCode commands"
longTitle: "Things to know when using custom icons for Visual Studio Code commands"
customField: ""
slug: "/custom-icons-visual-studio-code-commands/"
description: "Learn the basics of using custom icons for VSCode commands and an important change in VSCode since version 1.83.0 how they are rendered."
date: "2023-10-06T09:42:14.660Z"
lastmod: "2023-10-06T09:42:15.060Z"
preview: "/social/7df6e193-162e-48d4-88fd-d6a296298683.png"
draft: false
comments: true
tags:
  - "Development"
  - "Icons"
  - "VSCode"
  - "Extensions"
type: "post"
---

You can specify an icon when adding commands to your Visual Studio Code extension. These icons are rendered when you register the commands, such as the explorer title bar, document title bar, and more.

{{< blockquote type="info" text="More info on registering command can be found in the [VSCode documentation](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)." >}}

You have three options for specifying the icon:

1. Use the built-in [product icons](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing) from Visual Studio Code. Reference it as: `$(icon-name)`;
2. Use an icon font that you can define in your `contributes.icons` section. Once you have defined the icon font, you can reference it as: `$(icon-name)`;
3. Use an image (SVG, png, ...) to specify the icon.

{{< blockquote type="important" text="Since version `1.83.0` of Visual Studio Code, there has been a change in how command icons are rendered in the UI." >}}

This change in version `1.83.0` made me write this article, as it affected one of my extensions.

## Using SVGs as icons

When you want to use an image file as an icon, you can specify the path to the image file in the `icon` property of the command. The path is relative to the extension root.

```json 
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World",
        "category": "Hello",
        "icon": {
          "light": "path/to/light/icon.svg",
          "dark": "path/to/dark/icon.svg"
        }
      }
    ]
  }
}
```

## Image specifications

- The size of the image should be `16x16` pixels. When using an SVG, make sure that the `width` and `height` attributes of the image are set to `16`;
- SVG is recommended, but you can, for instance, use a PNG file as well.

## ~~What changed in version 1.83.0?~~

~~To explain this, we need to look at how these icons were rendered in the UI. In the versions older than `1.83.0` of Visual Studio Code, the icons were added as the background image of the element in the UI.~~

{{< caption-new "/uploads/2023/10/svg-background-img.png" "SVG as background image"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAADTSURBVBXBO04DMRRA0evPzGA+AzQUIARiA3RUrIHdsEC6KHuggypCIpkktp8/D3GOeXp4fL88P3sBxWlDFI5DACyaEq024mG39qMzryfeviUcOSeMH7i9uuYZw8eyB1V6zaMVH5gGizFQuxKl8N0rB29BG/tlSxbBd4VtdUw906eJ0VhCh02poEoIgVIEX11A5zuWkkEV3zPb0RJbB2OJcY+I4CXckC/uUWPpqpyWDX3zSVPFG8M8z9Ra8Onna/XbEg1DbZ2jRpzs0FIQEf6leFz9AbV9fKrCpmRhAAAAAElFTkSuQmCC" "637" >}}

~~In the newer versions of Visual Studio Code, the icons are added as a background mask to the element.~~

{{< caption-new "/uploads/2023/10/svg-background-mask.png" "SVG background mask"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACmSURBVBXBTy4EURDA4d+bqu7W8SeEldhJbCTs3MEVncYJ7PoOFiYmM2hV71U98X3l4e72ZZ6m+yjCV+vUTMKc3hMRRWRDq3VRk/nxdNCnTRGyN56vb3j9+CQi6Rm05kSa6vnJzNXlBSUrdffD22HPUJLaVuido2kkm6LHk3I2KwXFtwf2bsS6EhH8MzPcDH3f7pbv9bd4S7w23CthTkQgKozDCKUvf+5bXkywg5M0AAAAAElFTkSuQmCC" "1000" >}}

~~As images are now used as a mask, the need for a light and dark version of the icon is not required anymore.~~

~~The current Visual Studio Code theme determines the color of the icon. Behind the scenes, the `--vscode-icon-foreground` CSS variable is used for it.~~

~~This change gives the VSCode team and theme authors more control of the icon. For instance, before, you could use a colored icon, but right now, as it is used as a mask, this always renders in the same color.~~

## Update

In version `1.83.1` they reverted the masking logic to how icons where originally loaded. More information on: [Theme colour applied to SVG icons](https://github.com/microsoft/vscode/issues/194710).
