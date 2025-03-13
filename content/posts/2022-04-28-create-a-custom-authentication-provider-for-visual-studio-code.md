---
title: "Create an Authentication Provider for Visual Studio Code"
description: "In this article, Elio explains how you can build your own authentication provider to be used in a Visual Studio Code extension."
date: "2022-04-28T13:36:48.709Z"
lastmod: "2022-04-28T13:36:49.242Z"
preview: "/social/69a1c7c5-3122-47df-a087-e8679d68e6c0.png"
draft: false
comments: true
tags:
  - "Authentication"
  - "Development"
  - "VSCode"
  - "OAuth"
  - "Auth0"
type: "post"
longTitle: ""
slug: "/create-authentication-provider-visual-studio-code/"
---

Previously I wrote how you could use the Microsoft Authentication Provider in your Visual Studio Code extension to custom Azure AD applications. In this article, we go a step further and create our authentication provider from scratch. As 

By default, VS Code supports the `github`, `github-enterprise`, and `microsoft` authentication providers. If you use another service or have your authentication service, you will likely want to create your Authentication Provider. 

There are two good references from which you can learn all of it:

1. [GitHub Authentication Provider](https://github.com/microsoft/vscode/tree/main/extensions/github-authentication)
2. [Microsoft Authentication Provider](https://github.com/microsoft/vscode/tree/main/extensions/microsoft-authentication)

## Getting started

Creating your authentication provider starts with creating a new **class** that implements from the `AuthenticationProvider` interface.

For the sample, I will make use of Auth0 for this sample.

The authentication provider requires the following methods to implement:

- `onDidChangeSessions`: Event handler when authentication session changes happen;
- `getSessions`: VS Code will call this method to see if there are authenticated sessions;
- `createSession`: Method gets called when to create a new authenticated session. Similar to logging in.
- `removeSession`: Similar to logging out of service. Here a cached session gets removed.

The blueprint for this class looks as follows:

```typescript
import { authentication, AuthenticationProvider, AuthenticationProviderAuthenticationSessionsChangeEvent, AuthenticationSession, Disposable, EventEmitter, ExtensionContext } from "vscode";

export const AUTH_TYPE = `auth0`;
const AUTH_NAME = `Auth0`;

export class Auth0AuthenticationProvider implements AuthenticationProvider, Disposable {
  private _sessionChangeEmitter = new EventEmitter<AuthenticationProviderAuthenticationSessionsChangeEvent>();
  private _disposable: Disposable;
  
  constructor(private readonly context: ExtensionContext) {
    this._disposable = Disposable.from(
      authentication.registerAuthenticationProvider(AUTH_TYPE, AUTH_NAME, this, { supportsMultipleAccounts: false })
    )
  }

  get onDidChangeSessions() {
    return this._sessionChangeEmitter.event;
  }

  /**
   * Get the existing sessions
   * @param scopes 
   * @returns 
   */
  public async getSessions(scopes?: string[]): Promise<readonly AuthenticationSession[]> {
    return [];
  }

  /**
   * Create a new auth session
   * @param scopes 
   * @returns 
   */
  public async createSession(scopes: string[]): Promise<AuthenticationSession> {
    return null as any as AuthenticationSession;
  }

  /**
   * Remove an existing session
   * @param sessionId 
   */
  public async removeSession(sessionId: string): Promise<void> {
    
  }

  /**
   * Dispose the registered services
   */
  public async dispose() {
    this._disposable.dispose();
  }
}
```

## Creating a session

First, let us work on the session creation. As mentioned before, this is where you log in to your authentication service.

In the case of Auth0, we first log in, get the token, fetch the user information, and store this as the authentication session.

The `createSession` method looks as follows:

```typescript
const AUTH_TYPE = `auth0`;
const AUTH_NAME = `Auth0`;
const SESSIONS_SECRET_KEY = `${AUTH_TYPE}.sessions`

export class Auth0AuthenticationProvider implements AuthenticationProvider, Disposable {
  
  // Shortened for brevity

  public async createSession(scopes: string[]): Promise<AuthenticationSession> {
    try {
      const token = await this.login(scopes);
      if (!token) {
        throw new Error(`Auth0 login failure`);
      }

      const userinfo: { name: string, email: string } = await this.getUserInfo(token);

      const session: AuthenticationSession = {
        id: uuid(),
        accessToken: token,
        account: {
          label: userinfo.name,
          id: userinfo.email
        },
        scopes: []
      };

      await this.context.secrets.store(SESSIONS_SECRET_KEY, JSON.stringify([session]))

      this._sessionChangeEmitter.fire({ added: [session], removed: [], changed: [] });

      return session;
    } catch (e) {
      window.showErrorMessage(`Sign in failed: ${e}`);
      throw e;
    }
  }
}
```

The authentication session is stored in the VS Code's secrets store and later used by the `getSessions` and `removeSession` methods.

### The login method

All the logic can be found within the `login` method:

```typescript
const AUTH_TYPE = `auth0`;
const AUTH_NAME = `Auth0`;
const CLIENT_ID = `3GUryQ7ldAeKEuD2obYnppsnmj58eP5u`;
const AUTH0_DOMAIN = `dev-txghew0y.us.auth0.com`;
const SESSIONS_SECRET_KEY = `${AUTH_TYPE}.sessions`

export class Auth0AuthenticationProvider implements AuthenticationProvider, Disposable {
  
  // Shortened for brevity

  private async login(scopes: string[] = []) {
    return await window.withProgress<string>({
      location: ProgressLocation.Notification,
      title: "Signing in to Auth0...",
      cancellable: true
    }, async (_, token) => {
      const stateId = uuid();

      this._pendingStates.push(stateId);

      if (!scopes.includes('openid')) {
        scopes.push('openid');
      }
      if (!scopes.includes('profile')) {
        scopes.push('profile');
      }
      if (!scopes.includes('email')) {
        scopes.push('email');
      }

      const scopeString = scopes.join(' ');

      const searchParams = new URLSearchParams([
        ['response_type', "token"],
        ['client_id', CLIENT_ID],
        ['redirect_uri', this.redirectUri],
        ['state', stateId],
        ['scope', scopeString],
        ['prompt', "login"]
      ]);
      const uri = Uri.parse(`https://${AUTH0_DOMAIN}/authorize?${searchParams.toString()}`);
      await env.openExternal(uri);

      let codeExchangePromise = this._codeExchangePromises.get(scopeString);
      if (!codeExchangePromise) {
        codeExchangePromise = promiseFromEvent(this._uriHandler.event, this.handleUri(scopes));
        this._codeExchangePromises.set(scopeString, codeExchangePromise);
      }

      try {
        return await Promise.race([
          codeExchangePromise.promise,
          new Promise<string>((_, reject) => setTimeout(() => reject('Cancelled'), 60000)),
          promiseFromEvent<any, any>(token.onCancellationRequested, (_, __, reject) => { reject('User Cancelled'); }).promise
        ]);
      } finally {
        this._pendingStates = this._pendingStates.filter(n => n !== stateId);
        codeExchangePromise?.cancel.fire();
        this._codeExchangePromises.delete(scopeString);
      }
    });
  }
}
```

#### What is happening within the login method?

The login method does the following things:

- Create a unique state ID and store it. The state ID gets verified after the sign-in;
- Verify if the default permission scopes are added (openid, profile, and email);
- Create the authorize URL with its required query string parameters; The **redirect_uri** is very important.
- Open the authorize URL in your browser;
- Wait for the token to come back, which gets handled in the `handleUri` method.

#### The redirect URI for VS Code and handling the redirect

To ensure your extension can receive a code/token, you will have to either use a localhost service or create a `UriHandler`. The `UriHandler` allows you to have a listener open your extension instance in VS Code.

The URI format looks as follows:

```text
vscode://<publisher>.<extension-name>
vscode-insider://<publisher>.<extension-name>
```

The code to implement the URI Handler looks as follows:

```typescript
class UriEventHandler extends EventEmitter<Uri> implements UriHandler {
  public handleUri(uri: Uri) {
    this.fire(uri);
  }
}

