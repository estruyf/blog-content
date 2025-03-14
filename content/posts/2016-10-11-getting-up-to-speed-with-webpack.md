---
title: Getting up to speed with webpack
author: Elio Struyf
type: post
date: 2016-10-11T08:29:58+00:00
slug: /getting-up-to-speed-with-webpack/
dsq_thread_id:
  - 5213803959
categories:
  - Development
tags:
  - Gulp
  - Node.js
  - NPM
  - Webpack
comments: true
---

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto1.png" "webpack"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA8ElEQVR4nFXP0WuCcBAH8P7b9rr9CUV76KF6ac9BVhIEE3vUclCgUeC2HyWNHOiklPiVuRR/drdhkdG9HNwH7u6b+7vWCfDd9PWVnwBmw9ylfW+O4mTbkL2G7ImT7Wr9e2NEbCubmuA883aJt2uCww3WgOmOlAFQ0GiR/3moknyFFDv2q0pP5xNnRuy8eeWe8/RCHuuk3HNaigcZMxYPtK9qlxS4RYFbVLpEVpcsjrPlEPi7TzLn+rOmOP0g8+BAAeD2eRosYYFPj8E+SdhdMETUdV2SpOFQUTVtNBqHYXjHURRRSg3DME3TsizXdS/8D2hHCTCsf2ozAAAAAElFTkSuQmCC" "400" "400" >}}

After the introduction of [Node.js, npm](https://www.eliostruyf.com/getting-up-to-speed-with-node-js-and-npm/), [Gulp](https://www.eliostruyf.com/getting-up-to-speed-with-gulp/) and [Yeoman](https://www.eliostruyf.com/getting-up-to-speed-with-yeoman-aka-yo/). It is time to spend some time on another tool called webpack. Webpack is a module bundler and is one of the tools which is used in the building process of a SharePoint Framework client-side web part.

In this article I will tell you more about webpack, what does it do for the SharePoint Framework and how you can use it for your own projects.

## What is a module bundler?

As a SharePoint Dev. we or the most of us have included/injected JavaScript files in SharePoint to do various things. Most of the time these files had none or a few dependencies. This made it easy to maintain (if you knew what you were doing of course).

Nowadays when you start building applications with JavaScript or TypeScript and want to work in a structured way. You quickly end up with a lot of files and dependencies. Of course, you do not want to include all these files to your page, as this would result in a lot of HTTP requests. This is where a module bundler comes into play.

A module bundler like webpack can group files and "glue" them together in a bundled file by taking the dependencies into account. The outcome of using webpack would be to end up with a single file or a couple of bundled files. This results in fewer HTTP requests.

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto2.png" "Definition of a module bundler"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAk0lEQVR4nCWOMRLCIBAAeanv8AH2Vv7Azg/Y6liFSaXGoGcBQoBwVhkkgUxwNNtssc0SROy6Lv+Zptk5pTQMwziORCnF2N3opnq81rt6u2fV9QIAlFLO+S/XjLW2ORS3xeq43JwoLQCgLEshBDHGaK1jjCklen5y2eacvf9Ya733JIQgpUTEvu+l4G9084BzLsb4BYd0hkbocHDOAAAAAElFTkSuQmCC" "624" "312" >}}

## How webpack is used in the SharePoint Framework

When you open a SharePoint Framework project, you see the following files:

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto3.png" "SharePoint Framework React project files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA8ElEQVR4nFXMyU7DMBRAUf8FQ1uV2O95SBPiIXFkO0MzUKpWsKQr/v83EEhIIJ3dlS4Zp2Vcz7VzWhtjrDHWOjev8zCMfT+QvCiGeQohSqkQOAACIKNAKWMMSKkP8dhUldXWCqmQi18SuSCSs74zyTdlrjDbC5b9Re7s6TC9t9ebu35C93bvTg/164/zo1vJphozN+bDJVxu4fKR+ZdNNWz1uNXHXdUTpE9G4lxXSnDM9hLovzmgUFxF14aYXN00TVsUz5QCoEAUBJEzFIVrp2lelnVZFu+91kapHAC/M3BRGp9iSqmLMYUQrXWcC0T+BeaxN5JXTFBUAAAAAElFTkSuQmCC" "337" "331" >}}

The default structure for a client-side React web part is clear. At the top of every file, you can see its dependencies. When you run the **$ gulp bundle** command, it kicks off the bundling process:

