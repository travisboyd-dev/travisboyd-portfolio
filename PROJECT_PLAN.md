# Project 001 — Portfolio-as-Code

**Project:** TravisBoyd.dev — Azure-hosted engineering portfolio
**Repository:** https://github.com/travisboyd-dev/travisboyd-portfolio
**Production:** https://travisboyd.dev
**Development:** https://thankful-coast-024faad0f.4.azurestaticapps.net
**Last reviewed:** November 17, 2026
**Current focus:** DEVOPS-006 — Review and merge infrastructure PR #2 into develop

> **How to use this plan:** Mark completed tasks [x] and outstanding tasks [ ].
> Update this document as work progresses. Completed tasks reflect confirmed
> exercises and deployment results, not a comprehensive audit of Azure settings.
>
> **Learning approach:** Implement CLI commands, Bicep, Terraform, YAML,
> and troubleshooting hands-on. Understand what each command does before
> running it. Use AI primarily for instruction, review, and repetitive work.

---

## Goal and Definition of Done

Build and operate a professional Azure-hosted portfolio demonstrating
real Cloud/DevOps engineering skills.

The project should demonstrate:

- Azure infrastructure provisioning
- Infrastructure as Code using Bicep and Terraform
- Git and GitHub branching workflows
- Automated CI/CD pipelines
- Secure credential management
- Environment separation
- Cost controls and monitoring
- Recovery and rollback procedures
- Clear engineering documentation

**Final completion criteria:** A working production website, repeatable
infrastructure definitions, tested CI/CD automation, documented operations
and security practices, and a portfolio-ready technical case study.

---

## Phase 1 — Foundation and Website

- [x] Register travisboyd.dev and configure domain ownership
- [x] Configure professional email alias
- [x] Create personal GitHub account and portfolio repository
- [x] Build the portfolio using Astro, TypeScript, and Tailwind
- [x] Deploy the production Azure Static Web App
- [x] Configure www.travisboyd.dev and apex domain
- [x] Validate HTTPS for both domains
- [ ] Document canonical domain and redirect behavior

**Status:** Core website complete and operational.

---

## Phase 2 — Cost Controls

- [x] Configure Azure monthly budget and spending alerts
- [x] Select the Free tier for the production Static Web App
- [x] Select the Free tier for the development Static Web App
- [ ] Verify budget scope and notification recipients
- [ ] Document expected monthly costs
- [ ] Review actual spending following development infrastructure deployment
- [ ] Document Azure budget-alert limitations

**Important:** Budget alerts provide notifications; they do not
automatically stop Azure spending.

---

## Phase 3 — CI/CD and GitHub

### A. Production CI/CD — Complete

- [x] Configure GitHub Actions for production deployment
- [x] Use Node.js 24
- [x] Install dependencies with npm ci
- [x] Validate Astro and TypeScript
- [x] Build the Astro application
- [x] Run automated static website tests
- [x] Deploy validated dist/ output
- [x] Configure pull-request preview environments
- [x] Verify preview cleanup after PR closure
- [x] Review and merge PR #1
- [x] Verify successful production deployment

### B. Git Branching and Development CI/CD — Complete

- [x] Learn the difference between git pull and GitHub Pull Requests
- [x] Create and publish the develop branch
- [x] Maintain main as the production branch
- [x] Create separate development deployment credentials
- [x] Store the development token in GitHub Actions Secrets
- [x] Create .github/workflows/azure-static-web-apps-dev.yml
- [x] Configure the workflow to trigger on pushes to develop
- [x] Configure checkout, Node.js, and npm caching
- [x] Add dependency installation, validation, build, and test steps
- [x] Configure deployment to the development Static Web App
- [x] Add a branch-specific job condition
- [x] Successfully execute the development workflow
- [x] Verify the development website after automated deployment

### C. CI/CD Improvements — Outstanding

- [ ] Add automated validation for pull requests targeting develop
- [ ] Review GitHub branch protection or repository rulesets
- [ ] Configure appropriate production deployment approvals
- [ ] Evaluate browser-based end-to-end testing
- [ ] Document failure troubleshooting and deployment rollback
- [ ] Review GitHub Actions permissions and action version-pinning strategy

