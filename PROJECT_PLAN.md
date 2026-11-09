# Project 001 — Portfolio-as-Code

**Project:** TravisBoyd.dev — Azure-hosted engineering portfolio  
**Repository:** https://github.com/travisboyd-dev/travisboyd-portfolio  
**Production:** https://travisboyd.dev  
**Last reviewed:** November 9, 2026  
**Current focus:** Phase 4 — Azure Infrastructure as Code (Bicep), exercise DEVOPS-003.10

> **How to use this plan:** Check off each task by changing `[ ]` to `[x]`. Keep this file in the GitHub repository (suggested name: `PROJECT_PLAN.md`) so progress is version-controlled. Update the date and notes as you work. The checkmarks below reflect what we have confirmed in our lessons, not a fresh audit of every Azure setting.
>
> **Learning approach:** You implement the infrastructure, YAML, CLI commands, and troubleshooting; ChatGPT reviews and coaches. Use Codex primarily for repetitive work or after you understand the design.

## Goal and definition of done

Build and operate a public technical portfolio on Azure, with secure custom domains, automated quality-gated deployment, version-controlled infrastructure definitions, cost visibility, useful monitoring, and documentation good enough to demonstrate cloud/DevOps skills to employers.

**Final completion criteria:** (1) production website works with HTTPS, (2) GitHub pipeline validates and deploys successfully, (3) infrastructure definition can be validated and safely compared against Azure, (4) monitoring and a recovery procedure are documented and tested where feasible, and (5) a clear technical case study demonstrates the work you personally performed.

## Phase 1 — Foundation and website

- [x] Register `travisboyd.dev` and configure domain ownership
- [x] Set up professional email alias and separate personal GitHub identity
- [x] Create the `travisboyd-portfolio` GitHub repository
- [x] Build the Astro/TypeScript portfolio site
- [x] Deploy an Azure Static Web App in `rg-travisboyd-portfolio`
- [x] Configure `www.travisboyd.dev` and apex `travisboyd.dev`
- [x] Validate HTTPS for both domains
- [ ] Decide the canonical domain and document redirect/canonical-link behavior

**Evidence:** live site, GitHub repository, screenshots of custom-domain status (no tokens or private values).

## Phase 2 — Cost controls

- [x] Configure a monthly Azure budget and spending alerts
- [ ] Verify the configured subscription/resource-group scope and notification recipients
- [ ] Document the Free tier, expected baseline costs, and budget-alert limitations
- [ ] Review costs after subsequent infrastructure changes

**Guardrail:** Budget alerts notify; they do not automatically cap spending.

## Phase 3 — CI/CD (complete)

- [x] Implement GitHub Actions pipeline for `main` and pull requests
- [x] Pin the build runtime to Node.js 24
- [x] Install with `npm ci`, then run Astro checks, build, and static tests
- [x] Fix incomplete `package-lock.json` transitive dependency metadata
- [x] Deploy tested `dist` output without an Azure rebuild
- [x] Verify pull-request preview deployment
- [x] Review and squash-merge PR #1
- [x] Confirm production workflow succeeds
- [x] Confirm pull-request preview cleanup succeeds
- [x] Confirm live production site looks correct
- [ ] Consider separate browser-based end-to-end tests and branch protection/rulesets (improvement; not a blocker for this phase)

**Evidence:** PR #1 and successful workflow runs.

## Phase 4 — Infrastructure as Code: Azure Bicep (in progress)

### A. Learn and inspect (completed)
- [x] Explain why IaC is repeatable and version-controlled (DEVOPS-003.1)
- [x] Write `staticWebAppName` parameter in `infra/main.bicep`
- [x] Declare `Microsoft.Web/staticSites` with `existing`
- [x] Output the existing Static Web App resource ID
- [x] Confirm Azure CLI and Bicep compilation work
- [x] Inspect compiled ARM JSON (zero managed resource declarations)
- [x] Correct Azure CLI tenant/subscription context
- [x] Query the live Static Web App resource
- [x] Run read-only Azure What-If on the reference-only template: **1 to ignore**
- [x] Record existing configuration: East US 2, Free tier, branch `main`, GitHub repository