> **Info**: you can also run **$ gulp bundle --ship** but this will also minify the JavaScript file.

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto4.png" "Gulp bundle output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAABnWAAAZ1gEY0crtAAAA2ElEQVR4nEWPWW6FMBAEuQ08bGa8Ah7jNWBy/xNFJkSR+q/Upe4hf+21OQpSG2Y0Q5yfsAWmBabhOFzOx/19UTxQCqWFUSgFAHw6Jr+mTPddr1a423E3QnK+jG+byMZEVyvnmRa3S7ehWBDnB4+DP7aU/H3X1gojp2Mg2ozCV95x7viVH7SuCuB/WsftF3vCEFa3Wi0Auv9tt1avK3Mi4R3sG1ilNQhkHT/H6tkK856HaPp4QJwBPl0eky85+hh88HZbrZFG/ckd2RBdqSGmnQiFnDgf+fLmB5bbReUDsGokAAAAAElFTkSuQmCC" "519" "585" >}}

Once the bundling process is completed, you end up with the following output (in the **dist** folder):

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto5.png" "Gulp bundle output files"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAZklEQVR4nDXJ6w6CMAwG0L3/OxrJCNAIo6O7fNN2QDTx/D0OaKXAzFT186OqFZCU1boTiX54LAuFbRMRZsb3JOw7AFdQp3kmokPk+ks5xXigNffWc6LX4MenH9fA2k/rF0dZA+fabrU1cfDjUaKZAAAAAElFTkSuQmCC" "374" "147" >}}

Only the JavaScript and map file are important for running your client-side web part. The other files are statistics of your generated bundle.

If you open the JavaScript file, you will see that are your file contents have been added to that one bundle file (even the CSS).

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto6.png" "Bundled JS file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAxUlEQVR4nDWPW47DMAhFs5bY4WkDrlvnMfvf1yiNi474OdKFu6hKaa7hVKu5RhQm2n6zICKZkXkWrZ7NgYlT3vKXW/fdxl/roxy7nqeOwdelDwsAvD86du2dI9gd/b5zb3daVIVYUsY1w7rmh5QmizCrlfaK6GGmRbmUGwCYr2lY9PZ6N6sqjAiAXzc1W/0cTdyqk+rdKuc8NRHhto2jn9e1n+FW7qoIM5yZU0oudZxX66EiTKQihDjDEaCQlEpImH/zhP8D+P42twGUU3cAAAAASUVORK5CYII=" "624" "688" >}}

So as you can see, the advantage of using webpack in the SharePoint Framework is that only one bundled file is required (and a couple of external files like React, Office UI Fabric, etc.). Webpack has more to offer than bundling, it can also do things like asset hashing, file loaders, plugins and more.

## Using webpack in your own applications

Of course, webpack is not limited to being used only within the SharePoint Framework, it can be used in any of your client-side dev applications.

### Simple sample

Start by installing webpack. You can do this either globally or locally in the project. If you want to test it out from the command prompt, I would be recommended to install it globally:

```html
$ npm install -g webpack
```

For installing it locally to the project, you have to do it like this:

```html
$ npm install webpack --save-dev
```


> **Info**: notice the **--save-dev** flag which defines that it only needs webpack as a developer dependency.

Create a new file called **app.js** and add the following content:

```html
var testing = require('./app');
testing();
```

Create a new file called **index.js** and add the following content:

```html
var testing = function () {
    console.log("Webpack: Hi, how are you?");
};

module.exports = testing;
```

This is just a simple example in which you load a dependency and execute the function from within that file. Once you have these files in place and have installed webpack globally you could run the following command:

```html
$ webpack index.js bundle.js
```

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto7.png" "webpack bundle command"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAW0lEQVR4nAXBARJAIBAAwH7CNGMSSqWL6nKk4f8/ssuQoH25ffi8Kedt81PYlXWTsbNeJcsYSjk82BhBr3IQ3aKEB6O0FCNnbh8KQX3Ou+JVUyJVKETUJvRi5D9v8RKCcUWq2gAAAABJRU5ErkJggg==" "441" "153" >}}

As you can see in the above screenshot, it will bundle the two files (index and app) together into one bundled file. To show you that the bundle file works, you can run:

```html
$ node bundle.js
```

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto8.png" "Run the bundle file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAQElEQVR4nCXCSw6AMAgFwJ7FKBhswARaHgs/9z+VCyfTvDa8lBfjobw50VEyJs0kO9fmYVWBCg9VEzU5OvO+/D9seAs2DIJgNAAAAABJRU5ErkJggg==" "351" "59" >}}

