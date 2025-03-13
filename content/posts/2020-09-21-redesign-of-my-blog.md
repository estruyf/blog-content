---
title: Redesign of my blog with Tailwind
slug: /redesign-blog-tailwind-2020/
author: Elio Struyf
type: post
date: 2020-09-21T08:27:34.951Z
draft: false
tags:
  - Styling
  - Theme
categories: []
comments: true
---

Since the beginning of 2013, I have been using the same blog theme with a couple of small changes that I did over the years. Most of the time, I would change the primary colors, but that was all. Why would you change something which works fine? 

When I moved from WordPress to a static site, at first, I thought it would be an excellent time to redo the design, but the migration took a bit longer, so I just ported the design to Hugo.

A couple of weeks ago, I started reading more about [Tailwind CSS](https://tailwindcss.com). There are many people making noise about it, so it got my attention as I learn new technologies, frameworks, or tools by creating use cases for them and start implementing. I wanted to give it a try to make myself a new design.

After seven years, my blog finally has a new design, which is, in my opinion, lighter, cleaner, and minimal.

## Changes to the design

As changing the design is also an excellent time to get rid of some old code, I could finally get rid of a very old jQuery and AngularJS app/version.

jQuery was still a big thing when I started using the theme. I used it for the mobile menu and some other functionalities.

I used AngularJS for my custom search experience in combination with Azure Search.

In the new theme, I wrote everything from scratch with TypeScript and React. I only use React for the custom search experience.

## Website theme over the years

Here are a couple of screenshots of the history of the theme on my blog.

### 2011

{{< caption-new "/uploads/2020/09/redesign-2011-1.png" "Blog design in 2011 - list view"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAAklEQVR4AewaftIAAAGHSURBVDXBWXITQRBF0ZtV2W21PGCCcDCswvtfjD8hwISMEVYPVZkP+oNz7PHxUeM4EhFEBJnJrpRCZvLw8MA8z/jxeOTLp4/c3L3j6emJUgpmhpkxzzOZybqu+LoufP15ovx4ptbK5XJBEuPxSJbKsm5kJl6r8/nDPZdlY11XpmnCzGgCJJTBziVxviwgMQwDtVZ674zqTIeB6EZvG8VK4f72Gnentca2bUQE69bYerC1BhIevfPyesbMGIYBd6e1RqkTdbzCrLBsHfdh4P3dDSmY1w0zY7euK32ZiQgk4dE7r38uSMLMyEzMjMPhwDiOtNZYlgW3Uri9nsCMl1+/iQgkERGcTid2EYEbcH6b2bk77o4kzuczZsbOzHAJpmkiInh7e0MSu1orvXf+czNYlws9xDAMSGK3LAv/ScL5p9SBKzd67yzLgplRayUikISZUSRRC1RLJOHu7CICSewk4a13vn1/BgxDZCbFDCuGJKwUzAzPFJTK1holg8xkV0ohM7FaUSZ/ARhqA8B0TxJYAAAAAElFTkSuQmCC" "800" >}}

{{< caption-new "/uploads/2020/09/redesign-2011-2.png" "Blog design in 2011 - card view"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAAEaSURBVG3BwWrbQBCA4X8mq8qpTbFUBCn4Tfz+75BeDMkhAUMUy661K612puiQW75PjsejN02DmXE+nzEzVqqKmdF1He5OCOKs6rqmbVtyzqxUlZQSKSXGcSTc54XYf6JWUFXmeWa12f6kaIBiuDs6xQRl4e39nRgjfd9TVRUfH5/gxpJn3B0dxzt/n59JMXI6nUjTxMvrK49B+LWp2D7WVEEJu92O/X5P3/ccDgeGYaDrOq7DhSkvlJxxM8Lt353rcEFUud5uqCqXYeDpzxOLPIAUiguhbfb8bhtEBBHBzFCB7XZHvdkwqeDuKN9whGJGzplVKQV1d764Oyt3p5SCuzNNE6tQ9IG6/kHKC7Jk3J1VjJFxHHFVVJT/ESqsfROD0K4AAAAASUVORK5CYII=" "800" >}}

{{< blockquote type="info" text="Funny to see that I was already using a card view at that time." >}}

### 2013

{{< caption-new "/uploads/2020/09/redesign-2013.png" "Blog design in 2013"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAklEQVR4AewaftIAAAFzSURBVDXBTW4TQRCA0a+qq3tmTGwLgWKkRAJxh1yG67GBRVbcAE5ApAAbI9gAEUiO/2emZ7oIQn5PPi+X3uyO/CiZyeQR7oVSnGEY6HPm280Hbt6/wwQhnT/l/LBHgFRNWCwW5JwJIdD+/sqnZoLx4Nh3TKdTzIygyjgMdG3L9fU1FxdP2Bw6lAfuUEpB3RERRITv+8Dt/Irl3T1SRtSBOkUsBESU4o67cxbg1dULHtfCiGPFnWPfI4CI4KPTi3I5N17WNT8/Ju4PGVMRKjOauibFiKhiZqSU+Md95DBGbNtlqpTIOYM7okqMkZNdD6mq0c3qF+vNBhA0BFSVrus4iWZEevTtm9fsd2tUBS8Fd0dVOenanrtNwFbtjCKJqmmoq4qTPAz8l6irBvuz2lIXSMOIS0+73lJPGnLfI4eWFBRTRY+7PdX0jGo+w2IklIKEAOstlEKVEiaKDWNmHEeGYSCY0Tw7R1TR55eIKvHLLbP5nL9wdasV8z4x+QAAAABJRU5ErkJggg==" "800" >}}

### 2014

{{< caption-new "/uploads/2020/09/redesign-2014.png" "Blog design in 2014"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAAklEQVR4AewaftIAAAGdSURBVHXBO24UQRCA4b+qq2dmH7PrxbAII4EI8GkIuQ9XIOYQhKTEhETgcAUykpEs7H3Ms7vQEDnh++Tq543vdtc8O19jwUg5k1Jm0nUdXT/yaLPASoUXF1sYB06nPe5OSontdottahxQyZgPLbRH5ssli/mGGITJalbw+9hSzWo89RiixGrJqq4RESYhBPqmhTZR1EZmxFTgdLznujkgwTCF9XpNZRGtZgwpgYONKROKGdvHZ+Scmagq81XNj19XvKqfc8yOqoL4wKlpGJIzcXdUlQ8fP/H1y2fa/oSmDENWLARM+UdV2d12DK/f8O77S77dOBZUKCwwyQgmgplxsYy8f3tJDMrt3R3q7pgpMUZiUFQEVQV3mqbF3ZmoWQB3+mGgHzM5Z9qmIVpgtZwjIkx0GBPHpqMsCmIQRBVESCnxkFpQgmT2+wOnpiOlRIwRM+Mh60dnsTrn6ZMzyqLgf2xWlZTVnC4JXTMQBP7cHwixoCwKTJ2UHUMECRHUiAqlwXG2IJrhgARBRLCgQmkQAyCgIkQLqAoCZAcB/gJ97qyVrTjtqwAAAABJRU5ErkJggg==" "800" >}}

### 2016

{{< caption-new "/uploads/2020/09/redesign-2016.png" "Blog design in 2016"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAklEQVR4AewaftIAAAGzSURBVHXBsW4TQRCA4X9mZ/ecs+PcyQ4BAoEWUcEL8NA0FPAACFFRIKQ0ER0FSezEse92d5ALSwiJ75PL71/98uo35+fn7OVSKLmwN4wD7s5qtcba6YwXzyNjHthsNgjCMA64w2LRczSZ8ORsiTWzU1q/x4GTfklQoes6mibx8fMPSs28eXWGJb9jmjKxXXJQa0VV8d3I1c9fvL5YYCXM2fkD42ZDdSfFSN93iAjvXrZMe+XFxSmmviXKiNgUBGqtXF/fMDue4Y+f8fbRU/a0VCVXYTfsKKUgwHw+x8wYcqZtW9wdFWuoBFJKBFVEhNV6TSmFMWcOTMcbog8ICYvG/PiYveqOhkCtFVXFauwowwN5GCm1cltXxBSZNA1BFRFhz6ysmISCpA4RwcwQFdzBNCAi7NkgM24f1sh2TQgBC4HqldPlgll7xIE1ck8/BUknpBQBAZwQAn+zbW1Z3a3RcIsDi77HLPAvm8iGMBO06dhzd4ZhJMaIiHBgX75doiKoXpFS5H/s/YdPeBnJJTMWpTqcdca426Di7HJgPRjmNWNawR3B2RUl1hWTxslVMHW2WfkDl/fEvXAY8rsAAAAASUVORK5CYII=" "800" >}}

### 2017

{{< caption-new "/uploads/2020/09/redesign-2017.png" "Blog design in 2017"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAAAklEQVR4AewaftIAAAGRSURBVHXBu24TQRSA4f+cObs7tuP1goMTrxOBIkWUNFSIBiQk3orH4CWoKaCkoUTcpEhQUAQUHAeEjbM3zyAXLvk++fD6TZw7oShyQKjqmp0YI1vz+QKb3J7R22xAoK5qEFBVDg5usXNyNMXavkfbFrqOQZEz9hP6/R5mRt0FzhcrTsox2ltccTMfcmN/TFGM8D5DRDBz/Fp3PH/5mY9fL7DlKEfX1wyyDDHHVowRVaXMU549vcNgf4iNlit0NkXMEBFUFecUEeHtp++8ePWee3en2KXPSJcrMjMsSwkxIoBzjuufX7iv7zg9PcaK1Rqd5eAcqorGiJlhZjx6+AB78hgRQZejIReXV1R/14QYCSHSNA1ZltI1DW3TsmV7v/+Ql4dIkhBDRFUxc1RVRWIGTgkhoByVtDHQ1RUxBjabDlXFe48AMQREBJXzHySqJN6j6hBV6qahrhviJiAibFl3OKFrW6SqcWmKiLDlswzte8QMEcGy+YLBcQnOsSMiJEmCmmPHvlVrwtkZw70Bzjn+5x/E4ZCMK+DHbAAAAABJRU5ErkJggg==" "800" >}}

### 2018

{{< caption-new "/uploads/2020/09/redesign-2018.png" "Blog design in 2018"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAklEQVR4AewaftIAAAGGSURBVHXBTUtUYRjH4d//fh7PmzPjTGLElC3EsBdXUdBH7Tv0Adq3Clu0CVyFqJSgFCa+zDnnOc8dU0huui59/rDnv6qa6WSEOyzaFpmxlLNjgtOfF8SN+/dY6RNKHY5wdzwlhiGzMZtQlgWb61OiT8aMc8bdkYQkmrqirko+7Z/w7v0eb15uEcPRNyZPtymqEgncQYJgxutnc3brMw5iQ7Stx1y3HVeLFjPD3ZmujXGHgDPbecUMsO7gmBiMpqmoqoK6Llm0HV1KKGdS35NzxopHc0B0XWJIA32fGK3W1GVBN2QwI4SAkQe6lJDAAUmcX1xydb0gCiQxDBlLpz9YCcaSuyPEqKlZbSrkMAwD4MSwOWdwiIAkHOfq+oYuRkoT4q/oXw8Zv3iCQkASVVlwK90sQEIS0bc2ubxpccAk2q5nqViJNE3NrVgcn7C2uwPBEP9I4q7YPnzA2fkFf7iDxNJ0MqKuSm7FcPSd8fNtMGMpxoiZMDPuim8/fmF9/5C265HE//wGLpycR1kAYqcAAAAASUVORK5CYII=" "800" >}}

### 2019

{{< caption-new "/uploads/2020/09/redesign-2019.png" "Blog design in 2019"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAklEQVR4AewaftIAAAGNSURBVHXBPW/TUBSA4fece26cNI2dWKQt4kt0pAHxD/Jr2bKCWJg6MiFExcJWhFAEwU1bJ3F8D/VQiYXnkfefvzibmjLP6dRNQ3Kn4+6oCD9Xf7An5YRdneEOu7YlqtKmRDRjWpZ0np0cY0NgOBiAg6jg7qSUOJlO6fd6LBYL5vM5dinCy6LARHBARIhmqAhVVVFVFcvlEntugfV6DQ6iQqcYjchi5MP5R84/XdLYBfa13vDicEgQQVWJZrQpsW9bZq9e00rOw8cPsNlwiDjgTvKWJiUG/QG9GHl6nHN6NKPRgP3YbiktEENARWmBm02N47gq0TIyESwI9EJAAeGOO+O8QFWo93uSQxDQaS/DARfFuaPKan3F7WbDdrvFPSEi6MX1DSJCEAiiCDAejTjo91EzOikl7Gx0iHuicUdwOqurNQf9DBUluRMA+9Y0zPIRgxhRVf51vdtxzx6lxK/fK6IF3ME9AUI5Logh0DNDAPsuwtlkQhBQVaIZHQFUlXv25u07joqC210DKvzPX/u/m+P8XHT2AAAAAElFTkSuQmCC" "800" >}}

### 2020

{{< caption-new "/uploads/2020/09/redesign-2020.png" "Blog design in 2020"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAAAklEQVR4AewaftIAAAGKSURBVFXBwU7UUBSA4f+ce25nyrQdJGFAYIMxroDEh2ZrfACWxrWGrQtjwrgxDAxgb9vpPVp3fp98/PLVQ0rs1zVjzmR3+nFk4u6YKj/vN9jV62NS26IaeG5bYjRyzrjDyeqQnDNX5+eo7HYsioIyBFZNzXI2583xMe9OT8m/X/hwfc2qqbG1BC6XDUEFEUFEKMyYeFVTVRWbzQY7E+dh+4iK0lQLJsMwEM34cbemfnXA3XqNfksd82JGYcY4jizKkkVZUsRIDEqbEtvnF+xyf8ksRoS/RHhpE44TzShi5Ggvoqbo7eaRNiW6rqfrOrquo+97ZjHSirIua6ga7GCvZD6fowgTEXB3umHgbHXI29MTVAQLKTEUEXdHRQABnGiGhcDE3bGjpgYRihhRURxHAHdIKVHGghgNvX14ZBwzwzDQ9z1VWbIoS2ZFRIKhQXF37GLZEFSZOHC/3TKZFwUiyjhm1Az7vht5f9CgIqgqOIjwzy5nVAQVwW4+feYG59fTExYMdydGQ/jfH8LFocEltqAFAAAAAElFTkSuQmCC" "800" >}}

## Comparison

Nothing is better than a comparison side by side. That makes it easier to see all the differences.

{{< caption-new "/uploads/2020/09/redesign-comparison-1.png" "Homepage comparison"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACcSURBVD3BMU7DQBCG0W9mdl1AIityQ8An4P4X4QJQkBIJyVRJZudHFOY9e3v/EFW03rnfrszHI+uyUBKZibmjMWineWaeOi2Cz8uFdVn4k5kYRo/ge/uhNYSbMaq4ZrJzc9wdMyd6x2XG7Z5gxtP5mZ0kciRSMfVOM3MinBaN02Fi5+FIwt05PD7QvraNUcU/idf1hSoREYwSVYNfrrtD1dcfDdEAAAAASUVORK5CYII=" "1980" >}}

{{< caption-new "/uploads/2020/09/redesign-comparison-2.png" "Article comparison"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAADPSURBVDXBzUrDQBSA0e/OT5SxbQrWkLrQ4hsoiOvq3mfy+QTBpYLLtgrSLtRKTGbmShY5Rx5fXrXwDuc8sesYhcDZ7JisSs4ZI4aUIu6irjksPO1fy/tmzWJxTs6ZrGCtxVrLdrfFpBRx1mKsoUEYiCqqiiCMxxOcAvumQUSoqxmDlBOSBSPC988ee39z9fDVJrz3zKsKAVSVt+cnfmMixsjpvMasO8toUlKWUwRBROh9fO5YrTY4X9Bz13dLTkIgHBQYIwwul7doVqZHgd4/UKhO93smbs8AAAAASUVORK5CYII=" "1980" >}}

{{< caption-new "/uploads/2020/09/redesign-comparison-3.png" "Speaking page comparison"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAklEQVR4AewaftIAAAC8SURBVFXBX0vCYBTA4d8577HNNC/8k5RXgqD2JboK+vBBfgRREAJDm7nN+W5v7GJIzyOr9Tq0rUUZAsXlQjuKmD0/UVw9KqDOkZ7PaJxl9OIuD3aHyzOm40dqu+2Gr31C8puT5Tm2+vhk8ZLiopgCpZGcUjgeaU0mxPdd7PX9jV6nA6IcTj805ss55hQzY/99wEIAMwMRxv0BoaqoOafURITRsI+qU2oqgnDjfUngRsuy4uo9KoKq0hDhnz9sED/7oDkBKQAAAABJRU5ErkJggg==" "1980" >}}

{{< caption-new "/uploads/2020/09/redesign-comparison-4.png" "Search page comparison"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACmSURBVD3BQU4CQRCG0a+qm44NgcUQXE2Crr3/GbyB0b1uxUB0ZJqu37DA9+z59U21VpY5MU2/rFdLTscj33NjjmBTCm0+kx+GgcUig8TXeWbcbvHdjtYuYJBT4vNwwHsEKSWEcZp+uDE3kjvujuR4zglJlFJ43O+5UYgIIYnNekW+HwauWu8kMyKCK3PDzDAzar0jv7x/0Hrnn8TTOBIhzI1LFxadP2TGSaYl4FUxAAAAAElFTkSuQmCC" "1980" >}}

## Something about Tailwind

Tailwind is a utility-first CSS framework. Which allows you to write less CSS, but more CSS classes in HTML. At first, this feels a bit weird, but it is very powerful. 

The most significant difference is that the framework does not have any predesigned components like most other frameworks. Using this framework means you have total freedom and control over your design and might make it harder to start. 

{{< blockquote type="info" text="The Tailwind team is currently working on a Tailwind UI website (in beta) to find sample UI elements." >}}

My first experiences were good, but the HTML tags can quickly get overloaded with CSS class names. Luckily you can also add CSS the regular way and reuse the CSS from Tailwind with `@apply` and specifying the class name.

## Feedback

If you spot an issue or have feedback on the theme, feel free to provide it, the comments are open.
