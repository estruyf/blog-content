---
title: Getting up to speed with Node.js and npm
author: Elio Struyf
type: post
date: 2016-08-03T15:39:17+00:00
slug: /getting-up-to-speed-with-node-js-and-npm/
dsq_thread_id:
  - 5037181852
categories:
  - Development
tags:
  - Node.js
  - NPM
comments: true
---

Recently Microsoft announced the SharePoint framework. This framework makes use of the latest trends in the developer landscape like client-side development and integrating open source frameworks. For many of us, this was great news. The framework will be a great way to build new things for SharePoint.

Of course, the SharePoint framework requires you to learn a couple of development tools with which you might not yet be familiar with.

From another blog post I wrote about [the new way of developing display templates](https://www.eliostruyf.com/a-new-way-of-developing-display-templates/), I noticed that some of you are not yet up to speed and/or require some guidance what these new tools are and for what they can be used. That why I thought to start writing a getting up to speed series which will cover topics like Node.js, npm, Gulp, Yeoman, ...

In this blog post, I will cover Node.js and npm.

## Node.js

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto1.png" "Node.js logo"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAuElEQVR4nE3OPwuCQBiA8fuMOUSBn6HJ7AMYCUERVKslON0QwQ2HSy2BBZX9IYkcuqOhsYY0w3vfKBr6fYHnIfhHKYWIjDHf9xExz3NCKXWH7jNLZtupvJ7jU6zrOqWUc+55HimVS6Zh9gfdWq/ScVtVo6ppmt2wC8VCs90k4SaUQkbHw3gymkcB48yqW0IIx3F2+x0BAAWf5CN7bC/rhQju6Q0RAQEAiPpCwPSVhnK1FsskSxB+m29lho+9SZVn3AAAAABJRU5ErkJggg==" "203" "124" >}}

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

Node.js allows you to write server-side JavaScript code and is used these days to build client applications, web applications, and more.

### Windows installation

The installation process for Node.js is fairly easy. Go to the [https://nodejs.org](https://nodejs.org) website and you will find two big green squares. The left one is the **LTS **or** Long Time Support** version, currently v4.4.7. Version 6 will become the new active **LTS** in October this year.

> **Info**: [Node v6.0.0 (current)](https://nodejs.org/en/blog/release/v6.0.0/)

On my machine, I installed the current LTS version v4.4.7. Once you click on it, the installation file will be downloaded to your machine.

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto2.png" "Windows versions to download"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAaElEQVR4nAFdAKL/APL48uHs4dbf1tPd097k3tnf2dff19bf1ufw5/f79wBeo10DbgEjgSIGcARcoVtCk0EOdQ0kgSIEbwOZxJkAvdi9msOZo8iimsKZvNe8p8ynl8KXpcikjryN0uTS8zY43VZ15eMAAAAASUVORK5CYII=" "326" "97" >}}

Once the file is downloaded, run the installer.

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto3.png" "Windows installer"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAiklEQVR4nHWJSw6CQBAF5/63cqMSGH4RovSM8QACC0Hj0N3PKJEYo5VaVZl1WdqmseQy7xdTcin5VWwNcwAUUNFJNMyy3AFtu7MZLsPhtM/zbAoT3qgqgK7vzXW8lT4vqkzlmb43My/199YXf/fnYGYWYREAbdsZIuf9cZbIJYmNbBEX9a6qN9voAddb4UwlvrDQAAAAAElFTkSuQmCC" "514" "399" >}}

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto4.png" "Windows installer finished"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAlElEQVR4nFWJ4QrCIBwHff+3CloEy9JFUVOjB0iNphPaX3/RotWO+3IcWzUNb1uu9E6bSd7qrTKLmjOiJ1CAUspQ8LUMQLHuxkIXzteTlCL1KcY+hBhDfHQBgPee9TE1RjTH976POOdSSgCc94yIMFLm/PbUE7P9P4iIcqacAVhrmVLamMtHpTTf8DUXtThIuV9W1Qsf7t/4MKRhqwAAAABJRU5ErkJggg==" "514" "399" >}}

If you completed the installation, you can open a command prompt and run the following command:

```bash
$ node --version 

OR 

$ node -v
```

