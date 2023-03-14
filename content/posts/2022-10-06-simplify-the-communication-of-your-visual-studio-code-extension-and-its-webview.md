---
title: Simplify Visual Studio Code extension webview communication
longTitle: ""
slug: /simplify-communication-visual-studio-code-extension-webview/
description: In this article, Elio explains how you can simplify the communication flow
  from your Visual Studio Code extension and its webview to wait for its
  response.
date: 2022-10-06T12:18:02.376Z
lastmod: 2022-10-06T12:18:03.116Z
preview: /social/33c78da8-d89d-442b-b59b-e971cfd29725.png
draft: false
comments: true
tags:
  - Development
  - Visual Studio Code
  - Webview
type: post
---

In Visual Studio Code extension webviews you probably need to get familiar with post-messaging communication. This post-messaging communication is used when you want to start a process, request information, etc.

For this communication flow to work, the extension and webview can send and listen to incoming messages. Although this is not a complicated flow to understand, it quickly feels like a disconnected communication flow, as you cannot simply wait for a response. 

To understand this "disconnected" communication flow better, let us take the following example:
Once I open the webview, I want to show all the project files.
The extension needs to process the data when I click on a file.

The whole communication flow looks as follows:

{{< caption-new "/uploads/2022/10/extension-webview-communication.png" "Communication flow"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAAC3SURBVBXBwU7CMACA4Z+2FNotYyeIiXgxu3nz5HP6IOp7QOKByw7uYkJMULcRC7qureH7Jk/PL49VVd0JbRhjYho6psMemd8idcZFXdc7tVot76/X6wepDaSE8HOMPxOyK4Qu8OOZw2c5E86d6LuOfCbJ5wotBcfjD8MY+fWRj77hy72jrLUsFiWt8wwhUspEUeQEOUFpybK44WAcarvZvLbt92it4SL89cTTHpG1KG1JQPPW7P4Bu1VLCgY/o+8AAAAASUVORK5CYII=" "1048" >}}

## The disconnected experience explained

In the above example, the disconnected experience is in steps 1 and 2. You send a message, and the extension will perform an action based on the message received and sends back a message with the result.

{{< blockquote type="info" text="[Documentation - Passing messages from an extension to a webview](https://code.visualstudio.com/api/extension-guides/webview#passing-messages-from-an-extension-to-a-webview)" >}}

Comparing this to an API, you wait for its response if you call an API to receive data. 

In the extension/webview communication, you send a message, but you won't get a response. You listen to messages coming back, making it a disconnected experience.

{{< caption-new "/uploads/2022/10/extension-webview-communication2.png" "Required listeners for the communication"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAklEQVR4AewaftIAAAC4SURBVF3BQU7CQBSA4f+9eW0ZGVMICDFC4gFMdOtJOU0PQdDQxHTnSheI1RSl7Qhbv0+KoljdLJZ3dIAzBLDmBTeckVzMOCvL8skmo/H99dX8EVXMe+gjye6VGMYc0zkiDSH3TjnZf9eIwkDBp45De4QYGWaOr8MbdfOOcZLnOahj99OTGXifgQpn03DL5PITi22H78EljiCARFr/gKoj/rZoagiCrbfPm/pjT+x6NAxAhP+qqtr8AWlSOjJ5xvRNAAAAAElFTkSuQmCC" "1048" >}}

Creating this flow in code, it would look as follows:

{{< highlight typescript "linenos=table,noclasses=false" >}}
// 1. send message to the extension
vscode.postMessage({ command: 'GET_DATA' });

// 2. listen for response
panel.webview.onDidReceiveMessage(message => {
  if (message.command === 'GET_DATA') {
    // do something
  },
}, undefined, context.subscriptions
);

// 3. send message to the webview
panel.webview.postMessage({ command: 'POST_DATA' });

// 4. listen for response
window.addEventListener('message', event => {
  const message = event.data;
  
  if (message.command === 'POST_DATA') {
    // do something with the data
  }
});
{{< / highlight >}}

This disconnection between messages sending from the webview to the extension and back made me wonder how to simplify it. 

## Simplify the communication flow

What I wanted to achieve was to have a similar experience as to calling APIs. You request data and wait for its response.

That is how I came up with the **MessageHandler**, which is nothing more than a wrapper around the post-message communication.

{{< caption-new "/uploads/2022/10/new-communication-flow.png" "API like communication flow"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACvSURBVEXBu3KCQBiA0c/dNSj/uNpQ2KgzWqZL5XPmRTTvwUyKWNDQaKHjDUxYMQuSoco5ndX6430+X7wG/ZDSP+k1OeqxQw8W6K7QSpLky0RR9DadTZcDCWlV7oC+F1QyRgdDfOU4nkaBKoqCPMv413D7dvxWT0pfs89Tzj9bjIhg7ZCr8/i6YaTAWqHuKsyLJrITjuIwcRx/Xi5nL2FIq35kNOUBJRnK9Gmlabr5A60KSbvsxeJNAAAAAElFTkSuQmCC" "1048" >}}

When requesting data with the message handler, it creates a callback function that returns a promise and identifies it with a **requestId**. The message sends this ID with the message command and payload to the extension listener.

See here a snippet of the class:

{{< highlight typescript "linenos=table,noclasses=false" >}}
public request<T>(message: string, payload?: any): Promise<T> {
  const requestId = v4();

  return new Promise((resolve, reject) => {
    MessageHandler.listeners[requestId] = (payload: T, error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }

      if (MessageHandler.listeners[requestId]) {
        delete MessageHandler.listeners[requestId];
      }
    };

    Messenger.sendWithReqId(message, requestId, payload);
  });
}
{{< / highlight >}}

{{< blockquote type="info" text="The above code uses the `@estruyf/vscode` npm dependency, of which you can find the whole implementation here: [MessageHandler.ts](https://github.com/estruyf/vscode-helpers/blob/dev/src/client/webview/MessageHandler.ts)" >}}

In return, the message handler must wait until the extension sends a message with the same request ID. 

When a message with the same request ID is received, the callback function gets executed, and the promise resolves (or gets rejected in case of an issue).

### Using the message handler in the webview

With the message handler, sending or requesting data from the webview is straightforward.

{{< highlight typescript "linenos=table,noclasses=false" >}}
messageHandler.send('<command id>', { msg: 'Hello from the webview' });

messageHandler.request<string>('<command id>').then((msg) => {
  setMessage(msg);
});
{{< / highlight >}}

### Changes on the extension level

On the extension level, you do not have to change much. All you need to do is add the **requestId** property with the ID that was passed with the message and post the new message.

{{< highlight typescript "linenos=table,noclasses=false" >}}
panel.webview.onDidReceiveMessage(message => {
  const { command, requestId, payload } = message;
  
  if (command === "<command id>") {
    // Do something with the payload

    // Send a response back to the webview
    panel.webview.postMessage({
      command,
      requestId, // The requestId is used to identify the response
      payload: `Hello from the extension!`
    } as MessageHandlerData<string>);
  }
}, undefined, context.subscriptions);
{{< / highlight >}}

The **requestId** property is what the message handler uses as the identifier returning the response data.

{{< highlight typescript "linenos=table,noclasses=false" >}}
Messenger.listen((message: MessageEvent<MessageHandlerData<any>>) => {
  const { requestId, payload, error } = message.data;

  if (requestId && MessageHandler.listeners[requestId]) {
    MessageHandler.listeners[requestId](payload, error);
  }
});
{{< / highlight >}}

## Sample project

In the [Visual Studio Code Extension - React Webview Starter](https://github.com/estruyf/vscode-react-webview-template) repository, you can find an example of how this whole message handling system works.