---
title: "My AI Code Review Journey: Copilot, CodeRabbit, Macroscope"
longTitle: ""
customField: ""
slug: "/ai-code-review-journey-copilot-coderabbit-macroscope/"
description: "My AI code review journey explores tools like Copilot, CodeRabbit, and Macroscope, highlighting their impact on my development workflow."
date: "2025-11-25T12:53:31.940Z"
lastmod: "2025-11-25T12:53:32.611Z"
preview: "/social/cc7cef99-31f6-41e6-b2d8-09ecd76a6bb0.png"
draft: false
comments: true
tags:
  - "AI"
  - "code review"
  - "CodeRabbit"
  - "GitHub Copilot"
  - "Macroscope"
type: "post"
fmContentType: "post"
---

As a developer, I'm always curious about tools that can make my workflow better. It's part of the fun of the job, right? As a [GitHub Star](https://stars.github.com/), I'm in a position to see a lot of new technology, so when AI-powered code review tools started gaining traction, I was naturally intrigued.

My journey wasn't driven by a specific problem, but by sheer opportunity: [CodeRabbit](https://coderabbit.ai/) began sponsoring my work, the team from [Macroscope](https://macroscope.com/) reached out directly, and my work with GitHub meant I had early access to the latest [GitHub Copilot](https://github.com/features/copilot) features.

This gave me a unique chance to compare these tools in a real-world setting. I want to share my personal experience, the good, the bad, and the surprisingly funny way of letting an AI join my code review process.

# First stop: GitHub review and the case of the mismatched ID

I started my experiment with the code review features built right into GitHub Copilot. My first impression? It felt like having a second pair of eyes with superpowers. It was catching everything from minor stylistic nits (like a double `/**` in a comment) to much more critical, fail-safe, and security-related problems.

A perfect example came up almost immediately while I was rewriting a backend service. In the process, I had refactored how user identification worked, moving from a session-based ID to a more direct `attendeeId`. I was sure I had updated everything, but the AI caught something I'd completely missed.

Here’s the report it gave me on a pull request, which practically wrote the bug report for me:

{{< blockquote type="info" text="The HTTP handler passes `request.params.attendeeId` (the short attendee code like 'ATTENDEE-123') directly to `AttendeeService.updateAttendee(eventId, attendeeId, ...)` at line 64. However, `updateAttendee` expects the second parameter to be the internal `id` (`rowKey`), not the `attendeeId` field. The service layer confirms this: `updateAttendee` calls `getAttendee(eventId, id)`, which uses `getEntity(partitionKey, id)` as the `rowKey` lookup. Since `attendeeId` and `id` are two different fields in `EventAttendee`, this mismatch will cause the update to fail or target the wrong record." >}}

The problematic line of code was subtle:

```typescript
// The 'attendeeId' here was a public-facing ID, not the internal database ID.
const attendee = await AttendeeService.updateAttendee(eventId, attendeeId, { name, email, company });
```

The AI correctly identified that my service expected an internal **`key`**, a unique identifier used by the database, like a primary key. I was mistakenly passing it the public-facing `attendeeId`. This is exactly the kind of subtle but critical bug that can become a real headache to debug later down the line.

The solution involved a change in both the code and the database. To ensure the `key` was always unique for a given attendee at a specific event, I changed the logic to use a **composite key**. This is a common database pattern where you combine two or more columns to create a single, unique identifier. For me, that meant concatenating the `eventId` and the `attendeeId`. The AI's insight here didn't just fix a bug; it pushed me toward a more robust data model.

# Next up: CodeRabbit's in-depth analysis

After getting comfortable with GitHub Review, I gave [CodeRabbit](https://CodeRabbit.ai/) a try. I must admit, the most immediate difference was the depth of the reviews. CodeRabbit often provided more suggestions, but what really stood out was *how* it presented them. It would give me the exact lines to change, the updated code, clear reasoning, and even a custom prompt to feed to another AI if I wanted it to implement the change for me.

A great example was when it found a classic null-check issue. It reported:

> If `AttendeeService.getAttendeeByAttendeeId` returns null/undefined for an unknown `attendeeIdCode`, the subsequent access to `attendee.id`, `attendee.name`, etc. will throw and be caught as a 500. That’s both a runtime risk and the wrong status code for “not found”.

{{< caption-new "/uploads/2025/11/CodeRabbit-review.webp" "Code review suggestion by CodeRabbit"  "data:image/jpeg;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAACQAACgAAQUxQSCwAAAABJ6CQbQTIn2kOI7pHIyLixEIhJCvUTQZvEvgKpJA/WQQR/Y+pqjMg/lzSAlZQOCBIAAAA0AEAnQEqCgALAAFAJiWkAALnYWMnzAAA/vtkk2EtZV9jvE4K7fV9nV90/bdi2J3IQt4whoL9X2sgDrmLqegzCQ3I3OLWAAAA" "3348" "3756" >}}

{{< blockquote type="tip" text="This is a crucial point for API design. A `500 Internal Server Error` tells the client 'something broke on our end,' which is inaccurate and unhelpful. The correct response is a `404 Not Found`, which clearly communicates that the requested resource doesn't exist." >}}

CodeRabbit provided this exact `diff`, which made the fix incredibly simple:

```diff
-    const attendee = await AttendeeService.getAttendeeByAttendeeId(
-      eventId,
-      attendeeIdCode
-    );
-    const activities = await AttendeeService.getAttendeeActivitiesDetailed(
-      eventId,
-      attendeeIdCode
-    );
+    const attendee = await AttendeeService.getAttendeeByAttendeeId(
+      eventId,
+      attendeeIdCode
+    );
+
+    if (!attendee) {
+      return {
+        status: 404,
+        body: JSON.stringify({ error: "Attendee not found" }),
+      };
+    }
+
+    const activities = await AttendeeService.getAttendeeActivitiesDetailed(
+      eventId,
+      attendeeIdCode
+    );
```

But it didn't stop there. It also adds a prompt which you can pass to another AI tool to update the code for you:

> In <file> around lines 55 to 78, add a null-check after calling
> AttendeeService.getAttendeeByAttendeeId and if it returns null/undefined return
> a 404 response (with JSON error body) instead of continuing and causing a
> runtime error; only access attendee.id/name/email/company after the check, and
> verify whether AttendeeService.getAttendeeActivitiesDetailed expects
> attendeeIdCode or the internal attendee.id — if it expects the internal id, call
> it with attendee.id after the null-check.

This is what elevates a tool from a simple linter to a genuine partner. In some cases, it also thinks about the *next* potential bug. 

It’s great to have a partner that flags potential issues, but the AI's suggestions always require a human review. I verify recommended changes against business logic, edge cases, security considerations and test expectations before accepting them. AI can propose diffs and point out problems, but it can also misunderstand intent or make unsafe assumptions about APIs or data. I treat its output as a well-informed proposal, a huge time-saver, not an automatic commit.

{{< blockquote type="important" text="This human-in-the-loop dynamic is where these tools truly shine: they surface problems quickly while the developer applies domain knowledge and judgement." >}}

# A different perspective: Macroscope for the big picture

The third tool I tried, [Macroscope](https://macroscope.com/), offered a different angle. While its code review suggestions were similar to the others, its main strength was its project management dashboard.

{{< caption-new "/uploads/2025/11/macroscope-code-review.webp" "Code review dashboard by Macroscope"  "data:image/jpeg;base64,UklGRoAAAABXRUJQVlA4WAoAAAAQAAAACQAAAwAAQUxQSCkAAAAAlcLCwsLCwsLClcT//////////8TE///////////EmMbGxsbGxsbGmABWUDggMAAAALABAJ0BKgoABAABQCYlpAAC51UzVgAA/vtkGP+BvOh5vmN5JPNXay3TAmTuzvwAAA==" "4196" "1642" >}}

For me as a developer, this was interesting because it provides a bridge to the less technical members of the team. The dashboard gives product and project managers a high-level overview of a project's pulse: code commits, review velocity, open issues, and more. With integrations for tools like [Jira](https://www.atlassian.com/software/jira) and [Slack](https://slack.com/), it becomes a valuable hub for team-wide coordination.

{{< blockquote type="note" text="CodeRabbit provides similar reports on their website/dashboard. Getting started also felt different across the tools. With CodeRabbit it was very quick. I mostly had to hook it up and it was ready to run, so I spent less time in the website configuring things. Macroscope took a bit longer to configure initially, but it's making huge improvements to its onboarding and configuration experience." >}}

# The quirks and realities of AI review

Using these tools isn't always a straightforward path. One of the funniest things I discovered is that on every change, the AI keeps finding new things to comment on. You can end up in a sort of "endless loop" of refinement if you're not careful.

I had one funny instance where I followed an AI's suggestion to add extra validation logic. After a couple more iterations, the AI came back and reviewed its *own* suggestion, concluding that the code was now "too difficult to understand". The fix it proposed? Basically the original code I had written in the first place!

{{< blockquote type="note" text="It’s a good reminder that human intuition for simplicity and clarity can sometimes outweigh a machine's drive for exhaustive, computer-brained validation." >}}

# My final verdict and advice

So, what's my biggest takeaway after this journey?

**1. AI is a fantastic safety net.** I had another bug where I wrote a utility function to filter arrays but forgot to use the newly filtered arrays in my `return` statement. All the AI tools caught this subtle logic error that I might have missed until testing. They excel at this kind of static analysis.

**2. The AI actually learns.** These tools aren't static; they adapt. For instance, an AI suggested I use `context.log.error()` for logging in my [Azure Functions](https://azure.microsoft.com/en-us/products/functions/). This was correct for the V3 model, but I use V4, which requires `context.error()`. I provided that feedback in the review, and I never saw that incorrect suggestion pop up again.

**3. The human is irreplaceable.** This is the big one. Once the AI review is done, a human review is still essential. The AI is great at catching code-level issues, but it doesn't understand your business goals, your team's coding standards, or the long-term vision for a feature. Don't just blindly accept every suggestion. Treat the AI as a helpful **junior/medior** developer who still needs your senior guidance.

**4. It’s an amazing documentation time-saver.** An unexpected bonus was the AI-generated pull request summaries. CodeRabbit, for example, provided a detailed summary for one PR that was better than what I would have quickly written myself. This gives approvers instant context and frees up developer time—a win-win.

In the end, I believe AI code reviews are a valuable next step in software development. They catch bugs faster, they learn from your input, and they free up human developers to focus on the bigger picture. My advice? Dive in, but do it with an open and critical mind. Treat the AI as a new, incredibly sharp-eyed junior developer on your team—one that can help you a lot, as long as you provide the senior guidance.

---

{{< blockquote type="note" text="This article was written with [Gemini CLI](https://github.com/google-gemini/gemini-cli) and [speedgrapher](https://github.com/danicat/speedgrapher), demonstrating how AI tools can also enhance the writing process itself." >}}