export class Auth0AuthenticationProvider implements AuthenticationProvider, Disposable {
  
  constructor(private readonly context: ExtensionContext) {
    this._disposable = Disposable.from(
      authentication.registerAuthenticationProvider(AUTH_TYPE, AUTH_NAME, this, { supportsMultipleAccounts: false }),
      window.registerUriHandler(this._uriHandler) // Register the URI handler
    )
  }

  // Shortened for brevity

   /**
   * Handle the redirect to VS Code (after sign in from Auth0)
   * @param scopes 
   * @returns 
   */
  private handleUri: (scopes: readonly string[]) => PromiseAdapter<Uri, string> = 
  (scopes) => async (uri, resolve, reject) => {
    const query = new URLSearchParams(uri.fragment);
    const access_token = query.get('access_token');
    const state = query.get('state');

    if (!access_token) {
      reject(new Error('No token'));
      return;
    }
    if (!state) {
      reject(new Error('No state'));
      return;
    }

    // Check if it is a valid auth request started by the extension
    if (!this._pendingStates.some(n => n === state)) {
      reject(new Error('State not found'));
      return;
    }

    resolve(access_token);
  }
}
```

How you handle the redirect depends on the authentication provider you are using. In the case of Auth0, the token and additional information like the **state** are provided as URI fragments. 

For instance, if you use Azure AD auth, it will be provided as query string parameters.

The access token gets returned to the `createSession` method, and you have an authenticated session.

## Get the current session

Now that creating a session is in place, it is time to complete the `getSessions` method.

VS Code calls this method when an extension uses the `authentication.getSession`. What we need to do here, is get the session data from the secret store and return the session if one exists.

```typescript
const AUTH_TYPE = `auth0`;
const SESSIONS_SECRET_KEY = `${AUTH_TYPE}.sessions`

