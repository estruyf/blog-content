---
title: "Building my own AI cycling coach with Claude and Strava"
longTitle: "How I built an adaptive AI cycling coach using Claude, the Strava Connector, and a skill to create workouts"
slug: "/building-ai-cycling-coach-claude-strava/"
description: "Discover how to create a personalized AI cycling coach using Claude and Strava for tailored training plans that fit your lifestyle."
date: "2026-06-11T15:59:31.320Z"
lastmod: "2026-06-11T15:59:31.828Z"
preview: "/social/23172353-ce4e-4209-9cfb-40af4866e0ea.png"
draft: false
comments: true
tags:
    - "DevHack"
    - "AI"
    - "Claude"
    - "Strava"
    - "Cycling"
    - "Workflow"
type: "post"
fmContentType: "post"
---

Since the explosion of AI tools, I've been experimenting a lot with creating my own cycling coach. I myself use an app called [Join](https://join.cc/) which uses AI to create a weekly training plan. For a long time, I've been very happy with it, especially during the autumn and winter periods when I mostly do indoor cycling or train solo outside. 

But during the spring and summer, it's a completely different story. 

In spring and summer, I want to do group and social rides, and that is where most of these algorithmic apps fall short. They don't ask you when you plan to do social rides, nor do they seamlessly integrate core and strength training—something I always had to manually plan alongside my bike sessions.

{{< blockquote type="note" text="Don't get me wrong, Join is fantastic for structured training, but it isn't fully aware of the social dynamics of summer cycling." >}}

I realized I didn't just want an app that throws workouts at me. I wanted an app that is actually aware of my weekend group rides and then blends my structured workouts around them. I wanted a real coach I could talk to: *"Hey, I'm doing a huge social ride this weekend, give me workouts during the week that build fitness without leaving me dead by Saturday."*

Another thing I missed was the ability to easily integrate strength and core training. Since my back injury, core training became essential, but many of these apps don't provide a seamless way to include them. I wanted a coach that could seamlessly weave in strength sessions without me having to manually schedule them.