Once you ran it, you should get the following output:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto5.png" "Node.js version"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAdUlEQVR4nCXNWw7CIBBAUZZiIgYYYPBVCwNDpV9GTJpq3P9WTGNyv88V7089xh3YgwHpUBmQ/7TZO6/EusxXgnsrRAMGSDRQvmUemZNHLdb+zEz99WitYDCFY51SnajNjMGI79IzjzFdTmfvvNouVoLdfI/6B/VyGKxM6sPiAAAAAElFTkSuQmCC" "140" "62" >}}

### Using Node.js

When Node.js is installed on your machine, you can start making use of it. The easiest way test it out is by creating a new folder and navigate through it within a command prompt.

In your folder, create a new JS file "hello.js" and paste the following content in the newly created file:

```javascript
console.log("Hello, I'm executed by Node.js.");
```

Run the following command:

```bash
$ node hello.js
```

Running this command results in the following output:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto6.png" "Hello.js output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAARUlEQVR4nAXBCw6AIAgAUE/SdCsrWpGSgEqf+5+q91ziqb5r+0Af4HvE4lMdYPcxhnkJrjbuJqJkpt2EhTIdV0GRjOf2A2aEC7VnZsbEAAAAAElFTkSuQmCC" "234" "57" >}}

This is a very simple example of just logging something to the command prompt. The next step would be to try and run something in the browser. To do this, create a new file called "web.js" and insert the following contents:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello, I'm now running in your browser.");
});

server.listen(8080, (error) => {
  if (error) {
      return console.log('ERROR: ', error)
  }

  console.log('Server is listening on 8080')
});
```


> **Info**: this code is making use of the **HTTP **module with which you are able to create your own HTTP server - [https://nodejs.org/api/http.html](https://nodejs.org/api/http.html)

The code creates a new HTTP server and initiates it on port 8080. If you run the following command:


```bash
$ node web.js
```

You should get the following output:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto7.png" "Console output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAJ0lEQVR4nGOwstGzsNU1tdQ0MtXQ09fS09fS1dPQ09fU09fSN9ACAFoLBZSFeejYAAAAAElFTkSuQmCC" "475" "53" >}}

When you navigate to `http://localhost:8080`, you should see the following message:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto8.png" "Browser output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAOklEQVR4nB3BQQoAIQwDQP//TLNiUxrBngq9CDszMOHuAM7RWt8EzPbN7O6qGiQlxc/pJCNCkpll5gOnZTcvtAOfMgAAAABJRU5ErkJggg==" "263" "55" >}}

As you see in these simple examples, Node.js can be used in various ways. Node.js can even be used to help you with development tasks like minifying JavaScript, transpiling SASS to CSS, transpiling TypeScript to JavaScript. These so called jobs can be automated via task runners like Gulp or Grunt. More about this in the next blog post.

## npm

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto9.png" "npm logo"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAh0lEQVR4nAF8AIP/ANRZWOGMi9htbNhoZ+GNjNZjYtpycd+FhOCIh9NZWADlmpn34+Pkl5bwx8byzs7jlZX009Puvr7tvLvgiYgA3Xx85qGh2Glp8MfH9dvb3Ht756Sk3H1923h32GloAOuxsO24tuOQj9lrathra+iko+y0s+yyseuzsuyysoHMUmpAuK1bAAAAAElFTkSuQmCC" "243" "94" >}}

> npm is the package manager for JavaScript

Node.js and npm go hand in hand. Npm is a JavaScript package manager which is used by Node.js and is similar to what NuGet is for .NET. Npm makes it easy to install packages via executing a command like:

```bash
$ npm install <package_name>
```

All packages which you can install, can be found on the official npm site: [https://www.npmjs.com/](https://www.npmjs.com/).

Npm will automatically get installed when with Node.js. Execute the following command to see which version is currently installed on your machine:

```bash
$ npm -v 

OR 

$ npm --version
```

This command gives you the following output:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto10.png" "npm installed version"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAWUlEQVR4nB3GCQqAIBQAUQ8iPzXIpci1NAsjsu5/pEgYHoNMIjrheGO/w3rBcoLbu+2BWMFGgrSR9S35sNoNQpFRUzlSOVE1UaEYcn4uJYdgOO9bjAv22+YDAOcP1FVFan8AAAAASUVORK5CYII=" "180" "59" >}}

### Installing packages

You have a couple of ways to install new packages. The first one was already highlighted above:

```bash
$ npm install <package_name>
```

