---
title: Using the full potential of React in SharePoint Framework 1.8.0
author: Elio Struyf
type: post
date: 2019-03-14T21:10:02+00:00
slug: /using-the-full-potential-of-react-in-sharepoint-framework-1-8-0/
categories:
  - Development
  - SharePoint
tags:
  - PnP
  - React
  - SharePoint Framework
  - SPFx
comments: true
---

A new version of SharePoint Framework was just released and one of the great things is that some of the dependencies were bumped. In version SPFx version 1.8.0, TypeScript was updated to 2.7.2 and React to 16.7.0. The React version is not even so old; it was released in December 2018 and comes with some handy features like lazy loading of components.

Vardhaman Deshpande already wrote a great post about code splitting in SharePoint Framework. This method is great for dependencies but is a bit harder to implement for lazy loading components.

> **Info**: read the article of Vardhaman Deshpande here: [Code splitting in SharePoint Framework](https://www.vrdmn.com/2018/10/code-splitting-in-sharepoint-framework.html).

In React 16.7, you can make use of the [React.lazy](https://reactjs.org/docs/code-splitting.html) method in order to lazy load your components, but hold your horses. There is a small issue at the moment. The React types which are installed are still the same as in the previous version, this is 16.4.2. Which means you cannot yet use the latest React capabilities.  

> **Info**: an issue has already been created, if you want to follow the discussion, check it out here: [https://github.com/SharePoint/sp-dev-docs/issues/3605](https://github.com/SharePoint/sp-dev-docs/issues/3605)

## Updating the React types

Luckily you can update to the latest React types (or the one related to 16.7) by running the following command: `npm i @types/react@16.7.22 -S -E`

This is not all, one of the issues is that the React types you installed are not working with the currently installed TypeScript version (v2.7.2). The good news is that it is now also possible to update the TypeScript version used in the build engine.

> **Info**: Thank you Vesa Juvonen for the [tip](https://twitter.com/vesajuvonen/status/1106283047375327239)!

In this version, you can use any of the following [**@microsoft/rush-stack-compiler**](https://www.npmjs.com/search?q=%40microsoft%2Frush-stack-compiler) dependencies to specify which version of TypeScript which you want to use.  

For this example I will make use of **@microsoft/rush-stack-compiler-3.2**. Install it with the following command: `npm i @microsoft/rush-stack-compiler-3.2 typescript@3.2 -D -E`. 


> In this sample I used TS version 3.2, but if you want, you can also make use of TypeScript version 3.3 by installing the @microsoft/rush-stack-compiler-3.3 dependency.

Once you installed these dependencies, you need to update the **extends** property in the **tsconfig.json** file. Make it point to the newly installed rush stack compiler dependency.  

{{< gist estruyf cf8987b6cdd613698c0eabbf36e16be4 >}}

When running the build process, you can now see that it is using version 3.2.4 of TypeScript.

{{< caption-new "/uploads/2019/03/Screenshot-2019-03-14-21.17.33.png" "SPFx build process using TypeScript version 3.2.4"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAArUlEQVR4nDXKWU7DMAAA0dz/doiqCBLAplm8NFtJjNcOChUjzd+rmqbhuK5r+q7HqpHJLGzLzrbuxJ9MToXKWotSCikl6mrZo8fliEsRFwMxJEq+U2lt0FohhEAKSbdeGbaZ6fvG7j3BB1IsVMYYtHrALyHp1xHrbsxuwzlHipmj6kCDGrh0LRcpGUbLOE94F8i5UEp5QPN6RtUvtOcT7fMT5uON+fOdOC9/4L9f4NbjA09GDTYAAAAASUVORK5CYII=" "1018" "628" >}}

Once these changes are in place, you will be able to use the full potential of React version 16.7. Here is an example of the React.lazy functionality:  

{{< gist estruyf f4b3c39f2bee0c6795d7d90bcc66ef34 >}}

{{< caption-new "/uploads/2019/03/Screenshot-2019-03-14-21.27.08.png" "Lazy loading component"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAv0lEQVR4nC3LwWqDQABF0fmfimmjTmZiqqISCu3XuhEXghjxX6Ig6kJQ0RsqeXA3B57Yto1935nnmaZp6Puetm3puo5hGI7+TfDeuq4HTNPE89kwjuNhy7ywLAuiqmvquqZ8PEjTlKqqyLKMJEnI85yyLCmKAnFXCkcpQveGkhLP97FtG9M8obUmiiKU0gitvzE+LczTmQ/zC8uRBEFAEIbEcXwcPc9H/Pz+IS+Ki76i3umriyMlhmFgWTaue+MF58ufm0PHNagAAAAASUVORK5CYII=" "972" "620" >}}

As you can see in this sample, the component was created in a separated bundle file and got async loaded when the web part was loaded. This is very useful in many situations and this makes the SPFx version 1.8.0 a great release.

> **Important**: When you run into the issue that the build process throws the following error: "Cannot find module 'typescript'. You can solve it by installing the required TypeScript dependency like: `npm i typescript@3.2 -D -E`. Be sure to use the same TS version as the rush  stack compiler dependency version.