---
title: "Securing your Azure Functions with an existing Azure AD app"
slug: "/securing-azure-functions-existing-azure-ad-app/"
author: "Elio Struyf"
type: "post"
date: "2021-04-15T14:47:07.155Z"
draft: false
tags:
  - "Azure"
  - "Azure AD"
  - "Authentication"
  - "OAuth"
categories: []
comments: true
preview: "/social/9e514a26-1116-4961-bb72-b4fa471ba13c.png"
---

This article continues the previous article about using the OAuth On-Behalf-Of flow in your Azure Functions. In the last article, the Azure Function only verifies the JWT Token, and if valid, uses it to request an access token and get data on your behalf.

{{< blockquote type="Info" text="Link to the previous article about [Using OAuth On-Behalf-Of flow in a Node.js Azure Functions](https://www.eliostruyf.com/oauth-behalf-flow-node-js-azure-functions/)." >}}

Now you can make your Azure Function or App Services, in general, more secure by adding Azure AD Authentication. This way, users first need to log in before they can use the website or API. The configuration is "pretty easy," but the experience recently changed a bit. With this change, you could run into some issues. In this article, I want to highlight the steps for secure your existing Azure Function and the things you have to be aware of.

## Securing your Functions App

{{< blockquote type="Important" text="Be sure you followed the previous article to get a good understanding of the configuration aspect. [Using OAuth On-Behalf-Of flow in a Node.js Azure Functions](https://www.eliostruyf.com/oauth-behalf-flow-node-js-azure-functions/)" >}}

When you open your Function App on the [Azure Portal](https://portal.azure.com/), navigate to **Authentication**.

{{< caption "/2021/04/secure1.png" "Secure the App Service or Function App"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAklEQVR4AewaftIAAABSSURBVF3BwQrCQAxF0ZukScGl2/7/95VRBJEZX+lioHqO7Y+n1lxYq3B3TpIwM668IqhM3J2ptYYkrhzjxxiD17d4fzqSmJbRO8pkigi2+41/B5FmHBJAfacpAAAAAElFTkSuQmCC" "1917" >}}

- Click on the **add identity provider**. 
- On the next screen, you can choose between creating a new application or using an existing one. In my case, I will use the **Provide the details of an existing app registration**. This way, I can use an app registered in another tenant. Not only that, but it will also show you what it uses.
- For the **Identity provider** pick **Microsoft**.
- Provide the `client id` and `client secret` from the application registration you created (if you followed the previous article).  If you use the **Create new app registration**, you can continue and skip the next steps.
- Leave the issuer URL blank and also the allowed token audiences.
- Click on save.

{{< caption "/2021/04/secure2.png" "Using an existing app registration"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAklEQVR4AewaftIAAADvSURBVG3BjUoDMRCF0W8mN8m6XaHv/5SFqt02P2NXEKR4jl0ulxhjcHB3zucz/xGWyNnZto2YwWN/oJz5KyKQMWmtse87M8ACxhwQEIAZpJTQE2aGUuIxoT92xhgsy0Jyp9bKQU+4O5IYLdj3xuGzffG2LMhEGKj3jiTMHXknl0IpBTPj0MfgoBjBbb8xysDdqaXwI4JfPSYKC/ps9HtnXVdqrbwqZqj3zkESn7c71+uVwFlPG0UQAZLQ6bQyxiTnTBvB/fZBBCSbzGnUWnF35J6QMmZGzMY9eAoOZkAEc07UWkMSkvjoxvu2Ye68+gYtVXe/WIfHVAAAAABJRU5ErkJggg==" "735" >}}

## Allowed Token Audiences

In the previous section, I told you to leave the **allowed token audiences** blank. You should provide a URI or GUID of the application identifier. Now recently, Azure AD automatically gives you the `api://<client id>` as the identifier. The problem is that this identifier cannot be used for the allowed token audience.

{{< caption "/2021/04/secure3.png" "`api://<client id>` is not a valid URI"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACmSURBVG3BQW7DMAxFwfcpWWIL5P7nDFonDmmBjRfZdUY/+7NM4NNB/EtAf4Rx5oH2pPcNSSAQoqqoKr58o7sdjNvA3YkIMpPWGhJUFZcxhL2RmVQVl7UWEUFEcKkqqoreWsPMkIRax8Y3l2bCR+Ojn+dJ7521FiuTx/3OmJMTyMOYcyKJHvvO7+vFnBNJ3NyRBGZcKpMA+nRHAkls26CA4s3Eh28bf8iES0kg0XWvAAAAAElFTkSuQmCC" "730" >}}

To avoid this issue, you can either specify a URL when setting your Azure AD App - Application ID URI or update the existing one. 

If you have an `api://<client id>` application ID. Open the Azure AD App, and navigate to **expose an API**. Next to the disabled input field of the application ID, you have an edit button. Click on it and provide a new URI. The Application ID URI must be from a verified domain within your organization's directory. 

You can verify your custom domain on the **branding** section under **published domain**, or you could use the `https://<tenant name>.onmicrosoft.com`. Make sure to provide a unique URL, for example: `https://<tenant name>.onmicrosoft.com/app/obo`.

Once you updated this ID, you can add the same ID on the Function App, its identity provider.

{{< caption "/2021/04/secure4.png" "Providing a valid audience URI"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACdSURBVG3BQW7DMAxFwfdFMrKR+P7X9M6VbImNCwToIjPa9z3HGAh4bRsRwTduseCR1FqRxJh85T99cvWDo52YGZngbgiRJJlJuOOvRdhzIyIYY3CeJyJB/MmEx6Pg13XRe8fMyExaa3wsy8JtzolLopRCZpKIMwu3IhhjUGvl5ryZGZIwkmd1IgJJ/OeSOI6D1hpmxrquSLwlHzPFL7SuRX/Z0pOoAAAAAElFTkSuQmCC" "723" >}}

To call the secured Azure Function, you will have to perform the same steps as in the previous article. First, get a token, and pass that in the authorization header to your Azure Function call.

{{< caption "/2021/04/secure5.png" "Calling a secured Azure Function"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACcSURBVG3B62qDQBCA0W9ua7Rgyfu/oyCNFLrrTOuPQCg5R/Z9r8ykqnB3IgJV5T9vrZF5oiJEm7hkJu7OK9+2jXVdsXDGGFyO4yAzWZYFM6Oq8PM8qSpeuTutNUSEi4jgyzyjqmQmqkpEYGZkJk8ign/e7/TjG20NCvpZVAnhganw5Pzpjy9+ylg/Jpor72hVYbeZyYQ+kj6Sd34BBBFCrKmCUnQAAAAASUVORK5CYII=" "993" >}}

## Issues logging in

If you used the previous article's app registration, you would notice that you cannot log in straight away to your Azure Function. It will tell you it cannot retrieve an ID token.

{{< blockquote type="Info" text="You do not have to follow these steps if you are never going to go directly to the Azure Function. For an App Service, this makes sense to do so." >}}

You can solve this issue by setting the `oauth2AllowIdTokenImplicitFlow` property in the Azure AD app manifest to `true`, but that is not the end. When you would try it again, it will tell you the reply URL is not defined.

Go back to your Azure AD app, and on the **Authentication** section, add the following redirect URL: `https://<name>.azurewebsites.net/.auth/login/aad/callback`. Once this is in place, the authentication will work.