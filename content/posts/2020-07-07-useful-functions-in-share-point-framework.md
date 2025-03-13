---
title: Utility functions which you might not know existed in SPFx
slug: /utility-functions-install-extra-dependencies-sharepoint-framework/
author: Elio Struyf
type: post
date: 2020-07-09T09:05:30.405Z
draft: false
tags:
  - Development
  - SharePoint
  - SharePoint Framework
categories: []
comments: true
---

Utility/helper functions, every project uses them, but how do you get them to your projects. For our products, we use a common/shared library private npm package. By sharing this package to all our products, we do not have to reinvent the wheel every time, but also have to fix things in one place when there is a bug. 

Besides the internally shared library, we, of course, also install external packages. These give you quick and easy extra functionality, but sometimes this additional functionality is not necessary to add, because we also have it in our toolbox without knowing it.

When you create a new SharePoint Framework project, you will install lots of these packages, and there are a couple of useful ones that would allow you to install yet again another extra dependency.

## Why?

A while ago, I checked out a project for someone and saw that they used the `uuid` dependency to generate a GUID. When I asked why they were not using the `Guid.newGuid()` functionality from SPFx. They answered that they did not know it existed.

There is nothing wrong with this, because how could they have known? Only by luck or when you go through the code of the installed dependencies.

In this article, I want to highlight a couple of useful utility/helper functions that we came across and started using in our code base.

## @microsoft/sp-lodash-subset

Lodash is a popular utility library that many projects are using, but did you know that SPFx already provides you with a subset of some Lodash utility functions? You can find this subset under the `@microsoft/sp-lodash-subset` dependency. The list of utility functions grows with each release. At the moment in version `1.10.0`, it provides you 51 of Lodash functions.

Here is the full list: `assign`, `camelCase`, `chunk`, `clone`, `cloneDeep`, `cloneDeepWith`, `constant`, `debounce`, `difference`, `differenceBy`, `differenceWith`, `each`, `escape`, `escapeRegExp`, `extend`, `find`, `findIndex`, `findKey`, `flatten`, `forIn`, `fromPairs`, `get`, `groupBy`, `has`, `intersection`, `invert`, `isElement`, `isEmpty`, `isEqual`, `keys`, `merge`, `noop`, `once`, `random`, `round`, `set`, `sortBy`, `sumBy`, `throttle`, `times`, `toArray`, `toPairs`, `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniq`, `uniqBy`, `unset`, `update`, `without`.

In your project, all you need to do is import the wanted function as follows:

```typescript
// Import your utility functions like this
import { find } from '@microsoft/sp-lodash-subset';

// Start using them
const people = [{firstName:"Elio"}, {firstName:"Seb"}];
const person = find(people, p => p.firstName === "Elio");
```

> **Info**: Lodash also provides a modularized way of installing these utility functions, but if you already have them installed, why not reuse what is already in place.  

## @microsoft/sp-core-library

Another useful dependency from SPFx which gets installed by default is `@microsoft/sp-core-library`. This dependency contains a lot of useful utility functions. I will highlight a couple of useful ones, but if you are interested, definitely check out the code inside the `node_modules/@microsoft/sp-core-library` folder.

The dependency contains functions that are exported and readily available to use, but it also includes some hidden in its `lib` folder. You will need to import the ones from the `lib` folder differently. Do not worry. I will show how you can use both.

### Public available functions

#### Guids

The first handy function is GUIDs. This utility class helps you to generate/validate/parse GUIDs. 

```typescript
import { Guid } from '@microsoft/sp-core-library';

// Generate a guid
const myGuid = Guid.newGuid();
// Returns undefined when it isn't a guid
console.log(Guid.tryParse(myGuid.toString()));
// Throws an error when it isn't a guid
console.log(Guid.parse(myGuid.toString()));
// Checks if the passed guid is valid
console.log(Guid.isValid(myGuid.toString()));
```

#### Session information