export class Auth0AuthenticationProvider implements AuthenticationProvider, Disposable {
  
  // Shortened for brevity


  /**
   * Get the existing sessions
   * @param scopes 
   * @returns 
   */
  public async getSessions(scopes?: string[]): Promise<readonly AuthenticationSession[]> {
    const allSessions = await this.context.secrets.get(SESSIONS_SECRET_KEY);

    if (allSessions) {
      return JSON.parse(allSessions) as AuthenticationSession[];
    }

    return [];
  }
}
```

## Removing a session

The `removeSession` method gets called when you sign out of the service for your extension. It will pass the `sessionId` to remove from your authenticated sessions.

```typescript
const AUTH_TYPE = `auth0`;
const SESSIONS_SECRET_KEY = `${AUTH_TYPE}.sessions`

export class Auth0AuthenticationProvider implements AuthenticationProvider, Disposable {
  
  // Shortened for brevity

  /**
   * Remove an existing session
   * @param sessionId 
   */
  public async removeSession(sessionId: string): Promise<void> {
    const allSessions = await this.context.secrets.get(SESSIONS_SECRET_KEY);
    if (allSessions) {
      let sessions = JSON.parse(allSessions) as AuthenticationSession[];
      const sessionIdx = sessions.findIndex(s => s.id === sessionId);
      const session = sessions[sessionIdx];
      sessions.splice(sessionIdx, 1);

      await this.context.secrets.store(SESSIONS_SECRET_KEY, JSON.stringify(sessions));

      if (session) {
        this._sessionChangeEmitter.fire({ added: [], removed: [session], changed: [] });
      }      
    }
  }
}
```

> **Info**: You can find the complete sample here: [auth0AuthenticationProvider - github](https://github.com/estruyf/vscode-auth-sample/blob/main/src/auth0AuthenticationProvider.ts)

## Using your custom authentication provider

Once the authentication provider is implemented, you need to register it to VS Code. You can do this as follows:

```typescript
export async function activate(context: ExtensionContext) {

	context.subscriptions.push(
		new Auth0AuthenticationProvider(context)
	);
  
}
```

All we need to do to use the authentication provider is add the following code to our extension:

```typescript
const session = await vscode.authentication.getSession("auth0", [], { createIfNone: false });
if (session) {
  vscode.window.showInformationMessage(`Welcome back ${session.account.label}`)
}
```

The result looks as follows:

{{< video "/uploads/2022/04/auth0-auth-provider.mp4" "Auth0 - Authentication Provider" >}}

## Remarks

The Auth0 authentication provider code is intended as an example to show what is needed to implement your custom authentication provider. 

To make the provider complete, you best implement the following remarks:

- Store the refresh token only, and when you initiate the extension, retrieve a new access token with the refresh token;
- Validate if your refresh token is still valid. If not, remove the session.

> **Info**: The sample can be found here: [auth0AuthenticationProvider - github](https://github.com/estruyf/vscode-auth-sample/blob/main/src/auth0AuthenticationProvider.ts)