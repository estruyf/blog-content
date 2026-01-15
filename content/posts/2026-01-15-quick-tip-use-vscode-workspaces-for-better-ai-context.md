---
title: "VS Code Workspaces for better AI assistant context"
longTitle: ""
slug: "/vcode-workspaces-ai-assistant-context/"
description: "Enhance your AI coding assistant's context with VS Code Workspaces for seamless multi-project collaboration and improved code coherence."
date: "2026-01-15T10:25:20.654Z"
lastmod: "2026-01-15T10:25:21.147Z"
preview: "/social/e20de36a-1b30-4635-ad2c-cab2ac59b3d1.png"
draft: true
comments: true
type: "post"
fmContentType: "post"
tags:
  - "AI"
  - "Development"
  - "GitHub Copilot"
  - "Visual Studio Code"
  - "Productivity"
---

I get this question a lot: "How can I give my AI coding assistant context across multiple projects?" If you're working with a separate frontend and backend, or any split repository setup, you've probably run into this problem yourself. Your AI assistant only sees the code in the current project, which means you end up repeating yourself, explaining data structures, and essentially acting as a translator between your projects.

Here's a quick tip that changed my workflow: use [VS Code Workspaces](https://code.visualstudio.com/docs/editor/workspaces) as a "virtual mono-repo" for AI context.

## The problem with separate projects

When you have your frontend and backend in different folders (or even different repositories), opening them in separate VS Code instances means your AI assistant lacks the full picture. Want to create a dashboard that fetches data from your API? You'll need to be very detailed about the data structures, the API endpoints, and the implementation details in each project separately.

I previously avoided workspaces, preferring separate VS Code instances or actual mono-repos. But not every project allows for a mono-repo structure, and that's where this trick comes in handy.

## The solution: VS Code Workspaces

A VS Code Workspace lets you open multiple folders in a single editor instance. For AI coding assistants, this means they can see both your frontend and backend code simultaneously. Instead of manually specifying data structures, the AI can discover them from your backend and implement matching code in your frontend, all in a single prompt.

Here's the practical difference:

- **Without shared context:** "Create a dashboard component. The API returns an object with `sessionName` (string), `description` (string), and `managementUrl` (string)..."
- **With a workspace:** "Create a dashboard that displays the session data from the API", and the AI figures out the data structure from your backend code.

## How to set it up

Setting up a workspace takes less than a minute:

1. Open one of your projects in VS Code
2. Click **File** in the menu bar
3. Select **Add Folder to Workspace**
4. Choose your second project folder (e.g., your backend if you started with the frontend)
5. Both projects now appear in the Explorer sidebar

{{< blockquote type="tip" text="Save your workspace as a `.code-workspace` file (File > Save Workspace As) so you can quickly reopen it later. The workspace file stores the folder paths and any workspace-specific settings." >}}

## Tool compatibility

I've tested this approach with different AI assistants, and here's what I found:

- **[GitHub Copilot](https://github.com/features/copilot):** Works great. Copilot natively understands the workspace context and can reference code across all folders in your workspace.
- **[Claude](https://claude.ai/):** Also works, but takes a different approach. Claude tends to use bash scripts to find the backend location rather than directly leveraging the workspace context. Still functional, just less seamless.

## Why this matters

The real value here isn't just convenience. When your AI assistant has full context, it produces more coherent code. It understands the relationship between your frontend and backend, uses consistent naming, and catches type mismatches before they become runtime errors.

If you're building full-stack applications and using AI coding assistants, give workspaces a try. It's a simple change that can make your AI collaboration significantly more effective.

## Resources

- [VS Code Workspaces documentation](https://code.visualstudio.com/docs/editor/workspaces)
- [GitHub Copilot](https://github.com/features/copilot)
- [Multi-root Workspaces in VS Code](https://code.visualstudio.com/docs/editor/multi-root-workspaces)

---

{{< blockquote type="note" text="This article was created using the [ghostwriter AI agents](https://github.com/estruyf/ghostwriter-agents-ai)." >}}