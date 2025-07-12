---
title: "From idea to production in under an hour with AI"
longTitle: ""
customField: ""
slug: "/idea-production-hour-ai-unpublished/"
description: "How I used GitHub Copilot and AI-powered development tools to build a complete VS Code extension stats dashboard from scratch in record time."
date: "2025-07-04T09:28:38.482Z"
lastmod: "2025-07-04T09:28:38.933Z"
preview: "/social/420008f4-9654-42fd-a259-ad4903634e14.png"
draft: true
comments: true
tags:
  - "AI"
  - "GitHub Copilot"
  - "VS Code"
  - "Dashboard"
  - "Development"
  - "Productivity"
  - "React"
type: "post"
fmContentType: "post"
---

As a VS Code extension developer constantly checking marketplace stats across multiple extensions, I had a simple problem: too much tab-switching, not enough insight. So I decided to build a unified dashboard. But here's the kicker - I wanted to see just how fast modern AI development tools could take me from idea to production.

**The result? A fully functional, production-ready dashboard in under 60 minutes.**

This article isn't just another "look what I built" post; it is about showcasing what AI-powered development can achieve in 2025 and how dramatically it's changing the speed at which we can turn ideas into reality.

## The AI development experiment

I wanted to answer a simple question: **How fast can AI tools take you from problem to production in 2025?**

My challenge was specific:

- Build a dashboard to track all my VS Code extension stats
- Make it production-ready with real APIs, not just prototypes
- Use only AI-powered tools and see how far they can take me
- Document the entire process to show what's possible

The timer started, and I dove in with testing some of the available AI tools as my "copilot." The tools I used were:

- [GitHub Spark](https://github.com/spark)
- [Bolt.new](https://bolt.new)
- [v0.dev](https://v0.dev)
- [Lovable.dev](https://lovable.dev)

The tool that would give me the best initial result would be used as a foundation. I would then iterate on it with GitHub Copilot to refine the code, add features, and make it production-ready.

{{< blockquote type="info" text="You can see the final result at [stats.demotime.show](https://stats.demotime.show) - built entirely with AI assistance in under an hour." >}}

## The initial prompt

Here's the thing about AI development: your initial prompt is everything. I've learned that being specific about requirements while leaving room for AI to make wise decisions gets the best results:

> In order to follow the Demo Time stats, I want you to create a simple website that calls an `/api/stats`. The API should return:
> 
> // Example response from the VS Code Marketplace API with the stats for the Demo Time extension
>
> On the dashboard, I want to see the following:
> 
> - Page views
> - Installs
> - Web downloads
> - Uninstalls
>
> Make use of React, Tailwind CSS, and TypeScript.
>
> The data should come from an API backend and should be mocked when used locally.

{{< blockquote type="tip" text="The key to great AI results: be specific about what you want, but let AI decide how to implement it." >}}

## Minute 0-15: AI tool showdown

Each of the AI tools I tested had its own strengths and weaknesses. Here's how they performed in my 15-minute sprint to get the first version of the dashboard up and running:

### Bolt.new ⚡

- **Strength**: Lightning-fast prototyping
- **AI Magic**: Instantly understood the requirements and spun up a working demo
- **Experience**: The first version was up in under 1-2 minutes, but the charts were not functioning. With a couple of iterations, it generated a fully functional dashboard. Bonus points for the table with the daily stats.

Link to the service: [Bolt.new](https://bolt.new)

Here’s how the Bolt.new interface appeared at the beginning:

{{< caption-new "/uploads/2025/07/bolt-experience.webp" "Bolt.new UI experience"  "data:image/jpeg;base64,UklGRi4AAABXRUJQVlA4ICIAAACQAQCdASoKAAcAAUAmJaQAAudFw0AA/v5TymlAxue9iQAA" "3150" "2074" >}}

Here’s the initial dashboard version it produced:

{{< caption-new "/uploads/2025/07/bolt-result.webp" "Result from Bolt.new"  "data:image/jpeg;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoKAAcAAUAmJaQAAud9rfcAAP7+OJ8NThombp+o6XtvEjXKZwgAAA==" "3160" "2080" >}}

### v0.dev by Vercel 🎨

- **Strength**: Great UI components, focuses on Next.js
- **AI Magic**: Generated pixel-perfect Tailwind components that looked professional
- **Experience**: UI was nice in the desktop view, but had some issues with responsiveness on mobile. That might be because I didn't specify that in the initial prompt.

Link to the service: [v0.dev](https://v0.dev)

Here’s how the v0.dev interface appeared at the beginning:

{{< caption-new "/uploads/2025/07/v0-experience.webp" "v0.dev UI experience"  "data:image/jpeg;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoKAAcAAUAmJaQAAup5pnQAAP7+pPP6VLzFegT9cSIAAA==" "3164" "2080" >}}

Here’s the initial version of the dashboard it generated:

{{< caption-new "/uploads/2025/07/v0-result.webp" "Result from v0.dev"  "data:image/jpeg;base64,UklGRjQAAABXRUJQVlA4ICgAAAAwAQCdASoKAAsAAUAmJaQAA3AA/vzAtuDuX5qQC1Y3VpCcmw1dQAAA" "2306" "2438" >}}

### Lovable.dev 🔧

- **Strength**: Full-stack approach with good project structure
- **AI Magic**: Created a beautiful UI and good graph implementation
- **Experience**: The initial version was visually appealing and included well-designed graphs.

Link to the service: [Lovable.dev](https://lovable.dev)

Here’s how the Lovable.dev interface appeared at the beginning:

{{< caption-new "/uploads/2025/07/lovable-experience.webp" "Lovable.dev UI experience"  "data:image/jpeg;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoKAAcAAUAmJaQAAu1/bzwAAP7+WFjdJ8EUuNYuBNcgDTUIAAA=" "3166" "2082" >}}

Here’s the initial version of the dashboard it generated:

{{< caption-new "/uploads/2025/07/lovable-result.webp" "Result from Lovable.dev"  "data:image/jpeg;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoKAAcAAUAmJZwC7AEfbpDzFSAA/v7GMQXOTxa6nwXcXPeXlhEqZagKyBAAAA==" "3164" "2080" >}}

### GitHub Spark 🏆

- **Strength**: Full integration with GitHub without the need to set up any other permissions or services
- **AI Magic**: Understood context across the entire codebase, suggested optimal patterns, and generated production-ready code
- **Experience**: It was the slowest service of them all, but the solution it provided looked the best. It provided a similar graph to Lovable and added a table with the daily stats.

Link to the service: [GitHub Spark](https://github.com/spark)

Here’s how the GitHub Spark interface appeared at the beginning:

{{< caption-new "/uploads/2025/07/spark-experience.webp" "GitHub Spark UI experience"  "data:image/jpeg;base64,UklGRiwAAABXRUJQVlA4ICAAAAAwAQCdASoKAAYAAUAmJaQAA3AA/vzkBmmrDuSSKyQAAA==" "3172" "1994" >}}

Here’s the first version of the dashboard it generated:

{{< caption-new "/uploads/2025/07/spark-result.webp" "Result from GitHub Spark"  "data:image/jpeg;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoKAAUAAUAmJZwAAxecthvQAP7+3yIwZPzwJ5O4qAAAAA==" "3166" "1602" >}}

## Minute 15-45: Further iterations and production readiness

Up to this point, I have spent a total of 20 minutes building the initial version of the dashboard.

After GitHub Spark created the initial version, I cloned the repository and began iterating on it with GitHub Copilot to improve it.

On my first installation of the dependencies, it failed, as GitHub Spark uses an internal `@github/spark` package that is not "yet" available on npm, so I had to remove it from the `package.json` file. After that, I was able to install all dependencies.

I wanted to add the following features:

- **Prompt 1**: Remove all the `@github/spark` dependency references from the files
  
  **Result**: It removed all references, but I had to manually change `useKV` to `useState` in the React component, as it was unable to do so automatically.
- **Prompt 2**: Write the API to be able to run on Cloudflare Pages/Workers and let it call the VS Code Marketplace API with the following example URL.
  
  **Result**: It created a `functions` directory with a `stats.ts` file that can be used to fetch the stats from the VS Code Marketplace API.
- **Prompt 3**: Use an environment variable for the VS Code Marketplace - Personal Access Token.
  
  **Result**: It added the required code to the `stats.ts` file to use the `VSCODE_MARKETPLACE_PAT` environment variable.
- **Prompt 4**: Make the table headers sortable.
  
  **Result**: It added the necessary code to make the table headers sortable, allowing me to sort the stats by page views, installs, web downloads, and uninstalls.
- **Prompt 5**: Add a selector for other extensions by performing an API call to the VS Code Marketplace API.
  
  **Result**: It added a dropdown to select other extensions, allowing me to switch between them and see their stats.

## Minute 45-60: Deployment

The only thing I had to do manually was to set up the Cloudflare Pages environment, link my DNS, and add the `VSCODE_MARKETPLACE_PAT` environment variable. GitHub Copilot and Cloudflare took care of the rest to deploy the dashboard.

The finished dashboard includes everything you'd expect from a professional application:

- **📊 Real-time stats**: Page views, installs, downloads, uninstalls with trend indicators
- **🔄 Dynamic extension selection**: Dropdown that automatically loads all your extensions
- **📈 Interactive visualizations**: Charts that respond to user interaction and show meaningful insights
- **📱 Mobile-responsive design**: Works perfectly on any device size
- **⚡ Fast performance**: Optimized loading and caching strategies
- **🎨 Professional UI**: Clean, modern design that looks production-ready

The dashboard is live at [stats.demotime.show](https://stats.demotime.show). Please take a look and see what 60 minutes of AI-powered development have produced. The source code is available on [GitHub](https://github.com/estruyf/demo-time-stats-dash), allowing you to see precisely what AI generated versus what I refined.

## Where AI still needs human guidance

While AI has come a long way, there are still areas where human expertise is crucial:

- **Architecture decisions**: Choosing the right tech stack, database design, and API structure
- **Creative decisions**: Color schemes, visual hierarchy, brand alignment
- **Business logic**: Specific requirements that need domain expertise
- **User experience**: Fine-tuning interactions and animations
- **Performance optimization**: AI is good, but humans still win on edge case optimization
- **Strategic decisions**: Long-term architecture choices and technical debt management

## Conclusion: Now is the best time to learn to code

If there's one key takeaway from this experiment, it's that understanding how to code and grasping architectural decisions makes AI-powered development significantly more effective. The better you can define your requirements and structure your project, the more impressive the results AI can deliver.

It all starts with clear, well-thought-out specifications. The more context and direction you provide, the more likely AI is to generate something truly useful.

Between all these tools, there’s no single winner. Each platform has its strengths, preferred tech stacks, and unique workflows. Ultimately, they all offer a solid foundation or a great starting point for your project.

The future belongs to those who combine coding skills with AI. If you’re thinking about learning to code, now is the perfect time. AI will amplify what you can achieve.

What will you build with your next hour?