For this example, install the **express** package which is a fast and minimalist web framework: [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)

```bash
npm install express
```

Once you executed the installation command, you will see a Node.js process in your task manager:

{{< caption-new "/uploads/2016/08/snip_20160806085705.png" "Node.js process"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAVklEQVR4nIXFMQ5AQBBA0b3/oaxWIVGxkagEBTskYqwJ+Tqt1zzHDzNDYsTN285+Jk570Ov+VrvRZGhKzLLiikHxbY9vhLwVfIj4sJAFoZoO6mmk7DpeBy5x8kOxVzgAAAAASUVORK5CYII=" "529" "134" >}}

If everything goes well, you have a similar output:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto11.png" "npm install output of express"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAIAAACgHXkXAAAACXBIWXMAABnWAAAZ1gEY0crtAAABTklEQVR4nEWQ25KrIBBF/ZWJQHeDgJeAoojiJU5N1fz/70wlJ6nz3LV2772KzrFuKt1c+sRcZH7mPn0pfRNQApbFFNx55evK5yNv2/zzc56PbAwA3pDKwihoO4gR50QxUnfnUvEXegO8FaaCplXTROdDbjvljZwXTcuRPmdtUFUwjDhOkDc5RWwa9qatRlPTOMFxyG2X5yn3QzonVFUivehKwzCIIYDvxbxgnHGc0PdgDC9qQ7aWacHrW62Z1pW8B2O5VAyJvWgDwwgvCIYAXSech6YVz921IWMpJfr9rYYgjGVcPEv9H1ZpCCOmhfpe1A2X6lnqrcVqqlu5ZjofatvlcUrfC1UxAR9aaYgRcqa7E91d2JpV+mPNaqwb1fe4H8+A61LLSsZ8tPz73bRiTpgW9L2QqmT86x1uNdqalpX2Qy4LhgDOQwjYdkIq9gdvc1n2x09IuQAAAABJRU5ErkJggg==" "241" "389" >}}

Once executed, all the required modules for this package are downloaded into the **node_modules** folder, which will get automatically created if it did not exist.

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto12.png" "node_modules folder created in the directory"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAa0lEQVR4nE3JQRLDIAgFUO9/0Y5JBAUxaMJPp4t2+rYv+WDi2ruWUlprtdbKnPNmY0REmtPNuvtcawGICADarYpe952AINpzzte1ni9VZSZ3T4HntZXj2AH8WkSI6Dw/DWqiIv9tZiIy53wDlo+Qk7cgjGwAAAAASUVORK5CYII=" "392" "179" >}}

Create a new file called "express.js" and insert the following content:

```javascript
const express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send("Hello, I'm now running in your browser with the express package.")
})

app.listen(8080, (error) => {
  if (error) {
      return console.log('ERROR: ', error)
  }

  console.log('Server is listening on 8080. Navigate to: http://localhost:8080')
});
```

This does just the same thing as the code in the web.js file, but it is a bit easier to read. Instead of using the **HTTP** node module, the code now makes use of **express**.

> **Info**: with express you have a lot more features that can be used like routing, template engine support, and more.

If you run the following command:

```bash
$ node express.js
```

You get the following output:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto13.png" "Console output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAJ0lEQVR4nGOwsNWzdjCwstczNtcyMNQ2MNTW09fU19fUN9Q2MNAGAF2IBcXF2PXUAAAAAElFTkSuQmCC" "479" "50" >}}

When you navigate to the `http://localhost:8080` site, you should see this:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto14.png" "Browser output"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAHElEQVR4nGN48uTJ82fPX7588fjx4+fPn79HBQCl6ht6DiI4PAAAAABJRU5ErkJggg==" "352" "51" >}}

### Installing packages and storing dependencies

If you read everything from the npm install output, you might have seen this message at the end:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto15.png" "package.json warning"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAJ0lEQVR4nGMICDC2sTI2NTMyNTM0tzAyNTOwtDK1sjazsTE3NzcCAGgqBpTKpxw3AAAAAElFTkSuQmCC" "624" "20" >}}

This warns you that there is no package.json file in the current directory. The package.json file helps you to locally manage which npm packages need or have been installed. In the package.json you can place a couple of useful things:

1.  Specify project information: name, description, version
2.  Project dependencies (also for developer dependencies)
3.  GitHub repository
4.  License