With the release of the [Strava Connector](https://press.strava.com/articles/strava-launches-mcp-connector) for Claude, I started thinking that a custom Claude skill might be more than enough to achieve this. I decided to build my own solution.

## The skill

The skill can be found in this repository: [estruyf/skill-cycling-plan-coach](https://github.com/estruyf/skill-cycling-plan-coach). From the [releases page](https://github.com/estruyf/skill-cycling-plan-coach/releases), you can download the latest version of the skill and install it in your Claude environment. The skill is designed to be used with the Strava Connector, so make sure you have that set up and connected to your Strava account.

Once the `cycling-plan-coach.skill` is installed, you can start interacting with it in Claude by using the `/cycling-plan-coach` slash command, but it should also work if you ask to create a new cycling plan for the upcoming week.

## The setup: building the athlete profile

When you first use the skill I created, it doesn't immediately spit out a generic plan. It acts like a real coach onboarding a new client. It will ask for details to generate a comprehensive `athlete.json` profile:

*   Preferred language and units (metric/imperial)
*   Main goals for the season
*   Gender, age, and body weight
*   Current FTP (Functional Threshold Power)
*   Typical riding days (when are you available for workouts vs. group rides)

These days can vary. Every time you ask for a new schedule, Claude will verify if you want to stick to your predefined days or if your schedule has changed.

{{< caption-new "/uploads/2026/06/cycling-skill-claude-cli.webp" "The initial setup of the cycling skill in Claude CLI" >}}

Once the skill has all the data, it will start pulling your recent activity data from Strava to understand your current fitness and fatigue levels. This is where the real magic happens. 

## The data engine: pulling from Strava

To give actionable advice, the AI needs data. Before any weekly plan is built, my skill makes four specific calls to the Strava connector.

Here is exactly what happens behind the scenes:

1.  `get_athlete_zones`: Pulls your current FTP and power zones. This FTP drives every watt target in the upcoming week. If the API flags `ftp_is_estimated`, it falls back to a manually configured value.
2.  `get_athlete_profile`: Grabs demographics like name, weight, and unit preference. 
3.  `list_activities`: Looks at the last 14 days, filtering for `Ride` and `VirtualRide`. It extracts distance, moving time, elevation, and `relative_effort` (as a proxy for fatigue). It summarizes the last 7 days to appropriately tune the upcoming week's load.
4.  `get_activity_performance`: Looks at your most recent hard ride to pull your power curve (5s, 1m, 5m, 20m$ best efforts). This classifies your rider type (sprinter, all-rounder, puncheur) and dictates which interval sessions take priority.

## The result: a week that actually fits my life

After analyzing my profile and Strava data, the skill generates a series of files for the week: `.zwo` format files for my virtual training, and markdown files detailing the overall plan and strength routines.

Here is an actual summary of the plan Claude generated for me:

```markdown
# Training Week 2026-W25
**Goal:** Reach 300 W FTP (currently 245 W / 3.45 W/kg) — build to 4.2 W/kg
**Focus:** One quality threshold session (over-unders) to push FTP tolerance; keep Thursday easy and the weekend social.
**Last week:** 5 rides, 327 km, ~10 h, 840 m elevation, 3 hard days — heavy week, coming into W25 with some cumulative load.

## Schedule

| Day | Session | Duration | Notes |
|-----|---------|----------|-------|
| Mon | Strength + core | 45–55 min | Full gym session |
| Tue | Rest | — | Full recovery |
| Wed | Over-unders 3×3 (Step 1) | 72 min | `2026-W25-over-unders.zwo` |
| Thu | Endurance Z2 | 75 min | `2026-W25-endurance-z2.zwo` · Easy 65% FTP (159 W) |
| Fri | Core | 20–30 min | See core section |
| Sat | Group ride | — | Social, no power targets |
| Sun | Group ride | — | Social, no power targets |
```

{{< blockquote type="tip" text="Notice that on Monday and Friday, it planned strength and core sessions. This is exactly the kind of nuanced coaching AI can provide when given the right prompt context." >}}

### Generating the structured workouts

The skill automatically outputs `.zwo` files for structured interval days. The logic dictating how Claude should structure these XML files is maintained in a specific [ZWO Format Markdown file](https://github.com/estruyf/skill-cycling-plan-coach/blob/main/references/zwo-format.md) inside the repository.

### Strength and core training

For strength and core sessions, the skill generates markdown files with detailed instructions. These are based on a combination of general strength training principles for cyclists and specific exercises that target the core and back, which are crucial for my injury prevention.

```markdown
# Strength Session – 2026-W25
**Day:** Monday, June 15
**Duration:** ~45–55 min including warm-up

## Warm-up
5–10 min easy movement: leg swings, hip circles, bodyweight squats × 10, glute bridges × 10.

## Strength (legs and posterior chain)

| Exercise | Sets × Reps | Load / cue | Rest |
|----------|-------------|------------|------|
| Back squat | 4 × 5 | Heavy, full control, smooth depth. Progress the load each week. | 2–3 min |
| Romanian deadlift | 3 × 8 | Hinge from the hips, feel the hamstrings load at the bottom. | 90 s |
| Bulgarian split squat | 3 × 8/leg | Dumbbells, front foot flat, rear foot elevated. Single-leg force. | 90 s |

## Core (trunk and stability)

| Exercise | Sets × Reps | Load / cue | Rest |
|----------|-------------|------------|------|
| Plank | 3 × 45 s | Brace hard, neutral spine, hold riding position. | 45 s |
| Dead bug | 3 × 10/side | Low back pressed to the floor throughout. | 45 s |

## Notes
- Heavy compounds first, core last.
- Rest fully between sets — this is not cardio.
- Progress the squat and RDL by adding small load each week. Consistency beats intensity here.
```

## The Garmin hurdle

Once I had my `.zwo` files, I needed to get them onto my bike computer or indoor trainer. I use MyWhoosh indoors, and the files drop right in. But outdoors, I use a Garmin.

I must admit, this part was frustrating. Garmin severely restricts its APIs. They allow third-party developers to upload *activities*, but they do not expose a public API endpoint for uploading custom *workouts*. 

Because manually recreating Claude's workouts in the Garmin Connect UI was a massive waste of time, I built a workaround: the **Garmin Workout Browser Extension**. 

This Chrome extension bridges the gap, allowing you to seamlessly import those AI-generated ZWO files directly into your Garmin calendar. It's currently pending publication in the Chrome Web Store, but you can check out the source code here: [estruyf/garmin-workout-browser-extension](https://github.com/estruyf/garmin-workout-browser-extension).

When you use the extension, you will get a new "Workouts" button on the Garmin Connect pages.

{{< caption-new "/uploads/2026/06/garmin-connect-workouts-overview.webp" "My Garmin connect workout overview" >}}

When you click on it, you can view workouts, clone workouts, make changes to it, or upload the ZWO files which get converted to the Garmin JSON format.

{{< caption-new "/uploads/2026/06/garmin-connect-workout-detail.webp" "The workout detail page with the option to upload a ZWO file" >}}

## Wrapping up

Using the skill feels incredibly natural, whether using the Claude Desktop app or the CLI. As I just started to use it, I will probably need to tweak it a bit to get consistent results, but the initial output is very promising.

Let me know what you think, and if you give it a try, share your experience! Feel free to share any feedback or suggestions for improvement. I'm excited to see how this evolves and how it can help other cyclists create more personalized and adaptive training plans.

## Resources

*   [Skill: Cycling Plan Coach Repository](https://github.com/estruyf/skill-cycling-plan-coach)
*   [Garmin Workout Browser Extension](https://github.com/estruyf/garmin-workout-browser-extension)
*   [Join Cycling App](https://join.cc/)
*   [Claude AI](https://claude.ai/)