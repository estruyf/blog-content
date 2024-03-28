---
title: "Developing custom plugins for the Microsoft's Dev Proxy"
longTitle: ""
customField: ""
slug: "/developing-custom-plugins-microsoft-dev-proxy/"
description: "Learn how to develop custom plugins for Microsoft's Dev Proxy. Extend the tool's functionality by intercepting API calls, modifying requests, and responses."
date: "2024-03-28T10:13:29.802Z"
lastmod: "2024-03-28T10:13:30.347Z"
preview: "/social/6756ad2a-6834-4957-ad2e-f45f67a18671.png"
draft: false
comments: true
tags:
  - "API"
  - "Dev Proxy"
  - "Microsoft"
  - "Plugins"
type: "post"
---

For a training project I was working on, I needed to be able to intercept some API calls for some audit logging. To do this, I decided to use [Microsoft's Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview) tool, which you use to simulate, mock, and test APIs.

As the Dev Proxy did not have the functionality I needed out of the box, I decided to develop a custom plugin with the help of [Waldek Mastykarz](https://blog.mastykarz.nl/).

In this blog post, I will show you how you can develop custom plugins for the Dev Proxy.

## Things you need to get started

Before you can start developing custom plugins for the Dev Proxy, you need to have the following tools installed:

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Visual Studio Code](https://code.visualstudio.com/)
- [C# Dev Kit Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
- The Dev Proxy Abstractions DLL

{{< blockquote type="important" text="The Dev Proxy Abstractions DLL is available on the [Microsoft's Dev Proxy GitHub releases](https://github.com/microsoft/dev-proxy/releases) page." >}}

{{< caption-new "/uploads/2024/03/devproxy-abstractions.webp" "Dev Proxy Abstractions DLL"  "data:image/jpeg;base64,UklGRnQAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCEAAAABH0AgadM/6PaXOK8REXFWqAlAgLFu/TNQOKL/8ZUIka8AVlA4ICwAAABwAQCdASoKAAQAAUAmJZwCdAFAAAD+/FN68yIkZuMmDyv3+4IuZgJk0eAAAA==" "1896" >}}

## Setting up the project

Once you install all the prerequisites, you can start setting up the project.

- Start creating the new project by running the following command in your terminal:

```bash {title="Create a new class library project"}
dotnet new classlib -n DevProxyCustomPlugin
```

- Next, navigate to the newly created project folder:

```bash {title="Open the project folder"}
cd DevProxyCustomPlugin
```

- Open the project in Visual Studio Code
- Add the Dev Proxy Abstractions DLL to the project
- Open the `DevProxyCustomPlugin.csproj` file and add the following lines in the project group:

```xml {title="Add the Dev Proxy Abstractions DLL reference for the project"}
<ItemGroup>
  <Reference Include="dev-proxy-abstractions">
    <HintPath>.\dev-proxy-abstractions.dll</HintPath>
    <Private>false</Private>
    <ExcludeAssets>runtime</ExcludeAssets>
  </Reference>
</ItemGroup>
```

{{< blockquote type="important" text="Make sure to exclude the DLL as it is not requires for the plugin. You can do this by setting the `ExcludeAssets` to `runtime`." >}}

- Add the required packages:

```bash {title="Add the required packages"}
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.Binder
dotnet add package Titanium.Web.Proxy
```

- Similar to the `dev-proxy-abstractions.dll` configuration, make sure to exclude the new packages' assets by adding the `ExcludeAssets` property to the `PackageReference` element in the `DevProxyCustomPlugin.csproj` file:

```xml {title="Exclude the assets for the new packages"}
<PackageReference Include="Microsoft.Extensions.Configuration" Version="6.0.0">
  <ExcludeAssets>runtime</ExcludeAssets>
</PackageReference>
```

- Update the `Class1.cs` file with the name of your plugin class:

```csharp {title="Starter code for the plugin class"}
using Microsoft.DevProxy.Abstractions;
using Microsoft.Extensions.Configuration;

namespace DevProxyCustomPlugin;

public class RedirectCalls : BaseProxyPlugin
{
  public override string Name => nameof(RedirectCalls);

  public override void Register(IPluginEvents pluginEvents,
                                IProxyContext context,
                                ISet<UrlToWatch> urlsToWatch,
                                IConfigurationSection? configSection = null)
  {
    base.Register(pluginEvents, context, urlsToWatch, configSection);
  }
}
```

{{< blockquote type="info" text="For this sample, I created a plugin which you can use to redirect API calls to your local API, which is useful when locally developing a project." >}}

With this in place, you can start developing your custom plugin for the Dev Proxy.

{{< caption-new "/uploads/2024/03/devproxy-custom-plugin.webp" "Start developing your custom plugin"  "data:image/jpeg;base64,UklGRn4AAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSCMAAAABH0AgadM/5vbXOK8REXFWqAmAhGF40z8D9DRDRP9jDXHPGgBWUDggNAAAABACAJ0BKgoABgABQCYllAJ0AQ8CbxdjOAAA/v54dZUFPTnTrXaLpCju2Z8uQZbbQ0OIAAA=" "1626" >}}

## Adding a before-request event handler

You can add a before-request event handler to the plugin to intercept the API calls. In the `Register` method, you can add the following code:

```csharp {title="Add a before request event handler"}
public override void Register(IPluginEvents pluginEvents,
                              IProxyContext context,
                              ISet<UrlToWatch> urlsToWatch,
                              IConfigurationSection? configSection = null)
{
  base.Register(pluginEvents, context, urlsToWatch, configSection);

  pluginEvents.BeforeRequest += OnBeforeRequest;
}
```

Create a new method, `OnBeforeRequest` to handle the event:

```csharp {title="Add the OnBeforeRequest method"}
private void OnBeforeRequest(object sender, BeforeRequestEventArgs e)
{
  if (_urlsToWatch is null ||
    !e.HasRequestUrlMatch(_urlsToWatch))
  {
    // No match for the URL, so we don't need to do anything
    return Task.CompletedTask;
  }

  // Replace the following lines with your custom logic
  if (e.Session.HttpClient.Request.RequestUri.AbsoluteUri.Contains("https://frontmatter.codes"))
  {
    var url = e.Session.HttpClient.Request.RequestUri.AbsoluteUri;
    e.Session.HttpClient.Request.RequestUri = new Uri(url.Replace("https://frontmatter.codes", "http://localhost:3000"));
  }

  return Task.CompletedTask;
}
```

In this example, the `OnBeforeRequest` method checks if the request URL contains `https://frontmatter.codes`. If it does, it replaces the URL with `http://localhost:3000`. That way, I can test the API calls locally while developing the project.

{{< blockquote type="info" text="Change the code in the `OnBeforeRequest` method to fit your needs." >}}

Once you have added the `OnBeforeRequest` method's code, you can build the plugin by running the following command in the terminal:

```bash {title="Build the plugin"}
dotnet build
```

## Testing the plugin

To test the plugin, add it to the Dev Proxy configuration. You can do this by adding the following lines to the `devproxyrc.json` file:

```json {title="Add the plugin to the Dev Proxy configuration"}
{
  "$schema": "https://raw.githubusercontent.com/microsoft/dev-proxy/main/schemas/v0.16.0/rc.schema.json",
  "plugins": [{
    "name": "RedirectCalls",
    "enabled": true,
    "pluginPath": "./bin/Debug/net8.0/DevProxyCustomPlugin.dll"
  }],
  "githubCopilotListener": {
    "logPath": "./logs"
  },
  "urlsToWatch": [
    "https://frontmatter.codes/api/*"
  ],
  "labelMode": "text",
  "logLevel": "debug",
  "newVersionNotification": "stable"
}
```

Start the Dev Proxy by running the following command in the terminal:

```bash {title="Start the Dev Proxy"}
devproxy
```

Now, you can test the plugin by requesting the URL specified in the `urlsToWatch` configuration. In my example, when I call the `https://frontmatter.codes/api/stars` API, the request gets redirected to `http://localhost:5000/api/stars`, and I can see the response from my local API.

{{< caption-new "/uploads/2024/03/devproxy-redirect.webp" "Test the plugin by making a request"  "data:image/jpeg;base64,UklGRmQAAABXRUJQVlA4WAoAAAAQAAAACQAAAQAAQUxQSBMAAAABD0CQbeOvuO3niojgWIGI/ocCAFZQOCAqAAAA0AEAnQEqCgACAAFAJiWUAnQBDv4DyAAA/v1Xo4i0ByPhQySESbaqZwAA" "1302" >}}

## Adding some plugin configuration

To make the plugin more flexible, you can add some configuration options. For instance, you can define the root URL and the local URL to redirect the API calls to.

To do this, you can add the following configuration to the `devproxyrc.json` file:

```json {title="Add the plugin configuration to the Dev Proxy configuration"}
{
  "$schema": "https://raw.githubusercontent.com/microsoft/dev-proxy/main/schemas/v0.15.0/rc.schema.json",
  "plugins": [{
    "name": "RedirectCalls",
    "enabled": true,
    "pluginPath": "./bin/Debug/net8.0/DevProxyCustomPlugin.dll",
    "configSection": "redirectCalls"
  }],
  "redirectCalls": {
    "fromUrl": "https://frontmatter.codes",
    "toUrl": "http://localhost:3000"
  },
  "urlsToWatch": [
    "https://frontmatter.codes/api/*"
  ],
  "labelMode": "text",
  "logLevel": "debug",
  "newVersionNotification": "stable"
}
```

In the `RedirectCalls` plugin sections, I added a `configSection` property with the value `redirectCalls`. This configuration allows me to access the plugin's configuration.

In the `redirectCalls` section, I added the `fromUrl` and `toUrl` properties, which define the root URL and the local URL to which the API calls should be redirected.

To access the configuration in the plugin, you need to bind the configuration. The whole code for the plugin class should look like this:

```csharp {title="Redirect Calls plugin class with configuration"}
using Microsoft.DevProxy.Abstractions;
using Microsoft.Extensions.Configuration;

namespace DevProxyCustomPlugin;

public class RedirectCallsConfiguration
{
  public string? FromUrl { get; set; }
  public string? ToUrl { get; set; }
}

public class RedirectCalls : BaseProxyPlugin
{
  public override string Name => nameof(RedirectCalls);
  private readonly RedirectCallsConfiguration _configuration = new();

  public override void Register(IPluginEvents pluginEvents,
                                IProxyContext context,
                                ISet<UrlToWatch> urlsToWatch,
                                IConfigurationSection? configSection = null)
  {
    base.Register(pluginEvents, context, urlsToWatch, configSection);

    configSection?.Bind(_configuration);

    pluginEvents.BeforeRequest += OnBeforeRequest;
  }

  private Task OnBeforeRequest(object sender, ProxyRequestArgs e)
  {
    if (_urlsToWatch is null ||
      !e.HasRequestUrlMatch(_urlsToWatch))
    {
      // No match for the URL, so we don't need to do anything
      return Task.CompletedTask;
    }

    var fromUrl = _configuration?.FromUrl ?? string.Empty;
    var toUrl = _configuration?.ToUrl ?? string.Empty;

    if (string.IsNullOrEmpty(fromUrl) || string.IsNullOrEmpty(toUrl))
    {
      return Task.CompletedTask;
    }

    if (e.Session.HttpClient.Request.RequestUri.AbsoluteUri.Contains(fromUrl))
    {
      var url = e.Session.HttpClient.Request.RequestUri.AbsoluteUri;
      e.Session.HttpClient.Request.RequestUri = new Uri(url.Replace(fromUrl, toUrl));
    }

    return Task.CompletedTask;
  }
}
```

With this configuration in place, you can test the plugin with the new configuration options.

{{< caption-new "/uploads/2024/03/devproxy-redirect-configuration.webp" "Test the plugin with the new configuration options"  "data:image/jpeg;base64,UklGRm4AAABXRUJQVlA4WAoAAAAQAAAACQAABAAAQUxQSCEAAAABFyCQTfxJvyjSiIhYUNC2DdP9DWDLH8xARPQ/xDPkFw8AVlA4ICYAAACwAQCdASoKAAUAAUAmJZwAAxZiFubAAP7+KWvPnWVn4MttPgAAAA==" "2040" >}}

The example above is available on my [GitHub devproxy-redirect-plugin repository](https://github.com/estruyf/devproxy-redirect-plugin).

## Conclusion

Developing custom plugins for Microsoft's Dev Proxy is a great way to extend the tool's functionality. With the help of the Dev Proxy Abstractions DLL, you can easily create custom plugins that can intercept API calls, modify requests and responses, and much more.