**Current branch strategy:**

| Branch  | Purpose                                          |
| ------- | ------------------------------------------------ |
| main    | Production releases                              |
| develop | Development integration and automated deployment |
| feat/*  | Isolated feature development                     |

---

## Phase 4 — Infrastructure as Code: Azure Bicep

### A. Existing Infrastructure Reference — Complete

- [x] Understand Infrastructure as Code fundamentals
- [x] Create infra/main.bicep
- [x] Declare an Azure Static Web App using existing
- [x] Output the existing resource ID
- [x] Compile Bicep into ARM JSON
- [x] Inspect the generated ARM template
- [x] Configure Azure CLI authentication and subscription selection
- [x] Inspect the existing production resource
- [x] Run read-only What-If against the production resource group

### B. Production Infrastructure Draft — Reviewed

- [x] Create infra/proposed.bicep
- [x] Define deployment parameters
- [x] Use @allowed for supported pricing tiers
- [x] Define the Static Web App resource configuration
- [x] Compile and validate the draft
- [x] Compare properties against live Azure configuration
- [x] Run What-If against production
- [x] Investigate the predicted property differences
- [x] Document why production deployment is deferred
- [ ] Fully document repository integration, custom domains,
      certificates, and deployment-related security considerations

**Production safeguard:** infra/proposed.bicep remains an undeployed draft.

What-If reported differences involving:

- deploymentAuthPolicy
- stableInboundIP
- trafficSplitting

Do not apply this template to production without further review.

### C. Development Infrastructure — Complete

- [x] Create rg-travisboyd-portfolio-dev
- [x] Create infra/dev.bicep
- [x] Define resource name and Azure region parameters
- [x] Configure the Free SKU
- [x] Compile the development Bicep template
- [x] Inspect generated ARM JSON
- [x] Run What-If and confirm one resource to create
- [x] Deploy the development Static Web App using Bicep
- [x] Verify successful Azure provisioning
- [x] Retrieve and inspect live resource properties
- [x] Confirm the Azure-provided development hostname
- [x] Deploy the Astro application manually
- [x] Verify the development website
- [x] Remove the temporary deployment token from PowerShell
- [x] Add generated ARM JSON files to .gitignore

**Development resource:**

- Resource group: rg-travisboyd-portfolio-dev
- Static Web App: swa-travisboyd-portfolio-dev
- Region: East US 2
- SKU: Free
- Infrastructure source: infra/dev.bicep

### D. Infrastructure Documentation and Review — In Progress

- [x] Create infra/README.md
- [x] Commit Bicep infrastructure source code
- [x] Open PR #2 from feat/bicep-infrastructure to develop
- [x] Review PR #2 for merge conflicts and unintended file changes
- [ ] Update PROJECT_PLAN.md and infra/README.md to reflect completed work
- [ ] Add automated Bicep compilation or validation to CI
- [ ] Review and merge PR #2 into develop
- [ ] Verify development CI/CD after merging
- [ ] Add parameter examples and document environment-specific settings
- [ ] Document development resource cleanup and lifecycle procedures

**Status:** Bicep provisioning demonstrated successfully in development.
Production infrastructure remains protected.

---

## Phase 5 — Operations, Monitoring, and Recovery

- [ ] Define website availability and operational health requirements
- [ ] Evaluate Azure monitoring and alerting options and their costs
- [ ] Configure appropriate availability monitoring
- [ ] Monitor GitHub Actions workflow failures
- [ ] Document Azure resource health inspection
- [ ] Write deployment rollback procedures
- [ ] Test recovery using a controlled development exercise
- [ ] Write an incident-response checklist for deployment,
      DNS, and availability problems

---

## Phase 6 — Security and Reliability

- [ ] Review repository access and branch protection
- [ ] Audit GitHub Actions token permissions
- [ ] Document development and production deployment credential separation
- [ ] Document deployment-token rotation procedures
- [ ] Review dependency security alerts
- [ ] Review application security headers
- [ ] Perform additional accessibility and mobile testing
- [ ] Document recovery objectives and security tradeoffs

---

## Phase 7 — Portfolio Case Study and Handoff

- [ ] Create an Azure infrastructure architecture diagram
- [ ] Create a GitHub Actions CI/CD architecture diagram
- [ ] Explain development versus production environment separation
- [ ] Document Bicep design decisions and deployment safeguards
- [ ] Document Terraform design decisions after implementation
- [ ] Capture sanitized deployment evidence and screenshots
- [ ] Document technical troubleshooting and lessons learned
- [ ] Document cost controls, monitoring, and security
- [ ] Write a resume-ready project summary
- [ ] Publish the completed case study on travisboyd.dev

---

## Phase 8 — Terraform on Azure

**Status:** Planned — Begin after the current Bicep PR and development
CI/CD documentation milestone.

### A. Terraform Fundamentals

- [ ] Install Terraform CLI and verify its version
- [ ] Learn HashiCorp Configuration Language (HCL)
- [ ] Understand providers, resources, variables, and outputs
- [ ] Learn terraform init
- [ ] Learn terraform fmt and terraform validate
- [ ] Learn terraform plan
- [ ] Learn terraform apply
- [ ] Learn terraform destroy

### B. Azure Infrastructure with Terraform

- [ ] Configure the AzureRM provider
- [ ] Define a separate Terraform practice environment
- [ ] Provision an Azure resource with Terraform
- [ ] Review the Terraform plan before applying
- [ ] Inspect Terraform state and resource tracking
- [ ] Modify infrastructure using Terraform
- [ ] Clean up disposable resources safely

**Safeguard:** Avoid independently managing the same Azure resource
through both Bicep and Terraform.

### C. Terraform State and Automation

- [ ] Learn local versus remote Terraform state
- [ ] Configure secure Azure Storage for remote state, subject to cost review
- [ ] Understand state locking and sensitive information
- [ ] Add Terraform formatting and validation to GitHub Actions
- [ ] Generate Terraform plans for pull-request review
- [ ] Explore controlled infrastructure deployment approvals
- [ ] Document Bicep versus Terraform tradeoffs

---

## Milestone Tracker

| Milestone                                    | Status                        |
| -------------------------------------------- | ----------------------------- |
| Production portfolio website                 | Complete                      |
| Production GitHub Actions CI/CD              | Complete                      |
| Azure budget alerts                          | Configured; review pending    |
| Bicep existing-resource reference            | Complete                      |
| Production Bicep draft and What-If review    | Complete; deployment deferred |
| Development Azure infrastructure via Bicep   | Complete                      |
| Manual development application deployment    | Complete                      |
| Automated development application deployment | Complete                      |
| Infrastructure PR #2                         | Open; documentation review    |
| Pull-request CI validation for develop       | Planned                       |
| Terraform fundamentals and deployment        | Planned                       |
| Monitoring and rollback                      | Planned                       |
| Security review                              | Planned                       |
| Portfolio case study                         | Planned                       |

---

## Session Log

| Date              | Completed work                                                      |
| ----------------- | ------------------------------------------------------------------- |
| November 9, 2026  | Production CI/CD verification, PR #1, initial Bicep exercises       |
| November 13, 2026 | Reviewed production Bicep What-If differences and safeguards        |
| November 16, 2026 | Created development resource group and Static Web App using Bicep   |
| November 17, 2026 | Completed manual and automated development deployment; opened PR #2 |

---

## Next Single Action

**DEVOPS-006.24 — Finish infrastructure documentation and PR #2 review.**

1. Replace outdated PROJECT_PLAN.md content with this updated plan.
2. Update infra/README.md to reflect the completed development deployment.
3. Commit and push documentation changes to feat/bicep-infrastructure.
4. Review the updated PR #2 before merging into develop.
5. Verify the development pipeline after merging.

**Following milestone:** Introduce Terraform while continuing monitoring,
security, and portfolio documentation improvements.