In case you want to know when and how your users navigate through your intranet. You need to know when their session started and when they visit other pages. The Session class, which is available in the dependency, provides you an `applicationId` and `pageId`.

The `applicationId` is a unique ID that gets generated when a new session starts and will get removed when you close the browser/tab or press F5 for a full page refresh.

The `pageId` is a unique ID that changes per page.

```typescript
import { Session } from '@microsoft/sp-core-library';

// Session information
console.log('pageId:', Session.pageId);
console.log('applicationId:', Session.applicationId);
```

> **Info**: The good thing about these variables is that they are generated and cannot be pointed directly to a user. These uniquely created IDs make it GDPR proof.

#### Formatting strings and working with text

String interpolation commonly used these days. Working with these backticks \`\` has made it easy to insert variables in your strings, but in some cases, it would be useful to make use of template parameters such as `{0}` or `{1}`. The same way we were used to in C#.

The reason why this is useful is when you are working with localization strings. That way, you can create localization strings like: `This is my {0} label` and update the template parameter with the value you get in your code.

Such functionality is not so hard to create, but it is already available.

```typescript
import { Text } from '@microsoft/sp-core-library';

// Working with text
const myVar = "stricker";
// Text formatting with template variables
console.log(Text.format(`This is my {0} label`, myVar));
// Replace all occurences - This way you do not need to use regex
console.log(Text.replaceAll(`This can replace all the i-s from this string.`, 'i', 'I'));
```

#### Other functionality

There are some other functions to check and validate solution versions and variable validation. Never used these, but if you are interested, definitely check them out.

### Other available functions

Besides the public exported ones, there are a couple of other handy functions that you can use. When you check out the `lib` folder of the dependency, you will find classes/functions for browser detection and utilities, URL utilities, and more.

In case you want to use any of these, you first need to include the localization file of this dependency to your project. If you would not do this, the build engine throws an error that it cannot find the `resx-strings` module. To solve this, add the following to the `localizationResources` property of your project `config/config.json` file:

```json
"resx-strings": "node_modules/@microsoft/sp-core-library/lib/resx-strings/{locale}.js"
```

Once the localization reference is in place, you can start using the utility classes.

#### Browser detection

Want to know which browser your user uses? Then you can make use of the `BrowserDetection` utility class. This class has a `getBrowserInformation` method which will return you the browser type, version, and OS.

```typescript
import BrowserDetection from '@microsoft/sp-core-library/lib/BrowserDetection';

const browserInfo = BrowserDetection.getBrowserInformation();
console.log(`Browser`, browserInfo);
```

#### Browser utilities

Want to know if your solution is running in Teams, an iframe, mobile, ...? You can use the `BrowserUtilities` class for it.

```typescript
import { BrowserUtilities } from '@microsoft/sp-core-library/lib/BrowserUtilities';

console.log(`isEmbedded:`, BrowserUtilities.isEmbedded());
console.log(`isMobileBrowser:`, BrowserUtilities.isMobileBrowser());
console.log(`isSharePointiOSApp:`, BrowserUtilities.isSharePointiOSApp());
console.log(`isTeamsBrowserHosted:`, BrowserUtilities.isTeamsBrowserHosted());
```

#### URL utilities

One last useful utility class is for working with URLs. It is called `UrlUtilities`.

This class contains functions to concatenate URLs, remove leading or ending slashes in the URL, and some validation.

```typescript
import UrlUtilities from '@microsoft/sp-core-library/lib/url/UrlUtilities';

console.log(`isRelativeUrl`, UrlUtilities.isRelativeUrl(location.href));
console.log(`isRelativeUrl`, UrlUtilities.isRelativeUrl(`/temp/workbench.html`));
console.log(`removeLeadingSlash`, UrlUtilities.removeLeadingSlash(`/temp/workbench/`));
console.log(`removeEndSlash`, UrlUtilities.removeEndSlash(`/temp/workbench/`));
```

*Did you find another useful function? Feel free to share it via the comments*
