---
title: "Keeping GitHub Copilot on script during your demos"
longTitle: ""
customField: ""
slug: "/keeping-github-copilot-script-demos/"
description: "Master your demos with `copilot-mock-server` for consistent GitHub Copilot responses and a seamless audience experience."
date: "2026-06-26T10:21:07.038Z"
lastmod: "2026-06-26T10:21:07.580Z"
preview: "/social/0a6f87a1-1b59-4dbf-a303-a5c86aeac4f6.png"
draft: false
comments: true
tags:
  - "AI"
  - "automation"
  - "GitHub Copilot"
  - "productivity"
type: "post"
fmContentType: "post"
---

In my sessions I use Demo Time to script every step. When I get to a Copilot prompt, I type it, let the audience see it, and then cancel before the response finishes. Responses can be slow, and I already know what I want to show next. So I cancel, open the file, and explain what Copilot would have done.

It works, but it always felt incomplete. I am narrating around the tool instead of letting it speak for itself. The audience takes my word for what the AI said, rather than watching it happen. That bothered me more than I expected.

For others the problem is different. They let it run, and then the AI decides today is the day it wants to be creative. The same prompt, a completely different answer. The room waits. You smile and pretend this is fine.

I built `copilot-mock-server` to fix both problems at once. This post is about why it exists and how you can use it to make your sessions go exactly the way you planned.

{{< blockquote type="info" text="**`copilot-mock-server`** — [github.com/estruyf/copilot-mock-server](https://github.com/estruyf/copilot-mock-server)" >}}

## Why I built it

The problem shows up in a few ways:

- The same prompt gives a different answer every time you run it.
- The response is slower or faster than your timing assumes.
- The model picks a different file, a different approach, or a different wording than the one your talk was built around.
- You have no internet, the conference wifi dies, and the demo dies with it.

I tried other ways around it. Recording video felt like cheating and killed the live energy. Avoiding Copilot in demos was not an option, since it is often the thing I want to show. What I really wanted was the real Copilot experience with a result I could trust, streamed in front of the audience without me having to cancel and explain.

That is the gap `copilot-mock-server` fills.

## What it actually does

`copilot-mock-server` is a local proxy. It sits between your editor and the Copilot service, intercepts the chat traffic, and returns your own scripted responses instead of calling the real API.

The important part: it does not fake the experience. The Copilot UI is still the Copilot UI. The response still streams in token by token. Your audience sees the real thing. The only difference is that you decided what the answer would be, ahead of time, and much faster in response than the real API could ever manage.

It works with both transports Copilot uses, so you are covered whether the traffic goes over WebSocket or server-sent events. It also doubles as an HTTPS proxy, which means it works with the Copilot CLI too, not just the VS Code extension.

No install needed to try it:

```bash title="Install and run"
npx copilot-mock-server
```

## How to use it in a session

Here is the flow I use when I am preparing a talk.

### 1. Write your prompt rules

You define what Copilot should say in a simple JSON file. Each rule matches keywords in your prompt and returns the response you want.

```json title="cms.mock.json"
[
  {
    "input": ["create a test.json file"],
    "title": "Create test file",
    "output": {
      "text": "Created [[file:test.json]] with your content in JSON format.",
      "tags": [
        { "type": "file", "path": "test.json", "label": "test.json" }
      ]
    }
  }
]
```

A few things worth knowing about matching:

- Every entry in `input` has to appear in your prompt for the rule to match. Matching is case-insensitive.
- Single words match as whole tokens. Multi-word entries match as substrings.
- When more than one rule matches, the most specific one wins.

Those `[[file:...]]` tags render as clickable file links in the chat response, so your scripted answer can still feel rich and real.

{{< blockquote type="important" text="When I use this within Demo Time, before I run the prompt, I can create the `test.json` file with the content I want. That way, the scripted response matches the actual file content and I can click the file link to open it." >}}

### 2. Point your editor at the mock server

You do not have to edit settings by hand. The tool can inject the right Copilot override settings into your workspace for you:

```bash title="Add Copilot override settings"
copilot-mock-server vscode add
```

Reload the VS Code window and you are running against the mock. When the talk is over, remove the settings again:

```bash title="Remove Copilot override settings"
copilot-mock-server vscode remove
```

Since the settings live in your workspace `.vscode/settings.json`, they only affect the project you are demoing. Your normal Copilot keeps working everywhere else. It will add the following to your workspace settings:

```json title=".vscode/settings.json"
{
  "github.copilot.advanced": {
    "debug.overrideProxyUrl": "http://localhost:3000",
    "debug.overrideCapiUrl": "http://localhost:3000",
    "debug.overrideAuthType": "token"
  }
}
```

### 3. Run your session with confidence

Now the prompts you rehearsed return exactly what you scripted, every single time. Same wording, same files, same timing. No surprise rewrites halfway through your story.

You can even tune the feel of it. There is a setting to control the delay between streamed tokens, so you can match the pacing your talk is built around.

### Need a hybrid demo?

Sometimes you want most of the session scripted, but one or two prompts to hit the real Copilot for a genuine "look, this is live" moment. There is an option for that. Turn on forwarding for unmatched prompts, and anything you did not script gets passed through to the real API. The prompts you care about stay deterministic, the rest stay live.

In the config file, it looks like this:

```json title="cms.config.json"
{
  "forwardUnmatched": true
}
```

## It pairs with Demo Time

This was always meant to live next to Demo Time. Demo Time scripts the steps of your demo. `copilot-mock-server` scripts what the AI says inside those steps. Together they give you a fully repeatable Copilot demo, the kind you can run ten times in a row and get the same result.

I put together a sample repository that shows exactly how to wire the two up, so you do not have to start from a blank file: [github.com/estruyf/demo-time-github-copilot-mocking](https://github.com/estruyf/demo-time-github-copilot-mocking).

{{< video "/uploads/2026/06/demotime-copilot-mock-server.mp4" "Demo Time - copilot-mock-server" >}}

## Who this is for

I built it for myself, but it is useful for anyone in a similar spot:

- Speakers doing live coding with Copilot on stage.
- Anyone recording courses or tutorials who needs the same take every time.
- Teams testing Copilot-integrated tooling who want deterministic responses to test against, without burning real API calls.

## Try it

The tool is open source and MIT licensed. If it saves you one awkward moment on stage, it has done its job.

- Tool: [github.com/estruyf/copilot-mock-server](https://github.com/estruyf/copilot-mock-server)
- Samples: [github.com/estruyf/demo-time-github-copilot-mocking](https://github.com/estruyf/demo-time-github-copilot-mocking)

Give it a spin before your next session. Feedback and stars are very welcome.
