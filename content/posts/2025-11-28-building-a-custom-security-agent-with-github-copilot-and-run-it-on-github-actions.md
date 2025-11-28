---
title: "Build a security agent with Copilot and GitHub Actions"
longTitle: "Building a custom security agent with GitHub Copilot and run it on GitHub Actions"
customField: ""
slug: "/custom-security-agent-github-copilot-actions/"
description: "Create a custom security agent using GitHub Copilot and Actions to automate security reviews and enhance your code's safety."
date: "2025-11-28T11:36:35.920Z"
lastmod: "2025-11-28T11:36:36.655Z"
preview: "/social/aa60d445-8124-4d3c-888f-c32a29e5362a.png"
draft: false
comments: true
tags:
  - "Automation"
  - "GitHub"
  - "GitHub Actions"
  - "GitHub Copilot"
  - "Security"
type: "post"
fmContentType: "post"
---

In the world of software development, security reviews can often feel like a formal, sometimes stressful, ceremony. We hand our code over to specialists, wait for a report, and then scramble to fix the findings. While services like [Aikido Security](https://www.aikido.dev/) are invaluable in professional settings, I found myself wondering: could I bring some of that power to my personal projects in a more lightweight, "cozy" way? What if I could build my own automated security specialist, an AI agent that knows my code and helps me improve it?

This is the story of how a single talk at a [Xebia](https://xebia.com/) event by [Côme Redon](https://www.linkedin.com/in/come-redon-03a06b22/) sparked an idea. I decided to build a custom security agent for my project, "EngageTime," using tools I already had: [GitHub Copilot](https://github.com/features/copilot) and [GitHub Actions](https://github.com/features/actions). It turned out to be a good journey that I wanted to share.

In this article, I'll walk you through the entire process, from creating the agent to analysing its findings and even having it file its own bug reports. And yes, I'll be sharing the complete configuration so you can build your own.

## Crafting the brain: the security agent definition

The first step is to create the agent's definition. In the world of GitHub Copilot, this is done through a simple Markdown file. This file acts as a prompt, a set of instructions that defines the agent's name, purpose, and rules of engagement.

My goal was to create an agent that could perform a comprehensive security analysis without modifying the code directly. I drew inspiration from the concepts I saw at the event and incorporated terms and capabilities I was familiar with from my experience with professional security tools.

Here’s the agent definition file, located at `.github/agents/security-agent.md`:

```markdown
---
name: SecurityAgent
description: Security Agent - Analyzes TypeScript and React code for security vulnerabilities and creates security reports
model: GPT-5.1 (Preview)
---

## Purpose

This agent performs comprehensive security analysis of the Astro, TypeScript code. It identifies security vulnerabilities, assesses risks, and produces detailed security reports without modifying the codebase directly.

## Security Scanning Capabilities

This agent can perform comprehensive security analysis across the full stack:

### Code Analysis

- **SAST (Static Code Analysis)** - Scans TypeScript/React source code for security vulnerabilities
- Identify security vulnerabilities including:
  - SQL Injection risks
  - Cross-Site Scripting (XSS) vulnerabilities
  - Cross-Site Request Forgery (CSRF) issues
  - Authentication and authorization flaws
  - Insecure cryptographic implementations
  - Hardcoded secrets or credentials
  - Path traversal vulnerabilities
  - Insecure deserialization
  - Insufficient input validation
  - Information disclosure risks
  - Missing security headers
  - Dependency vulnerabilities
  - Input validation analysis - review all user input handling
  - Data Encryption - check encryption at rest and in transit
  - Error Handling - ensure errors don't leak sensitive information

### Dependency & Component Analysis

- **SCA (Software Composition Analysis)** - Monitors npm dependencies for known vulnerabilities & CVEs
- **License Scanning** - Identifies licensing risks in open source components
- **Outdated Software Detection** - Flags unmaintained frameworks and end-of-life runtimes
- **Malware Detection** - Checks for malicious packages in supply chain

### Infrastructure & Configuration

- **Secrets Detection** - Finds hardcoded API keys, passwords, certificates
- **Cloud Configuration Review** - Azure Functions and services security posture
- **IaC Scanning** - Analyzes Terraform/CloudFormation/Kubernetes configurations
- **Container Image Scanning** - Scans Azure container images for vulnerabilities

### API & Runtime Security

- **API Security** - Reviews endpoint security and access controls
- **Database Security** - Checks for secure queries and connection practices
- **WebSocket Security** - Validates secure WebSocket implementations
- **File Upload Security** - Reviews secure file handling practices

### Compliance & Best Practices

- OWASP Top 10: Check against latest OWASP security risks
- TypeScript/React Security Guidelines: Verify adherence to Node.js and React security best practices
- Secure coding standards: Validate code follows industry standards
- Dependency scanning: Check for known vulnerabilities in npm dependencies
- Security headers: Verify proper HTTP security headers
- Data privacy: Review GDPR/privacy compliance considerations

### Security Metrics & Reporting

- **Vulnerability Count by Severity** - Critical, High, Medium, Low categorization
- **Code Coverage Analysis** - Security-critical code coverage metrics
- **OWASP Top 10 Mapping** - Maps findings to current OWASP risks
- **CWE Classification** - Uses Common Weakness Enumeration for standardization
- **Risk Score** - Overall security posture assessment
- **Remediation Timeline** - Priority-based fix recommendations

## Report Structure

### Security Assessment Report

1. Executive Summary
	- Overall security posture
	- Critical findings count
	- Risk level assessment

2. Vulnerability Findings
	For each vulnerability:
	- Severity: Critical/High/Medium/Low
	- Category: (e.g., Injection, Authentication, etc.)
	- Location: File and line number
	- Description: What the issue is
	- Impact: Potential consequences
	- Recommendation: How to fix it
	- References: OWASP/CWE/Microsoft docs

3. Security Best Practices Review
	- Areas following best practices
	- Areas needing improvement
	- Configuration recommendations

4. Dependency Analysis
	- Vulnerable packages identified
	- Recommended updates

5. Action Items
	- Prioritized list of fixes needed
	- Quick wins vs. complex remediation

6. Critical Vulnerability Warning
	- If any CRITICAL severity vulnerabilities are found, include exactly this message at the end of the report:
	````
	THIS ASSESSMENT CONTAINS A CRITICAL VULNERABILITY
	````
  - Do not adapt or change this message in any way.
```

This file is the agent's "brain." By defining its capabilities and boundaries clearly, I'm setting the stage for a focused and useful analysis.

## Wiring it up: the GitHub Actions workflow

With the agent defined, it was time to bring it to life with a GitHub Actions workflow. The goal was to create a process that would:

1. Check out the code.
2. Install the GitHub Copilot CLI.
3. Feed the agent definition and the codebase to the CLI.
4. Capture the report and make it available.
5. Most importantly, fail the workflow if any critical issues were found.

After some tinkering, particularly around getting the right authentication token, I landed on this workflow file at `.github/workflows/security-agent.yml`:

```yaml
name: Security Agent Workflow

on:
  workflow_dispatch:

jobs:
  security-assessment:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    permissions:
      contents: read
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install GitHub Copilot CLI
        run: npm i -g @github/copilot

      - name: Run Security Agent via Copilot CLI
        env:
          COPILOT_GITHUB_TOKEN: ${{ secrets.COPILOT_GITHUB_TOKEN }}
          GITHUB_REPOSITORY: ${{ github.repository }}
        run: |
          set -euo pipefail
          AGENT_PROMPT=$(cat .github/agents/security-agent.md)
          PROMPT="$AGENT_PROMPT"
          PROMPT+=$'\n\nContext:\n'
          PROMPT+="- Repository: $GITHUB_REPOSITORY"
          PROMPT+=$'\n\nTask:\n'
          PROMPT+=$"\n- Execute the instructions on the full codebase"
          PROMPT+=$'\n- Generate the security report at /security-reports/security-assessment-report.md summarizing findings, severity, and remediation guidance.'

          copilot --prompt "$PROMPT" --allow-all-tools --allow-all-paths < /dev/null

      - name: Output security report as summary
        if: always()
        run: |
          set -euo pipefail
          REPORT_PATH="security-reports/security-assessment-report.md"

          if [ ! -f "$REPORT_PATH" ]; then
            echo "No security report generated; skipping summary."
            exit 0
          fi

          echo "## Security Assessment Report" >> $GITHUB_STEP_SUMMARY
          cat "$REPORT_PATH" >> $GITHUB_STEP_SUMMARY

      - name: Upload security report artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: security-assessment-report-${{ github.run_id }}
          path: security-reports/security-assessment-report.md
          retention-days: 30

      - name: Check for critical vulnerabilities
        if: always()
        run: |
          set -euo pipefail
          REPORT_PATH="security-reports/security-assessment-report.md"

          if [ ! -f "$REPORT_PATH" ]; then
            echo "No security report generated; skipping critical check."
            exit 0
          fi

          if grep -q "THIS ASSESSMENT CONTAINS A CRITICAL VULNERABILITY" "$REPORT_PATH"; then
            echo "❌ CRITICAL VULNERABILITY DETECTED - Workflow failed"
            echo "The security assessment found critical vulnerabilities that must be addressed before proceeding."
            exit 1
          else
            echo "✅ No critical vulnerabilities detected"
          fi
```

{{< blockquote type="important" text="The GitHub Actions workflow requires you to create a secret named `COPILOT_GITHUB_TOKEN`. This token is a fine-grained personal access token with the **Copilot Requests read-only permission**. Add this token as a secret in your GitHub repository settings to enable the workflow to authenticate with Copilot." >}}

{{< caption-new "/uploads/2025/11/fine-grained-copilot.webp" "Use the Copilot Requests read-only permission for the fine-grained personal access token." >}}

{{< blockquote type="info" text="The timeout on the GitHub Action is set to 15 to make sure that it doesn't run too long." >}}

### Deconstructing the workflow

- **`on: workflow_dispatch`**: I started with a manual trigger. This is perfect for development, as it lets me run the agent on demand without committing new code every time. You can change this to run on each pull request or on a schedule as needed.
- **`npm i -g @github/copilot-cli`**: This installs the official [GitHub Copilot CLI](https://www.npmjs.com/package/@github/copilot-cli), the tool that allows us to interact with Copilot agents from the command line.
- **The Security Gate**: An important step is `Check for critical vulnerabilities`. I had engineered a specific string, `THIS ASSESSMENT CONTAINS A CRITICAL VULNERABILITY`, into my agent's instructions. This step  uses the simple but powerful [grep](https://www.gnu.org/software/grep/manual/grep.html) command to search the report for that exact string. If it's found, the workflow exits with an error code, effectively acting as a security gate that prevents merging code with critical issues.

## The moment of truth: the first report

With everything wired up, I manually triggered the workflow. The first report it generated was astounding. It wasn't just a list of potential issues; it was a detailed security assessment.

It found 3 critical vulnerabilities, along with a host of high and medium-risk findings. Here are two of the most impactful ones:

### Critical finding 1: inadequate input sanitisation

The agent identified a custom `sanitizeInput` function that was vulnerable to [Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/).

- **The Vulnerable Code:**
  ```typescript
  export const sanitizeInput = (input: string): string => {
    return input.replace(/<script.*?>.*?<\/script>/gi, "").trim();
  };
  ```
- **The Agent's Analysis:** The agent correctly pointed out that this regex could be easily bypassed with event handlers (`<img src=x onerror="alert(1)">`), different tags, or encoded payloads.
- **The Recommended Fix:** It suggested replacing this homegrown function with [DOMPurify](https://github.com/cure53/DOMPurify), a battle-tested sanitisation library.
  ```typescript
  import DOMPurify from 'isomorphic-dompurify';

  export const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input).trim();
  };
  ```

### Critical finding 2: Cross-Site Scripting (XSS) via innerHTML Assignment

Another issue was the direct assignment of user-generated content to `innerHTML`, which is a classic XSS vector.

- **The Vulnerable Code:**
  ```typescript
  container.innerHTML = `
    ...
  `;
  ```
- **The Agent's Analysis:** The agent highlighted that this practice could allow malicious scripts to execute if the content isn't properly sanitized.
- **The Recommended Fix:** It recommended using safer DOM manipulation methods, such as creating elements and setting text content:
  ```typescript
  const fallbackDiv = document.createElement('div');
  fallbackDiv.className = '...';
  fallbackDiv.textContent = '...';
  target.replaceWith(fallbackDiv);
  ```

## From report to action: automating the workflow

Now I had a detailed report, but I still needed to act on it. Manually creating a issue for each of the findings felt like a chore. So, I turned to my AI partner again.

I gave GitHub Copilot a simple prompt: *"Can you create issues on GitHub for the issues that you found in the security report of today?"*

Using the [GitHub CLI](https://cli.github.com/), Copilot iterated through the report and created a new, detailed issue for each finding directly in my repository, turning a static document into a dynamic backlog of actionable tasks.

## Conclusion

This journey is great to see how modern AI tools can augment our workflows. By combining a well-defined agent, a pragmatic GitHub Actions workflow, and a little bit of CLI magic, I created a robust, automated security review process for my personal project.

The agent found real, critical issues, provided high-quality remediation advice, and I was even able to automate the process of turning its findings into trackable work. For some of the issues, the agent's code was a direct, copy-paste solution.

I encourage you to take these configurations and adapt them for your own projects. Happy building!

---

{{< blockquote type="note" text="This article was written with [Gemini CLI](https://github.com/google-gemini/gemini-cli) and [speedgrapher](https://github.com/danicat/speedgrapher), demonstrating how AI tools can also enhance the writing process itself." >}}