### B. Draft full infrastructure definition (CURRENT)
- [ ] **NOW — DEVOPS-003.10:** Create `infra/proposed.bicep` with commented `deploymentLocation` (`eastus2`) and `skuName` (`Free`) parameters
- [ ] Add parameter for the Static Web App name
- [ ] Study the `Microsoft.Web/staticSites` schema and distinguish required from optional properties
- [ ] Write a draft `resource` declaration (without `existing`) describing the intended configuration
- [ ] Compile the new draft locally and resolve syntax/linter issues
- [ ] Compare draft properties with the live resource, noting anything uncertain or omitted
- [ ] Document implications for repository integration, custom domains, certificates, and secrets
- [ ] Run **What-If only** against the actual resource group; review every proposed change
- [ ] Do not deploy the draft unless the comparison is understood, reviewed, and explicitly approved

### C. Make IaC demonstrably reproducible
- [ ] Create `infra/README.md` explaining parameters, scopes, and safety rules
- [ ] Add a parameter file or documented parameter examples (no credentials)
- [ ] Decide whether to test provisioning in a separate disposable resource group with a unique app name; verify pricing and cleanup first
- [ ] If a sandbox deployment is approved, deploy to sandbox only and verify the resulting resource
- [ ] Remove temporary sandbox resources after testing
- [ ] Commit reviewed IaC work through a pull request; validate Bicep in CI without applying production changes

**Critical safeguards:** Never assume a resource's `existing` reference is a complete provisionable template. Do not re-provision the live app or alter its custom domains, repository integration, deployment secret, or DNS casually. Never commit secrets or tokens. Check the subscription context before any Azure command.

## Phase 5 — Operations, monitoring, and recovery

- [ ] Decide what matters for this static site: availability, build health, errors, and cost
- [ ] Identify which Azure monitoring features are supported by the current Free tier, and their possible costs
- [ ] Configure appropriate availability or uptime checks with actionable alerts
- [ ] Document how to inspect failed GitHub workflows and Azure deployment state
- [ ] Write a rollback procedure to restore a known-good version of the website
- [ ] Practice recovery safely (e.g., a revert in a feature branch or a documented dry run)
- [ ] Create an incident-response checklist for site outage, DNS/certificate issue, or failed deployment

## Phase 6 — Security and reliability

- [ ] Review GitHub repository permissions, branch rules, and deployment-token handling
- [ ] Enable or review dependency/security alerts and update procedures
- [ ] Review the website's security headers and external dependencies
- [ ] Document secure secret management and credential rotation procedures
- [ ] Check accessibility, broken links, and mobile behavior
- [ ] Decide on an appropriate recovery objective for this low-risk portfolio (and explain the tradeoff)

## Phase 7 — Portfolio case study and handoff

- [ ] Create an architecture diagram: DNS → Azure Static Web App; GitHub → CI/CD → Azure
- [ ] Document the system design and infrastructure decisions
- [ ] Capture troubleshooting examples: domain certificate issue, npm lockfile failure, Azure account/subscription mismatch
- [ ] Add sanitized deployment screenshots, logs, and links to the README/case study
- [ ] Explain cost controls and security choices, including limitations
- [ ] Write a resume-ready project summary with accurate, verifiable impact statements
- [ ] Perform a final production smoke test and review monthly spending
- [ ] Mark Project 001 complete and choose the next Azure engineering project

## Milestone tracker

| Milestone | Status | Acceptance check |
|---|---|---|
| Live site | Complete | Both domain names load securely |
| Spending alerts | Complete | Budget configured; scope/recipients still to document |
| Quality-gated CI/CD | Complete | Tests, preview, production, and cleanup succeeded |
| Bicep reference/What-If | Complete | Existing resource reference compiles; What-If ignores resource |
| Full Bicep draft | **Next** | Compiles and What-If findings are reviewed; no unintended changes |
| Sandbox IaC demonstration | Planned | Safe separate environment, optional with approved costs |
| Monitoring and recovery | Planned | Alerts/runbook and safe recovery exercise documented |
| Engineering case study | Planned | Clear architecture, decisions, evidence, and lessons |

## Session log

| Date | What changed | Next action |
|---|---|---|
| 2026-11-09 | CI/CD PR #1 merged; GitHub production deployment and preview cleanup succeeded | Continue Bicep |
| 2026-11-09 | Compiled existing-resource Bicep; corrected subscription context; What-If showed `1 to ignore`; inspected live configuration | Write `infra/proposed.bicep` parameters |

## Next single action

In `infra/proposed.bicep`, write two commented `string` parameters:
- `deploymentLocation` default `'eastus2'`
- `skuName` default `'Free'`

Paste your attempt into the chat for review before proceeding.
