---
title: Ignoring the JSON comment errors in your SPFx solutions
slug: /ignoring-json-comment-errors-spfx-solutions/
author: Elio Struyf
type: post
date: 2020-07-06T14:29:48.242Z
draft: false
tags:
  - Development
  - SharePoint
  - SharePoint Framework
categories: []
comments: true
---

Something that bothers me for a long time is the comments in the SharePoint Framework component JSON manifest files. As you may know, JSON does not allow you to add comments to its content. Visual Studio Code will show some errors for it as well.

{{< caption-new "/uploads/2020/07/comments1.png" "VSCode comment errors in JSON"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABsSURBVEXBQQ4CIRBFwQf0mJCYqCvXHsH7X8sJMND9zSyMVen6eqvWyjGd3hrbZkQEp7UW7kHOGTt65/m4Y7fK8oUV47PveATHMZhzQcqYJHxO0nZBEqHArODDaa3Tx+CUBUj8CSQgJUop/HwBI0k9FGJ1WUgAAAAASUVORK5CYII=" "580" >}}

I understand that comments are needed. These comments make it easier for developers to understand what the properties/attributes/values mean. 

{{< caption-new "/uploads/2020/07/comments2.png" "VSCode comment errors in JSON"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABQSURBVDXBwQ2DQAxFwbeyEQEkakgH9N9YENjrDznsTPt8D23Tgpdxxkn0RBKDEHcG3qrReVlSWZQSBF2iVzH4ZMa+LlgUgRM+M1x584uLvwcCDSotRNpzgwAAAABJRU5ErkJggg==" "1254" >}}

Providing these comments in the JSON file itself is more natural than pointing to a website/documentation page. That is also why they created the `JSONC` file format, which allows you to add comments in JSON files. As SharePoint Framework projects are still using JSON files instead of JSONC, I wanted to find a quick fix.

## The quick fix number one

The first way would be to remove these comments from the file. I know it is not ideal, but it works.

## The quick fix number two

Did you know you could tell Visual Studio Code to treat your JSON files as JSONC? You can do this with the `files.associations` setting in VSCode. You can add this setting on workspace (you need to add it for each project) or user (add it once, works for all projects) level.

My default `files.associations` the setting looked like this:

```json
"files.associations": {
  "*.master": "html"
}
```

To tell VSCode to treat JSON as JSONC, all you need to do is add this line:

```json
"files.associations": {
  "*.master": "html",
  "*.json": "jsonc"
}
```

One downside is that now all JSON files are treated as JSONC files. It could be that some of your pipelines might fail if you have to do JSON validation. To overcome this, you can be a bit more specific and add `*.manifest.json` as the file association. That way, it will only ignore the errors for the component manifest files.

```json
"files.associations": {
  "*.master": "html",
    "*.manifest.json": "jsonc"
}
```

{{< caption-new "/uploads/2020/07/comments3.png" "VSCode ignoring the comments - this is much more relaxing"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABMSURBVE3BQQ5AQBBE0T8xCwnXcAL3PxQ7qruLWUi819Zt98JMRHCHUIq/slGKHgqOPJGCoTXAUDa2+fQXfZ5YVFwZZCXQsI1tMovhAcsrMQLK/I4MAAAAAElFTkSuQmCC" "1208" >}}

*Happy coding*