> More information about the package.json file can be found here: [https://docs.npmjs.com/getting-started/using-a-package.json](https://docs.npmjs.com/getting-started/using-a-package.json)

The easiest way to create such a package.json file is by executing the following command:

```bash
$ npm init
```

When you execute this, you will see that it ask you a couple of questions.

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto16.png" "npm init questions"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAYklEQVR4nB3ESQ7CMAwAwDyFAyVOvSVeVLOU/z8LUWk0rd56vCSLI2fE9NDI/zoRqbfMFRdzMWdzWcYeKjpg3JuHRM6jbC4052XEAkiPHbet39r5rc9Z9QxzZhkXIO7EQAw/lM4WjIyIWWgAAAAASUVORK5CYII=" "576" "246" >}}

When all the question are answered, you end up with a similar package.json file like mine:

```json
{
  "name": "blog-examples",
  "version": "1.0.0",
  "description": "This is an example project for getting to know Node.js and NPM",
  "main": "express.js",
  "dependencies": {
    "express": "^4.14.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Elio Struyf",
  "license": "ISC"
}
```

Once you have the package.json file in place, you can make use of -save and -save-dev install flags.

**--save**

The save flag adds the package to the dependency list. These dependencies are the packages that are required in order to run your application.

**--save-dev**

The save-dev flag adds the package to the developer dependency list. A developer dependency could be a package you only need for building your code. Like for example: a TypeScript transpiler or SASS transpiler.

Execute the following command in order to register the dependency when installing:

```bash
$ npm install express --save
```

Once executed, you see the following output:

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto17.png" "Install dependency"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAQklEQVR4nAXBgRGAIAgAQOepuzQFgiLELGv/ifoP1vP1QRvQ3nL2WB3N1kMXqwlpDqrcb3nG7r4RFRFgAaTMAjFNP676DYGW/+s1AAAAAElFTkSuQmCC" "348" "70" >}}

If you now open the package.json file, you should see that the express dependency has been added:

```bash
"dependencies": {
    "express": "^4.14.0"
}
```


### Installing packages from the package.json file

When you have a package.json file in place and it contains dependencies. You do not have to specify these packages names when reinstalling them. The great thing about it is that npm will automatically check if the package which packages are installed and which have to be downloaded.

As this folder will contain a lot of files very quickly when more and more dependencies are added. Most of the time the node_modules folder gets excluded from source control systems.

When you start from scratch, you only have to execute the following command to install all the dependencies:

```bash
$ npm install
```

You can also test this by removing the node_modules folder in your directory and executing the command. After the command has ran, the node_modules folder should be recreated.

{{< caption-new "/uploads/2016/08/080316_1525_Gettingupto18.png" "Running npm install"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAi0lEQVR4nEXJSw6DIBQAQC5Trfo+AiofRRSRaO9/oC5s0mR2I5aM6cOxkEsvt1fOQ4y07ZQONqYT6+qvK9z3GsKgtbRWWz9ORjs/EbeiV90SMJ9wZLSu5b4GrABrwBrpLaRCYzkddN2cM0nVPPEQUlHc+CxUCueTQwCpmn/3EqyDPeE8gxoa4l88/QXcoiTCOFOgtAAAAABJRU5ErkJggg==" "350" "195" >}}

### Installing packages globally

The last option is to install packages globally. Most of the time you will do this when you are installing command line tools. Examples are: gulp, grunt, Yeoman, npm itself.

In order to install a package globally you need to specify the **-g** flag:

```bash
$ npm install -g <package_name>
```


## Useful resources

*   Node.js documentation: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
*   NPM getting started: [https://docs.npmjs.com/getting-started/](https://docs.npmjs.com/getting-started/)
*   Google

## Getting up to speed series

The files used for this article can be found here: [getting up to speed series](https://github.com/estruyf/blog/tree/master/Getting%20up%20to%20speed%20series) on GitHub.

Other articles in this series:

*   Getting up to speed with Node.js and npm
*   [Getting up to speed with Gulp](https://www.eliostruyf.com/getting-up-to-speed-with-gulp/)
*   [Getting up to speed with Yeoman aka "yo"](https://www.eliostruyf.com/getting-up-to-speed-with-yeoman-aka-yo/)
*   [Getting up to speed with webpack](https://www.eliostruyf.com/getting-up-to-speed-with-webpack/)