### Using a webpack configuration file

Webpack can also make use of a configuration file to simplify the process. In the configuration file, you specify various things like the entry file, bundle file name, which loaders have to be used (will be explained in the next section), plugins, and more.

Start by creating a **webpack.config.js** file in your project with the following contents:

```javascript
const path = require('path');

module.exports = {
    entry: "./webpack-sample/index.js",
    output: {
        path: path.join(__dirname, "webpack-sample"),
        filename: "bundle.js"
    },
    module: {}
};
```

Once the configuration file is in place, you only have to run the following command:

```html
$ webpack
```

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto9.png" "Output when running webpack command"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAbklEQVR4nBXGWxKDIAwAQG5SKxBxxsdQEl4hotz/UE73a1VsrtwuFI2sfwSIQBGIYNv14mbVextPF2GRmlLQZjLma2F2q1mcVlk2uQO3yBwrR0yrJ/t/C4e3aj8hFT+GXFd5hlTGXH3OGIo56fMCqlAX2Qf34MgAAAAASUVORK5CYII=" "402" "150" >}}

To make sure everything is still working, run:

```html
$ node bundle.js
```

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto10.png" "Output running the bundle file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAARElEQVR4nAXBWxKAIAgAQM9igc74qIxUAqcP7n+ndt3QtKy+X1Yryw7Ra3K6CYignrsTmcx9DFLlp7dcYogboAf0GPwPgZQLrgo4cIEAAAAASUVORK5CYII=" "350" "70" >}}

The current configuration requires that you manually run the webpack command to generate a bundle update. Of course, this process can be automated. You do this by adding the watch property to the configuration file:

```javascript
const path = require('path');

module.exports = {
    entry: "./webpack-sample/index.js",
    output: {
        path: path.join(__dirname, "webpack-sample"),
        filename: "bundle.js"
    },
    module: {}
    watch: true
};
```

When you run the **webpack** command once again. You will see that it now waits for file changes:

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto11.png" "Running webpack in watch mode"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAtElEQVR4nAXBCW7DIBAAQF7S2OEw5rA5F1hck6pJJUdq//+czpCMspzS13tE6iIPkacsYuJK38UykzHO5/fXefYxjtYSZRNjs5BUmUVKSjLK2jcoIYPL4D0Il1nvUDGYjZEQzXjg79/1fv9c16v1WFvI2Tu42fRBxujP1wM7HJ8Vimf8xsWk7bI7s66c+MJL3/oBDVPDnKrMTSICoDU7JdosPtiGqdS4O6WNMFYqxVc9rXr+B4xWKRAqn2hGAAAAAElFTkSuQmCC" "407" "277" >}}

### Introducing loaders

As I already showed in the SharePoint Framework output. You can also add CSS files into your bundle. By default, webpack only allows you to bundle JavaScript files. To be able to bundle other file types like CSS, you need to specify a loader.

A loader is a module for webpack that defines how webpack can bundle a specific type of file into the bundle.

As an example we will add a **style.css** file to the project folder with the following contents:

```css
.someclass { background-color: darkblue; }
.someclass p { color: white; }
.anotherclass { padding: 50px; }
```

In the **index.js,** add the require statement for including your **style.css** file like this:

```javascript
var testing = require('./app');

require('./style.css');

testing();
```

To show you that webpack is not able to bundle this, run:

```html
$ webpack
```

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto12.png" "Running webpack without any CSS loaders"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAcElEQVR4nCXJURaCIBAAQG5SQsDyfO7iLkmBiJZ1/yP10fyOKi22Q0qn/ESKjshOaDwMHrQHrda2rO0hKSYhHwYHF6IRcbT/5gzHWc/v/vr0/s51421fUtEcDDqjJECRuCXud6kcmSacLdJ19rcA+geN1RbXrh0mjgAAAABJRU5ErkJggg==" "485" "198" >}}

Right now we have to install the style and CSS loader in order to use them in webpack. Run the following command to install it into your project:

```html
$ npm install style-loader css-loader --save-dev
```


