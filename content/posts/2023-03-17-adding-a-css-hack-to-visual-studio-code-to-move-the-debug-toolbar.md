---
title: A CSS hack to Visual Studio Code to move the Debug Toolbar
longTitle: ""
customField: ""
slug: "/css-hack-visual-studio-code-move-debug-toolbar/"
description: "Discover how I crafted a clever CSS hack to embed the Debug Toolbar into the titlebar. Level up your workflow!"
date: 2023-03-17T13:58:49.472Z
lastmod: 2023-03-17T13:58:49.472Z
preview: /social/0c8c0f2e-697d-4f5e-b263-5cdde9f50001.png
draft: false
comments: true
tags:
  - Devhack
  - Visual Studio Code
  - Hack
type: post
---

As developers, we're always looking for ways to enhance our productivity and streamline our workflows. One thing which has bothered me endlessly is the floating Debug Toolbar. I love the fact that it is floating, but I have to move it out of the way every time I want to do something.

{{< caption-new "/uploads/2023/03/floating-debug-toolbar.png" "Floating Debug Toolbar in front of editor controls"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABrSURBVI3BwQrCMBBAwZc1aYi2ehC8tOL//5igXhSipk2aFUHvnWEps92frIhEUMfPceipVUkpISL5cr21tgmdWW9aH3YHplfkK2ZYOfDec48P34TOWJ2Lju/nWMrZaa38GQMJyFPKOldlqQ9tgSs4sPSumAAAAABJRU5ErkJggg==" "316" >}}

Many times I have been thinking to create an extension to move the Debug Toolbar to the titlebar, but I never got around to it. I was thinking about it again today, but unfortunatly, you cannot add CSS for the Visual Studio Code UI without a "hack".

{{< caption-new "/uploads/2023/03/css-hack-debug.png" "Debug Toolbar in the macOS Titlebar"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAAB9SURBVF3BwQ2CMBSA4f/VUhIvJEhC4sE9jAs4lQencgFW8UgTa6DAa1Fuxu+Tpj2dc+YiRUlKihgwmlhS4kdn66q5hnm+uXJPeAcQAbOyy5mNiPB1t3FZcM5ybA+sbY2qMgwj0zSxKVSotMCGcXg4NSHGF957+t7z7ynSfQBaNDTQwVs2zwAAAABJRU5ErkJggg==" "626" >}}

{{< blockquote type="important" text="The hack requires you to override the CSS file in the Visual Studio Code app. Use this at your own risk. Worst case, you have to install Visual Studio Code again." >}}

In this blog post, I'll share the CSS hack I created to integrate the Debug Toolbar into the titlebar of Visual Studio Code. Follow along as we modify the workbench.desktop.main.css file to achieve this new layout.

## Step 1: Create backup copies

Before we modify any files, it's important to create backups. Open a terminal and run the following commands to copy the original workbench.desktop.main.css file and create a backup:

{{< highlight bash "linenos=table,noclasses=false" >}}
VSCODE_PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/workbench"
cp -f "$VSCODE_PATH/workbench.desktop.main.css" "./workbench.desktop.main.css"
cp -f "$VSCODE_PATH/workbench.desktop.main.css" "./workbench.desktop.main.backup.css"
{{< / highlight >}}

## Step 2: Apply the CSS

Now that we have backups, it's time to modify the `workbench.desktop.main.css` file. Run the following command to append the necessary CSS changes:

{{< highlight bash "linenos=table,noclasses=false" >}}
cat << EOF >> "./workbench.desktop.main.css"
/* START - DEBUG TOOLBAR */
.debug-toolbar {
  -webkit-app-region: no-drag !important;
  background: transparent !important;
  top: 2px !important;
  box-shadow: none !important;
  border: 0 !important;
}
"/* END - DEBUG TOOLBAR */"
EOF
{{< / highlight >}}

This CSS snippet modifies the Debug Toolbar's appearance and positions it within the titlebar. The `background` property sets the toolbar color, `top` adjusts the position, and `box-shadow` and `border` remove any extraneous styling.

{{< blockquote type="edit" text="Updated the CSS to set the debug toolbar not as draggable, otherwise the buttons are not clickable since the latest update on the title bar." >}}

## Step 3: Copy the modified file

Finally, we need to copy our modified `workbench.desktop.main.css` file back to the Visual Studio Code application folder. Run the following command:

{{< highlight bash "linenos=table,noclasses=false" >}}
cp -f "./workbench.desktop.main.css" "$VSCODE_PATH/workbench.desktop.main.css"
{{< / highlight >}}

## Step 4: Restart Visual Studio Code

To see the changes, restart Visual Studio Code. You should now see the Debug Toolbar integrated into the titlebar once you start a debugging session!

{{< caption-new "/uploads/2023/03/css-hack-debug.png" "Debug Toolbar in the macOS Titlebar"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAAB9SURBVF3BwQ2CMBSA4f/VUhIvJEhC4sE9jAs4lQencgFW8UgTa6DAa1Fuxu+Tpj2dc+YiRUlKihgwmlhS4kdn66q5hnm+uXJPeAcQAbOyy5mNiPB1t3FZcM5ybA+sbY2qMgwj0zSxKVSotMCGcXg4NSHGF957+t7z7ynSfQBaNDTQwVs2zwAAAABJRU5ErkJggg==" "626" >}}

You are still able to mode the Debug Toolbar, but you will have to hold the `ctrl` key + click and drag.

{{< blockquote type="important" text="You will need to apply this CSS hack every time you do an update of Visual Studio Code. That is why I hooked it up to a Raycast script so that I can run it quick and easy." >}}