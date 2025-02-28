---
title: "Useful Visual Studio Code settings for better coding demos"
longTitle: ""
customField: ""
slug: "/visual-studio-code-settings-coding-demos/"
description: "Enhance your coding demos with these Visual Studio Code settings for better visibility and focus during presentations."
date: "2025-02-26T19:03:51.508Z"
lastmod: "2025-02-26T19:03:52.899Z"
preview: "/social/b891bbb5-c627-4380-8217-a85c55744712.png"
draft: false
comments: true
tags:
  - "Best Practices"
  - "Coding Demos"
  - "Productivity"
  - "Visual Studio Code"
  - "VSCode"
type: "post"
fmContentType: "post"
---

When delivering a coding demo, clarity and visibility are key. You want your audience to follow along effortlessly without losing track of where your cursor is or getting distracted by unnecessary UI elements. Of course, we all know it's best to use a light theme to improve readability, but there are additional settings that can make your live coding sessions even smoother. Here are some Visual Studio Code settings that can enhance the experience.

## 1️⃣ Show the cursor as a block  

By default, Visual Studio Code uses a thin blinking cursor, which can be hard to spot during demos. Changing it to a block cursor makes it more visible.

```json
"editor.cursorStyle": "block"
```

{{< caption-new "/uploads/2025/02/block-cursor.webp" "Block cursor in Visual Studio Code"  "data:image/jpeg;base64,UklGRrAAAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSDIAAAABN6CgjRQ2+OzlBROYIiICqzfxQAjZil4lEEIIB/EVvsL3pziGiP4HACupXpL5ne0GAFZQOCBYAAAAMAIAnQEqCgAHAAFAJiWcAA+E8Dz5u3l6tgAA/vQWkfnnv/0kXbr+Z2/Pz6+wiyufP9QDDgslJh/ZeH9+xGJFTj2Pm2I+TKpddVNe3BGMnIvTXDlwrAAAAA==" "200" >}}

## 2️⃣ Expand cursor instead of blink

Another way to make the cursor more noticeable is to expand it instead of a blinking one. This setting can help your audience track your cursor more easily.

```json
"editor.cursorBlinking": "expand"
```

{{< caption-new "/uploads/2025/02/expand-cursor.webp" "Expand animation for the cursor"  "data:image/jpeg;base64,UklGRqQAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSDYAAAABP6CgbRToXqygBP+SsBERgd/ckFAQyUrFN8BrQARCvACkMIL2HwwR0f8JkF0kbQDkp+87LhtWUDggSAAAANABAJ0BKgoABgABQCYlpAAC60rjH3TQAP64Pq/gpufqu/IdVNhJIdQK+ilKUpjrOtnJH4JxO72AagAjW/78kycEuAAGfIAAAA==" "200" >}}

## 3️⃣ Disable editor hovers

Visual Studio Code tooltips and hovers (like those from extensions such as GitLens) can be useful for development but may clutter the screen during a demo. Disabling them helps maintain focus.

```json
"editor.hover.enabled": false
```

## 4️⃣ Give the cursor a custom color

A high-contrast cursor color ensures it's always easy to spot, even in different themes or under screen sharing conditions.

```json
"workbench.colorCustomizations": {
  "editorCursor.foreground": "#ff0000"
}
```

{{< caption-new "/uploads/2025/02/high-contrast-cursor.webp" "Change color to a high-contrast version"  "data:image/jpeg;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAACQAABgAAQUxQSDIAAAABN6Agkg06+p4/YZSQSkQE1m7ygRCyFb1KIIQQDuIrfIXvT3EMEf0PAFZSvSTzO9sNAFZQOCBgAAAAMAIAnQEqCgAHAAFAJiWUAuwGKebe2SsUa0gA/uiqgoyT3/6R+MYajZrvQZdqrD5V/8Yqlq1vf581T9WM/3QiSjjqfOT9pKHNA0P7r4wPgW13CO78c2PD9bc6Z0LYAAAA" "200" >}}

## Putting it all together

To apply all these settings at once, add them to your `settings.json` file in VS Code:

```json
{
  "editor.cursorStyle": "block",
  "editor.cursorBlinking": "expand",
  "editor.hover.enabled": false,
  "workbench.colorCustomizations": {
    "editorCursor.foreground": "#ff0000"
  }
}
```

## Why these settings matter

A good coding demo is all about making things as clear as possible for your audience. These settings help by:

- ✅ Making the cursor more visible
- ✅ Reducing unnecessary distractions
- ✅ Ensuring your code remains the focus

Try these settings before your next demo and see the difference!