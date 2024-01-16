---
title: Generate open graph preview image in Code with Front Matter
slug: /generate-open-graph-preview-image-code-front-matter/
author: Elio Struyf
type: post
date: '2021-08-02T15:52:40.957Z'
lastmod: '2021-08-02T15:52:42.210Z'
draft: false
tags:
  - Extensions
  - Front Matter
  - VSCode
  - Open Graph
categories: []
comments: true
preview: /social/b7930c1a-0823-48e4-a2ef-133e56cd1f42.png
description: Get to know how you can generate a preview image for your articles by using a custom script and the Front Matter Visual Studio Code extension.
keywords:
  - front matter
  - preview image
---

Since I moved my blog to Hugo, I created a [Front Matter - VSCode extension](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter) which makes content/article management easier within Visual Studio Code.

A couple of versions ago, I added the ability to integrate your custom scripts. These will show up as actions in the Front Matter side panel. This functionality allows total flexibility to your content management workflow. As everyone has different needs, it will not limit you.

One of the scripts I use for new articles is generating a preview image for open graph and Twitter.

{{< caption "/2021/08/generate1.png" "Generate social image action"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB3SURBVHXBMQ/BUBiG0eeLz1Sqq0msQtJJxM+X2Bv+gFiMzW2rSy8vHW5icY4ty6MmRcGz7/krBHzYlcTDHudLoCYAhi1yEp3OOL/0BncQIIEZiefVlex2J5nPMgyj6TqStq7xZr2i3W4YaYg8XhEEuGNTZ6TqwgdEeyocQzINaAAAAABJRU5ErkJggg==" "459" >}}

## The script

The script uses `node-html-to-image` dependency, which, as the name suggests, converts HTML to an image. Under the hood, it uses `puppeteer` to generate the image.

My preview image looks as follows:

{{< caption "/2021/08/b7930c1a-0823-48e4-a2ef-133e56cd1f42.png" "Preview image"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAB0SURBVF3BywqDMBBA0TtOYkTow03//7+6bhdVCk1WkkkiXQjiOfJ8vVs1o7WGCNRSUVUQoZihqnTe4y7jyON25S/nTEqJUirTdEdVERE+v4jjwHuP73ukFJxzHHWcpBj5LgtnbjVjjoldDQMhDMwxsVvN2ADT0DBC4iFqBgAAAABJRU5ErkJggg==" "1128" >}}

The code of the script looks as follows:

```typescript {linenos=table,noclasses=false}
//@ts-check
import nodeHtmlToImage from "node-html-to-image";
import * as uuid from "uuid";
import { format, parseJSON } from "date-fns";
import { ContentScript } from "@frontmatter/extensibility";

const html = `
<html>
  <head>
    <style>
      body {
        width: 1128px;
        height: 600px;
      }
    </style>

    <!-- Include external CSS, JavaScript or Fonts! -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="p-4" style="background-color: #fefefe;font-family: 'Nunito', sans-serif; font-size: 20px; width: 1128px; height:600px;">
      <div class="d-flex flex-column justify-content-center align-items-center text-center" style="border: 10px solid #025a5f; height:100%; width:100%; border-radius:50px;">
        <span class="tweet-text mb-2" style="font-size: 52px;">
          {title}
        </span>

        <span class="text-muted mb-2">
          {date}
        </span>

        <div class="flex justify-center my-4">
          <div class="rounded-full inline-flex" style="background-color: #198c95; height: 0.25rem; width: 4rem;"></div>
        </div>

        <div class="mb-2">
          <img src="https://www.eliostruyf.com/images/eliostruyf_2022.jpg" class="rounded-circle" width="150px">
        </div>
        <h4 class="mt-2" style="color: #025a5f" >Elio Struyf</h4>
        <span class="text-muted">@eliostruyf</span>
      </div>
    </div>
  </body>
</html>
`;

const contentScriptArgs = ContentScript.getArguments();

if (contentScriptArgs) {
  const { workspacePath, frontMatter } = contentScriptArgs;

  if (workspacePath && frontMatter) {
    if (frontMatter.title && frontMatter.date) {
      const parsedHtml = html
        .replace(`{title}`, frontMatter.title)
        .replace(`{date}`, format(parseJSON(frontMatter.date), "MMM dd, yyyy"));
      const fileName = `${uuid.v4()}.png`;

      // @ts-ignore
      nodeHtmlToImage({
        output: `${workspacePath}/.frontmatter/static/social/${fileName}`,
        html: parsedHtml,
      })
        .then(() =>
          ContentScript.updateFrontMatter({ preview: `/social/${fileName}` })
        )
        .catch((e) => ContentScript.done(e?.message || e));
    }
  }
}
```

## Adding the script to Front Matter

To make the script available as an action in the Front Matter side panel, you will first have to add a file with the script's code to your project.

{{< blockquote type="Info" text="I use a `scripts` folder in my project, where I created the `social-img.mjs` file." >}}

Once you added the file, make sure to install the dependencies: `npm i node-html-to-image uuid date-fns @frontmatter/extensibility -D`.

After that, it is time for the final step, registering the command. You can register the script in your `.vscode/settings.json` file with the following code:

{{< highlight json "linenos=table,noclasses=false" >}}
"frontMatter.custom.scripts": [{
    "title": "Generate social image",
    "script": "./scripts/social-img.mjs",
    "nodeBin": "~/.nvm/versions/node/v18.17.1/bin/node"
  }]
{{< / highlight >}}

{{< blockquote type="Info" text="The node location needs to be provided as I want to make sure it uses the correct node.js version to run the script. When using `nvm` this is a requirement to set the `nodeBin` property." >}}

Open the Front Matter side panel, and the new button should show up. When you click on the new button, it will start generating the image. When the script completes, it will show a notification with the path of the image.

{{< caption "/2021/08/generate2.png" "The output of the script in a VSCode notification"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABnSURBVB3BQQrCMBRF0fuSH4uD4shO3YF1/wuQLkPnKpZK0JL8CD1Hw2ls+y5BA0m4V0IMuEOthVIq7gXrdom+PyCJIPF4vsjfH5vhCJczut+wvMzkz4xFI1pEEik6zRu2vPHpCuvKH1H/KNSugEs9AAAAAElFTkSuQmCC" "469" >}} 

## Running this in WSL

I encountered an issue when trying to run the script in WSL. It had to do with some missing dependencies.

{{< highlight bash "linenos=table,noclasses=false" >}}
# Related GitHub issue: https://github.com/puppeteer/puppeteer/issues/1837

sudo apt install ca-certificates fonts-liberation gconf-service libappindicator1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils -y 
{{< / highlight >}}

## Update

### 2024-01-16

Updated the script to use the new `@frontmatter/extensibility` dependency.
