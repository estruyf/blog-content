---
title: Exclude your mock data and other modules from your production bundle in SPFx
author: Elio Struyf
type: post
date: 2017-11-24T21:17:39+00:00
slug: /exclude-your-mock-data-and-other-modules-from-your-production-bundle-in-spfx/
dsq_thread_id:
  - 6307734381
categories:
  - Development
  - Office 365
  - SharePoint
tags:
  - mocks
  - services
  - SharePoint Framework
  - SPFx
comments: true
---

When creating solutions with SharePoint Framework, in many cases you might want to call some API endpoints. Like for instance the SharePoint rest API or Microsoft Graph.

To speed up your development, testing and overcome issues like [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (cross-origin resource sharing). You might have implemented some mock data objects or mock services which return static data.

> **Info**: more information about CORS can be found here: [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

When using the local workbench for development, you will have to make use of mock data/services to mock the SharePoint API calls. This has to do with the CORS security limitations in your browser. Your browser is not allowed to call the SharePoint API. Creating these mock services is not that hard and is already documented in the SharePoint Framework documentation.

> **Info**: Check out the SPFx documentation about how you can create mock services here: [Retrieve lists from mock store](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/connect-to-sharepoint).

When implementing your mock services, you can make use of the **Environment.type** object to check where your code is actually running. This allows you to be in control over when your mock will be used.

One of the issues, when you are using mock data or services, is that they will be part of the JavaScript bundle which gets generated. During development or unit tests, it makes perfect sense that the mock data is added to the bundle, but what about production? You probably do not require this, so it will take up some unwanted space in your bundles.

In this article, I will describe a way how you can exclude the mocking services or any other TypeScript modules from your production bundles.

## Example: normal behaviour

In my sample project, I have two services: Development and Production. Both of these services are imported into my web part as follows:

```typescript
import Production from '../../../services/production';
import Development from '../../../services/development';
```

When I bundle my project and check the bundle statistics, I see the following output (gulp or gulp bundle):

{{< caption-new "/uploads/2017/11/112417_2108_Excludeyour1.png" "Development bundle statistics"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAIAAABrQaqyAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAB8ElEQVR4nE3J708ScQDH8e8f12Q5qkctoTgohOYK2RSaMJCpTQcIt7ShwB0yMODggDvuFwIe91NIfijJ2HrkA8NRzbn+g4b0oO21z97bB7ApsoLiVKJIIAUCyZfiGIkUqESRRAr1HAOw/fTxbiLpj/ls7i37uvfdmu+9KxVAUn6kHMNAHeNqObaWY0+yzHQzdDVDPwTTLDeATAkKLSq0qNKiQgnqLGhRpoRWVQESwUvklEiczlZ8CIk4PWMlIFf4Nqe2WbnNKv9wSouVz2ipxSmgWapnDtM4iuWiX4oJDEexfDyLo1g5iUsVHjTw6oH/MxqOxoKRyM4eCseiwUgCjiOhQ75UAxLJX0q9gdq/kLvD9uB7dzQ6vxp1rgZKv8XJQCg1Llv9/nm31+5cdHqTH7f3v+/+3N2Pr28UWgAqJQy7g+n9tSM3xdG34a/byc/xZHx90z5RAZMmagWWr9S5Aj1DZ0kGq1TzTD3PAdei4/X8K7MWWtRClicmsxayPDW9ffbGqNFt2DzAbXGuGGwuq8Nlda4a7Z6ltQ/mFYfJvqxf2rKvgw2bJ+QNfNoMR3b2wl7//kcY9gUDru2QN7Dt2ASr0LJh7gWk0UEanfGx3jC3AGkWTPMv9Y+eu61OkIseo7vRJIwcwfH/IEjwoHiU/ws0fUSgsq48JwAAAABJRU5ErkJggg==" "151" "251" >}}

Now when I bundle my project again, but now with the **--ship** flag. I get the following output:

{{< caption-new "/uploads/2017/11/112417_2108_Excludeyour2.png" "Production bundle statistics"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAIAAADw0OikAAAACXBIWXMAAB2HAAAdhwGP5fFlAAACHUlEQVR4nG2Q/08ScRjHP3+gP9Rc2uZwKTAtSiSziNsMmhgYNnRLBMLNHxTFL9wdAh52fN0xM+6OL8fnvh+wucw522ou+7F9bLlWba+99vzwPO9newMmXSoR+XKqUEkVijhdxOkyieYSka8eVEBuM0PF09HXIWzCGfQseJ+99EzNhOff5uIZeocC1WyFyZSLJJ3bzRZJOo8f0ntUkaCZTPkoxwCJh0pDUpuyIWhaU1EbstqQlbok86LMiwDWBJkXISs0j+uQE3RB1QQVuaWIbBuINUFvqT2929EMQ9G/nF/8uLy6uvz+7eKrxEMAP6KLOst/qB4V3ufZY/b89Oz05NPZyWcULnOwJ3Z7Srcj6jpU9bZqQE1vqx1RV+oSqDMcmSAOSWp/J0XhWUQSuZCm61UO8AyLbyX3t0l8cy8Z36WIA3ILp4hsapvgmNp1OOx0odGFRkfQO4LehYYhaEZLQ+FirS1ybYmDIov85yBxEEhs+1cD/yJxEF3f7P4FqkXhJa2p/Bf0e31x7d3cyqovEvOFb7zqj0S9ocTyBpif9M6MPHdbMLcFe2F2uc0YwoJhw0+DzgBYeOKbvGt7PDTxaPDBtMnxcGB8asg+bXLYB21L2Bvgd8yO9JnG+y2WW/fu91utt0dtd8ZsA2OjfcNBVwD47SjcY8U8FsxtdqEvv8MXnQGwvrQWnQvFfOGYb+Xa4dircMwXicwuJ0IbPwFshb1uims2uAAAAABJRU5ErkJggg==" "151" "312" >}}

> **Remark**: The size of the development.js file does not really matter, but you can see that the size changed a bit between debug and production build. This is because for production your code will get minimized.

In this case, it is a small mock service, but in larger applications, you might have multiple mocking services available. All of these mocking services take up some extra space in the bundle which are not actually necessary.

## How to exclude your mock services

In order to exclude the mock data and/or services, you want to make use of the **if (DEBUG)** statement in your code. When bundling your project for production, **DEBUG** will be **false** and the uglify plugin in webpack will remove everything wrapped in the block of code.

Here is an example:

```typescript
if (DEBUG) {
  alert('Only during development');
}
```

In this example, you will only see the alert during development, but not in production. The same process can be used for optionally loading modules in TypeScript.

If we use the previous example again. What you actually have to change the way how you import your modules. In order to optionally load a module, you will have to change the import to this:

```typescript
import Production from '../../../services/production';
// You will need the next two lines in order to get type safety
import * as Dev from "../../../services/development";
let Development: typeof Dev.default = null;
if (DEBUG) {
  Development = require('../../../services/development');
}
```

The bundle statistics for development stay the same. When you now generate the production bundle, you will see this:

{{< caption-new "/uploads/2017/11/112417_2108_Excludeyour3.png" "New production bundle statistics"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA0CAIAAAA8ID43AAAACXBIWXMAAB2HAAAdhwGP5fFlAAABjElEQVR4nO2UbUvCUBTH7ycNelFQEPRARc9WmkmbbnPqtHy4zt1N193utruZ25yzkoL6UFFZmUEvoxfCj8OB3+Hw53C5YETj2AyGJJwiNoKn/gOwaxjloMbLGi+rfPO9aQuywtYH2Ad2Fas52Mkr4wkOtnm5IygK24iwDzxosTuZlbmlzYW1veXt7cWNrcX11fkV8TB3S/qA1s1yUsxspYTDrHQqcvtMdjfD7KQvU8XYCIF1da1xMi5oeh51BEXPI11EuKh9LG9auKRhSTOk9hflti6iIekDX3VdSLymNUlXtp2ace8MQA9R2jBdSCbxmpZdxXczDWfandJO3aANcxIXErt6PdY9hQbIDZDnf1QfvT7AOyd61ZXzQvFMEE6yUjrPJZhSWry6kGpMZeTGoNuyuQRTSHLsQYY/ZnNHF8UzgTtmSylh5A7flrdogLxQ7Y6r6vUU6kHrK/nPaNZntH98VDrT5E/1b78iHYCblmNXsVMzJqF1k1T0WysC9zQeGEFsht8gYYT95+jxBdD8Fum4tx8wAAAAAElFTkSuQmCC" "60" "312" >}}

No more development.js file is shown. The development service got excluded from the production bundle. This is, of course, a great optimization to your bundle.

> **Info**: You can read more about optional module loading in the TypeScript documentation: [Optional Module Loading](https://www.typescriptlang.org/docs/handbook/modules.html).


## Check out the code

In order to check out the code and test it out, I created a repository on Github which you can check out here: [https://github.com/estruyf/exclude-modules-spfx-sample](https://github.com/estruyf/exclude-modules-spfx-sample)