---
title: Publishing web projects from Visual Studio Code to Azure with Git
author: Elio Struyf
type: post
date: 2015-12-07T14:49:08+00:00
slug: /publishing-web-projects-from-visual-studio-code-to-azure-with-git/
dsq_thread_id:
  - 4383450446
categories:
  - Development
tags:
  - Development
  - Node.js
  - Visual Studio Code
comments: true
---

For a hobby project which I was creating with Node.js and Visual Studio Code, I was amazed about how powerful the Visual Studio Code has gotten in such a short time period. Most of us know how easy it is when you publish one of your web projects from Visual Studio to Azure. It is just a matter of clicks and your website gets pushed to the cloud.

In Visual Studio Code it is not that easy as its big brother, but that does not mean that it is hard to achieve. You have to do a couple of things yourself, but once you have done these things it is as easy as in Visual Studio itself.

The way to achieve it is via the continuous deployment functionality of a Web App. With this option you can connect a source control system to your site in order to push updates.

{{< caption-new "/uploads/2015/12/clip_image001_thumb.png" "Deployment options"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAIAAACZwRr8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAABCElEQVR4nF2QS0+DQBhF58/7M9y5d1kXxqpNKg2phtrE0No0MUKtzDCPb4CBeRmgJdSzPbnf4yJ6FDil2hpVKaVUWVXGGH8G7YPddr7JBTscfihjIGVd195714HCBNYpVBIESGutc86eafVNJCax4CQ7ZpnWZsj1IFhPIQ4K1XDOBQBIqbU+SeeQfr2tognmsihK2VrZaD1MQNOn2SJcFmWplOqvHaKdfrh/mc8p44zz/q4LfRfGs+hTAs8ZN8aMXasflx+L961gDJO80Xr46vRY+F2uUgmUdMMvFrd681vvMwWcUsattf5fLcHX1Sq5LoTNWY4xIYQaa0ed4+eEvTnrm6bWHeP0HwNhjhzZbEYLAAAAAElFTkSuQmCC" "277" "378" >}}

As you can see in the screenshot above, you have a couple of options. The option that I used was the one that creates a local git repository on your web app. This is probably one of the easiest options (except for OneDrive and Dropbox), as you do not need to configure something anywhere else.

## Azure Web App - Local Git repository configuration

First thing you have to do is create a new Web App for your web project on Azure. Once you did that, click on the settings button of your Web App. In the settings list you find the following section:

{{< caption-new "/uploads/2015/12/clip_image002_thumb.png" "Continuous deployment"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAdUlEQVR4nGWOUYpDIRAEvf9REx11ZvQlilZ4QpaFNNRf0d3hui4ez0hrjf/Zex/uzDkJrTkpJSQXci7EGEmSGWOy1jq4O8FfA1HH1DBzVJVS6xG+rb13go1JVCOLUKsezO1X7ONN1USMgkimVGXt/Td7c///ANDHwkJmc5dOAAAAAElFTkSuQmCC" "283" "153" >}}

Click on Continuous deployment and you will get the option to configure it:

{{< caption-new "/uploads/2015/12/clip_image003_thumb.png" "Configure continuous deployment"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nG2MwWqDQBRF51PE0UETdeXvN6QQiQtH6KoU+gEJoRpTE6MZ5xQnu7YPDhcu5z6RZRlKhXieh+/7BEFAmqbkee6IoggpJSKOY5RSTpALUhKvViRJwnqdEIbhUyz2JfuypKo0lX6yedmw3b6yKwrqukZrjZge30zjyDzPYK1Lay2/TxzOZw6XK80w0YyGtr8xG+PkhWW4ID6aK/Wx4+104b03fB6/sMb8/XgbBvquY7rfXdG2LeYf8Qc0v9sErhmeFQAAAABJRU5ErkJggg==" "612" "419" >}}

From the list of available deployment options choose Local Git Repository.

{{< caption-new "/uploads/2015/12/clip_image004_thumb.png" "Local Git Repository"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvElEQVR4nG2RS2saYRSG529E4z0aUy+xZpU2JL+s/6K7rguF0m0hi5KurLYUC2rqhZg4YaqZ+zjG21yeMiNNFPrBw1mch5dzzifk83mq1RPK5TKVSoXDwzypVIpMJkM2myXo53I5hEKxyPnFBaenr3h9dkapVNqIBwehnE6nwyrEYzGie3vsRyNEIxHisX2SiTjJROKZZALhReklpeoJheMqxeMqhfKGo1KFo+IzQqt7S71+TbMzoNnu0ez0+dnq0e7f0h2K/L7ZICynS3pXPXRVR9c0bNtmPl/gui7bT5DMBV/6OtbUZjq18TwvbAR1G2FoOLxvz5AeFERpjD1f4viw9vwnPB+E2biPdPmW76MJ9XuV2mjCN1GmZS7pPnp0bIep4yOY6pjrxiUD1WL0uEacO4j/6sLlbu4yd32EkXjPh4+fGE8mGLqxswDbyzxoBl8bv1BUDVXTcdxgeH8HP5hxICm8+1xjIsvIssxqvQ4TfD8QNoSJ9tLlh2hhWhaGaYan2JaeRGvh07hboSoK0p8xjuP8P1GZtagN32CaFoZhISsKmqaHP7MjzlYKN+oVjrPGdZ0wMWB7hED8C+TeKIi/RjFgAAAAAElFTkSuQmCC" "304" "523" >}}

Once you select it, click to on the OK button and your Git repository will be provisioned. The repository uses the same username and password as your FTP account. You can update your credentials via the Deployment credentials link.

{{< caption-new "/uploads/2015/12/clip_image005_thumb.png" "Deployment credentials"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnElEQVR4nC3JsQ6CMBhF4b6BrSymA3ExMb4sRv4gxkdzMi5OEsEWSwvHiN7kW+5R1lqMMWi9wOZrNtsdeZ6zWlm0NmhjWGYZqij2iAgiJVLVSH2mOAgHOVJW9UyqEyqNASbmpZgIYSCNI9P0Pf8BUPfmyb1paXygc462a/HO41pH/+p/nEddn57L48Wtj/ghkuLXyNsH0pBmcYh8AJvqnQ7EXiPuAAAAAElFTkSuQmCC" "880" "438" >}}

Once the Git repository is completely provisioned, you can see the information on the Web App.

{{< caption-new "/uploads/2015/12/clip_image006_thumb.png" "Git clone url"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAxElEQVR4nDXC0U7CMBQA0P7HCLpbtldGdIkPPvipKC9bmwB/o48ONVGQxpZ13EtprwnGkyPq+4eb23o2q4rJRP4DACllURSiqu+m06osSwDIRqPx+CoHeZ3nOUCWZeJxPn9aLJqmVVo3bauU0lqvlsv1at0qJTCkmPhPZKbEgfl8ycxi973vvY8xppQI6e3j0+wN+iGewplIbM3P+9bYgRyeyNqvl2fbdW6zsa9dMEY4j7Y/HgZyHgcMzqPz2B9pd0CL8Rd2zI+wYd4F2gAAAABJRU5ErkJggg==" "574" "385" >}}

The provisioning experience is much better in the old portal. In the old portal under the deployments tab it shows you when your Git repository is ready to be used.

{{< caption-new "/uploads/2015/12/clip_image007_thumb.png" "Git repository is ready message on the old portal"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZUlEQVR4nB3KSw4CIRAAUe5/Hw/gBVy7mswGyNiEj2GM2g1lpJK3K9fPk/friX4/mNkyxkDNUFX+zTlxITWud2HzD44Y8T4QQkBEaK1Ra6X3jttj4nLb2fxBKxlJack5r6mUssYfnDpx78Uv9tMAAAAASUVORK5CYII=" "917" "302" >}}

It gives you a couple of steps what you have to do in order to get it running on your environment:

{{< caption-new "/uploads/2015/12/clip_image008_thumb.png" "Git repository information"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAmElEQVR4nHWPUQ6EIAwFuf9JoShEKKCgvk1r8GcjyQRIpq+t4VJA5BFCxL7v+Dqmj4EtM1JKqLXivu8/IOLoHcuyKFMupbxIlzEGzHmesNZiXVfEGFXOOSvM82aY67pARHDOaYG8n6KAEB5UlERpIZ/JTBGO44CE6YySJngiTfTev7fIOmMX0TpdJm4ZYWPExKi1obX2LvQDiM00glHjeXUAAAAASUVORK5CYII=" "805" "640" >}}

## Visual Studio Code configuration (new application push)

Now that the Local Git Repository is ready, you have to open Visual Studio Code with your web project. Click on the Git icon:

{{< caption-new "/uploads/2015/12/clip_image009_thumb.png" "Initialize git repository in Visual Studio Code"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAq0lEQVR4nCXIP0/CUBRA8TfL4KoLhPdHWu+77xLaRkKNHZo0cVEMq3wGFyMLfPZjxOEkJz83DAOlGCKKaEGyIpLR/P9VVZPSA67vnzFb89LveGoaTPXaxoyNFXK1IoWAm6YJtTULaVlIQyodyTpi6VhKyzx3+MeCO3zs0XbL7PWL27dvVp9n6uOF6njh/vDDzfuJu36PG8cR1ULwgRQTSx/wPuJ9IIZ4tT//BWAKT0juZWOQAAAAAElFTkSuQmCC" "355" "192" >}}

Fill in the message of your commit in the message textbox and press ctrl+enter or click on commit all (check) icon at the top.

{{< caption-new "/uploads/2015/12/clip_image010_thumb.png" "Do your first commit"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAeklEQVR4nE3JSw7CIBAAUK7SMHwqgx0+Q0KoC6Shxq1r738Nd43J2z3Re6eNQohEAdE7h6vDHX3b6OZQ1FpDjGPO/hy5lMScmCmlUmtmFmOMzOV8vdv+MHbVxmpjlTYOEdGL4/N1qcGyKG2U0hcABRLEOKa/k5Twf5cf8Y4b2uDFAowAAAAASUVORK5CYII=" "359" "189" >}}

Open a command prompt and navigate to the folder of your web project. Execute the following commands to do your commit:

```javascript
git remote add azure https://account@yoursite.scm.azurewebsites.net:443/estruyf-publish.git 
git config credential.helper store 
git push -u azure master
```


{{< caption-new "/uploads/2015/12/image_thumb.png" "Do your first commit (command line)"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAXUlEQVR4nCXMywpAERRG4Y1yiyFlaIJQeP+H+0/tM/iGa9F7D2MMtNZQa0XOGcYYaK0hhAAR/c45uPeyOSdKKQghIMYIpRSTUoL23lhr8bX3jpQSvPd8tdbCOcfRBxsMJcYpAn7OAAAAAElFTkSuQmCC" "632" "184" >}}

If you go back to Azure you can see your push on the deployment tab:

{{< caption-new "/uploads/2015/12/clip_image012_thumb.png" "Active deployment"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVR4nF3IMRLCMBAEQf3/RY5IgNRPMeZuby1KKg1FSofdTpuoi4xkzsm/30mifR4b2m+cM9F14C4yk4igqoh3kCnaeG54v/Oy6d2UC9uoRJUYY7DW4gu6DHMhy/fFbgAAAABJRU5ErkJggg==" "614" "154" >}}

The nice thing about the Azure portal is that you get an overview of all the past deployments:

{{< caption-new "/uploads/2015/12/clip_image013_thumb.png" "Active deployment overview"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAeUlEQVR4nCXMwQrCMBCE4bz/yyiC16IeC56sr1GaZHcTNqS/JM5l5jB8wZcrsj3JXZC6ozWTUiLGSM4yt4gQ2uOGbStHMdwLZkYpFVNFVXF3zvMk+HLBPiu7GPE4yPkvDqX3Pk8job3u2PfNLkotBdUhjtapt9bm8QdqFpgs7qOHVwAAAABJRU5ErkJggg==" "594" "211" >}}

### Pushing new commits

Once you executed the commands from above in your command prompt, you can do pulling and pushing from within Visual Studio Code. That means that you do not need your command prompt anymore.

{{< caption-new "/uploads/2015/12/clip_image014_thumb.png" "Push and pull via Visual Studio Code"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA2ElEQVR4nGPQ1zfQ1dXThwADQy8Pj7jQoJzM1Jy8DC9vVwZ7ewcnJ2dzcwtra2ttXb1lc+f+//nj19u3////37RlE4Oenr6Ojq6SkrKaqpq4pNS8qVP/fHj//fXr////b9iwjkFZWUVZWUVVVU1DXUNSUmrB/Pn/f/18+wYkvXzFUgY1NTVVVRDS0NCUlJRauGDh////374DGb5s+VIGiBxcesGCBf///3v9+tX///+XLluCLr1wIUj39+/fQYYj61ZX15CSlunr67t3/96pM6cePXo4ZeokAJrJbnr/WMMdAAAAAElFTkSuQmCC" "356" "302" >}}

## Update an existing application (clone)

If you already used the Git repository with another editor and want to use it with Visual Studio Code, you have to do the following things. First you start by creating a clone of your application. Open your command prompt, navigate to where you want to clone the application and execute the following command:

```bash
git clone https://account@yoursite.scm.azurewebsites.net:443/estruyf-publish.git
```


{{< caption-new "/uploads/2015/12/clip_image015_thumb.png" "Clone your application"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAI0lEQVR4nGMwMjLS0NDQ1NRUV1eXk5MTFBTk5ORkZ2dnAwMAPJEC4J5ejucAAAAASUVORK5CYII=" "587" "86" >}}

Once you done this, you can pull and push from within Visual Studio Code.

If you can to store your credentials, you have to navigate to the newly created folder and execute the following command:

```bash
cd your-application
git config credential.helper store
```
