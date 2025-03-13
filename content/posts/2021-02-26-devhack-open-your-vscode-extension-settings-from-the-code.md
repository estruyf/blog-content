---
title: '#DevHack: Open your VSCode extension settings from the code'
slug: /devhack-open-vscode-extension-settings-code/
author: Elio Struyf
type: post
date: 2021-02-26T15:09:47.268Z
draft: false
tags:
  - VSCode
  - Extensions
categories: []
comments: true
---

For my VSCode Front Matter extension, I wanted to implement a link that allows you to open the VSCode settings to the extension quickly.

{{< caption-new "/uploads/2021/02/frontmatter.png" "Front Matter - Quick link to settings"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAATCAYAAACp65zuAAAAAklEQVR4AewaftIAAAGOSURBVHXBXWsTQRSA4XdmJ80maWo1GrGgFIWiN+KP8J8riN70RvBGr6Kt+VpbknSzs3POMYMUSonP47rP31psGspeHzDaGBER7vOpbclGxw8Yj0YUhWcf75wjGwz6tKklFIF9gvceEWFZ/eFoeEg5fkISIZvN5jQxkgVwZGXZZb5Yst5s2Cc8HI1Yzma8G76HIXR7gbLXQUVZXTdkX6dfCNVygapyva3I+uGA6AtMYRW3qBpRtgQV4a42CiqKqmEYt0IIHdo20mhFZgQKPHgjmqCqiDUEMyWr2m9kR+WQ8qAEg8XVnKzRmqCqmBmN7/Pz4gJ+X7FP6PUHbDZrNslxPD7B1Iix4daADjHWhPpmA2a87J+hZrTUHBz2KArH+eQTKxwiieCcA4PXT99gaty0azrdgl/LCSluSfwTRIRs1VZkSYTL6pLP3z9yV2DHMM6nH8gup1NSStwX2HHOs/Ulpsqjk1MkJWJsyIZ0qesVgR0zZT75wV2vTl9QHI4Bx7PuYzz/sbxegxlmwnxR8Rdls+C9Kp6MQAAAAABJRU5ErkJggg==" "412" >}}

I could not find anything in the documentation but found a reference on Stackoverflow mentioning you could use: `vscode.commands.executeCommand( 'workbench.action.openSettings', '<your extension>' );`.

Using my extension ID was not working correctly. So I did some more digging in VSCode, and it seems you have to add `@ext:<your extension id>`. In the case of my Front Matter extension this is:

```typescript
vscode.commands.executeCommand('workbench.action.openSettings', '@ext:eliostruyf.vscode-front-matter');
```
