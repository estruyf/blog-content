---
title: "Make your auth provider work in GitHub and Gitpod codespaces"
longTitle: "Make your authentication provider work in GitHub and Gitpod codespaces"
slug: "/authentication-provider-work-github-gitpod-codespaces/"
description: "In this article, Elio explains how you can create an authentication provider that works with a proxy to redirect you to the desktop, GitHub Codespaces, Gitpod."
date: "2022-12-08T08:32:01.320Z"
lastmod: "2022-12-08T08:32:01.321Z"
preview: "/social/8342dd97-88e1-4005-bebb-3145ea951efb.png"
draft: false
comments: true
tags:
  - "Authentication"
  - "GitHub"
  - "Gitpod"
  - "VSCode"
type: "post"
---

In the previous article, I explained how you could ensure your [URI handler works in GitHub codespaces and Gitpod](https://www.eliostruyf.com/devhack-vscode-uri-handler-codespaces/). Now it is time to explain more about making an authentication provider that works on GitHub codespaces and Gitpod.

## The authentication flow

In the extension I am working on, we use the [OAuth 2.0 Authorization Code with PKCE flow](https://oauth.net/2/pkce/), which is the recommended flow to use as it improves the security of the callback.

The high-level flow looks as follows:

{{< caption-new "/uploads/2022/12/vscode-authentication-flow.png" "Visual Studio Code - Authentication flow"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAklEQVR4AewaftIAAACxSURBVE3BTUrEUBCF0e9WVXdQB44UJSCC4P5HLsGJbiGQUVCctS2xY94rf0ikz9HT4/ND27a3ktiebTg2HwoIXt9e+rhsL+6ub67ua0kyk+njCw9DJjiFLMn+fe/BQgJz4+S8YTVPBXPDQgSLTChT4XN3ILaOuRGNY2GYG8ZCAkn4xkHCG0cmVsYikz8y8WseZ2pJVsaxTLIm4odAxr/ouq4fx5GsCQJJrLImMjEMQ/8N8YlCHSzeGgEAAAAASUVORK5CYII=" "1584" >}}

On step number 1, the user gets redirected to the browser (or a new browser tab if opened from GitHub Codespaces or Gitpod) to log in. Once the user is logged in, they should be redirected back to the origin, which can be Visual Studio Code on the desktop or in codespaces.

## Redirect URLs

I used [Auth0](https://auth0.com/) for my sample as it is an excellent service for testing these authentication flows.

To make the above Authorization Code flow, you must register the allowed callback URLs. If you do not do this, it should stop the Authorization Code flow and tell you that a given URL is not defined. It is a security measure to prevent unwanted services from redirecting logins to their applications.

For my authentication provider, I was originally using the desktop URLs, which looked as follows:

- `vscode://<publisher>.<extension name>`
- `vscode-insiders://<publisher>.<extension name>`

Auth0 allows you to define URI schemes like `vscode://`, but not all services might support it. To overcome this issue, they recommend you use a proxy.

As I did not need it, I skipped the proxy until I had to support codespaces. In the [previous article](https://www.eliostruyf.com/devhack-vscode-uri-handler-codespaces/), I mentioned that GitHub Codespaces and Gitpod get a particular URL for the URI Handler to work on callbacks.

Examples:

- **GitHub**: `https://estruyf-opulent-capybara-4grqx5g7953754v.github.dev/extension-auth-callback?state=5d6adcfd65b9595ea01f177eccf938c7`
- **Gitpod**: `https://project-p63remja22j.ws-eu77.gitpod.io/vscode-extension-auth-callback?vscode-reqid=1&vscode-scheme=gitpod-code&vscode-authority=eliostruyf.vscode-remoteuir-handler`

To ensure that your Authorization Code flow can redirect back to GitHub Codespaces or Gitpod, you must add both URLs. Of course, it is more complex because both URLs contain random parameters, so you must use wildcards.

- **GitHub**: `https://*.github.dev/extension-auth-callback`
- **Gitpod**: `https://*.*.gitpod.io/vscode-extension-auth-callback`

Again, your service might not allow you to use a wildcard in the callback URL; if this is the case, you should use a proxy. 

I started testing the extension on GitHub Codespaces, and it worked fine. When I switched to Gitpod, I received errors that the callback URL was not defined. A double `*` asterisk in the URL seemed to be an issue. I tried with only one asterisk, but similar problem. That is when I required a custom proxy.

## The proxy and how to redirect

Like the Visual Studio Code documentation told me, I had to create a proxy. Visual Studio Code uses one itself: `https://vscode.dev/redirect`. Unfortunately, you can only use it for Microsoft-owned domains; if you use it for Gitpod, it returns an error message.

{{< caption-new "/uploads/2022/12/vscode-proxy.png" "Visual Studio Code - Proxy only allows Microsoft known endpoints"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACTSURBVG3BMQ6CQBBA0Q+7FoYoseECxo5Ye1XvxR20kBJnZ2F2RDuN71XHU389tPteRDAz/lFNQ6y8nNu2vXRdR84ZESGEAFS4F3KeGcdHHVml2SlVwWYjhMDbUpx5AU2Jt8hq0YlFJ0SEX+58RFZNs2Wziez2DcUKZoa7A46IIvIkpvQcbrc7dV2jmnDni7uTsw4vhXZZHbUZgB0AAAAASUVORK5CYII=" "1066" >}}

A custom proxy it is, but what does it have to do?

1. Retrieve the redirect call;
2. Get the URL to redirect at;
3. Pass all other query string parameters to the redirect.

**Step two** is tricky, as you need to know where to redirect. For this, I used the same trick Microsoft used on the GitHub and Microsoft authentication providers. In both, they use the `state` query string parameter, with the URL to redirect to, so the proxy can parse it and use it.

**Step three** is required, as you might get other query string parameters, like the `code` parameter, when you get redirected from your authentication service to your proxy.

The authentication flow looks as follows:

{{< caption-new "/uploads/2022/12/vcode-authentication-flow2.png" "Visual Studio Code - Authentication flow with proxy"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAACYSURBVE3BUUrDUBRF0X1unin+SEsKQj5EcP4zcAxCO4KE+mFnENL3zpUUFdfS6eP8Po7ja0TgZhBEBLbpHx9Im89pmsrhuH85Pg9v6UQSmySpSwVE2QVPw+DCf+JOCOqN6MALd4Uf2YxbkreK3JCA5E/hl0RdGmkRpafsCtGJtNmUeZ4v67oWV1PXxiZCdH2HQqTN1/V6+QbiQUUetiob/wAAAABJRU5ErkJggg==" "1626" >}}

Notice the changes in steps three and four in this flow.

### Proxy implementation

I made the code for my sample proxy available here: [vscode-redirect](https://github.com/estruyf/vscode-redirect/blob/main/pages/index.tsx).

When you would access the redirect page, it will decode the query string parameters, validate the URL, and redirect you to Visual Studio Code desktop app or codespace.

It works as follows:

- In my Auth0 application, I configured the proxy with its callback URL: `https://vscode-redirect.vercel.app`
- When I want to sign in, the authentication provider generates a URL to Auth0 with the callback URL set to the proxy and the state set to the actual page to redirect.

{{< highlight text "linenos=table,noclasses=false" >}}
https://dev-txghew0y.us.auth0.com/authorize
?response_type=code
&client_id=3GUryQ7ldAeKEuD2obYnppsnmj58eP5u
&redirect_uri=https://vscode-redirect-9ajo.vercel.app
&state=https%3A%2F%2Frapidapi-feedback-p63remja22j.ws-eu77.gitpod.io%2Fvscode-extension-auth-callback%3Fvscode-reqid%3D2%26vscode-scheme%3Dgitpod-code%26vscode-authority%3Deliostruyf.vscode-auth0-authprovider%26vscode-path%3D%252Fauth-complete%26state%3De80cdf1f-c778-48ac-83c7-a3233d6d0763%26nonce%3De80cdf1f-c778-48ac-83c7-a3233d6d0763
&scope=email+offline_access+openid+profile
&prompt=login
&code_challenge_method=S256
&code_challenge=KxB25Na88vIZ32wxe5CUZYYkrYdjE-FisrkllPSteg4
{{< / highlight >}}

{{< blockquote type="info" text="Added line breaks for readability of the query string parameters." >}}

Once authenticated, you will be redirected to the proxy, which automatically redirects you to the codespace or desktop app.

{{< caption-new "/uploads/2022/12/vscode-redirect-proxy.png" "Visual Studio Code - Redirect page"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAYAAACqPZ51AAAAAklEQVR4AewaftIAAABdSURBVDXBuxHCQBBEwTcwsjA4Qxj44BG7IkIJ8Jd7OnYRVdCtTdkPq3V3yEzEjwSZ/EW0s8u2HPt+d2Jhm0yIeCMJ29Q6c71d5MfzPr6mSSw6G9uQMNdKy+Aroo0fq7smu8BagmIAAAAASUVORK5CYII=" "1378" >}}

## The authentication provider

The starting point began with an article I created a couple of months ago on creating a custom authentication provider: [Create an Authentication Provider for Visual Studio Code](https://www.eliostruyf.com/create-authentication-provider-visual-studio-code/). 

{{< blockquote type="info" text="The article also included a code sample: [auth0AuthenticationProvider - GitHub](https://github.com/estruyf/vscode-auth-sample/blob/main/src/auth0AuthenticationProvider.ts)." >}}

The original flow was changed to support the **PKCE** flow and also the proxy; you can find the code for this in the following sample file: [auth0AuthenticationProviderRemote - GitHub](https://github.com/estruyf/vscode-auth-sample/blob/main/src/auth0AuthenticationProviderRemote.ts)

The following lines of code are the most important:

{{< highlight typescript "linenos=table,noclasses=false" >}}
let callbackUri = await env.asExternalUri(Uri.parse(this.redirectUri));
const callbackQuery = new URLSearchParams(callbackUri.query);
// If there is a state on the callback URI, use it, otherwise generate a new one
const stateId = callbackQuery.get('state') || nonceId;

callbackQuery.set('state', encodeURIComponent(stateId));
callbackQuery.set('nonce', encodeURIComponent(nonceId));
callbackUri = callbackUri.with({
  query: callbackQuery.toString()
});

const searchParams = new URLSearchParams([
  ['response_type', "code"],
  ['client_id', CLIENT_ID],
  ['redirect_uri', REDIRECT_URL],
  ['state', encodeURIComponent(callbackUri.toString(true))],
  ['scope', scopes.join(' ')],
  ['prompt', "login"],
  ['code_challenge_method', 'S256'],
  ['code_challenge', codeChallenge],
]);
const uri = Uri.parse(`https://${AUTH0_DOMAIN}/authorize?${searchParams.toString()}`);

remoteOutput.appendLine(`Login URI: ${uri.toString(true)}`);

await env.openExternal(uri);
{{< / highlight >}}

In these lines, the following logic takes place:

1. The URL gets converted (if needed for your codespaces);
2. The original state is kept; if not present, a new ID will be set;
3. Create the login URL with the correct query string parameters like redirect/callback URL, state, scopes, ...;
4. Open the browser.

With all of this in place, the whole authentication flow looks as follows:

### GitHub Codespaces example

Here is an example of how it works on GitHub Codespaces.

{{< video "/uploads/2022/12/vscode-github-authentication.mp4" "" >}}

### Gitpod example

Here is an example of how it works on Gitpod.

{{< video "/uploads/2022/12/vscode-gitpod-authentication.mp4" "" >}}