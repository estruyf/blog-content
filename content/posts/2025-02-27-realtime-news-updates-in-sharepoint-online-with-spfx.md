---
title: "RealTime News Updates in SharePoint Online with SPFx"
longTitle: ""
customField: ""
slug: "/realtime-news-updates-sharepoint-online-spfx/"
description: "Implement real-time news updates in SharePoint Online using SPFx and Socket.IO for dynamic content without manual refreshes."
date: "2025-02-27T13:46:14.802Z"
lastmod: "2025-02-27T13:46:15.346Z"
preview: "/social/01e0b6d6-bdef-4c6b-81eb-47d1eed74df9.png"
draft: false
comments: true
tags:
  - "SharePoint Online"
  - "Socket.IO"
  - "SPFx"
  - "WebSocket"
type: "post"
fmContentType: "post"
---

Recently, I discovered the Socket.IO endpoint in Microsoft Graph, which has enabled me to implement real-time functionality in SharePoint Online. This feature allows SPFx solutions and other types of applications to receive near-instantaneous change notifications for drives and lists, facilitating dynamic updates without manual refreshes.

{{< blockquote type="alert" text="It's important to note that utilizing this approach requires establishing a separate WebSocket connection for each library or list you wish to monitor. This can lead to multiple concurrent connections, which may impact performance and resource utilization." >}}

Integrating real-time updates into SharePoint Online solutions enhances user engagement by ensuring content is always up to date. The approach utilizes SharePoint REST API endpoints to establish a WebSocket connection via Socket.IO, enabling dynamic updates without relying on Microsoft Graph (that way you do not have to request permissions).

{{< blockquote type="note" text="If you want, you can change the code in the upcoming code snippets to make use of the Microsoft Graph" >}}

## Implementing real-time news updates in SharePoint online

The provided code sample demonstrates how to create a React functional component within the SharePoint Framework (SPFx) that listens for changes in a SharePoint site pages library and updates the UI accordingly. Here's a breakdown of the implementation:

### Fetching pages

The `fetchPages` function retrieves the latest pages from the SharePoint site's sitepages library using the SPHttpClient.