> **Info**: there are a lot of loaders to bundle other assets like JSON, TypeScript files, React files, ... Here is a full list of loaders: [https://webpack.github.io/docs/list-of-loaders.html](https://webpack.github.io/docs/list-of-loaders.html)

Once installed, replace the module property in the configuration file, with the following code:

```javascript
const path = require('path');

module.exports = {
    entry: "./webpack-sample/index.js",
    output: {
        path: path.join(__dirname, "webpack-sample"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    watch: false
};
```


> **Info**: _test_ is a regular expression for specifying the type of files. In the _loader_ you specify the loader to use for bundling the file. In this example we need the style and CSS loaders.

Run webpack again.

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto13.png" "Running webpack "  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAcUlEQVR4nAXBCxKCIBAAUG5SoIBSLijQuvwcZKbuf6PeY1ggXTbSK2az+xXsbJ0EO69GKC1Yq2WMO+eTEu4HcPGYZq70pBcplWAH6tx8bUQploqBloDv3utZnAHONqtS+Xx/o9+tXQnJBXQhOAhi888/mbAXlPhwh/gAAAAASUVORK5CYII=" "403" "168" >}}

Open the bundle file and you will see that it now contains the CSS:

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto14.png" "Bundled file contents"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAQ0lEQVR4nB3EiQ3AIAwDQIYhcWxDH7r/bhVIp2ueA3SpZEZk79Ej9kcbz+1vXS/XokQgkdgfTbanJFhlgwRRLBSyCj+XQw5HWo0u1QAAAABJRU5ErkJggg==" "624" "158" >}}

### Using plugins

Oh, yes there are plugins. Plugins allow you to add functionality to the bundling process like creating the statistics, cleaning build folder before bundling, uglify / minify the bundle.

> **Info**: here you can find a list of available plugins: [https://webpack.github.io/docs/list-of-plugins.html](https://webpack.github.io/docs/list-of-plugins.html).

As an example, we will test the **UglifyJsPlugin** plugin which minimizes the outputted bundle file.

Add the following line at the top of your **webpack.config.js** file:

```javascript
const webpack = require('webpack');
```


> **Info**: make sure that webpack is installed as a developer dependency to be able to use it.

In configuration, add a new plugins property:

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./webpack-sample/index.js",
    output: {
        path: path.join(__dirname, "webpack-sample"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    watch: false
};
```

Once this is included, run webpack once again and you will see that the outputted bundle file is now minimized.

{{< caption-new "/uploads/2016/10/101116_0811_Gettingupto15.png" "Minimized bundle file"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAkUlEQVR4nC2LiwmEMBBE04toCxd1N9lv1hpMzv7LOCQ3DAyPx6T7vp/n6b1//xlzeu9jjLQsS86ZmYgqIpSC+54BzuPYiWratg0R3O26ojWLcDONaGYqwn89QVWYWYTdzUzNNK3rWkqZLMJmqipmWmtlpvcNcLbW3C0iVGW2NVeVV+f8IaoAgIilICICnMzETD9ALTZ/3L2T3QAAAABJRU5ErkJggg==" "516" "339" >}}

### Ready to ship?

Are you ready do ship your application to production? All you have to do is run the following command:

```html
$ webpack -p
```

This will bundle your project and minify the bundle file, this is similar to using the **UglifyJsPlugin**.

## What is next?

Webpack can do and be used for many things. This was just a start to show you why webpack is being used in the SharePoint Framework and how you can leverage it. If you want, you can also run webpack from a gulp task in order to combine it with other tasks you might have defined: [https://webpack.github.io/docs/usage-with-gulp.html](https://webpack.github.io/docs/usage-with-gulp.html)

If you want to dig deeper, check out the following sites:

*   Webpack: [http://webpack.github.io](http://webpack.github.io)
*   Webpack documentation: [http://webpack.github.io/docs/](http://webpack.github.io/docs/)
*   Webpack dev server: [https://webpack.github.io/docs/webpack-dev-server.html](https://webpack.github.io/docs/webpack-dev-server.html) > this starts a development server on your machine and automatically re-bundles, refreshes when you make changes to your files.

## Getting up to speed series

The files used for this article can be found here: [getting up to speed series](https://github.com/estruyf/blog/tree/master/Getting%20up%20to%20speed%20series) on GitHub.

Other articles in this series:

*   [Getting up to speed with Node.js and npm](https://www.eliostruyf.com/getting-up-to-speed-with-node-js-and-npm/)
*   [Getting up to speed with Gulp](https://www.eliostruyf.com/getting-up-to-speed-with-gulp/)
*   [Getting up to speed with Yeoman aka "yo"](https://www.eliostruyf.com/getting-up-to-speed-with-yeoman-aka-yo/)
*   Getting up to speed with webpack