```typescript {title="Fetching SharePoint Pages"}
const fetchPages = React.useCallback(async () => {
  const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/sitepages/pages?$select=Title,Description,AbsoluteUrl&$top=5&$orderby=Modified desc`;
  const response = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

  if (!response.ok) {
    return;
  }

  const data = await response.json();
  setPages(data.value);
}, [context]);
```

### Obtaining the notification URL (websocket)

The `fetchNotificationUrl` function constructs the API URL to retrieve the `notificationUrl` for the specific list. This URL is essential for establishing a WebSocket connection.

```typescript {title="Fetch the notification URL from SharePoint"}
const fetchNotificationUrl = React.useCallback(async () => {
  const listId = context.pageContext.list?.id;
  if (!listId) {
    return;
  }

  const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/v2.0/sites('${location.host},${context.pageContext.site.id},${context.pageContext.web.id}')/lists('${listId}')/drive/root/subscriptions/socketIo`;

  const response = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

  if (!response.ok) {
    return;
  }

  const data = await response.json();
  setNotificationUrl(data.notificationUrl);
}, [context]);
```

{{< blockquote type="info" text="I derived this endpoint from the [Microsoft Graph - websocket endpoint](https://learn.microsoft.com/en-us/graph/api/subscriptions-socketio?view=graph-rest-1.0&tabs=http#response)." >}}

The Socket.IO endpoint provides you with a URL that you can use to establish a WebSocket connection. This connection will allow you to receive real-time updates for the specific list or library you are monitoring.

### Establishing a WebSocket connection

Upon obtaining the `notificationUrl`, a WebSocket connection is established using Socket.IO. The component listens for 'notification' events and updates the list of pages when changes occur.

First install the `socket.io-client` package:

```bash
npm install socket.io-client
```

Then, you can establish the WebSocket connection as shown below:

```typescript {title="Establishing a WebSocket connection"}
React.useEffect(() => {
  if (!notificationUrl) {
    return;
  }

  // Make sure to define the `transports` option to only use the WebSocket transport
  // It will fail if not defined, or when using polling
  const socket = io(notificationUrl, { transports: ['websocket'] });

  socket.on('connect', () => {
    console.log('Connected to the notification service');
    setListening(true);
  });

  socket.on('notification', (data) => {
    console.log('Notification received:', data);
    fetchPages();
  });

  return () => {
    socket.disconnect();
  };
}, [notificationUrl]);
```

### Initializing the data fetching

The `useEffect` hook ensures that the component fetches the initial set of pages and the notification URL when it mounts.

```typescript {title="Initializing the data fetching"}
React.useEffect(() => {
  fetchPages();
  fetchNotificationUrl();
}, []);
```

### Rendering the UI

Finally, the component renders the list of pages and displays a loading indicator while fetching data.

```html {title="Rendering the UI"}
<div>
  <h3>Real-Time News</h3>
  <p>Status: {listening ? 'Listening for changes...' : 'Not connected'}</p>
  <ul>
    {pages.map((page, index) => (
      <li key={index}>
        <strong>{page.Title}</strong>: {page.Description} - <a href={page.AbsoluteUrl} target="_blank" rel="noopener noreferrer">Read more</a>
      </li>
    ))}
  </ul>
</div>
```

The outcome of this implementation looks like this:

{{< video "/uploads/2025/02/real-time-websockets.mov" "Real-time updates with websockets" >}}

### The complete component

Here is the complete React functional component that implements real-time news updates in SharePoint Online using SPFx:

```typescript {title="Real-time news component"}
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import { io } from 'socket.io-client';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IRealTimeNewsProps {
  context: WebPartContext;
}

export const RealTimeNews: React.FunctionComponent<IRealTimeNewsProps> = ({
  context
}: React.PropsWithChildren<IRealTimeNewsProps>) => {
  const [listening, setListening] = React.useState(false);
  const [pages, setPages] = React.useState<{ Title: string, Description: [], AbsoluteUrl: string }[]>([]);
  const [notificationUrl, setNotificationUrl] = React.useState<string | null>(null);

  const fetchPages = React.useCallback(async () => {
    const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/sitepages/pages?$select=Title,Description,AbsoluteUrl&$top=5&$orderby=Modified desc`;
    const response = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setPages(data.value);
  }, [context]);

  const fetchNotificationUrl = React.useCallback(async () => {
    const listId = context.pageContext.list?.id;
    if (!listId) {
      return;
    }

    const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/v2.0/sites('${location.host},${context.pageContext.site.id},${context.pageContext.web.id}')/lists('${listId}')/drive/root/subscriptions/socketIo`;

    const response = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setNotificationUrl(data.notificationUrl);
  }, [context]);

  React.useEffect(() => {
    if (!notificationUrl) {
      return;
    }

    const socket = io(notificationUrl, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Connected to the notification service');
      setListening(true);
    });

    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchPages();
    });
  }, [notificationUrl]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPages();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchNotificationUrl();
  }, [notificationUrl]);

  return (
    <div>
      <h3>Real-Time News</h3>
      <p>Status: {listening ? 'Listening for changes...' : 'Not connected'}</p>
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <strong>{page.Title}</strong>: {page.Description} - <a href={page.AbsoluteUrl} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Alternative approach using Microsoft Graph

While your current implementation avoids the need for additional permissions by utilizing SharePoint REST API endpoints, it's worth noting that similar functionality can be achieved through Microsoft Graph. However, this approach requires specific permissions to access the necessary resources.

To use Microsoft Graph for real-time notifications, you would need to request permissions such as `Sites.Read.All` and `Files.Read`. These permissions must be declared in your solution's `package-solution.json` file under the `webApiPermissionRequests` property:

```json {title="package-solution.json"}
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
  "solution": {
    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "Sites.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Files.Read"
      }
    ]
  }
}
```

After deploying your solution, an administrator must approve these permissions in the SharePoint admin center. This process is detailed in the [Microsoft documentation](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial).

## Conclusion

By leveraging SharePoint REST API endpoints and Socket.IO, you can implement real-time updates in your SharePoint Online environment without the need for additional permissions. This approach simplifies the deployment process and maintains dynamic content for users. Alternatively, integrating with Microsoft Graph offers a robust solution but requires appropriate permissions and administrative consent.